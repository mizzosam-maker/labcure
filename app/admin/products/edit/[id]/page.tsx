"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Save, X, Plus } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

const categories = [
  "Pharma",
  "Medical Equipment",
  "Laboratory Equipment",
  "Operating Theatre Equipment",
  "Wheelchairs",
  "Hospital Beds",
  "Pharmacy Fridges",
  "Blood Pressure Monitors",
  "Crutches",
  "Walking Frames",
  "LAMPS",
];

export default function EditProductPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    stock: "",
    variants: [""],
    images: [] as string[],
    featured: false,
  });

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

    fetchProduct();
  }, [user, isAdmin, authLoading, params.id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.id}`);
      if (!res.ok) throw new Error("Product not found");

      const product = await res.json();

      setFormData({
        name: product.name || "",
        category: product.category || "",
        price: product.price?.toString() || "",
        description: product.description || "",
        stock: product.stock?.toString() || "0",
        variants: product.variants?.length ? product.variants : [""],
        images: product.images || [],
        featured: product.featured || false,
      });
    } catch (err) {
      setError("Failed to load product");
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const variants = formData.variants.filter((v) => v.trim() !== "");

      const payload = {
        name: formData.name.trim(),
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description.trim(),
        stock: parseInt(formData.stock),
        variants: variants.length ? variants : undefined,
        images: formData.images,
        featured: formData.featured,
      };

      const res = await fetch(`/api/admin/products/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");

      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImagesUploaded = (urls: string[]) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...urls],
    }));
  };

  const handleImageRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addVariant = () => {
    setFormData((p) => ({
      ...p,
      variants: [...p.variants, ""],
    }));
  };

  const removeVariant = (index: number) => {
    setFormData((p) => ({
      ...p,
      variants: p.variants.filter((_, i) => i !== index),
    }));
  };

  const updateVariant = (index: number, value: string) => {
    const copy = [...formData.variants];
    copy[index] = value;

    setFormData((p) => ({
      ...p,
      variants: copy,
    }));
  };

  if (authLoading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-background text-foreground px-4 sm:px-6 py-8">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <Link
            href="/admin/products"
            className="text-gray-dark hover:text-primary transition"
          >
            ← Back to Products
          </Link>

          <h1 className="text-3xl font-bold mt-2">
            Edit <span className="text-primary">Product</span>
          </h1>

          <p className="text-gray-dark">
            Update product details
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white border border-gray-light rounded-xl p-6">

          {error && (
            <div className="bg-accent text-white px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* BASIC INFO */}
            <div>
              <h2 className="text-lg font-semibold border-b border-gray-light pb-2 mb-4">
                Basic Information
              </h2>

              <div className="space-y-4">

                <input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Product name"
                  className="w-full px-4 py-2 border border-gray-light rounded-lg focus:ring-2 focus:ring-primary outline-none"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="px-4 py-2 border border-gray-light rounded-lg focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select category</option>
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>

                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="Price"
                    className="px-4 py-2 border border-gray-light rounded-lg focus:ring-2 focus:ring-primary"
                  />

                </div>

                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Description"
                  className="w-full px-4 py-2 border border-gray-light rounded-lg focus:ring-2 focus:ring-primary"
                  rows={4}
                />

              </div>
            </div>

            {/* INVENTORY */}
            <div>
              <h2 className="text-lg font-semibold border-b border-gray-light pb-2 mb-4">
                Inventory
              </h2>

              <input
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                placeholder="Stock"
                className="w-full px-4 py-2 border border-gray-light rounded-lg focus:ring-2 focus:ring-primary"
              />

              <label className="flex items-center gap-2 mt-4">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                />
                Featured Product
              </label>
            </div>

            {/* VARIANTS */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold">Variants</h2>

                <button
                  type="button"
                  onClick={addVariant}
                  className="flex items-center gap-1 text-primary"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              {formData.variants.map((v, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input
                    value={v}
                    onChange={(e) => updateVariant(i, e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-light rounded-lg"
                  />

                  <button
                    type="button"
                    onClick={() => removeVariant(i)}
                    className="text-accent"
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>

            {/* IMAGES */}
            <ImageUpload
              existingImages={formData.images}
              onImagesUploaded={handleImagesUploaded}
              onImageRemove={handleImageRemove}
              multiple
            />

            {/* ACTIONS */}
            <div className="flex gap-3 pt-4">
              <button
                disabled={loading}
                className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-dark"
              >
                <Save className="inline w-4 h-4 mr-2" />
                {loading ? "Saving..." : "Update Product"}
              </button>

              <Link
                href="/admin/products"
                className="flex-1 text-center border border-gray-light py-3 rounded-lg hover:bg-gray-light/30"
              >
                Cancel
              </Link>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}