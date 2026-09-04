'use client';

import React, { useState } from 'react';
import { useCreatorStore } from '@/lib/store';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Smartphone, 
  Zap, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck, 
  Building,
  Sparkles,
  Clock,
  Target,
  Award,
  DollarSign
} from 'lucide-react';
import { formatINR, formatINRDecimal } from '@/lib/gst';
import AIBusinessCoachWidget from '@/components/dashboard/AIBusinessCoach';
import { 
  AnimatedCounter, 
  RippleButton, 
  HoverCard, 
  FadeIn, 
  PageTransition 
} from '@/components/ui/motion';
import { motion } from 'framer-motion';

export default function AnalyticsPage() {
  const { orders, products, activeCreator } = useCreatorStore();
  const [payoutTriggered, setPayoutTriggered] = useState(false);

  const totalGMV = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const TRAFFIC_SOURCES = [
    { name: 'Instagram Bio Link', visitors: 14200, percentage: 48, gmv: 124000 },
    { name: 'YouTube Video Descriptions', visitors: 9400, percentage: 32, gmv: 82500 },
    { name: 'LinkedIn Posts & Featured', visitors: 3500, percentage: 12, gmv: 31000 },
    { name: 'WhatsApp & Telegram Groups', visitors: 2400, percentage: 8, gmv: 20500 },
  ];

  return (
    <PageTransition>
      <div className="space-y-6 font-sans">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Analytics & Payouts Engine</span>
              <span className="rounded-full bg-royal-600/15 text-royal-400 border border-royal-500/30 text-[10px] font-bold px-2.5 py-0.5 font-mono">
                Stripe Sigma Style
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Conversion funnel analytics, Instagram & YouTube referral attribution, and automated IMPS bank settlements.
            </p>
          </div>

          <RippleButton
            onClick={() => {
              setPayoutTriggered(true);
              setTimeout(() => setPayoutTriggered(false), 5000);
            }}
            className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-4 py-2 text-xs font-bold text-white shadow-royal"
          >
            <Zap className="h-4 w-4 fill-white" />
            <span>Settle ₹<AnimatedCounter value={Math.round(totalGMV)} /> to Bank</span>
          </RippleButton>
        </div>

        {/* Payout Success Alert */}
        {payoutTriggered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[20px] border border-emerald-500/30 bg-emerald-950/30 p-4 text-emerald-300 text-xs flex items-center gap-2.5 shadow-glass-subtle"
          >
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
            <span>
              Instant IMPS Settlement of ₹{formatINRDecimal(totalGMV)} dispatched to {activeCreator?.bankAccount.bankName} (IFSC: {activeCreator?.bankAccount.ifsc}).
            </span>
          </motion.div>
        )}

        {/* Top View Mode Switcher & Quick Navigation */}
        <div className="flex items-center justify-between gap-3 overflow-x-auto no-scrollbar pb-1">
          <div className="flex items-center gap-1.5 p-1 rounded-[14px] bg-white/[0.04] border border-white/[0.08]">
            <button
              onClick={() => {
                const el = document.getElementById('ai-coach-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px] text-xs font-semibold bg-royal-600/20 text-royal-300 border border-royal-500/30 hover:bg-royal-600/30 transition btn-press"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Jump to AI Business Coach</span>
            </button>
            <span className="text-[11px] text-slate-400 px-2 font-mono hidden sm:inline">
              6 Neural Levers Active
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2.5 py-1 font-mono flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>NPCI IMPS Connected</span>
            </span>
          </div>
        </div>

        {/* AI TELEMETRY QUICK INSIGHT STRIP */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div 
            onClick={() => {
              const el = document.getElementById('ai-coach-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="p-3.5 rounded-[16px] bg-[#0A0E1A]/85 border border-pink-500/20 hover:border-pink-500/50 flex items-center gap-3 transition cursor-pointer shadow-glass-subtle group"
          >
            <div className="p-2 rounded-xl bg-pink-500/15 text-pink-400 shrink-0 group-hover:scale-105 transition-transform">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-400 block font-mono">Best Post Time</span>
                <span className="text-[9px] font-bold text-pink-400 font-mono">98% match</span>
              </div>
              <span className="font-bold text-white text-xs block group-hover:text-pink-300 transition-colors">Tue & Thu 7:30 PM</span>
            </div>
          </div>

          <div 
            onClick={() => {
              const el = document.getElementById('ai-coach-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="p-3.5 rounded-[16px] bg-[#0A0E1A]/85 border border-amber-500/20 hover:border-amber-500/50 flex items-center gap-3 transition cursor-pointer shadow-glass-subtle group"
          >
            <div className="p-2 rounded-xl bg-amber-500/15 text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
              <Target className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-400 block font-mono">30D Forecast</span>
                <span className="text-[9px] font-bold text-amber-400 font-mono">92% conf</span>
              </div>
              <span className="font-bold text-amber-400 text-xs block group-hover:text-amber-300 transition-colors">₹1,85,000 (+32%)</span>
            </div>
          </div>

          <div 
            onClick={() => {
              const el = document.getElementById('ai-coach-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="p-3.5 rounded-[16px] bg-[#0A0E1A]/85 border border-emerald-500/20 hover:border-emerald-500/50 flex items-center gap-3 transition cursor-pointer shadow-glass-subtle group"
          >
            <div className="p-2 rounded-xl bg-emerald-500/15 text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
              <DollarSign className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-400 block font-mono">Price Elasticity</span>
                <span className="text-[9px] font-bold text-emerald-400 font-mono">94% match</span>
              </div>
              <span className="font-bold text-emerald-400 text-xs block group-hover:text-emerald-300 transition-colors">+₹18,400/mo ARR</span>
            </div>
          </div>

          <div 
            onClick={() => {
              const el = document.getElementById('ai-coach-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="p-3.5 rounded-[16px] bg-[#0A0E1A]/85 border border-purple-500/20 hover:border-purple-500/50 flex items-center gap-3 transition cursor-pointer shadow-glass-subtle group"
          >
            <div className="p-2 rounded-xl bg-purple-500/15 text-purple-400 shrink-0 group-hover:scale-105 transition-transform">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-400 block font-mono">Growth Score</span>
                <span className="text-[9px] font-bold text-purple-400 font-mono">95% rank</span>
              </div>
              <span className="font-bold text-purple-400 text-xs block group-hover:text-purple-300 transition-colors">94/100 (Top 2%)</span>
            </div>
          </div>
        </div>

        {/* FUNNEL PERFORMANCE with Hover Lift & Animated Numbers */}
        <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-4">
          <h3 className="font-display text-base font-bold text-white">
            Monetization & Conversion Funnel
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <HoverCard hoverY={-3} className="p-4 rounded-[16px] bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.15]">
              <span className="text-slate-400 text-xs font-medium">1. Storefront Visits</span>
              <div className="font-display text-xl sm:text-2xl font-bold text-white mt-1 font-mono">
                <AnimatedCounter value={29500} />
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">From IG, YT, LinkedIn</p>
            </HoverCard>

            <HoverCard hoverY={-3} className="p-4 rounded-[16px] bg-white/[0.03] border border-white/[0.05] hover:border-royal-500/30">
              <span className="text-slate-400 text-xs font-medium">2. Product Clicks</span>
              <div className="font-display text-xl sm:text-2xl font-bold text-royal-400 mt-1 font-mono">
                <AnimatedCounter value={8420} />
              </div>
              <p className="text-[10px] text-royal-400/80 mt-0.5">28.5% CTR</p>
            </HoverCard>

            <HoverCard hoverY={-3} className="p-4 rounded-[16px] bg-white/[0.03] border border-white/[0.05] hover:border-blue-500/30">
              <span className="text-slate-400 text-xs font-medium">3. UPI Modal Opens</span>
              <div className="font-display text-xl sm:text-2xl font-bold text-blue-400 mt-1 font-mono">
                <AnimatedCounter value={3120} />
              </div>
              <p className="text-[10px] text-blue-400/80 mt-0.5">37.1% Purchase intent</p>
            </HoverCard>

            <HoverCard hoverY={-3} className="p-4 rounded-[16px] bg-royal-600/10 border border-royal-500/25 hover:border-royal-500/50">
              <span className="text-royal-300 text-xs font-bold">4. Successful Orders</span>
              <div className="font-display text-xl sm:text-2xl font-bold text-white mt-1 font-mono">
                <AnimatedCounter value={orders.length + 2420} />
              </div>
              <p className="text-[10px] text-emerald-400 mt-0.5 font-mono">78% UPI Conversion</p>
            </HoverCard>
          </div>
        </div>

        {/* TRAFFIC SOURCE BREAKDOWN with Animated Progress Bars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-7 rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-4">
            <h3 className="font-display text-base font-bold text-white">
              Traffic Source & Channel Attribution
            </h3>

            <div className="space-y-3.5">
              {TRAFFIC_SOURCES.map((src, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-white">{src.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-slate-400 text-[11px]">
                        <AnimatedCounter value={src.visitors} suffix=" visits" />
                      </span>
                      <span className="font-bold text-royal-400 font-mono">
                        <AnimatedCounter value={src.gmv} prefix="₹" />
                      </span>
                    </div>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-royal-600 to-blue-400"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${src.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: idx * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Indian Bank Account Details */}
          <div className="lg:col-span-5 rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                <Building className="h-4 w-4 text-royal-400" />
                <span>Verified Bank Account</span>
              </h3>
              <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold px-2 py-0.5 font-mono">
                Penny Drop Verified
              </span>
            </div>

            <div className="rounded-[16px] bg-black/30 border border-white/[0.04] p-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Bank Name:</span>
                <span className="font-semibold text-white">{activeCreator?.bankAccount.bankName}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Account Number:</span>
                <span className="font-mono text-white">{activeCreator?.bankAccount.accountNumberMasked}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>IFSC Code:</span>
                <span className="font-mono text-royal-300 font-bold">{activeCreator?.bankAccount.ifsc}</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Settlement Frequency:</span>
                <span className="text-emerald-400 font-mono font-medium">T+0 (Same-Day IMPS)</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              All payouts are directly settled to your Indian bank account via NPCI IMPS without intermediary holding delays.
            </p>
          </div>

        </div>

        {/* AI BUSINESS COACH & GROWTH ENGINE WIDGET */}
        <div id="ai-coach-section" className="scroll-mt-6">
          <AIBusinessCoachWidget />
        </div>

      </div>
    </PageTransition>
  );
}
