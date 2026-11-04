const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required'],
    trim: true,
    minlength: [5, 'Question must be at least 5 characters long'],
    maxlength: [300, 'Question cannot exceed 300 characters']
  },
  answer: {
    type: String,
    required: [true, 'Answer is required'],
    trim: true,
    minlength: [2, 'Answer must be at least 2 characters long'],
    maxlength: [5000, 'Answer cannot exceed 5000 characters']
  },
  category: {
    type: String,
    trim: true,
    default: '',
    maxlength: [100, 'Category cannot exceed 100 characters']
  },
  order: {
    type: Number,
    default: 0,
    min: [0, 'Order cannot be negative'],
    validate: {
      validator: Number.isInteger,
      message: 'Order must be an integer'
    }
  },
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  strict: 'throw'
});

faqSchema.index({ isPublished: 1, order: 1, createdAt: 1 });

module.exports = mongoose.model('faqs', faqSchema);
