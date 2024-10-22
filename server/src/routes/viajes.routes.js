import { Router } from 'express'
import { ViajeController } from '../controllers/viajes.controller.js'
import { authRequired } from '../middleware/validarToken.js'
import { transformarData } from '../middleware/transformarData.js'

export const viajesRouter = Router()

viajesRouter.get('/', ViajeController.getAllPublic) //Todos los viajes que sean publicos
viajesRouter.get('/:id', ViajeController.getViaje) //Buscar un solo viaje publico
viajesRouter.get('/usuario/:id', authRequired, ViajeController.getAllPrivate) //:id del usuario - Busca todos los viajes(publicos y privados) de un usuario
viajesRouter.post(
  '/crear',
  authRequired,
  transformarData,
  ViajeController.create
)
viajesRouter.delete('/eliminar/:id', authRequired, ViajeController.delete) //id del viaje
viajesRouter.put('/actualizar/:id_viaje', authRequired, ViajeController.put) //id del viaje
viajesRouter.delete('/imagen/:id', authRequired, ViajeController.deleteImagen)
