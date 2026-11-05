require('dotenv').config();

const mongoose = require('mongoose');
const Service = require('../models/Service');

const services = [
  {
    title: 'Product Sourcing',
    description: 'Find high-demand & profitable products from global suppliers.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80',
    icon: 'search',
    order: 0
  },
  {
    title: 'Dropshipping Services',
    description: 'Sell without inventory. We ship directly to your customers.',
    image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=500&q=80',
    icon: 'shopping-cart',
    order: 1
  },
  {
    title: 'E-commerce Support',
    description: 'Get expert guidance on selling, marketing & scaling your business.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=500&q=80',
    icon: 'bar-chart',
    order: 2
  },
  {
    title: 'International Shipping',
    description: 'Fast & reliable shipping from global warehouses to your customers.',
    image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=500&q=80',
    icon: 'paper-airplane',
    order: 3
  },
  {
    title: 'Business Growth',
    description: 'Tools & strategies to grow your online store and increase sales.',
    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=500&q=80',
    icon: 'headset',
    order: 4
  }
];

async function seedServices() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is required');
  }

  await mongoose.connect(process.env.MONGO_URI);
  const existingCount = await Service.countDocuments();

  if (existingCount > 0) {
    throw new Error(
      `Service collection already has ${existingCount} record(s); refusing to seed duplicates`
    );
  }

  await Service.insertMany(services);
  console.log(`Seeded ${services.length} services`);
}

seedServices()
  .catch((error) => {
    console.error('Failed to seed services:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });
