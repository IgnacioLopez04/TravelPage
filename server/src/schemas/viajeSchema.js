import z from 'zod'

// Define el esquema para un archivo
const fileSchema = z.object({
  name: z.string(),
  tempFilePath: z.string(),
})

const viajeSchema = z.object({
  nombre: z.string({
    required_error: 'El nombre es requerid.',
  }),
  descripcion: z.string().min(25, {
    required_error: 'Es necesario un minimo de 25 caracteres.',
  }),
  es_publico: z.boolean(),
  imagenes: z.array(fileSchema),
})

export function validarViaje(object) {
  return viajeSchema.safeParse(object)
}
