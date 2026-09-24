import React from 'react';
import Link from 'next/link';
import { Compass, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0E1014] text-[#FAF8F5] flex flex-col justify-between">
      <Navbar />

      <section className="flex-1 flex items-center justify-center py-32 px-4 text-center">
        <div className="max-w-lg space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#181C24] border border-[#C5A880]/30 flex items-center justify-center text-[#DFC38E] mx-auto">
            <Compass className="w-8 h-8" />
          </div>

          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold block">
            Error 404 • Destination Not Found
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#FAF8F5]">
            A Path Uncharted
          </h1>

          <p className="text-xs sm:text-sm text-[#A0A6B5] leading-relaxed">
            The sanctuary or page you are seeking appears to have moved or does not exist.
            Allow us to escort you back to our grand foyer.
          </p>

          <div className="pt-4 flex items-center justify-center gap-4">
            <Link
              href="/"
              className="luxury-btn-primary !py-3 !px-6 text-xs flex items-center gap-2"
            >
              <span>RETURN TO MAIN FOYER</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/rooms"
              className="luxury-btn-outline !py-3 !px-6 text-xs"
            >
              EXPLORE SUITES
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
