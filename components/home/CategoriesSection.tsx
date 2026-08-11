import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { categories } from "@/lib/data";

export default function CategoriesSection() {
  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
      <div className="container-brand relative z-10">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
          <span className="badge-pink text-xs font-semibold uppercase tracking-wider mb-2.5 inline-flex items-center gap-1.5 px-3.5 py-1 shadow-soft">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink-dark" />
            Browse Categories
          </span>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">Find Your Perfect Craft</h2>
          <p className="section-subtitle max-w-lg mx-auto text-xs sm:text-sm md:text-base mt-2">
            From nursery décor to festive celebrations — explore our handcrafted
            collection
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 md:gap-5">
          {categories.map((cat, index) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              id={`category-${cat.slug}`}
              className="group block"
            >
              <div
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-soft border border-brand-brown/8 hover:shadow-card hover:border-brand-pink/40 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {/* Image */}
                <div className="relative h-44 sm:h-48 md:h-56">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/90 via-brand-brown/30 to-transparent transition-opacity duration-300 group-hover:from-brand-brown/95" />
                </div>

                {/* Top Count Badge */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="bg-white/90 backdrop-blur-md text-brand-brown text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs border border-white/50">
                    {cat.product_count} items
                  </span>
                </div>

                {/* Hover Arrow Badge */}
                <div className="absolute top-2.5 right-2.5 z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-xs opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-brown" />
                </div>

                {/* Bottom Title Label */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-3.5 z-10">
                  <h3 className="font-display font-semibold text-white text-xs sm:text-sm md:text-base leading-tight drop-shadow-sm group-hover:text-brand-pink-light transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-white/80 text-[10px] sm:text-[11px] font-medium mt-1 flex items-center gap-1 opacity-90 group-hover:opacity-100">
                    Explore collection →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8 md:mt-12">
          <Link
            href="/shop"
            className="btn-secondary text-xs sm:text-sm py-2.5 sm:py-3 px-6 inline-flex items-center gap-2 shadow-soft hover:shadow-card"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
