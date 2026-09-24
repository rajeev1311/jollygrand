'use client';

import React, { useState } from 'react';
import { Settings, Shield, Clock, MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function SettingsView() {
  const [saved, setSaved] = useState(false);
  const [hotelName, setHotelName] = useState('JOLLY GRAND');
  const [tagline, setTagline] = useState('Where Luxury Meets Extraordinary Hospitality');
  const [phone, setPhone] = useState('+1 (800) 555-JGRD');
  const [email, setEmail] = useState('concierge@jollygrand.com');
  const [address, setAddress] = useState('742 Grand Royal Boulevard, Central Promenade, JG 10022');
  const [checkInTime, setCheckInTime] = useState('15:00 (3:00 PM)');
  const [checkOutTime, setCheckOutTime] = useState('12:00 (12:00 PM)');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="bg-[#14171E] p-4 border border-[#C5A880]/15 rounded-[2px]">
        <h3 className="font-serif text-lg text-[#FAF8F5]">Hotel System & Property Configuration</h3>
        <p className="text-xs text-[#A0A6B5]">
          Manage general hospitality parameters, check-in schedules, and administrative security.
        </p>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>System configuration successfully synchronized and updated.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Brand Section */}
        <div className="luxury-card p-6 border border-[#C5A880]/15 space-y-4">
          <h4 className="font-serif text-base text-[#DFC38E] border-b border-white/5 pb-2">
            Property Brand & Hospitality Profile
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-[#A0A6B5] uppercase">Hotel Brand Name</label>
              <input
                type="text"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-2.5 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#A0A6B5] uppercase">Brand Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-2.5 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="luxury-card p-6 border border-[#C5A880]/15 space-y-4">
          <h4 className="font-serif text-base text-[#DFC38E] border-b border-white/5 pb-2">
            Check-In & Operating Timetable
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-[#A0A6B5] uppercase">Standard Check-In Time</label>
              <input
                type="text"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-2.5 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#A0A6B5] uppercase">Standard Check-Out Time</label>
              <input
                type="text"
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e.target.value)}
                className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-2.5 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>
        </div>

        {/* Concierge Coordinates */}
        <div className="luxury-card p-6 border border-[#C5A880]/15 space-y-4">
          <h4 className="font-serif text-base text-[#DFC38E] border-b border-white/5 pb-2">
            Concierge Direct Communication Channels
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-[#A0A6B5] uppercase">Concierge Telephone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-2.5 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#A0A6B5] uppercase">Concierge Official Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-2.5 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <label className="text-[#A0A6B5] uppercase">Physical Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-2.5 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" size="md">
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
