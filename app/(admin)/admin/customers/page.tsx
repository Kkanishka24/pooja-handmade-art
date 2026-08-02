"use client";

import { useState } from "react";
import { Search, Mail, Phone, ShoppingBag, Eye } from "lucide-react";

const customers = [
  { id: "1", name: "Priya Sharma",    email: "priya@gmail.com",   phone: "+91 98765 43210", orders: 4, spent: 3588, joined: "Jan 2024", avatar: "PS" },
  { id: "2", name: "Ananya Patel",    email: "ananya@gmail.com",  phone: "+91 91234 56789", orders: 6, spent: 5240, joined: "Feb 2024", avatar: "AP" },
  { id: "3", name: "Sneha Kulkarni",  email: "sneha@gmail.com",   phone: "+91 87654 32109", orders: 2, spent: 2398, joined: "Mar 2024", avatar: "SK" },
  { id: "4", name: "Meera Reddy",     email: "meera@gmail.com",   phone: "+91 76543 21098", orders: 8, spent: 4890, joined: "Jan 2024", avatar: "MR" },
  { id: "5", name: "Kavya Menon",     email: "kavya@gmail.com",   phone: "+91 65432 10987", orders: 3, spent: 3197, joined: "Apr 2024", avatar: "KM" },
  { id: "6", name: "Ritu Gupta",      email: "ritu@gmail.com",    phone: "+91 54321 09876", orders: 1, spent: 499,  joined: "May 2024", avatar: "RG" },
  { id: "7", name: "Divya Nair",      email: "divya@gmail.com",   phone: "+91 43210 98765", orders: 5, spent: 3995, joined: "Feb 2024", avatar: "DN" },
  { id: "8", name: "Pooja Singh",     email: "pooja@gmail.com",   phone: "+91 32109 87654", orders: 7, spent: 6200, joined: "Dec 2023", avatar: "PS" },
];

const avatarColors = ["bg-brand-pink", "bg-brand-green", "bg-brand-terracotta", "bg-brand-lavender", "bg-brand-yellow"];

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-brown">Customers</h1>
          <p className="text-gray-500 text-sm">{customers.length} registered customers</p>
        </div>
      </div>

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
          { label: "Avg. Orders / Customer", value: (customers.reduce((s, c) => s + c.orders, 0) / customers.length).toFixed(1), icon: "📦" },
          { label: "Avg. Lifetime Value", value: `₹${Math.round(customers.reduce((s, c) => s + c.spent, 0) / customers.length).toLocaleString()}`, icon: "💰" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <p className="text-xl font-display font-bold text-gray-900">{stat.value}</p>
            <p className="text-gray-500 text-xs">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left">
                {["Customer", "Contact", "Orders", "Total Spent", "Joined", ""].map((h) => (
                  <th key={h} className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((customer, i) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                        {customer.avatar}
                      </div>
                      <p className="font-semibold text-gray-900">{customer.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="space-y-0.5">
                      <p className="flex items-center gap-1.5 text-gray-600 text-xs">
                        <Mail className="w-3 h-3" /> {customer.email}
                      </p>
                      <p className="flex items-center gap-1.5 text-gray-500 text-xs">
                        <Phone className="w-3 h-3" /> {customer.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-gray-700">
                      <ShoppingBag className="w-3.5 h-3.5 text-gray-400" />
                      <span className="font-semibold">{customer.orders}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-bold text-gray-900">₹{customer.spent.toLocaleString()}</td>
                  <td className="px-5 py-4 text-gray-500">{customer.joined}</td>
                  <td className="px-5 py-4">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors" aria-label="View customer">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
