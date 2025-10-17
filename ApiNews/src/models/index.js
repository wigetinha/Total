const { connection } = require('../config.db');

const { Profile }   = require('./ProfileModel');
const { State }     = require('./StateModel');
const { Category }  = require('./CategoryModel');
const userModule    = require('./UserModel');
const newsModule    = require('./NewsModel');

// Soportar exportaciones antiguas por si acaso (New vs News)
const User = userModule.User || userModule.New || userModule.News;
const News = newsModule.News || newsModule.New;

if (!User) throw new Error('User model no cargó (revisa export en UserModel.js)');
if (!News) throw new Error('News model no cargó (revisa export en NewsModel.js)');

// Asociaciones
User.belongsTo(Profile, { as: 'perfil', foreignKey: 'perfil_id' });
News.belongsTo(Category, { as: 'categoria', foreignKey: 'categoria_id' });
News.belongsTo(State,    { as: 'estado',    foreignKey: 'estado_id' });
News.belongsTo(User,     { as: 'usuario',   foreignKey: 'usuario_id' });

// (Opcionales inversas)
// Category.hasMany(News, { as: 'noticias', foreignKey: 'categoria_id' });
// State.hasMany(News,    { as: 'noticias', foreignKey: 'estado_id' });
// Profile.hasMany(User,  { as: 'usuarios', foreignKey: 'perfil_id' });

module.exports = { connection, Profile, State, Category, User, News };
