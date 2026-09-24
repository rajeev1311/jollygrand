import { NextResponse } from 'next/server';
import { getDashboardStats } from '@/lib/db/store';

export async function GET() {
  try {
    const stats = await getDashboardStats();
    return NextResponse.json({ success: true, stats });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve dashboard metrics' },
      { status: 500 }
    );
  }
}
