import { Router } from 'express'
import { ViajeController } from '../controllers/viajes.controller.js'

export const viajesRouter = Router()

viajesRouter.get('/', ViajeController.getAllPublic)
viajesRouter.get('/:id', ViajeController.getViaje)
viajesRouter.get('/usuario/:id', ViajeController.getAllPrivate)
viajesRouter.post('/crear', ViajeController.create)
viajesRouter.delete('/eliminar/:id', ViajeController.delete)
