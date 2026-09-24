'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Calendar, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { name: 'HOME', href: '/' },
  { name: 'ABOUT', href: '/about' },
  { name: 'ROOMS', href: '/rooms' },
  { name: 'DINING', href: '/dining' },
  { name: 'SERVICES', href: '/services' },
  { name: 'GALLERY', href: '/gallery' },
  { name: 'OFFERS', href: '/offers' },
  { name: 'CONTACT', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isDarkBgNeeded = isScrolled || pathname !== '/';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
          isDarkBgNeeded
            ? 'bg-[#0E1014]/90 backdrop-blur-xl border-b border-[#C5A880]/20 py-3 sm:py-4 shadow-xl shadow-black/40'
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5 sm:py-6'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              href="/"
              className="group flex flex-col items-start focus:outline-none"
              aria-label="Jolly Grand Home"
            >
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl tracking-[0.22em] text-[#FAF8F5] group-hover:text-[#DFC38E] transition-colors font-medium">
                  JOLLY GRAND
                </span>
              </div>
              <span className="text-[9px] tracking-[0.35em] text-[#C5A880] uppercase -mt-0.5 font-light">
                Hotel & Resort
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-7" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      'text-xs tracking-[0.2em] font-medium transition-all duration-300 relative py-1.5',
                      isActive
                        ? 'text-[#DFC38E]'
                        : 'text-[#FAF8F5]/80 hover:text-[#DFC38E]'
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A880] to-transparent animate-in fade-in duration-300" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Side CTAs */}
            <div className="hidden sm:flex items-center gap-4">
              <Link
                href="/login"
                title="Staff / Admin Portal"
                className="text-[#A0A6B5] hover:text-[#DFC38E] p-2 transition-colors rounded-full hover:bg-white/5"
              >
                <Lock className="w-4 h-4" />
                <span className="sr-only">Manager Portal</span>
              </Link>

              <Link
                href="/booking"
                className="luxury-btn-primary !py-2.5 !px-5 text-xs shadow-md"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Your Stay</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 xl:hidden">
              <Link
                href="/booking"
                className="sm:hidden luxury-btn-primary !py-1.5 !px-3 text-[10px]"
              >
                Book
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#FAF8F5] hover:text-[#DFC38E] transition-colors focus:outline-none rounded-[2px]"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#0E1014] border-l border-[#C5A880]/20 p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#C5A880]/15">
                <div>
                  <h3 className="font-serif text-lg tracking-[0.2em] text-[#FAF8F5]">
                    JOLLY GRAND
                  </h3>
                  <span className="text-[8px] tracking-[0.3em] text-[#C5A880] uppercase">
                    5-Star Luxury
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-[#FAF8F5]/70 hover:text-[#DFC38E]"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-4">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        'text-sm tracking-[0.2em] font-medium py-2.5 transition-colors border-b border-white/5 flex items-center justify-between',
                        isActive ? 'text-[#DFC38E]' : 'text-[#FAF8F5]/85 hover:text-[#DFC38E]'
                      )}
                    >
                      <span>{link.name}</span>
                      <span className="text-xs text-[#C5A880]/50 font-serif">→</span>
                    </Link>
                  );
                })}
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xs tracking-[0.18em] text-[#A0A6B5] hover:text-[#DFC38E] py-2 flex items-center gap-2 mt-2"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>MANAGEMENT PORTAL</span>
                </Link>
              </nav>
            </div>

            <div className="mt-8 pt-6 border-t border-[#C5A880]/15 space-y-4">
              <Link
                href="/booking"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full luxury-btn-primary flex items-center justify-center py-3 text-xs"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Your Stay
              </Link>
              <div className="text-center text-[11px] text-[#A0A6B5]">
                Concierge Direct: +1 (800) 555-JGRD
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
