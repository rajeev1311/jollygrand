'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Calendar, Phone, User, Clock } from 'lucide-react';
import { ContactMessage } from '@/types/hotel';
import { formatDate } from '@/lib/utils';
import { markContactMessageReadApi } from '@/services/contactService';

interface MessagesViewProps {
  messages: ContactMessage[];
  onRefresh: () => void;
}

export function MessagesView({ messages, onRefresh }: MessagesViewProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleMarkRead = async (id: string) => {
    setUpdatingId(id);
    try {
      await markContactMessageReadApi(id);
      onRefresh();
    } catch {
      alert('Failed to mark inquiry as read');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#14171E] p-4 border border-[#C5A880]/15 rounded-[2px] flex items-center justify-between">
        <div>
          <h3 className="font-serif text-lg text-[#FAF8F5]">Concierge Inquiries & Messages</h3>
          <p className="text-xs text-[#A0A6B5]">
            Direct guest questions, gala reception inquiries, and VIP transfer requests.
          </p>
        </div>
        <span className="text-xs text-[#DFC38E] bg-[#C5A880]/10 px-3 py-1 rounded-[2px] border border-[#C5A880]/20 font-medium">
          {messages.filter((m) => !m.isRead).length} Unread
        </span>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="p-12 text-center bg-[#14171E] border border-white/5 text-[#A0A6B5]">
            <Mail className="w-8 h-8 text-[#C5A880]/30 mx-auto mb-2" />
            <p className="text-xs">No guest messages recorded at this time.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-6 border transition-all rounded-[2px] ${
                msg.isRead
                  ? 'bg-[#14171E] border-white/5 opacity-80'
                  : 'bg-[#181C24] border-[#C5A880]/30 shadow-lg'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-white/5">
                <div className="flex items-center gap-3">
                  {!msg.isRead && (
                    <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
                  )}
                  <h4 className="font-serif text-base text-[#FAF8F5]">{msg.subject}</h4>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#8F94A3]">
                  <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{formatDate(msg.createdAt)}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#D1D5E0] leading-relaxed mb-4">
                {msg.message}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/5 text-xs text-[#A0A6B5]">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-[#FAF8F5] font-medium flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#C5A880]" />
                    {msg.name}
                  </span>
                  <a
                    href={`mailto:${msg.email}`}
                    className="hover:text-[#DFC38E] flex items-center gap-1.5 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                    {msg.email}
                  </a>
                  {msg.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                      {msg.phone}
                    </span>
                  )}
                </div>

                {!msg.isRead ? (
                  <button
                    onClick={() => handleMarkRead(msg.id)}
                    disabled={updatingId === msg.id}
                    className="px-3 py-1.5 bg-[#C5A880]/15 hover:bg-[#C5A880]/25 text-[#DFC38E] border border-[#C5A880]/30 text-xs rounded-[2px] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark as Handled</span>
                  </button>
                ) : (
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Archived & Responded</span>
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
