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

interface OrderStep {
  id: string;
  label: string;
  description: string;
  done: boolean;
  date: string;
}

interface OrderData {
  order_number: string;
  status: string;
  placed_on: string;
  total: number;
  shipping_address?: { full_name: string; city: string; state: string };
  steps: OrderStep[];
}

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;
    setLoading(true);
    setNotFound(false);
    setOrderData(null);

    const params = new URLSearchParams({ order_number: orderNumber.trim() });
    if (email.trim()) params.set("email", email.trim());

    const res = await fetch(`/api/orders?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      setOrderData(data);
      setSearched(true);
    } else {
      setNotFound(true);
      setSearched(true);
    }

    setLoading(false);
  };

  const currentStepIndex = orderData
    ? orderData.steps.findIndex((s: OrderStep) => !s.done)
    : -1;
  const progressPercent = orderData
    ? currentStepIndex === -1
      ? 100
      : Math.round((currentStepIndex / (orderData.steps.length - 1)) * 100)
    : 0;

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
            Enter your Order ID or registered phone number to view the current
            status of your shipment.
          </p>
          <p className="mt-3 text-xs text-brand-brown/70 max-w-sm mx-auto leading-relaxed">
            📌 Please note: Your Order ID and registered phone number are
            shared with you via WhatsApp at the time of order confirmation.
            Kindly refer to that message to track your order.
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
                  Phone Number <span className="text-brand-muted font-normal normal-case">(as shared via WhatsApp)</span>
                </label>
                <input
                  type="tel"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Phone number registered with your order"
                  id="order-phone-input"
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
          </div>
        </div>

        {/* Not Found */}
        {searched && notFound && (
          <div className="max-w-xl mx-auto text-center">
            <div className="bg-white rounded-3xl p-8 shadow-soft">
              <div className="text-4xl mb-4">🔍</div>
              <h2 className="font-display font-bold text-xl text-brand-brown mb-2">Order Not Found</h2>
              <p className="text-brand-muted text-sm">
                We couldn&apos;t find an order with that number. Please double-check and try again.
              </p>
              <p className="text-brand-muted text-xs mt-3">
                Need help?{" "}
                <a href="/contact" className="text-brand-pink hover:underline">Contact us</a>
              </p>
            </div>
          </div>
        )}

        {/* Result */}
        {searched && orderData && (
          <div className="max-w-2xl mx-auto animate-slide-up">
            {/* Order info */}
            <div className="bg-white rounded-3xl p-6 shadow-soft mb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs text-brand-muted font-semibold uppercase tracking-wider">
                    Order Number
                  </p>
                  <p className="font-display font-bold text-brand-brown text-xl">
                    #{orderData.order_number}
                  </p>
                </div>
                <span className="badge-green self-start">
                  <Truck className="w-3 h-3 mr-1" />
                  {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1).replace(/_/g, " ")}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                {[
                  {
                    icon: Clock,
                    label: "Placed On",
                    value: orderData.placed_on,
                  },
                  {
                    icon: MapPin,
                    label: "Delivering To",
                    value: orderData.shipping_address
                      ? `${orderData.shipping_address.city}, ${orderData.shipping_address.state}`
                      : "—",
                  },
                  {
                    icon: Package,
                    label: "Order Total",
                    value: `₹${orderData.total?.toLocaleString("en-IN")}`,
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
                {orderData.steps.map((step: OrderStep, index: number) => {
                  const isActive = index === currentStepIndex;
                  const isDone = step.done;

                  return (
                    <div key={step.id} className="relative flex gap-4">
                      {/* Vertical line */}
                      {index < orderData.steps.length - 1 && (
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
                href="/contact"
                className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-brand-brown hover:text-brand-pink-dark transition-colors"
              >
                <ArrowRight className="w-4 h-4" /> Contact Us
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
