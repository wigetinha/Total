// src/controllers/profile.controller.js
const { Profile } = require('../models/ProfileModel');
const { validationResult } = require('express-validator');

const get = (req, res) => {
  const where = {};
  if (req.query.nombre) where.nombre = req.query.nombre;

  Profile.findAll({ where, order: [['id', 'ASC']] })
    .then(rows => res.json(rows))
    .catch(() => res.status(500).send('Error consultando perfiles'));
};

const getById = (req, res) => {
  Profile.findByPk(req.params.id)
    .then(row => row ? res.json(row) : res.status(404).send('Recurso no encontrado'))
    .catch(() => res.status(500).send('Error al consultar el perfil'));
};

const create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

  Profile.create(req.body)
    .then(newRow => res.status(201).json(newRow))
    .catch(() => res.status(500).send('Error al crear perfil'));
};

const update = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

  Profile.update(req.body, { where: { id: req.params.id } })
    .then(([num]) => res.status(200).send(`${num} registro actualizado`))
    .catch(() => res.status(500).send('Error al actualizar perfil'));
};

const destroy = (req, res) => {
  Profile.destroy({ where: { id: req.params.id } })
    .then(num => res.status(200).send(`${num} registro eliminado`))
    .catch(() => res.status(500).send('Error al eliminar perfil'));
};

module.exports = { get, getById, create, update, destroy };
