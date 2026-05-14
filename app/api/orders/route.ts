import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Order from "@/lib/models/Order";
import { getAuthenticatedUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    await connectDB();
    
    let orders;
    if (user.role === "admin") {
      // Admins can see all orders
      orders = await Order.find({}).sort({ createdAt: -1 }).lean();
    } else {
      // Regular users only see their own orders
      orders = await Order.find({ userId: user._id }).sort({ createdAt: -1 }).lean();
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (error: any) {
    console.error("Fetch orders error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    const body = await request.json();

    await connectDB();

    const orderData = {
      ...body,
      userId: user?._id, // Will be undefined for guest checkout
      status: "pending",
    };

    const order = await Order.create(orderData);

    return NextResponse.json(order, { status: 201 });
  } catch (error: any) {
    console.error("Create order error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create order" },
      { status: 500 }
    );
  }
}