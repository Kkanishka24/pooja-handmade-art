"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Truck,
  Tag,
  MessageCircle,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getShipping, getTotal } =
    useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const total = getTotal();

  return (
    <div className="bg-brand-cream min-h-screen py-6 md:py-10">
      <div className="container-brand">
        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl p-8 shadow-card border border-brand-beige max-w-lg mx-auto">
            <div className="w-20 h-20 rounded-full bg-brand-pink-light/60 flex items-center justify-center mx-auto mb-5 border border-brand-pink/30 shadow-soft">
              <ShoppingBag className="w-9 h-9 text-brand-pink-dark" />
            </div>
            <h2 className="font-display text-2xl font-bold text-brand-brown mb-2">
              Your cart is empty
            </h2>
            <p className="text-brand-brown-light text-sm max-w-xs mx-auto mb-8 leading-relaxed">
              Looks like you haven&apos;t added any handcrafted treasures yet!
            </p>
            <Link href="/shop" className="btn-primary shadow-pink">
              <ShoppingBag className="w-5 h-5" />
              Start Shopping
            </Link>
          </div>
        ) : (
          /* Single Combined Master Card Container */
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-soft border border-brand-beige/60 w-full max-w-6xl mx-auto">
            {/* Top Bar Header inside the Card */}
            <div className="flex items-center justify-between pb-5 border-b border-brand-beige/60 mb-6">
              <div>
                <h1 className="font-display font-bold text-brand-brown text-xl sm:text-2xl flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-brand-pink-dark" />
                  Your Shopping Cart
                </h1>
                <p className="text-brand-muted text-xs mt-0.5">
                  {items.reduce((t, i) => t + i.quantity, 0)}{" "}
                  {items.reduce((t, i) => t + i.quantity, 0) === 1
                    ? "handcrafted item"
                    : "handcrafted items"}{" "}
                  selected
                </p>
              </div>
              <Link
                href="/shop"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-pink-dark hover:underline"
              >
                <ArrowLeft className="w-4 h-4" /> Continue Shopping
              </Link>
            </div>

            {/* Inner Grid Layout within the Single Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Items + Coupon */}
              <div className="lg:col-span-7 space-y-5">
                {/* Cart Items List */}
                <div className="divide-y divide-brand-beige/60">
                  {items.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.customName || ""}-${idx}`}
                      className="py-4 first:pt-0 last:pb-0 flex gap-4 sm:gap-5 items-center"
                    >
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border border-brand-beige/50 shadow-soft">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="(max-width: 640px) 80px, 96px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="badge-pink text-[10px] font-semibold uppercase tracking-wider py-0.5 px-2 inline-block mb-1">
                          {item.product.category.name}
                        </span>
                        <h3 className="font-display font-semibold text-brand-brown text-base sm:text-lg mb-0.5 line-clamp-1">
                          {item.product.name}
                        </h3>
                        {item.customName && (
                          <p className="text-brand-brown text-xs font-semibold bg-brand-pink-light/50 px-2.5 py-0.5 rounded-md inline-block my-0.5 border border-brand-pink/40">
                            ✨ Custom Name: &quot;{item.customName}&quot;
                          </p>
                        )}
                        {item.selectedColor && (
                          <p className="text-brand-muted text-xs mb-2">
                            Color:{" "}
                            <span className="font-medium text-brand-brown">
                              {item.selectedColor}
                            </span>
                          </p>
                        )}

                        <div className="flex items-center justify-between flex-wrap gap-3 mt-1.5">
                          {/* Qty Selector */}
                          <div className="flex items-center gap-2 bg-brand-cream rounded-2xl border border-brand-beige/80 px-2 py-1 shadow-inner-soft">
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity - 1, item.customName, item.selectedColor)
                              }
                              className="w-7 h-7 rounded-xl hover:bg-white flex items-center justify-center transition-colors text-brand-brown"
                              aria-label="Decrease"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center font-semibold text-brand-brown text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.product.id, item.quantity + 1, item.customName, item.selectedColor)
                              }
                              className="w-7 h-7 rounded-xl hover:bg-white flex items-center justify-center transition-colors text-brand-brown"
                              aria-label="Increase"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="font-display font-bold text-brand-brown text-lg">
                              {formatPrice(item.product.price * item.quantity)}
                            </span>
                            <button
                              onClick={() => removeItem(item.product.id, item.customName, item.selectedColor)}
                              className="p-2 rounded-full hover:bg-red-50 text-brand-muted hover:text-red-500 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Integrated Coupon Section */}
                <div className="pt-5 border-t border-brand-beige/60">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Tag className="w-4 h-4 text-brand-pink-dark" />
                    <p className="font-semibold text-brand-brown text-sm">
                      Have a Coupon Code?
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Enter code (e.g. HANDMADE10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="input-brand text-sm py-2.5 flex-1"
                    />
                    <button
                      onClick={() => couponCode && setCouponApplied(true)}
                      className="btn-secondary text-sm py-2.5 px-6 shrink-0"
                    >
                      Apply Code
                    </button>
                  </div>
                  {couponApplied && (
                    <p className="text-brand-green-dark text-xs mt-2 font-medium flex items-center gap-1">
                      ✓ Coupon applied successfully (10% OFF)!
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column: Order Summary Panel */}
              <div className="lg:col-span-5 bg-brand-cream/60 p-5 sm:p-6 rounded-3xl border border-brand-beige/70 space-y-4">
                <h2 className="font-display font-semibold text-brand-brown text-lg border-b border-brand-beige/60 pb-3">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-brand-muted">
                    <span>
                      Subtotal ({items.reduce((t, i) => t + i.quantity, 0)} items)
                    </span>
                    <span className="font-semibold text-brand-brown">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-brand-muted">
                    <span>Shipping</span>
                    <span
                      className={
                        shipping === 0 ? "text-brand-green-dark font-semibold" : ""
                      }
                    >
                      {shipping === 0 ? "Free Shipping" : formatPrice(shipping)}
                    </span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-brand-green-dark font-medium">
                      <span>Discount (HANDMADE10)</span>
                      <span>-{formatPrice(Math.round(subtotal * 0.1))}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-display font-bold text-brand-brown text-xl pt-3.5 border-t border-brand-beige/60">
                    <span>Total</span>
                    <span className="text-brand-pink-dark">
                      {formatPrice(
                        total - (couponApplied ? Math.round(subtotal * 0.1) : 0)
                      )}
                    </span>
                  </div>
                </div>

                {/* Free shipping notice */}
                {subtotal < 1499 && (
                  <div className="p-3 bg-white rounded-2xl border border-brand-green/30 shadow-soft">
                    <div className="flex items-center gap-2 text-xs text-brand-brown mb-2">
                      <Truck className="w-3.5 h-3.5 text-brand-green-dark shrink-0" />
                      <span>
                        Add{" "}
                        <strong className="text-brand-green-dark">
                          {formatPrice(1499 - subtotal)}
                        </strong>{" "}
                        more for free shipping!
                      </span>
                    </div>
                    <div className="w-full h-2 bg-brand-cream rounded-full overflow-hidden border border-brand-green/20">
                      <div
                        className="h-full bg-brand-green transition-all duration-300"
                        style={{
                          width: `${Math.min(100, (subtotal / 1499) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                )}

                <Link
                  href="/checkout"
                  className="btn-primary w-full py-4 text-center justify-center text-base bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-soft mt-2 gap-2"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  Proceed to Buy (WhatsApp Order) <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="pt-2 border-t border-brand-beige/60 space-y-1.5 text-xs text-brand-muted text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-brand-pink-dark" />
                    <span>Free shipping on orders above ₹1,499</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <span>🔒</span>
                    <span>100% Secure Checkout powered by Razorpay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
