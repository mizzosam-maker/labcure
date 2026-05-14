/*"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, MessageCircle, Minus, Plus } from "lucide-react";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  images: string[];
  variants?: string[];
  stock: number;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
      if (data.variants && data.variants.length > 0) {
        setSelectedVariant(data.variants[0]);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.images[0],
    });
  };

  const handleWhatsAppOrder = () => {
    const phone = "2547XXXXXXXX"; // Replace with actual phone
    const message = `Hello, I want to order:
Product: ${product?.name}
Price: KSh ${product?.price}
Quantity: ${quantity}
${selectedVariant ? `Variant: ${selectedVariant}` : ''}
Total: KSh ${(product?.price || 0) * quantity}`;
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e8b924] mx-auto"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/products" className="text-[#e8b924] hover:text-[#ddc25d]">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/products" className="text-[#e8b924] hover:text-[#ddc25d]">
          ← Back to products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image *
        <div className="relative h-96 md:h-[600px] bg-[#f6e9a6] rounded-lg overflow-hidden">
          {/*{product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#4d4d4d]">
              No image available
            </div>
          )}*
          {product.images?.length ? (
  <Image
    src={product.images[0]}
    alt={product.name}
    fill
    className="object-cover"
  />
) : (
  <div className="w-full h-full flex items-center justify-center text-[#4d4d4d]">
    No image available
  </div>
)}
        </div>

        {/* Product Info *
        <div>
          <p className="text-[#e8b924] font-medium mb-2">{product.category}</p>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          {/*<p className="text-2xl font-bold text-[#e8b924] mb-4">
            KSh {product.price.toLocaleString()}
          </p>*
          <p className="text-2xl font-bold text-[#e8b924] mb-4">
            KSh {product.price?.toLocaleString() ?? "0"}
          </p>

          {product.description && (
            <p className="text-[#4d4d4d] mb-6">{product.description}</p>
          )}

          {/* Variants *
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Variants</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 border rounded-lg transition ${
                      selectedVariant === variant
                        ? "border-[#e8b924] bg-[#f6e9a6]"
                        : "border-[#d5c37d] hover:border-[#e8b924]"
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stock Status *
          <p className={`mb-6 ${product.stock < 5 ? "text-red-500" : "text-green-600"}`}>
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>

          {/* Quantity Selector *
          <div className="flex items-center space-x-4 mb-6">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center border border-[#d5c37d] rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-[#f6e9a6] transition"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 border-x border-[#d5c37d]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3 py-2 hover:bg-[#f6e9a6] transition"
                disabled={quantity >= product.stock}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons *
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-[#e8b924] text-[#0e0e10] py-3 rounded-lg font-semibold hover:bg-[#ddc25d] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleWhatsAppOrder}
              disabled={product.stock === 0}
              className="w-full bg-[#25D366] text-white py-3 rounded-lg font-semibold hover:bg-[#128C7E] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Order via WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}*/

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, MessageCircle, Minus, Plus } from "lucide-react";
import Link from "next/link";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  images: string[];
  variants?: string[];
  stock: number;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const { addToCart } = useCart();

  const [imgSrc, setImgSrc] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`/api/products/${id}`);
      const data = await res.json();
      setProduct(data);

      const firstImage =
        data?.images?.length > 0 ? data.images[1] : "";

      setImgSrc(firstImage);

      if (data.variants && data.variants.length > 0) {
        setSelectedVariant(data.variants[0]);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc("/images/placeholder.png");
    }
  };

  const isValidImage =
    imgSrc && imgSrc !== "/images/placeholder.png";

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity,
      image: imgSrc || "/images/placeholder.png",
    });
  };

  const handleWhatsAppOrder = () => {
    const phone = "2547XXXXXXXX";

    const message = `Hello, I want to order:
Product: ${product?.name}
Price: KSh ${product?.price}
Quantity: ${quantity}
${selectedVariant ? `Variant: ${selectedVariant}` : ""}
Total: KSh ${(product?.price || 0) * quantity}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e8b924] mx-auto"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/products" className="text-[#e8b924] hover:text-[#ddc25d]">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/products" className="text-[#e8b924] hover:text-[#ddc25d]">
          ← Back to products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* ✅ IMAGE SECTION (FIXED) */}
        <div className="relative h-96 md:h-[600px] bg-[#f6e9a6] rounded-lg overflow-hidden flex items-center justify-center">

          {isValidImage ? (
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              className="object-contain"
              onError={handleImageError}
            />
          ) : (
            <Image
              src="/images/placeholder.png"
              alt="placeholder"
              width={180}
              height={180}
              className="opacity-60 grayscale"
            />
          )}
        </div>

        {/* PRODUCT INFO */}
        <div>
          <p className="text-[#e8b924] font-medium mb-2">
            {product.category}
          </p>

          <h1 className="text-3xl font-bold mb-4">
            {product.name}
          </h1>

          <p className="text-2xl font-bold text-[#e8b924] mb-4">
            KSh {product.price?.toLocaleString() ?? "0"}
          </p>

          {product.description && (
            <p className="text-[#4d4d4d] mb-6">
              {product.description}
            </p>
          )}

          {/* VARIANTS */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">Variants</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant}
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 border rounded-lg transition ${
                      selectedVariant === variant
                        ? "border-[#e8b924] bg-[#f6e9a6]"
                        : "border-[#d5c37d] hover:border-[#e8b924]"
                    }`}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STOCK */}
          <p className={`mb-6 ${product.stock < 5 ? "text-red-500" : "text-green-600"}`}>
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>

          {/* QUANTITY */}
          <div className="flex items-center space-x-4 mb-6">
            <span className="font-medium">Quantity:</span>

            <div className="flex items-center border border-[#d5c37d] rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-[#f6e9a6] transition"
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="px-4 py-2 border-x border-[#d5c37d]">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                className="px-3 py-2 hover:bg-[#f6e9a6] transition"
                disabled={quantity >= product.stock}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="w-full bg-[#e8b924] text-[#0e0e10] py-3 rounded-lg font-semibold hover:bg-[#ddc25d] transition disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>

            <button
              onClick={handleWhatsAppOrder}
              disabled={product.stock === 0}
              className="w-full bg-[#25D366] text-white py-3 rounded-lg font-semibold hover:bg-[#128C7E] transition disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Order via WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}