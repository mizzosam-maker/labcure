"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MessageSquare,
  Mail,
  Phone,
  CheckCircle,
  Trash2,
  ArrowLeft,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Message {
  _id: string;
  name: string;
  phone: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  productId?: string;
}

export default function AdminMessagesPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState<"all" | "read" | "unread">("all");
  const [isMobileListOpen, setIsMobileListOpen] = useState(true);

  useEffect(() => {
    if (authLoading) return;

    if (!user) return router.push("/login");
    if (!isAdmin) return router.push("/");

    fetchMessages();
  }, [user, isAdmin, authLoading]);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    await fetch(`/api/messages/${id}`, { method: "PUT" });
    setMessages((prev) =>
      prev.map((m) => (m._id === id ? { ...m, isRead: true } : m))
    );
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Delete this message?")) return;

    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    setMessages((prev) => prev.filter((m) => m._id !== id));

    if (selectedMessage?._id === id) setSelectedMessage(null);
  };

  const filteredMessages = messages.filter((msg) => {
    if (filter === "read") return msg.isRead;
    if (filter === "unread") return !msg.isRead;
    return true;
  });

  const unreadCount = messages.filter((m) => !m.isRead).length;

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <Link
            href="/admin"
            className="text-gray-dark hover:text-primary flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <h1 className="text-3xl font-bold mt-2">
            Customer <span className="text-primary">Messages</span>
          </h1>
        </div>

        <div className="flex gap-3">
          {unreadCount > 0 && (
            <button className="bg-primary text-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary-dark flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Mark All Read
            </button>
          )}

          <button
            onClick={fetchMessages}
            className="border border-primary text-foreground px-4 py-2 rounded-lg hover:bg-primary flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-background p-4 rounded-lg border border-gray-light">
          <p className="text-gray-dark">Total</p>
          <p className="text-xl font-bold">{messages.length}</p>
        </div>

        <div className="bg-background p-4 rounded-lg border border-gray-light">
          <p className="text-gray-dark">Unread</p>
          <p className="text-xl font-bold text-primary">{unreadCount}</p>
        </div>

        <div className="bg-background p-4 rounded-lg border border-gray-light">
          <p className="text-gray-dark">Read</p>
          <p className="text-xl font-bold text-secondary">
            {messages.length - unreadCount}
          </p>
        </div>
      </div>

      {/* FILTER */}
      <div className="flex border-b border-gray-light mb-4">
        {["all", "unread", "read"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 capitalize ${
              filter === f
                ? "text-primary border-b-2 border-primary"
                : "text-gray-dark"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* LEFT */}
        <div className="space-y-3">
          {filteredMessages.map((msg) => (
            <div
              key={msg._id}
              onClick={() => setSelectedMessage(msg)}
              className="bg-background border border-gray-light p-4 rounded-lg cursor-pointer hover:border-primary"
            >
              <h3 className="font-semibold">{msg.name}</h3>
              <p className="text-gray-dark text-sm">{msg.phone}</p>
              <p className="text-gray-dark text-xs line-clamp-2 mt-1">
                {msg.message}
              </p>

              {!msg.isRead && (
                <span className="inline-block mt-2 text-xs bg-primary text-foreground px-2 py-1 rounded">
                  New
                </span>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <div className="bg-background border border-gray-light p-6 rounded-lg">
              
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">{selectedMessage.name}</h2>

                <div className="flex gap-2">
                  {!selectedMessage.isRead && (
                    <button
                      onClick={() => markAsRead(selectedMessage._id)}
                      className="text-secondary"
                    >
                      <CheckCircle />
                    </button>
                  )}

                  <button
                    onClick={() => deleteMessage(selectedMessage._id)}
                    className="text-accent-dark"
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>

              <p className="text-gray-dark whitespace-pre-wrap">
                {selectedMessage.message}
              </p>

              <div className="mt-6 border-t border-gray-light pt-4">
                <button className="w-full bg-secondary text-foreground py-3 rounded-lg hover:bg-secondary-dark">
                  Reply on WhatsApp
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center p-10 bg-background border border-gray-light rounded-lg">
              <MessageSquare className="mx-auto text-primary w-12 h-12" />
              <p className="text-gray-dark mt-2">Select a message</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}