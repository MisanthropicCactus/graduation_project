// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { Pool } = require('pg');
const usersRouter = require('../routes/users.js');
const carsRouter = require('../routes/cars.js');
const authRouter = require('../routes/auth.js');
const reservationsRouter = require('../routes/reservations.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const {PGOST, PGDATABASE, PGUSER, PGPASSWORD} = process.env;

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: 5432,
  ssl:{
    required : true,
  }
});

pool.connect()
  .then(() => console.log('Connected to Neon database'))
  .catch(err => console.error('Connection error', err.stack));

module.exports = pool;

// Use the users routes
app.use('/api/users', usersRouter);
app.use('/api/cars', carsRouter);
app.use('/api/auth', authRouter);
app.use('/api/reservations', reservationsRouter);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
