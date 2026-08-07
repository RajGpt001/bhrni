"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function FadeOnScroll({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  // Fade out starting at 50px of scroll, fully transparent at 300px
  const opacity = useTransform(scrollY, [50, 300], [1, 0]);

  return (
    <motion.div style={{ opacity }}>
      {children}
    </motion.div>
  );
}
