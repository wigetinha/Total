const { DataTypes } = require('sequelize');
const { connection } = require('../config.db');
const { Profile } = require('./ProfileModel');

const User = connection.define('User', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  perfil_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  apellidos: { type: DataTypes.STRING(100), allowNull: false },
  nick: { type: DataTypes.STRING(20), allowNull: false },
  correo: { type: DataTypes.STRING(255), allowNull: false, unique: true },
  // usamos "password" en JS pero mapeado al campo `contraseña` en DB:
  password: { type: DataTypes.STRING(255), allowNull: false, field: 'contraseña' },
  activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  UserAlta: { type: DataTypes.STRING(20), allowNull: false },
  FechaAlta: { type: DataTypes.DATE, allowNull: false },
  UserMod: { type: DataTypes.STRING(20), allowNull: false },
  FechaMod: { type: DataTypes.DATE, allowNull: false },
  UserBaja: { type: DataTypes.STRING(20), allowNull: false },
  FechaBaja: { type: DataTypes.DATE, allowNull: false }
}, {
  tableName: 'users'
});

// relación: users.perfil_id -> profiles.id
User.belongsTo(Profile, { as: 'perfil', foreignKey: 'perfil_id' });

module.exports = { User };
