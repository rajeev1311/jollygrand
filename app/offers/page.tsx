import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tag, Check, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getOffers } from '@/lib/db/store';

export const metadata = {
  title: 'Exclusive Offers & Luxury Packages | Jolly Grand',
  description: 'Unlock seasonal packages, romantic getaways, executive summits, and advance purchase privileges at Jolly Grand.',
};

export const revalidate = 0;

export default async function OffersPage() {
  const offers = await getOffers();

  return (
    <main className="min-h-screen bg-[#0E1014] text-[#FAF8F5]">
      <Navbar />

      {/* Hero Header */}
      <section className="relative h-[55vh] min-h-[440px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=2200&q=85"
          alt="Jolly Grand Luxury Packages"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1014] via-[#0E1014]/50 to-black/70" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#DFC38E] font-semibold bg-[#C5A880]/15 px-3 py-1 rounded-full border border-[#C5A880]/30 inline-block mb-4">
            Curated Privileges
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#FAF8F5] tracking-tight">
            Special Offers & Packages
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#D1D5E0] max-w-xl mx-auto font-light leading-relaxed">
            Enhance your stay with bespoke packages encompassing champagne breakfasts, couples spa treatments, and executive upgrades.
          </p>
        </div>
      </section>

      {/* Offers List */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <SectionHeading
          subtitle="Seasonal Collections"
          title="Exclusive Hospitality Packages"
          description="Select from our tailored experiences designed to elevate every occasion."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="luxury-card border border-[#C5A880]/20 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#181C24]">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12151B] via-transparent to-black/40" />

                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4 bg-[#C5A880] text-[#0E1014] text-xs font-bold px-3 py-1 uppercase tracking-wider rounded-[2px] shadow-lg">
                    {offer.discountPercent}% SAVINGS
                  </div>

                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-mono font-bold text-[#DFC38E] border border-white/10 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>CODE: {offer.code}</span>
                  </div>
                </div>

                <div className="p-8 space-y-4">
                  <h3 className="font-serif text-2xl text-[#FAF8F5] group-hover:text-[#DFC38E] transition-colors leading-snug">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-[#A0A6B5] leading-relaxed">
                    {offer.description}
                  </p>

                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] uppercase tracking-wider text-[#C5A880] font-semibold block">
                      PACKAGE INCLUSIONS:
                    </span>
                    {offer.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#E0E3EB]">
                        <Check className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                        <span className="leading-snug">{b}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#8F94A3]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{offer.validity}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-[#14171E] border-t border-white/5">
                <Link
                  href={`/booking?offer=${offer.code}`}
                  className="w-full luxury-btn-primary !py-3 text-xs text-center justify-center flex items-center gap-2"
                >
                  <span>RESERVE THIS PACKAGE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
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
