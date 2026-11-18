const express = require('express');
const Highlight = require('../models/Highlight');
const { verifyAdmin } = require('../middleware/auth');

const router = express.Router();

const ALLOWED_ICONS = ['FiGlobe', 'FiShield', 'FiTruck', 'BsHeadset', 'FiTrendingUp'];

// Helper to validate highlight payload fields
const validateHighlightPayload = (data) => {
  if (data.title !== undefined) {
    if (typeof data.title !== 'string' || !data.title.trim()) {
      return 'Title must be a non-empty string.';
    }
  }
  if (data.subtitle !== undefined) {
    if (typeof data.subtitle !== 'string' || !data.subtitle.trim()) {
      return 'Subtitle must be a non-empty string.';
    }
  }
  if (data.icon !== undefined) {
    if (!ALLOWED_ICONS.includes(data.icon)) {
      return `Invalid icon. Allowed icons are: ${ALLOWED_ICONS.join(', ')}`;
    }
  }
  return null;
};

// 1. PUBLIC: Get all website highlights
router.get('/', async (req, res) => {
  try {
    const highlights = await Highlight.find({}).sort({ id: 1 });
    return res.json(highlights);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch highlights', error: error.message });
  }
});

// 2. ADMIN: Update/Save all website highlights (Bulk sync with strict validation)
router.put('/', verifyAdmin, async (req, res) => {
  try {
    const { highlights } = req.body;

    if (!Array.isArray(highlights)) {
      return res.status(400).json({ message: 'Invalid highlights data format. Expected an array.' });
    }

    // Validate each item before executing upserts
    for (const item of highlights) {
      const validationError = validateHighlightPayload(item);
      if (validationError) {
        return res.status(400).json({ message: validationError });
      }
    }

    const updatePromises = highlights.map((item) => {
      return Highlight.findOneAndUpdate(
        { id: Number(item.id) },
        { title: item.title.trim(), subtitle: item.subtitle.trim(), icon: item.icon },
        { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
      );
    });

    const updatedHighlights = await Promise.all(updatePromises);
    return res.json({ 
      message: 'Highlights updated successfully', 
      highlights: updatedHighlights 
    });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update highlights', error: error.message });
  }
});

// 3. ADMIN: Securely update a single highlight by its numeric id
router.patch('/:id', verifyAdmin, async (req, res) => {
  try {
    const highlightId = Number(req.params.id);
    if (isNaN(highlightId)) {
      return res.status(400).json({ message: 'Invalid highlight ID format' });
    }

    // Validate payload fields
    const validationError = validateHighlightPayload(req.body);
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const { title, subtitle, icon } = req.body;
    const updateFields = {};
    if (title !== undefined) updateFields.title = title.trim();
    if (subtitle !== undefined) updateFields.subtitle = subtitle.trim();
    if (icon !== undefined) updateFields.icon = icon;

    const updatedHighlight = await Highlight.findOneAndUpdate(
      { id: highlightId },
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedHighlight) {
      return res.status(404).json({ message: 'Highlight not found' });
    }

    return res.json(updatedHighlight);
  } catch (error) {
    return res.status(400).json({ message: 'Failed to update highlight', error: error.message });
  }
});

module.exports = router;