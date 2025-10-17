// src/models/UserModel.js
const { DataTypes } = require('sequelize');
const { connection } = require('../config.db');

const User = connection.define('User', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  perfil_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  apellidos: { type: DataTypes.STRING(100), allowNull: false },
  nick: { type: DataTypes.STRING(20), allowNull: false },
  correo: { type: DataTypes.STRING(255), allowNull: false, unique: true },

  // atributo "password" mapeado a la columna `contraseña`
  password: { type: DataTypes.STRING(255), allowNull: false, field: 'contraseña' },

  activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },

  // defaults para que no falle el create
  UserAlta:  { type: DataTypes.STRING(20), allowNull: false, defaultValue: 'Auth' },
  FechaAlta: { type: DataTypes.DATE,       allowNull: false, defaultValue: new Date('1990-01-01T00:00:00Z') },
  UserMod:   { type: DataTypes.STRING(20), allowNull: false, defaultValue: '' },
  FechaMod:  { type: DataTypes.DATE,       allowNull: false, defaultValue: new Date('1990-01-01T00:00:00Z') },
  UserBaja:  { type: DataTypes.STRING(20), allowNull: false, defaultValue: '' },
  FechaBaja: { type: DataTypes.DATE,       allowNull: false, defaultValue: new Date('1990-01-01T00:00:00Z') }
}, {
  tableName: 'users'
});

module.exports = { User };
