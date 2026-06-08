/*"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-[var(--foreground)]">

        <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-[var(--gray-light)]" />

        <h1 className="text-2xl font-bold mb-3">Your cart is empty</h1>

        <p className="text-[var(--gray-dark)] mb-8">
          Looks like you haven't added anything yet
        </p>

        <Link
          href="/products"
          className="inline-block bg-[var(--primary)] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Continue Shopping
        </Link>

      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 text-[var(--foreground)]">

      {/* Title *
      <h1 className="text-3xl font-bold mb-8">
        Shopping <span className="text-[var(--primary)]">Cart</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* CART ITEMS *
        <div className="lg:col-span-2 space-y-4">

          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 border border-[var(--gray-light)] rounded-xl p-4 bg-[var(--background)] hover:shadow-sm transition"
            >

              {/* IMAGE *
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-[var(--gray-light)] flex-shrink-0">

                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-[var(--gray-dark)]">
                    No image
                  </div>
                )}

              </div>

              {/* INFO *
              <div className="flex-1">
                <Link
                  href={`/products/${item.productId}`}
                  className="font-semibold hover:text-[var(--primary)] transition"
                >
                  {item.name}
                </Link>

                <p className="text-[var(--primary)] font-bold mt-1">
                  KSh {item.price.toLocaleString()}
                </p>
              </div>

              {/* QUANTITY *
              <div className="flex items-center gap-2">

                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.quantity - 1)
                  }
                  className="p-1 border border-[var(--gray-light)] rounded hover:bg-[var(--gray-light)] transition"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <span className="w-8 text-center">{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(item.productId, item.quantity + 1)
                  }
                  className="p-1 border border-[var(--gray-light)] rounded hover:bg-[var(--gray-light)] transition"
                >
                  <Plus className="w-4 h-4" />
                </button>

              </div>

              {/* TOTAL *
              <div className="text-right min-w-[100px]">
                <p className="font-semibold">
                  KSh {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>

              {/* REMOVE *
              <button
                onClick={() => removeFromCart(item.productId)}
                className="text-[var(--primary)] hover:opacity-70 transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>

            </div>
          ))}

        </div>

        {/* SUMMARY *
        <div className="lg:col-span-1">

          <div className="bg-[var(--background)] border border-[var(--gray-light)] rounded-xl p-6 sticky top-24">

            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm text-[var(--gray-dark)]">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[var(--foreground)]">
                  KSh {cartTotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>

            </div>

            <div className="border-t border-[var(--gray-light)] mt-4 pt-4 flex justify-between font-bold text-lg">

              <span>Total</span>

              <span className="text-[var(--primary)]">
                KSh {cartTotal.toLocaleString()}
              </span>

            </div>

            <Link
              href="/checkout"
              className="block w-full mt-6 bg-[var(--primary)] text-white text-center py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/products"
              className="block w-full mt-3 border border-[var(--primary)] text-[var(--primary)] text-center py-3 rounded-lg font-semibold hover:bg-[var(--primary)] hover:text-white transition"
            >
              Continue Shopping
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}*/

"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle, ArrowRight } from "lucide-react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartItemsCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-white rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start Shopping
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Shopping <span className="text-blue-600">Cart</span>
          </h1>
          <p className="text-gray-600 mt-2">{cartItemsCount} item(s) in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* CART ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  
                  {/* Image */}
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex-shrink-0">
                    {item.image && item.image !== "/images/placeholder.png" ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover p-2"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                        No image
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <Link
                      href={`/products/${item.productId}`}
                      className="font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <p className="text-blue-600 font-bold mt-1">
                      KSh {item.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="w-10 text-center font-medium text-gray-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="text-right min-w-[100px]">
                    <p className="font-bold text-gray-900">
                      KSh {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* SUMMARY CARD */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
              
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">
                    KSh {cartTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Items</span>
                  <span className="text-gray-900 font-medium">{cartItemsCount}</span>
                </div>
              </div>

              <div className="border-t border-gray-100 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">
                    KSh {cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="flex items-center justify-center gap-2 w-full mt-6 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="w-5 h-5" />
                Proceed to Checkout
              </Link>

              <Link
                href="/products"
                className="flex items-center justify-center gap-2 w-full mt-3 border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
              >
                <ShoppingBag className="w-5 h-5" />
                Continue Shopping
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-center gap-4 text-xs text-gray-500">
                  <span>🔒 Secure Checkout</span>
                  <span>💳 M-Pesa Accepted</span>
                  <span>🚚 Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}