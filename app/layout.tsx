import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import StructuredData from './components/StructuredData';

// Optimize fonts with Next.js font system - Vogue-Hype Design System
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://urbno.com'),
  title: {
    default: 'URBNO - Hand-Sketched Streetwear | Limited Drops & Studio Collabs',
    template: '%s | URBNO',
  },
  description: 'Limited drops and studio collabs. Inspired by Urban Monkey design. Hand-sketched streetwear for the streets.',
  keywords: ['streetwear', 'limited edition', 'urban fashion', 'hand-sketched', 'URBNO', 'fashion', 'clothing', 'street style'],
  authors: [{ name: 'URBNO' }],
  creator: 'URBNO',
  publisher: 'URBNO',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'URBNO',
    title: 'URBNO - Hand-Sketched Streetwear | Limited Drops & Studio Collabs',
    description: 'Limited drops and studio collabs. Inspired by Urban Monkey design. Hand-sketched streetwear for the streets.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'URBNO - Hand-Sketched Streetwear',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URBNO - Hand-Sketched Streetwear',
    description: 'Limited drops and studio collabs. Inspired by Urban Monkey design.',
    images: ['/og-image.jpg'],
    creator: '@urbno',
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
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F9F9F9" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.className} antialiased bg-off-white text-carbon`}>
        <StructuredData
          type="Organization"
          data={{
            name: 'URBNO',
            description: 'Hand-sketched streetwear brand. Limited drops and studio collabs.',
          }}
        />
        <StructuredData
          type="WebSite"
          data={{
            name: 'URBNO',
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://urbno.com',
          }}
        />
        {children}
      </body>
    </html>
  );
}