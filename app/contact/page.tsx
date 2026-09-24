import React from 'react';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Compass } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata = {
  title: 'Contact & Concierge | Jolly Grand',
  description: 'Reach the Chief Concierge desk, arrange airport chauffeur escorts, or enquire about banquet and penthouse reservations.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0E1014] text-[#FAF8F5]">
      <Navbar />

      {/* Hero Header */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2200&q=85"
          alt="Jolly Grand Concierge"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1014] via-[#0E1014]/50 to-black/70" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#DFC38E] font-semibold bg-[#C5A880]/15 px-3 py-1 rounded-full border border-[#C5A880]/30 inline-block mb-4">
            24/7 Royal Concierge
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#FAF8F5] tracking-tight">
            Connect With Jolly Grand
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#D1D5E0] max-w-xl mx-auto font-light leading-relaxed">
            Our dedicated guest relations team stands ready to assist with bespoke itineraries, private charters, and reservations.
          </p>
        </div>
      </section>

      {/* Content Section: Info & Form */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                Direct Coordinates
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5]">
                We Welcome Your Inquiries
              </h2>
              <p className="text-xs sm:text-sm text-[#A0A6B5] leading-relaxed">
                Whether organizing an intimate state summit, curating a honeymoon anniversary, or securing
                private helicopter transfer, our concierge provides round-the-clock discretion.
              </p>
            </div>

            {/* Coordinates Cards */}
            <div className="space-y-4 text-xs">
              <div className="luxury-card p-5 border border-[#C5A880]/15 flex items-start gap-4">
                <div className="w-10 h-10 rounded-[2px] bg-[#181C24] border border-[#C5A880]/20 flex items-center justify-center text-[#DFC38E] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm text-[#FAF8F5] font-medium">Hotel Address</h4>
                  <p className="text-[#A0A6B5] mt-1 leading-relaxed">
                    742 Grand Royal Boulevard, Central Promenade<br />
                    JG 10022, United States
                  </p>
                </div>
              </div>

              <div className="luxury-card p-5 border border-[#C5A880]/15 flex items-start gap-4">
                <div className="w-10 h-10 rounded-[2px] bg-[#181C24] border border-[#C5A880]/20 flex items-center justify-center text-[#DFC38E] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm text-[#FAF8F5] font-medium">Telephone Concierge</h4>
                  <p className="text-[#A0A6B5] mt-1">
                    Toll-Free: +1 (800) 555-JGRD<br />
                    International: +1 (212) 555-0199
                  </p>
                </div>
              </div>

              <div className="luxury-card p-5 border border-[#C5A880]/15 flex items-start gap-4">
                <div className="w-10 h-10 rounded-[2px] bg-[#181C24] border border-[#C5A880]/20 flex items-center justify-center text-[#DFC38E] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm text-[#FAF8F5] font-medium">Direct Inquiries</h4>
                  <p className="text-[#A0A6B5] mt-1">
                    General: concierge@jollygrand.com<br />
                    Reservations: stay@jollygrand.com
                  </p>
                </div>
              </div>

              <div className="luxury-card p-5 border border-[#C5A880]/15 flex items-start gap-4">
                <div className="w-10 h-10 rounded-[2px] bg-[#181C24] border border-[#C5A880]/20 flex items-center justify-center text-[#DFC38E] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm text-[#FAF8F5] font-medium">Reception & Valet Hours</h4>
                  <p className="text-[#A0A6B5] mt-1">
                    Front Desk: 24 Hours / 7 Days a Week<br />
                    Check-in: 3:00 PM | Check-out: 12:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Backend Contact Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Styled Luxury Map Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="luxury-card overflow-hidden border border-[#C5A880]/20 relative aspect-[21/9] min-h-[300px]">
          {/* Map Image representation with stylized pin overlay */}
          <Image
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=2000&q=80"
            alt="Jolly Grand Map Location"
            fill
            sizes="100vw"
            className="object-cover filter grayscale contrast-125 brightness-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1014] via-transparent to-black/60" />

          {/* Centered Map Marker Card */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-[#12151B]/95 backdrop-blur-md border border-[#C5A880]/40 p-6 rounded-[2px] shadow-2xl text-center max-w-sm">
              <div className="w-10 h-10 rounded-full bg-[#C5A880]/20 text-[#DFC38E] border border-[#C5A880]/40 flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-lg text-[#FAF8F5]">JOLLY GRAND</h4>
              <p className="text-xs text-[#A0A6B5] mt-1">
                742 Grand Royal Boulevard, Central Promenade
              </p>
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-[10px] text-[#DFC38E] uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5" />
                <span>Helipad & Private Marina On-Site</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
