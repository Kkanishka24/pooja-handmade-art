import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import ProductCard from "@/components/shop/ProductCard";
import { getNewArrivals } from "@/lib/data";

export default function NewArrivalsSection() {
  const products = getNewArrivals().slice(0, 4);

  return (
    <section className="section-pad bg-white">
      <div className="container-brand">
        <div className="flex flex-col items-center text-center md:items-start md:text-left md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span className="badge-pink text-xs font-semibold uppercase tracking-wider mb-2 inline-flex items-center gap-1.5 px-3 py-1 shadow-soft">
              <Sparkles className="w-3.5 h-3.5 text-brand-pink-dark" />
              Just Arrived
            </span>
            <h2 className="section-title">New Arrivals</h2>
            <p className="section-subtitle">
              Fresh handcrafted creations, made with extra love
            </p>
          </div>
          <Link
            href="/shop?sort=newest"
            className="btn-primary inline-flex text-sm self-center md:self-auto"
          >
            See All New <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
