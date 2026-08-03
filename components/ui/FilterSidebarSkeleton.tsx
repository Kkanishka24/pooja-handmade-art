"use client";

export default function FilterSidebarSkeleton() {
  return (
    <div
      className="bg-white rounded-3xl p-6 shadow-soft space-y-6 animate-pulse border border-brand-beige/50"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between pb-2 border-b border-brand-beige/40">
        <div className="h-5 w-24 bg-brand-beige/80 rounded-md" />
        <div className="h-4 w-12 bg-brand-beige/50 rounded-md" />
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <div className="h-3 w-16 bg-brand-beige/60 rounded-md mb-3" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-8 w-full bg-brand-cream rounded-xl" />
        ))}
      </div>

      {/* Price Range */}
      <div className="space-y-2 pt-2">
        <div className="h-3 w-20 bg-brand-beige/60 rounded-md mb-3" />
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-8 w-full bg-brand-cream rounded-xl" />
        ))}
      </div>

      {/* Tags */}
      <div className="space-y-2 pt-2">
        <div className="h-3 w-24 bg-brand-beige/60 rounded-md mb-3" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-6 w-16 bg-brand-cream rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
