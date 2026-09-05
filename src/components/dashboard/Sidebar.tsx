'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Palette, 
  FileText, 
  Video, 
  Calendar, 
  MessageSquare, 
  Sparkles, 
  Briefcase, 
  Receipt, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  ArrowUpRight, 
  User, 
  Users, 
  Crown, 
  LogOut 
} from 'lucide-react';
import { SignOutButton, SignedIn } from '@clerk/nextjs';
import { useCreatorStore } from '@/lib/store';
import { formatINR } from '@/lib/gst';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/memberships', label: 'Memberships', icon: Users, badge: 'MRR', highlight: true },
  { href: '/dashboard/community', label: 'Community Hub', icon: Users, badge: 'New' },
  { href: '/dashboard/storefront-builder', label: 'Storefront Builder', icon: Palette, badge: 'Live' },
  { href: '/dashboard/products', label: 'Digital Products', icon: FileText },
  { href: '/dashboard/courses', label: 'Courses & Cohorts', icon: Video },
  { href: '/dashboard/bookings', label: '1:1 Bookings', icon: Calendar },
  { href: '/dashboard/whatsapp', label: 'WhatsApp Automation', icon: MessageSquare, badge: 'Auto' },
  { href: '/dashboard/media-kit', label: 'AI Media Kit', icon: Sparkles },
  { href: '/dashboard/marketplace', label: 'Brand Marketplace', icon: Briefcase, badge: 'Deals' },
  { href: '/dashboard/gst-invoices', label: 'GST Invoices', icon: Receipt },
  { href: '/dashboard/analytics', label: 'Analytics & Payouts', icon: BarChart3 },
  { href: '/dashboard/profile', label: 'Account & Security', icon: User }
];

export default function Sidebar() {
  const pathname = usePathname();
  const { activeCreator, subscriptionPlans } = useCreatorStore();

  const goldPlan = subscriptionPlans.find((p) => p.name === 'Gold Membership' || p.isPopular) || {
    name: 'Gold Membership',
    monthlyPrice: 799,
    tagline: 'Community • Courses • Live Q&A',
    memberCount: 128,
    badgeText: 'Popular'
  };

  const memberCount = goldPlan.memberCount || 128;
  const monthlyPrice = goldPlan.monthlyPrice || 799;
  const totalMRR = memberCount * monthlyPrice;

  return (
    <aside className="w-64 shrink-0 hidden lg:flex flex-col border-r border-white/[0.08] bg-[#07090F]/90 backdrop-blur-2xl p-4 text-slate-200 overflow-y-auto no-scrollbar max-h-screen">
      
      {/* Creator Profile Mini Card - 20px rounded */}
      <div className="rounded-[20px] border border-white/[0.08] bg-[#0E1322]/80 p-3.5 mb-5 flex items-center gap-3 shadow-glass-subtle">
        <div className="relative">
          <img
            src={activeCreator?.avatarUrl}
            alt={activeCreator?.name}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-royal-500/80"
          />
          <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-[#0E1322]" />
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-1">
            <h4 className="font-semibold text-xs text-white truncate">{activeCreator?.name}</h4>
            {activeCreator?.verified && <ShieldCheck className="h-3.5 w-3.5 text-royal-400 shrink-0" />}
          </div>
          <p className="text-[11px] text-royal-400 font-mono truncate">/{activeCreator?.username}</p>
        </div>
        <Link
          href={`/${activeCreator?.username}`}
          target="_blank"
          title="Open live bio-storefront"
          className="p-1.5 rounded-xl bg-white/[0.04] hover:bg-royal-600/20 text-slate-400 hover:text-royal-400 transition btn-press"
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Navigation List */}
      <div className="space-y-1 flex-1">
        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Studio Navigation
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between rounded-[14px] px-3.5 py-2.5 text-xs font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-royal-600 text-white shadow-royal font-semibold'
                  : 'text-slate-400 hover:bg-white/[0.05] hover:text-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : item.highlight ? 'text-royal-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                  isActive ? 'bg-white/20 text-white' : 'bg-royal-600/15 text-royal-400 border border-royal-500/30'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        {/* ========================================================================= */}
        {/* MEMBERSHIPS FEATURED SIDEBAR ITEM / WIDGET */}
        {/* ========================================================================= */}
        <div className="pt-4 pb-2 space-y-2.5">
          {/* Header row: Memberships & Upgrade */}
          <div className="flex items-center justify-between px-1">
            <Link 
              href="/dashboard/memberships" 
              className="flex items-center gap-2 text-white font-bold text-xs hover:text-royal-400 transition"
            >
              <Users className="h-4 w-4 text-blue-500" />
              <span>Memberships</span>
            </Link>
            <Link
              href="/dashboard/memberships"
              className="flex items-center gap-1 text-[11px] font-semibold text-sky-400 hover:text-sky-300 transition"
            >
              <Sparkles className="h-3.5 w-3.5 text-sky-400" />
              <span>Upgrade</span>
            </Link>
          </div>

          {/* Action row: New Plan button */}
          <div className="flex justify-end">
            <Link
              href="/dashboard/memberships"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold transition shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              <span>New Plan</span>
            </Link>
          </div>

          {/* Membership Plan Card */}
          <Link
            href="/dashboard/memberships"
            className="block rounded-2xl border border-white/[0.12] bg-[#05070D] hover:border-royal-500/50 p-4 transition shadow-xl space-y-2.5 group relative"
          >
            <div className="flex items-center gap-2">
              <h5 className="font-bold text-white text-sm group-hover:text-royal-300 transition">
                {goldPlan.name}
              </h5>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950/90 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                {goldPlan.badgeText || 'Popular'}
              </span>
            </div>

            <div className="text-xl font-extrabold text-white font-display">
              ₹{monthlyPrice}/month
            </div>

            <p className="text-xs text-slate-200 font-medium leading-snug">
              {goldPlan.tagline || 'Community • Courses • Live Q&A'}
            </p>

            <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.08] text-xs">
              <div className="flex items-center gap-1.5 text-slate-300 font-medium">
                <Users className="h-3.5 w-3.5 text-slate-400" />
                <span>{memberCount} Members</span>
              </div>
              <div className="font-extrabold text-white font-mono text-xs sm:text-sm">
                ₹{formatINR(totalMRR)} MRR
              </div>
            </div>
          </Link>
        </div>

        <div className="pt-2 space-y-1">
          <Link
            href="/onboarding"
            className="flex items-center justify-between rounded-[14px] px-3.5 py-2.5 text-xs font-semibold text-royal-400 bg-royal-600/10 border border-royal-500/25 hover:bg-royal-600/20 transition"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span>Onboarding Wizard</span>
            </div>
            <span className="text-[10px] font-mono bg-royal-600/30 text-royal-300 px-1.5 py-0.5 rounded">3 Steps</span>
          </Link>

          <SignedIn>
            <SignOutButton redirectUrl="/">
              <button className="w-full flex items-center gap-2.5 rounded-[14px] px-3.5 py-2 text-xs font-medium text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 border border-transparent hover:border-rose-500/20 transition">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>

      {/* Instant IMPS Payout Status Box - 20px rounded */}
      <div className="mt-auto space-y-2 pt-3">
        <div className="rounded-[20px] border border-royal-500/25 bg-gradient-to-b from-[#0E1529] to-[#080C18] p-3.5 text-xs shadow-glass-subtle">
          <div className="flex items-center justify-between text-royal-400 font-semibold text-[11px] mb-1">
            <span className="flex items-center gap-1.5">
              <Zap className="h-3 w-3 fill-royal-400 text-royal-400" />
              <span>UPI Settlement Active</span>
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <p className="text-[11px] text-slate-300 truncate">
            <span className="text-slate-400">Bank:</span> <span className="font-mono text-white font-medium">{activeCreator?.bankAccount.bankName}</span>
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5 font-mono truncate">
            {activeCreator?.bankAccount.accountNumberMasked}
          </p>
        </div>
      </div>

    </aside>
  );
}
