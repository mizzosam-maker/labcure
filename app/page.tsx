import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import CategoryCard from "@/components/ui/CategoryCard";
import connectDB from "@/lib/mongodb";
import Product from "@/lib/models/Product";
import { ShieldCheck, Truck, MessageCircleMore } from "lucide-react";

async function getFeaturedProducts() {
  await connectDB();
  return JSON.parse(JSON.stringify(
    await Product.find({ featured: true }).limit(8).lean()
  ));
}

async function getCategories() {
  await connectDB();
  return await Product.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 8 },
  ]);
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();
  const categories = await getCategories();

  return (
    <div className="bg-background">

      {/* HERO */}
      <section className="relative h-[600px] bg-primary-dark text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">

            <h1 className="text-5xl font-bold mb-4">
              Welcome to <span className="text-secondary">Labcure</span>
            </h1>

            <p className="text-lg text-gray-light mb-8">
              Reliable medical, laboratory, and hospital equipment across Kenya.
            </p>

            <div className="flex gap-4">
              <Link
                href="/products"
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-light"
              >
                Shop Now
              </Link>

              <Link
                href="/contact"
                className="border border-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary"
              >
                Contact Us
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Shop by <span className="text-primary">Category</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((c: any) => (
            <CategoryCard key={c._id} name={c._id} count={c.count} />
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-16 bg-gray-light/20">
        <div className="container mx-auto px-4">

          <h2 className="text-3xl font-bold text-center mb-10">
            Featured <span className="text-primary">Products</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((p: any) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/products"
              className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-light"
            >
              View All Products
            </Link>
          </div>

        </div>
      </section>

{/* WHY US */}
<section className="container mx-auto px-4 py-16">
  <h2 className="text-3xl font-bold text-center mb-12">
    Why Choose <span className="text-primary">Labcure</span>
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

    {/* CARD 1 */}
    <div className="bg-background border border-gray-light rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300">

      <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-primary/10 flex items-center justify-center">
        <ShieldCheck className="w-8 h-8 text-primary" />
      </div>

      <h3 className="text-xl font-semibold mb-3">
        Certified Equipment
      </h3>

      <p className="text-gray-dark leading-relaxed">
        High-quality and verified medical-grade products trusted by healthcare professionals.
      </p>
    </div>

    {/* CARD 2 */}
    <div className="bg-background border border-gray-light rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300">

      <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-secondary/10 flex items-center justify-center">
        <Truck className="w-8 h-8 text-secondary" />
      </div>

      <h3 className="text-xl font-semibold mb-3">
        Fast Delivery
      </h3>

      <p className="text-gray-dark leading-relaxed">
        Reliable and fast nationwide delivery services across Kenya.
      </p>
    </div>

    {/* CARD 3 */}
    <div className="bg-background border border-gray-light rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300">

      <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-accent/10 flex items-center justify-center">
        <MessageCircleMore className="w-8 h-8 text-accent" />
      </div>

      <h3 className="text-xl font-semibold mb-3">
        Customer Support
      </h3>

      <p className="text-gray-dark leading-relaxed">
        Friendly WhatsApp and customer support ready to assist you quickly.
      </p>
    </div>

  </div>
</section>

    </div>
  );
}