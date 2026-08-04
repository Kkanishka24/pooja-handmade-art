"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import {
  X,
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
  const [mounted, setMounted] = useState(false);

  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    getSubtotal,
    getShipping,
    getTotal,
  } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeCart]);

  if (!mounted) return null;

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const total = getTotal();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-brand-brown/40 backdrop-blur-sm z-40 animate-fade-in"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-brand-beige">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-pink-light flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-brand-pink-dark" />
            </div>
            <div>
              <h2
                id="cart-title"
                className="font-display font-semibold text-brand-brown text-lg"
              >
                Your Cart
              </h2>
              <p className="text-brand-muted text-xs">
                {items.length} {items.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-brand-cream-dark text-brand-muted transition-colors duration-200"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping banner */}
        {subtotal < 999 && (
          <div className="px-5 py-3 bg-brand-green-light/50 border-b border-brand-green-light">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="w-4 h-4 text-brand-green-dark shrink-0" />
              <span className="text-brand-brown">
                Add{" "}
                <strong className="text-brand-green-dark">
                  {formatPrice(999 - subtotal)}
                </strong>{" "}
                more for free shipping!
              </span>
            </div>
            <div className="mt-2 h-1.5 bg-white rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-green rounded-full transition-all duration-500"
                style={{ width: `${Math.min((subtotal / 999) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
        {subtotal >= 999 && (
          <div className="px-5 py-2 bg-brand-green-light/50 text-sm text-brand-green-dark font-medium text-center border-b border-brand-green-light">
            <Truck className="inline w-4 h-4 mr-1" /> You&apos;ve unlocked free shipping! 🎉
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-20 h-20 rounded-full bg-brand-cream-dark flex items-center justify-center mb-4 text-3xl">
                🛍️
              </div>
              <h3 className="font-display font-semibold text-brand-brown mb-2">
                Your cart is empty
              </h3>
              <p className="text-brand-muted text-sm mb-6">
                Start shopping to add handmade items to your cart
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="btn-primary text-sm"
              >
                Explore Products
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-3 bg-brand-cream rounded-2xl"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={item.product.images?.[0] || "/placeholder.png"}
                    alt={item.product.name}
                    fill
                    loading="lazy"
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-brand-muted text-xs mb-0.5">
                    {item.product.category?.name || "Uncategorized"}
                  </p>
                  <h4 className="font-medium text-brand-brown text-sm leading-tight line-clamp-2 mb-2">
                    {item.product.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    {/* Quantity */}
                    <div className="flex items-center gap-1 bg-white rounded-full p-0.5 shadow-soft border border-brand-beige">
                      <button
                        disabled={item.quantity === 1}
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center transition-colors",
                          item.quantity === 1
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:bg-brand-cream-dark"
                        )}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-brand-brown">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-6 h-6 rounded-full hover:bg-brand-cream-dark flex items-center justify-center transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-display font-bold text-brand-brown text-sm">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="p-1.5 rounded-full hover:bg-red-50 text-brand-muted hover:text-red-500 transition-colors self-start shrink-0"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-brand-beige p-5 space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-brand-muted">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-brand-muted">
                <span>Shipping</span>
                <span
                  className={
                    shipping === 0 ? "text-brand-green-dark font-medium" : ""
                  }
                >
                  {shipping === 0 ? "Free " : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between font-display font-bold text-brand-brown text-base pt-2 border-t border-brand-beige">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full justify-center text-base py-3.5"
            >
              Checkout <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="btn-ghost w-full justify-center text-sm border border-brand-beige"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}