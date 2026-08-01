"use client";

import React from "react";
import { useCart, CartItem } from "@/context/CartContext";

export function AddToCartButton({ product }: { product: CartItem }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the product page since this is often inside a Link
    addToCart({ ...product, quantity: 1 });
    
    // Optional: Add a simple toast or visual feedback here
  };

  return (
    <button
      onClick={handleAddToCart}
      className="mt-4 w-full flex items-center justify-center rounded-full bg-black dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-black shadow-sm hover:bg-gray-800 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-colors z-10 relative"
    >
      Add to Cart
    </button>
  );
}
