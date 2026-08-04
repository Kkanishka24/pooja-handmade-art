export default function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-soft animate-pulse">
      {/* Image */}
      <div className="h-64 bg-brand-beige" />

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <div className="h-3 w-20 rounded bg-brand-beige mb-3" />

        {/* Title */}
        <div className="space-y-2 mb-4">
          <div className="h-4 w-3/4 rounded bg-brand-beige" />
          <div className="h-4 w-1/2 rounded bg-brand-beige" />
        </div>

        {/* Rating */}
        <div className="flex gap-1 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-brand-beige"
            />
          ))}
        </div>

        {/* Price */}
        <div className="h-6 w-24 rounded bg-brand-beige mb-4" />

        {/* Button */}
        <div className="h-10 rounded-xl bg-brand-beige" />
      </div>
    </div>
  );
}