import { useForm } from 'react-hook-form'
import { useAuth } from '../components/hooks'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Registro() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { registro, autenticado, errors: registroErrors } = useAuth()
  const navigate = useNavigate()

  const onSubmit = handleSubmit(async (values) => {
    registro(values)
  })

  useEffect(() => {
    if (autenticado) {
      navigate('/perfil')
    }
  }, [autenticado, navigate])

  return (
    <div className="flex h-[calc(100vh-100px)] justify-center items-center">
      {registroErrors.map((error, i) => (
        <div key={i} className="bg-red-500 text-white">
          {error}
        </div>
      ))}
      <div className="bg-[#d6d6d6] max-w-md w-full px-10 py-8 rounded-md">
        <form onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold">Registrarse</h1>
          <input
            type="text"
            placeholder="Nombre"
            {...register('nombre', { required: true })}
            className="w-full bg-[#FFFFFF] mt-2 px-2 py-2"
          />
          {errors.nombre && (
            <p className="text-[red] text-sm">El nombre es requerido.</p>
          )}
          <input
            type="text"
            placeholder="Apellido"
            {...register('apellido', { required: true })}
            className="w-full bg-[#FFFFFF] mt-2 px-2 py-2"
          />
          {errors.apellido && (
            <p className="text-[red] text-sm">El apellido es requerido.</p>
          )}
          <input
            type="password"
            placeholder="Contraseña"
            {...register('pass', { required: true })}
            className="w-full bg-[#FFFFFF] mt-2 px-2 py-2"
          />
          {errors.pass && (
            <p className="text-[red] text-sm">La contraseña es requerida.</p>
          )}
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: true })}
            className="w-full bg-[#FFFFFF] mt-2 px-2 py-2"
          />
          {errors.email && (
            <p className="text-[red] mb-2 text-sm">El email es requerido.</p>
          )}
          <button type="submit" className=" my-2 px-4 py-2 bg-[#FFFFFF]">
            Registrar
          </button>
        </form>
        <p className="flex justify-between">
          ¿Ya estas registrado?{' '}
          <Link to="/login" className="text-[#FF8000]">
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
