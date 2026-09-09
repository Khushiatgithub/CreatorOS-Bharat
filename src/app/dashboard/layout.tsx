'use client';

import React, { useEffect } from 'react';
import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/dashboard/Sidebar';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCreatorStore } from '@/lib/store';
import { useSafeAuth } from '@/components/auth/SafeAuth';
import { LayoutDashboard, Palette, FileText, Sparkles, Receipt, AlertCircle, ArrowRight } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { isDemoMode, activeCreator } = useCreatorStore();
  const { isSignedIn, isLoaded } = useSafeAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn && !isDemoMode) {
      router.replace('/');
    }
  }, [isLoaded, isSignedIn, isDemoMode, router]);

  if (isLoaded && !isSignedIn && !isDemoMode) {
    return null;
  }

  const isAaravDemo = isDemoMode || activeCreator?.id === 'creator_aarav';

  return (
    <div className="min-h-screen bg-[#05070B] flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto pb-24 lg:pb-12 p-4 sm:p-6 lg:p-8 bg-[#05070B] bg-grid-subtle">
          <div className="max-w-7xl mx-auto">
            {/* Demo Mode Notice Banner */}
            {isAaravDemo && (
              <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-[16px] border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-900 dark:text-amber-200 backdrop-blur-md animate-fade-in">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-5 px-2 items-center justify-center rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300 font-mono text-[10px] font-bold border border-amber-500/40 shrink-0">
                    Demo Studio
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    Exploring Aarav Sharma (Demo Account)
                  </span>
                  <span className="hidden md:inline text-amber-800/80 dark:text-amber-200/70 text-[11px]">
                    — Full access to products, live GST invoicing, and UPI simulation.
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    href="/sign-up"
                    className="flex items-center gap-1 rounded-[10px] bg-amber-600 dark:bg-amber-500/20 hover:bg-amber-700 dark:hover:bg-amber-500/30 border border-amber-600 dark:border-amber-500/40 px-3 py-1.5 text-[11px] font-semibold text-white dark:text-amber-100 transition whitespace-nowrap btn-press shadow-sm"
                  >
                    <span>Create Your Own Studio</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            )}

            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar - 20px rounded floating dock */}
      <div className="lg:hidden fixed bottom-3 left-3 right-3 z-40 rounded-[20px] border border-white/[0.12] bg-[#0A0D17]/95 backdrop-blur-2xl px-2 py-2 flex items-center justify-around shadow-2xl">
        <Link
          href="/dashboard"
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold py-1.5 px-3 rounded-[14px] transition ${
            pathname === '/dashboard' ? 'text-white bg-royal-600 shadow-royal-sm' : 'text-slate-400'
          }`}
        >
          <LayoutDashboard className="h-4 w-4" />
          <span>Overview</span>
        </Link>
        <Link
          href="/dashboard/storefront-builder"
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold py-1.5 px-3 rounded-[14px] transition ${
            pathname === '/dashboard/storefront-builder' ? 'text-white bg-royal-600 shadow-royal-sm' : 'text-slate-400'
          }`}
        >
          <Palette className="h-4 w-4" />
          <span>Builder</span>
        </Link>
        <Link
          href="/dashboard/products"
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold py-1.5 px-3 rounded-[14px] transition ${
            pathname === '/dashboard/products' ? 'text-white bg-royal-600 shadow-royal-sm' : 'text-slate-400'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Products</span>
        </Link>
        <Link
          href="/dashboard/media-kit"
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold py-1.5 px-3 rounded-[14px] transition ${
            pathname === '/dashboard/media-kit' ? 'text-white bg-royal-600 shadow-royal-sm' : 'text-slate-400'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>Media Kit</span>
        </Link>
        <Link
          href="/dashboard/gst-invoices"
          className={`flex flex-col items-center gap-1 text-[10px] font-semibold py-1.5 px-3 rounded-[14px] transition ${
            pathname === '/dashboard/gst-invoices' ? 'text-white bg-royal-600 shadow-royal-sm' : 'text-slate-400'
          }`}
        >
          <Receipt className="h-4 w-4" />
          <span>GST</span>
        </Link>
      </div>
    </div>
  );
}
