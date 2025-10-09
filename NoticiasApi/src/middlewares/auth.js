const jwt = require('jsonwebtoken');

function authRequired(req, res, next) {
  const h = req.headers.authorization;
  if (!h) return res.status(401).json({ error: 'Token requerido (Bearer <token>)' });
  const [type, token] = h.split(' ');
  if (type !== 'Bearer' || !token) return res.status(401).json({ error: 'Formato inválido' });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'devsecret');
    req.user = payload; // {id, profile_id, nick, correo}
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

function isAdmin(req, res, next) {
  if (req.user?.profile_id !== 1) return res.status(403).json({ error: 'Requiere rol Administrador' });
  next();
}

module.exports = { authRequired, isAdmin };
