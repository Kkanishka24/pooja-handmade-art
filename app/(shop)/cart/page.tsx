"use client";

import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
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
} from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getShipping, getTotal } =
    useCartStore();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const total = getTotal();

  return (
    <div className="bg-brand-cream min-h-screen">
      <div className="bg-white border-b border-brand-beige">
        <div className="container-brand py-8">
          <h1 className="section-title">Shopping Cart</h1>
          <p className="section-subtitle text-sm mt-1">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>
      </div>

      <div className="container-brand py-10">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-full bg-brand-cream-dark flex items-center justify-center mx-auto mb-6 text-4xl">
              🛍️
            </div>
            <h2 className="font-display text-2xl font-bold text-brand-brown mb-3">
              Your cart is empty
            </h2>
            <p className="text-brand-muted mb-8">
              Looks like you haven&apos;t added any handmade treasures yet!
            </p>
            <Link href="/shop" className="btn-primary">
              <ShoppingBag className="w-5 h-5" />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Back link */}
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-brown text-sm transition-colors mb-4"
              >
                <ArrowLeft className="w-4 h-4" /> Continue Shopping
              </Link>

              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-3xl p-5 shadow-soft flex gap-5"
                >
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-brand-muted text-xs mb-0.5">
                      {item.product.category.name}
                    </p>
                    <h3 className="font-display font-semibold text-brand-brown mb-1 line-clamp-1">
                      {item.product.name}
                    </h3>
                    {item.selectedColor && (
                      <p className="text-brand-muted text-xs mb-2">
                        Color: {item.selectedColor}
                      </p>
                    )}

                    <div className="flex items-center justify-between flex-wrap gap-3">
                      {/* Qty */}
                      <div className="flex items-center gap-2 bg-brand-cream rounded-2xl border border-brand-beige px-2 py-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-xl hover:bg-white flex items-center justify-center transition-colors text-lg"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-semibold text-brand-brown text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-xl hover:bg-white flex items-center justify-center transition-colors"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="font-display font-bold text-brand-brown text-base">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
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

              {/* Coupon */}
              <div className="bg-white rounded-3xl p-5 shadow-soft">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-brand-pink" />
                  <p className="font-semibold text-brand-brown text-sm">
                    Apply Coupon
                  </p>
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="input-brand text-sm py-2.5 flex-1"
                  />
                  <button
                    onClick={() => couponCode && setCouponApplied(true)}
                    className="btn-secondary text-sm py-2.5 px-5"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-brand-green-dark text-xs mt-2 font-medium">
                    ✓ Coupon applied successfully!
                  </p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 shadow-soft sticky top-28">
                <h2 className="font-display font-semibold text-brand-brown text-xl mb-5">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm mb-5">
                  <div className="flex justify-between text-brand-muted">
                    <span>Subtotal ({items.reduce((t, i) => t + i.quantity, 0)} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-brand-muted">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-brand-green-dark font-medium" : ""}>
                      {shipping === 0 ? "Free 🎉" : formatPrice(shipping)}
                    </span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between text-brand-green-dark font-medium">
                      <span>Discount (HANDMADE10)</span>
                      <span>-{formatPrice(Math.round(subtotal * 0.1))}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-display font-bold text-brand-brown text-lg pt-3 border-t border-brand-beige">
                    <span>Total</span>
                    <span>
                      {formatPrice(
                        total - (couponApplied ? Math.round(subtotal * 0.1) : 0)
                      )}
                    </span>
                  </div>
                </div>

                {/* Free shipping notice */}
                {subtotal < 999 && (
                  <div className="mb-4 p-3 bg-brand-green-light/50 rounded-2xl">
                    <div className="flex items-center gap-2 text-sm text-brand-brown mb-2">
                      <Truck className="w-4 h-4 text-brand-green-dark" />
                      <span>
                        Add{" "}
                        <strong>{formatPrice(999 - subtotal)}</strong> for free shipping
                      </span>
                    </div>
                    <div className="h-1.5 bg-white rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-green rounded-full"
                        style={{ width: `${(subtotal / 999) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                <Link
                  href="/checkout"
                  className="btn-primary w-full justify-center text-base py-4 shadow-pink mb-3"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <p className="text-center text-brand-muted text-xs">
                  🔒 Secure checkout powered by Razorpay
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
