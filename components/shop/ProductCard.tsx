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
    <Link href={`/shop/${product.slug}`} id={`product-${product.id}`}>
      <div className={cn("product-card", className)}>
        {/* Image */}
        <div className="relative overflow-hidden bg-brand-cream h-56 md:h-64">
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
        <div className="p-4">
          <p className="text-brand-muted text-xs mb-1">{product.category.name}</p>
          <h3 className="font-display font-semibold text-brand-brown text-sm md:text-base leading-tight mb-2 line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
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

          {/* Customizable badge */}
          {product.customizable && (
            <div className="mt-2">
              <span className="text-[10px] font-medium text-brand-terracotta bg-brand-terracotta-light px-2 py-0.5 rounded-full">
                ✏️ Custom orders available
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
