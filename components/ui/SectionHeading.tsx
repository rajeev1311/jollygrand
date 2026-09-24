import React from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
  light?: boolean;
}

export function SectionHeading({
  subtitle,
  title,
  description,
  align = 'center',
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl mb-12 sm:mb-16',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      {subtitle && (
        <div
          className={cn(
            'inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full text-xs font-semibold tracking-[0.2em] uppercase',
            light
              ? 'text-[#DFC38E] bg-[#DFC38E]/10 border border-[#DFC38E]/20'
              : 'text-[#C5A880] bg-[#C5A880]/10 border border-[#C5A880]/20'
          )}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
          {subtitle}
        </div>
      )}
      <h2
        className={cn(
          'text-3xl sm:text-4xl md:text-5xl font-serif font-normal tracking-tight leading-tight',
          light ? 'text-[#0E1014]' : 'text-[#FAF8F5]'
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          'h-[1px] w-20 bg-gradient-to-r from-transparent via-[#C5A880] to-transparent my-4',
          align === 'center' ? 'mx-auto' : ''
        )}
      />
      {description && (
        <p
          className={cn(
            'text-sm sm:text-base leading-relaxed',
            light ? 'text-[#4A4F5C]' : 'text-[#A0A6B5]'
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
