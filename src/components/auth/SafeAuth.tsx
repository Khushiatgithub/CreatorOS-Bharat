'use client';

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ClerkProvider, SignedIn as ClerkSignedIn, SignedOut as ClerkSignedOut, UserButton as ClerkUserButton, SignOutButton as ClerkSignOutButton, useUser as useClerkUser, useClerk } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useCreatorStore } from '@/lib/store';
import { 
  User, 
  LogOut, 
  LayoutDashboard, 
  Bot, 
  Settings, 
  ShieldCheck, 
  ChevronDown, 
  ExternalLink,
  Sparkles,
  Zap,
  Camera
} from 'lucide-react';

/**
 * Completely clears all local auth tokens, session states, and browser cookies.
 */
export function clearAllAuthSessions() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('creatoros_demo_mode');
      localStorage.removeItem('creatoros_active_creator_id');
      localStorage.removeItem('creatoros_session');
      localStorage.removeItem('creatoros_user');
      localStorage.removeItem('creatoros_auth');
      localStorage.removeItem('creatoros_onboarding_step');
      sessionStorage.removeItem('creatoros_demo_mode');
      sessionStorage.removeItem('creatoros_active_creator_id');
      sessionStorage.clear();

      if (typeof document !== 'undefined' && document.cookie) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf('=');
          const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
          if (name) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`;
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname};`;
          }
        }
      }
    } catch (e) {
      console.warn('Error clearing auth sessions:', e);
    }
  }
}

/**
 * Log into Demo Studio as Aarav Sharma (or specific demo creator).
 * Activates demo mode and dispatches cross-component synchronization events.
 */
export function loginAsDemoCreator(creatorId: string = 'creator_aarav') {
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem('creatoros_demo_mode', 'true');
      sessionStorage.setItem('creatoros_active_creator_id', creatorId);
      localStorage.setItem('creatoros_demo_mode', 'true');
      localStorage.setItem('creatoros_active_creator_id', creatorId);
      window.dispatchEvent(new Event('creatoros_auth_updated'));
      window.dispatchEvent(new Event('creatoros_store_updated'));
      window.dispatchEvent(new Event('storage'));
    } catch (e) {
      console.warn('Demo login storage error:', e);
    }
  }
}

/**
 * Validates whether the provided Clerk key is a genuine, active Clerk Publishable Key
 * or a placeholder / mock key that should run in demo resilient mode.
 */
export function isRealClerkKey(key?: string): boolean {
  if (!key || typeof key !== 'string') return false;
  const trimmed = key.trim();
  if (
    trimmed === '' ||
    trimmed === 'pk_test_Y3JlYXRvcm9zLWJoYXJhdC5jbGVyay5hY2NvdW50cy5kZXYk' ||
    trimmed.includes('your_clerk_') ||
    trimmed.includes('test_fallback') ||
    trimmed.includes('placeholder') ||
    trimmed.includes('example') ||
    trimmed.includes('demo') ||
    trimmed === 'pk_test_...'
  ) {
    return false;
  }
  return trimmed.startsWith('pk_test_') || trimmed.startsWith('pk_live_');
}

interface SafeAuthContextType {
  isClerkEnabled: boolean;
  isSignedIn: boolean;
  isLoaded: boolean;
  user: {
    id: string;
    fullName: string;
    email: string;
    imageUrl: string;
    username: string;
  } | null;
  signOut: () => Promise<void> | void;
  signIn: () => void;
}

const SafeAuthContext = createContext<SafeAuthContextType>({
  isClerkEnabled: false,
  isSignedIn: false,
  isLoaded: false,
  user: null,
  signOut: () => {},
  signIn: () => {},
});

export function useSafeAuth() {
  return useContext(SafeAuthContext);
}

export function useSafeUser() {
  const { user, isLoaded, isSignedIn } = useSafeAuth();
  return { user, isLoaded, isSignedIn };
}

interface SafeClerkProviderProps {
  children: ReactNode;
}

/**
 * Safe Auth Provider that automatically switches between genuine Clerk Enterprise Auth
 * and high-fidelity CreatorOS Resilient Demo Auth mode.
 */
function ClerkAuthBridge({ children }: { children: ReactNode }) {
  const { user: clerkUser, isLoaded, isSignedIn } = useClerkUser();
  const clerk = useClerk();
  const { creators, updateCreator, switchActiveCreator, setDemoMode } = useCreatorStore();
  const router = useRouter();

  // Synchronize Clerk user authentication with CreatorOS Account
  useEffect(() => {
    if (isLoaded && isSignedIn && clerkUser) {
      setDemoMode(false);
      const email = clerkUser.primaryEmailAddress?.emailAddress || '';
      const fullName = clerkUser.fullName || `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'Creator';
      const cleanUsername = clerkUser.username || (email ? email.split('@')[0] : `creator_${clerkUser.id.slice(-6)}`);
      const username = cleanUsername.toLowerCase().replace(/[^a-z0-9_.]/g, '');
      const avatarUrl = clerkUser.imageUrl || '/avatars/user-avatar.png';
      const creatorId = `user_${clerkUser.id}`;

      // Find if this creator already exists
      const existingCreator = creators.find(
        (c) => c.id === creatorId || (email && c.email?.toLowerCase() === email.toLowerCase())
      );

      if (existingCreator) {
        // Existing user: sign into their existing account
        if (existingCreator.id !== creatorId && email && existingCreator.email?.toLowerCase() === email.toLowerCase()) {
          updateCreator({ ...existingCreator, id: creatorId, avatarUrl: existingCreator.avatarUrl || avatarUrl });
        }
        switchActiveCreator(existingCreator.id);
      } else {
        // New user: create their own dedicated CreatorOS account
        const newCreator = {
          id: creatorId,
          username: username,
          name: fullName,
          tagline: 'Digital Creator & Educator',
          bio: 'Welcome to my official CreatorOS storefront. Check out my digital products, cohorts and 1:1 mentorship sessions.',
          avatarUrl: avatarUrl,
          bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
          verified: false,
          category: 'Digital Creator',
          location: 'India',
          state: 'Maharashtra',
          themeId: 'linear-royal',
          upiId: `${username}@okaxis`,
          upiName: fullName,
          email: email,
          bankAccount: {
            accountNumberMasked: '•••• •••• •••• 0000',
            ifsc: 'HDFC0000001',
            bankName: 'HDFC Bank'
          },
          socials: {
            whatsapp: clerkUser.primaryPhoneNumber?.phoneNumber || ''
          },
          customLinks: []
        };

        if (typeof window !== 'undefined') {
          try {
            const saved = localStorage.getItem('creatoros_creators');
            const list = saved ? JSON.parse(saved) : [];
            if (!list.find((c: any) => c.id === creatorId)) {
              localStorage.setItem('creatoros_creators', JSON.stringify([...list, newCreator]));
            }
          } catch (e) {}
        }
        updateCreator(newCreator);
        switchActiveCreator(creatorId);

        // Async persist to PostgreSQL
        fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: fullName,
            email,
            username: newCreator.username,
            bio: newCreator.bio
          })
        }).catch((e) => console.warn('User DB sync error:', e));
      }
    }
  }, [isLoaded, isSignedIn, clerkUser]);

  const user = isSignedIn && clerkUser ? {
    id: clerkUser.id,
    fullName: clerkUser.fullName || `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'Creator',
    email: clerkUser.primaryEmailAddress?.emailAddress || '',
    imageUrl: clerkUser.imageUrl || '/avatars/user-avatar.png',
    username: clerkUser.username || (clerkUser.primaryEmailAddress?.emailAddress ? clerkUser.primaryEmailAddress.emailAddress.split('@')[0] : 'creator'),
  } : null;

  const handleClerkSignOut = async () => {
    clearAllAuthSessions();
    if (setDemoMode) setDemoMode(false);
    if (switchActiveCreator) switchActiveCreator('');
    window.dispatchEvent(new Event('creatoros_auth_updated'));
    window.dispatchEvent(new Event('creatoros_store_updated'));
    try {
      await clerk.signOut();
    } catch (e) {
      console.warn('Clerk sign out error:', e);
    }
    router.push('/');
  };

  const contextValue: SafeAuthContextType = {
    isClerkEnabled: true,
    isSignedIn: Boolean(isSignedIn),
    isLoaded: Boolean(isLoaded),
    user,
    signOut: handleClerkSignOut,
    signIn: () => {
      router.push('/sign-in');
    },
  };

  return (
    <SafeAuthContext.Provider value={contextValue}>
      {children}
    </SafeAuthContext.Provider>
  );
}

/**
 * Safe Auth Provider that automatically switches between genuine Clerk Enterprise Auth
 * and high-fidelity CreatorOS Resilient Demo Auth mode.
 */
export function SafeClerkProvider({ children }: SafeClerkProviderProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
  const clerkEnabled = isRealClerkKey(publishableKey);
  const { activeCreator, setDemoMode, switchActiveCreator, creators } = useCreatorStore();
  const router = useRouter();

  // Local state for demo/resilient auth mode - safely initialized for SSR
  const [isDemoSignedIn, setIsDemoSignedIn] = useState<boolean>(false);
  const [isAuthLoaded, setIsAuthLoaded] = useState<boolean>(false);

  useEffect(() => {
    const syncAuthState = () => {
      if (typeof window !== 'undefined') {
        try {
          const demoMode =
            sessionStorage.getItem('creatoros_demo_mode') === 'true' ||
            localStorage.getItem('creatoros_demo_mode') === 'true';
          const activeId =
            sessionStorage.getItem('creatoros_active_creator_id') ||
            localStorage.getItem('creatoros_active_creator_id');
          // If activeId is 'creator_aarav' but demoMode is false, the demo account is not signed in
          const signedIn = demoMode ? true : Boolean(activeId && activeId !== '' && activeId !== 'creator_aarav');
          setIsDemoSignedIn(signedIn);
        } catch (e) {
          setIsDemoSignedIn(false);
        } finally {
          setIsAuthLoaded(true);
        }
      }
    };

    syncAuthState();
    window.addEventListener('storage', syncAuthState);
    window.addEventListener('creatoros_auth_updated', syncAuthState);
    window.addEventListener('creatoros_store_updated', syncAuthState);

    return () => {
      window.removeEventListener('storage', syncAuthState);
      window.removeEventListener('creatoros_auth_updated', syncAuthState);
      window.removeEventListener('creatoros_store_updated', syncAuthState);
    };
  }, []);

  const currentCreator = (activeCreator && activeCreator.id)
    ? activeCreator
    : isDemoSignedIn
      ? (creators.find((c) => c.id === 'creator_aarav') || creators[0])
      : null;

  const demoUser = isDemoSignedIn && currentCreator ? {
    id: currentCreator.id,
    fullName: currentCreator.name,
    email: currentCreator.email || `${currentCreator.username}@creatoros.in`,
    imageUrl: currentCreator.avatarUrl,
    username: currentCreator.username,
  } : null;

  const handleSignOut = async () => {
    setIsDemoSignedIn(false);
    clearAllAuthSessions();
    if (setDemoMode) setDemoMode(false);
    if (switchActiveCreator) switchActiveCreator('');
    window.dispatchEvent(new Event('creatoros_auth_updated'));
    window.dispatchEvent(new Event('creatoros_store_updated'));
    router.push('/');
  };

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  const contextValue: SafeAuthContextType = {
    isClerkEnabled: false,
    isSignedIn: Boolean(isDemoSignedIn && demoUser),
    isLoaded: isAuthLoaded,
    user: demoUser,
    signOut: handleSignOut,
    signIn: handleSignIn,
  };

  if (clerkEnabled) {
    return (
      <ClerkProvider
        publishableKey={publishableKey}
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: '#2563EB',
            colorBackground: '#0A0D17',
            colorText: '#F8FAFC',
            colorInputBackground: '#05070B',
            colorInputText: '#FFFFFF',
          },
        }}
      >
        <ClerkAuthBridge>
          {children}
        </ClerkAuthBridge>
      </ClerkProvider>
    );
  }

  return (
    <SafeAuthContext.Provider value={contextValue}>
      {children}
    </SafeAuthContext.Provider>
  );
}

/**
 * Universal SignedIn component - works seamlessly with Clerk or Demo Mode
 */
export function SignedIn({ children }: { children: ReactNode }) {
  const { isClerkEnabled, isSignedIn, isLoaded } = useSafeAuth();

  if (isClerkEnabled) {
    return <ClerkSignedIn>{children}</ClerkSignedIn>;
  }

  if (!isLoaded || !isSignedIn) return null;
  return <>{children}</>;
}

/**
 * Universal SignedOut component - works seamlessly with Clerk or Demo Mode
 */
export function SignedOut({ children }: { children: ReactNode }) {
  const { isClerkEnabled, isSignedIn, isLoaded } = useSafeAuth();

  if (isClerkEnabled) {
    return <ClerkSignedOut>{children}</ClerkSignedOut>;
  }

  if (isLoaded && isSignedIn) return null;
  return <>{children}</>;
}

/**
 * Universal UserButton component with dark theme & Creator persona options
 */
export function UserButton({
  afterSignOutUrl = '/',
  userProfileUrl = '/dashboard/profile',
  appearance,
}: {
  afterSignOutUrl?: string;
  userProfileUrl?: string;
  userProfileMode?: string;
  appearance?: any;
}) {
  const { isClerkEnabled, user, signOut } = useSafeAuth();
  const { activeCreator } = useCreatorStore();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const avatar = user?.imageUrl || activeCreator?.avatarUrl || '/avatars/user-avatar.png';
  const name = user?.fullName || activeCreator?.name || 'Creator';
  const username = activeCreator?.username || user?.username || 'creator';
  const category = activeCreator?.category || 'Software Engineering & Tech';
  const email = user?.email || activeCreator?.email || `${username}@creatoros.in`;

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown, true);
    document.addEventListener('touchstart', handlePointerDown, true);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown, true);
      document.removeEventListener('touchstart', handlePointerDown, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 p-0.5 rounded-full ring-2 ring-royal-500/50 hover:ring-royal-400 transition btn-press focus:outline-none cursor-pointer shrink-0"
        title="Creator Profile & Account"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <img
          src={avatar}
          alt={name}
          className="h-8 w-8 rounded-full object-cover ring-1 ring-royal-500"
        />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-transparent cursor-default" 
            onClick={() => setIsOpen(false)} 
            aria-hidden="true"
          />
          <div 
            className="absolute right-0 top-full mt-2 w-72 rounded-[20px] glass-dropdown p-2.5 shadow-2xl z-50 border border-white/[0.12] bg-[#0A0D17]/95 backdrop-blur-2xl animate-scale-in"
          >
            {/* User Info Header with direct profile navigation */}
            <Link
              href={userProfileUrl}
              onClick={() => setIsOpen(false)}
              className="group p-2.5 rounded-xl bg-white/[0.03] hover:bg-royal-600/10 border border-white/[0.06] hover:border-royal-500/30 flex items-center gap-3 transition cursor-pointer"
              title="Click to change profile picture & settings"
            >
              <div className="relative shrink-0">
                <img 
                  src={avatar} 
                  alt={name} 
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-royal-500/50 group-hover:ring-royal-400" 
                />
                <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Camera className="h-3.5 w-3.5 text-royal-300" />
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs truncate text-white group-hover:text-royal-300 transition">{name}</span>
                  {activeCreator?.verified && <ShieldCheck className="h-3.5 w-3.5 text-royal-400 shrink-0" />}
                </div>
                <p className="text-[11px] text-royal-400 font-mono truncate">@{username}</p>
                <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 group-hover:text-royal-400 mt-0.5">
                  <span>Change photo & settings</span>
                  <ExternalLink className="h-2.5 w-2.5 opacity-60" />
                </span>
              </div>
            </Link>

            {/* Links */}
            <div className="mt-2 space-y-1">
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-200 hover:bg-white/[0.06] hover:text-white transition"
              >
                <LayoutDashboard className="h-4 w-4 text-royal-400" />
                <span>Creator Studio</span>
              </Link>
              <Link
                href="/dashboard/ai-coach"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-200 hover:bg-white/[0.06] hover:text-white transition"
              >
                <Bot className="h-4 w-4 text-emerald-400" />
                <span>AI Business Coach</span>
              </Link>
              <Link
                href="/onboarding"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-semibold text-royal-400 hover:bg-royal-600/10 transition"
              >
                <span className="flex items-center gap-2.5">
                  <Sparkles className="h-4 w-4 text-royal-400" />
                  <span>Launch Onboarding Wizard</span>
                </span>
                <span className="text-[10px] font-mono bg-royal-600/20 px-1.5 py-0.5 rounded">3 Steps</span>
              </Link>
              <Link
                href={userProfileUrl}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-200 hover:bg-white/[0.06] hover:text-white transition"
              >
                <Settings className="h-4 w-4 text-slate-400" />
                <span>Account & Security</span>
              </Link>
            </div>

            {/* Sign out */}
            <div className="pt-2 mt-1 border-t border-white/[0.08]">
              <button
                onClick={() => {
                  setIsOpen(false);
                  signOut();
                }}
                className="w-full flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Universal SignOutButton component
 */
export function SignOutButton({
  children,
  redirectUrl = '/',
}: {
  children?: ReactNode;
  redirectUrl?: string;
}) {
  const { signOut } = useSafeAuth();
  const router = useRouter();

  const handleSignOutClick = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    await signOut();
    if (redirectUrl) {
      router.push(redirectUrl);
    }
  };

  if (children && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: handleSignOutClick,
    });
  }

  return (
    <button
      onClick={handleSignOutClick}
      className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition"
    >
      <LogOut className="h-4 w-4 text-rose-400" />
      <span>Sign Out</span>
    </button>
  );
}

export default SafeClerkProvider;
