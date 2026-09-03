'use client';

import React, { useState } from 'react';
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
  BarChart3
} from 'lucide-react';
import { HoverCard, RippleButton, AnimatedCounter } from '@/components/ui/motion';
import { motion, AnimatePresence } from 'framer-motion';

interface InsightItem {
  id: string;
  category: 'pricing' | 'timing' | 'product' | 'retention' | 'forecast';
  title: string;
  subtitle: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  borderHover: string;
  confidence: number;
  confidenceLabel: string;
  metricHighlight: string;
  impactText: string;
  actionLabel: string;
  actionAppliedText: string;
}

const INSIGHTS_DATA: InsightItem[] = [
  {
    id: 'insight_pricing',
    category: 'pricing',
    title: 'Increase Resume & Interview Kit price from ₹299 to ₹349',
    subtitle: 'Price Elasticity & Purchase Velocity Analysis',
    icon: DollarSign,
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    borderHover: 'hover:border-emerald-500/40',
    confidence: 94,
    confidenceLabel: 'High Inelastic Demand',
    metricHighlight: '+₹18,400/mo',
    impactText: '88% of buyers checkout under 40 seconds via 1-click UPI with 0 drop-offs. Raising base price by ₹50 has estimated <1.5% volume impact.',
    actionLabel: 'Apply ₹349 Price (1-Click)',
    actionAppliedText: 'Price Updated to ₹349 ✓'
  },
  {
    id: 'insight_timing',
    category: 'timing',
    title: 'Optimal Publishing Window: Tue & Thu (07:30 PM - 09:30 PM IST)',
    subtitle: 'Indian Algorithm Golden Hour Telemetry',
    icon: Clock,
    iconBg: 'bg-pink-500/15',
    iconColor: 'text-pink-400',
    borderHover: 'hover:border-pink-500/40',
    confidence: 98,
    confidenceLabel: 'Algorithm Golden Hour',
    metricHighlight: '3.8x Reach',
    impactText: 'Your Indian software engineering audience exhibits peak Instagram Reel saves and YouTube engagement during post-office evening commute hours.',
    actionLabel: 'Schedule Notification Reminder',
    actionAppliedText: 'Reminder Scheduled for 07:30 PM IST ✓'
  },
  {
    id: 'insight_product',
    category: 'product',
    title: 'Top Converting Asset: System Design Blueprint (14.8% CR)',
    subtitle: 'Conversion Funnel & Bundle Opportunity',
    icon: Zap,
    iconBg: 'bg-royal-600/15',
    iconColor: 'text-royal-400',
    borderHover: 'hover:border-royal-500/40',
    confidence: 96,
    confidenceLabel: 'Top Performer',
    metricHighlight: '14.8% CR',
    impactText: 'Converts 4.2x higher than standard digital notes. Bundle with 1:1 Mock Interview appointments to increase Average Order Value (AOV) by ₹600.',
    actionLabel: 'Create 1-Click Upsell Bundle',
    actionAppliedText: 'Bundle Created in Storefront ✓'
  },
  {
    id: 'insight_retention',
    category: 'retention',
    title: 'Repeat Retention: 42 Customers Primed for Course Upsell',
    subtitle: 'LTV & Repeat Purchase Propensity',
    icon: Users,
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-blue-400',
    borderHover: 'hover:border-blue-500/40',
    confidence: 89,
    confidenceLabel: 'High Upsell Intent',
    metricHighlight: '42 Buyers',
    impactText: '42 students who purchased your entry-level PDF notes opened all WhatsApp study links within 2 hours. Send an exclusive 20% course discount.',
    actionLabel: 'Send WhatsApp Upsell Campaign',
    actionAppliedText: 'WhatsApp Broadcast Queued (42 Users) ✓'
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
    confidence: 92,
    confidenceLabel: 'High Confidence Model',
    metricHighlight: '₹1.85L Forecast',
    impactText: 'Based on current organic traffic, upcoming boAt & Swiggy brand sponsorships (₹1.5L pipeline), and cohort enrollments.',
    actionLabel: 'View Detailed Financial Forecast',
    actionAppliedText: 'Financial Model Opened ✓'
  }
];

export default function AIBusinessCoachWidget() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [appliedActions, setAppliedActions] = useState<Record<string, boolean>>({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleApplyAction = (id: string) => {
    setAppliedActions((prev) => ({ ...prev, [id]: true }));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const filteredInsights = INSIGHTS_DATA.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="rounded-[22px] border border-royal-500/25 bg-gradient-to-b from-[#0C1226] via-[#0A0E1A] to-[#0A0E1A] p-5 sm:p-6 shadow-glass-card space-y-5">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-gradient-to-b from-royal-500 to-royal-700 shadow-royal shrink-0">
            <Sparkles className="h-4 w-4 text-white fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display text-base sm:text-lg font-bold text-white">
                AI Business Coach & Growth Engine
              </h2>
              <span className="rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold px-2 py-0.5 font-mono">
                Live Diagnostic
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated pricing optimization, algorithm peak heatmaps, and predictive revenue models.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={handleRefresh}
            title="Re-run Neural Business Diagnostic"
            className="flex items-center gap-1.5 rounded-[12px] border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.08] transition btn-press"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin text-royal-400' : ''}`} />
            <span>{isRefreshing ? 'Auditing...' : 'Refresh AI'}</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {[
          { id: 'all', label: 'All Insights (5)' },
          { id: 'pricing', label: 'Pricing Levers' },
          { id: 'timing', label: 'Posting Windows' },
          { id: 'product', label: 'Conversion Stars' },
          { id: 'retention', label: 'Repeat Buyers' },
          { id: 'forecast', label: 'Revenue Forecast' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-3 py-1.5 rounded-[10px] text-xs font-semibold whitespace-nowrap transition btn-press ${
              selectedCategory === tab.id
                ? 'bg-royal-600 text-white shadow-royal-sm'
                : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 5 Intelligent Insight Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredInsights.map((insight) => {
          const Icon = insight.icon;
          const isApplied = appliedActions[insight.id];

          return (
            <HoverCard
              hoverY={-2}
              key={insight.id}
              className={`rounded-[18px] border border-white/[0.08] bg-[#0A0D17]/85 p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-glass-subtle transition-all ${insight.borderHover}`}
            >
              <div className="space-y-3">
                
                {/* Header: Icon, Category & Confidence Pill */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-2.5 rounded-[12px] ${insight.iconBg} ${insight.iconColor} border border-white/[0.08] shrink-0`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                        {insight.subtitle}
                      </span>
                      <h3 className="font-display text-sm font-bold text-white leading-snug">
                        {insight.title}
                      </h3>
                    </div>
                  </div>

                  {/* Confidence Pill */}
                  <div className="text-right shrink-0">
                    <span className="inline-flex items-center gap-1 rounded-full bg-royal-600/20 text-royal-300 border border-royal-500/30 px-2 py-0.5 text-[10px] font-bold font-mono">
                      <span>{insight.confidence}% Match</span>
                    </span>
                  </div>
                </div>

                {/* Explanation text */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {insight.impactText}
                </p>

                {/* Confidence Progress Meter */}
                <div className="space-y-1 pt-1">
                  <div className="flex justify-between text-[10px] font-mono text-slate-400">
                    <span>AI Model Confidence:</span>
                    <span className="text-royal-300 font-bold">{insight.confidenceLabel} ({insight.confidence}%)</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-royal-600 to-emerald-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${insight.confidence}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-3">
                <span className="font-mono text-xs font-bold text-emerald-400">
                  {insight.metricHighlight}
                </span>

                <button
                  type="button"
                  onClick={() => handleApplyAction(insight.id)}
                  disabled={isApplied}
                  className={`rounded-[12px] px-3.5 py-1.5 text-xs font-semibold transition btn-press flex items-center gap-1.5 ${
                    isApplied
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-royal-600 hover:bg-royal-500 text-white shadow-royal-sm'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>{insight.actionAppliedText}</span>
                    </>
                  ) : (
                    <>
                      <span>{insight.actionLabel}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>

            </HoverCard>
          );
        })}
      </div>

      {/* Growth Summary Footer Pill */}
      <div className="p-3.5 rounded-[16px] bg-royal-600/10 border border-royal-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-royal-400 shrink-0" />
          <span className="text-slate-200">
            <strong>Cumulative ARR Impact:</strong> Implementing these 5 levers projects a <span className="text-emerald-400 font-mono font-bold">+₹42,500/mo</span> net revenue increase.
          </span>
        </div>
        <span className="text-[10px] font-mono text-royal-300 bg-royal-600/20 px-2 py-0.5 rounded shrink-0">
          Calibrated for Bharat
        </span>
      </div>

    </div>
  );
}
