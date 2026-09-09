'use client';

import React from 'react';
import FeaturePageLayout, { FeaturePageData } from '@/components/features/FeaturePageLayout';
import { 
  Sparkles, 
  TrendingUp, 
  Share2, 
  Download, 
  ShieldCheck, 
  PieChart, 
  Users, 
  CheckCircle2,
  DollarSign
} from 'lucide-react';

const aiMediaKitData: FeaturePageData = {
  badge: 'AI Media Kit Generator',
  title: 'Real-Time Dynamic Media Kit &',
  highlightedTitle: 'Sponsorship Rate Cards',
  description: 'Never manually edit a PDF media kit in Canva again. CreatorOS pulls verified engagement rates, Tier 1/2/3 Indian audience distribution, and automatically generates live shareable sponsor decks.',
  metrics: [
    { label: 'Sponsorship Close Rate', value: '+3.8x', change: 'Live Verified Stats' },
    { label: 'Generation Time', value: 'Instant', change: 'Auto-Calculated Metrics' },
    { label: 'Export Options', value: 'PDF + Web Link', change: 'Live Updating URL' }
  ],
  overviewTitle: 'Look Like a Top-Tier Creator in Front of Brand Sponsors',
  overviewDescription: 'Marketing heads and brand managers receive hundreds of static Canva PDFs with outdated numbers. CreatorOS gives you a live, verified media kit URL with real-time engagement data, audience demographics, past brand case studies, and transparent rate cards.',
  steps: [
    {
      number: '01',
      title: 'Connect Social Channels',
      description: 'Link your YouTube, Instagram, LinkedIn, and Twitter accounts with 1-click authentication.',
      badge: '1-Click Connect'
    },
    {
      number: '02',
      title: 'Auto-Fetch Engagement & Reach',
      description: 'System automatically calculates average views, real engagement rate, and audience city distribution.',
      badge: 'Auto Analytics'
    },
    {
      number: '03',
      title: 'Configure Your Rate Card',
      description: 'Set your pricing for dedicated videos, 60s integrations, Instagram Reels, and community blasts in INR.',
      badge: 'Custom Rates'
    },
    {
      number: '04',
      title: 'Share Live Link or Download PDF',
      description: 'Send your personalized live link (e.g. creatoros.in/aarav/media-kit) or download a high-res PDF.',
      badge: 'Live & PDF'
    }
  ],
  benefits: [
    {
      icon: TrendingUp,
      title: 'Verified Engagement Rates',
      description: 'Build immediate credibility with brands by displaying independently verified engagement percentages.',
      tag: 'Verified Stats'
    },
    {
      icon: Users,
      title: 'Indian Audience Demographics',
      description: 'Showcase your audience breakdown across Bengaluru, Mumbai, Delhi-NCR, Hyderabad, and Tier 2/3 cities.',
      tag: 'Pan-India Reach'
    },
    {
      icon: DollarSign,
      title: 'Dynamic Rate Card Matrix',
      description: 'Clearly display pricing for YouTube dedicated videos, integrated sponsorships, Reels, and newsletter mentions.',
      tag: 'Clear Pricing'
    },
    {
      icon: Share2,
      title: 'Live Sharable Link (Always Fresh)',
      description: 'Your media kit updates automatically whenever your follower count or engagement metrics grow.',
      tag: 'Always Updated'
    },
    {
      icon: Download,
      title: '1-Click High-Res PDF Export',
      description: 'Need to attach a PDF to an email pitch? Export a clean, luxury dark-themed PDF in one click.',
      tag: 'PDF Export'
    },
    {
      icon: Sparkles,
      title: 'Past Brand Case Studies',
      description: 'Highlight past successful campaigns, click-through rates, and testimonials from previous brand partners.',
      tag: 'Case Studies'
    }
  ],
  previewComponent: (
    <div className="max-w-lg mx-auto rounded-[24px] border border-white/[0.15] bg-[#0A0E1A] p-6 shadow-2xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" 
            alt="Creator" 
            className="h-12 w-12 rounded-full object-cover ring-2 ring-royal-500"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-bold text-sm text-white">Aarav Sharma</h4>
              <ShieldCheck className="h-4 w-4 text-royal-400" />
            </div>
            <p className="text-[11px] text-royal-400 font-mono">Software Engineering & Tech Educator</p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1 text-xs font-bold font-mono">
          377K+ Total Reach
        </span>
      </div>

      {/* Social metrics breakdown */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-2.5">
          <p className="text-[10px] text-slate-400 uppercase font-mono">YouTube</p>
          <p className="font-bold text-white mt-0.5">185K Subs</p>
          <p className="text-[9px] text-emerald-400 font-mono">6.4% Eng Rate</p>
        </div>
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-2.5">
          <p className="text-[10px] text-slate-400 uppercase font-mono">Instagram</p>
          <p className="font-bold text-white mt-0.5">124K Followers</p>
          <p className="text-[9px] text-emerald-400 font-mono">8.2% Eng Rate</p>
        </div>
        <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-2.5">
          <p className="text-[10px] text-slate-400 uppercase font-mono">LinkedIn</p>
          <p className="font-bold text-white mt-0.5">68K Followers</p>
          <p className="text-[9px] text-emerald-400 font-mono">11.4% Eng Rate</p>
        </div>
      </div>

      {/* Rate Card snippet */}
      <div className="rounded-xl bg-royal-600/10 border border-royal-500/25 p-3 flex items-center justify-between text-xs">
        <span className="font-semibold text-slate-200">YouTube 60s Integration Rate</span>
        <span className="font-bold text-royal-300 font-mono text-sm">₹45,000</span>
      </div>
    </div>
  ),
  faqs: [
    {
      question: 'How does CreatorOS verify my social metrics?',
      answer: 'CreatorOS connects directly to official YouTube, Instagram, and LinkedIn APIs to fetch authentic subscriber counts, video impressions, and audience demographics.'
    },
    {
      question: 'Can I share my media kit with brands as a public link?',
      answer: 'Yes! You get a clean public link (e.g. creatoros.in/yourname/media-kit) that always shows your latest metrics.'
    },
    {
      question: 'Can I download the media kit as a PDF for email pitches?',
      answer: 'Yes, with one click you can export a print-ready, high-resolution PDF document.'
    },
    {
      question: 'Can I customize the sponsorship rate card?',
      answer: 'Yes, you can define custom rates for dedicated videos, podcast mentions, newsletter spots, and package bundles.'
    }
  ]
};

export default function AIMediaKitPage() {
  return <FeaturePageLayout data={aiMediaKitData} />;
}
