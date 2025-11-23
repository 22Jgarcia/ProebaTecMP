import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import logoMP from "../assets/logo.png";
export default function Navbar() {
  const { rol, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // llevar al login
  };
  if (!rol) return null;
  return (
    <nav className="bg-[#00394F] text-white shadow-lg px-6 py-3">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
        {/* IZQUIERDA: Logo + Título */}
        <div className="flex items-center gap-3">
          <img
            src={logoMP}
            alt="MP Logo"
            className="w-15 h-10 object-contain"
          />
          <span className="font-bold text-xl">Sistema MP</span>
        </div>

        {/* DERECHA: Menú + Salir */}
        <div className="flex items-center gap-6">
          <Link
            to="/expedientes"
            className={({ isActive }) =>
              `hover:text-gray-300 transition ${
                isActive ? "underline font-semibold" : ""
              }`
            }
          >
            Expedientes
          </Link>

          {rol === "coordinador" && (
            <>
              <Link
                to="/reportes"
                className={({ isActive }) =>
                  `hover:text-gray-300 transition ${
                    isActive ? "underline font-semibold" : ""
                  }`
                }
              >
                Reportes
              </Link>

              <Link
                to="/expedientes/nuevo"
                className={({ isActive }) =>
                  `hover:text-gray-300 transition ${
                    isActive ? "underline font-semibold" : ""
                  }`
                }
              >
                Nuevo Expediente
              </Link>
            </>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-semibold transition shadow"
          >
            Salir
          </button>
        </div>
      </div>
    </nav>
  );
}
