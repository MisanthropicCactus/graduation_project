// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');



router.get('/ping', async (req, res) => {

  res.status(200).send('pong');
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Create a new user
router.post('/', async (req, res) => {
  const { first_name, last_name, email, phone, password } = req.body;
  try {
    const newUser = await User.create({ first_name, last_name, email, phone, password});
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    await user.update(req.body);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}); 

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
/*
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email'] // Do not send password!
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
*/
module.exports = router;
