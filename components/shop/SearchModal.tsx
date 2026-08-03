"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Search, X, ArrowRight, History, Sparkles } from "lucide-react";
import { products } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice, cn } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("pooja-recent-searches");
      if (saved) setRecentSearches(JSON.parse(saved));
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Filter products
  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      )
      .slice(0, 6);
  }, [query]);

  // Save query to history
  const saveSearchHistory = (term: string) => {
    if (!term.trim()) return;
    const clean = term.trim();
    const updated = [clean, ...recentSearches.filter((s) => s !== clean)].slice(0, 5);
    setRecentSearches(updated);
    try {
      localStorage.setItem("pooja-recent-searches", JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
      return;
    }

    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < results.length) {
        const item = results[selectedIndex];
        saveSearchHistory(item.name);
        onClose();
        router.push(`/shop/${item.slug}`);
      } else if (query.trim()) {
        saveSearchHistory(query);
        onClose();
        router.push(`/shop?search=${encodeURIComponent(query)}`);
      }
    }
  };

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(-1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Helper to highlight matching query text
  const HighlightText = ({ text, highlight }: { text: string; highlight: string }) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const parts = text.split(new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <mark key={i} className="bg-brand-pink-light text-brand-brown font-semibold rounded px-0.5">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-20 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Search Products"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-brown/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-card-hover overflow-hidden animate-slide-up border border-brand-beige">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-brand-beige bg-brand-cream/40">
          <Search className="w-5 h-5 text-brand-pink shrink-0" />
          <input
            ref={inputRef}
            type="search"
            placeholder="Search felt crafts, categories, tags..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-brand-brown placeholder:text-brand-muted focus:outline-none text-base font-medium"
            id="search-input"
            autoComplete="off"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-brand-muted hover:text-brand-brown px-2 py-1 rounded-lg hover:bg-brand-cream transition-colors"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-brand-cream-dark text-brand-muted transition-colors"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Content */}
        <div className="max-h-[60vh] overflow-y-auto">
          {/* Empty search results */}
          {query && results.length === 0 && (
            <div className="py-12 text-center px-4">
              <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center mx-auto mb-3 text-2xl">
                🔍
              </div>
              <p className="text-brand-brown font-semibold text-base">
                No items found for &quot;{query}&quot;
              </p>
              <p className="text-brand-muted text-xs mt-1 max-w-xs mx-auto">
                Try searching for nursery, mobile, keychain, Diwali, or cloud decor.
              </p>
            </div>
          )}

          {/* Results List */}
          {results.length > 0 && (
            <div className="p-3 space-y-1">
              <div className="flex items-center justify-between px-3 py-1 text-xs text-brand-muted font-semibold uppercase tracking-wider">
                <span>Products ({results.length})</span>
                <span className="text-[10px] lowercase text-brand-muted/70">
                  Use ↑↓ arrows to navigate, enter to select
                </span>
              </div>

              {results.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  onClick={() => {
                    saveSearchHistory(product.name);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={cn(
                    "flex items-center gap-4 p-3 rounded-2xl transition-all duration-150 border border-transparent",
                    index === selectedIndex
                      ? "bg-brand-pink-light/40 border-brand-pink/50 shadow-soft"
                      : "hover:bg-brand-cream"
                  )}
                >
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-brand-beige">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-brand-muted text-xs">
                      {product.category.name}
                    </p>
                    <p className="font-medium text-brand-brown text-sm line-clamp-1">
                      <HighlightText text={product.name} highlight={query} />
                    </p>
                    <p className="text-brand-pink-dark font-semibold text-xs mt-0.5">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <ArrowRight className={cn("w-4 h-4 shrink-0 transition-transform", index === selectedIndex ? "text-brand-pink-dark translate-x-1" : "text-brand-muted")} />
                </Link>
              ))}

              {/* View all button */}
              <Link
                href={`/shop?search=${encodeURIComponent(query)}`}
                onClick={() => {
                  saveSearchHistory(query);
                  onClose();
                }}
                className="block text-center py-3 text-xs font-semibold text-brand-pink-dark hover:bg-brand-pink-light/30 rounded-xl transition-colors mt-2"
              >
                View all results for &quot;{query}&quot; →
              </Link>
            </div>
          )}

          {/* Recent & Popular Searches when query is empty */}
          {!query && (
            <div className="p-5 space-y-5">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <p className="text-xs text-brand-muted font-semibold uppercase tracking-wider flex items-center gap-1.5">
                      <History className="w-3.5 h-3.5 text-brand-pink-dark" />
                      Recent Searches
                    </p>
                    <button
                      onClick={() => {
                        setRecentSearches([]);
                        localStorage.removeItem("pooja-recent-searches");
                      }}
                      className="text-[11px] text-brand-muted hover:text-red-500 transition-colors"
                    >
                      Clear history
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="chip text-xs flex items-center gap-1"
                      >
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Searches */}
              <div>
                <p className="text-xs text-brand-muted font-semibold uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-terracotta" />
                  Popular Suggestions
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Rainbow Mobile",
                    "Felt Keychain",
                    "Diwali Decor",
                    "Nursery Decor",
                    "Gift Hamper",
                    "Name Banner",
                  ].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="chip text-xs hover:border-brand-pink transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
