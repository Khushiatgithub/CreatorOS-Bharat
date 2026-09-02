import type { Metadata, Viewport } from 'next';
import './globals.css';

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
      <body className="min-h-screen bg-[#090A0F] text-slate-100 antialiased font-sans selection:bg-amber-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
