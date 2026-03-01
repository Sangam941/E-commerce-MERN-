import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { CartLine } from "../data/customerDummy";

interface CartContextType {
  cart: CartLine[];
  addToCart: (item: CartLine) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);

  const addToCart = (item: CartLine) => {
    setCart((prev) => {
      const exists = prev.find((x) => x.id === item.id || x.productId === item.productId);
      if (exists) {
        return prev.map((x) =>
          x.id === exists.id || x.productId === exists.productId ? { ...x, qty: x.qty + item.qty } : x,
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => setCart((prev) => prev.filter((x) => x.id !== id));

  const updateQty = (id: string, qty: number) =>
    setCart((prev) => prev.map((x) => (x.id === id ? { ...x, qty } : x)));

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
