'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application Error caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0E1014] text-[#FAF8F5] flex items-center justify-center p-4 text-center">
      <div className="max-w-md luxury-card p-8 border border-[#C5A880]/30 shadow-2xl space-y-6">
        <div className="w-14 h-14 rounded-full bg-rose-950/60 border border-rose-500/40 text-rose-300 flex items-center justify-center mx-auto">
          <AlertCircle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold block">
            System Notice
          </span>
          <h2 className="font-serif text-2xl text-[#FAF8F5]">
            Temporary Interruption
          </h2>
          <p className="text-xs text-[#A0A6B5] leading-relaxed">
            Our central hospitality servers encountered an unexpected event. Please refresh or return to the main foyer.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 pt-2">
          <button
            onClick={() => reset()}
            className="luxury-btn-primary !py-2.5 !px-5 text-xs flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="luxury-btn-outline !py-2.5 !px-5 text-xs flex items-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
