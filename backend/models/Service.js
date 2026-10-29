const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service card title is required']
  },
  description: {
    type: String,
    required: [true, 'Service card description is required']
  },
  image: {
    type: String,
    required: [true, 'Service background image is required']
  },
  icon: {
    type: String //Identifier or URL for the small overlay icon (e.g., search, cart, headset)
  },
  order: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);