import { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { postViaje, getViajes, getViajesUsuario, getViaje } from '../api/viajes'

export const ViajeContext = createContext()

export function ViajeProvider({ children }) {
  const [viajes, setViajes] = useState([])
  const [viaje, setViaje] = useState([])

  const crearViaje = async (viaje) => {
    try {
      await postViaje(viaje)
      setViajes(viaje)
    } catch (e) {
      throw new Error('Error al crear el viaje.')
    }
  }

  const obtenerViaje = async (id) => {
    try {
      const res = await getViaje(id)
      setViaje(res.data)
    } catch (e) {
      throw new Error('No se pudo obtener el viaje')
    }
  }

  const obtenerViajes = async () => {
    try {
      const res = await getViajes()
      setViajes(res.data)
    } catch (e) {
      throw new Error('No se pudo obtener los viajes')
    }
  }

  const obtenerViajesUsuario = async (id) => {
    try {
      const res = await getViajesUsuario(id)
      setViajes(res.data)
    } catch (e) {
      throw new Error('No se pudo obtener los viajes')
    }
  }

  return (
    <ViajeContext.Provider
      value={{
        viaje,
        viajes,
        crearViaje,
        obtenerViajes,
        obtenerViajesUsuario,
        obtenerViaje,
      }}
    >
      {children}
    </ViajeContext.Provider>
  )
}

ViajeProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
