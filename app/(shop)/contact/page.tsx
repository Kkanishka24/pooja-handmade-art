"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle,
  ChevronDown,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type ContactForm = z.infer<typeof contactSchema>;

const faqs = [
  {
    q: "Do you accept custom orders?",
    a: "Absolutely! Custom orders are our specialty. You can reach out via WhatsApp or the contact form with your requirements — colors, sizes, and personalization. We love bringing your vision to life!",
  },
  {
    q: "How long does it take to make a custom order?",
    a: "Custom orders typically take 5–10 business days depending on complexity. We'll provide an exact timeline when you place the order.",
  },
  {
    q: "What is your shipping policy?",
    a: "We ship pan India via reputed couriers. Standard delivery takes 4–7 business days. Orders above ₹999 qualify for free shipping. Express delivery is available at extra cost.",
  },
  {
    q: "Can I return or exchange a product?",
    a: "We accept returns within 7 days of delivery for unopened products in original packaging. Custom and personalized items cannot be returned unless defective.",
  },
  {
    q: "Are the materials safe for babies?",
    a: "Yes! All our nursery products use hypoallergenic fiber cotton and non-toxic, child-safe felt. We take extra care with products meant for little ones.",
  },
  {
    q: "Do you offer bulk or corporate orders?",
    a: "Yes, we love bulk orders for weddings, baby showers, corporate gifting, and events. Contact us for special pricing on orders of 20+ pieces.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-brand-cream">
      {/* Header */}
      <div className="bg-gradient-hero py-16 md:py-24 text-center relative overflow-hidden">
        <div className="absolute top-0 -left-16 w-64 h-64 rounded-full bg-brand-pink-light/40 blur-3xl" />
        <div className="absolute bottom-0 -right-16 w-80 h-80 rounded-full bg-brand-green-light/30 blur-3xl" />
        <div className="container-brand relative z-10">
          <span className="badge-pink text-xs font-semibold uppercase tracking-wider mb-4 inline-flex items-center gap-1.5 px-3 py-1 shadow-soft">
            <Mail className="w-3.5 h-3.5 text-brand-pink-dark" />
            Get in Touch
          </span>
          <h1 className="section-title text-4xl md:text-5xl mb-4">
            We&apos;d Love to Hear from You
          </h1>
          <p className="section-subtitle max-w-lg mx-auto">
            Questions, custom orders, or just want to say hi? We respond within
            24 hours!
          </p>
        </div>
      </div>

      <div className="container-brand py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch">
          {/* Contact Info */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="bg-white rounded-3xl p-6 shadow-soft">
              <h2 className="font-display font-semibold text-brand-brown text-xl mb-5">
                Contact Details
              </h2>
              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "hello@poojahandmadeart.in",
                    href: "mailto:hello@poojahandmadeart.in",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+91 98765 43210",
                    href: "tel:+919876543210",
                  },
                  {
                    icon: MessageCircle,
                    label: "WhatsApp",
                    value: "Chat with us",
                    href: "https://wa.me/919876543210",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Mumbai, Maharashtra, India",
                    href: null,
                  },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-pink-light flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-brand-pink-dark" />
                    </div>
                    <div>
                      <p className="text-xs text-brand-muted font-semibold uppercase tracking-wider">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="text-brand-brown text-sm font-medium hover:text-brand-pink transition-colors"
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-brand-brown text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="bg-white rounded-3xl p-6 shadow-soft">
              <h3 className="font-display font-semibold text-brand-brown mb-4">
                Follow Us
              </h3>
              <div className="flex gap-3">
                {[
                  {
                    icon: (props: React.SVGProps<SVGSVGElement>) => (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    ),
                    href: "https://instagram.com",
                    label: "Instagram",
                    hoverStyle: "hover:bg-[#E4405F] hover:text-white border-transparent",
                  },
                  {
                    icon: (props: React.SVGProps<SVGSVGElement>) => (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    ),
                    href: "https://facebook.com",
                    label: "Facebook",
                    hoverStyle: "hover:bg-[#1877F2] hover:text-white border-transparent",
                  },
                ].map(({ icon: Icon, href, label, hoverStyle }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl bg-brand-cream border border-brand-beige text-brand-brown font-semibold text-sm transition-all duration-200 ${hoverStyle} shadow-soft`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Business hours */}
            <div className="bg-white rounded-3xl p-6 shadow-soft">
              <h3 className="font-display font-semibold text-brand-brown mb-4">
                Response Time
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  { day: "Mon – Fri", time: "Within 4 hours" },
                  { day: "Saturday", time: "Within 8 hours" },
                  { day: "Sunday", time: "Within 24 hours" },
                ].map(({ day, time }) => (
                  <div key={day} className="flex justify-between">
                    <span className="text-brand-muted">{day}</span>
                    <span className="text-brand-green-dark font-medium">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-soft h-full flex flex-col justify-between">
              {submitted ? (
                <div className="text-center py-12 flex-1 flex flex-col justify-center items-center">
                  <div className="w-20 h-20 rounded-full bg-brand-green-light flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-9 h-9 text-brand-green-dark" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-brand-brown mb-2">
                    Message Sent! 🎉
                  </h3>
                  <p className="text-brand-muted max-w-sm">
                    Thank you for reaching out! We&apos;ll get back to you within 24
                    hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-secondary mt-6 text-sm"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  <h2 className="font-display font-semibold text-brand-brown text-2xl mb-6 shrink-0">
                    Send a Message
                  </h2>
                  <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
                    <div className="space-y-5 flex-1 flex flex-col">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 shrink-0">
                        <div>
                          <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                            Your Name *
                          </label>
                          <input
                            {...register("name")}
                            placeholder="Priya Sharma"
                            id="contact-name"
                            className="input-brand"
                          />
                          {errors.name && (
                            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                          )}
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                            Email Address *
                          </label>
                          <input
                            {...register("email")}
                            type="email"
                            placeholder="you@example.com"
                            id="contact-email"
                            className="input-brand"
                          />
                          {errors.email && (
                            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0">
                        <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                          Subject *
                        </label>
                        <select
                          {...register("subject")}
                          id="contact-subject"
                          className="input-brand cursor-pointer bg-white"
                        >
                          <option value="">Select a subject...</option>
                          <option value="custom-order">Custom Order Inquiry</option>
                          <option value="product-query">Product Question</option>
                          <option value="order-issue">Order Issue</option>
                          <option value="bulk-order">Bulk / Corporate Order</option>
                          <option value="general">General Inquiry</option>
                        </select>
                        {errors.subject && (
                          <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1.5 block">
                          Message *
                        </label>
                        <textarea
                          {...register("message")}
                          rows={8}
                          placeholder="Tell us what you need — we're happy to help!"
                          id="contact-message"
                          className="input-brand resize-none"
                        />
                        {errors.message && (
                          <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      id="contact-submit"
                      className="btn-primary w-full justify-center py-4 text-base shadow-pink mt-2.5"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-16">
          <div className="text-center mb-10">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Can&apos;t find your answer? Just ask us!</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-soft overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                  aria-expanded={openFaq === index}
                >
                  <span className="font-semibold text-brand-brown">{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-brand-muted shrink-0 transition-transform duration-300",
                      openFaq === index && "rotate-180"
                    )}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-brand-muted text-sm leading-relaxed animate-fade-in">
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
