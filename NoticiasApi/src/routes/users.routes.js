const express = require('express');
const bcrypt = require('bcryptjs');
const { users, perfiles, ahora } = require('../data/db');
const { authRequired, isAdmin } = require('../middlewares/auth');
const { v4: uuid } = require('uuid');

const router = express.Router();

// GET /users (admin)
router.get('/', authRequired, isAdmin, (_req, res) => {
  res.json(users.map(u => ({
    id: u.id, profile_id: u.profile_id, nombres: u.nombres, apellidos: u.apellidos,
    nick: u.nick, correo: u.correo, activo: u.activo,
    UserAlta: u.UserAlta, FechaAlta: u.FechaAlta, UserMod: u.UserMod, FechaMod: u.FechaMod, UserBaja: u.UserBaja, FechaBaja: u.FechaBaja
  })));
});

// GET /users/:id (admin)
router.get('/:id', authRequired, isAdmin, (req, res) => {
  const u = users.find(x => x.id === req.params.id);
  if (!u) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json({
    id: u.id, profile_id: u.profile_id, nombres: u.nombres, apellidos: u.apellidos,
    nick: u.nick, correo: u.correo, activo: u.activo,
    UserAlta: u.UserAlta, FechaAlta: u.FechaAlta, UserMod: u.UserMod, FechaMod: u.FechaMod, UserBaja: u.UserBaja, FechaBaja: u.FechaBaja
  });
});

// POST /users (admin) -> crear usuario (perfil configurable)
router.post('/', authRequired, isAdmin, (req, res) => {
  const { profile_id = 2, nombres, apellidos, nick, correo, contraseña, activo = true } = req.body || {};
  if (!nombres || !apellidos || !nick || !correo || !contraseña) {
    return res.status(400).json({ error: 'nombres, apellidos, nick, correo y contraseña son requeridos' });
  }
  if (![1,2].includes(Number(profile_id))) return res.status(400).json({ error: 'profile_id inválido' });
  if (users.some(u => u.correo.toLowerCase() === String(correo).toLowerCase())) {
    return res.status(409).json({ error: 'El correo ya está registrado' });
  }

  const user = {
    id: uuid(),
    profile_id: Number(profile_id),
    nombres: nombres.trim(),
    apellidos: apellidos.trim(),
    nick: nick.trim(),
    correo: String(correo).toLowerCase().trim(),
    passwordHash: bcrypt.hashSync(contraseña, 10),
    activo: Boolean(activo),
    UserAlta: req.user.nick, FechaAlta: ahora()
  };
  users.push(user);
  res.status(201).json({ id: user.id, profile_id: user.profile_id, nombres: user.nombres, apellidos: user.apellidos, nick: user.nick, correo: user.correo, activo: user.activo });
});

// PUT /users/:id (admin)
router.put('/:id', authRequired, isAdmin, (req, res) => {
  const u = users.find(x => x.id === req.params.id);
  if (!u) return res.status(404).json({ error: 'Usuario no encontrado' });
  const { profile_id, nombres, apellidos, nick, correo, contraseña, activo } = req.body || {};

  if (profile_id) u.profile_id = [1,2].includes(Number(profile_id)) ? Number(profile_id) : u.profile_id;
  if (nombres) u.nombres = nombres.trim();
  if (apellidos) u.apellidos = apellidos.trim();
  if (nick) u.nick = nick.trim();
  if (correo) u.correo = String(correo).toLowerCase().trim();
  if (typeof activo === 'boolean') u.activo = activo;
  if (contraseña) u.passwordHash = bcrypt.hashSync(contraseña, 10);
  u.UserMod = req.user.nick; u.FechaMod = ahora();

  res.json({ id: u.id, profile_id: u.profile_id, nombres: u.nombres, apellidos: u.apellidos, nick: u.nick, correo: u.correo, activo: u.activo });
});

// DELETE /users/:id (admin) -> baja lógica
router.delete('/:id', authRequired, isAdmin, (req, res) => {
  const u = users.find(x => x.id === req.params.id);
  if (!u) return res.status(404).json({ error: 'Usuario no encontrado' });
  u.activo = false; u.UserBaja = req.user.nick; u.FechaBaja = ahora();
  res.json({ id: u.id, activo: u.activo, UserBaja: u.UserBaja, FechaBaja: u.FechaBaja });
});

module.exports = router;
