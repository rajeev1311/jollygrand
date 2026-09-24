import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy & Guest Discretion | Jolly Grand',
  description: 'The Jolly Grand commitment to guest privacy, encryption protocols, and discreet hospitality.',
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0E1014] text-[#FAF8F5]">
      <Navbar />

      <section className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/15 text-[#DFC38E] text-[10px] tracking-[0.25em] uppercase font-semibold border border-[#C5A880]/30">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
            DISCRETION CHARTER
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#FAF8F5]">
            Privacy & Guest Discretion Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#A0A6B5]">
            Effective Date: Updated for 2026 Season
          </p>
        </div>

        <div className="luxury-card p-8 sm:p-12 border border-[#C5A880]/20 space-y-8 text-xs sm:text-sm text-[#C2C7D6] leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl text-[#FAF8F5] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#C5A880]" />
              1. Our Uncompromising Commitment to Discretion
            </h2>
            <p>
              At Jolly Grand, guest confidentiality and peace of mind are foundational to our hospitality
              philosophy. Whether staying for diplomatic summits, executive retreats, or private leisure,
              we enforce rigorous discretion standards to protect personal coordinates and stay itineraries.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-[#FAF8F5] flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#C5A880]" />
              2. Information We Collect
            </h2>
            <p>
              When reserving a residence or communicating with our Royal Concierge, we collect only the
              information essential to deliver an impeccable stay:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[#A0A6B5]">
              <li>Contact coordinates: Full name, verified email, telephone number</li>
              <li>Stay preferences: Suite category, arrival & departure dates, dietary or bedding requests</li>
              <li>Payment verification details handled via PCI-DSS compliant financial encryption gateways</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-[#FAF8F5] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#C5A880]" />
              3. Data Protection & Non-Disclosure
            </h2>
            <p>
              We do not sell, rent, or trade guest personal information under any circumstance. Data is stored
              in encrypted databases and accessible strictly by authorized senior management personnel.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-[#FAF8F5]">
              4. Contacting Our Data Protection Officer
            </h2>
            <p>
              For inquiries regarding personal records, stay history deletion, or confidentiality agreements,
              please address your correspondence to:
            </p>
            <div className="p-4 bg-[#14171E] border border-white/5 rounded-[2px] font-mono text-xs text-[#DFC38E]">
              Data Protection & Legal Affairs<br />
              Jolly Grand Hospitality Group<br />
              Email: legal@jollygrand.com
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}
