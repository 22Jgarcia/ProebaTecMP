const {getConnection, sql} = require("../config/db");

module.exports = {

  crearIndicio: async(req, res)=>{
    const {expediente_id, descripcion, cantidad}= req.body;
    try{
      const pool = await getConnection();
      const result = await pool
      .request()
      .input("expediente_id", sql.Int, expediente_id)
      .input("descripcion", sql.VarChar(500), descripcion)
      .input("cantidad", sql.Int, cantidad)
      .execute("sp_RegistrarIndicio");
      res.json({mensaje: "Indicio registrado correctamente"});
    }catch(error){
      res.status(500).json({error: error.message});
    }
  },
  listarIndiciosPorExpediente: async(req, res)=>{
    const {id} = req.params;
    try{
      const pool = await getConnection();
      const result = await pool
      .request()
      .input("expediente_id", sql.Int, id)
      .query(`select * from Indicios where expediente_id = @expediente_id`);

      res.json(result.recordset);
    }catch(error){
      res.status(500).json({error:error.message});
    }
  }

};