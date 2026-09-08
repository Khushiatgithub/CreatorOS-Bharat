'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSignUp } from '@clerk/nextjs';
import { isRealClerkKey } from '@/components/auth/SafeAuth';
import { useCreatorStore } from '@/lib/store';
import { Zap, ShieldCheck, ArrowLeft, Mail, Lock, User, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

function ClerkSignUpCard() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignUp = async () => {
    if (!isLoaded || !signUp) return;
    setSocialLoading('google');
    setError(null);
    try {
      // Direct Clerk native Google OAuth invocation with Google Account Picker (prompt: select_account)
      await (signUp.authenticateWithRedirect as any)({
        strategy: 'oauth_google',
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/onboarding',
        oidcPrompt: 'select_account',
        prompt: 'select_account',
      });
    } catch (err: any) {
      console.error('Google Sign-Up Error:', err);
      setError(err?.errors?.[0]?.message || 'Google sign-up failed. Please try again.');
      setSocialLoading(null);
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !signUp) return;
    setLoading(true);
    setError(null);
    try {
      const parts = fullName.trim().split(' ');
      const firstName = parts[0] || 'Creator';
      const lastName = parts.slice(1).join(' ') || undefined;

      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.push('/onboarding');
      } else {
        router.push('/onboarding');
      }
    } catch (err: any) {
      console.error('Sign-up error:', err);
      setError(err?.errors?.[0]?.message || 'Could not complete registration. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full rounded-[24px] border border-white/[0.12] bg-[#0A0D17]/95 p-7 shadow-2xl backdrop-blur-xl space-y-5 animate-scale-in">
      <div className="text-center space-y-1">
        <h2 className="font-display text-xl font-bold text-white tracking-tight">
          Create Creator Account
        </h2>
        <p className="text-xs text-slate-400">
          Start selling notes, courses & 1:1 sessions with 100% direct UPI
        </p>
      </div>

      {error && (
        <div className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-400 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Google OAuth Option - Directly invokes Clerk Native Google OAuth */}
      <button
        type="button"
        onClick={handleGoogleSignUp}
        disabled={!!socialLoading || !isLoaded}
        className="w-full flex items-center justify-center gap-3 rounded-[14px] border border-white/[0.12] bg-white/[0.05] hover:bg-white/[0.09] hover:border-royal-500/40 p-3 text-xs font-semibold text-white transition btn-press group"
        title="Sign up with Google Account"
      >
        {socialLoading === 'google' ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border-2 border-royal-400 border-t-transparent animate-spin" />
            <span>Connecting Google Account...</span>
          </div>
        ) : (
          <>
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Sign up with Google</span>
          </>
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 border-t border-white/[0.08]" />
        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">or sign up with email</span>
        <div className="flex-1 border-t border-white/[0.08]" />
      </div>

      {/* Email Form */}
      <form onSubmit={handleEmailSignUp} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              required
              placeholder="Ananya Verma"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-[12px] border border-white/[0.12] bg-[#05070B] pl-10 pr-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-royal-500 focus:outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Email address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="email"
              required
              placeholder="creator@bharat.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-[12px] border border-white/[0.12] bg-[#05070B] pl-10 pr-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-royal-500 focus:outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Create Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-[12px] border border-white/[0.12] bg-[#05070B] pl-10 pr-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-royal-500 focus:outline-none transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || !isLoaded}
          className="w-full flex items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-royal-600 to-royal-700 hover:from-royal-500 hover:to-royal-600 p-3 text-xs font-bold text-white shadow-royal transition btn-press mt-2"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              <span>Creating your studio...</span>
            </div>
          ) : (
            <>
              <span>Launch Creator Studio</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {/* Platform Trust Highlights */}
      <div className="pt-2 border-t border-white/[0.08] grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
          <span>0% Transaction Fee</span>
        </div>
        <div className="flex items-center gap-1.5 text-royal-400">
          <Zap className="h-3.5 w-3.5 shrink-0" />
          <span>Instant UPI Payouts</span>
        </div>
      </div>

      {/* Link to Sign In */}
      <div className="text-center text-xs text-slate-400 pt-1">
        <span>Already have an account? </span>
        <Link href="/sign-in" className="text-royal-400 hover:text-royal-300 font-semibold underline underline-offset-2">
          Sign in
        </Link>
      </div>
    </div>
  );
}

function ResilientSignUpCard() {
  const router = useRouter();
  const { switchActiveCreator, updateCreator, setDemoMode } = useCreatorStore();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const handleGoogleDirect = () => {
    setSocialLoading('google');
    setTimeout(() => {
      setDemoMode(false);
      const newCreator = {
        id: `user_${Date.now()}`,
        username: 'my_creator_studio',
        name: 'My Creator Studio',
        tagline: 'Digital Creator & Educator',
        bio: 'Welcome to my official CreatorOS storefront. Check out my digital products, live cohorts, and 1:1 sessions.',
        avatarUrl: '/avatars/user-avatar.png',
        bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        verified: false,
        category: 'Digital Creator',
        location: 'India',
        state: 'Maharashtra',
        themeId: 'linear-royal',
        upiId: 'creator@okaxis',
        upiName: 'Creator',
        email: 'creator@bharat.in',
        bankAccount: {
          accountNumberMasked: '•••• •••• •••• 0000',
          ifsc: 'HDFC0000001',
          bankName: 'HDFC Bank'
        },
        socials: {},
        customLinks: []
      };
      updateCreator(newCreator);
      switchActiveCreator(newCreator.id);
      router.push('/onboarding');
    }, 400);
  };

  const handleEmailSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setDemoMode(false);
      const cleanEmail = email.trim().toLowerCase();
      const username = cleanEmail.split('@')[0].replace(/[^a-z0-9_.]/g, '') || 'creator';
      const newCreator = {
        id: `user_${Date.now()}`,
        username: username,
        name: fullName.trim() || username,
        tagline: 'Digital Creator & Educator',
        bio: 'Welcome to my official CreatorOS storefront. Check out my digital products, live cohorts, and 1:1 sessions.',
        avatarUrl: '/avatars/user-avatar.png',
        bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        verified: false,
        category: 'Digital Creator',
        location: 'India',
        state: 'Maharashtra',
        themeId: 'linear-royal',
        upiId: `${username}@okaxis`,
        upiName: fullName.trim() || username,
        email: cleanEmail,
        bankAccount: {
          accountNumberMasked: '•••• •••• •••• 0000',
          ifsc: 'HDFC0000001',
          bankName: 'HDFC Bank'
        },
        socials: {},
        customLinks: []
      };
      updateCreator(newCreator);
      switchActiveCreator(newCreator.id);
      router.push('/onboarding');
    }, 400);
  };

  return (
    <div className="w-full rounded-[24px] border border-white/[0.12] bg-[#0A0D17]/95 p-7 shadow-2xl backdrop-blur-xl space-y-5 animate-scale-in">
      <div className="text-center space-y-1">
        <h2 className="font-display text-xl font-bold text-white tracking-tight">
          Create Creator Account
        </h2>
        <p className="text-xs text-slate-400">
          Start selling notes, courses & 1:1 sessions with 100% direct UPI
        </p>
      </div>

      {/* Google OAuth Option */}
      <button
        type="button"
        onClick={handleGoogleDirect}
        disabled={!!socialLoading}
        className="w-full flex items-center justify-center gap-3 rounded-[14px] border border-white/[0.12] bg-white/[0.05] hover:bg-white/[0.09] hover:border-royal-500/40 p-3 text-xs font-semibold text-white transition btn-press group"
        title="Sign up with Google Account"
      >
        {socialLoading === 'google' ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border-2 border-royal-400 border-t-transparent animate-spin" />
            <span>Connecting Google Account...</span>
          </div>
        ) : (
          <>
            <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Sign up with Google</span>
          </>
        )}
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 border-t border-white/[0.08]" />
        <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500">or sign up with email</span>
        <div className="flex-1 border-t border-white/[0.08]" />
      </div>

      {/* Email Form */}
      <form onSubmit={handleEmailSignUp} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              required
              placeholder="Ananya Verma"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-[12px] border border-white/[0.12] bg-[#05070B] pl-10 pr-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-royal-500 focus:outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Email address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="email"
              required
              placeholder="creator@bharat.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-[12px] border border-white/[0.12] bg-[#05070B] pl-10 pr-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-royal-500 focus:outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">Create Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-[12px] border border-white/[0.12] bg-[#05070B] pl-10 pr-3.5 py-2.5 text-xs text-white placeholder:text-slate-600 focus:border-royal-500 focus:outline-none transition"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-royal-600 to-royal-700 hover:from-royal-500 hover:to-royal-600 p-3 text-xs font-bold text-white shadow-royal transition btn-press mt-2"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              <span>Creating your studio...</span>
            </div>
          ) : (
            <>
              <span>Launch Creator Studio</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {/* Platform Trust Highlights */}
      <div className="pt-2 border-t border-white/[0.08] grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
          <span>0% Transaction Fee</span>
        </div>
        <div className="flex items-center gap-1.5 text-royal-400">
          <Zap className="h-3.5 w-3.5 shrink-0" />
          <span>Instant UPI Payouts</span>
        </div>
      </div>

      {/* Link to Sign In */}
      <div className="text-center text-xs text-slate-400 pt-1">
        <span>Already have an account? </span>
        <Link href="/sign-in" className="text-royal-400 hover:text-royal-300 font-semibold underline underline-offset-2">
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  const isClerk = isRealClerkKey(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-royal-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-royal-500/10 rounded-full blur-[100px] pointer-events-none" />

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
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Create your creator account and launch your UPI bio-store in 3 minutes.
        </p>
      </div>

      {/* Main Authentication Card */}
      <div className="z-10 w-full max-w-md flex justify-center">
        {isClerk ? <ClerkSignUpCard /> : <ResilientSignUpCard />}
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
