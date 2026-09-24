import React from 'react';
import Image from 'next/image';
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
  Calendar,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { formatCurrency } from '@/lib/utils';
import { getServices } from '@/lib/db/store';

export const metadata = {
  title: 'Luxury Services & Amenities | Jolly Grand',
  description: 'Explore the royal concierge, celestial spa, private transfers, and bespoke amenities at Jolly Grand.',
};

export const revalidate = 0;

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="min-h-screen bg-[#0E1014] text-[#FAF8F5]">
      <Navbar />

      {/* Hero Header */}
      <section className="relative h-[55vh] min-h-[440px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2200&q=85"
          alt="Jolly Grand Services & Spa"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1014] via-[#0E1014]/50 to-black/70" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#DFC38E] font-semibold bg-[#C5A880]/15 px-3 py-1 rounded-full border border-[#C5A880]/30 inline-block mb-4">
            Five-Star Privileges
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#FAF8F5] tracking-tight">
            Services & Amenities
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#D1D5E0] max-w-xl mx-auto font-light leading-relaxed">
            Every moment curated with exquisite precision, holistic wellness, and royal discretion.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Hospitality Portfolio"
          title="Bespoke Guest Privileges"
          description="From therapeutic thermal baths to high-speed luxury vehicle transfers, our services redefine modern hospitality."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => (
            <div
              key={srv.id}
              className="luxury-card border border-[#C5A880]/20 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#181C24]">
                  <Image
                    src={srv.image}
                    alt={srv.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12151B] via-transparent to-black/30" />
                  <span className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#DFC38E] border border-white/10">
                    {srv.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-serif text-xl text-[#FAF8F5] group-hover:text-[#DFC38E] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A0A6B5] leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#DFC38E]">
                    {srv.duration && (
                      <div className="flex items-center gap-1.5 text-[#B8B3AA]">
                        <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{srv.duration}</span>
                      </div>
                    )}
                    {srv.price ? (
                      <span className="font-serif font-bold text-sm text-[#FAF8F5]">
                        From {formatCurrency(srv.price)}
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#C5A880] uppercase tracking-wider">
                        Complimentary for Guests
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#14171E] border-t border-white/5">
                <Link
                  href={`/contact?service=${encodeURIComponent(srv.title)}`}
                  className="w-full luxury-btn-outline !py-2.5 text-xs text-center justify-center flex items-center gap-2"
                >
                  <span>REQUEST WITH CONCIERGE</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
