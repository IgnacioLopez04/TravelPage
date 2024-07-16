import mysql from 'mysql2/promise'
import { DATABASE } from '../config/config.js'

const connection = await mysql.createConnection(DATABASE)

export class ViajeModel {
  static async getAllPublic() {
    try {
      const viajes = await connection.query(
        'SELECT BIN_TO_UUID(id) AS id, nombre, fecha_creacion, descripcion FROM viaje WHERE es_publico = true'
      )
      return viajes
    } catch (e) {
      throw new Error({ message: 'No es posible recuperar los viajes' })
    }
  }
  static async getViaje({ id }) {
    try {
      const [viaje] = await connection.query(
        'SELECT BIN_TO_UUID(id) AS id, nombre, fecha_creacion, descripcion FROM viaje WHERE id = UUID_TO_BIN(?)',
        [id]
      )
      return viaje
    } catch (e) {
      throw new Error({ message: 'No es posible recuperar el viaje' })
    }
  }
  static async getAllPrivate({ id }) {
    try {
      const viajes = await connection.query(
        `SELECT BIN_TO_UUID(v.id) AS id, v.nombre, v.fecha_creacion, v.descripcion FROM viaje v JOIN usuario_viaje ON v.id = usuario_viaje.id_viaje JOIN usuario ON usuario_viaje.id_usuario = usuario.id WHERE usuario.id = UUID_TO_BIN(?)`,
        [id]
      )

      return viajes
    } catch (e) {
      throw new Error({
        message: 'No es posible recuperar los viajes del usuario',
      })
    }
  }
  static async create(input) {
    const { id_usuario, id, nombre, descripcion, es_publico } = input
    try {
      await connection.query(
        'INSERT INTO viaje(id, nombre, descripcion, es_publico) VALUES(UUID_TO_BIN(?),?,?,?)',
        [id, nombre, descripcion, es_publico]
      )
    } catch (e) {
      throw new Error({ message: 'No se pudo crear el viaje.' })
    }

    try {
      await connection.query(
        'INSERT INTO usuario_viaje(id_usuario, id_viaje) VALUES(UUID_TO_BIN(?),UUID_TO_BIN(?))',
        [id_usuario, id]
      )
    } catch (e) {
      throw new Error({ message: 'No se pudo crear el viaje.' })
    }
    return await this.getViaje({ id })
  }
  static async delete({ id }) {
    try {
      await connection.query(
        'DELETE FROM usuario_viaje WHERE id_viaje = UUID_TO_BIN(?)',
        [id]
      )

      await connection.query('DELETE FROM viaje WHERE id = UUID_TO_BIN(?)', [
        id,
      ])

      return true
    } catch (e) {
      throw new Error({ message: 'Es posible eliminar el viaje' })
    }
  }
}
