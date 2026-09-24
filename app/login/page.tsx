'use client';

import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Lock, User, ArrowLeft, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/dashboard';

  const [username, setUsername] = useState('jolly');
  const [password, setPassword] = useState('Abc@123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed. Please verify credentials.');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push(redirectUrl);
        router.refresh();
      }, 700);
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-12 bg-[#090B0D]">
      {/* Left Side: Cinematic Hotel Imagery & Brand Tagline */}
      <div className="hidden lg:flex lg:col-span-7 relative flex-col justify-between p-12 lg:p-16 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1800&q=85"
          alt="Jolly Grand Architecture"
          fill
          priority
          sizes="60vw"
          className="object-cover object-center filter brightness-[0.75] contrast-[1.05]"
        />

        {/* Cinematic dark gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090B0D] via-transparent to-black/60" />

        {/* Top bar */}
        <div className="relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-[#FAF8F5]/80 hover:text-[#DFC38E] transition-colors py-2 px-3 rounded-[2px] bg-black/40 backdrop-blur-md border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>RETURN TO JOLLY GRAND HOME</span>
          </Link>
        </div>

        {/* Center/Bottom Branding Narrative */}
        <div className="relative z-10 max-w-xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/30 text-[#DFC38E] text-[11px] tracking-[0.25em] uppercase font-medium">
            <Shield className="w-3.5 h-3.5 text-[#C5A880]" />
            SECURE MANAGEMENT CONSOLE
          </div>

          <h2 className="font-serif text-4xl xl:text-5xl text-[#FAF8F5] leading-tight font-normal">
            Where Luxury Meets Extraordinary Hospitality
          </h2>

          <p className="text-sm xl:text-base text-[#C2C7D6] font-light leading-relaxed">
            Welcome to the centralized executive dashboard. Oversee palatial residences,
            guest itineraries, dining reservations, and real-time hotel intelligence.
          </p>

          <div className="pt-4 flex items-center gap-8 border-t border-white/10 text-xs text-[#DFC38E]">
            <div>
              <span className="font-serif text-2xl font-bold block text-[#FAF8F5]">100%</span>
              <span className="text-[#8F94A3] text-[11px] uppercase tracking-wider">
                Encryption Protocol
              </span>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <span className="font-serif text-2xl font-bold block text-[#FAF8F5]">24/7</span>
              <span className="text-[#8F94A3] text-[11px] uppercase tracking-wider">
                Operational Telemetry
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Split-screen Luxury Login Card */}
      <div className="lg:col-span-5 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-14 relative z-10">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] text-[#FAF8F5] font-medium block">
                JOLLY GRAND
              </span>
              <span className="text-[10px] tracking-[0.35em] text-[#C5A880] uppercase font-light">
                Executive Management
              </span>
            </Link>

            <h3 className="text-xl font-serif text-[#FAF8F5] pt-4">
              Welcome Back
            </h3>
            <p className="text-xs text-[#A0A6B5]">
              Please authenticate to access the hotel administration suite.
            </p>
          </div>

          {/* Inline Error Alert */}
          {error && (
            <div className="p-3.5 bg-rose-950/40 border border-rose-500/30 rounded-[2px] flex items-start gap-2.5 text-xs text-rose-200 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Success Banner */}
          {success && (
            <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/30 rounded-[2px] flex items-center gap-2.5 text-xs text-emerald-200 animate-in fade-in duration-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Authentication approved. Redirecting to management console...</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username Field */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-[#A0A6B5] flex items-center gap-1.5 font-medium">
                <User className="w-3.5 h-3.5 text-[#C5A880]" />
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="jolly"
                  className="w-full bg-[#14171E] border border-white/10 text-sm text-[#FAF8F5] px-4 py-3 rounded-[2px] focus:outline-none focus:border-[#C5A880] transition-colors placeholder:text-[#4A5060]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-wider text-[#A0A6B5] flex items-center gap-1.5 font-medium">
                  <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#14171E] border border-white/10 text-sm text-[#FAF8F5] px-4 py-3 pr-11 rounded-[2px] focus:outline-none focus:border-[#C5A880] transition-colors placeholder:text-[#4A5060]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7E8597] hover:text-[#DFC38E] p-1 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs text-[#A0A6B5]">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded border border-white/20 bg-[#14171E] text-[#C5A880] focus:ring-0"
                />
                <span>Remember this workstation</span>
              </label>

              <span className="text-[#C5A880] text-[11px]">Authorized personnel only</span>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full !py-3.5 tracking-[0.2em] font-semibold"
            >
              Sign In to Management
            </Button>
          </form>

          {/* Quick Demo Credentials Pill */}
          <div className="p-4 bg-[#14171E]/60 border border-[#C5A880]/20 rounded-[2px] text-xs text-[#A0A6B5] space-y-2">
            <div className="text-[10px] uppercase tracking-widest text-[#DFC38E] font-medium flex items-center justify-between">
              <span>Demo Credentials</span>
              <span className="text-emerald-400">Ready</span>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px] bg-black/40 px-3 py-1.5 border border-white/5">
              <span>Username: <strong className="text-[#FAF8F5]">jolly</strong></span>
              <span>Password: <strong className="text-[#FAF8F5]">Abc@123</strong></span>
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="text-xs text-[#7E8597] hover:text-[#DFC38E] transition-colors"
            >
              ← Back to guest website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#090B0D] flex items-center justify-center text-[#DFC38E]">Loading portal...</div>}>
      <LoginForm />
    </Suspense>
  );
}
