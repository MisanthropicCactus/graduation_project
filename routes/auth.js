const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/login', async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).send('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.post('/signup', async (req, res) => {
  console.log('Sing uprequest received:', req.body); 
  const {
    firstName , 
    lastName , 
    email , 
    phone , 
    birthDate , 
    gender , 
    licenseNumber , 
    licenseDate , 
    password , 
    confirmPassword , 
    agreeTerms 
  } = req.body;
  if (confirmPassword !==  password   &&   !(typeof password === 'undefined') ) {
    return res.status(400).json({ message: 'confirmPassword != password' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = await User.create({
      first_name : firstName  , 
      last_name : lastName  , 
      email : email  , 
      phone : phone  , 
      password : hashedPassword  , 
      birth_date : birthDate  , 
      gender : gender  , 
      license_number : licenseNumber  ,  
      license_date :  licenseDate  ,
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

module.exports = router;
