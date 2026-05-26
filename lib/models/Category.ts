// lib/models/Category.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  count?: number; // For caching product count
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategory>({
  name: { 
    type: String, 
    required: true,
    unique: true,
    trim: true 
  },
  slug: { 
    type: String, 
    required: true,
    unique: true,
    lowercase: true,
    trim: true 
  },
  description: { 
    type: String,
    trim: true 
  },
  image: { 
    type: String,
    default: "/images/category-placeholder.jpg"
  },
  count: { 
    type: Number, 
    default: 0 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { 
  timestamps: true 
});

// Create index for faster queries
CategorySchema.index({ slug: 1 });
CategorySchema.index({ name: 1 });

export default mongoose.models.Category || mongoose.model<ICategory>("Category", CategorySchema);