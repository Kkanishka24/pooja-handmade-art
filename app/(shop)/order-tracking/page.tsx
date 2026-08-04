"use client";

import { useState } from "react";
import {
  Package,
  CheckCircle,
  Truck,
  MapPin,
  Clock,
  Search,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mockOrder = {
  order_number: "PHA12345678",
  status: "shipped",
  product_name: "Felt Rainbow Mobile",
  placed_on: "28 Jul 2026",
  estimated_delivery: "3 Aug 2026",
  tracking_number: "DTDC123456789IN",
  carrier: "DTDC Express",
  steps: [
    {
      id: "confirmed",
      label: "Order Confirmed",
      description: "Your order has been placed & confirmed",
      date: "28 Jul, 10:30 AM",
      done: true,
    },
    {
      id: "processing",
      label: "Being Handcrafted",
      description: "Pooja is stitching your item with love",
      date: "29 Jul, 2:00 PM",
      done: true,
    },
    {
      id: "shipped",
      label: "Shipped",
      description: "Your package is on its way!",
      date: "31 Jul, 9:00 AM",
      done: true,
    },
    {
      id: "out_for_delivery",
      label: "Out for Delivery",
      description: "Almost there — your package is nearby",
      date: "Expected 3 Aug",
      done: false,
    },
    {
      id: "delivered",
      label: "Delivered",
      description: "Package delivered to your doorstep",
      date: "Expected 3 Aug",
      done: false,
    },
  ],
};

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSearched(true);
  };

  const currentStepIndex = mockOrder.steps.findIndex((s) => !s.done);
  const progressPercent =
    currentStepIndex === -1
      ? 100
      : Math.round((currentStepIndex / (mockOrder.steps.length - 1)) * 100);

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header */}
      <div className="bg-gradient-hero py-16 text-center relative overflow-hidden">
        <div className="absolute top-0 -left-16 w-64 h-64 rounded-full bg-brand-pink-light/40 blur-3xl" />
        <div className="container-brand relative z-10">
          <span className="badge-pink text-xs font-semibold uppercase tracking-wider mb-4 inline-flex items-center gap-1.5 px-3 py-1 shadow-soft">
            <Package className="w-3.5 h-3.5 text-brand-pink-dark" />
            Track Your Order
          </span>
          <h1 className="section-title text-4xl mb-4">Where&apos;s My Order?</h1>
          <p className="section-subtitle max-w-md mx-auto">
            Enter your order number to see real-time updates on your handmade
            package
          </p>
        </div>
      </div>

      <div className="container-brand py-12">
        {/* Search Form */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="bg-white rounded-3xl p-6 shadow-soft">
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                  Order Number
                </label>
                <input
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g. PHA12345678"
                  id="order-number-input"
                  className="input-brand"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email used for order"
                  id="order-email-input"
                  className="input-brand"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                id="track-order-btn"
                className="btn-primary w-full justify-center py-3.5"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-brand-brown/30 border-t-brand-brown rounded-full animate-spin" />
                ) : (
                  <>
                    <Search className="w-4 h-4" /> Track Order
                  </>
                )}
              </button>
            </form>
            <p className="text-center text-xs text-brand-muted mt-3">
              💡 Try order number{" "}
              <button
                onClick={() => setOrderNumber("PHA12345678")}
                className="text-brand-pink font-semibold hover:underline"
              >
                PHA12345678
              </button>{" "}
              to see the demo
            </p>
          </div>
        </div>

        {/* Result */}
        {searched && (
          <div className="max-w-2xl mx-auto animate-slide-up">
            {/* Order info */}
            <div className="bg-white rounded-3xl p-6 shadow-soft mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs text-brand-muted font-semibold uppercase tracking-wider">
                    Order Number
                  </p>
                  <p className="font-display font-bold text-brand-brown text-xl">
                    #{mockOrder.order_number}
                  </p>
                </div>
                <span className="badge-green self-start">
                  <Truck className="w-3 h-3 mr-1" />
                  {mockOrder.status === "shipped" ? "Shipped" : mockOrder.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                {[
                  {
                    icon: Package,
                    label: "Item",
                    value: mockOrder.product_name,
                  },
                  {
                    icon: Clock,
                    label: "Placed On",
                    value: mockOrder.placed_on,
                  },
                  {
                    icon: MapPin,
                    label: "Est. Delivery",
                    value: mockOrder.estimated_delivery,
                  },
                  {
                    icon: Truck,
                    label: "Carrier",
                    value: mockOrder.carrier,
                  },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label}>
                    <p className="text-brand-muted text-xs font-semibold uppercase tracking-wide flex items-center gap-1 mb-1">
                      <Icon className="w-3 h-3" /> {label}
                    </p>
                    <p className="text-brand-brown font-medium text-sm">{value}</p>
                  </div>
                ))}
              </div>

              {mockOrder.tracking_number && (
                <div className="mt-4 p-3 bg-brand-cream rounded-2xl flex items-center justify-between">
                  <p className="text-brand-muted text-xs">
                    Tracking:{" "}
                    <span className="text-brand-brown font-semibold">
                      {mockOrder.tracking_number}
                    </span>
                  </p>
                  <a
                    href={`https://www.dtdc.in/tracking.asp?TrkType=consignee&strCnno=${mockOrder.tracking_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-pink text-xs font-semibold hover:underline flex items-center gap-1"
                  >
                    Track on DTDC <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Progress Timeline */}
            <div className="bg-white rounded-3xl p-6 shadow-soft">
              <h2 className="font-display font-semibold text-brand-brown text-xl mb-6">
                Delivery Progress
              </h2>

              {/* Progress bar */}
              <div className="h-2 bg-brand-beige rounded-full mb-8 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-pink to-brand-green rounded-full transition-all duration-1000"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Steps */}
              <div className="space-y-1">
                {mockOrder.steps.map((step, index) => {
                  const isActive = index === currentStepIndex;
                  const isDone = step.done;

                  return (
                    <div key={step.id} className="relative flex gap-4">
                      {/* Vertical line */}
                      {index < mockOrder.steps.length - 1 && (
                        <div
                          className={cn(
                            "absolute left-[18px] top-10 w-0.5 h-12",
                            isDone ? "bg-brand-green" : "bg-brand-beige"
                          )}
                        />
                      )}

                      {/* Icon */}
                      <div
                        className={cn(
                          "w-9 h-9 rounded-full shrink-0 flex items-center justify-center border-2 z-10",
                          isDone
                            ? "bg-brand-green border-brand-green"
                            : isActive
                            ? "bg-brand-pink border-brand-pink animate-pulse-soft"
                            : "bg-white border-brand-beige"
                        )}
                      >
                        {isDone ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : isActive ? (
                          <div className="w-2.5 h-2.5 rounded-full bg-white" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-brand-beige" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="pb-8">
                        <p
                          className={cn(
                            "font-semibold text-sm",
                            isDone || isActive
                              ? "text-brand-brown"
                              : "text-brand-muted"
                          )}
                        >
                          {step.label}
                        </p>
                        <p className="text-brand-muted text-xs">{step.description}</p>
                        <p
                          className={cn(
                            "text-xs mt-0.5 font-medium",
                            isDone
                              ? "text-brand-green-dark"
                              : "text-brand-muted"
                          )}
                        >
                          {step.date}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Help */}
            <div className="mt-6 p-5 bg-brand-pink-light rounded-3xl text-center">
              <p className="text-brand-brown text-sm font-medium">
                Have questions about your order?
              </p>
              <a
                href="https://wa.me/919876543210"
                className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-brand-brown hover:text-brand-pink-dark transition-colors"
              >
                <span>📱</span> WhatsApp us at +91 98765 43210
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
