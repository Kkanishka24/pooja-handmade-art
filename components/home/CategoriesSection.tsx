import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { categories } from "@/lib/data";

export default function CategoriesSection() {
  return (
    <section className="section-pad bg-white relative overflow-hidden">
      <div className="container-brand relative z-10">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <span className="badge-pink text-xs font-semibold uppercase tracking-wider mb-3 inline-flex items-center gap-1.5 px-3.5 py-1 shadow-soft">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink-dark" />
            Browse by Category
          </span>
          <h2 className="section-title">Find Your Perfect Craft</h2>
          <p className="section-subtitle max-w-lg mx-auto text-sm md:text-base">
            From nursery décor to festive celebrations — explore our handcrafted
            collection
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {categories.map((cat, index) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              id={`category-${cat.slug}`}
              className="group"
            >
              <div
                className="relative rounded-3xl overflow-hidden shadow-card border border-brand-beige/50 hover:shadow-card-hover hover:border-brand-pink/50 transition-all duration-300 hover:-translate-y-1.5"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-44 md:h-52">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Rich Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/85 via-brand-brown/30 to-transparent transition-opacity duration-300 group-hover:from-brand-brown/90" />
                </div>

                {/* Top Count Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-white/85 backdrop-blur-md text-brand-brown text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-soft border border-white/40">
                    {cat.product_count} items
                  </span>
                </div>

                {/* Hover Arrow Badge */}
                <div className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-soft opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-brown" />
                </div>

                {/* Bottom Title Label */}
                <div className="absolute bottom-0 left-0 right-0 p-3.5 z-10">
                  <h3 className="font-display font-bold text-white text-sm md:text-base leading-tight drop-shadow-sm group-hover:text-brand-pink-light transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-white/80 text-[11px] font-medium mt-1 flex items-center gap-1 opacity-90 group-hover:opacity-100">
                    Explore collection →
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 md:mt-12">
          <Link
            href="/shop"
            className="btn-secondary text-sm py-3 px-6 inline-flex items-center gap-2 shadow-soft hover:shadow-card"
          >
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
