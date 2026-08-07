import { Shield, Truck, Palette, Award, Heart, RefreshCw, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Made with Love",
    description:
      "Every single piece is hand-stitched by Pooja with genuine care and attention to detail.",
    color: "bg-brand-pink-light",
    iconColor: "text-brand-pink-dark",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "We use only the finest felt fabric and hypoallergenic fiber cotton for every product.",
    color: "bg-brand-green-light",
    iconColor: "text-brand-green-dark",
  },
  {
    icon: Palette,
    title: "Custom Orders",
    description:
      "Want a personalized piece? We love creating bespoke crafts tailored just for you.",
    color: "bg-brand-terracotta-light",
    iconColor: "text-brand-terracotta",
  },
  {
    icon: Truck,
    title: "Pan India Shipping",
    description:
      "Fast and secure delivery across India. Free shipping on orders above ₹999.",
    color: "bg-brand-lavender",
    iconColor: "text-purple-600",
  },
  {
    icon: Shield,
    title: "Secure Packaging",
    description:
      "Every order is carefully packed with tissue, gift notes, and eco-friendly materials.",
    color: "bg-brand-yellow",
    iconColor: "text-amber-600",
  },
  {
    icon: RefreshCw,
    title: "Easy Returns",
    description:
      "Not happy? We offer hassle-free returns within 7 days of delivery.",
    color: "bg-brand-cream-dark",
    iconColor: "text-brand-muted",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="section-pad bg-brand-cream">
      <div className="container-brand">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="badge-green text-xs font-semibold uppercase tracking-wider mb-3 inline-flex items-center gap-1.5 px-3 py-1 shadow-soft">
            <HeartHandshake className="w-3.5 h-3.5 text-brand-green-dark" />
            Why We Stand Out
          </span>
          <h2 className="section-title">Why Choose Pooja Handmade Art?</h2>
          <p className="section-subtitle max-w-xl mx-auto">
            We put our heart and soul into every stitch — here&apos;s what makes us
            different
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group card-soft hover:shadow-card transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`w-12 h-12 rounded-2xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>
              <h3 className="font-display font-semibold text-brand-brown text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-brand-muted text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
