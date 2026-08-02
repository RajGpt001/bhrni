import * as React from "react";

export function FeaturedLogos() {
  const logos = [
    { name: "TOI", class: "font-serif font-bold text-2xl tracking-widest" },
    { name: "startuppedia", class: "font-sans font-light tracking-widest text-xl text-blue-400" },
    { name: "GQ", class: "font-serif font-bold text-3xl tracking-widest" },
    { name: "#startupindia", class: "font-sans font-bold text-xl text-orange-600 dark:text-orange-500" },
    { name: "mid-day", class: "font-serif font-black text-2xl lowercase tracking-tighter" },
    { name: "ZEENEWS", class: "font-sans font-black text-xl text-blue-700 dark:text-blue-400" },
    { name: "FORBES", class: "font-serif font-bold text-2xl tracking-widest text-zinc-800 dark:text-zinc-200" },
  ];

  // We duplicate the logos array a few times to ensure it covers the screen width,
  // then we wrap it all in a w-max container that translates -50%.
  // By duplicating it 4 times total, translating by -50% shifts it exactly 2 sets.
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="w-full bg-white dark:bg-black py-8 border-y border-gray-100 dark:border-zinc-900 overflow-hidden flex items-center">
      <div className="flex w-max animate-marquee items-center gap-16 md:gap-24 px-8 md:px-12">
        {duplicatedLogos.map((logo, i) => (
          <div 
            key={i} 
            className="flex-shrink-0 flex justify-center items-center opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-default"
          >
            <span className={logo.class}>{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
