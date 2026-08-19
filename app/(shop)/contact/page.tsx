"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How do I add a personalized name to my order?",
    a: "When viewing any product on our shop, simply enter the custom name or wording in the 'Personalization Name / Wording' input box before adding it to your cart!",
  },
  {
    q: "How long does it take to hand-stitch a personalized order?",
    a: "Personalized orders typically take 3–7 business days depending on detail. We'll provide an exact timeline when you place the order.",
  },
  {
    q: "What is your shipping policy?",
    a: "We ship pan India via reputed couriers. Standard delivery takes 4–7 business days. Orders above ₹999 qualify for free shipping.",
  },
  {
    q: "Can I return or exchange a product?",
    a: "We accept returns within 7 days of delivery for unopened items. Personalized items cannot be returned unless damaged.",
  },
  {
    q: "Are the materials safe for babies?",
    a: "Yes! All our nursery products use hypoallergenic fiber cotton and non-toxic, child-safe felt.",
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header */}
      <div className="bg-gradient-hero py-16 md:py-20 text-center relative overflow-hidden">
        <div className="absolute top-0 -left-16 w-64 h-64 rounded-full bg-brand-pink-light/40 blur-3xl" />
        <div className="absolute bottom-0 -right-16 w-80 h-80 rounded-full bg-brand-green-light/30 blur-3xl" />
        <div className="container-brand relative z-10">
          <span className="badge-pink text-xs font-semibold uppercase tracking-wider mb-4 inline-flex items-center gap-1.5 px-3 py-1 shadow-soft">
            <Mail className="w-3.5 h-3.5 text-brand-pink-dark" />
            Get in Touch
          </span>
          <h1 className="section-title text-4xl md:text-5xl mb-4">
            Contact Information
          </h1>
          <p className="section-subtitle max-w-lg mx-auto">
            Have questions about personalized names or our handcrafted products? Reach out to us directly!
          </p>
        </div>
      </div>

      <div className="container-brand py-12 md:py-16">
        {/* Contact Cards Grid */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Direct Contact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WhatsApp Direct */}
            <div className="bg-white rounded-3xl p-6 shadow-soft border border-brand-beige flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-emerald-600 fill-emerald-600" />
                </div>
                <h2 className="font-display font-semibold text-brand-brown text-xl mb-1">
                  WhatsApp Support
                </h2>
                <p className="text-brand-muted text-sm mb-4 leading-relaxed">
                  Chat directly with Pooja on WhatsApp for quick answers & personalized name assistance.
                </p>
                <p className="text-brand-brown font-semibold text-base mb-1">
                  +91 93102 61542
                </p>
                <p className="text-brand-muted text-xs">WhatsApp Only</p>
              </div>
              <a
                href="https://wa.me/919310261542"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6 justify-center bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-soft"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                Chat on WhatsApp
              </a>
            </div>

            {/* Email Contact */}
            <div className="bg-white rounded-3xl p-6 shadow-soft border border-brand-beige flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-pink-light flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-brand-pink-dark" />
                </div>
                <h2 className="font-display font-semibold text-brand-brown text-xl mb-1">
                  Direct Email
                </h2>
                <p className="text-brand-muted text-sm mb-4 leading-relaxed">
                  Send us an email for general inquiries, order status, or feedback.
                </p>
                <p className="text-brand-brown font-semibold text-base mb-1">
                  info@poojahandmadeart.in
                </p>
                <p className="text-brand-muted text-xs">Response within 24 hours</p>
              </div>
              <a
                href="mailto:info@poojahandmadeart.in"
                className="btn-secondary mt-6 justify-center"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </a>
            </div>
          </div>

          {/* Secondary Details Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Location */}
            <div className="bg-white rounded-3xl p-6 shadow-soft border border-brand-beige text-center">
              <div className="w-10 h-10 rounded-2xl bg-brand-cream-dark flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-5 h-5 text-brand-brown" />
              </div>
              <h3 className="font-display font-semibold text-brand-brown mb-1">
                Studio Location
              </h3>
              <p className="text-brand-brown text-sm font-medium">New Delhi, India</p>
              <p className="text-brand-muted text-xs mt-1">Pan India Shipping</p>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-3xl p-6 shadow-soft border border-brand-beige text-center">
              <div className="w-10 h-10 rounded-2xl bg-brand-pink-light flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-5 h-5 text-brand-pink-dark" />
              </div>
              <h3 className="font-display font-semibold text-brand-brown mb-2">
                Social Handles
              </h3>
              <div className="flex justify-center gap-3">
                <a
                  href="https://www.instagram.com/pooja_handmade_art/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-brand-pink-dark hover:underline"
                >
                  Instagram
                </a>
                <span className="text-brand-beige">•</span>
                <a
                  href="https://www.facebook.com/profile.php?id=61592498323352"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-brand-pink-dark hover:underline"
                >
                  Facebook
                </a>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-white rounded-3xl p-6 shadow-soft border border-brand-beige text-center">
              <div className="w-10 h-10 rounded-2xl bg-brand-green-light flex items-center justify-center mx-auto mb-3">
                <Phone className="w-5 h-5 text-brand-green-dark" />
              </div>
              <h3 className="font-display font-semibold text-brand-brown mb-1">
                Response Times
              </h3>
              <p className="text-brand-green-dark text-xs font-semibold">
                Mon - Fri: Within 4 hrs
              </p>
              <p className="text-brand-muted text-xs mt-0.5">Sat - Sun: Within 24 hrs</p>
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Got questions? Here are quick answers!</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-soft overflow-hidden border border-brand-beige/60"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={openFaq === index}
                >
                  <span className="font-semibold text-brand-brown text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-brand-muted shrink-0 transition-transform duration-300",
                      openFaq === index && "rotate-180"
                    )}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-brand-muted text-sm leading-relaxed animate-fade-in border-t border-brand-beige/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
