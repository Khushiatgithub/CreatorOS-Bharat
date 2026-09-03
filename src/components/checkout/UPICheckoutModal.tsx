'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  QrCode, 
  Smartphone, 
  CreditCard, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  FileText, 
  MessageSquare, 
  ArrowRight, 
  Clock, 
  Lock, 
  Sparkles,
  Zap,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Shield,
  HelpCircle,
  RefreshCw,
  Wallet
} from 'lucide-react';
import { INDIAN_STATES, calculateGST, SAC_CODES, formatINR, formatINRDecimal } from '@/lib/gst';
import { generateUPIIntentUri, generateQRCodeMatrix } from '@/lib/upi';
import { useCreatorStore } from '@/lib/store';
import { ProductType, Order } from '@/types';
import GSTInvoiceModal from '@/components/invoice/GSTInvoiceModal';
import { RippleButton, HoverCard } from '@/components/ui/motion';
import { motion, AnimatePresence } from 'framer-motion';

interface UPICheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    id: string;
    title: string;
    price: number;
    type: ProductType;
    category?: string;
    downloadUrl?: string;
  };
  bookingDate?: string;
  bookingTimeSlot?: string;
}

const POPULAR_BANKS = [
  { id: 'HDFC', name: 'HDFC Bank', code: 'HDFC0001', logo: '🏛️', popular: true },
  { id: 'ICICI', name: 'ICICI Bank', code: 'ICIC0001', logo: '🏦', popular: true },
  { id: 'SBI', name: 'State Bank of India', code: 'SBIN0001', logo: '🔵', popular: true },
  { id: 'AXIS', name: 'Axis Bank', code: 'UTIB0001', logo: '🔴', popular: true },
  { id: 'KOTAK', name: 'Kotak Mahindra', code: 'KKBK0001', logo: '🏢', popular: true },
  { id: 'PNB', name: 'Punjab National Bank', code: 'PUNB0001', logo: '🏛️', popular: true },
];

const ALL_BANKS = [
  ...POPULAR_BANKS,
  { id: 'BOB', name: 'Bank of Baroda', code: 'BARB0001' },
  { id: 'CANARA', name: 'Canara Bank', code: 'CNRB0001' },
  { id: 'INDUS', name: 'IndusInd Bank', code: 'INDB0001' },
  { id: 'IDFC', name: 'IDFC FIRST Bank', code: 'IDFB0001' },
  { id: 'YES', name: 'Yes Bank', code: 'YESB0001' },
  { id: 'UNION', name: 'Union Bank of India', code: 'UBIN0001' },
  { id: 'FEDERAL', name: 'Federal Bank', code: 'FDRL0001' },
  { id: 'RBL', name: 'RBL Bank', code: 'RATN0001' },
];

export default function UPICheckoutModal({
  isOpen,
  onClose,
  item,
  bookingDate,
  bookingTimeSlot
}: UPICheckoutModalProps) {
  const { activeCreator, processCheckout } = useCreatorStore();

  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [activePaymentCategory, setActivePaymentCategory] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [activeUpiMode, setActiveUpiMode] = useState<'apps' | 'qr' | 'vpa'>('apps');
  const [selectedApp, setSelectedApp] = useState<'PhonePe' | 'GPay' | 'Paytm' | 'BHIM' | 'CRED'>('PhonePe');
  
  // Custom UPI ID input for UPI ID tab
  const [customVpa, setCustomVpa] = useState('');
  const [vpaCopied, setVpaCopied] = useState(false);
  const [showGstPreview, setShowGstPreview] = useState(false);

  // Card details state
  const [cardNumber, setCardNumber] = useState('4532 8901 2345 6789');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('892');
  const [cardHolder, setCardHolder] = useState('Rahul Deshmukh');
  const [saveCard, setSaveCard] = useState(true);

  // Net banking state
  const [selectedBank, setSelectedBank] = useState('HDFC');

  // Processing simulation state
  const [processingStatus, setProcessingStatus] = useState('Initiating Razorpay gateway handshake...');
  const [processingProgress, setProcessingProgress] = useState(25);

  // Buyer form fields
  const [name, setName] = useState('Rahul Deshmukh');
  const [email, setEmail] = useState('rahul.deshmukh@gmail.com');
  const [phone, setPhone] = useState('+91 98234 56789');
  const [buyerState, setBuyerState] = useState('Maharashtra');
  const [buyerGst, setBuyerGst] = useState('');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  // 5-minute countdown timer for authentic UPI session
  const [secondsRemaining, setSecondsRemaining] = useState(299);

  useEffect(() => {
    if (!isOpen || step !== 'form') return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, step]);

  if (!isOpen) return null;

  const gstDetails = calculateGST(item.price, activeCreator?.state || 'Karnataka', buyerState);
  // Default to creator@okaxis or creator's upiId
  const creatorVpa = activeCreator?.upiId || 'creator@okaxis';
  const payeeName = activeCreator?.upiName || activeCreator?.name || 'CreatorOS India';

  const upiIntentUri = generateUPIIntentUri({
    vpa: creatorVpa,
    payeeName,
    amount: gstDetails.totalAmount,
    transactionNote: `Payment for ${item.title.substring(0, 30)}`,
    transactionRef: `REF${Date.now().toString().slice(-8)}`
  });

  const qrMatrix = generateQRCodeMatrix(upiIntentUri);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const handleCopyVpa = () => {
    navigator.clipboard.writeText(creatorVpa);
    setVpaCopied(true);
    setTimeout(() => setVpaCopied(false), 2500);
  };

  const formatCardNumberInput = (val: string) => {
    const cleaned = val.replace(/\D/g, '').substring(0, 16);
    const parts = cleaned.match(/.{1,4}/g) || [];
    setCardNumber(parts.join(' '));
  };

  const formatExpiryInput = (val: string) => {
    const cleaned = val.replace(/\D/g, '').substring(0, 4);
    if (cleaned.length >= 3) {
      setCardExpiry(`${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`);
    } else {
      setCardExpiry(cleaned);
    }
  };

  const handleSimulatePayment = (paymentType: 'upi' | 'card' | 'netbanking', appName?: 'PhonePe' | 'GPay' | 'Paytm' | 'BHIM' | 'CRED') => {
    if (!name.trim() || !phone.trim() || !email.trim()) {
      alert('Please enter your full name, email, and WhatsApp mobile number.');
      return;
    }

    setStep('processing');
    setProcessingProgress(20);
    setProcessingStatus('Securing 256-bit Razorpay connection...');

    setTimeout(() => {
      setProcessingProgress(55);
      if (paymentType === 'upi') {
        setProcessingStatus(`Routing to NPCI switch for ${appName || selectedApp}...`);
      } else if (paymentType === 'card') {
        setProcessingStatus('Validating card with RBI 3D Secure / OTP Gateway...');
      } else {
        const bankName = ALL_BANKS.find(b => b.id === selectedBank)?.name || selectedBank;
        setProcessingStatus(`Connecting to ${bankName} corporate banking portal...`);
      }
    }, 600);

    setTimeout(() => {
      setProcessingProgress(85);
      setProcessingStatus('Authorizing payment and finalizing GST Tax Invoice...');
    }, 1100);

    setTimeout(() => {
      setProcessingProgress(100);

      const paymentMethod = paymentType === 'card' ? 'Card' : paymentType === 'netbanking' ? 'Netbanking' : 'UPI';
      const paymentApp = paymentType === 'upi' ? (appName || selectedApp) : undefined;

      const { order } = processCheckout({
        itemType: item.type,
        itemId: item.id,
        itemTitle: item.title,
        amount: item.price,
        buyerName: name,
        buyerEmail: email,
        buyerPhone: phone,
        buyerState: buyerState,
        buyerGst: buyerGst || undefined,
        paymentMethod,
        paymentApp,
        bookingDate,
        bookingTimeSlot
      });

      setCompletedOrder(order);
      setStep('success');

      try {
        confetti({
          particleCount: 160,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#2563EB', '#60A5FA', '#10B981', '#F8FAFC', '#5F259F', '#00B9F5', '#FF9900']
        });
      } catch (e) {
        console.warn(e);
      }
    }, 1600);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-2xl overflow-y-auto animate-fade-in">
        
        {/* RAZORPAY-STYLE INDIAN CHECKOUT MODAL SHEET */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 360, damping: 26 }}
          className="relative w-full max-w-xl rounded-[24px] border border-white/[0.12] bg-[#0A0E1A] shadow-2xl text-slate-100 overflow-hidden my-4"
        >
          
          {/* RAZORPAY BRANDED TOP HEADER */}
          <div className="bg-gradient-to-r from-[#070D1F] via-[#0E1738] to-[#0A0E1A] p-4 sm:p-5 border-b border-white/[0.08] relative">
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full p-2 text-slate-400 hover:bg-white/[0.08] hover:text-white transition btn-press z-10"
              title="Close checkout"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Merchant Brand & Security Row */}
            <div className="flex items-start justify-between gap-4 pr-8">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-[16px] bg-gradient-to-b from-royal-500 to-royal-700 p-0.5 shadow-royal flex items-center justify-center shrink-0">
                  <img
                    src={activeCreator?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={payeeName}
                    className="h-full w-full rounded-[14px] object-cover bg-black"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display text-sm sm:text-base font-bold text-white tracking-tight">
                      {payeeName}
                    </h3>
                    <span title="Verified Indian Merchant">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="inline-flex items-center gap-1 rounded bg-royal-600/20 px-1.5 py-0.5 text-[9px] font-bold text-royal-300 border border-royal-500/30 font-mono">
                      <Shield className="h-2.5 w-2.5 text-royal-400" />
                      Razorpay Trusted Business
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      NPCI UPI 2.0
                    </span>
                  </div>
                </div>
              </div>

              {/* Amount Display with Session Countdown */}
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-medium">Total Payable</div>
                <div className="font-display text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">
                  ₹{formatINRDecimal(gstDetails.totalAmount)}
                </div>
                <div className="flex items-center justify-end gap-1 text-[10px] text-amber-400 font-mono font-semibold mt-0.5">
                  <Clock className="h-3 w-3" />
                  <span>{formatTime(secondsRemaining)}</span>
                </div>
              </div>
            </div>

            {/* Item Details Strip with GST Breakdown Toggle */}
            <div className="mt-3.5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 max-w-[70%]">
                <span className="rounded-md bg-royal-600/20 text-royal-300 border border-royal-500/30 px-2 py-0.5 text-[10px] font-bold uppercase font-mono">
                  {item.type}
                </span>
                <span className="text-slate-200 font-semibold truncate">{item.title}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowGstPreview(!showGstPreview)}
                className="text-[11px] text-royal-400 hover:text-royal-300 font-semibold flex items-center gap-1 font-mono transition"
              >
                <span>GST Breakdown</span>
                {showGstPreview ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
            </div>

            {/* EXPANDABLE GST INVOICE PREVIEW SHEET */}
            <AnimatePresence>
              {showGstPreview && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 p-3.5 rounded-[16px] bg-black/60 border border-white/[0.08] text-xs space-y-2">
                    <div className="flex justify-between text-slate-300 font-mono text-[11px]">
                      <span>SAC Service Code:</span>
                      <span className="text-royal-400 font-bold">
                        {SAC_CODES[item.type.toUpperCase() as keyof typeof SAC_CODES]?.code || '998431'}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Base Price (Taxable Value):</span>
                      <span className="font-mono">₹{formatINRDecimal(item.price)}</span>
                    </div>
                    {gstDetails.isInterState ? (
                      <div className="flex justify-between text-slate-400">
                        <span>IGST (18% Inter-State to {buyerState}):</span>
                        <span className="font-mono text-royal-300">₹{formatINRDecimal(gstDetails.igst)}</span>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between text-slate-400">
                          <span>CGST (9% Central):</span>
                          <span className="font-mono text-blue-300">₹{formatINRDecimal(gstDetails.cgst)}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>SGST (9% State - {buyerState}):</span>
                          <span className="font-mono text-blue-300">₹{formatINRDecimal(gstDetails.sgst)}</span>
                        </div>
                      </>
                    )}
                    <div className="pt-2 border-t border-white/[0.08] flex justify-between font-bold text-white text-xs">
                      <span>Total Amount with 18% GST:</span>
                      <span className="text-emerald-400 font-mono">₹{formatINRDecimal(gstDetails.totalAmount)}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* STEP 1: CHECKOUT FORM & RAZORPAY PAYMENT METHODS */}
          {step === 'form' && (
            <div className="p-5 sm:p-6 space-y-5 max-h-[72vh] overflow-y-auto">
              
              {/* Buyer Information Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    1. Contact & Delivery Details
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold font-mono flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" /> WhatsApp Delivery
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Rahul Deshmukh"
                      className="w-full rounded-[12px] border border-white/[0.1] bg-black/40 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">WhatsApp Mobile</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98234 56789"
                      className="w-full rounded-[12px] border border-white/[0.1] bg-black/40 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full rounded-[12px] border border-white/[0.1] bg-black/40 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Billing State (GST)</label>
                    <select
                      value={buyerState}
                      onChange={(e) => setBuyerState(e.target.value)}
                      className="w-full rounded-[12px] border border-white/[0.1] bg-black/40 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                    >
                      {Object.keys(INDIAN_STATES).map((st) => (
                        <option key={st} value={st} className="bg-[#0A0D17] text-white">
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-slate-400 mb-1">
                    GSTIN / Business Registration <span className="text-slate-500">(Optional for B2B input tax credit)</span>
                  </label>
                  <input
                    type="text"
                    value={buyerGst}
                    onChange={(e) => setBuyerGst(e.target.value)}
                    placeholder="27ABCDE1234F1Z5"
                    className="w-full rounded-[12px] border border-white/[0.1] bg-black/40 px-3 py-1.5 text-xs text-white font-mono focus:border-royal-500 focus:outline-none uppercase"
                  />
                </div>
              </div>

              {/* PAYMENT CATEGORY TABS: UPI / CARDS / NET BANKING */}
              <div className="space-y-3 pt-3 border-t border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    2. Select Payment Method
                  </span>
                  <span className="text-[10px] text-royal-400 font-mono font-semibold">
                    100% RBI Compliant
                  </span>
                </div>

                {/* Primary Mode Selector */}
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-[16px] bg-white/[0.04] border border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setActivePaymentCategory('upi')}
                    className={`py-2 rounded-[12px] text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      activePaymentCategory === 'upi'
                        ? 'bg-royal-600 text-white shadow-royal-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                    <span>UPI</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivePaymentCategory('card')}
                    className={`py-2 rounded-[12px] text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      activePaymentCategory === 'card'
                        ? 'bg-royal-600 text-white shadow-royal-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <CreditCard className="h-3.5 w-3.5" />
                    <span>Cards</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivePaymentCategory('netbanking')}
                    className={`py-2 rounded-[12px] text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      activePaymentCategory === 'netbanking'
                        ? 'bg-royal-600 text-white shadow-royal-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Building2 className="h-3.5 w-3.5" />
                    <span>Net Banking</span>
                  </button>
                </div>

                {/* ========================================================================= */}
                {/* 1. UPI CATEGORY */}
                {/* ========================================================================= */}
                {activePaymentCategory === 'upi' && (
                  <div className="space-y-3 animate-fade-in">
                    
                    {/* Sub-tabs: UPI Apps / Scan QR / UPI ID */}
                    <div className="flex items-center gap-2 border-b border-white/[0.06] pb-2">
                      <button
                        type="button"
                        onClick={() => setActiveUpiMode('apps')}
                        className={`text-xs font-semibold pb-1 px-1 border-b-2 transition ${
                          activeUpiMode === 'apps'
                            ? 'border-royal-400 text-royal-300'
                            : 'border-transparent text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Popular Apps
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveUpiMode('qr')}
                        className={`text-xs font-semibold pb-1 px-1 border-b-2 transition ${
                          activeUpiMode === 'qr'
                            ? 'border-royal-400 text-royal-300'
                            : 'border-transparent text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Scan QR Code
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveUpiMode('vpa')}
                        className={`text-xs font-semibold pb-1 px-1 border-b-2 transition ${
                          activeUpiMode === 'vpa'
                            ? 'border-royal-400 text-royal-300'
                            : 'border-transparent text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        Enter UPI ID
                      </button>
                    </div>

                    {/* SUB-VIEW 1: PHONEPE, GOOGLE PAY, PAYTM, BHIM, CRED BUTTONS */}
                    {activeUpiMode === 'apps' && (
                      <div className="space-y-2.5 animate-fade-in">
                        
                        {/* PhonePe Button */}
                        <button
                          type="button"
                          onClick={() => handleSimulatePayment('upi', 'PhonePe')}
                          className="w-full flex items-center justify-between p-3.5 rounded-[16px] border border-[#5F259F]/40 bg-gradient-to-r from-[#5F259F]/20 to-[#311353]/30 hover:from-[#5F259F]/35 hover:to-[#311353]/50 hover:border-[#5F259F] text-white transition btn-press group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-[#5F259F] text-white font-black text-xs flex items-center justify-center shadow-md">
                              पे
                            </div>
                            <div className="text-left">
                              <p className="font-bold text-xs text-white flex items-center gap-1.5">
                                <span>PhonePe</span>
                                <span className="bg-[#5F259F]/50 text-purple-200 text-[9px] font-mono px-1.5 py-0.2 rounded">Fastest</span>
                              </p>
                              <p className="text-[10px] text-purple-300">1-Click Instant UPI</p>
                            </div>
                          </div>
                          <span className="font-mono text-xs font-bold text-white group-hover:translate-x-0.5 transition">
                            Pay ₹{gstDetails.totalAmount.toFixed(2)} →
                          </span>
                        </button>

                        {/* Google Pay Button */}
                        <button
                          type="button"
                          onClick={() => handleSimulatePayment('upi', 'GPay')}
                          className="w-full flex items-center justify-between p-3.5 rounded-[16px] border border-blue-500/30 bg-gradient-to-r from-blue-600/15 to-blue-900/20 hover:from-blue-600/30 hover:to-blue-900/40 hover:border-blue-400 text-white transition btn-press group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-white text-black font-black text-xs flex items-center justify-center shadow-md">
                              <span className="text-blue-600 font-bold">G</span><span className="text-red-500 font-bold">P</span>
                            </div>
                            <div className="text-left">
                              <p className="font-bold text-xs text-white">Google Pay (GPay)</p>
                              <p className="text-[10px] text-blue-300">Pay directly with UPI PIN</p>
                            </div>
                          </div>
                          <span className="font-mono text-xs font-bold text-white group-hover:translate-x-0.5 transition">
                            Pay ₹{gstDetails.totalAmount.toFixed(2)} →
                          </span>
                        </button>

                        {/* Paytm Button */}
                        <button
                          type="button"
                          onClick={() => handleSimulatePayment('upi', 'Paytm')}
                          className="w-full flex items-center justify-between p-3.5 rounded-[16px] border border-[#00B9F5]/30 bg-gradient-to-r from-[#00B9F5]/15 to-[#002E6E]/20 hover:from-[#00B9F5]/30 hover:to-[#002E6E]/40 hover:border-[#00B9F5] text-white transition btn-press group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-[#002E6E] text-[#00B9F5] font-black text-[10px] flex items-center justify-center shadow-md">
                              Paytm
                            </div>
                            <div className="text-left">
                              <p className="font-bold text-xs text-white">Paytm UPI</p>
                              <p className="text-[10px] text-cyan-300">Instant Indian bank debit</p>
                            </div>
                          </div>
                          <span className="font-mono text-xs font-bold text-white group-hover:translate-x-0.5 transition">
                            Pay ₹{gstDetails.totalAmount.toFixed(2)} →
                          </span>
                        </button>

                        {/* BHIM UPI Button (Explicitly requested) */}
                        <button
                          type="button"
                          onClick={() => handleSimulatePayment('upi', 'BHIM')}
                          className="w-full flex items-center justify-between p-3.5 rounded-[16px] border border-emerald-500/30 bg-gradient-to-r from-emerald-600/15 via-[#004d40]/20 to-black hover:from-emerald-600/30 hover:border-emerald-400 text-white transition btn-press group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 text-white font-extrabold text-[10px] flex items-center justify-center shadow-md">
                              BHIM
                            </div>
                            <div className="text-left">
                              <p className="font-bold text-xs text-white flex items-center gap-1.5">
                                <span>BHIM UPI</span>
                                <span className="bg-emerald-500/30 text-emerald-300 text-[9px] font-mono px-1.5 py-0.2 rounded">NPCI Official</span>
                              </p>
                              <p className="text-[10px] text-emerald-300">National Payments Corporation of India</p>
                            </div>
                          </div>
                          <span className="font-mono text-xs font-bold text-white group-hover:translate-x-0.5 transition">
                            Pay ₹{gstDetails.totalAmount.toFixed(2)} →
                          </span>
                        </button>

                        {/* CRED UPI Button */}
                        <button
                          type="button"
                          onClick={() => handleSimulatePayment('upi', 'CRED')}
                          className="w-full flex items-center justify-between p-3.5 rounded-[16px] border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-black to-black hover:border-amber-400 text-white transition btn-press group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-black border border-amber-500/40 text-amber-400 font-black text-xs flex items-center justify-center shadow-md">
                              C
                            </div>
                            <div className="text-left">
                              <p className="font-bold text-xs text-white">CRED UPI</p>
                              <p className="text-[10px] text-amber-300">Earn CRED reward coins</p>
                            </div>
                          </div>
                          <span className="font-mono text-xs font-bold text-white group-hover:translate-x-0.5 transition">
                            Pay ₹{gstDetails.totalAmount.toFixed(2)} →
                          </span>
                        </button>

                      </div>
                    )}

                    {/* SUB-VIEW 2: REALISTIC UPI QR CODE WITH SCANNING LASER */}
                    {activeUpiMode === 'qr' && (
                      <div className="flex flex-col items-center justify-center p-5 rounded-[20px] border border-royal-500/30 bg-black/60 space-y-3.5 animate-fade-in text-center">
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-royal-300">
                          <QrCode className="h-4 w-4" />
                          <span>Scan with Any UPI App (PhonePe, GPay, Paytm, BHIM)</span>
                        </div>

                        {/* QR Code Container with High Contrast & Pulsing Scanning Line */}
                        <div className="relative bg-white p-3.5 rounded-[18px] shadow-2xl ring-4 ring-royal-500/30 overflow-hidden">
                          <div className="grid grid-cols-25 gap-0 w-44 h-44">
                            {qrMatrix.map((row, rIdx) => (
                              <div key={rIdx} className="flex">
                                {row.map((cell, cIdx) => (
                                  <div
                                    key={cIdx}
                                    className={`w-[7px] h-[7px] ${cell ? 'bg-black' : 'bg-white'}`}
                                  />
                                ))}
                              </div>
                            ))}
                          </div>

                          {/* Animated Scanning Laser */}
                          <motion.div
                            className="absolute left-0 right-0 h-1 bg-royal-500 shadow-[0_0_8px_#3B82F6]"
                            animate={{ top: ['5%', '95%', '5%'] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                          />
                        </div>

                        <div className="flex items-center gap-2 text-slate-300 text-xs font-mono">
                          <span>UPI ID:</span>
                          <strong className="text-white font-bold">{creatorVpa}</strong>
                          <button
                            type="button"
                            onClick={handleCopyVpa}
                            className="p-1.5 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-royal-400 transition"
                            title="Copy UPI ID"
                          >
                            {vpaCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </div>

                        <RippleButton
                          onClick={() => handleSimulatePayment('upi', 'PhonePe')}
                          className="w-full rounded-[14px] bg-royal-600 hover:bg-royal-500 py-3 text-xs font-bold text-white shadow-royal"
                        >
                          <Zap className="h-4 w-4 fill-white" />
                          <span>I Have Scanned & Paid ₹{gstDetails.totalAmount.toFixed(2)}</span>
                        </RippleButton>
                      </div>
                    )}

                    {/* SUB-VIEW 3: ENTER CUSTOM UPI ID / VPA */}
                    {activeUpiMode === 'vpa' && (
                      <div className="p-4 rounded-[20px] border border-white/[0.08] bg-black/40 space-y-3.5 animate-fade-in">
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Enter your UPI ID / VPA
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={customVpa}
                              onChange={(e) => setCustomVpa(e.target.value)}
                              placeholder="creator@okaxis / mobile@upi"
                              className="flex-1 rounded-[14px] border border-white/[0.1] bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 font-mono focus:border-royal-500 focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => setCustomVpa('creator@okaxis')}
                              className="rounded-[12px] bg-white/[0.06] border border-white/[0.1] px-3 py-2.5 text-[11px] font-semibold text-royal-300 hover:bg-white/[0.1]"
                            >
                              Auto-Fill
                            </button>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1">
                            A collect request for ₹{gstDetails.totalAmount.toFixed(2)} will be triggered to your UPI app.
                          </p>
                        </div>

                        {/* Creator Payee VPA Card */}
                        <div className="p-3 rounded-[14px] bg-royal-600/10 border border-royal-500/25 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[10px] text-royal-300 font-mono uppercase">Merchant Payee VPA:</span>
                            <p className="font-mono text-white font-bold">{creatorVpa}</p>
                          </div>
                          <button
                            type="button"
                            onClick={handleCopyVpa}
                            className="flex items-center gap-1 text-[11px] font-semibold text-royal-400 hover:underline"
                          >
                            {vpaCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                            <span>{vpaCopied ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>

                        <RippleButton
                          onClick={() => handleSimulatePayment('upi', 'PhonePe')}
                          className="w-full rounded-[14px] bg-royal-600 hover:bg-royal-500 py-3 text-xs font-bold text-white shadow-royal"
                        >
                          <Zap className="h-4 w-4 fill-white" />
                          <span>Send UPI Payment Request</span>
                        </RippleButton>
                      </div>
                    )}

                  </div>
                )}

                {/* ========================================================================= */}
                {/* 2. RAZORPAY CARDS (CREDIT / DEBIT) */}
                {/* ========================================================================= */}
                {activePaymentCategory === 'card' && (
                  <div className="p-4 rounded-[20px] border border-white/[0.08] bg-black/40 space-y-3.5 animate-fade-in">
                    
                    {/* Card Logos Strip */}
                    <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 text-[10px] text-slate-400 font-mono">
                      <span>Supported Cards:</span>
                      <div className="flex items-center gap-1.5 font-bold text-slate-300">
                        <span className="bg-blue-600/30 px-1.5 py-0.5 rounded text-blue-300">VISA</span>
                        <span className="bg-rose-600/30 px-1.5 py-0.5 rounded text-rose-300">Mastercard</span>
                        <span className="bg-emerald-600/30 px-1.5 py-0.5 rounded text-emerald-300">RuPay</span>
                        <span className="bg-indigo-600/30 px-1.5 py-0.5 rounded text-indigo-300">Amex</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => formatCardNumberInput(e.target.value)}
                          placeholder="4532 •••• •••• 8821"
                          className="w-full rounded-[14px] border border-white/[0.1] bg-black/50 px-3.5 py-2.5 text-xs text-white font-mono focus:border-royal-500 focus:outline-none tracking-wider"
                        />
                        <CreditCard className="absolute right-3.5 top-3 h-4 w-4 text-slate-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => formatExpiryInput(e.target.value)}
                          placeholder="MM / YY"
                          className="w-full rounded-[14px] border border-white/[0.1] bg-black/50 px-3.5 py-2.5 text-xs text-white font-mono focus:border-royal-500 focus:outline-none text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">CVV / CVC</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                          placeholder="•••"
                          className="w-full rounded-[14px] border border-white/[0.1] bg-black/50 px-3.5 py-2.5 text-xs text-white font-mono focus:border-royal-500 focus:outline-none text-center"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="Name as on card"
                        className="w-full rounded-[14px] border border-white/[0.1] bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-royal-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="saveCardCheckbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="rounded border-white/20 bg-black text-royal-500 focus:ring-royal-500"
                      />
                      <label htmlFor="saveCardCheckbox" className="text-[11px] text-slate-300">
                        Securely save card as per RBI tokenization guidelines
                      </label>
                    </div>

                    <RippleButton
                      onClick={() => handleSimulatePayment('card')}
                      className="w-full rounded-[14px] bg-royal-600 hover:bg-royal-500 py-3 text-xs font-bold text-white shadow-royal"
                    >
                      <Lock className="h-4 w-4" />
                      <span>Pay ₹{formatINRDecimal(gstDetails.totalAmount)} via Razorpay Card</span>
                    </RippleButton>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* 3. RAZORPAY NET BANKING */}
                {/* ========================================================================= */}
                {activePaymentCategory === 'netbanking' && (
                  <div className="p-4 rounded-[20px] border border-white/[0.08] bg-black/40 space-y-3.5 animate-fade-in">
                    
                    <span className="block text-xs font-semibold text-slate-200">
                      Popular Indian Banks
                    </span>

                    {/* Popular Banks Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {POPULAR_BANKS.map((bank) => (
                        <button
                          key={bank.id}
                          type="button"
                          onClick={() => setSelectedBank(bank.id)}
                          className={`p-2.5 rounded-[12px] border text-left flex items-center gap-2 transition ${
                            selectedBank === bank.id
                              ? 'border-royal-500 bg-royal-600/20 text-white shadow-royal-sm ring-1 ring-royal-500'
                              : 'border-white/[0.08] bg-black/40 text-slate-300 hover:border-white/[0.2]'
                          }`}
                        >
                          <span className="text-base">{bank.logo}</span>
                          <span className="text-xs font-medium truncate">{bank.name}</span>
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Or Select Other Indian Banks
                      </label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full rounded-[14px] border border-white/[0.1] bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-royal-500 focus:outline-none"
                      >
                        {ALL_BANKS.map((b) => (
                          <option key={b.id} value={b.id} className="bg-[#0A0D17] text-white">
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <RippleButton
                      onClick={() => handleSimulatePayment('netbanking')}
                      className="w-full rounded-[14px] bg-royal-600 hover:bg-royal-500 py-3 text-xs font-bold text-white shadow-royal"
                    >
                      <Building2 className="h-4 w-4" />
                      <span>Pay ₹{gstDetails.totalAmount.toFixed(2)} via Net Banking</span>
                    </RippleButton>
                  </div>
                )}

              </div>

              {/* Security Footnote */}
              <div className="pt-2 flex items-center justify-center gap-4 text-[10px] text-slate-500 font-mono">
                <span className="flex items-center gap-1">
                  <Lock className="h-3 w-3 text-emerald-400" /> 256-Bit SSL Encrypted
                </span>
                <span>•</span>
                <span>Razorpay Gateway</span>
                <span>•</span>
                <span>GSTR-1 Tax Ready</span>
              </div>

            </div>
          )}

          {/* STEP 2: VERIFYING PAYMENT / PROCESSING ANIMATION */}
          {step === 'processing' && (
            <div className="py-16 text-center animate-fade-in p-6 space-y-5">
              <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-royal-500/20 border-t-royal-500 animate-spin" />
                <ShieldCheck className="h-9 w-9 text-royal-400 animate-pulse" />
              </div>

              <div>
                <h3 className="font-display text-xl font-bold text-white mb-1.5">
                  Authorizing Payment...
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed font-mono">
                  {processingStatus}
                </p>
              </div>

              {/* Progress bar */}
              <div className="max-w-xs mx-auto">
                <div className="h-1.5 w-full rounded-full bg-white/[0.08] overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-royal-500 to-emerald-400"
                    initial={{ width: '10%' }}
                    animate={{ width: `${processingProgress}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.08] px-4 py-1.5 text-xs text-slate-400 font-mono">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>NPCI / Razorpay Gateway Handshake OK</span>
              </div>
            </div>
          )}

          {/* STEP 3: CELEBRATORY SUCCESS STATE WITH WHATSAPP DISPATCH & GST INVOICE GENERATOR */}
          {step === 'success' && completedOrder && (
            <div className="p-6 sm:p-7 animate-fade-in space-y-5">
              
              <div className="text-center">
                {/* Celebratory Checkmark with Expanding Ripple */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                  className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 shadow-xl shadow-emerald-500/20"
                >
                  <CheckCircle2 className="h-9 w-9 text-emerald-400" />
                </motion.div>

                <span className="rounded-full bg-emerald-500/15 px-3.5 py-1 text-[10px] font-bold text-emerald-400 border border-emerald-500/30 font-mono">
                  {completedOrder.paymentMethod} Payment Verified • Ref: {completedOrder.upiRefId}
                </span>

                <h3 className="font-display text-2xl font-bold text-white mt-2.5">
                  Payment Confirmed, {completedOrder.buyerName.split(' ')[0]}!
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  You successfully paid <strong className="text-white font-mono">₹{formatINRDecimal(completedOrder.totalAmount)}</strong> via {completedOrder.paymentMethod === 'UPI' ? completedOrder.paymentApp : completedOrder.paymentMethod}.
                </p>
              </div>

              {/* Instant WhatsApp Delivery Banner */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="rounded-[18px] border border-emerald-500/30 bg-emerald-950/30 p-4 flex items-start gap-3.5 shadow-glass-subtle"
              >
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
                    Instant access link and tax invoice dispatched to <span className="font-mono text-white font-semibold">{completedOrder.buyerPhone}</span>.
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons based on product type */}
              <div className="space-y-2.5">
                {item.type === 'product' && (
                  <a
                    href={item.downloadUrl || '#'}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 rounded-[16px] bg-gradient-to-r from-emerald-600 to-teal-600 py-3 text-xs font-bold text-white shadow-lg hover:brightness-110 transition btn-press"
                  >
                    <Download className="h-4 w-4" />
                    <span>Instant Download {item.title.slice(0, 24)} (PDF)</span>
                  </a>
                )}

                {item.type === 'booking' && (
                  <div className="rounded-[16px] border border-royal-500/30 bg-royal-600/15 p-3.5 text-center text-xs">
                    <p className="text-royal-300 font-bold mb-0.5">🗓 1:1 Consultation Slot Confirmed</p>
                    <p className="text-slate-300 text-[11px]">
                      Slot reserved for {completedOrder.bookingDate} at {completedOrder.bookingTimeSlot}. Google Meet invite sent.
                    </p>
                  </div>
                )}

                {item.type === 'course' && (
                  <a
                    href={`/${activeCreator?.username}/course/${item.id}`}
                    className="w-full flex items-center justify-center gap-2 rounded-[16px] bg-royal-600 hover:bg-royal-500 py-3 text-xs font-bold text-white shadow-royal hover:brightness-110 transition btn-press"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Open Student Course Portal</span>
                  </a>
                )}

                {/* Open GST Invoice Modal Button */}
                <RippleButton
                  onClick={() => setShowInvoiceModal(true)}
                  className="w-full rounded-[16px] border border-white/[0.12] bg-white/[0.04] py-3 text-xs font-semibold text-slate-200 hover:bg-white/[0.08] flex items-center justify-center gap-2"
                >
                  <FileText className="h-4 w-4 text-royal-400" />
                  <span>View Official GST Tax Invoice ({completedOrder.invoiceNumber})</span>
                </RippleButton>
              </div>

              <button
                onClick={onClose}
                className="w-full text-center text-xs text-slate-400 hover:text-white transition py-1 font-medium"
              >
                Close & Return to Store
              </button>

            </div>
          )}

        </motion.div>
      </div>

      {/* EMBEDDED GST INVOICE MODAL */}
      {completedOrder && (
        <GSTInvoiceModal
          isOpen={showInvoiceModal}
          onClose={() => setShowInvoiceModal(false)}
          order={completedOrder}
        />
      )}
    </>
  );
}
