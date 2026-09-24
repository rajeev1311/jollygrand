'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Bed, Maximize2, ArrowRight, Star } from 'lucide-react';
import { Room } from '@/types/hotel';
import { formatCurrency } from '@/lib/utils';
import { CategoryBadge } from '@/components/ui/Badge';

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const amenitiesList = Array.isArray(room.amenities)
    ? room.amenities.slice(0, 3).map((a: any) => (typeof a === 'string' ? a : a.name))
    : [];

  return (
    <div className="luxury-card group flex flex-col h-full overflow-hidden border border-[#C5A880]/15 relative">
      {/* Room Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#181C24]">
        <Image
          src={room.image}
          alt={room.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12151B] via-transparent to-black/30" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <CategoryBadge category={room.category} />
        </div>

        {/* Rating */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 text-xs text-[#DFC38E] border border-white/10">
          <Star className="w-3 h-3 fill-[#DFC38E] text-[#DFC38E]" />
          <span className="font-semibold">{room.rating.toFixed(2)}</span>
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 right-4 z-10 text-right">
          <span className="text-[10px] uppercase tracking-wider text-[#A0A6B5] block">FROM</span>
          <span className="text-xl sm:text-2xl font-serif text-[#FAF8F5] font-semibold">
            {formatCurrency(room.pricePerNight)}
          </span>
          <span className="text-[11px] text-[#A0A6B5] font-light"> / night</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div>
          <h3 className="font-serif text-xl sm:text-2xl text-[#FAF8F5] group-hover:text-[#DFC38E] transition-colors leading-snug">
            <Link href={`/rooms/${room.slug || room.id}`}>
              {room.name}
            </Link>
          </h3>
          <p className="text-xs sm:text-sm text-[#A0A6B5] mt-2 line-clamp-2 leading-relaxed">
            {room.shortDesc || room.description}
          </p>
        </div>

        {/* Key Specifications */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-[11px] text-[#B8B3AA]">
          <div className="flex items-center gap-1.5" title="Max Guests">
            <Users className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <span>Up to {room.capacity}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Bedding">
            <Bed className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <span className="truncate">{room.bedType.replace(' Bed', '')}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Area">
            <Maximize2 className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <span>{room.sizeSqFt} sq ft</span>
          </div>
        </div>

        {/* Highlights */}
        {amenitiesList.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {amenitiesList.map((item, i) => (
              <span
                key={i}
                className="text-[10px] text-[#C5A880] bg-[#C5A880]/10 px-2 py-0.5 border border-[#C5A880]/20 rounded-[2px]"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-3">
          <Link
            href={`/rooms/${room.slug || room.id}`}
            className="flex-1 luxury-btn-outline !py-2.5 text-xs text-center justify-center"
          >
            View Details
          </Link>
          <Link
            href={`/booking?roomId=${room.id}`}
            className="flex-1 luxury-btn-primary !py-2.5 text-xs text-center justify-center flex items-center gap-1.5"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
