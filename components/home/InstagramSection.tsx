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
    <section className="py-12 md:py-16 bg-brand-cream/60 border-t border-brand-brown/5">
      <div className="container-brand">
        <div className="text-center mb-8 md:mb-12">
          <a
            href="https://www.instagram.com/pooja_handmade_art/"
            target="_blank"
            rel="noopener noreferrer"
            className="badge-pink text-xs font-semibold uppercase tracking-wider mb-2.5 inline-flex items-center gap-1.5 px-3.5 py-1 shadow-soft hover:scale-105 transition-transform"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-brand-pink-dark" />
            @pooja_handmade_art
          </a>
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">Follow Our Journey</h2>
          <p className="section-subtitle text-xs sm:text-sm md:text-base mt-1">
            See our latest handcrafted creations & Behind-the-Scenes on Instagram
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3.5">
          {instagramImages.map((src, index) => (
            <a
              key={index}
              href="https://www.instagram.com/pooja_handmade_art/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-2xl overflow-hidden shadow-soft aspect-square border border-white/60"
              aria-label={`Instagram post ${index + 1}`}
            >
              <Image
                src={src}
                alt={`Pooja Handmade Art — Instagram ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-brand-brown/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                <InstagramIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-md" />
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://www.instagram.com/pooja_handmade_art/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-xs sm:text-sm py-3 px-6 inline-flex items-center gap-2 hover:bg-[#E4405F] hover:text-white hover:border-transparent transition-all shadow-soft"
          >
            <InstagramIcon className="w-4 h-4" />
            <span>Follow @pooja_handmade_art on Instagram</span>
          </a>
        </div>
      </div>
    </section>
  );
}
