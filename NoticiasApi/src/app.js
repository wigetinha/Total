const express = require('express');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const openapi = require('./docs/openapi.json');

dotenv.config();

const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const categoriesRoutes = require('./routes/categories.routes');
const statesRoutes = require('./routes/states.routes');
const newsRoutes = require('./routes/news.routes');

const app = express();
app.use(express.json());

// Healthcheck
app.get('/', (_req, res) => res.json({ ok: true, name: 'Noticias API MX' }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/states', statesRoutes);
app.use('/api/news', newsRoutes);

// Swagger UI
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(openapi));

// 404
app.use((_req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor iniciado LOL en http://localhost:${PORT}`));
