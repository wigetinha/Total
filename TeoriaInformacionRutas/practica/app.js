// app.js
const express = require('express');
const userRoutes = require('./routes/UserRoute');

const app = express();

// Middleware para JSON
app.use(express.json());

// Montar rutas bajo /api
app.use('/api', userRoutes);

// (Opcional) manejo básico de 404 para rutas no existentes
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado xd en http://localhost:${PORT}`);
});

