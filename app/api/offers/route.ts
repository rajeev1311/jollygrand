import { NextRequest, NextResponse } from 'next/server';
import { getOffers, createOffer } from '@/lib/db/store';

export async function GET() {
  try {
    const offers = await getOffers();
    return NextResponse.json({ success: true, count: offers.length, offers });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve offers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, code, discountPercent, description, benefits, validity, image } = body;

    if (!title || !code || !discountPercent) {
      return NextResponse.json(
        { error: 'Title, promo code, and discount percentage are required' },
        { status: 400 }
      );
    }

    const offer = await createOffer({
      title,
      code: code.toUpperCase().trim(),
      discountPercent: Number(discountPercent),
      description: description || '',
      benefits: Array.isArray(benefits) ? benefits : [benefits].filter(Boolean),
      validity: validity || 'Limited Time Offer',
      image: image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      active: true,
    });

    return NextResponse.json({ success: true, offer }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create promotion offer' },
      { status: 500 }
    );
  }
}
