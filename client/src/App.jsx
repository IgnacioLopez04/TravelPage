import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Login from '../src/pages/Login'
import Registro from './pages/Registro.jsx'
import Perfil from './pages/Perfil'
import Viaje from './pages/Viaje'
import { AuthProvider } from './context/authContext.jsx'
import RutasProtegidas from './utils/RutasProtegidas.jsx'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio></Inicio>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/registro" element={<Registro></Registro>}></Route>
          <Route path="/viaje" element={<Viaje></Viaje>}></Route>

          <Route element={<RutasProtegidas></RutasProtegidas>}>
            <Route path="/perfil" element={<Perfil></Perfil>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
