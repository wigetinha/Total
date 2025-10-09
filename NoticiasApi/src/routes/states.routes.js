const express = require('express');
const { states, ahora } = require('../data/db');
const { v4: uuid } = require('uuid');
const { authRequired, isAdmin } = require('../middlewares/auth');

const router = express.Router();

// GET /states
router.get('/', (_req, res) => res.json(states.filter(s => s.activo)));

// GET /states/:id
router.get('/:id', (req, res) => {
  const s = states.find(x => x.id === req.params.id && x.activo !== false);
  if (!s) return res.status(404).json({ error: 'Estado no encontrado' });
  res.json(s);
});

// POST /states (admin)
router.post('/', authRequired, isAdmin, (req, res) => {
  const { nombre, abreviacion, activo = true } = req.body || {};
  if (!nombre || !abreviacion) return res.status(400).json({ error: 'nombre y abreviacion son requeridos' });
  const st = { id: uuid(), nombre: nombre.trim(), abreviacion: abreviacion.trim().toUpperCase(), activo: Boolean(activo), UserAlta: req.user.nick, FechaAlta: ahora() };
  states.push(st);
  res.status(201).json(st);
});

// PUT /states/:id (admin)
router.put('/:id', authRequired, isAdmin, (req, res) => {
  const s = states.find(x => x.id === req.params.id);
  if (!s) return res.status(404).json({ error: 'Estado no encontrado' });
  const { nombre, abreviacion, activo } = req.body || {};
  if (nombre) s.nombre = nombre.trim();
  if (abreviacion) s.abreviacion = abreviacion.trim().toUpperCase();
  if (typeof activo === 'boolean') s.activo = activo;
  s.UserMod = req.user.nick; s.FechaMod = ahora();
  res.json(s);
});

// DELETE /states/:id (admin) -> baja lógica
router.delete('/:id', authRequired, isAdmin, (req, res) => {
  const s = states.find(x => x.id === req.params.id);
  if (!s) return res.status(404).json({ error: 'Estado no encontrado' });
  s.activo = false; s.UserBaja = req.user.nick; s.FechaBaja = ahora();
  res.json({ id: s.id, activo: s.activo });
});

module.exports = router;
