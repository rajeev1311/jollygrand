import { ContactMessage } from '@/types/hotel';

export async function fetchContactMessages(): Promise<ContactMessage[]> {
  try {
    const res = await fetch('/api/contact', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch inquiries');
    const data = await res.json();
    return data.messages || [];
  } catch (error) {
    console.error('fetchContactMessages error:', error);
    return [];
  }
}

export async function sendContactMessageApi(payload: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to send message');
    return { success: true, message: data.message };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function markContactMessageReadApi(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/contact/${id}`, { method: 'PATCH' });
    return res.ok;
  } catch {
    return false;
  }
}
