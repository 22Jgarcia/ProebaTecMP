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
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Expediente {expediente.numero}</h2>

      <p className="mb-3">
        <span className="font-semibold">Descripción: </span>
        {expediente.descripcion}
      </p>

      <p className="mb-3">
        <span className="font-semibold">Estado: </span>
        <span className="uppercase">{expediente.estado}</span>
      </p>

      <p>
        <span className="font-semibold">Fecha: </span>
        {expediente.fecha_registro}
      </p>

      {rol === "coordinador" && (
        <div className="mt-6 flex gap-4">
          <button
            onClick={aprobar}
            className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Aprobar
          </button>

          <button
            onClick={rechazar}
            className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Rechazar
          </button>
        </div>
      )}

      <h3 className="text-2xl font-semibold mt-10 mb-4">Indicios</h3>

      <ul className="space-y-3">
        {indicios.length === 0 && <p>No hay indicios registrados.</p>}

        {indicios.map((i) => (
          <li key={i.id} className="p-3 border rounded">
            <strong>Descripción: </strong>{i.descripcion} <br />
            <strong>Cantidad: </strong>{i.cantidad}
          </li>
        ))}
      </ul>

      {rol === "tecnico" && (
        <form className="mt-10 p-4 border rounded" onSubmit={agregarIndicios}>
          <h4 className="text-xl font-bold mb-4">Agregar Indicio</h4>

          <input
            type="text"
            placeholder="Descripción del indicio"
            className="w-full p-2 border rounded mb-3"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />

          <input
            type="number"
            min="1"
            className="w-full p-2 border rounded mb-3"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />

          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Agregar
          </button>
        </form>
      )}
    </div>
  );
}
