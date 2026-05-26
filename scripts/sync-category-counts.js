// scripts/sync-category-counts.js
const mongoose = require('mongoose');
require('dotenv').config();

const ProductSchema = new mongoose.Schema({
  category: String
});

const CategorySchema = new mongoose.Schema({
  name: String,
  count: Number
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);

async function syncCategoryCounts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Get all categories
    const categories = await Category.find({});
    
    for (const category of categories) {
      const productCount = await Product.countDocuments({ category: category.name });
      await Category.updateOne(
        { _id: category._id },
        { $set: { count: productCount } }
      );
      console.log(`Updated ${category.name}: ${productCount} products`);
    }
    
    console.log('Category counts synced successfully!');
  } catch (error) {
    console.error('Sync failed:', error);
  } finally {
    await mongoose.disconnect();
  }
}

syncCategoryCounts();