'use client';

import React from 'react';

export default function GlobalRootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#05070B] text-slate-100 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full rounded-[24px] border border-white/[0.12] bg-[#0A0E1A] p-8 shadow-2xl text-center space-y-4">
          <div className="h-14 w-14 rounded-full bg-royal-600/20 text-royal-400 border border-royal-500/30 flex items-center justify-center mx-auto text-xl font-bold">
            ⚡
          </div>
          <h2 className="text-xl font-bold text-white">Application Error</h2>
          <p className="text-xs text-slate-400">
            {error?.message || 'An error occurred.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => reset()}
              className="rounded-[14px] bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-bold text-white transition"
            >
              Reload Page
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
