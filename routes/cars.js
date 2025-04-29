// routes/cars.js
const express = require('express');
const router = express.Router();
const Car = require('../models/car.js');

// Get all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get a car by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).send('Car not found');
    }
    res.json(car);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Create a new car
router.post('/', async (req, res) => {
  try {
    const newCar = await Car.create(req.body);
    res.status(201).json(newCar);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Update a car by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).send('Car not found');
    }
    await car.update(req.body);
    res.json(car);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Delete a car by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const car = await Car.findByPk(id);
    if (!car) {
      return res.status(404).send('Car not found');
    }
    await car.destroy();
    res.json({ message: 'Car deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
