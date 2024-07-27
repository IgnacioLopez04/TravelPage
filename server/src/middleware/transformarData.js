export const transformarData = (req, res, next) => {
  const es_publico = JSON.parse(req.body.es_publico)

  let imagenes
  if (Array.isArray(req.files['imagenes[]'])) {
    imagenes = req.files ? Object.values(req.files['imagenes[]']) : []
  } else {
    imagenes = [req.files['imagenes[]']]
  }

  req.body = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    es_publico,
    imagenes,
  }

  next()
}
