import { Router } from 'express'
import { UsuarioController } from '../controllers/usuario.js'

export const usuarioRouter = Router()

usuarioRouter.get('/:id', UsuarioController.getById)
