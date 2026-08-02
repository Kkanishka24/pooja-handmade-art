"use client";

import { cn } from "@/lib/utils";

interface ProductCardSkeletonProps {
  className?: string;
}

export default function ProductCardSkeleton({ className }: ProductCardSkeletonProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-3xl overflow-hidden shadow-soft animate-pulse flex flex-col h-full border border-brand-beige/50",
        className
      )}
      aria-hidden="true"
    >
      {/* Image placeholder */}
      <div className="bg-brand-cream-dark h-56 md:h-64 w-full relative">
        <div className="absolute top-3 left-3 w-16 h-5 rounded-full bg-brand-beige/60" />
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-brand-beige/60" />
      </div>

      {/* Info placeholder */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Category */}
          <div className="h-3 w-20 bg-brand-beige/60 rounded-md" />
          {/* Title lines */}
          <div className="h-4 w-5/6 bg-brand-beige/80 rounded-md" />
          <div className="h-4 w-3/4 bg-brand-beige/80 rounded-md" />
        </div>

        {/* Rating stars placeholder */}
        <div className="flex items-center gap-1">
          <div className="h-3 w-16 bg-brand-beige/60 rounded-md" />
          <div className="h-3 w-8 bg-brand-beige/40 rounded-md" />
        </div>

        {/* Price & CTA placeholder */}
        <div className="pt-2 flex items-center justify-between">
          <div className="h-5 w-24 bg-brand-beige/80 rounded-md" />
          <div className="h-8 w-24 bg-brand-pink-light/60 rounded-full" />
        </div>
      </div>
    </div>
  );
}
