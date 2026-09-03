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
  Smartphone,
  Plus,
  Search,
  Filter,
  Users,
  Target,
  BarChart3,
  TrendingUp,
  Percent,
  Check,
  CheckCircle2,
  Trash2,
  Edit3,
  Play,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  ExternalLink,
  Tag,
  Radio,
  Sliders
} from 'lucide-react';
import { PageTransition, HoverCard, AnimatedCounter, RippleButton } from '@/components/ui/motion';
import { motion, AnimatePresence } from 'framer-motion';

// Types for Keyword Triggers
interface KeywordTrigger {
  id: string;
  keyword: string;
  matchType: 'EXACT' | 'CONTAINS';
  replyMessage: string;
  actionHook: 'SEND_PRODUCT' | 'SEND_COUPON' | 'BOOK_SLOT' | 'CUSTOM_REPLY';
  actionPayload?: string;
  isActive: boolean;
  triggersCount: number;
}

// Initial Keyword Triggers for Indian Creators
const INITIAL_KEYWORD_TRIGGERS: KeywordTrigger[] = [
  {
    id: 'kw_notes',
    keyword: 'NOTES',
    matchType: 'EXACT',
    replyMessage: 'Namaste! 🙏 Here is the link to download the FAANG DSA 450 Notes & System Design Blueprint: creatoros.in/aarav.tech/dsa-notes. Use code BHARAT10 for 10% off today!',
    actionHook: 'SEND_PRODUCT',
    actionPayload: 'DSA 450 Master Sheet',
    isActive: true,
    triggersCount: 418
  },
  {
    id: 'kw_interview',
    keyword: 'INTERVIEW',
    matchType: 'CONTAINS',
    replyMessage: 'Looking to crack FAANG/Top Product companies? Book a 1:1 Mock Interview & Resume Audit slot with Aarav Sharma: creatoros.in/aarav.tech/mock-interview',
    actionHook: 'BOOK_SLOT',
    actionPayload: '1:1 Mock Interview',
    isActive: true,
    triggersCount: 234
  },
  {
    id: 'kw_discount',
    keyword: 'DISCOUNT',
    matchType: 'EXACT',
    replyMessage: 'Exclusive 15% discount unlocked for you! 🎉 Use code CREATOR15 at UPI checkout on any digital guide or masterclass: creatoros.in/aarav.tech',
    actionHook: 'SEND_COUPON',
    actionPayload: 'CREATOR15 (15% OFF)',
    isActive: true,
    triggersCount: 312
  },
  {
    id: 'kw_system_design',
    keyword: 'SYSTEM DESIGN',
    matchType: 'CONTAINS',
    replyMessage: 'Hey engineer! Check out our interactive System Design Architecture cohort closing this Sunday. View syllabus: creatoros.in/aarav.tech/course/sys-design',
    actionHook: 'SEND_PRODUCT',
    actionPayload: 'System Design Cohort',
    isActive: true,
    triggersCount: 189
  }
];

// Broadcast Campaigns
interface BroadcastCampaign {
  id: string;
  title: string;
  targetSegment: string;
  recipientsCount: number;
  messageText: string;
  status: 'Delivered' | 'Scheduled' | 'Draft';
  deliveryRate: string;
  ctr: string;
  sentDate: string;
}

const INITIAL_BROADCASTS: BroadcastCampaign[] = [
  {
    id: 'bc_diwali',
    title: 'Diwali Special: 20% Off All SDE Playbooks',
    targetSegment: 'Past Notes Buyers (380 Creators)',
    recipientsCount: 380,
    messageText: 'Happy Festive Season! 🪔 As a valued student, grab the System Design Masterclass with an exclusive 20% discount before slots fill up.',
    status: 'Delivered',
    deliveryRate: '99.8%',
    ctr: '38.4%',
    sentDate: 'Yesterday at 07:30 PM IST'
  },
  {
    id: 'bc_cohort_reminder',
    title: 'Web3 & Backend Masterclass Enrollment Closing in 6h',
    targetSegment: 'Registered Webinar Attendees (195 Leads)',
    recipientsCount: 195,
    messageText: 'Final reminder! ⏳ Only 4 spots left for the Live 6-Week Cohort. 1-click UPI enrollment link inside.',
    status: 'Delivered',
    deliveryRate: '100%',
    ctr: '44.2%',
    sentDate: '3 days ago'
  }
];

export default function WhatsAppAutomationPage() {
  const { whatsappLogs, activeCreator } = useCreatorStore();

  const [activeTab, setActiveTab] = useState<'flows' | 'keywords' | 'broadcasts' | 'analytics'>('flows');
  const [selectedTemplate, setSelectedTemplate] = useState<'order_receipt' | 'booking_meet' | 'abandoned_cart' | 'keyword_reply' | 'broadcast_sample'>('order_receipt');
  
  // Keyword triggers state
  const [triggers, setTriggers] = useState<KeywordTrigger[]>(INITIAL_KEYWORD_TRIGGERS);
  const [showAddTriggerModal, setShowAddTriggerModal] = useState(false);
  const [newKeyword, setNewKeyword] = useState('');
  const [newReply, setNewReply] = useState('');
  const [newAction, setNewAction] = useState<KeywordTrigger['actionHook']>('SEND_PRODUCT');

  // Broadcasts state
  const [broadcasts, setBroadcasts] = useState<BroadcastCampaign[]>(INITIAL_BROADCASTS);
  const [showNewBroadcastModal, setShowNewBroadcastModal] = useState(false);
  const [bcTitle, setBcTitle] = useState('');
  const [bcSegment, setBcSegment] = useState('All Customers (450)');
  const [bcMessage, setBcMessage] = useState('');

  // Interactive Test Chat Simulator Input
  const [simInput, setSimInput] = useState('');
  const [simMessages, setSimMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; time: string; sub?: string }>>([
    {
      sender: 'bot',
      text: `Namaste Rahul! 🙏 Your payment of ₹499 for DSA 450 Master Sheet is confirmed. Download link: creatoros.in/d/98421 • Official Tax Invoice INV-2026-00101 attached.`,
      time: '9:41 PM',
      sub: '📥 1-Click PDF Download • SAC 998431'
    }
  ]);

  const handleSimSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simInput.trim()) return;

    const userText = simInput.trim();
    const timeNow = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    
    // Add User Message
    setSimMessages((prev) => [...prev, { sender: 'user', text: userText, time: timeNow }]);
    setSimInput('');

    // Check keyword match
    setTimeout(() => {
      const match = triggers.find(t => 
        t.isActive && (
          (t.matchType === 'EXACT' && t.keyword.toUpperCase() === userText.toUpperCase()) ||
          (t.matchType === 'CONTAINS' && userText.toUpperCase().includes(t.keyword.toUpperCase()))
        )
      );

      if (match) {
        setSimMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: match.replyMessage,
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
            sub: `⚡ Automated Trigger: #${match.keyword}`
          }
        ]);
      } else {
        setSimMessages((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: `Namaste! Thanks for messaging Aarav Sharma. Type 'NOTES' for free sheets, 'INTERVIEW' for 1:1 mocks, or 'DISCOUNT' for 15% off coupon codes.`,
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
            sub: '🤖 Smart Auto-Responder'
          }
        ]);
      }
    }, 600);
  };

  const handleCreateTrigger = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim() || !newReply.trim()) return;

    const created: KeywordTrigger = {
      id: `kw_${Date.now()}`,
      keyword: newKeyword.trim().toUpperCase(),
      matchType: 'EXACT',
      replyMessage: newReply.trim(),
      actionHook: newAction,
      isActive: true,
      triggersCount: 0
    };

    setTriggers((prev) => [created, ...prev]);
    setShowAddTriggerModal(false);
    setNewKeyword('');
    setNewReply('');
  };

  const handleCreateBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bcTitle.trim() || !bcMessage.trim()) return;

    const created: BroadcastCampaign = {
      id: `bc_${Date.now()}`,
      title: bcTitle.trim(),
      targetSegment: bcSegment,
      recipientsCount: bcSegment.includes('All') ? 450 : 210,
      messageText: bcMessage.trim(),
      status: 'Delivered',
      deliveryRate: '100%',
      ctr: '41.8%',
      sentDate: 'Just now'
    };

    setBroadcasts((prev) => [created, ...prev]);
    setShowNewBroadcastModal(false);
    setBcTitle('');
    setBcMessage('');
  };

  return (
    <PageTransition>
      <div className="space-y-6 font-sans">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>WhatsApp Automation & Growth Engine</span>
              <span className="rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 font-mono">
                99.8% Open Rate
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Automate instant product delivery, keyword auto-replies, abandoned cart recoveries, and segmented broadcasts directly via WhatsApp Cloud API.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 rounded-[14px] border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-2 text-xs font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Official Cloud API Active</span>
            </span>
          </div>
        </div>

        {/* TOP TELEMETRY METRIC CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-emerald-500/30">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Messages Dispatched</span>
              <Send className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-white font-mono">
              <AnimatedCounter value={whatsappLogs.length + 540} />
            </div>
            <p className="text-[11px] text-emerald-400 mt-1 font-mono">99.8% Delivery Rate</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Click-Through Rate (CTR)</span>
              <TrendingUp className="h-4 w-4 text-royal-400" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-royal-400 font-mono">
              <AnimatedCounter value={38.4} decimals={1} suffix="%" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">vs 2.8% on traditional email</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-pink-500/30">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Avg. Read Speed</span>
              <Clock className="h-4 w-4 text-pink-400" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-pink-400 font-mono">
              <AnimatedCounter value={42} suffix=" sec" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Instant mobile lockscreen alert</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-amber-500/30">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Abandoned Recoveries</span>
              <ShoppingBag className="h-4 w-4 text-amber-400" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
              <AnimatedCounter value={48200} prefix="₹" />
            </div>
            <p className="text-[11px] text-emerald-400 mt-1 font-mono">15-Min Automated Nudges</p>
          </HoverCard>
        </div>

        {/* NAVIGATION TABS BAR */}
        <div className="flex items-center gap-1.5 p-1 rounded-[16px] bg-white/[0.04] border border-white/[0.08] overflow-x-auto no-scrollbar">
          {[
            { id: 'flows', label: '1. Automated Delivery Flows & Simulator' },
            { id: 'keywords', label: '2. Keyword Triggers & Auto Replies' },
            { id: 'broadcasts', label: '3. Broadcast Campaigns' },
            { id: 'analytics', label: '4. Telemetry & Analytics' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-[12px] text-xs font-semibold whitespace-nowrap transition btn-press ${
                activeTab === tab.id
                  ? 'bg-royal-600 text-white shadow-royal-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: AUTOMATED FLOWS & LIVE WHATSAPP CHAT SIMULATOR */}
        {/* ========================================================================= */}
        {activeTab === 'flows' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Template Automation Selectors (7 cols) */}
            <div className="lg:col-span-7 rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-white">
                    Core WhatsApp Automation Flows
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Select a flow to preview the exact message received by your Indian customers.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                
                {/* Flow 1: Digital Product Delivery */}
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
                        <span>Instant Product Delivery & GST Invoice</span>
                      </span>
                      <span className="rounded bg-royal-600/20 text-royal-300 text-[9px] font-bold px-2 py-0.5 font-mono">
                        Trigger: UPI Success
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Auto-dispatches in 30 seconds with 1-click PDF download link, official SAC 998431 GST Tax Invoice, and VIP community access link.
                    </p>
                  </button>
                </HoverCard>

                {/* Flow 2: 1:1 Booking */}
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
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Sends confirmed date/time (IST), Google Meet link, agenda notes, and an automatic reminder 30 minutes before the call.
                    </p>
                  </button>
                </HoverCard>

                {/* Flow 3: Abandoned Cart 15-min Recovery */}
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
                        <ShoppingBag className="h-4 w-4 text-amber-400" />
                        <span>Abandoned Cart 15-Minute Recovery Nudge</span>
                      </span>
                      <span className="rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold px-2 py-0.5 font-mono">
                        Trigger: 15m Dropoff
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Sends a polite recovery reminder with an exclusive 10% coupon code (BHARAT10) to convert dropped off buyers.
                    </p>
                  </button>
                </HoverCard>

                {/* Flow 4: Keyword Trigger Auto-reply */}
                <HoverCard hoverY={-2}>
                  <button
                    onClick={() => setSelectedTemplate('keyword_reply')}
                    className={`w-full text-left p-4 rounded-[18px] border transition ${
                      selectedTemplate === 'keyword_reply'
                        ? 'border-royal-500 bg-royal-600/15 shadow-royal-sm ring-1 ring-royal-500/40'
                        : 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-white flex items-center gap-1.5">
                        <Zap className="h-4 w-4 text-emerald-400" />
                        <span>Keyword Trigger Auto-Reply (e.g. 'NOTES' / 'INTERVIEW')</span>
                      </span>
                      <span className="rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold px-2 py-0.5 font-mono">
                        Trigger: Inbound Keyword
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Responds in 2 seconds when an Instagram or YouTube follower messages keywords to your WhatsApp business number.
                    </p>
                  </button>
                </HoverCard>

              </div>
            </div>

            {/* Right: Live Interactive WhatsApp Phone Simulator (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-[360px] rounded-[32px] overflow-hidden border-4 border-[#1F2937] bg-[#070D14] shadow-2xl">
                
                {/* Simulated Phone Top Speaker & Notch */}
                <div className="h-4 bg-[#111827] flex items-center justify-center">
                  <div className="h-1.5 w-16 bg-[#374151] rounded-full" />
                </div>

                {/* WhatsApp Chat Header */}
                <div className="bg-[#121E2C] p-3 flex items-center gap-3 text-white border-b border-white/[0.06]">
                  <img
                    src={activeCreator?.avatarUrl}
                    alt={activeCreator?.name}
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-emerald-500"
                  />
                  <div className="flex-1 overflow-hidden">
                    <p className="font-bold text-xs truncate flex items-center gap-1.5">
                      <span>{activeCreator?.name}</span>
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 fill-emerald-400/20 shrink-0" />
                    </p>
                    <p className="text-[10px] text-emerald-400 font-mono">Verified Business Account</p>
                  </div>
                </div>

                {/* Chat Scroll View */}
                <div className="p-3.5 space-y-3 min-h-[320px] max-h-[360px] overflow-y-auto bg-[#070D14] bg-grid-subtle text-xs">
                  <div className="rounded-lg bg-[#0E1B29] p-1 text-center text-[9px] text-slate-400 max-w-[200px] mx-auto border border-white/[0.04]">
                    🔒 End-to-end encrypted
                  </div>

                  {/* Flow Message Bubbles */}
                  {selectedTemplate === 'order_receipt' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-[18px] rounded-tl-sm bg-[#16365C] p-3.5 text-white text-[11px] leading-relaxed shadow-md space-y-2 border border-royal-500/30"
                    >
                      <p className="font-bold">Namaste Rahul! 🙏</p>
                      <p className="mt-1">
                        Your payment of ₹499 for <strong>Complete DSA 450 Sheet & System Design Notes</strong> is confirmed!
                      </p>
                      <div className="rounded-[12px] bg-black/50 p-2.5 text-[10px] font-mono space-y-1.5 border border-white/[0.08]">
                        <p className="text-emerald-400">📥 1-Click PDF Download: <span className="underline text-royal-300">creatoros.in/d/98421</span></p>
                        <p className="text-slate-300">📄 Official GST Tax Invoice: <span className="underline text-royal-300">INV-2026-00101.pdf</span></p>
                      </div>
                      <div className="flex items-center justify-end gap-1 text-[9px] text-royal-200/70 pt-1">
                        <span>Just now</span>
                        <CheckCheck className="h-3 w-3 text-cyan-300 inline" />
                      </div>
                    </motion.div>
                  )}

                  {selectedTemplate === 'booking_meet' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-[18px] rounded-tl-sm bg-[#16365C] p-3.5 text-white text-[11px] leading-relaxed shadow-md space-y-2 border border-blue-500/30"
                    >
                      <p className="font-bold">Namaste Ananya! ✨</p>
                      <p className="mt-1">
                        Your 1:1 Mock Interview with <strong>Aarav Sharma</strong> is booked!
                      </p>
                      <div className="rounded-[12px] bg-black/50 p-2.5 text-[10px] font-mono space-y-1 border border-white/[0.08]">
                        <p>🗓 Tomorrow at 07:30 PM IST</p>
                        <p>🔗 Meet: <span className="underline text-royal-300">meet.google.com/xyz-mock</span></p>
                      </div>
                      <div className="flex items-center justify-end gap-1 text-[9px] text-blue-200/70 pt-1">
                        <span>Just now</span>
                        <CheckCheck className="h-3 w-3 text-cyan-300 inline" />
                      </div>
                    </motion.div>
                  )}

                  {selectedTemplate === 'abandoned_cart' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-[18px] rounded-tl-sm bg-[#16365C] p-3.5 text-white text-[11px] leading-relaxed shadow-md space-y-2 border border-amber-500/30"
                    >
                      <p className="font-bold">Hey there! 👋</p>
                      <p className="mt-1">
                        We noticed you left <strong>DSA 450 Interview Playbook</strong> in your cart!
                      </p>
                      <p className="mt-1 text-royal-200">
                        Use code <strong>BHARAT10</strong> for 10% OFF in the next 30 mins:
                      </p>
                      <p className="font-mono text-[10px] text-royal-300 underline">
                        creatoros.in/aarav.tech?discount=BHARAT10
                      </p>
                      <div className="flex items-center justify-end gap-1 text-[9px] text-amber-200/70 pt-1">
                        <span>15m ago</span>
                        <CheckCheck className="h-3 w-3 text-cyan-300 inline" />
                      </div>
                    </motion.div>
                  )}

                  {selectedTemplate === 'keyword_reply' && (
                    <>
                      <div className="rounded-[16px] rounded-tr-sm bg-[#054640] p-2.5 text-white text-[11px] max-w-[75%] ml-auto shadow-sm">
                        <p className="font-mono font-bold">NOTES</p>
                        <span className="text-[9px] text-slate-300 block text-right">9:43 PM</span>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-[18px] rounded-tl-sm bg-[#16365C] p-3.5 text-white text-[11px] leading-relaxed shadow-md space-y-2 border border-emerald-500/30"
                      >
                        <p className="font-bold">Namaste! 🙏</p>
                        <p>Here is your instant link to download the FAANG DSA 450 Sheet & Roadmaps:</p>
                        <p className="font-mono text-[10px] text-royal-300 underline">creatoros.in/aarav.tech/dsa-notes</p>
                        <div className="flex items-center justify-end gap-1 text-[9px] text-emerald-200/70 pt-1">
                          <span>Just now</span>
                          <CheckCheck className="h-3 w-3 text-cyan-300 inline" />
                        </div>
                      </motion.div>
                    </>
                  )}

                  {/* Dynamic simulated messages */}
                  {simMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-[16px] text-[11px] leading-relaxed shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-[#054640] text-white rounded-tr-sm ml-auto max-w-[75%]'
                          : 'bg-[#16365C] text-white rounded-tl-sm mr-auto max-w-[85%] border border-royal-500/30'
                      }`}
                    >
                      <p>{msg.text}</p>
                      {msg.sub && <p className="text-[9px] text-royal-300 mt-1 font-mono">{msg.sub}</p>}
                      <div className="flex items-center justify-end gap-1 text-[8px] text-slate-400 pt-0.5">
                        <span>{msg.time}</span>
                        {msg.sender === 'bot' && <CheckCheck className="h-3 w-3 text-cyan-300 inline" />}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interactive Test Chat Input */}
                <form onSubmit={handleSimSend} className="bg-[#121E2C] p-2 flex items-center gap-1.5 border-t border-white/[0.08]">
                  <input
                    type="text"
                    value={simInput}
                    onChange={(e) => setSimInput(e.target.value)}
                    placeholder="Type 'NOTES' or 'INTERVIEW'..."
                    className="flex-1 rounded-[12px] bg-black/50 border border-white/[0.1] px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-royal-500"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-[12px] bg-emerald-600 hover:bg-emerald-500 text-white transition btn-press"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>

              </div>
              <p className="text-[10px] text-slate-400 font-mono mt-2 text-center">
                Interactive simulator • Test typing keywords in the box above
              </p>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: KEYWORD TRIGGERS & AUTO-REPLIES */}
        {/* ========================================================================= */}
        {activeTab === 'keywords' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                  <span>Keyword Triggers & Automated Replies</span>
                  <span className="rounded-full bg-royal-600/15 text-royal-300 px-2 py-0.5 text-[11px] font-mono">
                    {triggers.length} Active
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  When followers message these keywords from your Instagram bio, YouTube description, or ads, CreatorOS replies in 2 seconds.
                </p>
              </div>

              <RippleButton
                onClick={() => setShowAddTriggerModal(true)}
                className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-4 py-2.5 text-xs font-bold text-white shadow-royal flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Plus className="h-4 w-4" />
                <span>Add Keyword Trigger</span>
              </RippleButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {triggers.map((trigger) => (
                <HoverCard
                  hoverY={-2}
                  key={trigger.id}
                  className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="rounded-[10px] bg-royal-600/20 text-royal-300 border border-royal-500/30 px-2.5 py-1 text-xs font-mono font-bold">
                        #{trigger.keyword}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">({trigger.matchType})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        {trigger.triggersCount} Dispatched
                      </span>
                      <button
                        onClick={() => {
                          setTriggers(prev => prev.map(t => t.id === trigger.id ? { ...t, isActive: !t.isActive } : t));
                        }}
                        className={`h-5 w-9 rounded-full transition-colors p-0.5 flex items-center ${
                          trigger.isActive ? 'bg-emerald-500 justify-end' : 'bg-white/20 justify-start'
                        }`}
                      >
                        <span className="h-4 w-4 rounded-full bg-white block shadow" />
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-[14px] bg-black/40 border border-white/[0.06] text-xs text-slate-200 leading-relaxed font-sans">
                    "{trigger.replyMessage}"
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-white/[0.06]">
                    <span className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-royal-400" />
                      <span>Action: <strong>{trigger.actionPayload || trigger.actionHook}</strong></span>
                    </span>
                    <button
                      onClick={() => setTriggers(prev => prev.filter(t => t.id !== trigger.id))}
                      className="text-slate-500 hover:text-rose-400 transition"
                      title="Delete Trigger"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </HoverCard>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: BROADCAST CAMPAIGNS */}
        {/* ========================================================================= */}
        {activeTab === 'broadcasts' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                  <span>Segmented WhatsApp Broadcast Campaigns</span>
                  <span className="rounded-full bg-emerald-500/15 text-emerald-400 px-2 py-0.5 text-[11px] font-mono">
                    High Conversion
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Send targeted festive discounts, webinar invites, or new digital guide drops to your past buyers with 99.8% open rates.
                </p>
              </div>

              <RippleButton
                onClick={() => setShowNewBroadcastModal(true)}
                className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-4 py-2.5 text-xs font-bold text-white shadow-royal flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Send className="h-4 w-4" />
                <span>New Broadcast Campaign</span>
              </RippleButton>
            </div>

            <div className="space-y-3">
              {broadcasts.map((b) => (
                <HoverCard
                  hoverY={-2}
                  key={b.id}
                  className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-display text-sm font-bold text-white">{b.title}</h4>
                        <span className="rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold font-mono">
                          {b.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{b.targetSegment} • Sent {b.sentDate}</p>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono">
                      <div>
                        <span className="text-slate-400 text-[10px] block">Delivery Rate</span>
                        <span className="text-emerald-400 font-bold">{b.deliveryRate}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">CTR</span>
                        <span className="text-royal-400 font-bold">{b.ctr}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-[14px] bg-black/40 border border-white/[0.06] text-xs text-slate-200">
                    "{b.messageText}"
                  </div>
                </HoverCard>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: MESSAGE ANALYTICS & TELEMETRY */}
        {/* ========================================================================= */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <div className="lg:col-span-7 rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-4">
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-royal-400" />
                <span>30-Day WhatsApp Dispatch & Engagement Telemetry</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 rounded-[14px] bg-black/40 border border-white/[0.06]">
                  <span className="text-[10px] text-slate-400 block">Total Sent</span>
                  <span className="font-bold text-white text-base">724</span>
                </div>
                <div className="p-3 rounded-[14px] bg-black/40 border border-white/[0.06]">
                  <span className="text-[10px] text-slate-400 block">Delivered</span>
                  <span className="font-bold text-emerald-400 text-base">99.8%</span>
                </div>
                <div className="p-3 rounded-[14px] bg-black/40 border border-white/[0.06]">
                  <span className="text-[10px] text-slate-400 block">Read Rate</span>
                  <span className="font-bold text-royal-400 text-base">98.2%</span>
                </div>
                <div className="p-3 rounded-[14px] bg-black/40 border border-white/[0.06]">
                  <span className="text-[10px] text-slate-400 block">Link CTR</span>
                  <span className="font-bold text-pink-400 text-base">38.4%</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                  Conversion by Message Flow Type
                </span>

                {[
                  { label: 'Instant Digital PDF Downloads', rate: 96, count: '418 Dispatches' },
                  { label: '1:1 Google Meet Attendance Reminders', rate: 92, count: '142 Calls' },
                  { label: 'Abandoned Cart 15-Min Recoveries', rate: 44, count: '₹48,200 Recovered' },
                  { label: 'Keyword Inbound Auto-Replies', rate: 68, count: '164 Conversions' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">{item.label}</span>
                      <span className="font-bold text-emerald-400 font-mono">{item.rate}% Success ({item.count})</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-royal-600 to-emerald-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.rate}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-4">
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Meta WhatsApp Cloud API Compliance</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <div className="p-3 rounded-[14px] bg-emerald-950/20 border border-emerald-500/30">
                  <p className="text-emerald-200 font-semibold mb-1">✓ Tier-1 Indian High Throughput</p>
                  <p className="text-[11px] text-slate-300">Official Meta WhatsApp BSP partner integration with 80 messages/second capacity.</p>
                </div>

                <div className="p-3 rounded-[14px] bg-royal-600/10 border border-royal-500/25">
                  <p className="text-royal-200 font-semibold mb-1">✓ Automated SAC 998431 GST Invoicing</p>
                  <p className="text-[11px] text-slate-300">Compliant with Indian IT Act 2000 & GST Rule 46 for automated invoice dispatches.</p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* ADD KEYWORD MODAL */}
        {/* ========================================================================= */}
        {showAddTriggerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <div className="relative w-full max-w-md rounded-[24px] border border-white/[0.12] bg-[#0A0E1A] p-6 shadow-2xl text-slate-100">
              <button
                onClick={() => setShowAddTriggerModal(false)}
                className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-white/[0.08] hover:text-white"
              >
                ×
              </button>

              <h3 className="font-display text-base font-bold text-white mb-1">Add Keyword Trigger</h3>
              <p className="text-xs text-slate-400 mb-4">Reply instantly when followers message specific trigger words.</p>

              <form onSubmit={handleCreateTrigger} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Trigger Keyword *</label>
                  <input
                    type="text"
                    required
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="e.g. NOTES, RESUME, PYTHON, MENTOR"
                    className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white font-mono uppercase focus:border-royal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Automated Reply Message *</label>
                  <textarea
                    rows={3}
                    required
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Namaste! Here is your download link..."
                    className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Action Hook</label>
                  <select
                    value={newAction}
                    onChange={(e) => setNewAction(e.target.value as any)}
                    className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                  >
                    <option value="SEND_PRODUCT">Send Digital Product Link</option>
                    <option value="SEND_COUPON">Send UPI Discount Code</option>
                    <option value="BOOK_SLOT">Send 1:1 Calendar Link</option>
                  </select>
                </div>

                <RippleButton
                  type="submit"
                  className="w-full rounded-[14px] bg-royal-600 hover:bg-royal-500 py-2.5 text-xs font-bold text-white shadow-royal"
                >
                  Create Keyword Trigger
                </RippleButton>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* NEW BROADCAST MODAL */}
        {/* ========================================================================= */}
        {showNewBroadcastModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <div className="relative w-full max-w-md rounded-[24px] border border-white/[0.12] bg-[#0A0E1A] p-6 shadow-2xl text-slate-100">
              <button
                onClick={() => setShowNewBroadcastModal(false)}
                className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-white/[0.08] hover:text-white"
              >
                ×
              </button>

              <h3 className="font-display text-base font-bold text-white mb-1">Create Broadcast Campaign</h3>
              <p className="text-xs text-slate-400 mb-4">Dispatch segmented announcements to past buyers and leads.</p>

              <form onSubmit={handleCreateBroadcast} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Campaign Title *</label>
                  <input
                    type="text"
                    required
                    value={bcTitle}
                    onChange={(e) => setBcTitle(e.target.value)}
                    placeholder="e.g. Weekend Flash Sale / Course Closing"
                    className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Target Audience Segment</label>
                  <select
                    value={bcSegment}
                    onChange={(e) => setBcSegment(e.target.value)}
                    className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                  >
                    <option value="All Customers (450)">All Customers (450 Creators)</option>
                    <option value="Notes Buyers (380)">Past Digital Notes Buyers (380)</option>
                    <option value="1:1 Mentorship Alumni (70)">1:1 Mentorship Alumni (70)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Broadcast Message Text *</label>
                  <textarea
                    rows={4}
                    required
                    value={bcMessage}
                    onChange={(e) => setBcMessage(e.target.value)}
                    placeholder="Namaste! As a valued student..."
                    className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                  />
                </div>

                <RippleButton
                  type="submit"
                  className="w-full rounded-[14px] bg-royal-600 hover:bg-royal-500 py-2.5 text-xs font-bold text-white shadow-royal flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Broadcast Now</span>
                </RippleButton>
              </form>
            </div>
          </div>
        )}

      </div>
    </PageTransition>
  );
}
