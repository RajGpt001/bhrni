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
        <Image
          key={image.url || index}
          src={image.url}
          alt={image.alt || name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`h-full w-full object-contain object-center group-hover:scale-105 transition-all duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
    </>
  );
}
