import PropTypes from 'prop-types'

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
        } py-5 md:flex md:py-0 md:pr-10`}
      >
        <li className="text-[#FFFFFF] text-2xl py-2 px-5 md:py-0 md:hover:border-b-[1px] border-[#FF8000]">
          Inicio
        </li>
        <li className="text-[#FFFFFF] text-2xl py-2 px-5 md:py-0 md:hover:border-b-[1px] border-[#FF8000]">
          Buscar
        </li>
        <li className="text-[#FFFFFF] text-2xl py-2 px-5 md:py-0 md:hover:border-b-[1px] border-[#FF8000]">
          Perfil
        </li>
        <li className="text-[#FFFFFF] text-2xl py-2 px-5 md:py-0 md:hover:border-b-[1px] border-[#FF8000]">
          Crear Viaje
        </li>
      </ul>
    </div>
  )
}

Menu.propTypes = {
  activo: PropTypes.bool.isRequired,
}
