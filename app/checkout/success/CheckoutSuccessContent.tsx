"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, MessageCircle, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  const whatsappUrl = searchParams.get("whatsapp");

  useEffect(() => {
    if (whatsappUrl) {
      const timer = setTimeout(() => {
        window.location.href = decodeURIComponent(whatsappUrl);
      }, 3000);

      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) clearInterval(countdownInterval);
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearTimeout(timer);
        clearInterval(countdownInterval);
      };
    } else {
      router.push("/");
    }
  }, [whatsappUrl, router]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Order Inquiry Initiated!
          </h1>
          
          <p className="text-gray-600 mb-6">
            Thank you for your order. You'll be redirected to WhatsApp to complete your inquiry.
          </p>

          {/* Countdown */}
          <div className="mb-6">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {countdown}
            </div>
            <p className="text-sm text-gray-500">
              Redirecting in {countdown} seconds...
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(5 - countdown) * 20}%` }}
              />
            </div>
          </div>

          {/* Manual Redirect Button */}
          {whatsappUrl && (
            <a
              href={decodeURIComponent(whatsappUrl)}
              className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 mb-4"
            >
              <MessageCircle className="w-5 h-5" />
              Open WhatsApp Now
            </a>
          )}

          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 w-full border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
          >
            <ShoppingBag className="w-5 h-5" />
            Continue Shopping
          </Link>

          {/* Note */}
          <p className="text-xs text-gray-400 mt-6">
            If WhatsApp doesn't open automatically, click the button above.
          </p>
        </div>
      </div>
    </div>
  );
}