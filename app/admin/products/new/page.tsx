"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
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

export default function NewProductPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    stock: "10",
    variants: [""],
    images: [] as string[],
    featured: false,
  });

  useEffect(() => {
    if (authLoading) return;

    if (!user) router.push("/login");
    if (!isAdmin) router.push("/");
  }, [user, isAdmin, authLoading, router]);

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!formData.name || !formData.category || !formData.price) {
        throw new Error("Please fill in all required fields");
      }

      const variants = formData.variants.filter(v => v.trim() !== "");

      const productData = {
        name: formData.name.trim(),
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description.trim(),
        stock: parseInt(formData.stock),
        variants: variants.length > 0 ? variants : undefined,
        images: formData.images.length > 0 ? formData.images : undefined,
        featured: formData.featured,
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create product");

      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImagesUploaded = (urls: string[]) => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...urls],
    }));
  };

  const handleImageRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addVariant = () => {
    setFormData(prev => ({
      ...prev,
      variants: [...prev.variants, ""],
    }));
  };

  const removeVariant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const updateVariant = (index: number, value: string) => {
    const updated = [...formData.variants];
    updated[index] = value;
    setFormData(prev => ({ ...prev, variants: updated }));
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-6 sm:mb-8">
          <Link
            href="/admin/products"
            className="text-gray-dark hover:text-primary transition"
          >
            ← Back to Products
          </Link>

          <h1 className="text-2xl sm:text-3xl font-bold mt-2">
            Add New <span className="text-primary">Product</span>
          </h1>

          <p className="text-gray-dark mt-1">
            Create a new product with images
          </p>
        </div>

        {/* FORM CONTAINER */}
        <div className="bg-background p-4 sm:p-6 rounded-lg border border-gray-light">

          {error && (
            <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* BASIC INFO */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b border-gray-light pb-2">
                Basic Information
              </h2>

              <input
                type="text"
                placeholder="Product name *"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-light rounded-lg focus:ring-2 focus:ring-primary bg-white"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Price (KSh)"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="px-4 py-2 border border-gray-light rounded-lg focus:ring-2 focus:ring-primary bg-white"
                />
              </div>

              <textarea
                placeholder="Description"
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-light rounded-lg focus:ring-2 focus:ring-primary bg-white"
              />
            </div>

            {/* INVENTORY */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b border-gray-light pb-2">
                Inventory
              </h2>

              <input
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-light rounded-lg focus:ring-2 focus:ring-primary bg-white"
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="accent-primary"
                />
                Featured Product
              </label>
            </div>

            {/* VARIANTS */}
            <div>
              <div className="flex justify-between items-center border-b border-gray-light pb-2">
                <h2 className="font-semibold">Variants</h2>

                <button
                  type="button"
                  onClick={addVariant}
                  className="text-sm bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>

              {formData.variants.map((v, i) => (
                <div key={i} className="flex gap-2 mt-2">
                  <input
                    value={v}
                    onChange={(e) => updateVariant(i, e.target.value)}
                    placeholder="Variant"
                    className="flex-1 px-4 py-2 border border-gray-light rounded-lg"
                  />

                  {formData.variants.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeVariant(i)}
                      className="text-red-600"
                    >
                      <X />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* IMAGES */}
            <div>
              <h2 className="font-semibold border-b border-gray-light pb-2">
                Product Images
              </h2>

              <ImageUpload
                existingImages={formData.images}
                onImagesUploaded={handleImagesUploaded}
                onImageRemove={handleImageRemove}
                multiple
              />
            </div>

            {/* PREVIEW */}
            {(formData.name || formData.price || formData.images[0]) && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-dark mb-2">Preview</p>

                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-light rounded overflow-hidden">
                    <img
                      src={formData.images[0] || "/images/placeholder.png"}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <p className="font-semibold">{formData.name || "Name"}</p>
                    <p className="text-primary font-bold">
                      KSh{" "}
                      {formData.price
                        ? parseFloat(formData.price).toLocaleString()
                        : "0"}
                    </p>
                    <p className="text-sm text-gray-dark">
                      {formData.category || "Category"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex gap-4 pt-4">
              <button
                disabled={loading}
                className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-dark flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                {loading ? "Creating..." : "Create Product"}
              </button>

              <Link
                href="/admin/products"
                className="flex-1 border border-primary text-primary py-3 rounded-lg text-center hover:bg-primary hover:text-white"
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