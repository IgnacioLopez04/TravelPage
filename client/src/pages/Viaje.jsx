import { useEffect } from 'react'
import { useViaje } from '../components/hooks'
import { useParams } from 'react-router-dom'
import { Carrusel } from '../utils/Carrusel'

export default function Viaje() {
  const { viaje, obtenerViaje } = useViaje()
  const params = useParams()

  useEffect(() => {
    obtenerViaje(params.id)
  }, [params.id])

  return (
    <>
      <article className="flex">
        <section className="flex flex-col m-4 w-1/2">
          <h1 className="text-3xl">
            <span className="font-bold">Viaje: </span>
            {viaje[0].nombre}
          </h1>
          <h2 className="text-3xl font-bold">Descripción: </h2>
          <p className="text-2xl">{viaje[0].descripcion}</p>
        </section>
        <section className="relative flex ml-2 m-2">
          <div className="relative flex flex-col flex-nowrap justify-center overflow-hidden">
            {viaje ? (
              <Carrusel viajes={viaje} descripcion={false}></Carrusel>
            ) : (
              <></>
            )}
          </div>
        </section>
      </article>
      <div className="my-5 border-b-2 border-dotted border-[#ff8000] w-3/4 mx-auto"></div>
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-[#FF8000] m-2 rounded-md text-[#1b3358] hover:text-[#ff8000] hover:bg-[#1b3358]">
          Editar
        </button>
        <button className="px-4 py-2 bg-[#ff1e00] m-2 rounded-md text-[#1b3358] hover:text-[#ff8000] hover:bg-[#1b3358]">
          Eliminar
        </button>
      </div>
    </>
  )
}
