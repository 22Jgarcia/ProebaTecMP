import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);
import ReportButton from "../components/ReportButton";

export default function Reporte() {
  const { usuario } = useContext(AuthContext);
  const navigate = useNavigate();

  const [estado, setEstado] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    if (!usuario) return;

    if (usuario.rol !== "coordinador") {
      navigate("/expedientes");
      return;
    }

    const cargarReporte = async () => {
      try {
        const res = await fetch("http://localhost:3000/reportes", {
          headers: { rol: usuario.rol },
        });
        const data = await res.json();
        setDatos(data);
      } catch (error) {
        console.error("Error cargando reportes:", error);
      }
    };

    cargarReporte();
  }, [usuario, navigate]);

  const cargarReporte = async () => {
    let url = "http://localhost:3000/reportes/filtro?";
    if (estado) url += `estado=${estado}&`;
    if (fechaInicio) url += `fechaInicio=${fechaInicio}&`;
    if (fechaFin) url += `fechaFin=${fechaFin}`;

    const res = await fetch(url, {
      headers: { rol: usuario.rol },
    });

    const data = await res.json();
    setDatos(data);
  };

  const limpiarFiltros = async () => {
    setEstado("");
    setFechaInicio("");
    setFechaFin("");

    const res = await fetch("http://localhost:3000/reportes", {
      headers: { rol: usuario.rol },
    });
    const data = await res.json();
    setDatos(data);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Reporte de Expedientes
      </h2>

      {/* FILTROS */}
      <div className="bg-white p-6 shadow rounded-lg mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Estado */}
        <div>
          <label className="block text-gray-700 font-semibold">Estado:</label>
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Todos</option>
            <option value="pendiente">Pendiente</option>
            <option value="aprobado">Aprobado</option>
            <option value="rechazado">Rechazado</option>
          </select>
        </div>

        {/* Fecha Inicio */}
        <div>
          <label className="block text-gray-700 font-semibold">Desde:</label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Fecha Fin */}
        <div>
          <label className="block text-gray-700 font-semibold">Hasta:</label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Botón */}
        <div className="flex gap-2 items-end">
          <button
            onClick={cargarReporte}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded shadow"
          >
            Aplicar
          </button>

           <button
          onClick={limpiarFiltros}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 rounded shadow"
        >
          Limpiar
        </button>
        </div>
      </div>

      {/* BOTONES DE EXPORTACIÓN */}
      <div className="flex gap-3 mt-6 flex-wrap py-3">
          <ReportButton datos={datos} nombre="Reporte Detallado" />
      </div>

      {/* TABLA */}
      <div className="bg-white shadow rounded-xl p-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 font-semibold text-left">
              <th className="p-3 border">Estado</th>
              <th className="p-3 border w-32">Cantidad</th>
            </tr>
          </thead>

          <tbody>
            {datos.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="border-b p-3 capitalize">{item.estado}</td>
                <td className="border-b p-3">{item.cantidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-10 flex justify-center">
          <div className="bg-white p-4 rounded-xl shadow-md w-[260px] h-[260px] flex items-center justify-center">
            <Doughnut
              data={{
                labels: datos.map((d) => d.estado),
                datasets: [
                  {
                    data: datos.map((d) => d.cantidad),
                    backgroundColor: [
                      "rgba(255, 206, 86, 0.7)",
                      "rgba(75, 192, 192, 0.7)",
                      "rgba(255, 99, 132, 0.7)",
                    ],
                    borderColor: [
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(255, 99, 132, 1)",
                    ],
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false, // esto está bien siempre que haya altura fija
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />
          </div>
        </div>
        {datos.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No hay datos disponibles.
          </p>
        )}
      </div>
    </div>
  );
}
