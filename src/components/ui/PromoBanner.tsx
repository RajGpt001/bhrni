"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    id: 1,
    title: "Curated essentials\nfor everyday",
    buttonText: "Shop Now \u2192",
    href: "/category/all",
    bgClass: "bg-[#a786df]",
    textClass: "text-zinc-950",
    subtextClass: "text-zinc-900 hover:text-black transition-colors",
    renderImages: () => (
      <div className="relative w-full h-32 md:h-full flex items-center justify-center md:justify-end gap-2 sm:gap-6">
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[2rem] overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl transform -rotate-12 transition-transform duration-500 z-10">
          <Image src="https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=400&q=80" alt="Tech" fill className="object-cover" />
        </div>
        <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl transform rotate-6 transition-transform duration-500 z-20 -ml-6 sm:ml-0">
          <Image src="https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=400&q=80" alt="Fashion" fill className="object-cover" />
        </div>
        <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl transform -rotate-6 transition-transform duration-500 hidden sm:block">
          <Image src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80" alt="Audio" fill className="object-cover" />
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Gaming store\nUpgrade your gear",
    buttonText: "Explore \u2192",
    href: "/category/electronics",
    bgClass: "bg-gradient-to-r from-indigo-950 via-purple-950 to-black",
    textClass: "text-white drop-shadow-md",
    subtextClass: "text-indigo-200 hover:text-white transition-colors",
    renderImages: () => (
      <div className="relative w-full h-32 md:h-full flex items-center justify-center md:justify-end gap-4">
        {/* Glow behind */}
        <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
        <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-xl overflow-hidden border-2 border-indigo-500/50 shadow-[0_0_30px_rgba(79,70,229,0.4)] transform -rotate-6 transition-transform duration-500 z-20">
          <Image src="https://images.unsplash.com/photo-1605236453806-6ff36852230e?w=400&q=80" alt="Gaming" fill className="object-cover" />
        </div>
        <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-xl overflow-hidden border-2 border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.4)] transform rotate-12 transition-transform duration-500 z-10 -ml-12 sm:-ml-8">
          <Image src="https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&q=80" alt="TV" fill className="object-cover" />
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "New Arrivals\nSummer Fashion",
    buttonText: "Shop Collection \u2192",
    href: "/category/fashion",
    bgClass: "bg-orange-100 dark:bg-orange-950/40",
    textClass: "text-orange-950 dark:text-orange-50",
    subtextClass: "text-orange-800 dark:text-orange-200 hover:text-orange-950 dark:hover:text-white transition-colors",
    renderImages: () => (
      <div className="relative w-full h-32 md:h-full flex items-center justify-center md:justify-end gap-2 sm:gap-4">
        <div className="w-24 h-32 sm:w-32 sm:h-44 rounded-t-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-xl transform rotate-3 transition-transform duration-500 z-10">
          <Image src="https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&q=80" alt="Fashion 1" fill className="object-cover" />
        </div>
        <div className="w-28 h-36 sm:w-36 sm:h-48 rounded-b-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-xl transform -rotate-3 transition-transform duration-500 z-20 -mt-8">
          <Image src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80" alt="Fashion 2" fill className="object-cover" />
        </div>
      </div>
    )
  }
];

export function PromoBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="w-full mb-8 relative group">
      {/* Slider Container */}
      <div className="relative w-full overflow-hidden h-[380px] md:h-[280px]">
        {slides.map((slide, index) => (
          <Link 
            key={slide.id}
            href={slide.href} 
            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 scale-95 pointer-events-none"
            } ${slide.bgClass}`}
          >
            <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 lg:px-16 w-full h-full">
              
              <div className="z-10 text-center md:text-left mb-8 md:mb-0 md:max-w-md w-full">
                <h2 className={`text-4xl md:text-5xl font-black tracking-tighter leading-[1.1] whitespace-pre-line ${slide.textClass}`}>
                  {slide.title}
                </h2>
                <div className={`mt-6 inline-flex items-center text-sm font-bold uppercase tracking-widest ${slide.subtextClass}`}>
                  {slide.buttonText}
                </div>
              </div>

              <div className="w-full flex-1 md:w-1/2">
                {slide.renderImages()}
              </div>

            </div>
          </Link>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-md flex items-center justify-center text-black dark:text-white opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-white/80 dark:hover:bg-black/80 shadow-xl"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-md flex items-center justify-center text-black dark:text-white opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-white/80 dark:hover:bg-black/80 shadow-xl"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
      </button>
      
      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.preventDefault();
              setCurrentSlide(index);
            }}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-500 ease-out ${
              index === currentSlide 
                ? "bg-black dark:bg-white w-8 shadow-sm" 
                : "bg-black/20 dark:bg-white/20 w-2 hover:bg-black/40 dark:hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
