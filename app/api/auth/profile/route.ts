import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function PUT(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { name, phone, address } = await request.json();

    await connectDB();

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { name, phone, address },
      { new: true }
    ).select("-password");

    return NextResponse.json(
      { message: "Profile updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: error.message || "Profile update failed" },
      { status: 500 }
    );
  }
}