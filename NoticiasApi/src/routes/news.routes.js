const express = require('express');
const { news, categories, states, ahora } = require('../data/db');
const { v4: uuid } = require('uuid');
const { authRequired, isAdmin } = require('../middlewares/auth');

const router = express.Router();

/**
 * GET /news?categoria_id=&estado_id=&estatus=
 * - público: por defecto SOLO 'aprobada'
 * - filtros opcionales: categoria_id, estado_id, estatus (si se especifica distinto de 'aprobada', devolveremos vacío para público)
 */
router.get('/', (req, res) => {
  let lista = [...news];
  const { categoria_id, estado_id, estatus } = req.query;

  if (!estatus) {
    lista = lista.filter(n => n.estatus === 'aprobada' && n.activo !== false);
  } else {
    if (estatus === 'aprobada') lista = lista.filter(n => n.estatus === 'aprobada' && n.activo !== false);
    else lista = []; // restringido (solo admin con endpoint de admin, aquí lo ocultamos)
  }

  if (categoria_id) lista = lista.filter(n => n.categoria_id === categoria_id);
  if (estado_id)    lista = lista.filter(n => n.estado_id === estado_id);

  res.json({ total: lista.length, data: lista });
});

// GET /news/:id (solo si está aprobada y activa)
router.get('/:id', (req, res) => {
  const n = news.find(x => x.id === req.params.id);
  if (!n || n.activo === false) return res.status(404).json({ error: 'Noticia no encontrada' });
  if (n.estatus !== 'aprobada') return res.status(403).json({ error: 'Noticia no disponible' });
  res.json(n);
});

// POST /news  (contribuidor autenticado)
// body: { categoria_id, estado_id, titulo, fecha_publicacion, description, image(base64) }
router.post('/', authRequired, (req, res) => {
  const { categoria_id, estado_id, titulo, fecha_publicacion, description, image } = req.body || {};

  if (!categoria_id || !estado_id || !titulo || !fecha_publicacion || !description) {
    return res.status(400).json({ error: 'categoria_id, estado_id, titulo, fecha_publicacion y description son requeridos' });
  }
  if (!categories.some(c => c.id === categoria_id && c.activo !== false)) return res.status(400).json({ error: 'categoria_id inválido' });
  if (!states.some(s => s.id === estado_id && s.activo !== false)) return res.status(400).json({ error: 'estado_id inválido' });

  const nota = {
    id: uuid(),
    categoria_id,
    estado_id,
    usuario_id: req.user.id,
    titulo: titulo.trim(),
    fecha_publicacion,
    description: description.trim(),
    image: image || null, // base64 opcional
    estatus: 'pendiente', // aprobación por admin
    activo: true,
    UserAlta: req.user.nick,
    FechaAlta: ahora()
  };
  news.push(nota);
  res.status(201).json(nota);
});

// PUT /news/:id (admin) -> actualizar campos y/o aprobar/rechazar
// body opcional: { categoria_id, estado_id, titulo, fecha_publicacion, description, image, estatus('pendiente'|'aprobada'|'rechazada'), activo }
router.put('/:id', authRequired, isAdmin, (req, res) => {
  const n = news.find(x => x.id === req.params.id);
  if (!n) return res.status(404).json({ error: 'Noticia no encontrada' });

  const { categoria_id, estado_id, titulo, fecha_publicacion, description, image, estatus, activo } = req.body || {};
  if (categoria_id) {
    if (!categories.some(c => c.id === categoria_id && c.activo !== false)) return res.status(400).json({ error: 'categoria_id inválido' });
    n.categoria_id = categoria_id;
  }
  if (estado_id) {
    if (!states.some(s => s.id === estado_id && s.activo !== false)) return res.status(400).json({ error: 'estado_id inválido' });
    n.estado_id = estado_id;
  }
  if (titulo) n.titulo = titulo.trim();
  if (fecha_publicacion) n.fecha_publicacion = fecha_publicacion;
  if (description) n.description = description.trim();
  if (image !== undefined) n.image = image;
  if (estatus) {
    if (!['pendiente','aprobada','rechazada'].includes(estatus)) return res.status(400).json({ error: 'estatus inválido' });
    n.estatus = estatus;
  }
  if (typeof activo === 'boolean') n.activo = activo;

  n.UserMod = req.user.nick; n.FechaMod = ahora();
  res.json(n);
});

// DELETE /news/:id (admin) -> baja lógica
router.delete('/:id', authRequired, isAdmin, (req, res) => {
  const n = news.find(x => x.id === req.params.id);
  if (!n) return res.status(404).json({ error: 'Noticia no encontrada' });
  n.activo = false; n.UserBaja = req.user.nick; n.FechaBaja = ahora();
  res.json({ id: n.id, activo: n.activo });
});

module.exports = router;
