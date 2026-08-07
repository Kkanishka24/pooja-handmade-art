"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  badges?: React.ReactNode;
}

// Image loader component with skeleton
function ImageWithLoader({
  src,
  alt,
  fill,
  className,
  style,
  priority,
  sizes,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  sizes?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {/* Skeleton loader */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-brand-cream animate-pulse-soft z-10 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-brand-beige/50" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={cn(className, isLoading && "opacity-0", !isLoading && "opacity-100")}
        style={style}
        priority={priority}
        sizes={sizes}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
}

export default function ProductImageGallery({
  images,
  productName,
  badges,
}: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  const [mainRef, mainApi] = useEmblaCarousel({ loop: images.length > 1 });
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const hasMultiple = images.length > 1;

  // Keep carousel + thumbnails + selected index all in sync
  const onSelect = useCallback(() => {
    if (!mainApi) return;
    const index = mainApi.selectedScrollSnap();
    setSelectedIndex(index);
    thumbApi?.scrollTo(index);
  }, [mainApi, thumbApi]);

  useEffect(() => {
    if (!mainApi) return;
    mainApi.on("select", onSelect);
    mainApi.on("reInit", onSelect);
    mainApi.on("init", onSelect);
    return () => {
      mainApi.off("select", onSelect);
      mainApi.off("reInit", onSelect);
      mainApi.off("init", onSelect);
    };
  }, [mainApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      mainApi?.scrollTo(index);
    },
    [mainApi]
  );

  const scrollPrev = useCallback(() => mainApi?.scrollPrev(), [mainApi]);
  const scrollNext = useCallback(() => mainApi?.scrollNext(), [mainApi]);

  // Desktop hover-to-magnify handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin({ x, y });
  };

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") scrollPrev();
      if (e.key === "ArrowRight") scrollNext();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, scrollPrev, scrollNext]);

  const lightboxTouchStartX = useRef<number | null>(null);
  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    lightboxTouchStartX.current = e.touches[0].clientX;
  };
  const handleLightboxTouchEnd = (e: React.TouchEvent) => {
    if (lightboxTouchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - lightboxTouchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) scrollPrev();
      else scrollNext();
    }
    lightboxTouchStartX.current = null;
  };

  return (
    <div>
      {/* Main image + embla viewport */}
      <div
        className="relative rounded-4xl overflow-hidden bg-white shadow-card mb-4 aspect-square group cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onClick={() => setLightboxOpen(true)}
      >
        <div className="overflow-hidden h-full" ref={mainRef}>
          <div className="flex h-full">
            {images.map((img, i) => (
              <motion.div
                key={i}
                className="relative shrink-0 grow-0 basis-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <ImageWithLoader
                  src={img}
                  alt={`${productName} ${i + 1}`}
                  fill
                  className={cn(
                    "object-cover transition-transform duration-200 ease-out",
                    isZoomed && i === selectedIndex ? "scale-150" : "scale-100"
                  )}
                  style={
                    isZoomed && i === selectedIndex
                      ? {
                          transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
                        }
                      : undefined
                  }
                  priority={i === 0}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Zoom hint */}
        <div className="absolute bottom-4 right-4 bg-white/85 backdrop-blur-sm rounded-full p-2 shadow-soft opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <ZoomIn className="w-4 h-4 text-brand-brown" />
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {badges}
        </div>

        {/* Nav arrows */}
        {hasMultiple && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                scrollPrev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-soft hover:bg-white transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                scrollNext();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-soft hover:bg-white transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails - horizontally swipeable/draggable strip */}
      <div className="overflow-hidden" ref={thumbRef}>
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={cn(
                "relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink-dark focus-visible:ring-offset-2",
                "min-w-[44px] min-h-[44px]",
                i === selectedIndex
                  ? "border-brand-pink shadow-pink scale-105 ring-2 ring-brand-pink/30"
                  : "border-transparent hover:border-brand-pink-light hover:scale-102"
              )}
              aria-label={`View image ${i + 1} of ${images.length}`}
              aria-pressed={i === selectedIndex}
              role="tab"
            >
              <ImageWithLoader
                src={img}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
            onTouchStart={handleLightboxTouchStart}
            onTouchEnd={handleLightboxTouchEnd}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-5 right-5 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="Close fullscreen gallery"
            >
              <X className="w-5 h-5" />
            </button>

            {hasMultiple && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollPrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative w-[90vw] h-[80vh] max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedIndex]}
                alt={`${productName} ${selectedIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>

            {hasMultiple && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium tracking-wide">
                {selectedIndex + 1} / {images.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
