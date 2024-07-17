import { createContext, useState, useContext } from 'react'
import { registroRequest } from '../api/auth'

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth tiene que ser utilizado con un AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null)
  const [auntenticado, setAutenticado] = useState(false)

  const registro = async (values) => {
    try {
      const res = await registroRequest(values)
      setUsuario(res.data)
      setAutenticado(true)
    } catch (e) {
      throw new Error({ message: 'Error al crear el usuario' })
    }
  }

  return (
    <AuthContext.Provider value={{ registro, usuario, auntenticado }}>
      {children}
    </AuthContext.Provider>
  )
}
