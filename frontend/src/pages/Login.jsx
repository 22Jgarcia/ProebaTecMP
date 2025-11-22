import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react";

export default function Login(){
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (rol) =>{
    login(rol);
    navigate("/expedientes");
  }

  return(
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-10">Sistema de Expedientes MP</h1>
      <button 
        onClick={()=>handleLogin("tecnico")}
        className="bg-blue-500 text-white px-6 py-3 rounded-md w-64 mb-5 hober:bg-blue-600"
      >
       Ingresar como Tecnico 
      </button>

      <button
        onClick={()=>handleLogin("tecnico")}
        className="bg-green-600 text-white px-6 py-3 rounded-md w-64 hover:bg-green-700"
      >
        Ingresar como Coordinador
      </button>
    </div>
  );
}

