"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number, color?: string, customName?: string) => void;
  removeItem: (productId: string, customName?: string) => void;
  updateQuantity: (productId: string, quantity: number, customName?: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getShipping: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1, color, customName) => {
        set((state) => {
          const existing = state.items.find(
            (item) =>
              item.product.id === product.id &&
              (item.customName || "") === (customName || "") &&
              (item.selectedColor || "") === (color || "")
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id &&
                (item.customName || "") === (customName || "") &&
                (item.selectedColor || "") === (color || "")
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { product, quantity, selectedColor: color, customName },
            ],
          };
        });
      },

      removeItem: (productId, customName) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                (customName === undefined || item.customName === customName)
              )
          ),
        }));
      },

      updateQuantity: (productId, quantity, customName) => {
        if (quantity <= 0) {
          get().removeItem(productId, customName);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            (customName === undefined || item.customName === customName)
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getShipping: () => {
        const subtotal = get().getSubtotal();
        return subtotal >= 999 ? 0 : 79;
      },

      getTotal: () => {
        return get().getSubtotal() + get().getShipping();
      },
    }),
    {
      name: "pooja-cart",
    }
  )
);
