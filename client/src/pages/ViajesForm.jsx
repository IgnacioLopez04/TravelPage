import { useForm } from 'react-hook-form'
import { useViaje, useAuth } from '../components/hooks'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function ViajeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { crearViaje } = useViaje()
  const { autenticado } = useAuth()
  const navigate = useNavigate()
  const [tempData, setTempdata] = useState(null)

  const onSubmit = handleSubmit((data) => {
    if (!autenticado) {
      setTempdata(data)
      return navigate('/login')
    }

    crearViaje(data)
    navigate('/perfil')
  })

  useEffect(() => {
    if (autenticado && tempData) {
      crearViaje(tempData)
      setTempdata(null)
    }
  }, [crearViaje, autenticado, tempData])

  return (
    <form
      onSubmit={onSubmit}
      className="bg-[#d6d6d6] h-[calc(100vh-100px)] flex flex-col justify-center items-center px-4"
    >
      <input
        type="text"
        placeholder="Nombre del viaje"
        {...register('nombre', { require: true })}
        className="w-full my-1 px-2 py-1"
      ></input>
      {errors.nombre_viaje && (
        <p className="text-red-500 text-sm">
          El nombre del viaje es requerido.
        </p>
      )}
      <textarea
        rows="3"
        placeholder="Descripcion del viaje"
        {...register('descripcion', { required: true })}
        className="w-full my-1 px-2 py-1"
      ></textarea>
      {errors.descripcion && (
        <p className="text-red-500 text-sm">
          El viaje requiere una descripción.
        </p>
      )}
      <label htmlFor="es_publico">Público</label>
      <input
        type="checkbox"
        id="es_publico"
        {...register('es_publico')}
        className="w-full my-1 px-2 py-1"
      ></input>
      <button type="submit">Crear</button>
    </form>
  )
}
