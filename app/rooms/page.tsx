import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RoomCard } from '@/components/rooms/RoomCard';
import { getRooms } from '@/lib/db/store';
import Image from 'next/image';

export const revalidate = 0;

export default async function RoomsPage() {
  const rooms = await getRooms();

  return (
    <main className="min-h-screen bg-[#0E1014] text-[#FAF8F5]">
      <Navbar />

      {/* Hero Header */}
      <section className="relative h-[55vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=2000&q=85"
          alt="Jolly Grand Luxury Suites"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1014] via-[#0E1014]/40 to-black/70" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-16">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#DFC38E] font-semibold bg-[#C5A880]/15 px-3 py-1 rounded-full border border-[#C5A880]/30 inline-block mb-4">
            Five-Star Residences
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#FAF8F5] tracking-tight">
            Rooms & Suites
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#D1D5E0] max-w-xl mx-auto font-light leading-relaxed">
            Palatial private retreats infused with Italian travertine, custom handcrafted walnut woodwork,
            and personal butler service.
          </p>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Sanctuary Catalog"
          title="Choose Your Private Haven"
          description="Explore our bespoke collection of deluxe rooms, panoramic skyline suites, and palatial penthouse wings."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
