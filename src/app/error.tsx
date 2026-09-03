'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full rounded-[24px] border border-white/[0.12] bg-[#0A0E1A] p-8 shadow-2xl text-center space-y-4">
        <div className="h-14 w-14 rounded-full bg-royal-600/20 text-royal-400 border border-royal-500/30 flex items-center justify-center mx-auto text-xl font-bold">
          ⚡
        </div>
        <h2 className="font-display text-xl font-bold text-white">Something went wrong</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          {error?.message || 'An unexpected error occurred while loading this view.'}
        </p>
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-5 py-2.5 text-xs font-bold text-white transition"
          >
            Try Again
          </button>
          <Link
            href="/dashboard"
            className="rounded-[14px] bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] px-5 py-2.5 text-xs font-semibold text-slate-300 transition"
          >
            Go to Studio
          </Link>
        </div>
      </div>
    </div>
  );
}
