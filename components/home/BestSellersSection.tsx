import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import HomeProductGrid from "@/components/home/HomeProductGrid";

export default function BestSellersSection() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-brand-cream/60 via-brand-cream to-brand-cream-dark/30">
      <div className="container-brand">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between mb-8 md:mb-12 gap-4 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <span className="badge-terracotta text-xs font-semibold uppercase tracking-wider mb-2 inline-flex items-center gap-1.5 px-3 py-1 shadow-soft">
              <Flame className="w-3.5 h-3.5 text-brand-terracotta fill-brand-terracotta/20" />
              Most Loved
            </span>
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">Best Sellers</h2>
            <p className="section-subtitle mt-1 text-xs sm:text-sm md:text-base">
              Our customers can&apos;t get enough of these handcrafted favorites
            </p>
          </div>
          <Link
            href="/shop?sort=bestseller"
            className="btn-secondary text-xs sm:text-sm py-2.5 px-5 inline-flex items-center gap-1.5 shrink-0"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Grid */}
        <HomeProductGrid filter="is_bestseller" limit={4} />
      </div>
    </section>
  );
}
