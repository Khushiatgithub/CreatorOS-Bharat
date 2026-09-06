import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '';
const clerkSecretKey = process.env.CLERK_SECRET_KEY || '';

function isRealClerkConfigured(pubKey: string, secKey: string): boolean {
  if (!pubKey || typeof pubKey !== 'string') return false;
  const trimmed = pubKey.trim();
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
  if (!trimmed.startsWith('pk_test_') && !trimmed.startsWith('pk_live_')) {
    return false;
  }

  // Check secret key if provided
  if (secKey && (secKey.includes('CreatorOSBharatProductionSecretKey') || secKey.includes('your_clerk_secret'))) {
    return false;
  }

  return true;
}

const isClerkConfigured = isRealClerkConfigured(clerkPublishableKey, clerkSecretKey);

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/onboarding(.*)',
]);

// Only initialize clerkMiddleware if valid live Clerk keys are present
const clerkHandler = isClerkConfigured
  ? clerkMiddleware((auth, req) => {
      if (isProtectedRoute(req)) {
        auth().protect();
      }
    })
  : null;

export default function middleware(req: NextRequest, event: any) {
  // If Clerk is properly configured with valid live keys, execute Clerk authentication
  if (isClerkConfigured && clerkHandler) {
    try {
      return clerkHandler(req, event);
    } catch (err) {
      console.warn('Clerk middleware error, proceeding safely:', err);
      return NextResponse.next();
    }
  }

  // Graceful fallback for local development / demo mode: allow direct access without external redirect
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
