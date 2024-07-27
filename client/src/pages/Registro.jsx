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
    <div className="flex h-[calc(100vh-100px)] justify-center items-center mx-4 font-poppins">
      {registroErrors.map((error, i) => (
        <div key={i} className="bg-red-500 text-white rounded-md">
          {error}
        </div>
      ))}
      <div className="max-w-md w-full px-10 py-8 rounded-md text-center">
        <form onSubmit={onSubmit}>
          <h1 className="text-3xl">Registrarse</h1>
          <input
            type="text"
            placeholder="Nombre"
            {...register('nombre', { required: true })}
            className="w-full bg-[#FFFFFF] mt-2 px-2 py-2 border-2 rounded-md"
          />
          {errors.nombre && (
            <p className="text-[red] text-sm">El nombre es requerido.</p>
          )}
          <input
            type="text"
            placeholder="Apellido"
            {...register('apellido', { required: true })}
            className="w-full bg-[#FFFFFF] mt-2 px-2 py-2 border-2 rounded-md"
          />
          {errors.apellido && (
            <p className="text-[red] text-sm">El apellido es requerido.</p>
          )}
          <input
            type="password"
            placeholder="Contraseña"
            {...register('pass', { required: true })}
            className="w-full bg-[#FFFFFF] mt-2 px-2 py-2 border-2 rounded-md"
          />
          {errors.pass && (
            <p className="text-[red] text-sm">La contraseña es requerida.</p>
          )}
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: true })}
            className="w-full bg-[#FFFFFF] mt-2 px-2 py-2 border-2 rounded-md"
          />
          {errors.email && (
            <p className="text-[red] mb-2 text-sm">El email es requerido.</p>
          )}
          <button
            type="submit"
            className=" my-2 mt-6 px-4 py-2 text-xl w-full rounded-md bg-[#1b3358] text-[#ff8000] hover:bg-[#ff8000] hover:text-[#1b3358]"
          >
            Registrar
          </button>
        </form>
        <p className="flex justify-between mt-5">
          ¿Ya estás registrado?{' '}
          <Link to="/login" className="text-[#FF8000] font-light">
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
