import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Login from '../src/pages/Login'
import Registro from './pages/Registro.jsx'
import Perfil from './pages/Perfil'
import Viaje from './pages/Viaje'
import { AuthProvider } from './context/authContext.jsx'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio></Inicio>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/registro" element={<Registro></Registro>}></Route>
          <Route path="/perfil" element={<Perfil></Perfil>}></Route>
          <Route path="/viaje" element={<Viaje></Viaje>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
