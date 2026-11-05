const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const siteSettingsRoutes = require('./routes/siteSettingsRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const legalRoutes = require('./routes/legalRoutes');
const faqRoutes = require('./routes/faqRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

// Middleware
app.use(express.json());
const allowedOrigins = (
  process.env.FRONTEND_ORIGINS ||
  'http://localhost:5173,http://127.0.0.1:5173'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    callback(null, !origin || allowedOrigins.includes(origin));
  }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/site-settings', siteSettingsRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/legal', legalRoutes);
app.use('/api/faqs', faqRoutes);
app.use('/api/blogs', blogRoutes);

// Base Test Route
app.get('/', (req, res) => {
  res.send('ZenVora Backend API is running...');
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB (zenvora) Successfully!');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exitCode = 1;
  }
}

startServer();