import { Router } from 'express'
import { ViajeController } from '../controllers/viajes.controller.js'
import { authRequired } from '../middleware/validarToken.js'

export const viajesRouter = Router()

viajesRouter.get('/', ViajeController.getAllPublic)
viajesRouter.get('/:id', ViajeController.getViaje)
viajesRouter.get('/usuario/:id', authRequired, ViajeController.getAllPrivate) //id del usuario
viajesRouter.post('/crear', authRequired, ViajeController.create)
viajesRouter.delete('/eliminar/:id', authRequired, ViajeController.delete) //id del viaje
viajesRouter.put('/actualizar/:id_viaje', authRequired, ViajeController.put) //id del viaje
