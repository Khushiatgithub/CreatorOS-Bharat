import type { Metadata, Viewport } from 'next';
import { Inter, Outfit, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'CreatorOS India — The All-in-One Operating System for Indian Creators',
  description: 'Sell notes, courses, notion templates, and 1:1 mentorship with instant UPI checkout, automated GST invoices, and WhatsApp delivery.',
  keywords: [
    'CreatorOS India',
    'Stan Store India',
    'Gumroad India UPI',
    'Topmate alternative',
    'Indian Creator Economy',
    'Sell Notes UPI',
    'Kajabi India',
    'AI Media Kit India'
  ],
  authors: [{ name: 'CreatorOS Team' }],
  openGraph: {
    title: 'CreatorOS India — Monetize Your Audience with 1-Click UPI',
    description: 'The premier bio-link storefront, digital product engine, and course platform built for Bharat creators.',
    url: 'https://creatoros.in',
    siteName: 'CreatorOS India',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} min-h-screen bg-[#05070B] text-slate-100 antialiased font-sans selection:bg-royal-600 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
