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

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <div className="flex gap-4">
        <Link to="/expedientes" className="hover:underline">Expedientes</Link>

        {rol === "coordinador" && (
          <>
          <Link to="/reportes" className="hover:underline">Reportes</Link>
          <Link to="/expedientes/nuevo" className="hover:underline">Nuevo Expediente</Link>
          </>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm"
      >
        Salir
      </button>
    </nav>
  );
}
