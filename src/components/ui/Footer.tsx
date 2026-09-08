'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, ShieldCheck, Mail, ArrowUpRight, Heart, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#05070B] text-xs text-slate-400 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* Main Grid: 4 Responsive Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/[0.06]">
          
          {/* Brand & Description (2 cols on wide screens) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-gradient-to-b from-royal-500 to-royal-700 shadow-royal group-hover:scale-105 transition-all duration-300 shrink-0">
                <Zap className="h-4 w-4 text-white fill-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-lg font-bold tracking-tight text-white">
                  Creator<span className="text-royal-400">OS</span>
                </span>
                <span className="rounded-full bg-royal-600/15 px-2 py-0.5 text-[9px] font-bold text-royal-400 border border-royal-500/30 tracking-wider font-mono">
                  BHARAT
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              India&apos;s all-in-one monetization engine for digital creators, educators, coaches, and consultants. Direct 0% fee UPI settlements, automated GST invoicing, and 1:1 Google Calendar booking.
            </p>

            {/* Quick Status / Trust Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[11px] font-medium text-emerald-400 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Direct UPI 0% Fee Payouts
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 text-[11px] text-slate-300 font-mono">
                <ShieldCheck className="h-3.5 w-3.5 text-royal-400" />
                256-Bit Encrypted
              </span>
            </div>
          </div>

          {/* Column 2: Platform Features */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Features
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/dashboard/storefront-builder" className="hover:text-white transition flex items-center gap-1">
                  Bio Storefront Builder
                </Link>
              </li>
              <li>
                <Link href="/dashboard/gst-invoices" className="hover:text-white transition flex items-center gap-1">
                  GST Invoicing (SAC 998439)
                </Link>
              </li>
              <li>
                <Link href="/dashboard/whatsapp" className="hover:text-white transition flex items-center gap-1">
                  WhatsApp Automations
                </Link>
              </li>
              <li>
                <Link href="/dashboard/ai-coach" className="hover:text-white transition flex items-center gap-1">
                  AI Business Coach
                </Link>
              </li>
              <li>
                <Link href="/dashboard/calendar" className="hover:text-white transition flex items-center gap-1">
                  Google Calendar 1:1 Sync
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Solutions
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/aarav" className="hover:text-white transition flex items-center gap-1">
                  Digital Product Sales
                </Link>
              </li>
              <li>
                <Link href="/aarav/course/course_system_design" className="hover:text-white transition flex items-center gap-1">
                  Video Courses & Cohorts
                </Link>
              </li>
              <li>
                <Link href="/aarav/memberships" className="hover:text-white transition flex items-center gap-1">
                  Paid Community Subscriptions
                </Link>
              </li>
              <li>
                <Link href="/dashboard/marketplace" className="hover:text-white transition flex items-center gap-1">
                  Brand Collaboration Marketplace
                </Link>
              </li>
              <li>
                <Link href="/dashboard/media-kit" className="hover:text-white transition flex items-center gap-1">
                  AI Media Kit Generator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Contact (Requested Section) */}
          <div className="space-y-3.5">
            <h3 className="text-xs font-bold text-royal-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <span>Legal & Contact</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/privacy" className="hover:text-white transition flex items-center gap-1.5 group">
                  <span className="text-slate-500 group-hover:text-royal-400 transition">&bull;</span>
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition flex items-center gap-1.5 group">
                  <span className="text-slate-500 group-hover:text-royal-400 transition">&bull;</span>
                  <span>Terms of Service</span>
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white transition flex items-center gap-1.5 group">
                  <span className="text-slate-500 group-hover:text-royal-400 transition">&bull;</span>
                  <span>Refund Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition flex items-center gap-1.5 font-semibold text-slate-200 group">
                  <span className="text-royal-400">&bull;</span>
                  <span>Contact</span>
                  <ArrowUpRight className="h-3 w-3 text-royal-400 opacity-70 group-hover:opacity-100 transition" />
                </Link>
              </li>
            </ul>

            <div className="pt-2 border-t border-white/[0.04] space-y-1.5 text-[11px]">
              <div className="flex items-center gap-1 text-slate-400">
                <Mail className="h-3 w-3 text-royal-400 shrink-0" />
                <a href="mailto:support@creatorosbharat.in" className="hover:text-royal-400 transition truncate">
                  support@creatorosbharat.in
                </a>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <Mail className="h-3 w-3 text-emerald-400 shrink-0" />
                <a href="mailto:hello@creatorosbharat.in" className="hover:text-emerald-400 transition truncate">
                  hello@creatorosbharat.in
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div className="flex items-center gap-2">
            <span>&copy; 2026 CreatorOS Bharat Inc.</span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-red-500 fill-red-500" /> for Indian Creators 🇮🇳
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1 text-slate-500">
              <MapPin className="h-3 w-3 text-royal-400" />
              Indiranagar, Bengaluru, Karnataka
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
