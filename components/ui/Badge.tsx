import React from 'react';
import { cn } from '@/lib/utils';
import { BookingStatus, RoomCategory } from '@/types/hotel';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'charcoal' | 'green' | 'amber' | 'blue' | 'red';
  className?: string;
}

export function Badge({ children, variant = 'gold', className }: BadgeProps) {
  const variantStyles = {
    gold: 'bg-[#C5A880]/15 text-[#DFC38E] border-[#C5A880]/30',
    charcoal: 'bg-[#181C24] text-[#A0A6B5] border-white/10',
    green: 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30',
    amber: 'bg-amber-950/40 text-amber-300 border-amber-500/30',
    blue: 'bg-sky-950/40 text-sky-300 border-sky-500/30',
    red: 'bg-rose-950/40 text-rose-300 border-rose-500/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium tracking-wider uppercase rounded-[2px] border backdrop-blur-sm',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: BookingStatus }) {
  switch (status) {
    case 'CONFIRMED':
      return <Badge variant="green">Confirmed</Badge>;
    case 'CHECKED_IN':
      return <Badge variant="blue">Checked In</Badge>;
    case 'CHECKED_OUT':
      return <Badge variant="charcoal">Checked Out</Badge>;
    case 'PENDING':
      return <Badge variant="amber">Pending</Badge>;
    case 'CANCELLED':
      return <Badge variant="red">Cancelled</Badge>;
    default:
      return <Badge variant="charcoal">{status}</Badge>;
  }
}

export function CategoryBadge({ category }: { category: RoomCategory | string }) {
  const names: Record<string, string> = {
    DELUXE: 'Deluxe Room',
    GRAND_DELUXE: 'Grand Deluxe',
    EXECUTIVE_SUITE: 'Executive Suite',
    PRESIDENTIAL_SUITE: 'Presidential Suite',
  };
  return <Badge variant="gold">{names[category] || category}</Badge>;
}
