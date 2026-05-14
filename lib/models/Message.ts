/*import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  name: string;
  phone: string;
  message: string;
  productId?: string;
  isRead?: boolean;
}

const MessageSchema = new Schema<IMessage>({
  name: String,
  phone: String,
  message: String,
  productId: String,
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);*/

import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  name: string;
  phone: string;
  message: string;
  productId?: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    name: { 
      type: String, 
      required: [true, "Name is required"],
      trim: true 
    },
    phone: { 
      type: String, 
      required: [true, "Phone is required"],
      trim: true 
    },
    message: { 
      type: String, 
      required: [true, "Message is required"],
      trim: true 
    },
    productId: { 
      type: String, 
      default: null 
    },
    isRead: { 
      type: Boolean, 
      default: false 
    },
  },
  { 
    timestamps: true 
  }
);

// Add index for better query performance
MessageSchema.index({ createdAt: -1 });
MessageSchema.index({ isRead: 1 });

export default mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);