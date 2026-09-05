'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useCreatorStore } from '@/lib/store';
import MembershipPricingSection from '@/components/storefront/MembershipPricingSection';
import Link from 'next/link';
import { ArrowLeft, LayoutDashboard, ArrowUpRight, Crown, ShieldCheck } from 'lucide-react';
import { THEMES } from '@/lib/mock-data';

export default function CreatorPublicMembershipsPage() {
  const params = useParams();
  const rawUsername = params?.username as string;
  const username = decodeURIComponent(rawUsername || '');

  const { creators } = useCreatorStore();

  const creator = creators.find(
    (c) => c.username.toLowerCase() === username.toLowerCase()
  ) || creators[0];

  const theme = THEMES.find((t) => t.id === creator?.themeId) || THEMES[0];

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 relative font-sans">
      
      {/* Top Floating Mini Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#05070B]/85 backdrop-blur-2xl px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            href={`/${creator.username}`}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Storefront</span>
          </Link>

          <div className="flex items-center gap-2">
            <img
              src={creator.avatarUrl}
              alt={creator.name}
              className="h-6 w-6 rounded-full object-cover ring-1 ring-royal-500"
            />
            <span className="text-xs font-bold text-white">{creator.name}</span>
            <span className="text-[11px] font-mono text-royal-400">/memberships</span>
          </div>

          <Link
            href="/dashboard/memberships"
            className="flex items-center gap-1.5 rounded-[12px] bg-royal-600/20 hover:bg-royal-600/30 text-royal-300 border border-royal-500/30 px-3 py-1 text-xs font-semibold transition btn-press"
          >
            <Crown className="h-3 w-3" />
            <span>Studio</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <MembershipPricingSection creator={creator} theme={theme} standalone={true} />
      </main>

    </div>
  );
}
