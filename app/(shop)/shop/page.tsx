"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { SlidersHorizontal, Grid3X3, List, X, RotateCcw, Check, Sparkles } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";
import { Product, Category } from "@/types";
import { cn, isCategoryMatch, findCategory } from "@/lib/utils";


const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

const availableColors = [
  { name: "Blush Pink", hex: "#f4a7b9" },
  { name: "Sage Green", hex: "#a8c5a0" },
  { name: "Rainbow", hex: "#f5d080" },
  { name: "Terracotta", hex: "#d4956a" },
  { name: "Lavender", hex: "#c5b8d8" },
  { name: "White", hex: "#ffffff" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // URL searchParams as single source of truth
  const selectedCategory = searchParams.get("category") || "all";
  const sortBy = searchParams.get("sort") || "newest";
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 2000;
  const priceRange: [number, number] = [minPrice, maxPrice];
  const selectedColor = searchParams.get("color") || "";
  const inStockOnly = searchParams.get("inStock") === "true";
  const searchQuery = searchParams.get("search") || "";

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products and categories from Supabase (admin-added only)
  useEffect(() => {
    Promise.all([
      fetch("/api/products").then((res) => (res.ok ? res.json() : { products: [] })),
      fetch("/api/categories").then((res) => (res.ok ? res.json() : { categories: [] })),
    ])
      .then(([pData, cData]) => {
        setProducts(Array.isArray(pData.products) ? pData.products : []);
        setCategories(Array.isArray(cData.categories) ? cData.categories : []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Lock body scroll on mobile when filter sidebar is toggled
  useEffect(() => {
    if (filtersOpen && window.innerWidth < 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [filtersOpen]);

  // Helper to update URL search parameters
  const updateFilters = (updates: Record<string, string | number | boolean | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, val]) => {
      if (val === null || val === "" || val === "all" || val === false || (key === "sort" && val === "newest")) {
        params.delete(key);
      } else {
        params.set(key, String(val));
      }
    });

    const queryString = params.toString();
    const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(newUrl, { scroll: false });
  };

  const handleCategoryChange = (catSlug: string) => {
    updateFilters({ category: catSlug });
  };

  const handleSortChange = (sortVal: string) => {
    updateFilters({ sort: sortVal });
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    updateFilters({
      minPrice: range[0] > 0 ? range[0] : null,
      maxPrice: range[1] < 2000 ? range[1] : null,
    });
  };

  const handleColorChange = (color: string) => {
    updateFilters({ color: color === selectedColor ? null : color });
  };

  const handleInStockChange = (checked: boolean) => {
    updateFilters({ inStock: checked ? "true" : null });
  };

  const clearAllFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  // Live category product count
  const getCategoryProductCount = (categorySlug: string) => {
    if (categorySlug === "all") return products.length;
    return products.filter((p) => isCategoryMatch(p.category, categorySlug, p.customizable)).length;
  };

  // Filter products
  const filtered = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((p) => isCategoryMatch(p.category, selectedCategory, p.customizable));
    }

    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (selectedColor) {
      result = result.filter((p) =>
        p.colors?.some((c) => c.toLowerCase().includes(selectedColor.toLowerCase()))
      );
    }

    if (inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

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
  }, [products, selectedCategory, sortBy, priceRange, selectedColor, inStockOnly, searchQuery]);

  // Active filters list
  const hasActiveFilters =
    selectedCategory !== "all" ||
    priceRange[0] > 0 ||
    priceRange[1] < 2000 ||
    selectedColor !== "" ||
    inStockOnly ||
    searchQuery !== "";

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b border-brand-beige">
        <div className="container-brand py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="section-title">
                {selectedCategory === "all"
                  ? "All Handcrafted Products"
                  : findCategory(categories, selectedCategory)?.name || "Shop"}
              </h1>
              <p className="section-subtitle text-sm mt-1 flex items-center gap-2">
                <span>{filtered.length} handcrafted items</span>
                {searchQuery && (
                  <span className="text-brand-pink-dark font-medium">
                    matching &quot;{searchQuery}&quot;
                  </span>
                )}
              </p>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="btn-ghost text-xs border border-brand-beige self-start md:self-auto flex items-center gap-1.5 px-3 py-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset All Filters
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container-brand py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Sheet Modal */}
          {filtersOpen && (
            <div className="fixed inset-0 z-50 flex items-end justify-center lg:hidden">
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={() => setFiltersOpen(false)}
              />

              {/* Mobile Drawer Content Box */}
              <div className="relative w-full bg-white rounded-t-3xl shadow-2xl flex flex-col h-[82vh] max-h-[620px] z-10 overflow-hidden animate-slide-up">
                {/* Header (Pinned Top) */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-brand-beige/60 shrink-0 bg-white">
                  <h2 className="font-display font-bold text-brand-brown text-lg flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-brand-pink-dark" />
                    Filter Products
                  </h2>
                  <button
                    className="p-1.5 rounded-full hover:bg-brand-cream text-brand-muted hover:text-brand-brown transition-colors"
                    onClick={() => setFiltersOpen(false)}
                    aria-label="Close filters"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Scrollable Filter Options */}
                <div className="overflow-y-auto flex-1 p-5 space-y-6">
                  {/* Category Filter */}
                  <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-3">
                      Categories
                    </p>
                    <div className="space-y-1">
                      <button
                        onClick={() => handleCategoryChange("all")}
                        className={cn(
                          "w-full text-left px-3 py-2 rounded-xl text-sm transition-colors duration-200 flex items-center justify-between",
                          selectedCategory === "all"
                            ? "bg-brand-pink text-brand-brown font-semibold shadow-soft"
                            : "text-brand-muted hover:bg-brand-cream-dark hover:text-brand-brown"
                        )}
                      >
                        <span>All Products</span>
                        <span className="text-xs opacity-70">{products.length}</span>
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryChange(cat.slug)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-xl text-sm transition-colors duration-200 flex items-center justify-between",
                            isCategoryMatch(cat, selectedCategory)
                              ? "bg-brand-pink text-brand-brown font-semibold shadow-soft"
                              : "text-brand-muted hover:bg-brand-cream-dark hover:text-brand-brown"
                          )}
                        >
                          <span>{cat.name}</span>
                          <span className="text-xs opacity-70">
                            {getCategoryProductCount(cat.slug)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div>
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
                          onClick={() => handlePriceRangeChange(option.range)}
                          className={cn(
                            "w-full text-left px-3 py-2 rounded-xl text-sm transition-colors duration-200",
                            priceRange[0] === option.range[0] &&
                              priceRange[1] === option.range[1]
                              ? "bg-brand-green-light text-brand-brown font-semibold shadow-soft"
                              : "text-brand-muted hover:bg-brand-cream-dark hover:text-brand-brown"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePriceRangeChange([0, 2000])}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs text-brand-muted hover:bg-brand-cream-dark transition-colors"
                      >
                        Any Price
                      </button>
                    </div>
                  </div>

                  {/* Color Swatch Filter */}
                  <div>
                    <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-3">
                      Felt Colors
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {availableColors.map((color) => {
                        const isSelected = selectedColor === color.name;
                        return (
                          <button
                            key={color.name}
                            onClick={() => handleColorChange(color.name)}
                            className={cn(
                              "w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center relative shadow-soft",
                              isSelected
                                ? "border-brand-brown scale-110 shadow-pink"
                                : "border-brand-beige hover:scale-105"
                            )}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                            aria-label={`Filter color ${color.name}`}
                          >
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-brand-brown stroke-[3]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* In Stock Only */}
                  <div className="pt-2 border-t border-brand-beige/50">
                    <label className="flex items-center gap-2.5 cursor-pointer text-sm font-medium text-brand-brown select-none">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => handleInStockChange(e.target.checked)}
                        className="w-4 h-4 rounded text-brand-pink focus:ring-brand-pink border-brand-beige cursor-pointer"
                      />
                      <span>In Stock Only</span>
                    </label>
                  </div>
                </div>

                {/* Footer Pinned CTA (ALWAYS VISIBLE AT BOTTOM) */}
                <div className="p-4 border-t border-brand-beige/60 shrink-0 bg-white shadow-lg flex items-center gap-3">
                  <button
                    onClick={clearAllFilters}
                    className="px-3.5 py-3 rounded-2xl border border-brand-beige text-xs font-bold text-brand-brown-light hover:bg-brand-cream transition-colors shrink-0"
                  >
                    Reset All
                  </button>
                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="btn-primary flex-1 justify-center py-3.5 shadow-pink text-sm font-semibold flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Apply Filters ({filtered.length})
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:w-64 shrink-0">
            <div className="bg-white rounded-3xl p-6 shadow-soft sticky top-28 border border-brand-beige/60 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display font-semibold text-brand-brown text-lg flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-brand-pink-dark" />
                  Filters
                </h2>
              </div>

              {/* Category Filter */}
              <div>
                <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-3">
                  Categories
                </p>
                <div className="space-y-1">
                  <button
                    onClick={() => handleCategoryChange("all")}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-xl text-sm transition-colors duration-200 flex items-center justify-between",
                      selectedCategory === "all"
                        ? "bg-brand-pink text-brand-brown font-semibold shadow-soft"
                        : "text-brand-muted hover:bg-brand-cream-dark hover:text-brand-brown"
                    )}
                  >
                    <span>All Products</span>
                    <span className="text-xs opacity-70">{products.length}</span>
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.slug)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-xl text-sm transition-colors duration-200 flex items-center justify-between",
                        isCategoryMatch(cat, selectedCategory)
                          ? "bg-brand-pink text-brand-brown font-semibold shadow-soft"
                          : "text-brand-muted hover:bg-brand-cream-dark hover:text-brand-brown"
                      )}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs opacity-70">
                        {getCategoryProductCount(cat.slug)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
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
                      onClick={() => handlePriceRangeChange(option.range)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-xl text-sm transition-colors duration-200",
                        priceRange[0] === option.range[0] &&
                          priceRange[1] === option.range[1]
                          ? "bg-brand-green-light text-brand-brown font-semibold shadow-soft"
                          : "text-brand-muted hover:bg-brand-cream-dark hover:text-brand-brown"
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePriceRangeChange([0, 2000])}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs text-brand-muted hover:bg-brand-cream-dark transition-colors"
                  >
                    Any Price
                  </button>
                </div>
              </div>

              {/* Color Swatch Filter */}
              <div>
                <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-3">
                  Felt Colors
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color) => {
                    const isSelected = selectedColor === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => handleColorChange(color.name)}
                        className={cn(
                          "w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center relative shadow-soft",
                          isSelected
                            ? "border-brand-brown scale-110 shadow-pink"
                            : "border-brand-beige hover:scale-105"
                        )}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                        aria-label={`Filter color ${color.name}`}
                      >
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-brand-brown stroke-[3]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* In Stock Only */}
              <div className="pt-2 border-t border-brand-beige/50">
                <label className="flex items-center gap-2.5 cursor-pointer text-sm font-medium text-brand-brown select-none">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => handleInStockChange(e.target.checked)}
                    className="w-4 h-4 rounded text-brand-pink focus:ring-brand-pink border-brand-beige cursor-pointer"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Main Catalog Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between mb-6 gap-4">
              <button
                id="filter-toggle-btn"
                className="lg:hidden flex items-center justify-center gap-2 btn-secondary text-sm py-2.5 px-4"
                onClick={() => setFiltersOpen(!filtersOpen)}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters {hasActiveFilters && "•"}
              </button>

              <div className="flex items-center gap-3 ml-auto w-full sm:w-auto justify-between sm:justify-end">
                {/* Sort dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-brand-muted font-medium hidden md:inline">Sort:</span>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="input-brand py-2 text-sm w-auto pr-8 cursor-pointer bg-white"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* View toggle */}
                <div className="flex items-center gap-1 bg-white rounded-xl border border-brand-beige p-1">
                  <button
                    onClick={() => setView("grid")}
                    className={cn(
                      "p-1.5 rounded-lg transition-colors",
                      view === "grid"
                        ? "bg-brand-pink text-brand-brown shadow-soft font-semibold"
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
                        ? "bg-brand-pink text-brand-brown shadow-soft font-semibold"
                        : "text-brand-muted hover:text-brand-brown"
                    )}
                    aria-label="List view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Chips System */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6 bg-white p-3.5 rounded-2xl border border-brand-beige/60 shadow-soft">
                <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider mr-1">
                  Active Filters:
                </span>

                {selectedCategory !== "all" && (
                  <span className="chip chip-active text-xs flex items-center gap-1">
                    Category: {findCategory(categories, selectedCategory)?.name || selectedCategory}
                    <button
                      onClick={() => updateFilters({ category: "all" })}
                      className="hover:text-red-600 ml-1"
                      aria-label="Remove category filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {(priceRange[0] > 0 || priceRange[1] < 2000) && (
                  <span className="chip chip-active text-xs flex items-center gap-1">
                    Price: ₹{priceRange[0]} - ₹{priceRange[1]}
                    <button
                      onClick={() => handlePriceRangeChange([0, 2000])}
                      className="hover:text-red-600 ml-1"
                      aria-label="Remove price filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedColor && (
                  <span className="chip chip-active text-xs flex items-center gap-1">
                    Color: {selectedColor}
                    <button
                      onClick={() => handleColorChange("")}
                      className="hover:text-red-600 ml-1"
                      aria-label="Remove color filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {inStockOnly && (
                  <span className="chip chip-active text-xs flex items-center gap-1">
                    In Stock Only
                    <button
                      onClick={() => handleInStockChange(false)}
                      className="hover:text-red-600 ml-1"
                      aria-label="Remove in-stock filter"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {searchQuery && (
                  <span className="chip chip-active text-xs flex items-center gap-1">
                    Search: &quot;{searchQuery}&quot;
                    <button
                      onClick={() => updateFilters({ search: null })}
                      className="hover:text-red-600 ml-1"
                      aria-label="Remove search query"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={clearAllFilters}
                  className="text-xs text-brand-pink-dark font-semibold hover:underline ml-auto"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Product Grid */}
            {loading ? (
              <div
                className={cn(
                  "grid gap-4 md:gap-6",
                  view === "grid"
                    ? "grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1"
                )}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center shadow-soft border border-brand-beige">
                <div className="w-16 h-16 rounded-full bg-brand-cream-dark flex items-center justify-center mx-auto mb-4 border border-brand-beige shadow-soft">
                  <Sparkles className="w-8 h-8 text-brand-pink-dark" />
                </div>
                <h3 className="font-display font-semibold text-brand-brown text-xl mb-2">
                  No handcrafted products match your filters
                </h3>
                <p className="text-brand-brown-light text-sm max-w-md mx-auto mb-6 leading-relaxed">
                  Try clearing your search terms or expanding your price and color selections to view more items.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="btn-primary text-sm shadow-pink"
                >
                  <RotateCcw className="w-4 h-4" /> Reset Filters
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
    <Suspense
      fallback={
        <div className="min-h-screen bg-brand-cream container-brand py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
