"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type CartItem = {
  id: String; // Can be ProductId or variant ID
  name: string;
  price: number;
  image: string;
  quantity: number;
};

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem, e?: React.MouseEvent) => void;
  removeFromCart: (id: String) => void;
  updateQuantity: (id: String, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem("lyke_cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from local storage", error);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("lyke_cart", JSON.stringify(items));
    }
  }, [items, isMounted]);

  // Fly Animation State
  const [flyingItems, setFlyingItems] = useState<{ id: number; x: number; y: number; image: string }[]>([]);

  const addToCart = (newItem: CartItem, e?: React.MouseEvent) => {
    // Trigger flying animation if event and image are provided
    if (e && newItem.image) {
      const id = Date.now();
      setFlyingItems((prev) => [...prev, { id, x: e.clientX, y: e.clientY, image: newItem.image }]);
    }

    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item
        );
      }
      return [...prevItems, newItem];
    });
  };

  const removeFromCart = (id: String) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: String, quantity: number) => {
    if (quantity < 1) return;
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: isMounted ? items : [], // Prevent hydration mismatch by returning empty on server
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems: isMounted ? totalItems : 0,
        totalPrice: isMounted ? totalPrice : 0,
      }}
    >
      {children}
      
      {/* Render Flying Items */}
      <AnimatePresence>
        {flyingItems.map((item) => (
          <FlyingItem
            key={item.id}
            item={item}
            onComplete={() => setFlyingItems((prev) => prev.filter((i) => i.id !== item.id))}
          />
        ))}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

function FlyingItem({ item, onComplete }: { item: { x: number; y: number; image: string }; onComplete: () => void }) {
  const [target, setTarget] = useState({ x: item.x, y: item.y });

  useEffect(() => {
    const el = document.getElementById("cart-icon-target");
    if (el) {
      const rect = el.getBoundingClientRect();
      setTarget({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
  }, []);

  return (
    <motion.img
      src={item.image}
      initial={{ x: item.x, y: item.y, scale: 0.8, opacity: 1 }}
      animate={{ 
        x: target.x, 
        y: target.y, 
        scale: 0.1, 
        opacity: 0.2 
      }}
      transition={{ 
        duration: 0.6, 
        ease: [0.175, 0.885, 0.32, 1.275] // Back ease for a pop-and-fly effect
      }}
      onAnimationComplete={onComplete}
      className="fixed z-[9999] w-20 h-20 object-cover rounded-md pointer-events-none shadow-2xl border-2 border-black"
      style={{ left: -40, top: -40 }} // offset so x,y is center
    />
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
