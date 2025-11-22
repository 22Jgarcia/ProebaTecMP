import { useEffect, useState } from "react";


export default function Expedientes(){
  const [expedientes, setExpedientes]= useState([]);

  useEffect (()=>{
    const cargaExpedientes= async () =>{

      const res = await fetch("http://localhost:3000/expedientes");
      const data = await res.json();
      setExpedientes(data); 
    };
    cargaExpedientes();

  },[]);

  return(
    <div className="p-6">

      <h2 className="tex-2xl font-semibold mb-6">Lista de Expedientes</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {expedientes.map((exp)=>( 
        <Link
        key={exp.id}
        to={`/expedientes/${exp.id}`}
        className="p-4 border rounded shadow hover:bg-gray-50 transition"
        >
        <h3 className="text-xl font-bold">{exp.numero}</h3>
        <p>{exp.descripcion}</p>
        <p className="mt-2">
          <span className="font-semibold">Estado: </span>
          {exp.estado}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Fecha: {exp.fecha_registro}
        </p>
        </Link>
      ))}
      </div>
    </div>
  );
}

