import express from 'express'
import { PORT } from './src/config/config.js'
import { authRouter } from './src/routes/auth.routes.js'
import { usuarioRouter } from './src/routes/usuario.routes.js'
import { corsMiddleware } from './src/middleware/cors.js'

const app = express()
app.use(express.json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/api', authRouter)
app.use('api/usuario', usuarioRouter)

app.listen(PORT, () => {
  console.log('El servidor corre en el puerto: ', PORT)
})
