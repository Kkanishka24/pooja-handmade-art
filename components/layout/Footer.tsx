import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  Sparkles,
  Share2,
} from "lucide-react";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "Nursery Décor", href: "/shop?category=nursery-decor" },
    { label: "Festive Decorations", href: "/shop?category=festive-decorations" },
    { label: "Home Décor", href: "/shop?category=home-decor" },
    { label: "Gifts & Hampers", href: "/shop?category=gifts-hampers" },
  ],
  info: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Order Tracking", href: "/order-tracking" },
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Return Policy", href: "/returns" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-brand-brown text-white">
      {/* Main Footer */}
      <div className="container-brand py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png?v=2"
                alt="Pooja Handmade Art"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="font-display font-bold text-white text-lg leading-none">
                  Pooja
                </div>
                <div className="text-brand-pink text-xs tracking-widest uppercase">
                  Handmade Art
                </div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Every piece is hand-stitched with love using premium felt fabric
              and soft fiber cotton. Bringing handmade joy to your home, one
              stitch at a time.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { emoji: "📷", href: "https://instagram.com",  label: "Instagram" },
                { emoji: "👍", href: "https://facebook.com",   label: "Facebook" },
                { emoji: "▶️", href: "https://youtube.com",    label: "YouTube" },
              ].map(({ emoji, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-pink hover:text-brand-brown transition-all duration-200 text-base"
                >
                  {emoji}
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-display font-semibold text-white text-base mb-4">
              Shop
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-brand-pink text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h3 className="font-display font-semibold text-white text-base mb-4">
              Information
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-brand-pink text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-white text-base mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-pink mt-0.5 shrink-0" />
                <a
                  href="mailto:hello@poojahandmadeart.in"
                  className="text-white/60 hover:text-brand-pink text-sm transition-colors duration-200"
                >
                  hello@poojahandmadeart.in
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-pink mt-0.5 shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-white/60 hover:text-brand-pink text-sm transition-colors duration-200"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-pink mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">
                  Mumbai, Maharashtra, India
                </span>
              </li>
            </ul>

            {/* Newsletter mini */}
            <div className="mt-6">
              <p className="text-white/70 text-xs mb-2">
                <Sparkles className="inline w-3 h-3 mr-1 text-brand-pink" />
                Subscribe for new arrivals & offers
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded-xl bg-white/10 text-white placeholder:text-white/40 text-sm border border-white/20 focus:outline-none focus:border-brand-pink transition-colors"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-brand-pink text-brand-brown text-sm font-semibold rounded-xl hover:bg-brand-pink-light transition-colors"
                >
                  Go
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-brand py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <p>© 2024 Pooja Handmade Art. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-brand-pink fill-brand-pink mx-0.5" /> in India
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-brand-pink transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-brand-pink transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
