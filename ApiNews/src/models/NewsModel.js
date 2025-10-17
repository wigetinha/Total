// src/models/NewsModel.js
const { DataTypes } = require('sequelize');
const { connection } = require('../config.db');

const News = connection.define('News', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },

  categoria_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  estado_id:    { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  usuario_id:   { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },

  titulo:            { type: DataTypes.STRING(50),   allowNull: false },
  fecha_publicacion: { type: DataTypes.DATE,         allowNull: false },
  descripcion:       { type: DataTypes.STRING(1000), allowNull: false },
  imagen:            { type: DataTypes.TEXT('medium'), allowNull: false },

  activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },

  // === Auditoría con defaults ===
  UserAlta:  { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'Admin' },
  FechaAlta: { type: DataTypes.DATE,       allowNull: false, defaultValue: new Date('1990-01-01T00:00:00Z') },
  UserMod:   { type: DataTypes.STRING(20), allowNull: false, defaultValue: '' },
  FechaMod:  { type: DataTypes.DATE,       allowNull: false, defaultValue: new Date('1990-01-01T00:00:00Z') },
  UserBaja:  { type: DataTypes.STRING(20), allowNull: false, defaultValue: '' },
  FechaBaja: { type: DataTypes.DATE,       allowNull: false, defaultValue: new Date('1990-01-01T00:00:00Z') },
}, {
  tableName: 'news',
});

module.exports = { News };
