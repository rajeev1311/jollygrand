'use client';

import React from 'react';
import { Star, Quote, Award } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const TESTIMONIALS = [
  {
    quote:
      'Jolly Grand redefines ultra-luxury hospitality. From the seamless Rolls-Royce arrival to the private butler who anticipated our every desire, it was an unparalleled experience in modern grace.',
    author: 'Lord & Lady Sterling',
    source: 'London, United Kingdom',
    rating: 5,
    tag: 'Penthouse Residence Stay',
  },
  {
    quote:
      'The Michelin-starred dinner at L’Étoile was arguably the most poetic culinary evening we have ever enjoyed. Combined with the acoustic silence of our suite, we felt thoroughly rejuvenated.',
    author: 'Dr. Vivienne Moreau',
    source: 'Geneva, Switzerland',
    rating: 5,
    tag: 'Gastronomy & Spa Guest',
  },
  {
    quote:
      'As a frequent business traveler across Asia and Europe, the Imperial Executive Suite at Jolly Grand represents the absolute benchmark of seamless connectivity, discretion, and timeless design.',
    author: 'Kenji Takahashi',
    source: 'Tokyo, Japan',
    rating: 5,
    tag: 'Executive Summit Attendee',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#0E1014] relative border-t border-[#C5A880]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Distinguished Acclaim"
          title="Echoes of Extraordinary Stays"
          description="Voices of those who have experienced the timeless serenity and bespoke hospitality of Jolly Grand."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="luxury-card p-8 flex flex-col justify-between border border-[#C5A880]/20 relative"
            >
              <div>
                <Quote className="w-8 h-8 text-[#C5A880]/30 mb-4" />

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#DFC38E] text-[#DFC38E]" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-[#E0E3EB] font-serif italic leading-relaxed mb-6">
                  “{item.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <div className="font-serif text-base text-[#FAF8F5]">{item.author}</div>
                <div className="text-xs text-[#A0A6B5] mt-0.5">{item.source}</div>
                <div className="text-[10px] text-[#C5A880] tracking-wider uppercase font-medium mt-1">
                  {item.tag}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Press Accolades Bar */}
        <div className="mt-16 p-8 bg-[#14171E] border border-[#C5A880]/20 rounded-[2px] flex flex-wrap items-center justify-around gap-8 text-center">
          <div>
            <div className="font-serif text-xl sm:text-2xl text-[#DFC38E]">Forbes Travel Guide</div>
            <div className="text-[11px] text-[#A0A6B5] tracking-widest uppercase mt-1">
              Five-Star Award 2026
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-white/10" />
          <div>
            <div className="font-serif text-xl sm:text-2xl text-[#DFC38E]">Condé Nast Traveler</div>
            <div className="text-[11px] text-[#A0A6B5] tracking-widest uppercase mt-1">
              Gold List #1 Hotel
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-white/10" />
          <div>
            <div className="font-serif text-xl sm:text-2xl text-[#DFC38E]">Michelin Guide</div>
            <div className="text-[11px] text-[#A0A6B5] tracking-widest uppercase mt-1">
              Three Keys Distinction
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
