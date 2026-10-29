const express = require('express');
const Service = require('../models/Service');
const { verifyAdmin } = require('../middleware/auth');

const router = express.Router();

// 1. PUBLIC: Get all service cards (sorted by order)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().sort({ order: 1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch services', error: error.message });
  }
});

// 2. ADMIN: Create a new service card
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create service', error: error.message });
  }
});

// 3. ADMIN: Update an existing service card
router.patch('/:id', verifyAdmin, async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after', runValidators: true }
    );
    
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update service', error: error.message });
  }
});

// 4. ADMIN: Delete a service card
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete service', error: error.message });
  }
});

module.exports = router;