import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller.js'
import { authRequired } from '../middleware/validarToken.js'

export const authRouter = Router()

authRouter.post('/registrar', AuthController.create)
authRouter.post('/login', AuthController.login)
authRouter.post('/logout', AuthController.logout)
authRouter.get('/perfil', authRequired, AuthController.perfil)
authRouter.get('/auth/verificar', AuthController.verificar)
