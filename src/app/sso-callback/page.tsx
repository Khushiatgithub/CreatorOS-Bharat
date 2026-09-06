'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';
import { isRealClerkKey } from '@/components/auth/SafeAuth';
import { Zap } from 'lucide-react';

function ClerkCallbackWrapper() {
  return (
    <AuthenticateWithRedirectCallback
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/onboarding"
    />
  );
}

export default function SSOCallbackPage() {
  const router = useRouter();
  const isClerk = isRealClerkKey(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  useEffect(() => {
    if (!isClerk) {
      const timer = setTimeout(() => {
        router.push('/dashboard');
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [isClerk, router]);

  return (
    <div className="min-h-screen bg-[#05070B] text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-royal-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="z-10 text-center space-y-4 max-w-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[16px] bg-gradient-to-b from-royal-500 to-royal-700 shadow-royal animate-pulse">
          <Zap className="h-6 w-6 text-white fill-white" />
        </div>

        <div className="space-y-1">
          <h3 className="font-display text-lg font-bold text-white">
            Authenticating with Google
          </h3>
          <p className="text-xs text-slate-400">
            Finalizing your secure session and redirecting to Creator Studio...
          </p>
        </div>

        <div className="flex justify-center pt-2">
          <div className="h-5 w-5 rounded-full border-2 border-royal-500 border-t-transparent animate-spin" />
        </div>

        {isClerk && <ClerkCallbackWrapper />}
      </div>

    </div>
  );
}
