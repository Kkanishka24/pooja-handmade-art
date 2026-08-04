"use client";
import { useState } from "react";
import QuickViewModal from "./QuickViewModal";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, ShoppingCart } from "lucide-react";

import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCompareStore } from "@/store/compareStore";

import { formatPrice, getDiscountPercent } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({
  product,
  className,
}: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const { toggleItem, isWishlisted } = useWishlistStore();

  const addCompare = useCompareStore((s) => s.add);
  const removeCompare = useCompareStore((s) => s.remove);
  const compareExists = useCompareStore((s) => s.exists);

  const selectedForCompare = compareExists(product.id);

  const wishlisted = isWishlisted(product.id);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

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

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();

    if (selectedForCompare) {
      removeCompare(product.id);
    } else {
      addCompare(product);
    }
  };

return (
  <>
    <Link href={`/shop/${product.slug}`} id={`product-${product.id}`}>
      <div
        className={cn(
          "product-card group overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-card-hover",
          className
        )}
      >
        <div className="relative overflow-hidden bg-brand-cream h-56 md:h-64">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
            <button
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  }}
  className="bg-white/90 backdrop-blur-md text-brand-brown text-xs font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-white transition"
>
  Quick View
</button>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.review_count > 100 && (
              <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                 Trending
              </span>
            )}

            {product.is_new && (
              <span className="badge-green text-xs font-semibold">
                New 
              </span>
            )}

            {product.is_bestseller && (
              <span className="badge-pink text-xs font-semibold">
                 Bestseller
              </span>
            )}

            {discount > 0 && (
              <span className="badge-sale text-xs font-semibold">
                -{discount}%
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              onClick={handleWishlist}
              aria-label="Wishlist"
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

            <button
              onClick={handleCompare}
              aria-label="Compare"
              className={cn(
                "w-9 h-9 rounded-full bg-white shadow-soft flex items-center justify-center transition-all",
                selectedForCompare
                  ? "bg-brand-green text-white"
                  : "hover:bg-brand-green-light"
              )}
            >
              ⚖️
            </button>
          </div>

          {/* Quick Add */}
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
          <p className="text-brand-muted text-xs mb-1">
            {product.category.name}
          </p>

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
              {product.rating.toFixed(1)} • {product.review_count} Reviews
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

          {/* Delivery */}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="bg-brand-green-light text-brand-green-dark text-[11px] px-2 py-1 rounded-full font-medium">
               Free Delivery
            </span>

            {product.stock <= 5 && (
              <span className="bg-red-100 text-red-600 text-[11px] px-2 py-1 rounded-full font-medium">
                Only {product.stock} left
              </span>
            )}
          </div>

          {/* Customizable */}
          {product.customizable && (
            <div className="mt-2">
              <span className="text-[10px] font-medium text-brand-terracotta bg-brand-terracotta-light px-2 py-0.5 rounded-full">
                 Custom orders available
              </span>
            </div>
          )}
        </div>
      </div>
      </Link>

    <QuickViewModal
      open={quickViewOpen}
      product={product}
      onClose={() => setQuickViewOpen(false)}
    />
  </>
);
}
