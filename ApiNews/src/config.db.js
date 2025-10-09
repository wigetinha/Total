const { Sequelize } = require('sequelize');
const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER, DB_PORT } = require('./config');

const connection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    // Convierte BIT(1) -> booleano real (evita Buffers):
    typeCast: function (field, next) {
      if (field.type === 'BIT' && field.length === 1) {
        const bytes = field.buffer();
        return bytes ? bytes[0] === 1 : 0;
      }
      return next();
    },
    charset: 'utf8mb4'
  },
  define: {
    timestamps: true // usa createdAt/updatedAt como en tu SQL
  }
});

async function testConnection() {
  try {
    await connection.authenticate();
    console.log('✅ Conexión a MySQL establecida.');
  } catch (err) {
    console.error('❌ Error conectando a MySQL:', err.message);
  }
}

module.exports = { connection, testConnection };
