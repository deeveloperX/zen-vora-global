const express = require('express');
const Highlight = require('../models/Highlight');
const { verifyAdmin } = require('../middleware/auth');
const { isCustomIconDataUri } = require('../utils/iconValidation');

const router = express.Router();

const ALLOWED_ICONS = ['FiGlobe', 'FiShield', 'FiTruck', 'BsHeadset', 'FiTrendingUp'];

// Helper to validate highlight payload fields
const validateHighlightPayload = (data) => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return 'Highlight data must be an object.';
  }

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
    if (!ALLOWED_ICONS.includes(data.icon) && !isCustomIconDataUri(data.icon)) {
      return `Icon must be one of: ${ALLOWED_ICONS.join(', ')}, or a PNG, JPEG, or WebP image up to 128 KB`;
    }
  }
  return null;
};

// Public: Get all website highlights
router.get('/', async (req, res) => {
  try {
    const highlights = await Highlight.find({}).sort({ id: 1 });
    return res.json(highlights);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch highlights', error: error.message });
  }
});

// Admin: Create a highlight and assign the next available display ID
router.post('/', verifyAdmin, async (req, res) => {
  if (!['title', 'subtitle', 'icon'].every((field) => Object.hasOwn(req.body || {}, field))) {
    return res.status(400).json({ message: 'Title, subtitle, and icon are required.' });
  }

  const validationError = validateHighlightPayload(req.body);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const lastHighlight = await Highlight.findOne().sort({ id: -1 }).select({ id: 1 }).lean();
    const highlight = await Highlight.create({
      id: (lastHighlight?.id ?? 0) + 1,
      title: req.body.title.trim(),
      subtitle: req.body.subtitle.trim(),
      icon: req.body.icon,
    });

    return res.status(201).json(highlight);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'A highlight with this ID already exists. Please try again.' });
    }

    return res.status(500).json({ message: 'Failed to create highlight', error: error.message });
  }
});

// Admin: Update/Save all website highlights (Bulk sync with strict validation)
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

// Admin: Securely update a single highlight by its numeric ID
router.patch('/:id', verifyAdmin, async (req, res) => {
  try {
    const highlightId = Number(req.params.id);
    if (!Number.isInteger(highlightId) || highlightId < 1) {
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

// Admin: Delete one highlight by its numeric ID
router.delete('/:id', verifyAdmin, async (req, res) => {
  const highlightId = Number(req.params.id);
  if (!Number.isInteger(highlightId) || highlightId < 1) {
    return res.status(400).json({ message: 'Invalid highlight ID format' });
  }

  try {
    const deletedHighlight = await Highlight.findOneAndDelete({ id: highlightId });
    if (!deletedHighlight) {
      return res.status(404).json({ message: 'Highlight not found' });
    }

    return res.json({ message: 'Highlight deleted successfully', id: highlightId });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete highlight', error: error.message });
  }
});

module.exports = router;
