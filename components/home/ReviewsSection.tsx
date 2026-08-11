"use client";

import { Star, Quote, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useState } from "react";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-brand-cream/40 via-brand-cream/80 to-white overflow-hidden">
      <div className="container-brand">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <span className="badge-pink text-xs font-semibold uppercase tracking-wider mb-2.5 inline-flex items-center gap-1.5 px-3.5 py-1 shadow-soft">
            <Heart className="w-3.5 h-3.5 text-brand-pink-dark fill-brand-pink/20" />
            Customer Reviews
          </span>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">What Our Customers Say</h2>
          <p className="section-subtitle text-xs sm:text-sm md:text-base mt-1">
            Real reviews from happy customers who love our handmade crafts
          </p>
          {/* Rating Summary */}
          <div className="inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full bg-white/90 border border-brand-brown/8 shadow-soft">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-brand-yellow text-brand-yellow"
                />
              ))}
            </div>
            <span className="text-brand-brown font-semibold text-xs sm:text-sm">
              4.9 / 5
            </span>
            <span className="text-brand-muted text-xs">
              (700+ verified reviews)
            </span>
          </div>
        </div>

        {/* Desktop: 3 column grid for all reviews */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <div className="relative">
            <ReviewCard review={testimonials[current]} />
            <div className="flex items-center justify-center gap-4 mt-5">
              <button
                onClick={prev}
                className="p-2.5 rounded-full bg-white border border-brand-brown/10 shadow-soft hover:bg-brand-pink-light transition-all"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4 text-brand-brown" />
              </button>
              <div className="flex gap-1.5 flex-wrap justify-center">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={cn(
                      "rounded-full transition-all duration-300",
                      i === current
                        ? "w-6 h-2 bg-brand-pink-dark"
                        : "w-2 h-2 bg-brand-brown/20"
                    )}
                    aria-label={`Go to review ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="p-2.5 rounded-full bg-white border border-brand-brown/10 shadow-soft hover:bg-brand-pink-light transition-all"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4 text-brand-brown" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: (typeof testimonials)[0] }) {
  return (
    <div className="flex flex-col justify-between p-5 rounded-3xl bg-white border border-brand-brown/8 shadow-soft hover:shadow-card hover:border-brand-pink/30 transition-all duration-300 h-full">
      <div>
        <div className="flex items-center justify-between mb-3">
          <Quote className="w-6 h-6 text-brand-pink-dark/40" />
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3.5 h-3.5",
                  i < review.rating
                    ? "fill-brand-yellow text-brand-yellow"
                    : "text-brand-beige fill-brand-beige"
                )}
              />
            ))}
          </div>
        </div>
        <p className="text-brand-brown/90 text-xs sm:text-sm leading-relaxed mb-4">
          &quot;{review.comment}&quot;
        </p>
      </div>

      <div className="pt-3 border-t border-brand-brown/5 flex items-center justify-between gap-3 mt-auto">
        <div>
          <p className="font-display font-semibold text-brand-brown text-xs sm:text-sm">
            {review.user_name}
          </p>
          {review.verified && (
            <p className="text-[10px] text-emerald-700 font-medium flex items-center gap-0.5 mt-0.5">
              ✓ Verified Purchase
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
