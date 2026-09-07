'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import { 
  RotateCcw, 
  ShieldCheck, 
  FileText, 
  Video, 
  Users, 
  Calendar, 
  CreditCard, 
  AlertCircle, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  Zap,
  Mail,
  HelpCircle,
  Sparkles,
  Download,
  Ban,
  Building,
  Check
} from 'lucide-react';
import { FadeIn, RippleButton } from '@/components/ui/motion';

export default function RefundPolicyPage() {
  const lastUpdated = 'September 7, 2026';

  const sections = [
    { id: 'digital-products', title: '1. Digital Products' },
    { id: 'courses', title: '2. Courses & Cohorts' },
    { id: 'memberships', title: '3. Memberships' },
    { id: 'bookings', title: '4. 1:1 Bookings' },
    { id: 'duplicate-payments', title: '5. Duplicate Payments' },
    { id: 'request-process', title: '6. How to Request a Refund' },
    { id: 'contact', title: '7. Grievance & Support' },
  ];

  return (
    <div className="min-h-screen bg-[#07090F] text-slate-100 selection:bg-royal-500 selection:text-white font-sans antialiased">
      {/* Global Navbar */}
      <Navbar />

      {/* Main Content Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* HERO HEADER */}
        <FadeIn>
          <div className="space-y-4 text-center sm:text-left border-b border-white/[0.08] pb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
              <RotateCcw className="h-3.5 w-3.5" />
              <span>TRANSPARENT BUYER PROTECTION & CONSUMER RIGHTS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Refund & Cancellation Policy
            </h1>

            <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
              At CreatorOS Bharat (<strong className="text-white">creatoros.in</strong>), we strive to build trust across the Indian creator economy. This policy outlines transparent refund and cancellation guidelines for digital products, video courses, community memberships, 1:1 mentorship sessions, and payment transaction resolutions.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono pt-2">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Clock className="h-3.5 w-3.5 text-royal-400" />
                <span>Effective Date: {lastUpdated}</span>
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Standardized 5-Day SLA for Verified Refund Claims</span>
              </span>
            </div>
          </div>
        </FadeIn>

        {/* QUICK NAVIGATION ANCHORS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/[0.06] text-xs font-mono no-scrollbar">
          <span className="text-slate-500 uppercase tracking-wider shrink-0 font-sans font-bold pr-2">Jump to:</span>
          {sections.map(sec => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-royal-600/20 text-slate-300 hover:text-white border border-white/[0.06] transition whitespace-nowrap shrink-0"
            >
              {sec.title}
            </a>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* 1. DIGITAL PRODUCTS */}
        {/* ========================================================================= */}
        <section id="digital-products" className="space-y-6 pt-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-royal-600/15 border border-royal-500/30 text-royal-400">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                1. Digital Products (PDFs, Notion Templates, Code & Assets)
              </h2>
              <p className="text-xs text-slate-400">
                E-books, developer cheat sheets, templates, and downloadable resources.
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/[0.08] bg-[#0A0E17] p-6 space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-white">No Refund After Successful Download</h3>
                <p className="text-xs text-amber-200/80 mt-1 leading-relaxed">
                  Due to the irrevocable, instantly accessible nature of downloadable digital files (PDFs, ZIP bundles, Overleaf LaTeX sheets, code repositories, and Notion templates), <strong>all digital product sales are final once the download link is accessed or file delivery is completed via WhatsApp/Email</strong>.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Defective or Corrupted Files</span>
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  If a downloaded file is corrupted, unreadable, or missing critical promised assets, notify support within <strong>48 hours of purchase</strong>. If the creator cannot provide a working replacement within 24 hours, a full refund will be issued.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <h4 className="text-xs font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span>Instant Delivery Guarantee</span>
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Download links are generated instantly on the verified payment success screen and sent concurrently to your registered WhatsApp number and email address.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. COURSES & COHORTS */}
        {/* ========================================================================= */}
        <section id="courses" className="space-y-6 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400">
              <Video className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                2. Courses & Live Cohorts
              </h2>
              <p className="text-xs text-slate-400">
                Self-paced video modules, masterclasses, and cohort-based bootcamps.
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/[0.08] bg-[#0A0E17] p-6 space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
              <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-white">7-Day Conditional Money-Back Guarantee</h3>
                <p className="text-xs text-emerald-200/80 mt-1 leading-relaxed">
                  You are eligible for a <strong>100% full refund within 7 calendar days of enrollment</strong>, provided you have <strong>completed/viewed less than 10% of the total course lessons</strong> and have not downloaded proprietary course certificate materials.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <h4 className="text-xs font-bold text-white">Automated LMS Progress Tracking</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Course completion percentage is computed automatically by our LMS video player telemetry. Once 10% or more of total modules are completed, the course becomes non-refundable.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <h4 className="text-xs font-bold text-white">Live Cohort Cancellations</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  For live scheduled cohort bootcamps, cancellation requests must be received at least <strong>48 hours before the first live kickoff session</strong> for a full refund.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. MEMBERSHIPS */}
        {/* ========================================================================= */}
        <section id="memberships" className="space-y-6 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                3. Memberships & Subscriptions
              </h2>
              <p className="text-xs text-slate-400">
                Monthly & annual recurring community hubs and exclusive content tiers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2">
              <div className="flex items-center gap-2 text-royal-400 font-bold text-xs font-mono">
                <Check className="h-4 w-4" />
                <span>Cancel Anytime</span>
              </div>
              <h4 className="text-sm font-bold text-white">1-Click Dashboard Cancellation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                You can cancel your recurring membership at any time directly from your account settings with zero cancellation fees or penalties.
              </p>
            </div>

            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs font-mono">
                <Clock className="h-4 w-4" />
                <span>Access Retained</span>
              </div>
              <h4 className="text-sm font-bold text-white">Active Until Cycle End</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Upon cancellation, your community channels, course library, and member perks remain 100% active until the end of your current paid billing period.
              </p>
            </div>

            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono">
                <Ban className="h-4 w-4" />
                <span>No Partial Refunds</span>
              </div>
              <h4 className="text-sm font-bold text-white">Non-Prorated Billing</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We do not offer pro-rated or partial refunds for unused days or mid-cycle cancellations once a billing cycle has commenced.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. 1:1 BOOKINGS */}
        {/* ========================================================================= */}
        <section id="bookings" className="space-y-6 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                4. 1:1 Mentorship & Booking Sessions
              </h2>
              <p className="text-xs text-slate-400">
                Video consultations, portfolio reviews, and mock technical interviews.
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/[0.08] bg-[#0A0E17] p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Free 24h cancellation */}
              <div className="rounded-[20px] border border-emerald-500/30 bg-emerald-950/20 p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">Free Cancellation (&gt;24h)</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                    100% Refundable
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Cancellations or reschedule requests made <strong>at least 24 hours prior</strong> to the scheduled session start time receive a <strong>100% full refund</strong> or a free slot reschedule to the creator&apos;s next available opening.
                </p>
              </div>

              {/* Less than 24 hours */}
              <div className="rounded-[20px] border border-rose-500/30 bg-rose-950/20 p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-white">Late Notice (&lt;24h)</span>
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-500/15 px-2 py-0.5 rounded-full border border-rose-500/30 font-bold">
                    Non-Refundable
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Cancellations requested <strong>less than 24 hours before</strong> the session or no-shows are <strong>strictly non-refundable</strong>, as the creator has reserved calendar availability and turned down other potential bookings.
                </p>
              </div>

            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3 text-xs text-slate-300">
              <ShieldCheck className="h-5 w-5 text-royal-400 shrink-0" />
              <span>
                <strong>Creator No-Show Protection:</strong> If a creator fails to attend the scheduled Google Meet/Zoom session without prior agreement, the student is entitled to an automatic <strong>100% full refund</strong> plus priority rebooking.
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. DUPLICATE PAYMENTS */}
        {/* ========================================================================= */}
        <section id="duplicate-payments" className="space-y-6 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                5. Duplicate Payments & Transaction Glitches
              </h2>
              <p className="text-xs text-slate-400">
                UPI network timeouts, multiple debits, and payment gateway discrepancies.
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/[0.08] bg-[#0A0E17] p-6 space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-royal-600/10 border border-royal-500/25 text-royal-300">
              <Zap className="h-5 w-5 shrink-0 mt-0.5 text-royal-400" />
              <div>
                <h3 className="font-bold text-xs sm:text-sm text-white">Full Refund Within 5 Business Days</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  In case of technical errors, multiple UPI debits for a single order, or payment deducted without download link generation, <strong>we guarantee a 100% full refund of duplicate amounts within 5 business days</strong> back to the original payment source.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-xs">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1">
                <span className="font-mono text-royal-400 text-[10px] font-bold">STEP 1</span>
                <p className="font-bold text-white">Detection & Reversal</p>
                <p className="text-[11px] text-slate-400">Our automated Razorpay reconciliation engine detects duplicate UPI payment reference numbers (RRN) automatically.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1">
                <span className="font-mono text-royal-400 text-[10px] font-bold">STEP 2</span>
                <p className="font-bold text-white">Bank Routing</p>
                <p className="text-[11px] text-slate-400">Refunds are routed via NPCI UPI / IMPS switch directly to the sender&apos;s bank account or credit card.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] space-y-1">
                <span className="font-mono text-royal-400 text-[10px] font-bold">STEP 3</span>
                <p className="font-bold text-white">SMS / UTR Confirmation</p>
                <p className="text-[11px] text-slate-400">You will receive a refund confirmation email with bank UTR reference number for easy bank statement tracking.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. HOW TO REQUEST A REFUND */}
        {/* ========================================================================= */}
        <section id="request-process" className="space-y-6 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-400">
              <HelpCircle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                6. How to Request a Refund
              </h2>
              <p className="text-xs text-slate-400">
                Simple, hassle-free resolution steps for buyers.
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/[0.08] bg-[#0A0E17] p-6 space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              To initiate a refund request under the eligible terms outlined above, please send an email to <a href="mailto:refunds@creatoros.in" className="text-royal-400 hover:underline font-mono">refunds@creatoros.in</a> with the following details:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="h-5 w-5 rounded-full bg-royal-600/20 text-royal-400 flex items-center justify-center font-mono text-[11px] font-bold">1</span>
                <span className="text-slate-200">CreatorOS Order ID or Invoice Number (e.g. <code>INV-2026-XXXXX</code>)</span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="h-5 w-5 rounded-full bg-royal-600/20 text-royal-400 flex items-center justify-center font-mono text-[11px] font-bold">2</span>
                <span className="text-slate-200">Registered Email Address & WhatsApp Phone Number</span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="h-5 w-5 rounded-full bg-royal-600/20 text-royal-400 flex items-center justify-center font-mono text-[11px] font-bold">3</span>
                <span className="text-slate-200">Razorpay Payment ID / UPI Transaction Reference (RRN)</span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <span className="h-5 w-5 rounded-full bg-royal-600/20 text-royal-400 flex items-center justify-center font-mono text-[11px] font-bold">4</span>
                <span className="text-slate-200">Reason for refund request (with screenshot if applicable)</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. CONTACT & GRIEVANCE */}
        {/* ========================================================================= */}
        <section id="contact" className="space-y-6 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                7. Grievance Redressal & Support Contacts
              </h2>
              <p className="text-xs text-slate-400">
                Official dispute resolution channels in India.
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/[0.12] bg-gradient-to-b from-[#0A0D17] to-[#06080F] p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Refund Inquiries & Claims</div>
                <div className="text-lg font-bold text-white flex items-center gap-2">
                  <Mail className="h-4 w-4 text-emerald-400" />
                  <a href="mailto:refunds@creatoros.in" className="hover:text-emerald-300 transition underline underline-offset-4">
                    refunds@creatoros.in
                  </a>
                </div>
                <p className="text-xs text-slate-400">
                  Dedicated refund team responding within 24 business hours.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">General & Payment Assistance</div>
                <div className="text-lg font-bold text-white flex items-center gap-2">
                  <Mail className="h-4 w-4 text-royal-400" />
                  <a href="mailto:support@creatoros.in" className="hover:text-royal-300 transition underline underline-offset-4">
                    support@creatoros.in
                  </a>
                </div>
                <p className="text-xs text-slate-400">
                  24/7 creator & student customer grievance support.
                </p>
              </div>

            </div>

            <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
              <div>
                <strong className="text-slate-200">Grievance Officer:</strong> Customer Disputes & Compliance • CreatorOS Bharat • Bengaluru, Karnataka, India (560001)
              </div>
              <div className="font-mono text-[11px] text-emerald-400">
                Refund Processing SLA: 3–5 Business Days
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <div className="pt-6 text-center space-y-4">
          <Link href="/">
            <RippleButton className="rounded-[16px] bg-royal-600 hover:bg-royal-500 px-6 py-3 text-xs font-bold text-white shadow-royal inline-flex items-center gap-2">
              <span>Return to CreatorOS Bharat Homepage</span>
              <ArrowRight className="h-4 w-4" />
            </RippleButton>
          </Link>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.08] bg-[#05070B] py-10 text-xs text-slate-500 font-mono mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-bold text-white">Creator<span className="text-royal-400">OS</span></span>
            <span className="rounded bg-royal-600/15 px-1.5 py-0.5 text-[8px] text-royal-400 font-bold border border-royal-500/30">INDIA</span>
            <span>• Built for Bharat Creators 🇮🇳</span>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-[11px]">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <Link href="/dashboard/storefront-builder" className="hover:text-white transition">Bio Builder</Link>
            <Link href="/dashboard/gst-invoices" className="hover:text-white transition">GST Invoicing</Link>
            <Link href="/dashboard/whatsapp" className="hover:text-white transition">WhatsApp API</Link>
            <Link href="/dashboard/media-kit" className="hover:text-white transition">AI Media Kit</Link>
            <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
            <Link href="/refund-policy" className="text-royal-400 hover:text-royal-300 transition font-semibold">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
