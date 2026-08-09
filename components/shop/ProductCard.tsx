"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star, ShoppingCart, Sparkles, Feather, Palette, Tag } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice, getDiscountPercent } from "@/lib/utils";
import { cn } from "@/lib/utils";
import QuickViewModal from "@/components/shop/QuickViewModal";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const { toggleItem, isWishlisted } = useWishlistStore();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

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
  <>
    <Link
      href={`/shop/${product.slug}`}
      id={`product-${product.id}`}
      className="group block focus:outline-none rounded-3xl h-full"
    >
      <div
        className={cn(
          "product-card h-full flex flex-col justify-between transition-all duration-300",
          className
        )}
      >
        {/* Image */}
        <div className="relative overflow-hidden bg-brand-cream h-56 md:h-64 shrink-0 rounded-t-3xl">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />

          {/* Quick View */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setIsQuickViewOpen(true);
            }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 px-4 py-2 rounded-full bg-white/95 text-brand-brown text-xs font-semibold shadow-soft opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hover:bg-white focus-visible:ring-2 focus-visible:ring-brand-pink-dark focus-visible:ring-offset-2"
          >
            Quick View
          </button>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {product.is_new && (
              <span className="badge-green text-xs font-semibold shadow-soft">
                <Sparkles className="w-3 h-3 text-brand-green-dark inline" />{" "}
                New Arrival
              </span>
            )}

            {product.is_bestseller && (
              <span className="badge-pink text-xs font-semibold shadow-soft">
                <Star className="w-3 h-3 text-brand-brown fill-brand-yellow inline" />{" "}
                Bestseller
              </span>
            )}

            {discount > 0 && (
              <span className="badge-sale text-xs font-bold shadow-soft">
                <Tag className="w-3 h-3 inline" /> -{discount}%
              </span>
            )}
          </div>

          {/* Wishlist */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
            <button
              type="button"
              onClick={handleWishlist}
              aria-label={
                wishlisted ? "Remove from wishlist" : "Add to wishlist"
              }
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

          {/* Quick Add to Cart */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full btn-primary text-sm py-2.5 shadow-pink flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 md:p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-1.5">
            <p className="text-brand-brown-light text-[10px] font-semibold uppercase tracking-widest">
              {product.category.name}
            </p>

            <h3 className="font-display font-semibold text-brand-brown text-sm md:text-base leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-brand-pink-dark transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 py-1">
              <div
                className="flex items-center gap-0.5"
                aria-label={`Rating: ${product.rating} out of 5 stars`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-3.5 h-3.5",
                      i < Math.floor(product.rating)
                        ? "fill-brand-yellow text-brand-yellow"
                        : "text-brand-beige fill-brand-beige"
                    )}
                  />
                ))}
              </div>

              <span className="text-xs text-brand-brown-light font-medium ml-1">
                ({product.review_count})
              </span>
            </div>
          </div>

          <div className="pt-3 mt-auto">
            {/* Price */}
<div className="flex items-center gap-2 flex-wrap">
  <span className="font-display font-bold text-brand-brown text-lg">
    {formatPrice(product.price)}
  </span>

  {product.compare_price && (
    <>
      <span className="text-brand-brown-light/70 text-xs line-through">
        {formatPrice(product.compare_price)}
      </span>

      {discount > 0 && (
        <span className="text-[10px] font-bold text-brand-pink-dark bg-brand-pink-light px-2 py-0.5 rounded-full">
          {discount}% OFF
        </span>
      )}
    </>
  )}
</div>

            {/* Feature badge */}
            <div className="mt-2.5 pt-1 min-h-[28px] flex items-center">
              {product.customizable ? (
                <span className="text-[11px] font-semibold text-brand-brown bg-brand-terracotta-light/60 border border-brand-terracotta/30 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Palette className="w-3 h-3 text-brand-terracotta shrink-0" />
                  Custom colors available
                </span>
              ) : (
                <span className="text-[11px] font-medium text-brand-brown-light/80 bg-brand-cream-dark/80 border border-brand-beige/60 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                  <Feather className="w-3 h-3 text-brand-green-dark shrink-0" />
                  100% Handcrafted felt
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>

    {/* Quick View Modal */}
    <QuickViewModal
      product={product}
      isOpen={isQuickViewOpen}
      onClose={() => setIsQuickViewOpen(false)}
    />
  </>
);
}

