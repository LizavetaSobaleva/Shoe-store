import { create } from "zustand";
import type { CartItem } from "../types";

interface CartState {
  items: CartItem[];
  setQuantity: (productId: number, quantity: number) => void;
  reset: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  setQuantity: (productId, quantity) =>
    set((state) => {
      const existing = state.items.find((i) => i.productId === productId);
      if (!existing && quantity <= 0) return state;
      const newItems = existing
        ? state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          )
        : [...state.items, { productId, quantity }];
      return { items: newItems.filter((i) => i.quantity > 0) };
    }),
  reset: () => set({ items: [] }),
}));
