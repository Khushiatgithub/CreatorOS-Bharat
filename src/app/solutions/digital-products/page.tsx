'use client';

import React from 'react';
import FeaturePageLayout, { FeaturePageData } from '@/components/features/FeaturePageLayout';
import { 
  FileText, 
  Download, 
  Lock, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Sparkles,
  Smartphone,
  CheckCircle2
} from 'lucide-react';

const digitalProductsData: FeaturePageData = {
  badge: 'Digital Product Monetization',
  title: 'Sell PDFs, Notion Kits & Code Repos with',
  highlightedTitle: 'Instant 1-Click UPI Speed',
  description: 'The Gumroad & Stan Store alternative for Bharat. Sell handwritten DSA notes, UPSC blueprints, Excel models, UI design kits, and software templates with zero credit card failure rates.',
  metrics: [
    { label: 'Indian Payment Success', value: '99.4%', change: 'Native PhonePe/GPay QR' },
    { label: 'Download Delivery', value: '< 30s', change: 'WhatsApp + Browser Instant' },
    { label: 'Platform Fee', value: '0%', change: 'On Pro Plan' }
  ],
  overviewTitle: 'Turn Knowledge into High-Margin Passive Revenue',
  overviewDescription: 'Indian students and professionals prefer instant UPI payment over international credit card checkouts. CreatorOS allows you to upload any digital file, set your INR price, and start collecting payouts directly into your bank account with automatic GST tax invoices.',
  steps: [
    {
      number: '01',
      title: 'Upload Your File or Resource Link',
      description: 'Upload your PDF, ZIP, Notion duplicate link, Figma design file, or GitHub repository URL.',
      badge: 'All Formats'
    },
    {
      number: '02',
      title: 'Set Your Price in Indian Rupees (₹)',
      description: 'Configure standard pricing (e.g. ₹299, ₹499, ₹999) or discounted early-bird strike-through pricing.',
      badge: 'INR Native'
    },
    {
      number: '03',
      title: 'Buyer Scans UPI QR or Taps GPay',
      description: 'Buyers complete the transaction in under 3 seconds using their preferred Indian payment app.',
      badge: 'Instant QR'
    },
    {
      number: '04',
      title: 'Instant WhatsApp & Direct Download',
      description: 'Protected file download is served on screen and sent to the buyer’s WhatsApp with SAC 998439 invoice.',
      badge: 'Auto Delivery'
    }
  ],
  benefits: [
    {
      icon: Zap,
      title: 'Zero Card Decline Rates',
      description: 'Eliminate the 40%+ dropoff rate caused by international payment gateways like Stripe or Gumroad in India.',
      tag: 'UPI Native'
    },
    {
      icon: Lock,
      title: 'Secure Expiring Download Links',
      description: 'Protect your intellectual property with tamper-proof, time-limited digital download links.',
      tag: 'IP Protection'
    },
    {
      icon: Download,
      title: 'Instant Multi-Channel Delivery',
      description: 'Files are delivered simultaneously in the browser, via email, and directly on WhatsApp.',
      tag: '3-Way Delivery'
    },
    {
      icon: ShieldCheck,
      title: 'Automated Tax Compliance',
      description: 'Every sale generates an official B2C/B2B tax invoice with SAC code 998439 for accounting.',
      tag: 'GST Ready'
    },
    {
      icon: Smartphone,
      title: 'Mobile-Optimized PDF Viewer',
      description: 'Students can preview sample chapters and read notes directly on smartphones without downloading external viewers.',
      tag: 'In-app Preview'
    },
    {
      icon: Layers,
      title: 'Product Bundles & Upsells',
      description: 'Increase your average order value (AOV) by offering 1-click upsells and discounted multi-product bundles.',
      tag: '+35% AOV'
    }
  ],
  previewComponent: (
    <div className="max-w-lg mx-auto rounded-[24px] border border-white/[0.15] bg-[#0A0E1A] p-6 shadow-2xl space-y-4">
      <div className="flex items-center gap-4">
        <img 
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=300&q=80" 
          alt="Product Cover" 
          className="h-20 w-20 rounded-2xl object-cover ring-1 ring-royal-500/40"
        />
        <div className="flex-1">
          <span className="rounded-full bg-royal-600/15 text-royal-400 border border-royal-500/30 px-2 py-0.5 text-[10px] font-mono font-semibold">
            DIGITAL NOTES (PDF)
          </span>
          <h4 className="font-display font-bold text-sm text-white mt-1">
            Ultimate FAANG SDE & DSA Master Sheet 2025
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5">by Aarav Sharma • 450+ Solved Problems</p>
        </div>
      </div>

      <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-display text-2xl font-black text-white font-mono">₹399</span>
          <span className="text-xs text-slate-500 line-through font-mono">₹999</span>
          <span className="rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold px-1.5 py-0.5">
            60% OFF
          </span>
        </div>
        <span className="text-[10px] text-emerald-400 font-mono font-semibold">
          ⚡ 100% Instant IMPS Settlement
        </span>
      </div>

      <div className="pt-1">
        <button className="w-full rounded-[14px] bg-gradient-to-r from-royal-600 to-royal-700 py-3 text-xs font-bold text-white shadow-royal flex items-center justify-center gap-2">
          <Zap className="h-4 w-4 text-amber-400 fill-amber-400" />
          <span>Instant UPI Buy with PhonePe / GPay / Paytm</span>
        </button>
      </div>
    </div>
  ),
  faqs: [
    {
      question: 'What file formats can I sell?',
      answer: 'You can sell any digital product: PDFs, ZIP archives, Notion templates, Figma kits, Excel spreadsheets, audio files, code repositories, and Google Drive links.'
    },
    {
      question: 'Is there a file size limit?',
      answer: 'CreatorOS supports file uploads up to 2GB per product on high-speed CDN storage.'
    },
    {
      question: 'How do buyers receive their files?',
      answer: 'Immediately after paying via UPI, a direct download button appears on screen, and an automated copy is sent to the buyer’s WhatsApp and Email.'
    },
    {
      question: 'Can I set discount coupon codes?',
      answer: 'Yes! You can create custom promo codes (e.g. FESTIVE50) with percentage or flat rupee discounts and expiration limits.'
    }
  ]
};

export default function DigitalProductsPage() {
  return <FeaturePageLayout data={digitalProductsData} />;
}
