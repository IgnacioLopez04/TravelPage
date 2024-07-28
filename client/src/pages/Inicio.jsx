import { useEffect } from 'react'
import { useViaje } from '../components/hooks'
import { Carrusel } from '../utils/Carrusel'
import { Presentacion } from '../utils/Presentacon'

export default function Inicio() {
  const { viajes, obtenerViajes } = useViaje()

  useEffect(() => {
    obtenerViajes()
  }, [])

  return (
    <>
      <div className="md:flex">
        <Presentacion />
        {viajes.length > 0 ? (
          <Carrusel viajes={viajes} descripcion={true}></Carrusel>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
