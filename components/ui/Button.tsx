import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) {
  const sizeClasses = {
    sm: 'text-xs px-3.5 py-2',
    md: 'text-xs sm:text-sm px-5 py-2.5',
    lg: 'text-sm sm:text-base px-7 py-3.5',
  };

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-[#DFC38E] via-[#C5A880] to-[#A6834B] text-[#0E1014] font-semibold hover:shadow-lg hover:shadow-[#C5A880]/20 hover:brightness-105 active:scale-[0.99]',
    outline:
      'border border-[#C5A880]/40 text-[#FAF8F5] bg-[#C5A880]/5 hover:bg-[#C5A880]/15 hover:border-[#DFC38E] hover:text-[#DFC38E]',
    ghost:
      'text-[#FAF8F5]/80 hover:text-[#FAF8F5] hover:bg-white/5',
    danger:
      'bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30',
  };

  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center font-medium tracking-wider uppercase transition-all duration-300 rounded-[2px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>Processing...</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
