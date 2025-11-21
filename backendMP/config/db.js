const sql = require("mssql");

const config = {
  server:"localhost",
  port:1440,
  user:"SA",
  password:"Jgarcia@22.",
  database:"PruebaTecnicaMP",
  options:{
    encryp: false,
    trustServerCertificate: true,
  }
};

async function getConnection(){
  try{
    const pool = await sql.connect(config);
    return pool;
  }catch(error){
    console.error("error contecntando a SQL SERVER", error);
  }
}

module.exports ={
sql, getConnection
}; 