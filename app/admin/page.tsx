"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Package,
  Users,
  ShoppingBag,
  MessageSquare,
  Plus,
  Edit,
  Mail,
} from "lucide-react";

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalMessages: number;
}

export default function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();

  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalMessages: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    if (!isAdmin) {
      router.push("/");
      return;
    }

    fetchStats();
  }, [user, isAdmin, authLoading]);

  const fetchStats = async () => {
    try {
      const [productsRes, ordersRes, usersRes, messagesRes] =
        await Promise.all([
          fetch("/api/products"),
          fetch("/api/orders"),
          fetch("/api/admin/users"),
          fetch("/api/messages"),
        ]);

      const products = await productsRes.json();
      const orders = await ordersRes.json();
      const users = await usersRes.json();
      const messages = await messagesRes.json();

      setStats({
        totalProducts: products.length || 0,
        totalOrders: orders.length || 0,
        totalUsers: users.length || 0,
        totalMessages: messages.length || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">

        {/* Header */}
        <h1 className="text-3xl font-bold mb-8">
          Admin <span className="text-primary">Dashboard</span>
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <Link
            href="/admin/products"
            className="bg-gray-light/30 border border-gray-light rounded-xl p-6 hover:shadow-md transition block"
          >
            <div className="flex items-center justify-between mb-4">
              <Package className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">
                {stats.totalProducts}
              </span>
            </div>
            <h3 className="font-medium">Total Products</h3>
            <p className="text-sm text-gray-dark mt-1">Click to manage →</p>
          </Link>

          <Link
            href="/admin/orders"
            className="bg-gray-light/30 border border-gray-light rounded-xl p-6 hover:shadow-md transition block"
          >
            <div className="flex items-center justify-between mb-4">
              <ShoppingBag className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">
                {stats.totalOrders}
              </span>
            </div>
            <h3 className="font-medium">Total Orders</h3>
            <p className="text-sm text-gray-dark mt-1">Click to manage →</p>
          </Link>

          <Link
            href="/admin/users"
            className="bg-gray-light/30 border border-gray-light rounded-xl p-6 hover:shadow-md transition block"
          >
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">
                {stats.totalUsers}
              </span>
            </div>
            <h3 className="font-medium">Total Users</h3>
            <p className="text-sm text-gray-dark mt-1">Click to manage →</p>
          </Link>

          <Link
            href="/admin/messages"
            className="bg-gray-light/30 border border-gray-light rounded-xl p-6 hover:shadow-md transition block"
          >
            <div className="flex items-center justify-between mb-4">
              <MessageSquare className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold">
                {stats.totalMessages}
              </span>
            </div>
            <h3 className="font-medium">Messages</h3>
            <p className="text-sm text-gray-dark mt-1">Click to view →</p>
          </Link>

        </div>

        {/* Quick Actions */}
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

          <Link
            href="/admin/products/new"
            className="bg-background border border-gray-light rounded-lg p-4 hover:border-primary transition flex items-center space-x-3"
          >
            <Plus className="w-5 h-5 text-primary" />
            <span>Add Product</span>
          </Link>

          <Link
            href="/admin/products"
            className="bg-background border border-gray-light rounded-lg p-4 hover:border-primary transition flex items-center space-x-3"
          >
            <Edit className="w-5 h-5 text-primary" />
            <span>Manage Products</span>
          </Link>

          <Link
            href="/admin/orders"
            className="bg-background border border-gray-light rounded-lg p-4 hover:border-primary transition flex items-center space-x-3"
          >
            <ShoppingBag className="w-5 h-5 text-primary" />
            <span>Manage Orders</span>
          </Link>

          <Link
            href="/admin/users"
            className="bg-background border border-gray-light rounded-lg p-4 hover:border-primary transition flex items-center space-x-3"
          >
            <Users className="w-5 h-5 text-primary" />
            <span>Manage Users</span>
          </Link>

          <Link
            href="/admin/messages"
            className="bg-background border border-gray-light rounded-lg p-4 hover:border-primary transition flex items-center space-x-3"
          >
            <Mail className="w-5 h-5 text-primary" />
            <span>View Messages</span>
          </Link>

        </div>

      </div>
    </div>
  );
}