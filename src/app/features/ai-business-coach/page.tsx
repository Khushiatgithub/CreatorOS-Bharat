'use client';

import React from 'react';
import FeaturePageLayout, { FeaturePageData } from '@/components/features/FeaturePageLayout';
import { 
  Bot, 
  Sparkles, 
  TrendingUp, 
  DollarSign, 
  Lightbulb, 
  Target, 
  MessageSquare, 
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

const aiCoachData: FeaturePageData = {
  badge: 'AI Business Coach',
  title: 'Your 24/7 Strategic Co-founder &',
  highlightedTitle: 'Monetization Advisor',
  description: 'Trained on 10,000+ top-earning Indian creator playbooks. Generate high-converting product outlines, optimize pricing for Tier 1/2/3 cities, and write viral launch hooks.',
  metrics: [
    { label: 'Product Ideation Time', value: '< 2 Mins', change: 'Curriculum & Outline' },
    { label: 'Revenue Optimization', value: '+42%', change: 'Dynamic Pricing Guidance' },
    { label: 'Indian Playbooks Trained', value: '10,000+', change: 'Tech, Finance, Exams' }
  ],
  overviewTitle: 'Strategic Guidance Tailored for the Indian Market',
  overviewDescription: 'Pricing a cohort at ₹4,999 vs ₹9,999? Wondering whether to launch a digital notes pack or a 1:1 mentorship service? The CreatorOS AI Business Coach analyzes your audience niche and crafts personalized monetization roadmaps.',
  steps: [
    {
      number: '01',
      title: 'Select Your Creator Niche',
      description: 'Choose your domain (Software, UPSC/GATE Prep, Design, Finance, or Fitness).',
      badge: 'Tailored Niche'
    },
    {
      number: '02',
      title: 'Ask Strategic Monetization Questions',
      description: 'Ask for product outlines, Indian pricing sweet spots, or WhatsApp broadcast copy.',
      badge: 'Natural Prompts'
    },
    {
      number: '03',
      title: 'Receive Actionable Indian Playbooks',
      description: 'Get step-by-step launch scripts, webinar sales funnels, and discount structures.',
      badge: 'Actionable Steps'
    },
    {
      number: '04',
      title: '1-Click Apply to Your Storefront',
      description: 'Export generated products and outlines directly to your live CreatorOS store with a click.',
      badge: 'Instant Publish'
    }
  ],
  benefits: [
    {
      icon: DollarSign,
      title: 'Indian Purchasing Power Parity (PPP)',
      description: 'Get precise INR pricing recommendations for student vs working professional audiences.',
      tag: 'Smart Pricing'
    },
    {
      icon: Lightbulb,
      title: 'Complete Course & PDF Outlines',
      description: 'Generate comprehensive 8-module video curriculums or 50-page digital note structures in 60 seconds.',
      tag: 'Fast Outlines'
    },
    {
      icon: TrendingUp,
      title: 'High-Converting Viral Hooks',
      description: 'Craft high-retention Instagram Reel captions, YouTube community posts, and LinkedIn carousels.',
      tag: 'Viral Copy'
    },
    {
      icon: Target,
      title: 'Tier 1/2/3 Audience Targeting',
      description: 'Understand how to position and market products to students in Kota, Pune, Delhi, and Bengaluru.',
      tag: 'Bharat Reach'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp Broadcast Copywriting',
      description: 'Generate high-urgency WhatsApp announcement broadcasts with 35%+ conversion rates.',
      tag: 'WhatsApp Copy'
    },
    {
      icon: Bot,
      title: 'Personalized Store Performance Audits',
      description: 'The AI analyzes your live conversion funnel, cart dropoffs, and suggests revenue improvements.',
      tag: 'Live Audits'
    }
  ],
  previewComponent: (
    <div className="max-w-lg mx-auto rounded-[24px] border border-white/[0.15] bg-[#0A0D17] p-6 shadow-2xl space-y-4">
      <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
        <div className="h-10 w-10 rounded-[14px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-bold text-xs text-white">CreatorOS AI Business Coach</h4>
          <p className="text-[10px] text-emerald-400 font-mono">Specialized in Indian Tech & Education Creators</p>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        {/* User prompt */}
        <div className="flex justify-end">
          <div className="max-w-xs rounded-2xl bg-royal-600 px-4 py-2.5 text-white font-medium shadow-sm">
            What is the ideal pricing for my System Design Master Notes in India?
          </div>
        </div>

        {/* AI Response */}
        <div className="flex justify-start">
          <div className="max-w-sm rounded-2xl bg-white/[0.04] border border-white/[0.08] p-4 text-slate-300 space-y-2 leading-relaxed">
            <p className="font-semibold text-white flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Recommended 3-Tier Strategy for India:</span>
            </p>
            <ul className="space-y-1.5 text-[11px] list-disc list-inside text-slate-300">
              <li><strong className="text-white">₹399 (Starter Notes)</strong>: 1-click UPI impulse buy for college students.</li>
              <li><strong className="text-white">₹999 (Complete Master Sheet + 20 Case Studies)</strong>: Sweet spot for 1-3 YOE SDEs.</li>
              <li><strong className="text-white">₹2,499 (Bundle + 30-Min 1:1 Mock Interview)</strong>: Highest margin bundle.</li>
            </ul>
            <p className="text-[10px] text-emerald-400 font-mono pt-1">
              ✓ Expected Conversion Rate: 12.4% on UPI Mobile
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  faqs: [
    {
      question: 'Is the AI Business Coach included in my subscription?',
      answer: 'Yes! The AI Business Coach is available on all CreatorOS plans with unlimited strategic queries.'
    },
    {
      question: 'Can the AI help me design products from scratch?',
      answer: 'Yes! You can ask the AI to generate a complete curriculum outline, lesson structure, title, pricing, and marketing copy in seconds.'
    },
    {
      question: 'Is the advice specific to the Indian market?',
      answer: 'Absolutely. The AI is fine-tuned specifically on Indian creator economics, UPI pricing elasticity, SAC tax codes, and regional audience behavior.'
    },
    {
      question: 'Can I export the AI-generated products straight to my store?',
      answer: 'Yes, with one click you can save the generated product title, description, and price directly into your Storefront Builder.'
    }
  ]
};

export default function AIBusinessCoachPage() {
  return <FeaturePageLayout data={aiCoachData} />;
}
