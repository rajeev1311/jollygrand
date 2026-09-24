import { Room, Guest, Booking, ServiceItem, OfferItem } from '@/types/hotel';

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'room-deluxe-sanctuary',
    slug: 'deluxe-king-sanctuary',
    name: 'Deluxe King Sanctuary',
    category: 'DELUXE',
    shortDesc: 'Refined comfort featuring handcrafted walnut furnishings, plush king bedding, and an expansive marble rain bath.',
    description: 'The Deluxe King Sanctuary is an intimate haven designed for the discerning traveler. Bathed in soft natural sunlight from floor-to-ceiling soundproof acoustic glass, the room features bespoke Italian walnut paneling, hand-woven silk-blend carpets, and a cloud-like California King bed dressed in 600-thread-count Egyptian cotton. The en-suite bathroom is clad in Fior di Bosco marble, featuring a freestanding deep soaking tub, separate multi-jet rain shower, and signature Diptyque Paris amenities.',
    pricePerNight: 480,
    capacity: 2,
    bedType: 'California King Bed',
    sizeSqFt: 550,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1600&q=85'
    ],
    rating: 4.92,
    isAvailable: true,
    featured: true,
    amenities: [
      { id: 'am-1', name: 'California King Bed' },
      { id: 'am-2', name: 'Italian Marble Rain Bath' },
      { id: 'am-3', name: 'Diptyque Paris Amenities' },
      { id: 'am-4', name: 'Nespresso Bar & Artisanal Teas' },
      { id: 'am-5', name: 'Bang & Olufsen Sound System' },
      { id: 'am-6', name: 'High-Speed Fiber Wi-Fi' },
      { id: 'am-7', name: '24-Hour In-Room Dining' },
      { id: 'am-8', name: 'Smart Climate Control' }
    ]
  },
  {
    id: 'room-grand-skyline',
    slug: 'grand-deluxe-skyline-suite',
    name: 'Grand Deluxe Skyline Room',
    category: 'GRAND_DELUXE',
    shortDesc: 'Elevated luxury with commanding panoramic skyline vistas, custom lounge salon, and private sunset terrace.',
    description: 'Perched on high executive floors, the Grand Deluxe Skyline Room pairs elevated perspectives with sophisticated residential warmth. Wake up to unobstructed skyline horizons, savor sunrise espresso on your private teak-finished terrace, and unwind in the dedicated reading salon. Impeccable acoustics ensure complete serenity, while ambient Lutron touch controls allow you to craft the perfect evening illumination.',
    pricePerNight: 720,
    capacity: 3,
    bedType: 'Grand King Bed',
    sizeSqFt: 720,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=85'
    ],
    rating: 4.96,
    isAvailable: true,
    featured: true,
    amenities: [
      { id: 'am-9', name: 'Private Teak Balcony' },
      { id: 'am-10', name: 'Floor-to-Ceiling Skyline Views' },
      { id: 'am-11', name: 'Deep Marble Soaking Tub' },
      { id: 'am-12', name: 'Curated In-Suite Wine Cellar' },
      { id: 'am-13', name: 'Dedicated Butler Call System' },
      { id: 'am-14', name: 'Velour Bathrobes & Slippers' },
      { id: 'am-15', name: 'Walk-In Dressing Wardrobe' },
      { id: 'am-16', name: 'Evening Turndown Service' }
    ]
  },
  {
    id: 'room-executive-suite',
    slug: 'imperial-executive-suite',
    name: 'Imperial Executive Suite',
    category: 'EXECUTIVE_SUITE',
    shortDesc: 'A sprawling one-bedroom sanctuary featuring a private dining salon, bespoke bar, and dedicated butler pantry.',
    description: 'Designed for diplomats, visionaries, and discerning connoisseurs, the Imperial Executive Suite represents the apex of modern hospitality design. Spanning over 1,150 square feet, the suite encompasses a private dining table for six, an opulent living salon with travertine fireplace accents, an ergonomic executive work atelier, and a secluded master bedroom suite with dual walk-in closets and spa dressing chambers.',
    pricePerNight: 1250,
    capacity: 4,
    bedType: 'Master King + Rollaway',
    sizeSqFt: 1150,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85'
    ],
    rating: 4.98,
    isAvailable: true,
    featured: true,
    amenities: [
      { id: 'am-17', name: 'Private Dining Salon for 6' },
      { id: 'am-18', name: 'Dedicated 24/7 Butler Service' },
      { id: 'am-19', name: 'Complimentary Mercedes Airport Transfer' },
      { id: 'am-20', name: 'Dual Marble Vanity & Jacuzzi' },
      { id: 'am-21', name: 'Executive Work Atelier & Library' },
      { id: 'am-22', name: 'Full Premium Bar with Rare Spirits' },
      { id: 'am-23', name: 'Private Guest Powder Room' },
      { id: 'am-24', name: 'Priority Access to Signature Dining' }
    ]
  },
  {
    id: 'room-presidential-suite',
    slug: 'the-jolly-grand-presidential-suite',
    name: 'The Jolly Grand Presidential Suite',
    category: 'PRESIDENTIAL_SUITE',
    shortDesc: 'The crowning jewel of Jolly Grand. Multi-room palatial suite with grand piano, wrap-around terrace, and private infinity plunge pool.',
    description: 'Occupying the entire top penthouse wing, The Jolly Grand Presidential Suite is an architectural masterpiece of unrivaled grandeur. Featuring 2,400 square feet of curated luxury, the suite boasts double-height vaulted ceilings, a handcrafted Steinway baby grand piano, private heated infinity plunge pool overlooking the city skyline, a 10-guest banquet dining room, and an en-suite private hammam steam spa with 24-karat gold fixtures.',
    pricePerNight: 2850,
    capacity: 6,
    bedType: 'Palatial King + 2 Queen Suites',
    sizeSqFt: 2400,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85'
    ],
    rating: 5.0,
    isAvailable: true,
    featured: true,
    amenities: [
      { id: 'am-25', name: 'Private Heated Penthouse Plunge Pool' },
      { id: 'am-26', name: 'Steinway & Sons Baby Grand Piano' },
      { id: 'am-27', name: '10-Guest Banquet Hall & Private Chef Kitchen' },
      { id: 'am-28', name: 'Private Hammam Steam Spa' },
      { id: 'am-29', name: 'Roundtrip Rolls-Royce Phantom Chauffeur' },
      { id: 'am-30', name: 'Two Dedicated Senior Butlers' },
      { id: 'am-31', name: '360-Degree Wrap-Around Terrace' },
      { id: 'am-32', name: 'Private Bullet-Resistant Glass & Secured Entry' }
    ]
  },
  {
    id: 'room-deluxe-garden',
    slug: 'deluxe-garden-courtyard-room',
    name: 'Deluxe Garden Courtyard Room',
    category: 'DELUXE',
    shortDesc: 'A serene ground-level retreat opening directly onto secluded landscaped botanical fountains.',
    description: 'Tucked away along our tranquil royal courtyard, the Deluxe Garden Room provides peaceful sanctuary amidst lush flora, stone fountains, and gentle ambient water features. Enjoy morning tea on your secluded private patio surrounded by jasmine and citrus trees.',
    pricePerNight: 510,
    capacity: 2,
    bedType: 'King Bed',
    sizeSqFt: 580,
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85'
    ],
    rating: 4.89,
    isAvailable: true,
    featured: false,
    amenities: [
      { id: 'am-33', name: 'Private Botanical Courtyard Terrace' },
      { id: 'am-34', name: 'King Bed with Organic Silk Linens' },
      { id: 'am-35', name: 'Limestone Garden Rain Shower' },
      { id: 'am-36', name: 'Artisanal Herbal Tea Bar' },
      { id: 'am-37', name: 'Aromatherapy Night Diffusers' }
    ]
  },
  {
    id: 'room-grand-ocean',
    slug: 'grand-deluxe-ocean-balcony',
    name: 'Grand Deluxe Ocean Balcony',
    category: 'GRAND_DELUXE',
    shortDesc: 'Breathtaking ocean views with gentle sea breezes, cantilevered glass balcony, and sunset daybed.',
    description: 'Immerse yourself in maritime tranquility. The Grand Deluxe Ocean Balcony offers sweeping horizons of azure waters. Step out onto your glass-fronted balcony to hear waves crashing against the shoreline while lounging on a plush dual sunbed.',
    pricePerNight: 780,
    capacity: 2,
    bedType: 'King Bed',
    sizeSqFt: 690,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=85'
    ],
    rating: 4.94,
    isAvailable: true,
    featured: false,
    amenities: [
      { id: 'am-38', name: 'Oceanfront Glass Balcony' },
      { id: 'am-39', name: 'Sunset Daybed' },
      { id: 'am-40', name: 'Marble Hydrotherapy Tub' },
      { id: 'am-41', name: 'Complimentary Evening Champagne' }
    ]
  }
];

export const INITIAL_GUESTS: Guest[] = [
  {
    id: 'guest-1',
    firstName: 'Alexander',
    lastName: 'Vanderbilt',
    email: 'alexander.v@luxurycapital.com',
    phone: '+1 (555) 234-8901',
    createdAt: new Date('2026-08-10')
  },
  {
    id: 'guest-2',
    firstName: 'Elena',
    lastName: 'Rostova',
    email: 'elena.rostova@geneva-arts.ch',
    phone: '+41 22 739 4012',
    createdAt: new Date('2026-08-15')
  },
  {
    id: 'guest-3',
    firstName: 'Marcus',
    lastName: 'Sterling',
    email: 'marcus@sterlingholdings.co.uk',
    phone: '+44 20 7946 0912',
    createdAt: new Date('2026-08-20')
  },
  {
    id: 'guest-4',
    firstName: 'Sophia',
    lastName: 'Chen',
    email: 'sophia.chen@pacificventures.sg',
    phone: '+65 6789 1234',
    createdAt: new Date('2026-09-01')
  },
  {
    id: 'guest-5',
    firstName: 'Julian',
    lastName: 'Delacroix',
    email: 'julian.delacroix@parisedition.fr',
    phone: '+33 1 42 68 55 00',
    createdAt: new Date('2026-09-12')
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book-1',
    bookingReference: 'JG-2026-8942',
    guestId: 'guest-1',
    roomId: 'room-presidential-suite',
    checkIn: new Date(Date.now() + 86400000 * 2), // in 2 days
    checkOut: new Date(Date.now() + 86400000 * 6), // 4 nights
    guests: 2,
    status: 'CONFIRMED',
    totalAmount: 11400,
    specialRequests: 'Dom Pérignon 2012 on arrival, airport Rolls-Royce transfer required at 3:30 PM.',
    createdAt: new Date('2026-09-18')
  },
  {
    id: 'book-2',
    bookingReference: 'JG-2026-7815',
    guestId: 'guest-2',
    roomId: 'room-executive-suite',
    checkIn: new Date(Date.now() - 86400000 * 1), // checked in yesterday
    checkOut: new Date(Date.now() + 86400000 * 3),
    guests: 2,
    status: 'CHECKED_IN',
    totalAmount: 5000,
    specialRequests: 'Feather-free hypoallergenic pillows and daily afternoon Darjeeling tea service.',
    createdAt: new Date('2026-09-10')
  },
  {
    id: 'book-3',
    bookingReference: 'JG-2026-6421',
    guestId: 'guest-3',
    roomId: 'room-grand-skyline',
    checkIn: new Date(Date.now() + 86400000 * 5),
    checkOut: new Date(Date.now() + 86400000 * 8),
    guests: 2,
    status: 'CONFIRMED',
    totalAmount: 2160,
    specialRequests: 'High floor corner room requested, quiet wing.',
    createdAt: new Date('2026-09-20')
  },
  {
    id: 'book-4',
    bookingReference: 'JG-2026-5190',
    guestId: 'guest-4',
    roomId: 'room-deluxe-sanctuary',
    checkIn: new Date(Date.now() - 86400000 * 4),
    checkOut: new Date(Date.now() - 86400000 * 1),
    guests: 1,
    status: 'CHECKED_OUT',
    totalAmount: 1440,
    specialRequests: 'Late checkout granted at 2:00 PM.',
    createdAt: new Date('2026-09-05')
  },
  {
    id: 'book-5',
    bookingReference: 'JG-2026-3829',
    guestId: 'guest-5',
    roomId: 'room-deluxe-garden',
    checkIn: new Date(Date.now() + 86400000 * 1),
    checkOut: new Date(Date.now() + 86400000 * 4),
    guests: 2,
    status: 'PENDING',
    totalAmount: 1530,
    specialRequests: 'Honeymoon anniversary arrangement with rose petals and dessert presentation.',
    createdAt: new Date('2026-09-22')
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-concierge',
    title: '24/7 Royal Concierge',
    category: 'Hospitality',
    description: 'Bespoke itinerary curation, private jet charters, opera tickets, and exclusive VIP reservations at top global dining destinations.',
    icon: 'Crown',
    duration: '24 Hours',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'srv-spa',
    title: 'Celestial Holistic Spa',
    category: 'Wellness',
    description: 'Ancient Ayurvedic therapies, thermal vitality pools, sound healing crystals, and customized Swiss cellular facial rejuvenation.',
    icon: 'Sparkles',
    duration: '60 - 120 Mins',
    price: 240,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'srv-pool',
    title: 'Azure Heated Infinity Pool',
    category: 'Leisure',
    description: 'Temperature-controlled rooftop infinity oasis featuring private submerged cabanas, cocktail mixology, and sunset acoustics.',
    icon: 'Waves',
    duration: '6:00 AM - 10:00 PM',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'srv-dining',
    title: 'Signature Michelin-Starred Dining',
    category: 'Culinary',
    description: 'Gastronomic journey led by Executive Chef Jean-Luc Laurent, featuring locally sourced heritage ingredients and rare vintage pairings.',
    icon: 'Utensils',
    duration: 'Lunch & Dinner',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'srv-chauffeur',
    title: 'Private Chauffeur & Transfers',
    category: 'Transportation',
    description: 'Fleet of pristine Mercedes-Maybach and Rolls-Royce vehicles with bilingual chauffeurs, high-speed Wi-Fi, and chilled refreshments.',
    icon: 'Car',
    price: 180,
    duration: 'Per Transfer',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'srv-fitness',
    title: 'The Grand Atelier Fitness Center',
    category: 'Wellness',
    description: 'Technogym Artis biometric equipment, certified master personal trainers, sunrise rooftop yoga, and private pilates reformer studios.',
    icon: 'Dumbbell',
    duration: '24 Hours',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80'
  }
];

export const INITIAL_OFFERS: OfferItem[] = [
  {
    id: 'ofr-weekend',
    title: 'The Weekend Escape',
    code: 'WEEKEND25',
    discountPercent: 25,
    description: 'Escape into refined tranquility. Enjoy 25% off luxury suites Friday through Sunday with gourmet champagne breakfast and 4:00 PM late check-out.',
    benefits: [
      '25% savings on all suites',
      'Daily champagne breakfast for two at L’Étoile',
      'Complimentary 4:00 PM late check-out',
      '$100 Celestial Spa voucher'
    ],
    validity: 'Valid through Dec 31, 2026',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    active: true
  },
  {
    id: 'ofr-romantic',
    title: 'The Romantic Grand Rendezvous',
    code: 'ROMANCEJG',
    discountPercent: 20,
    description: 'An unforgettable celebration of love. Chilled bottle of vintage Dom Pérignon, rose petal turndown, 3-course private terrace dinner, and couple massage.',
    benefits: [
      'Vintage Champagne and artisanal truffles on arrival',
      'Couples 90-minute Celestial Spa treatment',
      'Private 3-course candlelit terrace dinner with sommelier pairing',
      'Personalized embroidered bathrobes to take home'
    ],
    validity: 'Year-Round Elegance',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    active: true
  },
  {
    id: 'ofr-business',
    title: 'Executive Stay & Boardroom Privileges',
    code: 'EXECSUMMIT',
    discountPercent: 15,
    description: 'Engineered for high-performing business leaders. Complimentary boardroom usage, high-speed encrypted fiber connectivity, and roundtrip airport chauffeur.',
    benefits: [
      'Complimentary executive suite room upgrade',
      'Two hours daily access to the Private Glass Boardroom',
      'Roundtrip airport transfer in executive sedan',
      'Express laundry and pressing service'
    ],
    validity: 'Sunday through Thursday stays',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    active: true
  },
  {
    id: 'ofr-earlybird',
    title: 'Advance Elegance (Early Bird)',
    code: 'EARLYBIRD30',
    discountPercent: 30,
    description: 'Plan ahead and secure the finest rates of the season. Reserve your suite 30 days in advance to unlock an exclusive 30% reduction.',
    benefits: [
      '30% savings on best flexible rates',
      'Welcome fruit cellar and signature afternoon tea',
      'Complimentary access to hydrotherapy thermal circuit',
      'Flexible date change up to 7 days prior'
    ],
    validity: 'Requires 30 days advance reservation',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    active: true
  }
];

export const INITIAL_CONTACT_MESSAGES = [
  {
    id: 'msg-1',
    name: 'Lady Victoria Hastings',
    email: 'vhastings@kensington.co.uk',
    phone: '+44 20 7123 4567',
    subject: 'Private Gala Reception & Penthouse Booking',
    message: 'We are planning an intimate 50-guest charity gala next November and would like to reserve the entire Presidential Penthouse wing alongside banquet catering.',
    isRead: false,
    createdAt: new Date('2026-09-23T14:30:00Z')
  },
  {
    id: 'msg-2',
    name: 'Dmitri Petrov',
    email: 'dmitri.p@nordicinvest.se',
    phone: '+46 8 123 4567',
    subject: 'Helicopter Airport Transfer & Security Clearance',
    message: 'Good afternoon. I will be arriving with my executive security detail on October 4. Please send details regarding your rooftop helipad access and secure floor protocols.',
    isRead: true,
    createdAt: new Date('2026-09-22T09:15:00Z')
  }
];
