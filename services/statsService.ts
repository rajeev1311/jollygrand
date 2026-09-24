import { OfferItem, DashboardStats } from '@/types/hotel';

export async function fetchOffers(): Promise<OfferItem[]> {
  try {
    const res = await fetch('/api/offers', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch offers');
    const data = await res.json();
    return data.offers || [];
  } catch (error) {
    console.error('fetchOffers error:', error);
    return [];
  }
}

export async function createOfferApi(offerData: Partial<OfferItem>): Promise<{ success: boolean; offer?: OfferItem; error?: string }> {
  try {
    const res = await fetch('/api/offers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(offerData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create offer');
    return { success: true, offer: data.offer };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteOfferApi(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch(`/api/offers/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete offer');
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function fetchDashboardStats(): Promise<DashboardStats | null> {
  try {
    const res = await fetch('/api/dashboard/stats', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch dashboard stats');
    const data = await res.json();
    return data.stats || null;
  } catch (error) {
    console.error('fetchDashboardStats error:', error);
    return null;
  }
}
