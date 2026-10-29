const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const siteSettingsRoutes = require('./routes/siteSettingsRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const legalRoutes = require('./routes/legalRoutes');
const faqRoutes = require('./routes/faqRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Local MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to Local MongoDB (zenvora) Successfully!'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/site-settings', siteSettingsRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/legal', legalRoutes);
app.use('/api/faqs', faqRoutes);

// Base Test Route
app.get('/', (req, res) => {
  res.send('ZenVora Backend API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});