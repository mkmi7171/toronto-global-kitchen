
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type CartItem = {
  title: string;
  image: string;
  price: number;
  quantity: number;
}

type CartState = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (title: string) => void;
  increment: (title: string) => void;
  decrement: (title: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (item) =>
        set((state) => {
          const exists = state.items.find((i) => i.title === item.title);
          if (exists) {
            return {
              items: state.items.map((i) =>
                i.title === item.title ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          } else {
            return {
              items: [...state.items, { ...item, quantity: 1 }],
            };
          }
        }),
      increment: (title) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.title === title ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),
      decrement: (title) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.title === title
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),
      removeFromCart: (title) =>
        set((state) => ({
          items: state.items.filter((item) => item.title !== title),
        })),
    }),
    {
      name: 'cart-storage',
    }
  )
);
