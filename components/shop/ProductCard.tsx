"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Star, ShoppingCart, Sparkles, Feather, Palette, Tag } from "lucide-react";
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
    <Link href={`/shop/${product.slug}`} id={`product-${product.id}`} className="group block focus:outline-none rounded-3xl h-full">
      <div className={cn("product-card h-full flex flex-col justify-between transition-all duration-300", className)}>
        {/* Image */}
        <div className="relative overflow-hidden bg-brand-cream h-56 md:h-64 shrink-0 rounded-t-3xl">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.is_new && (
              <span className="badge-green text-xs font-semibold shadow-soft">
                <Sparkles className="w-3 h-3 text-brand-green-dark inline" /> New Arrival
              </span>
            )}
            {product.is_bestseller && (
              <span className="badge-pink text-xs font-semibold shadow-soft">
                <Star className="w-3 h-3 text-brand-brown fill-brand-yellow inline" /> Bestseller
              </span>
            )}
            {discount > 0 && (
              <span className="badge-sale text-xs font-bold shadow-soft">
                <Tag className="w-3 h-3 inline" /> -{discount}%
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            <button
              onClick={handleWishlist}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className={cn(
                "wishlist-btn transition-transform active:scale-95",
                wishlisted && "bg-brand-pink-light border-brand-pink"
              )}
            >
              <Heart
                className={cn(
                  "w-4 h-4 transition-colors",
                  wishlisted
                    ? "fill-brand-pink text-brand-pink"
                    : "text-brand-brown-light hover:text-brand-brown"
                )}
              />
            </button>
          </div>

          {/* Quick Add to Cart (Desktop Hover) */}
          <div className="hidden sm:block absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent">
            <button
              onClick={handleAddToCart}
              className="w-full btn-primary text-sm py-2.5 shadow-pink flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-1 sm:space-y-1.5">
            <p className="text-brand-brown-light text-[10px] sm:text-xs font-semibold uppercase tracking-wider">{product.category.name}</p>
            <h3 className="font-display font-semibold text-brand-brown text-xs sm:text-sm md:text-base leading-snug line-clamp-2 min-h-[2.2rem] sm:min-h-[2.5rem] group-hover:text-brand-pink-dark transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 py-0.5">
              <div className="flex items-center gap-0.5" aria-label={`Rating: ${product.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-3 h-3 sm:w-3.5 sm:h-3.5",
                      i < Math.floor(product.rating)
                        ? "fill-brand-yellow text-brand-yellow"
                        : "text-brand-beige fill-brand-beige"
                    )}
                  />
                ))}
              </div>
              <span className="text-[10px] sm:text-xs text-brand-brown-light font-medium ml-1">
                ({product.review_count})
              </span>
            </div>
          </div>

          <div className="pt-2 sm:pt-3 mt-auto">
            {/* Price & Mobile Cart Button */}
            <div className="flex items-center justify-between gap-1">
              <div className="flex items-baseline gap-1.5 flex-wrap">
                <span className="font-display font-bold text-brand-brown text-base sm:text-lg">
                  {formatPrice(product.price)}
                </span>
                {product.compare_price && (
                  <span className="text-brand-brown-light/70 text-[10px] sm:text-xs line-through">
                    {formatPrice(product.compare_price)}
                  </span>
                )}
              </div>

              {/* Mobile Quick Add Button */}
              <button
                onClick={handleAddToCart}
                aria-label="Add to Cart"
                className="sm:hidden p-2 rounded-xl bg-brand-pink text-white shadow-soft active:scale-95 transition-transform"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>

            {/* Feature badge slot */}
            <div className="mt-2 pt-1 min-h-[24px] sm:min-h-[28px] flex items-center">
              {product.customizable ? (
                <span className="text-[10px] sm:text-[11px] font-semibold text-brand-brown bg-brand-terracotta-light/60 border border-brand-terracotta/30 px-2 sm:px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Palette className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-terracotta shrink-0" /> Custom colors
                </span>
              ) : (
                <span className="text-[10px] sm:text-[11px] font-medium text-brand-brown-light/80 bg-brand-cream-dark/80 border border-brand-beige/60 px-2 sm:px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Feather className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-brand-green-dark shrink-0" /> 100% Handcrafted
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

