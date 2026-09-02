'use client';

import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Sidebar from '@/components/dashboard/Sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Palette, FileText, Sparkles, Receipt } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#05070B] flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto pb-24 lg:pb-12 p-4 sm:p-6 lg:p-8 bg-[#05070B] bg-grid-subtle">
          <div className="max-w-7xl mx-auto">
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
