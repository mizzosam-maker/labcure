"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  LogOut,
  Package,
  Settings,
  ChevronDown,
} from "lucide-react";

const categories = [
  "Pharma",
  "Medical Equipment",
  "Laboratory Equipment",
  "Operating Theatre Equipment",
  "Wheelchairs",
  "Hospital Beds",
  "Pharmacy Fridges",
  "Blood Pressure Monitors",
  "Crutches",
  "Walking Frames",
  "LAMPS",
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktopUserOpen, setIsDesktopUserOpen] = useState(false);
  const [isMobileUserOpen, setIsMobileUserOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);

  const { cart } = useCart();
  const { user, logout, isAdmin } = useAuth();

  const userMenuRef = useRef<HTMLDivElement>(null);

  const cartItemsCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsDesktopUserOpen(false);
      }
    }

    if (isDesktopUserOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [isDesktopUserOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-[var(--background)] border-b border-[var(--gray-light)] sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">

          {/* LOGO (IMAGE + TEXT) */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">

            <Image
              src="/images/logo.png"
              alt="LabCure Logo"
              width={50}
              height={50}
              className="rounded-md"
            />

            <span className="text-lg font-bold text-[var(--primary)]">
              LabCure
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-[var(--primary)]">
              Home
            </Link>

            <Link href="/products" className="hover:text-[var(--primary)]">
              All Products
            </Link>

            <div className="relative group">
              <button className="flex items-center gap-1 hover:text-[var(--primary)]">
                Categories <ChevronDown className="w-4 h-4" />
              </button>

              <div className="absolute top-full left-0 mt-2 w-52 bg-[var(--background)] border border-[var(--gray-light)] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className="block px-4 py-2 hover:bg-[var(--accent)]"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/contact" className="hover:text-[var(--primary)]">
              Contact
            </Link>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-3">

            {/* CART */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--primary)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* MOBILE USER ICON */}
            <div className="md:hidden relative">
              <button
                onClick={() => setIsMobileUserOpen((p) => !p)}
                className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center"
              >
                <User className="w-5 h-5 text-white" />
              </button>

              {isMobileUserOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[var(--background)] border border-[var(--gray-light)] rounded-xl shadow-lg z-50">

                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-[var(--gray-light)]">
                        <p className="font-semibold truncate">{user.name}</p>
                        <p className="text-xs text-[var(--gray-dark)] truncate">
                          {user.email}
                        </p>
                      </div>

                      <Link
                        href="/profile"
                        onClick={() => setIsMobileUserOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--accent)]"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>

                      <Link
                        href="/profile/orders"
                        onClick={() => setIsMobileUserOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--accent)]"
                      >
                        <Package className="w-4 h-4" />
                        Orders
                      </Link>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setIsMobileUserOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 hover:bg-[var(--accent)]"
                        >
                          <Settings className="w-4 h-4" />
                          Admin
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setIsMobileUserOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setIsMobileUserOpen(false)}
                        className="block px-4 py-2 hover:bg-[var(--accent)]"
                      >
                        Login
                      </Link>

                      <Link
                        href="/register"
                        onClick={() => setIsMobileUserOpen(false)}
                        className="block px-4 py-2 hover:bg-[var(--accent)]"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* DESKTOP USER */}
            <div className="hidden md:block relative" ref={userMenuRef}>
              <button
                onClick={() => setIsDesktopUserOpen((p) => !p)}
                className="w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center"
              >
                <User className="w-5 h-5 text-white" />
              </button>

              {isDesktopUserOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[var(--background)] border border-[var(--gray-light)] rounded-lg shadow-lg py-2">

                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-[var(--gray-light)]">
                        <p className="font-semibold truncate">{user.name}</p>
                        <p className="text-sm text-[var(--gray-dark)] truncate">
                          {user.email}
                        </p>
                      </div>

                      <Link href="/profile" className="block px-4 py-2 hover:bg-[var(--accent)]">
                        Profile
                      </Link>

                      <Link href="/profile/orders" className="block px-4 py-2 hover:bg-[var(--accent)]">
                        Orders
                      </Link>

                      {isAdmin && (
                        <Link href="/admin" className="block px-4 py-2 hover:bg-[var(--accent)]">
                          Admin
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setIsDesktopUserOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="block px-4 py-2 hover:bg-[var(--accent)]">
                        Login
                      </Link>

                      <Link href="/register" className="block px-4 py-2 hover:bg-[var(--accent)]">
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* MOBILE MENU */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}