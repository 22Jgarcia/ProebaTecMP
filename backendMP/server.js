const express = require ('express');
const cors = require('cors');


const expedientesRoutes = require("./routes/expedientes.routes");
const indiciosRoutes = require("./routes/indicios.routes");
const usuariosRoutes = require("./routes/usuarios.routes");
const reportesRoutes = require("./routes/reportes.routes");

const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//rutes
app.use("/expedientes", expedientesRoutes);
app.use("/indicios", indiciosRoutes);
app.use("/usuarios", usuariosRoutes );
app.use("/reportes", reportesRoutes);

const PORT = 3000;
app.listen(PORT, ()=>{
  console.log(`Ejecutandose en http://localhost:${PORT}`);
});

