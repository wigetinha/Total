// middleware/clientHeader.js
export function requireClassroomClient(req, res, next) {
  const v = req.get('x-client'); // o req.headers['x-client']
  console.log('x-client header =>', v); // 👀 LOG DE PRUEBA
  if (v !== 'classroom') {
    return res.status(401).json({ error: 'Missing or invalid x-client header' });
  }
  next();
}
//AHHHHHHHHHHHHHH//