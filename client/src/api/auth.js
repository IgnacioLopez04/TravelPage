import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export const registroRequest = (usuario) =>
  axiosInstance.post('/registrar', usuario)

export const loginRequest = (usuario) => axiosInstance.post('/login', usuario)

export const verificarTokenRequest = () => axios.get('/auth/verificar')
