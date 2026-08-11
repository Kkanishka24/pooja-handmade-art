"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart } from "lucide-react";

function FeltFlowerGreen({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg className={`inline-block align-middle ${className}`} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="7" r="5" fill="#A8C5A0" />
      <circle cx="16" cy="25" r="5" fill="#A8C5A0" />
      <circle cx="7" cy="16" r="5" fill="#A8C5A0" />
      <circle cx="25" cy="16" r="5" fill="#A8C5A0" />
      <circle cx="9.6" cy="9.6" r="5" fill="#C8DFC4" />
      <circle cx="22.4" cy="22.4" r="5" fill="#C8DFC4" />
      <circle cx="9.6" cy="22.4" r="5" fill="#C8DFC4" />
      <circle cx="22.4" cy="9.6" r="5" fill="#C8DFC4" />
      <circle cx="16" cy="16" r="4.5" fill="#7DAD74" />
      <circle cx="16" cy="16" r="2.5" fill="#F5D080" />
      <path d="M14.5 16H17.5M16 14.5V17.5" stroke="#3D2B1F" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-6xl font-display font-bold text-brand-brown leading-tight mb-5">
              Where Every Stitch<br />
              Tells a{" "}
              <span className="inline-inline-flex items-center text-brand-brown relative">
                Story
                <FeltFlowerGreen className="w-8 h-8 sm:w-10 sm:h-10 animate-float ml-1.5 -mt-1" />
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

            <p className="text-brand-muted text-base md:text-lg leading-relaxed mb-7 max-w-lg">
              Meticulously handcrafted by skilled women artisans, our creations
              embody artistry, heritage craftsmanship and the spirit of women’s
              empowerment.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="btn-primary text-base px-7 md:px-8 py-3.5 shadow-pink">
                Shop Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/shop?category=personalised-name" className="btn-secondary text-base px-7 md:px-8 py-3.5">
                Personalised Name
                <Heart className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Right — Artisan Hero Image */}
          <div className="relative animate-slide-up animation-delay-200">
            <div className="relative rounded-3xl md:rounded-4xl overflow-hidden shadow-card-hover border border-brand-beige/50 group max-w-md lg:max-w-none mx-auto h-[380px] sm:h-[450px] md:h-[480px]">
              <Image
                src="/images/artisan-hero.jpg"
                alt="Women Artisan Handcrafting Felt Art"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider bg-brand-pink-dark/90 px-3 py-1 rounded-full shadow-soft inline-block mb-1">
                  Heritage Craftsmanship
                </span>
                <p className="text-sm font-medium text-white/90 drop-shadow-sm">
                  Handcrafted by empowered women artisans in the Himalayas
                </p>
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
