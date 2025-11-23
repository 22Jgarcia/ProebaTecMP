import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logoMP from "../assets/Logo.jpg";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");

  const handleLogin = async () => {
    const res = await fetch("http://localhost:3000/usuarios/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre }),
    });

    const data = await res.json();

    if (data.error) {
      alert("Usuario no encontrado");
      return;
    }

    // GUARDAR usuario completo
    login(data.nombre, data.rol);

    navigate("/expedientes");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-xl w-full max-w-md text-center">
        <img src={logoMP} alt="MP" className="w-28 mx-auto mb-4 opacity-90" />

        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Sistema de Expedientes
        </h1>

        <input
          type="text"
          className="w-full p-3 border rounded-lg mb-5 text-lg"
          placeholder="Ingresa tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Ingresar
        </button>
      </div>
    </div>
  );
}
