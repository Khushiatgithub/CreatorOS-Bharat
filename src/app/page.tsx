'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import { 
  Zap, 
  Sparkles, 
  Smartphone, 
  Receipt, 
  MessageSquare, 
  Calendar, 
  Video, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  DollarSign, 
  ExternalLink,
  ChevronRight,
  Coffee,
  Globe,
  TrendingUp,
  Award,
  Layers,
  ArrowUpRight,
  Lock,
  Building2,
  Users,
  Flame,
  Check,
  Quote
} from 'lucide-react';
import { useCreatorStore } from '@/lib/store';
import UPICheckoutModal from '@/components/checkout/UPICheckoutModal';
import { 
  AnimatedCounter, 
  RippleButton, 
  HoverCard, 
  FadeIn, 
  PageTransition,
  Skeleton
} from '@/components/ui/motion';
import { motion } from 'framer-motion';

// Trusted Indian Ecosystem Brands Strip
const TRUSTED_BRANDS = [
  { name: 'Scaler Academy', tag: 'Tech Upskilling' },
  { name: 'Unacademy', tag: 'EdTech Leader' },
  { name: 'CRED', tag: 'FinTech Ecosystem' },
  { name: 'PhysicsWallah', tag: 'Bharat Education' },
  { name: 'Zerodha Varsity', tag: 'FinTech Knowledge' },
  { name: 'GeeksforGeeks', tag: 'CS Community' },
  { name: 'Coding Ninjas', tag: 'DSA & Coding' },
];

// Realistic Creator Success Testimonials
const CREATOR_TESTIMONIALS = [
  {
    name: 'Ananya Verma',
    role: 'CS Educator & GATE Ranker',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    revenue: '₹18.4 Lakhs',
    period: 'in 4 months',
    quote: 'Selling handwritten DSA & System Design notes on CreatorOS transformed my income. The 1-click PhonePe and GPay checkout eliminated card dropoffs entirely!',
    badge: 'GATE 2024 AIR-14'
  },
  {
    name: 'Rohan Mehta',
    role: 'Staff Engineer & 1:1 Mentor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    revenue: '₹9.2 Lakhs',
    period: 'in 60 days',
    quote: 'Replaced Topmate and Calendly in one afternoon. Buyers get instant Google Meet invites and WhatsApp confirmation within 45 seconds of UPI payment.',
    badge: 'Ex-Google SDE'
  },
  {
    name: 'Priya Nair',
    role: 'Product Designer & Cohort Lead',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    revenue: '₹24.6 Lakhs',
    period: 'cohort batch',
    quote: 'The automated GST invoicing engine with SAC code 998313 saved me 20+ hours each month. My CA loves the 1-click GSTR-1 export.',
    badge: '12k+ Community'
  }
];

export default function SaaSGrandLandingPage() {
  const { activeCreator, products } = useCreatorStore();
  const [demoCheckoutOpen, setDemoCheckoutOpen] = useState(false);

  const sampleProduct = products[0] || {
    id: 'prod_demo',
    title: 'Ultimate FAANG SDE & DSA Master Sheet 2025',
    price: 399,
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#05070B] text-slate-100 selection:bg-royal-600 selection:text-white font-sans">
        <Navbar />

        {/* HERO SECTION - Linear & Stripe Inspired */}
        <section className="relative overflow-hidden pt-14 pb-20 sm:pt-24 sm:pb-32 bg-radial-royal">
          
          {/* Subtle grid & spotlights */}
          <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-60" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-royal-600/15 blur-[120px] pointer-events-none rounded-full" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            {/* Shimmer Pill Badge */}
            <FadeIn direction="down">
              <div className="inline-flex items-center gap-2 rounded-full border border-royal-500/30 bg-royal-600/10 px-4 py-1.5 text-xs font-semibold text-royal-400 mb-6 shadow-royal-sm shimmer-badge">
                <Sparkles className="h-3.5 w-3.5 text-royal-400" />
                <span>The All-in-One Monetization OS for Indian Creators</span>
                <span className="text-white/30">•</span>
                <span className="text-emerald-400 font-mono text-[11px]">1-Click UPI Native</span>
              </div>
            </FadeIn>

            {/* Master Headline */}
            <FadeIn delay={0.1}>
              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.08]">
                Monetize your knowledge with <span className="text-gradient-royal">native UPI speed</span> & zero friction.
              </h1>
            </FadeIn>

            {/* Subheading */}
            <FadeIn delay={0.2}>
              <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-slate-400 font-normal leading-relaxed">
                Combines <strong className="text-white">Stan Store, Topmate, Gumroad, Kajabi, and Calendly</strong> into a single powerhouse platform with <span className="text-royal-400 font-medium">instant UPI checkout</span>, <span className="text-emerald-400 font-medium">automated WhatsApp delivery</span>, and <span className="text-blue-400 font-medium">GST invoices</span>.
              </p>
            </FadeIn>

            {/* CTAs with Ripple Micro-interactions */}
            <FadeIn delay={0.3}>
              <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <Link href="/dashboard">
                  <RippleButton className="w-full sm:w-auto rounded-[16px] bg-royal-600 hover:bg-royal-500 px-7 py-3.5 text-xs font-bold text-white shadow-royal hover:brightness-110">
                    <span>Launch Creator Studio</span>
                    <ArrowRight className="h-4 w-4" />
                  </RippleButton>
                </Link>

                <RippleButton
                  onClick={() => setDemoCheckoutOpen(true)}
                  className="w-full sm:w-auto rounded-[16px] border border-white/[0.12] bg-white/[0.04] backdrop-blur-2xl px-6 py-3.5 text-xs font-semibold text-white hover:bg-white/[0.08] hover:border-royal-500/40 shadow-glass-subtle"
                >
                  <Zap className="h-4 w-4 text-royal-400 fill-royal-400" />
                  <span>Test Live UPI Checkout (₹399)</span>
                </RippleButton>

                <Link
                  href={`/${activeCreator?.username}`}
                  target="_blank"
                  className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-[16px] border border-white/[0.08] bg-black/40 px-5 py-3.5 text-xs font-medium text-slate-300 hover:text-white hover:border-white/[0.2] transition btn-press"
                >
                  <span>Live Storefront</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-royal-400" />
                </Link>
              </div>
            </FadeIn>

            {/* LIVE INVESTOR DEMO METRICS STRIP */}
            <FadeIn delay={0.35}>
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
                <HoverCard hoverY={-2} className="rounded-[16px] border border-white/[0.08] bg-[#0A0E1A]/80 p-4 shadow-glass-card">
                  <p className="text-[11px] text-slate-400 uppercase font-mono font-semibold">Total GMV Processed</p>
                  <div className="font-display text-xl sm:text-2xl font-extrabold text-white mt-1 font-mono">
                    ₹<AnimatedCounter value={4.8} decimals={1} suffix=" Cr+" />
                  </div>
                  <p className="text-[10px] text-emerald-400 font-mono mt-0.5">100% Instant IMPS Settlement</p>
                </HoverCard>

                <HoverCard hoverY={-2} className="rounded-[16px] border border-white/[0.08] bg-[#0A0E1A]/80 p-4 shadow-glass-card">
                  <p className="text-[11px] text-slate-400 uppercase font-mono font-semibold">Active Indian Buyers</p>
                  <div className="font-display text-xl sm:text-2xl font-extrabold text-royal-400 mt-1 font-mono">
                    <AnimatedCounter value={185000} />+
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">Pan-India Tier 1/2/3 Metros</p>
                </HoverCard>

                <HoverCard hoverY={-2} className="rounded-[16px] border border-white/[0.08] bg-[#0A0E1A]/80 p-4 shadow-glass-card">
                  <p className="text-[11px] text-slate-400 uppercase font-mono font-semibold">WhatsApp Delivery</p>
                  <div className="font-display text-xl sm:text-2xl font-extrabold text-emerald-400 mt-1 font-mono">
                    <AnimatedCounter value={99.8} decimals={1} suffix="%" />
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">Delivered within 45s</p>
                </HoverCard>

                <HoverCard hoverY={-2} className="rounded-[16px] border border-white/[0.08] bg-[#0A0E1A]/80 p-4 shadow-glass-card">
                  <p className="text-[11px] text-slate-400 uppercase font-mono font-semibold">Payment Success Rate</p>
                  <div className="font-display text-xl sm:text-2xl font-extrabold text-white mt-1 font-mono">
                    <AnimatedCounter value={99.4} decimals={1} suffix="%" />
                  </div>
                  <p className="text-[10px] text-emerald-400 font-mono mt-0.5">Vs 68% traditional cards</p>
                </HoverCard>
              </div>
            </FadeIn>

            {/* TRUSTED BY BRAND LOGO STRIP */}
            <FadeIn delay={0.4}>
              <div className="mt-14 pt-8 border-t border-white/[0.08] max-w-5xl mx-auto">
                <p className="text-[11px] uppercase font-bold tracking-wider text-slate-500 mb-4 font-mono">
                  Powering Knowledge Creators & Mentors From India's Top Tech Hubs:
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs font-semibold text-slate-400">
                  {TRUSTED_BRANDS.map((b, bIdx) => (
                    <span
                      key={bIdx}
                      className="px-3.5 py-1.5 rounded-[12px] bg-white/[0.03] border border-white/[0.08] hover:border-royal-500/40 hover:text-white transition flex items-center gap-1.5"
                    >
                      <Building2 className="h-3.5 w-3.5 text-royal-400" />
                      <span>{b.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

          </div>
        </section>

        {/* CORE 6 FEATURES SECTION with Hover Lift Cards & Scroll Fade */}
        <section id="features" className="py-20 bg-[#07090F] border-y border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-[11px] font-bold uppercase tracking-wider text-royal-400 font-mono">
                  Engineered for Bharat
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1.5">
                  Everything you need to run a 6-figure creator business
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-2.5">
                  Zero credit card dropoffs, zero tax headaches, and automated workflows.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Feature 1 - Hover Lift */}
              <FadeIn delay={0.1}>
                <HoverCard className="h-full rounded-[20px] border border-white/[0.08] bg-[#0C101F]/80 p-6 shadow-glass-card space-y-3.5 hover:border-royal-500/40">
                  <div className="h-11 w-11 rounded-[14px] bg-royal-600/15 border border-royal-500/25 text-royal-400 flex items-center justify-center">
                    <Smartphone className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-bold text-white">Instant UPI Gateway & QR</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Accept PhonePe, Google Pay, Paytm, CRED, and BHIM in 3 seconds. 0% dropoff from OTP friction or declined cards.
                  </p>
                  <div className="text-[11px] text-royal-400 font-semibold flex items-center gap-1 font-mono">
                    <span><AnimatedCounter value={98.4} decimals={1} suffix="%" /> payment success rate</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                </HoverCard>
              </FadeIn>

              {/* Feature 2 */}
              <FadeIn delay={0.15}>
                <HoverCard className="h-full rounded-[20px] border border-white/[0.08] bg-[#0C101F]/80 p-6 shadow-glass-card space-y-3.5 hover:border-royal-500/40">
                  <div className="h-11 w-11 rounded-[14px] bg-blue-500/15 border border-blue-500/25 text-blue-400 flex items-center justify-center">
                    <Receipt className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-bold text-white">Automated GST Invoicing</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Generate 100% compliant B2B and B2C tax invoices with SAC codes (998431/998313), automated CGST/SGST/IGST, and PDF export.
                  </p>
                  <div className="text-[11px] text-blue-400 font-semibold flex items-center gap-1 font-mono">
                    <span>CA & GSTR-1 Ready</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                </HoverCard>
              </FadeIn>

              {/* Feature 3 */}
              <FadeIn delay={0.2}>
                <HoverCard className="h-full rounded-[20px] border border-white/[0.08] bg-[#0C101F]/80 p-6 shadow-glass-card space-y-3.5 hover:border-royal-500/40">
                  <div className="h-11 w-11 rounded-[14px] bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-bold text-white">WhatsApp Automation Engine</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Automatically deliver download files, Google Meet links, and abandoned cart discount coupons directly to buyers' WhatsApp.
                  </p>
                  <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 font-mono">
                    <span><AnimatedCounter value={99.8} decimals={1} suffix="%" /> open rate in 45s</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                </HoverCard>
              </FadeIn>

              {/* Feature 4 */}
              <FadeIn delay={0.25}>
                <HoverCard className="h-full rounded-[20px] border border-white/[0.08] bg-[#0C101F]/80 p-6 shadow-glass-card space-y-3.5 hover:border-royal-500/40">
                  <div className="h-11 w-11 rounded-[14px] bg-indigo-500/15 border border-indigo-500/25 text-indigo-400 flex items-center justify-center">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-bold text-white">Paid 1:1 Booking Calendar</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Topmate & Calendly equivalent. Set your session price, available Indian time-slots, buffer times, and auto-dispatch Google Meet.
                  </p>
                  <div className="text-[11px] text-indigo-400 font-semibold flex items-center gap-1 font-mono">
                    <span>Google Calendar & Meet Sync</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                </HoverCard>
              </FadeIn>

              {/* Feature 5 */}
              <FadeIn delay={0.3}>
                <HoverCard className="h-full rounded-[20px] border border-white/[0.08] bg-[#0C101F]/80 p-6 shadow-glass-card space-y-3.5 hover:border-royal-500/40">
                  <div className="h-11 w-11 rounded-[14px] bg-royal-600/15 border border-royal-500/25 text-royal-400 flex items-center justify-center">
                    <Video className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-bold text-white">Interactive Video Courses</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Host video masterclasses with multi-module curriculum, student progression tracking, downloadable resources, and certificates.
                  </p>
                  <div className="text-[11px] text-royal-400 font-semibold flex items-center gap-1 font-mono">
                    <span>Kajabi Power Built-In</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                </HoverCard>
              </FadeIn>

              {/* Feature 6 */}
              <FadeIn delay={0.35}>
                <HoverCard className="h-full rounded-[20px] border border-white/[0.08] bg-[#0C101F]/80 p-6 shadow-glass-card space-y-3.5 hover:border-royal-500/40">
                  <div className="h-11 w-11 rounded-[14px] bg-purple-500/15 border border-purple-500/25 text-purple-400 flex items-center justify-center">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-bold text-white">AI Media Kit & Brand Deals</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Auto-calculate your Instagram/YouTube engagement rates, Tier 1/2/3 Indian audience cities, and pitch to verified sponsors.
                  </p>
                  <div className="text-[11px] text-purple-400 font-semibold flex items-center gap-1 font-mono">
                    <span>Auto-generated Rate Cards</span>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                </HoverCard>
              </FadeIn>

            </div>

          </div>
        </section>

        {/* CREATOR TESTIMONIALS SECTION */}
        <section className="py-20 bg-[#05070B]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-[11px] font-bold uppercase tracking-wider text-royal-400 font-mono">
                  Proven Indian Success Stories
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1.5">
                  Trusted by 10,000+ Educators & Tech Mentors
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-2">
                  Real creator earnings powered by 1-click UPI checkout and automated delivery.
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CREATOR_TESTIMONIALS.map((t, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <HoverCard hoverY={-3} className="h-full rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card flex flex-col justify-between space-y-4 hover:border-royal-500/40">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold font-mono">
                          {t.revenue} {t.period}
                        </span>
                        <div className="flex text-amber-400 text-xs">
                          ★★★★★
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed italic">
                        "{t.quote}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-white/[0.06]">
                      <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover ring-1 ring-royal-500" />
                      <div>
                        <h4 className="font-display text-sm font-bold text-white flex items-center gap-1">
                          <span>{t.name}</span>
                          <ShieldCheck className="h-3.5 w-3.5 text-royal-400" />
                        </h4>
                        <p className="text-[11px] text-slate-400">{t.role}</p>
                      </div>
                    </div>
                  </HoverCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING PLANS */}
        <section className="py-20 bg-[#07090F] border-t border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <FadeIn>
              <div className="text-center max-w-2xl mx-auto mb-14">
                <span className="text-[11px] font-bold uppercase tracking-wider text-royal-400 font-mono">
                  Transparent Indian Pricing
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1.5">
                  Start Free, Scale as You Grow
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-2">
                  No hidden USD conversion charges. Prices in Indian Rupees (INR ₹).
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              
              {/* Plan 1: Starter */}
              <FadeIn delay={0.1}>
                <HoverCard className="h-full rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-7 space-y-6 flex flex-col justify-between shadow-glass-card">
                  <div>
                    <span className="rounded-md bg-white/[0.06] px-2.5 py-1 text-[11px] font-semibold text-slate-300 font-mono">
                      STARTER
                    </span>
                    <div className="flex items-baseline gap-2 mt-4">
                      <span className="font-display text-4xl font-extrabold text-white">₹0</span>
                      <span className="text-xs text-slate-400">/ forever free</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">
                      5% platform fee on sales. Ideal for students and creators just getting started.
                    </p>

                    <div className="mt-6 space-y-2.5 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-royal-400" />
                        <span>Unlimited Digital Products & PDFs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-royal-400" />
                        <span>Instant UPI Payment Gateway & QR</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-royal-400" />
                        <span>Automatic GST Invoices (B2C)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-royal-400" />
                        <span>1:1 Booking Calendar</span>
                      </div>
                    </div>
                  </div>

                  <Link href="/dashboard">
                    <RippleButton className="w-full text-center rounded-[14px] border border-white/[0.12] bg-white/[0.04] py-2.5 text-xs font-semibold text-white hover:bg-white/[0.08]">
                      Get Started Free
                    </RippleButton>
                  </Link>
                </HoverCard>
              </FadeIn>

              {/* Plan 2: Pro */}
              <FadeIn delay={0.2}>
                <HoverCard className="h-full rounded-[20px] border-2 border-royal-500 bg-gradient-to-b from-[#0E152E] to-[#0A0E1A] p-7 space-y-6 flex flex-col justify-between shadow-royal relative">
                  <span className="absolute -top-3 right-6 rounded-full bg-royal-600 px-3 py-0.5 text-[9px] font-bold text-white uppercase font-mono shadow-sm">
                    Most Popular
                  </span>

                  <div>
                    <span className="rounded-md bg-royal-600/20 text-royal-300 border border-royal-500/30 px-2.5 py-1 text-[11px] font-bold font-mono">
                      CREATOR PRO
                    </span>
                    <div className="flex items-baseline gap-2 mt-4">
                      <span className="font-display text-4xl font-extrabold text-white font-mono">
                        <AnimatedCounter value={999} prefix="₹" />
                      </span>
                      <span className="text-xs text-slate-400">/ month</span>
                    </div>
                    <p className="text-xs text-royal-200/80 mt-2">
                      <strong className="text-white">0% platform transaction fee.</strong> Keep 100% of your earnings.
                    </p>

                    <div className="mt-6 space-y-2.5 text-xs text-slate-200">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-royal-400" />
                        <span>Everything in Starter with 0% Fee</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-royal-400" />
                        <span>Unlimited Video Courses & Cohorts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-royal-400" />
                        <span>WhatsApp Automation Engine & Alerts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-royal-400" />
                        <span>AI Media Kit & Brand Marketplace</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-royal-400" />
                        <span>Same-day Instant IMPS Bank Settlements</span>
                      </div>
                    </div>
                  </div>

                  <Link href="/dashboard">
                    <RippleButton className="w-full text-center rounded-[14px] bg-royal-600 hover:bg-royal-500 py-3 text-xs font-bold text-white shadow-royal">
                      Start 14-Day Free Pro Trial
                    </RippleButton>
                  </Link>
                </HoverCard>
              </FadeIn>

            </div>

          </div>
        </section>

        {/* FINAL CTA STRIP */}
        <section className="py-20 relative overflow-hidden text-center bg-gradient-to-b from-[#07090F] to-[#0D1326] border-t border-white/[0.08]">
          <div className="max-w-3xl mx-auto px-4">
            <FadeIn>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Ready to Build Your Creator Business in India?
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-3 max-w-lg mx-auto leading-relaxed">
                Join thousands of educators, students, and freelancers monetizing their knowledge with zero technical hassle.
              </p>

              <div className="mt-7 flex items-center justify-center">
                <Link href="/dashboard">
                  <RippleButton className="rounded-[16px] bg-royal-600 hover:bg-royal-500 px-7 py-3.5 text-xs font-bold text-white shadow-royal hover:brightness-110">
                    <span>Launch Creator Studio Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </RippleButton>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/[0.08] bg-[#05070B] py-10 text-xs text-slate-500 font-mono">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-bold text-white">Creator<span className="text-royal-400">OS</span></span>
              <span className="rounded bg-royal-600/15 px-1.5 py-0.5 text-[8px] text-royal-400 font-bold border border-royal-500/30">INDIA</span>
              <span>• Built for Bharat Creators 🇮🇳</span>
            </div>

            <div className="flex items-center gap-5 text-[11px]">
              <Link href="/dashboard/storefront-builder" className="hover:text-white transition">Bio Builder</Link>
              <Link href="/dashboard/gst-invoices" className="hover:text-white transition">GST Invoicing</Link>
              <Link href="/dashboard/whatsapp" className="hover:text-white transition">WhatsApp API</Link>
              <Link href="/dashboard/media-kit" className="hover:text-white transition">AI Media Kit</Link>
            </div>
          </div>
        </footer>

        {/* DEMO UPI CHECKOUT MODAL */}
        {demoCheckoutOpen && (
          <UPICheckoutModal
            isOpen={true}
            onClose={() => setDemoCheckoutOpen(false)}
            item={{
              id: sampleProduct?.id || 'prod_demo',
              title: sampleProduct?.title || 'Ultimate FAANG SDE & DSA Master Sheet 2025',
              price: sampleProduct?.price || 399,
              type: 'product'
            }}
          />
        )}

      </div>
    </PageTransition>
  );
}
