const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Section title is required'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Section content is required']
  },
  list: {
    type: [String],
    default: []
  }
});

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
  lastUpdated: {
    type: String,
    required: [true, 'Last updated date is required'],
    default: "October 2026",
    trim: true
  },
  introduction: {
    type: String,
    required: [true, 'Introduction is required']
  },
  sections: [sectionSchema]
}, { timestamps: true });

module.exports = mongoose.model('LegalDocument', legalDocumentSchema);