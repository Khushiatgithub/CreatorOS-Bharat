'use client';

import React from 'react';
import FeaturePageLayout, { FeaturePageData } from '@/components/features/FeaturePageLayout';
import { 
  Building2, 
  Sparkles, 
  Handshake, 
  CheckCircle2, 
  DollarSign, 
  ShieldCheck, 
  ArrowUpRight, 
  TrendingUp,
  FileCheck
} from 'lucide-react';

const brandMarketplaceData: FeaturePageData = {
  badge: 'Brand Collaboration Marketplace',
  title: 'Land High-Paying Sponsorship Deals &',
  highlightedTitle: 'Verified Brand Campaigns',
  description: 'Connect directly with top Indian tech brands, edtech unicorns, and fintech startups looking for creator partnerships. Submit proposals, sign digital agreements, and receive escrow payouts.',
  metrics: [
    { label: 'Avg Sponsorship Deal', value: '₹45,000', change: 'Per Integration' },
    { label: 'Verified Brand Partners', value: '250+', change: 'Scaler, CRED, PW, Unacademy' },
    { label: 'Payment Protection', value: '100% Escrow', change: 'Zero Payment Defaults' }
  ],
  overviewTitle: 'Direct Brand Deals Without Greedy Agency Cuts',
  overviewDescription: 'Traditional influencer marketing agencies take 25% to 40% of your sponsorship fees and delay payments for 90 days. CreatorOS connects you directly to verified marketing managers with milestone-based escrow payments.',
  steps: [
    {
      number: '01',
      title: 'Browse Open Brand Briefs',
      description: 'Explore live marketing campaigns from verified brands seeking YouTube integrations, Instagram Reels, and newsletter spots.',
      badge: 'Live Briefs'
    },
    {
      number: '02',
      title: '1-Click Pitch Your Media Kit',
      description: 'Submit your rate card, verified audience demographics, and campaign pitch in under 60 seconds.',
      badge: 'Quick Pitch'
    },
    {
      number: '03',
      title: 'Sign Digital Contract & Escrow Lock',
      description: 'The brand approves your deliverables and deposits the sponsorship fee into secure escrow.',
      badge: 'Escrow Protected'
    },
    {
      number: '04',
      title: 'Publish Content & Collect Instant Payout',
      description: 'Share your published video or post link, pass verification, and get paid directly to your bank account.',
      badge: 'Instant Payout'
    }
  ],
  benefits: [
    {
      icon: Handshake,
      title: 'Verified Brand Partners',
      description: 'Work with reputable brands like Scaler, CRED, PhysicsWallah, Zerodha Varsity, and GeeksforGeeks.',
      tag: 'Top Brands'
    },
    {
      icon: ShieldCheck,
      title: 'Milestone Escrow Protection',
      description: 'Brands fund the campaign upfront into escrow so you never have to chase invoices or deal with late payments.',
      tag: 'Guaranteed Pay'
    },
    {
      icon: FileCheck,
      title: 'Standard Digital Agreements',
      description: 'Automated creator-friendly legal contracts that clearly outline deliverable scope, revisions, and usage rights.',
      tag: 'Legal Protection'
    },
    {
      icon: DollarSign,
      title: '0% Agency Middleman Fee',
      description: 'Keep 100% of your negotiated sponsorship amount without losing a cut to traditional talent managers.',
      tag: 'Zero Middlemen'
    },
    {
      icon: TrendingUp,
      title: 'Custom Multi-Platform Packages',
      description: 'Bundle dedicated YouTube videos, LinkedIn posts, Instagram Reels, and newsletter mentions for higher deal sizes.',
      tag: 'Bundle Deals'
    },
    {
      icon: Building2,
      title: 'Automated GST Invoicing for Brands',
      description: 'Generate compliant B2B tax invoices with SAC 998361 (Advertising Services) for seamless corporate accounting.',
      tag: 'B2B Invoices'
    }
  ],
  previewComponent: (
    <div className="max-w-lg mx-auto rounded-[24px] border border-white/[0.15] bg-[#0A0E1A] p-6 shadow-2xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-[12px] bg-royal-600/20 text-royal-400 flex items-center justify-center font-bold">
            <Building2 className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">Scaler Academy • Full-Stack Cohort Campaign</h4>
            <p className="text-[10px] text-emerald-400 font-mono">Verified Sponsor • Escrow Funded</p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 text-xs font-bold font-mono">
          ₹65,000 Budget
        </span>
      </div>

      <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 space-y-2 text-xs">
        <p className="text-[11px] text-slate-300 leading-relaxed">
          <strong>Deliverable Scope:</strong> 60-90 second dedicated integration in a YouTube DSA/System Design video + 1 LinkedIn post with custom tracking link.
        </p>
        <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px]">
          <span className="bg-white/[0.04] px-2 py-0.5 rounded text-slate-300">Target: CS Students & SDEs</span>
          <span className="bg-white/[0.04] px-2 py-0.5 rounded text-slate-300">Revisions: Max 1</span>
          <span className="bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded font-semibold">Payment: 100% Escrow</span>
        </div>
      </div>
    </div>
  ),
  faqs: [
    {
      question: 'How do brands find my profile?',
      answer: 'Brands search creator profiles in the marketplace filtered by follower count, engagement rate, niche (e.g. Coding, Finance, Design), and audience demographics.'
    },
    {
      question: 'How am I protected against non-payment?',
      answer: 'All campaigns require the sponsor to deposit 100% of the funds into CreatorOS escrow before you begin creating content. Once deliverables are submitted, funds are released to your bank account.'
    },
    {
      question: 'Can I set my own minimum sponsorship rates?',
      answer: 'Yes! You can configure your rate card in your AI Media Kit and only accept brand deals that meet your minimum pricing threshold.'
    },
    {
      question: 'Are contracts automatically generated?',
      answer: 'Yes, both parties digitally sign a standard legal agreement covering usage rights, review timelines, and exclusivity clauses.'
    }
  ]
};

export default function BrandMarketplacePage() {
  return <FeaturePageLayout data={brandMarketplaceData} />;
}
