"use client";

import React from "react";
import { motion } from "framer-motion";

export function HeroAnimation({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
      className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center"
    >
      {children}
    </motion.div>
  );
}
