const {getConnection, sql} = require("../config/db");

module.exports = {
  listarExpedientes: async(req, res)=>{
    try{
      const pool = await getConnection();
      const result = await pool.request().execute("sp_ListarExpedientes");
      res.json(result.recordset);
    }catch(error){
      res.status(500).json({error: error.message});

    }
  },

  crearExpediente: async(req, res)=>{
    const {numero, descripcion}= req.body;
    try{
      const pool= await getConnection();
      const result = await pool
      .request()
      .input("numero", sql.VarChar, numero)
      .input("descripcion", sql.VarChar, descripcion)
      .execute("SP_RegistrarExpediente");
      res.json({id: result.recordset[0].id});      
    }catch(error){
      res.status(500).json({error: error.message});
    }
  },
  obtenerExpediente: async(req,res)=>{
    try{ 
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .execute("sp_ObtenerExpediente");
    res.json(result.recordset[0]);
    }catch(error){
      res.status(500).json({error: error.message});
    }
  },
  aprobarExpediente: async(req, res)=>{
    try{
      const pool = await getConnection();
      await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .execute("SP_AprobarExpediente");
      res.json({mensaje:"Expediente aprobado correctamente"});
    }catch(error){
      res.status(500).json({error: error.message});
    }
  },
  rechazoExpediente: async(req, res)=>{
    try{
      const pool = await getConnection();
      await pool
      .request()
      .input("id",sql.Int, req.params.id )
      .execute("SP_RechazarEpediente");
      res.json({mensaje: "Expediente rechazado correctamente"});

    }catch(error){
      res.status(500).json({error: error.message});
    }
  }

}