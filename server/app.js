import express from 'express'
import { PORT } from './src/config/config.js'
import { authRouter } from './src/routes/auth.routes.js'
import { usuarioRouter } from './src/routes/usuario.routes.js'
import { viajesRouter } from './src/routes/viajes.routes.js'
import { corsMiddleware } from './src/middleware/cors.js'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(corsMiddleware())
app.use(fileUpload({ useTempFiles: true }))
app.disable('x-powered-by')

app.use('/api', authRouter)
app.use('/api/usuario', usuarioRouter)
app.use('/api/viaje', viajesRouter)

app.listen(PORT, () => {
  console.log('El servidor corre en el puerto: ', PORT)
})
