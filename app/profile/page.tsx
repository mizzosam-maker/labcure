"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Save, LogOut } from "lucide-react";

export default function ProfilePage() {
  const { user, updateProfile, loading: authLoading, logout } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    setFormData({ name: user.name || "" });
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      await updateProfile(formData);
      setSuccess(true);

      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">

        {/* Title */}
        <h1 className="text-3xl font-bold mb-8">
          My <span className="text-primary">Profile</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* SIDEBAR */}
          <div className="md:col-span-1">

            <div className="bg-white border border-gray-light p-6 rounded-xl sticky top-24">

              {/* Avatar */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-primary-light/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-primary" />
                </div>

                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-gray-dark text-sm">{user.email}</p>

                <p className="text-xs text-primary mt-1 capitalize">
                  {user.role || "User"}
                </p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2 text-sm">

                <Link
                  href="/profile"
                  className="block px-4 py-2 bg-primary text-white rounded-lg font-medium"
                >
                  Profile Information
                </Link>

                <Link
                  href="/profile/orders"
                  className="block px-4 py-2 hover:bg-gray-light rounded-lg transition"
                >
                  My Orders
                </Link>

                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    className="block px-4 py-2 hover:bg-gray-light rounded-lg transition"
                  >
                    Admin Dashboard
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>

              </nav>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="md:col-span-2">

            <div className="bg-white border border-gray-light rounded-xl p-6">

              <h2 className="text-xl font-semibold mb-6">
                Edit Profile
              </h2>

              {/* Success */}
              {success && (
                <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                  Profile updated successfully!
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Name */}
                <div>
                  <label className="block mb-2 font-medium">
                    Full Name
                  </label>

                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-dark" />

                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-light rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 font-medium">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-dark" />

                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full pl-10 pr-4 py-3 border border-gray-light rounded-lg bg-gray-100 text-gray-dark cursor-not-allowed"
                    />
                  </div>

                  <p className="text-sm text-gray-dark mt-1">
                    Email cannot be changed. Contact support if needed.
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {loading ? "Saving..." : "Save Changes"}
                </button>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}