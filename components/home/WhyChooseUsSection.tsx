import { Award, Palette, Truck, RefreshCw } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Washable",
    color: "bg-emerald-50 border-emerald-100",
    iconColor: "text-emerald-700",
  },
  {
    icon: Palette,
    title: "Personalised Name",
    color: "bg-rose-50 border-rose-100",
    iconColor: "text-rose-700",
  },
  {
    icon: Truck,
    title: "Pan India Shipping",
    color: "bg-purple-50 border-purple-100",
    iconColor: "text-purple-700",
  },
  {
    icon: RefreshCw,
    title: "Easy 7-Day Returns",
    color: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-700",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-6 md:py-8 bg-brand-cream/80 border-y border-brand-brown/10">
      <div className="container-brand">
        {/* Features Grid: 2 columns on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-white/90 border border-brand-brown/8 shadow-soft hover:shadow-card hover:-translate-y-0.5 transition-all duration-300"
            >
              <div
                className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl ${feature.color} border flex items-center justify-center shrink-0 shadow-xs`}
              >
                <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
              </div>
              <span className="font-display font-medium text-brand-brown text-xs sm:text-sm md:text-base leading-snug">
                {feature.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


