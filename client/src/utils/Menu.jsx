import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useAuth } from '../components/hooks'

export function Menu({ activo }) {
  const { autenticado, logout } = useAuth()

  return (
    <div
      className={`absolute w-full top-12 transform transition-transform ease-out duration-300 ${
        activo ? 'translate-y-1' : '-translate-y-full'
      } md:static md:translate-y-0 md:w-auto`}
    >
      <ul
        className={`bg-[#1b3358] ${
          activo ? 'flex-col' : 'hidden'
        } py-5 md:flex md:p-0 md:items-center`}
      >
        <li className="py-1 px-5">
          <Link
            to="/"
            className="text-[#FFFFFF] text-lg md:py-0 md:hover:border-b-[1px] border-[#FF8000]"
          >
            Inicio
          </Link>
        </li>
        <li className="text-[#FFFFFF] text-lg py-1 px-5 md:py-0 md:hover:border-b-[1px] border-[#FF8000]">
          Buscar
        </li>
        <li className="py-1 px-5">
          <Link
            to="/crearViaje"
            className="text-[#FFFFFF] text-lg md:py-0 md:hover:border-b-[1px] border-[#FF8000]"
          >
            Crear Viaje
          </Link>
        </li>
        {autenticado ? (
          <>
            <li className="py-1 px-5">
              <Link
                to="/perfil"
                className="text-[#FFFFFF] text-lg md:py-0 md:hover:border-b-[1px] border-[#FF8000]"
              >
                Perfil
              </Link>
            </li>
            <li className="mt-5 text-center md:m-0 md:mr-3">
              <Link
                to={'/'}
                onClick={() => {
                  logout()
                }}
                className="text-lg text-[#FF8000] py-2 px-4 bg-[#162b49] rounded-md mx-2 hover:bg-[#ff8000] hover:text-[#1b3358] md:m-0"
              >
                Cerrar Sesión
              </Link>
            </li>
          </>
        ) : (
          <div className="mt-5 mx-4 flex justify-center md:m-0">
            <li>
              <Link
                to={'/login'}
                className="text-lg text-[#FF8000] py-2 px-4 bg-[#162b49] rounded-md mx-2  hover:bg-[#ff8000] hover:text-[#1b3358]"
              >
                Iniciar Sesión
              </Link>
            </li>
            <li>
              <Link
                to={'/registro'}
                className="text-lg text-[#FF8000] py-2 px-4 bg-[#162b49] rounded-md mx-2  hover:bg-[#ff8000] hover:text-[#1b3358]"
              >
                Registrarse
              </Link>
            </li>
          </div>
        )}
      </ul>
    </div>
  )
}

Menu.propTypes = {
  activo: PropTypes.bool.isRequired,
}
