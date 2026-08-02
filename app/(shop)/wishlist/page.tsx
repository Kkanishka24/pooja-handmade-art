"use client";

import { useWishlistStore } from "@/store/wishlistStore";
import ProductCard from "@/components/shop/ProductCard";
import Link from "next/link";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore();

  return (
    <div className="bg-brand-cream min-h-screen">
      <div className="bg-white border-b border-brand-beige">
        <div className="container-brand py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="section-title flex items-center gap-3">
                <Heart className="w-8 h-8 text-brand-pink fill-brand-pink" />
                My Wishlist
              </h1>
              <p className="section-subtitle text-sm mt-1">
                {items.length} saved {items.length === 1 ? "item" : "items"}
              </p>
            </div>
            {items.length > 0 && (
              <button
                onClick={clearWishlist}
                className="text-sm text-brand-muted hover:text-red-500 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container-brand py-10">
        {items.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 rounded-full bg-brand-pink-light flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-brand-pink" />
            </div>
            <h2 className="font-display text-2xl font-bold text-brand-brown mb-3">
              Your wishlist is empty
            </h2>
            <p className="text-brand-muted mb-8 max-w-sm mx-auto">
              Save your favourite handmade pieces here and come back to them anytime!
            </p>
            <Link href="/shop" className="btn-primary">
              <ShoppingBag className="w-4 h-4" />
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
