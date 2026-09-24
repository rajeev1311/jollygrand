import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, ChefHat, Wine, Calendar, Coffee, UtensilsCrossed } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata = {
  title: 'Fine Dining & Gastronomy | Jolly Grand',
  description: 'Experience three-star Michelin dining, rooftop caviar mixology, and artisanal breakfast salons at Jolly Grand.',
};

const DINING_EXPERIENCES = [
  {
    id: 'signature',
    title: 'L’Étoile Grand Atelier',
    category: 'Signature Restaurant',
    subtitle: 'Three Michelin Stars • Haute Gastronomy',
    desc: 'An evocative gastronomic journey led by Executive Chef Jean-Luc Laurent. Featuring 9-course seasonal tasting journeys utilizing rare heritage truffles, line-caught Brittany langoustines, and Wagyu A5, accompanied by an award-winning 4,500-bottle cellar.',
    cuisine: 'Contemporary French & Modern European',
    hours: 'Tuesday – Sunday: Dinner 6:30 PM – 11:00 PM',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85',
    ctaText: 'RESERVE L’ÉTOILE',
  },
  {
    id: 'rooftop',
    title: 'Aetheria Rooftop Lounge & Caviar Bar',
    category: 'Rooftop Dining & Bar',
    subtitle: '48th Floor Panoramic Skyline',
    desc: 'Suspended above the sparkling skyline horizons. Savor imperial Iranian Beluga caviar, dry-aged wagyu skewers, and avant-garde liquid nitrogen mixology crafted tableside under starlit skies.',
    cuisine: 'Caviar, Seafood Tapas & Molecular Mixology',
    hours: 'Daily: 4:00 PM – 2:00 AM (Sunset Service: 5:30 PM)',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1400&q=85',
    ctaText: 'RESERVE SKYLINE TABLE',
  },
  {
    id: 'lounge',
    title: 'The Sovereign Oak Library & Bar',
    category: 'Lounge & Bar',
    subtitle: 'Vintage Spirits & Acoustic Jazz',
    desc: 'A sanctuary of rich mahogany, velvet banquettes, and crackling fireplaces. Home to one of the continent’s finest single-malt scotch collections, rare Armagnacs, and nightly acoustic jazz quartets.',
    cuisine: 'Artisanal Charcuterie, Small Plates & Rare Whiskies',
    hours: 'Daily: 12:00 PM – 1:00 AM',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1400&q=85',
    ctaText: 'EXPLORE DRINKS REGISTER',
  },
  {
    id: 'breakfast',
    title: 'The Palm Orangery Breakfast Salon',
    category: 'Breakfast & Brunch',
    subtitle: 'Artisanal Botanical Conservatory',
    desc: 'Bask in morning natural light amidst rare orchids and marble fountains. Enjoy made-to-order organic omelettes, house-churned Normandy butter, freshly baked French brioche, and barista single-origin coffees.',
    cuisine: 'Gourmet Breakfast, Champagne Brunch & Healthy Wellness',
    hours: 'Daily: 6:30 AM – 11:30 AM (Weekend Brunch until 2:00 PM)',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1400&q=85',
    ctaText: 'RESERVE BRUNCH',
  },
  {
    id: 'in-room',
    title: 'The Grand In-Suite Private Dining',
    category: 'In-Room Dining',
    subtitle: 'Silver Service 24 Hours a Day',
    desc: 'Dine in the privacy of your suite with white-glove silver service. From midnight Beluga caviar service to sunrise balconies breakfasts, our master chefs prepare every plate to perfection.',
    cuisine: 'Curated 24/7 International Fine Dining',
    hours: '24 Hours Daily (Express Service Available)',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1400&q=85',
    ctaText: 'VIEW SUITE MENU',
  },
];

export default function DiningPage() {
  return (
    <main className="min-h-screen bg-[#0E1014] text-[#FAF8F5]">
      <Navbar />

      {/* Hero Header */}
      <section className="relative h-[55vh] min-h-[440px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2200&q=85"
          alt="Jolly Grand Haute Gastronomy"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1014] via-[#0E1014]/50 to-black/70" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#DFC38E] font-semibold bg-[#C5A880]/15 px-3 py-1 rounded-full border border-[#C5A880]/30 inline-block mb-4">
            Michelin-Caliber Culinary Arts
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#FAF8F5] tracking-tight">
            Dining & Mixology
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#D1D5E0] max-w-xl mx-auto font-light leading-relaxed">
            Five distinctive culinary sanctuaries crafted by master chefs, certified sommeliers, and world-class mixologists.
          </p>
        </div>
      </section>

      {/* Venues Showcase List */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {DINING_EXPERIENCES.map((venue, idx) => {
          const isReversed = idx % 2 === 1;
          return (
            <div
              key={venue.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                isReversed ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Column */}
              <div className={`lg:col-span-6 relative ${isReversed ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-[16/11] rounded-[2px] overflow-hidden border border-[#C5A880]/20 shadow-2xl bg-[#181C24] group">
                  <Image
                    src={venue.image}
                    alt={venue.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-widest text-[#DFC38E] border border-white/10">
                    {venue.category}
                  </div>
                </div>
              </div>

              {/* Narrative Details Column */}
              <div className={`lg:col-span-6 space-y-5 ${isReversed ? 'lg:order-1' : ''}`}>
                <span className="text-xs uppercase tracking-[0.2em] text-[#C5A880] font-serif font-medium">
                  {venue.subtitle}
                </span>

                <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5]">
                  {venue.title}
                </h2>

                <p className="text-sm text-[#A0A6B5] leading-relaxed">
                  {venue.desc}
                </p>

                <div className="space-y-2.5 pt-4 border-y border-white/10 text-xs text-[#D1D5E0]">
                  <div className="flex items-center gap-2.5">
                    <ChefHat className="w-4 h-4 text-[#C5A880] shrink-0" />
                    <span>Cuisine: <strong>{venue.cuisine}</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#C5A880] shrink-0" />
                    <span>Hours: {venue.hours}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/contact?subject=DiningReservation"
                    className="luxury-btn-primary !py-3 !px-6 text-xs inline-flex items-center gap-2"
                  >
                    <span>{venue.ctaText}</span>
                    <Wine className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <Footer />
    </main>
  );
}
