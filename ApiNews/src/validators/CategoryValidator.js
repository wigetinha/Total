// src/validators/CategoryValidator.js
const { check } = require('express-validator');
const { Category } = require('../models/CategoryModel');

const validatorCategoryCreate = [
  check('nombre').notEmpty().isString().isLength({ min: 5, max: 50 })
    .custom(v => Category.findOne({ where: { nombre: v } })
      .then(x => { if (x) throw new Error('Ya existe una categoría con el mismo nombre'); })),
  check('descripcion').notEmpty().isString().isLength({ min: 5, max: 255 }),
  check('activo').optional().isBoolean()
];

const validatorCategoryUpdate = [
  check('nombre').optional().isString().isLength({ min: 5, max: 50 }),
  check('descripcion').optional().isString().isLength({ min: 5, max: 255 }),
  check('activo').optional().isBoolean()
];

module.exports = { validatorCategoryCreate, validatorCategoryUpdate };
