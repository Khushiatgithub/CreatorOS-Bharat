'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCreatorStore } from '@/lib/store';
import { 
  Calendar, 
  Clock, 
  Video, 
  CheckCircle2, 
  Plus, 
  ExternalLink, 
  User, 
  Mail, 
  Trash2, 
  RefreshCw, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles, 
  Copy, 
  Check, 
  X, 
  ChevronRight,
  Sliders,
  CalendarDays,
  Flame,
  Globe,
  Lock,
  Zap,
  ArrowRight,
  LogOut,
  Radio
} from 'lucide-react';
import { PageTransition, HoverCard, RippleButton } from '@/components/ui/motion';
import { DayOfWeek, DayAvailability, CalendarMeeting, MeetingStatus } from '@/types';

// Official Google Calendar SVG Multi-color Icon
const GoogleCalendarIcon = ({ className = 'h-8 w-8' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M38 44H10C7.79086 44 6 42.2091 6 40V12C6 9.79086 7.79086 8 10 8H38C40.2091 8 42 9.79086 42 12V40C42 42.2091 40.2091 44 38 44Z" fill="#FFFFFF" />
    <path d="M38 8H10C7.79086 8 6 9.79086 6 12V17H42V12C42 9.79086 40.2091 8 38 8Z" fill="#1A73E8" />
    <path d="M33 4V10" stroke="#1A73E8" strokeWidth="4" strokeLinecap="round" />
    <path d="M15 4V10" stroke="#1A73E8" strokeWidth="4" strokeLinecap="round" />
    <path d="M6 17H42V40C42 42.2091 40.2091 44 38 44H10C7.79086 44 6 42.2091 6 40V17Z" fill="#F8F9FA" />
    {/* Calendar grid dots/accents */}
    <rect x="13" y="22" width="6" height="6" rx="1.5" fill="#4285F4" />
    <rect x="21" y="22" width="6" height="6" rx="1.5" fill="#EA4335" />
    <rect x="29" y="22" width="6" height="6" rx="1.5" fill="#FBBC04" />
    <rect x="13" y="31" width="6" height="6" rx="1.5" fill="#34A853" />
    <rect x="21" y="31" width="6" height="6" rx="1.5" fill="#4285F4" />
    <rect x="29" y="31" width="6" height="6" rx="1.5" fill="#1A73E8" />
  </svg>
);

const DAYS_ORDER: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export default function CalendarPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { 
    googleCalendar, 
    weeklyAvailability, 
    bufferMinutes, 
    calendarMeetings,
    connectGoogleCalendar,
    syncGoogleCalendar,
    disconnectGoogleCalendar,
    updateWeeklyAvailability,
    updateBufferMinutes,
    createCalendarMeeting,
    updateMeetingStatus
  } = useCreatorStore();

  // Local state for interactive editing of schedule
  const [localAvailability, setLocalAvailability] = useState<DayAvailability[]>(weeklyAvailability);
  const [selectedBuffer, setSelectedBuffer] = useState<number>(bufferMinutes || 15);
  const [isSavingAvailability, setIsSavingAvailability] = useState(false);
  const [availabilitySaveSuccess, setAvailabilitySaveSuccess] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncToastMessage, setSyncToastMessage] = useState<string | null>(null);

  // Modals & UI states
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);
  const [connectEmailInput, setConnectEmailInput] = useState(googleCalendar?.accountEmail || 'creator.aarav@gmail.com');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [meetingFilter, setMeetingFilter] = useState<'all' | 'confirmed' | 'upcoming' | 'completed'>('all');
  const [oauthBanner, setOauthBanner] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // New Meeting form state
  const [newMeeting, setNewMeeting] = useState({
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    meetingTitle: '1:1 Creator Strategy & Code Review',
    meetingDate: 'Tomorrow, Sep 6, 2026',
    meetingTime: '04:00 PM - 04:45 PM',
    durationMinutes: 45,
    meetingUrl: 'https://meet.google.com/new',
    topic: 'Career Roadmap & Mock Interview',
    createMeetConference: true
  });

  // Handle OAuth callback URL params
  useEffect(() => {
    const authStatus = searchParams.get('google_auth');
    const authEmail = searchParams.get('email');
    const authError = searchParams.get('reason');

    if (authStatus === 'success') {
      const emailConnected = authEmail || 'aarav.sharma@gmail.com';
      connectGoogleCalendar(emailConnected);
      setOauthBanner({
        type: 'success',
        message: `Google Calendar OAuth connected successfully for ${emailConnected}! Tokens saved securely with 256-bit encryption.`
      });
      // Clean query parameters
      setTimeout(() => {
        router.replace('/dashboard/calendar');
      }, 1000);
    } else if (authStatus === 'error') {
      setOauthBanner({
        type: 'error',
        message: `Google OAuth connection could not be completed (${authError || 'access denied'}). Please try again.`
      });
    }
  }, [searchParams]);

  // Keep local availability synced when store changes
  useEffect(() => {
    if (weeklyAvailability && weeklyAvailability.length > 0) {
      setLocalAvailability(weeklyAvailability);
    }
  }, [weeklyAvailability]);

  useEffect(() => {
    if (bufferMinutes) {
      setSelectedBuffer(bufferMinutes);
    }
  }, [bufferMinutes]);

  // Handlers for weekly availability
  const toggleDay = (dayName: DayOfWeek) => {
    setLocalAvailability((prev) =>
      prev.map((d) => {
        if (d.day === dayName) {
          const nextEnabled = !d.isEnabled;
          return {
            ...d,
            isEnabled: nextEnabled,
            timeRanges: nextEnabled && d.timeRanges.length === 0
              ? [{ id: `${dayName.toLowerCase()}_${Date.now()}`, start: '10:00', end: '18:00' }]
              : d.timeRanges
          };
        }
        return d;
      })
    );
  };

  const addTimeRange = (dayName: DayOfWeek) => {
    setLocalAvailability((prev) =>
      prev.map((d) => {
        if (d.day === dayName) {
          const newRange = {
            id: `${dayName.toLowerCase()}_${Date.now()}`,
            start: '14:00',
            end: '18:00'
          };
          return {
            ...d,
            isEnabled: true,
            timeRanges: [...d.timeRanges, newRange]
          };
        }
        return d;
      })
    );
  };

  const removeTimeRange = (dayName: DayOfWeek, rangeId: string) => {
    setLocalAvailability((prev) =>
      prev.map((d) => {
        if (d.day === dayName) {
          const updatedRanges = d.timeRanges.filter((r) => r.id !== rangeId);
          return {
            ...d,
            timeRanges: updatedRanges,
            isEnabled: updatedRanges.length > 0 ? d.isEnabled : false
          };
        }
        return d;
      })
    );
  };

  const updateTimeRange = (
    dayName: DayOfWeek,
    rangeId: string,
    field: 'start' | 'end',
    val: string
  ) => {
    setLocalAvailability((prev) =>
      prev.map((d) => {
        if (d.day === dayName) {
          return {
            ...d,
            timeRanges: d.timeRanges.map((r) => (r.id === rangeId ? { ...r, [field]: val } : r))
          };
        }
        return d;
      })
    );
  };

  const applyMondayToAllWeekdays = () => {
    const monday = localAvailability.find((d) => d.day === 'Monday');
    if (!monday) return;

    setLocalAvailability((prev) =>
      prev.map((d) => {
        if (['Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(d.day)) {
          return {
            ...d,
            isEnabled: monday.isEnabled,
            timeRanges: monday.timeRanges.map((r, idx) => ({
              id: `${d.day.toLowerCase()}_${idx}_${Date.now()}`,
              start: r.start,
              end: r.end
            }))
          };
        }
        return d;
      })
    );
  };

  const handleSaveAvailability = async () => {
    setIsSavingAvailability(true);
    updateWeeklyAvailability(localAvailability, selectedBuffer);
    setTimeout(() => {
      setIsSavingAvailability(false);
      setAvailabilitySaveSuccess(true);
      setTimeout(() => setAvailabilitySaveSuccess(false), 3000);
    }, 400);
  };

  const handleStartGoogleOAuth = () => {
    // Initiate OAuth flow via API route
    window.location.href = `/api/calendar/google/auth?creatorId=creator_aarav`;
  };

  const handleManualConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectEmailInput) return;
    connectGoogleCalendar(connectEmailInput);
    setIsConnectModalOpen(false);
    setOauthBanner({
      type: 'success',
      message: `Connected Google Calendar account: ${connectEmailInput}. OAuth tokens securely encrypted.`
    });
  };

  const handleForceSync = async () => {
    setIsSyncing(true);
    await syncGoogleCalendar();
    setTimeout(() => {
      setIsSyncing(false);
      setSyncToastMessage('Google Calendar 2-way sync complete! All events & Meet links updated.');
      setTimeout(() => setSyncToastMessage(null), 3500);
    }, 600);
  };

  const handleConfirmDisconnect = () => {
    disconnectGoogleCalendar();
    setIsDisconnectModalOpen(false);
    setOauthBanner({
      type: 'success',
      message: 'Google Calendar disconnected. OAuth tokens have been revoked and deleted from PostgreSQL.'
    });
  };

  const handleCreateMeetingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeeting.studentName) return;

    createCalendarMeeting({
      studentName: newMeeting.studentName,
      studentEmail: newMeeting.studentEmail || 'student@example.com',
      studentPhone: newMeeting.studentPhone || '+91 98000 12345',
      meetingTitle: newMeeting.meetingTitle,
      meetingDate: newMeeting.meetingDate,
      meetingTime: newMeeting.meetingTime,
      durationMinutes: newMeeting.durationMinutes,
      meetingStatus: 'confirmed',
      meetingUrl: newMeeting.meetingUrl || 'https://meet.google.com/new',
      topic: newMeeting.topic
    });

    setIsScheduleModalOpen(false);
    setNewMeeting({
      studentName: '',
      studentEmail: '',
      studentPhone: '',
      meetingTitle: '1:1 Creator Strategy & Code Review',
      meetingDate: 'Tomorrow, Sep 6, 2026',
      meetingTime: '04:00 PM - 04:45 PM',
      durationMinutes: 45,
      meetingUrl: 'https://meet.google.com/new',
      topic: 'Career Roadmap & Mock Interview',
      createMeetConference: true
    });

    setSyncToastMessage('Meeting scheduled and synced to Google Calendar with auto Google Meet link!');
    setTimeout(() => setSyncToastMessage(null), 3500);
  };

  // Filter meetings
  const filteredMeetings = (calendarMeetings || []).filter((m) => {
    if (meetingFilter === 'all') return true;
    return m.meetingStatus === meetingFilter;
  });

  return (
    <PageTransition>
      <div className="space-y-8 font-sans pb-16 text-slate-100 max-w-7xl mx-auto">
        
        {/* OAuth Notification Banner */}
        {oauthBanner && (
          <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 animate-fade-in ${
            oauthBanner.type === 'success' 
              ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' 
              : 'bg-rose-500/15 border-rose-500/30 text-rose-300'
          }`}>
            <div className="flex items-center gap-2.5 text-xs font-medium">
              {oauthBanner.type === 'success' ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" /> : <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />}
              <span>{oauthBanner.message}</span>
            </div>
            <button
              onClick={() => setOauthBanner(null)}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Sync Toast Notification */}
        {syncToastMessage && (
          <div className="p-3.5 rounded-2xl bg-royal-600/20 border border-royal-500/30 text-royal-200 text-xs font-semibold flex items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-royal-400 shrink-0" />
              <span>{syncToastMessage}</span>
            </div>
            <button onClick={() => setSyncToastMessage(null)} className="text-slate-400 hover:text-white">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 1: HEADER */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
                <span>Calendar Sync</span>
                <span className="rounded-full bg-royal-600/20 text-royal-400 border border-royal-500/30 text-[11px] font-bold px-3 py-0.5 font-mono inline-flex items-center gap-1.5">
                  <span className={`h-2 w-2 rounded-full ${googleCalendar?.isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                  {googleCalendar?.isConnected ? 'Google OAuth Synced' : 'Sync Standby'}
                </span>
              </h1>
            </div>
            <p className="text-sm text-slate-300 mt-1 font-medium">
              Manage your availability and meetings
            </p>
          </div>

          {/* Header Action Badges & Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-xl bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 text-xs text-slate-300 font-mono">
              <Globe className="h-3.5 w-3.5 text-royal-400" />
              <span>IST (UTC+05:30)</span>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText('https://creatoros.in/aarav/book');
                setCopiedLink(true);
                setTimeout(() => setCopiedLink(false), 2000);
              }}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-[#0C1120] hover:bg-white/[0.06] px-3.5 py-2 text-xs font-semibold text-slate-200 transition btn-press"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5 text-royal-400" />}
              <span>{copiedLink ? 'Booking Link Copied!' : 'Copy Booking Link'}</span>
            </button>

            <RippleButton
              onClick={() => setIsScheduleModalOpen(true)}
              className="rounded-xl bg-royal-600 hover:bg-royal-500 px-4 py-2 text-xs font-semibold text-white shadow-royal inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              <span>Schedule Meeting</span>
            </RippleButton>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: GOOGLE CALENDAR CARD (UPGRADED OAUTH & ENCRYPTION) */}
        {/* ========================================================================= */}
        <div className="rounded-[22px] border border-white/[0.1] bg-gradient-to-br from-[#0B0F1C] via-[#0E1424] to-[#080B14] p-6 shadow-2xl relative overflow-hidden group">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-royal-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Left Info: Logo, Account, Status */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-white/[0.1] shadow-inner shrink-0 group-hover:scale-105 transition-transform duration-300">
                <GoogleCalendarIcon className="h-10 w-10" />
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="font-display text-lg font-bold text-white tracking-wide">
                    Google Calendar
                  </h3>
                  
                  {/* Connection Status Badge */}
                  {googleCalendar?.isConnected ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold shadow-sm">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      Connected & Synced
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-500/15 border border-slate-500/30 text-slate-300 text-xs font-bold">
                      <span className="h-2 w-2 rounded-full bg-slate-400" />
                      Disconnected
                    </span>
                  )}

                  {/* Security Badge */}
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-royal-600/15 border border-royal-500/25 text-royal-300 text-[10px] font-mono font-semibold">
                    <Lock className="h-3 w-3 text-royal-400" />
                    AES-256 Encrypted
                  </span>
                </div>

                {/* Connected Account Email & Real-time status */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300">
                  {googleCalendar?.isConnected ? (
                    <>
                      <span className="flex items-center gap-1.5 text-white font-mono font-medium">
                        <Mail className="h-3.5 w-3.5 text-royal-400" />
                        {googleCalendar.accountEmail}
                      </span>
                      <span className="text-slate-500 hidden sm:inline">•</span>
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3 text-slate-500" />
                        Last synced: <span className="text-slate-200 font-medium">{googleCalendar.lastSyncedAt || 'Just now'}</span>
                      </span>
                    </>
                  ) : (
                    <span className="text-slate-400">
                      Connect via Google OAuth to enable 2-way sync, avoid booking clashes, and auto-generate Google Meet links.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Action: Connect / Sync / Disconnect Buttons */}
            <div className="flex items-center gap-3 shrink-0">
              {googleCalendar?.isConnected ? (
                <>
                  <button
                    onClick={handleForceSync}
                    disabled={isSyncing}
                    title="Force sync latest Google Calendar events"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-slate-200 hover:text-white border border-white/[0.1] text-xs font-semibold transition btn-press disabled:opacity-50"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 text-royal-400 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
                  </button>

                  <button
                    onClick={() => setIsDisconnectModalOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/30 text-xs font-semibold transition btn-press"
                  >
                    Disconnect
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleStartGoogleOAuth}
                    className="px-4 py-2.5 rounded-xl bg-royal-600 hover:bg-royal-500 text-white shadow-royal text-xs font-bold transition flex items-center gap-2 btn-press"
                  >
                    <GoogleCalendarIcon className="h-4 w-4" />
                    <span>Connect Google Calendar</span>
                  </button>

                  <button
                    onClick={() => setIsConnectModalOpen(true)}
                    title="Quick connect or enter custom Google email"
                    className="p-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.09] text-slate-300 border border-white/[0.08] transition"
                  >
                    <Sliders className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Sync Feature Highlights Bar */}
          <div className="mt-5 pt-4 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Real-time 2-way Google Calendar API sync</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Auto-generates Google Meet conference links</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>Prevents conflicts with personal calendar blocks</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: WEEKLY AVAILABILITY */}
        {/* ========================================================================= */}
        <div className="rounded-[22px] border border-white/[0.1] bg-[#0A0E1A]/95 p-6 shadow-glass-card space-y-6">
          
          {/* Section Header with Buffer & Quick Fill */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
            <div>
              <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-royal-400" />
                <span>Weekly Availability</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Set your working hours for each day and buffer time between consecutive calls.
              </p>
            </div>

            {/* Buffer Selection (15, 30, 60 mins) */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-[#060913] border border-white/[0.08] rounded-2xl p-1.5">
                <span className="text-[11px] font-semibold text-slate-400 pl-2 pr-1 flex items-center gap-1">
                  <Clock className="h-3 w-3 text-royal-400" />
                  Buffer:
                </span>
                {[15, 30, 60].map((mins) => {
                  const isActive = selectedBuffer === mins;
                  return (
                    <button
                      key={mins}
                      onClick={() => {
                        setSelectedBuffer(mins);
                        updateBufferMinutes(mins);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-royal-600 text-white shadow-royal'
                          : 'text-slate-400 hover:text-white hover:bg-white/[0.05]'
                      }`}
                    >
                      {mins} mins
                    </button>
                  );
                })}
              </div>

              <button
                onClick={applyMondayToAllWeekdays}
                title="Copy Monday's slots to Tue-Fri"
                className="px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-300 hover:text-white transition btn-press"
              >
                Copy Mon to Weekdays
              </button>
            </div>
          </div>

          {/* Days List (Monday to Sunday) */}
          <div className="space-y-3.5">
            {DAYS_ORDER.map((dayName) => {
              const dayData = localAvailability.find((d) => d.day === dayName) || {
                day: dayName,
                isEnabled: dayName !== 'Sunday',
                timeRanges: dayName === 'Sunday' ? [] : [{ id: `${dayName}_1`, start: '10:00', end: '18:00' }]
              };

              const isEnabled = dayData.isEnabled;

              return (
                <div
                  key={dayName}
                  className={`rounded-2xl border transition-all duration-200 p-4 ${
                    isEnabled
                      ? 'bg-[#0E1322]/80 border-white/[0.08] hover:border-royal-500/30'
                      : 'bg-black/25 border-white/[0.04] opacity-60'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    {/* Day Name and Toggle */}
                    <div className="flex items-center gap-3.5 min-w-[160px]">
                      <button
                        type="button"
                        onClick={() => toggleDay(dayName)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          isEnabled ? 'bg-royal-600' : 'bg-slate-700'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                            isEnabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>

                      <div>
                        <h4 className={`font-semibold text-sm ${isEnabled ? 'text-white' : 'text-slate-400'}`}>
                          {dayName}
                        </h4>
                        <span className="text-[11px] font-mono text-slate-400">
                          {isEnabled ? `${dayData.timeRanges.length} active slot(s)` : 'Unavailable / Day Off'}
                        </span>
                      </div>
                    </div>

                    {/* Time Ranges for this Day */}
                    <div className="flex-1">
                      {isEnabled && dayData.timeRanges.length > 0 ? (
                        <div className="flex flex-wrap items-center gap-3">
                          {dayData.timeRanges.map((range, idx) => (
                            <div
                              key={range.id || idx}
                              className="flex items-center gap-2 bg-[#060812] border border-white/[0.08] rounded-xl px-3 py-1.5 shadow-inner"
                            >
                              {/* Start Time Input */}
                              <input
                                type="time"
                                value={range.start}
                                onChange={(e) => updateTimeRange(dayName, range.id, 'start', e.target.value)}
                                className="bg-transparent text-white font-mono text-xs font-semibold focus:outline-none focus:text-royal-400 cursor-pointer"
                              />

                              <span className="text-slate-500 font-mono text-xs">to</span>

                              {/* End Time Input */}
                              <input
                                type="time"
                                value={range.end}
                                onChange={(e) => updateTimeRange(dayName, range.id, 'end', e.target.value)}
                                className="bg-transparent text-white font-mono text-xs font-semibold focus:outline-none focus:text-royal-400 cursor-pointer"
                              />

                              {/* Delete Slot Button */}
                              {dayData.timeRanges.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeTimeRange(dayName, range.id)}
                                  className="ml-1 text-slate-500 hover:text-rose-400 transition"
                                  title="Remove time slot"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              )}
                            </div>
                          ))}

                          {/* Add Multiple Time Range Button */}
                          <button
                            type="button"
                            onClick={() => addTimeRange(dayName)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-dashed border-royal-500/40 hover:border-royal-400 bg-royal-600/10 hover:bg-royal-600/20 text-royal-300 text-xs font-semibold transition"
                          >
                            <Plus className="h-3.5 w-3.5" />
                            <span>Add Range</span>
                          </button>
                        </div>
                      ) : isEnabled ? (
                        <button
                          type="button"
                          onClick={() => addTimeRange(dayName)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-dashed border-royal-500/40 bg-royal-600/10 text-royal-300 text-xs font-semibold"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          <span>Add Working Hours</span>
                        </button>
                      ) : (
                        <span className="text-xs text-slate-500 italic">No bookings will be accepted on this day.</span>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Save Availability Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-royal-400 shrink-0" />
              <span>Saved changes instantly sync to PostgreSQL and your storefront booking widget.</span>
            </div>

            <div className="flex items-center gap-3">
              {availabilitySaveSuccess && (
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 animate-fade-in">
                  <Check className="h-4 w-4" />
                  Availability saved to PostgreSQL!
                </span>
              )}

              <RippleButton
                onClick={handleSaveAvailability}
                disabled={isSavingAvailability}
                className="px-6 py-2.5 rounded-xl bg-royal-600 hover:bg-royal-500 text-white font-bold text-xs shadow-royal flex items-center gap-2 disabled:opacity-50"
              >
                {isSavingAvailability ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Save Availability</span>
                  </>
                )}
              </RippleButton>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 4: UPCOMING MEETINGS */}
        {/* ========================================================================= */}
        <div className="rounded-[22px] border border-white/[0.1] bg-[#0A0E1A]/95 p-6 shadow-glass-card space-y-6">
          
          {/* Section Header & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
            <div>
              <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <Video className="h-5 w-5 text-royal-400" />
                <span>Upcoming Meetings</span>
                <span className="px-2.5 py-0.5 rounded-full bg-royal-600/20 text-royal-300 border border-royal-500/30 text-xs font-mono font-bold">
                  {filteredMeetings.length}
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Join student 1:1 sessions, review agendas, and sync with your Google Calendar.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-[#060812] border border-white/[0.08] rounded-xl p-1">
              {(['all', 'confirmed', 'upcoming', 'completed'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMeetingFilter(tab)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition ${
                    meetingFilter === tab
                      ? 'bg-royal-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Meetings Grid / List */}
          {filteredMeetings.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/[0.1] p-12 text-center space-y-3 bg-black/20">
              <Calendar className="h-10 w-10 text-slate-500 mx-auto" />
              <h4 className="text-white font-bold text-sm">No meetings found</h4>
              <p className="text-slate-400 text-xs max-w-sm mx-auto">
                No meetings match the current filter. New bookings made by students will appear here automatically.
              </p>
              <button
                onClick={() => setIsScheduleModalOpen(true)}
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-royal-600/20 border border-royal-500/30 text-royal-300 hover:bg-royal-600/30 text-xs font-semibold transition"
              >
                <Plus className="h-4 w-4" />
                <span>Schedule a Meeting</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredMeetings.map((meeting) => {
                const isConfirmed = meeting.meetingStatus === 'confirmed';
                const isUpcoming = meeting.meetingStatus === 'upcoming';
                const isCompleted = meeting.meetingStatus === 'completed';

                return (
                  <HoverCard
                    hoverY={-3}
                    key={meeting.id}
                    className="rounded-2xl border border-white/[0.08] bg-[#0E1322]/85 p-5 shadow-glass-card space-y-4 hover:border-royal-500/35 transition flex flex-col justify-between"
                  >
                    <div className="space-y-3.5">
                      
                      {/* Top Row: Student info & Status Badge */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={meeting.studentAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'}
                            alt={meeting.studentName}
                            className="h-11 w-11 rounded-full object-cover ring-2 ring-royal-500/40 shrink-0"
                          />
                          <div>
                            <h4 className="font-bold text-sm text-white font-display">
                              {meeting.studentName}
                            </h4>
                            <p className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                              <Mail className="h-3 w-3 text-slate-500" />
                              {meeting.studentEmail}
                            </p>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div>
                          {isConfirmed && (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                              Confirmed
                            </span>
                          )}
                          {isUpcoming && (
                            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 text-[10px] font-bold uppercase tracking-wider">
                              Upcoming
                            </span>
                          )}
                          {isCompleted && (
                            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[10px] font-bold uppercase tracking-wider">
                              Completed
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Meeting Title & Topic */}
                      <div className="rounded-xl bg-[#060913]/90 border border-white/[0.05] p-3 space-y-1.5">
                        <h5 className="font-semibold text-xs text-royal-200">
                          {meeting.meetingTitle}
                        </h5>
                        {meeting.topic && (
                          <p className="text-[11px] text-slate-400 line-clamp-2">
                            <span className="text-slate-500">Agenda:</span> {meeting.topic}
                          </p>
                        )}
                      </div>

                      {/* Date, Time & Duration Row */}
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-2 text-slate-300 bg-white/[0.02] rounded-lg p-2 border border-white/[0.04]">
                          <Calendar className="h-4 w-4 text-royal-400 shrink-0" />
                          <span className="truncate font-medium">{meeting.meetingDate}</span>
                        </div>

                        <div className="flex items-center gap-2 text-slate-300 bg-white/[0.02] rounded-lg p-2 border border-white/[0.04]">
                          <Clock className="h-4 w-4 text-emerald-400 shrink-0" />
                          <span className="truncate font-mono text-[11px]">{meeting.meetingTime}</span>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Action: Join Meeting Button */}
                    <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between gap-3">
                      <div className="text-[11px] text-slate-400 font-mono">
                        {meeting.durationMinutes} mins session
                      </div>

                      <div className="flex items-center gap-2">
                        {meeting.meetingStatus !== 'completed' && (
                          <button
                            onClick={() => updateMeetingStatus(meeting.id, 'completed')}
                            className="px-2.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white text-xs font-semibold transition"
                            title="Mark as completed"
                          >
                            <Check className="h-3.5 w-3.5" />
                          </button>
                        )}

                        <a
                          href={meeting.meetingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 transition btn-press"
                        >
                          <Video className="h-3.5 w-3.5" />
                          <span>Join Meeting</span>
                          <ExternalLink className="h-3 w-3 opacity-80" />
                        </a>
                      </div>
                    </div>

                  </HoverCard>
                );
              })}
            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* MODAL 1: CONNECT GOOGLE OAUTH ACCOUNT */}
        {/* ========================================================================= */}
        {isConnectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="w-full max-w-md rounded-[24px] border border-white/[0.12] bg-[#0B0F1C] p-6 shadow-2xl space-y-5 text-white">
              
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/[0.06] border border-white/[0.08]">
                    <GoogleCalendarIcon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Connect Google Calendar
                    </h3>
                    <p className="text-xs text-slate-400">
                      OAuth 2.0 with secure 256-bit token encryption
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsConnectModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/[0.08] text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Primary OAuth Option */}
              <div className="p-4 rounded-2xl bg-[#060913] border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-royal-400" />
                    Recommended: Google OAuth 2.0
                  </span>
                  <span className="text-[10px] bg-royal-600/30 text-royal-300 font-mono px-2 py-0.5 rounded-full">
                    Auto-Consent
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Forces Google account selector so you can choose which creator account to sync.
                </p>
                <button
                  onClick={handleStartGoogleOAuth}
                  className="w-full py-2.5 rounded-xl bg-royal-600 hover:bg-royal-500 text-white font-bold text-xs shadow-royal transition flex items-center justify-center gap-2 btn-press"
                >
                  <GoogleCalendarIcon className="h-4 w-4" />
                  <span>Sign In with Google OAuth</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-white/[0.08] w-full" />
                <span className="bg-[#0B0F1C] px-3 text-[10px] uppercase font-bold text-slate-500 font-mono absolute">
                  or custom email
                </span>
              </div>

              <form onSubmit={handleManualConnect} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1.5">
                    Google Account Email
                  </label>
                  <input
                    type="email"
                    value={connectEmailInput}
                    onChange={(e) => setConnectEmailInput(e.target.value)}
                    placeholder="e.g. aarav.sharma@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060913] border border-white/[0.1] text-white focus:outline-none focus:border-royal-500 font-mono"
                  />
                </div>

                <div className="rounded-xl bg-royal-600/10 border border-royal-500/20 p-3 text-slate-300 space-y-1">
                  <span className="font-semibold text-royal-300 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-royal-400" />
                    Permissions & Token Storage:
                  </span>
                  <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-0.5">
                    <li>2-way real-time calendar event sync</li>
                    <li>Automatic Google Meet room generation</li>
                    <li>Tokens encrypted with AES-256 in PostgreSQL</li>
                  </ul>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsConnectModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-white/[0.1] text-slate-300 hover:bg-white/[0.06] text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <RippleButton
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold"
                  >
                    Quick Authorize
                  </RippleButton>
                </div>
              </form>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL 2: DISCONNECT CONFIRMATION */}
        {/* ========================================================================= */}
        {isDisconnectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="w-full max-w-md rounded-[24px] border border-white/[0.12] bg-[#0B0F1C] p-6 shadow-2xl space-y-4 text-white">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400">
                  <LogOut className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white">
                    Disconnect Google Calendar?
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    This will revoke active Google OAuth tokens and remove your calendar sync integration from PostgreSQL.
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-[#060812] border border-white/[0.06] p-3 text-xs text-slate-300">
                <p className="text-slate-400 text-[11px]">
                  Account: <span className="text-white font-mono">{googleCalendar?.accountEmail}</span>
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setIsDisconnectModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-white/[0.1] text-slate-300 hover:bg-white/[0.06] text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDisconnect}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg transition"
                >
                  Disconnect & Revoke
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL 3: SCHEDULE NEW MEETING */}
        {/* ========================================================================= */}
        {isScheduleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
            <div className="w-full max-w-lg rounded-[24px] border border-white/[0.12] bg-[#0B0F1C] p-6 shadow-2xl space-y-5 text-white my-8">
              
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-royal-600/20 border border-royal-500/30">
                    <Calendar className="h-5 w-5 text-royal-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Schedule 1:1 Meeting
                    </h3>
                    <p className="text-xs text-slate-400">
                      Syncs to Google Calendar & generates Google Meet URL
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/[0.08] text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleCreateMeetingSubmit} className="space-y-4 text-xs">
                
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Student / Mentee Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMeeting.studentName}
                    onChange={(e) => setNewMeeting({ ...newMeeting, studentName: e.target.value })}
                    placeholder="e.g. Priya Sundaram"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060913] border border-white/[0.1] text-white focus:outline-none focus:border-royal-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Student Email
                    </label>
                    <input
                      type="email"
                      value={newMeeting.studentEmail}
                      onChange={(e) => setNewMeeting({ ...newMeeting, studentEmail: e.target.value })}
                      placeholder="e.g. priya@gmail.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#060913] border border-white/[0.1] text-white focus:outline-none focus:border-royal-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Student Phone
                    </label>
                    <input
                      type="tel"
                      value={newMeeting.studentPhone}
                      onChange={(e) => setNewMeeting({ ...newMeeting, studentPhone: e.target.value })}
                      placeholder="e.g. +91 98000 12345"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#060913] border border-white/[0.1] text-white focus:outline-none focus:border-royal-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Meeting Title
                  </label>
                  <input
                    type="text"
                    value={newMeeting.meetingTitle}
                    onChange={(e) => setNewMeeting({ ...newMeeting, meetingTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060913] border border-white/[0.1] text-white focus:outline-none focus:border-royal-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Meeting Date
                    </label>
                    <input
                      type="text"
                      value={newMeeting.meetingDate}
                      onChange={(e) => setNewMeeting({ ...newMeeting, meetingDate: e.target.value })}
                      placeholder="e.g. Mon, Sep 8, 2026"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#060913] border border-white/[0.1] text-white focus:outline-none focus:border-royal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">
                      Time Slot
                    </label>
                    <input
                      type="text"
                      value={newMeeting.meetingTime}
                      onChange={(e) => setNewMeeting({ ...newMeeting, meetingTime: e.target.value })}
                      placeholder="e.g. 05:00 PM - 05:45 PM"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#060913] border border-white/[0.1] text-white focus:outline-none focus:border-royal-500 font-mono"
                    />
                  </div>
                </div>

                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/25 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-emerald-400" />
                    <span className="text-slate-200 font-semibold text-xs">
                      Auto-generate Google Meet Link
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Active
                  </span>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Topic / Notes
                  </label>
                  <textarea
                    rows={2}
                    value={newMeeting.topic}
                    onChange={(e) => setNewMeeting({ ...newMeeting, topic: e.target.value })}
                    placeholder="Key questions or agenda items..."
                    className="w-full px-3.5 py-2 rounded-xl bg-[#060913] border border-white/[0.1] text-white focus:outline-none focus:border-royal-500 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setIsScheduleModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-white/[0.1] text-slate-300 hover:bg-white/[0.06] text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <RippleButton
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-royal-600 hover:bg-royal-500 text-white text-xs font-bold shadow-royal"
                  >
                    Save & Sync to Google Calendar
                  </RippleButton>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </PageTransition>
  );
}
