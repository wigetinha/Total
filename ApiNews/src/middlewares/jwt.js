const jwt = require('jsonwebtoken');

function getTokenFromHeader(req) {
  const h = req.headers.authorization || '';
  const parts = h.split(' ');
  if (parts.length === 2 && /^Bearer$/i.test(parts[0])) return parts[1];
  return null;
}

const authenticateAny = (req, res, next) => {
  const token = getTokenFromHeader(req);
  if (!token) return res.status(401).send({ message: 'No se proporcionó un token' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send({ message: 'Sin autorización' });
    req.user = decoded.usuario;
    next();
  });
};

const authenticateAdmin = (req, res, next) => {
  const token = getTokenFromHeader(req);
  if (!token) return res.status(401).send({ message: 'No se proporcionó un token' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send({ message: 'Sin autorización' });
    if (decoded?.usuario?.perfil_id === 1) {
      req.user = decoded.usuario;
      return next();
    }
    return res.status(403).send({ message: 'Sin autorización' });
  });
};

module.exports = { authenticateAny, authenticateAdmin };
