require('dotenv').config();

const mongoose = require('mongoose');
const LegalDocument = require('../models/LegalDocument');

const legalDocs = [
  {
    title: "Privacy Policy",
    slug: "privacy-policy",
    lastUpdated: "October 2026",
    introduction: "At Zen Vora Global Ventures, we respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website or use our global e-commerce, sourcing, and logistics services, and tell you about your privacy rights and how the law protects you.",
    sections: [
      {
        title: "1. Information We Collect",
        content: "We collect several types of information from and about users of our website and services, including:",
        list: [
          "Personal Identifiers: Name, billing address, shipping address, email address, and telephone numbers.",
          "Business & Marketplace Data: Seller account details, store names, and inventory metrics required for cross-border e-commerce management across platforms like Amazon, eBay, Walmart, Home Depot, AliExpress, and Alibaba.",
          "Technical Data: Internet protocol (ip) address, your login data, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform.",
          "Usage Data: Information about how you use our website, products, and services."
        ]
      },
      {
        title: "2. How We Use Your Information",
        content: "We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:",
        list: [
          "To register you as a new client or business partner.",
          "To manage our relationship with us, including managing product sourcing, dropshipping fulfillment, and international shipping logistics.",
          "To process and deliver your multi-channel e-commerce operations and business growth campaigns.",
          "To improve our website, services, marketing, and client experiences."
        ]
      },
      {
        title: "3. Data Security & Protection",
        content: "We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.",
        list: []
      },
      {
        title: "4. Third-Party Marketplace Integration",
        content: "As part of our global marketplace enablement services, your data may interact with major third-party platforms such as Amazon, eBay, Walmart, Home Depot, and Alibaba. We ensure that any integration strictly complies with global data privacy frameworks and industry standards.",
        list: []
      },
      {
        title: "5. Contact Us",
        content: "If you have any questions about this privacy policy or our privacy practices, please contact our data protection team at zenvoraglobalventures@gmail.com or via our Lahore, Pakistan global operations office.",
        list: []
      }
    ]
  },
  {
    title: "Terms & Conditions",
    slug: "terms-conditions",
    lastUpdated: "October 2026",
    introduction: "Welcome to Zen Vora Global Ventures. These terms and conditions outline the rules and regulations for the use of Zen Vora Global Ventures's Website and Services. By accessing this website and utilizing our global e-commerce, product sourcing, and shipping solutions, you accept these terms and conditions in full.",
    sections: [
      {
        title: "1. Scope of Services",
        content: "Zen Vora Global Ventures provides professional e-commerce solutions including, but not limited to:",
        list: [
          "Global Product Sourcing and Manufacturer Negotiation.",
          "End-to-End Dropshipping and International Supply Chain Logistics.",
          "Multi-channel marketplace management across Amazon, eBay, Walmart, Home Depot, AliExpress, and Alibaba.",
          "Business Growth, SEO, and Store Optimization Consulting."
        ]
      },
      {
        title: "2. Client Obligations & Account Security",
        content: "When working with us, you agree to provide accurate, current, and complete information regarding your business and inventory requirements. You are responsible for safeguarding your own marketplace credentials and account access details provided during our management or consulting procedures.",
        list: []
      },
      {
        title: "3. Intellectual Property Rights",
        content: "Other than content you own, under these Terms, Zen Vora Global Ventures and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted a limited license only for purposes of viewing the material contained on this Website.",
        list: []
      },
      {
        title: "4. Limitation of Liability",
        content: "In no event shall Zen Vora Global Ventures, nor any of its officers, directors, and employees, be held liable for anything arising out of or in any way connected with your use of this Website or third-party marketplace fluctuations (such as algorithmic changes on Amazon or Walmart), whether such liability is under contract, tort or otherwise.",
        list: []
      },
      {
        title: "5. Governing Law & Jurisdiction",
        content: "These Terms will be governed by and interpreted in accordance with the laws of our operating jurisdiction, and you submit to the non-exclusive jurisdiction of the courts located for the resolution of any disputes.",
        list: []
      }
    ]
  }
];

async function seedLegalDocuments() {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is required');
  }

  await mongoose.connect(process.env.MONGO_URI);
  const existingCount = await LegalDocument.countDocuments();

  if (existingCount > 0) {
    throw new Error(
      `Legal document collection already has ${existingCount} record(s); refusing to seed duplicates`
    );
  }

  await LegalDocument.insertMany(legalDocs);
  console.log(`Seeded ${legalDocs.length} legal documents`);
}

seedLegalDocuments()
  .catch((error) => {
    console.error('Failed to seed legal documents:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });