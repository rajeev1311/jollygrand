import { NextRequest, NextResponse } from 'next/server';
import { getRooms, createRoom } from '@/lib/db/store';
import { slugify } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const capacity = searchParams.get('capacity');
    const featured = searchParams.get('featured');

    let rooms = await getRooms();

    if (category && category !== 'ALL') {
      rooms = rooms.filter((r) => r.category.toUpperCase() === category.toUpperCase());
    }

    if (capacity) {
      const capNum = parseInt(capacity, 10);
      if (!isNaN(capNum)) {
        rooms = rooms.filter((r) => r.capacity >= capNum);
      }
    }

    if (featured === 'true') {
      rooms = rooms.filter((r) => r.featured);
    }

    return NextResponse.json({ success: true, count: rooms.length, rooms });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to retrieve hotel rooms' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, pricePerNight, shortDesc, description, capacity, bedType, sizeSqFt, image, amenities } = body;

    if (!name || !pricePerNight || !description) {
      return NextResponse.json(
        { error: 'Name, price, and description are required' },
        { status: 400 }
      );
    }

    const slug = slugify(name);

    const room = await createRoom({
      slug,
      name,
      category: category || 'DELUXE',
      shortDesc: shortDesc || description.slice(0, 120),
      description,
      pricePerNight: Number(pricePerNight),
      capacity: Number(capacity) || 2,
      bedType: bedType || 'King Bed',
      sizeSqFt: Number(sizeSqFt) || 500,
      image: image || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85',
      images: [
        image || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85',
      ],
      rating: 5.0,
      isAvailable: true,
      featured: false,
      amenities: Array.isArray(amenities)
        ? amenities.map((a: any, i: number) => ({ id: `am-${Date.now()}-${i}`, name: typeof a === 'string' ? a : a.name }))
        : [],
    });

    return NextResponse.json({ success: true, room }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create room' },
      { status: 500 }
    );
  }
}
