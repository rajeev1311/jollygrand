import { PrismaClient } from '@prisma/client';
import {
  INITIAL_ROOMS,
  INITIAL_GUESTS,
  INITIAL_SERVICES,
  INITIAL_OFFERS,
  INITIAL_CONTACT_MESSAGES
} from '../lib/db/seed-data';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Jolly Grand luxury hotel database...');

  // Create Admin User
  const adminUser = await prisma.user.upsert({
    where: { username: 'jolly' },
    update: {},
    create: {
      username: 'jolly',
      password: 'Abc@123',
      name: 'Jolly Grand General Manager',
      email: 'gm@jollygrand.com',
      role: 'ADMIN',
    },
  });
  console.log('Admin user initialized:', adminUser.username);

  // Seed Rooms & Amenities
  for (const r of INITIAL_ROOMS) {
    const room = await prisma.room.upsert({
      where: { slug: r.slug },
      update: {},
      create: {
        id: r.id,
        slug: r.slug,
        name: r.name,
        category: r.category as any,
        description: r.description,
        shortDesc: r.shortDesc,
        pricePerNight: r.pricePerNight,
        capacity: r.capacity,
        bedType: r.bedType,
        sizeSqFt: r.sizeSqFt,
        image: r.image,
        images: r.images,
        rating: r.rating,
        isAvailable: r.isAvailable,
        featured: r.featured,
        amenities: {
          create: Array.isArray(r.amenities)
            ? r.amenities.map((a: any) => ({
                name: typeof a === 'string' ? a : a.name,
              }))
            : [],
        },
      },
    });
    console.log('Seeded room:', room.name);
  }

  // Seed Guests
  for (const g of INITIAL_GUESTS) {
    await prisma.guest.upsert({
      where: { email: g.email },
      update: {},
      create: {
        id: g.id,
        firstName: g.firstName,
        lastName: g.lastName,
        email: g.email,
        phone: g.phone,
      },
    });
  }

  // Seed Services
  for (const s of INITIAL_SERVICES) {
    await prisma.service.upsert({
      where: { id: s.id },
      update: {},
      create: {
        id: s.id,
        title: s.title,
        description: s.description,
        category: s.category,
        icon: s.icon,
        price: s.price,
        duration: s.duration,
        image: s.image,
      },
    });
  }

  // Seed Offers
  for (const o of INITIAL_OFFERS) {
    await prisma.offer.upsert({
      where: { code: o.code },
      update: {},
      create: {
        id: o.id,
        title: o.title,
        code: o.code,
        discountPercent: o.discountPercent,
        description: o.description,
        benefits: o.benefits,
        validity: o.validity,
        image: o.image,
        active: o.active,
      },
    });
  }

  // Seed Contact Messages
  for (const m of INITIAL_CONTACT_MESSAGES) {
    await prisma.contactMessage.upsert({
      where: { id: m.id },
      update: {},
      create: {
        id: m.id,
        name: m.name,
        email: m.email,
        phone: m.phone,
        subject: m.subject,
        message: m.message,
        isRead: m.isRead,
      },
    });
  }

  console.log('Jolly Grand database seeded successfully.');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
