"use client";

import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <section className="section-pad bg-white overflow-hidden">
      <div className="container-brand">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="badge-pink text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
            Testimonials
          </span>
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">
            Real reviews from happy customers who love our handmade crafts
          </p>
          {/* Star row */}
          <div className="flex items-center justify-center gap-1 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-brand-yellow text-brand-yellow"
              />
            ))}
            <span className="ml-2 text-brand-muted text-sm font-medium">
              4.9/5 from 500+ reviews
            </span>
          </div>
        </div>

        {/* Desktop: 3 column grid */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div className="md:hidden">
          <div className="relative">
            <ReviewCard review={testimonials[current]} />
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prev}
                className="p-2 rounded-full border-2 border-brand-beige hover:border-brand-pink hover:bg-brand-pink-light transition-all duration-200"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4 text-brand-brown" />
              </button>
              <div className="flex gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={cn(
                      "rounded-full transition-all duration-200",
                      i === current
                        ? "w-6 h-2 bg-brand-pink"
                        : "w-2 h-2 bg-brand-beige"
                    )}
                    aria-label={`Go to review ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="p-2 rounded-full border-2 border-brand-beige hover:border-brand-pink hover:bg-brand-pink-light transition-all duration-200"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4 text-brand-brown" />
              </button>
            </div>
          </div>
        </div>

        {/* Second row on desktop */}
        <div className="hidden md:grid grid-cols-3 gap-6 mt-6">
          {testimonials.slice(3, 6).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: (typeof testimonials)[0] }) {
  return (
    <div className="card-soft border border-brand-pink/10 hover:border-brand-pink/30 hover:shadow-card transition-all duration-300">
      <Quote className="w-6 h-6 text-brand-pink mb-3 opacity-60" />
      <p className="text-brand-muted text-sm leading-relaxed mb-4 line-clamp-4">
        {review.comment}
      </p>
      <div className="flex items-center gap-1 mb-4">
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
      <div className="flex items-center gap-3">
        {review.user_avatar && (
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-brand-pink-light">
            <Image
              src={review.user_avatar}
              alt={review.user_name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <p className="font-semibold text-brand-brown text-sm">
            {review.user_name}
          </p>
          {review.verified && (
            <p className="text-[10px] text-brand-green-dark font-medium">
              ✓ Verified Purchase
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
