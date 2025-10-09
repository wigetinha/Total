const { DataTypes } = require('sequelize');
const { connection } = require('../config.db');

const Category = connection.define('Category', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  descripcion: { type: DataTypes.STRING(255), allowNull: false },
  activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  UserAlta: { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'Admin' },
  FechaAlta: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date('1990-01-01T00:00:00Z') },
  UserMod: { type: DataTypes.STRING(20), allowNull: false, defaultValue: '' },
  FechaMod: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date('1990-01-01T00:00:00Z') },
  UserBaja: { type: DataTypes.STRING(20), allowNull: false, defaultValue: '' },
  FechaBaja: { type: DataTypes.DATE, allowNull: false, defaultValue: new Date('1990-01-01T00:00:00Z') }
}, {
  tableName: 'categories'
});

module.exports = { Category };
