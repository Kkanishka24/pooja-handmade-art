"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Star, ShoppingCart, ArrowRight, Badge } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice, getDiscountPercent } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const { toggleItem, isWishlisted } = useWishlistStore();

  const wishlisted = isWishlisted(product.id);
  const discount = product.compare_price
    ? getDiscountPercent(product.price, product.compare_price)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    openCart();
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleItem(product);
  };

  return (
    <Link href={`/shop/${product.slug}`} id={`product-${product.id}`} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink rounded-3xl h-full">
      <div className={cn("product-card h-full flex flex-col justify-between", className)}>
        {/* Image */}
        <div className="relative overflow-hidden bg-brand-cream h-56 md:h-64 shrink-0">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.is_new && (
              <span className="badge-green text-xs font-semibold">New ✨</span>
            )}
            {product.is_bestseller && (
              <span className="badge-pink text-xs font-semibold">⭐ Bestseller</span>
            )}
            {discount > 0 && (
              <span className="badge-sale text-xs font-semibold">-{discount}%</span>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              onClick={handleWishlist}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className={cn(
                "wishlist-btn",
                wishlisted && "bg-brand-pink-light"
              )}
            >
              <Heart
                className={cn(
                  "w-4 h-4 transition-colors",
                  wishlisted
                    ? "fill-brand-pink text-brand-pink"
                    : "text-brand-muted"
                )}
              />
            </button>
          </div>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              className="w-full btn-primary text-sm py-2.5 shadow-pink"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div className="space-y-1">
            <p className="text-brand-muted text-xs">{product.category.name}</p>
            <h3 className="font-display font-semibold text-brand-brown text-sm md:text-base leading-tight line-clamp-2 min-h-[2.5rem]">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 py-1">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-3 h-3",
                      i < Math.floor(product.rating)
                        ? "fill-brand-yellow text-brand-yellow"
                        : "text-brand-beige fill-brand-beige"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-brand-muted">
                ({product.review_count})
              </span>
            </div>
          </div>

          <div className="pt-2 mt-auto">
            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-brand-brown text-base">
                {formatPrice(product.price)}
              </span>
              {product.compare_price && (
                <span className="text-brand-muted text-sm line-through">
                  {formatPrice(product.compare_price)}
                </span>
              )}
            </div>

            {/* Feature badge slot (fixed equal height) */}
            <div className="mt-2.5 pt-1 min-h-[28px] flex items-center">
              {product.customizable ? (
                <span className="text-[11px] font-semibold text-brand-brown bg-brand-terracotta-light/80 border border-brand-terracotta/40 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  ✏️ Custom orders available
                </span>
              ) : (
                <span className="text-[11px] font-medium text-brand-muted/70 bg-brand-cream-dark/80 border border-brand-beige/60 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  🌿 100% Handcrafted felt
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
