import { Booking, BookingStatus } from '@/types/hotel';

export async function fetchBookings(status?: string, search?: string): Promise<Booking[]> {
  try {
    const params = new URLSearchParams();
    if (status && status !== 'ALL') params.set('status', status);
    if (search) params.set('search', search);

    const res = await fetch(`/api/bookings?${params.toString()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch bookings');
    const data = await res.json();
    return data.bookings || [];
  } catch (error) {
    console.error('fetchBookings error:', error);
    return [];
  }
}

export async function createBookingApi(bookingPayload: {
  guest: { firstName: string; lastName: string; email: string; phone: string };
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  specialRequests?: string;
}): Promise<{ success: boolean; booking?: Booking; error?: string }> {
  try {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingPayload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to complete booking');
    return { success: true, booking: data.booking };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateBookingStatusApi(
  id: string,
  status: BookingStatus
): Promise<{ success: boolean; booking?: Booking; error?: string }> {
  try {
    const res = await fetch(`/api/bookings/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update booking status');
    return { success: true, booking: data.booking };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteBookingApi(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete booking');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
