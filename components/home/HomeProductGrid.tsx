"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types";
import ProductCard from "@/components/shop/ProductCard";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";

type ProductFlag = "is_new" | "is_bestseller" | "is_featured";

export default function HomeProductGrid({
  filter,
  limit = 4,
}: {
  filter: ProductFlag;
  limit?: number;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => (res.ok ? res.json() : { products: [] }))
      .then((data) => {
        setProducts((data.products || []).filter((p: Product) => p[filter]));
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setLoading(false);
      });
  }, [filter]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 md:gap-6">
        {Array.from({ length: limit }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 md:gap-6">
      {products.slice(0, limit).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
