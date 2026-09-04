import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const isClerkConfigured = Boolean(
  clerkPublishableKey &&
  !clerkPublishableKey.includes('your_clerk_') &&
  !clerkPublishableKey.includes('test_fallback') &&
  (clerkPublishableKey.startsWith('pk_test_') || clerkPublishableKey.startsWith('pk_live_'))
);

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/onboarding(.*)',
]);

// Only initialize clerkMiddleware if valid Clerk keys are present
const clerkHandler = isClerkConfigured
  ? clerkMiddleware((auth, req) => {
      if (isProtectedRoute(req)) {
        auth().protect();
      }
    })
  : null;

export default function middleware(req: NextRequest, event: any) {
  // If Clerk is properly configured with valid keys, execute Clerk authentication
  if (isClerkConfigured && clerkHandler) {
    try {
      return clerkHandler(req, event);
    } catch (err) {
      console.warn('Clerk middleware error, proceeding safely:', err);
      return NextResponse.next();
    }
  }

  // Graceful fallback when running in demo mode or without Clerk keys on Vercel
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
