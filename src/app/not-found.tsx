import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full rounded-[24px] border border-white/[0.12] bg-[#0A0E1A] p-8 shadow-2xl text-center space-y-4">
        <span className="text-4xl font-extrabold font-mono text-royal-400">404</span>
        <h2 className="font-display text-xl font-bold text-white">Page Not Found</h2>
        <p className="text-xs text-slate-400">
          The requested creator storefront or dashboard page could not be located.
        </p>
        <div className="pt-2">
          <Link
            href="/dashboard"
            className="inline-block rounded-[14px] bg-royal-600 hover:bg-royal-500 px-6 py-2.5 text-xs font-bold text-white transition shadow-royal"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
