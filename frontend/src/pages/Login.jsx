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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900">
      <div className="backdrop-blur-md bg-white/10 p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Sistema de Expedientes MP
        </h1>
         <p className="text-gray-300 text-center mb-6">
          Selecciona tu rol para ingresar
        </p>
      <div className="flex flex-col gap-4">
      <button
        onClick={() => handleLogin("tecnico")}
        className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
      >
        Ingresar como Técnico
      </button>

      <button
        onClick={() => handleLogin("coordinador")}
        className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition-all"
      >
        Ingresar como Coordinador
      </button>

        </div>
      </div>
    </div>
  );
}
