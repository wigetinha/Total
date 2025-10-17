// src/controllers/state.controller.js
const { State } = require('../models/StateModel');
const { validationResult } = require('express-validator');

const get = (req, res) => {
  const where = {};
  if (req.query.nombre) where.nombre = req.query.nombre;
  if (req.query.abreviacion) where.abreviacion = req.query.abreviacion;

  State.findAll({ where, order: [['id', 'ASC']] })
    .then(rows => res.json(rows))
    .catch(() => res.status(500).send('Error consultando estados'));
};

const getById = (req, res) => {
  State.findByPk(req.params.id)
    .then(row => row ? res.json(row) : res.status(404).send('Recurso no encontrado'))
    .catch(() => res.status(500).send('Error al consultar el estado'));
};

const create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

  State.create(req.body)
    .then(newRow => res.status(201).json(newRow))
    .catch(() => res.status(500).send('Error al crear estado'));
};

const update = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

  State.update(req.body, { where: { id: req.params.id } })
    .then(([num]) => res.status(200).send(`${num} registro actualizado`))
    .catch(() => res.status(500).send('Error al actualizar estado'));
};

const destroy = (req, res) => {
  State.destroy({ where: { id: req.params.id } })
    .then(num => res.status(200).send(`${num} registro eliminado`))
    .catch(() => res.status(500).send('Error al eliminar estado'));
};

module.exports = { get, getById, create, update, destroy };
