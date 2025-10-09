const { connection } = require('../config.db');
const { Profile } = require('./ProfileModel');
const { State } = require('./StateModel');
const { Category } = require('./CategoryModel');
const { User } = require('./UserModel');
const { News } = require('./NewsModel');

// Opcional: hasMany (no es obligatorio, pero útil para includes inversos)
// Category.hasMany(News, { as: 'noticias', foreignKey: 'categoria_id' });
// State.hasMany(News, { as: 'noticias', foreignKey: 'estado_id' });
// Profile.hasMany(User, { as: 'usuarios', foreignKey: 'perfil_id' });

module.exports = { connection, Profile, State, Category, User, News };
