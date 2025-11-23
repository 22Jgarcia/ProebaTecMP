import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function CrearExpediente() {
  const { rol } = useContext(AuthContext);
  const navigate = useNavigate();

  const [numero, setNumero] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [showModal, setShowModal] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const cargaUltimo = async () => {
      const res = await fetch("http://localhost:3000/expedientes");
      const data = await res.json();

      if (data.length === 0) {
        setNumero("EXP-001");
        return;
      }
      const ult = data[data.length - 1].numero;
      const num = parseInt(ult.split("-")[1]);
      const nuevo = `EXP-${String(num + 1).padStart(3, "0")}`;
      setNumero(nuevo);
    };

    cargaUltimo();
  }, []);
  const validarFormato = (valor) => {
    const regex = /^EXP-\d{3}$/;
    return regex.test(valor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormato(numero)) {
      alert("El número debe tener formato EXP-000");
      return;
    }
    setShowModal(true);
  };

  const confirmarCreacion = async () => {
    await fetch("http://localhost:3000/expedientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        rol: rol,
      },
      body: JSON.stringify({ numero, descripcion }),
    });

    setShowModal(false);
    setSuccess(true);

    setTimeout(() => {
      navigate("/expedientes");
    }, 1500);
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   //arreglar para enviar
  //   await fetch("http://localhost:3000/expedientes", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json", rol: rol },
  //     body: JSON.stringify({ numero, descripcion }),
  //   });
  //   navigate("/expedientes");
  // };

   return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Crear Expediente
        </h2>

        {/* Éxito */}
        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
            Expediente creado correctamente
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Número */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Número del Expediente
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 
              focus:ring-blue-400 focus:border-blue-400 outline-none"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Descripción
            </label>
            <textarea
              className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 
              focus:ring-blue-400 focus:border-blue-400 outline-none resize-none"
              rows="4"
              placeholder="Descripción del expediente"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 
            rounded-lg shadow-md transform hover:-translate-y-1 transition-all"
          >
            Guardar
          </button>
        </form>
      </div>

      {/* MODAL DE CONFIRMACIÓN */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center">

            <h3 className="text-xl font-bold mb-4">Confirmar creación</h3>
            <p className="mb-6 text-gray-700">
              ¿Desea crear el expediente <strong>{numero}</strong>?
            </p>

            <div className="flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancelar
              </button>

              <button
                onClick={confirmarCreacion}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}