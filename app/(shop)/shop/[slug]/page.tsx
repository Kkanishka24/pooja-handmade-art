"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Heart,
  ShoppingCart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Check,
  Truck,
  Shield,
  RefreshCw,
  MessageCircle,
} from "lucide-react";
import { products } from "@/lib/data";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/shop/ProductCard";

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || ""
  );
  const [addedToCart, setAddedToCart] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const relatedProducts = products
    .filter((p) => p.category.id === product.category.id && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor);
    openCart();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const discount = product.compare_price
    ? Math.round(
        ((product.compare_price - product.price) / product.compare_price) * 100
      )
    : 0;

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-brand-beige">
        <div className="container-brand py-4">
          <nav className="flex items-center gap-2 text-sm text-brand-muted" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-brand-brown transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-brand-brown transition-colors">
              Shop
            </Link>
            <span>/</span>
            <Link
              href={`/shop?category=${product.category.slug}`}
              className="hover:text-brand-brown transition-colors"
            >
              {product.category.name}
            </Link>
            <span>/</span>
            <span className="text-brand-brown font-medium line-clamp-1">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="container-brand py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            {/* Main Image */}
            <div className="relative rounded-4xl overflow-hidden bg-white shadow-card mb-4 aspect-square">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.is_new && (
                  <span className="badge-green text-xs">New ✨</span>
                )}
                {product.is_bestseller && (
                  <span className="badge-pink text-xs">⭐ Bestseller</span>
                )}
                {discount > 0 && (
                  <span className="badge-sale text-xs">-{discount}%</span>
                )}
              </div>

              {/* Navigation arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage((i) =>
                        (i - 1 + product.images.length) % product.images.length
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-soft hover:bg-white transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImage((i) => (i + 1) % product.images.length)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-soft hover:bg-white transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-200",
                    i === selectedImage
                      ? "border-brand-pink shadow-pink"
                      : "border-transparent hover:border-brand-pink-light"
                  )}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:pt-4">
            <p className="text-brand-pink text-sm font-medium mb-2">
              {product.category.name}
            </p>
            <h1 className="font-display font-bold text-brand-brown text-3xl md:text-4xl mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < Math.floor(product.rating)
                        ? "fill-brand-yellow text-brand-yellow"
                        : "text-brand-beige fill-brand-beige"
                    )}
                  />
                ))}
              </div>
              <span className="text-brand-brown font-semibold text-sm">
                {product.rating}
              </span>
              <span className="text-brand-muted text-sm">
                ({product.review_count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display font-bold text-brand-brown text-3xl">
                {formatPrice(product.price)}
              </span>
              {product.compare_price && (
                <>
                  <span className="text-brand-muted text-lg line-through">
                    {formatPrice(product.compare_price)}
                  </span>
                  <span className="badge-sale text-sm">Save {discount}%</span>
                </>
              )}
            </div>

            <p className="text-brand-muted leading-relaxed mb-6 text-sm">
              {product.short_description}
            </p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-3">
                  Color / Variant:{" "}
                  <span className="text-brand-brown normal-case tracking-normal font-medium">
                    {selectedColor}
                  </span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm border-2 transition-all duration-200",
                        selectedColor === color
                          ? "border-brand-pink bg-brand-pink-light text-brand-brown font-semibold"
                          : "border-brand-beige text-brand-muted hover:border-brand-pink-light"
                      )}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
                Quantity
              </p>
              <div className="flex items-center gap-2 bg-white rounded-2xl border border-brand-beige shadow-soft px-1 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-xl hover:bg-brand-cream-dark flex items-center justify-center transition-colors"
                  aria-label="Decrease"
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold text-brand-brown">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className="w-8 h-8 rounded-xl hover:bg-brand-cream-dark flex items-center justify-center transition-colors"
                  aria-label="Increase"
                >
                  +
                </button>
              </div>
              <span className="text-brand-muted text-sm">
                {product.stock > 0 ? (
                  <span className="text-brand-green-dark font-medium">
                    ✓ In Stock ({product.stock} left)
                  </span>
                ) : (
                  <span className="text-red-500">Out of Stock</span>
                )}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <button
                id="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={cn(
                  "flex-1 btn-primary py-4 text-base shadow-pink",
                  addedToCart && "bg-brand-green text-white"
                )}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" /> Add to Cart
                  </>
                )}
              </button>
              <button
                id="wishlist-product-btn"
                onClick={() => toggleItem(product)}
                className={cn(
                  "p-4 rounded-full border-2 transition-all duration-200",
                  wishlisted
                    ? "border-brand-pink bg-brand-pink-light"
                    : "border-brand-beige hover:border-brand-pink"
                )}
                aria-label="Add to wishlist"
              >
                <Heart
                  className={cn(
                    "w-5 h-5",
                    wishlisted
                      ? "fill-brand-pink text-brand-pink"
                      : "text-brand-muted"
                  )}
                />
              </button>
              <button
                className="p-4 rounded-full border-2 border-brand-beige hover:border-brand-pink text-brand-muted hover:text-brand-brown transition-all duration-200"
                aria-label="Share product"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-brand-cream rounded-3xl mb-6">
              {[
                { icon: Truck, label: "Free shipping\nabove ₹999" },
                { icon: Shield, label: "Secure\npayment" },
                { icon: RefreshCw, label: "Easy\nreturns" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon className="w-5 h-5 text-brand-pink" />
                  <p className="text-xs text-brand-muted leading-tight whitespace-pre-line">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <h3 className="font-display font-semibold text-brand-brown mb-2">
                  Product Details
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.materials && (
                <div className="pt-4 border-t border-brand-beige">
                  <h4 className="font-semibold text-brand-brown text-sm mb-2">
                    Materials Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.materials.map((mat) => (
                      <span key={mat} className="chip text-xs">
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.customizable && (
                <div className="pt-4 border-t border-brand-beige p-4 bg-brand-terracotta-light rounded-2xl">
                  <div className="flex items-start gap-3">
                    <MessageCircle className="w-5 h-5 text-brand-terracotta mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-brand-brown text-sm">
                        Custom Orders Available
                      </p>
                      <p className="text-brand-muted text-xs mt-1">
                        Want a personalized version? Contact us via WhatsApp for
                        custom color combinations or personalized messages.
                      </p>
                      <a
                        href="https://wa.me/919876543210"
                        className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-brand-terracotta hover:underline"
                      >
                        WhatsApp Us →
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="section-title mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
