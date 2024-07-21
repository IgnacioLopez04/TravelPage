import { useEffect } from 'react'
import { useViaje } from '../components/hooks'
import { useParams } from 'react-router-dom'

export default function Viaje() {
  const { viajes, obtenerViaje } = useViaje()
  const params = useParams()

  useEffect(() => {
    obtenerViaje(params.id)
  }, [viajes.id])

  console.log(viajes)

  return (
    <>
      <h1>{viajes.nombre}</h1>
      <p>{viajes.descripcion}</p>
    </>
  )
}
