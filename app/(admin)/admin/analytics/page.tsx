import type { Metadata } from "next";
import { TrendingUp, ShoppingBag, Users, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { products, categories } from "@/lib/data";

export const metadata: Metadata = { title: "Admin Analytics" };

const monthlyData = [
  { month: "Feb", revenue: 8200,  orders: 18 },
  { month: "Mar", revenue: 11400, orders: 24 },
  { month: "Apr", revenue: 9800,  orders: 21 },
  { month: "May", revenue: 14200, orders: 31 },
  { month: "Jun", revenue: 18600, orders: 38 },
  { month: "Jul", revenue: 22100, orders: 47 },
];

const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-brand-brown">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Performance overview — last 6 months</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Revenue (Jul)", value: formatPrice(22100), change: "+18.7%", icon: TrendingUp, color: "bg-brand-pink-light", ic: "text-brand-pink-dark" },
          { label: "Orders (Jul)",  value: "47",               change: "+23.7%", icon: ShoppingBag, color: "bg-brand-green-light", ic: "text-brand-green-dark" },
          { label: "Customers",     value: "512",              change: "+8.1%",  icon: Users, color: "bg-brand-lavender", ic: "text-purple-600" },
          { label: "Avg. Rating",   value: "4.85 ★",          change: "+0.1",   icon: Star,  color: "bg-brand-yellow", ic: "text-amber-600" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 rounded-xl ${kpi.color} flex items-center justify-center mb-3`}>
              <kpi.icon className={`w-5 h-5 ${kpi.ic}`} />
            </div>
            <p className="text-2xl font-display font-bold text-gray-900">{kpi.value}</p>
            <p className="text-gray-500 text-sm mt-0.5">{kpi.label}</p>
            <p className="text-green-600 text-xs font-semibold mt-1">{kpi.change} vs last month</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart (CSS bar chart) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-display font-semibold text-gray-900 mb-6">Monthly Revenue</h2>
        <div className="flex items-end justify-between gap-3 h-48">
          {monthlyData.map((d) => (
            <div key={d.month} className="flex flex-col items-center gap-2 flex-1">
              <span className="text-xs text-gray-500 font-medium">{formatPrice(d.revenue)}</span>
              <div
                className="w-full rounded-t-xl bg-gradient-to-t from-brand-pink to-brand-pink-light transition-all duration-700 relative group"
                style={{ height: `${Math.round((d.revenue / maxRevenue) * 160)}px` }}
              >
                {/* Tooltip */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-brand-brown text-white text-xs rounded-lg px-2 py-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {d.orders} orders
                </div>
              </div>
              <span className="text-xs text-gray-500 font-medium">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-display font-semibold text-gray-900 mb-5">
            Sales by Category
          </h2>
          <div className="space-y-4">
            {categories.map((cat, i) => {
              const pct = [68, 52, 44, 31, 27, 19][i];
              return (
                <div key={cat.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-gray-700 font-medium">{cat.name}</span>
                    <span className="text-sm text-gray-500">{pct}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-pink to-brand-green transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-display font-semibold text-gray-900 mb-5">
            Top Performing Products
          </h2>
          <div className="space-y-4">
            {products
              .sort((a, b) => b.review_count - a.review_count)
              .slice(0, 5)
              .map((product, i) => (
                <div key={product.id} className="flex items-center gap-4">
                  <span className="text-lg font-display font-bold text-gray-300 w-6 shrink-0">
                    {i + 1}
                  </span>
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-brand-cream">
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
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>{product.review_count} reviews</span>
                      <span>·</span>
                      <span className="text-amber-600">★ {product.rating}</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-gray-900 shrink-0">
                    {formatPrice(product.price)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
