import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Users,
  Bed,
  Maximize2,
  Calendar,
  Check,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronLeft
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CategoryBadge } from '@/components/ui/Badge';
import { getRoomById, getRooms } from '@/lib/db/store';
import { formatCurrency } from '@/lib/utils';
import { RoomCard } from '@/components/rooms/RoomCard';

export const revalidate = 0;

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const room = await getRoomById(id);

  if (!room) {
    notFound();
  }

  const allRooms = await getRooms();
  const relatedRooms = allRooms.filter((r) => r.id !== room.id).slice(0, 3);

  const amenitiesList = Array.isArray(room.amenities)
    ? room.amenities.map((a: any) => (typeof a === 'string' ? a : a.name))
    : [];

  return (
    <main className="min-h-screen bg-[#0E1014] text-[#FAF8F5]">
      <Navbar />

      {/* Top Breadcrumb Bar */}
      <div className="pt-28 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/rooms"
          className="inline-flex items-center gap-2 text-xs text-[#A0A6B5] hover:text-[#DFC38E] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>BACK TO ALL SUITES</span>
        </Link>
      </div>

      {/* Gallery Header: Hero Main Image + Side Grids */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[450px] sm:h-[550px]">
          {/* Main Large Image */}
          <div className="lg:col-span-8 relative rounded-[2px] overflow-hidden border border-[#C5A880]/20 bg-[#14171E]">
            <Image
              src={room.image}
              alt={room.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
            <div className="absolute top-4 left-4">
              <CategoryBadge category={room.category} />
            </div>
          </div>

          {/* Secondary Stacked Images */}
          <div className="hidden lg:grid lg:col-span-4 grid-rows-2 gap-4">
            <div className="relative rounded-[2px] overflow-hidden border border-[#C5A880]/20 bg-[#14171E]">
              <Image
                src={room.images[1] || room.image}
                alt={`${room.name} Interior`}
                fill
                sizes="33vw"
                className="object-cover"
              />
            </div>
            <div className="relative rounded-[2px] overflow-hidden border border-[#C5A880]/20 bg-[#14171E]">
              <Image
                src={room.images[2] || room.image}
                alt={`${room.name} Bath`}
                fill
                sizes="33vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Suite Content & Sticky Booking Widget */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Suite Details Narrative */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
                Sanctuary Overview
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FAF8F5] mt-1">
                {room.name}
              </h1>

              {/* Specs Bar */}
              <div className="grid grid-cols-3 gap-4 py-4 mt-6 border-y border-[#C5A880]/15 text-xs text-[#D1D5E0]">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#C5A880]" />
                  <span>Up to {room.capacity} Guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="w-4 h-4 text-[#C5A880]" />
                  <span>{room.bedType}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-[#C5A880]" />
                  <span>{room.sizeSqFt} sq ft of Luxury</span>
                </div>
              </div>
            </div>

            {/* Narrative */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-[#FAF8F5]">About This Residence</h3>
              <p className="text-sm sm:text-base text-[#B0B6C7] leading-relaxed font-light">
                {room.description}
              </p>
              <p className="text-sm sm:text-base text-[#B0B6C7] leading-relaxed font-light">
                Every appointment reflects the pinnacle of modern craftsmanship. Acoustic soundproofing
                delivers total tranquility, while our dedicated 24-hour butler service ensures effortless
                fulfillment of every request, from garment steaming to midnight sommelier pairings.
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-4">
              <h3 className="font-serif text-2xl text-[#FAF8F5]">Suite Inclusions & Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {amenitiesList.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#14171E] border border-white/5 flex items-center gap-3 text-xs text-[#FAF8F5]"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#C5A880]/10 flex items-center justify-center text-[#DFC38E] shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h3 className="font-serif text-2xl text-[#FAF8F5]">House Policies & Privileges</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#A0A6B5]">
                <div className="space-y-1 p-4 bg-[#14171E] border border-white/5">
                  <div className="flex items-center gap-2 text-[#FAF8F5] font-medium">
                    <Clock className="w-4 h-4 text-[#C5A880]" />
                    <span>Check-in & Check-out</span>
                  </div>
                  <p>Check-in: 3:00 PM | Check-out: 12:00 PM (Complimentary late departure upon request for suites).</p>
                </div>

                <div className="space-y-1 p-4 bg-[#14171E] border border-white/5">
                  <div className="flex items-center gap-2 text-[#FAF8F5] font-medium">
                    <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                    <span>Cancellation Protocol</span>
                  </div>
                  <p>Flexible cancellation up to 48 hours prior to arrival with full refund.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sticky Booking Panel */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 luxury-card p-6 sm:p-8 border border-[#C5A880]/30 shadow-2xl space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#A0A6B5] block">
                  NIGHTLY ROYAL RATE
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] font-semibold">
                    {formatCurrency(room.pricePerNight)}
                  </span>
                  <span className="text-xs text-[#A0A6B5]">/ night</span>
                </div>
                <span className="text-[10px] text-emerald-400 mt-1 block">
                  Best Rate Guaranteed • Taxes & In-Suite Service Included
                </span>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                <div className="p-3 bg-[#14171E] border border-white/5 rounded-[2px] space-y-1">
                  <span className="text-[#8F94A3] text-[10px] uppercase tracking-wider block">
                    Immediate Inclusions
                  </span>
                  <div className="text-[#E0E3EB] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>24/7 Butler Service & Welcome Champagne</span>
                  </div>
                  <div className="text-[#E0E3EB] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Complimentary Thermal Vitality Spa Access</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/booking?roomId=${room.id}`}
                className="w-full luxury-btn-primary !py-3.5 text-xs text-center justify-center flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>RESERVE THIS SUITE</span>
              </Link>

              <div className="text-center">
                <Link
                  href="/contact"
                  className="text-[11px] text-[#A0A6B5] hover:text-[#DFC38E] transition-colors"
                >
                  Need bespoke diplomatic arrangements? Contact Concierge
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Suites */}
      {relatedRooms.length > 0 && (
        <section className="py-16 bg-[#090B0D] border-t border-[#C5A880]/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="font-serif text-2xl text-[#FAF8F5] mb-8">
              Explore Other Exceptional Suites
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedRooms.map((r) => (
                <RoomCard key={r.id} room={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
