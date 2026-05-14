"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/cart");
    }
  }, [cart.length, router]);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-[var(--gray-dark)]">
        Redirecting to cart...
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: cart.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: cartTotal,
        phone: formData.phone,
        address: formData.address,
        status: "pending",
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        const phone = "2547XXXXXXXX";

        const message = `New Order:
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}
Items:
${cart
  .map(
    (item) =>
      `- ${item.name} x${item.quantity} = KSh ${
        item.price * item.quantity
      }`
  )
  .join("\n")}
Total: KSh ${cartTotal}
Notes: ${formData.notes || "None"}`;

        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
          message
        )}`;

        clearCart();
        router.push(
          `/checkout/success?whatsapp=${encodeURIComponent(whatsappUrl)}`
        );
      }
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 text-[var(--foreground)]">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">
        Check<span className="text-[var(--primary)]">out</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* FORM */}
        <div className="bg-[var(--background)] border border-[var(--gray-light)] rounded-xl p-6">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block mb-2 font-medium">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-[var(--gray-light)] rounded-lg bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-2 font-medium">
                Phone Number (M-Pesa) *
              </label>
              <input
                type="tel"
                required
                placeholder="0712345678"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-2 border border-[var(--gray-light)] rounded-lg bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block mb-2 font-medium">
                Delivery Address *
              </label>
              <textarea
                required
                rows={3}
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full px-4 py-2 border border-[var(--gray-light)] rounded-lg bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block mb-2 font-medium">
                Order Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full px-4 py-2 border border-[var(--gray-light)] rounded-lg bg-[var(--background)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary)]"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--primary)] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>

          </form>
        </div>

        {/* SUMMARY */}
        <div className="bg-[var(--background)] border border-[var(--gray-light)] rounded-xl p-6 sticky top-24">

          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-3 mb-4">
            {cart.map((item) => (
              <div
                key={item.productId}
                className="flex justify-between text-sm text-[var(--gray-dark)]"
              >
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>
                  KSh {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-[var(--gray-light)] pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-[var(--primary)]">
              KSh {cartTotal.toLocaleString()}
            </span>
          </div>

          <p className="mt-4 text-sm text-[var(--gray-dark)]">
            Payment will be arranged via M-Pesa after order confirmation.
          </p>

        </div>
      </div>
    </div>
  );
}