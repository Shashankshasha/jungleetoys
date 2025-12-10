import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';

export const metadata: Metadata = {
  title: {
    default: 'JungleeToys - Fun Toys for Every Adventure',
    template: '%s | JungleeToys',
  },
  description:
    'Discover amazing toys for kids of all ages. From action figures to educational toys, find the perfect gift at JungleeToys. Free UK delivery over £50!',
  keywords: [
    'toys',
    'kids toys',
    'action figures',
    'educational toys',
    'outdoor toys',
    'board games',
    'UK toy shop',
  ],
  authors: [{ name: 'JungleeToys' }],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://jungleetoys.com',
    siteName: 'JungleeToys',
    title: 'JungleeToys - Fun Toys for Every Adventure',
    description:
      'Discover amazing toys for kids of all ages. From action figures to educational toys, find the perfect gift at JungleeToys.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JungleeToys',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JungleeToys - Fun Toys for Every Adventure',
    description: 'Discover amazing toys for kids of all ages.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
