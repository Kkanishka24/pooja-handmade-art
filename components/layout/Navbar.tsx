"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  X,
  User,
  ChevronDown,
  Sparkles,
  LogOut,
  Package,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { cn } from "@/lib/utils";
import CartDrawer from "@/components/cart/CartDrawer";
import SearchModal from "@/components/shop/SearchModal";
import { supabase } from "@/lib/supabase";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  {
    label: "Categories",
    href: "#",
    children: [
      { label: "✨ Personalised Name", href: "/shop?category=personalised-name" },
      { label: "Cute Plush Ornaments without Bell", href: "/shop?category=cute-plush-ornaments-without-bell" },
      { label: "Cute Plush Ornaments with Bell", href: "/shop?category=cute-plush-ornaments-with-bell" },
      { label: "Door and Wall Decor", href: "/shop?category=door-and-wall-decor" },
      { label: "Festive Special Decor", href: "/shop?category=festive-special-decor" },
      { label: "Garden Decor", href: "/shop?category=garden-decor" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const cartCount = useCartStore((s) => s.getTotalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const toggleCart = useCartStore((s) => s.toggleCart);

  useEffect(() => {
    setMounted(true);

    // Persisted stores defer hydration until after mount to avoid hydration mismatches
    useCartStore.persist.rehydrate();
    useWishlistStore.persist.rehydrate();

    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* AUTHENTICATION TEMPORARILY DISABLED (Uncomment when needed):
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);
  */

  // Close user menu on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUserMenuOpen(false);
    router.push("/");
  };

  return (
    <>
      {/* Announcement Banner */}
      <div className="bg-brand-pink text-brand-brown text-center py-2 px-4 text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-1.5 flex-wrap">

        <span>Free Shipping on Orders Above ₹1499 &nbsp;|&nbsp; Personalised Name Designs &nbsp;|&nbsp; Washable &amp; Durable</span>

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

              {/* AUTHENTICATION TEMPORARILY DISABLED (Uncomment when needed):
              {user ? (
                <div ref={userMenuRef} className="relative hidden md:block">
                  <button
                    id="user-menu-btn"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="w-9 h-9 rounded-full bg-brand-pink flex items-center justify-center text-brand-brown font-bold text-sm hover:bg-brand-pink-dark transition-all duration-200"
                    aria-label="User menu"
                  >
                    {user.email?.charAt(0).toUpperCase() || "U"}
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-card-hover border border-brand-beige py-2 z-50 animate-fade-in">
                      <p className="px-4 py-2 text-xs text-brand-muted truncate border-b border-brand-beige mb-1">{user.email}</p>
                      <Link
                        href="/order-tracking"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-brand-muted hover:text-brand-brown hover:bg-brand-cream-dark transition-colors"
                      >
                        <Package className="w-4 h-4" /> My Orders
                      </Link>
                      <button
                        onClick={handleSignOut}
                        id="sign-out-btn"
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth"
                  id="auth-btn"
                  className="hidden md:flex p-2 rounded-full text-brand-muted hover:text-brand-brown hover:bg-brand-cream-dark transition-all duration-200"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </Link>
              )}
              */}

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
              {user ? (
                <>
                  <Link
                    href="/order-tracking"
                    className="px-4 py-3 rounded-2xl text-sm font-medium text-brand-muted hover:text-brand-brown hover:bg-brand-cream-dark"
                    onClick={() => setMobileOpen(false)}
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => { handleSignOut(); setMobileOpen(false); }}
                    className="w-full text-left px-4 py-3 rounded-2xl text-sm font-medium text-red-500 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/auth"
                  className="px-4 py-3 rounded-2xl text-sm font-medium text-brand-muted hover:text-brand-brown hover:bg-brand-cream-dark"
                  onClick={() => setMobileOpen(false)}
                >
                  Login / Register
                </Link>
              )}
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
