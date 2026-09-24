import React from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: any;
  trend?: string;
  trendPositive?: boolean;
}

export function StatCard({
  label,
  value,
  subtext,
  icon: Icon,
  trend,
  trendPositive = true,
}: StatCardProps) {
  return (
    <div className="luxury-card p-5 sm:p-6 border border-[#C5A880]/15 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] uppercase tracking-wider text-[#A0A6B5] font-medium">
          {label}
        </span>
        <div className="w-9 h-9 rounded-[2px] bg-[#181C24] border border-[#C5A880]/20 flex items-center justify-center text-[#DFC38E]">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <div>
        <div className="text-2xl sm:text-3xl font-serif text-[#FAF8F5] tracking-tight">
          {value}
        </div>

        {(subtext || trend) && (
          <div className="mt-2 flex items-center gap-2 text-xs">
            {trend && (
              <span
                className={cn(
                  'font-medium text-[11px] px-1.5 py-0.5 rounded-[2px]',
                  trendPositive
                    ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20'
                    : 'bg-rose-950/40 text-rose-400 border border-rose-500/20'
                )}
              >
                {trend}
              </span>
            )}
            {subtext && <span className="text-[#8F94A3] text-[11px]">{subtext}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
