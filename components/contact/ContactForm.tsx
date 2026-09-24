'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { sendContactMessageApi } from '@/services/contactService';

export function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await sendContactMessageApi({
        name,
        email,
        phone: phone || undefined,
        subject: subject || 'General Hospitality Inquiry',
        message,
      });

      if (!res.success) {
        throw new Error(res.error || 'Failed to submit inquiry');
      }

      setSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'Failed to send message. Please call our 24/7 reception desk.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="luxury-card p-6 sm:p-10 border border-[#C5A880]/20 space-y-6">
      <div>
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
          Personal Concierge Inquiry
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] mt-1">
          Send Us a Dispatch
        </h3>
        <p className="text-xs sm:text-sm text-[#A0A6B5] mt-1">
          Our Chief Concierge and reservations team will review your message and respond promptly.
        </p>
      </div>

      {error && (
        <div className="p-3.5 bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs rounded-[2px] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success ? (
        <div className="p-8 text-center bg-[#14171E] border border-emerald-500/30 rounded-[2px] space-y-3 animate-in zoom-in-95">
          <div className="w-12 h-12 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="font-serif text-xl text-[#FAF8F5]">Thank You For Reaching Out</h4>
          <p className="text-xs text-[#A0A6B5] max-w-sm mx-auto">
            Your inquiry has been relayed to the Jolly Grand hospitality desk. We shall be in touch shortly.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="text-xs text-[#DFC38E] underline pt-2 cursor-pointer"
          >
            Send another dispatch
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[#A0A6B5] uppercase tracking-wider font-medium">Your Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Lord Alexander Sterling"
                className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-3 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
              />
            </div>

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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[#A0A6B5] uppercase tracking-wider font-medium">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 234-8901"
                className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-3 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[#A0A6B5] uppercase tracking-wider font-medium">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Gala Reception / Penthouse Inquiry"
                className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-3 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[#A0A6B5] uppercase tracking-wider font-medium">Message *</label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="How may our Chief Concierge assist you today?"
              className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-3 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              size="lg"
              isLoading={isLoading}
              className="w-full flex items-center justify-center gap-2"
            >
              <span>SEND MESSAGE</span>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
