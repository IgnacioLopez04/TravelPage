import { axiosInstance } from './axios'

export const getViajes = () => axiosInstance.get('/viaje') //Todos los viajes publicos

export const getViaje = (id) => axiosInstance.get(`/viaje/${id}`) //Buscar un viaje por su id

export const getViajesUsuario = (id) =>
  axiosInstance.get(`/viaje/usuario/${id}`) //Buscar todos los viajes de un usuario

export const postViaje = (data) => {
  axiosInstance.post('/viaje/crear', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const deleteViaje = (id) => axiosInstance.delete(`/viaje/eliminar/${id}`) //id del viaje

export const updateViaje = (id) => axiosInstance.put(`/viaje/actualizar/${id}`) //id del viaje
