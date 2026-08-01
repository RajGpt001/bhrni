"use client";

import React from "react";
import { useCart, CartItem } from "@/context/CartContext";
import { motion } from "framer-motion";

export default function WoodenCartButton({ product }: { product?: CartItem }) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product) {
      addToCart({ ...product, quantity: 1 }, e);
    }
  };

  return (
    <motion.button
      onClick={handleAddToCart}
      whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
      whileTap={{ 
        scale: 0.95, 
        y: 4, 
        boxShadow: "0 0px 0 0 #1a1315, 0 0px 0px rgba(0,0,0,0.4)" 
      }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 15,
        mass: 1
      }}
      className="
        relative mt-4 w-full flex items-center justify-center px-4 py-3 text-sm font-bold text-amber-50
        rounded-xl shadow-[0_4px_0_0_#1a1315,0_8px_15px_rgba(0,0,0,0.4)]
        bg-[#33272a] border-2 border-[#1a1315]
        overflow-hidden z-10
      "
    >
      {/* Wood grain overlay effect */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)`
        }}
      />
      
      <span className="relative z-10 flex items-center gap-2 tracking-wide uppercase drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        Add to Cart
      </span>
    </motion.button>
  );
}
