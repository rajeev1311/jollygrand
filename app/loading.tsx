import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0E1014] flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-2 border-[#C5A880]/20 border-t-[#C5A880] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center font-serif text-[10px] text-[#DFC38E] font-bold">
          JG
        </div>
      </div>
      <div className="text-center space-y-1">
        <span className="font-serif text-sm tracking-[0.2em] text-[#FAF8F5] block font-medium">
          JOLLY GRAND
        </span>
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#C5A880] font-light">
          Preparing Luxury Experience...
        </span>
      </div>
    </div>
  );
}
