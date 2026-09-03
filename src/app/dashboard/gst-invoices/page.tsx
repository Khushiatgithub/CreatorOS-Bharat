'use client';

import React, { useState, useMemo } from 'react';
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
  Clock,
  AlertCircle,
  X,
  Printer,
  Sparkles,
  Zap,
  Info,
  ChevronDown
} from 'lucide-react';
import GSTInvoiceModal from '@/components/invoice/GSTInvoiceModal';
import { Order, ProductType } from '@/types';
import { PageTransition, HoverCard, AnimatedCounter, RippleButton } from '@/components/ui/motion';
import { INDIAN_STATES, SAC_CODES, validateGSTIN, calculateGST, numberToIndianWords } from '@/lib/gst';

const ITEM_PRESETS = [
  { title: 'Ultimate FAANG SDE & DSA Master Sheet 2025', sac: '998431', type: 'product' as ProductType, price: 399 },
  { title: '1:1 Tech Resume Roast & Career Strategy Call', sac: '998313', type: 'booking' as ProductType, price: 699 },
  { title: 'Mastering SDE-1 to SDE-2: Live Cohort Course', sac: '999293', type: 'course' as ProductType, price: 2499 },
  { title: 'Q1 Tech Newsletter & YouTube Dedicated Brand Integration', sac: '998311', type: 'product' as ProductType, price: 35000 },
  { title: 'Distributed Systems & Microservices Live Masterclass (2 Hours)', sac: '999293', type: 'booking' as ProductType, price: 18000 },
];

const RECENT_CUSTOMERS = [
  { name: 'Rahul Deshmukh', email: 'rahul.deshmukh@gmail.com', phone: '+91 98234 56789', state: 'Maharashtra', gstin: '' },
  { name: 'Ananya Iyer', email: 'ananya.iyer@outlook.com', phone: '+91 99887 66554', state: 'Karnataka', gstin: '' },
  { name: 'Vikram Singh', email: 'vikram.singh@gmail.com', phone: '+91 97112 33445', state: 'Delhi', gstin: '' },
  { name: 'Zepto Tech Ventures Pvt Ltd', email: 'accounts@zeptonow.com', phone: '+91 91234 56780', state: 'Maharashtra', gstin: '27AABCZ1234F1Z9' },
  { name: 'Scaler Academy / InterviewBit', email: 'finance@scaler.com', phone: '+91 98450 11223', state: 'Karnataka', gstin: '29AABCS8899P1ZK' },
];

export default function GSTInvoicesPage() {
  const { orders, activeCreator, createInvoice, updateInvoiceStatus } = useCreatorStore();
  
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'Paid' | 'Pending' | 'Overdue'>('ALL');
  const [sacFilter, setSacFilter] = useState('ALL');

  // New Invoice Form State
  const [formCustomerName, setFormCustomerName] = useState('');
  const [formCustomerEmail, setFormCustomerEmail] = useState('');
  const [formCustomerPhone, setFormCustomerPhone] = useState('');
  const [formCustomerState, setFormCustomerState] = useState('Maharashtra');
  const [formCustomerGstin, setFormCustomerGstin] = useState('');
  const [formItemTitle, setFormItemTitle] = useState('Brand Sponsorship & Promotion Package');
  const [formItemType, setFormItemType] = useState<ProductType>('product');
  const [formSacCode, setFormSacCode] = useState('998311');
  const [formAmount, setFormAmount] = useState('15000');
  const [formGstRate, setFormGstRate] = useState(18);
  const [formStatus, setFormStatus] = useState<'Paid' | 'Pending' | 'Overdue'>('Paid');
  const [formDueDate, setFormDueDate] = useState('');
  const [formNotes, setFormNotes] = useState('Payment due within 15 days of invoice date.');
  const [formPaymentMethod, setFormPaymentMethod] = useState<'UPI' | 'Card' | 'Netbanking'>('UPI');

  // Real-time GSTIN validation for form
  const gstinValidation = useMemo(() => {
    if (!formCustomerGstin.trim()) return null;
    return validateGSTIN(formCustomerGstin);
  }, [formCustomerGstin]);

  // Handle GSTIN change: auto-detect state if valid
  const handleGstinChange = (val: string) => {
    const uppercaseVal = val.toUpperCase().trim();
    setFormCustomerGstin(uppercaseVal);
    if (uppercaseVal.length >= 2) {
      const stateCode = uppercaseVal.substring(0, 2);
      const stateEntry = Object.entries(INDIAN_STATES).find(([, code]) => code === stateCode);
      if (stateEntry) {
        setFormCustomerState(stateEntry[0]);
      }
    }
  };

  // Auto tax calculations for Create Invoice Modal
  const formTaxCalc = useMemo(() => {
    const numAmount = parseFloat(formAmount) || 0;
    return calculateGST(numAmount, activeCreator?.state || 'Karnataka', formCustomerState, formGstRate);
  }, [formAmount, formCustomerState, formGstRate, activeCreator?.state]);

  // Filtered Orders List
  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const normalizedStatus = (ord.paymentStatus || (ord.status === 'completed' ? 'Paid' : 'Pending')) as 'Paid' | 'Pending' | 'Overdue';
      
      // Search matching (name, email, phone, invoice, gstin)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery = 
          ord.buyerName.toLowerCase().includes(q) ||
          ord.buyerEmail.toLowerCase().includes(q) ||
          ord.buyerPhone.toLowerCase().includes(q) ||
          ord.invoiceNumber.toLowerCase().includes(q) ||
          (ord.buyerGst && ord.buyerGst.toLowerCase().includes(q)) ||
          ord.itemTitle.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // State Filter
      if (stateFilter !== 'ALL' && ord.buyerState.toLowerCase() !== stateFilter.toLowerCase()) {
        return false;
      }

      // Status Filter
      if (statusFilter !== 'ALL' && normalizedStatus !== statusFilter) {
        return false;
      }

      // SAC Code Filter
      if (sacFilter !== 'ALL' && ord.sacCode !== sacFilter) {
        return false;
      }

      return true;
    });
  }, [orders, searchQuery, stateFilter, statusFilter, sacFilter]);

  // Overall Financial Counters
  const totalTaxable = orders.reduce((sum, o) => sum + o.amount, 0);
  const totalCGST = orders.reduce((sum, o) => sum + o.cgst, 0);
  const totalSGST = orders.reduce((sum, o) => sum + o.sgst, 0);
  const totalIGST = orders.reduce((sum, o) => sum + o.igst, 0);
  const grandTotal = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const paidCount = orders.filter(o => (o.paymentStatus || (o.status === 'completed' ? 'Paid' : 'Pending')) === 'Paid').length;
  const pendingCount = orders.filter(o => (o.paymentStatus || (o.status === 'completed' ? 'Paid' : 'Pending')) === 'Pending').length;
  const overdueCount = orders.filter(o => o.paymentStatus === 'Overdue').length;

  const handleSelectRecentCustomer = (cust: typeof RECENT_CUSTOMERS[0]) => {
    setFormCustomerName(cust.name);
    setFormCustomerEmail(cust.email);
    setFormCustomerPhone(cust.phone);
    setFormCustomerState(cust.state);
    setFormCustomerGstin(cust.gstin || '');
  };

  const handleSelectPresetItem = (preset: typeof ITEM_PRESETS[0]) => {
    setFormItemTitle(preset.title);
    setFormSacCode(preset.sac);
    setFormItemType(preset.type);
    setFormAmount(preset.price.toString());
  };

  const handleCreateInvoiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formCustomerName.trim() || !formCustomerPhone.trim()) {
      alert('Please provide customer name and mobile number.');
      return;
    }

    const created = createInvoice({
      buyerName: formCustomerName,
      buyerEmail: formCustomerEmail || `${formCustomerName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      buyerPhone: formCustomerPhone,
      buyerState: formCustomerState,
      buyerGst: formCustomerGstin || undefined,
      itemTitle: formItemTitle,
      itemType: formItemType,
      sacCode: formSacCode,
      amount: parseFloat(formAmount) || 0,
      gstRate: formGstRate,
      status: formStatus,
      dueDate: formDueDate || new Date(Date.now() + 14 * 86400000).toLocaleDateString('en-IN'),
      notes: formNotes,
      paymentMethod: formPaymentMethod
    });

    setShowCreateModal(false);
    setSelectedInvoiceOrder(created);

    // Reset fields
    setFormCustomerName('');
    setFormCustomerEmail('');
    setFormCustomerPhone('');
    setFormCustomerGstin('');
  };

  return (
    <PageTransition>
      <div className="space-y-6 font-sans">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>GST Tax Invoices & Compliance</span>
              <span className="rounded-full bg-royal-600/15 text-royal-400 border border-royal-500/30 text-[10px] font-bold px-2.5 py-0.5 font-mono">
                Rule 46 • GSTR-1 Ready
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Issue B2B/B2C Indian GST invoices, automatic CGST/SGST vs IGST calculation, GSTIN verification & PDF export.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-[14px] border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-xs text-slate-300 flex items-center gap-2">
              <span className="text-slate-500 font-mono">GSTIN:</span> 
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
            <p className="text-xs text-slate-400 font-medium">Taxable Base Value</p>
            <div className="font-display text-2xl font-extrabold text-white mt-1 font-mono">
              <AnimatedCounter value={totalTaxable} prefix="₹" decimals={2} />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">{orders.length} Total Invoices</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-blue-500/30">
            <p className="text-xs text-slate-400 font-medium">CGST (9%) + SGST (9%)</p>
            <div className="font-display text-2xl font-extrabold text-blue-400 mt-1 font-mono">
              <AnimatedCounter value={totalCGST + totalSGST} prefix="₹" decimals={2} />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Intra-state ({activeCreator?.state})</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            <p className="text-xs text-slate-400 font-medium">Integrated Tax (IGST 18%)</p>
            <div className="font-display text-2xl font-extrabold text-royal-400 mt-1 font-mono">
              <AnimatedCounter value={totalIGST} prefix="₹" decimals={2} />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Inter-state across India</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-royal-500/25 bg-gradient-to-b from-[#0C1226] to-[#0A0E1A] p-5 shadow-glass-card hover:border-royal-500/50">
            <div className="flex items-center justify-between">
              <p className="text-xs text-royal-400 font-medium">Total Invoiced Amount</p>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded-full border border-emerald-500/30">
                {paidCount} Paid
              </span>
            </div>
            <div className="font-display text-2xl font-extrabold text-white mt-1 font-mono">
              <AnimatedCounter value={grandTotal} prefix="₹" decimals={2} />
            </div>
            <div className="flex items-center gap-2 mt-1 text-[11px] font-mono">
              {pendingCount > 0 && <span className="text-amber-400">{pendingCount} Pending</span>}
              {overdueCount > 0 && <span className="text-rose-400">• {overdueCount} Overdue</span>}
            </div>
          </HoverCard>
        </div>

        {/* SAC CODE REFERENCE BADGES */}
        <div className="rounded-[20px] border border-white/[0.08] bg-white/[0.02] p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="font-semibold text-white">Indian SAC Service Classifications:</span>
          </div>
          <div className="flex flex-wrap gap-2 font-mono text-[11px]">
            <span className="rounded-lg bg-black/40 px-2.5 py-1 text-royal-300 border border-white/[0.08]">
              998431: Digital Downloads
            </span>
            <span className="rounded-lg bg-black/40 px-2.5 py-1 text-blue-300 border border-white/[0.08]">
              999293: Courses & Training
            </span>
            <span className="rounded-lg bg-black/40 px-2.5 py-1 text-indigo-300 border border-white/[0.08]">
              998313: 1:1 Advisory
            </span>
            <span className="rounded-lg bg-black/40 px-2.5 py-1 text-emerald-300 border border-white/[0.08]">
              998311: Brand Marketing
            </span>
          </div>
        </div>

        {/* INVOICES TABLE CONTAINER */}
        <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-4">
          
          {/* Top Filter Bar: Search, Status, State, SAC */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 pb-2 border-b border-white/[0.06]">
            <div>
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                <span>Invoice Ledger</span>
                <span className="text-xs font-mono text-royal-400 bg-royal-600/15 px-2 py-0.5 rounded-full border border-royal-500/30">
                  {filteredOrders.length} Invoices
                </span>
              </h3>
              <p className="text-xs text-slate-400">Search customer, filter by Indian state, status, and export PDF</p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* Customer Search Bar */}
              <div className="relative min-w-[220px]">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customer, GSTIN, invoice..."
                  className="w-full rounded-[12px] border border-white/[0.1] bg-black/40 pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-royal-500 focus:outline-none font-sans"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="rounded-[12px] border border-white/[0.1] bg-black/40 px-3 py-1.5 text-xs text-white focus:border-royal-500 focus:outline-none font-mono"
              >
                <option value="ALL">All Statuses</option>
                <option value="Paid">✓ Paid</option>
                <option value="Pending">⏳ Pending</option>
                <option value="Overdue">⚠️ Overdue</option>
              </select>

              {/* State Filter */}
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="rounded-[12px] border border-white/[0.1] bg-black/40 px-3 py-1.5 text-xs text-white focus:border-royal-500 focus:outline-none"
              >
                <option value="ALL">All Indian States</option>
                <option value="Karnataka">Karnataka (Intra-state)</option>
                <option value="Maharashtra">Maharashtra (IGST)</option>
                <option value="Delhi">Delhi (IGST)</option>
                <option value="Tamil Nadu">Tamil Nadu (IGST)</option>
                <option value="Uttar Pradesh">Uttar Pradesh (IGST)</option>
              </select>

              {/* SAC Code Filter */}
              <select
                value={sacFilter}
                onChange={(e) => setSacFilter(e.target.value)}
                className="rounded-[12px] border border-white/[0.1] bg-black/40 px-3 py-1.5 text-xs text-white focus:border-royal-500 focus:outline-none font-mono"
              >
                <option value="ALL">All SAC</option>
                <option value="998431">SAC 998431 (Digital)</option>
                <option value="999293">SAC 999293 (Course)</option>
                <option value="998313">SAC 998313 (Consulting)</option>
                <option value="998311">SAC 998311 (Brand Collab)</option>
              </select>

            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/[0.06] text-slate-400 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="pb-3">Invoice & Date</th>
                  <th className="pb-3">Customer & State</th>
                  <th className="pb-3">Service / SAC</th>
                  <th className="pb-3 text-right">Taxable (₹)</th>
                  <th className="pb-3 text-right">GST (₹)</th>
                  <th className="pb-3 text-right">Total (₹)</th>
                  <th className="pb-3 text-center">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-slate-300">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-500 text-xs">
                      No matching invoices found for the applied search and filters.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord) => {
                    const taxSum = ord.cgst + ord.sgst + ord.igst;
                    const isInterState = (activeCreator?.state || 'Karnataka').toLowerCase() !== ord.buyerState.toLowerCase();
                    const invStatus = (ord.paymentStatus || (ord.status === 'completed' ? 'Paid' : 'Pending')) as 'Paid' | 'Pending' | 'Overdue';

                    return (
                      <tr key={ord.id} className="hover:bg-white/[0.03] transition-colors group">
                        
                        {/* Invoice Number & Date */}
                        <td className="py-3 font-mono">
                          <span className="text-royal-400 font-semibold">{ord.invoiceNumber}</span>
                          <p className="text-[10px] text-slate-500 font-sans">
                            {new Date(ord.date).toLocaleDateString('en-IN')}
                          </p>
                        </td>

                        {/* Customer & State */}
                        <td className="py-3">
                          <p className="font-semibold text-white truncate max-w-[170px]">{ord.buyerName}</p>
                          <div className="flex items-center gap-1 text-[10px] text-slate-400">
                            <span>{ord.buyerState}</span>
                            {ord.buyerGst && (
                              <span className="text-royal-300 font-mono font-bold bg-royal-600/20 px-1 rounded text-[9px]">
                                B2B
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Service / SAC */}
                        <td className="py-3">
                          <p className="text-slate-200 truncate max-w-[180px]">{ord.itemTitle}</p>
                          <span className="font-mono text-[10px] text-slate-500">SAC {ord.sacCode}</span>
                        </td>

                        {/* Taxable Amount */}
                        <td className="py-3 text-right font-mono">
                          ₹{ord.amount.toFixed(2)}
                        </td>

                        {/* GST Amount with IGST vs CGST/SGST Indicator */}
                        <td className="py-3 text-right font-mono">
                          <span className={isInterState ? 'text-royal-300' : 'text-blue-300'}>
                            ₹{taxSum.toFixed(2)}
                          </span>
                          <p className="text-[9px] text-slate-500">
                            {isInterState ? 'IGST 18%' : 'CGST+SGST 18%'}
                          </p>
                        </td>

                        {/* Total Amount */}
                        <td className="py-3 text-right font-bold text-white font-mono">
                          ₹{ord.totalAmount.toFixed(2)}
                        </td>

                        {/* Status Badge with Quick Toggle */}
                        <td className="py-3 text-center">
                          {invStatus === 'Paid' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold font-mono">
                              <CheckCircle2 className="h-3 w-3" /> Paid
                            </span>
                          )}
                          {invStatus === 'Pending' && (
                            <button
                              onClick={() => updateInvoiceStatus(ord.id, 'Paid')}
                              title="Click to mark as Paid"
                              className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 hover:bg-emerald-500/20 text-amber-400 hover:text-emerald-300 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold font-mono transition"
                            >
                              <Clock className="h-3 w-3" /> Pending
                            </button>
                          )}
                          {invStatus === 'Overdue' && (
                            <button
                              onClick={() => updateInvoiceStatus(ord.id, 'Paid')}
                              title="Click to mark as Paid"
                              className="inline-flex items-center gap-1 rounded-full bg-rose-500/15 hover:bg-emerald-500/20 text-rose-400 hover:text-emerald-300 border border-rose-500/30 px-2 py-0.5 text-[10px] font-bold font-mono transition"
                            >
                              <AlertCircle className="h-3 w-3" /> Overdue
                            </button>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="py-3 text-right">
                          <button
                            onClick={() => setSelectedInvoiceOrder(ord)}
                            className="inline-flex items-center gap-1.5 rounded-[10px] bg-white/[0.05] hover:bg-white/[0.1] px-3 py-1.5 text-xs font-semibold text-white transition btn-press border border-white/[0.06]"
                          >
                            <FileText className="h-3.5 w-3.5 text-royal-400" />
                            <span>View / Export</span>
                          </button>
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
            <div className="relative w-full max-w-2xl rounded-[24px] border border-white/[0.12] bg-[#0A0D17] p-6 shadow-2xl text-slate-100 animate-scale-in my-6 max-h-[92vh] overflow-y-auto">
              
              <button
                onClick={() => setShowCreateModal(false)}
                className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-white/[0.08] hover:text-white transition"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <div className="h-8 w-8 rounded-xl bg-royal-600/20 border border-royal-500/30 flex items-center justify-center text-royal-400">
                  <Plus className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Create Official GST Tax Invoice</h3>
                  <p className="text-xs text-slate-400">Generate B2B or B2C compliant electronic tax invoice with automated tax splitting.</p>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleCreateInvoiceSubmit} className="space-y-4 mt-5">
                
                {/* Auto-fill Customer Quick Preset Pill Strip */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-1.5">
                    Quick Select Recent Customer (Optional)
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {RECENT_CUSTOMERS.map((c) => (
                      <button
                        key={c.email}
                        type="button"
                        onClick={() => handleSelectRecentCustomer(c)}
                        className="rounded-full bg-white/[0.04] hover:bg-royal-600/20 hover:border-royal-500/40 border border-white/[0.08] px-2.5 py-1 text-[11px] text-slate-300 hover:text-royal-300 transition"
                      >
                        {c.name} ({c.state})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Section 1: Customer Details & GSTIN */}
                <div className="p-4 rounded-[16px] border border-white/[0.08] bg-black/40 space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
                    1. Recipient / Customer Details
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Customer / Entity Name *</label>
                      <input
                        type="text"
                        required
                        value={formCustomerName}
                        onChange={(e) => setFormCustomerName(e.target.value)}
                        placeholder="e.g. Zepto Tech Ventures Pvt Ltd"
                        className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">WhatsApp / Phone *</label>
                      <input
                        type="text"
                        required
                        value={formCustomerPhone}
                        onChange={(e) => setFormCustomerPhone(e.target.value)}
                        placeholder="+91 98234 56789"
                        className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white font-mono focus:border-royal-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formCustomerEmail}
                        onChange={(e) => setFormCustomerEmail(e.target.value)}
                        placeholder="billing@customer.com"
                        className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Billing State (Place of Supply) *</label>
                      <select
                        value={formCustomerState}
                        onChange={(e) => setFormCustomerState(e.target.value)}
                        className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                      >
                        {Object.keys(INDIAN_STATES).map((st) => (
                          <option key={st} value={st} className="bg-[#0A0D17] text-white">
                            {st} (Code: {INDIAN_STATES[st]})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* GSTIN Field with Live Validation */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-medium text-slate-300">
                        Buyer GSTIN <span className="text-slate-500">(Required for B2B Input Tax Credit)</span>
                      </label>
                      {gstinValidation && (
                        <span className={`text-[10px] font-mono font-bold ${gstinValidation.isValid ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {gstinValidation.message}
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      maxLength={15}
                      value={formCustomerGstin}
                      onChange={(e) => handleGstinChange(e.target.value)}
                      placeholder="27AABCZ1234F1Z9"
                      className={`w-full rounded-[12px] border bg-black/50 px-3 py-2 text-xs text-white font-mono uppercase focus:outline-none ${
                        gstinValidation?.isValid 
                          ? 'border-emerald-500/60 ring-1 ring-emerald-500/30' 
                          : formCustomerGstin.length > 0 
                          ? 'border-amber-500/50' 
                          : 'border-white/[0.1] focus:border-royal-500'
                      }`}
                    />
                  </div>
                </div>

                {/* Section 2: Supply Items & SAC Code */}
                <div className="p-4 rounded-[16px] border border-white/[0.08] bg-black/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                      2. Service Description & SAC Classification
                    </span>
                    <span className="text-[10px] text-royal-300 font-mono">
                      Supply from: {activeCreator?.state || 'Karnataka'}
                    </span>
                  </div>

                  {/* Preset Items Strip */}
                  <div className="flex flex-wrap gap-1.5 pb-1">
                    {ITEM_PRESETS.map((p) => (
                      <button
                        key={p.title}
                        type="button"
                        onClick={() => handleSelectPresetItem(p)}
                        className="rounded-lg bg-white/[0.04] hover:bg-royal-600/20 border border-white/[0.08] px-2 py-0.5 text-[10px] text-slate-300 truncate max-w-[200px]"
                      >
                        {p.title}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Description of Supply *</label>
                    <input
                      type="text"
                      required
                      value={formItemTitle}
                      onChange={(e) => setFormItemTitle(e.target.value)}
                      placeholder="e.g. Dedicated Q1 Brand Newsletter & Video Integration"
                      className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">SAC Code *</label>
                      <select
                        value={formSacCode}
                        onChange={(e) => setFormSacCode(e.target.value)}
                        className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white font-mono focus:border-royal-500 focus:outline-none"
                      >
                        <option value="998431">998431 (Digital Content)</option>
                        <option value="999293">999293 (Course & Coaching)</option>
                        <option value="998313">998313 (1:1 Mentoring)</option>
                        <option value="998311">998311 (Brand Marketing)</option>
                        <option value="998439">998439 (Subscription)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Taxable Base (₹) *</label>
                      <input
                        type="number"
                        required
                        min={1}
                        value={formAmount}
                        onChange={(e) => setFormAmount(e.target.value)}
                        className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white font-mono focus:border-royal-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">GST Rate (%)</label>
                      <select
                        value={formGstRate}
                        onChange={(e) => setFormGstRate(Number(e.target.value))}
                        className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white font-mono focus:border-royal-500 focus:outline-none"
                      >
                        <option value={18}>18% (Standard Digital)</option>
                        <option value={12}>12%</option>
                        <option value={5}>5%</option>
                        <option value={0}>0% (Exempt)</option>
                      </select>
                    </div>
                  </div>

                  {/* AUTO TAX CALCULATION PREVIEW BOX */}
                  <div className="rounded-[14px] bg-royal-600/10 border border-royal-500/25 p-3 text-xs space-y-1.5 font-mono">
                    <div className="flex justify-between text-slate-300">
                      <span>Taxable Value (Base):</span>
                      <span>₹{(parseFloat(formAmount) || 0).toFixed(2)}</span>
                    </div>

                    {formTaxCalc.isInterState ? (
                      <div className="flex justify-between text-royal-300">
                        <span>IGST (18% Inter-State to {formCustomerState}):</span>
                        <span>+ ₹{formTaxCalc.igst.toFixed(2)}</span>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between text-blue-300">
                          <span>CGST (9% Central):</span>
                          <span>+ ₹{formTaxCalc.cgst.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-blue-300">
                          <span>SGST (9% State - {activeCreator?.state}):</span>
                          <span>+ ₹{formTaxCalc.sgst.toFixed(2)}</span>
                        </div>
                      </>
                    )}

                    <div className="pt-1.5 border-t border-royal-500/20 flex justify-between font-bold text-white text-sm">
                      <span>Total Invoice Payable:</span>
                      <span className="text-emerald-400">₹{formTaxCalc.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Section 3: Status & Due Date */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Invoice Status</label>
                    <select
                      value={formStatus}
                      onChange={(e) => setFormStatus(e.target.value as any)}
                      className="w-full rounded-[12px] border border-white/[0.1] bg-black/40 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none font-mono"
                    >
                      <option value="Paid">✓ Paid (Immediate)</option>
                      <option value="Pending">⏳ Pending (Issue Invoice)</option>
                      <option value="Overdue">⚠️ Overdue</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Due Date</label>
                    <input
                      type="date"
                      value={formDueDate}
                      onChange={(e) => setFormDueDate(e.target.value)}
                      className="w-full rounded-[12px] border border-white/[0.1] bg-black/40 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Payment Method</label>
                    <select
                      value={formPaymentMethod}
                      onChange={(e) => setFormPaymentMethod(e.target.value as any)}
                      className="w-full rounded-[12px] border border-white/[0.1] bg-black/40 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                    >
                      <option value="UPI">UPI / QR Code</option>
                      <option value="Netbanking">Netbanking (RTGS/NEFT)</option>
                      <option value="Card">Debit / Credit Card</option>
                    </select>
                  </div>
                </div>

                {/* Action Submit */}
                <div className="pt-2">
                  <RippleButton
                    type="submit"
                    className="w-full rounded-[16px] bg-royal-600 hover:bg-royal-500 py-3 text-xs font-bold text-white shadow-royal flex items-center justify-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    <span>Generate & View Tax Invoice (₹{formTaxCalc.totalAmount.toFixed(2)})</span>
                  </RippleButton>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* EMBEDDED INVOICE PREVIEW / PDF / PRINT MODAL */}
        {selectedInvoiceOrder && (
          <GSTInvoiceModal
            isOpen={!!selectedInvoiceOrder}
            onClose={() => setSelectedInvoiceOrder(null)}
            order={selectedInvoiceOrder}
          />
        )}

      </div>
    </PageTransition>
  );
}
