'use client';

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    category: string;
    stock: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const rawImage =
    product.images?.find((img) => img && img.length > 0) ||
    "/images/placeholder.png";

  const [imgSrc, setImgSrc] = useState(rawImage);
  const [hasError, setHasError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: imgSrc || "/images/placeholder.png",
    });
  };

  const handleImageError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc("/images/placeholder.png");
    }
  };

  const isValidImage =
    imgSrc && imgSrc !== "/images/placeholder.png";

  return (
    <div className="bg-background border border-gray-light rounded-xl overflow-hidden hover:shadow-md transition-shadow group">

      <Link href={`/products/${product._id}`}>

        {/* IMAGE */}
        <div className="relative h-40 sm:h-52 md:h-64 bg-gray-light/40 flex items-center justify-center overflow-hidden">

          {isValidImage ? (
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              unoptimized
              onError={handleImageError}
            />
          ) : (
            <Image
              src="/images/placeholder.png"
              alt="placeholder"
              width={120}
              height={120}
              className="opacity-60 grayscale"
            />
          )}

          {/* Low stock badge */}
          {product.stock < 5 && (
            <span className="absolute top-2 right-2 bg-primary text-white text-[10px] sm:text-xs px-2 py-1 rounded">
              Low Stock
            </span>
          )}
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-3 sm:p-4">

        <Link href={`/products/${product._id}`}>
          <h3 className="font-semibold text-sm sm:text-lg text-foreground line-clamp-2 group-hover:text-primary transition min-h-[40px] sm:min-h-[56px]">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-dark text-xs sm:text-sm mb-2 truncate">
          {product.category}
        </p>

        <div className="flex items-center justify-between gap-2">

          <span className="text-sm sm:text-xl font-bold text-primary">
            KSh {product.price.toLocaleString()}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="bg-primary text-white p-2 rounded-full hover:bg-primary-light transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

        </div>
      </div>
    </div>
  );
}