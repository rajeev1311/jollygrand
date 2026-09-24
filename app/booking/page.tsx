import React, { Suspense } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { BookingWizard } from '@/components/booking/BookingWizard';
import { getRooms } from '@/lib/db/store';
import Image from 'next/image';

export const revalidate = 0;

export default async function BookingPage() {
  const rooms = await getRooms();

  return (
    <main className="min-h-screen bg-[#0E1014] text-[#FAF8F5]">
      <Navbar />

      {/* Header Banner */}
      <section className="relative h-[40vh] min-h-[320px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=2000&q=85"
          alt="Jolly Grand Reservation"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1014] via-[#0E1014]/50 to-black/70" />

        <div className="relative z-10 text-center max-w-3xl mx-auto px-4 pt-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#DFC38E] font-semibold bg-[#C5A880]/15 px-3 py-1 rounded-full border border-[#C5A880]/30 inline-block mb-3">
            Bespoke Reservations
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#FAF8F5] tracking-tight">
            Reserve Your Stay
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#C2C7D6] font-light">
            Indulge in royal comfort. Complete your reservation in five simple steps.
          </p>
        </div>
      </section>

      {/* Wizard Container */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Suspense fallback={<div className="text-center py-20 text-[#DFC38E]">Preparing reservation system...</div>}>
          <BookingWizard rooms={rooms} />
        </Suspense>
      </section>

      <Footer />
    </main>
  );
}
