import { useState } from "react";
import { useNavigate } from "react";

export default function CrearExpediente(){
  const [numero, setNumero]  = useState("");
  const [descripcion, setDescripcion] = useState("");
  const navigate = useNavigate();

  const hadleSumit = async(e)=>{
    e.preventDefault();

    await fetch("http://localhos:3000/expedientes", { 
      method: "POST",
      headers: {"content-Type": "application/json"},
      body: JSON.stringify({numero, descripcion})
    });
    navigate("/expedientes");
  };

  return(
    <div className="p-6 max-w-xl mx-aut">
      <h2 className="text-2xl font-semibold mb-6">Crear Expediente</h2>

      <form onSubmit={hadleSumit}>
        <input
          className="p-3 border rounded" 
          placeholder="Numero" 
          value={numero}
          onChange={(e)=> setNumero(e.target.value)}
          required
        />
        
        <textarea 
          className="p-3 border rounded"
          placeholder="Descripcion"
          value={descripcion}
          onChange={(e)=> setDescripcion(e.target.value)}
          required
        />

        
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Guardar
        </button>
      </form>
    </div>
  );
}