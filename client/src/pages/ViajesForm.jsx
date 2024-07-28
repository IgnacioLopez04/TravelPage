import { useForm } from 'react-hook-form'
import { useViaje, useAuth } from '../components/hooks'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCross, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function ViajeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm()

  const { viaje, crearViaje, deleteViaje, borrarImagen, obtenerViaje } =
    useViaje()
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

  const borrarViaje = () => {
    deleteViaje(viaje[0].id)
    navigate('/perfil')
  }

  useEffect(() => {
    if (!viaje) {
      if (autenticado && tempData) {
        crearViaje(tempData)
        setTempdata(null)
      }
    } else {
      setValue('nombre', viaje[0].nombre)
      setValue('descripcion', viaje[0].descripcion)
      setValue('es_publico', viaje[0].es_publico)
    }
  }, [crearViaje, autenticado, tempData])

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="h-[calc(100vh-100px)] md:w-1/2 m-auto flex flex-col justify-center items-center px-4 font-poppins"
      >
        {viaje ? (
          <h1 className="text-4xl">
            Edita tu <span className="text-[#ff8000]">itinerario</span>!
          </h1>
        ) : (
          <h1 className="text-4xl text-center">
            Comienza a organizar tu{' '}
            <span className="text-[#ff8000]">itinerario</span>!
          </h1>
        )}
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
        {viaje ? (
          <>
            <div>
              {viaje[0].imagenes.map((img, i) => (
                <div key={i} className="relative">
                  <img src={img.imagen}></img>
                  <button
                    type="button"
                    onClick={() => {
                      borrarImagen(img.id_imagen)
                      obtenerViaje(viaje[0].id)
                    }}
                    className="absolute right-0 top-0 felx justify-center items-center m-2 px-2 text-2xl hover:bg-[rgba(173,173,173,0.6)] rounded-full"
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      className=""
                    ></FontAwesomeIcon>
                  </button>
                </div>
              ))}
            </div>
            <div className="w-full flex justify-end items-center">
              <button
                onClick={borrarViaje}
                className="px-4 py-2  m-2 rounded-md bg-[#1b3358] text-[#ff8000] hover:text-[#1b3358] hover:bg-[#ff1e00] hover:font-bold"
              >
                Eliminar
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md text-[#FF8000] bg-[#1b3358] hover:bg-[#ff8000] hover:text-[#1b3358]"
              >
                Guardar
              </button>
            </div>
          </>
        ) : (
          <button
            type="submit"
            className="w-full mt-4 py-2 px-4 border-2 rounded-md text-xl text-[#FF8000] bg-[#1b3358] hover:bg-[#ff8000] hover:text-[#1b3358]"
          >
            Crear
          </button>
        )}
      </form>
      <ToastContainer></ToastContainer>
    </>
  )
}
