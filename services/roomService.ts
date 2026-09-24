import { Room } from '@/types/hotel';

export async function fetchRooms(category?: string, capacity?: number): Promise<Room[]> {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'ALL') params.set('category', category);
    if (capacity) params.set('capacity', capacity.toString());

    const res = await fetch(`/api/rooms?${params.toString()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch rooms');
    const data = await res.json();
    return data.rooms || [];
  } catch (error) {
    console.error('fetchRooms error:', error);
    return [];
  }
}

export async function fetchRoomById(id: string): Promise<Room | null> {
  try {
    const res = await fetch(`/api/rooms/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.room || null;
  } catch (error) {
    console.error('fetchRoomById error:', error);
    return null;
  }
}

export async function createRoomApi(roomData: Partial<Room>): Promise<{ success: boolean; room?: Room; error?: string }> {
  try {
    const res = await fetch('/api/rooms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roomData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create room');
    return { success: true, room: data.room };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateRoomApi(id: string, updates: Partial<Room>): Promise<{ success: boolean; room?: Room; error?: string }> {
  try {
    const res = await fetch(`/api/rooms/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update room');
    return { success: true, room: data.room };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteRoomApi(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`/api/rooms/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete room');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
