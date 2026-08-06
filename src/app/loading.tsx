import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-screen w-full bg-black relative flex items-center justify-center">
      {/* Background styling matching the site theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-purple-700/10 to-black pointer-events-none" />
      
      <div className="flex flex-col items-center justify-center z-10 space-y-4">
        {/* Animated LYKE logo loader */}
        <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center relative overflow-hidden bg-black/50 backdrop-blur-md">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 animate-pulse">L</span>
          <div className="absolute inset-0 border-2 border-t-purple-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
        </div>
        <p className="text-white/60 text-sm tracking-widest animate-pulse">LOADING...</p>
      </div>
    </div>
  );
}
