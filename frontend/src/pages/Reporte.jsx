import { useEffect, useState } from "react";

export default function Report(){
  const [datos, setDatos]= useState([]);

  useEffect(()=>{
    const cargarReporte = async ()=>{
      const res= await fetch("http://localhost:3000/reportes/estados");
      const data = await res.json();
      setDatos(data);
    };
    cargarReporte();
  },[]);
  
  return(
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Reporte de Expedientes por Estado</h2>
      <table className="w-full border text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border">Estado</th>
            <th className="p-3 border">Calidad</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item) =>( 
            <tr key={item.estado}> 
              <td className="p-3 border capitalize">{item.estado}</td>
              <td className="p-3 border">{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}