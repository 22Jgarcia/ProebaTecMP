CREATE DATABASE PruebaTecnicaMP;
GO

USE PruebaTecnicaMP;
GO

-- Usuarios
CREATE TABLE Usuarios (
    id INT IDENTITY PRIMARY KEY,
    nombre VARCHAR(100),
    rol VARCHAR(20)
);
GO

INSERT INTO Usuarios (nombre, rol) VALUES
('Coordinador', 'coordinador'),
('Tecnico', 'tecnico');
GO

-- Expedientes
CREATE TABLE Expedientes (
    id INT IDENTITY PRIMARY KEY,
    numero VARCHAR(50),
    descripcion VARCHAR(500),
    estado VARCHAR(20) DEFAULT 'pendiente',
    fecha_registro DATETIME DEFAULT GETDATE()
);
GO

-- Indicios
CREATE TABLE Indicios (
    id INT IDENTITY PRIMARY KEY,
    expediente_id INT,
    descripcion VARCHAR(500),
    cantidad INT,
    FOREIGN KEY (expediente_id) REFERENCES Expedientes(id)
);
GO

-- SP Registrar Expediente
CREATE PROCEDURE SP_RegistrarExpediente
    @numero VARCHAR(50),
    @descripcion VARCHAR(500)
AS
BEGIN
    INSERT INTO Expedientes (numero, descripcion)
    VALUES (@numero, @descripcion);

    SELECT SCOPE_IDENTITY() AS id;
END;
GO

-- SP Registrar Indicio
CREATE PROCEDURE SP_RegistrarIndicio
    @expediente_id INT,
    @descripcion VARCHAR(500),
    @cantidad INT
AS
BEGIN
    INSERT INTO Indicios (expediente_id, descripcion, cantidad)
    VALUES (@expediente_id, @descripcion, @cantidad);
END;
GO

-- SP Listar Expedientes
CREATE PROCEDURE SP_ListarExpedientes
AS
BEGIN
    SELECT * FROM Expedientes ORDER BY fecha_registro DESC;
END;
GO

-- SP Obtener Expediente
CREATE PROCEDURE SP_ObtenerExpediente
    @id INT
AS
BEGIN
    SELECT * FROM Expedientes WHERE id = @id;
END;
GO

-- SP Aprobar Expediente
CREATE PROCEDURE SP_AprobarExpediente
    @id INT
AS
BEGIN
    UPDATE Expedientes
    SET estado = 'aprobado'
    WHERE id = @id;
END;
GO

-- SP Rechazar Expediente
CREATE PROCEDURE SP_RechazarExpediente
    @id INT
AS
BEGIN
    UPDATE Expedientes
    SET estado = 'rechazado'
    WHERE id = @id;
END;
GO

-- SP Reporte
CREATE PROCEDURE SP_ReporteExpedientes
    @estado VARCHAR(20)
AS
BEGIN
    SELECT * FROM Expedientes WHERE estado = @estado;
END;
GO
