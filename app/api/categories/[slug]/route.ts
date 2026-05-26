// app/api/categories/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    
    // Await the params promise
    const { slug } = await context.params;

    const category = await Category.findOne({ slug, isActive: true }).lean();

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    const products = await Product.find({ category: category.name })
      .sort({ createdAt: -1 })
      .lean();

    // Serialize MongoDB documents
    const serializedCategory = {
      ...category,
      _id: category._id.toString(),
      createdAt: category.createdAt?.toISOString(),
      updatedAt: category.updatedAt?.toISOString(),
    };

    const serializedProducts = products.map((product) => ({
      ...product,
      _id: product._id.toString(),
      createdAt: product.createdAt?.toISOString(),
      updatedAt: product.updatedAt?.toISOString(),
    }));

    return NextResponse.json({
      category: serializedCategory,
      products: serializedProducts,
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}