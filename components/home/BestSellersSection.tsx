import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import { getBestSellers } from "@/lib/data";

export default function BestSellersSection() {
  const products = getBestSellers().slice(0, 4);

  return (
    <section className="section-pad bg-gradient-to-b from-brand-cream to-brand-cream-dark">
      <div className="container-brand">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-brand-terracotta" />
              <span className="badge-terracotta text-xs font-semibold uppercase tracking-wider">
                Most Loved
              </span>
            </div>
            <h2 className="section-title">Best Sellers</h2>
            <p className="section-subtitle">
              Our customers can&apos;t get enough of these
            </p>
          </div>
          <Link
            href="/shop?sort=bestseller"
            className="btn-secondary inline-flex text-sm self-start md:self-auto"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
