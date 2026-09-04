'use client';

import React from 'react';
import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { Zap, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';
import { dark } from '@clerk/themes';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-royal-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Header Logo */}
      <div className="mb-6 text-center space-y-2 z-10">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-[14px] bg-gradient-to-b from-royal-500 to-royal-700 shadow-royal group-hover:scale-105 transition duration-300">
            <Zap className="h-5 w-5 text-white fill-white" />
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-white">
            Creator<span className="text-royal-400">OS</span> <span className="text-xs bg-royal-600/20 text-royal-300 border border-royal-500/30 px-2 py-0.5 rounded-full font-mono font-bold">BHARAT</span>
          </span>
        </Link>
        <p className="text-xs text-slate-400">
          Create your creator account and launch your UPI bio-store in 3 minutes.
        </p>
      </div>

      {/* Clerk SignUp Component Container */}
      <div className="z-10 w-full max-w-md flex justify-center">
        <SignUp
          appearance={{
            baseTheme: dark,
            elements: {
              card: 'bg-[#0A0D17]/95 border border-white/[0.12] shadow-2xl rounded-[24px] backdrop-blur-xl',
              headerTitle: 'text-white font-display font-bold text-lg',
              headerSubtitle: 'text-slate-400 text-xs',
              socialButtonsBlockButton: 'bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.1] text-white text-xs font-semibold rounded-[14px] transition btn-press',
              socialButtonsBlockButtonText: 'text-white font-medium text-xs',
              dividerRow: 'border-white/[0.08]',
              dividerText: 'text-slate-400 text-[10px] uppercase font-mono',
              formFieldLabel: 'text-slate-300 text-xs font-medium',
              formFieldInput: 'bg-black/50 border border-white/[0.12] rounded-[12px] text-white text-xs focus:border-royal-500',
              formButtonPrimary: 'bg-royal-600 hover:bg-royal-500 text-white text-xs font-bold rounded-[14px] py-3 shadow-royal transition btn-press',
              footerActionLink: 'text-royal-400 hover:text-royal-300 font-semibold',
              identityPreviewText: 'text-white',
              identityPreviewEditButton: 'text-royal-400'
            }
          }}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          afterSignUpUrl="/onboarding"
        />
      </div>

      {/* Trust & Back to Home */}
      <div className="mt-6 text-center z-10 space-y-3 text-xs text-slate-400 font-mono">
        <div className="flex items-center justify-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Zero Platform Commission • 100% Direct UPI Payouts</span>
        </div>
        <div>
          <Link href="/" className="text-slate-400 hover:text-white inline-flex items-center gap-1 font-sans">
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to CreatorOS Homepage</span>
          </Link>
        </div>
      </div>

    </div>
  );
}
