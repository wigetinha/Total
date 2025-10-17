// src/validators/ProfileValidator.js
const { check } = require('express-validator');
const { Profile } = require('../models/ProfileModel');

const validatorProfileCreate = [
  check('nombre').notEmpty().withMessage('El nombre es obligatorio')
    .isString().isLength({ min: 2, max: 50 })
    .custom(v => Profile.findOne({ where: { nombre: v } })
      .then(row => { if (row) throw new Error('Ya existe un perfil con ese nombre'); }))
];

const validatorProfileUpdate = [
  check('nombre').optional().isString().isLength({ min: 2, max: 50 })
];

module.exports = { validatorProfileCreate, validatorProfileUpdate };
