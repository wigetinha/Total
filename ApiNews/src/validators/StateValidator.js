// src/validators/StateValidator.js
const { check } = require('express-validator');
const { State } = require('../models/StateModel');

const validatorStateRequire = [
  check('nombre').notEmpty().withMessage('El campo nombre es obligatorio')
    .isString().isLength({ min: 2, max: 50 })
    .custom(v => State.findOne({ where: { nombre: v } })
      .then(x => { if (x) throw new Error('Ya existe un estado con el mismo nombre'); })),
  check('abreviacion').notEmpty().withMessage('El campo abreviacion es obligatorio')
    .isString().isLength({ min: 2, max: 5 })
];

const validatorStateOptional = [
  check('nombre').optional().isString().isLength({ min: 2, max: 50 }),
  check('abreviacion').optional().isString().isLength({ min: 2, max: 5 })
];

module.exports = { validatorStateRequire, validatorStateOptional };
