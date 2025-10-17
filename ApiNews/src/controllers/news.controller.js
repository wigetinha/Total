// src/controllers/news.controller.js
const { News } = require('../models/NewsModel');
const { Category } = require('../models/CategoryModel');
const { State } = require('../models/StateModel');
const { User } = require('../models/UserModel');
const { Profile } = require('../models/ProfileModel');
const { validationResult } = require('express-validator');

const relationsUser = [{ model: Profile, as: 'perfil', attributes: ['id', 'nombre'] }];

const include = [
  { model: Category, as: 'categoria', attributes: ['id', 'nombre', 'descripcion'] },
  { model: State,    as: 'estado',    attributes: ['id', 'nombre', 'abreviacion'] },
  { model: User,     as: 'usuario',   attributes: ['id', 'perfil_id', 'nick', 'nombre'], include: relationsUser }
];

const get = (req, res) => {
  const { titulo, activo } = req.query;
  const where = {};
  if (titulo) where.titulo = titulo;
  if (typeof activo !== 'undefined') where.activo = activo;

  News.findAll({ where, include, order: [['fecha_publicacion', 'DESC']] })
    .then(rows => res.json(rows))
    .catch(() => res.status(500).send('Error consultando noticias'));
};

const getById = (req, res) => {
  News.findByPk(req.params.id, { include })
    .then(row => row ? res.json(row) : res.status(404).send('Recurso no encontrado'))
    .catch(() => res.status(500).send('Error al consultar la noticia'));
};

const create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

  News.create(req.body)
    .then(newRow => res.status(201).json(newRow))
    .catch(() => res.status(500).send('Error al crear noticia'));
};

const update = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

  News.update(req.body, { where: { id: req.params.id } })
    .then(([num]) => res.status(200).send(`${num} registro actualizado`))
    .catch(() => res.status(500).send('Error al actualizar noticia'));
};

const destroy = (req, res) => {
  News.destroy({ where: { id: req.params.id } })
    .then(num => res.status(200).send(`${num} registro eliminado`))
    .catch(() => res.status(500).send('Error al eliminar noticia'));
};

module.exports = { get, getById, create, update, destroy };
