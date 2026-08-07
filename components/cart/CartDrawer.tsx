"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import { X, ShoppingBag, Minus, Plus, Trash2, ArrowRight, Truck, Sparkles, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, getShipping, getTotal } =
    useCartStore();

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const total = getTotal();

  // Lock body scroll when cart drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart Drawer"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-brand-beige bg-brand-cream/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-pink-light flex items-center justify-center border border-brand-pink/30">
              <ShoppingBag className="w-5 h-5 text-brand-pink-dark" />
            </div>
            <div>
              <h2 className="font-display font-semibold text-brand-brown text-lg">
                Your Cart
              </h2>
              <p className="text-brand-brown-light text-xs font-medium">
                {items.length} {items.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-brand-cream-dark text-brand-brown-light hover:text-brand-brown transition-colors duration-200"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping banner */}
        {subtotal < 999 && (
          <div className="px-5 py-3 bg-brand-green-light/40 border-b border-brand-green-light/60">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="w-4.5 h-4.5 text-brand-green-dark shrink-0" />
              <span className="text-brand-brown text-xs md:text-sm">
                Add{" "}
                <strong className="text-brand-green-dark font-semibold">
                  {formatPrice(999 - subtotal)}
                </strong>{" "}
                more for free shipping!
              </span>
            </div>
            <div className="mt-2 h-2 bg-white rounded-full overflow-hidden border border-brand-green-light/50">
              <div
                className="h-full bg-brand-green rounded-full transition-all duration-500 shadow-soft"
                style={{ width: `${Math.min((subtotal / 999) * 100, 100)}%` }}
              />
            </div>
          </div>
        )}
        {subtotal >= 999 && (
          <div className="px-5 py-2.5 bg-brand-green-light/60 text-xs md:text-sm text-brand-brown font-semibold text-center border-b border-brand-green-light flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-brand-green-dark inline" /> You&apos;ve unlocked free shipping!
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-20 h-20 rounded-full bg-brand-pink-light/60 flex items-center justify-center mb-4 border border-brand-pink/30 shadow-soft">
                <ShoppingBag className="w-9 h-9 text-brand-pink-dark" />
              </div>
              <h3 className="font-display font-semibold text-brand-brown text-lg mb-1.5">
                Your cart is empty
              </h3>
              <p className="text-brand-brown-light text-xs max-w-xs mx-auto mb-6 leading-relaxed">
                Discover our handcrafted felt nursery mobiles, home decor, and personalized hampers.
              </p>
              <button onClick={closeCart}>
                <Link
                  href="/shop"
                  className="btn-primary text-sm shadow-pink"
                >
                  <Sparkles className="w-4 h-4 inline mr-1" /> Explore Products
                </Link>
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-3 bg-brand-cream/60 border border-brand-beige/60 rounded-2xl transition-all hover:bg-brand-cream"
              >
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-brand-beige">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-brand-brown-light text-[11px] font-medium uppercase tracking-wider mb-0.5">
                    {item.product.category.name}
                  </p>
                  <h4 className="font-medium text-brand-brown text-sm leading-tight line-clamp-2 mb-2">
                    {item.product.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    {/* Quantity */}
                    <div className="flex items-center gap-1 bg-white rounded-full p-0.5 shadow-soft border border-brand-beige">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        className="w-6 h-6 rounded-full hover:bg-brand-cream-dark flex items-center justify-center transition-colors text-brand-brown"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-brand-brown">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        className="w-6 h-6 rounded-full hover:bg-brand-cream-dark flex items-center justify-center transition-colors text-brand-brown"
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
                  className="p-1.5 rounded-full hover:bg-red-50 text-brand-brown-light/60 hover:text-red-600 transition-colors self-start shrink-0"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-brand-beige p-5 space-y-3 bg-brand-cream/20">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-brand-brown-light">
                <span>Subtotal</span>
                <span className="font-medium text-brand-brown">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-brand-brown-light">
                <span>Shipping</span>
                <span
                  className={
                    shipping === 0 ? "text-brand-green-dark font-semibold" : "font-medium text-brand-brown"
                  }
                >
                  {shipping === 0 ? "Free Shipping" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between font-display font-bold text-brand-brown text-base pt-2 border-t border-brand-beige">
                <span>Total</span>
                <span className="text-brand-brown text-lg">{formatPrice(total)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full justify-center text-base py-3.5 shadow-pink"
            >
              Checkout <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="btn-ghost w-full justify-center text-sm border border-brand-beige hover:border-brand-pink"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

