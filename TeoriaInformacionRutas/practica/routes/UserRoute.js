// routes/UserRoute.js
const express = require('express');
const router = express.Router();

// Datos en memoria (simulación)
let usuarios = [
  { id: 1, nombre: "Math Jhon", edad: 25 },
  { id: 2, nombre: "Ana López", edad: 22 },
  { id: 3, nombre: "Carlos Pérez", edad: 30 },
  { id: 4, nombre: "María Gómez", edad: 27 },
  { id: 5, nombre: "John Doe", edad: 25 },
];

/**
 * GET /usuarios
 * - Sin query: devuelve todos
 * - Con query:
 *    ?nombre=texto  (contiene, insensible a mayúsculas)
 *    ?edad=numero   (igualdad)
 *    Puedes combinarlos: ?nombre=john&edad=25
 */
router.get('/usuarios', (req, res) => {
  const { nombre, edad } = req.query;
  let resultado = [...usuarios];

  if (nombre) {
    const n = nombre.toString().toLowerCase();
    resultado = resultado.filter(u => u.nombre.toLowerCase().includes(n));
  }
  if (edad) {
    const e = Number(edad);
    if (!Number.isNaN(e)) {
      resultado = resultado.filter(u => u.edad === e);
    }
  }

  res.json({ total: resultado.length, data: resultado });
});

/**
 * GET /usuarios/:id
 * - Devuelve un usuario por id
 */
router.get('/usuarios/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = usuarios.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: `Usuario con id ${id} no encontrado.` });
  }
  res.json(user);
});

/**
 * POST /usuarios
 * - Agrega un usuario: { nombre, edad }
 * - id se autogenera
 */
router.post('/usuarios', (req, res) => {
  const { nombre, edad } = req.body;

  if (!nombre || typeof nombre !== 'string') {
    return res.status(400).json({ error: 'El campo "nombre" es requerido y debe ser texto.' });
  }
  const edadNum = Number(edad);
  if (Number.isNaN(edadNum) || edadNum <= 0) {
    return res.status(400).json({ error: 'El campo "edad" es requerido y debe ser un número positivo.' });
  }

  const nextId = usuarios.length ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
  const nuevo = { id: nextId, nombre: nombre.trim(), edad: edadNum };
  usuarios.push(nuevo);

  res.status(201).json(nuevo);
});

/**
 * DELETE /usuarios/:id
 * - Elimina por id
 */
router.delete('/usuarios/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = usuarios.findIndex(u => u.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: `Usuario con id ${id} no encontrado.` });
  }
  const eliminado = usuarios.splice(idx, 1)[0];
  res.json({ message: 'Usuario eliminado', data: eliminado });
});

module.exports = router;
