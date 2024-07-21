import { useAuth } from '../components/hooks'
import { Navigate, Outlet } from 'react-router-dom'

export default function RutasProtegidas() {
  const { carga, autenticado } = useAuth()

  if (carga) return <h1>Cargando...</h1>
  if (!carga && !autenticado) return <Navigate to="/login" replace></Navigate>

  //Continua con la pagina que debia renderizar
  return <Outlet></Outlet>
}
