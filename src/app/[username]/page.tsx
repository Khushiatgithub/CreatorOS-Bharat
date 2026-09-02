'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useCreatorStore } from '@/lib/store';
import StorefrontContent from '@/components/storefront/StorefrontContent';
import Link from 'next/link';
import { ArrowLeft, LayoutDashboard, ArrowUpRight } from 'lucide-react';
import { THEMES } from '@/lib/mock-data';

export default function CreatorPublicStorefrontPage() {
  const params = useParams();
  const rawUsername = params?.username as string;
  const username = decodeURIComponent(rawUsername || '');

  const { 
    creators, 
    allProducts, 
    allCourses, 
    allBookingServices 
  } = useCreatorStore();

  const creator = creators.find(
    (c) => c.username.toLowerCase() === username.toLowerCase()
  ) || creators[0];

  const theme = THEMES.find((t) => t.id === creator?.themeId) || THEMES[0];
  const products = allProducts.filter((p) => p.creatorId === creator?.id);
  const courses = allCourses.filter((c) => c.creatorId === creator?.id);
  const bookingServices = allBookingServices.filter((b) => b.creatorId === creator?.id);

  return (
    <div className="min-h-screen bg-[#05070B] relative font-sans">
      
      {/* Top Floating Mini Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#05070B]/85 backdrop-blur-2xl px-4 py-2.5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400">/{creator.username}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </div>

          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-[12px] bg-white/[0.06] hover:bg-white/[0.1] px-3 py-1 text-xs font-semibold text-white transition btn-press"
          >
            <LayoutDashboard className="h-3 w-3 text-royal-400" />
            <span>Studio</span>
          </Link>
        </div>
      </header>

      {/* Main Storefront Content */}
      <main>
        <StorefrontContent
          creator={creator}
          theme={theme}
          products={products}
          courses={courses}
          bookingServices={bookingServices}
          isMobilePreview={false}
        />
      </main>

    </div>
  );
}
