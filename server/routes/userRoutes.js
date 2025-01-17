// routes/userRoutes.js
const express = require('express');
const User = require('../models/user'); // Make sure to import the User model
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const router = express.Router();


router.get('/dashboard', auth, (req, res) => {
  res.json({ message: 'Welcome to the dashboard', user: req.user });
});

// Get user info based on user ID or email
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // Fetch user by ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user); // Send user data back to the client
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// POST route for user registration
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  console.log(username, email, password);

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// POST route for user login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare passwords (assuming you hash them)
    const isMatch = bcrypt.compareSync(password, user.password);
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    if (user.password == password) {
      // Create JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour
      });
      const uid = user._id;
      res.status(200).json({ message: 'Login successful', token, uid});
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
