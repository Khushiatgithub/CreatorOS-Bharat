'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  Database, 
  UserCheck, 
  Download, 
  Trash2, 
  HelpCircle, 
  Mail, 
  Calendar, 
  CreditCard, 
  Bot, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  ExternalLink, 
  Smartphone, 
  Receipt, 
  Sparkles,
  Users,
  Building,
  KeyRound,
  Shield,
  Clock
} from 'lucide-react';
import { FadeIn, RippleButton } from '@/components/ui/motion';

export default function PrivacyPolicyPage() {
  const lastUpdated = 'September 6, 2026';

  const sections = [
    { id: 'info-collected', title: '1. Information We Collect' },
    { id: 'how-we-use', title: '2. How We Use Data' },
    { id: 'third-party', title: '3. Third-party Services' },
    { id: 'user-rights', title: '4. User Rights & Controls' },
    { id: 'contact', title: '5. Contact & Grievances' },
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-royal-600/15 border border-royal-500/30 text-royal-400 text-xs font-mono font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>DATA SOVEREIGNTY & DPDP ACT 2023 COMPLIANT</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Privacy Policy
            </h1>

            <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
              At CreatorOS Bharat (<strong className="text-white">creatoros.in</strong>), we are committed to transparent, secure, and respectful data handling. This Privacy Policy outlines how we collect, process, protect, and empower you with control over your digital storefront data, student purchase records, and Indian tax compliance details.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono pt-2">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Clock className="h-3.5 w-3.5 text-royal-400" />
                <span>Effective Date: {lastUpdated}</span>
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <Lock className="h-3.5 w-3.5" />
                <span>256-Bit SSL Encrypted Relational Telemetry</span>
              </span>
            </div>
          </div>
        </FadeIn>

        {/* QUICK NAVIGATION ANCHORS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/[0.06] text-xs font-mono">
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
        {/* 1. INFORMATION WE COLLECT */}
        {/* ========================================================================= */}
        <section id="info-collected" className="space-y-6 pt-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-royal-600/15 border border-royal-500/30 text-royal-400">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                1. Information We Collect
              </h2>
              <p className="text-xs text-slate-400">
                Data gathered directly during creator onboarding and student checkout flows.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Name */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2 hover:border-royal-500/30 transition">
              <div className="flex items-center gap-2.5 text-royal-300 font-semibold text-sm">
                <UserCheck className="h-4 w-4" />
                <h3>Full Name & Display Identity</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Creator legal and public brand names for custom bio-link storefronts, along with student / buyer full names required on digital invoices and certificates.
              </p>
            </div>

            {/* Email */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2 hover:border-royal-500/30 transition">
              <div className="flex items-center gap-2.5 text-royal-300 font-semibold text-sm">
                <Mail className="h-4 w-4" />
                <h3>Email Address</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Used for authentication tokens, digital PDF download links, instant payment receipts, calendar meeting invites, and account recovery notices.
              </p>
            </div>

            {/* Phone */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2 hover:border-pink-500/30 transition">
              <div className="flex items-center gap-2.5 text-pink-400 font-semibold text-sm">
                <Smartphone className="h-4 w-4" />
                <h3>Phone Number & WhatsApp ID</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Collected with explicit consent to deliver 1-click WhatsApp download links, booking slot reminders, and OTP payment validations for Indian UPI checkouts.
              </p>
            </div>

            {/* GST Details */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2 hover:border-emerald-500/30 transition">
              <div className="flex items-center gap-2.5 text-emerald-400 font-semibold text-sm">
                <Receipt className="h-4 w-4" />
                <h3>GST Details & Tax Compliance Data</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Creator GSTIN, registered business address, state codes, and buyer billing state to calculate CGST, SGST, and IGST breakdowns for automated B2B/B2C invoices.
              </p>
            </div>

            {/* Payment Information */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2 hover:border-amber-500/30 transition">
              <div className="flex items-center gap-2.5 text-amber-400 font-semibold text-sm">
                <CreditCard className="h-4 w-4" />
                <h3>Payment & Settlement Telemetry</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                UPI Virtual Payment Addresses (VPA), transaction reference numbers, and encrypted Razorpay token IDs. <em>We NEVER store plaintext debit/credit card numbers or UPI PINs.</em>
              </p>
            </div>

            {/* Booking Data */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2 hover:border-indigo-500/30 transition">
              <div className="flex items-center gap-2.5 text-indigo-400 font-semibold text-sm">
                <Calendar className="h-4 w-4" />
                <h3>1:1 Mentorship & Booking Data</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scheduled session start/end times, creator availability time slots, attendee agendas, Google Meet event IDs, and automated reschedule/cancellation logs.
              </p>
            </div>

            {/* Community Activity */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2 md:col-span-2 hover:border-purple-500/30 transition">
              <div className="flex items-center gap-2.5 text-purple-400 font-semibold text-sm">
                <Users className="h-4 w-4" />
                <h3>Community Activity & Course Progression</h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Membership tier status, recurring billing cycles, Telegram/Discord invite tokens, and learning asset downloads across creator courses and workshops.
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. HOW WE USE DATA */}
        {/* ========================================================================= */}
        <section id="how-we-use" className="space-y-6 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                2. How We Use Data
              </h2>
              <p className="text-xs text-slate-400">
                Purposes for which creator and customer telemetry is processed.
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/[0.08] bg-[#0A0E17] p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
                <CheckCircle2 className="h-4 w-4 text-royal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Account Creation & Authentication</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Verifying creator identity, securing dashboard sessions via Clerk authentication, and provisioning custom storefront URLs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
                <CheckCircle2 className="h-4 w-4 text-royal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Payment Processing & Instant Settlements</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Executing 1-click UPI transactions, processing subscription renewals, and routing direct bank payouts without merchant holdbacks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
                <CheckCircle2 className="h-4 w-4 text-royal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">GST Invoices & Government Tax Compliance</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Auto-generating sequential, digitally signed GST tax invoices with HSN/SAC classifications and state tax breakdowns for B2B/B2C filing.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
                <CheckCircle2 className="h-4 w-4 text-royal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Google Calendar 2-Way Sync</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Scheduling confirmed 1:1 sessions, creating secure Google Meet conference links, blocking creator calendar slots, and syncing cancellations.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
                <CheckCircle2 className="h-4 w-4 text-royal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Storefront & Conversion Analytics</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Calculating Monthly Revenue, Average Order Value (AOV), student retention rates, geographic demographics, and top converting products.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02]">
                <CheckCircle2 className="h-4 w-4 text-royal-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">AI Business Coach & Price Optimization</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Analyzing demand elasticity, weekly hourly engagement heatmaps, and suggesting optimal pricing to lift overall creator revenue.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. THIRD-PARTY SERVICES */}
        {/* ========================================================================= */}
        <section id="third-party" className="space-y-6 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                3. Third-party Services
              </h2>
              <p className="text-xs text-slate-400">
                Enterprise infrastructure partners powering CreatorOS Bharat.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Razorpay */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2.5 hover:border-royal-500/30 transition">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Razorpay</span>
                <span className="text-[10px] font-mono text-royal-400 bg-royal-600/10 px-2 py-0.5 rounded-full border border-royal-500/20">
                  Payment Gateway (PCI-DSS)
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Handles RBI-compliant payments across UPI (PhonePe, GPay, Paytm, CRED), Netbanking, and Cards. Payment tokenization ensures zero raw card credentials ever touch CreatorOS servers.
              </p>
            </div>

            {/* Google Calendar */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2.5 hover:border-amber-500/30 transition">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Google Calendar API</span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  OAuth 2.0 Integration
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Syncs creator availability, inserts calendar event records, and generates Google Meet video links with encrypted OAuth 2.0 access and refresh tokens stored securely in PostgreSQL.
              </p>
            </div>

            {/* Clerk Authentication */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2.5 hover:border-purple-500/30 transition">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Clerk Authentication</span>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                  SOC2 Type II Auth
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Provides multi-factor authentication, email/Google SSO authentication, and secure session token validation with role-based access control.
              </p>
            </div>

            {/* PostgreSQL */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2.5 hover:border-emerald-500/30 transition">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">PostgreSQL Database</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Encrypted Relational Storage
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                High-performance relational tables (products, orders, bookings, memberships, analytics) encrypted at rest and in transit with automated backups and row-level multi-tenancy.
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. USER RIGHTS */}
        {/* ========================================================================= */}
        <section id="user-rights" className="space-y-6 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-400">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                4. User Rights & Data Controls
              </h2>
              <p className="text-xs text-slate-400">
                You own 100% of your creator data. We empower you with full portability and erasure.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Download data */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-3 hover:border-royal-500/30 transition">
              <div className="p-2 w-fit rounded-xl bg-royal-600/15 text-royal-400 border border-royal-500/30">
                <Download className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Download Your Data</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Request a full export of your product catalog, orders ledger, customer emails, GST invoice histories, and appointment bookings in structured JSON/CSV format.
              </p>
            </div>

            {/* Delete account */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-3 hover:border-red-500/30 transition">
              <div className="p-2 w-fit rounded-xl bg-red-500/15 text-red-400 border border-red-500/30">
                <Trash2 className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Delete Account (Right to Erasure)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Permanently purge your creator profile, OAuth tokens, and storefront listings from our PostgreSQL clusters in compliance with Indian DPDP Act regulations.
              </p>
            </div>

            {/* Contact support */}
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-3 hover:border-emerald-500/30 transition">
              <div className="p-2 w-fit rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <HelpCircle className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Contact 24/7 Support</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct access to our developer support team for privacy inquiries, data rectification requests, or payment transaction investigations.
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. CONTACT EMAIL & GRIEVANCES */}
        {/* ========================================================================= */}
        <section id="contact" className="space-y-6 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                5. Contact Information & Grievance Officer
              </h2>
              <p className="text-xs text-slate-400">
                Official contact channels for data inquiries and grievance redressal.
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/[0.12] bg-gradient-to-b from-[#0A0D17] to-[#06080F] p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Privacy & Data Requests</div>
                <div className="text-lg font-bold text-white flex items-center gap-2">
                  <Mail className="h-4 w-4 text-royal-400" />
                  <a href="mailto:privacy@creatoros.in" className="hover:text-royal-300 transition underline underline-offset-4">
                    privacy@creatoros.in
                  </a>
                </div>
                <p className="text-xs text-slate-400">
                  For data export requests, account deletion, or privacy compliance clarifications.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">General & Creator Support</div>
                <div className="text-lg font-bold text-white flex items-center gap-2">
                  <Mail className="h-4 w-4 text-emerald-400" />
                  <a href="mailto:support@creatoros.in" className="hover:text-emerald-300 transition underline underline-offset-4">
                    support@creatoros.in
                  </a>
                </div>
                <p className="text-xs text-slate-400">
                  For technical assistance, store onboarding, or payment settlement queries.
                </p>
              </div>

            </div>

            <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
              <div>
                <strong className="text-slate-200">Grievance Officer:</strong> Legal & Compliance Team • CreatorOS Bharat • Bengaluru, Karnataka, India (560001)
              </div>
              <div className="font-mono text-[11px] text-royal-400">
                SLA: Acknowledged within 24h • Resolved in &lt;48h
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
            <Link href="/privacy" className="text-royal-400 hover:text-royal-300 transition font-semibold">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
            <Link href="/refund-policy" className="hover:text-white transition">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
