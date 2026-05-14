import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { cookies } from "next/headers";

/*export async function GET() {
  try {
    const user = await getAuthenticatedUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { error: error.message || "Authentication check failed" },
      { status: 500 }
    );
  }
}*/


export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token");
    console.log("Me endpoint - Cookie received:", {
      exists: !!token,
      name: token?.name,
      value: token?.value?.substring(0, 20) + "..."
    });
    
    const user = await getAuthenticatedUser();
    console.log("Me endpoint - User found:", !!user);
    
    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { error: error.message || "Authentication check failed" },
      { status: 500 }
    );
  }
}