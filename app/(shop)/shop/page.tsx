"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, Grid3X3, List, X } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import { products, categories } from "@/lib/data";
import { cn } from "@/lib/utils";

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all"
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sort") || "newest");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery] = useState(searchParams.get("search") || "");

  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.name.toLowerCase().includes(q)
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category.slug === selectedCategory);
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        result.sort((a, b) => b.review_count - a.review_count);
        break;
      default:
        result.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
    }

    return result;
  }, [selectedCategory, sortBy, priceRange, searchQuery]);

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-brand-beige">
        <div className="container-brand py-8">
          <h1 className="section-title">
            {selectedCategory === "all"
              ? "All Products"
              : categories.find((c) => c.slug === selectedCategory)?.name ||
                "Shop"}
          </h1>
          <p className="section-subtitle text-sm mt-1">
            {filtered.length} handcrafted products
          </p>
        </div>
      </div>

      <div className="container-brand py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside
            className={cn(
              "lg:w-64 shrink-0",
              filtersOpen ? "block" : "hidden lg:block"
            )}
          >
            <div className="bg-white rounded-3xl p-6 shadow-soft sticky top-28">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-semibold text-brand-brown text-lg">
                  Filters
                </h2>
                <button
                  className="lg:hidden text-brand-muted"
                  onClick={() => setFiltersOpen(false)}
                  aria-label="Close filters"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-3">
                  Category
                </p>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-xl text-sm transition-colors duration-200",
                      selectedCategory === "all"
                        ? "bg-brand-pink text-brand-brown font-semibold"
                        : "text-brand-muted hover:bg-brand-cream-dark hover:text-brand-brown"
                    )}
                  >
                    All Products
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-xl text-sm transition-colors duration-200 flex items-center justify-between",
                        selectedCategory === cat.slug
                          ? "bg-brand-pink text-brand-brown font-semibold"
                          : "text-brand-muted hover:bg-brand-cream-dark hover:text-brand-brown"
                      )}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs opacity-60">
                        {cat.product_count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-3">
                  Price Range
                </p>
                <div className="space-y-1">
                  {[
                    { label: "Under ₹500", range: [0, 499] as [number, number] },
                    { label: "₹500 – ₹999", range: [500, 999] as [number, number] },
                    { label: "₹1000 – ₹1499", range: [1000, 1499] as [number, number] },
                    { label: "₹1500+", range: [1500, 9999] as [number, number] },
                  ].map((option) => (
                    <button
                      key={option.label}
                      onClick={() => setPriceRange(option.range)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-xl text-sm transition-colors duration-200",
                        priceRange[0] === option.range[0] &&
                          priceRange[1] === option.range[1]
                          ? "bg-brand-green-light text-brand-brown font-semibold"
                          : "text-brand-muted hover:bg-brand-cream-dark hover:text-brand-brown"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                  <button
                    onClick={() => setPriceRange([0, 2000])}
                    className="w-full text-left px-3 py-2 rounded-xl text-sm text-brand-muted hover:bg-brand-cream-dark transition-colors"
                  >
                    Any Price
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div>
                <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-3">
                  Popular Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "nursery",
                    "festive",
                    "gift",
                    "custom",
                    "rainbow",
                    "keychain",
                  ].map((tag) => (
                    <span key={tag} className="chip text-xs capitalize">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <button
                id="filter-toggle-btn"
                className="lg:hidden flex items-center gap-2 btn-secondary text-sm py-2 px-4"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </button>

              <div className="flex items-center gap-3 ml-auto">
                {/* Sort */}
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input-brand py-2 text-sm w-auto pr-8 cursor-pointer"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                {/* View toggle */}
                <div className="hidden md:flex items-center gap-1 bg-white rounded-xl border border-brand-beige p-1">
                  <button
                    onClick={() => setView("grid")}
                    className={cn(
                      "p-1.5 rounded-lg transition-colors",
                      view === "grid"
                        ? "bg-brand-pink text-brand-brown"
                        : "text-brand-muted hover:text-brand-brown"
                    )}
                    aria-label="Grid view"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={cn(
                      "p-1.5 rounded-lg transition-colors",
                      view === "list"
                        ? "bg-brand-pink text-brand-brown"
                        : "text-brand-muted hover:text-brand-brown"
                    )}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-5xl mb-4">🧶</p>
                <h3 className="font-display font-semibold text-brand-brown text-xl mb-2">
                  No products found
                </h3>
                <p className="text-brand-muted">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setPriceRange([0, 2000]);
                  }}
                  className="btn-primary mt-6 text-sm"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div
                className={cn(
                  "grid gap-4 md:gap-6",
                  view === "grid"
                    ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                )}
              >
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-pink border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
