// server.js
import express from 'express';
import productsRouter from './routes/products.routes.js';
import { requireClassroomClient } from './middleware/clientHeader.js';

const app = express();

// Habilita JSON en req.body (para POST/PATCH)
app.use(express.json());

// 🔒 Middleware global: exige header x-client: classroom en TODAS las rutas
app.use(requireClassroomClient);

// Rutas de productos
app.use('/api/v1/products', productsRouter);

// (Opcional) 404 para rutas no encontradas
app.use((req, res) => {
  return res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});


