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
      <ul className={`${activo ? 'flex-col' : 'hidden'} py-5 md:flex md:p-0`}>
        <li>
          <Link
            to="/"
            className="text-[#FFFFFF] text-lg py-2 px-5 md:py-0 md:hover:border-b-[1px] border-[#FF8000]"
          >
            Inicio
          </Link>
        </li>
        <li className="text-[#FFFFFF] text-lg py-2 px-5 md:py-0 md:hover:border-b-[1px] border-[#FF8000]">
          Buscar
        </li>
        <li>
          <Link
            to="/crearViaje"
            className="text-[#FFFFFF] text-lg py-2 px-5 md:py-0 md:hover:border-b-[1px] border-[#FF8000]"
          >
            Crear Viaje
          </Link>
        </li>
        {autenticado ? (
          <>
            <li>
              <Link
                to="/perfil"
                className="text-[#FFFFFF] text-lg py-2 px-5 md:py-0 md:hover:border-b-[1px] border-[#FF8000]"
              >
                Perfil
              </Link>
            </li>
            <li>
              <Link
                to={'/'}
                onClick={() => {
                  logout()
                }}
                className="text-lg text-[#FF8000] py-2 px-4 bg-[#162b49] rounded-md mx-2"
              >
                Cerrar Sesión
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to={'/login'}
                className="text-lg text-[#FF8000] py-2 px-4 bg-[#162b49] rounded-md mx-2"
              >
                Iniciar Sesión
              </Link>
            </li>
            <li>
              <Link
                to={'/registro'}
                className="text-lg text-[#FF8000] py-2 px-4 bg-[#162b49] rounded-md mx-2"
              >
                Registrarse
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}

Menu.propTypes = {
  activo: PropTypes.bool.isRequired,
}
