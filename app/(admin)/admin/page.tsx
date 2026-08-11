"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Package,
  ArrowUpRight,
  Star,
  Clock,
  RefreshCw,
} from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Stats {
  revenue: number;
  orderCount: number;
  customerCount: number;
  productCount: number;
}

interface RecentOrder {
  id: string;
  order_number: string;
  status: string;
  total: number;
  shipping_address: { full_name: string };
  created_at: string;
  order_items: { product_name: string; quantity: number }[];
}

interface TopProduct {
  id: string;
  name: string;
  price: number;
  rating: number;
  review_count: number;
  images: string[];
}

const statusColors: Record<string, string> = {
  delivered:  "bg-green-100 text-green-700",
  shipped:    "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  confirmed:  "bg-purple-100 text-purple-700",
  cancelled:  "bg-red-100 text-red-700",
  pending:    "bg-gray-100 text-gray-600",
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/stats");
    if (res.ok) {
      const data = await res.json();
      setStats(data.stats);
      setRecentOrders(data.recentOrders || []);
      setTopProducts(data.topProducts || []);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const statCards = stats ? [
    {
      label: "Total Revenue",
      value: formatPrice(stats.revenue),
      icon: TrendingUp,
      color: "bg-brand-pink-light",
      iconColor: "text-brand-pink-dark",
    },
    {
      label: "Total Orders",
      value: stats.orderCount.toString(),
      icon: ShoppingBag,
      color: "bg-brand-green-light",
      iconColor: "text-brand-green-dark",
    },
    {
      label: "Customers",
      value: stats.customerCount.toString(),
      icon: Users,
      color: "bg-brand-lavender",
      iconColor: "text-purple-600",
    },
    {
      label: "Products",
      value: stats.productCount.toString(),
      icon: Package,
      color: "bg-brand-yellow",
      iconColor: "text-amber-600",
    },
  ] : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-brown">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, Pooja! Here&apos;s what&apos;s happening.</p>
        </div>
        <button
          onClick={fetchData}
          className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-500 transition-colors"
          title="Refresh"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 animate-pulse">
                <div className="h-10 w-10 bg-gray-100 rounded-xl mb-4" />
                <div className="h-7 w-24 bg-gray-100 rounded mb-2" />
                <div className="h-4 w-20 bg-gray-100 rounded" />
              </div>
            ))
          : statCards.map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                    <ArrowUpRight className="w-3 h-3" />
                    Live
                  </span>
                </div>
                <p className="text-2xl font-display font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-500 text-sm mt-0.5">{stat.label}</p>
              </div>
            ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-display font-semibold text-gray-900">Recent Orders</h2>
            <a href="/admin/orders" className="text-brand-pink text-sm hover:underline">View all →</a>
          </div>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-5 space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-10 bg-gray-50 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="p-10 text-center text-gray-400">
                <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No orders yet</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">Order</th>
                    <th className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">Customer</th>
                    <th className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Item</th>
                    <th className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">Amount</th>
                    <th className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <p className="font-semibold text-gray-900 text-xs">{order.order_number}</p>
                        <p className="text-gray-400 text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                        </p>
                      </td>
                      <td className="px-5 py-3.5 text-gray-700 font-medium">
                        {order.shipping_address?.full_name || "—"}
                      </td>
                      <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell text-xs">
                        {order.order_items?.[0]?.product_name || "—"}
                        {(order.order_items?.length || 0) > 1 && ` +${order.order_items.length - 1} more`}
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-gray-900">{formatPrice(order.total)}</td>
                      <td className="px-5 py-3.5">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[order.status] || "bg-gray-100 text-gray-600"}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-display font-semibold text-gray-900">Top Products</h2>
          </div>
          <div className="p-4 space-y-3">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 animate-pulse">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 shrink-0" />
                  <div className="flex-1">
                    <div className="h-4 bg-gray-100 rounded mb-1" />
                    <div className="h-3 w-16 bg-gray-100 rounded" />
                  </div>
                  <div className="h-4 w-14 bg-gray-100 rounded" />
                </div>
              ))
            ) : topProducts.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-6">No products yet</p>
            ) : (
              topProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-cream overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.images?.[0] || ""}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs text-gray-500">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.review_count})</span>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-gray-900 shrink-0">{formatPrice(product.price)}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Add Product", href: "/admin/products", icon: "➕", color: "bg-brand-pink-light" },
          { label: "View Orders", href: "/admin/orders", icon: "📦", color: "bg-brand-green-light" },
          { label: "Customers", href: "/admin/customers", icon: "👥", color: "bg-brand-lavender" },
          { label: "Analytics", href: "/admin/analytics", icon: "📊", color: "bg-brand-yellow" },
        ].map((action) => (
          <a
            key={action.label}
            href={action.href}
            className={`${action.color} rounded-2xl p-4 flex flex-col items-center gap-2 hover:opacity-80 transition-opacity text-center`}
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="text-brand-brown font-semibold text-sm">{action.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
