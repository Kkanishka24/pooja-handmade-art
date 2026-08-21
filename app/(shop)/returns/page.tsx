import {
  ShieldCheck,
  PackageX,
  RefreshCcw,
  XCircle,
  Brush,
  AlertTriangle,
  Wallet,
  ClipboardX,
  MessageCircle,
} from "lucide-react";

const sections = [
  {
    icon: ShieldCheck,
    number: "1",
    title: "Damaged or Defective Products",
    color: "bg-brand-pink-light",
    iconColor: "text-brand-pink-dark",
    content: (
      <>
        <p className="text-brand-brown-light text-sm leading-relaxed">
          If your product arrives damaged, defective, or with any major issue,
          please contact us within{" "}
          <strong className="text-brand-brown">48 hours of delivery</strong>.
        </p>
        <p className="text-brand-brown text-sm font-semibold mt-3 mb-1.5">
          Please share:
        </p>
        <ul className="list-disc list-inside text-brand-brown-light text-sm space-y-1 leading-relaxed">
          <li>Your order number</li>
          <li>Clear photos/videos of the product</li>
          <li>Photos of the packaging</li>
          <li>An unboxing video, if available</li>
        </ul>
        <p className="text-brand-brown-light text-sm leading-relaxed mt-3">
          After verification, we will arrange a{" "}
          <strong className="text-brand-brown">
            replacement at no additional cost
          </strong>
          . If a replacement is not available, we will provide a refund for the
          eligible product.
        </p>
      </>
    ),
  },
  {
    icon: RefreshCcw,
    number: "2",
    title: "Wrong Product Received",
    color: "bg-brand-lavender",
    iconColor: "text-purple-600",
    content: (
      <p className="text-brand-brown-light text-sm leading-relaxed">
        If you receive a product different from what you ordered, please contact
        us within{" "}
        <strong className="text-brand-brown">48 hours of delivery</strong>. We
        will arrange a replacement with the correct product at no additional
        cost.
      </p>
    ),
  },
  {
    icon: XCircle,
    number: "3",
    title: "Change of Mind",
    color: "bg-red-50",
    iconColor: "text-red-400",
    content: (
      <p className="text-brand-brown-light text-sm leading-relaxed">
        As our products are handmade especially for our customers, we{" "}
        <strong className="text-brand-brown">
          do not accept returns or refunds for change of mind, personal
          preference, or simply not liking the product after delivery
        </strong>
        .
      </p>
    ),
  },
  {
    icon: Brush,
    number: "4",
    title: "Handmade Variations",
    color: "bg-brand-cream",
    iconColor: "text-brand-brown",
    content: (
      <>
        <p className="text-brand-brown-light text-sm leading-relaxed">
          Each product is handmade and therefore may have slight variations in:
        </p>
        <ul className="list-disc list-inside text-brand-brown-light text-sm space-y-1 mt-2 leading-relaxed">
          <li>Colour</li>
          <li>Stitching</li>
          <li>Bead placement</li>
          <li>Size</li>
          <li>Pattern or finish</li>
        </ul>
        <p className="text-brand-brown-light text-sm leading-relaxed mt-3">
          These small differences are a natural part of handmade products and
          are{" "}
          <strong className="text-brand-brown">not considered defects</strong>.
        </p>
      </>
    ),
  },
  {
    icon: AlertTriangle,
    number: "5",
    title: "Customer-Caused Damage",
    color: "bg-amber-50",
    iconColor: "text-amber-500",
    content: (
      <p className="text-brand-brown-light text-sm leading-relaxed">
        Returns or replacements will not be accepted for damage caused after
        delivery due to improper handling, washing, alteration, misuse, or
        normal wear and tear.
      </p>
    ),
  },
  {
    icon: Wallet,
    number: "6",
    title: "Refunds",
    color: "bg-brand-green-light",
    iconColor: "text-brand-green-dark",
    content: (
      <p className="text-brand-brown-light text-sm leading-relaxed">
        If a refund is approved, it will be processed to the original payment
        method. Refund processing time may vary depending on your payment
        provider or bank.
      </p>
    ),
  },
  {
    icon: ClipboardX,
    number: "7",
    title: "Order Cancellation",
    color: "bg-brand-pink-light",
    iconColor: "text-brand-pink-dark",
    content: (
      <p className="text-brand-brown-light text-sm leading-relaxed">
        Orders can be cancelled only{" "}
        <strong className="text-brand-brown">before they are dispatched</strong>
        . Once an order has been shipped, cancellation may no longer be
        possible.
      </p>
    ),
  },
  {
    icon: MessageCircle,
    number: "8",
    title: "Contact Us",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
    content: (
      <>
        <p className="text-brand-brown-light text-sm leading-relaxed">
          For any return or replacement request, please contact us with your{" "}
          <strong className="text-brand-brown">
            order number and details of the issue
          </strong>{" "}
          within <strong className="text-brand-brown">48 hours of delivery</strong>.
        </p>
        <a
          href="https://wa.me/919310261542"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors duration-200 shadow-soft"
        >
          <MessageCircle className="w-4 h-4" />
          Contact on WhatsApp
        </a>
      </>
    ),
  },
];

export default function ReturnPolicyPage() {
  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header */}
      <div className="bg-gradient-hero py-16 text-center relative overflow-hidden">
        <div className="absolute top-0 -left-16 w-64 h-64 rounded-full bg-brand-pink-light/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-brand-lavender/30 blur-3xl" />
        <div className="container-brand relative z-10">
          <span className="badge-pink text-xs font-semibold uppercase tracking-wider mb-4 inline-flex items-center gap-1.5 px-3 py-1 shadow-soft">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-pink-dark" />
            Policies
          </span>
          <h1 className="section-title text-4xl mb-4">
            Return &amp; Replacement Policy
          </h1>
          <p className="section-subtitle max-w-lg mx-auto">
            We want you to be happy with your purchase. Since our products are
            handmade with care, we follow a simple and fair return and
            replacement policy.
          </p>
        </div>
      </div>

      <div className="container-brand py-14">
        <div className="max-w-3xl mx-auto space-y-5">
          {sections.map(({ icon: Icon, number, title, color, iconColor, content }) => (
            <div
              key={number}
              className="bg-white rounded-3xl p-6 shadow-soft border border-brand-beige/40"
            >
              <div className="flex items-start gap-4">
                {/* Icon Badge */}
                <div
                  className={`w-10 h-10 rounded-2xl ${color} flex items-center justify-center shrink-0 mt-0.5`}
                >
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-brand-muted uppercase tracking-wider">
                      {number}.
                    </span>
                    <h2 className="font-display font-bold text-brand-brown text-base">
                      {title}
                    </h2>
                  </div>
                  {content}
                </div>
              </div>
            </div>
          ))}

          {/* Footer note */}
          <div className="bg-brand-pink-light rounded-3xl p-6 text-center border border-brand-pink/20">
            <p className="text-brand-brown text-sm leading-relaxed">
              We carefully inspect and pack every handmade product before
              shipping to make sure it reaches you safely.{" "}
              <span className="text-brand-pink">♡</span>
            </p>
          </div>

          {/* Last updated */}
          <p className="text-center text-xs text-brand-muted pt-2">
            Last updated: August 2026
          </p>
        </div>
      </div>
    </div>
  );
}
