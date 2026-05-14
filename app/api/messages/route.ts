import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Message from "@/lib/models/Message";
import { getAuthenticatedUser } from "@/lib/auth";

// GET - Fetch all messages (admin only)
export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    
    // Check if user is authenticated and is admin
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const messages = await Message.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

// POST - Create a new message (public)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, message, productId } = body;

    // Validate required fields
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: "Name, phone, and message are required" },
        { status: 400 }
      );
    }

    await connectDB();
    const newMessage = await Message.create({
      name,
      phone,
      message,
      productId: productId || null,
      isRead: false,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: "Message sent successfully",
        data: newMessage 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}