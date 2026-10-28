const express = require('express');
const SiteSettings = require('../models/SiteSettings');
const { verifyAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const settings = await SiteSettings.findOne({ key: 'global' }).select('-key -__v');

    if (!settings) {
      return res.status(404).json({ message: 'Site settings have not been configured' });
    }

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch site settings', error: error.message });
  }
});

router.patch('/', verifyAdmin, async (req, res) => {
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({ message: 'Request body must be a JSON object' });
  }

  try {
    let settings = await SiteSettings.findOne({ key: 'global' });

    if (!settings) {
      settings = new SiteSettings();
    }

    settings.set(req.body);
    await settings.save();

    res.json(settings.toJSON());
  } catch (error) {
    if (error.name === 'StrictModeError' || error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid site settings', error: error.message });
    }

    res.status(500).json({ message: 'Failed to update site settings', error: error.message });
  }
});

module.exports = router;
