'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut, UserButton } from '@/components/auth/SafeAuth';
import { useCreatorStore } from '@/lib/store';
import { useTheme } from '@/components/ui/ThemeProvider';
import { 
  LayoutDashboard, 
  Zap, 
  ArrowUpRight,
  Sun,
  Moon,
  LogIn
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { activeCreator } = useCreatorStore();
  const { theme, toggleTheme } = useTheme();

  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#05070B]/90 backdrop-blur-2xl transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo - Linear/Stripe Inspired */}
        <div className="flex items-center gap-6 lg:gap-8 shrink-0">
          <Link href="/" className="group flex items-center gap-2.5 shrink-0">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-[12px] bg-gradient-to-b from-royal-500 to-royal-700 shadow-royal group-hover:scale-105 transition-all duration-300 shrink-0">
              <Zap className="h-4 w-4 text-white fill-white" />
              <div className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 text-[8px] font-black text-black ring-2 ring-[#05070B]">
                •
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-lg font-bold tracking-tight text-white">
                  Creator<span className="text-royal-400">OS</span>
                </span>
                <span className="rounded-full bg-royal-600/15 px-2 py-0.5 text-[9px] font-bold text-royal-400 border border-royal-500/30 tracking-wider font-mono">
                  BHARAT
                </span>
              </div>
            </div>
          </Link>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 pl-2">
            <Link 
              href="/#features" 
              className="rounded-xl px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors whitespace-nowrap"
            >
              Features
            </Link>
            <Link 
              href="/#pricing" 
              className="rounded-xl px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors whitespace-nowrap"
            >
              Pricing
            </Link>
            <SignedIn>
              <Link 
                href={`/${activeCreator?.username || 'aarav.tech'}`}
                target="_blank"
                className="rounded-xl px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors flex items-center gap-1 whitespace-nowrap"
              >
                <span>Live Storefront</span>
                <ArrowUpRight className="h-3 w-3 text-royal-400" />
              </Link>
            </SignedIn>
          </nav>
        </div>

        {/* Right side - Theme Toggle, Switcher, Clerk Auth & CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Theme Sun/Moon Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="flex h-9 w-9 items-center justify-center rounded-[12px] border border-white/[0.1] bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white hover:border-royal-500/40 transition-all duration-300 btn-press shrink-0 cursor-pointer"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 text-royal-500 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* CLERK & RESILIENT AUTHENTICATION ACTIONS */}
          <SignedIn>
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-[14px] bg-gradient-to-r from-royal-600 to-royal-700 px-4 py-2 text-xs font-semibold text-white shadow-royal hover:brightness-110 transition btn-press whitespace-nowrap shrink-0"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                <span>{isDashboard ? 'Studio Active' : 'Studio'}</span>
              </Link>
              
              <UserButton 
                afterSignOutUrl="/"
                userProfileMode="navigation"
                userProfileUrl="/dashboard/profile"
              />
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-1.5">
              <Link
                href="/sign-in"
                className="flex items-center gap-1.5 rounded-[14px] border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] px-3.5 py-2 text-xs font-medium text-slate-200 hover:text-white transition btn-press whitespace-nowrap shrink-0"
              >
                <LogIn className="h-3.5 w-3.5 text-royal-400" />
                <span>Sign In</span>
              </Link>

              <Link
                href="/sign-up"
                className="flex items-center gap-2 rounded-[14px] bg-gradient-to-r from-royal-600 to-royal-700 px-4 py-2 text-xs font-semibold text-white shadow-royal hover:brightness-110 transition btn-press whitespace-nowrap shrink-0"
              >
                <span>Get Started</span>
              </Link>
            </div>
          </SignedOut>

        </div>

      </div>
    </header>
  );
}
