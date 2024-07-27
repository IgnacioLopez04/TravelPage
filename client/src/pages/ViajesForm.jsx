import { useForm } from 'react-hook-form'
import { useViaje, useAuth } from '../components/hooks'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

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
    <>
      <form
        onSubmit={onSubmit}
        className="h-[calc(100vh-100px)] md:w-1/2 m-auto flex flex-col justify-center items-center px-4 font-poppins"
      >
        <h1 className="text-4xl text-center">
          Comienza a organizar tu{' '}
          <span className="text-[#ff8000]">itinerario</span>!
        </h1>
        <div className=" w-full border-b-2 border-dotted border-[#ff8000] my-4"></div>
        <input
          type="text"
          placeholder="Nombre del viaje"
          {...register('nombre', { require: true })}
          className="w-full my-1 px-2 py-1 border-2 rounded-md text-xl"
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
          className="w-full my-1 px-2 py-1 border-2 rounded-md text-xl"
        ></textarea>
        {errors.descripcion && (
          <p className="text-red-500 text-sm">
            El viaje requiere una descripción.
          </p>
        )}
        <div className="flex justify-start w-full text-xl my-2">
          <label htmlFor="es_publico">¿Deseas que sea público?</label>
          <input
            type="checkbox"
            id="es_publico"
            {...register('es_publico')}
            className="my-1 px-2 py-1 mx-4"
          ></input>
        </div>
        <div className="flex justify-start items-center w-full">
          <label className="text-xl">Carga tus imagenes!</label>
          <input
            type="file"
            multiple
            accept="image/*"
            {...register('imagenes')}
            className="my-2 mx-4"
          ></input>
        </div>
        <button
          type="submit"
          className="w-full mt-4 py-2 px-4 border-2 rounded-md text-xl text-[#FF8000] bg-[#1b3358] hover:bg-[#ff8000] hover:text-[#1b3358]"
        >
          Crear
        </button>
      </form>
      <ToastContainer></ToastContainer>
    </>
  )
}
