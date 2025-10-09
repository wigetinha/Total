require('dotenv').config();

const PORT = process.env.PORT || 3000;

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);
const DB_NAME = process.env.DB_NAME || 'db_news';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD ?? '';

module.exports = { PORT, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD };
