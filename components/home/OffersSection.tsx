'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Tag, Check, Calendar, ArrowRight } from 'lucide-react';
import { OfferItem } from '@/types/hotel';
import { SectionHeading } from '@/components/ui/SectionHeading';

interface OffersSectionProps {
  offers: OfferItem[];
}

export function OffersSection({ offers }: OffersSectionProps) {
  return (
    <section className="py-24 sm:py-32 bg-[#0E1014] relative border-t border-[#C5A880]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="Exclusive Privileges"
          title="Curated Seasonal Experiences"
          description="Enhance your journey with bespoke packages tailored for romance, weekend escapes, executive summits, and rejuvenation."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.slice(0, 3).map((offer) => (
            <div
              key={offer.id}
              className="luxury-card group flex flex-col justify-between overflow-hidden border border-[#C5A880]/20"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#181C24]">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12151B] via-transparent to-black/30" />

                {/* Discount Badge */}
                <div className="absolute top-4 right-4 bg-[#C5A880] text-[#0E1014] font-semibold text-xs px-3 py-1 uppercase tracking-wider rounded-[2px] shadow-lg">
                  {offer.discountPercent}% SAVINGS
                </div>

                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-[#DFC38E] bg-black/60 backdrop-blur-md px-2.5 py-1 border border-white/10">
                  <Tag className="w-3 h-3" />
                  <span className="font-mono uppercase font-bold tracking-wider">{offer.code}</span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#FAF8F5] group-hover:text-[#DFC38E] transition-colors leading-tight">
                    {offer.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A0A6B5] mt-2.5 leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                {/* Benefits */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A880] font-semibold block">
                    PACKAGE INCLUSIONS
                  </span>
                  {offer.benefits.slice(0, 3).map((b, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#E0E3EB]">
                      <Check className="w-3.5 h-3.5 text-[#C5A880] shrink-0 mt-0.5" />
                      <span className="leading-snug">{b}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#8F94A3]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-[#C5A880]" />
                    <span>{offer.validity}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/booking?offer=${offer.code}`}
                    className="w-full luxury-btn-primary !py-2.5 text-xs text-center justify-center flex items-center gap-2"
                  >
                    <span>CLAIM PRIVILEGE</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/offers"
            className="luxury-btn-outline !py-3.5 !px-8 text-xs inline-flex items-center gap-2 group"
          >
            <span>VIEW ALL SPECIAL OFFERS & PACKAGES</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
