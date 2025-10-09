const { DataTypes } = require('sequelize');
const { connection } = require('../config.db');
const { Category } = require('./CategoryModel');
const { State } = require('./StateModel');
const { User } = require('./UserModel');

const News = connection.define('News', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  categoria_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  estado_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  usuario_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  titulo: { type: DataTypes.STRING(50), allowNull: false },
  fecha_publicacion: { type: DataTypes.DATE, allowNull: false },
  descripcion: { type: DataTypes.STRING(1000), allowNull: false },
  imagen: { type: DataTypes.TEXT('medium'), allowNull: false },
  activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  UserAlta: { type: DataTypes.STRING(20), allowNull: false },
  FechaAlta: { type: DataTypes.DATE, allowNull: false },
  UserMod: { type: DataTypes.STRING(20), allowNull: false },
  FechaMod: { type: DataTypes.DATE, allowNull: false },
  UserBaja: { type: DataTypes.STRING(20), allowNull: false },
  FechaBaja: { type: DataTypes.DATE, allowNull: false }
}, {
  tableName: 'news'
});

// belongsTo según tu diseño:
News.belongsTo(Category, { as: 'categoria', foreignKey: 'categoria_id' });
News.belongsTo(State, { as: 'estado', foreignKey: 'estado_id' });
News.belongsTo(User, { as: 'usuario', foreignKey: 'usuario_id' });

module.exports = { News };
