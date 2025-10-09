require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { PORT } = require('./config');
const { testConnection } = require('./config.db');
const routes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

// Healthcheck rápido
app.get('/health/db', async (_req, res) => {
  try {
    await testConnection();
    res.json({ ok: true });
  } catch {
    res.status(500).json({ ok: false });
  }
});

// Rutas API
app.use('/api', routes);

app.listen(PORT, async () => {
  await testConnection();
  console.log(`🚀 Server escuchando bien LOL en http://localhost:${PORT}`);
});

module.exports = app;
