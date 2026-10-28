const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { verifyAdmin } = require('../middleware/auth');

// Public registration is disabled. Keep this explicit response for old clients.
router.post('/signup', (req, res) => {
  res.status(410).json({ message: 'Public registration is disabled' });
});

// -------------------------------------------------------------
// ADMIN LOGIN ROUTE (POST /api/auth/login)
// -------------------------------------------------------------
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    if (user.role !== 'admin') {
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