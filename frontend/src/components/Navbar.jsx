import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { rol, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // llevar al login
  };
  if (!rol) return null;
  return (
     <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo / Título */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-md"></div>
          <span className="text-xl font-semibold text-gray-800">
            Sistema de Expedientes MP
          </span>
        </div>

        {/* Opciones */}
        <div className="flex items-center gap-6 text-gray-700 font-medium">
          
          <Link
            to="/expedientes"
            className="hover:text-blue-600 transition"
          >
            Expedientes
          </Link>

          {rol === "coordinador" && (
            <Link
              to="/reportes"
              className="hover:text-blue-600 transition"
            >
              Reportes
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="ml-4 px-4 py-1.5 rounded-md bg-red-600 text-white
                       hover:bg-red-700 transition shadow-sm"
          >
            Salir
          </button>
        </div>
      </div>
    </nav>
  );
}
