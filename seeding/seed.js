const fs = require('fs');
const { Sequelize } = require('sequelize');
const User = require('./models/User');
const Car = require('./models/Car');
const Reservation = require('./models/Reservation');

const sequelize = new Sequelize({
  database: process.env.DB_NAME, 
  username: process.env.DB_USER, 
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,  
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  models: [
      User,
      Car,
      Reservation   
]});

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');

    // Read the JSON file
    const data = JSON.parse(fs.readFileSync('seedData.json', 'utf8'));

    // Insert Users
    await User.bulkCreate(data.users);
    console.log('Users seeded...');

    // Insert Cars
    await Car.bulkCreate(data.cars);
    console.log('Cars seeded...');

    // Insert Reservations
    await Reservation.bulkCreate(data.reservations);
    console.log('Reservations seeded...');

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();