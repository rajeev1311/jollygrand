'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Trash2, Tag, Percent, Calendar } from 'lucide-react';
import { OfferItem } from '@/types/hotel';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { createOfferApi, deleteOfferApi } from '@/services/offerService';

interface OffersViewProps {
  offers: OfferItem[];
  onRefresh: () => void;
}

export function OffersView({ offers, onRefresh }: OffersViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState('20');
  const [description, setDescription] = useState('');
  const [benefits, setBenefits] = useState('Complimentary champagne\nDaily gourmet breakfast\nLate checkout');
  const [validity, setValidity] = useState('Valid through 2026');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80');

  const handleOpenAdd = () => {
    setTitle('');
    setCode('');
    setDiscountPercent('20');
    setDescription('');
    setBenefits('Complimentary champagne\nDaily gourmet breakfast\nLate checkout');
    setValidity('Valid through 2026');
    setImage('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80');
    setIsModalOpen(true);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const benefitsArray = benefits.split('\n').map((b) => b.trim()).filter(Boolean);
      const res = await createOfferApi({
        title,
        code,
        discountPercent: Number(discountPercent),
        description,
        benefits: benefitsArray,
        validity,
        image,
        active: true,
      });

      if (!res.success) throw new Error(res.error || 'Failed to create offer');
      setIsModalOpen(false);
      onRefresh();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (offer: OfferItem) => {
    if (!confirm(`Are you sure you want to remove promotion "${offer.title}"?`)) return;
    try {
      await deleteOfferApi(offer.id);
      onRefresh();
    } catch {
      alert('Failed to delete offer');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#14171E] p-4 border border-[#C5A880]/15 rounded-[2px]">
        <div>
          <h3 className="font-serif text-lg text-[#FAF8F5]">Promotional Packages & Privileges</h3>
          <p className="text-xs text-[#A0A6B5]">
            Configure seasonal savings codes, package inclusions, and marketing promotions.
          </p>
        </div>

        <Button onClick={handleOpenAdd} size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Create New Offer</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="luxury-card border border-[#C5A880]/20 flex flex-col justify-between overflow-hidden"
          >
            <div>
              <div className="relative aspect-[16/10] w-full bg-[#181C24]">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-[#C5A880] text-[#0E1014] text-xs font-bold px-2 py-0.5 rounded-[2px]">
                  {offer.discountPercent}% OFF
                </div>
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md text-xs font-mono font-bold text-[#DFC38E] px-2.5 py-1 border border-white/10">
                  {offer.code}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h4 className="font-serif text-lg text-[#FAF8F5] leading-snug">
                  {offer.title}
                </h4>
                <p className="text-xs text-[#A0A6B5] line-clamp-2">
                  {offer.description}
                </p>

                <div className="space-y-1 text-xs text-[#DFC38E] pt-2 border-t border-white/5">
                  <span className="text-[10px] text-[#8F94A3] uppercase tracking-wider block">
                    Inclusions:
                  </span>
                  {offer.benefits.slice(0, 2).map((b, i) => (
                    <div key={i} className="truncate text-[11px] text-[#E0E3EB]">
                      • {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#14171E] border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-[#8F94A3]">{offer.validity}</span>
              <button
                onClick={() => handleDelete(offer)}
                className="text-rose-400 hover:text-rose-200 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Offer Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Promotional Privilege"
        maxWidth="lg"
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-[#A0A6B5] uppercase tracking-wider">Offer Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Royal Autumn Serenity"
              className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-2.5 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[#A0A6B5] uppercase tracking-wider">Promo Code</label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="AUTUMN25"
                className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-2.5 rounded-[2px] font-mono focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#A0A6B5] uppercase tracking-wider">Discount (%)</label>
              <input
                type="number"
                required
                min={5}
                max={60}
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-2.5 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[#A0A6B5] uppercase tracking-wider">Description</label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-2.5 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[#A0A6B5] uppercase tracking-wider">
              Package Inclusions (One per line)
            </label>
            <textarea
              rows={3}
              required
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-2.5 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[#A0A6B5] uppercase tracking-wider">Validity Period</label>
            <input
              type="text"
              required
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
              className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-2.5 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[#A0A6B5] uppercase tracking-wider">Image URL</label>
            <input
              type="url"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-2.5 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs text-[#A0A6B5] hover:text-white"
            >
              Cancel
            </button>
            <Button type="submit" size="md" isLoading={isLoading}>
              Publish Offer
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
