const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Service card title is required'],
    trim: true,
    minlength: [2, 'Service title must be at least 2 characters long'],
    maxlength: [150, 'Service title cannot exceed 150 characters']
  },
  description: {
    type: String,
    required: [true, 'Service card description is required'],
    trim: true,
    minlength: [2, 'Service description must be at least 2 characters long'],
    maxlength: [2000, 'Service description cannot exceed 2000 characters']
  },
  image: {
    type: String,
    required: [true, 'Service background image is required'],
    trim: true,
    maxlength: [2048, 'Service image URL cannot exceed 2048 characters']
  },
  icon: {
    type: String,
    enum: ['search', 'shopping-cart', 'bar-chart', 'paper-airplane', 'headset'],
    default: 'search'
  },
  order: {
    type: Number,
    default: 0,
    min: [0, 'Service order cannot be negative'],
    validate: {
      validator: Number.isInteger,
      message: 'Service order must be an integer'
    }
  }
}, {
  timestamps: true,
  strict: 'throw'
});

module.exports = mongoose.model('Service', serviceSchema);