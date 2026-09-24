import React from 'react';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GalleryViewer } from '@/components/gallery/GalleryViewer';

export const metadata = {
  title: 'Visual Gallery & Perspectives | Jolly Grand',
  description: 'Explore the architectural majesty, royal residences, and fine dining atmospheres of Jolly Grand.',
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-[#0E1014] text-[#FAF8F5]">
      <Navbar />

      {/* Hero Header */}
      <section className="relative h-[55vh] min-h-[440px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2200&q=85"
          alt="Jolly Grand Visual Gallery"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1014] via-[#0E1014]/50 to-black/70" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#DFC38E] font-semibold bg-[#C5A880]/15 px-3 py-1 rounded-full border border-[#C5A880]/30 inline-block mb-4">
            Curated Visual Portfolio
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#FAF8F5] tracking-tight">
            Hotel Gallery
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#D1D5E0] max-w-xl mx-auto font-light leading-relaxed">
            Immerse yourself in evocative imagery showcasing our palatial residences, thermal spas, and panoramic rooftop vistas.
          </p>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Atmosphere & Design"
          title="Moments Captured in Timeless Serenity"
          description="Click any visual masterpiece to open high-definition view with lightbox and navigation."
        />

        <GalleryViewer />
      </section>

      <Footer />
    </main>
  );
}
