"use client";

import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  images: string[];
  featured: boolean;
}

export default function AdminProductsPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    if (!isAdmin) {
      router.push("/");
      return;
    }

    fetchProducts();
  }, [user, isAdmin, authLoading, router]);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const data: Product[] = await res.json();

      setProducts(data);

      const uniqueCategories = [...new Set(data.map((p) => p.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    const res = await fetch(`/api/admin/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p._id !== id));
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory = !category || p.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground px-4 sm:px-6 py-6 sm:py-10">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Manage <span className="text-primary">Products</span>
        </h1>

        <Link
          href="/admin/products/new"
          className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-dark transition flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      {/* FILTERS */}
      <div className="bg-gray-light/30 p-4 rounded-xl mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          {/* SEARCH */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-dark" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 py-2 rounded-lg border border-gray-light bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* CATEGORY */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-dark" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-10 py-2 rounded-lg border border-gray-light bg-background focus:ring-2 focus:ring-primary"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-xl overflow-hidden border border-gray-light">
        <table className="w-full">

          <thead className="bg-primary text-white">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Featured</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((p) => (
              <tr
                key={p._id}
                className="border-t border-gray-light hover:bg-gray-light/20"
              >
                <td className="p-3">
                  <div className="w-12 h-12 relative bg-gray-light/20 rounded overflow-hidden">
                    {!imgErrorMap[p._id] && p.images?.[0] ? (
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover"
                        onError={() =>
                          setImgErrorMap((prev) => ({
                            ...prev,
                            [p._id]: true,
                          }))
                        }
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-dark">
                        No Img
                      </div>
                    )}
                  </div>
                </td>

                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3 font-semibold text-secondary-dark">
                  KSh {p.price.toLocaleString()}
                </td>

                <td className="p-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      p.stock < 5
                        ? "bg-accent text-white"
                        : "bg-secondary text-white"
                    }`}
                  >
                    {p.stock}
                  </span>
                </td>

                <td className="p-3 text-sm">
                  {p.featured ? (
                    <span className="text-primary font-semibold">Yes</span>
                  ) : (
                    "No"
                  )}
                </td>

                <td className="p-3 flex gap-3">
                  <Link href={`/admin/products/edit/${p._id}`}>
                    <Edit className="w-4 h-4 text-secondary" />
                  </Link>

                  <button onClick={() => handleDelete(p._id)}>
                    <Trash2 className="w-4 h-4 text-accent-dark" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {filteredProducts.map((p) => (
          <div
            key={p._id}
            className="bg-white border border-gray-light rounded-xl"
          >
            <div
              className="p-4 flex justify-between items-center"
              onClick={() =>
                setExpandedProduct(expandedProduct === p._id ? null : p._id)
              }
            >
              <div>
                <p className="font-semibold">{p.name}</p>
                <p className="text-xs text-gray-dark">{p.category}</p>
                <p className="text-primary font-bold">
                  KSh {p.price.toLocaleString()}
                </p>
              </div>

              {expandedProduct === p._id ? (
                <ChevronUp />
              ) : (
                <ChevronDown />
              )}
            </div>

            {expandedProduct === p._id && (
              <div className="p-4 border-t border-gray-light flex gap-3">
                <Link
                  href={`/admin/products/edit/${p._id}`}
                  className="flex-1 text-center bg-secondary text-white py-2 rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="flex-1 bg-accent text-white py-2 rounded"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}