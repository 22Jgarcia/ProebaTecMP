const { getConnection, sql } = require("../config/db");

module.exports = {
  
  // LISTAR TODOS
  listarExpedientes: async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().execute("SP_ListarExpedientes");
      res.json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // CREAR
  crearExpediente: async (req, res) => {
    const { numero, descripcion } = req.body;

    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input("numero", sql.VarChar, numero)
        .input("descripcion", sql.VarChar, descripcion)
        .execute("SP_RegistrarExpediente");

      res.json({ id: result.recordset[0].id });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // OBTENER POR ID
  obtenerExpediente: async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input("id", sql.Int, req.params.id)
        .execute("SP_ObtenerExpediente");

      res.json(result.recordset[0] || null);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // APROBAR
  aprobarExpediente: async (req, res) => {
    try {
      const pool = await getConnection();
      await pool.request()
        .input("id", sql.Int,req.params.id)
        .execute("SP_AprobarExpediente");

      res.json({ message: "Expediente aprobado correctamente" });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // RECHAZAR
  rechazarExpediente: async (req, res) => {
    try {
      const pool = await getConnection();
      await pool.request()
        .input("id", sql.Int,req.params.id)
        .execute("SP_RechazarExpediente");

      res.json({ message: "Expediente rechazado correctamente" });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  
  listarIndiciosPorExpediente: async (req, res) => {
    const { id } = req.params;

    try {
      const pool = await getConnection();

      const result = await pool.request()
        .input("expediente_id", sql.Int, id)
        .query(`SELECT * FROM Indicios WHERE expediente_id = @expediente_id`);

      res.json(result.recordset);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

};
