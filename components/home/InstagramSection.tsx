import Image from "next/image";
import { instagramImages } from "@/lib/data";

export default function InstagramSection() {
  return (
    <section className="section-pad bg-brand-cream-dark">
      <div className="container-brand">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-brand-pink text-lg">📷</span>
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
              <div className="absolute inset-0 bg-brand-pink/0 group-hover:bg-brand-pink/30 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  📷
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex text-sm"
          >
            <span className="text-base">📷</span>
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
