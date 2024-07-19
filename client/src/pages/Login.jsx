import { useForm } from 'react-hook-form'
import { useAuth } from '../context/authContext'
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
    <div className="flex h-[calc(100vh)] justify-center items-center">
      <div className="bg-[#d6d6d6] max-w-md w-full px-10 py-8 rounded-md">
        <form onSubmit={onSubmit}>
          <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
          {loginErrors.map((error, i) => (
            <div key={i} className="bg-red-500 text-white px-2 py-1">
              {error}
            </div>
          ))}
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: true })}
            className="w-full bg-[#FFFFFF] mt-2 px-2 py-2"
          ></input>
          {errors.email && (
            <p className=" text-red-500 text-sm">El email es requerido.</p>
          )}
          <input
            type="password"
            placeholder="Contraseña"
            {...register('pass', { required: true })}
            className="w-full bg-[#FFFFFF] mt-2 px-2 py-2"
          ></input>
          {errors.pass && (
            <p className=" text-red-500 text-sm">La contraseña es requerida.</p>
          )}
          <button type="submit" className=" mb-2 mt-2 px-4 py-2  bg-[#FFFFFF]">
            Iniciar Sesión
          </button>
        </form>
        <p className="flex justify-between">
          ¿No estas registrado?{' '}
          <Link to="/registro" className="text-[#FF8000]">
            Registrarse
          </Link>
        </p>
      </div>
    </div>
  )
}
