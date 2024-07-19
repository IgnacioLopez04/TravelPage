import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export function Menu({ activo }) {
  return (
    <div
      className={`absolute w-full top-12 transform transition-transform ease-out duration-300 ${
        activo ? 'translate-y-1' : '-translate-y-full'
      } md:static md:translate-y-0 md:w-auto`}
    >
      <ul
        className={`bg-[#1B3358] ${
          activo ? 'flex-col' : 'hidden'
        } py-5 md:flex md:p-0`}
      >
        <li>
          <Link
            to="/"
            className="text-[#FFFFFF] text-2xl py-2 px-5 md:py-0 md:hover:border-b-[1px] border-[#FF8000]"
          >
            Inicio
          </Link>
        </li>
        <li className="text-[#FFFFFF] text-2xl py-2 px-5 md:py-0 md:hover:border-b-[1px] border-[#FF8000]">
          Buscar
        </li>
        <li>
          <Link
            to="/perfil"
            className="text-[#FFFFFF] text-2xl py-2 px-5 md:py-0 md:hover:border-b-[1px] border-[#FF8000]"
          >
            Perfil
          </Link>
        </li>
        <li>
          <Link
            to="/viaje"
            className="text-[#FFFFFF] text-2xl py-2 px-5 md:py-0 md:hover:border-b-[1px] border-[#FF8000]"
          >
            Crear Viaje
          </Link>
        </li>
      </ul>
    </div>
  )
}

Menu.propTypes = {
  activo: PropTypes.bool.isRequired,
}
