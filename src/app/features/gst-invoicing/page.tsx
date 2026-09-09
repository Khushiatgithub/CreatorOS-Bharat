'use client';

import React from 'react';
import FeaturePageLayout, { FeaturePageData } from '@/components/features/FeaturePageLayout';
import { 
  Receipt, 
  ShieldCheck, 
  Download, 
  CheckCircle2, 
  FileText, 
  Building2, 
  Calculator, 
  Zap, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

const gstInvoicingData: FeaturePageData = {
  badge: 'GST Invoicing Engine',
  title: 'Automated 100% Tax Compliant',
  highlightedTitle: 'GST Invoicing (SAC 998439)',
  description: 'Generate legal, downloadable B2B and B2C GST tax invoices for every digital product, course, and 1:1 consultation sale with automated SAC code tagging and 1-click GSTR-1 export.',
  metrics: [
    { label: 'Time Saved / Month', value: '25+ Hrs', change: 'Automated Calculation' },
    { label: 'SAC Code Compliance', value: '100%', change: 'Official GST Portal Ready' },
    { label: 'B2B Input Tax Credit', value: 'Instant', change: 'Company GSTIN Validation' }
  ],
  overviewTitle: 'Zero Tax Headaches for Indian Creators & CAs',
  overviewDescription: 'Whether you are an unregistered creator selling notes or a registered private limited company doing ₹50 Lakhs/month, CreatorOS automatically calculates CGST, SGST, or IGST based on buyer states and generates professional PDF invoices.',
  steps: [
    {
      number: '01',
      title: 'Enter Your Creator State & GSTIN',
      description: 'Add your home state (e.g. Maharashtra, Karnataka, Delhi) and optional GSTIN in your profile settings.',
      badge: '1-Time Setup'
    },
    {
      number: '02',
      title: 'Automated Buyer State & SAC Tagging',
      description: 'System detects buyer location and automatically applies intra-state (CGST+SGST) or inter-state (IGST) 18% rates.',
      badge: 'Auto Detection'
    },
    {
      number: '03',
      title: 'Instant PDF Invoice Generation',
      description: 'A formal tax invoice with sequential numbering (INV-2026-XXXXX) is generated in under 1 second.',
      badge: 'Instant PDF'
    },
    {
      number: '04',
      title: '1-Click GSTR-1 JSON & Excel Export',
      description: 'Download monthly sales tables formatted specifically for your Chartered Accountant and the GST Portal.',
      badge: 'CA Approved'
    }
  ],
  benefits: [
    {
      icon: Receipt,
      title: 'Official SAC Codes (998439 / 998313)',
      description: 'Pre-configured SAC classifications for digital education notes, software downloads, online cohorts, and advisory services.',
      tag: 'SAC Compliant'
    },
    {
      icon: Calculator,
      title: 'Automated CGST, SGST & IGST Split',
      description: 'Calculates 9% CGST + 9% SGST for same-state buyers, or 18% IGST for interstate transactions automatically.',
      tag: 'Zero Math'
    },
    {
      icon: Building2,
      title: 'B2B GSTIN Input Credit Validation',
      description: 'Corporate buyers can input their Company Name & GSTIN at checkout to claim full Input Tax Credit (ITC).',
      tag: 'B2B Ready'
    },
    {
      icon: Download,
      title: 'Instant WhatsApp & Email PDF Delivery',
      description: 'Buyers receive their official PDF invoice directly on WhatsApp and Email immediately after UPI payment.',
      tag: 'Auto Dispatch'
    },
    {
      icon: FileText,
      title: 'Sequential Invoice Numbering',
      description: 'Complies with Indian GST Rule 46 requiring unique consecutive numbering per financial year.',
      tag: 'Rule 46 Legal'
    },
    {
      icon: ShieldCheck,
      title: 'Unregistered Creator Support',
      description: 'Not registered for GST yet? Generate official commercial bills of supply legally with 0% tax tags.',
      tag: 'Starter Friendly'
    }
  ],
  previewComponent: (
    <div className="max-w-lg mx-auto rounded-[24px] border border-white/[0.15] bg-[#0A0E1A] p-6 shadow-2xl space-y-4">
      <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div>
          <span className="text-[10px] font-mono text-royal-400 uppercase font-bold tracking-wider">TAX INVOICE</span>
          <h4 className="font-display font-bold text-sm text-white mt-0.5">INV-2026-08492</h4>
        </div>
        <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-mono font-semibold">
          SAC 998439
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-mono">Supplier (Creator)</p>
          <p className="font-semibold text-white mt-0.5">Aarav Sharma Tech</p>
          <p className="text-[11px] text-slate-400 font-mono">GSTIN: 27AAAAA0000A1Z5</p>
          <p className="text-[11px] text-slate-400">Maharashtra (State Code: 27)</p>
        </div>
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-mono">Billed To (Buyer)</p>
          <p className="font-semibold text-white mt-0.5">Rohan Mehta</p>
          <p className="text-[11px] text-slate-400 font-mono">Karnataka (State Code: 29)</p>
          <p className="text-[11px] text-emerald-400 font-mono">Inter-State (IGST Applicable)</p>
        </div>
      </div>

      <div className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-3 space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-300">
          <span>FAANG DSA & System Design Master Notes</span>
          <span className="font-mono text-white">₹338.14</span>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400">
          <span>Integrated GST (IGST @ 18%)</span>
          <span className="font-mono text-royal-400">₹60.86</span>
        </div>
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between font-bold text-white">
          <span>Total Paid (via UPI)</span>
          <span className="font-mono text-emerald-400 text-sm">₹399.00</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 text-[11px]">
        <span className="text-slate-400 font-mono">Status: <strong className="text-emerald-400 font-semibold">PAID (UPI-9847120984)</strong></span>
        <button className="flex items-center gap-1.5 text-royal-400 hover:text-royal-300 font-semibold transition">
          <Download className="h-3.5 w-3.5" />
          <span>Download PDF</span>
        </button>
      </div>
    </div>
  ),
  faqs: [
    {
      question: 'Do I need a registered GSTIN to start selling?',
      answer: 'No! If your annual revenue is under the mandatory government threshold (₹20 Lakhs for services in most states), you can sell legally on CreatorOS as an unregistered creator. The platform generates proper non-tax bills of supply.'
    },
    {
      question: 'How does CreatorOS know whether to apply IGST or CGST/SGST?',
      answer: 'CreatorOS detects the buyer state from their checkout details and compares it with your registered state. Same-state orders get 9% CGST + 9% SGST; interstate orders get 18% IGST.'
    },
    {
      question: 'Can my Chartered Accountant easily file GSTR-1 with this data?',
      answer: 'Yes! You can download monthly B2B and B2C sales spreadsheets with a single click formatted precisely according to standard GST portal schemas.'
    },
    {
      question: 'Are SAC codes included on every invoice?',
      answer: 'Yes, every invoice includes standardized SAC codes (e.g. SAC 998439 for online training and SAC 998313 for software consulting).'
    }
  ]
};

export default function GSTInvoicingPage() {
  return <FeaturePageLayout data={gstInvoicingData} />;
}
