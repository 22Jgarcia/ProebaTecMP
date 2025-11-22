import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { AuthProvider } from "./context/AuthContext";
import CrearExpediente from './pages/crearExpediente'
import Expedientes from './pages/Expedientes'
import Navbar from './components/Navbar';
import Login from './pages/Login';


export default function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar>
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/expedientes" element={<Expedientes/>}/>
            <Route path="/expedientes/nuevo" element={<CrearExpediente />}/>
            {/* <Route path="/expedientes/:id" element={<DetalleExpediente/>}/>
            <Route path="/report" element={<Report/>}/> */}
          </Routes>
        </Navbar>
      </BrowserRouter>
    </AuthProvider>
  )
}


