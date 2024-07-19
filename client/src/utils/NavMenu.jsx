import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { Menu } from './Menu'
import { Link } from 'react-router-dom'

export default function NavMenu() {
  const [activo, setActivo] = useState(false)

  function DesplegarMenu() {
    setActivo(!activo)
  }

  return (
    <>
      <nav className="bg-[#1B3358] h-14 flex items-center justify-between">
        <h1 className="text-[#FFFFFF] text-3xl ml-5 md:ml-10">
          <Link to="/">
            LosTres<span className="text-[#FF8000]">Viajeros</span>
          </Link>
        </h1>
        <button onClick={DesplegarMenu} className="md:hidden">
          <FontAwesomeIcon
            icon={faBars}
            className={`mr-5 text-3xl text-[#FF8000] transform transition-transform duration-300 ${
              activo ? 'rotate-90' : ''
            }`}
          ></FontAwesomeIcon>
        </button>
        <Menu activo={activo}></Menu>
        <Link
          to="/Login"
          className="px-4 py-2 mx-2 rounded-md text-[#FF8000] hover:bg-[#162a47]"
        >
          Iniciar Sesión
        </Link>
      </nav>
    </>
  )
}
