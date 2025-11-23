import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ReportButton from "../components/ReportButton";

export default function ReporteDetallado() {
  const { usuario } = useContext(AuthContext);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      const res = await fetch("http://localhost:3000/reportes/detallado", {
        headers: { rol: usuario.rol },
      });
      const data = await res.json();
      setDatos(data);
    };

    cargar();
  }, [usuario]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">
        Reporte Detallado de Expedientes
      </h2>
      {/* BOTONES DE EXPORTACIÓN */}
      <div className="flex gap-1 mt-2 flex-wrap py-3">
        <ReportButton datos={datos} nombre="Reporte Detallado" />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-max w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 font-semibold">
              <th className="p-3 border w-32">Número</th>
              <th className="p-3 border w-64">Descripción</th>
              <th className="p-3 border w-40">Estado</th>
              <th className="p-3 border w-48">Fecha Registro</th>
              <th className="p-3 border w-40">Usuario Crea</th>
              <th className="p-3 border w-64">Justificación Rechazo</th>
              <th className="p-3 border w-40">Usuario Rechazo / Aprob.</th>
              <th className="p-3 border w-48">Fecha Aprobación</th>
            </tr>
          </thead>

          <tbody>
            {datos.map((exp) => (
              <tr key={exp.id} className="hover:bg-gray-50">
                <td className="border p-2">{exp.numero}</td>

                <td className="border p-2">{exp.descripcion}</td>

                <td className="border p-2 capitalize">{exp.estado}</td>

                <td className="border p-2">
                  {exp.fecha_registro
                    ? new Date(exp.fecha_registro).toLocaleString()
                    : "—"}
                </td>

                <td className="border p-2">{exp.usuario_creacion}</td>

                <td className="border p-2 max-w-xs">
                  <div
                    className="line-clamp-2 text-ellipsis overflow-hidden"
                    title={exp.justificacion_rechazo || ""}
                  >
                    {exp.justificacion_rechazo || "—"}
                  </div>
                </td>

                <td className="border p-2">
                  {exp.estado === "rechazado"
                    ? exp.usuario_rechazo
                    : exp.estado === "aprobado"
                    ? exp.usuario_aprobacion
                    : "—"}
                </td>

                <td className="border p-2">
                  {exp.estado === "aprobado" && exp.fecha_aprobacion
                    ? new Date(exp.fecha_aprobacion).toLocaleString()
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {datos.length === 0 && (
        <p className="text-center mt-4 text-gray-500">
          No hay datos para mostrar.
        </p>
      )}
    </div>
  );
}
