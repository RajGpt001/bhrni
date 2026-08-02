"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export function ProductGridImage({ images, name, index = 0 }: { images: any[]; name: string; index?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    // Stagger the start time by row (assuming 4 items per row on desktop)
    const rowIndex = Math.floor(index / 4);
    const initialDelay = rowIndex * 1500; // 1.5s delay between rows
    let interval: NodeJS.Timeout;

    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 3000);
    }, initialDelay + 3000); // Wait 3s + delay before first change

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [images, index]);

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* Images */}
      {images.map((image, index) => (
        <div
          key={image.url || index}
          className={`absolute inset-0 transition-opacity duration-[10ms] ease-out ${
            index === currentIndex 
              ? "opacity-100 z-10" 
              : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <Image
            src={image.url}
            alt={image.alt || name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="h-full w-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ))}

      {/* Pixelated Transition Overlay */}
      {images.length > 1 && (
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 z-20 pointer-events-none">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={`${currentIndex}-${i}`}
              className="bg-white dark:bg-black w-full h-full opacity-100"
              style={{
                animation: `pixelFade 0.15s forwards`,
                animationDelay: `${Math.random() * 0.4}s`
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
