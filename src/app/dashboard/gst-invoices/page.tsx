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
  ArrowUpRight 
} from 'lucide-react';
import GSTInvoiceModal from '@/components/invoice/GSTInvoiceModal';
import { Order } from '@/types';
import { PageTransition, HoverCard, AnimatedCounter } from '@/components/ui/motion';

export default function GSTInvoicesPage() {
  const { orders, activeCreator } = useCreatorStore();
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [stateFilter, setStateFilter] = useState('ALL');

  const totalTaxable = orders.reduce((sum, o) => sum + o.amount, 0);
  const totalCGST = orders.reduce((sum, o) => sum + o.cgst, 0);
  const totalSGST = orders.reduce((sum, o) => sum + o.sgst, 0);
  const totalIGST = orders.reduce((sum, o) => sum + o.igst, 0);
  const grandTotal = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const filteredOrders = stateFilter === 'ALL'
    ? orders
    : orders.filter((o) => o.buyerState.toLowerCase() === stateFilter.toLowerCase());

  return (
    <PageTransition>
      <div className="space-y-6 font-sans">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>GST Tax Invoices & Compliance</span>
              <span className="rounded-full bg-royal-600/15 text-royal-400 border border-royal-500/30 text-[10px] font-bold px-2.5 py-0.5 font-mono">
                Indian GST Act 2017
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Automated B2B/B2C tax invoices, SAC code categorization, and GSTR-1 ready data.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-[14px] border border-white/[0.08] bg-white/[0.04] px-3.5 py-2 text-xs text-slate-300">
              <span className="text-slate-500 font-mono">GSTIN:</span> <span className="text-royal-400 font-mono font-bold">{activeCreator?.gstNumber || '29AAECS4567M1ZV'}</span>
            </div>
          </div>
        </div>

        {/* TAX LEDGER SUMMARY CARDS - Hover Lift & Animated Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-white/[0.15]">
            <p className="text-xs text-slate-400">Taxable Value</p>
            <div className="font-display text-2xl font-extrabold text-white mt-1 font-mono">
              <AnimatedCounter value={totalTaxable} prefix="₹" decimals={2} />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Base value</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-blue-500/30">
            <p className="text-xs text-slate-400">CGST (9%) + SGST (9%)</p>
            <div className="font-display text-2xl font-extrabold text-blue-400 mt-1 font-mono">
              <AnimatedCounter value={totalCGST + totalSGST} prefix="₹" decimals={2} />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Intra-state ({activeCreator?.state})</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            <p className="text-xs text-slate-400">IGST (18%)</p>
            <div className="font-display text-2xl font-extrabold text-royal-400 mt-1 font-mono">
              <AnimatedCounter value={totalIGST} prefix="₹" decimals={2} />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Inter-state across India</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-royal-500/25 bg-gradient-to-b from-[#0C1226] to-[#0A0E1A] p-5 shadow-glass-card hover:border-royal-500/50">
            <p className="text-xs text-royal-400">Total Invoiced Amount</p>
            <div className="font-display text-2xl font-extrabold text-white mt-1 font-mono">
              <AnimatedCounter value={grandTotal} prefix="₹" decimals={2} />
            </div>
            <p className="text-[11px] text-emerald-400 mt-1">Collected via UPI</p>
          </HoverCard>
        </div>

        {/* SAC CODE REFERENCE */}
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
              998313: 1:1 Professional Mentorship
            </span>
          </div>
        </div>

        {/* INVOICES TABLE with Hover Interactions */}
        <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div>
              <h3 className="font-display text-base font-bold text-white">
                Generated Invoices ({filteredOrders.length})
              </h3>
              <p className="text-xs text-slate-400">Instant PDF download and recipient billing verification</p>
            </div>

            {/* State Filter */}
            <div className="flex items-center gap-2">
              <Filter className="h-3.5 w-3.5 text-slate-400" />
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="rounded-[12px] border border-white/[0.1] bg-black/40 px-3 py-1.5 text-xs text-white focus:border-royal-500 focus:outline-none"
              >
                <option value="ALL">All States</option>
                <option value="Karnataka">Karnataka (Intra-state)</option>
                <option value="Maharashtra">Maharashtra (IGST)</option>
                <option value="Delhi">Delhi (IGST)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/[0.06] text-slate-400 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="pb-3">Invoice No</th>
                  <th className="pb-3">Customer & State</th>
                  <th className="pb-3">SAC Code</th>
                  <th className="pb-3 text-right">Taxable</th>
                  <th className="pb-3 text-right">GST</th>
                  <th className="pb-3 text-right">Total</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-slate-300">
                {filteredOrders.map((ord) => {
                  const taxSum = ord.cgst + ord.sgst + ord.igst;
                  return (
                    <tr key={ord.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="py-3 font-mono text-royal-400 font-semibold">
                        {ord.invoiceNumber}
                        <p className="text-[10px] text-slate-500 font-normal font-sans">
                          {new Date(ord.date).toLocaleDateString('en-IN')}
                        </p>
                      </td>
                      <td className="py-3">
                        <p className="font-semibold text-white">{ord.buyerName}</p>
                        <p className="text-[10px] text-slate-400">{ord.buyerState}</p>
                      </td>
                      <td className="py-3 font-mono text-slate-400">{ord.sacCode}</td>
                      <td className="py-3 text-right font-mono">₹{ord.amount.toFixed(2)}</td>
                      <td className="py-3 text-right font-mono text-royal-300">
                        ₹{taxSum.toFixed(2)}
                      </td>
                      <td className="py-3 text-right font-bold text-white font-mono">
                        ₹{ord.totalAmount.toFixed(2)}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => setSelectedInvoiceOrder(ord)}
                          className="inline-flex items-center gap-1.5 rounded-[10px] bg-white/[0.05] hover:bg-white/[0.09] px-3 py-1 text-xs font-semibold text-white transition btn-press"
                        >
                          <FileText className="h-3.5 w-3.5 text-royal-400" />
                          <span>View / Export</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Embedded Invoice Modal */}
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
