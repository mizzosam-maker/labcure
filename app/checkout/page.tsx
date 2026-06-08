/*"use client";

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

      {/* Title *
      <h1 className="text-3xl font-bold mb-8">
        Check<span className="text-[var(--primary)]">out</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* FORM *
        <div className="bg-[var(--background)] border border-[var(--gray-light)] rounded-xl p-6">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name *
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

            {/* Phone *
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

            {/* Address *
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

            {/* Notes *
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

            {/* Submit *
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[var(--primary)] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>

          </form>
        </div>

        {/* SUMMARY *
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
}*/

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Truck, Clock, Shield, MessageCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart, generateWhatsAppMessage, cartItemsCount } = useCart();
  const WHATSAPP_NUMBER = "254713577881";

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
  });

  useEffect(() => {
    if (cart.length === 0) {
      router.push("/cart");
    }
  }, [cart.length, router]);

  const handleWhatsAppOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

    const itemsList = cart.map(item => 
      `• ${item.name} x${item.quantity} = KSh ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');
    
    const message = `🛍️ *NEW ORDER - Customer Inquiry* 🛍️

━━━━━━━━━━━━━━━━━
*CUSTOMER DETAILS*
━━━━━━━━━━━━━━━━━
👤 *Name:* ${formData.name}
📞 *Phone:* ${formData.phone}
📧 *Email:* ${formData.email || 'Not provided'}
📍 *Address:* ${formData.address}
🏙️ *City:* ${formData.city}

━━━━━━━━━━━━━━━━━
*ORDER SUMMARY*
━━━━━━━━━━━━━━━━━
${itemsList}

━━━━━━━━━━━━━━━━━
*TOTALS*
━━━━━━━━━━━━━━━━━
📦 Items: ${cartItemsCount}
💰 Total: KSh ${cartTotal.toLocaleString()}

━━━━━━━━━━━━━━━━━
*DELIVERY NOTES*
━━━━━━━━━━━━━━━━━
${formData.notes || 'No special instructions'}

━━━━━━━━━━━━━━━━━
⏰ *Order Time:* ${new Date().toLocaleString()}

Please confirm availability and arrange payment.`;

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    clearCart();
    router.push(`/checkout/success?whatsapp=${encodeURIComponent(whatsappUrl)}`);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/cart" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Complete Your <span className="text-blue-600">Order</span>
          </h1>
          <p className="text-gray-600 mt-2">Fill in your details to proceed with WhatsApp inquiry</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* FORM SECTION */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              
              {/* Progress Steps */}
              <div className="flex justify-between mb-8 pb-4 border-b border-gray-100">
                {['Cart', 'Details', 'WhatsApp'].map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      index === 1 ? 'bg-blue-600 text-white' : 
                      index < 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                    }`}>
                      {index < 1 ? '✓' : index + 1}
                    </div>
                    <span className={`ml-2 text-sm font-medium hidden sm:inline ${
                      index === 1 ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step}
                    </span>
                    {index < 2 && <div className="w-12 h-px bg-gray-200 mx-2 hidden sm:block" />}
                  </div>
                ))}
              </div>

              <form onSubmit={handleWhatsAppOrder} className="space-y-6">
                
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0712345678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">We'll contact you on this number</p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Delivery Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Street, Building, Apartment number"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nairobi"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Special Instructions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Any specific delivery instructions or preferences..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5" />
                      Continue on WhatsApp
                    </>
                  )}
                </button>

              </form>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
              
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                Order Summary
              </h2>

              {/* Items */}
              <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
                {cart.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.name} <span className="text-gray-400">x{item.quantity}</span>
                    </span>
                    <span className="font-medium text-gray-900">
                      KSh {(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">KSh {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">To be confirmed</span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-blue-600">
                    KSh {cartTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="mt-6 space-y-3 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>Free delivery on orders over KSh 5,000</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span>Delivery within 2-3 business days</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-purple-600" />
                  <span>Secure checkout with WhatsApp</span>
                </div>
              </div>

              {/* Note */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <p className="text-xs text-blue-800 text-center">
                  💬 You'll be redirected to WhatsApp to complete your order inquiry
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}