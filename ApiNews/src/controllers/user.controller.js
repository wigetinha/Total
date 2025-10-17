// src/controllers/user.controller.js
const { User } = require('../models/UserModel');
const { Profile } = require('../models/ProfileModel');
const { validationResult } = require('express-validator');

const include = [{ model: Profile, as: 'perfil', attributes: ['id', 'nombre'] }];

const get = (req, res) => {
  const { nombre, apellidos, nick } = req.query;
  const where = {};
  if (nombre) where.nombre = nombre;
  if (apellidos) where.apellidos = apellidos;
  if (nick) where.nick = nick;

  User.findAll({ where, include, order: [['id', 'ASC']] })
    .then(rows => res.json(rows))
    .catch(() => res.status(500).send('Error consultando usuarios'));
};

const getById = (req, res) => {
  User.findByPk(req.params.id, { include })
    .then(row => row ? res.json(row) : res.status(404).send('Recurso no encontrado'))
    .catch(() => res.status(500).send('Error al consultar usuario'));
};

const create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

  User.create(req.body)
    .then(newRow => res.status(201).json(newRow))
    .catch(() => res.status(500).send('Error al crear usuario'));
};

const update = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

  User.update(req.body, { where: { id: req.params.id } })
    .then(([num]) => res.status(200).send(`${num} registro actualizado`))
    .catch(() => res.status(500).send('Error al actualizar usuario'));
};

const destroy = (req, res) => {
  User.destroy({ where: { id: req.params.id } })
    .then(num => res.status(200).send(`${num} registro eliminado`))
    .catch(() => res.status(500).send('Error al eliminar usuario'));
};

module.exports = { get, getById, create, update, destroy };
