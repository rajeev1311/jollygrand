import { NextResponse } from 'next/server';
import { getServices } from '@/lib/db/store';

export async function GET() {
  try {
    const services = await getServices();
    return NextResponse.json({ success: true, count: services.length, services });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve hotel services' },
      { status: 500 }
    );
  }
}
