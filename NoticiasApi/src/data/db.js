const bcrypt = require('bcryptjs');
const { v4: uuid } = require('uuid');

const perfiles = [
  { id: 1, nombre: 'Administrador' },
  { id: 2, nombre: 'Contribuidor' },
];

const ahora = () => new Date().toISOString();
const sys = 'System';

// Estados (seed)
const states = [
  { id: uuid(), nombre: 'Yucatán', abreviacion: 'YUC', activo: true, UserAlta: sys, FechaAlta: ahora() },
  { id: uuid(), nombre: 'Ciudad de México', abreviacion: 'CDMX', activo: true, UserAlta: sys, FechaAlta: ahora() },
  { id: uuid(), nombre: 'Jalisco', abreviacion: 'JAL', activo: true, UserAlta: sys, FechaAlta: ahora() },
];

// Categorías (seed)
const categories = [
  { id: uuid(), nombre: 'Política', descripcion: 'Noticias de política', activo: true, UserAlta: sys, FechaAlta: ahora() },
  { id: uuid(), nombre: 'Economía', descripcion: 'Noticias económicas', activo: true, UserAlta: sys, FechaAlta: ahora() },
];

// Usuarios (seed) -> admin
const users = [
  {
    id: uuid(),
    profile_id: 1, // Administrador
    nombres: 'Admin',
    apellidos: 'MX',
    nick: 'admin',
    correo: 'admin@news.mx',
    passwordHash: bcrypt.hashSync('admin123', 10), // ⚠️ nunca devolver
    activo: true,
    UserAlta: sys, FechaAlta: ahora()
  }
];

// Noticias (vacío al inicio)
// estatus: 'pendiente' | 'aprobada' | 'rechazada'
const news = [];

module.exports = { perfiles, users, categories, states, news, ahora };
