import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

// Official Social SVG Components
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4C5.7 5 12 5 12 5s6.3 0 8.1.6a2 2 0 0 1 1.4 1.4 24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4c-1.8.6-8.1.6-8.1.6s-6.3 0-8.1-.6A2 2 0 0 1 2.5 17z" />
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
  </svg>
);

const footerLinks = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "Personalised Name", href: "/shop?category=personalised-name" },
    { label: "Cute Plush Ornaments without Bell", href: "/shop?category=cute-plush-ornaments-without-bell" },
    { label: "Cute Plush Ornaments with Bell", href: "/shop?category=cute-plush-ornaments-with-bell" },
    { label: "Door and Wall Decor", href: "/shop?category=door-and-wall-decor" },
    { label: "Festive Special Decor", href: "/shop?category=festive-special-decor" },
    { label: "Garden Decor", href: "/shop?category=garden-decor" },
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
                { icon: InstagramIcon, href: "https://www.instagram.com/pooja_handmade_art/", label: "Instagram", hoverStyle: "hover:bg-[#E4405F] hover:text-white" },
                { icon: FacebookIcon, href: "https://www.facebook.com/profile.php?id=61592498323352", label: "Facebook", hoverStyle: "hover:bg-[#1877F2] hover:text-white" },
              ].map(({ icon: Icon, href, label, hoverStyle }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/80 transition-all duration-200 ${hoverStyle} hover:scale-110 shadow-soft`}
                >
                  <Icon className="w-4 h-4" />
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
                  href="mailto:info@poojahandmadeart.in"
                  className="text-white/60 hover:text-brand-pink text-sm transition-colors duration-200"
                >
                  info@poojahandmadeart.in
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-pink mt-0.5 shrink-0" />
                <a
                  href="https://wa.me/919310261542"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-brand-pink text-sm transition-colors duration-200"
                >
                  +91 93102 61542 (WhatsApp Only)
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-pink mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">
                  New Delhi, India
                </span>
              </li>
            </ul>
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
