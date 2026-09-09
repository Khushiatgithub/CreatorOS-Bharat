'use client';

import React from 'react';
import FeaturePageLayout, { FeaturePageData } from '@/components/features/FeaturePageLayout';
import { 
  MessageSquare, 
  Send, 
  Clock, 
  CheckCheck, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  RefreshCw,
  BellRing,
  Download
} from 'lucide-react';

const whatsappAutomationData: FeaturePageData = {
  badge: 'WhatsApp Automation Engine',
  title: 'Instant Order Delivery & Recovery via',
  highlightedTitle: 'WhatsApp Bot in 45 Seconds',
  description: 'Deliver digital downloads, Google Meet links, and abandoned cart reminder discounts directly to Indian buyers on WhatsApp with 98%+ open rates.',
  metrics: [
    { label: 'Message Open Rate', value: '98.4%', change: 'Vs 21% Email' },
    { label: 'Delivery Speed', value: '38s', change: 'Real-time Webhook' },
    { label: 'Abandoned Cart Recovery', value: '28.6%', change: '+₹1.4L Avg Boost' }
  ],
  overviewTitle: 'Meet Your Indian Buyers Where They Live: WhatsApp',
  overviewDescription: 'Indian customers check WhatsApp 25+ times a day. While emails land in the spam folder or promotions tab, CreatorOS delivers secure file download buttons and meeting calendar invites straight to their WhatsApp inbox.',
  steps: [
    {
      number: '01',
      title: 'Buyer Enters WhatsApp Number',
      description: 'During 1-click UPI checkout, the buyer provides their 10-digit Indian WhatsApp mobile number.',
      badge: 'Frictionless'
    },
    {
      number: '02',
      title: 'Automated UPI Payment Confirmation',
      description: 'Our backend webhook validates the bank IMPS / UPI transaction instantaneously.',
      badge: 'Zero Delay'
    },
    {
      number: '03',
      title: 'WhatsApp Message & File Dispatched',
      description: 'The verified WhatsApp business bot dispatches the PDF download link and invoice PDF.',
      badge: '< 45s Delivery'
    },
    {
      number: '04',
      title: 'Automated 1:1 Session Reminders',
      description: 'Sends Google Meet reminder alerts 2 hours and 15 minutes before the booked consultation call.',
      badge: '0% No-Shows'
    }
  ],
  benefits: [
    {
      icon: MessageSquare,
      title: '98%+ Open Rate in 3 Minutes',
      description: 'Eliminate lost download link emails and angry customer support messages with instant WhatsApp notifications.',
      tag: '98% Open Rate'
    },
    {
      icon: Send,
      title: 'Instant File & PDF Attachments',
      description: 'Buyers can open their notes, templates, and tax invoice PDFs directly inside WhatsApp without downloading 3rd party apps.',
      tag: 'Native Files'
    },
    {
      icon: Clock,
      title: 'Automated 1:1 Booking Reminders',
      description: 'Drastically reduce consultation call no-shows by sending automated WhatsApp reminders with clickable Google Meet links.',
      tag: 'Zero No-Shows'
    },
    {
      icon: RefreshCw,
      title: 'Smart Abandoned Cart Recovery',
      description: 'Automatically follow up with buyers who scanned the UPI QR code but dropped off with an exclusive 10% discount coupon.',
      tag: '+28% Revenue'
    },
    {
      icon: ShieldCheck,
      title: 'Official WhatsApp Business API',
      description: 'Powered by verified Meta Cloud API infrastructure with 100% spam-free delivery compliance.',
      tag: 'Meta Verified'
    },
    {
      icon: BellRing,
      title: 'Real-time Creator Sale Alerts',
      description: 'Get an instant celebratory WhatsApp ping on your personal phone whenever an order is completed.',
      tag: 'Creator Alerts'
    }
  ],
  previewComponent: (
    <div className="max-w-md mx-auto rounded-[28px] border border-white/[0.15] bg-[#0B141A] p-5 shadow-2xl space-y-4">
      {/* WhatsApp Chat Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
        <div className="relative">
          <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
            OS
          </div>
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#0B141A]" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="font-bold text-xs text-white">CreatorOS Official Bot</h4>
            <CheckCheck className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <p className="text-[10px] text-emerald-400 font-mono">Official Verified Business Account</p>
        </div>
      </div>

      {/* Message Bubble */}
      <div className="rounded-[18px] bg-[#202C33] p-4 text-xs text-slate-200 space-y-2.5 shadow-md">
        <p className="font-semibold text-white">
          🎉 Namaste Priya! Your order is confirmed!
        </p>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          Thank you for purchasing <strong>Full-Stack Next.js 14 Master Notes</strong> from <strong>Aarav Sharma</strong>.
        </p>

        <div className="rounded-xl bg-[#111B21] p-3 border border-white/[0.06] space-y-1.5 font-mono text-[10px]">
          <div className="flex justify-between text-slate-400">
            <span>Order ID:</span>
            <span className="text-white">ORD-2026-89412</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Amount Paid:</span>
            <span className="text-emerald-400 font-bold">₹499 (UPI)</span>
          </div>
        </div>

        {/* CTA Buttons inside WhatsApp message */}
        <div className="pt-2 space-y-2">
          <button className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 text-xs font-bold text-white flex items-center justify-center gap-2 shadow-sm transition">
            <Download className="h-4 w-4" />
            <span>Download Master Notes (PDF)</span>
          </button>
        </div>

        <div className="flex justify-end items-center gap-1 text-[9px] text-slate-400 font-mono pt-1">
          <span>12:42 PM</span>
          <CheckCheck className="h-3 w-3 text-emerald-400" />
        </div>
      </div>
    </div>
  ),
  faqs: [
    {
      question: 'Do I need my own WhatsApp Business API account or phone number?',
      answer: 'No! CreatorOS handles the entire WhatsApp Business infrastructure for you out of the box with 0 setup required.'
    },
    {
      question: 'Are there extra charges per WhatsApp message?',
      answer: 'Standard order confirmations, download links, and 1:1 reminders are included in your CreatorOS plan with zero hidden per-message fees.'
    },
    {
      question: 'What happens if a buyer does not have WhatsApp?',
      answer: 'If WhatsApp is unavailable, CreatorOS automatically falls back to sending the download link and invoice to the buyer’s email address.'
    },
    {
      question: 'Can I customize the WhatsApp message text?',
      answer: 'Yes! You can customize the greeting message and add your custom community invite link in your dashboard settings.'
    }
  ]
};

export default function WhatsAppAutomationPage() {
  return <FeaturePageLayout data={whatsappAutomationData} />;
}
