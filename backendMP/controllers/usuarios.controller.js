const { getConnection, sql } = require("../config/db")

module.exports={

  listarUsuarios:async(req,res)=>{
    try{
      const pool= await getConnection();
      const result = await pool
      .request()
      .query("selec * from Usuarios");
      res.json(result.recordset);
    }catch(error){
      res.status(500).json({error: error.message});
    }
  },
  login:async(req, res)=>{
    try{
      const pool = await getConnection();
      const result = await pool
      .request()
      .input("nombre", sql.Varchar, nombre)
      .query("select * from Usuarios where nombre = @nombre");

      if(result.recordset.length === 0){
        return res.status(400).json({error:"usuario no encontrado"});
      }

      const user = result.recordset[0];
  
      res.json({
  
        id:user.id,
        nombre: user.nombre,
        rol:user.rol
        
      });
    }catch(error){
      res.status(500).json({error:error.message});
    }
  },
  listarRoles:async(req,res)=>{
    res.json(["coordinador", "tecnico"])
  }
};

