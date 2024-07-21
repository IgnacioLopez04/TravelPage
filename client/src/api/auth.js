import { axiosInstance } from './axios'

export const registroRequest = (usuario) =>
  axiosInstance.post('/registrar', usuario)

export const loginRequest = (usuario) => axiosInstance.post('/login', usuario)

export const verificarTokenRequest = () => axiosInstance.get('/auth/verificar')

export const logoutRequest = () => axiosInstance.post('/logout')
