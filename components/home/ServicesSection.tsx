'use client';

import React from 'react';
import Link from 'next/link';
import {
  Crown,
  Sparkles,
  Waves,
  Utensils,
  Car,
  Dumbbell,
  Wifi,
  ShieldCheck,
  Coffee,
  CalendarDays,
  ArrowRight
} from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';

const SERVICES = [
  {
    icon: Crown,
    title: '24/7 Royal Concierge',
    desc: 'Private jet charters, opera reservations, bespoke city excursions, and personal shopping curators.',
    category: 'Elite Service',
  },
  {
    icon: Sparkles,
    title: 'Celestial Holistic Spa',
    desc: 'Ancient thermal baths, organic Himalayan salt saunas, and personalized Swiss anti-aging regimens.',
    category: 'Wellness',
  },
  {
    icon: Waves,
    title: 'Azure Infinity Heated Pool',
    desc: 'Panoramic rooftop infinity pool with submerged cabanas, cocktail mixology, and sunset acoustics.',
    category: 'Leisure',
  },
  {
    icon: Utensils,
    title: 'Michelin-Caliber Gastronomy',
    desc: 'Award-winning private dining rooms, sommelier-guided tastings, and 24-hour gourmet in-suite menu.',
    category: 'Culinary',
  },
  {
    icon: Car,
    title: 'Chauffeur Fleet & Transfers',
    desc: 'Bespoke Rolls-Royce Phantom and Mercedes-Maybach airport escorts with high-speed encrypted Wi-Fi.',
    category: 'Mobility',
  },
  {
    icon: Dumbbell,
    title: 'The Grand Atelier Gym',
    desc: 'Technogym Artis biometric equipment, personal Olympic trainers, and private sunrise yoga sessions.',
    category: 'Fitness',
  },
  {
    icon: CalendarDays,
    title: 'Banquets & State Summits',
    desc: 'Opulent crystal ballrooms and secure diplomatic boardrooms with advanced teleconferencing suites.',
    category: 'Private Events',
  },
  {
    icon: ShieldCheck,
    title: 'Valet & Discretion Protocol',
    desc: 'Round-the-clock secure subterranean parking, electric supercharging, and dedicated privacy escorts.',
    category: 'Security',
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 sm:py-32 bg-[#0E1014] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute right-0 top-1/3 w-80 h-80 bg-[#C5A880]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          subtitle="Signature Privileges"
          title="Curated Beyond Expectation"
          description="Every encounter at Jolly Grand is sculpted with quiet precision, intuitive thoughtfulness, and uncompromised discretion."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={idx}
                className="luxury-card p-7 group flex flex-col justify-between h-full relative overflow-hidden border border-[#C5A880]/15 hover:border-[#C5A880]/40 transition-all duration-400"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-[2px] bg-[#1F242F] border border-[#C5A880]/20 flex items-center justify-center text-[#DFC38E] group-hover:bg-[#C5A880] group-hover:text-[#0E1014] transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[9px] uppercase tracking-widest text-[#C5A880] font-medium px-2 py-0.5 border border-[#C5A880]/20 bg-[#C5A880]/5">
                      {srv.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg text-[#FAF8F5] group-hover:text-[#DFC38E] transition-colors mb-2.5">
                    {srv.title}
                  </h3>

                  <p className="text-xs text-[#A0A6B5] leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#C5A880]">
                  <span className="tracking-wider uppercase text-[10px] font-medium">Included / On Request</span>
                  <span className="group-hover:translate-x-1 transition-transform font-serif">→</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="luxury-btn-outline !py-3 !px-7 text-xs inline-flex items-center gap-2 group"
          >
            <span>EXPLORE ALL SERVICES & SPA MENU</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
