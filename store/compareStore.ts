import { create } from "zustand";
import { Product } from "@/types";

interface CompareState {
  items: Product[];
  add: (product: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
  exists: (id: string) => boolean;
}

export const useCompareStore = create<CompareState>((set, get) => ({
  items: [],

  add: (product) => {
    const items = get().items;

    if (items.find((p) => p.id === product.id)) return;

    if (items.length >= 3) return;

    set({
      items: [...items, product],
    });
  },

  remove: (id) =>
    set({
      items: get().items.filter((p) => p.id !== id),
    }),

  clear: () => set({ items: [] }),

  exists: (id) => !!get().items.find((p) => p.id === id),
}));