"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, MessageCircle } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const whatsappUrl = searchParams.get("whatsapp");

  return (
    <div className="container mx-auto px-4 py-16 text-center text-[var(--foreground)]">

      <div className="max-w-md mx-auto bg-[var(--background)] border border-[var(--gray-light)] rounded-2xl p-8 shadow-sm">

        {/* Success Icon */}
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

        {/* Title */}
        <h1 className="text-2xl font-bold mb-3">
          Order Placed Successfully!
        </h1>

        {/* Subtitle */}
        <p className="text-[var(--gray-dark)] mb-8 text-sm leading-relaxed">
          Thank you for your order. We’ll contact you shortly to confirm the details.
        </p>

        {/* WhatsApp Button */}
        {whatsappUrl && (
          <a
            href={decodeURIComponent(whatsappUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition mb-4 w-full"
          >
            <MessageCircle className="w-5 h-5" />
            <span>View Order on WhatsApp</span>
          </a>
        )}

        {/* Continue Shopping */}
        <Link
          href="/products"
          className="inline-block w-full bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Continue Shopping
        </Link>

      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto animate-pulse space-y-4">
            <div className="w-16 h-16 bg-[var(--gray-light)] rounded-full mx-auto" />
            <div className="h-6 bg-[var(--gray-light)] rounded w-3/4 mx-auto" />
            <div className="h-4 bg-[var(--gray-light)] rounded w-full mx-auto" />
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}