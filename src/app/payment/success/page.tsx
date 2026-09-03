'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  FileText, 
  MessageSquare, 
  ArrowRight, 
  ExternalLink,
  Zap,
  ShoppingBag,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { formatINR, formatINRDecimal } from '@/lib/gst';
import { useCreatorStore } from '@/lib/store';
import GSTInvoiceModal from '@/components/invoice/GSTInvoiceModal';
import { RippleButton, PageTransition, HoverCard } from '@/components/ui/motion';
import { motion } from 'framer-motion';
import { Order } from '@/types';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { orders, activeCreator } = useCreatorStore();

  const paymentId = searchParams.get('payment_id') || `pay_${Date.now().toString().slice(-8)}`;
  const orderId = searchParams.get('order_id') || `order_${Date.now().toString().slice(-6)}`;
  const itemTitle = searchParams.get('title') || 'Complete FAANG SDE & DSA Master Sheet 2025';
  const amountParam = searchParams.get('amount');
  const amount = amountParam ? Number(amountParam) : 470.82;
  const buyerName = searchParams.get('name') || 'Rahul Deshmukh';
  const buyerPhone = searchParams.get('phone') || '+91 98234 56789';
  const invoiceNumber = searchParams.get('invoice') || `INV-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  const downloadUrl = searchParams.get('download_url') || 'https://example.com/downloads/FAANG-DSA-MasterSheet.pdf';

  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);

  useEffect(() => {
    // Trigger celebratory confetti burst
    try {
      confetti({
        particleCount: 160,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#60A5FA', '#10B981', '#F8FAFC', '#5F259F', '#00B9F5', '#FF9900']
      });
    } catch (e) {
      console.warn('Confetti animation error:', e);
    }

    // Build order representation for invoice modal
    const matchedOrder = orders.find(o => o.razorpayPaymentId === paymentId || o.invoiceNumber === invoiceNumber);
    if (matchedOrder) {
      setInvoiceOrder(matchedOrder);
    } else {
      setInvoiceOrder({
        id: `ord_${Date.now()}`,
        orderNumber: `ORD-${Date.now().toString().slice(-6)}`,
        creatorId: 'creator_aarav',
        itemType: 'product',
        itemId: 'prod_dsa_sheet',
        itemTitle,
        amount: Math.round(amount / 1.18),
        gstRate: 18,
        cgst: Math.round((amount - amount / 1.18) / 2),
        sgst: Math.round((amount - amount / 1.18) / 2),
        igst: 0,
        totalAmount: amount,
        isInterState: false,
        buyerName,
        buyerEmail: 'rahul.deshmukh@gmail.com',
        buyerPhone,
        buyerState: 'Maharashtra',
        paymentMethod: 'UPI',
        paymentApp: 'PhonePe',
        paymentGateway: 'Razorpay',
        razorpayPaymentId: paymentId,
        razorpayOrderId: orderId,
        upiRefId: `UPI${Math.floor(100000000000 + Math.random() * 900000000000)}`,
        sacCode: '998431',
        status: 'completed',
        paymentStatus: 'Paid',
        invoiceNumber,
        date: new Date().toISOString().split('T')[0],
        downloadUrl,
        deliverySentWhatsapp: true,
        deliverySentEmail: true
      });
    }
  }, [paymentId, invoiceNumber, amount, buyerName, buyerPhone, itemTitle, downloadUrl, orderId, orders]);

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-full max-w-xl rounded-[28px] border border-emerald-500/30 bg-gradient-to-b from-[#07141E] via-[#0A0E1A] to-[#0A0E1A] p-6 sm:p-8 shadow-2xl text-slate-100 space-y-6"
      >
        
        {/* Top Success Badge */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.1 }}
            className="mx-auto flex h-18 w-18 items-center justify-center rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 shadow-xl shadow-emerald-500/20 p-4"
          >
            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
          </motion.div>

          <div className="flex items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-[11px] font-bold text-emerald-400 font-mono">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Razorpay Verified Payment</span>
            </span>
          </div>

          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Payment Confirmed, {buyerName.split(' ')[0]}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            You successfully paid <strong className="text-emerald-400 font-mono">₹{formatINRDecimal(amount)}</strong> for {itemTitle}.
          </p>
        </div>

        {/* Transaction Summary Card */}
        <div className="p-4 rounded-[20px] bg-black/50 border border-white/[0.08] text-xs font-mono space-y-2.5">
          <div className="flex justify-between text-slate-400">
            <span>Payment ID:</span>
            <span className="text-royal-300 font-bold">{paymentId}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Razorpay Order ID:</span>
            <span className="text-slate-300">{orderId}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>GST Tax Invoice:</span>
            <span className="text-emerald-400 font-bold">{invoiceNumber}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Gateway Timestamp:</span>
            <span className="text-slate-300">{new Date().toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* WhatsApp Delivery Alert Strip */}
        <div className="rounded-[18px] border border-emerald-500/30 bg-emerald-950/30 p-4 flex items-start gap-3.5 shadow-glass-subtle">
          <div className="rounded-xl bg-emerald-500/20 p-2 text-emerald-400 shrink-0 mt-0.5">
            <MessageSquare className="h-4 w-4" />
          </div>
          <div className="text-xs flex-1">
            <div className="font-bold text-emerald-300 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span>WhatsApp Automated Delivery</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
              </span>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
                Dispatched
              </span>
            </div>
            <p className="text-emerald-200/80 mt-1 text-[11px] leading-relaxed">
              Download access link and official tax invoice sent to <strong className="text-white font-mono">{buyerPhone}</strong>.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          {downloadUrl && (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 rounded-[16px] bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 text-xs font-bold text-white shadow-lg hover:brightness-110 transition btn-press"
            >
              <Download className="h-4 w-4" />
              <span>Instant Download Asset (PDF)</span>
            </a>
          )}

          <RippleButton
            onClick={() => setShowInvoiceModal(true)}
            className="w-full rounded-[16px] border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] py-3 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition"
          >
            <FileText className="h-4 w-4 text-royal-400" />
            <span>View Official GST Tax Invoice ({invoiceNumber})</span>
          </RippleButton>

          <Link
            href={`/${activeCreator?.username || 'aarav.tech'}`}
            className="w-full flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-white py-2 transition font-medium"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to {activeCreator?.name || 'Creator'} Storefront</span>
          </Link>
        </div>

      </motion.div>

      {/* Embedded GST Invoice Modal */}
      {invoiceOrder && (
        <GSTInvoiceModal
          isOpen={showInvoiceModal}
          onClose={() => setShowInvoiceModal(false)}
          order={invoiceOrder}
        />
      )}
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center text-slate-400 text-xs font-mono">
        Loading verified payment receipt...
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
