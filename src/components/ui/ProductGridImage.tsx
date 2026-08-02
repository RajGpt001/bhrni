"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export function ProductGridImage({ images, name }: { images: any[]; name: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <>
      {images.map((image, index) => (
        <div
          key={image.url || index}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            index === currentIndex 
              ? "opacity-100 scale-100 blur-0 z-10" 
              : "opacity-0 scale-110 blur-sm z-0 pointer-events-none"
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
    </>
  );
}
