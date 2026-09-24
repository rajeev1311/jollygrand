import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Compass, Sparkles, HeartHandshake, ShieldCheck, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';

export const metadata = {
  title: 'About Us | The Jolly Grand Heritage & Philosophy',
  description: 'Discover the heritage, architectural grandeur, and philosophy of hospitality that defines Jolly Grand.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0E1014] text-[#FAF8F5]">
      <Navbar />

      {/* Hero Header */}
      <section className="relative h-[60vh] min-h-[460px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2200&q=85"
          alt="Jolly Grand Heritage"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1014] via-[#0E1014]/40 to-black/70" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#DFC38E] font-semibold bg-[#C5A880]/15 px-3 py-1 rounded-full border border-[#C5A880]/30 inline-block mb-4">
            The Heritage & Ethos
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#FAF8F5] tracking-tight">
            Our Story & Legacy
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#D1D5E0] max-w-xl mx-auto font-light leading-relaxed">
            Founded with an enduring devotion to quiet splendor, timeless grace, and the art of personalized service.
          </p>
        </div>
      </section>

      {/* Narrative Section with Split Images */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              align="left"
              subtitle="The Founding Vision"
              title="A Sanctuary Born from Passion"
              className="!mb-6"
            />
            <p className="text-base text-[#DFC38E] font-serif italic">
              “We sought to create a hotel where the world’s most discerning travelers could find absolute peace, exquisite beauty, and hospitality that feels like an art form.”
            </p>
            <p className="text-sm text-[#A0A6B5] leading-relaxed">
              Jolly Grand was envisioned more than two decades ago as an architectural triumph designed
              to stand outside the rapid turnover of contemporary trends. From the choice of hand-carved
              Italian travertine to custom acoustic glass and sustainable geothermal thermal baths, every
              facet was deliberated with uncompromising standards.
            </p>
            <p className="text-sm text-[#A0A6B5] leading-relaxed">
              Today, our property stands among the world’s most venerated luxury landmarks, hosting dignitaries,
              connoisseurs, and families seeking an indelible hospitality experience.
            </p>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] rounded-[2px] overflow-hidden border border-[#C5A880]/20 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85"
                alt="Jolly Grand Architecture"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pillars of Hospitality */}
      <section className="py-20 bg-[#0A0C0E] border-t border-[#C5A880]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            subtitle="Core Philosophy"
            title="The Four Pillars of Jolly Grand"
            description="Our service is guided by timeless values that ensure every moment is memorable."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Sparkles,
                title: 'Unrivaled Splendor',
                desc: 'Bespoke materials, curated artwork, and palatial proportions in every private residence.',
              },
              {
                icon: HeartHandshake,
                title: 'Intuitive Hospitality',
                desc: 'Attentive, discreet, and personalized butler service that anticipates your needs before you utter them.',
              },
              {
                icon: Compass,
                title: 'Culinary Artistry',
                desc: 'World-renowned chefs orchestrating three-star gastronomic journeys and rare cellar vintages.',
              },
              {
                icon: ShieldCheck,
                title: 'Complete Sanctuary',
                desc: 'Acoustic tranquility, total privacy, and discreet security protocols for peace of mind.',
              },
            ].map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div key={i} className="luxury-card p-6 border border-[#C5A880]/15 space-y-3">
                  <div className="w-10 h-10 rounded-[2px] bg-[#181C24] border border-[#C5A880]/20 flex items-center justify-center text-[#DFC38E]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg text-[#FAF8F5]">{pillar.title}</h3>
                  <p className="text-xs text-[#A0A6B5] leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center max-w-4xl mx-auto px-4">
        <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5]">
          Experience The Jolly Grand Heritage Firsthand
        </h2>
        <p className="text-sm text-[#A0A6B5] mt-3 mb-8">
          Reserve your suite and allow our team of dedicated butlers to craft your stay.
        </p>
        <Link href="/booking" className="luxury-btn-primary !py-3.5 !px-8 text-xs inline-flex items-center gap-2">
          <span>RESERVE YOUR STAY</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      <Footer />
    </main>
  );
}
