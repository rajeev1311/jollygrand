'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Maximize2, X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'The Grand Atrium & Imperial Fountain',
    category: 'PROPERTY',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 2,
    title: 'Presidential Penthouse Master Chamber',
    category: 'ROOMS',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 3,
    title: 'L’Étoile Private Tasting Salon',
    category: 'DINING',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 4,
    title: 'Azure Heated Rooftop Infinity Oasis',
    category: 'POOL',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 5,
    title: 'Celestial Thermal Vitality Spa',
    category: 'SPA',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 6,
    title: 'Diplomatic Crystal Grand Ballroom',
    category: 'EVENTS',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1400&q=85',
  },
];

export function GalleryPreview() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setActiveImageIndex(index);
  const closeLightbox = () => setActiveImageIndex(null);

  const prevImage = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
  };

  const nextImage = () => {
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  return (
    <section className="py-24 sm:py-32 bg-[#090B0D] relative border-t border-[#C5A880]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Visual Perspectives"
          title="Architectural Majesty & Quiet Splendor"
          description="A glimpse into the serene atmospheres, palatial interiors, and evocative settings of Jolly Grand."
        />

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="relative aspect-[4/3] group overflow-hidden bg-[#181C24] cursor-pointer border border-[#C5A880]/20"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

              {/* Hover Overlay Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-end">
                  <span className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-[#C5A880]/40 flex items-center justify-center text-[#DFC38E]">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-lg text-[#FAF8F5]">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/gallery"
            className="luxury-btn-outline !py-3.5 !px-8 text-xs inline-flex items-center gap-2 group"
          >
            <span>ENTER FULL IMMERSIVE GALLERY</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 text-[#FAF8F5]/80 hover:text-[#DFC38E] z-50 cursor-pointer"
            aria-label="Close image lightbox"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Navigation Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-[#FAF8F5]/80 hover:text-[#DFC38E] bg-black/50 border border-white/10 rounded-full z-50 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-[#FAF8F5]/80 hover:text-[#DFC38E] bg-black/50 border border-white/10 rounded-full z-50 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Active Image Card */}
          <div
            className="relative max-w-5xl max-h-[85vh] w-full aspect-[16/10] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={GALLERY_ITEMS[activeImageIndex].image}
              alt={GALLERY_ITEMS[activeImageIndex].title}
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#C5A880] block">
                {GALLERY_ITEMS[activeImageIndex].category}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#FAF8F5]">
                {GALLERY_ITEMS[activeImageIndex].title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
