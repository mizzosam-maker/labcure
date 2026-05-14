'use client';

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ui/ProductCard";
import { Filter, X } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
}

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) setSelectedCategory(category);

    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      setProducts(data);

      const uniqueCategories = [
        ...new Set(data.map((p: Product) => p.category)),
      ];
      setCategories(uniqueCategories as string[]);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;

    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];

    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesPrice && matchesSearch;
  });

  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange([0, 50000]);
    setSearchQuery("");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">

        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">
            Our <span className="text-primary">Products</span>
          </h1>
          <p className="text-gray-dark text-sm sm:text-base">
            Discover our collection of quality medical and laboratory equipment
          </p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-80 md:w-96 px-4 py-2 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-sm sm:text-base"
          />

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg w-full sm:w-auto"
          >
            <Filter className="w-4 h-4" />
            Filters
            {showFilters && <X className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8">

          {/* Sidebar */}
          <div className={`${showFilters ? "block" : "hidden md:block"} md:w-64`}>
            <div className="bg-white border border-gray-light p-4 rounded-lg sticky top-24">

              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:text-primary-dark"
                >
                  Clear all
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-2">Categories</h3>

                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="accent-primary"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>

                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full accent-primary"
                />

                <div className="flex justify-between text-sm text-gray-dark mt-2">
                  <span>KSh {priceRange[0].toLocaleString()}</span>
                  <span>KSh {priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="flex-1">

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-gray-dark mb-4">
                  No products found
                </p>
                <button
                  onClick={clearFilters}
                  className="text-primary hover:text-primary-dark"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between mb-6 text-sm text-gray-dark">
                  <span>
                    Showing <b>{filteredProducts.length}</b> products
                  </span>
                  <span className="hidden sm:block">Premium Collection</span>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}