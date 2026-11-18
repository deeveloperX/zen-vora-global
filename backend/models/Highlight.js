const mongoose = require('mongoose');

const highlightSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  subtitle: {
    type: String,
    required: true,
    trim: true
  },
  icon: {
    type: String,
    required: true
  }
  }, {timestamps: true});

  module.exports = mongoose.model('Highlight', highlightSchema);