import { useContext } from 'react'
import { ViajeContext } from '../context/viajeContext'
import { AuthContext } from '../context/authContext'

export const useViaje = () => {
  const context = useContext(ViajeContext)

  if (!context) {
    throw new Error('No existe useViaje')
  }
  return context
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth tiene que ser utilizado con un AuthProvider')
  }
  return context
}
