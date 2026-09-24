import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { BookingBar } from '@/components/home/BookingBar';
import { AboutSection } from '@/components/home/AboutSection';
import { RoomsSection } from '@/components/home/RoomsSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { DiningSection } from '@/components/home/DiningSection';
import { OffersSection } from '@/components/home/OffersSection';
import { GalleryPreview } from '@/components/home/GalleryPreview';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { getRooms, getOffers } from '@/lib/db/store';

export const revalidate = 0; // Fresh content

export default async function HomePage() {
  const [rooms, offers] = await Promise.all([
    getRooms(),
    getOffers(),
  ]);

  return (
    <main className="min-h-screen bg-[#0E1014] text-[#FAF8F5]">
      {/* Premium Luxury Navbar */}
      <Navbar />

      {/* Cinematic Fullscreen Hero */}
      <Hero />

      {/* Floating Integrated Hotel Search / Booking Bar */}
      <BookingBar />

      {/* About Section: Story, Philosophy, Split Layout, Statistics */}
      <AboutSection />

      {/* Rooms Showcase with Category Tabs */}
      <RoomsSection initialRooms={rooms} />

      {/* Signature Services & Amenities Showcase */}
      <ServicesSection />

      {/* Michelin Fine Dining & Rooftop Spotlight */}
      <DiningSection />

      {/* Exclusive Seasonal Offers & Privileges */}
      <OffersSection offers={offers} />

      {/* Interactive Photo Gallery with Lightbox */}
      <GalleryPreview />

      {/* Global Accolades & Guest Testimonials */}
      <TestimonialsSection />

      {/* 5-Star Grand Luxury Footer */}
      <Footer />
    </main>
  );
}
