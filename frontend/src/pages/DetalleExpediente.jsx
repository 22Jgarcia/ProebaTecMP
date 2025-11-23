import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function DetalleExpediente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);
  const rol = usuario?.rol;

  const [expediente, setExpediente] = useState(null);
  const [indicios, setIndicios] = useState([]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [justificacion, setJustificacion] = useState("");

  // Campos del formulario
  const [descripcion, setDescripcion] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [color, setColor] = useState("");
  const [tamano, setTamano] = useState("");
  const [peso, setPeso] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  // ========================
  // Cargar datos
  // ========================
  const cargarDatos = async () => {
    const respExp = await fetch(`http://localhost:3000/expedientes/${id}`);
    const dataExp = await respExp.json();
    setExpediente(dataExp);

    const resInd = await fetch(
      `http://localhost:3000/expedientes/${id}/indicios`
    );
    const dataInd = await resInd.json();
    setIndicios(dataInd);
  };

  // useEffect(() => {
  //   cargarDatos();
  // }, [id]);
  useEffect(() => {
    const obtenerDatos = async () => {
      const respExp = await fetch(`http://localhost:3000/expedientes/${id}`);
      const dataExp = await respExp.json();
      setExpediente(dataExp);
      const resInd = await fetch(
        `http://localhost:3000/expedientes/${id}/indicios`
      );
      const dataInd = await resInd.json();
      setIndicios(dataInd);
    };
    obtenerDatos();
  }, [id]);

  if (!expediente) return <p className="p-4">Cargando expediente...</p>;


  // Agregar indicios (técnico)
  const agregarIndicios = async (e) => {
    e.preventDefault();

    const nuevo = {
      expediente_id: Number(id),
      descripcion,
      cantidad: Number(cantidad),
      color,
      tamano,
      peso,
      ubicacion,
    };

    await fetch("http://localhost:3000/indicios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        usuario: usuario.nombre,
        rol: usuario.rol,
      },
      body: JSON.stringify(nuevo),
    });

    await cargarDatos();

    // limpiar formulario
    setDescripcion("");
    setCantidad(1);
    setColor("");
    setTamano("");
    setPeso("");
    setUbicacion("");
  };

  // ========================
  // Aprobar / rechazar (coordinador)
  // ========================
  const aprobar = async () => {
    await fetch(`http://localhost:3000/expedientes/${id}/aprobar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        rol: usuario.rol,
        usuario: usuario.nombre,
      },
    });

    navigate("/expedientes");
  };

  const enviarRechazo = async () => {
    const res = await fetch(
      `http://localhost:3000/expedientes/${id}/rechazar`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          rol: usuario.rol,
          usuario: usuario.nombre,
        },
        body: JSON.stringify({ justificacion }),
      }
    );

    if (!res.ok) return alert("Error al rechazar expediente");

    setMostrarModal(false);
    navigate("/expedientes");
  };

  // ========================
  // UI
  // ========================
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* MODAL DE RECHAZO */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-xl w-96">
            <h3 className="text-xl font-bold mb-4">
              Justificación del rechazo
            </h3>

            <textarea
              className="w-full border rounded p-2 mb-3"
              rows="4"
              placeholder="Escribe la razón del rechazo..."
              value={justificacion}
              onChange={(e) => setJustificacion(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setMostrarModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>

              <button
                onClick={enviarRechazo}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CARD PRINCIPAL DEL EXPEDIENTE */}
      <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Expediente {expediente.numero}
        </h2>

        <div className="space-y-3 text-gray-700">
          <p>
            <span className="font-semibold">Descripción:</span>{" "}
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
            <span className="font-semibold">Fecha:</span>{" "}
            {expediente.fecha_registro}
          </p>
        </div>

        {rol === "coordinador" && (
          <div className="mt-6 flex gap-4">
            <button
              onClick={aprobar}
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:-translate-y-1 transition"
            >
              Aprobar
            </button>

            <button
              onClick={() => setMostrarModal(true)}
              className="px-5 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            >
              Rechazar
            </button>
          </div>
        )}
      </div>

      {/* ======================== */}
      {/* LISTA DE INDICIOS - DISEÑO PROFESIONAL */}
      {/* ======================== */}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Indicios Registrados
        </h3>

        {indicios.length === 0 && (
          <p className="text-gray-600">No hay indicios registrados.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {indicios.map((i) => (
            <div
              key={i.id}
              className="bg-white shadow-md border border-gray-200 rounded-xl p-5 hover:shadow-lg transition"
            >
              <h4 className="font-bold text-lg mb-2">{i.descripcion}</h4>

              <div className="space-y-1 text-gray-700 text-sm">
                <p>
                  <strong>Cantidad:</strong> {i.cantidad}
                </p>
                <p>
                  <strong>Color:</strong> {i.color || "—"}
                </p>
                <p>
                  <strong>Tamaño:</strong> {i.tamano || "—"}
                </p>
                <p>
                  <strong>Peso:</strong> {i.peso || "—"}
                </p>
                <p>
                  <strong>Ubicación:</strong> {i.ubicacion || "—"}
                </p>
                <p>
                  <strong>Técnico que registró:</strong> {i.tecnico || "—"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ======================== */}
      {/* FORMULARIO PARA TÉCNICO */}
      {/* ======================== */}
      {usuario?.rol === "tecnico" && (
        <form
          className="mt-10 p-6 border rounded-xl bg-white shadow-md space-y-4"
          onSubmit={agregarIndicios}
        >
          <h4 className="text-xl font-bold mb-3">Registrar Indicio</h4>

          <div>
            <label className="font-semibold">Descripción</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-semibold">Cantidad</label>
            <input
              type="number"
              min="1"
              className="w-full p-2 border rounded"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-semibold">Color</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-semibold">Tamaño</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={tamano}
              onChange={(e) => setTamano(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-semibold">Peso</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="font-semibold">Ubicación</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              required
            />
          </div>

          <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Agregar Indicio
          </button>
        </form>
      )}
    </div>
  );
}
