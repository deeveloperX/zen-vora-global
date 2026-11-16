require('dotenv').config();
const mongoose = require('mongoose');
const Highlight = require('../models/Highlight');

const initialHighlights = [
  { id: 1, title: "Global Market Access", subtitle: "Shop & Sell Worldwide", icon: "FiGlobe" },
  { id: 2, title: "Secure & Reliable", subtitle: "Safe & Trusted Deals", icon: "FiShield" },
  { id: 3, title: "Fast & Efficient", subtitle: "Worldwide Shipping", icon: "FiTruck" },
  { id: 4, title: "Dedicated Support", subtitle: "Always Here to Help", icon: "BsHeadset" },
  { id: 5, title: "Grow Your Business", subtitle: "Expand Without Limits", icon: "FiTrendingUp" }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/zenvora';
    console.log('Connecting to MongoDB for seeding...');
    
    await mongoose.connect(mongoUri);
    console.log('Database connected successfully.');

    const existingCount = await Highlight.countDocuments();
    const isForced = process.argv.includes('--force') || process.env.FORCE_SEED === 'true';

    if (existingCount > 0 && !isForced) {
      console.log(`⚠️ Database already contains ${existingCount} highlights.`);
      console.log('Seeding aborted to prevent accidental data loss.');
      console.log('To force reset and reseed, run: node backend/scripts/highlightSeed.js --force');
      process.exit(0);
    }

    await Highlight.deleteMany({});
    console.log('Existing highlights cleared.');

    await Highlight.insertMany(initialHighlights);
    console.log('Highlights seeded successfully!');

    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding highlights:', error);
    await mongoose.connection.close().catch(() => {});
    process.exit(1);
  }
};

seedDB();