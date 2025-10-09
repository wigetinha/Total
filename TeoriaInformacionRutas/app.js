const express = require('express');
const user_routes = require('./routes/UserRoute'); // ← esto devuelve el router

const app = express();
app.use(express.json());
app.use('/api', user_routes);

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
