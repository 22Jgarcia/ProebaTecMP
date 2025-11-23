import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from "./context/AuthContext";
import CrearExpediente from './pages/crearExpediente';
import Expedientes from './pages/Expedientes';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import DetalleExpediente from './pages/DetalleExpediente';
import Reporte from './pages/Reporte';
import ReporteDetallado from './pages/ReporteDetallado';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function RutaPrivada({ children }) {
  const { usuario } = useContext(AuthContext);
  return usuario ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        {/* Mostrar Navbar SOLO si hay usuario logueado */}
        <Navbar />

        <Routes>
          
          {/* Login */}
          <Route path="/" element={<Login />} />

          {/* Rutas protegidas */}
          <Route
            path="/expedientes"
            element={
              <RutaPrivada>
                <Expedientes />
              </RutaPrivada>
            }
          />

          <Route
            path="/expedientes/nuevo"
            element={
              <RutaPrivada>
                <CrearExpediente />
              </RutaPrivada>
            }
          />

          <Route
            path="/expedientes/:id"
            element={
              <RutaPrivada>
                <DetalleExpediente />
              </RutaPrivada>
            }
          />

          <Route
            path="/reportes"
            element={
              <RutaPrivada>
                <Reporte />
              </RutaPrivada>
            }
          />

          <Route
            path="/reportes/detallado"
            element={
              <RutaPrivada>
                <ReporteDetallado />
              </RutaPrivada>
            }
          />

          {/* Cualquier ruta desconocida → login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}
