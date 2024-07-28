import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function Viajes({ viajes }) {
  return (
    <>
      <h1 className="text-3xl font-bold text-[#FF8000] mt-8 pb-3 mx-10 border-b-2 border-dotted border-[#FF8000]">
        Viajes
      </h1>
      <section className="my-10 flex flex-wrap justify-center">
        {viajes.length > 0 &&
          viajes.map((viaje, i) => (
            <Link
              to={`/viaje/${viaje.id}`}
              key={i}
              className="m-4 max-w-[20rem] min-w-[10rem] flex-grow sm:flex-none"
            >
              {viaje.imagenes && viaje.imagenes.length > 0 ? (
                <>
                  <img
                    src={viaje.imagenes[0].imagen}
                    className="rounded-md"
                  ></img>
                </>
              ) : (
                <></>
              )}
              <div className="pt-4">
                <h2 className="font-bold text-xl mb-2">{viaje.nombre}</h2>
                <p>{viaje.descripcion}</p>
              </div>
            </Link>
          ))}
      </section>
    </>
  )
}

Viajes.propTypes = {
  viajes: PropTypes.array.isRequired,
}
