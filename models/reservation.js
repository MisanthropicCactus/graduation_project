// models/reservation.js

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/sequelize'); // Adjust the path as necessary

const Car = require('./car'); // Import Car model

const User = require('./user'); // Import User model


class Reservation extends Model {}


Reservation.init({

  id: {

    type: DataTypes.INTEGER,

    primaryKey: true,

    autoIncrement: true,

  },

  car_id: {

    type: DataTypes.INTEGER,

    allowNull: false,

    references: {

      model: Car,

      key: 'id',

    },

    onDelete: 'CASCADE', // Delete reservations if the car is deleted

  },

  user_id: {

    type: DataTypes.INTEGER,

    allowNull: false,

    references: {

      model: User,

      key: 'id',

    },

    onDelete: 'CASCADE', // Delete reservations if the user is deleted

  },

  startDate: { // Renamed from reception_date

    type: DataTypes.DATE,

    allowNull: false,

  },

  endDate: { // Renamed from return_date

    type: DataTypes.DATE,

    allowNull: false,

  },

  location: {

    type: DataTypes.STRING(100),

    allowNull: false,

  },

  status: { // New field for reservation status

    type: DataTypes.STRING(20),

    allowNull: false,

  },

  price: { // New field for daily price

    type: DataTypes.FLOAT,

    allowNull: false,

  },

  totalPrice: { // New field for total price

    type: DataTypes.FLOAT,

    allowNull: false,

  },

  created_at: {

    type: DataTypes.DATE,

    defaultValue: DataTypes.NOW,

  },

}, {

  sequelize,

  modelName: 'Reservation',

  tableName: 'reservations',

  timestamps: false, // Disable automatic timestamps since we have created_at

});


module.exports = Reservation;