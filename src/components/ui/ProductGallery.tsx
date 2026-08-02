"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: any[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedImage = images[selectedIndex] || images[0];

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible w-full lg:w-24 flex-shrink-0">
        {images.map((img: any, i: number) => (
          <button
            key={img.id || i}
            onClick={() => setSelectedIndex(i)}
            className={`relative aspect-square w-20 lg:w-full flex-shrink-0 overflow-hidden rounded-xl border-2 ${
              i === selectedIndex
                ? "border-black dark:border-white"
                : "border-transparent"
            } hover:border-gray-300 dark:hover:border-gray-600 transition-colors`}
          >
            <Image
              src={img.url}
              alt={img.alt || productName}
              fill
              className="object-contain"
            />
          </button>
        ))}
      </div>
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
        {selectedImage && (
          <Image
            src={selectedImage.url}
            alt={selectedImage.alt || productName}
            fill
            className="object-contain object-center"
            priority
          />
        )}
      </div>
    </div>
  );
}
