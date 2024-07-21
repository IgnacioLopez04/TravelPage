import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Login from '../src/pages/Login'
import Registro from './pages/Registro.jsx'
import Perfil from './pages/Perfil'
import Viajes from './pages/Viajes'
import { AuthProvider } from './context/authContext.jsx'
import RutasProtegidas from './utils/RutasProtegidas.jsx'
import { ViajeProvider } from './context/viajeContext.jsx'
import ViajeForm from './pages/ViajesForm.jsx'
import NavMenu from './utils/NavMenu.jsx'
import Viaje from './pages/Viaje.jsx'

export default function App() {
  return (
    <AuthProvider>
      <ViajeProvider>
        <BrowserRouter>
          <NavMenu></NavMenu>
          <Routes>
            <Route path="/" element={<Inicio></Inicio>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/registro" element={<Registro></Registro>}></Route>
            <Route path="/viajes" element={<Viajes></Viajes>}></Route>
            <Route path="/crearViaje" element={<ViajeForm></ViajeForm>}></Route>

            <Route element={<RutasProtegidas></RutasProtegidas>}>
              <Route path="/perfil" element={<Perfil></Perfil>}></Route>
              <Route path="/viaje/:id" element={<Viaje></Viaje>}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ViajeProvider>
    </AuthProvider>
  )
}
