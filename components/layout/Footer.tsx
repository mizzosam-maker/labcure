import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--foreground)] text-[var(--background)] mt-16 border-t border-[var(--gray-dark)]">

      <div className="container mx-auto px-4 py-12">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">

          {/* ABOUT */}
          <div>

            {/* LOGO */}
            <div className="mb-4">
              <Image
                src="/images/full-logo.png"
                alt="LabCure Logo"
                width={160}
                height={60}
                className="h-auto w-auto max-w-[160px]"
              />
            </div>

            <p className="text-[var(--gray-light)] leading-relaxed">
              Trusted supplier of laboratory, pharmaceutical, and medical
              equipment solutions across Kenya.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold mb-4 text-[var(--secondary)]">
              Quick Links
            </h4>

            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-[var(--gray-light)] hover:text-[var(--primary)]">
                  All Products
                </Link>
              </li>

              <li>
                <Link href="/cart" className="text-[var(--gray-light)] hover:text-[var(--primary)]">
                  Cart
                </Link>
              </li>

              <li>
                <Link href="/contact" className="text-[var(--gray-light)] hover:text-[var(--primary)]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* CATEGORIES */}
          <div>
            <h4 className="font-semibold mb-4 text-[var(--secondary)]">
              Categories
            </h4>

            <ul className="space-y-3">
              <li>
                <Link href="/products?category=Pharma" className="text-[var(--gray-light)] hover:text-[var(--primary)]">
                  Pharma
                </Link>
              </li>

              <li>
                <Link href="/products?category=Medical Equipment" className="text-[var(--gray-light)] hover:text-[var(--primary)]">
                  Medical Equipment
                </Link>
              </li>

              <li>
                <Link href="/products?category=Laboratory Equipment" className="text-[var(--gray-light)] hover:text-[var(--primary)]">
                  Laboratory Equipment
                </Link>
              </li>

              <li>
                <Link href="/products?category=Wheelchairs" className="text-[var(--gray-light)] hover:text-[var(--primary)]">
                  Wheelchairs
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold mb-4 text-[var(--secondary)]">
              Contact Us
            </h4>

            <ul className="space-y-4 text-[var(--gray-light)]">

              <li className="flex items-center gap-3">
                <div className="bg-[var(--primary)]/10 p-2 rounded-lg">
                  <Phone className="w-4 h-4 text-[var(--primary)]" />
                </div>
                <span>+254 7XX XXX XXX</span>
              </li>

              <li className="flex items-center gap-3">
                <div className="bg-[var(--secondary)]/10 p-2 rounded-lg">
                  <Mail className="w-4 h-4 text-[var(--secondary)]" />
                </div>
                <span>info@labcurekenya.co.ke</span>
              </li>

              <li className="flex items-center gap-3">
                <div className="bg-[var(--accent)]/10 p-2 rounded-lg">
                  <MapPin className="w-4 h-4 text-[var(--accent)]" />
                </div>
                <span>Nairobi, Kenya</span>
              </li>

            </ul>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-[var(--gray-dark)] mt-10 pt-6 text-center text-[var(--gray-light)]">
          <p>
            &copy; {new Date().getFullYear()} LabCure. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}