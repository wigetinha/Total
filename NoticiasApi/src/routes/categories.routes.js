const express = require('express');
const { categories, ahora } = require('../data/db');
const { v4: uuid } = require('uuid');
const { authRequired, isAdmin } = require('../middlewares/auth');

const router = express.Router();

// GET /categories
router.get('/', (_req, res) => res.json(categories.filter(c => c.activo)));

// GET /categories/:id
router.get('/:id', (req, res) => {
  const c = categories.find(x => x.id === req.params.id && x.activo !== false);
  if (!c) return res.status(404).json({ error: 'Categoría no encontrada' });
  res.json(c);
});

// POST /categories (admin)
router.post('/', authRequired, isAdmin, (req, res) => {
  const { nombre, descripcion, activo = true } = req.body || {};
  if (!nombre) return res.status(400).json({ error: 'nombre requerido' });
  const cat = { id: uuid(), nombre: nombre.trim(), descripcion: (descripcion||'').trim(), activo: Boolean(activo), UserAlta: req.user.nick, FechaAlta: ahora() };
  categories.push(cat);
  res.status(201).json(cat);
});

// PUT /categories/:id (admin)
router.put('/:id', authRequired, isAdmin, (req, res) => {
  const c = categories.find(x => x.id === req.params.id);
  if (!c) return res.status(404).json({ error: 'Categoría no encontrada' });
  const { nombre, descripcion, activo } = req.body || {};
  if (nombre) c.nombre = nombre.trim();
  if (descripcion) c.descripcion = descripcion.trim();
  if (typeof activo === 'boolean') c.activo = activo;
  c.UserMod = req.user.nick; c.FechaMod = ahora();
  res.json(c);
});

// DELETE /categories/:id (admin) -> baja lógica
router.delete('/:id', authRequired, isAdmin, (req, res) => {
  const c = categories.find(x => x.id === req.params.id);
  if (!c) return res.status(404).json({ error: 'Categoría no encontrada' });
  c.activo = false; c.UserBaja = req.user.nick; c.FechaBaja = ahora();
  res.json({ id: c.id, activo: c.activo });
});

module.exports = router;
