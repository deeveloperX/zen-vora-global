const express = require('express');
const LegalDocument = require('../models/LegalDocument');
const { verifyAdmin } = require('../middleware/auth');

const router = express.Router();

// 1. PUBLIC: Get all legal documents (or summary list)
router.get('/', async (req, res) => {
  try {
    const documents = await LegalDocument.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch legal documents', error: error.message });
  }
});

// 2. PUBLIC: Get a single legal document by slug (e.g., /api/legal/privacy-policy)
router.get('/:slug', async (req, res) => {
  try {
    const document = await LegalDocument.findOne({ slug: req.params.slug });
    if (!document) {
      return res.status(404).json({ message: 'Legal document not found' });
    }
    res.json(document);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch legal document', error: error.message });
  }
});

// 3. ADMIN: Create a new legal document
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const newDoc = new LegalDocument(req.body);
    await newDoc.save();
    res.status(201).json(newDoc);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create legal document', error: error.message });
  }
});

// 4. ADMIN: Update an existing legal document
router.patch('/:id', verifyAdmin, async (req, res) => {
  try {
    const updatedDoc = await LegalDocument.findByIdAndUpdate(
      req.params.id,
      { ...req.body, lastUpdated: Date.now() }, // Automatically update lastUpdated timestamp
      { returnDocument: 'after', runValidators: true }
    );
    
    if (!updatedDoc) {
      return res.status(404).json({ message: 'Legal document not found' });
    }
    
    res.json(updatedDoc);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update legal document', error: error.message });
  }
});

// 5. ADMIN: Delete a legal document
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const deletedDoc = await LegalDocument.findByIdAndDelete(req.params.id);
    
    if (!deletedDoc) {
      return res.status(404).json({ message: 'Legal document not found' });
    }
    
    res.json({ message: 'Legal document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete legal document', error: error.message });
  }
});

module.exports = router;