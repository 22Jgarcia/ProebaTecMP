import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";


export default function Navbar (){
  const {rol, logout} = useContext(AuthContext);

  if(!rol) return null; // no mostrar nada si no hay rol

  return(
    <nav className="bg-gray-900 text-white px-6 py-4 flex gap-6">
      <Link to="/expedientes">Expedientes</Link>
      <Link to="/expedientes/nuevo">Nuevo Expediente</Link>
      <Link to="/reporte">Reporte</Link>

      <div className="ml-auto flex gap-4 items-center">
        <span>
          Rol: <strong>{rol}</strong> 
        </span>
        <button
        onClick={logout}
        className="px-3 py-1 bg-red-500 rounded text-while hover:bg-red-600"
        >
          Salir
        </button>
      </div>
    </nav>
  );
}