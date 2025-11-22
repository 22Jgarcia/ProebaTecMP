import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function DetalleExpediente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rol } = useContext(AuthContext);

  const [expediente, setExpediente] = useState(null);
  const [indicios, setIndicios] = useState([]);

  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState(1);

  const cargarDatos = async () => {
    const respExp = await fetch(`http://localhost:3000/expedientes/${id}`);
    const dataExp = await respExp.json();
    setExpediente(dataExp);

    const resInd = await fetch(`http://localhost:3000/expedientes/${id}/indicios`);
    const dataInd = await resInd.json();
    setIndicios(dataInd);
  };

  useEffect(() => {
     const obtenerDatos = async () => {
      const respExp = await fetch(`http://localhost:3000/expedientes/${id}`);
      const dataExp = await respExp.json();
      setExpediente(dataExp);

      const resInd = await fetch(`http://localhost:3000/expedientes/${id}/indicios`);
      const dataInd = await resInd.json();
      setIndicios(dataInd);
    };

    obtenerDatos();
  }, [id]);

  if (!expediente) return <p className="p-4">Cargando expediente...</p>;

  const agregarIndicios = async (e) => {
    e.preventDefault();

    const nuevo = {
      expediente_id: Number(id),
      descripcion,
      cantidad: Number(cantidad),
    };

    await fetch(`http://localhost:3000/indicios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo),
    });

    await cargarDatos();
    setDescripcion("");
    setCantidad(1);
  };

  const aprobar = async () => {
    await fetch(`http://localhost:3000/expedientes/${id}/aprobar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        rol: rol
      }
    });

    navigate("/expedientes");
  };

  const rechazar = async () => {
    await fetch(`http://localhost:3000/expedientes/${id}/rechazar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        rol: rol
      }
    });

    navigate("/expedientes");
  };

  return (
<div className="p-6 max-w-4xl mx-auto">

      {/* CARD PRINCIPAL */}
      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Expediente {expediente.numero}
        </h2>

        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Descripción: </span>
            {expediente.descripcion}
          </p>

          <p>
            <span className="font-semibold">Estado: </span>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                expediente.estado === "pendiente"
                  ? "bg-yellow-100 text-yellow-700"
                  : expediente.estado === "aprobado"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {expediente.estado.toUpperCase()}
            </span>
          </p>

          <p>
            <span className="font-semibold">Fecha: </span>
            {expediente.fecha_registro}
          </p>
        </div>

        {/* BOTONES COORDINADOR */}
        {rol === "coordinador" && (
          <div className="mt-6 flex gap-4">
            <button
              onClick={aprobar}
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:-translate-y-1 transition"
            >
              Aprobar
            </button>

            <button
              onClick={rechazar}
              className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:-translate-y-1 transition"
            >
              Rechazar
            </button>
          </div>
        )}
      </div>

      {/* LISTA DE INDICIOS */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Indicios Registrados
        </h3>

        {indicios.length === 0 && (
          <p className="text-gray-600">No hay indicios registrados.</p>
        )}

        <div className="space-y-4">
          {indicios.map((i) => (
            <div
              key={i.id}
              className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition"
            >
              <p>
                <strong>Descripción: </strong> {i.descripcion}
              </p>
              <p>
                <strong>Cantidad: </strong> {i.cantidad}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* FORMULARIO TÉCNICO */}
      {rol === "tecnico" && (
        <form
          className="mt-10 p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
          onSubmit={agregarIndicios}
        >
          <h4 className="text-xl font-bold mb-4 text-gray-800">
            Agregar nuevo indicio
          </h4>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Descripción del indicio"
              className="w-full p-2 border rounded-md"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />

            <input
              type="number"
              min="1"
              className="w-full p-2 border rounded-md"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
            />

            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:-translate-y-1 transition">
              Agregar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
