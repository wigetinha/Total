// src/controllers/AuthController.js
const { User } = require('../models/UserModel');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { JWT_SECRET = 'mi_llave_secreta', JWT_EXPIRES = '24h' } = process.env;

// POST /api/auth/login
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

  try {
    const pass = req.body.password ?? req.body['contraseña'];
    const usuario = await User.findOne({
      where: { correo: req.body.correo, password: pass, activo: true },
      attributes: ['id', 'perfil_id', 'nombre', 'apellidos', 'nick']
    });

    if (!usuario) return res.status(401).json({ message: 'Sin autorización' });

    const token = jwt.sign({ usuario }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    return res.status(201).json({ message: 'Login con éxito', token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).send('Error al consultar el dato');
  }
};

// POST /api/auth/registro
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

  try {
    // mapeo compat: acepta "contraseña" o "password"
    const pass = req.body.password ?? req.body['contraseña'];

    const newUser = await User.create({
      perfil_id: 2, // contribuidor
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      nick: req.body.nick,
      correo: req.body.correo,
      password: pass,
      // los campos de auditoría ya tienen defaults en el modelo
    });

    return res.status(201).json(newUser);
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).send('Error al crear');
  }
};

module.exports = { login, register };
