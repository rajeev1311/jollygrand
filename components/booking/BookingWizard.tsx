'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Calendar,
  Users,
  Check,
  CheckCircle2,
  Bed,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Printer,
  Sparkles,
  CreditCard
} from 'lucide-react';
import { Room, Booking } from '@/types/hotel';
import { Button } from '@/components/ui/Button';
import { formatCurrency, formatDate, calculateNights } from '@/lib/utils';
import { createBookingApi } from '@/services/bookingService';

interface BookingWizardProps {
  rooms: Room[];
}

export function BookingWizard({ rooms }: BookingWizardProps) {
  const searchParams = useSearchParams();

  // Query parameter presets
  const paramRoomId = searchParams.get('roomId');
  const paramCheckIn = searchParams.get('checkIn');
  const paramCheckOut = searchParams.get('checkOut');
  const paramGuests = searchParams.get('guests');

  // Dates defaults
  const today = new Date();
  const defaultIn = new Date(today);
  defaultIn.setDate(today.getDate() + 1);
  const defaultOut = new Date(defaultIn);
  defaultOut.setDate(defaultIn.getDate() + 3);

  const formatDateValue = (d: Date) => d.toISOString().split('T')[0];

  // Wizard state: Steps 1 to 5
  const [step, setStep] = useState<number>(paramRoomId ? 3 : 1);
  const [checkIn, setCheckIn] = useState<string>(paramCheckIn || formatDateValue(defaultIn));
  const [checkOut, setCheckOut] = useState<string>(paramCheckOut || formatDateValue(defaultOut));
  const [guestCount, setGuestCount] = useState<number>(paramGuests ? Number(paramGuests) : 2);
  const [selectedRoomId, setSelectedRoomId] = useState<string>(paramRoomId || (rooms[0]?.id ?? ''));

  // Guest Details
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // API Submission & Confirmation State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId) || rooms[0];
  const nights = calculateNights(checkIn, checkOut);
  const basePrice = (selectedRoom?.pricePerNight || 480) * nights;
  const taxesAndService = Math.round(basePrice * 0.14);
  const grandTotal = basePrice + taxesAndService;

  // Handle Step 4 -> 5: Actually call POST /api/bookings
  const handleConfirmReservation = async () => {
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const res = await createBookingApi({
        guest: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
        },
        roomId: selectedRoom.id,
        checkIn,
        checkOut,
        guests: guestCount,
        specialRequests: specialRequests.trim() || undefined,
      });

      if (!res.success || !res.booking) {
        throw new Error(res.error || 'Failed to complete reservation');
      }

      setConfirmedBooking(res.booking);
      setStep(5);
    } catch (err: any) {
      setSubmissionError(err.message || 'An error occurred while creating your reservation.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsList = [
    { num: 1, label: 'Dates & Guests' },
    { num: 2, label: 'Select Suite' },
    { num: 3, label: 'Guest Details' },
    { num: 4, label: 'Summary' },
    { num: 5, label: 'Confirmation' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Wizard Progress Stepper */}
      <div className="mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 -translate-y-1/2 z-0" />
          {stepsList.map((s) => {
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div key={s.num} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                      : isCurrent
                      ? 'bg-[#C5A880] text-black ring-4 ring-[#C5A880]/20 font-bold'
                      : 'bg-[#181C24] text-[#A0A6B5] border border-white/10'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span
                  className={`text-[10px] tracking-wider uppercase mt-2 hidden sm:block font-medium ${
                    isCurrent ? 'text-[#DFC38E]' : 'text-[#8F94A3]'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP 1: SELECT DATES & GUESTS */}
      {step === 1 && (
        <div className="luxury-card p-6 sm:p-10 border border-[#C5A880]/20 space-y-8 animate-in fade-in duration-300">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
              Step 1 of 5
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] mt-1">
              Select Your Stay Dates & Travel Party
            </h2>
            <p className="text-xs sm:text-sm text-[#A0A6B5] mt-1">
              Specify your arrival and departure schedule to verify real-time suite availability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#A0A6B5] flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-[#C5A880]" />
                Check-In Date
              </label>
              <input
                type="date"
                required
                min={formatDateValue(today)}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-[#181C24] border border-white/10 text-sm text-[#FAF8F5] p-3 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#A0A6B5] flex items-center gap-1.5 font-medium">
                <Calendar className="w-4 h-4 text-[#C5A880]" />
                Check-Out Date
              </label>
              <input
                type="date"
                required
                min={checkIn}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-[#181C24] border border-white/10 text-sm text-[#FAF8F5] p-3 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-[#A0A6B5] flex items-center gap-1.5 font-medium">
                <Users className="w-4 h-4 text-[#C5A880]" />
                Number of Guests
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full bg-[#181C24] border border-white/10 text-sm text-[#FAF8F5] p-3 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
                <option value={6}>6 Guests (Penthouse)</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs text-[#DFC38E]">
              Selected Duration: <strong>{nights} {nights === 1 ? 'Night' : 'Nights'}</strong>
            </span>
            <Button onClick={() => setStep(2)} size="md" className="flex items-center gap-2">
              <span>View Available Suites</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: SELECT ROOM */}
      {step === 2 && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="luxury-card p-6 border border-[#C5A880]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                Step 2 of 5
              </span>
              <h2 className="font-serif text-2xl text-[#FAF8F5]">
                Select Your Luxury Suite
              </h2>
              <p className="text-xs text-[#A0A6B5]">
                Showing available residences for {nights} nights ({formatDate(checkIn)} to {formatDate(checkOut)})
              </p>
            </div>

            <Button onClick={() => setStep(1)} variant="outline" size="sm" className="flex items-center gap-1.5">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Modify Dates</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rooms.map((room) => {
              const isSelected = selectedRoomId === room.id;
              const roomTotal = room.pricePerNight * nights;

              return (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoomId(room.id)}
                  className={`luxury-card p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#DFC38E] ring-1 ring-[#DFC38E] shadow-xl shadow-[#C5A880]/10 bg-[#161A22]'
                      : 'border-white/10 hover:border-[#C5A880]/30'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#181C24] rounded-[2px]">
                      <Image
                        src={room.image}
                        alt={room.name}
                        fill
                        sizes="40vw"
                        className="object-cover"
                      />
                      {isSelected && (
                        <div className="absolute top-3 right-3 bg-[#C5A880] text-[#0E1014] text-[10px] font-bold px-2 py-0.5 rounded-[2px] flex items-center gap-1 shadow-md">
                          <Check className="w-3 h-3" />
                          <span>SELECTED</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="font-serif text-lg text-[#FAF8F5]">{room.name}</h4>
                      <p className="text-xs text-[#A0A6B5] line-clamp-2 mt-1">
                        {room.shortDesc || room.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs py-2 border-y border-white/5 text-[#D1D5E0]">
                      <span>{room.bedType}</span>
                      <span>{room.sizeSqFt} sq ft</span>
                      <span>Up to {room.capacity} Guests</span>
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-[#8F94A3] block">Total for {nights} Nights</span>
                      <span className="font-serif text-xl text-[#FAF8F5] font-semibold">
                        {formatCurrency(roomTotal)}
                      </span>
                    </div>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRoomId(room.id);
                        setStep(3);
                      }}
                      size="sm"
                      variant={isSelected ? 'primary' : 'outline'}
                    >
                      {isSelected ? 'Proceed with Suite' : 'Select'}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-4">
            <Button onClick={() => setStep(3)} size="md" className="flex items-center gap-2">
              <span>Continue to Guest Details</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: GUEST INFORMATION */}
      {step === 3 && (
        <div className="luxury-card p-6 sm:p-10 border border-[#C5A880]/20 space-y-8 animate-in fade-in duration-300">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
              Step 3 of 5
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] mt-1">
              Guest Information & Special Requests
            </h2>
            <p className="text-xs sm:text-sm text-[#A0A6B5] mt-1">
              Please enter the primary guest coordinates for this reservation.
            </p>
          </div>

          {/* Selected suite mini pill */}
          <div className="p-3 bg-[#181C24] border border-[#C5A880]/20 flex items-center justify-between text-xs">
            <div>
              <span className="text-[#8F94A3] block text-[10px] uppercase">Selected Residence:</span>
              <span className="text-[#FAF8F5] font-serif font-medium">{selectedRoom.name}</span>
            </div>
            <button
              onClick={() => setStep(2)}
              className="text-[#DFC38E] hover:underline text-xs"
            >
              Change Suite
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setStep(4);
            }}
            className="space-y-6 text-xs"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[#A0A6B5] uppercase tracking-wider font-medium">First Name *</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Lord Alexander"
                  className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-3 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#A0A6B5] uppercase tracking-wider font-medium">Last Name *</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Sterling"
                  className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-3 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[#A0A6B5] uppercase tracking-wider font-medium">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alexander@sterlingholdings.co.uk"
                  className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-3 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[#A0A6B5] uppercase tracking-wider font-medium">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 234-8901"
                  className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-3 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[#A0A6B5] uppercase tracking-wider font-medium">
                Special Requests & Concierge Preferences
              </label>
              <textarea
                rows={3}
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Dietary requirements, champagne preference, airport Rolls-Royce transfer time, feather-free pillows..."
                className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-3 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <Button type="button" onClick={() => setStep(2)} variant="outline">
                Back
              </Button>
              <Button type="submit">
                Review Reservation Summary
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 4: BOOKING SUMMARY */}
      {step === 4 && (
        <div className="luxury-card p-6 sm:p-10 border border-[#C5A880]/20 space-y-8 animate-in fade-in duration-300">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
              Step 4 of 5
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] mt-1">
              Reservation Summary
            </h2>
            <p className="text-xs sm:text-sm text-[#A0A6B5] mt-1">
              Please review all reservation details before final confirmation.
            </p>
          </div>

          {submissionError && (
            <div className="p-4 bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs">
              {submissionError}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
            {/* Stay Details */}
            <div className="p-5 bg-[#14171E] border border-white/5 space-y-3">
              <h4 className="font-serif text-sm text-[#DFC38E] border-b border-white/5 pb-2">
                Accommodations & Itinerary
              </h4>
              <div className="flex justify-between">
                <span className="text-[#8F94A3]">Suite:</span>
                <span className="text-[#FAF8F5] font-semibold">{selectedRoom.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8F94A3]">Check-In:</span>
                <span className="text-[#FAF8F5]">{formatDate(checkIn)} (from 3:00 PM)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8F94A3]">Check-Out:</span>
                <span className="text-[#FAF8F5]">{formatDate(checkOut)} (until 12:00 PM)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8F94A3]">Duration:</span>
                <span className="text-[#FAF8F5]">{nights} Nights</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8F94A3]">Guests:</span>
                <span className="text-[#FAF8F5]">{guestCount} Guests</span>
              </div>
            </div>

            {/* Guest Summary */}
            <div className="p-5 bg-[#14171E] border border-white/5 space-y-3">
              <h4 className="font-serif text-sm text-[#DFC38E] border-b border-white/5 pb-2">
                Primary Guest Coordinates
              </h4>
              <div className="flex justify-between">
                <span className="text-[#8F94A3]">Name:</span>
                <span className="text-[#FAF8F5]">{firstName} {lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8F94A3]">Email:</span>
                <span className="text-[#FAF8F5]">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8F94A3]">Phone:</span>
                <span className="text-[#FAF8F5]">{phone}</span>
              </div>
              {specialRequests && (
                <div className="pt-2 border-t border-white/5">
                  <span className="text-[#8F94A3] block mb-1">Special Requests:</span>
                  <p className="text-[#C2C7D6] italic">{specialRequests}</p>
                </div>
              )}
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="p-5 bg-[#14171E] border border-[#C5A880]/20 space-y-3 text-xs">
            <h4 className="font-serif text-sm text-[#DFC38E] border-b border-white/5 pb-2">
              Financial Summary (USD)
            </h4>
            <div className="flex justify-between text-[#B0B6C7]">
              <span>Room Rate ({formatCurrency(selectedRoom.pricePerNight)} × {nights} Nights)</span>
              <span>{formatCurrency(basePrice)}</span>
            </div>
            <div className="flex justify-between text-[#B0B6C7]">
              <span>Taxes & Luxury Hospitality Surcharge (14%)</span>
              <span>{formatCurrency(taxesAndService)}</span>
            </div>
            <div className="pt-3 border-t border-white/10 flex justify-between items-baseline">
              <span className="text-sm font-serif text-[#FAF8F5]">Total Reservation Amount:</span>
              <span className="text-2xl font-serif font-bold text-[#DFC38E]">
                {formatCurrency(grandTotal)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#A0A6B5]">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Guaranteed Reservation • Pay upon arrival with complimentary 48-hour cancellation policy.</span>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <Button onClick={() => setStep(3)} variant="outline">
              Edit Details
            </Button>
            <Button
              onClick={handleConfirmReservation}
              isLoading={isSubmitting}
              size="lg"
            >
              Confirm & Book Reservation
            </Button>
          </div>
        </div>
      )}

      {/* STEP 5: INSTANT CONFIRMATION */}
      {step === 5 && confirmedBooking && (
        <div className="luxury-card p-8 sm:p-12 border border-[#C5A880]/30 space-y-8 text-center animate-in zoom-in-95 duration-400">
          <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold">
              Reservation Confirmed
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5]">
              We Look Forward to Welcoming You
            </h2>
            <p className="text-xs sm:text-sm text-[#A0A6B5] max-w-lg mx-auto">
              Your stay at Jolly Grand has been registered in our central hospitality system.
              A formal itinerary has been dispatched to <strong>{confirmedBooking.guest?.email || email}</strong>.
            </p>
          </div>

          {/* Booking Reference Card */}
          <div className="max-w-md mx-auto p-6 bg-[#14171E] border border-[#C5A880]/30 rounded-[2px] space-y-4 text-left text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[#8F94A3] uppercase tracking-wider text-[10px]">
                Booking Reference
              </span>
              <span className="font-mono text-base font-bold text-[#DFC38E]">
                {confirmedBooking.bookingReference}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-[#8F94A3]">Guest Name:</span>
                <span className="text-[#FAF8F5]">
                  {confirmedBooking.guest?.firstName} {confirmedBooking.guest?.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8F94A3]">Suite Reserved:</span>
                <span className="text-[#FAF8F5] font-medium">
                  {confirmedBooking.room?.name || selectedRoom.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8F94A3]">Check-In:</span>
                <span className="text-[#FAF8F5]">{formatDate(confirmedBooking.checkIn)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8F94A3]">Check-Out:</span>
                <span className="text-[#FAF8F5]">{formatDate(confirmedBooking.checkOut)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/5 font-serif font-bold text-sm">
                <span className="text-[#FAF8F5]">Total Balance:</span>
                <span className="text-[#DFC38E]">{formatCurrency(confirmedBooking.totalAmount)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => window.print()}
              className="luxury-btn-outline !py-3 !px-6 text-xs flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Itinerary Voucher</span>
            </button>

            <Link
              href="/"
              className="luxury-btn-primary !py-3 !px-8 text-xs flex items-center gap-2"
            >
              <span>Return to Jolly Grand Home</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
