import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons'

export function Carrusel() {
  const imagenes = [
    {
      nombreViaje: 'Salta',
      dias: 4,
      descripcion: 'Mucho locro y peñas',
      url: 'https://cloudfront-us-east-1.images.arcpublishing.com/infobae/6ALKAZKZDZBDLCPDYNRYMZWTZY.jpg',
      alt: 'foto salta',
      calificacion: 3,
    },
    {
      nombreViaje: 'Córdoba',
      dias: 3,
      descripcion: 'Mucho fernet, sierras y rios de aguas cristalinas',
      url: 'https://images.musement.com/cover/0084/72/san-martin-square-cordoba-cathedral-argentina-jpg_header-8371496.jpeg',
      alt: 'foto cordoba',
      calificacion: 5,
    },
    {
      nombreViaje: 'La Pampa',
      dias: 2,
      descripcion: 'No se que hay en la Pampa',
      url: 'https://hablemosdeargentina.com/wp-content/uploads/2018/03/patagonia-la-pampa.jpg',
      alt: 'foto la pampa',
      calificacion: 1,
    },
    {
      nombreViaje: 'Rio Negro',
      dias: 8,
      descripcion: 'Mucho nieve',
      url: 'https://volemos.nyc3.cdn.digitaloceanspaces.com/blog/wp-content/uploads/2020/07/09121424/Imperdibles-de-Rio-Negro.jpg',
      alt: 'foto rio negro',
      calificacion: 4,
    },
  ]

  const [imagen, setImagen] = useState([])

  function CargarImagen(i) {
    useEffect(() => {
      setImagen([imagenes[i], i])
    })
  }
  CargarImagen(0)

  function Derecha(i) {
    if (i === 3) {
      CargarImagen(0)
    } else {
      CargarImagen(i + 1)
    }
  }

  function Izquierda(i) {
    if (i === 0) {
      CargarImagen(3)
    } else {
      CargarImagen(i - 1)
    }
  }
  return (
    <div className="">
      <div className="">
        <div className="">
          <div className="">
            <div className="">
              {
                <>
                  <img
                    src={imagen[0].url}
                    alt={imagen[0].alt}
                    key={imagen[1]}
                    className=""
                  ></img>
                  <div className="">
                    <p className="">{imagen[0].nombreViaje}</p>
                    <p className="">Días: {imagen[0].dias}</p>
                    <p className="">Calificación: {imagen[0].calificacion}</p>
                    <p className="">{imagen[0].descripcion}</p>
                  </div>
                </>
              }
            </div>
          </div>
          <div className="">
            <button
              className=""
              onClick={() => {
                Derecha(imagen[1])
              }}
            >
              <FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>
            </button>
            <button
              className=""
              onClick={() => {
                Izquierda(imagen[1])
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
