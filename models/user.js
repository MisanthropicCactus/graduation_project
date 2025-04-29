// models/user.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Adjust the path as necessary


class User extends Model {}

User .init({

  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },

  phone: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },

  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  birth_date: {  // Added field for birth date
    type: DataTypes.DATE,
    allowNull: false,
  },

  gender: {  // Added field for gender
    type: DataTypes.STRING(10), // Adjust size as necessary
    allowNull: false,
  },

  license_number: {  // Added field for license number
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  license_date: {  // Added field for license date
    type: DataTypes.DATE,
    allowNull: false,
  },

  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },

}, {

  sequelize,

  modelName: 'User ',

  tableName: 'users',

  timestamps: false, // Disable automatic timestamps since we have created_at

});


module.exports = User;