"use client";

import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  Trash2,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  Truck,
} from "lucide-react";

interface Order {
  _id: string;
  userId?: string;
  items: {
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  status: "pending" | "paid" | "delivered";
  phone: string;
  address: string;
  createdAt: string;
}

export default function AdminOrdersPage() {
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return router.push("/login");
    if (!isAdmin) return router.push("/");
    fetchOrders();
  }, [user, isAdmin]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(data);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status: status as any } : o
        )
      );
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Delete this order?")) return;

    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setOrders((prev) => prev.filter((o) => o._id !== id));
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order._id.toLowerCase().includes(search.toLowerCase()) ||
        order.phone.includes(search) ||
        order.address.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = !statusFilter || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "delivered":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "paid":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "delivered":
        return <Truck className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">

      {/* HEADER */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Manage <span className="text-primary">Orders</span>
      </h1>

      {/* FILTERS */}
      <div className="bg-background border border-gray-light p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-dark" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              className="w-full pl-10 py-2 border border-gray-light rounded-lg bg-background focus:ring-2 focus:ring-primary outline-none"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-dark" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 py-2 border border-gray-light rounded-lg bg-background focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>

        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-background border border-gray-light rounded-lg overflow-hidden">
        <table className="w-full">

          <thead className="bg-primary text-white">
            <tr>
              <th className="p-3 text-left">Order</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Total</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order._id}
                className="border-t border-gray-light hover:bg-gray-light/30"
              >
                <td className="p-3 font-mono text-sm">
                  #{order._id.slice(-8)}
                </td>

                <td className="p-3 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="p-3 text-sm">
                  <div>{order.phone}</div>
                  <div className="text-xs text-gray-dark">{order.address}</div>
                </td>

                <td className="p-3 font-bold">
                  KSh {order.total.toLocaleString()}
                </td>

                <td className="p-3">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order._id, e.target.value)
                    }
                    className={`px-2 py-1 rounded text-xs border border-gray-light ${getStatusColor(
                      order.status
                    )}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>

                <td className="p-3">
                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* MOBILE */}
      <div className="md:hidden space-y-4">
        {filteredOrders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-light rounded-lg bg-background"
          >
            <div
              className="p-4 flex justify-between bg-gray-light/20 cursor-pointer"
              onClick={() =>
                setExpandedOrder(
                  expandedOrder === order._id ? null : order._id
                )
              }
            >
              <div>
                <div className="font-mono text-sm">
                  #{order._id.slice(-8)}
                </div>
                <div className="text-xs text-gray-dark">
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </div>

              {expandedOrder === order._id ? (
                <ChevronUp />
              ) : (
                <ChevronDown />
              )}
            </div>

            {expandedOrder === order._id && (
              <div className="p-4 space-y-3">

                <div>
                  <p className="text-sm font-medium">Customer</p>
                  <p className="text-sm">{order.phone}</p>
                  <p className="text-xs text-gray-dark">{order.address}</p>
                </div>

                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="text-primary font-bold">
                    KSh {order.total.toLocaleString()}
                  </span>
                </div>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateOrderStatus(order._id, e.target.value)
                  }
                  className={`w-full px-3 py-2 rounded border border-gray-light ${getStatusColor(
                    order.status
                  )}`}
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="delivered">Delivered</option>
                </select>

                <button
                  onClick={() => deleteOrder(order._id)}
                  className="w-full bg-red-100 text-red-600 py-2 rounded"
                >
                  Delete Order
                </button>

              </div>
            )}
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-10 text-gray-dark">
          No orders found
        </div>
      )}

      {/* COUNT */}
      {filteredOrders.length > 0 && (
        <div className="text-center text-sm text-gray-dark mt-4">
          Showing {filteredOrders.length} of {orders.length}
        </div>
      )}
    </div>
  );
}