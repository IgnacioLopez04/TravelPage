import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config/config.js'

export const authRequired = (req, res, next) => {
  const { token } = req.cookies
  if (!token) return res.status(401).json({ message: 'Authorization denied' })

  jwt.verify(token, TOKEN_SECRET, (err, usuario) => {
    if (err) return res.status(403).json({ message: 'Invalid token' })

    req.usuario = usuario

    next()
  })
}
