select * from Usuarios;
select * from Expedientes;
--EXEC dbo.SP_ListarExpedientes;

CREATE OR ALTER PROCEDURE SP_ReporteExpedientesPorEstado
AS
BEGIN
	SELECT estado, count(*) AS cantidad
	FROM Expedientes
	GROUP BY estado;
END;

--EXEC SP_ReporteExpedientesPorEstado;
ALTER TABLE Expedientes
ADD justificacion_rechazo VARCHAR(500) NULL,
    usuario_creacion VARCHAR(50) NULL,
    fecha_aprobacion DATETIME NULL;

ALTER TABLE Indicios
ADD 
    color VARCHAR(50) NULL,
    tamano VARCHAR(100) NULL,
    peso VARCHAR(50) NULL,
    ubicacion VARCHAR(200) NULL,
    tecnico VARCHAR(100) NULL;

CREATE OR ALTER PROCEDURE SP_RechazarExpediente
    @id INT,
    @justificacion VARCHAR(500)
AS
BEGIN
    UPDATE Expedientes
    SET estado = 'RECHAZADO',
        justificacion_rechazo = @justificacion
    WHERE id = @id;
END

CREATE OR ALTER PROCEDURE SP_AprobarExpediente
    @id INT
AS
BEGIN
    UPDATE Expedientes
    SET estado = 'APROBADO',
        fecha_aprobacion = GETDATE()
    WHERE id = @id;
END

CREATE OR ALTER PROCEDURE SP_ReporteExpedientes
    @estado VARCHAR(20) = NULL,
    @desde DATE = NULL,
    @hasta DATE = NULL
AS
BEGIN
    SELECT id, numero, descripcion, estado, fecha_registro
    FROM Expedientes
    WHERE (@estado IS NULL OR estado = @estado)
      AND (@desde IS NULL OR fecha_registro >= @desde)
      AND (@hasta IS NULL OR fecha_registro <= @hasta);
END
--ya se agrego
ALTER TABLE Expedientes
ADD justificacion_rechazo VARCHAR(500) NULL;

ALTER PROCEDURE SP_RechazarExpediente
    @id INT,
    @justificacion VARCHAR(500)
AS
BEGIN
    UPDATE Expedientes
    SET estado = 'RECHAZADO',
        justificacion_rechazo = @justificacion
    WHERE id = @id;

    SELECT 'Expediente rechazado correctamente' AS mensaje;
END

CREATE PROCEDURE SP_RegistrarExpediente
  @numero VARCHAR(50),
  @descripcion VARCHAR(500),
  @usuario_creacion VARCHAR(100)
AS
BEGIN
    INSERT INTO Expedientes (numero, descripcion, estado, fecha_registro, usuario_creacion)
    VALUES (@numero, @descripcion, 'pendiente', GETDATE(), @usuario_creacion);

    SELECT SCOPE_IDENTITY() AS id;
END;


ALTER TABLE Expedientes
ADD usuario_aprobacion VARCHAR(100) NULL;

ALTER TABLE Expedientes
ADD usuario_rechazo VARCHAR(100) NULL;




CREATE PROCEDURE SP_AprobarExpediente
  @id INT,
  @usuario_aprobacion VARCHAR(100)
AS
BEGIN
    UPDATE Expedientes
    SET estado = 'aprobado',
        fecha_aprobacion = GETDATE(),
        usuario_aprobacion = @usuario_aprobacion
    WHERE id = @id;
END;

CREATE PROCEDURE SP_RechazarExpediente
  @id INT,
  @justificacion_rechazo VARCHAR(500),
  @usuario_rechazo VARCHAR(100)
AS
BEGIN
    UPDATE Expedientes
    SET estado = 'rechazado',
        justificacion_rechazo = @justificacion_rechazo,
        usuario_rechazo = @usuario_rechazo
    WHERE id = @id;
END;


CREATE PROCEDURE SP_ListarExpedientes
AS
BEGIN
    SELECT *
    FROM Expedientes
    ORDER BY fecha_registro DESC;
END;

select * from Expedientes; 
CREATE PROCEDURE SP_ReportesEstados
AS
BEGIN
    SELECT 
        estado, 
        COUNT(*) AS cantidad
    FROM Expedientes
    GROUP BY estado;
END;

CREATE PROCEDURE SP_ReporteExpedientesFiltro
  @estado VARCHAR(20) = NULL,
  @fechaInicio DATE = NULL,
  @fechaFin DATE = NULL
AS
BEGIN
    SELECT 
        estado,
        COUNT(*) AS cantidad
    FROM Expedientes
    WHERE
        (@estado IS NULL OR estado = @estado)
        AND (@fechaInicio IS NULL OR fecha_registro >= @fechaInicio)
        AND (@fechaFin IS NULL OR fecha_registro <= @fechaFin)
    GROUP BY estado;
END;

CREATE PROCEDURE SP_ReporteDetallado
AS
BEGIN
    SELECT 
        id,
        numero,
        descripcion,
        estado,
        fecha_registro,
        usuario_creacion,
        justificacion_rechazo,
        usuario_aprobacion,
        usuario_rechazo,
        fecha_aprobacion
    FROM Expedientes
    ORDER BY fecha_registro DESC;
END

CREATE PROCEDURE SP_RegistrarIndicio
  @expediente_id INT,
  @descripcion VARCHAR(500),
  @cantidad INT,
  @color VARCHAR(50),
  @tamano VARCHAR(100),
  @peso VARCHAR(50),
  @ubicacion VARCHAR(200),
  @tecnico VARCHAR(100)
AS
BEGIN
    INSERT INTO Indicios (
        expediente_id,
        descripcion,
        cantidad,
        color,
        tamano,
        peso,
        ubicacion,
        tecnico
    )
    VALUES (
        @expediente_id,
        @descripcion,
        @cantidad,
        @color,
        @tamano,
        @peso,
        @ubicacion,
        @tecnico
    );
END;

