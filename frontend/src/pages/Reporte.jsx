import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Reporte(){
  const [datos, setDatos]= useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const cargarReporte = async ()=>{
      const rolUsuario = localStorage.getItem("rol");

      if (rolUsuario !== "coordinador") {
      navigate("/expedientes"); 
      return;
    }
      try{ 
        const res = await fetch("http://localhost:3000/reportes/estados", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "rol": rolUsuario 
          }
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const data = await res.json();
        setDatos(data);

      } catch (error) {
        console.error("Error cargando reportes:", error);
      }
    };
    cargarReporte();
  },[navigate]);

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
          {Array.isArray(datos) && datos.map((item) =>( 
            <tr key={item.estado}> 
              <td className="p-3 border capitalize">{item.estado}</td>
              <td className="p-3 border">{item.cantidad}</td> 
              {/* Asegúrate que tu SP devuelva la columna 'total', a veces devuelven 'Count' */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}