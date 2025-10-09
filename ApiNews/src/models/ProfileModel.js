const { DataTypes } = require('sequelize');
const { connection } = require('../config.db');

const Profile = connection.define('Profile', {
  id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(50), allowNull: false }
}, {
  tableName: 'profiles'
});

module.exports = { Profile };
