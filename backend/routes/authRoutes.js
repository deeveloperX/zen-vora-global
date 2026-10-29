const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyAdmin } = require('../middleware/auth');

// -------------------------------------------------------------
// 1. SIGNUP ROUTE (POST /api/auth/signup)
// -------------------------------------------------------------
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password securely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user (Role defaults to 'user' unless explicitly specified)
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    await newUser.save();

    res.status(201).json({ 
      message: 'User registered successfully!',
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during signup', error: error.message });
  }
}); 
// -------------------------------------------------------------
// LOGIN ROUTE (POST /api/auth/login)
// -------------------------------------------------------------
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

    // Find user by email
    const user = normalizedEmail ? await User.findOne({ email: normalizedEmail }) : null;
    if (!user || typeof password !== 'string') {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT Token with user id and role
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful!',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
});

// -------------------------------------------------------------
// ADMIN USER DATA ROUTE (GET /api/auth/users)
// Protected: Only accessible with a valid Admin JWT token!
// -------------------------------------------------------------
router.get('/users', verifyAdmin, async (req, res) => {
  try {
    // Fetch all users from MongoDB, excluding their hashed passwords
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});

module.exports = router;