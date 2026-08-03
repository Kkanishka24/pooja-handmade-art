import Image from "next/image";
import { instagramImages } from "@/lib/data";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function InstagramSection() {
  return (
    <section className="section-pad bg-brand-cream-dark">
      <div className="container-brand">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <InstagramIcon className="w-5 h-5 text-brand-pink-dark" />
            <span className="badge-pink text-xs font-semibold uppercase tracking-wider">
              @poojahandmadeart
            </span>
          </div>
          <h2 className="section-title">Follow Our Journey</h2>
          <p className="section-subtitle">
            See our latest creations on Instagram
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {instagramImages.map((src, index) => (
            <a
              key={index}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden shadow-soft aspect-square"
              aria-label={`Instagram post ${index + 1}`}
            >
              <Image
                src={src}
                alt={`Pooja Handmade Art — Instagram ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-brown/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <InstagramIcon className="w-7 h-7 text-white" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex text-sm items-center gap-2 hover:bg-[#E4405F] hover:text-white hover:border-transparent transition-all"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}
