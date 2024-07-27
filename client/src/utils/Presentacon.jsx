import { Link } from 'react-router-dom'

export function Presentacion() {
  return (
    <section className="flex-col md:w-1/2 xl:w-3/4">
      <h1 className="text-center text-3xl pt-3">
        Crea tu propio
        <button className="text-[#FF8000] text-3xl p-2 hover:bg-[rgba(255,125,0,0.2)] rounded-md">
          <Link to="/crearViaje">itenerario</Link>
        </button>
        !
      </h1>
      <div className="w-3/4 h-2 border-b-2 border-dotted border-[#FF8000] mx-auto my-2"></div>
      <p className="text-center mx-4 py-3 text-xl">
        Los tres viajeros es un sitio destinado a aventureros entusiastas que
        buscan crear un itinerario de viajes, indicando que destinos visitar en
        cada día.
        <br />
        Además, podrán compartir dicho itinerario con el resto de la comunidad o
        de manera privada con su grupo.
        <br />
        Pero no tan solo eso, sino que también tiene piensa en aquellos que no
        saben qué hacer o qué destinos pueden ser mejores para su viaje,
        entonces pueden ir a la sección de busqueda a tomar ideas de los demás
        viajeros.
      </p>
      {/* <Carrusel></Carrusel> */}
    </section>
  )
}
