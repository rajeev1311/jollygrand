'use client';

import React, { useState } from 'react';
import { Guest } from '@/types/hotel';
import { Users, Mail, Phone, Calendar, Search } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface GuestsViewProps {
  guests: Guest[];
}

export function GuestsView({ guests }: GuestsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = guests.filter(
    (g) =>
      g.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.phone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#14171E] p-4 border border-[#C5A880]/15 rounded-[2px]">
        <div>
          <h3 className="font-serif text-lg text-[#FAF8F5]">Distinguished Guest Registry</h3>
          <p className="text-xs text-[#A0A6B5]">
            Overview of VIP guests, contact profiles, and reservation histories.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#A0A6B5] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search guests by name or email..."
            className="w-full bg-[#181C24] border border-white/10 text-xs text-[#FAF8F5] pl-9 pr-4 py-2 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((guest) => {
          const bookingCount = guest.bookings?.length || 0;
          return (
            <div
              key={guest.id}
              className="luxury-card p-6 border border-[#C5A880]/20 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#181C24] border border-[#C5A880]/30 flex items-center justify-center font-serif text-[#DFC38E] text-base font-bold">
                    {guest.firstName[0]}
                    {guest.lastName[0]}
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-[#FAF8F5]">
                      {guest.firstName} {guest.lastName}
                    </h4>
                    <span className="text-[10px] text-[#C5A880] tracking-widest uppercase">
                      VIP Guest Record
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-[#A0A6B5] pt-2 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                    <span className="truncate">{guest.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                    <span>{guest.phone}</span>
                  </div>
                  {guest.createdAt && (
                    <div className="flex items-center gap-2 text-[11px] text-[#8F94A3]">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
                      <span>Member since {formatDate(guest.createdAt)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-[#8F94A3]">Reservations on record:</span>
                <span className="font-serif font-bold text-[#DFC38E] bg-[#C5A880]/10 px-2 py-0.5 rounded-[2px] border border-[#C5A880]/20">
                  {bookingCount} {bookingCount === 1 ? 'Stay' : 'Stays'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
