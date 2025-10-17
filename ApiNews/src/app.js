require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PORT } = require('./config');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// ⚠️ Cargar modelos + asociaciones ANTES de usar rutas
require('./models');

const profile_routes   = require('./routes/profile.routes');
const state_routes     = require('./routes/state.routes');
const category_routes  = require('./routes/categories.routes');
const news_routes      = require('./routes/news.routes');
const user_routes      = require('./routes/user.routes');
const auth_routes      = require('./routes/AuthRoute');

app.use('/api', profile_routes, state_routes, category_routes, news_routes, user_routes, auth_routes);

app.listen(PORT || 3000, () => {
  console.log('Servidor medio escuchando algo LOL en el puerto ' + (PORT || 3000));
});

module.exports = app;
