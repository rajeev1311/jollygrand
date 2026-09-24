import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jolly Grand | Luxury Hotel & 5-Star Hospitality',
  description: 'Experience refined luxury, exceptional hospitality and unforgettable stays at Jolly Grand. Discover palatial suites, Michelin-star dining, and bespoke wellness.',
  keywords: [
    'Jolly Grand',
    'Luxury Hotel',
    '5 Star Hotel',
    'Presidential Suite',
    'Luxury Accommodations',
    'Fine Dining',
    'Celestial Spa',
    'Executive Retreat',
  ],
  authors: [{ name: 'Jolly Grand Hospitality Group' }],
  openGraph: {
    title: 'Jolly Grand | Luxury Hotel & 5-Star Hospitality',
    description: 'Experience refined luxury, exceptional hospitality and unforgettable stays at Jolly Grand.',
    url: 'https://jollygrand.com',
    siteName: 'Jolly Grand',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85',
        width: 1200,
        height: 630,
        alt: 'Jolly Grand Luxury Hotel',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jolly Grand | Luxury Hotel & 5-Star Hospitality',
    description: 'Where Every Stay Becomes A Story. 5-Star Luxury Accommodations & World-Class Hospitality.',
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=85'],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#0E1014',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${plusJakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#0E1014] text-[#FAF8F5] font-sans antialiased selection:bg-[#C5A880]/30 selection:text-[#FAF8F5]">
        {children}
      </body>
    </html>
  );
}
