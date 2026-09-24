'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Compass, Calendar } from 'lucide-react';

export function Hero() {
  const scrollToExplore = () => {
    const el = document.getElementById('hotel-search-bar');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with slow zoom animation */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2200&q=90"
          alt="Jolly Grand Luxury Hotel & Resort"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center animate-slow-zoom"
        />
        {/* Layered luxury gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1014] via-[#0E1014]/50 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-28 pb-32">
        {/* Monogram / Crest Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#C5A880]/30 bg-[#0E1014]/60 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
          <span className="text-[10px] sm:text-xs tracking-[0.3em] font-semibold text-[#DFC38E] uppercase">
            World Luxury Hotel Winner 2026
          </span>
        </div>

        {/* Brand Name & Tagline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FAF8F5] tracking-tight font-normal mb-4 sm:mb-6 drop-shadow-2xl">
          JOLLY GRAND
        </h1>

        <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#DFC38E] font-light italic mb-6 tracking-wide drop-shadow-md">
          “Where Every Stay Becomes A Story”
        </p>

        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#E0E3EB] font-light leading-relaxed mb-10 drop-shadow">
          Experience refined hospitality, exceptional comfort and unforgettable moments
          amidst architectural magnificence and bespoke personal service.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link
            href="/rooms"
            className="w-full sm:w-auto luxury-btn-primary !py-3.5 !px-8 text-xs tracking-[0.2em]"
          >
            <Compass className="w-4 h-4" />
            <span>EXPLORE ROOMS</span>
          </Link>

          <Link
            href="/booking"
            className="w-full sm:w-auto luxury-btn-outline !py-3.5 !px-8 text-xs tracking-[0.2em]"
          >
            <Calendar className="w-4 h-4 text-[#C5A880]" />
            <span>BOOK YOUR STAY</span>
          </Link>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <button
        onClick={scrollToExplore}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#C5A880] hover:text-[#DFC38E] transition-colors focus:outline-none group cursor-pointer"
        aria-label="Scroll to booking search bar"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase text-[#A0A6B5] group-hover:text-[#DFC38E]">
          DISCOVER
        </span>
        <div className="w-7 h-11 border border-[#C5A880]/40 rounded-full flex items-start justify-center p-1.5 bg-[#0E1014]/40 backdrop-blur-sm">
          <div className="w-1.5 h-2.5 bg-[#C5A880] rounded-full animate-bounce" />
        </div>
      </button>
    </section>
  );
}
