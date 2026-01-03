import './globals.css';
import type { Metadata } from 'next';
import { Inter, Archivo_Black } from 'next/font/google';
import StructuredData from './components/StructuredData';

// Optimize fonts with Next.js font system - Gen-Z Streetwear Design System
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
  weight: ['400'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://urbno.shop'),
  title: {
    default: 'URBNO SHOP - Premium Gen-Z Men\'s Streetwear | Modern Fashion India',
    template: '%s | URBNO SHOP',
  },
  description: 'URBNO SHOP - India\'s premium Gen-Z men\'s streetwear brand. Shop exclusive hoodies, t-shirts & modern fashion. Limited edition drops. Free shipping. urbno.shop',
  keywords: ['urbno shop', 'urbno.shop', 'urbno', 'men\'s streetwear India', 'Gen-Z fashion', 'premium hoodies India', 'stylish t-shirts men', 'urban fashion', 'streetwear brand India', 'modern men\'s clothing', 'limited edition fashion', 'trendy hoodies', 'graphic t-shirts', 'Indian streetwear', 'youth fashion India', 'cool t-shirts for men', 'oversized hoodies', 'urbno street', 'urbno clothing', 'urbno fashion'],
  authors: [{ name: 'URBNO SHOP', url: 'https://urbno.shop' }],
  creator: 'URBNO SHOP',
  publisher: 'URBNO SHOP',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://urbno.shop',
    siteName: 'URBNO SHOP',
    title: 'URBNO SHOP - Premium Gen-Z Men\'s Streetwear India',
    description: 'Shop exclusive men\'s hoodies, t-shirts & streetwear. Premium quality, modern designs. Limited edition drops. Free shipping across India.',
    images: [
      {
        url: 'https://urbno.shop/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'URBNO SHOP - Premium Men\'s Streetwear',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'URBNO SHOP - Premium Gen-Z Men\'s Streetwear',
    description: 'Shop exclusive men\'s hoodies, t-shirts & modern fashion. Limited edition drops.',
    images: ['https://urbno.shop/og-image.jpg'],
    creator: '@urbno.in',
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
    canonical: 'https://urbno.shop',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${archivoBlack.variable}`}>
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
            name: 'URBNO SHOP',
            alternateName: 'URBNO',
            url: 'https://urbno.shop',
            logo: 'https://urbno.shop/logo.png',
            description: 'Premium Gen-Z men\'s streetwear brand in India. Shop exclusive hoodies, t-shirts and modern fashion.',
            sameAs: [
              'https://www.instagram.com/urbno.in?igsh=ODFobGF6dGM3MXU1&utm_source=qr',
            ],
          }}
        />
        <StructuredData
          type="WebSite"
          data={{
            name: 'URBNO SHOP',
            url: 'https://urbno.shop',
          }}
        />
        {children}
      </body>
    </html>
  );
}