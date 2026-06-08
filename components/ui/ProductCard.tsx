/*'use client';

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

        {/* IMAGE *
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

          {/* Low stock badge *
          {product.stock < 5 && (
            <span className="absolute top-2 right-2 bg-primary text-white text-[10px] sm:text-xs px-2 py-1 rounded">
              Low Stock
            </span>
          )}
        </div>
      </Link>

      {/* CONTENT *
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
}*/


'use client';

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, MessageCircle } from "lucide-react";
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
  const WHATSAPP_NUMBER = "254713577881";

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

  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = `Hello, I'm interested in this product:\n\n*${product.name}*\nPrice: KSh ${product.price.toLocaleString()}\nCategory: ${product.category}\n\nCould you please provide more information?`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
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
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
      
      <Link href={`/products/${product._id}`}>
        {/* IMAGE CONTAINER */}
        <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center overflow-hidden">
          {isValidImage ? (
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              unoptimized
              onError={handleImageError}
            />
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/images/placeholder.png"
                alt="placeholder"
                width={100}
                height={100}
                className="opacity-40 grayscale"
              />
              <p className="text-xs text-gray-400 mt-2">No image</p>
            </div>
          )}

          {/* Low Stock Badge */}
          {product.stock < 5 && product.stock > 0 && (
            <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">
              Low Stock
            </span>
          )}
          
          {/* Out of Stock Badge */}
          {product.stock === 0 && (
            <span className="absolute top-3 right-3 bg-red-500 text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">
              Out of Stock
            </span>
          )}

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-full text-sm font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              View Details
            </span>
          </div>
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-4 sm:p-5">
        <Link href={`/products/${product._id}`}>
          <h3 className="font-semibold text-gray-900 text-base sm:text-lg line-clamp-2 hover:text-blue-600 transition-colors min-h-[48px] sm:min-h-[56px]">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-500 text-xs sm:text-sm mb-3 capitalize">
          {product.category}
        </p>

        <div className="flex items-center justify-between gap-2 mt-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 line-through">
              {/*{product.stock > 0 && `KSh ${(product.price * 1.1).toLocaleString()}`}*/}
             
            </span>
            <span className="text-xl sm:text-2xl font-bold text-blue-600">
             Inquire {/*} KSh {product.price.toLocaleString()}*/}
            </span>
          </div>

          <div className="flex gap-2">
            {/* WhatsApp Inquiry Button */}
            <button
              onClick={handleWhatsAppInquiry}
              className="bg-green-500 hover:bg-green-600 text-white p-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
              title="Inquire on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Add to Cart Button */}
            {/*<button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`bg-gray-900 text-white p-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                product.stock > 0 ? 'hover:bg-gray-800' : ''
              }`}
              title={product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>*/}
            <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="text-white p-2.5 rounded-xl transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{
              backgroundColor: product.stock > 0 ? 'var(--primary)' : undefined,
            }}
            title={product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          </div>
        </div>

        {/* Stock Indicator */}
        {product.stock > 0 && product.stock < 10 && (
          <div className="mt-3">
            <div className="w-full bg-gray-100 rounded-full h-1">
              <div 
                className="bg-amber-500 h-1 rounded-full transition-all duration-300" 
                style={{ width: `${(product.stock / 10) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Only {product.stock} left in stock
            </p>
          </div>
        )}
      </div>
    </div>
  );
}