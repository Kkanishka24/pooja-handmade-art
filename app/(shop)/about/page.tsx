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
  HeartHandshake,
  Leaf,
  Mail,
  Palette,
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
      "Premium felt fabric is carefully cut into shapes using hand-drawn templates — each piece is unique.",
    color: "bg-brand-pink-light",
    iconColor: "text-brand-pink-dark",
  },
  {
    icon: Heart,
    step: "02",
    title: "Hand Stitch",
    description:
      "Each piece is lovingly hand-stitched using quality thread, ensuring durable and beautiful seams.",
    color: "bg-brand-green-light",
    iconColor: "text-brand-green-dark",
  },
  {
    icon: Package,
    step: "03",
    title: "Stuff & Finish",
    description:
      "Soft hypoallergenic fiber cotton is used to give each piece a plush, premium feel.",
    color: "bg-brand-terracotta-light",
    iconColor: "text-brand-terracotta",
  },
  {
    icon: Truck,
    step: "04",
    title: "Pack & Ship",
    description:
      "Each order is beautifully packaged with tissue paper and a handwritten note, ready for gifting.",
    color: "bg-brand-lavender",
    iconColor: "text-purple-600",
  },
];

const values = [
  {
    icon: HeartHandshake,
    title: "Handmade with Intention",
    description:
      "Every product is made one at a time, by hand. No factories, no shortcuts.",
    color: "bg-brand-pink-light text-brand-pink-dark",
  },
  {
    icon: Leaf,
    title: "Sustainable Materials",
    description:
      "We source premium, eco-conscious felt fabric and use minimal plastic packaging.",
    color: "bg-brand-green-light text-brand-green-dark",
  },
  {
    icon: Mail,
    title: "Personal Touch",
    description:
      "Every order ships with a handwritten note — because handmade deserves a personal connection.",
    color: "bg-brand-terracotta-light text-brand-terracotta",
  },
  {
    icon: Palette,
    title: "Custom Made for You",
    description:
      "We love bringing your ideas to life with personalized and custom orders.",
    color: "bg-brand-lavender text-purple-600",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-brand-cream">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero py-24 md:py-32">
        <div className="absolute top-10 -left-16 w-64 h-64 rounded-full bg-brand-pink-light/40 blur-3xl" />
        <div className="absolute bottom-10 -right-16 w-80 h-80 rounded-full bg-brand-green-light/30 blur-3xl" />
        <div className="container-brand relative z-10 text-center">
          <span className="badge-pink text-xs font-semibold uppercase tracking-wider mb-4 inline-block">
            Our Story
          </span>
          <h1 className="section-title text-4xl md:text-6xl mb-6">
            Made by Hand,{" "}
            <span className="text-gradient">Made with Love</span>
          </h1>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Pooja Handmade Art was born from a passion for creating beautiful,
            tactile things that bring joy to everyday life. Every piece tells a
            story — stitched slowly, thoughtfully, by hand.
          </p>
        </div>
      </section>

      {/* Meet the Maker */}
      <section className="section-pad bg-white">
        <div className="container-brand">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative rounded-4xl overflow-hidden shadow-card-hover aspect-square max-w-md mx-auto lg:mx-0">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=700&q=80"
                  alt="Pooja — founder of Pooja Handmade Art"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 md:-right-8 glass-card px-5 py-3 shadow-card">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-brand-yellow text-brand-yellow"
                      />
                    ))}
                  </div>
                  <span className="text-brand-brown font-semibold text-sm">
                    500+ Happy Customers
                  </span>
                </div>
              </div>
              {/* Decorative sticker */}
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-brand-pink flex items-center justify-center shadow-pink animate-float">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png?v=2"
                  alt="Pooja Handmade Art"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <span className="badge-green text-xs font-semibold uppercase tracking-wider mb-4 inline-block">
                Meet the Maker
              </span>
              <h2 className="section-title mb-4">Hi, I&apos;m Pooja 👋</h2>
              <div className="space-y-4 text-brand-muted leading-relaxed">
                <p>
                  I&apos;m a self-taught felt artist based in Mumbai, India. What
                  started as a hobby during college — making little felt keychains
                  for friends — slowly grew into a full creative studio where I
                  spend my days surrounded by colorful fabric, thread, and
                  endless cups of chai ☕
                </p>
                <p>
                  Every product in my shop is made entirely by me, from designing
                  the pattern to the final stitch. I believe in slow making —
                  taking the time to craft each piece with care so that it truly
                  feels special when you hold it.
                </p>
                <p>
                  My specialty is turning premium felt fabric into whimsical
                  nursery décor, festive decorations, home accents, and
                  personalized gifts. If you can dream it, I can stitch it!
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link href="/shop" className="btn-primary">
                  Shop the Collection <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2 hover:bg-[#E4405F] hover:text-white hover:border-transparent transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span>Follow My Journey</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-pad bg-brand-cream">
        <div className="container-brand">
          <div className="text-center mb-12">
            <span className="badge-pink text-xs font-semibold uppercase tracking-wider mb-3 inline-flex items-center gap-1.5 px-3 py-1 shadow-soft">
              <Sparkles className="w-3.5 h-3.5 text-brand-pink-dark" />
              What We Stand For
            </span>
            <h2 className="section-title">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="card-soft text-center hover:shadow-card transition-all duration-300 hover:-translate-y-1 p-6"
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft",
                    v.color
                  )}
                >
                  <v.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display font-semibold text-brand-brown mb-2 text-lg">
                  {v.title}
                </h3>
                <p className="text-brand-muted text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-pad bg-white">
        <div className="container-brand">
          <div className="text-center mb-14">
            <span className="badge-terracotta text-xs font-semibold uppercase tracking-wider mb-3 inline-block">
              Behind the Scenes
            </span>
            <h2 className="section-title">How Every Piece is Made</h2>
            <p className="section-subtitle max-w-lg mx-auto">
              From raw felt to finished product — a peek into the handmade
              process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Connector line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-brand-beige z-0" />
                )}
                <div className="card-soft relative z-10 hover:shadow-card transition-all duration-300 hover:-translate-y-1">
                  <div
                    className={`w-12 h-12 rounded-2xl ${step.color} flex items-center justify-center mb-4`}
                  >
                    <step.icon className={`w-6 h-6 ${step.iconColor}`} />
                  </div>
                  <div className="font-display font-bold text-3xl text-brand-beige mb-2">
                    {step.step}
                  </div>
                  <h3 className="font-display font-semibold text-brand-brown text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-brand-muted text-sm leading-relaxed">
                    {step.description}
                  </p>
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
