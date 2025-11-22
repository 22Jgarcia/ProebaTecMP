import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Reporte() {
  const [datos, setDatos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarReporte = async () => {
      const rolUsuario = localStorage.getItem("rol");

      if (rolUsuario !== "coordinador") {
        navigate("/expedientes");
        return;
      }
      try {
        const res = await fetch("http://localhost:3000/reportes/estados", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            rol: rolUsuario,
          },
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
  }, [navigate]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Reporte de Expedientes por Estado
      </h2>

      <div className="bg-white border borde-gray-200 rounded-xl shadow-md p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 font-semibold text-left">
              <th className="p-3 border">Estado</th>
              <th className="p-3 border w-32">Calidad</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((item) => (
              <tr key={item.estado} className="hover:bg-gray-50 transition">
                <td className="border-b p-3 capitalize">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      item.estado === "pendiente"
                        ? "bg-yellow-100 text-yellow-700"
                        : item.estado === "aprobado"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.estado}
                  </span>
                </td>

                <td className="border-b p-3 text-gray-800 font-semibold">
                  {item.cantidad}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {datos.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No hay datos disponibles.
          </p>
        )}
      </div>
    </div>
  );
}
