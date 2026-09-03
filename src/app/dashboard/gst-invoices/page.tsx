'use client';

import React, { useState } from 'react';
import { useCreatorStore } from '@/lib/store';
import { 
  Receipt, 
  Download, 
  FileText, 
  ShieldCheck, 
  Filter, 
  Calendar, 
  Building, 
  CheckCircle2,
  ArrowUpRight,
  Plus,
  Search,
  Check,
  AlertCircle,
  Clock,
  Trash2,
  Printer,
  ChevronDown,
  X,
  Zap,
  Building2
} from 'lucide-react';
import GSTInvoiceModal from '@/components/invoice/GSTInvoiceModal';
import { Order, ProductType } from '@/types';
import { PageTransition, HoverCard, AnimatedCounter, RippleButton } from '@/components/ui/motion';
import { INDIAN_STATES, calculateGST, validateGSTIN, SAC_CODES, STATE_CODE_TO_NAME } from '@/lib/gst';

export default function GSTInvoicesPage() {
  const { orders, activeCreator, createInvoice, updateInvoiceStatus, deleteInvoice } = useCreatorStore();
  
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Paid' | 'Pending' | 'Overdue'>('ALL');
  const [stateFilter, setStateFilter] = useState('ALL');
  const [sacFilter, setSacFilter] = useState('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New invoice form state
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('+91 ');
  const [buyerState, setBuyerState] = useState(activeCreator?.state || 'Karnataka');
  const [buyerGst, setBuyerGst] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [itemTitle, setItemTitle] = useState('');
  const [itemType, setItemType] = useState<ProductType>('product');
  const [sacCode, setSacCode] = useState('998431');
  const [amount, setAmount] = useState('1499');
  const [gstRate, setGstRate] = useState(18);
  const [invoiceStatus, setInvoiceStatus] = useState<'Paid' | 'Pending' | 'Overdue'>('Paid');
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().split('T')[0];
  });
  const [notes, setNotes] = useState('Thank you for your business. Computer generated GST Tax Invoice.');

  // Live GST calculation for new invoice form
  const creatorState = activeCreator?.state || 'Karnataka';
  const numericAmount = Math.max(0, Number(amount) || 0);
  const liveGstCalc = calculateGST(numericAmount, creatorState, buyerState, gstRate);

  // GSTIN Live Validation
  const gstinValidation = buyerGst.trim() ? validateGSTIN(buyerGst) : null;

  const handleGstinChange = (val: string) => {
    const cleaned = val.toUpperCase().trim();
    setBuyerGst(cleaned);
    
    // Auto-detect state if 2 valid digits are typed
    if (cleaned.length >= 2) {
      const stateCode = cleaned.substring(0, 2);
      const matchedState = STATE_CODE_TO_NAME[stateCode];
      if (matchedState && INDIAN_STATES[matchedState]) {
        setBuyerState(matchedState);
      }
    }
  };

  const handleCreateInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName.trim() || !itemTitle.trim() || numericAmount <= 0) {
      alert('Please enter valid customer details, item title, and amount.');
      return;
    }

    const created = createInvoice({
      buyerName: buyerName.trim(),
      buyerEmail: buyerEmail.trim() || `${buyerName.toLowerCase().replace(/\s+/g, '')}@client.in`,
      buyerPhone: buyerPhone.trim(),
      buyerState,
      buyerGst: buyerGst.trim() || undefined,
      billingAddress: billingAddress.trim() || undefined,
      itemTitle: itemTitle.trim(),
      itemType,
      sacCode,
      amount: numericAmount,
      gstRate,
      status: invoiceStatus,
      dueDate: invoiceStatus !== 'Paid' ? dueDate : undefined,
      notes: notes.trim() || undefined
    });

    setShowCreateModal(false);
    // Reset form fields
    setBuyerName('');
    setBuyerEmail('');
    setBuyerPhone('+91 ');
    setBuyerGst('');
    setBillingAddress('');
    setItemTitle('');
    setAmount('1499');
    
    // Automatically preview the created invoice
    setSelectedInvoiceOrder(created);
  };

  // Filtered Orders / Invoices
  const filteredOrders = orders.filter((ord) => {
    // 1. Search Query Filter (Customer Name, Email, Phone, Invoice No, GSTIN)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = ord.buyerName?.toLowerCase().includes(q);
      const matchEmail = ord.buyerEmail?.toLowerCase().includes(q);
      const matchPhone = ord.buyerPhone?.toLowerCase().includes(q);
      const matchInv = ord.invoiceNumber?.toLowerCase().includes(q);
      const matchGst = ord.buyerGst?.toLowerCase().includes(q);
      const matchTitle = ord.itemTitle?.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchPhone && !matchInv && !matchGst && !matchTitle) {
        return false;
      }
    }

    // 2. Status Filter
    const ordStatus = ord.paymentStatus || (ord.status === 'completed' ? 'Paid' : 'Pending');
    if (statusFilter !== 'ALL' && ordStatus !== statusFilter) {
      return false;
    }

    // 3. State Filter
    if (stateFilter !== 'ALL') {
      if (stateFilter === 'INTRA') {
        if (ord.buyerState.toLowerCase() !== creatorState.toLowerCase()) return false;
      } else if (stateFilter === 'INTER') {
        if (ord.buyerState.toLowerCase() === creatorState.toLowerCase()) return false;
      } else if (ord.buyerState.toLowerCase() !== stateFilter.toLowerCase()) {
        return false;
      }
    }

    // 4. SAC Code Filter
    if (sacFilter !== 'ALL' && ord.sacCode !== sacFilter) {
      return false;
    }

    return true;
  });

  // Financial aggregates
  const totalTaxable = orders.reduce((sum, o) => sum + o.amount, 0);
  const totalCGST = orders.reduce((sum, o) => sum + o.cgst, 0);
  const totalSGST = orders.reduce((sum, o) => sum + o.sgst, 0);
  const totalIGST = orders.reduce((sum, o) => sum + o.igst, 0);
  const grandTotal = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const paidCount = orders.filter((o) => (o.paymentStatus || (o.status === 'completed' ? 'Paid' : 'Pending')) === 'Paid').length;
  const pendingCount = orders.length - paidCount;

  return (
    <PageTransition>
      <div className="space-y-6 font-sans">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>GST Tax Invoices & Compliance</span>
              <span className="rounded-full bg-royal-600/15 text-royal-400 border border-royal-500/30 text-[10px] font-bold px-2.5 py-0.5 font-mono">
                Indian GST Act 2017
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Automated B2B & B2C tax invoices with real-time CGST, SGST & IGST breakdown, SAC codes, and PDF export.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-[14px] border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-xs text-slate-300 hidden md:block">
              <span className="text-slate-500 font-mono">GSTIN:</span>{' '}
              <span className="text-royal-400 font-mono font-bold">{activeCreator?.gstNumber || '29AAECS4567M1ZV'}</span>
            </div>

            <RippleButton
              onClick={() => setShowCreateModal(true)}
              className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-4 py-2.5 text-xs font-semibold text-white shadow-royal flex items-center gap-1.5"
            >
              <Plus className="h-4 w-4" />
              <span>Create Invoice</span>
            </RippleButton>
          </div>
        </div>

        {/* TAX LEDGER SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-white/[0.15]">
            <p className="text-xs text-slate-400">Total Taxable Turnover</p>
            <div className="font-display text-2xl font-extrabold text-white mt-1 font-mono">
              <AnimatedCounter value={totalTaxable} prefix="₹" decimals={2} />
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-mono">{orders.length} Invoices Generated</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-blue-500/30">
            <p className="text-xs text-slate-400">Intra-State (CGST 9% + SGST 9%)</p>
            <div className="font-display text-2xl font-extrabold text-blue-400 mt-1 font-mono">
              <AnimatedCounter value={totalCGST + totalSGST} prefix="₹" decimals={2} />
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-mono">Within {creatorState}</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            <p className="text-xs text-slate-400">Inter-State (IGST 18%)</p>
            <div className="font-display text-2xl font-extrabold text-royal-400 mt-1 font-mono">
              <AnimatedCounter value={totalIGST} prefix="₹" decimals={2} />
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-mono">Outside {creatorState}</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-royal-500/25 bg-gradient-to-b from-[#0C1226] to-[#0A0E1A] p-5 shadow-glass-card hover:border-royal-500/50">
            <div className="flex items-center justify-between">
              <p className="text-xs text-royal-400 font-semibold">Total Invoiced Amount</p>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                {paidCount} Paid • {pendingCount} Pending
              </span>
            </div>
            <div className="font-display text-2xl font-extrabold text-white mt-1 font-mono">
              <AnimatedCounter value={grandTotal} prefix="₹" decimals={2} />
            </div>
            <p className="text-[11px] text-emerald-400 mt-1 font-mono">100% GSTR-1 Ready</p>
          </HoverCard>
        </div>

        {/* SAC CODE REFERENCE BAR */}
        <div className="rounded-[20px] border border-white/[0.08] bg-white/[0.02] p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="font-semibold text-white">SAC Codes Applied:</span>
          </div>
          <div className="flex flex-wrap gap-2 font-mono text-[11px]">
            <span className="rounded-lg bg-black/40 px-2.5 py-1 text-royal-300 border border-white/[0.08]">
              998431: Digital Content & Notes
            </span>
            <span className="rounded-lg bg-black/40 px-2.5 py-1 text-blue-300 border border-white/[0.08]">
              999293: Online Courses & Training
            </span>
            <span className="rounded-lg bg-black/40 px-2.5 py-1 text-indigo-300 border border-white/[0.08]">
              998313: 1:1 Professional Advisory
            </span>
          </div>
        </div>

        {/* INVOICES SECTION WITH CUSTOMER SEARCH & ADVANCED FILTERS */}
        <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-5 sm:p-6 shadow-glass-card space-y-4">
          
          {/* Header & Controls Toolbar */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                <span>Invoice Ledger & History</span>
                <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-[11px] font-mono text-slate-300">
                  {filteredOrders.length}
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Search, filter, export PDF, and update settlement status.
              </p>
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* Customer Search Bar */}
              <div className="relative min-w-[220px] flex-1 sm:flex-none">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customer, invoice, phone..."
                  className="w-full rounded-[12px] border border-white/[0.1] bg-black/40 pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-royal-500 focus:outline-none font-sans"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-slate-500 hover:text-white text-xs"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="rounded-[12px] border border-white/[0.1] bg-black/40 px-3 py-1.5 text-xs text-white focus:border-royal-500 focus:outline-none"
              >
                <option value="ALL">All Statuses</option>
                <option value="Paid">Status: Paid</option>
                <option value="Pending">Status: Pending</option>
                <option value="Overdue">Status: Overdue</option>
              </select>

              {/* State / Supply Filter */}
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="rounded-[12px] border border-white/[0.1] bg-black/40 px-3 py-1.5 text-xs text-white focus:border-royal-500 focus:outline-none"
              >
                <option value="ALL">All Supply Places</option>
                <option value="INTRA">Intra-State ({creatorState})</option>
                <option value="INTER">Inter-State (IGST)</option>
                {Object.keys(INDIAN_STATES).map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>

              {/* SAC Filter */}
              <select
                value={sacFilter}
                onChange={(e) => setSacFilter(e.target.value)}
                className="rounded-[12px] border border-white/[0.1] bg-black/40 px-3 py-1.5 text-xs text-white focus:border-royal-500 focus:outline-none font-mono"
              >
                <option value="ALL">All SAC</option>
                <option value="998431">SAC 998431 (Digital)</option>
                <option value="999293">SAC 999293 (Course)</option>
                <option value="998313">SAC 998313 (Consulting)</option>
              </select>
            </div>
          </div>

          {/* INVOICES TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/[0.08] text-slate-400 uppercase font-semibold text-[10px] tracking-wider">
                <tr>
                  <th className="pb-3 pr-4">Invoice No & Date</th>
                  <th className="pb-3 pr-4">Customer & State</th>
                  <th className="pb-3 pr-4">SAC Code</th>
                  <th className="pb-3 pr-4 text-right">Taxable (₹)</th>
                  <th className="pb-3 pr-4 text-right">GST (CGST/SGST/IGST)</th>
                  <th className="pb-3 pr-4 text-right">Total Amount</th>
                  <th className="pb-3 pr-4 text-center">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-slate-300">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400 text-xs">
                      No matching GST invoices found for the current search/filter.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord) => {
                    const taxSum = ord.cgst + ord.sgst + ord.igst;
                    const isInterState = ord.buyerState.toLowerCase() !== creatorState.toLowerCase();
                    const status = ord.paymentStatus || (ord.status === 'completed' ? 'Paid' : 'Pending');

                    return (
                      <tr key={ord.id} className="hover:bg-white/[0.03] transition-colors group">
                        
                        {/* Invoice Number & Date */}
                        <td className="py-3.5 pr-4">
                          <p className="font-mono text-royal-400 font-bold">{ord.invoiceNumber}</p>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                            {new Date(ord.date).toLocaleDateString('en-IN', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric'
                            })}
                          </p>
                        </td>

                        {/* Customer & State */}
                        <td className="py-3.5 pr-4">
                          <p className="font-semibold text-white">{ord.buyerName}</p>
                          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                            <span>{ord.buyerState}</span>
                            <span>•</span>
                            <span className="font-mono">{ord.buyerPhone}</span>
                          </div>
                          {ord.buyerGst && (
                            <span className="inline-block font-mono text-[9px] font-bold text-blue-300 bg-blue-950/60 border border-blue-500/30 px-1.5 py-0.2 rounded mt-0.5">
                              GSTIN: {ord.buyerGst}
                            </span>
                          )}
                        </td>

                        {/* SAC Code */}
                        <td className="py-3.5 pr-4">
                          <span className="font-mono text-royal-300 bg-royal-600/15 border border-royal-500/25 px-2 py-0.5 rounded text-[11px] font-semibold">
                            {ord.sacCode}
                          </span>
                          <p className="text-[10px] text-slate-400 truncate max-w-[140px] mt-1">
                            {ord.itemTitle}
                          </p>
                        </td>

                        {/* Taxable Amount */}
                        <td className="py-3.5 pr-4 text-right font-mono font-medium text-slate-200">
                          ₹{ord.amount.toFixed(2)}
                        </td>

                        {/* GST Breakdown */}
                        <td className="py-3.5 pr-4 text-right font-mono text-[11px]">
                          <span className="text-royal-300 font-bold">₹{taxSum.toFixed(2)}</span>
                          <p className="text-[10px] text-slate-500">
                            {isInterState ? `IGST (18%)` : `CGST (9%) + SGST (9%)`}
                          </p>
                        </td>

                        {/* Total Amount */}
                        <td className="py-3.5 pr-4 text-right font-mono font-bold text-white text-xs">
                          ₹{ord.totalAmount.toFixed(2)}
                        </td>

                        {/* Status Toggle Badge */}
                        <td className="py-3.5 pr-4 text-center">
                          <div className="inline-flex items-center gap-1">
                            <select
                              value={status}
                              onChange={(e) => updateInvoiceStatus(ord.id, e.target.value as any)}
                              className={`text-[10px] font-bold font-mono px-2 py-1 rounded-[10px] border focus:outline-none transition cursor-pointer ${
                                status === 'Paid'
                                  ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                                  : status === 'Pending'
                                  ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                                  : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                              }`}
                            >
                              <option value="Paid" className="bg-[#0A0D17] text-emerald-400">PAID</option>
                              <option value="Pending" className="bg-[#0A0D17] text-amber-400">PENDING</option>
                              <option value="Overdue" className="bg-[#0A0D17] text-rose-400">OVERDUE</option>
                            </select>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedInvoiceOrder(ord)}
                              title="View & Export Legal GST Invoice"
                              className="inline-flex items-center gap-1 rounded-[10px] bg-royal-600/20 hover:bg-royal-600/35 border border-royal-500/30 px-2.5 py-1 text-xs font-semibold text-royal-300 hover:text-white transition btn-press"
                            >
                              <FileText className="h-3.5 w-3.5 text-royal-400" />
                              <span>View</span>
                            </button>

                            <button
                              onClick={() => setSelectedInvoiceOrder(ord)}
                              title="Download PDF"
                              className="p-1 rounded-[10px] bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 transition btn-press"
                            >
                              <Download className="h-3.5 w-3.5" />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Delete invoice ${ord.invoiceNumber}?`)) {
                                  deleteInvoice(ord.id);
                                }
                              }}
                              title="Delete Invoice"
                              className="p-1 rounded-[10px] text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition btn-press"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* CREATE INVOICE MODAL SHEET */}
        {/* ========================================================================= */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto animate-fade-in">
            <div className="relative w-full max-w-2xl rounded-[24px] border border-white/[0.12] bg-[#0A0E1A] p-6 shadow-2xl text-slate-100 animate-scale-in my-8 max-h-[92vh] overflow-y-auto">
              
              <button
                onClick={() => setShowCreateModal(false)}
                className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-white/[0.08] hover:text-white transition"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-5 w-5 text-royal-400" />
                <h3 className="font-display text-lg font-bold text-white">Create Official GST Tax Invoice</h3>
              </div>
              <p className="text-xs text-slate-400 mb-5">
                Generate a custom B2B or B2C tax invoice with automatic CGST, SGST, IGST calculations and SAC codes.
              </p>

              <form onSubmit={handleCreateInvoiceSubmit} className="space-y-4">
                
                {/* Section 1: Customer Details */}
                <div className="p-4 rounded-[18px] bg-black/40 border border-white/[0.08] space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-royal-400 font-mono">
                    1. Recipient / Customer Details
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Customer / Entity Name *</label>
                      <input
                        type="text"
                        required
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        placeholder="e.g. Swiggy India / Rahul Deshmukh"
                        className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">WhatsApp / Phone *</label>
                      <input
                        type="text"
                        required
                        value={buyerPhone}
                        onChange={(e) => setBuyerPhone(e.target.value)}
                        placeholder="+91 98234 56789"
                        className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white font-mono focus:border-royal-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Email ID</label>
                      <input
                        type="email"
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        placeholder="finance@client.in"
                        className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Place of Supply (Billing State) *</label>
                      <select
                        value={buyerState}
                        onChange={(e) => setBuyerState(e.target.value)}
                        className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                      >
                        {Object.keys(INDIAN_STATES).map((st) => (
                          <option key={st} value={st} className="bg-[#0A0D17] text-white">
                            {st} ({INDIAN_STATES[st]})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* GSTIN Field with Live Validation */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Recipient GSTIN <span className="text-slate-500">(Required for B2B input tax credit)</span>
                    </label>
                    <input
                      type="text"
                      value={buyerGst}
                      onChange={(e) => handleGstinChange(e.target.value)}
                      placeholder="e.g. 27ABCDE1234F1Z5"
                      className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white font-mono uppercase focus:border-royal-500 focus:outline-none"
                    />
                    {gstinValidation && (
                      <p className={`text-[10px] mt-1 flex items-center gap-1 font-mono ${gstinValidation.isValid ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {gstinValidation.isValid ? <Check className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                        <span>{gstinValidation.message}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Section 2: Service / Supply Item Details */}
                <div className="p-4 rounded-[18px] bg-black/40 border border-white/[0.08] space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-royal-400 font-mono">
                    2. Service Description & SAC Code
                  </span>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Description of Service / Goods *</label>
                    <input
                      type="text"
                      required
                      value={itemTitle}
                      onChange={(e) => setItemTitle(e.target.value)}
                      placeholder="e.g. Creator Brand Sponsorship / System Design Course"
                      className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">SAC Code *</label>
                      <select
                        value={sacCode}
                        onChange={(e) => {
                          setSacCode(e.target.value);
                          if (e.target.value === '998431') setItemType('product');
                          else if (e.target.value === '999293') setItemType('course');
                          else if (e.target.value === '998313') setItemType('booking');
                        }}
                        className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white font-mono focus:border-royal-500 focus:outline-none"
                      >
                        <option value="998431">998431 — Digital Content & Downloads</option>
                        <option value="999293">999293 — Online Interactive Training</option>
                        <option value="998313">998313 — Professional Mentoring & Advisory</option>
                        <option value="998439">998439 — Membership & Subscriptions</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Taxable Base Amount (₹) *</label>
                      <input
                        type="number"
                        required
                        min="1"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white font-mono focus:border-royal-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Live GST Breakdown & Status */}
                <div className="p-4 rounded-[18px] bg-royal-600/10 border border-royal-500/25 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-royal-300 uppercase tracking-wider text-[10px] font-mono">
                      3. Live Tax Computation (18% GST)
                    </span>
                    <span className="text-[10px] font-mono text-white bg-royal-600/30 px-2 py-0.5 rounded">
                      {liveGstCalc.isInterState ? 'Inter-State (IGST)' : `Intra-State (${creatorState})`}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                    <div className="bg-black/40 p-2.5 rounded-[12px] border border-white/[0.06]">
                      <span className="text-[10px] text-slate-400 block">Base Value</span>
                      <span className="text-white font-bold">₹{numericAmount.toFixed(2)}</span>
                    </div>

                    {!liveGstCalc.isInterState ? (
                      <>
                        <div className="bg-black/40 p-2.5 rounded-[12px] border border-white/[0.06]">
                          <span className="text-[10px] text-slate-400 block">CGST (9%)</span>
                          <span className="text-blue-300 font-bold">₹{liveGstCalc.cgst.toFixed(2)}</span>
                        </div>
                        <div className="bg-black/40 p-2.5 rounded-[12px] border border-white/[0.06]">
                          <span className="text-[10px] text-slate-400 block">SGST (9%)</span>
                          <span className="text-blue-300 font-bold">₹{liveGstCalc.sgst.toFixed(2)}</span>
                        </div>
                      </>
                    ) : (
                      <div className="col-span-2 bg-black/40 p-2.5 rounded-[12px] border border-white/[0.06]">
                        <span className="text-[10px] text-slate-400 block">IGST (18% to {buyerState})</span>
                        <span className="text-royal-300 font-bold">₹{liveGstCalc.igst.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="bg-royal-600/30 p-2.5 rounded-[12px] border border-royal-500/40">
                      <span className="text-[10px] text-royal-200 block">Total Payable</span>
                      <span className="text-white font-extrabold text-sm">₹{liveGstCalc.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Invoice Status</label>
                      <select
                        value={invoiceStatus}
                        onChange={(e) => setInvoiceStatus(e.target.value as any)}
                        className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                      >
                        <option value="Paid">Mark as Paid (UPI / Bank)</option>
                        <option value="Pending">Mark as Pending Payment</option>
                        <option value="Overdue">Mark as Overdue</option>
                      </select>
                    </div>

                    {invoiceStatus !== 'Paid' && (
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Payment Due Date</label>
                        <input
                          type="date"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                          className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <RippleButton
                    type="submit"
                    className="w-full rounded-[16px] bg-royal-600 hover:bg-royal-500 py-3 text-xs font-bold text-white shadow-royal flex items-center justify-center gap-2"
                  >
                    <Zap className="h-4 w-4 fill-white" />
                    <span>Generate Official GST Invoice (₹{liveGstCalc.totalAmount.toFixed(2)})</span>
                  </RippleButton>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* Embedded Full Legal GST Tax Invoice Preview Modal */}
        {selectedInvoiceOrder && (
          <GSTInvoiceModal
            isOpen={true}
            onClose={() => setSelectedInvoiceOrder(null)}
            order={selectedInvoiceOrder}
          />
        )}

      </div>
    </PageTransition>
  );
}
