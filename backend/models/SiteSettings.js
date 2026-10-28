const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  label: { type: String, trim: true, required: true },
  url: { type: String, trim: true, required: true },
  enabled: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { _id: false, strict: 'throw' });

const businessHourSchema = new mongoose.Schema({
  label: { type: String, trim: true, required: true },
  hours: { type: String, trim: true, required: true },
  order: { type: Number, default: 0 }
}, { _id: false, strict: 'throw' });

const socialLinkSchema = new mongoose.Schema({
  platform: { type: String, trim: true, required: true },
  url: { type: String, trim: true, required: true },
  enabled: { type: Boolean, default: true }
}, { _id: false, strict: 'throw' });

const siteSettingsSchema = new mongoose.Schema({
  key: {
    type: String,
    enum: ['global'],
    default: 'global',
    unique: true,
    immutable: true
  },
  brand: {
    name: { type: String, trim: true, default: '' },
    shortName: { type: String, trim: true, default: '' },
    tagline: { type: String, trim: true, default: '' },
    logoUrl: { type: String, trim: true, default: '' },
    footerDescription: { type: String, trim: true, default: '' }
  },
  contact: {
    email: { type: String, trim: true, default: '' },
    phone: { type: String, trim: true, default: '' },
    address: { type: String, trim: true, default: '' },
    businessHours: { type: [businessHourSchema], default: [] }
  },
  topBar: {
    tagline: { type: String, trim: true, default: '' },
    supportLinkLabel: { type: String, trim: true, default: '' },
    supportLinkUrl: { type: String, trim: true, default: '/support' }
  },
  navigation: {
    headerLinks: { type: [linkSchema], default: [] },
    serviceLinks: { type: [linkSchema], default: [] },
    footerLinks: { type: [linkSchema], default: [] }
  },
  socialLinks: { type: [socialLinkSchema], default: [] },
  whatsapp: {
    enabled: { type: Boolean, default: true },
    phoneNumber: { type: String, trim: true, default: '' },
    accountName: { type: String, trim: true, default: '' },
    statusMessage: { type: String, trim: true, default: '' },
    chatMessage: { type: String, trim: true, default: '' },
    avatarUrl: { type: String, trim: true, default: '' }
  },
  copyrightText: { type: String, trim: true, default: '' }
}, {
  timestamps: true,
  strict: 'throw'
});

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
