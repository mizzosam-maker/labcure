// app/api/categories/[slug]/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const category = await Category.findOne({ slug: params.slug });
    
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    
    // Get products in this category
    const products = await Product.find({ category: category.name })
      .limit(20)
      .lean();
    
    return NextResponse.json({ category, products });
  } catch (error) {
    console.error("Failed to fetch category:", error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    await connectDB();
    
    const category = await Category.findOneAndUpdate(
      { slug: params.slug },
      { ...body },
      { new: true }
    );
    
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(category);
  } catch (error) {
    console.error("Failed to update category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}