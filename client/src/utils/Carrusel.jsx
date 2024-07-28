import { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'

export function Carrusel({ viajes, descripcion }) {
  const [index, setIndex] = useState(0)

  const Derecha = () => {
    index >= 4 ? setIndex(0) : setIndex(index + 1)
  }

  const Izquierda = () => {
    index <= 0 ? setIndex(4) : setIndex(index - 1)
  }

  console.log(viajes[0].imagenes)

  return (
    <>
      {viajes && viajes[0].imagenes.length > 0 ? (
        <div className="w-full px-5 my-5 ">
          <div className="overflow-hidden relative rounded-md">
            <div
              className="flex items-center transition ease-in-out duration-50"
              style={{
                width: `${viajes.length * 100}%`,
                transform: `translateX(-${index * 20}%)`,
              }}
            >
              {viajes.map((viaje, i) => (
                <div key={i} className="relative w-full">
                  <img
                    src={viaje.imagenes[0].imagen}
                    key={i}
                    className="object-cover aspect-16/9"
                  ></img>
                  {descripcion ? (
                    <div className="absolute z-10 bottom-0 text-xl pb-4 text-[#ffffff] bg-gradient-to-t from-black  to-transparent w-full">
                      <p className="px-5 font-bold">{viaje.nombre}</p>
                      <p className="px-5">{viaje.descripcion}</p>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>
            {viajes[0].imagenes.length > 1 ? (
              <div className="absolute top-0 h-full w-full justify-between items-center flex text-[#ff8000] px-1 md:text-5xl">
                <button className="" onClick={Izquierda}>
                  <FontAwesomeIcon
                    icon={faChevronLeft}
                    className="hover:text-[#1b3358] hover:bg-[rgba(255,128,0,0.4)] w-6 h-6 md:w-10 md:h-10 rounded-full p-3"
                  ></FontAwesomeIcon>
                </button>
                <button className="" onClick={Derecha}>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="hover:text-[#1b3358] hover:bg-[rgba(255,128,0,0.4)] w-6 h-6 md:w-10 md:h-10 rounded-full p-3"
                  ></FontAwesomeIcon>
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

Carrusel.propTypes = {
  viajes: PropTypes.array.isRequired,
  descripcion: PropTypes.bool.isRequired,
}
