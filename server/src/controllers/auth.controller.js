import { validarLogin, validarUsuario } from '../schemas/usuario.js'
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from '../config/config.js'
import { UsuarioModel } from '../models/usuario.js'
import { crearAccessToken } from '../utils/jwt.js'

export class AuthController {
  static async create(req, res) {
    const result = validarUsuario(req.body)

    if (result.error) {
      return res.status(400).json({ error: result.error.message })
    }

    try {
      const emails = await UsuarioModel.getEmail()
      const email = emails.find((x) => x.email === result.data.email)
      if (email) throw new Error('El email ya existe')

      const passwordHash = await bcrypt.hash(result.data.pass, SALT_ROUNDS)
      const newUser = {
        id: crypto.randomUUID(),
        nombre: result.data.nombre,
        apellido: result.data.apellido,
        pass: passwordHash,
        email: result.data.email,
      }

      const usuario = await UsuarioModel.create(newUser)
      const token = await crearAccessToken({ id: usuario.id })

      res.cookie('token', token)
      res.json({
        id: newUser.id,
        email: newUser.email,
        nombre: newUser.nombre,
        apellido: newUser.apellido,
      })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }

  static async login(req, res) {
    const result = validarLogin(req.body)
    if (result.error) {
      return res.status(400).json({ error: result.error.message })
    }

    const { email, pass } = result.data
    try {
      const usuarios = await UsuarioModel.getUsers()
      const usuario = usuarios.find((x) => x.email === email)
      if (!usuario)
        return res
          .status(401)
          .json({ message: 'Email o contraseña incorrecta' })

      const valido = await bcrypt.compare(pass, usuario.pass)
      if (!valido)
        return res
          .status(401)
          .json({ message: 'Email o contraseña incorrecta' })

      const token = await crearAccessToken({ id: usuario.id })
      res.cookie('token', token)
      return res.json({
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
      })
    } catch (e) {
      return res.status(401).json({ message: 'Email o contraseña incorrecta' })
    }
  }

  static async logout(req, res) {
    res.cookie('token', '', {
      expires: new Date(0),
    })
    return res.status(200).json({ message: 'Logout' })
  }

  static async perfil(req, res) {
    let usuarios

    try {
      usuarios = await UsuarioModel.getUsers()
    } catch (e) {
      throw new Error({ message: 'No se encontraron usuarios' })
    }

    const usuario = usuarios.find((x) => x.id === req.usuario.id)
    if (!usuario)
      return res.status(400).json({ message: 'Usuario no encontrado' })

    res.json({
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.emial,
    })
  }
}
