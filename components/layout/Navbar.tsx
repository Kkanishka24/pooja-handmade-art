"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  X,
  User,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { cn } from "@/lib/utils";
import CartDrawer from "@/components/cart/CartDrawer";
import SearchModal from "@/components/shop/SearchModal";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  {
    label: "Categories",
    href: "#",
    children: [
      { label: "Nursery Décor", href: "/shop?category=nursery-decor" },
      { label: "Festive Decorations", href: "/shop?category=festive-decorations" },
      { label: "Home Décor", href: "/shop?category=home-decor" },
      { label: "Gifts & Hampers", href: "/shop?category=gifts-hampers" },
      { label: "Wall Art", href: "/shop?category=wall-art" },
      { label: "Keychains & Accessories", href: "/shop?category=keychains-accessories" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const [mounted, setMounted] = useState(false);
  const cartCount = useCartStore((s) => s.getTotalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const toggleCart = useCartStore((s) => s.toggleCart);

useEffect(() => {
  setMounted(true);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  return (
    <>
      {/* Announcement Banner */}
      <div className="bg-brand-pink text-brand-brown text-center py-2 px-4 text-sm font-medium">
        <Sparkles className="inline w-3.5 h-3.5 mr-1" />
        Free shipping on orders above ₹999 &nbsp;|&nbsp; Custom orders welcome!
        <Sparkles className="inline w-3.5 h-3.5 ml-1" />
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-soft"
            : "bg-brand-cream/90 backdrop-blur-sm"
        )}
      >
        <div className="container-brand">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png?v=2"
                alt="Pooja Handmade Art"
                className="w-10 h-10 rounded-full object-cover shadow-pink group-hover:scale-110 transition-transform duration-300"
              />
              <div className="leading-tight">
                <div className="font-display font-bold text-brand-brown text-lg leading-none">
                  Pooja
                </div>
                <div className="text-brand-muted text-xs font-body tracking-widest uppercase">
                  Handmade Art
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setCategoryOpen(true)}
                    onMouseLeave={() => setCategoryOpen(false)}
                  >
                    <button className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium text-brand-muted hover:text-brand-brown hover:bg-brand-cream-dark transition-all duration-200">
                      {link.label}
                      <ChevronDown
                        className={cn(
                          "w-3.5 h-3.5 transition-transform duration-200",
                          categoryOpen && "rotate-180"
                        )}
                      />
                    </button>
                    {categoryOpen && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-card-hover border border-brand-beige py-2 animate-fade-in z-50">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-brand-muted hover:text-brand-brown hover:bg-brand-cream-dark transition-colors duration-150"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                      pathname === link.href
                        ? "bg-brand-pink text-brand-brown"
                        : "text-brand-muted hover:text-brand-brown hover:bg-brand-cream-dark"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Search */}
              <button
                id="search-btn"
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-full text-brand-muted hover:text-brand-brown hover:bg-brand-cream-dark transition-all duration-200"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                id="wishlist-btn"
                className="relative p-2 rounded-full text-brand-muted hover:text-brand-pink hover:bg-brand-pink-light transition-all duration-200"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
               {mounted && wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-brand-pink text-brand-brown text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] min-h-[18px]">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                id="cart-btn"
                onClick={toggleCart}
                className="relative p-2 rounded-full text-brand-muted hover:text-brand-brown hover:bg-brand-cream-dark transition-all duration-200"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-brand-pink text-brand-brown text-[10px] font-bold rounded-full flex items-center justify-center min-w-[18px] min-h-[18px]">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Auth */}
              <Link
                href="/auth"
                id="auth-btn"
                className="hidden md:flex p-2 rounded-full text-brand-muted hover:text-brand-brown hover:bg-brand-cream-dark transition-all duration-200"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Mobile hamburger */}
              <button
                id="mobile-menu-btn"
                className="md:hidden p-2 rounded-full text-brand-muted hover:bg-brand-cream-dark transition-all duration-200"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-brand-beige animate-slide-up">
            <nav className="container-brand py-4 flex flex-col gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <p className="px-4 py-2 text-xs font-semibold text-brand-muted uppercase tracking-wider">
                      {link.label}
                    </p>
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-6 py-2 text-sm text-brand-muted hover:text-brand-brown"
                        onClick={() => setMobileOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-4 py-3 rounded-2xl text-sm font-medium transition-colors duration-200",
                      pathname === link.href
                        ? "bg-brand-pink text-brand-brown"
                        : "text-brand-muted hover:text-brand-brown hover:bg-brand-cream-dark"
                    )}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Link
                href="/auth"
                className="px-4 py-3 rounded-2xl text-sm font-medium text-brand-muted hover:text-brand-brown hover:bg-brand-cream-dark"
                onClick={() => setMobileOpen(false)}
              >
                Login / Register
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
