'use client';

import React, { useState } from 'react';
import { useCreatorStore } from '@/lib/store';
import { User, Plus, X, ArrowRight, ShieldCheck, Check } from 'lucide-react';

interface GoogleAccountChooserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAccount: (account: { name: string; email: string; avatarUrl?: string; isNew?: boolean }) => void;
  title?: string;
}

export default function GoogleAccountChooserModal({
  isOpen,
  onClose,
  onSelectAccount,
  title = 'Sign in with Google'
}: GoogleAccountChooserModalProps) {
  const { creators, activeCreator } = useCreatorStore();
  const [showNewAccountForm, setShowNewAccountForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Build accounts list from creators or defaults
  const existingAccounts = creators.map((c) => ({
    name: c.name,
    email: c.email || `${c.username}@gmail.com`,
    avatarUrl: c.avatarUrl,
    creatorId: c.id
  }));

  const handleSelectExisting = (acc: (typeof existingAccounts)[0]) => {
    onSelectAccount({
      name: acc.name,
      email: acc.email,
      avatarUrl: acc.avatarUrl,
      isNew: false
    });
  };

  const handleCreateNewAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) {
      setError('Please enter a valid Gmail address');
      return;
    }
    if (!newEmail.includes('@')) {
      setError('Please include @ in email address');
      return;
    }

    const name = newName.trim() || newEmail.split('@')[0];
    onSelectAccount({
      name,
      email: newEmail.trim().toLowerCase(),
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80`,
      isNew: true
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-md rounded-[24px] border border-white/[0.15] bg-[#0E121E] p-6 shadow-2xl z-10 space-y-5 animate-scale-in text-slate-100">
        
        {/* Header with Google branding */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-2 shadow-md">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
            </div>
            <div>
              <h3 className="font-display text-base font-bold text-white">
                Choose an account
              </h3>
              <p className="text-[11px] text-slate-400">
                to continue to <span className="text-white font-medium">CreatorOS Bharat</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/[0.08] transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* OAuth prompt notification notice */}
        <div className="rounded-xl bg-royal-600/10 border border-royal-500/20 px-3 py-2 text-[11px] text-royal-300 flex items-center justify-between font-mono">
          <span>prompt = select_account</span>
          <span className="text-emerald-400 text-[10px]">OAuth Account Chooser</span>
        </div>

        {!showNewAccountForm ? (
          <div className="space-y-2">
            {/* List of existing Google Accounts */}
            <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
              {existingAccounts.map((acc, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectExisting(acc)}
                  className="w-full flex items-center gap-3.5 p-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-royal-500/40 transition text-left group btn-press"
                >
                  <img
                    src={acc.avatarUrl || '/avatars/user-avatar.png'}
                    alt={acc.name}
                    className="h-10 w-10 rounded-full object-cover ring-1 ring-white/10 shrink-0"
                  />
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-white group-hover:text-royal-300 truncate transition">
                        {acc.name}
                      </span>
                      {acc.creatorId === activeCreator?.id && (
                        <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded font-mono">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">{acc.email}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-royal-400 group-hover:translate-x-0.5 transition" />
                </button>
              ))}
            </div>

            {/* Option to Use Another Account (New User Signup) */}
            <button
              onClick={() => setShowNewAccountForm(true)}
              className="w-full flex items-center gap-3.5 p-3 rounded-2xl border border-dashed border-white/[0.15] bg-white/[0.02] hover:bg-white/[0.06] hover:border-royal-500/50 transition text-left group btn-press mt-2"
            >
              <div className="h-10 w-10 rounded-full bg-royal-600/20 border border-royal-500/30 flex items-center justify-center text-royal-400 shrink-0 group-hover:scale-105 transition">
                <Plus className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <span className="text-xs font-semibold text-slate-200 group-hover:text-white">
                  Use another Google account
                </span>
                <p className="text-[10px] text-slate-400">
                  Create a new CreatorOS account with a different Gmail
                </p>
              </div>
            </button>
          </div>
        ) : (
          /* Form to type a new Google Account */
          <form onSubmit={handleCreateNewAccount} className="space-y-3.5 animate-fade-in">
            <div className="text-xs text-slate-300 font-medium">
              Enter your Google Account details:
            </div>

            {error && (
              <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-2.5 text-xs text-rose-400">
                {error}
              </div>
            )}

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Ananya Verma"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full rounded-[12px] border border-white/[0.12] bg-[#05070B] px-3.5 py-2 text-xs text-white placeholder:text-slate-600 focus:border-royal-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Gmail Address</label>
              <input
                type="email"
                required
                placeholder="e.g. ananya.verma@gmail.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full rounded-[12px] border border-white/[0.12] bg-[#05070B] px-3.5 py-2 text-xs text-white placeholder:text-slate-600 focus:border-royal-500 focus:outline-none transition"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setShowNewAccountForm(false)}
                className="flex-1 rounded-[12px] border border-white/[0.1] bg-white/[0.04] py-2 text-xs font-semibold text-slate-300 hover:bg-white/[0.08] transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 rounded-[12px] bg-royal-600 hover:bg-royal-500 py-2 text-xs font-bold text-white shadow-royal transition btn-press flex items-center justify-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        )}

        {/* Footer info */}
        <div className="pt-2 border-t border-white/[0.08] text-center text-[10px] text-slate-500 font-sans">
          To continue, Google will share your name, email address, and profile picture with CreatorOS Bharat.
        </div>

      </div>
    </div>
  );
}
