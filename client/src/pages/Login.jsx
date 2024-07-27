import { useForm } from 'react-hook-form'
import { useAuth } from '../components/hooks'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const { login, errors: loginErrors, autenticado } = useAuth()

  const onSubmit = handleSubmit(async (values) => {
    login(values)
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (autenticado) navigate('/perfil')
  })

  return (
    <div className="flex h-[calc(100vh-100px)] justify-center items-center mx-4 font-poppins">
      <div className="max-w-md w-full px-10 py-8 rounded-md text-center">
        <form onSubmit={onSubmit}>
          <h1 className="text-3xl">Iniciar Sesión</h1>
          {loginErrors.map((error, i) => (
            <div
              key={i}
              className="bg-red-500 text-white px-2 py-1 rounded-md text-center"
            >
              {error}
            </div>
          ))}
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: true })}
            className="w-full mt-2 px-2 py-2 rounded-md border-2"
          ></input>
          {errors.email && (
            <p className=" text-red-500 text-sm">El email es requerido.</p>
          )}
          <input
            type="password"
            placeholder="Contraseña"
            {...register('pass', { required: true })}
            className="w-full mt-2 px-2 py-2 rounded-md border-2"
          ></input>
          {errors.pass && (
            <p className=" text-red-500 text-sm">La contraseña es requerida.</p>
          )}
          <button
            type="submit"
            className=" mb-2 mt-6 px-4 py-2 rounded-md w-full text-[#ff8000] text-xl bg-[#1b3358] hover:bg-[#ff8000] hover:text-[#1b3358]"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="flex justify-between mt-5">
          ¿No estás registrado?{' '}
          <Link to="/registro" className="text-[#FF8000] font-light">
            Registrarse
          </Link>
        </p>
      </div>
    </div>
  )
}
