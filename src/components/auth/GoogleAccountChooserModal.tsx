'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreatorStore } from '@/lib/store';
import { UserPlus, X, Minus, Square, ExternalLink, Shield, Check, Lock, ArrowRight, Sparkles } from 'lucide-react';

interface GoogleAccount {
  id: string;
  name: string;
  email: string;
  avatarBg: string;
  avatarColor: string;
}

const DEFAULT_GOOGLE_ACCOUNTS: GoogleAccount[] = [
  {
    id: 'google_khushi_1',
    name: 'Khushi',
    email: 'khushi811514@gmail.com',
    avatarBg: '#E65100', // Deep Orange
    avatarColor: '#FFFFFF',
  },
  {
    id: 'google_khushi_2',
    name: 'Khushi',
    email: 'khushi086btcseai23@igdtuw.ac.in',
    avatarBg: '#1565C0', // Blue
    avatarColor: '#FFFFFF',
  },
  {
    id: 'google_khushi_3',
    name: 'Khushi',
    email: 'singhkhushi29785@gmail.com',
    avatarBg: '#00897B', // Teal
    avatarColor: '#FFFFFF',
  },
];

interface GoogleAccountChooserModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'sign-up' | 'sign-in';
}

export default function GoogleAccountChooserModal({
  isOpen,
  onClose,
  mode = 'sign-up',
}: GoogleAccountChooserModalProps) {
  const router = useRouter();
  const { creators, switchActiveCreator, updateCreator, setDemoMode } = useCreatorStore();

  const [accounts, setAccounts] = useState<GoogleAccount[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('creatoros_google_accounts');
        if (saved) return JSON.parse(saved);
      } catch (e) {}
    }
    return DEFAULT_GOOGLE_ACCOUNTS;
  });

  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [selectingEmail, setSelectingEmail] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectAccount = (account: GoogleAccount) => {
    setSelectingEmail(account.email);
    setDemoMode(false);

    setTimeout(() => {
      const cleanEmail = account.email.toLowerCase().trim();
      const rawUsername = cleanEmail.split('@')[0].replace(/[^a-z0-9_.]/g, '') || 'creator';
      const displayName = account.name || rawUsername;

      // Check if creator already exists
      const existing = creators.find(
        (c) => c.email?.toLowerCase() === cleanEmail || c.username?.toLowerCase() === rawUsername
      );

      if (existing) {
        switchActiveCreator(existing.id);
        router.push(mode === 'sign-up' ? '/onboarding' : '/dashboard');
      } else {
        // Create new dedicated CreatorOS profile for chosen Google account
        const newCreatorId = `user_${Date.now()}`;
        const newCreator = {
          id: newCreatorId,
          username: rawUsername,
          name: displayName,
          tagline: 'Digital Creator & Educator',
          bio: 'Welcome to my official CreatorOS storefront. Check out my digital products, live cohorts, and 1:1 sessions.',
          avatarUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=0f172a,1e293b&textColor=38bdf8`,
          bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
          verified: false,
          category: 'Digital Creator',
          location: 'India',
          state: 'Maharashtra',
          themeId: 'linear-royal',
          upiId: `${rawUsername}@okaxis`,
          upiName: displayName,
          email: cleanEmail,
          bankAccount: {
            accountNumberMasked: '•••• •••• •••• 0000',
            ifsc: 'HDFC0000001',
            bankName: 'HDFC Bank',
          },
          socials: {},
          customLinks: [],
        };

        if (typeof window !== 'undefined') {
          try {
            const saved = localStorage.getItem('creatoros_creators');
            const list = saved ? JSON.parse(saved) : [];
            localStorage.setItem('creatoros_creators', JSON.stringify([...list, newCreator]));
          } catch (e) {}
        }

        updateCreator(newCreator);
        switchActiveCreator(newCreator.id);
        router.push(mode === 'sign-up' ? '/onboarding' : '/dashboard');
      }

      onClose();
    }, 450);
  };

  const handleAddCustomAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail || !customEmail.includes('@')) return;

    const newAcc: GoogleAccount = {
      id: `google_${Date.now()}`,
      name: customName.trim() || customEmail.split('@')[0],
      email: customEmail.trim().toLowerCase(),
      avatarBg: '#673AB7', // Deep Purple
      avatarColor: '#FFFFFF',
    };

    const updated = [...accounts, newAcc];
    setAccounts(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('creatoros_google_accounts', JSON.stringify(updated));
      } catch (e) {}
    }

    handleSelectAccount(newAcc);
  };

  const hostName = typeof window !== 'undefined' ? window.location.host : 'creatoros.in';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in font-sans">
      {/* Chrome Window Container matching Google Native Account Chooser */}
      <div 
        className="w-full max-w-[460px] overflow-hidden rounded-[18px] border border-[#3C4043] bg-[#131314] text-[#E8EAED] shadow-2xl transition-all duration-300 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Google Chrome Top Window Bar */}
        <div className="flex h-10 items-center justify-between border-b border-[#2D2E30] bg-[#1E1F20] px-3.5 select-none">
          <div className="flex items-center gap-2">
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span className="text-xs font-normal text-[#C4C7C5] truncate">
              Sign in - Google Accounts - Google Chrome
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button 
              type="button" 
              onClick={onClose} 
              className="h-6 w-6 rounded flex items-center justify-center text-[#9AA0A6] hover:bg-[#2F3033] hover:text-white transition"
              title="Minimize"
            >
              <Minus className="h-3 w-3" />
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="h-6 w-6 rounded flex items-center justify-center text-[#9AA0A6] hover:bg-[#2F3033] hover:text-white transition"
              title="Maximize"
            >
              <Square className="h-2.5 w-2.5" />
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="h-6 w-6 rounded flex items-center justify-center text-[#9AA0A6] hover:bg-[#D93025] hover:text-white transition"
              title="Close"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Chrome Address / URL Bar */}
        <div className="flex items-center gap-2 border-b border-[#2D2E30] bg-[#1E1F20] px-3.5 py-1.5 select-none text-[11px] text-[#9AA0A6]">
          <Lock className="h-3 w-3 text-[#8AB4F8] shrink-0" />
          <span className="truncate font-mono text-[#8AB4F8]">
            accounts.google.com<span className="text-[#9AA0A6]">/v3/signin/accountchooser?prompt=select_account</span>
          </span>
        </div>

        {/* Content Container */}
        <div className="p-7 space-y-6">
          
          {/* Google Sign-in Header */}
          <div className="flex items-center gap-2.5">
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span className="text-sm font-medium text-[#E8EAED]">Sign in with Google</span>
          </div>

          {/* Title and App Target */}
          <div className="space-y-1.5">
            <h1 className="text-2xl font-normal text-[#E8EAED] tracking-tight">
              Choose an account
            </h1>
            <p className="text-sm text-[#9AA0A6]">
              to continue to <span className="text-[#8AB4F8] font-medium">{hostName}</span>
            </p>
          </div>

          {/* Account Chooser List */}
          {!isAddingAccount ? (
            <div className="space-y-1">
              {accounts.map((acc) => {
                const isSelected = selectingEmail === acc.email;
                const initial = (acc.name || acc.email).charAt(0).toUpperCase();

                return (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleSelectAccount(acc)}
                    disabled={!!selectingEmail}
                    className={`w-full flex items-center gap-3.5 p-3 rounded-[12px] text-left transition duration-150 border ${
                      isSelected
                        ? 'bg-[#2A2B2D] border-[#8AB4F8]/50 ring-1 ring-[#8AB4F8]/40'
                        : 'border-transparent hover:bg-[#1F2021] hover:border-[#3C4043]'
                    }`}
                  >
                    {/* Circle Avatar with Initial */}
                    <div
                      className="h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-inner select-none"
                      style={{ backgroundColor: acc.avatarBg, color: acc.avatarColor }}
                    >
                      {initial}
                    </div>

                    {/* Name and Email */}
                    <div className="flex-1 overflow-hidden">
                      <div className="font-medium text-sm text-[#E8EAED] truncate">
                        {acc.name}
                      </div>
                      <div className="text-xs text-[#9AA0A6] truncate">
                        {acc.email}
                      </div>
                    </div>

                    {isSelected && (
                      <div className="h-4 w-4 rounded-full border-2 border-[#8AB4F8] border-t-transparent animate-spin shrink-0" />
                    )}
                  </button>
                );
              })}

              <div className="pt-2">
                <div className="border-t border-[#2D2E30] my-2" />
                
                {/* Use Another Account Button */}
                <button
                  type="button"
                  onClick={() => setIsAddingAccount(true)}
                  disabled={!!selectingEmail}
                  className="w-full flex items-center gap-3.5 p-3 rounded-[12px] text-left hover:bg-[#1F2021] hover:border-[#3C4043] border border-transparent transition duration-150 text-[#E8EAED]"
                >
                  <div className="h-9 w-9 rounded-full flex items-center justify-center bg-transparent border border-[#5F6368] text-[#9AA0A6] shrink-0">
                    <UserPlus className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">Use another account</span>
                </button>
              </div>
            </div>
          ) : (
            /* Form to add / use custom Gmail */
            <form onSubmit={handleAddCustomAccount} className="space-y-4 pt-1 animate-fade-in">
              <div className="space-y-1">
                <label className="text-xs font-medium text-[#C4C7C5]">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Khushi"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full rounded-[10px] border border-[#3C4043] bg-[#0E0E0E] px-3.5 py-2.5 text-xs text-white placeholder-[#5F6368] focus:border-[#8AB4F8] focus:outline-none transition"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-[#C4C7C5]">Google / Gmail Address</label>
                <input
                  type="email"
                  required
                  placeholder="yourname@gmail.com"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full rounded-[10px] border border-[#3C4043] bg-[#0E0E0E] px-3.5 py-2.5 text-xs text-white placeholder-[#5F6368] focus:border-[#8AB4F8] focus:outline-none transition"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingAccount(false)}
                  className="px-4 py-2 text-xs font-medium text-[#8AB4F8] hover:bg-[#8AB4F8]/10 rounded-[8px] transition"
                >
                  Back to accounts
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-[8px] bg-[#8AB4F8] px-5 py-2 text-xs font-bold text-[#041E49] hover:bg-[#A8C7FA] transition"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
          )}

          {/* Google Legal Disclaimer & Policies */}
          <div className="pt-2 border-t border-[#2D2E30] text-[11px] text-[#9AA0A6] leading-relaxed">
            Before using this app, you can review {hostName}&apos;s{' '}
            <a href="/privacy" target="_blank" className="text-[#8AB4F8] hover:underline">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="/terms" target="_blank" className="text-[#8AB4F8] hover:underline">
              Terms of Service
            </a>
            .
          </div>

        </div>
      </div>
    </div>
  );
}
