import PropTypes from 'prop-types'
import { createContext, useState, useContext, useEffect } from 'react'
import {
  loginRequest,
  registroRequest,
  verificarTokenRequest,
} from '../api/auth'
import Cookies from 'js-cookie'

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
  const [autenticado, setAutenticado] = useState(false)
  const [errors, setErrors] = useState([])
  const [carga, setCarga] = useState(true)

  const registro = async (values) => {
    try {
      const res = await registroRequest(values)
      setUsuario(res.data)
      setAutenticado(true)
    } catch (e) {
      setErrors(e.response.data)
    }
  }

  const login = async (values) => {
    try {
      const res = await loginRequest(values)
      setUsuario(res.data)
      setAutenticado(true)
    } catch (e) {
      if (Array.isArray(e.response.data)) {
        return setErrors(e.response.data)
      }
      // VER ESTO DE LOS MENSAJES DE ERROR
      setErrors([e.response.data.error.message])
    }
  }

  useEffect(() => {
    async function verificarLogin() {
      const cookies = Cookies.get()

      if (!cookies.token) {
        setAutenticado(false)
        setCarga(false)
        return setUsuario(null)
      }

      try {
        const res = await verificarTokenRequest(cookies.token)

        if (!res.data) {
          setAutenticado(false)
          setCarga(false)
          return
        }

        setAutenticado(true)
        setUsuario(res.data)
        setCarga(false)
      } catch (e) {
        setAutenticado(false)
        setUsuario(null)
        setCarga(false)
      }
    }
    verificarLogin()
  }, [])

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([])
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  return (
    <AuthContext.Provider
      value={{ registro, usuario, autenticado, errors, login, carga }}
    >
      {children}
    </AuthContext.Provider>
  )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
