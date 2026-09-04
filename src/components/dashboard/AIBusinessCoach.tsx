'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Zap, 
  Users, 
  Target, 
  Check, 
  ArrowRight, 
  RefreshCw, 
  Flame, 
  ChevronRight, 
  ShieldCheck, 
  Percent, 
  ShoppingBag, 
  DollarSign, 
  MessageSquare, 
  CheckCircle2,
  Tag,
  BarChart3,
  Award,
  Calendar,
  Layers,
  Sliders,
  Send,
  HelpCircle,
  X,
  ExternalLink,
  Bot,
  Lightbulb,
  ArrowUpRight,
  TrendingDown,
  Info,
  Smartphone,
  Share2,
  Bell
} from 'lucide-react';
import { HoverCard, RippleButton, AnimatedCounter } from '@/components/ui/motion';
import { motion, AnimatePresence } from 'framer-motion';
import { useCreatorStore } from '@/lib/store';
import { formatINR, formatINRDecimal } from '@/lib/gst';

export interface InsightItem {
  id: string;
  category: 'timing' | 'forecast' | 'pricing' | 'retention' | 'product' | 'growth';
  title: string;
  subtitle: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  borderHover: string;
  glowColor: string;
  confidence: number;
  confidenceLabel: string;
  metricHighlight: string;
  impactText: string;
  actionLabel: string;
  actionAppliedText: string;
  badge: string;
  quickStat: string;
  details: {
    summary: string;
    keyPoints: string[];
    actionSteps: string[];
  };
}

const INSIGHTS_DATA: InsightItem[] = [
  {
    id: 'insight_timing',
    category: 'timing',
    title: 'Optimal Posting Window: Tue & Thu (07:30 PM - 09:30 PM IST)',
    subtitle: 'Indian Algorithm Peak Telemetry',
    icon: Clock,
    iconBg: 'bg-pink-500/15',
    iconColor: 'text-pink-400',
    borderHover: 'hover:border-pink-500/40',
    glowColor: 'rgba(236, 72, 153, 0.25)',
    confidence: 98,
    confidenceLabel: 'Algorithmic Golden Hour',
    metricHighlight: '3.8x Reach & Saves',
    badge: 'Peak Engagement',
    quickStat: '98% match for Bharat audience',
    impactText: 'Your Indian software engineering & student audience shows highest Instagram Reel saves and YouTube engagement during post-office evening commute hours (7:30 - 9:30 PM IST).',
    actionLabel: 'Schedule Notification Reminder',
    actionAppliedText: 'Reminder Scheduled for 07:30 PM IST ✓',
    details: {
      summary: 'Telemetry shows peak organic traffic in Bengaluru, Hyderabad, Pune, and Delhi NCR coincides with post-work commuting and late-night coding study sessions.',
      keyPoints: [
        'Instagram Reels: 8:00 PM IST yields 4.1x more organic saves than morning drops',
        'YouTube Community / Shorts: 7:30 PM IST captures evening learning intent',
        'LinkedIn Posts: Tue & Thu 8:30 AM & 6:15 PM IST show 62% higher CTR on tech roadmaps',
        'WhatsApp Broadcasts: 8:45 PM IST achieves 94% open rate within 15 minutes'
      ],
      actionSteps: [
        'Queue next reel release for Tuesday 7:45 PM IST',
        'Pin your 1-click UPI storefront link in top comments',
        'Drop teaser on Telegram & WhatsApp prep groups 15 minutes prior'
      ]
    }
  },
  {
    id: 'insight_forecast',
    category: 'forecast',
    title: '30-Day Revenue Forecast: ₹1,85,000 (+32% MoM Expansion)',
    subtitle: 'Predictive Creator Economy Growth Model',
    icon: Target,
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
    borderHover: 'hover:border-amber-500/40',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    confidence: 92,
    confidenceLabel: 'High Confidence Model',
    metricHighlight: '₹1.85L Projected',
    badge: 'Predictive Horizon',
    quickStat: '+32% MoM Expansion',
    impactText: 'Based on current organic traffic velocity, upcoming boAt & Swiggy brand sponsorships (₹1.5L pipeline), and cohort student enrollments.',
    actionLabel: 'Open Revenue Roadmap Simulator',
    actionAppliedText: 'Financial Roadmap Synced ✓',
    details: {
      summary: 'Multi-stream revenue modeling combining organic digital storefront sales, 1:1 interview booking slots, live course cohorts, and verified brand partnerships.',
      keyPoints: [
        'Digital PDF Products: ₹68,500 projected (System Design & DSA Master Sheets)',
        'Live Cohort Courses: ₹49,980 projected (20 new student enrollments @ ₹2,499)',
        '1:1 Mock Interviews & Consultations: ₹24,520 projected (35 sessions booked)',
        'Brand Collaborations Pipeline: ₹42,000 expected payout from boAt & Swiggy campaigns'
      ],
      actionSteps: [
        'Increase available 1:1 weekend slots by +4 hours to capture excess demand',
        'Send cohort early-bird reminders to 42 high-intent warm leads',
        'Submit verified media kit to 2 newly opened marketplace briefs'
      ]
    }
  },
  {
    id: 'insight_pricing',
    category: 'pricing',
    title: 'Price Optimization: Increase Resume Kit from ₹299 to ₹349',
    subtitle: 'Price Elasticity & Purchase Velocity Analysis',
    icon: DollarSign,
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    borderHover: 'hover:border-emerald-500/40',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    confidence: 94,
    confidenceLabel: 'Inelastic Demand Zone',
    metricHighlight: '+₹18,400/mo Net ARR',
    badge: '1-Click Price Lever',
    quickStat: '<1.2% volume impact',
    impactText: '88% of buyers checkout under 40 seconds via 1-click UPI with zero drop-off. Raising base price by ₹50 has estimated <1.2% volume impact, unlocking +₹18,400/mo.',
    actionLabel: 'Apply ₹349 Price (1-Click)',
    actionAppliedText: 'Price Updated to ₹349 on Storefront ✓',
    details: {
      summary: 'Conversion telemetry indicates extreme price inelasticity under ₹399 for high-utility career assets with instant WhatsApp delivery and GST compliance.',
      keyPoints: [
        'Current Purchase Velocity: 34 orders/day with 78% completed via PhonePe/GPay',
        'Median Buyer Hesitation: 3.2 seconds at checkout (exceptional impulse conversion)',
        'Benchmark Comparison: Peer tech creators in India price similar bundles at ₹399 - ₹499',
        'Projected Impact: +₹18,400 monthly profit with virtually unchanged checkout volume'
      ],
      actionSteps: [
        'Click "Apply ₹349 Price" to instantly update active storefront pricing',
        'Display "₹799 original price (56% OFF)" strike-through anchor',
        'Highlight Overleaf LaTeX 1-click import feature in top bullet'
      ]
    }
  },
  {
    id: 'insight_retention',
    category: 'retention',
    title: 'Returning Customer Prediction: 42 Buyers Primed for Course Upsell',
    subtitle: 'LTV & Repeat Purchase Propensity',
    icon: Users,
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-blue-400',
    borderHover: 'hover:border-blue-500/40',
    glowColor: 'rgba(59, 130, 246, 0.25)',
    confidence: 89,
    confidenceLabel: 'High Upsell Intent',
    metricHighlight: '42 Repeat Buyers',
    badge: 'Warm Lead Cohort',
    quickStat: '21.4% expected course conversion',
    impactText: '42 students who purchased entry-level PDF notes completed all downloads and opened WhatsApp study links within 2 hours. Prime candidates for your ₹2,499 live cohort.',
    actionLabel: 'Send WhatsApp Upsell Campaign',
    actionAppliedText: 'WhatsApp Broadcast Queued (42 Users) ✓',
    details: {
      summary: 'High-intent behavioral triggers detected: users who actively engage with free updates and community links have 4.8x higher lifetime value.',
      keyPoints: [
        '42 verified student buyers completed 100% of PDF modules in last 14 days',
        'Estimated Upsell Conversion: 21.4% (approx. 9 cohort sales = +₹22,491 GMV)',
        'Recommended Incentive: Exclusive 20% loyalty discount code (CODE: FAANG20)',
        'Instant Delivery: Sent directly to their registered WhatsApp with 1-click UPI checkout link'
      ],
      actionSteps: [
        'Broadcast personalized WhatsApp template with loyalty discount voucher',
        'Include syllabus preview & certificate verification sample',
        'Offer priority 1:1 Q&A bonus for first 10 students who enroll'
      ]
    }
  },
  {
    id: 'insight_product',
    category: 'product',
    title: 'Highest Converting Product: System Design Blueprint (14.8% CR)',
    subtitle: 'Conversion Funnel Champion',
    icon: Zap,
    iconBg: 'bg-royal-600/15',
    iconColor: 'text-royal-400',
    borderHover: 'hover:border-royal-500/40',
    glowColor: 'rgba(37, 99, 235, 0.25)',
    confidence: 96,
    confidenceLabel: 'Top Performer',
    metricHighlight: '14.8% Conversion Rate',
    badge: 'Storefront Champion',
    quickStat: '₹3,55,200 Gross Revenue',
    impactText: 'Converts 4.2x higher than standard digital notes. Bundle with 1:1 Mock Interview appointments to increase Average Order Value (AOV) by ₹600.',
    actionLabel: 'Create 1-Click Upsell Bundle',
    actionAppliedText: 'Smart Bundle Created in Storefront ✓',
    details: {
      summary: 'The System Design Playbook is your highest-velocity asset with 890+ sales and a 4.95★ rating. Leveraging it as an anchor drastically lifts checkout basket sizes.',
      keyPoints: [
        'Conversion Rate: 14.8% vs 3.5% industry standard for tech digital guides',
        'Top Traffic Source: 48% organic referrals from Instagram bio and YouTube pinned comments',
        'Bundle Opportunity: Combine System Design (₹499) + 1:1 Mock Interview (₹1,499) at ₹1,699',
        'Expected AOV Lift: +₹600 per customer (+35.3% revenue expansion per transaction)'
      ],
      actionSteps: [
        'Pin System Design Blueprint at the top of your public storefront builder',
        'Enable 1-click bundle upsell checkbox during UPI checkout modal',
        'Add boAt or Swiggy student study-bundle discount banner'
      ]
    }
  },
  {
    id: 'insight_growth',
    category: 'growth',
    title: 'Weekly Creator Growth Score: 94/100 (Top 2% in Tech & Career)',
    subtitle: 'Algorithmic Momentum & Audience Velocity',
    icon: Award,
    iconBg: 'bg-purple-500/15',
    iconColor: 'text-purple-400',
    borderHover: 'hover:border-purple-500/40',
    glowColor: 'rgba(168, 85, 247, 0.25)',
    confidence: 95,
    confidenceLabel: 'Viral Momentum',
    metricHighlight: '94/100 Growth Score',
    badge: 'Elite Tier (Top 2%)',
    quickStat: '+48.2% WoW Acceleration',
    impactText: 'Your audience growth velocity (+48.2% WoW) places your storefront in the top 2% of Indian creator businesses. Perfect timing to launch your next paid cohort.',
    actionLabel: 'Export Growth Badge for Media Kit',
    actionAppliedText: 'Verified Badge Added to AI Media Kit ✓',
    details: {
      summary: 'Composite growth index evaluated across audience velocity, revenue diversification, conversion efficiency, and community retention across Indian platforms.',
      keyPoints: [
        'Audience Velocity Score: 96/100 (1.4M+ monthly reach across IG, YT, LinkedIn)',
        'Monetization Efficiency: 92/100 (₹4.24 revenue per organic visitor)',
        'Brand Collab Affinity: 95/100 (Verified match for boAt, Swiggy, Zomato briefs)',
        'Customer Retention Index: 88/100 (High repeat purchase propensity on Telegram/WhatsApp)'
      ],
      actionSteps: [
        'Download verified "Top 2% Tech Creator Bharat" credential badge',
        'Embed badge on AI Media Kit PDF to negotiate 25% higher sponsorship rates',
        'Announce milestone on LinkedIn to drive inbound brand collab inquiries'
      ]
    }
  }
];

const QUICK_AI_QUESTIONS = [
  {
    q: 'How can I double my cohort course sales this month?',
    a: '1. Offer an exclusive 20% loyalty voucher to the 42 recent PDF buyers via WhatsApp.\n2. Host a 45-minute live YouTube system design teardown with 1-click UPI checkout pinned.\n3. Add a "Guaranteed 1:1 Mock Interview" bonus for the next 15 students.'
  },
  {
    q: 'What is the optimal price point for Tier-2 Indian students?',
    a: 'For digital roadmaps: ₹299 - ₹349 is the sweet spot (<40s UPI impulse purchase with zero friction).\nFor live 8-week cohorts: ₹2,499 - ₹3,499 with 2-part EMI options yields maximum volume.'
  },
  {
    q: 'How should I pitch the ₹1.2L boAt brand sponsorship?',
    a: 'Highlight your 78% male 18-24 student engineering audience in Bangalore & Pune. Propose a "Deep Focus 10-Hour Coding Sprint" reel showcasing boAt Airdopes ANC battery longevity.'
  },
  {
    q: 'Which video topic will drive the highest UPI conversions?',
    a: '"How I Cracked Microsoft SDE-2 from Tier-3 College (Full Roadmap + Resources)" will yield highest saves. Pin your ₹349 DSA sheet link in top comment and YouTube description.'
  }
];

export default function AIBusinessCoachWidget({
  compact = false,
  showTitle = true
}: {
  compact?: boolean;
  showTitle?: boolean;
}) {
  const { products, orders, activeCreator } = useCreatorStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [appliedActions, setAppliedActions] = useState<Record<string, boolean>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeModalInsight, setActiveModalInsight] = useState<InsightItem | null>(null);
  const [activeTab, setActiveTab] = useState<'insights' | 'simulator' | 'assistant'>('insights');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Revenue Simulator States
  const [simTrafficBoost, setSimTrafficBoost] = useState<number>(25); // +25%
  const [simConversionLift, setSimConversionLift] = useState<number>(1.5); // +1.5%
  const [simPriceAdjustment, setSimPriceAdjustment] = useState<number>(50); // +₹50

  // AI Assistant Custom Prompt State
  const [customQuestion, setCustomQuestion] = useState('');
  const [chatLog, setChatLog] = useState<{ q: string; a: string; time: string }[]>([
    {
      q: 'What are the top 3 revenue levers for my storefront right now?',
      a: '1. Increase Resume/DSA Sheet base price to ₹349 (+₹18.4k/mo net ARR).\n2. Dispatch WhatsApp upsell sequence to 42 primed buyers (+₹22.5k).\n3. Apply to boAt & Swiggy brand briefs on CreatorOS Marketplace (+₹1.5L pipeline).',
      time: 'Just now'
    }
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleApplyAction = (insight: InsightItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setAppliedActions((prev) => ({ ...prev, [insight.id]: true }));

    if (insight.category === 'pricing') {
      showToast('🚀 Price updated to ₹349 on live storefront! Projected ARR lift +₹18,400/mo.');
    } else if (insight.category === 'retention') {
      showToast('📲 WhatsApp broadcast campaign queued for 42 high-intent students (CODE: FAANG20)!');
    } else if (insight.category === 'timing') {
      showToast('⏰ Post notification reminder set for Tuesday & Thursday at 07:30 PM IST.');
    } else if (insight.category === 'growth') {
      showToast('🏆 Verified "Top 2% Creator in Bharat" badge attached to your AI Media Kit.');
    } else if (insight.category === 'product') {
      showToast('⚡ Smart 1-Click Upsell Bundle (System Design + Mock Interview) activated in checkout.');
    } else {
      showToast(`✓ ${insight.actionAppliedText}`);
    }
  };

  const handleRefreshDiagnostics = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('✨ Neural Telemetry re-audited across 29,500 visits and ₹1.24L UPI payments.');
    }, 900);
  };

  const handleAskQuestion = (qText: string) => {
    if (!qText.trim()) return;
    const existing = QUICK_AI_QUESTIONS.find(
      (item) => item.q.toLowerCase() === qText.toLowerCase()
    );

    let answer = '';
    if (existing) {
      answer = existing.a;
    } else {
      answer = `Based on your telemetry (${products.length} active products, 14.8% conversion on System Design, and 48% Instagram referral traffic):\n\n• Prioritize high-intent video drops on Tuesday/Thursday at 7:30 PM IST.\n• Test bundling your 1:1 consults with digital PDF sheets for higher Average Order Value (AOV).\n• Use UPI-first 1-click checkout with automated WhatsApp delivery to maintain <40s completion rates.`;
    }

    setChatLog((prev) => [
      ...prev,
      {
        q: qText,
        a: answer,
        time: 'Just now'
      }
    ]);
    setCustomQuestion('');
  };

  const filteredInsights = INSIGHTS_DATA.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  // Calculate dynamic projected numbers for simulator
  const baseMonthlyGMV = 140000;
  const trafficMultiplier = 1 + simTrafficBoost / 100;
  const conversionMultiplier = 1 + simConversionLift / 10;
  const simulatedProjectedGMV = Math.round(
    baseMonthlyGMV * trafficMultiplier * conversionMultiplier + simPriceAdjustment * 120
  );
  const incrementalGain = simulatedProjectedGMV - baseMonthlyGMV;

  return (
    <div className="rounded-[24px] border border-royal-500/30 bg-gradient-to-b from-[#0C1226] via-[#0A0E1A] to-[#0A0E1A] p-5 sm:p-7 shadow-glass-card space-y-6 relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-royal-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 rounded-[18px] bg-[#0E1528] border border-emerald-500/40 p-4 text-white text-xs shadow-2xl flex items-center gap-3 backdrop-blur-xl max-w-md"
          >
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <span className="font-bold text-white block">AI Action Executed</span>
              <p className="text-slate-300 text-[11px] mt-0.5">{toastMessage}</p>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Header Row */}
      {showTitle && (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-gradient-to-br from-royal-500 via-royal-600 to-indigo-700 shadow-royal shrink-0 ring-2 ring-white/15">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-[#0A0E1A]">
                <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
              </span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight">
                  AI Business Coach & Growth Engine
                </h2>
                <span className="rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 font-mono flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Bharat Telemetry Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Data-driven growth levers calibrated for Indian creators: posting golden hours, revenue forecasts, price elasticity, and retention predictors.
              </p>
            </div>
          </div>

          {/* Action Buttons & Module Navigation */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="p-1 rounded-[14px] bg-white/[0.04] border border-white/[0.08] flex items-center gap-1">
              <button
                onClick={() => setActiveTab('insights')}
                className={`px-3 py-1.5 rounded-[10px] text-xs font-semibold transition ${
                  activeTab === 'insights'
                    ? 'bg-royal-600 text-white shadow-royal-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Insight Cards (6)
              </button>
              <button
                onClick={() => setActiveTab('simulator')}
                className={`px-3 py-1.5 rounded-[10px] text-xs font-semibold transition flex items-center gap-1.5 ${
                  activeTab === 'simulator'
                    ? 'bg-royal-600 text-white shadow-royal-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sliders className="h-3.5 w-3.5" />
                <span>Revenue Simulator</span>
              </button>
              <button
                onClick={() => setActiveTab('assistant')}
                className={`px-3 py-1.5 rounded-[10px] text-xs font-semibold transition flex items-center gap-1.5 ${
                  activeTab === 'assistant'
                    ? 'bg-royal-600 text-white shadow-royal-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Ask Coach AI</span>
              </button>
            </div>

            <button
              onClick={handleRefreshDiagnostics}
              disabled={isRefreshing}
              title="Re-run Neural Business Diagnostic"
              className="flex items-center gap-1.5 rounded-[12px] border border-royal-500/30 bg-royal-600/15 hover:bg-royal-600/25 px-3.5 py-2 text-xs font-semibold text-royal-300 hover:text-white transition btn-press shadow-sm"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin text-royal-400' : ''}`} />
              <span>{isRefreshing ? 'Auditing Telemetry...' : 'Recalibrate AI Diagnostics'}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 1: INSIGHT CARDS */}
      {activeTab === 'insights' && (
        <div className="space-y-5">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {[
              { id: 'all', label: 'All 6 Insights' },
              { id: 'timing', label: '⏰ Best Posting Time' },
              { id: 'forecast', label: '📈 Revenue Forecast' },
              { id: 'pricing', label: '💰 Price Optimization' },
              { id: 'retention', label: '👥 Returning Customers' },
              { id: 'product', label: '⚡ Highest Converting Product' },
              { id: 'growth', label: '🏆 Weekly Growth Score' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-[12px] text-xs font-semibold whitespace-nowrap transition btn-press ${
                  selectedCategory === tab.id
                    ? 'bg-royal-600 text-white shadow-royal-sm ring-1 ring-royal-500/40'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 6 Intelligent Insight Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
            {filteredInsights.map((insight) => {
              const Icon = insight.icon;
              const isApplied = appliedActions[insight.id];

              return (
                <div
                  key={insight.id}
                  onClick={() => setActiveModalInsight(insight)}
                  className={`group relative rounded-[22px] border border-white/[0.08] bg-[#0A0D17]/90 p-5 flex flex-col justify-between space-y-4 shadow-glass-subtle transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl cursor-pointer ${insight.borderHover}`}
                  style={{
                    boxShadow: `0 4px 20px -2px rgba(0,0,0,0.5)`
                  }}
                >
                  <div className="space-y-3.5">
                    
                    {/* Header: Icon, Category Badge & Confidence Pill */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2.5 rounded-[14px] ${insight.iconBg} ${insight.iconColor} border border-white/[0.08] shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
                            {insight.subtitle}
                          </span>
                          <span className="text-[11px] text-slate-300 font-semibold flex items-center gap-1">
                            <span>{insight.badge}</span>
                          </span>
                        </div>
                      </div>

                      {/* Confidence Pill with glowing status */}
                      <div className="text-right shrink-0">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-royal-600/20 text-royal-300 border border-royal-500/30 px-2.5 py-1 text-[10px] font-bold font-mono">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{insight.confidence}% Match</span>
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-sm font-bold text-white leading-snug group-hover:text-royal-300 transition-colors">
                      {insight.title}
                    </h3>

                    {/* Explanation text */}
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {insight.impactText}
                    </p>

                    {/* Confidence Progress Meter */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[10px] font-mono text-slate-400">
                        <span className="flex items-center gap-1 text-slate-400">
                          <ShieldCheck className="h-3 w-3 text-royal-400" />
                          <span>Model Confidence</span>
                        </span>
                        <span className="text-royal-300 font-bold">{insight.confidenceLabel} ({insight.confidence}%)</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden p-[1px]">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-royal-600 via-blue-500 to-emerald-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${insight.confidence}%` }}
                          transition={{ duration: 0.9, ease: 'easeOut' }}
                        />
                      </div>
                    </div>

                    {/* Quick Metric Pill */}
                    <div className="rounded-[12px] bg-white/[0.03] border border-white/[0.05] px-3 py-2 flex items-center justify-between text-xs">
                      <span className="text-slate-400 text-[11px]">Primary Impact</span>
                      <span className="font-mono font-bold text-emerald-400">
                        {insight.metricHighlight}
                      </span>
                    </div>

                  </div>

                  {/* Action Button & Deep Dive link */}
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalInsight(insight);
                      }}
                      className="text-[11px] font-semibold text-slate-400 hover:text-white flex items-center gap-1 transition"
                    >
                      <span>Deep Dive</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={(e) => handleApplyAction(insight, e)}
                      disabled={isApplied}
                      className={`rounded-[12px] px-3.5 py-1.5 text-xs font-semibold transition btn-press flex items-center gap-1.5 shrink-0 ${
                        isApplied
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-royal-600 hover:bg-royal-500 text-white shadow-royal-sm'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Applied ✓</span>
                        </>
                      ) : (
                        <>
                          <span>{insight.actionLabel}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </>
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Cumulative ARR Growth Banner */}
          <div className="rounded-[20px] bg-gradient-to-r from-royal-950/60 via-[#0E1528] to-emerald-950/40 border border-royal-500/30 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs shadow-glass-subtle">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-white text-sm block">
                  Cumulative Revenue Acceleration Levers
                </span>
                <p className="text-slate-300 text-xs mt-0.5">
                  Implementing all 6 growth recommendations projects an incremental net gain of <strong className="text-emerald-400 font-mono font-bold">+₹54,500/month</strong> across UPI orders, brand collabs, and course upsells.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-start sm:self-center">
              <span className="text-[11px] font-mono text-royal-300 bg-royal-600/20 px-3 py-1.5 rounded-full border border-royal-500/30">
                T+0 Settlement Ready
              </span>
              <button
                onClick={() => {
                  INSIGHTS_DATA.forEach((ins) => handleApplyAction(ins));
                  showToast('🌟 All 6 AI Growth Levers activated across your store and channels!');
                }}
                className="rounded-[12px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 text-xs transition btn-press shadow-sm"
              >
                Apply All 6 Levers
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INTERACTIVE REVENUE SIMULATOR */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          <div className="rounded-[20px] bg-[#0A0D17]/90 border border-white/[0.08] p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
              <div>
                <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="h-4 w-4 text-royal-400" />
                  <span>Interactive Monetization & Growth Sandbox</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Simulate how adjusting traffic acquisition, UPI conversion rates, and price optimizations scale your 30-day Indian creator revenue.
                </p>
              </div>
              <div className="rounded-full bg-royal-600/15 border border-royal-500/30 px-3 py-1 text-xs font-mono font-bold text-royal-300">
                Predictive Monte Carlo Engine
              </div>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Slider 1: Traffic Boost */}
              <div className="rounded-[18px] bg-white/[0.03] border border-white/[0.05] p-5 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5 text-blue-400" />
                    <span>Monthly Traffic Growth</span>
                  </span>
                  <span className="font-mono font-bold text-blue-400 text-sm">+{simTrafficBoost}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={simTrafficBoost}
                  onChange={(e) => setSimTrafficBoost(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>Current (29.5k)</span>
                  <span>+100% (59k visits)</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Driven by 2x weekly reels and pinned YouTube descriptions.
                </p>
              </div>

              {/* Slider 2: Conversion Lift */}
              <div className="rounded-[18px] bg-white/[0.03] border border-white/[0.05] p-5 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5 text-amber-400" />
                    <span>UPI Conversion Lift</span>
                  </span>
                  <span className="font-mono font-bold text-amber-400 text-sm">+{simConversionLift.toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={simConversionLift}
                  onChange={(e) => setSimConversionLift(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>Base (28.5%)</span>
                  <span>Max Lift (+5.0%)</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Driven by 1-click PhonePe/GPay QR triggers and social proof counters.
                </p>
              </div>

              {/* Slider 3: Price Elasticity */}
              <div className="rounded-[18px] bg-white/[0.03] border border-white/[0.05] p-5 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Average Price Bump</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-400 text-sm">+₹{simPriceAdjustment}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200"
                  step="25"
                  value={simPriceAdjustment}
                  onChange={(e) => setSimPriceAdjustment(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>₹0 (Status Quo)</span>
                  <span>+₹200 (Premium Tier)</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Adjusting DSA & Resume templates without volume loss.
                </p>
              </div>

            </div>

            {/* Projected Simulation Results */}
            <div className="rounded-[20px] bg-gradient-to-br from-[#0C1428] via-[#091022] to-[#0D1832] border border-royal-500/40 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-royal-300">
                  Simulated 30-Day Gross Revenue
                </span>
                <div className="font-display text-3xl sm:text-4xl font-extrabold text-white flex items-center justify-center md:justify-start gap-2">
                  <span>₹<AnimatedCounter value={simulatedProjectedGMV} /></span>
                  <span className="text-emerald-400 text-sm font-mono font-bold bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                    +₹{incrementalGain.toLocaleString('en-IN')}/mo net gain
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Calculated based on T+0 IMPS direct Indian bank settlements with 0% intermediary platform take.
                </p>
              </div>

              <RippleButton
                onClick={() => {
                  showToast('📊 Financial simulation model saved & exported to analytics reports!');
                }}
                className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-5 py-3 text-xs font-bold text-white shadow-royal shrink-0"
              >
                <span>Save Growth Simulation</span>
                <ArrowRight className="h-4 w-4" />
              </RippleButton>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: ASK COACH AI ASSISTANT */}
      {activeTab === 'assistant' && (
        <div className="space-y-5">
          <div className="rounded-[20px] bg-[#0A0D17]/90 border border-white/[0.08] p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 shrink-0">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white">
                    Conversational Creator Advisor
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Ask tailored business strategy, pricing, sponsorship, or marketing questions.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Prompt Pills */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-slate-400">Recommended Quick Questions:</span>
              <div className="flex flex-wrap gap-2">
                {QUICK_AI_QUESTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAskQuestion(item.q)}
                    className="text-left text-xs bg-white/[0.04] hover:bg-royal-600/20 hover:border-royal-500/40 border border-white/[0.08] rounded-[12px] px-3.5 py-2 text-slate-300 hover:text-white transition btn-press flex items-center gap-2"
                  >
                    <Sparkles className="h-3 w-3 text-amber-400 shrink-0" />
                    <span>{item.q}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Log */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {chatLog.map((chat, idx) => (
                <div key={idx} className="space-y-2">
                  {/* User question */}
                  <div className="flex justify-end">
                    <div className="rounded-[16px] bg-royal-600 px-4 py-2.5 text-xs text-white max-w-lg shadow-sm">
                      {chat.q}
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex justify-start items-start gap-2.5">
                    <div className="p-1.5 rounded-lg bg-royal-500/20 text-royal-400 shrink-0 mt-1">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="rounded-[16px] bg-[#0E1528] border border-white/[0.08] p-3.5 text-xs text-slate-200 max-w-xl space-y-1.5 shadow-glass-subtle">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pb-1 border-b border-white/[0.04]">
                        <span className="text-royal-300 font-bold">AI Business Coach (Bharat Model)</span>
                        <span>{chat.time}</span>
                      </div>
                      <p className="whitespace-pre-line leading-relaxed text-slate-300">
                        {chat.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Box */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
              <input
                type="text"
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAskQuestion(customQuestion);
                }}
                placeholder="Ask anything (e.g. 'How should I structure my ₹2,499 cohort curriculum?')..."
                className="flex-1 rounded-[14px] bg-black/40 border border-white/[0.1] px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-royal-500 transition"
              />
              <button
                type="button"
                onClick={() => handleAskQuestion(customQuestion)}
                className="rounded-[14px] bg-royal-600 hover:bg-royal-500 text-white px-4 py-2.5 text-xs font-bold transition btn-press flex items-center gap-1.5 shadow-royal"
              >
                <span>Ask Coach</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* DEEP DIVE MODAL DRAWER FOR DETAILED INSIGHT AUDIT */}
      <AnimatePresence>
        {activeModalInsight && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[24px] border border-royal-500/30 bg-[#0C1226] p-6 sm:p-7 shadow-2xl space-y-6 text-white"
            >
              {/* Close button */}
              <button
                onClick={() => setActiveModalInsight(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] text-slate-400 hover:text-white transition"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header */}
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-[16px] ${activeModalInsight.iconBg} ${activeModalInsight.iconColor} border border-white/[0.1] shrink-0`}>
                  <activeModalInsight.icon className="h-6 w-6" />
                </div>
                <div className="space-y-1 pr-6">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                      {activeModalInsight.subtitle}
                    </span>
                    <span className="rounded-full bg-royal-600/20 text-royal-300 border border-royal-500/30 px-2 py-0.5 text-[9px] font-bold font-mono">
                      {activeModalInsight.confidence}% Confidence
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {activeModalInsight.title}
                  </h3>
                </div>
              </div>

              {/* Deep Dive Content */}
              <div className="space-y-4 text-xs">
                
                {/* Summary */}
                <div className="p-4 rounded-[16px] bg-white/[0.03] border border-white/[0.06] space-y-2">
                  <span className="font-bold text-royal-300 font-mono uppercase text-[10px] block">
                    Diagnostic Summary
                  </span>
                  <p className="text-slate-200 leading-relaxed">
                    {activeModalInsight.details.summary}
                  </p>
                </div>

                {/* Key Findings List */}
                <div className="space-y-2">
                  <span className="font-bold text-white text-xs block">
                    Telemetry Observations & Evidence
                  </span>
                  <div className="space-y-2">
                    {activeModalInsight.details.keyPoints.map((pt, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 rounded-[12px] bg-white/[0.02] border border-white/[0.04]">
                        <CheckCircle2 className="h-4 w-4 text-royal-400 shrink-0 mt-0.5" />
                        <span className="text-slate-300 leading-relaxed">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action steps */}
                <div className="space-y-2">
                  <span className="font-bold text-emerald-400 text-xs block">
                    Recommended Implementation Sequence
                  </span>
                  <div className="space-y-2">
                    {activeModalInsight.details.actionSteps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 rounded-[12px] bg-emerald-950/20 border border-emerald-500/20">
                        <span className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-emerald-200 leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
                <button
                  onClick={() => setActiveModalInsight(null)}
                  className="rounded-[12px] bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2 text-xs font-semibold text-slate-300"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleApplyAction(activeModalInsight);
                    setActiveModalInsight(null);
                  }}
                  className="rounded-[12px] bg-royal-600 hover:bg-royal-500 px-5 py-2 text-xs font-bold text-white shadow-royal flex items-center gap-1.5"
                >
                  <span>{activeModalInsight.actionLabel}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
