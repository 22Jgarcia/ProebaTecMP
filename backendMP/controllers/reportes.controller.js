const { getConnection, sql } = require("../config/db");

module.exports={

  listarReportes:async(req, res)=> {
    const { estado } = req.query;
    try {
      const pool = await getConnection();
      const result = await pool.request().execute("SP_ListarExpedientes");

      let data = result.recordset;

      if (estado) {
        data = data.filter(exp => exp.estado == estado);
      }
      res.json(data);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  reportePorEstado:async(req,res)=>{
    try{
      const pool = await getConnection();
      const result = await pool.request().execute("SP_ReporteExpedientesPorEstado");
      res.json(result.recordset)
    }catch(error){
      res.status(500).json({error: error.message})
    }
  }
};