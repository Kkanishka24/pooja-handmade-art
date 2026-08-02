"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Star, Heart } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero min-h-[85vh] flex items-center">
      {/* Decorative blobs */}
      <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-brand-pink-light/40 blur-3xl" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-brand-green-light/30 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-yellow/10 blur-3xl" />

      <div className="container-brand relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-soft mb-6 border border-brand-pink/30">
              <Sparkles className="w-4 h-4 text-brand-pink" />
              <span className="text-sm font-medium text-brand-brown">
                100% Handmade with Love
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-display font-bold text-brand-brown leading-tight mb-6">
              Crafted by{" "}
              <span className="text-gradient">Hand</span>,<br />
              Made for Your{" "}
              <span className="relative">
                <span className="text-gradient">Heart</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 10 Q100 2 198 10"
                    stroke="#F4A7B9"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-brand-muted text-lg leading-relaxed mb-8 max-w-md">
              Discover handcrafted felt products — nursery décor, festive
              decorations, and personalized gifts. Every stitch tells a story.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="btn-primary text-base px-8 py-4 shadow-pink">
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/shop?custom=true" className="btn-secondary text-base px-8 py-4">
                Custom Orders
                <Heart className="w-5 h-5" />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-brand-pink/20">
              {[
                { value: "500+", label: "Happy Customers" },
                { value: "200+", label: "Unique Products" },
                { value: "4.9★", label: "Average Rating" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display font-bold text-2xl text-brand-pink-dark">
                    {stat.value}
                  </div>
                  <div className="text-brand-muted text-xs mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Image Grid */}
          <div className="relative animate-slide-up animation-delay-200">
            <div className="grid grid-cols-2 gap-4">
              {/* Main large image */}
              <div className="col-span-2 relative rounded-4xl overflow-hidden shadow-card-hover h-64 md:h-80 group">
                <Image
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80"
                  alt="Handmade felt nursery decoration"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/20 to-transparent" />
                {/* Floating badge */}
                <div className="absolute top-4 left-4 glass-card px-3 py-2 flex items-center gap-2">
                  <Star className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
                  <span className="text-xs font-semibold text-brand-brown">
                    Best Seller
                  </span>
                </div>
              </div>

              {/* Two smaller images */}
              <div className="relative rounded-3xl overflow-hidden shadow-card h-40 group">
                <Image
                  src="https://images.unsplash.com/photo-1490750967868-88df5691cc3d?w=400&q=80"
                  alt="Felt flower garland"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="relative rounded-3xl overflow-hidden shadow-card h-40 group">
                <Image
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80"
                  alt="Felt home decor"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* New badge */}
                <div className="absolute top-3 right-3 badge-green text-xs font-semibold">
                  New ✨
                </div>
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center text-2xl shadow-card animate-bounce-soft">
              🧶
            </div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-brand-pink rounded-full flex items-center justify-center text-xl shadow-card animate-float">
              ✨
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce-soft">
        <div className="w-px h-8 bg-gradient-to-b from-brand-pink to-transparent" />
        <div className="w-2 h-2 rounded-full bg-brand-pink" />
      </div>
    </section>
  );
}
