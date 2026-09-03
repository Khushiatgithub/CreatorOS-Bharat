'use client';

import React, { useRef, useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Clock, 
  AlertCircle,
  Building2,
  Copy,
  Check,
  CreditCard
} from 'lucide-react';
import { Order } from '@/types';
import { useCreatorStore } from '@/lib/store';
import { buildInvoiceData, numberToIndianWords } from '@/lib/gst';
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
  const [copiedUpi, setCopiedUpi] = useState(false);

  if (!isOpen) return null;

  const invoice = buildInvoiceData(order, {
    name: activeCreator?.name || 'Creator',
    businessName: activeCreator?.upiName || `${activeCreator?.name} Digital Ventures`,
    state: activeCreator?.state || 'Karnataka',
    gstNumber: activeCreator?.gstNumber || '29AAECS4567M1ZV',
    address: `${activeCreator?.location || 'Bengaluru, Karnataka'}, India`
  });

  const invoiceStatus = (order.paymentStatus || (order.status === 'completed' ? 'Paid' : 'Pending')) as 'Paid' | 'Pending' | 'Overdue';

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;
    try {
      setDownloading(true);
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false
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

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(activeCreator?.upiId || 'creator@okaxis');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-3xl rounded-[24px] border border-white/[0.12] bg-[#0A0D17] p-5 sm:p-6 shadow-2xl text-slate-100 animate-scale-in my-6 max-h-[95vh] overflow-y-auto">
        
        {/* Header toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-[12px] bg-royal-600/20 border border-royal-500/30 flex items-center justify-center text-royal-400">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-base font-bold text-white tracking-tight">
                  GST Tax Invoice ({invoice.invoiceNumber})
                </h3>
                {invoiceStatus === 'Paid' && (
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/30 font-mono">
                    ✓ Paid
                  </span>
                )}
                {invoiceStatus === 'Pending' && (
                  <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/30 font-mono">
                    ⏳ Pending
                  </span>
                )}
                {invoiceStatus === 'Overdue' && (
                  <span className="rounded-full bg-rose-500/15 px-2.5 py-0.5 text-[10px] font-bold text-rose-400 border border-rose-500/30 font-mono">
                    ⚠️ Overdue
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">Official compliant e-invoice under Indian GST Act 2017</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 rounded-[12px] border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300 hover:bg-white/[0.08] transition btn-press font-semibold"
              title="Print Tax Invoice"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="flex items-center gap-1.5 rounded-[12px] bg-royal-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-royal-500 shadow-royal-sm transition btn-press disabled:opacity-50"
              title="Export as PDF file"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{downloading ? 'Exporting PDF...' : 'Download PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-slate-400 hover:bg-white/[0.08] hover:text-white transition"
              title="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* PRINTABLE INVOICE PAPER SHEET (Clean, Authentic Indian GST Format) */}
        <div 
          ref={invoiceRef} 
          className="rounded-[16px] bg-white p-6 sm:p-8 text-slate-900 shadow-2xl border border-gray-300 text-xs leading-relaxed font-sans"
        >
          {/* Top Legal Header */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-4">
            <div className="max-w-[58%]">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-slate-900 tracking-tight">{invoice.creator.businessName}</span>
                <span className="bg-blue-50 text-blue-900 text-[9px] font-bold px-2 py-0.5 rounded border border-blue-200">
                  GSTIN REGISTERED
                </span>
              </div>
              <p className="text-gray-700 mt-0.5 text-[11px]">{invoice.creator.address}</p>
              <div className="grid grid-cols-2 gap-x-2 text-[11px] text-gray-800 mt-1">
                <p><strong className="text-slate-900">State:</strong> {invoice.creator.state} (Code: {invoice.creator.stateCode})</p>
                <p><strong className="text-slate-900">PAN:</strong> <span className="font-mono">{invoice.creator.pan}</span></p>
                <p className="col-span-2 font-mono font-bold text-slate-900">
                  <strong>GSTIN:</strong> {invoice.creator.gstin}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block bg-slate-900 text-white font-bold text-xs uppercase px-3 py-1 rounded tracking-wider shadow-sm">
                TAX INVOICE
              </span>
              <p className="text-[10px] text-gray-500 mt-0.5">(Original for Recipient - Rule 46 of CGST Rules)</p>
              
              <div className="mt-2.5 space-y-0.5 text-[11px]">
                <p className="font-bold text-gray-900">Invoice No: <span className="font-mono text-royal-700">{invoice.invoiceNumber}</span></p>
                <p className="text-gray-700">Invoice Date: <strong className="text-slate-900">{invoice.invoiceDate}</strong></p>
                <p className="text-gray-700">Due Date: <strong className="text-slate-900">{invoice.dueDate}</strong></p>
                <p className="text-gray-700">Place of Supply: <strong className="text-slate-900">{invoice.placeOfSupply}</strong></p>
              </div>
            </div>
          </div>

          {/* Bill To Customer & Payment Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-[12px] border border-gray-200 mb-4 text-xs">
            <div>
              <p className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">Billed To (Recipient / Customer)</p>
              <p className="font-bold text-sm text-slate-900 mt-0.5">{invoice.buyer.name}</p>
              <p className="text-gray-700 text-[11px]">{invoice.buyer.phone} • {invoice.buyer.email}</p>
              <p className="text-gray-800 font-medium text-[11px] mt-0.5">
                State: {invoice.buyer.state} (Code: {invoice.buyer.stateCode})
              </p>
              {invoice.buyer.gstin ? (
                <p className="font-mono text-[11px] font-bold text-blue-900 mt-0.5 bg-blue-50/80 px-1.5 py-0.5 rounded border border-blue-200 inline-block">
                  Buyer GSTIN: {invoice.buyer.gstin} (B2B Tax Credit)
                </p>
              ) : (
                <p className="text-[10px] text-gray-500 italic mt-0.5">B2C Retail Consumer (Unregistered)</p>
              )}
            </div>

            <div>
              <p className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">Payment Status & Settlement</p>
              <div className="mt-1 space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">Status:</span>
                  {invoiceStatus === 'Paid' && (
                    <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px] inline-flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3 inline text-emerald-600" /> Fully Paid
                    </span>
                  )}
                  {invoiceStatus === 'Pending' && (
                    <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded text-[11px] inline-flex items-center gap-1">
                      <Clock className="h-3 w-3 inline text-amber-600" /> Payment Pending
                    </span>
                  )}
                  {invoiceStatus === 'Overdue' && (
                    <span className="font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded text-[11px] inline-flex items-center gap-1">
                      <AlertCircle className="h-3 w-3 inline text-rose-600" /> Overdue
                    </span>
                  )}
                </div>
                <p className="text-gray-700 text-[11px]">Payment Mode: <strong className="text-slate-900">{invoice.paymentDetails.mode}</strong></p>
                {invoice.paymentDetails.transactionId && (
                  <p className="text-gray-600 font-mono text-[10px]">Txn Ref: {invoice.paymentDetails.transactionId}</p>
                )}
                <p className="text-gray-600 text-[10px]">Supply Type: <strong className="text-slate-900">{invoice.isInterState ? 'Inter-State (IGST 18%)' : 'Intra-State (CGST 9% + SGST 9%)'}</strong></p>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-gray-300 rounded-[10px] overflow-hidden mb-4 shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white font-semibold text-[10px] uppercase">
                <tr>
                  <th className="p-2.5 text-center w-8">#</th>
                  <th className="p-2.5">Description of Supply</th>
                  <th className="p-2.5">HSN/SAC</th>
                  <th className="p-2.5 text-center">Qty</th>
                  <th className="p-2.5 text-right">Taxable (₹)</th>
                  {!invoice.isInterState ? (
                    <>
                      <th className="p-2.5 text-right">CGST (9%)</th>
                      <th className="p-2.5 text-right">SGST (9%)</th>
                    </>
                  ) : (
                    <th className="p-2.5 text-right">IGST (18%)</th>
                  )}
                  <th className="p-2.5 text-right">Total (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-800 text-xs">
                {invoice.items.map((it, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50">
                    <td className="p-2.5 text-center font-mono text-gray-500">{idx + 1}</td>
                    <td className="p-2.5 font-semibold text-slate-900">
                      {it.description}
                    </td>
                    <td className="p-2.5 font-mono text-[11px] text-gray-700">{it.sacCode}</td>
                    <td className="p-2.5 text-center font-mono">{it.quantity}</td>
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

          {/* Amount In Words & Totals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start mb-4 border-b border-gray-200 pb-4">
            <div className="space-y-2 text-xs">
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Total Amount in Words:</p>
                <p className="font-semibold text-slate-900 italic text-[11px] mt-0.5 bg-gray-50 p-2 rounded border border-gray-200">
                  {invoice.amountInWords || numberToIndianWords(invoice.totalInvoiceValue)}
                </p>
              </div>

              {/* Remittance Details */}
              <div className="bg-slate-50 p-2.5 rounded-[10px] border border-gray-200 text-[11px] space-y-1">
                <p className="font-bold text-slate-900 flex items-center justify-between">
                  <span>Creator Remittance Details:</span>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="text-royal-600 hover:text-royal-800 text-[10px] flex items-center gap-1 font-mono font-semibold"
                  >
                    {copiedUpi ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedUpi ? 'Copied' : 'Copy VPA'}</span>
                  </button>
                </p>
                <p className="text-gray-700">UPI VPA: <strong className="font-mono text-slate-900">{activeCreator?.upiId || 'creator@okaxis'}</strong></p>
                <p className="text-gray-600 text-[10px]">Electronic payment accepted via PhonePe, GPay, Paytm, Cards & Netbanking.</p>
              </div>
            </div>

            {/* Calculations column */}
            <div className="space-y-1 text-right text-xs">
              <div className="flex justify-between text-gray-700">
                <span>Taxable Amount (Base):</span>
                <span className="font-mono font-medium">₹{invoice.taxableTotal.toFixed(2)}</span>
              </div>
              {!invoice.isInterState ? (
                <>
                  <div className="flex justify-between text-gray-700">
                    <span>Central GST (CGST 9%):</span>
                    <span className="font-mono">₹{invoice.cgstAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>State GST (SGST 9% - {invoice.creator.state}):</span>
                    <span className="font-mono">₹{invoice.sgstAmount.toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-gray-700">
                  <span>Integrated GST (IGST 18%):</span>
                  <span className="font-mono">₹{invoice.igstAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600 text-[11px] pt-1 border-t border-gray-200">
                <span>Total Tax Amount:</span>
                <span className="font-mono">
                  ₹{(!invoice.isInterState ? invoice.cgstAmount + invoice.sgstAmount : invoice.igstAmount).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 border-t-2 border-slate-900 pt-1.5">
                <span>Total Invoice Value:</span>
                <span className="font-mono text-royal-700">₹{invoice.totalInvoiceValue.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Legal Notes & Digital Seal */}
          <div className="flex flex-col sm:flex-row justify-between items-end gap-4 pt-1 text-[10px]">
            <div className="max-w-md text-gray-500 space-y-0.5">
              <p className="font-bold text-gray-700">Declaration & Terms:</p>
              <p>• {invoice.terms || 'Supply of digital products and online coaching services.'}</p>
              <p>• Reverse Charge Mechanism (RCM): <strong className="text-slate-800">No</strong></p>
              <p className="text-royal-700 font-medium">✓ Digitally signed & verified via CreatorOS India Compliance Engine</p>
            </div>

            <div className="text-center sm:text-right shrink-0">
              <div className="h-7 font-serif italic text-slate-900 font-bold text-sm">{invoice.creator.name}</div>
              <div className="border-t border-gray-400 pt-0.5 text-gray-700">
                <p className="font-bold text-[10px]">{invoice.creator.businessName}</p>
                <p className="text-[9px] text-gray-500">Authorized Signatory</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
