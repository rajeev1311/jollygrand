'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone, ArrowRight, Award, Check } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#080A0D] border-t border-[#C5A880]/15 pt-16 sm:pt-20 pb-12 text-[#A0A6B5] relative overflow-hidden">
      {/* Subtle background ambient gold accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[150px] bg-[#C5A880]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-white/5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block focus:outline-none">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.2em] text-[#FAF8F5] font-medium block">
                JOLLY GRAND
              </span>
              <span className="text-[10px] tracking-[0.35em] text-[#C5A880] uppercase font-light">
                5-Star Luxury & Hospitality
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-[#8F94A3] max-w-sm">
              An architectural triumph where timeless luxury harmonizes with extraordinary hospitality.
              Indulge in Michelin-grade dining, restorative wellness, and bespoke royal suites curated
              for the world’s most discerning travelers.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {/* Instagram */}
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-[2px] border border-white/10 flex items-center justify-center text-[#FAF8F5]/80 hover:text-[#DFC38E] hover:border-[#DFC38E]/40 hover:bg-[#C5A880]/5 transition-all"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-9 h-9 rounded-[2px] border border-white/10 flex items-center justify-center text-[#FAF8F5]/80 hover:text-[#DFC38E] hover:border-[#DFC38E]/40 hover:bg-[#C5A880]/5 transition-all"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* Twitter / X */}
              <a
                href="#twitter"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-[2px] border border-white/10 flex items-center justify-center text-[#FAF8F5]/80 hover:text-[#DFC38E] hover:border-[#DFC38E]/40 hover:bg-[#C5A880]/5 transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>

            <div className="flex items-center gap-2 pt-2 text-xs text-[#DFC38E]/80">
              <Award className="w-4 h-4 text-[#C5A880]" />
              <span>Forbes Travel Guide Five-Star Award Winner 2026</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-[#FAF8F5] text-base tracking-wider uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider">
              {['Home', 'About', 'Rooms', 'Dining', 'Services', 'Gallery', 'Offers', 'Contact'].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                      className="hover:text-[#DFC38E] transition-colors flex items-center gap-1.5"
                    >
                      <span className="text-[#C5A880]/50 text-[10px]">›</span>
                      <span>{item}</span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Coordinates */}
          <div>
            <h4 className="font-serif text-[#FAF8F5] text-base tracking-wider uppercase mb-5">
              Concierge
            </h4>
            <ul className="space-y-4 text-xs">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0 mt-0.5" />
                <span>
                  742 Grand Royal Boulevard,
                  <br />
                  Central Promenade, JG 10022
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>+1 (800) 555-JGRD / +1 (212) 555-0199</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>concierge@jollygrand.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h4 className="font-serif text-[#FAF8F5] text-base tracking-wider uppercase">
              The Grand Gazette
            </h4>
            <p className="text-xs text-[#8F94A3] leading-relaxed">
              Subscribe to receive exclusive invitations, seasonal suites previews, and private culinary privileges.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#DFC38E] text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-[#DFC38E]" />
                <span>Thank you. You have been added to our private register.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-[#14171E] border border-white/10 text-xs text-[#FAF8F5] px-3.5 py-3 pr-10 rounded-[2px] focus:outline-none focus:border-[#C5A880] transition-colors placeholder:text-[#5F6575]"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#C5A880] hover:text-[#DFC38E] p-1 cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[10px] text-[#6E7382] block">
                  We respect your privacy. Unsubscribe at any time.
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6E7382] gap-4">
          <p>© 2026 Jolly Grand. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#DFC38E] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-[#DFC38E] transition-colors">
              Terms of Hospitality
            </Link>
            <Link href="/login" className="hover:text-[#DFC38E] transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
