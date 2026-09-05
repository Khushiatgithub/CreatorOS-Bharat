'use client';

import React, { useState, useMemo } from 'react';
import { useCreatorStore } from '@/lib/store';
import { formatINR } from '@/lib/gst';
import { 
  Briefcase, 
  Sparkles, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  CheckCircle2,
  ShieldCheck, 
  ArrowRight, 
  Send, 
  X, 
  FileCheck, 
  Search, 
  Filter, 
  Flame, 
  Zap, 
  Tag, 
  TrendingUp, 
  Layers, 
  Building2, 
  Share2, 
  Check, 
  Bookmark, 
  BookmarkCheck, 
  ExternalLink, 
  Calendar, 
  ChevronRight, 
  ShieldAlert, 
  Info,
  SlidersHorizontal,
  Lock,
  Unlock,
  FileText,
  Percent,
  Play,
  Copy,
  BarChart3,
  HelpCircle,
  RefreshCw,
  Download,
  AlertCircle,
  Eye
} from 'lucide-react';
import { BrandCollabBrief, BrandProposal } from '@/types';
import { PageTransition, HoverCard, RippleButton, AnimatedCounter } from '@/components/ui/motion';
import { motion, AnimatePresence } from 'framer-motion';

export default function BrandMarketplaceLiveBoard() {
  const { 
    brandBriefs, 
    brandProposals, 
    applyToBrandBrief, 
    updateProposalStatus,
    submitProposalDeliverable,
    activeCreator,
    mediaKit
  } = useCreatorStore();

  // Navigation & Filter states
  const [activeTab, setActiveTab] = useState<'explore' | 'saved' | 'tracking' | 'insights'>('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedBudgetFilter, setSelectedBudgetFilter] = useState<string>('ALL');
  const [selectedPlatformFilter, setSelectedPlatformFilter] = useState<string>('ALL');
  const [selectedMatchFilter, setSelectedMatchFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'match' | 'budget' | 'deadline' | 'popular'>('match');
  const [savedBriefIds, setSavedBriefIds] = useState<string[]>(['brief_boat', 'brief_cred', 'brief_nothing']);

  // Deal tracking pipeline filter
  const [trackingFilter, setTrackingFilter] = useState<string>('ALL');

  // Drawers & Modals
  const [drawerBrief, setDrawerBrief] = useState<BrandCollabBrief | null>(null);
  const [pitchBrief, setPitchBrief] = useState<BrandCollabBrief | null>(null);
  const [matchModalBrief, setMatchModalBrief] = useState<BrandCollabBrief | null>(null);
  const [deliverableModalProp, setDeliverableModalProp] = useState<BrandProposal | null>(null);

  // Multi-step Proposal Form State
  const [formStep, setFormStep] = useState<1 | 2 | 3 | 4>(1);
  const [proposedAmount, setProposedAmount] = useState<number>(110000);
  const [selectedDeliverables, setSelectedDeliverables] = useState<string[]>([]);
  const [pitch, setPitch] = useState('');
  const [selectedHook, setSelectedHook] = useState('');
  const [timelineDays, setTimelineDays] = useState<number>(7);
  const [whitelistingAddon, setWhitelistingAddon] = useState(false);
  const [rawFootageAddon, setRawFootageAddon] = useState(false);
  const [exclusivityAddon, setExclusivityAddon] = useState(false);
  const [submittedProposalId, setSubmittedProposalId] = useState<string | null>(null);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Deliverable submission sub-form state
  const [deliverableTitle, setDeliverableTitle] = useState('Instagram 4K Reel (Live)');
  const [deliverableUrl, setDeliverableUrl] = useState('');
  const [deliverablePlatform, setDeliverablePlatform] = useState('Instagram');
  const [deliverableViews, setDeliverableViews] = useState('145,000 Views');
  const [deliverableEngagement, setDeliverableEngagement] = useState('7.6% Engagement');

  // Copy helper feedback
  const [copiedEscrowId, setCopiedEscrowId] = useState<string | null>(null);

  const toggleSaveBrief = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSavedBriefIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filtered campaigns for Explore & Saved tabs
  const filteredCampaigns = useMemo(() => {
    return brandBriefs
      .filter((brief) => {
        // Search filter
        const matchesSearch = 
          brief.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          brief.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (brief.category && brief.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (brief.industry && brief.industry.toLowerCase().includes(searchQuery.toLowerCase())) ||
          brief.targetNiches.some(n => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
          brief.deliverables.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));

        // Category / Brand filter
        const matchesCategory = 
          selectedCategory === 'ALL' || 
          brief.category === selectedCategory || 
          brief.brandName.toLowerCase() === selectedCategory.toLowerCase() ||
          brief.industry.toLowerCase() === selectedCategory.toLowerCase();

        // Budget Filter
        let matchesBudget = true;
        if (selectedBudgetFilter === 'UNDER_75K') {
          matchesBudget = brief.budgetMin < 75000;
        } else if (selectedBudgetFilter === '75K_150K') {
          matchesBudget = brief.budgetMax >= 75000 && brief.budgetMin <= 150000;
        } else if (selectedBudgetFilter === 'ABOVE_150K') {
          matchesBudget = brief.budgetMax > 150000;
        }

        // Platform Filter
        let matchesPlatform = true;
        if (selectedPlatformFilter === 'INSTAGRAM') {
          matchesPlatform = brief.deliverables.some(d => d.toLowerCase().includes('reel') || d.toLowerCase().includes('story') || d.toLowerCase().includes('instagram'));
        } else if (selectedPlatformFilter === 'YOUTUBE') {
          matchesPlatform = brief.deliverables.some(d => d.toLowerCase().includes('youtube'));
        } else if (selectedPlatformFilter === 'LINKEDIN') {
          matchesPlatform = brief.deliverables.some(d => d.toLowerCase().includes('linkedin'));
        }

        // Match Score Filter
        let matchesScore = true;
        if (selectedMatchFilter === '95_PLUS') {
          matchesScore = brief.matchScore >= 95;
        } else if (selectedMatchFilter === '90_PLUS') {
          matchesScore = brief.matchScore >= 90;
        }

        // Saved tab condition
        if (activeTab === 'saved') {
          return matchesSearch && matchesCategory && matchesBudget && matchesPlatform && matchesScore && savedBriefIds.includes(brief.id);
        }

        return matchesSearch && matchesCategory && matchesBudget && matchesPlatform && matchesScore;
      })
      .sort((a, b) => {
        if (sortBy === 'match') return b.matchScore - a.matchScore;
        if (sortBy === 'budget') return b.budgetMax - a.budgetMax;
        if (sortBy === 'deadline') return (a.daysRemaining || 99) - (b.daysRemaining || 99);
        if (sortBy === 'popular') return b.applicantsCount - a.applicantsCount;
        return 0;
      });
  }, [brandBriefs, searchQuery, selectedCategory, selectedBudgetFilter, selectedPlatformFilter, selectedMatchFilter, sortBy, activeTab, savedBriefIds]);

  // Filtered proposals for Status Tracking tab
  const filteredProposals = useMemo(() => {
    return brandProposals.filter((prop) => {
      if (trackingFilter === 'ALL') return true;
      if (trackingFilter === 'UNDER_REVIEW') return prop.status === 'submitted' || prop.status === 'in_review';
      if (trackingFilter === 'SHORTLISTED') return prop.status === 'shortlisted';
      if (trackingFilter === 'ESCROW_FUNDED') return prop.status === 'escrow_funded';
      if (trackingFilter === 'DRAFT_IN_REVIEW') return prop.status === 'draft_submitted';
      if (trackingFilter === 'LIVE_APPROVED') return prop.status === 'approved';
      if (trackingFilter === 'COMPLETED') return prop.status === 'completed';
      return true;
    });
  }, [brandProposals, trackingFilter]);

  // High-level telemetry calculations
  const totalBudgetPool = useMemo(() => {
    return brandBriefs.reduce((sum, b) => sum + b.budgetMax, 0);
  }, [brandBriefs]);

  const activeEscrowLocked = useMemo(() => {
    return brandProposals
      .filter((p) => p.status === 'escrow_funded' || p.status === 'draft_submitted' || p.status === 'approved' || p.status === 'completed')
      .reduce((sum, p) => sum + (p.escrowAmount || p.proposedAmount), 0);
  }, [brandProposals]);

  const averageMatchScore = useMemo(() => {
    if (brandBriefs.length === 0) return 95;
    const sum = brandBriefs.reduce((acc, b) => acc + b.matchScore, 0);
    return (sum / brandBriefs.length).toFixed(1);
  }, [brandBriefs]);

  // Handle open apply / pitch modal
  const handleOpenPitch = (brief: BrandCollabBrief, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPitchBrief(brief);
    setDrawerBrief(null);
    setFormStep(1);
    setSubmittedSuccess(false);
    
    // Set realistic initial proposed amount
    const midBudget = Math.round((brief.budgetMin + brief.budgetMax) / 2);
    setProposedAmount(midBudget);
    setSelectedDeliverables([...brief.deliverables]);
    
    const hook = (brief.sampleHooks && brief.sampleHooks[0]) || `“How I integrate ${brief.brandName} into my daily developer routine”`;
    setSelectedHook(hook);

    setPitch(
      `Hey ${brief.brandName} team! As an active Indian tech & creator educator with 245k+ followers and 7.8% verified engagement rate, I will seamlessly integrate ${brief.brandName} with high retention and organic authenticity.\n\nI will deliver all requested formats with verified GST compliance (SAC 998313), official UTM tracking links, and milestone escrow security.`
    );
    setTimelineDays(brief.daysRemaining ? Math.min(brief.daysRemaining + 3, 10) : 7);
    setWhitelistingAddon(false);
    setRawFootageAddon(false);
    setExclusivityAddon(false);
  };

  // Addon price computation
  const totalCalculatedProposalFee = useMemo(() => {
    let fee = proposedAmount;
    if (whitelistingAddon) fee += 25000;
    if (rawFootageAddon) fee += 15000;
    if (exclusivityAddon) fee += 30000;
    return fee;
  }, [proposedAmount, whitelistingAddon, rawFootageAddon, exclusivityAddon]);

  const gstCalculation = useMemo(() => {
    const base = totalCalculatedProposalFee;
    const gst18 = Math.round(base * 0.18);
    const invoiceTotal = base + gst18;
    const tds1 = Math.round(base * 0.01);
    const netPayout = base - tds1;
    const escrowAdvance50 = Math.round(base * 0.5);
    return { base, gst18, invoiceTotal, tds1, netPayout, escrowAdvance50 };
  }, [totalCalculatedProposalFee]);

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitchBrief) return;

    const newProposal = applyToBrandBrief(
      pitchBrief.id,
      totalCalculatedProposalFee,
      pitch,
      selectedDeliverables,
      timelineDays,
      {
        creativeHook: selectedHook,
        scriptDraftDate: `${Math.max(2, Math.round(timelineDays * 0.4))} days from acceptance`,
        contentGoLiveDate: `${timelineDays} days from acceptance`,
        addons: {
          whitelisting: whitelistingAddon,
          rawFootage: rawFootageAddon,
          exclusiveCategory: exclusivityAddon
        },
        mediaKitAttached: true
      }
    );

    if (newProposal) {
      setSubmittedProposalId(newProposal.id);
    }
    setSubmittedSuccess(true);
  };

  const handleOpenDeliverableSubmit = (prop: BrandProposal, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDeliverableModalProp(prop);
    setDeliverableUrl('https://instagram.com/reel/' + prop.brandName.toLowerCase() + '_collab_' + Date.now().toString().slice(-4));
  };

  const handleSaveDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deliverableModalProp) return;

    submitProposalDeliverable(deliverableModalProp.id, {
      title: deliverableTitle,
      url: deliverableUrl,
      platform: deliverablePlatform,
      viewsCount: deliverableViews,
      engagement: deliverableEngagement
    });

    setDeliverableModalProp(null);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEscrowId(id);
    setTimeout(() => setCopiedEscrowId(null), 2000);
  };

  return (
    <PageTransition>
      <div className="space-y-6 font-sans pb-12">
        
        {/* ========================================================================= */}
        {/* TOP BOARD HEADER & TELEMETRY STRIP */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
                <span>Brand Marketplace & Collab Exchange</span>
              </h1>
              <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold px-3 py-1 flex items-center gap-1.5 font-mono">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>12 Verified Sponsors</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Connect directly with verified tier-1 brands in India (boAt, CRED, Swiggy, Nothing, Zomato, Nykaa, Zerodha) with guaranteed 100% NPCI Escrow milestone payouts & GST invoicing.
            </p>
          </div>

          {/* Quick Telemetry Pill */}
          <div className="flex items-center gap-2 self-start lg:self-center font-mono text-xs">
            <span className="rounded-[16px] border border-royal-500/30 bg-royal-600/15 px-4 py-2.5 font-bold text-royal-300 shadow-royal-sm flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Sponsorship Pool: ₹<AnimatedCounter value={totalBudgetPool} /></span>
            </span>
          </div>
        </div>

        {/* 4 TELEMETRY CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <HoverCard hoverY={-3} className="rounded-[22px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/40 relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <p className="text-xs font-medium">Live Brand Briefs</p>
              <Briefcase className="h-4 w-4 text-royal-400 group-hover:scale-110 transition" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-white font-mono">
              <AnimatedCounter value={brandBriefs.length} />
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <p className="text-[11px] text-emerald-400 font-mono font-medium">100% Verified Sponsors</p>
            </div>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[22px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/40 relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <p className="text-xs font-medium">Avg. Creator Match</p>
              <Flame className="h-4 w-4 text-amber-400 group-hover:scale-110 transition" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-royal-400 font-mono">
              <AnimatedCounter value={Number(averageMatchScore)} decimals={1} suffix="%" />
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-mono">Demographics & Tone Fit</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[22px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/40 relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <p className="text-xs font-medium">Active Deals in Escrow</p>
              <Lock className="h-4 w-4 text-emerald-400 group-hover:scale-110 transition" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
              ₹<AnimatedCounter value={activeEscrowLocked} />
            </div>
            <p className="text-[11px] text-slate-400 mt-2 font-mono">NPCI Verified Fund Locks</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[22px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/40 relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <p className="text-xs font-medium">Status & Proposals</p>
              <FileCheck className="h-4 w-4 text-royal-400 group-hover:scale-110 transition" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-white font-mono">
              <AnimatedCounter value={brandProposals.length} />
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-[11px] text-royal-300 font-mono">{brandProposals.filter(p => p.status === 'completed').length} Deals Settled</p>
              <span className="text-[10px] text-slate-500 font-mono">Avg 2.4d UPI</span>
            </div>
          </HoverCard>
        </div>

        {/* ========================================================================= */}
        {/* MAIN NAVIGATION TABS */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 p-1.5 rounded-[18px] bg-[#0A0E1A]/90 border border-white/[0.08] shadow-glass-card overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('explore')}
            className={`px-4 py-2.5 rounded-[12px] text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'explore'
                ? 'bg-royal-600 text-white shadow-royal-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Briefcase className="h-4 w-4" />
            <span>Explore Campaigns ({brandBriefs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2.5 rounded-[12px] text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'saved'
                ? 'bg-royal-600 text-white shadow-royal-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Bookmark className="h-4 w-4" />
            <span>Saved Briefs ({savedBriefIds.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tracking')}
            className={`px-4 py-2.5 rounded-[12px] text-xs font-bold transition flex items-center gap-2 whitespace-nowrap relative ${
              activeTab === 'tracking'
                ? 'bg-royal-600 text-white shadow-royal-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <FileCheck className="h-4 w-4" />
            <span>Status Tracking & Pipeline ({brandProposals.length})</span>
            {brandProposals.some(p => p.status === 'draft_submitted' || p.status === 'escrow_funded') && (
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping absolute -top-0.5 -right-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('insights')}
            className={`px-4 py-2.5 rounded-[12px] text-xs font-bold transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'insights'
                ? 'bg-royal-600 text-white shadow-royal-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Match Insights & Media Kit</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1 & 2: EXPLORE / SAVED CAMPAIGNS (SEARCH & FILTER CONTROLS) */}
        {/* ========================================================================= */}
        {(activeTab === 'explore' || activeTab === 'saved') && (
          <div className="space-y-5">
            
            {/* SEARCH & ADVANCED FILTER ROW */}
            <div className="rounded-[22px] border border-white/[0.08] bg-[#0A0E1A]/90 p-4 sm:p-5 shadow-glass-card space-y-4">
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by brand (boAt, CRED, Swiggy, Nothing), title, niche (#Tech, #Coding), or deliverables..."
                    className="w-full rounded-[14px] border border-white/[0.1] bg-black/50 pl-10 pr-8 py-2.5 text-xs text-white placeholder-slate-500 focus:border-royal-500 focus:outline-none transition"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-sm"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Filter Controls Row */}
                <div className="flex flex-wrap items-center gap-2">
                  
                  {/* Budget Dropdown */}
                  <select
                    value={selectedBudgetFilter}
                    onChange={(e) => setSelectedBudgetFilter(e.target.value)}
                    className="rounded-[12px] border border-white/[0.1] bg-black/60 px-3 py-2 text-xs text-slate-300 font-mono focus:border-royal-500 focus:outline-none"
                  >
                    <option value="ALL">All Budgets</option>
                    <option value="UNDER_75K">Under ₹75,000</option>
                    <option value="75K_150K">₹75k - ₹1.5 Lakh</option>
                    <option value="ABOVE_150K">₹1.5 Lakh+</option>
                  </select>

                  {/* Platform Dropdown */}
                  <select
                    value={selectedPlatformFilter}
                    onChange={(e) => setSelectedPlatformFilter(e.target.value)}
                    className="rounded-[12px] border border-white/[0.1] bg-black/60 px-3 py-2 text-xs text-slate-300 font-mono focus:border-royal-500 focus:outline-none"
                  >
                    <option value="ALL">All Deliverables</option>
                    <option value="INSTAGRAM">Instagram Reels & Stories</option>
                    <option value="YOUTUBE">YouTube Integrations</option>
                    <option value="LINKEDIN">LinkedIn Posts</option>
                  </select>

                  {/* Match Score Filter */}
                  <select
                    value={selectedMatchFilter}
                    onChange={(e) => setSelectedMatchFilter(e.target.value)}
                    className="rounded-[12px] border border-white/[0.1] bg-black/60 px-3 py-2 text-xs text-slate-300 font-mono focus:border-royal-500 focus:outline-none"
                  >
                    <option value="ALL">All Match Scores</option>
                    <option value="95_PLUS">🔥 95%+ High Match</option>
                    <option value="90_PLUS">⚡ 90%+ Match</option>
                  </select>

                  {/* Sort By Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="rounded-[12px] border border-royal-500/30 bg-royal-600/10 px-3 py-2 text-xs text-royal-300 font-mono font-semibold focus:border-royal-500 focus:outline-none"
                  >
                    <option value="match">Sort: Best Creator Match</option>
                    <option value="budget">Sort: Highest Budget</option>
                    <option value="deadline">Sort: Urgent Deadline</option>
                    <option value="popular">Sort: Most Applicants</option>
                  </select>

                </div>
              </div>

              {/* Brand Category Quick Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 border-t border-white/[0.06]">
                {[
                  { id: 'ALL', label: 'All Brands (12)' },
                  { id: 'boAt', label: 'boAt (Audio & Wearables)' },
                  { id: 'Swiggy', label: 'Swiggy (Instamart)' },
                  { id: 'CRED', label: 'CRED (FinTech & Garage)' },
                  { id: 'Nothing', label: 'Nothing (Minimalist Tech)' },
                  { id: 'Nykaa', label: 'Nykaa (Festive Beauty)' },
                  { id: 'Zomato', label: 'Zomato (Food & Dining)' },
                  { id: 'Zerodha', label: 'Zerodha (Varsity FinTech)' },
                  { id: 'Myntra', label: 'Myntra (Fashion Trends)' },
                  { id: 'Lenskart', label: 'Lenskart (Air Blu Lenses)' },
                  { id: 'Zepto', label: 'Zepto (10-Min Cafe)' },
                  { id: 'Mamaearth', label: 'Mamaearth (Clean D2C)' },
                  { id: 'Snitch', label: 'Snitch (Founder Streetwear)' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-[12px] text-xs font-semibold whitespace-nowrap transition btn-press ${
                      selectedCategory === cat.id
                        ? 'bg-royal-600 text-white shadow-royal-sm'
                        : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

            </div>

            {/* CAMPAIGNS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCampaigns.length === 0 ? (
                <div className="col-span-full py-16 text-center text-slate-400 text-xs rounded-[22px] border border-white/[0.08] bg-[#0A0E1A]/85 p-8 space-y-3">
                  <div className="h-12 w-12 rounded-full bg-white/[0.05] flex items-center justify-center mx-auto text-slate-400">
                    <Search className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-white">No campaigns found</p>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Try adjusting your search query, budget filter, or selected brand categories.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('ALL');
                      setSelectedBudgetFilter('ALL');
                      setSelectedPlatformFilter('ALL');
                      setSelectedMatchFilter('ALL');
                    }}
                    className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-[10px] bg-royal-600/20 text-royal-300 border border-royal-500/30 text-xs font-semibold"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              ) : (
                filteredCampaigns.map((campaign) => {
                  const isSaved = savedBriefIds.includes(campaign.id);
                  const isApplied = brandProposals.some(p => p.briefId === campaign.id);

                  return (
                    <HoverCard
                      hoverY={-3}
                      key={campaign.id}
                      onClick={() => setDrawerBrief(campaign)}
                      className="cursor-pointer rounded-[22px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 sm:p-6 shadow-glass-card flex flex-col justify-between hover:border-royal-500/40 relative group transition-all"
                    >
                      <div>
                        
                        {/* Brand Top Header */}
                        <div className="flex items-start justify-between gap-3 mb-3.5">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-[16px] overflow-hidden bg-black/60 border border-white/10 p-0.5 shrink-0 shadow-md">
                              <img src={campaign.brandLogo} alt={campaign.brandName} className="h-full w-full object-cover rounded-[12px]" />
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5">
                                <h3 className="font-display text-base font-bold text-white group-hover:text-royal-300 transition">
                                  {campaign.brandName}
                                </h3>
                                <span title="Verified Indian Brand">
                                  <ShieldCheck className="h-4 w-4 text-royal-400" />
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="inline-block rounded-md bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium text-slate-300 font-mono">
                                  {campaign.category || campaign.industry}
                                </span>
                                {campaign.tier && (
                                  <span className="inline-block rounded-md bg-royal-500/15 text-royal-300 px-1.5 py-0.5 text-[9px] font-mono font-semibold">
                                    {campaign.tier}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Match Score & Bookmark */}
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setMatchModalBrief(campaign);
                              }}
                              title="Click for Match Score Breakdown"
                              className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 text-[11px] font-extrabold font-mono hover:bg-emerald-500/25 transition shadow-sm"
                            >
                              <Flame className="h-3 w-3 fill-emerald-400" />
                              <span>{campaign.matchScore}%</span>
                            </button>

                            <button
                              type="button"
                              onClick={(e) => toggleSaveBrief(e, campaign.id)}
                              title={isSaved ? 'Remove from Saved' : 'Save Campaign'}
                              className={`p-1.5 rounded-full border transition ${
                                isSaved
                                  ? 'bg-royal-600/30 text-royal-300 border-royal-500/50'
                                  : 'bg-white/[0.04] text-slate-400 border-white/[0.08] hover:text-white'
                              }`}
                            >
                              {isSaved ? <BookmarkCheck className="h-4 w-4 text-royal-400" /> : <Bookmark className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <h4 className="font-display text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug">
                          {campaign.title}
                        </h4>
                        <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                          {campaign.description}
                        </p>

                        {/* Deliverables List Preview */}
                        <div className="my-3.5 space-y-1.5 rounded-[16px] bg-black/40 p-3 text-xs border border-white/[0.05]">
                          <p className="text-[10px] uppercase font-bold text-slate-400 font-mono flex items-center justify-between">
                            <span>Required Deliverables:</span>
                            <span className="text-royal-400 font-semibold">{campaign.deliverables.length} Formats</span>
                          </p>
                          {campaign.deliverables.slice(0, 2).map((del, dIdx) => (
                            <div key={dIdx} className="text-slate-300 text-[11px] flex items-start gap-1.5 pt-0.5">
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span className="truncate">{del}</span>
                            </div>
                          ))}
                        </div>

                        {/* Target Niches */}
                        <div className="flex flex-wrap gap-1.5 mb-3.5">
                          {campaign.targetNiches.map((niche, nIdx) => (
                            <span key={nIdx} className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[9px] font-semibold text-slate-400 border border-white/[0.06]">
                              #{niche}
                            </span>
                          ))}
                        </div>

                      </div>

                      {/* Bottom Commercial Strip: Budget, Deadline & Actions */}
                      <div className="pt-3.5 border-t border-white/[0.08] space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] text-slate-500 uppercase font-bold font-mono">Sponsorship Budget</p>
                            <span className="font-display text-base font-extrabold text-white font-mono">
                              ₹{formatINR(campaign.budgetMin)} - ₹{formatINR(campaign.budgetMax)}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-[10px] text-slate-500 uppercase font-bold font-mono">Deadline</p>
                            <span className={`text-[11px] font-mono font-semibold flex items-center justify-end gap-1 ${
                              (campaign.daysRemaining || 99) <= 3 ? 'text-rose-400 animate-pulse' : 'text-amber-400'
                            }`}>
                              <Clock className="h-3 w-3" />
                              <span>{campaign.deadline}</span>
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDrawerBrief(campaign);
                            }}
                            className="w-full rounded-[14px] bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] py-2.5 text-xs font-semibold text-slate-200 transition btn-press text-center"
                          >
                            View Brief
                          </button>

                          <RippleButton
                            onClick={(e) => handleOpenPitch(campaign, e)}
                            className={`w-full rounded-[14px] py-2.5 text-xs font-bold text-white shadow-royal flex items-center justify-center gap-1.5 ${
                              isApplied ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-royal-600 hover:bg-royal-500'
                            }`}
                          >
                            <span>{isApplied ? 'Pitch Again' : 'Apply Now'}</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </RippleButton>
                        </div>
                      </div>

                    </HoverCard>
                  );
                })
              )}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: FULL STATUS TRACKING & DEAL PIPELINE */}
        {/* ========================================================================= */}
        {activeTab === 'tracking' && (
          <div className="space-y-5">
            
            {/* Pipeline Stage Filter Strip */}
            <div className="rounded-[22px] border border-white/[0.08] bg-[#0A0E1A]/90 p-4 sm:p-5 shadow-glass-card space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
                    <FileCheck className="h-5 w-5 text-royal-400" />
                    <span>Sponsorship Deals & Proposal Pipeline</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Track the real-time lifecycle of your brand deals from submission to escrow locking, draft review, and 1-click UPI payouts.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-3 py-1 text-xs font-bold font-mono">
                    ₹{formatINR(activeEscrowLocked)} in Escrow
                  </span>
                </div>
              </div>

              {/* Stage Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 border-t border-white/[0.06]">
                {[
                  { id: 'ALL', label: `All Proposals (${brandProposals.length})` },
                  { id: 'UNDER_REVIEW', label: `Under Review (${brandProposals.filter(p => p.status === 'submitted' || p.status === 'in_review').length})` },
                  { id: 'SHORTLISTED', label: `Shortlisted (${brandProposals.filter(p => p.status === 'shortlisted').length})` },
                  { id: 'ESCROW_FUNDED', label: `Escrow Funded (${brandProposals.filter(p => p.status === 'escrow_funded').length})` },
                  { id: 'DRAFT_IN_REVIEW', label: `Draft in Review (${brandProposals.filter(p => p.status === 'draft_submitted').length})` },
                  { id: 'LIVE_APPROVED', label: `Approved & Live (${brandProposals.filter(p => p.status === 'approved').length})` },
                  { id: 'COMPLETED', label: `Settled / Paid (${brandProposals.filter(p => p.status === 'completed').length})` },
                ].map((stg) => (
                  <button
                    key={stg.id}
                    onClick={() => setTrackingFilter(stg.id)}
                    className={`px-3 py-1.5 rounded-[12px] text-xs font-semibold whitespace-nowrap transition btn-press ${
                      trackingFilter === stg.id
                        ? 'bg-royal-600 text-white shadow-royal-sm'
                        : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.06]'
                    }`}
                  >
                    {stg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Pipeline Deals List */}
            {filteredProposals.length === 0 ? (
              <div className="py-16 text-center text-slate-400 text-xs rounded-[22px] border border-white/[0.08] bg-[#0A0E1A]/85 p-8 space-y-3">
                <FileCheck className="h-8 w-8 text-slate-500 mx-auto" />
                <p className="text-sm font-semibold text-white">No proposals in this stage</p>
                <p className="text-xs text-slate-400">
                  Switch to the "Explore Campaigns" tab to apply to new sponsorship briefs.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProposals.map((prop) => {
                  const matchingBrief = brandBriefs.find(b => b.id === prop.briefId);

                  return (
                    <div
                      key={prop.id}
                      className="rounded-[22px] border border-white/[0.08] bg-[#0A0E1A]/90 p-5 sm:p-6 shadow-glass-card hover:border-royal-500/30 transition space-y-5"
                    >
                      
                      {/* Top Proposal Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-[16px] overflow-hidden bg-black/60 border border-white/10 p-0.5 shrink-0 shadow-md">
                            <img src={prop.brandLogo || (matchingBrief?.brandLogo)} alt={prop.brandName} className="h-full w-full object-cover rounded-[12px]" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-display text-base sm:text-lg font-bold text-white">{prop.brandName}</h3>
                              <span className={`rounded-md px-2.5 py-0.5 text-[10px] font-bold uppercase font-mono border ${
                                prop.status === 'completed'
                                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                                  : prop.status === 'escrow_funded' || prop.status === 'draft_submitted' || prop.status === 'approved'
                                  ? 'bg-royal-500/20 text-royal-300 border-royal-500/40'
                                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                              }`}>
                                {prop.status.replace('_', ' ')}
                              </span>
                            </div>
                            <p className="text-xs text-slate-300 mt-0.5">{prop.briefTitle}</p>
                          </div>
                        </div>

                        {/* Financial Snapshot */}
                        <div className="flex items-center gap-4 text-right self-start sm:self-center">
                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-mono font-bold">Proposed Deal Fee</p>
                            <span className="font-display text-lg font-bold text-emerald-400 font-mono">
                              ₹{formatINR(prop.proposedAmount)}
                            </span>
                            <span className="text-[10px] text-slate-500 block font-mono">+18% GST (SAC 998313)</span>
                          </div>
                        </div>
                      </div>

                      {/* 6-STAGE VISUAL STEPPER */}
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <ShieldCheck className="h-4 w-4 text-emerald-400" />
                            <span>Deal Lifecycle Progress</span>
                          </span>
                          <span className="text-royal-300">
                            Escrow Status: <strong className="uppercase text-emerald-400">{prop.escrowStatus || 'Escrow Locked'}</strong>
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                          {[
                            { label: '1. Submitted', key: 'submitted', completed: true },
                            { label: '2. Shortlisted', key: 'shortlisted', completed: prop.status !== 'submitted' && prop.status !== 'in_review' },
                            { label: '3. Escrow Locked', key: 'escrow_funded', completed: prop.status === 'escrow_funded' || prop.status === 'draft_submitted' || prop.status === 'approved' || prop.status === 'completed' },
                            { label: '4. Draft Review', key: 'draft_submitted', completed: prop.status === 'draft_submitted' || prop.status === 'approved' || prop.status === 'completed' },
                            { label: '5. Approved & Live', key: 'approved', completed: prop.status === 'approved' || prop.status === 'completed' },
                            { label: '6. UPI Settled', key: 'completed', completed: prop.status === 'completed' },
                          ].map((step, sIdx) => (
                            <div
                              key={sIdx}
                              className={`p-2.5 rounded-[12px] border text-center transition ${
                                step.completed
                                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 font-semibold'
                                  : 'bg-white/[0.02] border-white/[0.06] text-slate-500'
                              }`}
                            >
                              <div className="flex items-center justify-center gap-1 text-[11px] font-mono">
                                {step.completed ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> : <Clock className="h-3.5 w-3.5" />}
                                <span className="truncate">{step.label}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* BRAND FEEDBACK / NOTES BOX */}
                      {prop.brandFeedback && (
                        <div className="p-4 rounded-[16px] bg-royal-600/10 border border-royal-500/25 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between font-mono text-[11px] text-royal-300 font-bold">
                            <span className="flex items-center gap-1.5">
                              <Sparkles className="h-3.5 w-3.5 text-royal-400" />
                              <span>Official {prop.brandName} Brand Review Feedback</span>
                            </span>
                            <span className="text-[10px] text-slate-400">Escrow Ref: ESC_{prop.id.slice(-6)}</span>
                          </div>
                          <p className="text-slate-200 text-xs italic leading-relaxed">
                            "{prop.brandFeedback}"
                          </p>
                        </div>
                      )}

                      {/* DELIVERABLES & SUBMITTED LINKS */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        
                        {/* Left: Agreed Deliverables */}
                        <div className="p-3.5 rounded-[16px] bg-black/40 border border-white/[0.06] space-y-2 text-xs">
                          <p className="text-[10px] uppercase font-bold text-slate-400 font-mono flex items-center justify-between">
                            <span>Agreed Deliverables:</span>
                            <span className="text-royal-400">{prop.deliverablesProposed.length} Items</span>
                          </p>
                          <div className="space-y-1">
                            {prop.deliverablesProposed.map((del, dIdx) => (
                              <div key={dIdx} className="text-slate-300 text-[11px] flex items-center gap-2">
                                <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                                <span className="truncate">{del}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Right: Submitted Live Deliverables / Links */}
                        <div className="p-3.5 rounded-[16px] bg-black/40 border border-white/[0.06] space-y-2 text-xs">
                          <p className="text-[10px] uppercase font-bold text-slate-400 font-mono flex items-center justify-between">
                            <span>Submitted Links & Telemetry:</span>
                            <span className="text-emerald-400 font-bold">{prop.deliverableLinks?.length || 0} Links Active</span>
                          </p>
                          
                          {prop.deliverableLinks && prop.deliverableLinks.length > 0 ? (
                            <div className="space-y-1.5">
                              {prop.deliverableLinks.map((link, lIdx) => (
                                <div key={lIdx} className="flex items-center justify-between p-2 rounded-[10px] bg-white/[0.03] border border-white/[0.06]">
                                  <div className="truncate mr-2">
                                    <span className="font-semibold text-white text-[11px] block truncate">{link.title}</span>
                                    <span className="text-[10px] text-slate-400 font-mono">{link.viewsCount || 'In Review'} • {link.submittedAt}</span>
                                  </div>
                                  <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="p-1.5 rounded-lg bg-royal-600/20 text-royal-300 hover:text-white border border-royal-500/30"
                                  >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                  </a>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-[11px] text-slate-500 italic py-1">
                              No links submitted yet. Click "Submit Draft / Live Link" below.
                            </p>
                          )}
                        </div>

                      </div>

                      {/* PROPOSAL ACTION CONTROLS */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.06]">
                        
                        {/* Left metadata info */}
                        <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                          {prop.invoiceNumber && (
                            <span className="flex items-center gap-1 text-royal-300">
                              <FileText className="h-3.5 w-3.5" />
                              <span>Invoice: {prop.invoiceNumber}</span>
                            </span>
                          )}
                          {prop.upiRefId && (
                            <span className="flex items-center gap-1 text-emerald-400 font-bold">
                              <CheckCircle className="h-3.5 w-3.5" />
                              <span>UPI: {prop.upiRefId}</span>
                            </span>
                          )}
                        </div>

                        {/* Interactive Action Buttons */}
                        <div className="flex flex-wrap items-center gap-2">
                          
                          {/* Submit Link CTA */}
                          <button
                            type="button"
                            onClick={(e) => handleOpenDeliverableSubmit(prop, e)}
                            className="px-3.5 py-2 rounded-[12px] bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-semibold text-slate-200 transition flex items-center gap-1.5"
                          >
                            <ExternalLink className="h-3.5 w-3.5 text-royal-400" />
                            <span>Submit Draft / Live URL</span>
                          </button>

                          {/* Quick Stage Simulator (Allows Pair Reviewer / User to test pipeline transition) */}
                          <div className="flex items-center gap-1 bg-white/[0.03] p-1 rounded-[12px] border border-white/[0.08]">
                            <span className="text-[10px] text-slate-500 px-1 font-mono">Simulate Stage:</span>
                            {prop.status === 'submitted' && (
                              <button
                                onClick={() => updateProposalStatus(prop.id, 'shortlisted', 'Brand shortlisted your creative hook! Reviewing budget allocation.')}
                                className="px-2 py-1 rounded-[8px] bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 text-[10px] font-bold font-mono"
                              >
                                Shortlist Deal
                              </button>
                            )}
                            {(prop.status === 'submitted' || prop.status === 'shortlisted') && (
                              <button
                                onClick={() => updateProposalStatus(prop.id, 'escrow_funded', `Brand deposited 100% of funds (₹${formatINR(prop.proposedAmount)}) into NPCI Escrow. Please submit rough-cut draft.`)}
                                className="px-2 py-1 rounded-[8px] bg-royal-500/20 text-royal-300 hover:bg-royal-500/30 text-[10px] font-bold font-mono"
                              >
                                Fund Escrow
                              </button>
                            )}
                            {(prop.status === 'escrow_funded' || prop.status === 'draft_submitted') && (
                              <button
                                onClick={() => updateProposalStatus(prop.id, 'approved', 'Draft approved! Please publish on socials with UTM tracking links.')}
                                className="px-2 py-1 rounded-[8px] bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-[10px] font-bold font-mono"
                              >
                                Approve Draft
                              </button>
                            )}
                            {prop.status !== 'completed' && (
                              <button
                                onClick={() => updateProposalStatus(prop.id, 'completed', `Content verified! 100% Escrow disbursed via instant UPI. Tax Invoice generated.`)}
                                className="px-2.5 py-1 rounded-[8px] bg-emerald-600 text-white hover:bg-emerald-500 text-[10px] font-bold font-mono shadow-sm"
                              >
                                Disburse UPI Payout
                              </button>
                            )}
                          </div>

                        </div>

                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 4: AI MATCH INSIGHTS & RATE CARD OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === 'insights' && (
          <div className="space-y-6">
            
            <div className="rounded-[22px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 sm:p-7 shadow-glass-card space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
                <div>
                  <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-royal-400" />
                    <span>AI Creator Match Intelligence & Rate Card</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    CreatorOS algorithmic matching engine compares your audience demographics, engagement rate (7.8%), and retention stats against verified brand sponsorship budgets.
                  </p>
                </div>
                <div className="font-mono text-xs text-royal-300 bg-royal-600/15 border border-royal-500/30 rounded-[14px] px-3.5 py-2">
                  Creator Profile: <strong>@{activeCreator?.username || 'aarav.tech'}</strong> (245k Audience)
                </div>
              </div>

              {/* 3 Benchmark Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-[18px] bg-black/40 border border-white/[0.08] space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase font-mono">Suggested Reel Rate</span>
                  <div className="font-display text-2xl font-bold text-emerald-400 font-mono">₹65,000 - ₹95,000</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Based on 95,000 average 4K Reel views with 7.8% engagement rate in Indian Tech & Lifestyle.
                  </p>
                </div>

                <div className="p-4 rounded-[18px] bg-black/40 border border-white/[0.08] space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase font-mono">YouTube Integration</span>
                  <div className="font-display text-2xl font-bold text-royal-400 font-mono">₹85,000 - ₹1,40,000</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Based on 185k subscribers and 42k average views on long-form tech & coding tutorials.
                  </p>
                </div>

                <div className="p-4 rounded-[18px] bg-black/40 border border-white/[0.08] space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase font-mono">Escrow Settlement Rating</span>
                  <div className="font-display text-2xl font-bold text-amber-400 font-mono">100% Trust Score</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Zero payment defaults, verified Indian GST compliance (SAC 998313), and on-time draft delivery.
                  </p>
                </div>
              </div>

              {/* Top Matching Brands Leaderboard */}
              <div className="pt-4 space-y-3">
                <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Top Brand Affinity Matches For Your Channel
                </h3>

                <div className="space-y-2">
                  {brandBriefs.slice(0, 5).map((brief, bIdx) => (
                    <div key={brief.id} className="p-4 rounded-[16px] bg-white/[0.03] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={brief.brandLogo} alt={brief.brandName} className="h-10 w-10 rounded-[12px] object-cover bg-black" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-sm text-white">{brief.brandName}</span>
                            <span className="text-[10px] text-slate-400 font-mono">({brief.category})</span>
                          </div>
                          <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">{brief.title}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-3 py-1 text-xs font-extrabold font-mono">
                          <Flame className="h-3.5 w-3.5 fill-emerald-400" />
                          <span>{brief.matchScore}% Match</span>
                        </span>

                        <button
                          onClick={() => handleOpenPitch(brief)}
                          className="px-3 py-1.5 rounded-[10px] bg-royal-600 hover:bg-royal-500 text-white text-xs font-bold transition shadow-royal"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* SLIDE-OVER CAMPAIGN DETAIL DRAWER */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {drawerBrief && (
            <div className="fixed inset-0 z-50 overflow-hidden">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setDrawerBrief(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
              />

              <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  className="w-screen max-w-2xl bg-[#0A0D17] border-l border-white/[0.12] shadow-2xl p-6 sm:p-8 overflow-y-auto text-slate-100 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-6">
                    
                    {/* Drawer Header with Banner */}
                    <div className="space-y-4">
                      {drawerBrief.brandCoverImage && (
                        <div className="h-36 rounded-[20px] overflow-hidden border border-white/10 relative shadow-md">
                          <img src={drawerBrief.brandCoverImage} alt={drawerBrief.brandName} className="h-full w-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D17] via-transparent to-black/30" />
                          <button
                            onClick={() => setDrawerBrief(null)}
                            className="absolute top-3 right-3 rounded-full p-2 bg-black/60 backdrop-blur-md text-slate-300 hover:text-white"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}

                      <div className="flex items-start justify-between gap-3 pt-1">
                        <div className="flex items-center gap-3">
                          <img src={drawerBrief.brandLogo} alt={drawerBrief.brandName} className="h-14 w-14 rounded-[18px] object-cover bg-black border border-white/10 shadow-lg" />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h2 className="font-display text-xl font-bold text-white">{drawerBrief.brandName}</h2>
                              <ShieldCheck className="h-5 w-5 text-royal-400" />
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-xs text-slate-400 font-mono">{drawerBrief.category}</span>
                              {drawerBrief.tier && (
                                <span className="rounded-md bg-royal-500/20 text-royal-300 px-2 py-0.5 text-[10px] font-mono font-bold">
                                  {drawerBrief.tier}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {!drawerBrief.brandCoverImage && (
                          <button
                            onClick={() => setDrawerBrief(null)}
                            className="rounded-full p-2 text-slate-400 hover:bg-white/[0.08] hover:text-white"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Campaign Title & Match Score Badge */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                          Campaign Narrative & Goals
                        </span>
                        <button
                          onClick={() => setMatchModalBrief(drawerBrief)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-3 py-1 text-xs font-bold font-mono hover:bg-emerald-500/25 transition"
                        >
                          <Flame className="h-3.5 w-3.5 fill-emerald-400" />
                          <span>{drawerBrief.matchScore}% Creator Match (View Breakdown)</span>
                        </button>
                      </div>
                      <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
                        {drawerBrief.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                        {drawerBrief.fullBrief || drawerBrief.description}
                      </p>
                    </div>

                    {/* Commercials & Timeline Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-[20px] bg-black/50 border border-white/[0.08] text-xs font-mono">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Budget Range</span>
                        <span className="text-sm font-bold text-white">
                          ₹{formatINR(drawerBrief.budgetMin)} - ₹{formatINR(drawerBrief.budgetMax)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Application Deadline</span>
                        <span className="text-sm font-bold text-amber-400 flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {drawerBrief.deadline}
                        </span>
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <span className="text-[10px] text-slate-400 block uppercase">Escrow Deposit</span>
                        <span className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                          <Lock className="h-3.5 w-3.5" />
                          100% Guaranteed
                        </span>
                      </div>
                    </div>

                    {/* Required Deliverables & Format Breakdown */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                        Required Deliverables & Rate Breakdown
                      </span>
                      <div className="space-y-2">
                        {drawerBrief.deliverableBreakdown && drawerBrief.deliverableBreakdown.length > 0 ? (
                          drawerBrief.deliverableBreakdown.map((del, idx) => (
                            <div key={idx} className="p-3.5 rounded-[16px] bg-white/[0.03] border border-white/[0.06] flex items-start justify-between gap-3 text-xs text-slate-200">
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-2 font-bold text-white">
                                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                                  <span>{del.title}</span>
                                </div>
                                <p className="text-[11px] text-slate-400 pl-6">{del.specs}</p>
                              </div>
                              <span className="font-mono text-xs font-bold text-emerald-400 shrink-0">
                                ~₹{formatINR(del.suggestedRate)}
                              </span>
                            </div>
                          ))
                        ) : (
                          drawerBrief.deliverables.map((del, idx) => (
                            <div key={idx} className="p-3 rounded-[14px] bg-white/[0.03] border border-white/[0.06] flex items-center gap-2.5 text-xs text-slate-200">
                              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                              <span>{del}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Guidelines: Dos & Don'ts */}
                    {drawerBrief.guidelines && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-4 rounded-[18px] bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                          <span className="font-bold text-emerald-400 font-mono text-[11px] block uppercase">
                            ✓ Brand Dos & Highlights
                          </span>
                          <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                            {drawerBrief.guidelines.dos.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 rounded-[18px] bg-rose-500/5 border border-rose-500/20 space-y-2">
                          <span className="font-bold text-rose-400 font-mono text-[11px] block uppercase">
                            ✗ Brand Don'ts & Restrictions
                          </span>
                          <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                            {drawerBrief.guidelines.donts.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Escrow Milestone Settlement Terms */}
                    <div className="p-4 rounded-[18px] bg-royal-600/10 border border-royal-500/25 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-royal-300 font-bold">
                        <ShieldCheck className="h-4 w-4 text-royal-400" />
                        <span>NPCI Escrow Milestone Protection</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • <strong>Milestone 1 (50%):</strong> Locked into verified NPCI Escrow account immediately upon proposal acceptance.
                        <br />
                        • <strong>Milestone 2 (50%):</strong> Automatically disbursed via 1-Click UPI upon delivery review & GST tax invoicing.
                      </p>
                      {drawerBrief.payoutStructure?.bonusTerms && (
                        <p className="text-[11px] text-amber-300 pt-1 font-mono">
                          ★ <strong>Performance Bonus:</strong> {drawerBrief.payoutStructure.bonusTerms}
                        </p>
                      )}
                    </div>

                  </div>

                  {/* Drawer Footer Actions */}
                  <div className="pt-6 border-t border-white/[0.08] space-y-2.5">
                    <RippleButton
                      onClick={() => handleOpenPitch(drawerBrief)}
                      className="w-full rounded-[16px] bg-royal-600 hover:bg-royal-500 py-3.5 text-xs font-bold text-white shadow-royal flex items-center justify-center gap-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Apply with AI Proposal Pitch</span>
                      <ArrowRight className="h-4 w-4" />
                    </RippleButton>
                    
                    <button
                      type="button"
                      onClick={(e) => toggleSaveBrief(e, drawerBrief.id)}
                      className="w-full rounded-[14px] bg-white/[0.04] hover:bg-white/[0.08] py-2.5 text-xs font-semibold text-slate-300 flex items-center justify-center gap-1.5 transition"
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                      <span>{savedBriefIds.includes(drawerBrief.id) ? 'Saved in Your Bookmarks' : 'Save Brief for Later'}</span>
                    </button>
                  </div>

                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* MULTI-STEP APPLY & PROPOSAL SUBMISSION MODAL */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {pitchBrief && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl overflow-y-auto">
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                className="relative w-full max-w-2xl rounded-[26px] border border-white/[0.12] bg-[#0A0D17] p-6 sm:p-8 shadow-2xl text-slate-100 my-8 max-h-[92vh] overflow-y-auto"
              >
                <button
                  onClick={() => setPitchBrief(null)}
                  className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-white/[0.08] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>

                {submittedSuccess ? (
                  <div className="py-8 text-center animate-fade-in space-y-4">
                    <div className="h-16 w-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                      <CheckCircle className="h-9 w-9" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white">
                      Proposal Sent to {pitchBrief.brandName}!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                      Your proposal of <strong className="text-emerald-400 font-mono">₹{formatINR(totalCalculatedProposalFee)}</strong> (+18% GST SAC 998313) and verified AI Media Kit have been delivered to the brand influencer team.
                    </p>
                    
                    <div className="p-4 rounded-[18px] bg-black/50 border border-white/[0.08] max-w-md mx-auto text-left space-y-2 text-xs font-mono">
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Escrow Tracking Ref:</span>
                        <span className="text-royal-300 font-bold">#ESC_{Date.now().toString().slice(-6)}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Guaranteed Payout (Net):</span>
                        <span className="text-emerald-400 font-bold">₹{formatINR(gstCalculation.netPayout)}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Delivery Timeline:</span>
                        <span className="text-white">{timelineDays} Days</span>
                      </div>
                    </div>

                    <div className="pt-3 flex items-center justify-center gap-3">
                      <button
                        onClick={() => {
                          setPitchBrief(null);
                          setActiveTab('tracking');
                        }}
                        className="px-5 py-2.5 rounded-[14px] bg-royal-600 hover:bg-royal-500 text-white text-xs font-bold transition shadow-royal flex items-center gap-2"
                      >
                        <FileCheck className="h-4 w-4" />
                        <span>Track Deal in Status Pipeline</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSendProposal} className="space-y-5">
                    
                    {/* Header */}
                    <div className="flex items-center gap-3.5 pb-4 border-b border-white/[0.08]">
                      <img src={pitchBrief.brandLogo} alt={pitchBrief.brandName} className="h-12 w-12 rounded-[16px] object-cover bg-black border border-white/10" />
                      <div>
                        <h3 className="font-display text-lg font-bold text-white">
                          Submit Proposal: {pitchBrief.brandName}
                        </h3>
                        <p className="text-xs text-slate-400 font-mono">
                          Budget: ₹{formatINR(pitchBrief.budgetMin)} - ₹{formatINR(pitchBrief.budgetMax)} • Match: {pitchBrief.matchScore}%
                        </p>
                      </div>
                    </div>

                    {/* Step Tabs */}
                    <div className="flex items-center justify-between p-1 rounded-[14px] bg-white/[0.04] border border-white/[0.06] text-xs font-mono">
                      {[
                        { step: 1, label: '1. AI Hook & Pitch' },
                        { step: 2, label: '2. Deliverables' },
                        { step: 3, label: '3. Commercials & GST' },
                        { step: 4, label: '4. Timeline' },
                      ].map((item) => (
                        <button
                          key={item.step}
                          type="button"
                          onClick={() => setFormStep(item.step as any)}
                          className={`flex-1 py-1.5 rounded-[10px] text-center font-bold transition ${
                            formStep === item.step
                              ? 'bg-royal-600 text-white shadow-royal-sm'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    {/* STEP 1: AI HOOK & PITCH */}
                    {formStep === 1 && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="block text-xs font-medium text-slate-300">
                            1-Click AI Creative Hook Generator (Tailored for {pitchBrief.brandName})
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {(pitchBrief.sampleHooks || [
                              `“How I use ${pitchBrief.brandName} in my 12-hour coding sprints...”`,
                              `“The single best gadget every creator needs in 2026.”`,
                              `“What happened when I tested ${pitchBrief.brandName} for 7 days.”`
                            ]).map((hook, hIdx) => (
                              <button
                                key={hIdx}
                                type="button"
                                onClick={() => {
                                  setSelectedHook(hook);
                                  setPitch(`Hey ${pitchBrief.brandName} team!\n\nCreative Angle: ${hook}\n\nAs an active Indian tech creator with 245k+ followers, I will showcase ${pitchBrief.brandName} seamlessly in 4K resolution with official GST invoicing & tracking links.`);
                                }}
                                className={`p-3 rounded-[14px] border text-left text-[11px] leading-relaxed transition ${
                                  selectedHook === hook
                                    ? 'bg-royal-600/20 border-royal-500/50 text-white font-semibold'
                                    : 'bg-white/[0.03] border-white/[0.06] text-slate-400 hover:text-white'
                                }`}
                              >
                                <Sparkles className="h-3.5 w-3.5 text-royal-400 mb-1" />
                                <span>{hook}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">
                            Creator Pitch, Creative Angle & Script Concept
                          </label>
                          <textarea
                            rows={5}
                            required
                            value={pitch}
                            onChange={(e) => setPitch(e.target.value)}
                            className="w-full rounded-[14px] border border-white/[0.1] bg-black/40 px-3.5 py-2.5 text-xs text-white focus:border-royal-500 focus:outline-none leading-relaxed"
                          />
                        </div>

                        {/* Media Kit Pill */}
                        <div className="p-3.5 rounded-[16px] bg-royal-600/10 border border-royal-500/25 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-royal-400" />
                            <span className="text-slate-300 font-medium">Auto-Attached AI Verified Media Kit</span>
                          </div>
                          <span className="text-[11px] font-mono text-royal-300 font-bold">245k Followers • 7.8% Engagement</span>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: DELIVERABLES & ADD-ONS */}
                    {formStep === 2 && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-2">
                            Select Agreed Deliverables
                          </label>
                          <div className="space-y-2">
                            {pitchBrief.deliverables.map((del, dIdx) => (
                              <label
                                key={dIdx}
                                className="p-3 rounded-[14px] bg-white/[0.03] border border-white/[0.06] flex items-center gap-3 text-xs text-slate-200 cursor-pointer hover:bg-white/[0.05]"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedDeliverables.includes(del)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedDeliverables([...selectedDeliverables, del]);
                                    } else {
                                      setSelectedDeliverables(selectedDeliverables.filter(d => d !== del));
                                    }
                                  }}
                                  className="rounded border-white/20 text-royal-600 focus:ring-0"
                                />
                                <span>{del}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Add-ons */}
                        <div className="pt-2 space-y-2">
                          <label className="block text-xs font-medium text-slate-300">
                            High-Value Commercial Add-ons (Boost Deal Size)
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                            <label className={`p-3 rounded-[14px] border cursor-pointer transition ${whitelistingAddon ? 'bg-royal-600/20 border-royal-500/50 text-white' : 'bg-white/[0.03] border-white/[0.06] text-slate-400'}`}>
                              <input
                                type="checkbox"
                                checked={whitelistingAddon}
                                onChange={(e) => setWhitelistingAddon(e.target.checked)}
                                className="hidden"
                              />
                              <span className="font-bold block text-white text-[11px]">30-Day Meta Ads Whitelisting</span>
                              <span className="text-[10px] text-emerald-400 font-mono">+₹25,000</span>
                            </label>

                            <label className={`p-3 rounded-[14px] border cursor-pointer transition ${rawFootageAddon ? 'bg-royal-600/20 border-royal-500/50 text-white' : 'bg-white/[0.03] border-white/[0.06] text-slate-400'}`}>
                              <input
                                type="checkbox"
                                checked={rawFootageAddon}
                                onChange={(e) => setRawFootageAddon(e.target.checked)}
                                className="hidden"
                              />
                              <span className="font-bold block text-white text-[11px]">Raw 4K B-Roll Footage</span>
                              <span className="text-[10px] text-emerald-400 font-mono">+₹15,000</span>
                            </label>

                            <label className={`p-3 rounded-[14px] border cursor-pointer transition ${exclusivityAddon ? 'bg-royal-600/20 border-royal-500/50 text-white' : 'bg-white/[0.03] border-white/[0.06] text-slate-400'}`}>
                              <input
                                type="checkbox"
                                checked={exclusivityAddon}
                                onChange={(e) => setExclusivityAddon(e.target.checked)}
                                className="hidden"
                              />
                              <span className="font-bold block text-white text-[11px]">30-Day Category Exclusivity</span>
                              <span className="text-[10px] text-emerald-400 font-mono">+₹30,000</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: COMMERCIALS & GST CALCULATOR */}
                    {formStep === 3 && (
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-medium text-slate-300">
                              Your Base Creator Fee (INR ₹)
                            </label>
                            <span className="text-xs font-bold text-royal-400 font-mono">
                              ₹{formatINR(proposedAmount)}
                            </span>
                          </div>
                          <input
                            type="range"
                            min={pitchBrief.budgetMin * 0.8}
                            max={pitchBrief.budgetMax * 1.3}
                            step={5000}
                            value={proposedAmount}
                            onChange={(e) => setProposedAmount(Number(e.target.value))}
                            className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-royal-500"
                          />
                        </div>

                        {/* Live Financial Breakdown Card */}
                        <div className="p-4 rounded-[18px] bg-black/50 border border-white/[0.08] space-y-2 text-xs font-mono">
                          <div className="flex items-center justify-between text-slate-400">
                            <span>Base Creator Fee:</span>
                            <span className="text-white font-bold">₹{formatINR(gstCalculation.base)}</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-400">
                            <span>+ 18% GST (SAC 998313):</span>
                            <span className="text-royal-300 font-bold">+₹{formatINR(gstCalculation.gst18)}</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-400">
                            <span>Total Invoice Value:</span>
                            <span className="text-white font-bold">₹{formatINR(gstCalculation.invoiceTotal)}</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-400">
                            <span>Less 1% TDS (Section 194J):</span>
                            <span className="text-rose-400 font-bold">-₹{formatINR(gstCalculation.tds1)}</span>
                          </div>
                          <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
                            <span className="text-emerald-400 font-bold">Net Direct Bank Payout:</span>
                            <span className="text-emerald-400 font-bold text-sm">₹{formatINR(gstCalculation.netPayout)}</span>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-400 font-mono leading-relaxed">
                          🛡️ <strong>NPCI Escrow:</strong> ₹{formatINR(gstCalculation.escrowAdvance50)} (50%) will be locked upon proposal acceptance, and 100% disbursed via 1-Click UPI upon delivery sign-off.
                        </p>
                      </div>
                    )}

                    {/* STEP 4: TIMELINE & SCHEDULE */}
                    {formStep === 4 && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-2">
                            Select Turnaround Timeline
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {[
                              { days: 3, label: 'Express Delivery (3 Days)', sub: 'Fast-track approval' },
                              { days: 7, label: 'Standard Production (7 Days)', sub: 'Recommended' },
                              { days: 14, label: 'High-Production (14 Days)', sub: 'For dedicated videos' },
                            ].map((item) => (
                              <button
                                key={item.days}
                                type="button"
                                onClick={() => setTimelineDays(item.days)}
                                className={`p-3 rounded-[14px] border text-left text-xs transition ${
                                  timelineDays === item.days
                                    ? 'bg-royal-600/20 border-royal-500/50 text-white font-bold'
                                    : 'bg-white/[0.03] border-white/[0.06] text-slate-400 hover:text-white'
                                }`}
                              >
                                <Clock className="h-4 w-4 text-royal-400 mb-1" />
                                <span className="block">{item.label}</span>
                                <span className="text-[10px] text-slate-500 font-mono font-normal">{item.sub}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Schedule Projection */}
                        <div className="p-4 rounded-[18px] bg-black/40 border border-white/[0.08] space-y-2 text-xs font-mono">
                          <span className="text-[10px] text-slate-400 block uppercase">Projected Milestones</span>
                          <div className="flex items-center justify-between text-slate-300">
                            <span>• Script / Rough Cut Draft:</span>
                            <span className="text-white font-bold">{Math.max(2, Math.round(timelineDays * 0.4))} Days from start</span>
                          </div>
                          <div className="flex items-center justify-between text-slate-300">
                            <span>• Final 4K Content Go-Live:</span>
                            <span className="text-emerald-400 font-bold">{timelineDays} Days</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* MODAL FOOTER BUTTONS */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                      {formStep > 1 ? (
                        <button
                          type="button"
                          onClick={() => setFormStep((prev) => (prev - 1) as any)}
                          className="px-4 py-2.5 rounded-[12px] bg-white/[0.04] text-xs font-semibold text-slate-300 hover:text-white"
                        >
                          Back
                        </button>
                      ) : (
                        <div />
                      )}

                      {formStep < 4 ? (
                        <button
                          type="button"
                          onClick={() => setFormStep((prev) => (prev + 1) as any)}
                          className="px-5 py-2.5 rounded-[14px] bg-royal-600 hover:bg-royal-500 text-white text-xs font-bold transition shadow-royal flex items-center gap-1.5"
                        >
                          <span>Next Step</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      ) : (
                        <RippleButton
                          type="submit"
                          className="px-6 py-3 rounded-[16px] bg-royal-600 hover:bg-royal-500 text-xs font-bold text-white shadow-royal flex items-center gap-2"
                        >
                          <Send className="h-4 w-4" />
                          <span>Submit Official Proposal (₹{formatINR(totalCalculatedProposalFee)})</span>
                        </RippleButton>
                      )}
                    </div>

                  </form>
                )}

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* MATCH SCORE BREAKDOWN MODAL */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {matchModalBrief && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl">
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                className="relative w-full max-w-lg rounded-[26px] border border-white/[0.12] bg-[#0A0D17] p-6 sm:p-7 shadow-2xl text-slate-100 space-y-5"
              >
                <button
                  onClick={() => setMatchModalBrief(null)}
                  className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-white/[0.08] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
                  <img src={matchModalBrief.brandLogo} alt={matchModalBrief.brandName} className="h-12 w-12 rounded-[16px] object-cover bg-black" />
                  <div>
                    <h3 className="font-display text-base font-bold text-white flex items-center gap-1.5">
                      <span>{matchModalBrief.brandName} Match Score Breakdown</span>
                    </h3>
                    <span className="text-xs text-emerald-400 font-mono font-bold">
                      🔥 Overall Compatibility: {matchModalBrief.matchScore}%
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: 'Audience Demographic Fit (18-28 Gen-Z & Tech)', score: matchModalBrief.matchBreakdown?.audienceDemographics || 98 },
                    { label: 'Content Tone & High-Retention Style', score: matchModalBrief.matchBreakdown?.contentStyle || 97 },
                    { label: 'Engagement Rate vs Sector Benchmark (7.8% vs 3.2%)', score: matchModalBrief.matchBreakdown?.engagementRate || 96 },
                    { label: 'Brand Safety & SEBI/GST Compliance Score', score: matchModalBrief.matchBreakdown?.brandSafety || 100 },
                  ].map((metric, mIdx) => (
                    <div key={mIdx} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-300">{metric.label}</span>
                        <span className="text-emerald-400 font-bold">{metric.score}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/[0.08] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-royal-500 to-emerald-400 rounded-full"
                          style={{ width: `${metric.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {matchModalBrief.matchBreakdown?.reasons && (
                  <div className="p-4 rounded-[18px] bg-white/[0.03] border border-white/[0.06] space-y-2 text-xs">
                    <span className="font-bold text-royal-300 font-mono text-[11px] block uppercase">
                      Why Your Channel Got This Match
                    </span>
                    <ul className="space-y-1.5 text-slate-300 text-[11px] list-disc list-inside">
                      {matchModalBrief.matchBreakdown.reasons.map((r, rIdx) => (
                        <li key={rIdx}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-2">
                  <RippleButton
                    onClick={() => {
                      const brief = matchModalBrief;
                      setMatchModalBrief(null);
                      handleOpenPitch(brief);
                    }}
                    className="w-full rounded-[14px] bg-royal-600 hover:bg-royal-500 py-3 text-xs font-bold text-white shadow-royal flex items-center justify-center gap-2"
                  >
                    <span>Apply to {matchModalBrief.brandName}</span>
                    <ArrowRight className="h-4 w-4" />
                  </RippleButton>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* DELIVERABLE LINK SUBMISSION MODAL */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {deliverableModalProp && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl">
              <motion.div
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                className="relative w-full max-w-md rounded-[26px] border border-white/[0.12] bg-[#0A0D17] p-6 sm:p-7 shadow-2xl text-slate-100 space-y-4"
              >
                <button
                  onClick={() => setDeliverableModalProp(null)}
                  className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-white/[0.08] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
                  <img src={deliverableModalProp.brandLogo} alt={deliverableModalProp.brandName} className="h-10 w-10 rounded-[12px] object-cover bg-black" />
                  <div>
                    <h3 className="font-display text-base font-bold text-white">
                      Submit Deliverable: {deliverableModalProp.brandName}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Escrow Amount: ₹{formatINR(deliverableModalProp.proposedAmount)}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSaveDeliverable} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Deliverable Format Title
                    </label>
                    <input
                      type="text"
                      required
                      value={deliverableTitle}
                      onChange={(e) => setDeliverableTitle(e.target.value)}
                      placeholder="e.g. 60s 4K Instagram Reel (Live)"
                      className="w-full rounded-[12px] border border-white/[0.1] bg-black/40 px-3.5 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Live URL or Frame.io / Drive Preview Link
                    </label>
                    <input
                      type="url"
                      required
                      value={deliverableUrl}
                      onChange={(e) => setDeliverableUrl(e.target.value)}
                      placeholder="https://instagram.com/reel/... or Frame.io link"
                      className="w-full rounded-[12px] border border-white/[0.1] bg-black/40 px-3.5 py-2 text-xs text-white focus:border-royal-500 focus:outline-none font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Current Views Reach
                      </label>
                      <input
                        type="text"
                        value={deliverableViews}
                        onChange={(e) => setDeliverableViews(e.target.value)}
                        placeholder="145,000 Views"
                        className="w-full rounded-[12px] border border-white/[0.1] bg-black/40 px-3.5 py-2 text-xs text-white focus:border-royal-500 focus:outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Engagement Rate
                      </label>
                      <input
                        type="text"
                        value={deliverableEngagement}
                        onChange={(e) => setDeliverableEngagement(e.target.value)}
                        placeholder="7.6% Engagement"
                        className="w-full rounded-[12px] border border-white/[0.1] bg-black/40 px-3.5 py-2 text-xs text-white focus:border-royal-500 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <RippleButton
                    type="submit"
                    className="w-full rounded-[14px] bg-royal-600 hover:bg-royal-500 py-3 text-xs font-bold text-white shadow-royal flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Submit & Request Brand Verification</span>
                  </RippleButton>
                </form>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </PageTransition>
  );
}
