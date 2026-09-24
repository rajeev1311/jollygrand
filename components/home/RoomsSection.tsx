'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Room, RoomCategory } from '@/types/hotel';
import { RoomCard } from '@/components/rooms/RoomCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

interface RoomsSectionProps {
  initialRooms: Room[];
}

const CATEGORY_TABS: { label: string; value: 'ALL' | RoomCategory }[] = [
  { label: 'ALL SUITES', value: 'ALL' },
  { label: 'DELUXE', value: 'DELUXE' },
  { label: 'GRAND DELUXE', value: 'GRAND_DELUXE' },
  { label: 'EXECUTIVE SUITES', value: 'EXECUTIVE_SUITE' },
  { label: 'PRESIDENTIAL PENTHOUSE', value: 'PRESIDENTIAL_SUITE' },
];

export function RoomsSection({ initialRooms }: RoomsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | RoomCategory>('ALL');

  const filteredRooms = selectedCategory === 'ALL'
    ? initialRooms
    : initialRooms.filter((r) => r.category === selectedCategory);

  return (
    <section className="py-24 sm:py-32 bg-[#0A0C0E] relative border-t border-[#C5A880]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Accommodations & Residences"
          title="Sanctuaries of Unrivaled Splendor"
          description="Each suite at Jolly Grand is a curated symphony of Italian marble, bespoke walnut woodwork, acoustic serenity, and bespoke personal butler service."
        />

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setSelectedCategory(tab.value)}
                className={cn(
                  'px-4 py-2 text-xs tracking-[0.16em] uppercase transition-all duration-300 rounded-[2px] cursor-pointer font-medium',
                  isActive
                    ? 'bg-[#C5A880] text-[#0E1014] font-semibold shadow-lg shadow-[#C5A880]/20'
                    : 'bg-[#14171E] text-[#A0A6B5] hover:text-[#FAF8F5] border border-white/5 hover:border-[#C5A880]/30'
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.slice(0, 6).map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/rooms"
            className="luxury-btn-outline !py-3.5 !px-8 text-xs inline-flex items-center gap-3 group"
          >
            <span>VIEW COMPLETE RESIDENCE CATALOG</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
