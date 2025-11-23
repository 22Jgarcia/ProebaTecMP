const { getConnection, sql } = require("../config/db");

module.exports = {
  registrarIndicio: async (req, res) => {
    const {
      expediente_id,
      descripcion,
      cantidad,
      color,
      tamano,
      peso,
      ubicacion,
    } = req.body;
    const tecnico = req.headers["usuario"];

    try {
      const pool = await getConnection();

      await pool
        .request()
        .input("expediente_id", sql.Int, expediente_id)
        .input("descripcion", sql.VarChar, descripcion)
        .input("cantidad", sql.Int, cantidad)
        .input("color", sql.VarChar, color)
        .input("tamano", sql.VarChar, tamano)
        .input("peso", sql.VarChar, peso)
        .input("ubicacion", sql.VarChar, ubicacion)
        .input("tecnico", sql.VarChar, tecnico)
        .execute("SP_RegistrarIndicio");

      res.json({ message: "Indicio registrado correctamente" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  listarIndiciosPorExpediente: async (req, res) => {
    const { id } = req.params;

    try {
      const pool = await getConnection();

      const result = await pool
        .request()
        .input("expediente_id", sql.Int, id)
        .query("SELECT * FROM Indicios WHERE expediente_id = @expediente_id");

      res.json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
