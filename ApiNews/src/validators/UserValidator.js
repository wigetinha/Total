// src/validators/UserValidator.js
const { check } = require('express-validator');
const { User } = require('../models/UserModel');
const { Profile } = require('../models/ProfileModel');

const validatorUserCreate = [
  check('nombre').notEmpty().isString().isLength({ min: 2, max: 100 }),
  check('apellidos').notEmpty().isString().isLength({ min: 2, max: 100 }),
  check('nick').notEmpty().isString().isLength({ min: 2, max: 20 }),
  check('correo').notEmpty().isEmail()
    .custom(v => User.findOne({ where: { correo: v } })
      .then(x => { if (x) throw new Error('Correo ya registrado'); })),
  check('password').notEmpty().isString().isLength({ min: 8 }), // mapea a columna `contraseña`
  check('perfil_id').notEmpty().isInt()
    .custom(v => Profile.findByPk(v)
      .then(p => { if (!p) throw new Error('perfil_id inexistente'); }))
];

const validatorUserUpdate = [
  check('nombre').optional().isString().isLength({ min: 2, max: 100 }),
  check('apellidos').optional().isString().isLength({ min: 2, max: 100 }),
  check('nick').optional().isString().isLength({ min: 2, max: 20 }),
  check('password').optional().isString().isLength({ min: 8 }),
  check('perfil_id').optional().isInt()
    .custom(v => Profile.findByPk(v)
      .then(p => { if (!p) throw new Error('perfil_id inexistente'); }))
];

module.exports = { validatorUserCreate, validatorUserUpdate };
