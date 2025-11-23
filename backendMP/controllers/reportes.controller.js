const { getConnection, sql } = require("../config/db");

module.exports={

  listarReportes:async(req, res)=> {
    const { estado } = req.query;
    try {
      const pool = await getConnection();
      const result = await pool.request().execute("SP_ReporteExpedientesPorEstado");

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
  },
  reporteFiltro: async (req, res) => {
    const { estado, fechaInicio, fechaFin } = req.query;

    try {
      const pool = await getConnection();
      const result = await pool.request()
        .input("estado", sql.VarChar, estado || null)
        .input("fechaInicio", sql.Date, fechaInicio || null)
        .input("fechaFin", sql.Date, fechaFin || null)
        .execute("SP_ReporteExpedientesFiltro");

      res.json(result.recordset);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  reporteDetallado: async (req, res) => {
      try {
          const pool = await getConnection();
          const result = await pool.request().execute("SP_ReporteDetallado");

          res.json(result.recordset);

      } catch (error) {
          res.status(500).json({ error: error.message });
      }
  }


};