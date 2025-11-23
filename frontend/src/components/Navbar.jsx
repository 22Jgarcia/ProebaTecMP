import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import logoMP from "../assets/logo.png";
export default function Navbar() {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // llevar al login
  };
  if (usuario === null) return null;

  return (
    <nav className="bg-[#00394F] text-white shadow-lg px-6 py-3">
      <div className="max-w-7xl mx-auto h-16 flex items-center justify-between">
        {/* IZQUIERDA */}
        <div className="flex items-center gap-3">
          <img
            src={logoMP}
            alt="MP Logo"
            className="w-24 h-12 object-contain"
          />
          <span className="font-bold text-xl tracking-wide">
            SISTEMA EXPEDIENTES
          </span>
        </div>

        {/* DERECHA */}
        <div className="flex items-center gap-4">
          {/* Ítems de menú base */}
          <NavLink
            to="/expedientes"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition ${
                isActive ? "bg-white/20 font-semibold" : "hover:bg-white/10"
              }`
            }
          >
            Expedientes
          </NavLink>

          {usuario?.rol === "coordinador" && (
            <>
              <NavLink
                to="/reportes"
                end
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition ${
                    isActive ? "bg-white/20 font-semibold" : "hover:bg-white/10"
                  }`
                }
              >
                Reportes
              </NavLink>

              <NavLink
                to="/expedientes/nuevo"
                end
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition ${
                    isActive ? "bg-white/20 font-semibold" : "hover:bg-white/10"
                  }`
                }
              >
                Nuevo Expediente
              </NavLink>

              <NavLink
                to="/reportes/detallado"
                end
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg transition ${
                    isActive ? "bg-white/20 font-semibold" : "hover:bg-white/10"
                  }`
                }
              >
                Reporte Detallado
              </NavLink>
            </>
          )}

          {/* BOTÓN SALIR */}
          <button
            onClick={handleLogout}
            className="ml-3 bg-red-600 hover:bg-red-700 px-4 py-2 
          rounded-lg font-semibold transition shadow-md hover:shadow-lg"
          >
            Salir
          </button>
        </div>
      </div>
    </nav>
  );
}
