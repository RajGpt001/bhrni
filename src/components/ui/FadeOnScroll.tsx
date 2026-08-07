"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function FadeOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll position of this specific element
  const { scrollYProgress } = useScroll({
    target: ref,
    // Start fading when the top of the element is 120px from the top of the viewport
    // Finish fading when it is 40px from the top (sliding under the header)
    offset: ["start 120px", "start 40px"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div ref={ref} style={{ opacity }}>
      {children}
    </motion.div>
  );
}
