import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Heart,
  Scissors,
  Package,
  Truck,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Pooja Handmade Art — the story behind our handcrafted felt products and the maker behind every stitch.",
};

const processSteps = [
  {
    icon: Scissors,
    step: "01",
    title: "Cut & Design",
    description:
      "Premium felt fabric is carefully cut into shapes using hand-drawn templates, making each piece unique.",
    color: "bg-rose-50 border-rose-100",
    iconColor: "text-rose-600",
    stepColor: "text-rose-200",
  },
  {
    icon: Heart,
    step: "02",
    title: "Hand Stitch",
    description:
      "Each piece is lovingly hand-stitched using quality thread, ensuring durable and beautiful seams.",
    color: "bg-emerald-50 border-emerald-100",
    iconColor: "text-emerald-600",
    stepColor: "text-emerald-200",
  },
  {
    icon: Package,
    step: "03",
    title: "Stuff & Finish",
    description:
      "Soft hypoallergenic fiber cotton is filled into each creation for a plush, premium feel.",
    color: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-600",
    stepColor: "text-amber-200",
  },
  {
    icon: Truck,
    step: "04",
    title: "Pack & Ship",
    description:
      "Each order is packaged thoughtfully with eco-friendly wrapping and a handwritten note, ready for gifting.",
    color: "bg-purple-50 border-purple-100",
    iconColor: "text-purple-600",
    stepColor: "text-purple-200",
  },
];



export default function AboutPage() {
  return (
    <div className="bg-brand-cream">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero py-16 md:py-24">
        <div className="absolute top-10 -left-16 w-64 h-64 rounded-full bg-brand-pink-light/40 blur-3xl" />
        <div className="absolute bottom-10 -right-16 w-80 h-80 rounded-full bg-brand-green-light/30 blur-3xl" />
        <div className="container-brand relative z-10 text-center">
          <span className="badge-pink text-xs font-semibold uppercase tracking-wider mb-4 inline-block">
            About Pooja Handmade Art
          </span>
          <h1 className="section-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
            Rooted in Tradition,{" "}
            <span className="text-gradient">Crafted by Hand</span>
          </h1>
          <p className="text-brand-brown font-display font-medium text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Made by hand. Rooted in tradition. Made with purpose.
          </p>
        </div>
      </section>

      {/* Story & Artisans */}
      <section className="section-pad bg-white">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative rounded-3xl md:rounded-4xl overflow-hidden shadow-card-hover border border-brand-beige/50">
                <Image
                  src="/images/about-artisan-group.jpg"
                  alt="Pooja Handmade Art - Women Artisans Handcrafting Felt Art"
                  width={1024}
                  height={758}
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-2 md:-right-6 glass-card px-4 py-2.5 shadow-card">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-brand-yellow text-brand-yellow"
                      />
                    ))}
                  </div>
                  <span className="text-brand-brown font-semibold text-xs sm:text-sm">
                    500+ Happy Customers
                  </span>
                </div>
              </div>
              {/* Decorative sticker */}
              <div className="absolute -top-4 -left-4 w-14 h-14 rounded-full bg-brand-pink flex items-center justify-center shadow-pink animate-float">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png?v=2"
                  alt="Pooja Handmade Art"
                  className="w-7 h-7 rounded-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="badge-green text-xs font-semibold uppercase tracking-wider mb-4 inline-block">
                Our Mission & Story
              </span>
              <h2 className="section-title text-2xl sm:text-3xl md:text-4xl mb-4">About Pooja Handmade Art</h2>
              <div className="space-y-4 text-brand-muted text-base leading-relaxed">
                <p>
                  At Pooja Handmade Art, our creations are inspired by the traditional art of <strong className="text-brand-brown font-semibold">handmade toy-making</strong>. Each piece is carefully cut, stitched, filled, and detailed by skilled <strong className="text-brand-brown font-semibold">women artisans in rural communities</strong>.
                </p>
                <p>
                  We combine traditional craftsmanship with contemporary designs to create colourful décor, festive ornaments, and personalised pieces, <strong className="text-brand-brown font-semibold">preserving a timeless craft while creating meaningful livelihoods for women</strong>.
                </p>
                <p className="font-display font-semibold text-brand-brown text-base sm:text-lg pt-3 border-t border-brand-brown/10">
                  Made by hand. Rooted in tradition. Made with purpose.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/shop" className="btn-primary">
                  Shop the Collection <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://www.instagram.com/pooja_handmade_art/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2 hover:bg-[#E4405F] hover:text-white hover:border-transparent transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span>Follow Our Journey</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Process Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white via-brand-cream/50 to-white relative overflow-hidden">
        <div className="container-brand">
          <div className="text-center mb-10 md:mb-16">
            <span className="badge-terracotta text-xs font-semibold uppercase tracking-wider mb-2.5 inline-flex items-center gap-1.5 px-3.5 py-1 shadow-soft">
              <Sparkles className="w-3.5 h-3.5 text-brand-terracotta" />
              Behind the Scenes
            </span>
            <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">How Every Piece is Made</h2>
            <p className="section-subtitle max-w-lg mx-auto text-xs sm:text-sm md:text-base mt-2">
              From raw felt to finished treasure, here is a glimpse into our traditional handmade process
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 relative">
            {processSteps.map((step, index) => (
              <div
                key={step.step}
                className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-3xl bg-white border border-brand-brown/8 shadow-soft hover:shadow-card hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
              >
                {/* Background Step Number Watermark */}
                <span className={`absolute top-2 right-3 font-display font-bold text-4xl sm:text-5xl ${step.stepColor} opacity-40 select-none pointer-events-none transition-transform duration-300 group-hover:scale-110`}>
                  {step.step}
                </span>

                <div>
                  {/* Icon Badge */}
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl ${step.color} border flex items-center justify-center mb-5 shadow-xs`}
                  >
                    <step.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${step.iconColor}`} />
                  </div>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-brown/60 mb-1 inline-block">
                    Step {step.step}
                  </span>
                  <h3 className="font-display font-semibold text-brand-brown text-base sm:text-lg mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-brand-muted text-xs sm:text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Step Progress Bar */}
                <div className="mt-5 pt-3 border-t border-brand-brown/5 flex items-center justify-between">
                  <span className="text-[10px] font-medium text-brand-brown-light/70">
                    Phase {index + 1} of 4
                  </span>
                  <div className="w-12 h-1 rounded-full bg-brand-cream-dark overflow-hidden">
                    <div
                      className="h-full bg-brand-pink-dark"
                      style={{ width: `${((index + 1) / 4) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-pad bg-gradient-to-br from-brand-pink-light via-brand-cream to-brand-green-light">
        <div className="container-brand text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png?v=2"
            alt="Pooja Handmade Art"
            className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
          />
          <h2 className="section-title mb-4">Ready to Own Something Handmade?</h2>
          <p className="section-subtitle mb-8 max-w-lg mx-auto">
            Browse our collection of premium felt products or reach out for a
            custom order
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/shop" className="btn-primary shadow-pink">
              Explore the Shop <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-secondary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
