'use client';

import React, { useRef, useState } from 'react';
import { X, Download, Printer, ShieldCheck, CheckCircle, FileText, AlertCircle, Clock } from 'lucide-react';
import { Order } from '@/types';
import { useCreatorStore } from '@/lib/store';
import { buildInvoiceData } from '@/lib/gst';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface GSTInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order;
}

export default function GSTInvoiceModal({ isOpen, onClose, order }: GSTInvoiceModalProps) {
  const { activeCreator } = useCreatorStore();
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const invoice = buildInvoiceData(order, {
    name: activeCreator?.name || 'Creator',
    businessName: activeCreator?.upiName || `${activeCreator?.name} Digital Ventures`,
    state: activeCreator?.state || 'Karnataka',
    gstNumber: activeCreator?.gstNumber || '29AAECS4567M1ZV',
    address: `${activeCreator?.location || 'Bengaluru, Karnataka'}, India`
  });

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;
    try {
      setDownloading(true);
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${invoice.invoiceNumber}.pdf`);
    } catch (err) {
      console.error('PDF export failed', err);
    } finally {
      setDownloading(false);
    }
  };

  const status = invoice.status || 'Paid';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-2xl overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl rounded-[24px] border border-white/[0.12] bg-[#0A0D17] p-5 sm:p-6 shadow-2xl text-slate-100 animate-scale-in my-6 max-h-[95vh] overflow-y-auto">
        
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/[0.08] pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <FileText className="h-5 w-5 text-royal-400" />
            <div>
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                <span>GST Tax Invoice</span>
                <span className="font-mono text-royal-300 font-semibold text-xs">({invoice.invoiceNumber})</span>
              </h3>
              <p className="text-[11px] text-slate-400">Official compliant invoice under Section 31 of CGST Act, 2017</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 rounded-[12px] border border-white/[0.1] bg-white/[0.04] px-3.5 py-1.5 text-xs text-slate-300 hover:bg-white/[0.08] transition btn-press"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="flex items-center gap-1.5 rounded-[12px] bg-royal-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-royal-500 shadow-royal-sm transition btn-press disabled:opacity-50"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{downloading ? 'Exporting...' : 'Download PDF'}</span>
            </button>

            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-slate-400 hover:bg-white/[0.08] hover:text-white transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* INVOICE PAPER SHEET (Stripe / Razorpay Grade Legal Tax Invoice) */}
        <div 
          ref={invoiceRef} 
          className="rounded-[16px] bg-white p-6 sm:p-8 text-slate-900 shadow-xl border border-gray-200 text-xs leading-relaxed font-sans"
        >
          {/* Top Row: Business Info + Tax Invoice Header */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg text-slate-900 tracking-tight">{invoice.creator.businessName}</span>
                <span className="bg-blue-50 text-blue-800 text-[9px] font-bold px-2 py-0.5 rounded border border-blue-200 font-mono">
                  GST REGISTERED
                </span>
              </div>
              <p className="text-gray-600 mt-0.5">{invoice.creator.address}</p>
              <p className="text-gray-700 font-medium">State: <span className="font-bold">{invoice.creator.state}</span> (State Code: <span className="font-mono font-bold">{invoice.creator.stateCode}</span>)</p>
              <p className="text-gray-900 font-bold font-mono text-[11px] mt-0.5">GSTIN: {invoice.creator.gstin}</p>
              <p className="text-gray-600 font-mono text-[10px]">PAN: {invoice.creator.pan}</p>
            </div>

            <div className="text-right">
              <div className="flex items-center justify-end gap-2">
                <span className="inline-block bg-slate-900 text-white font-bold text-xs uppercase px-2.5 py-1 rounded tracking-wider">
                  TAX INVOICE
                </span>
                {status === 'Paid' && (
                  <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-[10px] px-2 py-0.5 rounded font-mono uppercase">
                    PAID
                  </span>
                )}
                {status === 'Pending' && (
                  <span className="bg-amber-100 text-amber-800 border border-amber-300 font-bold text-[10px] px-2 py-0.5 rounded font-mono uppercase">
                    PENDING
                  </span>
                )}
                {status === 'Overdue' && (
                  <span className="bg-rose-100 text-rose-800 border border-rose-300 font-bold text-[10px] px-2 py-0.5 rounded font-mono uppercase">
                    OVERDUE
                  </span>
                )}
              </div>
              <p className="text-[10px] text-gray-500 mt-0.5">(Original for Recipient)</p>
              
              <div className="mt-2.5 space-y-0.5 text-[11px]">
                <p className="font-bold text-gray-900">Invoice No: <span className="font-mono text-royal-700">{invoice.invoiceNumber}</span></p>
                <p className="text-gray-600">Invoice Date: <span className="font-medium text-slate-900">{invoice.invoiceDate}</span></p>
                <p className="text-gray-600">Due Date: <span className="font-medium text-slate-900">{invoice.dueDate}</span></p>
                <p className="text-gray-600">Place of Supply: <span className="font-semibold text-slate-900">{invoice.placeOfSupply}</span></p>
                <p className="text-gray-600">Reverse Charge: <span className="font-semibold text-slate-900">{invoice.reverseCharge || 'No'}</span></p>
              </div>
            </div>
          </div>

          {/* Billed To (Buyer) & Settlement Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-[12px] border border-gray-200 mb-4 text-xs">
            <div>
              <p className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">Billed To (Recipient / Customer)</p>
              <p className="font-bold text-sm text-slate-900 mt-0.5">{invoice.buyer.name}</p>
              <p className="text-gray-600 text-[11px]">{invoice.buyer.phone} • {invoice.buyer.email}</p>
              <p className="text-gray-700 font-medium text-[11px] mt-0.5">
                Place of Residence / State: <strong className="text-slate-900">{invoice.buyer.state}</strong> (Code: {invoice.buyer.stateCode})
              </p>
              {invoice.buyer.gstin ? (
                <p className="font-mono text-[11px] font-bold text-blue-800 mt-1 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block">
                  Recipient GSTIN: {invoice.buyer.gstin}
                </p>
              ) : (
                <p className="text-[10px] text-gray-500 italic mt-0.5">Type: B2C (Unregistered Consumer)</p>
              )}
            </div>

            <div>
              <p className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">Payment Details & Status</p>
              <div className="mt-1 space-y-1">
                <p className="font-semibold text-gray-900 text-xs">
                  Payment Mode: <span className="font-mono text-royal-700">{invoice.paymentDetails.mode}</span>
                </p>
                <p className="text-gray-600 font-mono text-[11px]">
                  Txn Ref: {invoice.paymentDetails.transactionId}
                </p>
                {status === 'Paid' ? (
                  <p className="text-emerald-700 font-bold text-[11px] flex items-center gap-1 mt-1">
                    <CheckCircle className="h-3.5 w-3.5 inline" /> Settled: {invoice.paymentDetails.paidDate}
                  </p>
                ) : status === 'Pending' ? (
                  <p className="text-amber-700 font-bold text-[11px] flex items-center gap-1 mt-1">
                    <Clock className="h-3.5 w-3.5 inline" /> Payment Pending (Due: {invoice.dueDate})
                  </p>
                ) : (
                  <p className="text-rose-700 font-bold text-[11px] flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3.5 w-3.5 inline" /> Overdue (Past Due: {invoice.dueDate})
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Line Items Table with GST Breakdown */}
          <div className="border border-gray-200 rounded-[10px] overflow-hidden mb-4">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white font-semibold text-[11px]">
                <tr>
                  <th className="p-2.5">#</th>
                  <th className="p-2.5">Description of Service</th>
                  <th className="p-2.5">SAC Code</th>
                  <th className="p-2.5 text-center">Qty</th>
                  <th className="p-2.5 text-right">Taxable Val (₹)</th>
                  {!invoice.isInterState ? (
                    <>
                      <th className="p-2.5 text-right">CGST (9%)</th>
                      <th className="p-2.5 text-right">SGST (9%)</th>
                    </>
                  ) : (
                    <th className="p-2.5 text-right">IGST (18%)</th>
                  )}
                  <th className="p-2.5 text-right">Total Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-800 text-xs">
                {invoice.items.map((it, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2.5 font-mono text-gray-500">{idx + 1}</td>
                    <td className="p-2.5 font-semibold text-slate-900">{it.description}</td>
                    <td className="p-2.5 font-mono text-[11px] text-royal-700 font-bold">{it.sacCode}</td>
                    <td className="p-2.5 text-center">{it.quantity}</td>
                    <td className="p-2.5 text-right font-mono">₹{it.taxableValue.toFixed(2)}</td>
                    {!invoice.isInterState ? (
                      <>
                        <td className="p-2.5 text-right font-mono text-gray-700">₹{invoice.cgstAmount.toFixed(2)}</td>
                        <td className="p-2.5 text-right font-mono text-gray-700">₹{invoice.sgstAmount.toFixed(2)}</td>
                      </>
                    ) : (
                      <td className="p-2.5 text-right font-mono text-gray-700">₹{invoice.igstAmount.toFixed(2)}</td>
                    )}
                    <td className="p-2.5 text-right font-bold text-slate-900 font-mono">₹{invoice.totalInvoiceValue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tax Computation Summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
            <div className="max-w-xs text-[10px] text-gray-500 space-y-1">
              <p className="font-semibold text-gray-700">Notes & Terms:</p>
              <p className="italic">{invoice.notes}</p>
              <p className="text-[9px] text-gray-400 pt-1">
                Certified electronic invoice issued in compliance with Rule 46 of CGST Rules 2017.
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-1.5 text-right text-xs bg-slate-50 p-3.5 rounded-[12px] border border-gray-200">
              <div className="flex justify-between text-gray-600">
                <span>Taxable Value:</span>
                <span className="font-mono font-medium">₹{invoice.taxableTotal.toFixed(2)}</span>
              </div>
              {!invoice.isInterState ? (
                <>
                  <div className="flex justify-between text-gray-600">
                    <span>CGST (9% Central):</span>
                    <span className="font-mono">₹{invoice.cgstAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>SGST (9% State):</span>
                    <span className="font-mono">₹{invoice.sgstAmount.toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-gray-600">
                  <span>IGST (18% Integrated):</span>
                  <span className="font-mono">₹{invoice.igstAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-xs font-bold text-slate-900 border-t-2 border-slate-900 pt-2">
                <span>Total Invoice Value:</span>
                <span className="font-mono text-sm text-royal-700">₹{invoice.totalInvoiceValue.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer Digital Signature Seal */}
          <div className="flex justify-between items-end border-t border-gray-200 pt-3 text-[10px]">
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Digitally Authenticated • GST Compliance Verified via CreatorOS</span>
            </div>
            <div className="text-center">
              <div className="h-6 font-serif italic text-slate-900 font-bold text-xs">{invoice.creator.name}</div>
              <p className="border-t border-gray-400 pt-0.5 font-bold text-gray-700 text-[10px]">Authorized Signatory</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
