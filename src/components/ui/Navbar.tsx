'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCreatorStore } from '@/lib/store';
import { useTheme } from '@/components/ui/ThemeProvider';
import { 
  Sparkles, 
  ExternalLink, 
  LayoutDashboard, 
  ChevronDown, 
  ShoppingBag, 
  Zap, 
  ShieldCheck, 
  UserCheck,
  Layers,
  ArrowUpRight,
  Sun,
  Moon
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { creators, activeCreator, switchActiveCreator } = useCreatorStore();
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#05070B]/90 dark:bg-[#05070B]/90 light:bg-white/90 backdrop-blur-2xl transition-colors duration-300">
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

          {/* Navigation Links (Desktop) - Linear Clean Menu */}
          <nav className="hidden md:flex items-center gap-1 pl-2">
            <Link 
              href="/#features" 
              className="rounded-xl px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors whitespace-nowrap"
            >
              Features
            </Link>
            <Link 
              href="/dashboard/storefront-builder" 
              className="rounded-xl px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors whitespace-nowrap"
            >
              Storefront Builder
            </Link>
            <Link 
              href="/dashboard/gst-invoices" 
              className="rounded-xl px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors whitespace-nowrap"
            >
              GST Invoicing
            </Link>
            <Link 
              href="/dashboard/media-kit" 
              className="rounded-xl px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors whitespace-nowrap"
            >
              AI Media Kit
            </Link>
            <Link 
              href="/dashboard/marketplace" 
              className="rounded-xl px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Brand Deals</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </Link>
          </nav>
        </div>

        {/* Right side - Theme Toggle, Switcher & CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Theme Sun/Moon Toggle Button */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="flex h-9 w-9 items-center justify-center rounded-[12px] border border-white/[0.1] bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white hover:border-royal-500/40 transition-all duration-300 btn-press"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 text-royal-400 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* Active Creator Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-xs text-slate-200 hover:border-royal-500/40 hover:bg-white/[0.08] transition btn-press shrink-0"
            >
              <img 
                src={activeCreator?.avatarUrl} 
                alt={activeCreator?.name} 
                className="h-6 w-6 rounded-full object-cover shrink-0 ring-1 ring-royal-500"
              />
              <span className="font-medium hidden sm:inline text-white whitespace-nowrap">{activeCreator?.name}</span>
              <span className="text-slate-400 font-mono text-[11px] whitespace-nowrap hidden lg:inline">@{activeCreator?.username}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            </button>

            {dropdownOpen && (
              <>
                {/* Backdrop overlay to close on outside click */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setDropdownOpen(false)} 
                />

                <div 
                  className="absolute right-0 top-full mt-2 w-72 rounded-[20px] glass-dropdown p-2 shadow-2xl z-50 border border-white/[0.12] animate-scale-in"
                  onClick={() => setDropdownOpen(false)}
                >
                  <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Switch Creator Persona</span>
                    <span className="text-royal-400 font-mono">Demo Store</span>
                  </div>
                  {creators.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => switchActiveCreator(c.id)}
                      className={`w-full flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-xs transition ${
                        c.id === activeCreator?.id 
                          ? 'bg-royal-600/20 text-white border border-royal-500/30' 
                          : 'text-slate-300 hover:bg-white/[0.06] hover:text-white'
                      }`}
                    >
                      <img src={c.avatarUrl} alt={c.name} className="h-8 w-8 rounded-full object-cover shrink-0 ring-1 ring-white/10" />
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center gap-1">
                          <span className="font-semibold truncate text-white">{c.name}</span>
                          {c.verified && <ShieldCheck className="h-3.5 w-3.5 text-royal-400 shrink-0" />}
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">{c.category}</p>
                      </div>
                      {c.id === activeCreator?.id && <UserCheck className="h-4 w-4 text-royal-400 shrink-0" />}
                    </button>
                  ))}

                  <div className="mt-2 pt-2 border-t border-white/[0.08]">
                    <Link
                      href="/onboarding"
                      className="w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-royal-400 hover:bg-royal-600/10 transition"
                    >
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Launch Onboarding Wizard</span>
                      </span>
                      <span className="text-[10px] font-mono bg-royal-600/20 px-1.5 py-0.5 rounded">3 Steps</span>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* View Live Bio-link storefront button */}
          <Link
            href={`/${activeCreator?.username}`}
            target="_blank"
            className="flex items-center gap-1.5 rounded-[14px] border border-white/[0.1] bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-white/[0.08] hover:border-white/[0.2] transition btn-press shadow-sm whitespace-nowrap shrink-0"
          >
            <span className="hidden sm:inline">Storefront</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-royal-400" />
          </Link>

          {/* Creator Studio Link */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-[14px] bg-gradient-to-r from-royal-600 to-royal-700 px-4 py-2 text-xs font-semibold text-white shadow-royal hover:brightness-110 transition btn-press whitespace-nowrap shrink-0"
          >
            <LayoutDashboard className="h-3.5 w-3.5" />
            <span>{isDashboard ? 'Studio Active' : 'Studio'}</span>
          </Link>

        </div>

      </div>
    </header>
  );
}
