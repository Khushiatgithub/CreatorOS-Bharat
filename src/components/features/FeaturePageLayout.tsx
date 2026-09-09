'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ChevronDown, 
  ShieldCheck, 
  ArrowUpRight,
  HelpCircle,
  Layers,
  LucideIcon
} from 'lucide-react';
import { FadeIn, HoverCard, RippleButton, PageTransition } from '@/components/ui/motion';

export interface StepItem {
  number: string;
  title: string;
  description: string;
  badge?: string;
}

export interface BenefitItem {
  icon: LucideIcon;
  title: string;
  description: string;
  tag?: string;
  tagColor?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FeaturePageData {
  badge: string;
  title: string;
  highlightedTitle: string;
  description: string;
  heroTagline?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  metrics: { label: string; value: string; change: string }[];
  overviewTitle: string;
  overviewDescription: string;
  steps: [StepItem, StepItem, StepItem, StepItem];
  benefits: BenefitItem[];
  previewComponent: React.ReactNode;
  faqs: FAQItem[];
}

export default function FeaturePageLayout({ data }: { data: FeaturePageData }) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#05070B] text-slate-100 selection:bg-royal-600 selection:text-white font-sans">
        <Navbar />

        {/* 1. HERO SECTION */}
        <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 bg-radial-royal">
          <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-60" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-royal-600/15 blur-[120px] pointer-events-none rounded-full" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn direction="down">
              <div className="inline-flex items-center gap-2 rounded-full border border-royal-500/30 bg-royal-600/10 px-4 py-1.5 text-xs font-semibold text-royal-400 mb-6 shadow-royal-sm shimmer-badge">
                <Sparkles className="h-3.5 w-3.5 text-royal-400" />
                <span>{data.badge}</span>
                <span className="text-white/30">•</span>
                <span className="text-emerald-400 font-mono text-[11px]">Bharat Edition</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <h1 className="font-display text-4xl sm:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
                {data.title} <span className="text-gradient-royal">{data.highlightedTitle}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
                {data.description}
              </p>
            </FadeIn>

            {/* CTAs */}
            <FadeIn delay={0.3}>
              <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Link href={data.primaryCtaLink || '/dashboard'}>
                  <RippleButton className="w-full sm:w-auto rounded-[16px] bg-royal-600 hover:bg-royal-500 px-7 py-3.5 text-xs font-bold text-white shadow-royal hover:brightness-110">
                    <span>{data.primaryCtaText || 'Launch Creator Studio'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </RippleButton>
                </Link>

                <Link href={data.secondaryCtaLink || '/#pricing'}>
                  <RippleButton className="w-full sm:w-auto rounded-[16px] border border-white/[0.12] bg-white/[0.04] backdrop-blur-2xl px-6 py-3.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/[0.08] shadow-glass-subtle">
                    <span>{data.secondaryCtaText || 'View Pricing Plans'}</span>
                  </RippleButton>
                </Link>
              </div>
            </FadeIn>

            {/* Quick Metrics Bar */}
            {data.metrics && data.metrics.length > 0 && (
              <FadeIn delay={0.35}>
                <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
                  {data.metrics.map((m, idx) => (
                    <div 
                      key={idx} 
                      className="rounded-[16px] border border-white/[0.08] bg-[#0A0E1A]/80 p-4 shadow-glass-card text-center"
                    >
                      <p className="text-[11px] text-slate-400 font-mono uppercase font-semibold">{m.label}</p>
                      <p className="font-display text-2xl font-extrabold text-white mt-1 font-mono">{m.value}</p>
                      <p className="text-[10px] text-emerald-400 font-mono mt-0.5">{m.change}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            )}
          </div>
        </section>

        {/* 2. PREMIUM INTERACTIVE UI PREVIEW / SCREENSHOT MOCK */}
        <section className="py-12 bg-[#07090F] border-y border-white/[0.08]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="rounded-[24px] border border-white/[0.12] bg-[#0A0D17] shadow-2xl overflow-hidden backdrop-blur-2xl">
                {/* macOS / Chrome Window Bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>
                  <div className="rounded-full bg-white/[0.04] border border-white/[0.08] px-4 py-1 text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="h-3 w-3 text-royal-400" />
                    <span>creatoros.in/{data.badge.toLowerCase().replace(/\s+/g, '-')}</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    Live UI Preview
                  </div>
                </div>

                {/* Preview Frame Body */}
                <div className="p-6 sm:p-10 bg-gradient-to-b from-[#0A0D17] to-[#05070B]">
                  {data.previewComponent}
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* 3. HOW IT WORKS (4 STEPS) */}
        <section className="py-20 bg-[#05070B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-[11px] font-bold uppercase tracking-wider text-royal-400 font-mono">
                  Simple 4-Step Process
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1.5">
                  How it works from start to finish
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-2">
                  No code required. Setup your workflow in under 3 minutes.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {data.steps.map((step, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <HoverCard className="h-full rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/80 p-6 shadow-glass-card relative flex flex-col justify-between space-y-4 hover:border-royal-500/40">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="h-8 w-8 rounded-full bg-royal-600/20 border border-royal-500/40 text-royal-400 font-mono text-xs font-bold flex items-center justify-center">
                          {step.number}
                        </span>
                        {step.badge && (
                          <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-mono font-semibold">
                            {step.badge}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-base font-bold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-white/[0.04] flex items-center gap-1.5 text-[11px] text-royal-400 font-mono font-medium">
                      <span>Step {step.number} Complete</span>
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    </div>
                  </HoverCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* 4. BENEFITS GRID (6 CARDS) */}
        <section className="py-20 bg-[#07090F] border-t border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-[11px] font-bold uppercase tracking-wider text-royal-400 font-mono">
                  Key Advantages
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1.5">
                  Why Indian Creators Choose CreatorOS
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-2">
                  Built specifically for Indian payment rails, tax regulations, and student conversion.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.benefits.map((benefit, idx) => {
                const IconComponent = benefit.icon;
                return (
                  <FadeIn key={idx} delay={idx * 0.08}>
                    <HoverCard className="h-full rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-3.5 hover:border-royal-500/40">
                      <div className="flex items-center justify-between">
                        <div className="h-10 w-10 rounded-[12px] bg-royal-600/15 border border-royal-500/25 text-royal-400 flex items-center justify-center">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        {benefit.tag && (
                          <span className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-semibold ${benefit.tagColor || 'bg-royal-600/15 text-royal-400 border border-royal-500/30'}`}>
                            {benefit.tag}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-base font-bold text-white">
                        {benefit.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {benefit.description}
                      </p>
                    </HoverCard>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. INTERACTIVE FAQ ACCORDION */}
        <section className="py-20 bg-[#05070B]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center max-w-xl mx-auto mb-14">
                <span className="text-[11px] font-bold uppercase tracking-wider text-royal-400 font-mono">
                  Got Questions?
                </span>
                <h2 className="font-display text-3xl font-bold tracking-tight text-white mt-1.5">
                  Frequently Asked Questions
                </h2>
                <p className="text-xs text-slate-400 mt-2">
                  Everything you need to know about pricing, payouts, and compliance.
                </p>
              </div>
            </FadeIn>

            <div className="space-y-3">
              {data.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <FadeIn key={idx} delay={idx * 0.05}>
                    <div 
                      className={`rounded-[16px] border transition-all duration-200 overflow-hidden ${
                        isOpen 
                          ? 'border-royal-500/40 bg-[#0A0E1A]' 
                          : 'border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15]'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-semibold text-white focus:outline-none"
                      >
                        <span className="pr-4">{faq.question}</span>
                        <ChevronDown className={`h-4 w-4 text-royal-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs text-slate-300 leading-relaxed border-t border-white/[0.04]">
                          <p className="mt-2.5">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. FINAL CTA BANNER */}
        <section className="py-20 relative overflow-hidden text-center bg-gradient-to-b from-[#07090F] to-[#0D1326] border-t border-white/[0.08]">
          <div className="max-w-3xl mx-auto px-4">
            <FadeIn>
              <div className="inline-flex items-center gap-2 rounded-full border border-royal-500/30 bg-royal-600/10 px-3.5 py-1 text-xs font-semibold text-royal-400 mb-4 font-mono">
                <Zap className="h-3.5 w-3.5 text-royal-400" />
                <span>Instant 0% Payout Setup</span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Ready to Launch on CreatorOS Bharat?
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-3 max-w-lg mx-auto leading-relaxed">
                Join thousands of top Indian educators, coaches, and mentors monetizing their audience effortlessly.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Link href="/dashboard">
                  <RippleButton className="w-full sm:w-auto rounded-[16px] bg-royal-600 hover:bg-royal-500 px-8 py-3.5 text-xs font-bold text-white shadow-royal hover:brightness-110">
                    <span>Launch Creator Studio</span>
                    <ArrowRight className="h-4 w-4" />
                  </RippleButton>
                </Link>
                <Link href="/#pricing">
                  <RippleButton className="w-full sm:w-auto rounded-[16px] border border-white/[0.12] bg-white/[0.04] px-6 py-3.5 text-xs font-semibold text-white hover:bg-white/[0.08]">
                    <span>Compare All Plans</span>
                  </RippleButton>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
