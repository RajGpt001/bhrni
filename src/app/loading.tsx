import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-[#FAF8F5] relative flex items-center justify-center">
      {/* Background styling matching the site theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-purple-700/10 to-[#FAF8F5] pointer-events-none" />
      
      <div className="flex flex-col items-center justify-center z-10 space-y-6">
        {/* Animated LYKE logo loader */}
        <div className="relative flex flex-col items-center justify-center">
          <span className="text-4xl md:text-6xl font-black tracking-[0.3em] ml-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-[#4A3728] via-[#8B5A2B] to-[#4A3728] animate-pulse drop-shadow-sm">
            LYKE
          </span>
          <div className="absolute inset-0 bg-[#8B5A2B] opacity-10 blur-2xl rounded-full animate-pulse"></div>
          
          <div className="mt-6 flex gap-2">
             <div className="w-2 h-2 rounded-full bg-[#8B5A2B]/70 animate-bounce" style={{ animationDelay: '0ms' }} />
             <div className="w-2 h-2 rounded-full bg-[#8B5A2B]/70 animate-bounce" style={{ animationDelay: '150ms' }} />
             <div className="w-2 h-2 rounded-full bg-[#8B5A2B]/70 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
