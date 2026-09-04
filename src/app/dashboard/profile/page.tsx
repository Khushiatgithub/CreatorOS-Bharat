'use client';

import React from 'react';
import { UserProfile } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { PageTransition } from '@/components/ui/motion';
import { User, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <PageTransition>
      <div className="space-y-6 font-sans">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Account & Security Settings</span>
              <span className="rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 font-mono">
                Clerk Auth
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Manage your email credentials, Google account linkage, multi-factor authentication, and active sessions.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-[14px] bg-white/[0.05] hover:bg-white/[0.09] px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition btn-press self-start sm:self-center"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Studio</span>
          </Link>
        </div>

        {/* Clerk UserProfile Component */}
        <div className="flex justify-center">
          <UserProfile
            appearance={{
              baseTheme: dark,
              elements: {
                card: 'bg-[#0A0D17]/90 border border-white/[0.12] shadow-2xl rounded-[24px] max-w-4xl w-full',
                navbar: 'border-r border-white/[0.08]',
                navbarButton: 'text-slate-300 hover:text-white text-xs',
                navbarButtonActive: 'text-royal-400 font-bold bg-royal-600/15',
                headerTitle: 'text-white font-display font-bold text-base',
                headerSubtitle: 'text-slate-400 text-xs',
                profileSectionTitleText: 'text-white font-semibold text-xs',
                formButtonPrimary: 'bg-royal-600 hover:bg-royal-500 text-white text-xs font-bold rounded-[12px] transition btn-press',
                userButtonPopoverActionButton: 'text-slate-300 hover:text-white text-xs',
                badge: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }
            }}
            routing="hash"
          />
        </div>

      </div>
    </PageTransition>
  );
}
