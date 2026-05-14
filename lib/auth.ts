// lib/jwt.ts
import jwt, { SignOptions } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import connectDB from "./mongodb";
import User from "./models/User";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRE = (process.env.JWT_EXPIRE || "7d") as SignOptions["expiresIn"];

export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
}

/*export async function getAuthenticatedUser() {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("auth_token")?.value;

    if (!token) {
      return null;
    }

    const payload = verifyToken(token);
    if (!payload) {
      return null;
    }

    await connectDB();
    const user = await User.findById(payload.id).select("-password").lean();
    
    return user;
  } catch (error) {
    return null;
  }
}*/

export async function getAuthenticatedUser() {
  try {
    const cookieStore = await cookies(); // ✅ Always await cookies()
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return null;
    }

    const payload = verifyToken(token);
    if (!payload) {
      return null;
    }

    await connectDB();
    const user = await User.findById(payload.id).select("-password").lean();
    
    return user;
  } catch (error) {
    console.error("Error getting authenticated user:", error);
    return null;
  }
}

export async function requireAuth(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  if (!payload) {
    return null;
  }

  await connectDB();
  const user = await User.findById(payload.id).select("-password").lean();
  
  return user;
}

export async function requireAdmin(request: NextRequest) {
  const user = await requireAuth(request);
  
  if (!user || user.role !== "admin") {
    return null;
  }
  
  return user;
}