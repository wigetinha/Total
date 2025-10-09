// routes/products.routes.js
import { Router } from 'express';

const router = Router();

/**
 * "Base de datos" en memoria (solo para practicar).
 * En la vida real esto sería una base de datos como MySQL, MongoDB, etc.
 */
let products = [
  { id: '1', name: 'Coffee Beans' },
  { id: '2', name: 'Green Tea' },
  { id: '3', name: 'Hot Chocolate' }
];

/**
 * GET /api/v1/products?page=&limit=&q=
 * - page: página actual (por defecto 1)
 * - limit: cuántos elementos por página (por defecto 10)
 * - q: texto de búsqueda por nombre (opcional)
 *
 * Ejemplos:
 *  /api/v1/products
 *  /api/v1/products?page=2&limit=1
 *  /api/v1/products?q=tea
 */
router.get('/', (req, res) => {
  // Lee query params como strings; conviértelos a número con valores por defecto
  const page = Math.max(parseInt(req.query.page ?? '1', 10), 1);
  const limit = Math.max(parseInt(req.query.limit ?? '10', 10), 1);
  const q = (req.query.q ?? '').toString().toLowerCase();

  // Filtra por nombre si viene q
  let filtered = products;
  if (q) {
    filtered = products.filter(p => p.name.toLowerCase().includes(q));
  }

  // Calcula el rango para paginar
  const start = (page - 1) * limit;
  const end = start + limit;

  // Respuesta con metadatos
  return res.json({
    page,
    limit,
    total: filtered.length,
    data: filtered.slice(start, end)
  });
});

/**
 * GET /api/v1/products/:id
 * - Devuelve un producto por ID
 * - Si no existe, 404
 */
router.get('/:id', (req, res) => {
  const prod = products.find(p => p.id === req.params.id);
  if (!prod) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json(prod);
});

/**
 * POST /api/v1/products
 * - Crea un producto nuevo
 * - Debe venir { "name": "..." }
 * - Si falta "name" o es vacío, responde 400
 * - Si todo bien, responde 201 con el producto creado
 */
router.post('/', (req, res) => {
  const { name } = req.body ?? {};

  // Validación de "name"
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Field "name" is required' });
  }

  // Crea un ID sencillo usando la fecha (solo para práctica)
  const newProd = { id: String(Date.now()), name: name.trim() };
  products.push(newProd);

  return res.status(201).json(newProd);
});

/**
 * PATCH /api/v1/products/:id
 * - Actualiza parcialmente (por ahora solo "name")
 * - Si el producto no existe, 404
 * - Si "name" viene pero es inválido, 400
 */
router.patch('/:id', (req, res) => {
  const prod = products.find(p => p.id === req.params.id);
  if (!prod) {
    return res.status(404).json({ error: 'Not found' });
  }

  const { name } = req.body ?? {};
  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Field "name" must be a non-empty string' });
    }
    prod.name = name.trim();
  }

  return res.json(prod);
});

/**
 * DELETE /api/v1/products/:id
 * - Elimina el producto si existe
 * - Siempre responde 204 (sin cuerpo)
 */
router.delete('/:id', (req, res) => {
  products = products.filter(p => p.id !== req.params.id);
  return res.status(204).end();
});

export default router;
