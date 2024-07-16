import { UsuarioModel } from '../models/usuario.js'

export class UsuarioController {
  static async getById(req, res) {
    const { id } = req.params
    try {
      const usuario = await UsuarioModel.getById({ id })
      return res.json(usuario)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
}
