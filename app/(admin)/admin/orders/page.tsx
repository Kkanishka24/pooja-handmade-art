"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import { Search, Eye, Download, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const mockOrders = [
  { id: "ORD001", order_number: "PHA45678901", customer: "Priya Sharma", email: "priya@gmail.com", product: "Felt Rainbow Mobile", amount: 899, status: "delivered", date: "2 Aug 2026", payment: "Razorpay" },
  { id: "ORD002", order_number: "PHA45678902", customer: "Ananya Patel", email: "ananya@gmail.com", product: "Diwali Diya Set", amount: 749, status: "shipped", date: "1 Aug 2026", payment: "Razorpay" },
  { id: "ORD003", order_number: "PHA45678903", customer: "Sneha Kulkarni", email: "sneha@gmail.com", product: "Gift Hamper Box", amount: 1499, status: "processing", date: "1 Aug 2026", payment: "COD" },
  { id: "ORD004", order_number: "PHA45678904", customer: "Meera Reddy", email: "meera@gmail.com", product: "Felt Star Keychain × 3", amount: 747, status: "confirmed", date: "31 Jul 2026", payment: "Razorpay" },
  { id: "ORD005", order_number: "PHA45678905", customer: "Kavya Menon", email: "kavya@gmail.com", product: "Spring Bloom Wreath", amount: 1299, status: "delivered", date: "30 Jul 2026", payment: "Razorpay" },
  { id: "ORD006", order_number: "PHA45678906", customer: "Ritu Gupta", email: "ritu@gmail.com", product: "Felt Cactus Plushie", amount: 499, status: "cancelled", date: "29 Jul 2026", payment: "Razorpay" },
  { id: "ORD007", order_number: "PHA45678907", customer: "Divya Nair", email: "divya@gmail.com", product: "Name Banner — DIVYA", amount: 799, status: "delivered", date: "28 Jul 2026", payment: "COD" },
  { id: "ORD008", order_number: "PHA45678908", customer: "Pooja Singh", email: "pooja@gmail.com", product: "Felt Elephant Plushie", amount: 599, status: "shipped", date: "27 Jul 2026", payment: "Razorpay" },
];

const statusColors: Record<string, string> = {
  delivered:  "bg-green-100 text-green-700",
  shipped:    "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  confirmed:  "bg-purple-100 text-purple-700",
  cancelled:  "bg-red-100 text-red-700",
  pending:    "bg-gray-100 text-gray-600",
};

const allStatuses = ["all", "confirmed", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = mockOrders.filter((o) => {
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.order_number.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const totalRevenue = mockOrders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-brand-brown">
            Orders
          </h1>
          <p className="text-gray-500 text-sm">
            {mockOrders.length} orders · {formatPrice(totalRevenue)} revenue
          </p>
        </div>
        <button className="btn-secondary text-sm self-start flex items-center gap-2">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="search"
            placeholder="Search orders..."
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
                {["Order #", "Customer", "Product", "Amount", "Payment", "Date", "Status", ""].map((h) => (
                  <th key={h} className="px-5 py-3 text-gray-500 font-semibold text-xs uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 font-semibold text-gray-900 whitespace-nowrap">
                    #{order.order_number.slice(-8)}
                  </td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-gray-900">{order.customer}</p>
                    <p className="text-gray-400 text-xs">{order.email}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-600 max-w-[150px]">
                    <p className="line-clamp-1">{order.product}</p>
                  </td>
                  <td className="px-5 py-4 font-semibold text-gray-900 whitespace-nowrap">
                    {formatPrice(order.amount)}
                  </td>
                  <td className="px-5 py-4">
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-xs font-semibold",
                      order.payment === "COD" ? "bg-amber-100 text-amber-700" : "bg-blue-50 text-blue-700"
                    )}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-500 whitespace-nowrap">{order.date}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors" aria-label="View order">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-gray-400">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
