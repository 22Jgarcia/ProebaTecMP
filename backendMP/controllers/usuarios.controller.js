const { getConnection, sql } = require("../config/db");

module.exports={

  listarUsuarios:async(req,res)=>{
    try{
      const pool= await getConnection();
      const result = await pool
      .request()
      .query("SELECT * FROM Usuarios");
      res.json(result.recordset);
    }catch(error){
      res.status(500).json({error: error.message});
    }
  },
  login: async (req, res) => {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).json({ error: "nombre is not defined" });
    }

    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input("nombre", sql.VarChar, nombre)
        .query("SELECT * FROM Usuarios WHERE nombre = @nombre");

      if (result.recordset.length === 0) {
        return res.status(401).json({ error: "Usuario no encontrado" });
      }

      const user = result.recordset[0];

      res.json({
        id: user.id,
        nombre: user.nombre,
        rol: user.rol
      });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

};

