import {
  Truck,
  Clock,
  MapPin,
  Navigation,
  AlertTriangle,
  PackageOpen,
  RefreshCcw,
  Globe,
  MessageCircle,
  Package,
} from "lucide-react";

const sections = [
  {
    icon: Truck,
    number: "1",
    title: "Shipping Charges",
    color: "bg-brand-pink-light",
    iconColor: "text-brand-pink-dark",
    content: (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
          <div className="bg-brand-cream rounded-2xl px-4 py-3 flex items-center gap-3">
            <span className="text-2xl">📦</span>
            <div>
              <p className="text-xs text-brand-muted font-semibold uppercase tracking-wider">
                Below ₹1,499
              </p>
              <p className="text-brand-brown font-bold text-sm mt-0.5">
                Shipping fee of ₹199
              </p>
            </div>
          </div>
          <div className="bg-brand-green-light/60 rounded-2xl px-4 py-3 flex items-center gap-3 border border-brand-green/20">
            <span className="text-2xl">🎉</span>
            <div>
              <p className="text-xs text-brand-muted font-semibold uppercase tracking-wider">
                ₹1,499 &amp; above
              </p>
              <p className="text-brand-green-dark font-bold text-sm mt-0.5">
                Free Shipping
              </p>
            </div>
          </div>
        </div>
        <p className="text-brand-brown-light text-sm leading-relaxed mt-3">
          Shipping charges are calculated based on the final order value.
        </p>
      </>
    ),
  },
  {
    icon: Clock,
    number: "2",
    title: "Order Processing",
    color: "bg-brand-lavender",
    iconColor: "text-purple-600",
    content: (
      <>
        <p className="text-brand-brown-light text-sm leading-relaxed">
          Orders are usually processed and dispatched within{" "}
          <strong className="text-brand-brown">2–5 business days</strong> after
          the order is confirmed.
        </p>
        <p className="text-brand-brown-light text-sm leading-relaxed mt-2">
          Since our products are handmade, some orders may require a little
          extra time to prepare. If there is any unexpected delay, we will keep
          you informed.
        </p>
      </>
    ),
  },
  {
    icon: MapPin,
    number: "3",
    title: "Delivery Time",
    color: "bg-brand-cream",
    iconColor: "text-brand-brown",
    content: (
      <>
        <p className="text-brand-brown-light text-sm leading-relaxed">
          Once your order has been dispatched, delivery usually takes
          approximately{" "}
          <strong className="text-brand-brown">3–7 business days</strong>,
          depending on your location and courier service.
        </p>
        <p className="text-brand-brown-light text-sm leading-relaxed mt-2">
          Remote or hard-to-reach locations may require additional delivery
          time.
        </p>
      </>
    ),
  },
  {
    icon: Navigation,
    number: "4",
    title: "Tracking",
    color: "bg-blue-50",
    iconColor: "text-blue-500",
    content: (
      <p className="text-brand-brown-light text-sm leading-relaxed">
        Once your order is shipped, you will receive a{" "}
        <strong className="text-brand-brown">tracking number / link</strong>{" "}
        where available. You can use it to track the progress of your shipment.
      </p>
    ),
  },
  {
    icon: MapPin,
    number: "5",
    title: "Incorrect Address",
    color: "bg-amber-50",
    iconColor: "text-amber-500",
    content: (
      <>
        <p className="text-brand-brown-light text-sm leading-relaxed">
          Please make sure your shipping address, phone number, and PIN code are
          correct before placing your order.
        </p>
        <p className="text-brand-brown-light text-sm leading-relaxed mt-2">
          We are not responsible for delays, failed deliveries, or additional
          shipping charges caused by an incorrect or incomplete address provided
          by the customer.
        </p>
      </>
    ),
  },
  {
    icon: AlertTriangle,
    number: "6",
    title: "Delayed or Lost Shipments",
    color: "bg-red-50",
    iconColor: "text-red-400",
    content: (
      <>
        <p className="text-brand-brown-light text-sm leading-relaxed">
          Delivery timelines are estimates and may occasionally be affected by
          weather, holidays, courier delays, strikes, or other circumstances
          beyond our control.
        </p>
        <p className="text-brand-brown-light text-sm leading-relaxed mt-2">
          If your order appears to be significantly delayed or lost in transit,
          please contact us and we will coordinate with the courier to help
          resolve the issue.
        </p>
      </>
    ),
  },
  {
    icon: PackageOpen,
    number: "7",
    title: "Damaged Package",
    color: "bg-brand-pink-light",
    iconColor: "text-brand-pink-dark",
    content: (
      <>
        <p className="text-brand-brown-light text-sm leading-relaxed">
          If your package arrives visibly damaged, please take clear
          photographs/videos of the package{" "}
          <strong className="text-brand-brown">before opening it</strong> and
          contact us within{" "}
          <strong className="text-brand-brown">48 hours of delivery</strong>.
        </p>
        <p className="text-brand-brown-light text-sm leading-relaxed mt-2">
          For more information, please refer to our{" "}
          <a
            href="/returns"
            className="text-brand-pink font-semibold hover:underline"
          >
            Return &amp; Replacement Policy
          </a>
          .
        </p>
      </>
    ),
  },
  {
    icon: RefreshCcw,
    number: "8",
    title: "Delivery Attempts",
    color: "bg-brand-green-light",
    iconColor: "text-brand-green-dark",
    content: (
      <>
        <p className="text-brand-brown-light text-sm leading-relaxed">
          The courier may make multiple delivery attempts. Please ensure that
          someone is available to receive the package and that your phone number
          is reachable.
        </p>
        <p className="text-brand-brown-light text-sm leading-relaxed mt-2">
          If an order is returned to us because of repeated failed delivery
          attempts or an incorrect address, additional shipping charges may apply
          for re-shipping.
        </p>
      </>
    ),
  },
  {
    icon: Globe,
    number: "9",
    title: "International Shipping",
    color: "bg-brand-lavender",
    iconColor: "text-purple-600",
    content: (
      <p className="text-brand-brown-light text-sm leading-relaxed">
        At present, we ship{" "}
        <strong className="text-brand-brown">within India only</strong>.
        International shipping may be introduced in the future.
      </p>
    ),
  },
  {
    icon: MessageCircle,
    number: "10",
    title: "Contact Us",
    color: "bg-emerald-50",
    iconColor: "text-emerald-600",
    content: (
      <>
        <p className="text-brand-brown-light text-sm leading-relaxed">
          For any questions regarding your order or shipment, please contact us
          with your{" "}
          <strong className="text-brand-brown">order number</strong> and
          registered contact details.
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

export default function ShippingPolicyPage() {
  return (
    <div className="bg-brand-cream min-h-screen">
      {/* Header */}
      <div className="bg-gradient-hero py-16 text-center relative overflow-hidden">
        <div className="absolute top-0 -left-16 w-64 h-64 rounded-full bg-brand-pink-light/40 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-brand-lavender/30 blur-3xl" />
        <div className="container-brand relative z-10">
          <span className="badge-pink text-xs font-semibold uppercase tracking-wider mb-4 inline-flex items-center gap-1.5 px-3 py-1 shadow-soft">
            <Package className="w-3.5 h-3.5 text-brand-pink-dark" />
            Policies
          </span>
          <h1 className="section-title text-4xl mb-4">Shipping Policy</h1>
          <p className="section-subtitle max-w-lg mx-auto">
            We carefully pack every order by hand to make sure your products
            reach you safely and beautifully. ♡
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
              Thank you for supporting our handmade small business.{" "}
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
