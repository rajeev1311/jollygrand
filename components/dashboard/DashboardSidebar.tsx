'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  CalendarCheck,
  BedDouble,
  Users,
  Sparkles,
  Mail,
  Tag,
  Settings,
  LogOut,
  ExternalLink,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type DashboardTab =
  | 'overview'
  | 'bookings'
  | 'rooms'
  | 'guests'
  | 'services'
  | 'messages'
  | 'offers'
  | 'settings';

interface DashboardSidebarProps {
  currentTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export function DashboardSidebar({
  currentTab,
  onSelectTab,
  isOpenMobile = false,
  onCloseMobile,
}: DashboardSidebarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Continue logout
    }
    router.push('/login');
    router.refresh();
  };

  const menuItems: { id: DashboardTab; label: string; icon: any; badge?: number }[] = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: CalendarCheck },
    { id: 'rooms', label: 'Rooms & Suites', icon: BedDouble },
    { id: 'guests', label: 'Guests Registry', icon: Users },
    { id: 'messages', label: 'Inquiries', icon: Mail },
    { id: 'offers', label: 'Offers & Rates', icon: Tag },
    { id: 'services', label: 'Hotel Services', icon: Sparkles },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/80 lg:hidden backdrop-blur-sm"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={cn(
          'fixed lg:sticky top-0 bottom-0 left-0 z-40 w-64 bg-[#0E1014] border-r border-[#C5A880]/15 flex flex-col justify-between transition-transform duration-300 h-screen',
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <Link href="/" className="group focus:outline-none">
              <span className="font-serif text-xl tracking-[0.2em] text-[#FAF8F5] font-medium block">
                JOLLY GRAND
              </span>
              <span className="text-[9px] tracking-[0.3em] text-[#C5A880] uppercase font-light">
                Management Portal
              </span>
            </Link>
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="lg:hidden text-[#FAF8F5]/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5" aria-label="Dashboard Sidebar">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={cn(
                    'w-full flex items-center justify-between px-3.5 py-2.5 rounded-[2px] text-xs tracking-wider transition-all duration-200 cursor-pointer font-medium',
                    isActive
                      ? 'bg-[#C5A880] text-[#0E1014] font-semibold shadow-md shadow-[#C5A880]/20'
                      : 'text-[#A0A6B5] hover:text-[#FAF8F5] hover:bg-white/5'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={cn('w-4 h-4', isActive ? 'text-[#0E1014]' : 'text-[#C5A880]')} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-[#DFC38E]/20 text-[#DFC38E] text-[10px] px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/5 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-[#A0A6B5] hover:text-[#DFC38E] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>View Public Website</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-rose-300 hover:text-rose-100 hover:bg-rose-950/20 rounded-[2px] transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout from Portal</span>
          </button>
        </div>
      </aside>
    </>
  );
}
