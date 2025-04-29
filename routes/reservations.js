const express = require('express');
const router = express.Router();
const Reservation = require('../models/reservation');

// Get all reservations
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.json(reservations);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get a reservation by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).send('Reservation not found');
    }
    res.json(reservation);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Create a new reservation
router.post('/', async (req, res) => {
  const { car_id, user_id, reception_date, return_date, location } = req.body;
  try {
    const newReservation = await Reservation.create({
      car_id,
      user_id,
      reception_date,
      return_date,
      location
    });
    res.status(201).json(newReservation);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Update a reservation by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).send('Reservation not found');
    }
    await reservation.update(req.body);
    res.json(reservation);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Delete a reservation by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const reservation = await Reservation.findByPk(id);
    if (!reservation) {
      return res.status(404).send('Reservation not found');
    }
    await reservation.destroy();
    res.json({ message: 'Reservation deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
