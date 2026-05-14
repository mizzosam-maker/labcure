"use client";

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

      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">
        Shopping <span className="text-[var(--primary)]">Cart</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-4">

          {cart.map((item) => (
            <div
              key={item.productId}
              className="flex items-center gap-4 border border-[var(--gray-light)] rounded-xl p-4 bg-[var(--background)] hover:shadow-sm transition"
            >

              {/* IMAGE */}
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

              {/* INFO */}
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

              {/* QUANTITY */}
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

              {/* TOTAL */}
              <div className="text-right min-w-[100px]">
                <p className="font-semibold">
                  KSh {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>

              {/* REMOVE */}
              <button
                onClick={() => removeFromCart(item.productId)}
                className="text-[var(--primary)] hover:opacity-70 transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>

            </div>
          ))}

        </div>

        {/* SUMMARY */}
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
}