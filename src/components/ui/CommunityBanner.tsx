import * as React from "react";

export function CommunityBanner() {
  // Generate random heights for the soundwave graphic to simulate a waveform
  const bars = Array.from({ length: 150 }).map(() => Math.random() * 100);

  return (
    <section className="relative w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 py-32 md:py-48 mt-12 mb-24">
      {/* Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.25] dark:opacity-[0.08] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Background large watermark graphic (like the faded 'F' in fuaark) */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-5 dark:opacity-10 pointer-events-none select-none">
        <span className="font-serif italic font-black text-[25rem] leading-none text-black dark:text-white">L</span>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-gray-500 dark:text-gray-400 mb-4 uppercase">
          #JOIN THE COMMUNITY WHERE
        </p>
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-blue-950 dark:text-white uppercase leading-none">
          STYLE MEETS <br className="hidden sm:block" /> EVERYDAY LIFE.
        </h2>
      </div>

      {/* Soundwave/Graph Graphic at bottom */}
      <div className="absolute bottom-0 left-0 w-full h-32 flex items-end justify-between opacity-10 dark:opacity-20">
        {bars.map((height, i) => (
          <div 
            key={i} 
            className="flex-1 bg-black dark:bg-white rounded-t-full mx-[1px]"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      
      {/* White/Black fade gradient at the very bottom to blend into the next section */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white dark:from-black to-transparent" />
    </section>
  );
}
