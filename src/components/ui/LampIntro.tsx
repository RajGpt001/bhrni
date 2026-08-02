/* eslint-disable */
"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { LampContainer } from "./lamp";

export function LampIntro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDismissed) {
        document.cookie = "lamp_intro_seen=true; path=/";
        setIsDismissed(true);
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        });
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isDismissed]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.6], [0, 150]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest >= 0.5 && !isDismissed) {
      document.cookie = "lamp_intro_seen=true; path=/"; // Session cookie (clears when browser closes)
      setIsDismissed(true);
      
      // Wait for React to unmount the container, then snap scroll to top of the real page
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      });
    }
  });

  if (isDismissed) return null;

  return (
    <div 
      ref={containerRef} 
      className="w-full relative z-[100] -mt-16 h-[150vh] bg-black"
    >
      <motion.div 
        style={{ opacity, scale, y }} 
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      >
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 flex flex-col items-center justify-center text-center w-full max-w-[600px] md:max-w-[1000px]"
          >
            <video 
              autoPlay 
              muted 
              loop
              playsInline
              className="w-full h-auto mix-blend-screen pointer-events-none scale-110"
              src="/lyke-india-intro.mp4"
            />
          </motion.h1>
        </LampContainer>
      </motion.div>
    </div>
  );
}
