'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, Home, Search, ArrowRight } from 'lucide-react';

export function BookingBar() {
  const router = useRouter();

  // Tomorrow as default check-in, 3 days after as check-out
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const defaultOut = new Date(tomorrow);
  defaultOut.setDate(tomorrow.getDate() + 3);

  const formatDateValue = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDateValue(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDateValue(defaultOut));
  const [guests, setGuests] = useState('2');
  const [category, setCategory] = useState('ALL');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests,
      category,
    });
    router.push(`/booking?${params.toString()}`);
  };

  return (
    <div id="hotel-search-bar" className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 -mt-16 sm:-mt-20">
      <div className="bg-[#12151B]/95 backdrop-blur-2xl border border-[#C5A880]/30 p-4 sm:p-6 shadow-2xl shadow-black/80 rounded-[2px]">
        <div className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] mb-3 flex items-center gap-2 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
          Reserve Your Luxury Experience
        </div>

        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 items-end">
          {/* Check-In */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-[#A0A6B5] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
              Check-In Date
            </label>
            <input
              type="date"
              required
              min={formatDateValue(today)}
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-[#181C24] border border-white/10 text-xs sm:text-sm text-[#FAF8F5] px-3.5 py-3 rounded-[2px] focus:outline-none focus:border-[#C5A880] transition-colors"
            />
          </div>

          {/* Check-Out */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-[#A0A6B5] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
              Check-Out Date
            </label>
            <input
              type="date"
              required
              min={checkIn}
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-[#181C24] border border-white/10 text-xs sm:text-sm text-[#FAF8F5] px-3.5 py-3 rounded-[2px] focus:outline-none focus:border-[#C5A880] transition-colors"
            />
          </div>

          {/* Guests */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-[#A0A6B5] flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#C5A880]" />
              Guests
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-[#181C24] border border-white/10 text-xs sm:text-sm text-[#FAF8F5] px-3.5 py-3 rounded-[2px] focus:outline-none focus:border-[#C5A880] transition-colors"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="6">6+ Guests (Penthouse)</option>
            </select>
          </div>

          {/* Suite Preference */}
          <div className="space-y-1.5">
            <label className="text-[11px] uppercase tracking-wider text-[#A0A6B5] flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-[#C5A880]" />
              Room Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#181C24] border border-white/10 text-xs sm:text-sm text-[#FAF8F5] px-3.5 py-3 rounded-[2px] focus:outline-none focus:border-[#C5A880] transition-colors"
            >
              <option value="ALL">All Luxury Suites</option>
              <option value="DELUXE">Deluxe Rooms</option>
              <option value="GRAND_DELUXE">Grand Deluxe</option>
              <option value="EXECUTIVE_SUITE">Executive Suites</option>
              <option value="PRESIDENTIAL_SUITE">Presidential Suite</option>
            </select>
          </div>

          {/* Action Button */}
          <div>
            <button
              type="submit"
              className="w-full luxury-btn-primary !py-3 !px-4 text-xs font-semibold h-[46px] flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#0E1014] group-hover:scale-110 transition-transform" />
              <span>CHECK AVAILABILITY</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
