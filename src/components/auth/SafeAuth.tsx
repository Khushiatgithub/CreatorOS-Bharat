'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ClerkProvider, SignedIn as ClerkSignedIn, SignedOut as ClerkSignedOut, UserButton as ClerkUserButton, SignOutButton as ClerkSignOutButton, useUser as useClerkUser } from '@clerk/nextjs';
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
  Zap
} from 'lucide-react';

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
    trimmed.includes('demo')
  ) {
    return false;
  }
  return trimmed.startsWith('pk_test_') || trimmed.startsWith('pk_live_');
}

interface SafeAuthContextType {
  isClerkEnabled: boolean;
  isSignedIn: boolean;
  user: {
    id: string;
    fullName: string;
    email: string;
    imageUrl: string;
    username: string;
  } | null;
  signOut: () => void;
  signIn: () => void;
}

const SafeAuthContext = createContext<SafeAuthContextType>({
  isClerkEnabled: false,
  isSignedIn: true,
  user: null,
  signOut: () => {},
  signIn: () => {},
});

export function useSafeAuth() {
  return useContext(SafeAuthContext);
}

export function useSafeUser() {
  const { user, isClerkEnabled } = useSafeAuth();
  return { user, isLoaded: true, isSignedIn: !!user };
}

interface SafeClerkProviderProps {
  children: ReactNode;
}

/**
 * Safe Auth Provider that automatically switches between genuine Clerk Enterprise Auth
 * and high-fidelity CreatorOS Resilient Demo Auth mode.
 */
export function SafeClerkProvider({ children }: SafeClerkProviderProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
  const clerkEnabled = isRealClerkKey(publishableKey);
  const { activeCreator } = useCreatorStore();
  const router = useRouter();

  // Local state for demo mode
  const [isDemoSignedIn, setIsDemoSignedIn] = useState(true);

  const demoUser = isDemoSignedIn && activeCreator ? {
    id: activeCreator.id,
    fullName: activeCreator.name,
    email: activeCreator.email || `${activeCreator.username}@creatoros.in`,
    imageUrl: activeCreator.avatarUrl,
    username: activeCreator.username,
  } : null;

  const handleSignOut = () => {
    setIsDemoSignedIn(false);
    router.push('/');
  };

  const handleSignIn = () => {
    setIsDemoSignedIn(true);
    router.push('/dashboard');
  };

  const contextValue: SafeAuthContextType = {
    isClerkEnabled: clerkEnabled,
    isSignedIn: isDemoSignedIn,
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
        <SafeAuthContext.Provider value={contextValue}>
          {children}
        </SafeAuthContext.Provider>
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
  const { isClerkEnabled, isSignedIn } = useSafeAuth();

  if (isClerkEnabled) {
    return <ClerkSignedIn>{children}</ClerkSignedIn>;
  }

  if (!isSignedIn) return null;
  return <>{children}</>;
}

/**
 * Universal SignedOut component - works seamlessly with Clerk or Demo Mode
 */
export function SignedOut({ children }: { children: ReactNode }) {
  const { isClerkEnabled, isSignedIn } = useSafeAuth();

  if (isClerkEnabled) {
    return <ClerkSignedOut>{children}</ClerkSignedOut>;
  }

  if (isSignedIn) return null;
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

  if (isClerkEnabled) {
    return (
      <ClerkUserButton
        afterSignOutUrl={afterSignOutUrl}
        userProfileMode="navigation"
        userProfileUrl={userProfileUrl}
        appearance={appearance || {
          elements: {
            userButtonAvatarBox: 'h-8 w-8 ring-2 ring-royal-500/50 rounded-full',
            userButtonPopoverCard: 'bg-[#0A0D17] border border-white/[0.12] text-white shadow-2xl',
            userButtonPopoverFooter: 'hidden',
          },
        }}
      />
    );
  }

  const avatar = user?.imageUrl || activeCreator?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
  const name = user?.fullName || activeCreator?.name || 'Creator';
  const email = user?.email || `${activeCreator?.username || 'creator'}@creatoros.in`;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 p-0.5 rounded-full ring-2 ring-royal-500/50 hover:ring-royal-400 transition btn-press focus:outline-none"
        title="Creator Profile & Account"
      >
        <img
          src={avatar}
          alt={name}
          className="h-8 w-8 rounded-full object-cover"
        />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div 
            className="absolute right-0 top-full mt-2 w-64 rounded-[20px] glass-dropdown p-3 shadow-2xl z-50 border border-white/[0.12] bg-[#0A0D17]/95 backdrop-blur-2xl animate-scale-in"
            onClick={() => setIsOpen(false)}
          >
            {/* User Info Header */}
            <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08] px-1">
              <img src={avatar} alt={name} className="h-10 w-10 rounded-full object-cover ring-1 ring-royal-500" />
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center gap-1">
                  <h4 className="font-semibold text-xs text-white truncate">{name}</h4>
                  <ShieldCheck className="h-3.5 w-3.5 text-royal-400 shrink-0" />
                </div>
                <p className="text-[11px] text-slate-400 truncate">{email}</p>
              </div>
            </div>

            {/* Links */}
            <div className="py-2 space-y-1">
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 rounded-[12px] px-2.5 py-2 text-xs font-medium text-slate-200 hover:bg-white/[0.06] hover:text-white transition"
              >
                <LayoutDashboard className="h-4 w-4 text-royal-400" />
                <span>Creator Studio</span>
              </Link>
              <Link
                href="/dashboard/ai-coach"
                className="flex items-center gap-2.5 rounded-[12px] px-2.5 py-2 text-xs font-medium text-slate-200 hover:bg-white/[0.06] hover:text-white transition"
              >
                <Bot className="h-4 w-4 text-emerald-400" />
                <span>AI Business Coach</span>
              </Link>
              <Link
                href={userProfileUrl}
                className="flex items-center gap-2.5 rounded-[12px] px-2.5 py-2 text-xs font-medium text-slate-200 hover:bg-white/[0.06] hover:text-white transition"
              >
                <Settings className="h-4 w-4 text-slate-400" />
                <span>Account & Security</span>
              </Link>
            </div>

            {/* Sign out */}
            <div className="pt-2 border-t border-white/[0.08]">
              <button
                onClick={signOut}
                className="w-full flex items-center gap-2.5 rounded-[12px] px-2.5 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition"
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
  const { isClerkEnabled, signOut } = useSafeAuth();
  const router = useRouter();

  if (isClerkEnabled) {
    return <ClerkSignOutButton redirectUrl={redirectUrl}>{children}</ClerkSignOutButton>;
  }

  const handleClick = () => {
    signOut();
    if (redirectUrl) router.push(redirectUrl);
  };

  if (children && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: handleClick,
    });
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-xl transition"
    >
      <LogOut className="h-4 w-4 text-rose-400" />
      <span>Sign Out</span>
    </button>
  );
}

export default SafeClerkProvider;
