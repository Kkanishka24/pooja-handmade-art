"use client";

import { useState } from "react";
import { Mail, Sparkles, ArrowRight, CheckCircle } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError("Something went wrong. Please try again.");
      return;
    }

    setAlreadySubscribed(data.already);
    setSubmitted(true);
  };

  return (
    <section className="section-pad relative overflow-hidden bg-gradient-to-br from-brand-pink-light via-brand-cream to-brand-green-light">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-brand-pink/20 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-brand-green/20 blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container-brand relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm shadow-pink flex items-center justify-center mx-auto mb-6">
            <Mail className="w-7 h-7 text-brand-pink" />
          </div>

          <span className="badge-pink text-xs font-semibold uppercase tracking-wider mb-4 inline-flex items-center gap-1.5 px-3 py-1 shadow-soft">
            <Sparkles className="w-3.5 h-3.5 text-brand-pink-dark" />
            Join Our Community
          </span>
          <h2 className="section-title mb-4">
            Get Handmade Updates in Your Inbox
          </h2>
          <p className="section-subtitle mb-8">
            Be the first to know about new arrivals, exclusive offers, and
            behind-the-scenes sneak peeks. No spam — only handmade goodness!
          </p>

          {submitted ? (
            <div className="flex items-center justify-center gap-3 py-4 px-6 bg-white/80 rounded-3xl shadow-soft">
              <CheckCircle className="w-6 h-6 text-brand-green-dark" />
              <p className="font-semibold text-brand-brown">
                {alreadySubscribed
                  ? "You&apos;re already subscribed! 🎉"
                  : "You're subscribed! Welcome to our handmade community 🎉"}
              </p>
            </div>
          ) : (
            <>
              {error && (
                <p className="text-red-500 text-sm mb-3">{error}</p>
              )}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  id="newsletter-email"
                  className="input-brand flex-1 shadow-soft"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary whitespace-nowrap shadow-pink"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-brand-brown/30 border-t-brand-brown rounded-full animate-spin" />
                      Subscribing...
                    </span>
                  ) : (
                    <>
                      Subscribe <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}

          <p className="text-brand-muted text-xs mt-4">
            By subscribing you agree to receive marketing emails. Unsubscribe
            anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
