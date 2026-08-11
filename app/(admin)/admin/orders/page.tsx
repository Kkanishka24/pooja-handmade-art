"use client";

import { useState, useEffect, useCallback } from "react";
import { formatPrice } from "@/lib/utils";
import { Search, Eye, Download, Filter, RefreshCw, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderItem {
  product_name: string;
  quantity: number;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  total: number;
  payment_method: string;
  shipping_address: {
    full_name: string;
    email: string;
    city: string;
    state: string;
  };
  created_at: string;
  order_items: OrderItem[];
}

const statusColors: Record<string, string> = {
  delivered:      "bg-green-100 text-green-700",
  shipped:        "bg-blue-100 text-blue-700",
  processing:     "bg-yellow-100 text-yellow-700",
  confirmed:      "bg-purple-100 text-purple-700",
  cancelled:      "bg-red-100 text-red-700",
  pending:        "bg-gray-100 text-gray-600",
  out_for_delivery: "bg-cyan-100 text-cyan-700",
};

const allStatuses = ["all", "pending", "confirmed", "processing", "shipped", "out_for_delivery", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [openStatusId, setOpenStatusId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (search) params.set("search", search);

    const res = await fetch(`/api/admin/orders?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      setOrders(data.orders || []);
    }
    setLoading(false);
  }, [statusFilter, search]);

  useEffect(() => {
    const timer = setTimeout(fetchOrders, 300); // debounce search
    return () => clearTimeout(timer);
  }, [fetchOrders]);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    setOpenStatusId(null);
    const res = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order_id: orderId, status: newStatus }),
    });
    if (res.ok) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    }
    setUpdatingId(null);
  };

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const exportCSV = () => {
    const headers = ["Order #", "Customer", "Email", "Items", "Total", "Payment", "Status", "Date"];
    const rows = orders.map((o) => [
      o.order_number,
      o.shipping_address?.full_name || "",
      o.shipping_address?.email || "",
      o.order_items?.map((i) => `${i.product_name} ×${i.quantity}`).join("; ") || "",
      o.total,
      o.payment_method,
      o.status,
      new Date(o.created_at).toLocaleDateString("en-IN"),
    ]);

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-brown">Orders</h1>
          <p className="text-gray-500 text-sm">
            {loading ? "Loading..." : `${orders.length} orders · ${formatPrice(totalRevenue)} revenue`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchOrders}
            className="btn-ghost border border-gray-200 text-sm flex items-center gap-2"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={exportCSV}
            className="btn-secondary text-sm self-start flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search orders or customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="order-search"
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-pink bg-white"
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-gray-400" />
          {allStatuses.map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all",
                statusFilter === status
                  ? "bg-brand-brown text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-brand-pink"
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                {["Order #", "Customer", "Items", "Amount", "Payment", "Date", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={8} className="px-5 py-4">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-gray-400">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 font-semibold text-gray-900 whitespace-nowrap">
                      #{order.order_number}
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-900">{order.shipping_address?.full_name || "—"}</p>
                      <p className="text-gray-400 text-xs">{order.shipping_address?.email || ""}</p>
                    </td>
                    <td className="px-5 py-4 text-gray-600 max-w-[180px]">
                      <p className="line-clamp-2 text-xs">
                        {order.order_items?.map((i) => `${i.product_name} ×${i.quantity}`).join(", ") || "—"}
                      </p>
                    </td>
                    <td className="px-5 py-4 font-semibold text-gray-900 whitespace-nowrap">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-5 py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-xs font-semibold uppercase",
                        order.payment_method === "cod" ? "bg-amber-100 text-amber-700" : "bg-blue-50 text-blue-700"
                      )}>
                        {order.payment_method === "cod" ? "COD" : "Online"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-gray-500 whitespace-nowrap">
                      {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[order.status] || "bg-gray-100 text-gray-600"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="relative">
                        <button
                          onClick={() => setOpenStatusId(openStatusId === order.id ? null : order.id)}
                          disabled={updatingId === order.id}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-gray-200 hover:border-brand-pink text-gray-600 text-xs transition-colors disabled:opacity-50"
                          aria-label="Change status"
                        >
                          {updatingId === order.id ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            <>
                              <Eye className="w-3 h-3" />
                              <ChevronDown className="w-3 h-3" />
                            </>
                          )}
                        </button>
                        {openStatusId === order.id && (
                          <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-20 animate-fade-in">
                            {allStatuses.filter(s => s !== "all").map((s) => (
                              <button
                                key={s}
                                onClick={() => handleStatusUpdate(order.id, s)}
                                className={cn(
                                  "w-full text-left px-3 py-2 text-xs capitalize hover:bg-gray-50 transition-colors",
                                  order.status === s ? "font-semibold text-brand-brown" : "text-gray-600"
                                )}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
