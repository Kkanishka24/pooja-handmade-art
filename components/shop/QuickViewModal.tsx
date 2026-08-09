"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, ShoppingCart, Palette, Feather } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, getDiscountPercent } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
}: QuickViewModalProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const discount = product.compare_price
    ? getDiscountPercent(product.price, product.compare_price)
    : 0;

  const handleAddToCart = () => {
    addItem(product);
    openCart();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view of ${product.name}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close quick view"
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 border border-brand-beige flex items-center justify-center text-brand-brown hover:bg-brand-cream transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square md:aspect-[4/3] bg-brand-cream">
            {product.images?.[0] && (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>

          {/* Product Information */}
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <p className="text-xs uppercase tracking-wider text-brand-brown-light font-medium mb-2">
              {product.category.name}
            </p>

            <h2 className="font-display font-bold text-brand-brown text-2xl md:text-3xl leading-tight mb-3">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div
                className="flex items-center gap-0.5"
                aria-label={`Rating: ${product.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(product.rating)
                        ? "fill-brand-yellow text-brand-yellow"
                        : "fill-brand-beige text-brand-beige"
                    )}
                  />
                ))}
              </div>

              <span className="text-sm text-brand-brown-light">
                ({product.review_count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-5">
              <span className="font-display font-bold text-brand-brown text-2xl">
                {formatPrice(product.price)}
              </span>

              {product.compare_price && (
                <>
                  <span className="text-brand-brown-light line-through">
                    {formatPrice(product.compare_price)}
                  </span>

                  {discount > 0 && (
                    <span className="text-xs font-bold text-brand-pink-dark bg-brand-pink-light px-2 py-1 rounded-full">
                      {discount}% OFF
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Product feature */}
            <div className="mb-6">
              {product.customizable ? (
                <span className="text-xs font-semibold text-brand-brown bg-brand-terracotta-light/60 border border-brand-terracotta/30 px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-brand-terracotta" />
                  Custom colors available
                </span>
              ) : (
                <span className="text-xs font-medium text-brand-brown-light bg-brand-cream-dark border border-brand-beige px-3 py-1.5 rounded-full inline-flex items-center gap-1.5">
                  <Feather className="w-3.5 h-3.5 text-brand-green-dark" />
                  100% Handcrafted felt
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1 justify-center py-3 flex items-center gap-2 shadow-pink"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>

              <Link
                href={`/shop/${product.slug}`}
                onClick={onClose}
                className="btn-secondary flex-1 justify-center py-3 text-center"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}