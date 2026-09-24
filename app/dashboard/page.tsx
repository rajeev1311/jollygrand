'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu,
  CalendarCheck,
  BedDouble,
  DollarSign,
  TrendingUp,
  UserCheck,
  UserMinus,
  Sparkles,
  RefreshCw,
  ArrowUpRight,
  Clock,
  CheckCircle,
  Eye
} from 'lucide-react';
import {
  DashboardSidebar,
  DashboardTab
} from '@/components/dashboard/DashboardSidebar';
import { StatCard } from '@/components/dashboard/StatCard';
import { BookingsView } from '@/components/dashboard/BookingsView';
import { RoomsView } from '@/components/dashboard/RoomsView';
import { GuestsView } from '@/components/dashboard/GuestsView';
import { MessagesView } from '@/components/dashboard/MessagesView';
import { OffersView } from '@/components/dashboard/OffersView';
import { SettingsView } from '@/components/dashboard/SettingsView';
import { StatusBadge } from '@/components/ui/Badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import {
  Room,
  Booking,
  Guest,
  ContactMessage,
  OfferItem,
  DashboardStats,
  BookingStatus
} from '@/types/hotel';

export default function DashboardPage() {
  const [currentTab, setCurrentTab] = useState<DashboardTab>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Live state from APIs
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [offers, setOffers] = useState<OfferItem[]>([]);

  const loadData = async () => {
    try {
      const [statsRes, bookingsRes, roomsRes, guestsRes, msgRes, offersRes] = await Promise.all([
        fetch('/api/dashboard/stats').then((r) => r.json()),
        fetch('/api/bookings').then((r) => r.json()),
        fetch('/api/rooms').then((r) => r.json()),
        fetch('/api/guests').then((r) => r.json()),
        fetch('/api/contact').then((r) => r.json()),
        fetch('/api/offers').then((r) => r.json()),
      ]);

      if (statsRes.success) setStats(statsRes.stats);
      if (bookingsRes.success) setBookings(bookingsRes.bookings);
      if (roomsRes.success) setRooms(roomsRes.rooms);
      if (guestsRes.success) setGuests(guestsRes.guests);
      if (msgRes.success) setMessages(msgRes.messages);
      if (offersRes.success) setOffers(offersRes.offers);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#090B0D] text-[#FAF8F5] flex">
      {/* Sidebar Navigation */}
      <DashboardSidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-[#0E1014]/90 backdrop-blur-md border-b border-[#C5A880]/15 px-4 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 text-[#FAF8F5]/80 hover:text-white"
              aria-label="Open sidebar menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-serif text-lg sm:text-xl text-[#FAF8F5] tracking-wide">
                Executive Portal
              </h1>
              <span className="text-[10px] tracking-[0.25em] text-[#C5A880] uppercase">
                Property Management System
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setLoading(true);
                loadData();
              }}
              title="Refresh telemetry"
              className="p-2 bg-[#181C24] text-[#A0A6B5] hover:text-[#DFC38E] border border-white/10 rounded-[2px] transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#C5A880]' : ''}`} />
            </button>

            <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-white/10">
              <div className="w-8 h-8 rounded-full bg-[#181C24] border border-[#C5A880]/30 flex items-center justify-center font-serif text-[#DFC38E] text-xs font-bold">
                JG
              </div>
              <div className="text-left text-xs">
                <div className="text-[#FAF8F5] font-medium leading-none">General Manager</div>
                <div className="text-[10px] text-[#A0A6B5] mt-1">jolly (Admin)</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Main Body Content */}
        <main className="p-4 sm:p-8 space-y-8 flex-1">
          {/* TAB: OVERVIEW */}
          {currentTab === 'overview' && (
            <div className="space-y-8">
              {/* Welcome Banner */}
              <div className="luxury-card p-6 sm:p-8 border border-[#C5A880]/20 relative overflow-hidden">
                <div className="relative z-10 max-w-2xl space-y-2">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#C5A880]/15 text-[#DFC38E] text-[10px] tracking-[0.2em] uppercase font-semibold">
                    <Sparkles className="w-3 h-3 text-[#C5A880]" />
                    Five-Star Operations Active
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FAF8F5] font-normal">
                    Welcome back to Jolly Grand
                  </h2>
                  <p className="text-xs sm:text-sm text-[#A0A6B5] leading-relaxed">
                    Property telemetry indicates optimal guest satisfaction, 100% concierge readiness,
                    and robust room demand across all luxury suites.
                  </p>
                </div>
              </div>

              {/* Statistics Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <StatCard
                  label="Total Bookings"
                  value={stats?.totalBookings ?? bookings.length}
                  icon={CalendarCheck}
                  subtext="Confirmed records"
                  trend="+18%"
                  trendPositive={true}
                />
                <StatCard
                  label="Available Rooms"
                  value={stats?.availableRooms ?? 4}
                  icon={BedDouble}
                  subtext="Ready for check-in"
                  trend="High Demand"
                  trendPositive={true}
                />
                <StatCard
                  label="Occupied Rooms"
                  value={stats?.occupiedRooms ?? 2}
                  icon={UserCheck}
                  subtext="In-house guests"
                />
                <StatCard
                  label="Today's Check-ins"
                  value={stats?.todayCheckIns ?? 3}
                  icon={UserCheck}
                  subtext="VIP arrivals"
                />
                <StatCard
                  label="Today's Check-outs"
                  value={stats?.todayCheckOuts ?? 2}
                  icon={UserMinus}
                  subtext="Scheduled departures"
                />
                <StatCard
                  label="Total Revenue"
                  value={formatCurrency(stats?.totalRevenue ?? 21530)}
                  icon={DollarSign}
                  subtext="Gross bookings"
                  trend="+24%"
                  trendPositive={true}
                />
              </div>

              {/* Analytics & Overview Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Monthly Revenue Bar Graph */}
                <div className="lg:col-span-8 luxury-card p-6 border border-[#C5A880]/15 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <div>
                      <h3 className="font-serif text-lg text-[#FAF8F5]">
                        Monthly Revenue & Occupancy Trajectory
                      </h3>
                      <p className="text-xs text-[#A0A6B5]">
                        Historical gross booking volume in USD (thousands)
                      </p>
                    </div>
                    <span className="text-xs font-serif text-[#DFC38E] bg-[#C5A880]/10 px-3 py-1 rounded-[2px] border border-[#C5A880]/20">
                      Average Occupancy: {stats?.occupancyRate || 82}%
                    </span>
                  </div>

                  {/* Visual CSS-based Bar Chart */}
                  <div className="pt-6 pb-2">
                    <div className="flex items-end justify-between gap-3 h-48 sm:h-56 px-2 border-b border-white/10">
                      {(stats?.monthlyRevenue || [
                        { month: 'May', amount: 48200 },
                        { month: 'Jun', amount: 62500 },
                        { month: 'Jul', amount: 89000 },
                        { month: 'Aug', amount: 94200 },
                        { month: 'Sep', amount: 81400 },
                        { month: 'Oct', amount: 105000 },
                      ]).map((item, i) => {
                        const maxVal = 110000;
                        const heightPct = Math.round((item.amount / maxVal) * 100);
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                            <span className="text-[10px] text-[#A0A6B5] group-hover:text-[#DFC38E] transition-colors font-mono">
                              ${Math.round(item.amount / 1000)}k
                            </span>
                            <div
                              style={{ height: `${heightPct}%` }}
                              className="w-full max-w-[42px] bg-gradient-to-t from-[#C5A880]/30 via-[#C5A880]/70 to-[#DFC38E] rounded-t-[2px] transition-all group-hover:brightness-125 group-hover:shadow-lg group-hover:shadow-[#C5A880]/20"
                            />
                            <span className="text-[11px] text-[#A0A6B5] tracking-wider uppercase font-medium">
                              {item.month}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Room Availability Breakdown */}
                <div className="lg:col-span-4 luxury-card p-6 border border-[#C5A880]/15 space-y-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-[#FAF8F5] pb-2 border-b border-white/5">
                      Room Availability Status
                    </h3>
                    <div className="space-y-3 mt-4">
                      {rooms.slice(0, 4).map((r) => (
                        <div
                          key={r.id}
                          className="flex items-center justify-between p-2.5 bg-[#14171E] rounded-[2px] border border-white/5 text-xs"
                        >
                          <div>
                            <div className="font-medium text-[#FAF8F5] truncate max-w-[150px]">
                              {r.name}
                            </div>
                            <div className="text-[10px] text-[#A0A6B5]">
                              {formatCurrency(r.pricePerNight)} / night
                            </div>
                          </div>
                          <span
                            className={`px-2 py-0.5 text-[9px] uppercase tracking-wider font-semibold rounded-[2px] ${
                              r.isAvailable
                                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                                : 'bg-rose-950/60 text-rose-300 border border-rose-500/30'
                            }`}
                          >
                            {r.isAvailable ? 'Available' : 'Occupied'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentTab('rooms')}
                    className="w-full luxury-btn-outline !py-2 text-xs text-center justify-center mt-4"
                  >
                    Manage Suite Inventory
                  </button>
                </div>
              </div>

              {/* Recent Bookings & Inquiries Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Recent Bookings */}
                <div className="lg:col-span-7 luxury-card p-6 border border-[#C5A880]/15 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <h3 className="font-serif text-lg text-[#FAF8F5]">
                      Recent VIP Reservations
                    </h3>
                    <button
                      onClick={() => setCurrentTab('bookings')}
                      className="text-xs text-[#DFC38E] hover:underline flex items-center gap-1"
                    >
                      <span>View All</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {bookings.slice(0, 4).map((b) => (
                      <div
                        key={b.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-[#14171E] rounded-[2px] border border-white/5 gap-2 text-xs"
                      >
                        <div>
                          <div className="font-mono text-[#DFC38E] font-bold">
                            {b.bookingReference}
                          </div>
                          <div className="text-[#FAF8F5] font-medium">
                            {b.guest?.firstName} {b.guest?.lastName}
                          </div>
                          <div className="text-[11px] text-[#8F94A3]">
                            {b.room?.name || 'Luxury Suite'} • {formatDate(b.checkIn)}
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1.5">
                          <span className="font-serif font-semibold text-[#FAF8F5]">
                            {formatCurrency(b.totalAmount)}
                          </span>
                          <StatusBadge status={b.status} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Inquiries */}
                <div className="lg:col-span-5 luxury-card p-6 border border-[#C5A880]/15 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <h3 className="font-serif text-lg text-[#FAF8F5]">
                      Recent Guest Inquiries
                    </h3>
                    <button
                      onClick={() => setCurrentTab('messages')}
                      className="text-xs text-[#DFC38E] hover:underline flex items-center gap-1"
                    >
                      <span>View All</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {messages.slice(0, 3).map((m) => (
                      <div
                        key={m.id}
                        className="p-3 bg-[#14171E] rounded-[2px] border border-white/5 space-y-1.5 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-[#FAF8F5]">{m.name}</span>
                          <span className="text-[10px] text-[#8F94A3]">
                            {formatDate(m.createdAt)}
                          </span>
                        </div>
                        <div className="text-[#DFC38E] text-[11px] font-medium">
                          {m.subject}
                        </div>
                        <p className="text-[#A0A6B5] text-[11px] line-clamp-2 leading-relaxed">
                          {m.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: BOOKINGS */}
          {currentTab === 'bookings' && (
            <BookingsView bookings={bookings} onRefresh={loadData} />
          )}

          {/* TAB: ROOMS */}
          {currentTab === 'rooms' && (
            <RoomsView rooms={rooms} onRefresh={loadData} />
          )}

          {/* TAB: GUESTS */}
          {currentTab === 'guests' && <GuestsView guests={guests} />}

          {/* TAB: MESSAGES */}
          {currentTab === 'messages' && (
            <MessagesView messages={messages} onRefresh={loadData} />
          )}

          {/* TAB: OFFERS */}
          {currentTab === 'offers' && (
            <OffersView offers={offers} onRefresh={loadData} />
          )}

          {/* TAB: SERVICES */}
          {currentTab === 'services' && (
            <div className="space-y-4">
              <div className="bg-[#14171E] p-4 border border-[#C5A880]/15 rounded-[2px]">
                <h3 className="font-serif text-lg text-[#FAF8F5]">Hotel Services Directory</h3>
                <p className="text-xs text-[#A0A6B5]">Active privileges offered to in-house guests.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: '24/7 Royal Concierge', cat: 'Hospitality', time: '24 Hours' },
                  { title: 'Celestial Holistic Spa', cat: 'Wellness', time: '8:00 AM - 9:00 PM' },
                  { title: 'Azure Heated Infinity Pool', cat: 'Leisure', time: '6:00 AM - 10:00 PM' },
                  { title: 'Michelin Dining & Cellar', cat: 'Culinary', time: 'Lunch & Dinner' },
                  { title: 'Chauffeur Fleet & Transfers', cat: 'Transportation', time: 'On Demand' },
                  { title: 'The Grand Atelier Gym', cat: 'Fitness', time: '24 Hours' },
                ].map((s, i) => (
                  <div key={i} className="luxury-card p-5 border border-white/5 space-y-2">
                    <span className="text-[10px] text-[#C5A880] uppercase tracking-wider">{s.cat}</span>
                    <h4 className="font-serif text-base text-[#FAF8F5]">{s.title}</h4>
                    <p className="text-xs text-[#A0A6B5]">Operating Hours: {s.time}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {currentTab === 'settings' && <SettingsView />}
        </main>
      </div>
    </div>
  );
}
