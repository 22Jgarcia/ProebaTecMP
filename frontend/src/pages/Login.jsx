import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (rolSeleccionado) => {
    try {
      // Nombre que existe en tu tabla SQL
      const nombre = rolSeleccionado === "coordinador"
        ? "Coordinador"
        : "Tecnico";

      const res = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre })
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error al iniciar sesión: " + data.error);
        return;
      }

      // Guardar rol en contexto
      login(data.rol);

      // Redirigir
      navigate("/expedientes");

    } catch (error) {
      console.error(error);
      alert("Error inesperado al iniciar sesión");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">

      <h1 className="text-3xl font-bold mb-10">Sistema de Expedientes MP</h1>

      <button
        onClick={() => handleLogin("tecnico")}
        className="bg-blue-700 text-white px-6 py-3 rounded-md w-64 mb-5 hover:bg-blue-800"
      >
        Ingresar como Técnico
      </button>

      <button
        onClick={() => handleLogin("coordinador")}
        className="bg-green-700 text-white px-6 py-3 rounded-md w-64 hover:bg-green-800"
      >
        Ingresar como Coordinador
      </button>

    </div>
  );
}
