import z from 'zod'

const usuarioSchema = z.object({
  nombre: z.string({
    message: 'El nombre debe ser un string.',
    required_error: 'Es requerido.',
  }),
  apellido: z.string({
    message: 'El apellido debe ser un string.',
    required_error: 'Es requerido.',
  }),
  pass: z.string().min(8, { message: 'Como mínimo debe tener 8 caracteres.' }),
  email: z.string().email({
    message: 'La direccion de email no es valida.',
    required_error: 'Es requerido.',
  }),
})

const loginSchema = z.object({
  email: z.string().email({
    required_error: 'El email es requerido.',
  }),
  pass: z.string().min(8, { message: 'Minimo de 8 caracteres.' }),
})

export function validarUsuario(object) {
  return usuarioSchema.safeParse(object)
}

export function validarLogin(object) {
  return loginSchema.safeParse(object)
}
