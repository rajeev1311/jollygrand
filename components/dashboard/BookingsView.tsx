'use client';

import React, { useState } from 'react';
import { Search, Filter, Calendar, User, CheckCircle, RefreshCw, Trash2 } from 'lucide-react';
import { Booking, BookingStatus } from '@/types/hotel';
import { StatusBadge } from '@/components/ui/Badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { updateBookingStatusApi, deleteBookingApi } from '@/services/bookingService';

interface BookingsViewProps {
  bookings: Booking[];
  onRefresh: () => void;
}

export function BookingsView({ bookings, onRefresh }: BookingsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.bookingReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.guest?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.guest?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.guest?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.room?.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id: string, newStatus: BookingStatus) => {
    setIsUpdating(id);
    try {
      await updateBookingStatusApi(id, newStatus);
      onRefresh();
    } catch (err) {
      alert('Failed to update reservation status');
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (id: string, ref: string) => {
    if (!confirm(`Are you sure you want to cancel and remove reservation ${ref}?`)) return;
    setIsUpdating(id);
    try {
      await deleteBookingApi(id);
      onRefresh();
    } catch {
      alert('Failed to remove reservation');
    } finally {
      setIsUpdating(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#14171E] p-4 border border-[#C5A880]/15 rounded-[2px]">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#A0A6B5] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Reference, Guest name, or Room..."
            className="w-full bg-[#181C24] border border-white/10 text-xs text-[#FAF8F5] pl-9 pr-4 py-2.5 rounded-[2px] focus:outline-none focus:border-[#C5A880] transition-colors placeholder:text-[#505769]"
          />
        </div>

        {/* Filter & Refresh */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-[#C5A880]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-[#181C24] border border-white/10 text-xs text-[#FAF8F5] px-3 py-2 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="CHECKED_IN">Checked In</option>
              <option value="CHECKED_OUT">Checked Out</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <button
            onClick={onRefresh}
            title="Refresh bookings"
            className="p-2 bg-[#181C24] text-[#A0A6B5] hover:text-[#DFC38E] border border-white/10 rounded-[2px] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bookings Table / Card View */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center bg-[#14171E] border border-white/5 rounded-[2px] text-[#A0A6B5] space-y-2">
          <Calendar className="w-8 h-8 text-[#C5A880]/40 mx-auto" />
          <p className="text-sm">No reservations match the specified search or filter criteria.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-[#14171E] border border-[#C5A880]/15 rounded-[2px]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#181C24] border-b border-white/10 text-[10px] uppercase tracking-wider text-[#A0A6B5]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Reference</th>
                <th className="py-3.5 px-4 font-semibold">Guest</th>
                <th className="py-3.5 px-4 font-semibold">Suite</th>
                <th className="py-3.5 px-4 font-semibold">Dates of Stay</th>
                <th className="py-3.5 px-4 font-semibold">Total</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((booking) => (
                <tr
                  key={booking.id}
                  className="hover:bg-white/[0.02] transition-colors group"
                >
                  {/* Reference */}
                  <td className="py-3.5 px-4 font-mono font-bold text-[#DFC38E]">
                    {booking.bookingReference}
                  </td>

                  {/* Guest */}
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-[#FAF8F5]">
                      {booking.guest?.firstName} {booking.guest?.lastName}
                    </div>
                    <div className="text-[11px] text-[#8F94A3]">
                      {booking.guest?.email}
                    </div>
                    {booking.guest?.phone && (
                      <div className="text-[10px] text-[#6E7382]">
                        {booking.guest?.phone}
                      </div>
                    )}
                  </td>

                  {/* Room */}
                  <td className="py-3.5 px-4">
                    <div className="text-[#FAF8F5] font-medium truncate max-w-[180px]">
                      {booking.room?.name || 'Selected Suite'}
                    </div>
                    <div className="text-[10px] text-[#C5A880]">
                      {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
                    </div>
                  </td>

                  {/* Dates */}
                  <td className="py-3.5 px-4 text-[#C2C7D6] whitespace-nowrap">
                    <div>{formatDate(booking.checkIn)}</div>
                    <div className="text-[10px] text-[#8F94A3]">to {formatDate(booking.checkOut)}</div>
                  </td>

                  {/* Total Amount */}
                  <td className="py-3.5 px-4 font-serif font-semibold text-[#FAF8F5]">
                    {formatCurrency(booking.totalAmount)}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-4">
                    <StatusBadge status={booking.status} />
                  </td>

                  {/* Action Controls */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex items-center gap-2">
                      <select
                        disabled={isUpdating === booking.id}
                        value={booking.status}
                        onChange={(e) =>
                          handleStatusChange(booking.id, e.target.value as BookingStatus)
                        }
                        className="bg-[#181C24] border border-white/10 text-[11px] text-[#DFC38E] px-2 py-1 rounded-[2px] focus:outline-none cursor-pointer"
                      >
                        <option value="PENDING">Set Pending</option>
                        <option value="CONFIRMED">Set Confirmed</option>
                        <option value="CHECKED_IN">Set Checked In</option>
                        <option value="CHECKED_OUT">Set Checked Out</option>
                        <option value="CANCELLED">Set Cancelled</option>
                      </select>

                      <button
                        onClick={() => handleDelete(booking.id, booking.bookingReference)}
                        disabled={isUpdating === booking.id}
                        title="Delete booking record"
                        className="p-1 text-[#8F94A3] hover:text-rose-400 hover:bg-rose-950/30 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
