"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        set((state) => ({
          items: state.items.find((p) => p.id === product.id)
            ? state.items
            : [...state.items, product],
        }));
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((p) => p.id !== productId),
        }));
      },

      toggleItem: (product) => {
        const { isWishlisted, addItem, removeItem } = get();
        if (isWishlisted(product.id)) {
          removeItem(product.id);
        } else {
          addItem(product);
        }
      },

      isWishlisted: (productId) => {
        return get().items.some((p) => p.id === productId);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: "pooja-wishlist",
      skipHydration: true,
    }
  )
);
