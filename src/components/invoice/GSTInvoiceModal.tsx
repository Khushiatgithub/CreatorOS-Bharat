'use client';

import React, { useRef, useState } from 'react';
import { X, Download, Printer, ShieldCheck, CheckCircle, FileText } from 'lucide-react';
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-[24px] border border-white/[0.12] bg-[#0A0D17] p-6 shadow-2xl text-slate-100 animate-scale-in my-6 max-h-[95vh] overflow-y-auto">
        
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-royal-400" />
            <h3 className="font-display text-base font-bold text-white">GST Tax Invoice ({invoice.invoiceNumber})</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 rounded-[12px] border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300 hover:bg-white/[0.08] transition btn-press"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={downloading}
              className="flex items-center gap-1.5 rounded-[12px] bg-royal-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-royal-500 shadow-royal-sm transition btn-press disabled:opacity-50"
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

        {/* INVOICE PAPER SHEET (Stripe-grade Clean Legal Design) */}
        <div 
          ref={invoiceRef} 
          className="rounded-[16px] bg-white p-7 text-slate-900 shadow-xl border border-gray-200 text-xs leading-relaxed font-sans"
        >
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-slate-900 tracking-tight">{invoice.creator.businessName}</span>
                <span className="bg-blue-50 text-blue-800 text-[9px] font-bold px-2 py-0.5 rounded border border-blue-200">
                  GST REGISTERED
                </span>
              </div>
              <p className="text-gray-600 mt-0.5">{invoice.creator.address}</p>
              <p className="text-gray-700 font-medium">State: {invoice.creator.state} (Code: {invoice.creator.stateCode})</p>
              <p className="text-gray-900 font-bold font-mono">GSTIN: {invoice.creator.gstin}</p>
            </div>
            <div className="text-right">
              <span className="inline-block bg-slate-900 text-white font-bold text-xs uppercase px-2.5 py-1 rounded">
                TAX INVOICE
              </span>
              <p className="text-[10px] text-gray-500 mt-0.5">(Original for Recipient)</p>
              <div className="mt-2 space-y-0.5 text-[11px]">
                <p className="font-bold text-gray-900">Invoice No: <span className="font-mono">{invoice.invoiceNumber}</span></p>
                <p className="text-gray-600">Date: {invoice.invoiceDate}</p>
                <p className="text-gray-600">Place of Supply: <span className="font-semibold">{invoice.placeOfSupply}</span></p>
              </div>
            </div>
          </div>

          {/* Bill To & Settlement */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-[12px] border border-gray-200 mb-4 text-xs">
            <div>
              <p className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">Billed To (Customer)</p>
              <p className="font-bold text-xs text-slate-900 mt-0.5">{invoice.buyer.name}</p>
              <p className="text-gray-600 text-[11px]">{invoice.buyer.phone} • {invoice.buyer.email}</p>
              <p className="text-gray-700 font-medium text-[11px]">State: {invoice.buyer.state} ({invoice.buyer.stateCode})</p>
              {invoice.buyer.gstin && (
                <p className="font-mono text-[11px] font-bold text-blue-800 mt-0.5">GSTIN: {invoice.buyer.gstin}</p>
              )}
            </div>
            <div>
              <p className="text-[9px] uppercase font-bold text-gray-500 tracking-wider">Payment & Settlement</p>
              <p className="font-semibold text-gray-900 mt-0.5 text-xs">Mode: {invoice.paymentDetails.mode}</p>
              <p className="text-gray-600 font-mono text-[10px]">Ref: {invoice.paymentDetails.transactionId}</p>
              <p className="text-emerald-700 font-semibold text-[10px] flex items-center gap-1 mt-0.5">
                <CheckCircle className="h-3 w-3 inline" /> Status: Paid via UPI
              </p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="border border-gray-200 rounded-[10px] overflow-hidden mb-4">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white font-semibold text-[11px]">
                <tr>
                  <th className="p-2">#</th>
                  <th className="p-2">Description of Supply</th>
                  <th className="p-2">HSN/SAC</th>
                  <th className="p-2 text-center">Qty</th>
                  <th className="p-2 text-right">Taxable (₹)</th>
                  {!invoice.isInterState ? (
                    <>
                      <th className="p-2 text-right">CGST (9%)</th>
                      <th className="p-2 text-right">SGST (9%)</th>
                    </>
                  ) : (
                    <th className="p-2 text-right">IGST (18%)</th>
                  )}
                  <th className="p-2 text-right">Total (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-800 text-xs">
                {invoice.items.map((it, idx) => (
                  <tr key={idx}>
                    <td className="p-2">{idx + 1}</td>
                    <td className="p-2 font-medium text-slate-900">{it.description}</td>
                    <td className="p-2 font-mono text-[11px]">{it.sacCode}</td>
                    <td className="p-2 text-center">{it.quantity}</td>
                    <td className="p-2 text-right">₹{it.taxableValue.toFixed(2)}</td>
                    {!invoice.isInterState ? (
                      <>
                        <td className="p-2 text-right">₹{invoice.cgstAmount.toFixed(2)}</td>
                        <td className="p-2 text-right">₹{invoice.sgstAmount.toFixed(2)}</td>
                      </>
                    ) : (
                      <td className="p-2 text-right">₹{invoice.igstAmount.toFixed(2)}</td>
                    )}
                    <td className="p-2 text-right font-bold text-slate-900">₹{invoice.totalInvoiceValue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-between items-start mb-4">
            <div className="max-w-xs text-[10px] text-gray-500">
              <p className="font-semibold text-gray-700">GST Compliance:</p>
              <p>• Certified system-generated electronic tax invoice complying with Indian GST Act 2017.</p>
            </div>
            <div className="w-56 space-y-1 text-right text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Taxable Amount:</span>
                <span className="font-medium">₹{invoice.taxableTotal.toFixed(2)}</span>
              </div>
              {!invoice.isInterState ? (
                <>
                  <div className="flex justify-between text-gray-600">
                    <span>CGST (9%):</span>
                    <span>₹{invoice.cgstAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>SGST (9%):</span>
                    <span>₹{invoice.sgstAmount.toFixed(2)}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between text-gray-600">
                  <span>IGST (18%):</span>
                  <span>₹{invoice.igstAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-xs font-bold text-slate-900 border-t-2 border-slate-900 pt-1.5">
                <span>Total Invoice Value:</span>
                <span>₹{invoice.totalInvoiceValue.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer Seal */}
          <div className="flex justify-between items-end border-t border-gray-200 pt-3 text-[10px]">
            <div className="flex items-center gap-1 text-royal-700 font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Digitally Verified & Sealed via CreatorOS India</span>
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
