const { Category } = require('../models');

async function list(req, res) {
  const items = await Category.findAll({ order: [['id', 'ASC']] });
  res.json(items);
}

async function create(req, res) {
  const payload = req.body;
  const now = new Date();
  const item = await Category.create({
    ...payload,
    UserAlta: payload.UserAlta ?? 'Admin',
    FechaAlta: payload.FechaAlta ?? now,
    UserMod: payload.UserMod ?? '',
    FechaMod: payload.FechaMod ?? new Date('1990-01-01T00:00:00Z'),
    UserBaja: payload.UserBaja ?? '',
    FechaBaja: payload.FechaBaja ?? new Date('1990-01-01T00:00:00Z')
  });
  res.status(201).json(item);
}

async function update(req, res) {
  const { id } = req.params;
  const payload = req.body;
  const item = await Category.findByPk(id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  await item.update({ ...payload, FechaMod: new Date() });
  res.json(item);
}

async function remove(req, res) {
  const { id } = req.params;
  const item = await Category.findByPk(id);
  if (!item) return res.status(404).json({ message: 'Not found' });
  // Borrado lógico
  await item.update({ activo: false, UserBaja: 'Admin', FechaBaja: new Date() });
  res.json({ message: 'OK' });
}

module.exports = { list, create, update, remove };
