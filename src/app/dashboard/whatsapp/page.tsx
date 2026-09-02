'use client';

import React, { useState } from 'react';
import { useCreatorStore } from '@/lib/store';
import { 
  MessageSquare, 
  Send, 
  CheckCheck, 
  Zap, 
  Clock, 
  FileText, 
  Calendar, 
  Video, 
  ShoppingBag, 
  Sparkles,
  Smartphone
} from 'lucide-react';
import { PageTransition, HoverCard, AnimatedCounter, RippleButton } from '@/components/ui/motion';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppAutomationPage() {
  const { whatsappLogs, activeCreator } = useCreatorStore();
  const [selectedTemplate, setSelectedTemplate] = useState<'order_receipt' | 'booking_meet' | 'abandoned_cart'>('order_receipt');

  return (
    <PageTransition>
      <div className="space-y-6 font-sans">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>WhatsApp Automation & Nudges</span>
              <span className="rounded-full bg-royal-600/15 text-royal-400 border border-royal-500/30 text-[10px] font-bold px-2.5 py-0.5 font-mono">
                99.8% Open Rate
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Deliver digital asset downloads, meeting links, and abandoned cart recoveries directly to Indian buyers' WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-[14px] border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-2 text-xs font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>WhatsApp Cloud API Active</span>
            </span>
          </div>
        </div>

        {/* TOP STATS with Hover Lift & Animated Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            <p className="text-xs text-slate-400">Automated Alerts Dispatched</p>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
              <AnimatedCounter value={whatsappLogs.length + 184} />
            </div>
            <p className="text-[11px] text-emerald-400 mt-1 font-mono">100% Delivery Success Rate</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            <p className="text-xs text-slate-400">Average Read Speed</p>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-royal-400 mt-1">
              <AnimatedCounter value={42} suffix=" seconds" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">vs 8 hours on standard email</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            <p className="text-xs text-slate-400">Abandoned Cart Recoveries</p>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1 font-mono">
              <AnimatedCounter value={48200} prefix="₹" />
            </div>
            <p className="text-[11px] text-emerald-400 mt-1">Recovered via 15-min nudge</p>
          </HoverCard>
        </div>

        {/* TWO COLUMN: TEMPLATE SELECTOR & CHAT PREVIEW */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Template Automation Selectors */}
          <div className="lg:col-span-7 rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-4">
            <h3 className="font-display text-base font-bold text-white">
              Automated Message Flows & Triggers
            </h3>

            <div className="space-y-3">
              {/* Template 1 */}
              <HoverCard hoverY={-2}>
                <button
                  onClick={() => setSelectedTemplate('order_receipt')}
                  className={`w-full text-left p-4 rounded-[18px] border transition ${
                    selectedTemplate === 'order_receipt'
                      ? 'border-royal-500 bg-royal-600/15 shadow-royal-sm ring-1 ring-royal-500/40'
                      : 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-white flex items-center gap-1.5">
                      <FileText className="h-4 w-4 text-royal-400" />
                      <span>Instant Digital Download & GST Invoice</span>
                    </span>
                    <span className="rounded bg-royal-600/20 text-royal-300 text-[9px] font-bold px-2 py-0.5 font-mono">
                      Trigger: UPI Paid
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Dispatches immediately after successful UPI payment with direct PDF link, GST invoice, and Discord/WhatsApp community invite.
                  </p>
                </button>
              </HoverCard>

              {/* Template 2 */}
              <HoverCard hoverY={-2}>
                <button
                  onClick={() => setSelectedTemplate('booking_meet')}
                  className={`w-full text-left p-4 rounded-[18px] border transition ${
                    selectedTemplate === 'booking_meet'
                      ? 'border-royal-500 bg-royal-600/15 shadow-royal-sm ring-1 ring-royal-500/40'
                      : 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-white flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-blue-400" />
                      <span>1:1 Consultation Slot & Google Meet Link</span>
                    </span>
                    <span className="rounded bg-blue-500/20 text-blue-300 text-[9px] font-bold px-2 py-0.5 font-mono">
                      Trigger: Slot Booked
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Sends calendar details, preparation instructions, and auto-generates Google Meet link.
                  </p>
                </button>
              </HoverCard>

              {/* Template 3 */}
              <HoverCard hoverY={-2}>
                <button
                  onClick={() => setSelectedTemplate('abandoned_cart')}
                  className={`w-full text-left p-4 rounded-[18px] border transition ${
                    selectedTemplate === 'abandoned_cart'
                      ? 'border-royal-500 bg-royal-600/15 shadow-royal-sm ring-1 ring-royal-500/40'
                      : 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-xs text-white flex items-center gap-1.5">
                      <ShoppingBag className="h-4 w-4 text-indigo-400" />
                      <span>Abandoned Cart 15-Minute Nudge</span>
                    </span>
                    <span className="rounded bg-indigo-500/20 text-indigo-300 text-[9px] font-bold px-2 py-0.5 font-mono">
                      Trigger: Dropoff
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Sends a friendly reminder 15 minutes after customer opened UPI QR with an exclusive 10% coupon code.
                  </p>
                </button>
              </HoverCard>
            </div>
          </div>

          {/* Right: Realistic WhatsApp Chat Simulator */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[340px] rounded-[24px] overflow-hidden border border-white/[0.12] bg-[#070D14] shadow-2xl">
              
              {/* Header */}
              <div className="bg-[#121E2C] p-3 flex items-center gap-3 text-white">
                <img
                  src={activeCreator?.avatarUrl}
                  alt={activeCreator?.name}
                  className="h-8 w-8 rounded-full object-cover ring-1 ring-royal-500"
                />
                <div className="flex-1 overflow-hidden">
                  <p className="font-bold text-xs truncate flex items-center gap-1">
                    <span>{activeCreator?.name}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </p>
                  <p className="text-[10px] text-royal-400 font-mono">CreatorOS Verified</p>
                </div>
              </div>

              {/* Chat Body with Spring Message Bubble Transition */}
              <div className="p-3.5 space-y-3 min-h-[300px] bg-[#070D14] bg-grid-subtle text-xs">
                <div className="rounded-lg bg-[#0E1B29] p-1.5 text-center text-[10px] text-slate-400 max-w-[200px] mx-auto">
                  🔒 End-to-end encrypted
                </div>

                {/* Message Bubble */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTemplate}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="rounded-[18px] rounded-tl-sm bg-[#16365C] p-3.5 text-white text-[11px] leading-relaxed shadow-md space-y-2 border border-royal-500/30"
                  >
                    {selectedTemplate === 'order_receipt' && (
                      <div>
                        <p className="font-bold">Namaste Rahul! 🙏</p>
                        <p className="mt-1">
                          Your payment of ₹470.82 for <strong>Ultimate FAANG SDE & DSA Master Sheet 2025</strong> is confirmed!
                        </p>
                        <div className="rounded-[10px] bg-black/40 p-2 text-[10px] font-mono mt-2 space-y-1">
                          <p>📥 Download: <span className="underline text-royal-300">creatoros.in/d/98421</span></p>
                          <p>📄 Tax Invoice: <span className="underline text-royal-300">INV-2025-00101.pdf</span></p>
                        </div>
                      </div>
                    )}

                    {selectedTemplate === 'booking_meet' && (
                      <div>
                        <p className="font-bold">Namaste Ananya! ✨</p>
                        <p className="mt-1">
                          Your 1:1 session with <strong>Aarav Sharma</strong> is booked!
                        </p>
                        <div className="rounded-[10px] bg-black/40 p-2 text-[10px] font-mono mt-2 space-y-1">
                          <p>🗓 Tomorrow at 07:00 PM IST</p>
                          <p>🔗 Meet: <span className="underline text-royal-300">meet.google.com/xyz-abcd</span></p>
                        </div>
                      </div>
                    )}

                    {selectedTemplate === 'abandoned_cart' && (
                      <div>
                        <p className="font-bold">Hey there! 👋</p>
                        <p className="mt-1">
                          We noticed you were checking out <strong>Ultimate FAANG SDE Sheet</strong>!
                        </p>
                        <p className="mt-1 text-royal-200">
                          Use code <strong>BHARAT10</strong> for 10% OFF in the next 30 mins:
                        </p>
                        <p className="mt-1 font-mono text-[10px] text-royal-300 underline">
                          creatoros.in/aarav.tech?discount=BHARAT10
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-1 text-[9px] text-royal-200/70 pt-1">
                      <span>9:42 PM</span>
                      <CheckCheck className="h-3 w-3 text-cyan-300 inline" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Input Bar */}
              <div className="bg-[#121E2C] p-2.5 flex items-center justify-between text-slate-400 text-xs">
                <span className="text-[11px] text-slate-400 pl-2">Broadcast notification only</span>
                <div className="p-1.5 rounded-full bg-royal-600 text-white">
                  <Send className="h-3 w-3" />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* DISPATCHED LOGS TABLE */}
        <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card">
          <h3 className="font-display text-base font-bold text-white mb-0.5">
            Recent WhatsApp Dispatches
          </h3>
          <p className="text-xs text-slate-400 mb-4">Delivery confirmations to customer mobile devices</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/[0.06] text-slate-400 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="pb-3">Recipient</th>
                  <th className="pb-3">Trigger Event</th>
                  <th className="pb-3">Delivery Status</th>
                  <th className="pb-3 text-right">Sent Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-slate-300">
                {whatsappLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.03] transition-colors">
                    <td className="py-3">
                      <p className="font-semibold text-white">{log.recipientName}</p>
                      <p className="text-[10px] font-mono text-slate-400">{log.recipientPhone}</p>
                    </td>
                    <td className="py-3 text-slate-200">{log.triggerEvent}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold">
                        <CheckCheck className="h-3 w-3" />
                        <span>Delivered & Read</span>
                      </span>
                    </td>
                    <td className="py-3 text-right text-slate-400 font-mono text-[11px]">{log.sentAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
