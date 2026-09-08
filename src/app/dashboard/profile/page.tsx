'use client';

import React, { useState } from 'react';
import { UserProfile } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { PageTransition } from '@/components/ui/motion';
import { isRealClerkKey } from '@/components/auth/SafeAuth';
import { useCreatorStore } from '@/lib/store';
import { 
  User, 
  ShieldCheck, 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  Building2, 
  Zap, 
  CheckCircle2, 
  Lock, 
  Smartphone, 
  Globe, 
  Download, 
  Trash2, 
  ExternalLink,
  Sparkles,
  Save,
  Check,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

function ClerkProfileWrapper() {
  return (
    <div className="flex justify-center">
      <UserProfile
        appearance={{
          baseTheme: dark,
          elements: {
            card: 'bg-[#0A0D17]/90 border border-white/[0.12] shadow-2xl rounded-[24px] max-w-4xl w-full',
            navbar: 'border-r border-white/[0.08]',
            navbarButton: 'text-slate-300 hover:text-white text-xs',
            navbarButtonActive: 'text-royal-400 font-bold bg-royal-600/15',
            headerTitle: 'text-white font-display font-bold text-base',
            headerSubtitle: 'text-slate-400 text-xs',
            profileSectionTitleText: 'text-white font-semibold text-xs',
            formButtonPrimary: 'bg-royal-600 hover:bg-royal-500 text-white text-xs font-bold rounded-[12px] transition btn-press',
            userButtonPopoverActionButton: 'text-slate-300 hover:text-white text-xs',
            badge: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
          }
        }}
        routing="hash"
      />
    </div>
  );
}

const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳', length: 10, placeholder: '98765 43210' },
  { code: '+1', country: 'US / Canada', flag: '🇺🇸', length: 10, placeholder: '202 555 0123' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧', length: 10, placeholder: '7911 123456' },
  { code: '+971', country: 'UAE', flag: '🇦🇪', length: 9, placeholder: '50 123 4567' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬', length: 8, placeholder: '8123 4567' },
  { code: '+61', country: 'Australia', flag: '🇦🇺', length: 9, placeholder: '412 345 678' },
  { code: '+49', country: 'Germany', flag: '🇩🇪', length: 10, placeholder: '151 23456789' },
  { code: '+33', country: 'France', flag: '🇫🇷', length: 9, placeholder: '6 12 34 56 78' },
];

function ResilientProfileSettings() {
  const { activeCreator, updateCreator } = useCreatorStore();
  const [name, setName] = useState(activeCreator?.name || 'Aarav Sharma');
  const [email, setEmail] = useState(activeCreator?.email || 'aarav.tech@gmail.com');
  
  // Extract initial phone and country code
  const initialWhatsapp = activeCreator?.socials?.whatsapp || '919876543210';
  const digitsOnlyInitial = initialWhatsapp.replace(/\D/g, '');
  
  const [countryCode, setCountryCode] = useState('+91');
  const [whatsappNumber, setWhatsappNumber] = useState(
    digitsOnlyInitial.startsWith('91') && digitsOnlyInitial.length >= 12
      ? digitsOnlyInitial.slice(2)
      : digitsOnlyInitial.length === 10
      ? digitsOnlyInitial
      : digitsOnlyInitial.startsWith('91')
      ? digitsOnlyInitial.slice(2)
      : digitsOnlyInitial || '9876543210'
  );

  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Phone validation logic
  const validatePhone = (code: string, num: string): string | null => {
    const raw = num.replace(/\D/g, '');
    if (!raw) {
      return 'WhatsApp Business number is required for customer chats';
    }
    if (code === '+91') {
      if (raw.length !== 10) {
        return 'Please enter a valid 10-digit Indian mobile number';
      }
      if (!/^[6-9]/.test(raw)) {
        return 'Indian mobile numbers must start with 6, 7, 8, or 9';
      }
    } else {
      if (raw.length < 7 || raw.length > 15) {
        return 'Please enter a valid international number (7–15 digits)';
      }
    }
    return null;
  };

  const handlePhoneInputChange = (val: string) => {
    const clean = val.replace(/[^\d\s-]/g, '');
    setWhatsappNumber(clean);
    if (phoneError) {
      setPhoneError(null);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validatePhone(countryCode, whatsappNumber);
    if (error) {
      setPhoneError(error);
      return;
    }

    setPhoneError(null);
    const cleanDigits = whatsappNumber.replace(/\D/g, '');
    const formattedFullWhatsapp = `${countryCode.replace('+', '')}${cleanDigits}`;

    // Update Zustand store, localStorage, and PostgreSQL users table
    updateCreator({
      name,
      email,
      socials: {
        ...(activeCreator?.socials || {}),
        whatsapp: formattedFullWhatsapp
      }
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleExportData = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeCreator, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `creatoros-data-${activeCreator?.username || 'account'}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Profile Overview Card */}
      <div className="rounded-[24px] border border-white/[0.12] bg-[#0A0D17]/90 p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-white/[0.08]">
          <div className="relative">
            <img
              src={activeCreator?.avatarUrl}
              alt={activeCreator?.name}
              className="h-20 w-20 rounded-full object-cover ring-4 ring-royal-500/50 shadow-royal bg-black"
            />
            <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-emerald-500 ring-4 ring-[#0A0D17] flex items-center justify-center">
              <Check className="h-3.5 w-3.5 text-black stroke-[3]" />
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-xl font-bold text-white">{name}</h2>
              {activeCreator?.verified && (
                <span className="flex items-center gap-1 rounded-full bg-royal-600/20 px-2 py-0.5 text-[11px] font-semibold text-royal-400 border border-royal-500/30">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Verified Creator</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 font-mono">
              creatoros.in/<span className="text-royal-400 font-semibold">{activeCreator?.username}</span>
            </p>
            <p className="text-xs text-slate-300 pt-1">{activeCreator?.bio}</p>
          </div>
          <Link
            href={`/${activeCreator?.username}`}
            target="_blank"
            className="flex items-center gap-1.5 rounded-[12px] bg-white/[0.06] hover:bg-white/[0.1] px-3.5 py-2 text-xs font-semibold text-white border border-white/[0.1] transition btn-press self-start sm:self-center"
          >
            <span>Live Store</span>
            <ExternalLink className="h-3.5 w-3.5 text-royal-400" />
          </Link>
        </div>

        {/* Edit Details Form */}
        <form onSubmit={handleSave} className="pt-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            Personal & Contact Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Legal Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-[12px] border border-white/[0.12] bg-[#05070B] px-3.5 py-2.5 text-xs text-white focus:border-royal-500 focus:outline-none transition"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Primary Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-[12px] border border-white/[0.12] bg-[#05070B] px-3.5 py-2.5 text-xs text-white focus:border-royal-500 focus:outline-none transition"
              />
            </div>

            {/* WhatsApp Business Number Field with Country Code Selector & Validation */}
            <div className="sm:col-span-2 space-y-1.5 p-4 rounded-[18px] bg-gradient-to-r from-[#0E1726]/60 to-[#0A0D17] border border-royal-500/20">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <div className="h-2 w-2 rounded-full bg-[#25D366] animate-pulse" />
                  <span>WhatsApp Business Number</span>
                  <span className="text-[10px] text-royal-400 font-mono font-normal">(Floating Chat CTA Target)</span>
                </label>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Direct WhatsApp Dispatch
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Country Code Selector */}
                <select
                  value={countryCode}
                  onChange={(e) => {
                    setCountryCode(e.target.value);
                    if (phoneError) setPhoneError(null);
                  }}
                  className="rounded-[12px] border border-white/[0.12] bg-[#05070B] px-3 py-2.5 text-xs text-white focus:border-royal-500 focus:outline-none transition cursor-pointer shrink-0 font-mono"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code} className="bg-[#0A0D17] text-white">
                      {c.flag} {c.code} ({c.country})
                    </option>
                  ))}
                </select>

                {/* Phone Number Input */}
                <div className="relative flex-1">
                  <input
                    type="tel"
                    required
                    value={whatsappNumber}
                    onChange={(e) => handlePhoneInputChange(e.target.value)}
                    placeholder={COUNTRY_CODES.find((c) => c.code === countryCode)?.placeholder || '98765 43210'}
                    className={`w-full rounded-[12px] border bg-[#05070B] px-3.5 py-2.5 text-xs text-white font-mono placeholder:text-slate-600 focus:outline-none transition ${
                      phoneError
                        ? 'border-rose-500/80 focus:border-rose-500'
                        : 'border-white/[0.12] focus:border-royal-500'
                    }`}
                  />
                  {whatsappNumber && !phoneError && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                  )}
                </div>
              </div>

              {phoneError ? (
                <p className="text-[11px] text-rose-400 flex items-center gap-1 pt-0.5 font-medium">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  <span>{phoneError}</span>
                </p>
              ) : (
                <p className="text-[11px] text-slate-400 pt-0.5 leading-relaxed">
                  Powers the floating <strong className="text-slate-200">"Chat Creator"</strong> button on your storefront. Saves directly to PostgreSQL database.
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Store Category</label>
              <input
                type="text"
                disabled
                value={activeCreator?.category || 'Tech & Coding'}
                className="w-full rounded-[12px] border border-white/[0.08] bg-[#05070B]/50 px-3.5 py-2.5 text-xs text-slate-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Account Role</label>
              <input
                type="text"
                disabled
                value="Verified Creator & Admin"
                className="w-full rounded-[12px] border border-white/[0.08] bg-[#05070B]/50 px-3.5 py-2.5 text-xs text-slate-400 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-[14px] bg-royal-600 hover:bg-royal-500 px-5 py-2.5 text-xs font-bold text-white shadow-royal transition btn-press"
            >
              {saved ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  <span>Changes Saved to PostgreSQL!</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Profile Details</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Connected Integrations & Financials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Google Calendar & OAuth Sync */}
        <div className="rounded-[24px] border border-white/[0.12] bg-[#0A0D17]/90 p-6 shadow-2xl backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-blue-500/10 border border-blue-500/20">
                <Calendar className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-xs text-white">Google Calendar OAuth</h3>
                <p className="text-[11px] text-slate-400">1:1 Mentorship Auto-Booking</p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Connected</span>
            </span>
          </div>

          <div className="rounded-[16px] bg-[#05070B] border border-white/[0.08] p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Linked Account</span>
              <span className="font-mono text-slate-200 font-medium">{email}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Timezone</span>
              <span className="font-mono text-royal-400">Asia/Kolkata (IST +5:30)</span>
            </div>
          </div>

          <Link
            href="/dashboard/calendar"
            className="w-full flex items-center justify-center gap-2 rounded-[12px] bg-white/[0.05] hover:bg-white/[0.09] py-2.5 text-xs font-semibold text-slate-200 border border-white/[0.08] transition"
          >
            <span>Manage Calendar Settings</span>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
          </Link>
        </div>

        {/* Banking & GST Settlement */}
        <div className="rounded-[24px] border border-white/[0.12] bg-[#0A0D17]/90 p-6 shadow-2xl backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-emerald-500/10 border border-emerald-500/20">
                <Building2 className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-semibold text-xs text-white">Direct UPI & Bank Payouts</h3>
                <p className="text-[11px] text-slate-400">Instant T+0 IMPS Settlement</p>
              </div>
            </div>
            <span className="rounded-full bg-royal-500/15 border border-royal-500/30 px-2.5 py-0.5 text-[10px] font-bold text-royal-400 font-mono">
              0% Fee
            </span>
          </div>

          <div className="rounded-[16px] bg-[#05070B] border border-white/[0.08] p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Bank</span>
              <span className="font-mono text-slate-200">{activeCreator?.bankAccount.bankName}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">A/C Number</span>
              <span className="font-mono text-slate-200">{activeCreator?.bankAccount.accountNumberMasked}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">GSTIN</span>
              <span className="font-mono text-royal-400">{activeCreator?.gstNumber || '29AAAAA0000A1Z5'}</span>
            </div>
          </div>

          <Link
            href="/dashboard/gst-invoices"
            className="w-full flex items-center justify-center gap-2 rounded-[12px] bg-white/[0.05] hover:bg-white/[0.09] py-2.5 text-xs font-semibold text-slate-200 border border-white/[0.08] transition"
          >
            <span>View GST Invoices & Payouts</span>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
          </Link>
        </div>

      </div>

      {/* Privacy, Data Rights & Account Actions */}
      <div className="rounded-[24px] border border-white/[0.12] bg-[#0A0D17]/90 p-6 shadow-2xl backdrop-blur-xl space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-royal-400" />
          <h3 className="font-semibold text-sm text-white">Data Privacy & Account Controls</h3>
        </div>
        <p className="text-xs text-slate-400">
          In accordance with CreatorOS Privacy Policy and India DPDP guidelines, you retain complete ownership over your customer data, revenue records, and product assets.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-white/[0.08]">
          <button
            onClick={handleExportData}
            disabled={exporting}
            className="flex items-center justify-center gap-2 rounded-[12px] bg-white/[0.06] hover:bg-white/[0.1] px-4 py-2.5 text-xs font-semibold text-slate-200 border border-white/[0.1] transition btn-press"
          >
            {exporting ? (
              <div className="h-4 w-4 rounded-full border-2 border-royal-400 border-t-transparent animate-spin" />
            ) : (
              <Download className="h-4 w-4 text-royal-400" />
            )}
            <span>Export Account Data (JSON)</span>
          </button>

          <Link
            href="/privacy"
            className="flex items-center justify-center gap-2 rounded-[12px] bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2.5 text-xs font-semibold text-slate-300 border border-white/[0.08] transition"
          >
            <span>Read Privacy Policy</span>
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
          </Link>
        </div>
      </div>

    </div>
  );
}

export default function ProfilePage() {
  const isClerk = isRealClerkKey(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_Y3JlYXRvcm9zLWJoYXJhdC5jbGVyay5hY2NvdW50cy5kZXYk');

  return (
    <PageTransition>
      <div className="space-y-6 font-sans">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Account & Security Settings</span>
              <span className="rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 font-mono">
                {isClerk ? 'Clerk Enterprise' : 'Creator Studio'}
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Manage your profile credentials, Google Calendar integration, direct UPI payouts, and data privacy controls.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 rounded-[14px] bg-white/[0.05] hover:bg-white/[0.09] px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition btn-press self-start sm:self-center"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return to Studio</span>
          </Link>
        </div>

        {/* Dynamic Profile View */}
        {isClerk ? <ClerkProfileWrapper /> : <ResilientProfileSettings />}

      </div>
    </PageTransition>
  );
}
