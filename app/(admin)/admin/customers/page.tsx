"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Mail, ShoppingBag, RefreshCw, Users } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Customer {
  id: string;
  full_name: string | null;
  email: string;
  phone: string | null;
  order_count: number;
  total_spent: number;
  joined: string;
}

const avatarColors = ["bg-brand-pink", "bg-brand-green", "bg-brand-terracotta", "bg-brand-lavender", "bg-brand-yellow"];

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    const res = await fetch(`/api/admin/customers?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      setCustomers(data.customers || []);
    }
    setLoading(false);
  }, [search]);

  useEffect(() => {
    const t = setTimeout(fetchCustomers, 300);
    return () => clearTimeout(t);
  }, [fetchCustomers]);

  const totalOrders = customers.reduce((s, c) => s + (c.order_count || 0), 0);
  const totalSpent = customers.reduce((s, c) => s + (c.total_spent || 0), 0);

  const filtered = customers.filter(
    (c) =>
      (c.full_name || "").toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-brown">Customers</h1>
          <p className="text-gray-500 text-sm">
            {loading ? "Loading..." : `${customers.length} registered customers`}
          </p>
        </div>
        <button
          onClick={fetchCustomers}
          className="btn-ghost border border-gray-200 text-sm flex items-center gap-2 self-start"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="search"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          id="customer-search"
          className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-pink bg-white"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Customers", value: customers.length, icon: "👥" },
          { label: "Total Orders", value: totalOrders, icon: "📦" },
          { label: "Total Revenue", value: formatPrice(totalSpent), icon: "💰" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <p className="text-xl font-display font-bold text-gray-900">{stat.value}</p>
            <p className="text-gray-500 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                {["Customer", "Email", "Orders", "Total Spent", "Joined"].map((h) => (
                  <th key={h} className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={5} className="px-5 py-4">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </td>
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-gray-400">
                    <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    No customers found
                  </td>
                </tr>
              ) : (
                filtered.map((customer, i) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                          {(customer.full_name || customer.email).charAt(0).toUpperCase()}
                        </div>
                        <p className="font-semibold text-gray-900">
                          {customer.full_name || "Anonymous"}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="flex items-center gap-1.5 text-gray-600 text-xs">
                        <Mail className="w-3 h-3" /> {customer.email}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-gray-700">
                        <ShoppingBag className="w-3.5 h-3.5 text-gray-400" />
                        <span className="font-semibold">{customer.order_count || 0}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-bold text-gray-900">
                      {formatPrice(customer.total_spent || 0)}
                    </td>
                    <td className="px-5 py-4 text-gray-500">
                      {new Date(customer.joined).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
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
