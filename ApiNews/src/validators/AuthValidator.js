const { check } = require('express-validator');
const { User } = require('../models/UserModel');

const validatorLogin = [
  check('correo').notEmpty().withMessage('El campo correo es requerido')
                 .isEmail().withMessage('Debe ser un correo válido'),
  check('contraseña').notEmpty().withMessage('El campo contraseña es requerido'),
];

const validatorRegister = [
  check('nombre').notEmpty().withMessage('El campo nombre es obligatorio')
                 .isString().isLength({ min: 2, max: 100 }),
  check('apellidos').notEmpty().withMessage('El campo apellidos es obligatorio')
                    .isString().isLength({ min: 2, max: 100 }),
  check('nick').notEmpty().withMessage('El campo nick es obligatorio')
               .isString().isLength({ min: 2, max: 20 }),
  check('correo')
    .notEmpty().withMessage('El campo correo es obligatorio')
    .isEmail().withMessage('Debe ser un correo válido')
    .isLength({ min: 5, max: 255 })
    .custom(async (value) => {
      const exists = await User.findOne({ where: { correo: value } });
      if (exists) throw new Error('Ya existe un usuario con este correo');
      return true;
    }),
  check('contraseña').notEmpty().withMessage('El campo contraseña es obligatorio')
                     .isString().isLength({ min: 8, max: 255 }),
];

module.exports = { validatorLogin, validatorRegister };
