import { Package, MessageCircle } from "lucide-react";

export default function OrderTrackingPage() {
  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header */}
      <div className="bg-gradient-hero py-16 text-center relative overflow-hidden">
        <div className="absolute top-0 -left-16 w-64 h-64 rounded-full bg-brand-pink-light/40 blur-3xl" />
        <div className="container-brand relative z-10">
          <span className="badge-pink text-xs font-semibold uppercase tracking-wider mb-4 inline-flex items-center gap-1.5 px-3 py-1 shadow-soft">
            <Package className="w-3.5 h-3.5 text-brand-pink-dark" />
            Track Your Order
          </span>
          <h1 className="section-title text-4xl mb-4">Where&apos;s My Order?</h1>
          <p className="section-subtitle max-w-md mx-auto">
            Stay updated on your handmade package every step of the way.
          </p>
        </div>
      </div>

      <div className="container-brand py-16">
        <div className="max-w-xl mx-auto">
          {/* Info Card */}
          <div className="bg-white rounded-3xl p-8 shadow-soft text-center space-y-6">
            <div className="w-16 h-16 bg-brand-pink-light rounded-full flex items-center justify-center mx-auto">
              <MessageCircle className="w-8 h-8 text-brand-pink-dark" />
            </div>

            <div className="space-y-3">
              <h2 className="font-display font-bold text-brand-brown text-2xl">
                Track via WhatsApp
              </h2>
              <p className="text-brand-brown-light text-sm leading-relaxed max-w-sm mx-auto">
                Your <strong className="text-brand-brown">Order ID</strong> and
                registered <strong className="text-brand-brown">phone number</strong> are
                shared with you via WhatsApp at the time of order confirmation.
                Kindly refer to that message to track the current status of your
                shipment.
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-brand-beige/60" />

            {/* Note box */}
            <div className="bg-brand-cream rounded-2xl px-5 py-4 text-left space-y-2">
              <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
                📌 Please Note
              </p>
              <ul className="text-sm text-brand-brown-light space-y-1.5 list-disc list-inside leading-relaxed">
                <li>
                  Your Order ID is sent to you on WhatsApp immediately after
                  your order is confirmed.
                </li>
                <li>
                  Use the Order ID provided in the WhatsApp message to track
                  your shipment.
                </li>
                <li>
                  For any queries, please contact us directly via WhatsApp or
                  the contact page.
                </li>
              </ul>
            </div>

            {/* CTA */}
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full justify-center py-3.5 bg-emerald-500 hover:bg-emerald-600 border-none text-white shadow-soft inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              Track My Order on WhatsApp
            </a>

            <p className="text-xs text-brand-muted">
              Need further assistance?{" "}
              <a href="/contact" className="text-brand-pink font-semibold hover:underline">
                Contact Us
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
