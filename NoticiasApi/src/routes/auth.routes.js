const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { users, perfiles, ahora } = require('../data/db');
const { v4: uuid } = require('uuid');

const router = express.Router();

/**
 * POST /auth/registro  (Contribuidor)
 * body: { nombres, apellidos, nick, correo, contraseña }
 */
router.post('/registro', (req, res) => {
  const { nombres, apellidos, nick, correo, contraseña } = req.body || {};
  if (!nombres || !apellidos || !nick || !correo || !contraseña) {
    return res.status(400).json({ error: 'nombres, apellidos, nick, correo y contraseña son requeridos' });
  }
  if (users.some(u => u.correo.toLowerCase() === String(correo).toLowerCase())) {
    return res.status(409).json({ error: 'El correo ya está registrado' });
  }

  const user = {
    id: uuid(),
    profile_id: 2, // Contribuidor
    nombres: nombres.trim(),
    apellidos: apellidos.trim(),
    nick: nick.trim(),
    correo: String(correo).toLowerCase().trim(),
    passwordHash: bcrypt.hashSync(contraseña, 10),
    activo: true,
    UserAlta: nick.trim(),
    FechaAlta: ahora()
  };
  users.push(user);

  const token = jwt.sign(
    { id: user.id, profile_id: user.profile_id, nick: user.nick, correo: user.correo },
    process.env.JWT_SECRET || 'devsecret',
    { expiresIn: '7d' }
  );
  res.status(201).json({
    token,
    usuario: { id: user.id, profile_id: user.profile_id, nombres: user.nombres, apellidos: user.apellidos, nick: user.nick, correo: user.correo, activo: user.activo }
  });
});

/**
 * POST /auth/login
 * body: { correo, contraseña }
 */
router.post('/login', (req, res) => {
  const { correo, contraseña } = req.body || {};
  const user = users.find(u => u.correo === String(correo).toLowerCase());
  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

  const ok = bcrypt.compareSync(contraseña || '', user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' });

  const token = jwt.sign(
    { id: user.id, profile_id: user.profile_id, nick: user.nick, correo: user.correo },
    process.env.JWT_SECRET || 'devsecret',
    { expiresIn: '7d' }
  );
  res.json({
    token,
    usuario: { id: user.id, profile_id: user.profile_id, nombres: user.nombres, apellidos: user.apellidos, nick: user.nick, correo: user.correo, activo: user.activo }
  });
});

module.exports = router;
