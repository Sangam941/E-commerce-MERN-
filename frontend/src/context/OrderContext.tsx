import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// 1. Define the types for our data
export interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  image: string;
  variantLabel?: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (items: OrderItem[], total: number) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  // read initial orders from localStorage so history survives refresh
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem("orders");
      return stored ? (JSON.parse(stored) as Order[]) : [];
    } catch {
      return [];
    }
  });

  // whenever orders change, persist them
  React.useEffect(() => {
    try {
      localStorage.setItem("orders", JSON.stringify(orders));
    } catch {
      // ignore write failures
    }
  }, [orders]);

  const addOrder = (items: OrderItem[], total: number) => {
    const newOrder: Order = {
      id:`ORD-${Date.now().toString(36).toUpperCase()}`, // Simple random ID
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      items: [...items], // Clone the items from the cart
      total,
    };

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

// Custom hook for easy access
export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}