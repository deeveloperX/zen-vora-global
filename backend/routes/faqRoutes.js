const express = require('express');
const mongoose = require('mongoose');
const FAQ = require('../models/FAQ');
const { verifyAdmin } = require('../middleware/auth');

const router = express.Router();
const editableFields = ['question', 'answer', 'category', 'order', 'isPublished'];
const validationErrorNames = ['StrictModeError', 'ValidationError', 'CastError'];

const isPlainObject = (value) => (
  value !== null &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  Object.getPrototypeOf(value) === Object.prototype
);

const validateFaqBody = (body, { partial = false } = {}) => {
  if (!isPlainObject(body)) {
    return 'Request body must be a JSON object';
  }

  const keys = Object.keys(body);
  if (keys.some((key) => !editableFields.includes(key))) {
    return `Only these fields can be changed: ${editableFields.join(', ')}`;
  }

  if (partial && keys.length === 0) {
    return 'At least one FAQ field must be provided';
  }

  if (!partial && (!Object.hasOwn(body, 'question') || !Object.hasOwn(body, 'answer'))) {
    return 'Question and answer are required';
  }

  if (Object.hasOwn(body, 'question') && typeof body.question !== 'string') {
    return 'Question must be a string';
  }

  if (Object.hasOwn(body, 'answer') && typeof body.answer !== 'string') {
    return 'Answer must be a string';
  }

  if (Object.hasOwn(body, 'category') && typeof body.category !== 'string') {
    return 'Category must be a string';
  }

  if (Object.hasOwn(body, 'order') && (!Number.isInteger(body.order) || body.order < 0)) {
    return 'Order must be a non-negative integer';
  }

  if (Object.hasOwn(body, 'isPublished') && typeof body.isPublished !== 'boolean') {
    return 'isPublished must be a boolean';
  }

  return null;
};

const sortFaqs = (query) => query.sort({ order: 1, createdAt: 1, _id: 1 });

router.get('/', async (req, res) => {
  try {
    const faqs = await sortFaqs(FAQ.find({ isPublished: true }));
    return res.json(faqs);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch FAQs', error: error.message });
  }
});

router.get('/admin', verifyAdmin, async (req, res) => {
  try {
    const faqs = await sortFaqs(FAQ.find());
    return res.json(faqs);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch FAQs', error: error.message });
  }
});

router.post('/', verifyAdmin, async (req, res) => {
  const validationError = validateFaqBody(req.body);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const faq = await FAQ.create(req.body);
    return res.status(201).json(faq);
  } catch (error) {
    if (validationErrorNames.includes(error.name)) {
      return res.status(400).json({ message: 'Invalid FAQ', error: error.message });
    }

    return res.status(500).json({ message: 'Failed to create FAQ', error: error.message });
  }
});

router.patch('/:id', verifyAdmin, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid FAQ id' });
  }

  const validationError = validateFaqBody(req.body, { partial: true });
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const faq = await FAQ.findById(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    faq.set(req.body);
    await faq.save();
    return res.json(faq);
  } catch (error) {
    if (validationErrorNames.includes(error.name)) {
      return res.status(400).json({ message: 'Invalid FAQ', error: error.message });
    }

    return res.status(500).json({ message: 'Failed to update FAQ', error: error.message });
  }
});

router.delete('/:id', verifyAdmin, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid FAQ id' });
  }

  try {
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' });
    }

    return res.status(204).json({ message: 'FAQ deleted'});
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete FAQ', error: error.message });
  }
});

module.exports = router;
