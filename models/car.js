// models/car.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize'); // Adjust the path as necessary

class Car extends Model {}

Car.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  seats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fueltype: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  transmission: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Car',
  tableName: 'cars',
  timestamps: false, // Disable automatic timestamps since we don't have created_at
});

module.exports = Car;