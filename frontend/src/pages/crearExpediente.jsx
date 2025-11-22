import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CrearExpediente(){
  const [numero, setNumero]  = useState("");
  const [descripcion, setDescripcion] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    //arreglar para enviar
    await fetch("http://localhost:3000/expedientes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ numero, descripcion })
  });
    navigate("/expedientes");
  };

  return(
     <div className="p-6 max-w-xl mx-auto">
    <h2 className="text-2xl font-semibold mb-6">Crear Expediente</h2>

    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      <input
        className="p-3 border rounded w-full"
        placeholder="Número"
        value={numero}
        onChange={(e) => setNumero(e.target.value)}
        required
      />

      <textarea
        className="p-3 border rounded w-full"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />

      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Guardar
      </button>
    </form>
  </div>
  );
}