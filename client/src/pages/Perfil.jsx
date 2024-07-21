import { useEffect } from 'react'
import { useAuth, useViaje } from '../components/hooks'
import Viajes from './Viajes'

export default function Perfil() {
  const { usuario } = useAuth()
  const { viajes, obtenerViajesUsuario } = useViaje()

  useEffect(() => {
    obtenerViajesUsuario(usuario.id)
  }, [usuario.id])

  return (
    <>
      <section>
        <h1 className="font-bold text-xl m-5">
          {usuario.nombre} {usuario.apellido}
        </h1>
        <p className="text-xl mx-5">{usuario.email}</p>
      </section>
      <Viajes viajes={viajes}></Viajes>
    </>
  )
}
