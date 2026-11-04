const express = require('express');
const SiteSettings = require('../models/SiteSettings');
const { verifyAdmin } = require('../middleware/auth');

const router = express.Router();

const serializeSettings = (settings) => {
  const result = settings.toObject({ versionKey: false });
  delete result.key;
  return result;
};

router.get('/', async (req, res) => {
  try {
    const settings = await SiteSettings.findOne({ key: 'global' });

    if (!settings) {
      return res.status(404).json({ message: 'Site settings have not been configured' });
    }

    return res.json(serializeSettings(settings));
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch site settings', error: error.message });
  }
});

router.patch('/', verifyAdmin, async (req, res) => {
  if (!req.body || typeof req.body !== 'object' || Array.isArray(req.body)) {
    return res.status(400).json({ message: 'Request body must be a JSON object' });
  }

  if (Object.prototype.hasOwnProperty.call(req.body, 'key') && req.body.key !== 'global') {
    return res.status(400).json({ message: 'Site settings key must be global' });
  }

  const updates = { ...req.body };
  delete updates.key;
  delete updates._id;
  delete updates.__v;
  delete updates.createdAt;
  delete updates.updatedAt;

  try {
    // findOneAndUpdate with upsert safely updates existing docs (even legacy ones) or creates a new one
    const settings = await SiteSettings.findOneAndUpdate(
      { key: 'global' },
      { $set: updates },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true
      }
    );

    return res.json(serializeSettings(settings));
  } catch (error) {
    if (['StrictModeError', 'ValidationError', 'CastError'].includes(error.name)) {
      return res.status(400).json({ message: 'Invalid site settings', error: error.message });
    }

    return res.status(500).json({ message: 'Failed to update site settings', error: error.message });
  }
}); 

module.exports = router;    