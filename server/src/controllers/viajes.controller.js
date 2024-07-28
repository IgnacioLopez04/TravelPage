import { UsuarioModel } from '../models/usuario.js'
import { ViajeModel } from '../models/viaje.model.js'
import { validarViaje } from '../schemas/viajeSchema.js'

export class ViajeController {
  static async getAllPublic(req, res) {
    try {
      const [viajes] = await ViajeModel.getAllPublic()
      if (!viajes || viajes.length === 0)
        return res.status(404).json('Not Found')

      let viajesImagenesPromises = viajes.map(async (viaje) => {
        const imagenes = await ViajeModel.getImagenes(viaje.id)

        return {
          id_viaje: viaje.id_viaje,
          nombre: viaje.nombre,
          descripcion: viaje.descripcion,
          imagenes: imagenes,
        }
      })

      const viajesImagenes = await Promise.all(viajesImagenesPromises)

      return res.json(viajesImagenes)
    } catch (e) {
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  static async getViaje(req, res) {
    const { id } = req.params
    try {
      const viaje = await ViajeModel.getViaje(id)
      if (!viaje || viaje.length === 0) return res.status(404).json('Not Found')

      const imagenes = await ViajeModel.getImagenes(viaje[0].id)

      const viajeImagen = {
        id: viaje[0].id,
        nombre: viaje[0].nombre,
        descripcion: viaje[0].descripcion,
        fecha_creacion: viaje[0].fecha_creacion,
        es_publico: viaje[0].es_publico === 1 ? true : false,
        imagenes: imagenes,
      }

      return res.json([viajeImagen])
    } catch (e) {
      res.status(500).json({ message: 'Error en retornar un viaje' })
    }
  }

  static async getAllPrivate(req, res) {
    const { id } = req.params //id del usuario
    if (!req.usuario.id || id !== req.usuario.id)
      return res.status(400).json({ message: 'Usuario no autorizado' })

    try {
      const [viajes] = await ViajeModel.getAllPrivate({ id })
      if (!viajes || viajes.length === 0)
        return res.status(404).json({ message: 'Not Found' })

      const viajesImagenPromises = viajes.map(async (viaje) => {
        const imagenes = await ViajeModel.getImagenes(viaje.id)
        return {
          ...viaje,
          imagenes: imagenes,
        }
      })

      const viajesImagen = await Promise.all(viajesImagenPromises)

      return res.json(viajesImagen)
    } catch (e) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  static async create(req, res) {
    if (!req.usuario.id)
      return res.status(400).json({ message: 'Usuario no autorizado' })

    const id_usuario = req.usuario.id
    try {
      const usuario = await UsuarioModel.getById({ id_usuario })
      if (!usuario)
        return res.status(400).json({ message: 'Usuario no valido.' })
    } catch (e) {
      return res.status(500).json({ message: 'Interal Server Error' })
    }

    const result = validarViaje(req.body)

    if (result.error) {
      return res.status(400).json({ message: 'Datos invalidos' })
    }

    const id = crypto.randomUUID()
    const newViaje = {
      id_usuario: id_usuario,
      id: id,
      nombre: result.data.nombre,
      descripcion: result.data.descripcion,
      es_publico: JSON.parse(result.data.es_publico),
      imagenes: result.data.imagenes,
    }

    try {
      const viaje = await ViajeModel.create(newViaje)
      return res.json(viaje)
    } catch (e) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  static async delete(req, res) {
    if (!req.usuario.id)
      return res.status(400).json({ message: 'Usuario no autorizado' })

    const { id } = req.params

    try {
      const viaje = await ViajeModel.getViaje(id)
      if (!viaje || viaje.length === 0)
        return res.status(404).json({ message: 'Not Found' })

      if (viaje[0].id_usuario !== req.usuario.id)
        return res.status(400).json({ message: 'Usuario no autorizado' })

      const imagenes = await ViajeModel.getImagenes(id)

      imagenes.forEach(async (imagen) => {
        await ViajeModel.deleteImagenes(imagen.id_imagen)
      })

      const result = await ViajeModel.delete({ id })
      if (!result)
        return res.status(400).json({ message: 'No se puede eliminar' })

      return res.status(200).json({ message: 'Viaje eliminado' })
    } catch (e) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  static async put(req, res) {
    const { id_viaje } = req.params
    const { id_usuario } = req.body

    const result = validarViaje(req.body)
    if (!result) return res.status(400).json({ message: 'Datos incorrectos' })

    if (!req.usuario.id || id_usuario !== req.usuario.id)
      return res.status(400).json({ message: 'Usuario no autorizado' })

    try {
      const viaje = await ViajeModel.getViaje(id_viaje)
      if (!viaje || viaje.length === 0)
        return res.status(404).json({ message: 'Not Found' })
    } catch (e) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }

    const newViaje = {
      id_viaje: id_viaje,
      nombre: result.data.nombre,
      descripcion: result.data.descripcion,
      es_publico: result.data.es_publico,
    }

    try {
      const viajeActualizado = await ViajeModel.update(newViaje)
      return res.json(viajeActualizado)
    } catch (e) {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }

  static async deleteImagen(req, res) {
    const { id } = req.params
    console.log(id)

    try {
      const imagen = await ViajeModel.getImagenes(id)
      if (!imagen) return res.status(404).json('Not Found')

      console.log(imagen)

      await ViajeModel.deleteImagenes(id)
      return res.status(200)
    } catch (e) {
      res.status(500).json('Internal Server Error')
    }
  }
}
