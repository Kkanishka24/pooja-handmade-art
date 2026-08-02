import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/data";

export default function CategoriesSection() {
  return (
    <section className="section-pad bg-white">
      <div className="container-brand">
        {/* Heading */}
        <div className="text-center mb-12">
          <span className="badge-pink text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
            Browse by Category
          </span>
          <h2 className="section-title">Find Your Perfect Craft</h2>
          <p className="section-subtitle max-w-lg mx-auto">
            From nursery décor to festive celebrations — explore our handcrafted
            collection
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, index) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              id={`category-${cat.slug}`}
              className="group"
            >
              <div
                className="relative rounded-3xl overflow-hidden shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-36 md:h-44">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/50 via-brand-brown/10 to-transparent" />
                </div>

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="font-display font-semibold text-white text-sm leading-tight">
                    {cat.name}
                  </p>
                  <p className="text-white/70 text-xs mt-0.5">
                    {cat.product_count} items
                  </p>
                </div>

                {/* Hover arrow */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <ArrowRight className="w-3.5 h-3.5 text-brand-brown" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link href="/shop" className="btn-ghost text-brand-brown border border-brand-beige hover:bg-brand-cream-dark">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
