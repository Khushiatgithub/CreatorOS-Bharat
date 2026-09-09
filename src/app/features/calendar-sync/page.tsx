'use client';

import React from 'react';
import FeaturePageLayout, { FeaturePageData } from '@/components/features/FeaturePageLayout';
import { 
  Calendar, 
  Video, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Globe, 
  Zap, 
  Sparkles,
  Users
} from 'lucide-react';

const calendarSyncData: FeaturePageData = {
  badge: '1:1 Calendar & Google Meet Sync',
  title: 'Paid 1:1 Mentorship & Booking with',
  highlightedTitle: 'Automated Google Meet',
  description: 'Replace Topmate and Calendly. Set your hourly price, available Indian time slots, buffer times, and automatically dispatch Google Meet links with zero double-booking.',
  metrics: [
    { label: 'Booking Time Saved', value: '100%', change: 'Zero Back-and-Forth DMs' },
    { label: 'Double-Booking Rate', value: '0.0%', change: 'Real-time GCal Sync' },
    { label: 'No-Show Reduction', value: '84%', change: 'WhatsApp + GCal Alerts' }
  ],
  overviewTitle: 'Monetize Your Time with Instant UPI Paid Sessions',
  overviewDescription: 'Whether you offer 1:1 code reviews, FAANG mock interviews, resume critiques, or career advisory, CreatorOS lets clients select open slots on your live Google Calendar, pay instantly via UPI, and automatically adds the invite to both calendars.',
  steps: [
    {
      number: '01',
      title: 'Connect Your Google Calendar',
      description: '1-click connect your personal or work Google Calendar to auto-sync your availability.',
      badge: '1-Click Connect'
    },
    {
      number: '02',
      title: 'Set Your Price & Session Duration',
      description: 'Define 30-min (e.g. ₹999) or 60-min (e.g. ₹1,999) slots with buffer times between calls.',
      badge: 'Custom Slots'
    },
    {
      number: '03',
      title: 'Client Selects Time & Pays via UPI',
      description: 'Clients view open Indian Standard Time (IST) slots and confirm with 1-click PhonePe/GPay.',
      badge: 'Instant UPI'
    },
    {
      number: '04',
      title: 'Google Meet Invite Dispatched',
      description: 'Calendar invite with a unique Google Meet link is added to both parties and sent on WhatsApp.',
      badge: 'Auto Invite'
    }
  ],
  benefits: [
    {
      icon: Calendar,
      title: '2-Way Google Calendar Sync',
      description: 'Existing personal appointments automatically block booking slots so you never get double-booked.',
      tag: 'Live Sync'
    },
    {
      icon: Video,
      title: 'Automated Google Meet Links',
      description: 'Generates secure, dedicated video meeting links for every confirmed session automatically.',
      tag: 'Auto Meet'
    },
    {
      icon: Clock,
      title: 'Custom Buffer Times & Lead Notice',
      description: 'Set 15-minute cool-down buffers between calls and require 24-hour advance booking notice.',
      tag: 'Buffer Guard'
    },
    {
      icon: Zap,
      title: '0% Topmate Platform Fee',
      description: 'Stop giving away 10% to 15% of your consultation earnings. Keep 100% with direct UPI settlement.',
      tag: '0% Topmate Fee'
    },
    {
      icon: Globe,
      title: 'Smart Timezone Detection',
      description: 'Automatically detects client timezones (IST, GMT, PST, EST) for overseas NRI & global bookings.',
      tag: 'Global Timezones'
    },
    {
      icon: Users,
      title: 'Custom Pre-call Intake Questions',
      description: 'Collect LinkedIn profile URLs, resume Google Drive links, and goals prior to the session.',
      tag: 'Intake Forms'
    }
  ],
  previewComponent: (
    <div className="max-w-lg mx-auto rounded-[24px] border border-white/[0.15] bg-[#0A0E1A] p-6 shadow-2xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-[12px] bg-royal-600/20 text-royal-400 flex items-center justify-center font-bold">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">45-Min SDE Mock Interview & Strategy</h4>
            <p className="text-[10px] text-slate-400">with Aarav Sharma (Ex-Google)</p>
          </div>
        </div>
        <span className="rounded-full bg-royal-600/20 text-royal-300 border border-royal-500/30 px-3 py-1 text-xs font-bold font-mono">
          ₹1,499
        </span>
      </div>

      {/* Available Slots Grid */}
      <div className="space-y-2">
        <p className="text-[11px] font-mono uppercase text-slate-400 font-semibold">Available Slots (IST - Asia/Kolkata)</p>
        <div className="grid grid-cols-3 gap-2">
          {['04:00 PM', '05:30 PM', '07:00 PM', '08:30 PM', '09:30 PM', '10:15 PM'].map((slot, idx) => (
            <div 
              key={idx} 
              className={`rounded-xl p-2 text-center text-xs font-mono font-medium transition cursor-pointer ${
                idx === 2 
                  ? 'bg-royal-600 text-white border border-royal-400 ring-2 ring-royal-500/50' 
                  : 'bg-white/[0.03] border border-white/[0.06] text-slate-300 hover:bg-white/[0.08]'
              }`}
            >
              {slot}
            </div>
          ))}
        </div>
      </div>

      {/* Booking confirmation preview */}
      <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 flex items-center gap-3 text-xs text-emerald-300">
        <Video className="h-4 w-4 shrink-0 text-emerald-400" />
        <span className="text-[11px]">Includes dedicated Google Meet link & automated WhatsApp calendar invite</span>
      </div>
    </div>
  ),
  faqs: [
    {
      question: 'How is this different from Topmate or Calendly?',
      answer: 'Topmate takes a significant platform fee on your earnings and has delayed payouts. Calendly does not have native Indian UPI checkout or WhatsApp reminders. CreatorOS combines Google Meet sync, direct 0% fee UPI, and WhatsApp reminders in one platform.'
    },
    {
      question: 'Will it sync with my personal calendar to avoid double-bookings?',
      answer: 'Yes! CreatorOS reads busy slots from your connected Google Calendar in real-time and hides those times from your public booking page.'
    },
    {
      question: 'Can I set buffer times between meetings?',
      answer: 'Yes, you can set 5, 10, 15, or 30-minute buffer windows to give yourself time between consultations.'
    },
    {
      question: 'What if a client needs to reschedule?',
      answer: 'Clients can easily reschedule with one click from their confirmation link based on your remaining open calendar slots.'
    }
  ]
};

export default function CalendarSyncPage() {
  return <FeaturePageLayout data={calendarSyncData} />;
}
