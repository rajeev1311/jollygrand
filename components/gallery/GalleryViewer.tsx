'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type GalleryCategory = 'ALL' | 'ROOMS' | 'DINING' | 'SPA' | 'POOL' | 'EVENTS' | 'PROPERTY';

export interface GalleryPhoto {
  id: number;
  title: string;
  category: Exclude<GalleryCategory, 'ALL'>;
  image: string;
  caption: string;
}

export const GALLERY_DATA: GalleryPhoto[] = [
  {
    id: 1,
    title: 'The Grand Imperial Atrium',
    category: 'PROPERTY',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85',
    caption: 'Hand-carved travertine columns, limestone water cascades, and 24-karat gold fixtures.',
  },
  {
    id: 2,
    title: 'Presidential Penthouse Master Suite',
    category: 'ROOMS',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
    caption: 'Palatial master bedroom featuring panoramic views, Steinway grand piano, and private butler salon.',
  },
  {
    id: 3,
    title: 'Deluxe King Sanctuary',
    category: 'ROOMS',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85',
    caption: 'Soundproof acoustic tranquility, custom walnut wood paneling, and Fior di Bosco marble bath.',
  },
  {
    id: 4,
    title: 'L’Étoile Private Tasting Salon',
    category: 'DINING',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85',
    caption: 'Contemporary Michelin three-star French dining with tableside flambé and sommelier pairings.',
  },
  {
    id: 5,
    title: 'Aetheria Rooftop Caviar Lounge',
    category: 'DINING',
    image: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=1600&q=85',
    caption: '48th-floor starlit skyline views paired with Ossetra caviar and molecular mixology.',
  },
  {
    id: 6,
    title: 'Celestial Thermal Vitality Spa',
    category: 'SPA',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
    caption: 'Ancient thermal baths, Himalayan crystal salt sauna, and customized Swiss cellular therapies.',
  },
  {
    id: 7,
    title: 'Subterranean Hydrotherapy Pool',
    category: 'SPA',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85',
    caption: 'Mineral-infused warm hydrotherapy pools beneath vaulted stone arches.',
  },
  {
    id: 8,
    title: 'Azure Rooftop Heated Infinity Oasis',
    category: 'POOL',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1600&q=85',
    caption: 'Temperature-controlled infinity pool with private submerged teak daybeds and skyline horizons.',
  },
  {
    id: 9,
    title: 'Diplomatic Crystal Grand Ballroom',
    category: 'EVENTS',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=85',
    caption: 'Bohemian crystal chandeliers and banqueting space accommodating up to 400 gala guests.',
  },
  {
    id: 10,
    title: 'Executive Glass Boardroom',
    category: 'EVENTS',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
    caption: 'High-security diplomatic boardroom with fiber encryption and private catering pantries.',
  },
  {
    id: 11,
    title: 'The Royal Botanical Courtyard',
    category: 'PROPERTY',
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=85',
    caption: 'Tranquil garden courtyards featuring citrus trees, stone fountains, and morning tea pavilions.',
  },
  {
    id: 12,
    title: 'Grand Deluxe Oceanfront Balcony',
    category: 'ROOMS',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85',
    caption: 'Private sunset terrace with sweeping maritime vistas and soundproof sliding glass doors.',
  },
];

const CATEGORIES: GalleryCategory[] = [
  'ALL',
  'ROOMS',
  'DINING',
  'SPA',
  'POOL',
  'EVENTS',
  'PROPERTY',
];

export function GalleryViewer() {
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('ALL');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const filteredPhotos =
    selectedCategory === 'ALL'
      ? GALLERY_DATA
      : GALLERY_DATA.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') setActivePhotoIndex(null);
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, filteredPhotos]);

  const prevPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex(
        (activePhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length
      );
    }
  };

  const nextPhoto = () => {
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((activePhotoIndex + 1) % filteredPhotos.length);
    }
  };

  return (
    <div className="space-y-12">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                'px-4 py-2 text-xs tracking-[0.2em] uppercase transition-all duration-300 rounded-[2px] cursor-pointer font-medium',
                isActive
                  ? 'bg-[#C5A880] text-[#0E1014] font-semibold shadow-lg shadow-[#C5A880]/20'
                  : 'bg-[#14171E] text-[#A0A6B5] hover:text-[#FAF8F5] border border-white/5 hover:border-[#C5A880]/30'
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Masonry / Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo, idx) => (
          <div
            key={photo.id}
            onClick={() => setActivePhotoIndex(idx)}
            className="group relative aspect-[4/3] overflow-hidden bg-[#181C24] border border-[#C5A880]/20 cursor-pointer shadow-lg"
          >
            <Image
              src={photo.image}
              alt={photo.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

            <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex justify-end">
                <span className="w-8 h-8 rounded-full bg-black/70 border border-[#C5A880]/40 flex items-center justify-center text-[#DFC38E]">
                  <Maximize2 className="w-3.5 h-3.5" />
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block mb-1">
                  {photo.category}
                </span>
                <h3 className="font-serif text-lg text-[#FAF8F5] leading-snug">
                  {photo.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && filteredPhotos[activePhotoIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Close */}
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-6 right-6 p-2 text-[#FAF8F5]/80 hover:text-[#DFC38E] z-50 cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-[#FAF8F5]/80 hover:text-[#DFC38E] bg-black/50 border border-white/10 rounded-full z-50 cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-[#FAF8F5]/80 hover:text-[#DFC38E] bg-black/50 border border-white/10 rounded-full z-50 cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Active Photo Container */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full aspect-[16/10] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filteredPhotos[activePhotoIndex].image}
              alt={filteredPhotos[activePhotoIndex].title}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-6 text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] block font-semibold">
                {filteredPhotos[activePhotoIndex].category}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#FAF8F5] mt-1">
                {filteredPhotos[activePhotoIndex].title}
              </h3>
              <p className="text-xs text-[#A0A6B5] max-w-lg mx-auto mt-2 font-light">
                {filteredPhotos[activePhotoIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
