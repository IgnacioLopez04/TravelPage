import process from 'process'
import dotenv from 'dotenv'

dotenv.config()

export const {
  PORT = process.env.PORT,
  SALT_ROUNDS = process.env.SALT_ROUNDS,
  TOKEN_SECRET = process.env.TOKEN_SECRET,
  DATABASE = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
  },
} = process.env
