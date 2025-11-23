import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Expedientes() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      const res = await fetch("http://localhost:3000/expedientes");
      const data = await res.json();
      setLista(data);
    };
    cargar();
  }, []);

  const badgeClass = (estado) => {
    switch (estado.toLowerCase()) {
      case "pendiente":
        return "bg-gray-200 text-gray-700 border-gray-300";
      case "aprobado":
        return "bg-gray-100 text-green-800 border-green-300";
      case "rechazado":
        return "bg-gray-100 text-red-800 border-red-300";
      default:
        return "bg-gray-200 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-8">
        Gestión de Expedientes
      </h2>

      {lista.length === 0 && (
        <p className="text-gray-600 text-sm">No hay expedientes registrados.</p>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lista.map((exp) => (
          <Link
            to={`/expedientes/${exp.id}`}
            key={exp.id}
            className="
              block 
              bg-white 
              border border-slate-200 
              rounded-lg 
              p-6
              shadow-sm
              transition-all 
              duration-200
              hover:shadow-xl 
              hover:-translate-y-1.5
              hover:border-slate-400
            "
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-slate-900 tracking-tight">
                EXP-{exp.id.toString().padStart(3, "0")}
              </h3>

              <span
                className={`px-2.5 py-1 text-xs font-medium rounded border ${badgeClass(
                  exp.estado
                )}`}
              >
                {exp.estado.toUpperCase()}
              </span>
            </div>
                
            {/* Descripción */}
            <p className="text-sm text-slate-700 mb-6 leading-snug line-clamp-3">
              {exp.descripcion}
            </p>

            <p className="mt-1 text-gray-600 text-sm">
              Registrado por:{" "}
              <span className="font-semibold">{exp.usuario_creacion}</span>
            </p>

            {/* Fecha */}
            <p className="text-xs text-slate-500 border-t pt-3">
              Fecha de registro:{" "}
              <span className="text-slate-700">
                {new Date(exp.fecha_registro).toLocaleString()}
              </span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
