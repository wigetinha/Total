// src/controllers/categories.controller.js
const { Category } = require('../models/CategoryModel');
const { validationResult } = require('express-validator');

const get = (req, res) => {
  const { nombre, descripcion, activo, useralta } = req.query;
  const where = {};
  if (nombre) where.nombre = nombre;
  if (descripcion) where.descripcion = descripcion;
  if (typeof activo !== 'undefined') where.activo = activo;
  if (useralta) where.UserAlta = useralta;

  Category.findAll({ where, order: [['id', 'ASC']] })
    .then(rows => res.json(rows))
    .catch(() => res.status(500).send('Error consultando categorías'));
};

const getById = (req, res) => {
  Category.findByPk(req.params.id)
    .then(row => row ? res.json(row) : res.status(404).send('Recurso no encontrado'))
    .catch(() => res.status(500).send('Error al consultar la categoría'));
};

const create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

  Category.create(req.body)
    .then(newRow => res.status(201).json(newRow))
    .catch(() => res.status(500).send('Error al crear categoría'));
};

const update = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

  Category.update(req.body, { where: { id: req.params.id } })
    .then(([num]) => res.status(200).send(`${num} registro actualizado`))
    .catch(() => res.status(500).send('Error al actualizar categoría'));
};

const destroy = (req, res) => {
  Category.destroy({ where: { id: req.params.id } })
    .then(num => res.status(200).send(`${num} registro eliminado`))
    .catch(() => res.status(500).send('Error al eliminar categoría'));
};

module.exports = { get, getById, create, update, destroy };
