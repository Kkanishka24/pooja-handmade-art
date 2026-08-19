import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import HomeProductGrid from "@/components/home/HomeProductGrid";

export default function NewArrivalsSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-brand">
        <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between mb-8 md:mb-12 gap-4 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <span className="badge-pink text-xs font-semibold uppercase tracking-wider mb-2 inline-flex items-center gap-1.5 px-3 py-1 shadow-soft">
              <Sparkles className="w-3.5 h-3.5 text-brand-pink-dark" />
              Just Arrived
            </span>
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">New Arrivals</h2>
            <p className="section-subtitle mt-1 text-xs sm:text-sm md:text-base">
              Fresh handcrafted creations, made with extra love
            </p>
          </div>
          <Link
            href="/shop?sort=newest"
            className="btn-primary text-xs sm:text-sm py-2.5 px-5 inline-flex items-center gap-1.5 shrink-0 shadow-pink"
          >
            See All New <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <HomeProductGrid filter="is_new" limit={4} />
      </div>
    </section>
  );
}
