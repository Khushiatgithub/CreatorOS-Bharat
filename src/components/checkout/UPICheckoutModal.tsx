'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  QrCode, 
  Smartphone, 
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
  Building2,
  ExternalLink,
  Info
} from 'lucide-react';
import { INDIAN_STATES, calculateGST, SAC_CODES } from '@/lib/gst';
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

export default function UPICheckoutModal({
  isOpen,
  onClose,
  item,
  bookingDate,
  bookingTimeSlot
}: UPICheckoutModalProps) {
  const { activeCreator, processCheckout } = useCreatorStore();

  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [activePaymentTab, setActivePaymentTab] = useState<'apps' | 'qr' | 'upi_id'>('apps');
  const [selectedApp, setSelectedApp] = useState<'PhonePe' | 'GPay' | 'Paytm' | 'CRED'>('PhonePe');
  
  // Custom UPI ID input for UPI ID tab
  const [customVpa, setCustomVpa] = useState('');
  const [vpaCopied, setVpaCopied] = useState(false);
  const [showGstPreview, setShowGstPreview] = useState(false);

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
  const creatorVpa = activeCreator?.upiId || 'creatoros@upi';
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

  const handleSimulatePayment = (appName?: 'PhonePe' | 'GPay' | 'Paytm' | 'CRED') => {
    if (!name.trim() || !phone.trim() || !email.trim()) {
      alert('Please enter your full name, email, and WhatsApp number');
      return;
    }

    setStep('processing');

    setTimeout(() => {
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
        paymentApp: appName || selectedApp,
        bookingDate,
        bookingTimeSlot
      });

      setCompletedOrder(order);
      setStep('success');

      try {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#2563EB', '#60A5FA', '#10B981', '#F8FAFC', '#5F259F', '#00B9F5']
        });
      } catch (e) {
        console.warn(e);
      }
    }, 1400);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-2xl overflow-y-auto animate-fade-in">
        
        {/* RAZORPAY-INSPIRED INDIAN CHECKOUT MODAL */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 15 }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          className="relative w-full max-w-xl rounded-[24px] border border-white/[0.12] bg-[#0A0E1A] shadow-2xl text-slate-100 overflow-hidden my-4"
        >
          
          {/* RAZORPAY / CREATOROS BRANDED TOP HEADER */}
          <div className="bg-gradient-to-r from-[#0E152E] via-[#101A38] to-[#0A0E1A] p-4 sm:p-5 border-b border-white/[0.08] relative">
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full p-2 text-slate-400 hover:bg-white/[0.08] hover:text-white transition btn-press z-10"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-start justify-between gap-4 pr-8">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-[14px] bg-gradient-to-b from-royal-500 to-royal-700 p-0.5 shadow-royal flex items-center justify-center shrink-0">
                  <img
                    src={activeCreator?.avatarUrl}
                    alt={payeeName}
                    className="h-full w-full rounded-[12px] object-cover bg-black"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-display text-sm sm:text-base font-bold text-white">
                      {payeeName}
                    </h3>
                    <span title="Verified Indian Merchant">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                    <span>Secured by</span>
                    <span className="font-bold text-royal-400 font-mono text-[10px]">RAZORPAY • NPCI UPI</span>
                  </p>
                </div>
              </div>

              {/* Amount Display with Session Timer */}
              <div className="text-right">
                <div className="font-display text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">
                  ₹{gstDetails.totalAmount.toFixed(2)}
                </div>
                <div className="flex items-center justify-end gap-1 text-[10px] text-amber-400 font-mono font-semibold">
                  <Clock className="h-3 w-3" />
                  <span>{formatTime(secondsRemaining)}</span>
                </div>
              </div>
            </div>

            {/* Item Details Strip */}
            <div className="mt-3.5 pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 max-w-[70%]">
                <span className="rounded-md bg-royal-600/20 text-royal-300 border border-royal-500/30 px-1.5 py-0.5 text-[9px] font-bold uppercase font-mono">
                  {item.type}
                </span>
                <span className="text-slate-200 font-medium truncate">{item.title}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowGstPreview(!showGstPreview)}
                className="text-[11px] text-royal-400 hover:text-royal-300 font-semibold flex items-center gap-1 font-mono"
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
                  <div className="mt-3 p-3.5 rounded-[16px] bg-black/40 border border-white/[0.08] text-xs space-y-2">
                    <div className="flex justify-between text-slate-300 font-mono text-[11px]">
                      <span>SAC Code:</span>
                      <span className="text-royal-400 font-bold">
                        {SAC_CODES[item.type.toUpperCase() as keyof typeof SAC_CODES]?.code || '998431'}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Taxable Value (Base Price):</span>
                      <span className="font-mono">₹{item.price.toFixed(2)}</span>
                    </div>
                    {gstDetails.isInterState ? (
                      <div className="flex justify-between text-slate-400">
                        <span>IGST (18% Inter-State to {buyerState}):</span>
                        <span className="font-mono text-royal-300">₹{gstDetails.igst.toFixed(2)}</span>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between text-slate-400">
                          <span>CGST (9% Central):</span>
                          <span className="font-mono text-blue-300">₹{gstDetails.cgst.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>SGST (9% State - {buyerState}):</span>
                          <span className="font-mono text-blue-300">₹{gstDetails.sgst.toFixed(2)}</span>
                        </div>
                      </>
                    )}
                    <div className="pt-2 border-t border-white/[0.08] flex justify-between font-bold text-white text-xs">
                      <span>Total Amount with 18% GST:</span>
                      <span className="text-emerald-400 font-mono">₹{gstDetails.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* STEP 1: CHECKOUT FORM & PAYMENT METHODS */}
          {step === 'form' && (
            <div className="p-5 sm:p-6 space-y-5 max-h-[72vh] overflow-y-auto">
              
              {/* Buyer Information Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    1. Contact & Tax Details
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
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Email ID</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full rounded-[12px] border border-white/[0.1] bg-black/40 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-slate-300 mb-1">Billing State</label>
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
                    GSTIN / Business Registration <span className="text-slate-500">(Optional for B2B input credit)</span>
                  </label>
                  <input
                    type="text"
                    value={buyerGst}
                    onChange={(e) => setBuyerGst(e.target.value)}
                    placeholder="27ABCDE1234F1Z5"
                    className="w-full rounded-[12px] border border-white/[0.1] bg-black/40 px-3 py-1.5 text-xs text-white font-mono focus:border-royal-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* PAYMENT METHOD TABS (Apps / QR Code / UPI ID) */}
              <div className="space-y-3 pt-2 border-t border-white/[0.08]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    2. Select UPI Payment Mode
                  </span>
                  <span className="text-[10px] text-royal-400 font-mono font-semibold">0% Dropoff • Instant</span>
                </div>

                {/* Tab selector */}
                <div className="flex items-center gap-1.5 p-1 rounded-[16px] bg-white/[0.04] border border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setActivePaymentTab('apps')}
                    className={`flex-1 py-2 rounded-[12px] text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      activePaymentTab === 'apps'
                        ? 'bg-royal-600 text-white shadow-royal-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                    <span>UPI Apps</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivePaymentTab('qr')}
                    className={`flex-1 py-2 rounded-[12px] text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      activePaymentTab === 'qr'
                        ? 'bg-royal-600 text-white shadow-royal-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <QrCode className="h-3.5 w-3.5" />
                    <span>Scan QR</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActivePaymentTab('upi_id')}
                    className={`flex-1 py-2 rounded-[12px] text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      activePaymentTab === 'upi_id'
                        ? 'bg-royal-600 text-white shadow-royal-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Zap className="h-3.5 w-3.5" />
                    <span>UPI ID</span>
                  </button>
                </div>

                {/* TAB 1: PHONEPE, GPAY, PAYTM, CRED BUTTONS */}
                {activePaymentTab === 'apps' && (
                  <div className="space-y-2.5 pt-1 animate-fade-in">
                    
                    {/* PhonePe Button (Brand Purple) */}
                    <button
                      type="button"
                      onClick={() => handleSimulatePayment('PhonePe')}
                      className="w-full flex items-center justify-between p-3.5 rounded-[16px] border border-[#5F259F]/40 bg-gradient-to-r from-[#5F259F]/20 to-[#311353]/30 hover:from-[#5F259F]/35 hover:to-[#311353]/50 hover:border-[#5F259F] text-white transition btn-press group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#5F259F] text-white font-black text-xs flex items-center justify-center shadow-md">
                          पे
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-xs text-white">PhonePe</p>
                          <p className="text-[10px] text-purple-300">Fastest 1-Click UPI Payment</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-white group-hover:translate-x-0.5 transition">
                        Pay ₹{gstDetails.totalAmount.toFixed(2)} →
                      </span>
                    </button>

                    {/* Google Pay Button */}
                    <button
                      type="button"
                      onClick={() => handleSimulatePayment('GPay')}
                      className="w-full flex items-center justify-between p-3.5 rounded-[16px] border border-blue-500/30 bg-gradient-to-r from-blue-600/15 to-blue-900/20 hover:from-blue-600/30 hover:to-blue-900/40 hover:border-blue-400 text-white transition btn-press group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-white text-black font-black text-xs flex items-center justify-center shadow-md">
                          <span className="text-blue-600 font-bold">G</span><span className="text-red-500 font-bold">P</span>
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-xs text-white">Google Pay (GPay)</p>
                          <p className="text-[10px] text-blue-300">Zero OTP friction with UPI PIN</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-white group-hover:translate-x-0.5 transition">
                        Pay ₹{gstDetails.totalAmount.toFixed(2)} →
                      </span>
                    </button>

                    {/* Paytm Button */}
                    <button
                      type="button"
                      onClick={() => handleSimulatePayment('Paytm')}
                      className="w-full flex items-center justify-between p-3.5 rounded-[16px] border border-[#00B9F5]/30 bg-gradient-to-r from-[#00B9F5]/15 to-[#002E6E]/20 hover:from-[#00B9F5]/30 hover:to-[#002E6E]/40 hover:border-[#00B9F5] text-white transition btn-press group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-[#002E6E] text-[#00B9F5] font-black text-[10px] flex items-center justify-center shadow-md">
                          Paytm
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-xs text-white">Paytm UPI</p>
                          <p className="text-[10px] text-cyan-300">Direct Indian bank debit</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-white group-hover:translate-x-0.5 transition">
                        Pay ₹{gstDetails.totalAmount.toFixed(2)} →
                      </span>
                    </button>

                    {/* CRED UPI Button */}
                    <button
                      type="button"
                      onClick={() => handleSimulatePayment('CRED')}
                      className="w-full flex items-center justify-between p-3.5 rounded-[16px] border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-black to-black hover:border-amber-400 text-white transition btn-press group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-black border border-amber-500/40 text-amber-400 font-black text-xs flex items-center justify-center shadow-md">
                          C
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-xs text-white">CRED UPI</p>
                          <p className="text-[10px] text-amber-300">Earn CRED coins on payment</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-white group-hover:translate-x-0.5 transition">
                        Pay ₹{gstDetails.totalAmount.toFixed(2)} →
                      </span>
                    </button>

                  </div>
                )}

                {/* TAB 2: INTERACTIVE CRISP QR CODE */}
                {activePaymentTab === 'qr' && (
                  <div className="flex flex-col items-center justify-center p-5 rounded-[20px] border border-royal-500/30 bg-black/60 space-y-3.5 animate-fade-in text-center">
                    <span className="text-[11px] font-semibold text-royal-300">
                      Scan with PhonePe, GPay, Paytm, CRED or BHIM
                    </span>

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
                      <span>VPA:</span>
                      <strong className="text-white">{creatorVpa}</strong>
                      <button
                        type="button"
                        onClick={handleCopyVpa}
                        className="p-1 rounded-md bg-white/[0.06] hover:bg-white/[0.12] text-royal-400"
                        title="Copy UPI ID"
                      >
                        {vpaCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                    </div>

                    <RippleButton
                      onClick={() => handleSimulatePayment('PhonePe')}
                      className="w-full rounded-[14px] bg-royal-600 hover:bg-royal-500 py-3 text-xs font-bold text-white shadow-royal"
                    >
                      <Zap className="h-4 w-4 fill-white" />
                      <span>I Have Scanned & Paid ₹{gstDetails.totalAmount.toFixed(2)}</span>
                    </RippleButton>
                  </div>
                )}

                {/* TAB 3: ENTER UPI ID (VPA) */}
                {activePaymentTab === 'upi_id' && (
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
                          placeholder="yourname@okaxis / mobile@upi"
                          className="flex-1 rounded-[14px] border border-white/[0.1] bg-black/50 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 font-mono focus:border-royal-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setCustomVpa('rahul@okhdfcbank')}
                          className="rounded-[12px] bg-white/[0.06] border border-white/[0.1] px-3 py-2.5 text-[11px] font-semibold text-royal-300 hover:bg-white/[0.1]"
                        >
                          Auto-Fill
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">
                        A payment request for ₹{gstDetails.totalAmount.toFixed(2)} will be sent to your UPI app.
                      </p>
                    </div>

                    {/* Creator Payee VPA Card */}
                    <div className="p-3 rounded-[14px] bg-royal-600/10 border border-royal-500/25 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-royal-300 font-mono uppercase">Merchant Payee ID:</span>
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
                      onClick={() => handleSimulatePayment('PhonePe')}
                      className="w-full rounded-[14px] bg-royal-600 hover:bg-royal-500 py-3 text-xs font-bold text-white shadow-royal"
                    >
                      <Zap className="h-4 w-4 fill-white" />
                      <span>Send UPI Payment Request</span>
                    </RippleButton>
                  </div>
                )}

              </div>

              <div className="pt-2 flex items-center justify-center gap-4 text-[10px] text-slate-500 font-mono">
                <span className="flex items-center gap-1"><Lock className="h-3 w-3 text-emerald-400" /> 256-Bit SSL Encrypted</span>
                <span>•</span>
                <span>NPCI UPI 2.0 Standard</span>
                <span>•</span>
                <span>GSTR-1 Tax Ready</span>
              </div>

            </div>
          )}

          {/* STEP 2: VERIFYING PAYMENT / PROCESSING ANIMATION */}
          {step === 'processing' && (
            <div className="py-16 text-center animate-fade-in p-6">
              <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-royal-500/20 border-t-royal-500 animate-spin" />
                <Smartphone className="h-8 w-8 text-royal-400 animate-pulse" />
              </div>

              <h3 className="font-display text-xl font-bold text-white mb-1.5">
                Authorizing UPI Transaction...
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Waiting for UPI PIN confirmation from <span className="text-royal-300 font-bold">{selectedApp}</span> for ₹{gstDetails.totalAmount.toFixed(2)}.
              </p>
              
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/[0.08] px-4 py-1.5 text-xs text-slate-400 font-mono">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>NPCI Switch Handshake OK</span>
              </div>
            </div>
          )}

          {/* STEP 3: CELEBRATORY SUCCESS STATE WITH WHATSAPP DISPATCH & GST PREVIEW */}
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
                  UPI Payment Verified • Ref: {completedOrder.upiRefId}
                </span>

                <h3 className="font-display text-2xl font-bold text-white mt-2.5">
                  Payment Confirmed, {completedOrder.buyerName.split(' ')[0]}!
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  You successfully paid <strong className="text-white font-mono">₹{completedOrder.totalAmount.toFixed(2)}</strong> via {completedOrder.paymentApp}.
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
                  className="w-full rounded-[16px] border border-white/[0.12] bg-white/[0.04] py-3 text-xs font-semibold text-slate-200 hover:bg-white/[0.08]"
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
