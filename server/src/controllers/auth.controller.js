import { validarLogin, validarUsuario } from '../schemas/usuario.js'
import bcrypt from 'bcrypt'
import { SALT_ROUNDS, TOKEN_SECRET } from '../config/config.js'
import { UsuarioModel } from '../models/usuario.js'
import { crearAccessToken } from '../utils/jwt.js'
import jwt from 'jsonwebtoken'

export class AuthController {
  static async create(req, res) {
    const result = validarUsuario(req.body)
    if (result.error) {
      return res.status(400).json({ error: result.error.message })
    }

    try {
      const emails = await UsuarioModel.getEmail()
      const email = emails.find((x) => x.email === result.data.email)
      if (email) {
        return res.status(400).json(['El email ya existe.'])
      }
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

      res.cookie('token', token, {
        sameSite: 'none',
        secure: true,
        httpOnly: false,
      })
      res.json({
        id: newUser.id,
        email: newUser.email,
        nombre: newUser.nombre,
        apellido: newUser.apellido,
      })
    } catch (err) {
      res.status(500).json({ error: err.message })
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
        return res.status(401).json(['Email o contraseña incorrecta'])

      const valido = await bcrypt.compare(pass, usuario.pass)
      if (!valido)
        return res.status(401).json(['Email o contraseña incorrecta'])

      const token = await crearAccessToken({ id: usuario.id })
      res.cookie('token', token, {
        sameSite: 'none',
        secure: true,
        httpOnly: false,
      })
      return res.json({
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
      })
    } catch (e) {
      return res.status(500).json({ message: 'Internal Server Error' })
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
    if (!usuario) return res.status(400).json(['El usuario no existe'])

    res.json({
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.emial,
    })
  }

  static async verificar(req, res) {
    if (!req.cookies) return res.status(401).json({ message: 'unauthorized' })
    const { token } = req.cookies

    jwt.verify(token, TOKEN_SECRET, async (err, usuario) => {
      if (err) return res.status(401).json({ message: 'Unauthorized' })

      const usuarios = await UsuarioModel.getUsers()
      const usuarioEncontrado = usuarios.find((x) => x.id === usuario.id)
      if (!usuarioEncontrado)
        return res.status(401).json({ message: 'Unauthorized' })

      return res.json({
        id: usuarioEncontrado.id,
        nombre: usuarioEncontrado.nombre,
        apellido: usuarioEncontrado.apellido,
        email: usuarioEncontrado.email,
      })
    })
  }
}
