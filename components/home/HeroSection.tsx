"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Star, Heart } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-6 md:py-10 min-h-[calc(100vh-5rem)] flex items-center">
      {/* Decorative background blobs */}
      <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-brand-pink-light/40 blur-3xl" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 rounded-full bg-brand-green-light/30 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-yellow/10 blur-3xl" />

      <div className="container-brand relative z-10 py-2 md:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Content */}
          <div className="animate-fade-in pt-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-soft mb-4 border border-brand-pink/30">
              <Sparkles className="w-4 h-4 text-brand-pink" />
              <span className="text-xs md:text-sm font-semibold text-brand-brown">
                100% Handmade with Love
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-6xl font-display font-bold text-brand-brown leading-tight mb-5">
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

            <p className="text-brand-muted text-base md:text-lg leading-relaxed mb-7 max-w-md">
              Discover handcrafted felt products — nursery décor, festive
              decorations, and personalized gifts. Every stitch tells a story.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="btn-primary text-base px-7 md:px-8 py-3.5 shadow-pink">
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/shop?custom=true" className="btn-secondary text-base px-7 md:px-8 py-3.5">
                Custom Orders
                <Heart className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right — Image Grid */}
          <div className="relative animate-slide-up animation-delay-200">
            <div className="grid grid-cols-2 gap-3.5">
              {/* Main large image */}
              <div className="col-span-2 relative rounded-3xl md:rounded-4xl overflow-hidden shadow-card-hover h-56 sm:h-64 md:h-72 lg:h-76 group border border-brand-beige/50">
                <Image
                  src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80"
                  alt="Handmade felt nursery decoration"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/30 to-transparent" />
                {/* Floating badge */}
                <div className="absolute top-3.5 left-3.5 glass-card px-3.5 py-1.5 flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-brand-yellow fill-brand-yellow" />
                  <span className="text-xs font-semibold text-brand-brown">
                    Best Seller
                  </span>
                </div>
              </div>

              {/* Two smaller images */}
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-card h-32 sm:h-36 md:h-40 group border border-brand-beige/40">
                <Image
                  src="https://images.unsplash.com/photo-1576919228236-a097c32a5cd4?w=600&q=80"
                  alt="Felt flower garland"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-card h-32 sm:h-36 md:h-40 group border border-brand-beige/40">
                <Image
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80"
                  alt="Felt home decor"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* New badge */}
                <div className="absolute top-2.5 right-2.5 badge-green text-xs font-semibold py-0.5 px-2.5">
                  New ✨
                </div>
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-3 -right-3 w-12 h-12 md:w-14 md:h-14 bg-brand-yellow rounded-full flex items-center justify-center shadow-card animate-bounce-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png?v=2"
                alt="Pooja Handmade Art"
                className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-3 -left-3 w-10 h-10 md:w-11 md:h-11 bg-brand-pink rounded-full flex items-center justify-center text-lg shadow-card animate-float">
              ✨
            </div>
          </div>
        </div>

        {/* Seamless Borderless Stats Strip */}
        <div className="mt-7 md:mt-9 max-w-4xl mx-auto pt-4 border-t border-brand-pink/25">
          <div className="grid grid-cols-3 divide-x divide-brand-pink/30 text-center">
            <div className="px-2 md:px-4">
              <div className="font-display font-bold text-xl md:text-2xl lg:text-3xl text-brand-brown">
                500+
              </div>
              <div className="text-brand-muted text-xs md:text-sm font-medium mt-0.5">
                Happy Customers
              </div>
            </div>
            <div className="px-2 md:px-4">
              <div className="font-display font-bold text-xl md:text-2xl lg:text-3xl text-brand-brown">
                200+
              </div>
              <div className="text-brand-muted text-xs md:text-sm font-medium mt-0.5">
                Unique Products
              </div>
            </div>
            <div className="px-2 md:px-4">
              <div className="font-display font-bold text-xl md:text-2xl lg:text-3xl text-brand-pink-dark">
                4.9★
              </div>
              <div className="text-brand-muted text-xs md:text-sm font-medium mt-0.5">
                Average Rating
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hidden md:flex absolute bottom-3 left-1/2 -translate-x-1/2 flex-col items-center gap-0.5 animate-bounce-soft opacity-60">
        <div className="w-px h-5 bg-gradient-to-b from-brand-pink to-transparent" />
        <div className="w-1 h-1 rounded-full bg-brand-pink" />
      </div>
    </section>
  );
}
