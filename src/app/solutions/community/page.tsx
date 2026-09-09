'use client';

import React from 'react';
import FeaturePageLayout, { FeaturePageData } from '@/components/features/FeaturePageLayout';
import { 
  Users, 
  MessageSquare, 
  Crown, 
  Lock, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  CheckCircle2,
  TrendingUp,
  CreditCard
} from 'lucide-react';

const communityData: FeaturePageData = {
  badge: 'Paid Community Subscriptions',
  title: 'Build Recurring Monthly Revenue with',
  highlightedTitle: 'Exclusive VIP Communities',
  description: 'The Skool, Patreon, and Circle alternative for Bharat. Host private discussion feeds, share exclusive project repos, run weekly AMAs, and collect recurring membership dues via native Indian payment methods.',
  metrics: [
    { label: 'Monthly Recurring Revenue (MRR)', value: '₹3.4L+', change: 'Predictable Cashflow' },
    { label: 'Member Retention Rate', value: '92.4%', change: 'Active Discussion Feeds' },
    { label: 'Auto Access Control', value: 'Instant', change: 'Zero Manual Invitations' }
  ],
  overviewTitle: 'Turn Casual Followers into Lifelong Recurring Subscribers',
  overviewDescription: 'One-off digital product sales can be volatile. Paid communities give you stable Monthly Recurring Revenue (MRR). CreatorOS manages tier permissions, member onboarding, discussion threads, and payment status automatically.',
  steps: [
    {
      number: '01',
      title: 'Create Your Community Space',
      description: 'Set up discussion channels (e.g. #general, #code-reviews, #job-referrals, #weekly-ama).',
      badge: 'Channels'
    },
    {
      number: '02',
      title: 'Set Membership Tiers & Pricing',
      description: 'Define monthly or annual subscription tiers (e.g. Starter @ ₹499/mo, VIP Inner Circle @ ₹1,499/mo).',
      badge: 'Monthly / Annual'
    },
    {
      number: '03',
      title: 'Member Subscribes via 1-Click Payment',
      description: 'Members unlock community access instantly upon successful transaction confirmation.',
      badge: 'Instant Access'
    },
    {
      number: '04',
      title: 'Post Updates, Polls & Live Calls',
      description: 'Share exclusive posts, host private livestreams, and answer member questions in a private sanctuary.',
      badge: 'High Engagement'
    }
  ],
  benefits: [
    {
      icon: Crown,
      title: 'Tier-Based Exclusive Channels',
      description: 'Lock high-value channels and downloadable resources to specific VIP membership tiers.',
      tag: 'Tier Access'
    },
    {
      icon: MessageSquare,
      title: 'Rich Discussion Feeds & Polls',
      description: 'Support markdown formatting, code syntax highlighting, image attachments, and interactive polls.',
      tag: 'Rich Posts'
    },
    {
      icon: Lock,
      title: 'Automated Member Gating',
      description: 'Instant access grant upon subscription payment, and automated revoking if membership expires.',
      tag: 'Zero Churn Work'
    },
    {
      icon: Zap,
      title: 'Indian Pricing & Recurring Billing',
      description: 'Collect predictable recurring membership income tailored to Indian purchasing power.',
      tag: 'INR Subscriptions'
    },
    {
      icon: Users,
      title: 'Member Directory & Networking',
      description: 'Allow like-minded engineers, designers, and traders in your community to connect and network.',
      tag: 'Community Power'
    },
    {
      icon: TrendingUp,
      title: '0% Platform Revenue Cut',
      description: 'Patreon takes up to 12% plus conversion fees. CreatorOS lets you keep 100% of your community dues.',
      tag: '100% Retained'
    }
  ],
  previewComponent: (
    <div className="max-w-lg mx-auto rounded-[24px] border border-white/[0.15] bg-[#0A0E1A] p-6 shadow-2xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-[14px] bg-royal-600/20 text-royal-400 flex items-center justify-center font-bold">
            <Crown className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">FAANG Crackers VIP Inner Circle</h4>
            <p className="text-[10px] text-slate-400">1,240 Active Members • Private Community</p>
          </div>
        </div>
        <span className="rounded-full bg-royal-600/20 text-royal-300 border border-royal-500/30 px-3 py-1 text-xs font-bold font-mono">
          ₹799 / mo
        </span>
      </div>

      {/* Community Feed Post Preview */}
      <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 space-y-2 text-xs">
        <div className="flex items-center gap-2">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" 
            alt="Creator" 
            className="h-7 w-7 rounded-full object-cover ring-1 ring-royal-500"
          />
          <div>
            <span className="font-bold text-white text-[11px]">Aarav Sharma</span>
            <span className="text-[10px] text-royal-400 font-mono ml-1.5">Host • 2h ago</span>
          </div>
        </div>
        <p className="text-slate-300 text-[11px] leading-relaxed">
          🔥 Just dropped the exclusive <strong>Google L5 Distributed Systems Case Study</strong> in the VIP channel! Live AMA session this Saturday at 7 PM IST.
        </p>
        <div className="flex items-center gap-3 pt-2 text-[10px] text-slate-400 font-mono border-t border-white/[0.04]">
          <span>💬 48 Comments</span>
          <span>❤️ 182 Reactions</span>
        </div>
      </div>
    </div>
  ),
  faqs: [
    {
      question: 'How is this different from a WhatsApp or Telegram group?',
      answer: 'WhatsApp and Telegram groups suffer from spam, noisy messages, lost files, and lack automated access control. CreatorOS gives you structured topic channels, searchable resources, member profiles, and automated subscription gating.'
    },
    {
      question: 'Can I set up free and paid channels in the same community?',
      answer: 'Yes! You can have a public general channel for all followers, and lock specialized resource channels to paid VIP members.'
    },
    {
      question: 'What happens when a member cancels their subscription?',
      answer: 'Access to private channels is automatically revoked at the end of their billing cycle without any manual effort on your part.'
    },
    {
      question: 'Can I host weekly live calls inside the community?',
      answer: 'Yes, you can schedule live video sessions with embedded meeting links that automatically sync with member calendars.'
    }
  ]
};

export default function CommunityPage() {
  return <FeaturePageLayout data={communityData} />;
}
