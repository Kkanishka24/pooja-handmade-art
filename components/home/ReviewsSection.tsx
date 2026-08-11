"use client";

import { Star, Quote, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useRef } from "react";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-brand-cream/40 via-brand-cream/80 to-white overflow-hidden">
      <div className="container-brand">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-12">
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

        {/* Scrollable Container Wrapper */}
        <div className="relative group px-1">
          {/* Navigation Buttons for Desktop */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-white/95 border border-brand-brown/10 shadow-card hover:bg-brand-pink-light hover:scale-105 active:scale-95 transition-all absolute top-1/2 -translate-y-1/2 -left-3 lg:-left-5 z-20"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 text-brand-brown" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex items-center justify-center w-11 h-11 rounded-full bg-white/95 border border-brand-brown/10 shadow-card hover:bg-brand-pink-light hover:scale-105 active:scale-95 transition-all absolute top-1/2 -translate-y-1/2 -right-3 lg:-right-5 z-20"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 text-brand-brown" />
          </button>

          {/* Horizontal Scroll Track */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory py-3 pb-6 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((review) => (
              <div
                key={review.id}
                className="w-[280px] sm:w-[330px] md:w-[370px] shrink-0 snap-start flex flex-col"
              >
                <ReviewCard review={review} />
              </div>
            ))}
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
