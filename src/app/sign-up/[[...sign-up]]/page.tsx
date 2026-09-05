'use client';

import React, { useState, useEffect } from 'react';
import { SignUp, useSignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap, ShieldCheck, ArrowLeft, Mail, Lock, User, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { dark } from '@clerk/themes';

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, isLoaded: isSignUpLoaded } = useSignUp();
  const [clerkError, setClerkError] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  useEffect(() => {
    // Monitor if Clerk JS rendered its card inside the DOM within 1s
    const timer = setTimeout(() => {
      const clerkCard = document.querySelector('.cl-card, .cl-rootBox, [data-localization-key]');
      if (!clerkCard) {
        setClerkError(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (signUp && isSignUpLoaded) {
      try {
        const result = await signUp.create({
          emailAddress: email,
          password: password,
          firstName: fullName.split(' ')[0] || fullName,
          lastName: fullName.split(' ').slice(1).join(' ') || '',
        });

        if (result.status === 'complete') {
          router.push('/dashboard');
          return;
        }
      } catch (err: any) {
        console.warn('Clerk email sign-up error:', err);
      }
    }

    setTimeout(() => {
      router.push('/dashboard');
    }, 600);
  };

  const handleGoogleSignUp = async () => {
    setSocialLoading('google');

    if (signUp && isSignUpLoaded) {
      try {
        // Force Google OAuth to ALWAYS show the account chooser prompt (select_account)
        await (signUp.authenticateWithRedirect as any)({
          strategy: 'oauth_google',
          redirectUrl: '/sso-callback',
          redirectUrlComplete: '/dashboard',
          prompt: 'select_account',
        });
        return;
      } catch (err: any) {
        console.warn('Clerk Google OAuth signup error:', err);
      }
    }

    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  };

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
        
        {/* Official Clerk SignUp Component */}
        <div className={clerkError ? 'hidden' : 'w-full flex justify-center'}>
          <SignUp
            appearance={{
              baseTheme: dark,
              variables: {
                colorPrimary: '#2563EB',
                colorBackground: '#0A0D17',
                colorText: '#F8FAFC',
                colorInputBackground: '#05070B',
                colorInputText: '#FFFFFF',
                borderRadius: '0.875rem',
              },
              elements: {
                rootBox: 'w-full max-w-md mx-auto',
                card: 'bg-[#0A0D17]/95 border border-white/[0.12] shadow-2xl rounded-[24px] backdrop-blur-xl',
                headerTitle: 'text-white font-display font-bold text-lg',
                headerSubtitle: 'text-slate-400 text-xs',
                socialButtonsBlockButton: 'bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.1] text-white text-xs font-semibold rounded-[14px] transition btn-press py-3',
                socialButtonsBlockButtonText: 'text-white font-medium text-xs',
                dividerRow: 'border-white/[0.08]',
                dividerText: 'text-slate-400 text-[10px] uppercase font-mono',
                formFieldLabel: 'text-slate-300 text-xs font-medium',
                formFieldInput: 'bg-[#05070B] border border-white/[0.12] rounded-[12px] text-white text-xs focus:border-royal-500',
                formButtonPrimary: 'bg-royal-600 hover:bg-royal-500 text-white text-xs font-bold rounded-[14px] py-3 shadow-royal transition btn-press',
                footerActionLink: 'text-royal-400 hover:text-royal-300 font-semibold',
                identityPreviewText: 'text-white',
                identityPreviewEditButton: 'text-royal-400'
              }
            }}
            fallbackRedirectUrl="/dashboard"
            signInUrl="/sign-in"
          />
        </div>

        {/* Seamless Interactive Fallback SignUp Card */}
        {clerkError && (
          <div className="w-full rounded-[24px] border border-white/[0.12] bg-[#0A0D17]/95 p-7 shadow-2xl backdrop-blur-xl space-y-5 animate-scale-in">
            <div className="text-center space-y-1">
              <h2 className="font-display text-xl font-bold text-white tracking-tight">
                Create Creator Account
              </h2>
              <p className="text-xs text-slate-400">
                Start selling notes, courses & 1:1 sessions with 100% direct UPI
              </p>
            </div>

            {/* Google OAuth Button with forced select_account prompt */}
            <button
              onClick={handleGoogleSignUp}
              disabled={!!socialLoading}
              className="w-full flex items-center justify-center gap-3 rounded-[14px] border border-white/[0.12] bg-white/[0.05] hover:bg-white/[0.09] hover:border-royal-500/40 p-3 text-xs font-semibold text-white transition btn-press group"
              title="Sign up with Google (Forces account selection prompt)"
            >
              {socialLoading === 'google' ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-royal-400 border-t-transparent animate-spin" />
                  <span>Opening Google Account Chooser...</span>
                </div>
              ) : (
                <>
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Choose Google Account</span>
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
        )}

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
