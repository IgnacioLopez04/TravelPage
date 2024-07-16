import cors from 'cors'

const ACCEPTED_ORIGINS = ['http://localhost:5173'] //De esta manera puedo configurar los cors desde afuera

export const corsMiddleware = ({ accepted_Origins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (accepted_Origins.includes(origin)) {
        return callback(null, true)
      }

      if (!origin) {
        return callback(null, true)
      }

      return callback(new Error('Not allow by CORS'))
    },
  })
