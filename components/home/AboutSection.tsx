'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const STATS = [
  { value: '20+', label: 'Years of Royal Hospitality' },
  { value: '120+', label: 'Luxury Suites & Villas' },
  { value: '15+', label: 'Signature Experiences' },
  { value: '24/7', label: 'Bespoke Guest Service' },
];

export function AboutSection() {
  return (
    <section className="py-24 sm:py-32 relative bg-[#0E1014] overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C5A880]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Storytelling & Split Images */}
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 w-full sm:w-[85%] aspect-[4/5] overflow-hidden border border-[#C5A880]/20 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85"
                alt="Jolly Grand Architecture"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Overlapping secondary image */}
            <div className="hidden sm:block absolute -bottom-10 -right-4 w-[60%] aspect-[4/3] border-2 border-[#12151B] z-20 shadow-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
                alt="Luxury Spa Lounge"
                fill
                sizes="30vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-4 text-xs font-serif text-[#DFC38E] tracking-wider">
                The Celestial Spa
              </div>
            </div>

            {/* Floating Gold Experience Badge */}
            <div className="absolute top-8 -left-4 sm:-left-8 z-30 bg-[#12151B]/95 backdrop-blur-md border border-[#C5A880]/40 p-4 shadow-xl max-w-[200px]">
              <Sparkles className="w-5 h-5 text-[#C5A880] mb-1.5" />
              <div className="text-[10px] uppercase tracking-widest text-[#DFC38E] font-medium">
                Distinction
              </div>
              <p className="text-xs text-[#E0E3EB] leading-tight font-serif mt-1">
                Conde Nast Traveler Readers’ Choice #1
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Statistics */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              align="left"
              subtitle="The Jolly Grand Heritage"
              title="A Legacy of Uncompromising Elegance"
              className="!mb-6"
            />

            <p className="text-base sm:text-lg text-[#DFC38E] font-serif italic leading-relaxed">
              “True luxury is not merely opulent surroundings, but the invisible choreography of thoughtful hospitality.”
            </p>

            <p className="text-sm sm:text-base text-[#A0A6B5] leading-relaxed">
              Founded on the belief that travel should awaken the senses, Jolly Grand stands as a beacon
              of timeless grace and modern architectural brilliance. From our hand-carved travertine columns
              to our private botanical courtyards, every detail has been meticulously sculpted to cocoon you
              in quiet splendor.
            </p>

            <p className="text-sm sm:text-base text-[#A0A6B5] leading-relaxed">
              Whether you are savoring private cellar vintages in our rooftop lounge, enjoying restorative
              therapies in our subterranean thermal baths, or retreating to our palatial suites, our dedicated
              butler service ensures your experience is seamless, personalized, and unforgettable.
            </p>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#C5A880]/15">
              {STATS.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#DFC38E] font-normal tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#8F94A3] uppercase tracking-wider font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-6">
              <Link
                href="/about"
                className="luxury-btn-outline text-xs !py-3 !px-6 flex items-center gap-2 group"
              >
                <span>DISCOVER OUR STORY</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
