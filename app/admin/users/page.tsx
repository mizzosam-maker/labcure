"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {
  Search,
  Trash2,
  Shield,
  User as UserIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  phone?: string;
  address?: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const { user: currentUser, isAdmin } = useAuth();
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) return router.push("/login");
    if (!isAdmin) return router.push("/");
    fetchUsers();
  }, [currentUser, isAdmin]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    if (id === currentUser?._id) return alert("You cannot delete yourself");
    if (!confirm("Delete this user?")) return;

    const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });

    if (res.ok) {
      setUsers((prev) => prev.filter((u) => u._id !== id));
    }
  };

  const toggleRole = async (id: string, role: string) => {
    if (id === currentUser?._id) return alert("Cannot modify yourself");

    const newRole = role === "admin" ? "user" : "admin";

    const res = await fetch(`/api/admin/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: newRole }),
    });

    if (res.ok) {
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role: newRole as any } : u))
      );
    }
  };

  const filtered = users.filter((u) =>
    [u.name, u.email, u.phone, u.address]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-60">
        <div className="h-10 w-10 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-[var(--color-foreground)]">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Users <span className="text-[var(--color-primary)]">Management</span>
        </h1>
      </div>

      {/* Search */}
      <div className="mb-6 bg-white border border-[var(--color-gray-light)] rounded-xl p-3 flex items-center gap-2">
        <Search className="w-4 h-4 text-[var(--color-gray-dark)]" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="w-full outline-none text-sm"
        />
      </div>

      {/* Table */}
      <div className="hidden md:block bg-white rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-[var(--color-gray-dark)]">
            <tr>
              <th className="text-left p-4">User</th>
              <th className="text-left p-4">Contact</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Joined</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((u) => (
              <tr key={u._id} className="border-t hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white">
                    <UserIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium">{u.name}</p>
                    <p className="text-xs text-gray-500">{u.email}</p>
                  </div>
                </td>

                <td className="p-4 text-gray-600">
                  {u.phone || "—"}
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      u.role === "admin"
                        ? "bg-[var(--color-primary-light)] text-white"
                        : "bg-[var(--color-secondary-light)] text-white"
                    }`}
                  >
                    {u.role}
                  </span>
                </td>

                <td className="p-4 text-gray-500 text-xs">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => toggleRole(u._id, u.role)}
                    className="text-[var(--color-secondary)] hover:opacity-70"
                  >
                    <Shield className="w-5 h-5" />
                  </button>

                  {u._id !== currentUser?._id && (
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="text-[var(--color-primary)] hover:opacity-70"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-3">
        {filtered.map((u) => (
          <div
            key={u._id}
            className="border rounded-xl bg-white"
          >
            <div
              className="p-4 flex justify-between items-center"
              onClick={() =>
                setExpandedUser(expandedUser === u._id ? null : u._id)
              }
            >
              <div>
                <p className="font-medium">{u.name}</p>
                <p className="text-xs text-gray-500">{u.email}</p>
              </div>

              {expandedUser === u._id ? <ChevronUp /> : <ChevronDown />}
            </div>

            {expandedUser === u._id && (
              <div className="px-4 pb-4 space-y-3 text-sm text-gray-600">
                <p>📞 {u.phone || "No phone"}</p>
                <p>📍 {u.address || "No address"}</p>
                <p>📅 {new Date(u.createdAt).toLocaleDateString()}</p>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => toggleRole(u._id, u.role)}
                    className="flex-1 bg-[var(--color-secondary)] text-white py-2 rounded-lg"
                  >
                    Role
                  </button>

                  {u._id !== currentUser?._id && (
                    <button
                      onClick={() => deleteUser(u._id)}
                      className="flex-1 border border-[var(--color-primary)] text-[var(--color-primary)] py-2 rounded-lg"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No users found
        </p>
      )}
    </div>
  );
}