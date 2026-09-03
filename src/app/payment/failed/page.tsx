'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  ArrowLeft, 
  MessageSquare, 
  CreditCard, 
  Smartphone, 
  ShieldAlert,
  HelpCircle
} from 'lucide-react';
import { RippleButton } from '@/components/ui/motion';
import { motion } from 'framer-motion';

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const reason = searchParams.get('reason') || 'Transaction declined by issuer bank / UPI switch.';
  const errorCode = searchParams.get('code') || 'BAD_REQUEST_ERROR';
  const orderId = searchParams.get('order_id') || `order_${Date.now().toString().slice(-6)}`;
  const itemTitle = searchParams.get('title') || 'Creator Digital Product';

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-xl rounded-[28px] border border-rose-500/30 bg-gradient-to-b from-[#1C0D12] via-[#0A0E1A] to-[#0A0E1A] p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6"
      >
        
        {/* Top Failure Badge */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
            className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-rose-500/20 border-2 border-rose-400 text-rose-400 shadow-xl shadow-rose-500/20 p-4"
          >
            <XCircle className="h-10 w-10 text-rose-400" />
          </motion.div>

          <div className="flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 px-3 py-1 text-[11px] font-bold text-rose-400 font-mono">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Razorpay Payment Unsuccessful</span>
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Payment Not Completed
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Your payment for <span className="font-semibold text-white">{itemTitle}</span> could not be processed. If money was debited, it will be auto-refunded to your bank in 24–48 hours.
          </p>
        </div>

        {/* Error Details Card */}
        <div className="p-4 rounded-[20px] bg-black/50 border border-white/[0.08] text-xs font-mono space-y-2">
          <div className="flex justify-between text-slate-400">
            <span>Failure Reason:</span>
            <span className="text-rose-300 font-bold max-w-[60%] text-right">{reason}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Error Code:</span>
            <span className="text-slate-300">{errorCode}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Reference Order:</span>
            <span className="text-slate-300">{orderId}</span>
          </div>
        </div>

        {/* Indian Common Payment Failure Solutions */}
        <div className="p-4 rounded-[20px] bg-white/[0.03] border border-white/[0.06] space-y-2 text-xs">
          <p className="font-semibold text-slate-200 flex items-center gap-1.5 text-xs">
            <HelpCircle className="h-4 w-4 text-royal-400" />
            <span>Recommended Troubleshooting Steps:</span>
          </p>
          <ul className="text-slate-300 text-[11px] space-y-1.5 pl-4 list-disc leading-relaxed">
            <li><strong>UPI App Switch:</strong> Try paying with Google Pay or Paytm instead of PhonePe if the UPI server timed out.</li>
            <li><strong>Daily UPI Limits:</strong> Verify your bank account has not exceeded the ₹1,00,000 daily NPCI limit.</li>
            <li><strong>Cards:</strong> Ensure online e-commerce transactions and international limits are enabled on your banking app.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <RippleButton
            onClick={() => router.back()}
            className="w-full rounded-[16px] bg-royal-600 hover:bg-royal-500 py-3.5 text-xs font-bold text-white shadow-royal flex items-center justify-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Retry Payment via Razorpay</span>
          </RippleButton>

          <a
            href="https://wa.me/919823456789?text=Hi%20Aarav,%20I%20faced%20an%20issue%20with%20checkout%20payment"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-2 rounded-[16px] border border-emerald-500/30 bg-emerald-950/25 hover:bg-emerald-950/40 py-3 text-xs font-semibold text-emerald-300 transition"
          >
            <MessageSquare className="h-4 w-4 text-emerald-400" />
            <span>Contact Creator Support on WhatsApp</span>
          </a>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-white py-2 transition font-medium"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Cancel and Return to Home</span>
          </Link>
        </div>

      </motion.div>
    </div>
  );
}

export default function PaymentFailedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center text-slate-400 text-xs font-mono">
        Loading payment status...
      </div>
    }>
      <PaymentFailedContent />
    </Suspense>
  );
}
