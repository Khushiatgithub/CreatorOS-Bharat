'use client';

import React from 'react';
import { useCreatorStore } from '@/lib/store';
import { 
  Calendar, 
  Clock, 
  Video, 
  CheckCircle, 
  Plus, 
  ExternalLink, 
  User, 
  Phone, 
  Mail, 
  Sparkles,
  ArrowUpRight 
} from 'lucide-react';
import { PageTransition, HoverCard, RippleButton } from '@/components/ui/motion';
import PremiumEmptyState from '@/components/ui/EmptyState';

export default function BookingsManagerPage() {
  const { bookingServices, appointments, activeCreator } = useCreatorStore();

  return (
    <PageTransition>
      <div className="space-y-6 font-sans">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>1:1 Paid Bookings & Sessions</span>
              <span className="rounded-full bg-royal-600/15 text-royal-400 border border-royal-500/30 text-[10px] font-bold px-2.5 py-0.5 font-mono">
                Topmate / Cal.com
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Host paid tech mentorships, resume roasts, and strategy calls with instant UPI confirmation and auto Google Meet.
            </p>
          </div>

          <RippleButton
            onClick={() => alert('New session service creator dialog! Configure duration, time slots (IST), and pricing.')}
            className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-4 py-2.5 text-xs font-semibold text-white shadow-royal"
          >
            <Plus className="h-4 w-4" />
            <span>Create Consultation Service</span>
          </RippleButton>
        </div>

        {/* SECTION 1: ACTIVE CONSULTATION OFFERINGS with Hover Lift Cards */}
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3 font-mono">
            Active Consultation Offerings
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookingServices.map((srv) => (
              <HoverCard
                hoverY={-3}
                key={srv.id}
                className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card space-y-4 hover:border-royal-500/35"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="rounded-md bg-royal-600/20 text-royal-300 border border-royal-500/30 px-2 py-0.5 text-[10px] font-semibold">
                      {srv.sessionType}
                    </span>
                    <h3 className="font-display text-base font-bold text-white mt-1.5">{srv.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{srv.description}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-display text-lg font-bold text-white">₹{srv.price}</span>
                    <p className="text-[10px] text-slate-400 font-mono">{srv.durationMinutes} mins</p>
                  </div>
                </div>

                <div className="rounded-[14px] bg-black/30 p-3 text-xs space-y-1.5 border border-white/[0.04]">
                  <div className="flex justify-between text-slate-300 text-[11px]">
                    <span>Available Days:</span>
                    <span className="font-medium text-royal-300">{srv.availableDays.join(', ')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300 text-[11px]">
                    <span>Slots (IST):</span>
                    <span className="font-mono text-slate-300">{srv.timeSlots.join(' • ')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300 text-[11px]">
                    <span>Platform:</span>
                    <span className="text-emerald-400 font-semibold font-mono">{srv.platform} Sync</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {srv.bookingsCompleted} Completed • ★ {srv.rating} Rating
                  </span>
                  <a
                    href={`/${activeCreator?.username}`}
                    target="_blank"
                    className="text-royal-400 hover:underline font-medium text-xs flex items-center gap-1"
                  >
                    <span>View on Store</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </HoverCard>
            ))}
          </div>
        </div>

        {/* SECTION 2: BOOKED APPOINTMENTS LEDGER */}
        <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card">
          <h2 className="font-display text-base font-bold text-white mb-0.5 flex items-center gap-2">
            <span>Scheduled Appointments</span>
            <span className="rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-bold px-2 py-0.5 border border-emerald-500/30 font-mono">
              Google Meet Active
            </span>
          </h2>
          <p className="text-xs text-slate-400 mb-5">
            Confirmed 1:1 sessions booked by buyers with UPI payment confirmation.
          </p>

          {appointments.length === 0 ? (
            <PremiumEmptyState
              icon={Calendar}
              title="No Appointments Scheduled Yet"
              description="When a buyer selects a time slot and pays via UPI on your bio storefront, the calendar booking and Google Meet invite will automatically appear here."
              badge="Topmate Sync Active"
              actionLabel="Preview Booking Slots"
              onAction={() => window.open(`/${activeCreator?.username}`, '_blank')}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/[0.06] text-slate-400 uppercase font-semibold text-[10px]">
                  <tr>
                    <th className="pb-3">Client</th>
                    <th className="pb-3">Service</th>
                    <th className="pb-3">Date & Time Slot</th>
                    <th className="pb-3">Meeting Link</th>
                    <th className="pb-3 text-right">Fee Paid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-slate-300">
                  {appointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="py-3">
                        <p className="font-semibold text-white">{apt.buyerName}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{apt.buyerPhone}</p>
                      </td>
                      <td className="py-3 font-medium text-slate-200">{apt.serviceTitle}</td>
                      <td className="py-3 font-mono text-royal-300">{apt.date} • {apt.timeSlot}</td>
                      <td className="py-3">
                        <a
                          href={apt.meetUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-[10px] bg-royal-600/15 text-royal-300 border border-royal-500/30 px-2.5 py-1 font-semibold hover:bg-royal-600/25 transition btn-press"
                        >
                          <Video className="h-3.5 w-3.5" />
                          <span>Join Meet</span>
                        </a>
                      </td>
                      <td className="py-3 text-right font-bold text-white font-mono">₹{apt.amountPaid.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </PageTransition>
  );
}
