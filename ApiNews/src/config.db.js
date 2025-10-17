const { Sequelize } = require('sequelize');
require('dotenv').config();
const { DB_HOST, DB_PORT, DB_NAME, DB_PASSWORD, DB_USER } = require('./config');

const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

(async () => {
  try {
    await connection.authenticate();
    console.log('✅ Conexión a MySQL OK');
  } catch (err) {
    console.error('❌ Error de conexión:', err);
  }
})();

module.exports = { connection };
