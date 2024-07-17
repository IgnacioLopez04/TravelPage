import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const registroRequest = (usuario) =>
  axiosInstance.post('/registrar', usuario)
