// app/categories/[slug]/page.tsx
/*import { notFound } from "next/navigation";
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Category from "@/lib/models/Category";
import Product from "@/lib/models/Product";
import ProductCard from "@/components/ui/ProductCard";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getCategoryData(slug: string) {
  await connectDB();
  
  const category = await Category.findOne({ slug, isActive: true }).lean();
  
  if (!category) {
    return null;
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
  
  const serializedProducts = products.map(product => ({
    ...product,
    _id: product._id.toString(),
    createdAt: product.createdAt?.toISOString(),
    updatedAt: product.updatedAt?.toISOString(),
  }));
    
  return {
    category: serializedCategory,
    products: serializedProducts
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  // Await the params promise
  const { slug } = await params;
  const data = await getCategoryData(slug);
  
  if (!data) {
    notFound();
  }
  
  const { category, products } = data;
  
  return (
    <div className="bg-background min-h-screen">
      {/* Category Header *
      <section className="relative h-64 bg-primary-dark text-white">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-4xl font-bold mb-2">{category.name}</h1>
          <p className="text-lg text-gray-light">{category.description || `Browse our ${category.name} collection`}</p>
          <p className="text-sm mt-2">{products.length} products available</p>
        </div>
      </section>
      
      {/* Products Grid *
      <section className="container mx-auto px-4 py-12">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found in this category.</p>
            <Link
              href="/products"
              className="inline-block mt-4 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-light"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}*/

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