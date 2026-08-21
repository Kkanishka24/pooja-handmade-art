"use client";

import { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Star,
  Sparkles,
  Heart,
  ShoppingCart,
  Share2,
  Check,
  Truck,
  Shield,
  RefreshCw,
  MessageCircle,
} from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/shop/ProductCard";
import ProductImageGallery from "@/components/shop/ProductImageGallery";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [customName, setCustomName] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const { toggleItem, isWishlisted } = useWishlistStore();

  useEffect(() => {
    Promise.all([
      fetch(`/api/products?slug=${encodeURIComponent(slug)}`).then((res) => res.ok ? res.json() : { products: [] }),
      fetch("/api/products").then((res) => res.ok ? res.json() : { products: [] }),
    ])
      .then(([detailData, listData]) => {
        const found = detailData.products?.[0] || null;
        setProduct(found);
        setAllProducts(listData.products || []);
        setSelectedColor(found?.colors?.[0] || "");
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setAllProducts([]);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-brand-cream min-h-screen container-brand py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (!product) notFound();

  const wishlisted = isWishlisted(product.id);

  const relatedProducts = allProducts
    .filter((p) => p.category.id === product.category.id && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedColor, customName);
    openCart();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/shop/${product.slug}`;
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} on Pooja Handmade Art!`,
      url,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement("textarea");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
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

      <div className="container-brand py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Images Column */}
          <div>
            <ProductImageGallery
              images={product.images}
              productName={product.name}
              badges={
                <>
                  {product.is_new && (
                    <span className="badge-green text-xs shadow-soft font-semibold">
                      <Sparkles className="w-3.5 h-3.5 text-brand-green-dark inline mr-0.5" /> New Arrival
                    </span>
                  )}
                  {product.is_bestseller && (
                    <span className="badge-pink text-xs shadow-soft font-semibold">
                      <Star className="w-3.5 h-3.5 text-brand-brown fill-brand-yellow inline mr-0.5" /> Bestseller
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="badge-sale text-xs shadow-soft font-bold">-{discount}% OFF</span>
                  )}
                </>
              }
            />
          </div>

          {/* Product Info Column (Arranged Beautifully to Align Perfectly with Left Image + Thumbnails) */}
          <div className="flex flex-col justify-between space-y-4 lg:space-y-5">
            {/* Header & Title */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <p className="text-brand-pink-dark text-xs font-bold uppercase tracking-wider">
                  {product.category.name}
                </p>
              </div>

              <h1 className="font-display font-bold text-brand-brown text-2xl lg:text-3xl leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Price & Tagline */}
            <div className="flex items-center justify-between py-2.5 border-y border-brand-beige/60">
              <div className="flex items-baseline gap-2.5">
                <span className="font-display font-bold text-brand-brown text-2xl md:text-3xl">
                  {formatPrice(product.price)}
                </span>
                {product.compare_price && (
                  <span className="text-brand-brown-light/70 text-xs md:text-sm line-through">
                    {formatPrice(product.compare_price)}
                  </span>
                )}
                {discount > 0 && (
                  <span className="badge-sale text-xs py-0.5 px-2">Save {discount}%</span>
                )}
              </div>

              {product.stock > 0 ? (
                <span className="text-xs text-brand-green-dark font-semibold inline-flex items-center gap-1 bg-brand-green-light/50 px-2.5 py-1 rounded-full border border-brand-green-light">
                  <Check className="w-3.5 h-3.5" /> In Stock ({product.stock} left)
                </span>
              ) : (
                <span className="text-xs text-red-500 font-semibold bg-red-50 px-2.5 py-1 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Personalization / Custom Name Input Box */}
            {product.category.slug === "personalised-name" && (
            <div className="bg-brand-pink-light/30 p-4 rounded-2xl border border-brand-pink/40 space-y-2 shadow-soft">
              <label htmlFor="custom-name-input" className="block text-xs font-bold text-brand-brown uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-pink-dark" />
                Personalization Name / Wording :
              </label>
              <input
                id="custom-name-input"
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Aarav, Baby Maya, Happy Birthday Mom"
                className="input-brand text-sm shadow-soft bg-white"
              />
              <p className="text-[11px] text-brand-muted">
                Enter the name or custom wording you want our artisans to hand-stitch onto your craft.
              </p>
            </div>
            )}

            {/* Color Selector & Qty Counter Inline */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              {product.colors && product.colors.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-brand-brown-light uppercase tracking-wider">
                    Variant:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "px-3.5 py-1.5 rounded-full text-xs border transition-all duration-200",
                          selectedColor === color
                            ? "border-brand-pink bg-brand-pink-light text-brand-brown font-semibold shadow-soft"
                            : "border-brand-beige text-brand-brown-light hover:border-brand-pink-light"
                        )}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Counter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-brand-brown-light uppercase tracking-wider">
                  Qty:
                </span>
                <div className="flex items-center gap-1 bg-white rounded-xl border border-brand-beige shadow-soft px-1 py-0.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-lg hover:bg-brand-cream-dark flex items-center justify-center transition-colors text-brand-brown font-bold text-sm"
                    aria-label="Decrease"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-xs font-bold text-brand-brown">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="w-7 h-7 rounded-lg hover:bg-brand-cream-dark flex items-center justify-center transition-colors text-brand-brown font-bold text-sm"
                    aria-label="Increase"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons Row (Right Aligned Wishlist/Share + Expanded Add to Cart Button) */}
            <div className="flex items-center justify-between gap-4">
              <button
                id="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={cn(
                  "flex-1 max-w-sm btn-primary py-3.5 px-6 text-sm shadow-pink flex items-center justify-center gap-2 font-semibold",
                  addedToCart && "bg-brand-green text-white"
                )}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </button>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  id="wishlist-product-btn"
                  onClick={() => toggleItem(product)}
                  className={cn(
                    "p-3.5 rounded-full border transition-all duration-200",
                    wishlisted
                      ? "border-brand-pink bg-brand-pink-light"
                      : "border-brand-beige hover:border-brand-pink"
                  )}
                  aria-label="Add to wishlist"
                >
                  <Heart
                    className={cn(
                      "w-4 h-4",
                      wishlisted
                        ? "fill-brand-pink text-brand-pink"
                        : "text-brand-brown-light"
                    )}
                  />
                </button>

                <button
                  onClick={handleShare}
                  className={cn(
                    "p-3.5 rounded-full border transition-all duration-200",
                    shareCopied
                      ? "border-brand-green bg-brand-green-light"
                      : "border-brand-beige hover:border-brand-pink text-brand-brown-light hover:text-brand-brown"
                  )}
                  aria-label="Share product"
                >
                  {shareCopied ? (
                    <Check className="w-4 h-4 text-brand-green-dark" />
                  ) : (
                    <Share2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-2 py-2.5 px-4 bg-brand-cream/80 rounded-2xl border border-brand-beige/60">
              {[
                { icon: Truck, label: "Free Shipping\nabove ₹1499" },
                { icon: Shield, label: "100% Secure\nPayment" },
                { icon: RefreshCw, label: "Only Defective\nProducts Returnable" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center text-center">
                  <Icon className="w-4 h-4 text-brand-pink-dark mb-0.5" />
                  <p className="text-xs text-brand-brown-light font-medium leading-tight whitespace-pre-line">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Perfectly Aligned Product Details & Custom Order Card */}
            <div className="bg-white p-5 rounded-3xl border border-brand-beige/60 shadow-card space-y-3.5">
              <div>
                <h2 className="font-display font-bold text-brand-brown text-base mb-1.5">
                  Product Details
                </h2>
                <p className="text-brand-brown-light text-xs md:text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.materials && (
                <div className="pt-2.5 border-t border-brand-beige/40 flex items-center gap-2">
                  <span className="font-semibold text-brand-brown text-xs">
                    Materials Used:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.materials.map((mat) => (
                      <span key={mat} className="chip text-xs py-0.5 px-2.5">
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.customizable && (
                <div className="pt-2.5 border-t border-brand-beige/40 flex items-center justify-between text-xs bg-brand-terracotta-light/30 p-3 rounded-2xl border border-brand-terracotta/20">
                  <div className="flex items-center gap-2.5">
                    <MessageCircle className="w-4.5 h-4.5 text-brand-terracotta shrink-0" />
                    <div>
                      <span className="font-bold text-brand-brown text-xs md:text-sm">
                        Custom Colors Available
                      </span>
                      <p className="text-xs text-brand-brown-light">
                        WhatsApp us for custom color combinations or personalized messages.
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/919310261542"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-terracotta font-bold hover:underline shrink-0 ml-2 bg-white px-3 py-1.5 rounded-xl border border-brand-terracotta/30 shadow-soft"
                  >
                    WhatsApp →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Elegant Section Divider */}
        <div className="mt-16 md:mt-20 pt-12 md:pt-16 border-t border-brand-beige">
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="section-title mb-0">You May Also Like</h2>
                <span className="text-brand-pink text-xs font-semibold uppercase tracking-wider hidden sm:inline-block">
                  Handcrafted Recommendations
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
