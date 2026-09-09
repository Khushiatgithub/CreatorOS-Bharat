'use client';

import React from 'react';
import FeaturePageLayout, { FeaturePageData } from '@/components/features/FeaturePageLayout';
import { 
  Palette, 
  Smartphone, 
  Zap, 
  ShoppingBag, 
  Globe, 
  Layers, 
  ArrowUpRight, 
  Check, 
  Sparkles,
  ShieldCheck,
  QrCode,
  Eye
} from 'lucide-react';

const storefrontBuilderData: FeaturePageData = {
  badge: 'Storefront Builder',
  title: 'Your High-Converting Bio Link &',
  highlightedTitle: 'Creator Storefront',
  description: 'Replace Stan Store, Linktree, and Beacons with an Indian-first, 100% UPI-integrated bio storefront built for maximum conversion speed and zero card dropoffs.',
  metrics: [
    { label: 'Mobile Conversion Rate', value: '14.8%', change: '+3.4x vs Linktree' },
    { label: 'Page Load Speed', value: '0.4s', change: 'Edge CDN Optimized' },
    { label: 'UPI Checkout Time', value: '3.2s', change: 'Direct PhonePe / GPay' }
  ],
  overviewTitle: 'Engineered for Mobile-First Indian Followers',
  overviewDescription: 'Instagram and YouTube followers browse on smartphones. CreatorOS storefronts load in 400 milliseconds, display your products with verified badges, and allow instant 1-click checkout without signing into external apps.',
  steps: [
    {
      number: '01',
      title: 'Claim Your Custom Handle',
      description: 'Get your clean, memorable URL (e.g. creatoros.in/aarav.tech) in 30 seconds with custom branding.',
      badge: '30 Seconds'
    },
    {
      number: '02',
      title: 'Pick a Dark Luxury Theme',
      description: 'Choose from curated linear dark themes (Linear Royal, Cyber Emerald, Amber Glow) with glassmorphic cards.',
      badge: 'No Code'
    },
    {
      number: '03',
      title: 'Add Products, Links & 1:1 Calls',
      description: 'Stack PDFs, video courses, Google Meet booking slots, and custom social links in one fluid list.',
      badge: 'All-in-One'
    },
    {
      number: '04',
      title: 'Paste Link in Bio & Collect 100%',
      description: 'Drop your link on Instagram, YouTube, LinkedIn, or Twitter and receive direct UPI payouts with 0% platform fee.',
      badge: '0% Platform Fee'
    }
  ],
  benefits: [
    {
      icon: Smartphone,
      title: 'Mobile-Optimized UX',
      description: 'Thumb-friendly UI designed specifically for Indian mobile traffic from Instagram reels and YouTube shorts.',
      tag: '99.2% Mobile Ready'
    },
    {
      icon: Zap,
      title: 'Instant 1-Click UPI Gateway',
      description: 'Embedded PhonePe, Google Pay, Paytm, and CRED payment drawer without redirecting to clunky external portals.',
      tag: '0% Dropoff'
    },
    {
      icon: Palette,
      title: 'Linear Dark Luxury Aesthetics',
      description: 'Glassmorphism gradients, glowing borders, and crisp typography that make you look like a top 1% creator.',
      tag: 'Pro Aesthetics'
    },
    {
      icon: ShieldCheck,
      title: 'Verified Creator Badge',
      description: 'Display an official verified checkmark beside your handle to build instant trust with first-time Indian buyers.',
      tag: 'High Trust'
    },
    {
      icon: Layers,
      title: 'Custom Social & Media Links',
      description: 'Organize your YouTube channels, Telegram VIP groups, GitHub repositories, and newsletters in one hub.',
      tag: 'Unlimited Links'
    },
    {
      icon: Globe,
      title: 'Custom Domain Mapping',
      description: 'Point your own custom domain (e.g. store.aaravtech.com) with automated free SSL certificates.',
      tag: 'Custom Domain'
    }
  ],
  previewComponent: (
    <div className="max-w-md mx-auto rounded-[32px] border border-white/[0.15] bg-[#070913] p-6 shadow-2xl space-y-5">
      {/* Creator Profile Header */}
      <div className="text-center space-y-2">
        <div className="relative inline-block">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" 
            alt="Creator" 
            className="h-16 w-16 rounded-full object-cover ring-2 ring-royal-500 mx-auto"
          />
          <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-[#070913]" />
        </div>
        <div>
          <div className="flex items-center justify-center gap-1.5">
            <h4 className="font-bold text-sm text-white">Ananya Verma</h4>
            <ShieldCheck className="h-4 w-4 text-royal-400" />
          </div>
          <p className="text-xs text-royal-400 font-mono">@ananya.tech</p>
          <p className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
            CS Educator & Ex-Google SDE • 185k+ Community
          </p>
        </div>
      </div>

      {/* Product Cards */}
      <div className="space-y-3 pt-2">
        <div className="rounded-[18px] border border-royal-500/30 bg-royal-600/10 p-3.5 flex items-center justify-between shadow-royal-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-[12px] bg-royal-500/20 text-royal-400 flex items-center justify-center font-bold text-xs">
              PDF
            </div>
            <div>
              <p className="font-semibold text-xs text-white">FAANG DSA 450 Notes 2025</p>
              <p className="text-[10px] text-emerald-400 font-mono">Instant WhatsApp Delivery</p>
            </div>
          </div>
          <span className="rounded-full bg-royal-600 px-3 py-1 text-xs font-bold text-white shadow-sm font-mono">
            ₹399
          </span>
        </div>

        <div className="rounded-[18px] border border-white/[0.08] bg-white/[0.03] p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-[12px] bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
              1:1
            </div>
            <div>
              <p className="font-semibold text-xs text-white">30-Min Resume & Mock Call</p>
              <p className="text-[10px] text-slate-400 font-mono">Google Meet Sync</p>
            </div>
          </div>
          <span className="rounded-full bg-white/[0.08] px-3 py-1 text-xs font-bold text-white font-mono">
            ₹1,499
          </span>
        </div>
      </div>

      {/* 1-Click UPI Payment Button */}
      <div className="pt-2">
        <button className="w-full rounded-[16px] bg-gradient-to-r from-royal-600 to-royal-700 py-3 text-xs font-bold text-white shadow-royal flex items-center justify-center gap-2">
          <Zap className="h-4 w-4 text-amber-400 fill-amber-400" />
          <span>Pay via PhonePe / GPay in 3 Seconds</span>
        </button>
      </div>
    </div>
  ),
  faqs: [
    {
      question: 'How is this different from Linktree or Stan Store?',
      answer: 'Linktree only shows links and cannot process native UPI payments. Stan Store is USD-based, charges heavy Stripe transaction fees, and experiences 40%+ card failure rates in India. CreatorOS is built with 0% fee Indian UPI rails and automated GST invoicing.'
    },
    {
      question: 'Can I use my own custom domain?',
      answer: 'Yes! You can point any domain (e.g. yourname.com) directly to your CreatorOS bio storefront with free automated SSL.'
    },
    {
      question: 'Do buyers need to create an account to purchase from my storefront?',
      answer: 'No! Buyers enter their WhatsApp number or Email, pay via their favorite UPI app (GPay, PhonePe, Paytm, CRED), and instantly receive their file without needing a password.'
    },
    {
      question: 'How quickly do I receive my funds?',
      answer: 'Funds are credited directly to your connected Indian bank account via IMPS / UPI with instant or same-day settlements.'
    }
  ]
};

export default function StorefrontBuilderPage() {
  return <FeaturePageLayout data={storefrontBuilderData} />;
}
