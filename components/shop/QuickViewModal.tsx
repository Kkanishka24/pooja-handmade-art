"use client";

import Image from "next/image";
import { X, Star, ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

interface Props {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export default function QuickViewModal({
  product,
  open,
  onClose,
}: Props) {
  const addItem = useCartStore((s) => s.addItem);

  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <X />
        </button>

        <div className="grid md:grid-cols-2">

          <div className="relative h-96">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="p-8">

            <h2 className="text-2xl font-bold mb-3">
              {product.name}
            </h2>

            <div className="flex items-center gap-2 mb-4">
              <Star className="fill-yellow-400 text-yellow-400 w-5 h-5" />
              {product.rating}
            </div>

            <p className="text-brand-muted mb-6">
              {product.short_description}
            </p>

            <p className="text-3xl font-bold mb-6">
              {formatPrice(product.price)}
            </p>

            <button
              onClick={() => addItem(product)}
              className="btn-primary w-full"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}