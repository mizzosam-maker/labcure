// scripts/migrate-categories.js
const mongoose = require('mongoose');
require('dotenv').config();

// Import models (using require since it's a JS script)
const ProductSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  images: [String],
  variants: [String],
  stock: Number,
  featured: Boolean
}, { timestamps: true });

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  image: String,
  count: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

// Helper function to generate slug
function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Category images mapping (you can customize these)
const categoryImages = {
  'Microscopes': '/images/categories/microscopes.jpg',
  'Centrifuges': '/images/categories/centrifuges.jpg',
  'Incubators': '/images/categories/incubators.jpg',
  'Lab Glassware': '/images/categories/lab-glassware.jpg',
  'Surgical Instruments': '/images/categories/surgical-instruments.jpg',
  'Diagnostic Kits': '/images/categories/diagnostic-kits.jpg',
  'Hospital Beds': '/images/categories/hospital-beds.jpg',
  'Monitoring Equipment': '/images/categories/monitoring-equipment.jpg',
};

// Category descriptions (you can customize these)
const categoryDescriptions = {
  'Microscopes': 'High-precision microscopes for laboratory and clinical use',
  'Centrifuges': 'Reliable centrifuges for sample separation and analysis',
  'Incubators': 'Temperature-controlled incubators for biological samples',
  'Lab Glassware': 'Premium quality glassware for laboratory applications',
  'Surgical Instruments': 'Sterile and precision surgical tools',
  'Diagnostic Kits': 'Complete diagnostic solutions for various tests',
  'Hospital Beds': 'Comfortable and durable hospital beds',
  'Monitoring Equipment': 'Advanced patient monitoring systems',
};

async function migrateCategories() {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/labcure';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Get all unique categories from products
    const uniqueCategories = await Product.aggregate([
      { $match: { category: { $exists: true, $ne: null, $ne: '' } } },
      { $group: { 
        _id: "$category", 
        count: { $sum: 1 },
        products: { $push: "$$ROOT" }
      }},
      { $sort: { count: -1 } }
    ]);

    console.log(`Found ${uniqueCategories.length} unique categories from products`);

    // Prepare categories for insertion/update
    const categoriesToUpsert = uniqueCategories.map(cat => {
      const categoryName = cat._id;
      const slug = generateSlug(categoryName);
      
      return {
        updateOne: {
          filter: { slug: slug },
          update: {
            $set: {
              name: categoryName,
              slug: slug,
              description: categoryDescriptions[categoryName] || `${categoryName} for medical and laboratory use`,
              image: categoryImages[categoryName] || '/images/categories/default-category.jpg',
              count: cat.count,
              isActive: true
            }
          },
          upsert: true
        }
      };
    });

    // Execute bulk write
    if (categoriesToUpsert.length > 0) {
      const result = await Category.bulkWrite(categoriesToUpsert);
      console.log('Categories migrated:', result);
    }

    // Also create categories for any missing common medical categories
    const commonCategories = [
      'Refrigerators', 'Water Baths', 'Shakers', 'Spectrophotometers',
      'PCR Equipment', 'Electrophoresis Systems', 'Safety Cabinets',
      'Personal Protective Equipment', 'Syringes & Needles', 'Bandages & Dressings'
    ];

    for (const categoryName of commonCategories) {
      const slug = generateSlug(categoryName);
      await Category.updateOne(
        { slug: slug },
        {
          $setOnInsert: {
            name: categoryName,
            slug: slug,
            description: categoryDescriptions[categoryName] || `${categoryName} for medical use`,
            image: categoryImages[categoryName] || '/images/categories/default-category.jpg',
            count: 0,
            isActive: true
          }
        },
        { upsert: true }
      );
    }

    console.log('Category migration completed successfully!');
    
    // Display summary
    const totalCategories = await Category.countDocuments();
    const activeCategories = await Category.countDocuments({ isActive: true });
    console.log(`Total categories: ${totalCategories}`);
    console.log(`Active categories: ${activeCategories}`);
    
    // Show top categories by product count
    const topCategories = await Category.find().sort({ count: -1 }).limit(5);
    console.log('\nTop 5 categories by product count:');
    topCategories.forEach(cat => {
      console.log(`- ${cat.name}: ${cat.count} products`);
    });

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the migration
migrateCategories();