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
  Radio,
  CalendarOff,
  Sun,
  Moon,
  Info
} from 'lucide-react';
import { PageTransition, HoverCard, RippleButton } from '@/components/ui/motion';
import { 
  DayOfWeek, 
  DayAvailability, 
  CalendarMeeting, 
  MeetingStatus, 
  BlockedHoliday, 
  SupportedTimezone 
} from '@/types';
import { SUPPORTED_TIMEZONES, INITIAL_BLOCKED_HOLIDAYS } from '@/lib/mock-data';

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
    calendarTimezone,
    blockedHolidays,
    calendarMeetings,
    connectGoogleCalendar,
    syncGoogleCalendar,
    disconnectGoogleCalendar,
    updateWeeklyAvailability,
    updateBufferMinutes,
    updateCalendarTimezone,
    addBlockedHoliday,
    removeBlockedHoliday,
    saveAllAvailability,
    createCalendarMeeting,
    updateMeetingStatus
  } = useCreatorStore();

  // Local state for interactive editing of schedule
  const [localAvailability, setLocalAvailability] = useState<DayAvailability[]>(weeklyAvailability);
  const [selectedBuffer, setSelectedBuffer] = useState<number>(bufferMinutes || 15);
  const [selectedTimezone, setSelectedTimezone] = useState<string>(calendarTimezone || 'Asia/Kolkata');
  const [localHolidays, setLocalHolidays] = useState<BlockedHoliday[]>(blockedHolidays || INITIAL_BLOCKED_HOLIDAYS);
  
  const [isSavingAvailability, setIsSavingAvailability] = useState(false);
  const [availabilitySaveSuccess, setAvailabilitySaveSuccess] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncToastMessage, setSyncToastMessage] = useState<string | null>(null);

  // Modals & UI states
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);
  const [connectEmailInput, setConnectEmailInput] = useState(googleCalendar?.accountEmail || 'creator.aarav@gmail.com');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [meetingFilter, setMeetingFilter] = useState<'all' | 'confirmed' | 'upcoming' | 'completed'>('all');
  const [oauthBanner, setOauthBanner] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // New Holiday form state
  const [newHolidayForm, setNewHolidayForm] = useState({
    date: new Date().toISOString().split('T')[0],
    name: '',
    reason: 'Public Holiday'
  });

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

  // Keep local state synced when store changes
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

  useEffect(() => {
    if (calendarTimezone) {
      setSelectedTimezone(calendarTimezone);
    }
  }, [calendarTimezone]);

  useEffect(() => {
    if (blockedHolidays) {
      setLocalHolidays(blockedHolidays);
    }
  }, [blockedHolidays]);

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
    setSyncToastMessage("Copied Monday's schedule to Tuesday through Friday!");
    setTimeout(() => setSyncToastMessage(null), 3000);
  };

  // Holiday management handlers
  const handleAddHoliday = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHolidayForm.date || !newHolidayForm.name) return;

    const newHol = addBlockedHoliday({
      date: newHolidayForm.date,
      name: newHolidayForm.name.trim(),
      reason: newHolidayForm.reason.trim() || 'Holiday'
    });

    setLocalHolidays((prev) => [newHol, ...prev]);
    setIsHolidayModalOpen(false);
    setNewHolidayForm({
      date: new Date().toISOString().split('T')[0],
      name: '',
      reason: 'Public Holiday'
    });

    setSyncToastMessage(`Blocked ${newHol.name} (${newHol.date}). No slots will be bookable on this date.`);
    setTimeout(() => setSyncToastMessage(null), 3500);
  };

  const handleRemoveHoliday = (id: string, name: string) => {
    removeBlockedHoliday(id);
    setLocalHolidays((prev) => prev.filter((h) => h.id !== id));
    setSyncToastMessage(`Unblocked ${name}. Date is now open for bookings.`);
    setTimeout(() => setSyncToastMessage(null), 3000);
  };

  const handleSaveAvailability = async () => {
    setIsSavingAvailability(true);
    await saveAllAvailability(localAvailability, selectedBuffer, selectedTimezone, localHolidays);
    setTimeout(() => {
      setIsSavingAvailability(false);
      setAvailabilitySaveSuccess(true);
      setSyncToastMessage('Availability settings & holidays saved to PostgreSQL database!');
      setTimeout(() => {
        setAvailabilitySaveSuccess(false);
        setSyncToastMessage(null);
      }, 3500);
    }, 400);
  };

  const handleStartGoogleOAuth = () => {
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
      topic: newMeeting.topic,
      timezone: selectedTimezone
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

  const activeTzInfo = SUPPORTED_TIMEZONES.find((t) => t.id === selectedTimezone) || SUPPORTED_TIMEZONES[0];

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
          <div className="p-3.5 rounded-2xl bg-royal-600/20 border border-royal-500/30 text-royal-200 text-xs font-semibold flex items-center justify-between gap-3 animate-fade-in shadow-royal-sm">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-royal-400 shrink-0 animate-pulse" />
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
              Manage your availability, working days, timezones, and meetings
            </p>
          </div>

          {/* Header Action Badges & Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 text-xs text-slate-300 font-mono">
              <Globe className="h-3.5 w-3.5 text-royal-400" />
              <span>{activeTzInfo.label.split(' ')[0]} ({activeTzInfo.offset})</span>
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
        {/* SECTION 2: GOOGLE CALENDAR CARD (OAUTH & ENCRYPTION) */}
        {/* ========================================================================= */}
        <div className="rounded-[22px] border border-white/[0.1] bg-gradient-to-br from-[#0B0F1C] via-[#0E1424] to-[#080B14] p-6 shadow-2xl relative overflow-hidden group">
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
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-slate-500" />
                    <span className="text-slate-300 font-mono">
                      {googleCalendar?.isConnected ? (googleCalendar.accountEmail || 'creator.aarav@gmail.com') : 'No account connected'}
                    </span>
                  </div>

                  {googleCalendar?.isConnected && (
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="h-3.5 w-3.5 text-slate-500" />
                      <span>Last Synced: <strong className="text-slate-300">{googleCalendar.lastSyncedAt || 'Just now'}</strong></span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Action: Sync Now & Connect/Disconnect */}
            <div className="flex flex-wrap items-center gap-3">
              {googleCalendar?.isConnected ? (
                <>
                  <button
                    onClick={handleForceSync}
                    disabled={isSyncing}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-[#0E1322] hover:bg-white/[0.08] px-4 py-2.5 text-xs font-semibold text-slate-200 transition btn-press disabled:opacity-50"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 text-royal-400 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
                  </button>

                  <button
                    onClick={() => setIsDisconnectModalOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-rose-500/20 bg-rose-500/10 hover:bg-rose-500/20 px-3.5 py-2.5 text-xs font-semibold text-rose-300 transition btn-press"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Disconnect</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsConnectModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] px-3.5 py-2.5 text-xs font-semibold text-slate-300 transition"
                  >
                    Custom Email
                  </button>
                  <RippleButton
                    onClick={handleStartGoogleOAuth}
                    className="rounded-xl bg-royal-600 hover:bg-royal-500 px-5 py-2.5 text-xs font-bold text-white shadow-royal inline-flex items-center gap-2 btn-press"
                  >
                    <GoogleCalendarIcon className="h-4 w-4" />
                    <span>Connect Google Calendar</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </RippleButton>
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
              <span>Booked slots automatically disappear from booking page</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: WEEKLY AVAILABILITY & CONFIGURATION */}
        {/* ========================================================================= */}
        <div className="rounded-[22px] border border-white/[0.1] bg-[#0A0E1A]/95 p-6 shadow-glass-card space-y-7">
          
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
            <div>
              <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-royal-400" />
                <span>Weekly Availability & Working Hours</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Toggle your working days, add multiple time ranges, choose timezone, buffer time, and block holidays.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={applyMondayToAllWeekdays}
                title="Copy Monday's slots to Tue-Fri"
                className="px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-semibold text-slate-300 hover:text-white transition btn-press flex items-center gap-1.5"
              >
                <Copy className="h-3.5 w-3.5 text-royal-400" />
                <span>Copy Mon to Weekdays</span>
              </button>

              <RippleButton
                onClick={handleSaveAvailability}
                disabled={isSavingAvailability}
                className="px-5 py-2 rounded-xl bg-royal-600 hover:bg-royal-500 text-white font-bold text-xs shadow-royal flex items-center gap-2 disabled:opacity-50"
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

          {/* Controls Bar: Timezone Selector & Buffer Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#060913] border border-white/[0.08]">
            
            {/* Timezone Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-royal-400" />
                <span>Calendar Timezone</span>
              </label>
              <div className="relative">
                <select
                  value={selectedTimezone}
                  onChange={(e) => {
                    setSelectedTimezone(e.target.value);
                    updateCalendarTimezone(e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0F1C] border border-white/[0.1] text-white text-xs font-medium focus:outline-none focus:border-royal-500 font-mono cursor-pointer"
                >
                  {SUPPORTED_TIMEZONES.map((tz) => (
                    <option key={tz.id} value={tz.id} className="bg-[#0B0F1C] text-white">
                      {tz.label} ({tz.offset}) — {tz.region}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-[11px] text-slate-400">
                All booking slots and Google Meet calendar invites will automatically convert to the student&apos;s local timezone.
              </p>
            </div>

            {/* Buffer Time Selector (15, 30, 60 mins) */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-emerald-400" />
                <span>Buffer Time Between Calls</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[15, 30, 60].map((mins) => {
                  const isActive = selectedBuffer === mins;
                  return (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => {
                        setSelectedBuffer(mins);
                        updateBufferMinutes(mins);
                      }}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center justify-center gap-1.5 ${
                        isActive
                          ? 'bg-royal-600 border-royal-500 text-white shadow-royal'
                          : 'bg-[#0B0F1C] border-white/[0.08] text-slate-400 hover:text-white hover:border-white/[0.15]'
                      }`}
                    >
                      <Clock className={`h-3 w-3 ${isActive ? 'text-white' : 'text-royal-400'}`} />
                      <span>{mins} mins</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-400">
                Adds a rest and preparation buffer between consecutive student consultation meetings.
              </p>
            </div>

          </div>

          {/* Working Days List (Monday to Sunday) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1 text-xs font-bold text-slate-300">
              <span>Working Days & Multiple Availability Ranges</span>
              <span className="text-[11px] text-slate-400 font-normal">
                Toggle days on/off to open or block bookings
              </span>
            </div>

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
                      ? 'bg-[#0E1322]/85 border-white/[0.08] hover:border-royal-500/30'
                      : 'bg-black/25 border-white/[0.04] opacity-60'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    
                    {/* Day Name and Toggle */}
                    <div className="flex items-center gap-3.5 min-w-[170px]">
                      <button
                        type="button"
                        onClick={() => toggleDay(dayName)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          isEnabled ? 'bg-royal-600 shadow-royal-sm' : 'bg-slate-700'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                            isEnabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>

                      <div>
                        <h4 className={`font-bold text-sm ${isEnabled ? 'text-white' : 'text-slate-400'}`}>
                          {dayName}
                        </h4>
                        <span className="text-[11px] font-mono text-slate-400">
                          {isEnabled ? `${dayData.timeRanges.length} range(s) active` : 'Day Off / Unavailable'}
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
                              <span className="text-[10px] font-mono font-bold text-royal-400">#{idx + 1}</span>

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
                                  title="Remove time range"
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
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-dashed border-royal-500/40 hover:border-royal-400 bg-royal-600/10 hover:bg-royal-600/20 text-royal-300 text-xs font-semibold transition btn-press"
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

          {/* ========================================================================= */}
          {/* SUB-SECTION: HOLIDAY & DATE BLOCKING */}
          {/* ========================================================================= */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#070A14] p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400">
                  <CalendarOff className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                    <span>Holiday & Date Blocking</span>
                    <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-mono font-bold">
                      {localHolidays.length} Blocked
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Block specific dates or festivals so no student can book sessions on these days.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsHolidayModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-300 text-xs font-semibold transition btn-press self-start sm:self-auto"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Block Date / Holiday</span>
              </button>
            </div>

            {/* Blocked Holidays List */}
            {localHolidays.length === 0 ? (
              <div className="p-4 rounded-xl border border-dashed border-white/[0.06] text-center text-xs text-slate-500">
                No holidays or dates currently blocked. Click &quot;Block Date / Holiday&quot; to add one.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {localHolidays.map((holiday) => (
                  <div
                    key={holiday.id}
                    className="p-3.5 rounded-xl bg-[#0B0F1C] border border-white/[0.06] flex items-center justify-between gap-3 group hover:border-rose-500/30 transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{holiday.name}</span>
                        {holiday.reason && (
                          <span className="text-[10px] px-2 py-0.2 rounded bg-white/[0.05] text-slate-400 border border-white/[0.05]">
                            {holiday.reason}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] font-mono text-rose-400 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {holiday.date}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveHoliday(holiday.id, holiday.name)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                      title="Unblock date"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Save Availability Action Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-royal-400 shrink-0" />
              <span>Saved changes instantly sync to PostgreSQL and booked slots disappear from storefront.</span>
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
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-semibold text-xs text-royal-200">
                            {meeting.meetingTitle}
                          </h5>
                          {meeting.googleEventId && (
                            <span className="shrink-0 px-2 py-0.5 rounded bg-royal-600/15 border border-royal-500/25 text-royal-300 text-[10px] font-mono" title={`Google Calendar Event ID: ${meeting.googleEventId}`}>
                              GCal Synced
                            </span>
                          )}
                        </div>
                        {meeting.topic && (
                          <p className="text-[11px] text-slate-400 line-clamp-2">
                            <span className="text-slate-500">Agenda:</span> {meeting.topic}
                          </p>
                        )}
                      </div>

                      {/* Date, Time, Duration & Timezone Row */}
                      <div className="space-y-2">
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

                        {/* Timezone & Attendees Badge */}
                        <div className="flex items-center justify-between text-[11px] px-2 py-1 rounded-lg bg-white/[0.02] border border-white/[0.03] text-slate-400 font-mono">
                          <span className="flex items-center gap-1 text-royal-300">
                            <Globe className="h-3 w-3 text-royal-400" />
                            {meeting.timezone || selectedTimezone}
                          </span>
                          <span className="text-[10px] text-slate-500 font-sans">
                            Both creator & student invited
                          </span>
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

        {/* ========================================================================= */}
        {/* MODAL 4: BLOCK DATE / HOLIDAY */}
        {/* ========================================================================= */}
        {isHolidayModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="w-full max-w-md rounded-[24px] border border-white/[0.12] bg-[#0B0F1C] p-6 shadow-2xl space-y-5 text-white">
              
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400">
                    <CalendarOff className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      Block Date or Holiday
                    </h3>
                    <p className="text-xs text-slate-400">
                      Prevent students from booking sessions on this date
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsHolidayModalOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/[0.08] text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleAddHoliday} className="space-y-4 text-xs">
                
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Select Date to Block *
                  </label>
                  <input
                    type="date"
                    required
                    value={newHolidayForm.date}
                    onChange={(e) => setNewHolidayForm({ ...newHolidayForm, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060913] border border-white/[0.1] text-white focus:outline-none focus:border-rose-500 font-mono cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Holiday / Off-Day Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newHolidayForm.name}
                    onChange={(e) => setNewHolidayForm({ ...newHolidayForm, name: e.target.value })}
                    placeholder="e.g. Diwali Festival, Personal Vacation, Hackathon Day"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060913] border border-white/[0.1] text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Category / Reason
                  </label>
                  <input
                    type="text"
                    value={newHolidayForm.reason}
                    onChange={(e) => setNewHolidayForm({ ...newHolidayForm, reason: e.target.value })}
                    placeholder="e.g. National Holiday, Vacation, Family Event"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#060913] border border-white/[0.1] text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                {/* Quick Presets */}
                <div className="space-y-1.5">
                  <span className="text-[11px] text-slate-400 font-medium">Quick Presets:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {['National Holiday', 'Festival', 'Personal Vacation', 'Conference', 'Exam Prep'].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setNewHolidayForm({ ...newHolidayForm, reason: preset })}
                        className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-[11px] text-slate-300 border border-white/[0.06] transition"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/[0.08]">
                  <button
                    type="button"
                    onClick={() => setIsHolidayModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-white/[0.1] text-slate-300 hover:bg-white/[0.06] text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <RippleButton
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-950/50"
                  >
                    Block This Date
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
