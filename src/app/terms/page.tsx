'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import { 
  FileCheck2, 
  ShieldCheck, 
  Scale, 
  UserCheck, 
  CreditCard, 
  Repeat, 
  Calendar, 
  Users, 
  Copyright, 
  Ban, 
  AlertTriangle, 
  Gavel, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink,
  Zap,
  Building,
  Mail,
  Shield,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { FadeIn, RippleButton } from '@/components/ui/motion';

export default function TermsOfServicePage() {
  const lastUpdated = 'September 6, 2026';

  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms' },
    { id: 'creator-responsibilities', title: '2. Creator Responsibilities' },
    { id: 'buyer-responsibilities', title: '3. Buyer Responsibilities' },
    { id: 'payments', title: '4. Payments & Settlements' },
    { id: 'memberships', title: '5. Membership Renewals' },
    { id: 'bookings', title: '6. 1:1 Bookings & Sync' },
    { id: 'community-rules', title: '7. Community Rules' },
    { id: 'intellectual-property', title: '8. Intellectual Property' },
    { id: 'account-suspension', title: '9. Account Suspension' },
    { id: 'limitation-liability', title: '10. Limitation of Liability' },
    { id: 'governing-law', title: '11. Governing Law: India' },
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
              <Scale className="h-3.5 w-3.5" />
              <span>INDIAN IT ACT 2000 & CONSUMER PROTECTION RULES COMPLIANT</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Terms of Service
            </h1>

            <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
              These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;User&rdquo;, &ldquo;Creator&rdquo;, or &ldquo;Buyer&rdquo;) and <strong className="text-white">CreatorOS Bharat</strong> (&ldquo;Platform&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By accessing, registering, or executing transactions on <strong className="text-white">creatoros.in</strong> or creator storefront sub-paths, you agree to be bound by these Terms.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono pt-2">
              <span className="flex items-center gap-1.5 text-slate-400">
                <Clock className="h-3.5 w-3.5 text-royal-400" />
                <span>Effective Date: {lastUpdated}</span>
              </span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>RBI & DPDP 2023 Regulated Merchant Framework</span>
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
        {/* 1. ACCEPTANCE OF TERMS */}
        {/* ========================================================================= */}
        <section id="acceptance" className="space-y-6 pt-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-royal-600/15 border border-royal-500/30 text-royal-400">
              <FileCheck2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                1. Acceptance of Terms
              </h2>
              <p className="text-xs text-slate-400">
                Agreement governing platform access, digital storefronts, and checkout services.
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/[0.08] bg-[#0A0E17] p-6 space-y-4">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              By creating an account, publishing a creator bio-storefront, connecting a payment gateway, purchasing digital products, subscribing to creator memberships, or booking 1:1 mentorship sessions, you acknowledge that you have read, understood, and agreed to these Terms, our <Link href="/privacy" className="text-royal-400 hover:underline">Privacy Policy</Link>, and applicable Indian laws including the <em>Information Technology Act, 2000</em> and the <em>Consumer Protection (E-Commerce) Rules, 2020</em>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300">Applicable to both registered creators and guest checkout students.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300">You must be at least 18 years old or possess legal parental consent.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. CREATOR RESPONSIBILITIES */}
        {/* ========================================================================= */}
        <section id="creator-responsibilities" className="space-y-6 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-400">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                2. Creator Responsibilities
              </h2>
              <p className="text-xs text-slate-400">
                Obligations for publishers selling digital goods, courses, and booking services.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                <span>Authentic & Accurate Content</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Creators must deliver genuine, uncorrupted digital files (PDFs, templates, code repositories, video lectures) matching advertised descriptions, learning outcomes, and syllabi.
              </p>
            </div>

            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                <span>Tax & GST Disclosure</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Creators are solely responsible for declaring accurate GSTIN details, business legal names, state jurisdictions, and filing applicable GST returns (GSTR-1, GSTR-3B) with tax authorities.
              </p>
            </div>

            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                <span>Honoring Mentorship Bookings</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Creators must attend scheduled 1:1 sessions on Google Meet/Zoom at booked times or reschedule with minimum 4-hour advance notice to the student.
              </p>
            </div>

            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                <span>Advertising & ASCI Compliance</span>
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                All claims, salary promises, course guarantees, and brand promotions must comply with Advertising Standards Council of India (ASCI) digital influencer guidelines.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. BUYER RESPONSIBILITIES */}
        {/* ========================================================================= */}
        <section id="buyer-responsibilities" className="space-y-6 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                3. Buyer Responsibilities
              </h2>
              <p className="text-xs text-slate-400">
                Terms governing student purchases, downloads, and attendance.
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/[0.08] bg-[#0A0E17] p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <h4 className="text-xs font-bold text-white">Accurate Contact Details</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Buyers must provide valid email addresses and WhatsApp phone numbers to ensure immediate delivery of download links, tax invoices, and video meet credentials.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <h4 className="text-xs font-bold text-white">Personal Use License</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  All digital notes, courses, and software templates are licensed strictly for individual, personal use. Reselling, mirroring, or public file sharing is strictly prohibited.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <h4 className="text-xs font-bold text-white">No Chargeback Fraud</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Buyers agree not to initiate fraudulent UPI or credit card chargebacks after successfully receiving digital goods or completing mentorship sessions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. PAYMENTS & SETTLEMENTS */}
        {/* ========================================================================= */}
        <section id="payments" className="space-y-6 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                4. Payments & Instant Settlements
              </h2>
              <p className="text-xs text-slate-400">
                Direct UPI checkout, 0% platform fee, and automated GST invoicing.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">UPI & Gateway Rails</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Razorpay & Direct UPI
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Payments are securely processed via RBI-authorized payment aggregators (Razorpay) supporting PhonePe, Google Pay, Paytm, CRED, BHIM, Netbanking, and Cards. Funds settle directly into the creator&apos;s verified Indian bank account.
              </p>
            </div>

            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Platform Commission</span>
                <span className="text-[10px] font-mono text-royal-400 bg-royal-600/10 px-2 py-0.5 rounded-full border border-royal-500/20">
                  0% Commission
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                CreatorOS Bharat charges 0% platform commission on digital product sales. Standard payment gateway processing fees (e.g., ~2% for cards/netbanking, 0% for standard UPI) apply directly as per gateway terms.
              </p>
            </div>

            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2.5 md:col-span-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">Automated GST Invoices & Tax Compliance</span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  SAC 998439
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every successful transaction automatically generates an official GST tax invoice displaying sequential invoice numbering, place of supply, CGST/SGST/IGST breakdown (18% digital services), and SAC code for seamless business expenditure filing.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. MEMBERSHIP RENEWALS */}
        {/* ========================================================================= */}
        <section id="memberships" className="space-y-6 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-pink-500/15 border border-pink-500/30 text-pink-400">
              <Repeat className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                5. Membership Renewals & Subscriptions
              </h2>
              <p className="text-xs text-slate-400">
                Recurring billing, UPI Autopay, and cancellation policies.
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/[0.08] bg-[#0A0E17] p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <h4 className="text-xs font-bold text-white">Auto-Debit & Renewal Cycles</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Community and course membership tiers bill automatically on a monthly or annual recurring cycle via Razorpay UPI Autopay / e-Mandate until cancelled by the subscriber.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <h4 className="text-xs font-bold text-white">Instant 1-Click Cancellation</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Subscribers may cancel recurring memberships at any time from their dashboard. Access continues until the end of the current paid billing period with zero future charges.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. BOOKINGS */}
        {/* ========================================================================= */}
        <section id="bookings" className="space-y-6 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                6. 1:1 Mentorship & Booking System
              </h2>
              <p className="text-xs text-slate-400">
                Google Calendar synchronization, video meet generation, and reschedule rules.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2">
              <h4 className="text-xs font-bold text-white">2-Way Calendar Sync</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Confirmed bookings automatically create events on the creator&apos;s connected Google Calendar with dynamic Google Meet video conference URLs and block booked time slots from future availability.
              </p>
            </div>

            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2">
              <h4 className="text-xs font-bold text-white">Buffer & Timezone Handling</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Platform enforces creator buffer times (15–60 mins) and converts all session schedules dynamically to Indian Standard Time (IST / Asia/Kolkata) or the attendee&apos;s local timezone.
              </p>
            </div>

            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2">
              <h4 className="text-xs font-bold text-white">Cancellation & Slot Release</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                If a booking is cancelled by either party, the associated Google Calendar event is deleted, and the slot is immediately returned to creator availability.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. COMMUNITY RULES */}
        {/* ========================================================================= */}
        <section id="community-rules" className="space-y-6 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                7. Community Hub & Content Rules
              </h2>
              <p className="text-xs text-slate-400">
                Code of conduct across creator channels, discussion rooms, and live cohorts.
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/[0.08] bg-[#0A0E17] p-6 space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              CreatorOS Bharat maintains a zero-tolerance policy for abusive behavior. Users and creators agree not to post, distribute, or facilitate:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-950/20 border border-red-500/20 text-red-300 text-xs">
                <Ban className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span>Hate speech, harassment, defamation, or discriminatory comments against any community.</span>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-950/20 border border-red-500/20 text-red-300 text-xs">
                <Ban className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span>Pirated software, unauthorized course re-uploads, or stolen intellectual property.</span>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-950/20 border border-red-500/20 text-red-300 text-xs">
                <Ban className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span>Financial scams, Ponzi schemes, unverified get-rich-quick claims, or gambling promotions.</span>
              </div>
              <div className="flex items-start gap-2 p-3 rounded-xl bg-red-950/20 border border-red-500/20 text-red-300 text-xs">
                <Ban className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <span>Malware, phishing links, automated scraping bots, or unauthorized advertising spam.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. INTELLECTUAL PROPERTY */}
        {/* ========================================================================= */}
        <section id="intellectual-property" className="space-y-6 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-royal-600/15 border border-royal-500/30 text-royal-400">
              <Copyright className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                8. Intellectual Property Rights
              </h2>
              <p className="text-xs text-slate-400">
                100% creator content ownership and platform brand protections.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2">
              <h3 className="text-sm font-bold text-white">Creator Content Ownership</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Creators retain 100% full intellectual property ownership, copyright, and distribution rights to all digital products, course videos, Notion templates, and workshop materials uploaded to CreatorOS Bharat.
              </p>
            </div>

            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E17] p-5 space-y-2">
              <h3 className="text-sm font-bold text-white">Platform Technology Ownership</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                All software, algorithms, AI Business Coach engines, user interface designs, trademarks, and logos associated with CreatorOS Bharat remain the exclusive property of CreatorOS.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. ACCOUNT SUSPENSION */}
        {/* ========================================================================= */}
        <section id="account-suspension" className="space-y-6 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                9. Account Suspension & Termination
              </h2>
              <p className="text-xs text-slate-400">
                Grounds for storefront deactivation, compliance audits, and data retrieval.
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/[0.08] bg-[#0A0E17] p-6 space-y-3">
            <p className="text-xs text-slate-300 leading-relaxed">
              We reserve the right to suspend or terminate accounts that engage in fraudulent transactions, repeated customer non-delivery complaints, copyright infringement (DMCA / Copyright Act 1957 notices), or severe breaches of community guidelines.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              In non-fraudulent terminations, creators are granted a 14-day grace period to export customer ledgers, order records, and GST invoice archives before permanent account closure.
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 10. LIMITATION OF LIABILITY */}
        {/* ========================================================================= */}
        <section id="limitation-liability" className="space-y-6 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-slate-500/15 border border-slate-500/30 text-slate-300">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                10. Limitation of Liability & Disclaimers
              </h2>
              <p className="text-xs text-slate-400">
                Platform availability, third-party gateway downtime, and liability caps.
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/[0.08] bg-[#0A0E17] p-6 space-y-3 text-xs text-slate-400 leading-relaxed">
            <p>
              CreatorOS Bharat is provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis. While we maintain high availability and automated failovers, we shall not be liable for indirect, incidental, punitive, or consequential damages arising from third-party payment gateway outages (e.g. NPCI UPI switch maintenance), banking delays, or Google Calendar API service interruptions.
            </p>
            <p>
              In all circumstances, our maximum aggregate liability to any user for claims arising under these Terms shall not exceed the platform fees paid by the creator to CreatorOS in the twelve (12) months preceding the incident.
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 11. GOVERNING LAW: INDIA */}
        {/* ========================================================================= */}
        <section id="governing-law" className="space-y-6 pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-royal-600/15 border border-royal-500/30 text-royal-400">
              <Gavel className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
                11. Governing Law & Dispute Resolution: India
              </h2>
              <p className="text-xs text-slate-400">
                Jurisdiction, arbitration, and statutory compliance framework.
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/[0.12] bg-gradient-to-b from-[#0A0D17] to-[#06080F] p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <span>Republic of India Legal Jurisdiction 🇮🇳</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                These Terms of Service and any contractual relationship shall be governed by, construed, and enforced exclusively in accordance with the substantive laws of the <strong className="text-white">Republic of India</strong>, without regard to its conflict of law principles.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Any dispute, claim, or controversy arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the competent civil courts located in <strong className="text-slate-200">Bengaluru, Karnataka, India</strong>.
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-400">
              <div className="space-y-1">
                <div className="text-slate-200 font-semibold font-mono text-[11px] uppercase">Grievance & Legal Officer</div>
                <div className="text-slate-300">CreatorOS Bharat Legal Operations</div>
                <div>Bengaluru, Karnataka, India (560001)</div>
              </div>
              <div className="space-y-1">
                <div className="text-slate-200 font-semibold font-mono text-[11px] uppercase">Official Legal Contact</div>
                <div>
                  <a href="mailto:legal@creatoros.in" className="text-royal-400 hover:underline">legal@creatoros.in</a>
                  {' • '}
                  <a href="mailto:support@creatoros.in" className="text-emerald-400 hover:underline">support@creatoros.in</a>
                </div>
                <div className="text-[11px] text-slate-500">Statutory IT Act 2000 Grievance Redressal</div>
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
            <Link href="/terms" className="text-royal-400 hover:text-royal-300 transition font-semibold">Terms of Service</Link>
            <Link href="/refund-policy" className="hover:text-white transition">Refund Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
