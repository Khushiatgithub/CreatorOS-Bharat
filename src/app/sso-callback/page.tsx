'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthenticateWithRedirectCallback } from '@clerk/nextjs';
import { isRealClerkKey } from '@/components/auth/SafeAuth';
import { useCreatorStore } from '@/lib/store';
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
  const { creators, updateCreator, switchActiveCreator, setDemoMode } = useCreatorStore();
  const [statusMessage, setStatusMessage] = useState('Finalizing your secure session and redirecting to Creator Studio...');

  useEffect(() => {
    if (isClerk) return;

    // Parse Google OAuth redirect response from URL hash or query params
    const parseOAuthParams = async () => {
      try {
        const hash = typeof window !== 'undefined' ? window.location.hash.substring(1) : '';
        const search = typeof window !== 'undefined' ? window.location.search.substring(1) : '';
        const params = new URLSearchParams(hash || search);

        const accessToken = params.get('access_token');
        const idToken = params.get('id_token');

        let googleUser: { email?: string; name?: string; picture?: string } | null = null;

        if (idToken) {
          try {
            // Decode payload of JWT
            const payloadBase64 = idToken.split('.')[1];
            if (payloadBase64) {
              const decoded = JSON.parse(atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/')));
              googleUser = {
                email: decoded.email,
                name: decoded.name,
                picture: decoded.picture
              };
            }
          } catch (e) {
            console.warn('Could not parse id_token payload:', e);
          }
        }

        if (!googleUser && accessToken) {
          try {
            const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${accessToken}` }
            });
            if (res.ok) {
              googleUser = await res.json();
            }
          } catch (e) {
            console.warn('Could not fetch userinfo:', e);
          }
        }

        if (googleUser && googleUser.email) {
          setDemoMode(false);
          const cleanEmail = googleUser.email.toLowerCase().trim();
          const fullName = googleUser.name || cleanEmail.split('@')[0];
          const username = cleanEmail.split('@')[0].replace(/[^a-z0-9_.]/g, '') || 'creator';
          const avatarUrl = googleUser.picture || '/avatars/user-avatar.png';

          const existing = creators.find(
            (c) => c.email?.toLowerCase() === cleanEmail || c.username?.toLowerCase() === username
          );

          const pendingPlan = (typeof window !== 'undefined' ? localStorage.getItem('creatoros_pending_plan') : null) || 'starter';
          const pendingTrialStart = (typeof window !== 'undefined' ? localStorage.getItem('creatoros_trial_start') : null) || (pendingPlan === 'pro_trial' ? new Date().toISOString() : undefined);
          const pendingTrialEnd = (typeof window !== 'undefined' ? localStorage.getItem('creatoros_trial_end') : null) || (pendingPlan === 'pro_trial' ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString() : undefined);

          if (existing) {
            const updatedExisting = {
              ...existing,
              plan: pendingPlan,
              trial_start_date: pendingTrialStart,
              trial_end_date: pendingTrialEnd,
            };
            updateCreator(updatedExisting);
            switchActiveCreator(existing.id);
            router.push('/dashboard');
          } else {
            // New user account creation from selected Google account
            const newCreator = {
              id: `user_${Date.now()}`,
              username: username,
              name: fullName,
              tagline: 'Digital Creator & Educator',
              bio: 'Welcome to my official CreatorOS storefront. Check out my digital products, live cohorts, and 1:1 sessions.',
              avatarUrl: avatarUrl,
              bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
              verified: false,
              category: 'Digital Creator',
              location: 'India',
              state: 'Maharashtra',
              themeId: 'linear-royal',
              upiId: `${username}@okaxis`,
              upiName: fullName,
              email: cleanEmail,
              plan: pendingPlan,
              trial_start_date: pendingTrialStart,
              trial_end_date: pendingTrialEnd,
              bankAccount: {
                accountNumberMasked: '•••• •••• •••• 0000',
                ifsc: 'HDFC0000001',
                bankName: 'HDFC Bank'
              },
              socials: {},
              customLinks: []
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
            router.push('/onboarding');
          }
        } else {
          // Default redirect
          const timer = setTimeout(() => {
            router.push('/dashboard');
          }, 800);
          return () => clearTimeout(timer);
        }
      } catch (err) {
        console.error('SSO Callback error:', err);
        router.push('/dashboard');
      }
    };

    parseOAuthParams();
  }, [isClerk, creators, router, setDemoMode, switchActiveCreator, updateCreator]);

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
            {statusMessage}
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
