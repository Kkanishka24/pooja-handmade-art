import type { Metadata } from "next";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Clock,
} from "lucide-react";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Admin Dashboard" };

const stats = [
  {
    label: "Total Revenue",
    value: "₹1,24,850",
    change: "+18.2%",
    positive: true,
    icon: TrendingUp,
    color: "bg-brand-pink-light",
    iconColor: "text-brand-pink-dark",
  },
  {
    label: "Total Orders",
    value: "284",
    change: "+12.5%",
    positive: true,
    icon: ShoppingBag,
    color: "bg-brand-green-light",
    iconColor: "text-brand-green-dark",
  },
  {
    label: "Customers",
    value: "512",
    change: "+8.1%",
    positive: true,
    icon: Users,
    color: "bg-brand-lavender",
    iconColor: "text-purple-600",
  },
  {
    label: "Products",
    value: "12",
    change: "+2",
    positive: true,
    icon: Package,
    color: "bg-brand-yellow",
    iconColor: "text-amber-600",
  },
];

const recentOrders = [
  { id: "ORD001", customer: "Priya Sharma", product: "Felt Rainbow Mobile", amount: 899, status: "delivered", date: "2 Aug" },
  { id: "ORD002", customer: "Ananya Patel", product: "Diwali Diya Set", amount: 749, status: "shipped", date: "1 Aug" },
  { id: "ORD003", customer: "Sneha Kulkarni", product: "Gift Hamper Box", amount: 1499, status: "processing", date: "1 Aug" },
  { id: "ORD004", customer: "Meera Reddy", product: "Felt Star Keychain × 3", amount: 747, status: "confirmed", date: "31 Jul" },
  { id: "ORD005", customer: "Kavya Menon", product: "Spring Bloom Wreath", amount: 1299, status: "delivered", date: "30 Jul" },
];

const statusColors: Record<string, string> = {
  delivered: "bg-green-100 text-green-700",
  shipped: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-purple-100 text-purple-700",
  cancelled: "bg-red-100 text-red-700",
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-brand-brown">
          Dashboard
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back, Pooja! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-semibold ${
                  stat.positive ? "text-green-600" : "text-red-500"
                }`}
              >
                {stat.positive ? (
                  <ArrowUpRight className="w-3 h-3" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" />
                )}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-display font-bold text-gray-900">
              {stat.value}
            </p>
            <p className="text-gray-500 text-sm mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-display font-semibold text-gray-900">
              Recent Orders
            </h2>
            <a href="/admin/orders" className="text-brand-pink text-sm hover:underline">
              View all →
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">Order</th>
                  <th className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">Customer</th>
                  <th className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider hidden md:table-cell">Product</th>
                  <th className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">Amount</th>
                  <th className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div>
                        <p className="font-semibold text-gray-900 text-xs">{order.id}</p>
                        <p className="text-gray-400 text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {order.date}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-gray-700 font-medium">{order.customer}</td>
                    <td className="px-5 py-3.5 text-gray-500 hidden md:table-cell">{order.product}</td>
                    <td className="px-5 py-3.5 font-semibold text-gray-900">{formatPrice(order.amount)}</td>
                    <td className="px-5 py-3.5">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h2 className="font-display font-semibold text-gray-900">
              Top Products
            </h2>
          </div>
          <div className="p-4 space-y-3">
            {products.filter((p) => p.is_bestseller).slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-cream overflow-hidden shrink-0 relative">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs text-gray-500">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.review_count})</span>
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-900 shrink-0">
                  {formatPrice(product.price)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Add Product", href: "/admin/products/new", icon: "➕", color: "bg-brand-pink-light" },
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
            <span className="text-brand-brown font-semibold text-sm">
              {action.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
