const express = require('express');
const mongoose = require('mongoose');
const Service = require('../models/Service');
const { verifyAdmin } = require('../middleware/auth');

const router = express.Router();
const editableFields = ['title', 'description', 'image', 'icon', 'order'];
const iconNames = ['search', 'shopping-cart', 'bar-chart', 'paper-airplane', 'headset'];
const validationErrorNames = ['StrictModeError', 'ValidationError', 'CastError'];

const isPlainObject = (value) => (
  value !== null &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  Object.getPrototypeOf(value) === Object.prototype
);

const validateServiceBody = (body, { partial = false } = {}) => {
  if (!isPlainObject(body)) {
    return 'Request body must be a JSON object';
  }

  const keys = Object.keys(body);
  if (keys.some((key) => !editableFields.includes(key))) {
    return `Only these fields can be changed: ${editableFields.join(', ')}`;
  }

  if (partial && keys.length === 0) {
    return 'At least one service field must be provided';
  }

  if (!partial && !['title', 'description', 'image'].every((key) => Object.hasOwn(body, key))) {
    return 'Title, description, and image are required';
  }

  for (const key of ['title', 'description', 'image']) {
    if (Object.hasOwn(body, key) && typeof body[key] !== 'string') {
      return `${key} must be a string`;
    }
  }

  if (Object.hasOwn(body, 'icon') && (typeof body.icon !== 'string' || !iconNames.includes(body.icon))) {
    return `Icon must be one of: ${iconNames.join(', ')}`;
  }

  if (Object.hasOwn(body, 'order') && (!Number.isInteger(body.order) || body.order < 0)) {
    return 'Order must be a non-negative integer';
  }

  return null;
};

router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1, createdAt: 1, _id: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch services', error: error.message });
  }
});

router.post('/', verifyAdmin, async (req, res) => {
  const validationError = validateServiceBody(req.body);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const service = await Service.create(req.body);
    return res.status(201).json(service);
  } catch (error) {
    if (validationErrorNames.includes(error.name)) {
      return res.status(400).json({ message: 'Invalid service', error: error.message });
    }

    return res.status(500).json({ message: 'Failed to create service', error: error.message });
  }
});

router.patch('/:id', verifyAdmin, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid service id' });
  }

  const validationError = validateServiceBody(req.body, { partial: true });
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    service.set(req.body);
    await service.save();
    return res.json(service);
  } catch (error) {
    if (validationErrorNames.includes(error.name)) {
      return res.status(400).json({ message: 'Invalid service', error: error.message });
    }

    return res.status(500).json({ message: 'Failed to update service', error: error.message });
  }
});

router.delete('/:id', verifyAdmin, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid service id' });
  }

  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    return res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete service', error: error.message });
  }
});

module.exports = router;