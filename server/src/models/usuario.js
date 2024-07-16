import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'travelpage',
  database: 'travel_page',
}

// Lo hago de esta manera ya que la conexion se tiene que realizar antes
const connection = await mysql.createConnection(config)

export class UsuarioModel {
  static async getEmail() {
    try {
      const [emails] = await connection.query('SELECT email from usuario')
      return emails
    } catch (e) {
      throw new Error('Error al obtener los emails')
    }
  }
  static async getUsers() {
    try {
      const [usuarios] = await connection.query(
        'SELECT nombre, apellido, email, BIN_TO_UUID(id) AS id, pass FROM usuario'
      )
      return usuarios
    } catch (e) {
      throw new Error('Error al obtener los usuarios')
    }
  }
  static async getById({ id }) {
    try {
      const [usuario] = await connection.query(
        'SELECT nombre, apellido, email, BIN_TO_UUID(id) AS id FROM usuario WHERE id = UUID_TO_BIN(?);',
        [id]
      )
      return usuario
    } catch (error) {
      throw new Error('Error en la busqueda del usuario')
    }
  }
  static async create(input) {
    const { id, nombre, apellido, pass, email } = input
    try {
      await connection.query(
        'INSERT INTO usuario(id, nombre, apellido, pass, email) VALUES(UUID_TO_BIN(?),?,?,?,?);',
        [id, nombre, apellido, pass, email]
      )
    } catch (error) {
      throw new Error('Error al crear el usuario')
    }

    return id
  }
  // static async update({ id, input }) {}
}
