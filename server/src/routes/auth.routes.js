import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller.js'

export const authRouter = Router()

authRouter.post('/registrar', AuthController.create)
authRouter.post('/login', AuthController.login)
authRouter.post('/logout', AuthController.logout)
