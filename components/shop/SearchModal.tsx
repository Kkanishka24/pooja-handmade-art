"use client";

import { useState, useMemo } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-brown/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-card-hover overflow-hidden animate-slide-up">
        {/* Search input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-brand-beige">
          <Search className="w-5 h-5 text-brand-pink shrink-0" />
          <input
            type="search"
            placeholder="Search for felt products, categories..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-brand-brown placeholder:text-brand-muted focus:outline-none text-base"
            autoFocus
            id="search-input"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-brand-cream-dark text-brand-muted transition-colors"
            aria-label="Close search"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query && results.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-brand-brown font-medium">
                No results for &quot;{query}&quot;
              </p>
              <p className="text-brand-muted text-sm mt-1">
                Try a different search term
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div className="p-3 space-y-1">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-brand-cream transition-colors duration-200"
                >
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0">
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
                      {product.name}
                    </p>
                    <p className="text-brand-pink-dark font-semibold text-sm">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-brand-muted shrink-0" />
                </Link>
              ))}

              {/* View all */}
              <Link
                href={`/shop?search=${encodeURIComponent(query)}`}
                onClick={onClose}
                className="block text-center py-3 text-sm font-medium text-brand-pink hover:text-brand-pink-dark transition-colors"
              >
                View all results for &quot;{query}&quot; →
              </Link>
            </div>
          )}

          {/* Quick links when empty */}
          {!query && (
            <div className="p-5">
              <p className="text-xs text-brand-muted font-semibold uppercase tracking-wider mb-3">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Rainbow Mobile",
                  "Felt Keychain",
                  "Diwali Decor",
                  "Nursery",
                  "Gift Hamper",
                  "Custom Name",
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="chip"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
