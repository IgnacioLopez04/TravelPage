import { useForm } from 'react-hook-form'
import { useAuth } from '../context/authContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Registro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { registro, auntenticado } = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (values) => {
    registro(values)
  })

  useEffect(() => {
    if (auntenticado) {
      navigate('/perfil')
    }
  }, [auntenticado, navigate])

  return (
    <div className="m-10 px-2 border-2">
      <form onSubmit={onSubmit} className='flex flex-col items-end"'>
        <input
          type="text"
          placeholder="Nombre"
          {...register('nombre', { required: true })}
          className="w-full bg-[#d6d6d6] mt-2 px-2 py-2"
        />
        {errors.nombre && (
          <p className="text-[red] text-sm">El nombre es requerido.</p>
        )}
        <input
          type="text"
          placeholder="Apellido"
          {...register('apellido', { required: true })}
          className="w-full bg-[#d6d6d6] mt-2 px-2 py-2"
        />
        {errors.apellido && (
          <p className="text-[red] text-sm">El apellido es requerido.</p>
        )}
        <input
          type="password"
          placeholder="Contraseña"
          {...register('pass', { required: true })}
          className="w-full bg-[#d6d6d6] mt-2 px-2 py-2"
        />
        {errors.pass && (
          <p className="text-[red] text-sm">La contraseña es requerida.</p>
        )}
        <input
          type="email"
          placeholder="Email"
          {...register('email', { required: true })}
          className="w-full bg-[#d6d6d6] mt-2 px-2 py-2"
        />
        {errors.email && (
          <p className="text-[red] mb-2 text-sm">El email es requerido.</p>
        )}
        <button
          type="submit"
          className=" mb-2 px-4 py-2 border-2 border-[#d6d6d6]"
        >
          Registrar
        </button>
      </form>
    </div>
  )
}
