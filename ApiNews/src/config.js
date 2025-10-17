// src/config.js
require('dotenv').config();

const PORT       = process.env.PORT       || 3000;
const DB_HOST    = process.env.DB_HOST    || 'localhost';
const DB_USER    = process.env.DB_USER    || 'root';
const DB_PASSWORD= process.env.DB_PASSWORD|| '';
const DB_NAME    = process.env.DB_NAME    || 'db_news';
const DB_PORT    = Number(process.env.DB_PORT || 3306);

const JWT_SECRET   = process.env.JWT_SECRET || 'cambia_esto_en_.env';
const JWT_EXPIRES  = process.env.JWT_EXPIRES || '24h';


module.exports = { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, JWT_SECRET, JWT_EXPIRES };
