require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');

const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD, MONGO_URI } = process.env;

if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD || !MONGO_URI) {
  throw new Error('ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD, and MONGO_URI are required');
}

if (ADMIN_PASSWORD.length < 6) {
  throw new Error('ADMIN_PASSWORD must be at least 6 characters long');
}

async function seedAdmin() {
  await mongoose.connect(MONGO_URI);

  try {
    const password = await bcrypt.hash(ADMIN_PASSWORD, await bcrypt.genSalt(10));
    const email = ADMIN_EMAIL.trim().toLowerCase();

    await User.findOneAndUpdate(
      { email },
      {
        $set: {
          name: ADMIN_NAME.trim(),
          email,
          password,
          role: 'admin'
        }
      },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
    );

    console.log(`Admin account provisioned for ${email}`);
  } finally {
    await mongoose.disconnect();
  }
}

seedAdmin().catch((error) => {
  console.error('Failed to provision admin account:', error.message);
  process.exitCode = 1;
});
