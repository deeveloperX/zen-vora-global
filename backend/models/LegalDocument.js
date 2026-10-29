const mongoose = require('mongoose');

const legalDocumentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Document title is required'],
    trim: true
  },
  slug: {
    type: String,
    required: [true, 'Document slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Document content is required']
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });
module.exports = mongoose.model('LegalDosument', legalDocumentSchema);