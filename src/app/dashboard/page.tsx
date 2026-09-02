'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  Sparkles, 
  ArrowUpRight, 
  Calendar, 
  Receipt, 
  Zap, 
  Smartphone, 
  CheckCircle2, 
  Download, 
  Plus, 
  ExternalLink,
  MessageSquare,
  Activity,
  ArrowDownRight,
  RefreshCw
} from 'lucide-react';
import { useCreatorStore } from '@/lib/store';
import GSTInvoiceModal from '@/components/invoice/GSTInvoiceModal';
import { Order } from '@/types';
import { 
  AnimatedCounter, 
  RippleButton, 
  HoverCard, 
  FadeIn, 
  Skeleton, 
  PageTransition 
} from '@/components/ui/motion';
import { motion } from 'framer-motion';

export default function DashboardOverviewPage() {
  const { activeCreator, orders, products, courses, bookingServices, whatsappLogs } = useCreatorStore();
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [payoutSuccess, setPayoutSuccess] = useState(false);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [isLoading, setIsLoading] = useState(false);

  const totalGMV = orders.reduce((sum, ord) => sum + ord.totalAmount, 0);
  const totalTaxable = orders.reduce((sum, ord) => sum + ord.amount, 0);
  const totalGST = orders.reduce((sum, ord) => sum + (ord.cgst + ord.sgst + ord.igst), 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalGMV / totalOrdersCount) : 0;

  const handleSimulatePayout = () => {
    setPayoutSuccess(true);
    setTimeout(() => setPayoutSuccess(false), 5000);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 700);
  };

  return (
    <PageTransition>
      <div className="space-y-7 font-sans">
        
        {/* Top Banner / Welcome - Stripe/Linear Sleek Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Studio Overview
              </h1>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 font-mono">
                UPI Gateway Active
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Welcome back, <span className="font-medium text-white">{activeCreator?.name}</span> • Here is your real-time monetization performance.
            </p>
          </div>

          {/* Action Buttons with Micro-interactions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleRefresh}
              title="Refresh Metrics"
              className="p-2 rounded-[14px] border border-white/[0.1] bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] transition btn-press"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin text-royal-400' : ''}`} />
            </button>
            <Link
              href="/dashboard/products"
              className="flex items-center gap-1.5 rounded-[14px] border border-white/[0.1] bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white hover:bg-white/[0.08] transition btn-press"
            >
              <Plus className="h-3.5 w-3.5 text-royal-400" />
              <span>New Product</span>
            </Link>
            <Link
              href={`/${activeCreator?.username}`}
              target="_blank"
              className="flex items-center gap-1.5 rounded-[14px] bg-royal-600 hover:bg-royal-500 px-4 py-2 text-xs font-semibold text-white shadow-royal btn-press transition"
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
              <span>Live Store</span>
            </Link>
          </div>
        </div>

        {/* Payout Notification banner if triggered */}
        {payoutSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[20px] border border-emerald-500/30 bg-emerald-950/30 p-4 text-emerald-300 text-xs flex items-center justify-between shadow-glass-subtle"
          >
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <span>
                <strong>IMPS Payout Dispatched!</strong> ₹{totalGMV.toFixed(2)} transferred to {activeCreator?.bankAccount.bankName} ({activeCreator?.bankAccount.accountNumberMasked}).
              </span>
            </div>
            <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              UTR: IMPS{Math.floor(100000000000 + Math.random() * 900000000000)}
            </span>
          </motion.div>
        )}

        {/* TOP METRIC CARDS - Hover Lift & Animated Counting Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Metric 1: Total GMV */}
          <HoverCard className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-3 w-28" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2 font-medium">
                  <span>Gross Revenue (GMV)</span>
                  <div className="p-2 rounded-[12px] bg-royal-600/15 text-royal-400 border border-royal-500/25">
                    <Zap className="h-3.5 w-3.5 fill-royal-400" />
                  </div>
                </div>
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  <AnimatedCounter value={totalGMV} prefix="₹" />
                </div>
                <div className="flex items-center gap-1.5 mt-2.5 text-[11px] text-emerald-400 font-medium">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>+24.8% vs last week</span>
                </div>
              </>
            )}
          </HoverCard>

          {/* Metric 2: Total Orders */}
          <HoverCard className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-3 w-28" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2 font-medium">
                  <span>Orders & Bookings</span>
                  <div className="p-2 rounded-[12px] bg-blue-500/15 text-blue-400 border border-blue-500/25">
                    <ShoppingBag className="h-3.5 w-3.5" />
                  </div>
                </div>
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  <AnimatedCounter value={totalOrdersCount} />
                </div>
                <div className="text-[11px] text-slate-400 mt-2.5">
                  AOV: <span className="text-white font-semibold font-mono">₹<AnimatedCounter value={avgOrderValue} /></span>
                </div>
              </>
            )}
          </HoverCard>

          {/* Metric 3: GST Collected */}
          <HoverCard className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-28" />
                <Skeleton className="h-3 w-28" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2 font-medium">
                  <span>GST Tax Invoiced (18%)</span>
                  <div className="p-2 rounded-[12px] bg-indigo-500/15 text-indigo-400 border border-indigo-500/25">
                    <Receipt className="h-3.5 w-3.5" />
                  </div>
                </div>
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  <AnimatedCounter value={Math.round(totalGST)} prefix="₹" />
                </div>
                <div className="text-[11px] text-royal-300 mt-2.5 flex items-center justify-between">
                  <span>SAC 998431 / 998313</span>
                  <Link href="/dashboard/gst-invoices" className="hover:underline text-[10px]">Invoices →</Link>
                </div>
              </>
            )}
          </HoverCard>

          {/* Metric 4: WhatsApp Delivery */}
          <HoverCard className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-3 w-28" />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-slate-400 text-xs mb-2 font-medium">
                  <span>WhatsApp Delivery</span>
                  <div className="p-2 rounded-[12px] bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                    <MessageSquare className="h-3.5 w-3.5" />
                  </div>
                </div>
                <div className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                  <AnimatedCounter value={99.8} decimals={1} suffix="%" />
                </div>
                <div className="text-[11px] text-slate-400 mt-2.5">
                  <AnimatedCounter value={whatsappLogs.length} /> automated alerts sent
                </div>
              </>
            )}
          </HoverCard>

        </div>

        {/* STRIPE/LINEAR REVENUE SVG CHART & ANALYTICS WIDGET */}
        <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-white/[0.06]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-royal-400 font-mono">Revenue Analytics</span>
              <h3 className="font-display text-lg font-bold text-white mt-0.5">UPI Sales Volume & Daily Trajectory</h3>
            </div>

            <div className="flex items-center gap-1.5 p-1 rounded-[12px] bg-white/[0.04] border border-white/[0.08]">
              {(['7d', '30d', '90d'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeRange(t)}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-[8px] transition btn-press ${
                    timeRange === t ? 'bg-royal-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Sleek SVG Area Chart with Path Animation */}
          <div className="h-44 w-full relative pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 700 140" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              
              {/* Grid horizontal guide lines */}
              <line x1="0" y1="30" x2="700" y2="30" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
              <line x1="0" y1="75" x2="700" y2="75" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
              <line x1="0" y1="120" x2="700" y2="120" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />

              {/* Gradient filled area */}
              <path
                d="M 0 120 C 100 110, 180 80, 260 90 C 340 100, 420 40, 500 50 C 580 60, 640 20, 700 15 L 700 140 L 0 140 Z"
                fill="url(#chartGradient)"
              />

              {/* Smooth curve line with Framer Motion draw effect */}
              <motion.path
                d="M 0 120 C 100 110, 180 80, 260 90 C 340 100, 420 40, 500 50 C 580 60, 640 20, 700 15"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />

              {/* Pulsing data node on peak */}
              <circle cx="700" cy="15" r="4.5" fill="#60A5FA" className="animate-pulse" />
              <circle cx="500" cy="50" r="3.5" fill="#2563EB" />
              <circle cx="260" cy="90" r="3.5" fill="#2563EB" />
            </svg>

            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-2 pt-2 border-t border-white/[0.04]">
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span className="text-royal-400 font-bold">Today (Peak)</span>
            </div>
          </div>
        </div>

        {/* QUICK PAYOUT & BANK SUMMARY - Ripple Trigger Button */}
        <div className="rounded-[20px] border border-royal-500/25 bg-gradient-to-r from-[#0C1226] via-[#0E152E] to-[#0A0F20] p-5 sm:p-6 shadow-glass-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-royal-400 font-mono">Instant Indian Bank Settlement</span>
            <h3 className="font-display text-lg font-bold text-white mt-0.5">
              Available Balance: <span className="font-mono text-white">₹<AnimatedCounter value={totalGMV} decimals={2} /></span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Linked to <span className="font-semibold text-white">{activeCreator?.bankAccount.bankName}</span> ({activeCreator?.bankAccount.accountNumberMasked}) • IFSC: <span className="font-mono text-royal-300">{activeCreator?.bankAccount.ifsc}</span>
            </p>
          </div>

          <RippleButton
            onClick={handleSimulatePayout}
            className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-5 py-2.5 text-xs font-bold text-white shadow-royal hover:brightness-110 shrink-0"
          >
            <Zap className="h-4 w-4 fill-white" />
            <span>Trigger 1-Click IMPS Payout</span>
          </RippleButton>
        </div>

        {/* RECENT TRANSACTIONS TABLE - Hover Effects */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Real-time Live Order Feed */}
          <div className="lg:col-span-2 rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-5 sm:p-6 shadow-glass-card">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                  <span>Recent UPI Transactions</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-xs text-slate-400">Instant UPI QR & App orders with automated GST invoice generation</p>
              </div>
              <Link href="/dashboard/gst-invoices" className="text-xs font-medium text-royal-400 hover:underline">
                All Invoices →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/[0.06] text-slate-400 uppercase font-semibold text-[10px]">
                  <tr>
                    <th className="pb-3">Buyer</th>
                    <th className="pb-3">Item</th>
                    <th className="pb-3">Payment</th>
                    <th className="pb-3 text-right">Amount</th>
                    <th className="pb-3 text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-slate-300">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="py-3">
                        <p className="font-medium text-white">{ord.buyerName}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{ord.buyerState}</p>
                      </td>
                      <td className="py-3 max-w-[160px]">
                        <span className="inline-block rounded-md bg-white/[0.06] px-1.5 py-0.5 text-[9px] uppercase font-bold text-royal-400 mr-1">
                          {ord.itemType}
                        </span>
                        <span className="line-clamp-1 text-slate-200">{ord.itemTitle}</span>
                      </td>
                      <td className="py-3">
                        <span className="rounded-md bg-royal-600/15 text-royal-300 border border-royal-500/25 px-2 py-0.5 text-[10px] font-medium font-mono">
                          {ord.paymentApp || 'UPI'}
                        </span>
                      </td>
                      <td className="py-3 text-right font-bold text-white font-mono">
                        ₹{ord.totalAmount.toFixed(2)}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => setSelectedInvoiceOrder(ord)}
                          className="inline-flex items-center gap-1 rounded-[10px] border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold text-slate-200 hover:border-royal-500/40 hover:text-royal-400 transition btn-press"
                        >
                          <Receipt className="h-3 w-3" />
                          <span>{ord.invoiceNumber.slice(-5)}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Col: Active Storefront Offerings */}
          <div className="space-y-4">
            <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-5 shadow-glass-card">
              <h3 className="font-display text-sm font-bold text-white mb-3">
                Offerings Summary
              </h3>
              
              <div className="space-y-2.5 text-xs">
                <HoverCard hoverY={-2} className="flex items-center justify-between p-3 rounded-[16px] bg-white/[0.03] border border-white/[0.05] hover:border-royal-500/30">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-[10px] bg-royal-600/15 text-royal-400">
                      <ShoppingBag className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Digital Products</p>
                      <p className="text-[10px] text-slate-400">{products.length} published</p>
                    </div>
                  </div>
                  <Link href="/dashboard/products" className="text-royal-400 hover:underline text-[11px]">Manage</Link>
                </HoverCard>

                <HoverCard hoverY={-2} className="flex items-center justify-between p-3 rounded-[16px] bg-white/[0.03] border border-white/[0.05] hover:border-blue-500/30">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-[10px] bg-blue-500/15 text-blue-400">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Video Courses</p>
                      <p className="text-[10px] text-slate-400">{courses.length} active</p>
                    </div>
                  </div>
                  <Link href="/dashboard/courses" className="text-royal-400 hover:underline text-[11px]">Manage</Link>
                </HoverCard>

                <HoverCard hoverY={-2} className="flex items-center justify-between p-3 rounded-[16px] bg-white/[0.03] border border-white/[0.05] hover:border-indigo-500/30">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-[10px] bg-indigo-500/15 text-indigo-400">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">1:1 Sessions</p>
                      <p className="text-[10px] text-slate-400">{bookingServices.length} slot types</p>
                    </div>
                  </div>
                  <Link href="/dashboard/bookings" className="text-royal-400 hover:underline text-[11px]">Manage</Link>
                </HoverCard>
              </div>
            </div>

            {/* WhatsApp Automation Widget */}
            <div className="rounded-[20px] border border-royal-500/25 bg-gradient-to-b from-[#0C1226] to-[#070A14] p-5 shadow-glass-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-royal-400 font-mono">
                  WhatsApp Nudge API
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                Automatic download delivery & meeting invites with 99.8% open rate.
              </p>

              <Link href="/dashboard/whatsapp">
                <RippleButton className="w-full rounded-[14px] bg-royal-600/20 border border-royal-500/30 py-2.5 text-xs font-semibold text-royal-300 hover:bg-royal-600/30">
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>WhatsApp Logs ({whatsappLogs.length})</span>
                </RippleButton>
              </Link>
            </div>

          </div>

        </div>

        {/* Invoice Viewer Modal */}
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
