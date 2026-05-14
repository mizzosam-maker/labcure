import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  userId?: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: "pending" | "paid" | "delivered";
  phone: string;
  address: string;
}

const OrderSchema = new Schema<IOrder>({
  userId: String,
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
    }
  ],
  total: Number,
  status: { type: String, default: "pending" },
  phone: String,
  address: String,
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);