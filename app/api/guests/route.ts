import { NextResponse } from 'next/server';
import { getGuests } from '@/lib/db/store';

export async function GET() {
  try {
    const guests = await getGuests();
    return NextResponse.json({ success: true, count: guests.length, guests });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve guest registry' },
      { status: 500 }
    );
  }
}
