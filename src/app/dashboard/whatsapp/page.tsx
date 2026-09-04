'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Sliders,
  Copy,
  Download,
  Eye,
  AlertCircle,
  HelpCircle,
  X,
  Share2,
  MousePointer,
  Link as LinkIcon,
  Layers,
  PhoneCall,
  Activity
} from 'lucide-react';
import { PageTransition, HoverCard, AnimatedCounter, RippleButton } from '@/components/ui/motion';
import { motion, AnimatePresence } from 'framer-motion';
import { formatINR, formatINRDecimal } from '@/lib/gst';

// ============================================================================
// TYPES
// ============================================================================

export interface KeywordTrigger {
  id: string;
  keyword: string;
  matchType: 'EXACT' | 'CONTAINS' | 'STARTS_WITH';
  replyMessage: string;
  actionHook: 'SEND_PRODUCT' | 'SEND_COUPON' | 'BOOK_SLOT' | 'ENROLL_COURSE' | 'CUSTOM_REPLY';
  actionPayload?: string;
  targetProduct?: string;
  isActive: boolean;
  triggersCount: number;
  lastTriggered?: string;
}

export interface BroadcastCampaign {
  id: string;
  title: string;
  targetSegment: string;
  recipientsCount: number;
  messageText: string;
  status: 'Delivered' | 'Scheduled' | 'Draft';
  deliveryRate: string;
  ctr: string;
  sentDate: string;
  clicksCount: number;
  revenueGenerated: number;
}

export interface MessageTemplate {
  id: string;
  name: string;
  category: 'TRANSACTIONAL' | 'MARKETING' | 'UTILITY';
  metaStatus: 'APPROVED' | 'IN_REVIEW' | 'DRAFT';
  headerText?: string;
  bodyText: string;
  footerText?: string;
  buttonLabel?: string;
  buttonType?: 'URL' | 'QUICK_REPLY' | 'CALL';
  variables: string[];
  dispatchesCount: number;
}

export interface ClickAnalyticItem {
  id: string;
  linkUrl: string;
  destinationName: string;
  flowSource: string;
  totalClicks: number;
  uniqueClicks: number;
  conversionsCount: number;
  conversionRate: number;
  revenueAttributed: number;
}

// ============================================================================
// INITIAL SEED DATA
// ============================================================================

const INITIAL_KEYWORD_TRIGGERS: KeywordTrigger[] = [
  {
    id: 'kw_notes',
    keyword: 'NOTES',
    matchType: 'EXACT',
    replyMessage: 'Namaste! 🙏 Here is the instant link to download the FAANG DSA 450 Notes & System Design Blueprint: creatoros.in/aarav.tech/dsa-notes. Use code BHARAT10 for 10% off today!',
    actionHook: 'SEND_PRODUCT',
    actionPayload: 'DSA 450 Master Sheet',
    targetProduct: 'Ultimate FAANG SDE & DSA Master Sheet 2025',
    isActive: true,
    triggersCount: 418,
    lastTriggered: '12 mins ago'
  },
  {
    id: 'kw_interview',
    keyword: 'INTERVIEW',
    matchType: 'CONTAINS',
    replyMessage: 'Looking to crack FAANG/Top Tech Unicorns? Book a 1:1 Mock Interview & Resume Audit slot with Aarav Sharma: creatoros.in/aarav.tech/mock-interview',
    actionHook: 'BOOK_SLOT',
    actionPayload: '1:1 FAANG Mock Interview',
    targetProduct: 'FAANG SDE Mock Coding & System Design Interview',
    isActive: true,
    triggersCount: 234,
    lastTriggered: '1 hour ago'
  },
  {
    id: 'kw_discount',
    keyword: 'DISCOUNT',
    matchType: 'EXACT',
    replyMessage: 'Exclusive 15% discount unlocked for you! 🎉 Use code CREATOR15 at 1-click UPI checkout on any digital guide or cohort: creatoros.in/aarav.tech',
    actionHook: 'SEND_COUPON',
    actionPayload: 'CREATOR15 (15% OFF)',
    isActive: true,
    triggersCount: 312,
    lastTriggered: '34 mins ago'
  },
  {
    id: 'kw_system_design',
    keyword: 'SYSTEM DESIGN',
    matchType: 'CONTAINS',
    replyMessage: 'Hey engineer! Check out our interactive System Design Architecture cohort closing this Sunday. View syllabus & enrol via UPI: creatoros.in/aarav.tech/course/sys-design',
    actionHook: 'ENROLL_COURSE',
    actionPayload: 'System Design Live Cohort',
    targetProduct: 'Mastering SDE-1 to SDE-2 Cohort',
    isActive: true,
    triggersCount: 189,
    lastTriggered: '3 hours ago'
  },
  {
    id: 'kw_resume',
    keyword: 'RESUME',
    matchType: 'STARTS_WITH',
    replyMessage: 'Boost your shortlist rate! Download 5 ATS-Proof LaTeX & Google Docs Resume templates here: creatoros.in/aarav.tech/resume-bundle',
    actionHook: 'SEND_PRODUCT',
    actionPayload: 'ATS Tech Resume Bundle',
    targetProduct: 'ATS-Proof Tech Resume Pack',
    isActive: true,
    triggersCount: 276,
    lastTriggered: '2 hours ago'
  }
];

const INITIAL_BROADCASTS: BroadcastCampaign[] = [
  {
    id: 'bc_diwali',
    title: 'Diwali Special: 20% Off All SDE Playbooks',
    targetSegment: 'Past Notes Buyers (380 Creators)',
    recipientsCount: 380,
    messageText: 'Happy Festive Season! 🪔 As a valued student, grab the System Design Masterclass with an exclusive 20% discount before slots fill up. Code: DIWALI20',
    status: 'Delivered',
    deliveryRate: '99.8%',
    ctr: '38.4%',
    sentDate: 'Yesterday at 07:30 PM IST',
    clicksCount: 146,
    revenueGenerated: 58400
  },
  {
    id: 'bc_cohort_reminder',
    title: 'Live DSA & HLD Cohort: Final 5 Seats Closing in 6h',
    targetSegment: 'Registered Webinar Attendees (195 Leads)',
    recipientsCount: 195,
    messageText: 'Final reminder! ⏳ Only 5 spots left for the Live 10-Week Cohort with Aarav Sharma. 1-click UPI enrollment link inside.',
    status: 'Delivered',
    deliveryRate: '100%',
    ctr: '44.2%',
    sentDate: '3 days ago',
    clicksCount: 86,
    revenueGenerated: 87465
  },
  {
    id: 'bc_vip_upsell',
    title: 'AI Business Coach: VIP Upsell to PDF Buyers',
    targetSegment: 'VIP Repeat Buyers (42 Primed Leads)',
    recipientsCount: 42,
    messageText: 'Namaste! As a top student who completed DSA 450, we have reserved a priority 20% loyalty voucher for the upcoming Live Cohort (CODE: FAANG20).',
    status: 'Delivered',
    deliveryRate: '100%',
    ctr: '52.4%',
    sentDate: '5 days ago',
    clicksCount: 22,
    revenueGenerated: 27489
  }
];

const INITIAL_TEMPLATES: MessageTemplate[] = [
  {
    id: 'tpl_order_receipt',
    name: 'order_receipt_download_v2',
    category: 'TRANSACTIONAL',
    metaStatus: 'APPROVED',
    headerText: 'Order Confirmation & Instant Download',
    bodyText: 'Namaste {{1}}! 🙏\n\nYour payment of ₹{{2}} for *{{3}}* is confirmed!\n\n📥 *1-Click Download Link:*\n{{4}}\n\n📄 *Official GST Tax Invoice (SAC 998431):*\n{{5}}\n\nJoin private prep community: {{6}}',
    footerText: 'CreatorOS India • Instant UPI Delivery',
    buttonLabel: 'Download PDF Now 📥',
    buttonType: 'URL',
    variables: ['buyer_name', 'amount', 'item_title', 'download_url', 'invoice_url', 'community_link'],
    dispatchesCount: 542
  },
  {
    id: 'tpl_booking_meet',
    name: 'booking_confirmed_meet_v1',
    category: 'TRANSACTIONAL',
    metaStatus: 'APPROVED',
    headerText: '1:1 Video Consultation Confirmed',
    bodyText: 'Namaste {{1}}! ✨\n\nYour 1:1 session with *{{2}}* is confirmed!\n\n🗓 *Slot:* {{3}} at {{4}} (IST)\n🔗 *Google Meet Link:* {{5}}\n\nPlease have your resume or code project link ready before joining.',
    footerText: 'Google Meet link activated',
    buttonLabel: 'Join Google Meet 🔗',
    buttonType: 'URL',
    variables: ['buyer_name', 'creator_name', 'booking_date', 'booking_time', 'meet_url'],
    dispatchesCount: 198
  },
  {
    id: 'tpl_cart_recovery',
    name: 'abandoned_cart_recovery_15m',
    category: 'MARKETING',
    metaStatus: 'APPROVED',
    headerText: 'Special 10% Discount Waiting',
    bodyText: 'Hey {{1}}! 👋\n\nWe noticed you left *{{2}}* in your cart.\n\nUse code *{{3}}* to get 10% OFF if you complete your order in the next 30 minutes:\n👉 {{4}}',
    footerText: 'Valid for next 30 minutes',
    buttonLabel: 'Claim 10% Discount ⚡',
    buttonType: 'URL',
    variables: ['buyer_name', 'product_name', 'coupon_code', 'checkout_url'],
    dispatchesCount: 310
  },
  {
    id: 'tpl_course_access',
    name: 'course_cohort_enrolled_access',
    category: 'TRANSACTIONAL',
    metaStatus: 'APPROVED',
    headerText: 'Live Cohort Access Ready',
    bodyText: 'Congratulations {{1}}! 🎓\n\nYou are enrolled in *{{2}}*!\n\n🔑 *Student Portal:* {{3}}\n📱 *Login Phone:* {{4}}\n💬 *Discord/WhatsApp Community:* {{5}}\n\nFirst live masterclass begins this Saturday at 11:00 AM IST.',
    footerText: 'CreatorOS LMS Portal',
    buttonLabel: 'Access Course Portal 🚀',
    buttonType: 'URL',
    variables: ['buyer_name', 'course_title', 'portal_url', 'buyer_phone', 'discord_url'],
    dispatchesCount: 145
  },
  {
    id: 'tpl_loyalty_upsell',
    name: 'vip_loyalty_cohort_upsell',
    category: 'MARKETING',
    metaStatus: 'APPROVED',
    headerText: 'Exclusive 20% Alumni Discount',
    bodyText: 'Namaste {{1}}! 🌟\n\nSince you mastered *{{2}}*, you qualify for our exclusive 20% alumni voucher for the upcoming *{{3}}*!\n\nUse Coupon: *{{4}}*\nRegister: {{5}}',
    footerText: 'AI Growth Engine Verified',
    buttonLabel: 'Claim VIP Seat 🎟️',
    buttonType: 'URL',
    variables: ['buyer_name', 'past_product', 'next_cohort', 'coupon_code', 'register_url'],
    dispatchesCount: 78
  }
];

const INITIAL_CLICK_ANALYTICS: ClickAnalyticItem[] = [
  {
    id: 'clk_1',
    linkUrl: 'creatoros.in/d/98421 (DSA Notes PDF)',
    destinationName: 'FAANG DSA Master Sheet Download',
    flowSource: 'Auto Product Delivery',
    totalClicks: 520,
    uniqueClicks: 418,
    conversionsCount: 402,
    conversionRate: 96.2,
    revenueAttributed: 160398
  },
  {
    id: 'clk_2',
    linkUrl: 'creatoros.in/aarav.tech/mock-interview',
    destinationName: '1:1 Google Meet Scheduler',
    flowSource: 'Keyword Trigger (#INTERVIEW)',
    totalClicks: 285,
    uniqueClicks: 234,
    conversionsCount: 192,
    conversionRate: 82.1,
    revenueAttributed: 134208
  },
  {
    id: 'clk_3',
    linkUrl: 'creatoros.in/aarav.tech/course/sys-design',
    destinationName: 'System Design Live Cohort Portal',
    flowSource: 'Broadcast Campaign (Diwali / VIP)',
    totalClicks: 310,
    uniqueClicks: 240,
    conversionsCount: 92,
    conversionRate: 38.3,
    revenueAttributed: 229908
  },
  {
    id: 'clk_4',
    linkUrl: 'creatoros.in/aarav.tech?discount=BHARAT10',
    destinationName: 'Abandoned Cart 10% UPI Checkout',
    flowSource: '15-Min Automated Nudge',
    totalClicks: 175,
    uniqueClicks: 142,
    conversionsCount: 62,
    conversionRate: 43.7,
    revenueAttributed: 24738
  },
  {
    id: 'clk_5',
    linkUrl: 'creatoros.in/aarav.tech/resume-bundle',
    destinationName: 'ATS Resume Overleaf Templates',
    flowSource: 'Keyword Trigger (#RESUME)',
    totalClicks: 320,
    uniqueClicks: 276,
    conversionsCount: 188,
    conversionRate: 68.1,
    revenueAttributed: 37412
  }
];

export default function WhatsAppAutomationPage() {
  const { whatsappLogs, activeCreator, products, orders, courses } = useCreatorStore();

  const [activeTab, setActiveTab] = useState<'preview' | 'keywords' | 'delivery' | 'broadcasts' | 'templates' | 'analytics'>('preview');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('tpl_order_receipt');
  
  // Triggers state
  const [triggers, setTriggers] = useState<KeywordTrigger[]>(INITIAL_KEYWORD_TRIGGERS);
  const [showAddTriggerModal, setShowAddTriggerModal] = useState(false);
  const [keywordSearch, setKeywordSearch] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [newMatchType, setNewMatchType] = useState<KeywordTrigger['matchType']>('EXACT');
  const [newReply, setNewReply] = useState('');
  const [newAction, setNewAction] = useState<KeywordTrigger['actionHook']>('SEND_PRODUCT');
  const [newPayload, setNewPayload] = useState('');

  // Broadcasts state
  const [broadcasts, setBroadcasts] = useState<BroadcastCampaign[]>(INITIAL_BROADCASTS);
  const [showNewBroadcastModal, setShowNewBroadcastModal] = useState(false);
  const [bcTitle, setBcTitle] = useState('');
  const [bcSegment, setBcSegment] = useState('All Customers (450)');
  const [bcMessage, setBcMessage] = useState('');
  const [bcScheduledTime, setBcScheduledTime] = useState('Instant');

  // Templates state
  const [templates, setTemplates] = useState<MessageTemplate[]>(INITIAL_TEMPLATES);
  const [showNewTemplateModal, setShowNewTemplateModal] = useState(false);
  const [tplName, setTplName] = useState('');
  const [tplCategory, setTplCategory] = useState<MessageTemplate['category']>('MARKETING');
  const [tplHeader, setTplHeader] = useState('');
  const [tplBody, setTplBody] = useState('');
  const [tplButton, setTplButton] = useState('');

  // Click Analytics state
  const [clickAnalytics, setClickAnalytics] = useState<ClickAnalyticItem[]>(INITIAL_CLICK_ANALYTICS);

  // Phone Simulator state
  const [deviceModel, setDeviceModel] = useState<'iphone' | 'android' | 'desktop'>('iphone');
  const [simInput, setSimInput] = useState('');
  const [simMessages, setSimMessages] = useState<Array<{ 
    id: string; 
    sender: 'user' | 'bot'; 
    text: string; 
    time: string; 
    sub?: string;
    actionButton?: { label: string; url?: string };
  }>>([
    {
      id: 'm1',
      sender: 'bot',
      text: `Namaste Rahul! 🙏 Your payment of ₹499 for *Ultimate FAANG SDE & DSA Master Sheet 2025* is confirmed!\n\n📥 *1-Click Download Link:*\nhttps://creatoros.in/d/98421\n\n📄 *GST Tax Invoice (SAC 998431):*\nhttps://creatoros.in/invoice/INV-2026-00101.pdf\n\nJoin private prep group: https://chat.whatsapp.com/FAANG-Prep`,
      time: '9:41 PM',
      sub: '📥 Automated Instant Delivery • GST SAC 998431',
      actionButton: { label: 'Download PDF Now 📥', url: 'https://creatoros.in/downloads/FAANG-DSA-MasterSheet.pdf' }
    }
  ]);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0];

  // Simulator typing & automated response
  const handleSimSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simInput.trim()) return;

    const userText = simInput.trim();
    const timeNow = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const userMsgId = `usr_${Date.now()}`;
    
    // Add user message
    setSimMessages((prev) => [
      ...prev, 
      { id: userMsgId, sender: 'user', text: userText, time: timeNow }
    ]);
    setSimInput('');

    // Check keyword matching
    setTimeout(() => {
      const match = triggers.find(t => {
        if (!t.isActive) return false;
        const upperUser = userText.toUpperCase();
        const upperKw = t.keyword.toUpperCase();

        if (t.matchType === 'EXACT') return upperUser === upperKw;
        if (t.matchType === 'CONTAINS') return upperUser.includes(upperKw);
        if (t.matchType === 'STARTS_WITH') return upperUser.startsWith(upperKw);
        return false;
      });

      const botTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

      if (match) {
        // Increment trigger count
        setTriggers(prev => prev.map(tr => tr.id === match.id ? { ...tr, triggersCount: tr.triggersCount + 1, lastTriggered: 'Just now' } : tr));
        
        let buttonLabel: string | undefined;
        if (match.actionHook === 'SEND_PRODUCT') buttonLabel = '📥 Download Asset';
        else if (match.actionHook === 'BOOK_SLOT') buttonLabel = '🗓 Book Google Meet';
        else if (match.actionHook === 'SEND_COUPON') buttonLabel = '🏷 Apply Coupon';
        else if (match.actionHook === 'ENROLL_COURSE') buttonLabel = '🎓 Enroll in Cohort';

        setSimMessages((prev) => [
          ...prev,
          {
            id: `bot_${Date.now()}`,
            sender: 'bot',
            text: match.replyMessage,
            time: botTime,
            sub: `⚡ Keyword Match: #${match.keyword} (${match.actionHook})`,
            actionButton: buttonLabel ? { label: buttonLabel } : undefined
          }
        ]);
      } else {
        setSimMessages((prev) => [
          ...prev,
          {
            id: `bot_${Date.now()}`,
            sender: 'bot',
            text: `Namaste! 🙏 Thanks for reaching out to ${activeCreator?.name}. \n\nType *NOTES* for DSA & System Design sheets, *INTERVIEW* to book 1:1 mocks, *DISCOUNT* for 15% off coupon codes, or *RESUME* for LaTeX templates.`,
            time: botTime,
            sub: '🤖 Smart Auto-Assistant (CreatorOS)'
          }
        ]);
      }
    }, 450);
  };

  // Create Trigger
  const handleCreateTrigger = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim() || !newReply.trim()) return;

    const created: KeywordTrigger = {
      id: `kw_${Date.now()}`,
      keyword: newKeyword.trim().toUpperCase(),
      matchType: newMatchType,
      replyMessage: newReply.trim(),
      actionHook: newAction,
      actionPayload: newPayload || newAction,
      isActive: true,
      triggersCount: 0,
      lastTriggered: 'Never'
    };

    setTriggers((prev) => [created, ...prev]);
    setShowAddTriggerModal(false);
    setNewKeyword('');
    setNewReply('');
    setNewPayload('');
    showToast(`✨ Keyword trigger #${created.keyword} activated! Dispatches automatically on inbound message.`);
  };

  // Create Broadcast
  const handleCreateBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bcTitle.trim() || !bcMessage.trim()) return;

    const recipients = bcSegment.includes('All') ? 450 : bcSegment.includes('Notes') ? 380 : 70;
    const created: BroadcastCampaign = {
      id: `bc_${Date.now()}`,
      title: bcTitle.trim(),
      targetSegment: bcSegment,
      recipientsCount: recipients,
      messageText: bcMessage.trim(),
      status: 'Delivered',
      deliveryRate: '100%',
      ctr: '42.1%',
      sentDate: 'Just now',
      clicksCount: Math.round(recipients * 0.42),
      revenueGenerated: Math.round(recipients * 0.42 * 399)
    };

    setBroadcasts((prev) => [created, ...prev]);
    setShowNewBroadcastModal(false);
    setBcTitle('');
    setBcMessage('');
    showToast(`📢 Broadcast "${created.title}" dispatched to ${created.recipientsCount} creators via Meta WhatsApp Cloud API!`);
  };

  // Create Template
  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tplName.trim() || !tplBody.trim()) return;

    const created: MessageTemplate = {
      id: `tpl_${Date.now()}`,
      name: tplName.toLowerCase().replace(/\s+/g, '_'),
      category: tplCategory,
      metaStatus: 'APPROVED',
      headerText: tplHeader || undefined,
      bodyText: tplBody,
      footerText: 'CreatorOS India • Verified Automation',
      buttonLabel: tplButton || undefined,
      buttonType: tplButton ? 'URL' : undefined,
      variables: ['buyer_name', 'product_title', 'amount'],
      dispatchesCount: 0
    };

    setTemplates((prev) => [created, ...prev]);
    setShowNewTemplateModal(false);
    setTplName('');
    setTplHeader('');
    setTplBody('');
    setTplButton('');
    showToast(`📝 Message Template "${created.name}" registered and approved!`);
  };

  const filteredTriggers = triggers.filter(t => 
    t.keyword.toLowerCase().includes(keywordSearch.toLowerCase()) ||
    t.replyMessage.toLowerCase().includes(keywordSearch.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="space-y-6 font-sans">
        
        {/* Floating Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-6 right-6 z-50 rounded-[18px] bg-[#0E1528] border border-emerald-500/40 p-4 text-white text-xs shadow-2xl flex items-center gap-3 backdrop-blur-xl max-w-md"
            >
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <span className="font-bold text-white block">WhatsApp Action Successful</span>
                <p className="text-slate-300 text-[11px] mt-0.5">{toastMessage}</p>
              </div>
              <button
                onClick={() => setToastMessage(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div className="space-y-1">
            <h1 className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>WhatsApp Automation Engine</span>
              <span className="rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 font-mono">
                99.8% Open Rate
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              End-to-end automated product delivery, keyword triggers, broadcast campaigns, and verified Meta Cloud API telemetry.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 rounded-[14px] border border-emerald-500/30 bg-emerald-950/40 px-3.5 py-2 text-xs font-semibold text-emerald-400 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Official Cloud API Active (80 msg/sec)</span>
            </div>
          </div>
        </div>

        {/* 4 CORE TELEMETRY METRIC TILES */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-emerald-500/30">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-medium">Total Messages Dispatched</span>
              <Send className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-white font-mono">
              <AnimatedCounter value={whatsappLogs.length + 1280} />
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 mt-1 font-mono">
              <CheckCheck className="h-3.5 w-3.5" />
              <span>99.8% Delivery • 98.2% Read Rate</span>
            </div>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-medium">Link CTR & Velocity</span>
              <TrendingUp className="h-4 w-4 text-royal-400" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-royal-400 font-mono">
              <AnimatedCounter value={38.4} decimals={1} suffix="%" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">13.7x higher than traditional email</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-pink-500/30">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-medium">Avg. Read Speed</span>
              <Clock className="h-4 w-4 text-pink-400" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-pink-400 font-mono">
              <AnimatedCounter value={42} suffix=" sec" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Direct lockscreen push notification</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-amber-500/30">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-medium">Attributed WhatsApp Revenue</span>
              <ShoppingBag className="h-4 w-4 text-amber-400" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
              <AnimatedCounter value={184200} prefix="₹" />
            </div>
            <p className="text-[11px] text-emerald-400 mt-1 font-mono">+₹48.2k Abandoned Cart Recoveries</p>
          </HoverCard>
        </div>

        {/* 6 NAVIGATION TABS */}
        <div className="flex items-center gap-1.5 p-1 rounded-[16px] bg-white/[0.04] border border-white/[0.08] overflow-x-auto no-scrollbar">
          {[
            { id: 'preview', label: '1. Live Conversation Preview & Simulator' },
            { id: 'keywords', label: '2. Keyword Triggers (5 Active)' },
            { id: 'delivery', label: '3. Auto Product Delivery & Invoices' },
            { id: 'broadcasts', label: '4. Broadcast Campaigns' },
            { id: 'templates', label: '5. Message Templates' },
            { id: 'analytics', label: '6. Click Analytics' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-[12px] text-xs font-semibold whitespace-nowrap transition btn-press ${
                activeTab === tab.id
                  ? 'bg-royal-600 text-white shadow-royal-sm ring-1 ring-royal-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: LIVE CONVERSATION PREVIEW & INTERACTIVE CHAT SIMULATOR */}
        {/* ========================================================================= */}
        {activeTab === 'preview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Template & Flow Selector (7 cols) */}
            <div className="lg:col-span-7 rounded-[22px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div>
                  <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-emerald-400" />
                    <span>Select Automation Flow to Test</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Click any automation scenario to see exactly how it renders on the simulated customer device.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {templates.map((tpl) => (
                  <HoverCard hoverY={-2} key={tpl.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTemplateId(tpl.id);
                        // Update simulator with sample message
                        let text = tpl.bodyText
                          .replace('{{1}}', 'Rahul Deshmukh')
                          .replace('{{2}}', '₹499')
                          .replace('{{3}}', 'Ultimate FAANG SDE & DSA Master Sheet')
                          .replace('{{4}}', 'https://creatoros.in/d/98421')
                          .replace('{{5}}', 'https://creatoros.in/invoice/INV-2026-00101.pdf')
                          .replace('{{6}}', 'https://chat.whatsapp.com/FAANG-Prep');
                        
                        setSimMessages([
                          {
                            id: `tpl_msg_${Date.now()}`,
                            sender: 'bot',
                            text,
                            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
                            sub: `📝 Template: ${tpl.name}`,
                            actionButton: tpl.buttonLabel ? { label: tpl.buttonLabel } : undefined
                          }
                        ]);
                      }}
                      className={`w-full text-left p-4 rounded-[18px] border transition ${
                        selectedTemplateId === tpl.id
                          ? 'border-royal-500 bg-royal-600/15 shadow-royal-sm ring-1 ring-royal-500/40'
                          : 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-xs text-white">{tpl.headerText || tpl.name}</span>
                          <span className="rounded bg-emerald-500/15 text-emerald-400 text-[9px] font-bold px-2 py-0.5 font-mono">
                            {tpl.metaStatus}
                          </span>
                        </div>
                        <span className="rounded bg-royal-600/20 text-royal-300 text-[9px] font-bold px-2 py-0.5 font-mono">
                          {tpl.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed whitespace-pre-line">
                        {tpl.bodyText}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-2 pt-2 border-t border-white/[0.04]">
                        <span>{tpl.dispatchesCount} Total Dispatched</span>
                        <span className="text-royal-300">Click to preview on phone →</span>
                      </div>
                    </button>
                  </HoverCard>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive WhatsApp Smartphone Simulator (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              
              {/* Device Selector Controls */}
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] mb-3 text-xs">
                <button
                  onClick={() => setDeviceModel('iphone')}
                  className={`px-3 py-1 rounded-lg transition font-medium ${
                    deviceModel === 'iphone' ? 'bg-royal-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  iPhone View
                </button>
                <button
                  onClick={() => setDeviceModel('android')}
                  className={`px-3 py-1 rounded-lg transition font-medium ${
                    deviceModel === 'android' ? 'bg-royal-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Android Pixel
                </button>
                <button
                  onClick={() => setDeviceModel('desktop')}
                  className={`px-3 py-1 rounded-lg transition font-medium ${
                    deviceModel === 'desktop' ? 'bg-royal-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  WhatsApp Web
                </button>
              </div>

              {/* Phone Mockup Frame */}
              <div className={`w-full ${deviceModel === 'desktop' ? 'max-w-[420px]' : 'max-w-[360px]'} rounded-[36px] overflow-hidden border-4 border-[#1F2937] bg-[#070D14] shadow-2xl`}>
                
                {/* Simulated Phone Top Speaker & Notch */}
                <div className="h-5 bg-[#111827] flex items-center justify-center relative">
                  <div className="h-2 w-20 bg-[#374151] rounded-full" />
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
                    <p className="text-[10px] text-emerald-400 font-mono">Official Verified Business</p>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <PhoneCall className="h-4 w-4" />
                  </div>
                </div>

                {/* Chat Scroll View */}
                <div className="p-3.5 space-y-3 min-h-[340px] max-h-[380px] overflow-y-auto bg-[#070D14] text-xs">
                  <div className="rounded-lg bg-[#0E1B29] p-1 text-center text-[9px] text-slate-400 max-w-[210px] mx-auto border border-white/[0.04]">
                    🔒 End-to-end encrypted with Meta Cloud API
                  </div>

                  {/* Message Bubbles */}
                  {simMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-[16px] text-[11px] leading-relaxed shadow-sm space-y-1.5 ${
                        msg.sender === 'user'
                          ? 'bg-[#054640] text-white rounded-tr-sm ml-auto max-w-[75%]'
                          : 'bg-[#16365C] text-white rounded-tl-sm mr-auto max-w-[85%] border border-royal-500/30'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.text}</p>
                      
                      {/* Action Button if attached */}
                      {msg.actionButton && (
                        <div className="pt-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              showToast(`Tapped "${msg.actionButton?.label}" in simulated client!`);
                            }}
                            className="w-full rounded-[10px] bg-royal-600 hover:bg-royal-500 text-white font-bold py-1.5 px-3 text-[11px] transition flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <span>{msg.actionButton.label}</span>
                            <ExternalLink className="h-3 w-3" />
                          </button>
                        </div>
                      )}

                      {msg.sub && (
                        <p className="text-[9px] text-royal-300 font-mono pt-0.5 border-t border-white/[0.04]">
                          {msg.sub}
                        </p>
                      )}

                      <div className="flex items-center justify-end gap-1 text-[8px] text-slate-400 pt-0.5">
                        <span>{msg.time}</span>
                        {msg.sender === 'bot' && <CheckCheck className="h-3 w-3 text-cyan-300 inline" />}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Interactive Test Chat Input */}
                <form onSubmit={handleSimSend} className="bg-[#121E2C] p-2.5 flex items-center gap-2 border-t border-white/[0.08]">
                  <input
                    type="text"
                    value={simInput}
                    onChange={(e) => setSimInput(e.target.value)}
                    placeholder="Type 'NOTES', 'INTERVIEW', or 'DISCOUNT'..."
                    className="flex-1 rounded-[12px] bg-black/50 border border-white/[0.1] px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-royal-500"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-[12px] bg-emerald-600 hover:bg-emerald-500 text-white transition btn-press shrink-0"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>

              </div>
              
              <div className="flex items-center gap-2 mt-2.5 text-[11px] text-slate-400 font-mono">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                <span>Type in the box above to test live keyword auto-replies!</span>
              </div>
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
                  <span>Inbound Keyword Auto-Responders</span>
                  <span className="rounded-full bg-royal-600/15 text-royal-300 px-2 py-0.5 text-[11px] font-mono">
                    {triggers.length} Active Triggers
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  When potential buyers message these keywords from Instagram reels, YouTube videos, or LinkedIn, CreatorOS responds in &lt;2 seconds.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={keywordSearch}
                    onChange={(e) => setKeywordSearch(e.target.value)}
                    placeholder="Search keywords..."
                    className="rounded-[12px] bg-black/40 border border-white/[0.1] pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-royal-500"
                  />
                </div>

                <RippleButton
                  onClick={() => setShowAddTriggerModal(true)}
                  className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-4 py-2 text-xs font-bold text-white shadow-royal flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Keyword</span>
                </RippleButton>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTriggers.map((trigger) => (
                <HoverCard
                  hoverY={-2}
                  key={trigger.id}
                  className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="rounded-[10px] bg-royal-600/20 text-royal-300 border border-royal-500/30 px-2.5 py-1 text-xs font-mono font-bold">
                          #{trigger.keyword}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">({trigger.matchType})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setTriggers(prev => prev.map(t => t.id === trigger.id ? { ...t, isActive: !t.isActive } : t));
                            showToast(`Trigger #${trigger.keyword} ${trigger.isActive ? 'paused' : 'activated'}`);
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
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/[0.06] text-xs">
                    <div className="flex justify-between items-center text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Zap className="h-3.5 w-3.5 text-royal-400" />
                        <span>Action: <strong>{trigger.actionPayload || trigger.actionHook}</strong></span>
                      </span>
                      <span className="text-emerald-400 font-mono font-semibold">
                        {trigger.triggersCount} Dispatched
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono pt-1">
                      <span>Last: {trigger.lastTriggered || 'Recent'}</span>
                      <button
                        onClick={() => {
                          setTriggers(prev => prev.filter(t => t.id !== trigger.id));
                          showToast(`Deleted trigger #${trigger.keyword}`);
                        }}
                        className="text-slate-500 hover:text-rose-400 transition"
                        title="Delete Trigger"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </HoverCard>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: AUTO PRODUCT DELIVERY & GST INVOICES */}
        {/* ========================================================================= */}
        {activeTab === 'delivery' && (
          <div className="space-y-6">
            <div className="rounded-[22px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.06]">
                <div>
                  <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                    <Zap className="h-4 w-4 text-emerald-400" />
                    <span>Instant Fulfillment Rules (T+0 Auto Delivery)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Every completed 1-click UPI checkout triggers sub-30-second automated WhatsApp dispatch with official Indian tax invoices.
                  </p>
                </div>
                <div className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-mono font-bold text-emerald-400">
                  Avg Delivery: 18 Seconds
                </div>
              </div>

              {/* Delivery Types Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-[18px] bg-white/[0.03] border border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-2 text-royal-400 text-xs font-bold">
                    <FileText className="h-4 w-4" />
                    <span>Digital Products & Notes</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Auto-delivers secure 1-click PDF download link with SAC 998431 GST Tax Invoice attached.
                  </p>
                  <span className="text-[10px] text-emerald-400 font-mono block">Status: 100% Automated ✓</span>
                </div>

                <div className="p-4 rounded-[18px] bg-white/[0.03] border border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 text-xs font-bold">
                    <Calendar className="h-4 w-4" />
                    <span>1:1 Video Consultations</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Generates Google Meet link, time slot in IST, and calendar invite. Sends reminder 30 mins before.
                  </p>
                  <span className="text-[10px] text-emerald-400 font-mono block">Status: 100% Automated ✓</span>
                </div>

                <div className="p-4 rounded-[18px] bg-white/[0.03] border border-white/[0.06] space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                    <ShoppingBag className="h-4 w-4" />
                    <span>15-Min Abandoned Recovery</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Triggers personalized WhatsApp follow-up with exclusive 10% coupon if buyer drops off at UPI modal.
                  </p>
                  <span className="text-[10px] text-emerald-400 font-mono block">Status: 100% Automated ✓</span>
                </div>
              </div>

              {/* Live Dispatch Logs Table */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Live Dispatch Log Stream ({whatsappLogs.length} Recent Records)
                </span>

                <div className="rounded-[16px] border border-white/[0.08] overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-white/[0.04] text-slate-400 text-[10px] uppercase font-mono">
                      <tr>
                        <th className="p-3">Time</th>
                        <th className="p-3">Recipient</th>
                        <th className="p-3">Trigger Event</th>
                        <th className="p-3">Template</th>
                        <th className="p-3">Delivery Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04] font-sans">
                      {whatsappLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-white/[0.02]">
                          <td className="p-3 font-mono text-slate-400 text-[11px]">{log.sentAt}</td>
                          <td className="p-3">
                            <span className="font-semibold text-white block">{log.recipientName}</span>
                            <span className="font-mono text-[10px] text-slate-400">{log.recipientPhone}</span>
                          </td>
                          <td className="p-3 text-royal-300">{log.triggerEvent}</td>
                          <td className="p-3 font-mono text-[11px] text-slate-400">{log.templateName}</td>
                          <td className="p-3">
                            <span className="rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold font-mono">
                              ✓ {log.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: BROADCAST CAMPAIGNS */}
        {/* ========================================================================= */}
        {activeTab === 'broadcasts' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                  <span>Segmented WhatsApp Broadcast Campaigns</span>
                  <span className="rounded-full bg-emerald-500/15 text-emerald-400 px-2.5 py-0.5 text-[11px] font-mono">
                    High Conversion
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Send targeted festive discounts, course announcements, or VIP upsells with 99.8% open rates and instant link tracking.
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

            <div className="space-y-3.5">
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
                        <span className="text-slate-400 text-[10px] block">Recipients</span>
                        <span className="text-white font-bold">{b.recipientsCount}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Delivery Rate</span>
                        <span className="text-emerald-400 font-bold">{b.deliveryRate}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">CTR</span>
                        <span className="text-royal-400 font-bold">{b.ctr}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[10px] block">Revenue</span>
                        <span className="text-emerald-400 font-bold">₹{b.revenueGenerated.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-[14px] bg-black/40 border border-white/[0.06] text-xs text-slate-200 leading-relaxed">
                    "{b.messageText}"
                  </div>
                </HoverCard>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: MESSAGE TEMPLATES */}
        {/* ========================================================================= */}
        {activeTab === 'templates' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                  <span>Meta WhatsApp Cloud API Verified Templates</span>
                  <span className="rounded-full bg-emerald-500/15 text-emerald-400 px-2 py-0.5 text-[11px] font-mono">
                    {templates.length} Approved
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Pre-approved templates with dynamic placeholders compliant with WhatsApp Business Messaging policies.
                </p>
              </div>

              <RippleButton
                onClick={() => setShowNewTemplateModal(true)}
                className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-4 py-2.5 text-xs font-bold text-white shadow-royal flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Plus className="h-4 w-4" />
                <span>Create Template</span>
              </RippleButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((tpl) => (
                <HoverCard
                  hoverY={-2}
                  key={tpl.id}
                  className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-royal-300">
                        {tpl.name}
                      </span>
                      <span className="rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-[9px] font-bold px-2 py-0.5 font-mono">
                        {tpl.metaStatus}
                      </span>
                    </div>

                    {tpl.headerText && (
                      <p className="text-xs font-bold text-white">{tpl.headerText}</p>
                    )}

                    <div className="p-3 rounded-[14px] bg-black/40 border border-white/[0.06] text-xs text-slate-300 whitespace-pre-line leading-relaxed">
                      {tpl.bodyText}
                    </div>

                    {tpl.buttonLabel && (
                      <div className="rounded-[10px] bg-royal-600/20 text-royal-300 border border-royal-500/30 px-3 py-1.5 text-center text-xs font-bold">
                        {tpl.buttonLabel}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-2 border-t border-white/[0.06]">
                    <span>Category: {tpl.category}</span>
                    <span className="text-emerald-400 font-bold">{tpl.dispatchesCount} Dispatches</span>
                  </div>
                </HoverCard>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: CLICK & CONVERSION ANALYTICS */}
        {/* ========================================================================= */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            
            {/* Top Aggregated Metric Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-4 rounded-[18px] bg-black/40 border border-white/[0.06]">
                <span className="text-[10px] text-slate-400 block">Total WhatsApp Clicks</span>
                <span className="font-bold text-white text-xl">1,610</span>
                <span className="text-emerald-400 text-[10px] block mt-0.5">+48% this month</span>
              </div>
              <div className="p-4 rounded-[18px] bg-black/40 border border-white/[0.06]">
                <span className="text-[10px] text-slate-400 block">Avg. Conversion Rate</span>
                <span className="font-bold text-emerald-400 text-xl">65.7%</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">Visits to Paid Orders</span>
              </div>
              <div className="p-4 rounded-[18px] bg-black/40 border border-white/[0.06]">
                <span className="text-[10px] text-slate-400 block">Attributed Revenue</span>
                <span className="font-bold text-royal-400 text-xl">₹5,86,750</span>
                <span className="text-royal-300 text-[10px] block mt-0.5">T+0 Bank Settled</span>
              </div>
              <div className="p-4 rounded-[18px] bg-black/40 border border-white/[0.06]">
                <span className="text-[10px] text-slate-400 block">Meta API Uptime</span>
                <span className="font-bold text-emerald-400 text-xl">99.99%</span>
                <span className="text-slate-400 text-[10px] block mt-0.5">0 Failed Dispatches</span>
              </div>
            </div>

            {/* Click Telemetry Data Table */}
            <div className="rounded-[22px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                    <MousePointer className="h-4 w-4 text-royal-400" />
                    <span>WhatsApp Link Attribution & Purchase Velocity</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Real-time link click-through and payment conversion tracking across all automated WhatsApp flows.
                  </p>
                </div>
              </div>

              <div className="rounded-[16px] border border-white/[0.08] overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-white/[0.04] text-slate-400 text-[10px] uppercase font-mono">
                    <tr>
                      <th className="p-3">Tracked Link & Asset</th>
                      <th className="p-3">Automation Source</th>
                      <th className="p-3">Total Clicks</th>
                      <th className="p-3">Conversions</th>
                      <th className="p-3">Conv. Rate</th>
                      <th className="p-3">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {clickAnalytics.map((item) => (
                      <tr key={item.id} className="hover:bg-white/[0.02]">
                        <td className="p-3">
                          <span className="font-semibold text-white block">{item.destinationName}</span>
                          <span className="font-mono text-[10px] text-royal-300">{item.linkUrl}</span>
                        </td>
                        <td className="p-3 text-slate-300">{item.flowSource}</td>
                        <td className="p-3 font-mono font-bold text-white">{item.totalClicks}</td>
                        <td className="p-3 font-mono text-emerald-400 font-semibold">{item.conversionsCount} Orders</td>
                        <td className="p-3">
                          <span className="rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold font-mono">
                            {item.conversionRate}%
                          </span>
                        </td>
                        <td className="p-3 font-mono font-bold text-emerald-400">
                          ₹{item.revenueAttributed.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL 1: ADD KEYWORD TRIGGER */}
        {/* ========================================================================= */}
        {showAddTriggerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-md rounded-[24px] border border-white/[0.12] bg-[#0A0E1A] p-6 shadow-2xl text-slate-100 space-y-4"
            >
              <button
                onClick={() => setShowAddTriggerModal(false)}
                className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-white/[0.08] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div>
                <h3 className="font-display text-base font-bold text-white">Create Keyword Auto-Responder</h3>
                <p className="text-xs text-slate-400 mt-0.5">Reply in &lt;2 seconds when followers send specific trigger phrases.</p>
              </div>

              <form onSubmit={handleCreateTrigger} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Trigger Keyword / Phrase *</label>
                  <input
                    type="text"
                    required
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="e.g. NOTES, MENTOR, DSA, ROADMAP"
                    className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white font-mono uppercase focus:border-royal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Match Type</label>
                  <select
                    value={newMatchType}
                    onChange={(e) => setNewMatchType(e.target.value as any)}
                    className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                  >
                    <option value="EXACT">EXACT (matches only '#NOTES')</option>
                    <option value="CONTAINS">CONTAINS (matches 'send me NOTES please')</option>
                    <option value="STARTS_WITH">STARTS WITH (matches 'NOTES 2025')</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Action Hook & Asset Link</label>
                  <select
                    value={newAction}
                    onChange={(e) => setNewAction(e.target.value as any)}
                    className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                  >
                    <option value="SEND_PRODUCT">Send Digital Product Download Link</option>
                    <option value="SEND_COUPON">Send Exclusive UPI Discount Code</option>
                    <option value="BOOK_SLOT">Send 1:1 Booking Calendar Link</option>
                    <option value="ENROLL_COURSE">Send Course Cohort Enrollment Portal</option>
                    <option value="CUSTOM_REPLY">Custom Text Reply</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Automated WhatsApp Response *</label>
                  <textarea
                    rows={3}
                    required
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Namaste! 🙏 Here is your link: creatoros.in/aarav.tech..."
                    className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                  />
                </div>

                <RippleButton
                  type="submit"
                  className="w-full rounded-[14px] bg-royal-600 hover:bg-royal-500 py-2.5 text-xs font-bold text-white shadow-royal"
                >
                  Activate Keyword Trigger
                </RippleButton>
              </form>
            </motion.div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL 2: NEW BROADCAST CAMPAIGN */}
        {/* ========================================================================= */}
        {showNewBroadcastModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-md rounded-[24px] border border-white/[0.12] bg-[#0A0E1A] p-6 shadow-2xl text-slate-100 space-y-4"
            >
              <button
                onClick={() => setShowNewBroadcastModal(false)}
                className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-white/[0.08] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div>
                <h3 className="font-display text-base font-bold text-white">Create WhatsApp Broadcast</h3>
                <p className="text-xs text-slate-400 mt-0.5">Send targeted announcements to segmented Indian customer lists.</p>
              </div>

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
                    <option value="VIP Repeat Buyers (42)">VIP Repeat Buyers (42)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Broadcast Message Text *</label>
                  <textarea
                    rows={4}
                    required
                    value={bcMessage}
                    onChange={(e) => setBcMessage(e.target.value)}
                    placeholder="Namaste! As a valued student, grab the System Design Masterclass..."
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
            </motion.div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL 3: CREATE MESSAGE TEMPLATE */}
        {/* ========================================================================= */}
        {showNewTemplateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full max-w-md rounded-[24px] border border-white/[0.12] bg-[#0A0E1A] p-6 shadow-2xl text-slate-100 space-y-4"
            >
              <button
                onClick={() => setShowNewTemplateModal(false)}
                className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-white/[0.08] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div>
                <h3 className="font-display text-base font-bold text-white">Create Meta Cloud Template</h3>
                <p className="text-xs text-slate-400 mt-0.5">Register a message template with variables for official Meta approval.</p>
              </div>

              <form onSubmit={handleCreateTemplate} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Template Name *</label>
                  <input
                    type="text"
                    required
                    value={tplName}
                    onChange={(e) => setTplName(e.target.value)}
                    placeholder="e.g. festive_discount_offer"
                    className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white font-mono lowercase focus:border-royal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                  <select
                    value={tplCategory}
                    onChange={(e) => setTplCategory(e.target.value as any)}
                    className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                  >
                    <option value="MARKETING">MARKETING (Promotions, Discounts)</option>
                    <option value="TRANSACTIONAL">TRANSACTIONAL (Receipts, Links, Invoices)</option>
                    <option value="UTILITY">UTILITY (Reminders, Account Updates)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Header Text (Optional)</label>
                  <input
                    type="text"
                    value={tplHeader}
                    onChange={(e) => setTplHeader(e.target.value)}
                    placeholder="e.g. Exclusive Weekend Masterclass"
                    className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Template Body (Use {'{{1}}'}, {'{{2}}'} for variables) *</label>
                  <textarea
                    rows={4}
                    required
                    value={tplBody}
                    onChange={(e) => setTplBody(e.target.value)}
                    placeholder="Namaste {{1}}! Your order for {{2}} is ready..."
                    className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Action Button Text (Optional)</label>
                  <input
                    type="text"
                    value={tplButton}
                    onChange={(e) => setTplButton(e.target.value)}
                    placeholder="e.g. Download PDF Now 📥"
                    className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                  />
                </div>

                <RippleButton
                  type="submit"
                  className="w-full rounded-[14px] bg-royal-600 hover:bg-royal-500 py-2.5 text-xs font-bold text-white shadow-royal"
                >
                  Submit for Instant Meta Approval
                </RippleButton>
              </form>
            </motion.div>
          </div>
        )}

      </div>
    </PageTransition>
  );
}
