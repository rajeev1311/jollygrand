'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, DollarSign, Bed, Users } from 'lucide-react';
import { Room, RoomCategory } from '@/types/hotel';
import { formatCurrency } from '@/lib/utils';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { CategoryBadge } from '@/components/ui/Badge';
import { createRoomApi, updateRoomApi, deleteRoomApi } from '@/services/roomService';

interface RoomsViewProps {
  rooms: Room[];
  onRefresh: () => void;
}

export function RoomsView({ rooms, onRefresh }: RoomsViewProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState<RoomCategory>('DELUXE');
  const [pricePerNight, setPricePerNight] = useState('550');
  const [capacity, setCapacity] = useState('2');
  const [bedType, setBedType] = useState('California King Bed');
  const [sizeSqFt, setSizeSqFt] = useState('600');
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85');

  const handleOpenAdd = () => {
    setName('');
    setCategory('DELUXE');
    setPricePerNight('550');
    setCapacity('2');
    setBedType('California King Bed');
    setSizeSqFt('600');
    setShortDesc('Elegantly curated luxury sanctuary with bespoke amenities.');
    setDescription('Impeccably appointed luxury suite featuring Italian marble bath, bespoke furnishings, and dedicated butler service.');
    setImage('https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85');
    setIsAddModalOpen(true);
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await createRoomApi({
        name,
        category,
        pricePerNight: Number(pricePerNight),
        capacity: Number(capacity),
        bedType,
        sizeSqFt: Number(sizeSqFt),
        shortDesc,
        description,
        image,
        amenities: ['King Bed', 'Marble Rain Bath', 'Diptyque Amenities', 'Butler Service'],
      });

      if (!res.success) throw new Error(res.error || 'Failed to create room');
      setIsAddModalOpen(false);
      onRefresh();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAvailability = async (room: Room) => {
    try {
      await updateRoomApi(room.id, { isAvailable: !room.isAvailable });
      onRefresh();
    } catch {
      alert('Failed to update room availability');
    }
  };

  const handleDeleteRoom = async (room: Room) => {
    if (!confirm(`Are you sure you want to delete "${room.name}"?`)) return;
    try {
      await deleteRoomApi(room.id);
      onRefresh();
    } catch {
      alert('Failed to delete room');
    }
  };

  const handleQuickPriceUpdate = async (room: Room) => {
    const input = prompt(`Enter new price per night for ${room.name}:`, room.pricePerNight.toString());
    if (!input) return;
    const price = parseFloat(input);
    if (isNaN(price) || price <= 0) {
      alert('Please enter a valid price amount');
      return;
    }

    try {
      await updateRoomApi(room.id, { pricePerNight: price });
      onRefresh();
    } catch {
      alert('Failed to update price');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#14171E] p-4 border border-[#C5A880]/15 rounded-[2px]">
        <div>
          <h3 className="font-serif text-lg text-[#FAF8F5]">Room & Suite Inventory</h3>
          <p className="text-xs text-[#A0A6B5]">Manage suites, pricing, live occupancy, and amenities.</p>
        </div>

        <Button onClick={handleOpenAdd} size="sm" className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Add New Suite</span>
        </Button>
      </div>

      {/* Rooms Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="luxury-card border border-[#C5A880]/20 flex flex-col justify-between overflow-hidden"
          >
            <div>
              <div className="relative aspect-[16/10] w-full bg-[#181C24]">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute top-3 left-3">
                  <CategoryBadge category={room.category} />
                </div>
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => handleToggleAvailability(room)}
                    className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-[2px] backdrop-blur-md border ${
                      room.isAvailable
                        ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
                        : 'bg-rose-950/70 text-rose-300 border-rose-500/40'
                    }`}
                  >
                    {room.isAvailable ? 'Available' : 'Booked'}
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h4 className="font-serif text-lg text-[#FAF8F5] leading-snug">
                  {room.name}
                </h4>

                <div className="flex items-center justify-between text-xs py-2 border-y border-white/5 text-[#B8B3AA]">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{room.capacity} Guests</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{room.bedType}</span>
                  </div>
                  <div>
                    <span>{room.sizeSqFt} sq ft</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <span className="text-[10px] uppercase text-[#8F94A3] block">Rate / Night</span>
                    <span className="text-xl font-serif text-[#DFC38E] font-semibold">
                      {formatCurrency(room.pricePerNight)}
                    </span>
                  </div>

                  <button
                    onClick={() => handleQuickPriceUpdate(room)}
                    className="text-xs text-[#C5A880] hover:text-[#DFC38E] underline underline-offset-4 flex items-center gap-1"
                  >
                    <DollarSign className="w-3 h-3" />
                    <span>Edit Price</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#14171E] border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => handleToggleAvailability(room)}
                className="text-xs text-[#A0A6B5] hover:text-[#DFC38E] transition-colors"
              >
                Toggle Status
              </button>

              <button
                onClick={() => handleDeleteRoom(room)}
                className="text-xs text-rose-400 hover:text-rose-200 transition-colors flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Suite Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Luxury Suite"
        maxWidth="2xl"
      >
        <form onSubmit={handleCreateRoom} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[#A0A6B5] uppercase tracking-wider">Suite Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Royal Horizon Suite"
                className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-2.5 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#A0A6B5] uppercase tracking-wider">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as RoomCategory)}
                className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-2.5 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
              >
                <option value="DELUXE">Deluxe</option>
                <option value="GRAND_DELUXE">Grand Deluxe</option>
                <option value="EXECUTIVE_SUITE">Executive Suite</option>
                <option value="PRESIDENTIAL_SUITE">Presidential Suite</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-[#A0A6B5] uppercase tracking-wider">Price / Night ($)</label>
              <input
                type="number"
                required
                value={pricePerNight}
                onChange={(e) => setPricePerNight(e.target.value)}
                className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-2.5 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#A0A6B5] uppercase tracking-wider">Capacity (Guests)</label>
              <input
                type="number"
                required
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-2.5 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[#A0A6B5] uppercase tracking-wider">Size (Sq Ft)</label>
              <input
                type="number"
                required
                value={sizeSqFt}
                onChange={(e) => setSizeSqFt(e.target.value)}
                className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-2.5 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[#A0A6B5] uppercase tracking-wider">Bed Type</label>
            <input
              type="text"
              required
              value={bedType}
              onChange={(e) => setBedType(e.target.value)}
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

          <div className="space-y-1">
            <label className="text-[#A0A6B5] uppercase tracking-wider">Short Description</label>
            <textarea
              rows={2}
              required
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-2.5 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[#A0A6B5] uppercase tracking-wider">Full Detailed Narrative</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#181C24] border border-white/10 text-[#FAF8F5] p-2.5 rounded-[2px] focus:outline-none focus:border-[#C5A880]"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs text-[#A0A6B5] hover:text-white"
            >
              Cancel
            </button>
            <Button type="submit" size="md" isLoading={isLoading}>
              Publish Suite
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
