// src/validators/NewValidator.js
const { check } = require('express-validator');
const { Category } = require('../models/CategoryModel');
const { User } = require('../models/UserModel');
const { State } = require('../models/StateModel');

const validatorNewCreate = [
  check('categoria_id').notEmpty().isInt()
    .custom(v => Category.findOne({ where: { id: v, activo: true } })
      .then(x => { if (!x) throw new Error('categoria_id inválido'); })),
  check('usuario_id').notEmpty().isInt()
    .custom(v => User.findOne({ where: { id: v, activo: true } })
      .then(x => { if (!x) throw new Error('usuario_id inválido'); })),
  check('estado_id').notEmpty().isInt()
    .custom(v => State.findOne({ where: { id: v, activo: true } })
      .then(x => { if (!x) throw new Error('estado_id inválido'); })),
  check('titulo').notEmpty().isLength({ min: 2 }),
  check('descripcion').notEmpty().isLength({ min: 2 }),
  check('imagen').notEmpty().isBase64().withMessage('Debe ser Base64'),
  check('activo').optional().isBoolean()
];

const validatorNewUpdate = [
  check('categoria_id').optional().isInt()
    .custom(v => Category.findOne({ where: { id: v, activo: true } })
      .then(x => { if (!x) throw new Error('categoria_id inválido'); })),
  check('usuario_id').optional().isInt()
    .custom(v => User.findOne({ where: { id: v, activo: true } })
      .then(x => { if (!x) throw new Error('usuario_id inválido'); })),
  check('estado_id').optional().isInt()
    .custom(v => State.findOne({ where: { id: v, activo: true } })
      .then(x => { if (!x) throw new Error('estado_id inválido'); })),
  check('titulo').optional().isLength({ min: 2 }),
  check('descripcion').optional().isLength({ min: 2 }),
  check('imagen').optional().isBase64(),
  check('activo').optional().isBoolean()
];

module.exports = { validatorNewCreate, validatorNewUpdate };
