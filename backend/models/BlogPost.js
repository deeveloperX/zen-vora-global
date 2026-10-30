const mongoose = require('mongoose');

const blogpostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title required'],
      trim: true

    },
    slug: {
      type: String,
      required: [true, 'Blog slug is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    category: {
      type: String,
      default: 'General',
      trim: true
    },
    excerpt: {
      type: String,
      required: [true, 'Blog excerpt/summary is required'],
      trim: true
    },
    content: {
      type: String,
      required: [true, 'Blog content is require'],
    },
    coverImage: {
      type: String,
      default: ''
    },
    readTime: {
      type: String,
      default: '5 min read'
    },
    author: {
      type: String,
      default: 'ZenVora Team'
    },
    avatar: {
      type: String,
      default: ''
    },
    published: {
      type: Boolean,
      default: true
    }
  }, { timestamps: true }
);

module.exports = mongoose.model('BlogPost', blogpostSchema);