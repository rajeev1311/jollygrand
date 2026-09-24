'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Wine, ChefHat } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const DINING_VENUES = [
  {
    name: 'L’Étoile Grand Atelier',
    tagline: 'Three Michelin Star Fine Dining',
    desc: 'Contemporary French gastronomy meets Mediterranean heritage, orchestrated by Executive Chef Jean-Luc Laurent with 4,000-bottle rare cellar pairings.',
    cuisine: 'Modern French & Mediterranean',
    hours: 'Dinner: 6:30 PM – 11:00 PM',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    badge: 'Signature Restaurant',
  },
  {
    name: 'Aetheria Rooftop Lounge & Caviar Bar',
    tagline: 'Skyline Panorama & Rare Spirits',
    desc: 'Suspended above the skyline on the 48th floor. Savor imperial Ossetra caviar, bespoke smoked cocktails, and champagne under starlit skies.',
    cuisine: 'Caviar, Seafood & Molecular Mixology',
    hours: 'Daily: 4:00 PM – 2:00 AM',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1200&q=80',
    badge: 'Rooftop Lounge',
  },
  {
    name: 'The Palm Orangery Breakfast Salon',
    tagline: 'Artisanal Sunrise Buffet & Patisserie',
    desc: 'Awaken in our sun-drenched botanical greenhouse. Organic farm-to-table breakfast, house-churned butter, fresh French pastries, and artisanal roast coffees.',
    cuisine: 'Continental & Gourmet A La Carte',
    hours: 'Daily: 6:30 AM – 11:30 AM',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80',
    badge: 'Sunrise Breakfast',
  },
];

export function DiningSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#090B0D] relative border-t border-[#C5A880]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Haute Gastronomy"
          title="Culinary Artistry at Its Pinnacle"
          description="Immerse yourself in world-class dining where rare vintages, visionary culinary technique, and theatrical presentation converge."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {DINING_VENUES.map((venue, idx) => (
            <div
              key={idx}
              className="luxury-card group flex flex-col justify-between overflow-hidden border border-[#C5A880]/20"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-[#181C24]">
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12151B] via-transparent to-black/40" />

                <span className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-[10px] tracking-widest uppercase text-[#DFC38E] px-3 py-1 border border-[#C5A880]/30 font-medium">
                  {venue.badge}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#C5A880] block font-serif">
                    {venue.tagline}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#FAF8F5] group-hover:text-[#DFC38E] transition-colors mt-1">
                    {venue.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A0A6B5] mt-2.5 leading-relaxed">
                    {venue.desc}
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/5 text-xs text-[#8F94A3]">
                  <div className="flex items-center gap-2">
                    <ChefHat className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                    <span>{venue.cuisine}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                    <span>{venue.hours}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/dining"
                    className="w-full luxury-btn-outline !py-2.5 text-xs text-center justify-center flex items-center gap-2"
                  >
                    <span>RESERVE A TABLE</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/dining"
            className="luxury-btn-primary !py-3.5 !px-8 text-xs inline-flex items-center gap-2"
          >
            <span>VIEW ALL RESTAURANTS & TASTING MENUS</span>
            <Wine className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
