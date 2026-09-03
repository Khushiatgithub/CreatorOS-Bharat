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
  CheckCircle2
} from 'lucide-react';
import { BrandCollabBrief } from '@/types';
import { PageTransition, HoverCard, RippleButton, AnimatedCounter } from '@/components/ui/motion';
import { motion, AnimatePresence } from 'framer-motion';

export default function BrandMarketplaceLiveBoard() {
  const { brandBriefs, brandProposals, applyToBrandBrief, activeCreator } = useCreatorStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [savedBriefIds, setSavedBriefIds] = useState<string[]>(['brief_boat', 'brief_swiggy']);
  const [activeTab, setActiveTab] = useState<'all' | 'saved' | 'pitches'>('all');
  
  // Drawer & Modal State
  const [drawerBrief, setDrawerBrief] = useState<BrandCollabBrief | null>(null);
  const [pitchBrief, setPitchBrief] = useState<BrandCollabBrief | null>(null);

  // Pitch form state
  const [proposedAmount, setProposedAmount] = useState<number>(75000);
  const [pitch, setPitch] = useState('');
  const [timelineDays, setTimelineDays] = useState<number>(7);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const toggleSaveBrief = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSavedBriefIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filtered campaigns
  const filteredCampaigns = useMemo(() => {
    return brandBriefs.filter((brief) => {
      // Search filter
      const matchesSearch = 
        brief.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brief.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (brief.category && brief.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        brief.deliverables.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory = 
        selectedCategory === 'ALL' || 
        brief.category === selectedCategory || 
        brief.brandName.toLowerCase() === selectedCategory.toLowerCase();

      // Saved tab filter
      if (activeTab === 'saved') {
        return matchesSearch && matchesCategory && savedBriefIds.includes(brief.id);
      }

      return matchesSearch && matchesCategory;
    });
  }, [brandBriefs, searchQuery, selectedCategory, activeTab, savedBriefIds]);

  const totalBudgetPool = brandBriefs.reduce((sum, b) => sum + b.budgetMax, 0);

  const handleOpenPitch = (brief: BrandCollabBrief, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPitchBrief(brief);
    setDrawerBrief(null);
    const midBudget = Math.round((brief.budgetMin + brief.budgetMax) / 2);
    setProposedAmount(midBudget);
    
    setPitch(
      `Hey ${brief.brandName} team! As an active Indian tech & creator educator with 245k+ followers and 7.8% engagement, I will seamlessly integrate ${brief.brandName} into my upcoming high-retention content. I will deliver all requested items (${brief.deliverables[0]}) with official GST invoicing (SAC 998313), full tracking links, and milestone escrow.`
    );
  };

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pitchBrief) return;

    applyToBrandBrief(
      pitchBrief.id,
      proposedAmount,
      pitch,
      pitchBrief.deliverables,
      timelineDays
    );

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setPitchBrief(null);
    }, 2200);
  };

  return (
    <PageTransition>
      <div className="space-y-6 font-sans">
        
        {/* TOP BOARD HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Brand Marketplace & Collab Deals</span>
              <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 flex items-center gap-1 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>6 Verified Indian Brands</span>
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Direct brand sponsorships from Nykaa, boAt, Zomato, Swiggy, Myntra, and Mamaearth with NPCI Escrow milestones.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="rounded-[14px] border border-royal-500/30 bg-royal-600/15 px-3.5 py-2 font-bold text-royal-300 shadow-royal-sm">
              Total Budget Pool: ₹<AnimatedCounter value={totalBudgetPool} />
            </span>
          </div>
        </div>

        {/* TOP BOARD TELEMETRY CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            <p className="text-xs text-slate-400">Live Campaigns</p>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1 font-mono">
              <AnimatedCounter value={brandBriefs.length} />
            </div>
            <p className="text-[11px] text-emerald-400 mt-1 font-mono">100% Verified Sponsors</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            <p className="text-xs text-slate-400">Avg. Creator Match</p>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-royal-400 mt-1 font-mono">
              <AnimatedCounter value={95.2} decimals={1} suffix="%" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">AI Demographic Alignment</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            <p className="text-xs text-slate-400">Escrow Guarantee</p>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1 font-mono">
              100%
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Milestone Escrow Payouts</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            <p className="text-xs text-slate-400">Saved & Pitched</p>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1 font-mono">
              <AnimatedCounter value={savedBriefIds.length + brandProposals.length} />
            </div>
            <p className="text-[11px] text-royal-300 mt-1 font-mono">{brandProposals.length} Proposals Submitted</p>
          </HoverCard>
        </div>

        {/* SEARCH, TABS & BRAND FILTER BAR */}
        <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-4 sm:p-5 shadow-glass-card space-y-3.5">
          
          {/* Main Controls Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            
            {/* View Switcher Tabs (All / Saved / My Pitches) */}
            <div className="flex items-center gap-1.5 p-1 rounded-[14px] bg-white/[0.04] border border-white/[0.08] self-start">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-[10px] text-xs font-semibold transition ${
                  activeTab === 'all'
                    ? 'bg-royal-600 text-white shadow-royal-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All Campaigns ({brandBriefs.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('saved')}
                className={`px-3 py-1.5 rounded-[10px] text-xs font-semibold flex items-center gap-1 transition ${
                  activeTab === 'saved'
                    ? 'bg-royal-600 text-white shadow-royal-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Bookmark className="h-3.5 w-3.5" />
                <span>Saved ({savedBriefIds.length})</span>
              </button>

              {brandProposals.length > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveTab('pitches')}
                  className={`px-3 py-1.5 rounded-[10px] text-xs font-semibold flex items-center gap-1 transition ${
                    activeTab === 'pitches'
                      ? 'bg-royal-600 text-white shadow-royal-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileCheck className="h-3.5 w-3.5" />
                  <span>My Pitches ({brandProposals.length})</span>
                </button>
              )}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px] flex-1 sm:flex-none">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Nykaa, boAt, Zomato, Swiggy..."
                className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-royal-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white text-xs"
                >
                  ×
                </button>
              )}
            </div>

          </div>

          {/* Indian Brand Chips Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-white/[0.06]">
            {[
              { id: 'ALL', label: 'All Brands (6)' },
              { id: 'Nykaa', label: 'Nykaa (Beauty & Glow)' },
              { id: 'boAt', label: 'boAt (Audio & Wearables)' },
              { id: 'Zomato', label: 'Zomato (Food & Dining)' },
              { id: 'Swiggy', label: 'Swiggy (Quick Commerce)' },
              { id: 'Myntra', label: 'Myntra (Fashion & Fits)' },
              { id: 'Mamaearth', label: 'Mamaearth (Clean D2C)' },
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

        {/* SECTION 1: MY ACTIVE PITCHES VIEW */}
        {activeTab === 'pitches' && (
          <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-5 sm:p-6 shadow-glass-card space-y-3">
            <h2 className="font-display text-base font-bold text-white mb-2 flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-royal-400" />
              <span>Submitted Sponsorship Proposals ({brandProposals.length})</span>
            </h2>

            <div className="space-y-2.5">
              {brandProposals.map((prop) => (
                <div key={prop.id} className="p-4 rounded-[16px] bg-white/[0.03] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white">{prop.brandName}</span>
                      <span className="rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold uppercase font-mono">
                        {prop.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">{prop.briefTitle}</p>
                    <p className="text-[11px] text-slate-400 mt-1 italic line-clamp-1">"{prop.pitch}"</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-display text-base font-bold text-emerald-400 font-mono">
                      ₹{formatINR(prop.proposedAmount)}
                    </span>
                    <p className="text-[10px] text-slate-500 font-mono">Timeline: {prop.timelineDays} Days • Escrow Protected</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: LIVE CAMPAIGN CARDS GRID */}
        {activeTab !== 'pitches' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCampaigns.length === 0 ? (
              <div className="col-span-full py-16 text-center text-slate-400 text-xs rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-6">
                No campaigns match your search / filter criteria.
              </div>
            ) : (
              filteredCampaigns.map((campaign) => {
                const isSaved = savedBriefIds.includes(campaign.id);

                return (
                  <HoverCard
                    hoverY={-3}
                    key={campaign.id}
                    onClick={() => setDrawerBrief(campaign)}
                    className="cursor-pointer rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-6 shadow-glass-card flex flex-col justify-between hover:border-royal-500/40 relative group transition-all"
                  >
                    <div>
                      
                      {/* Brand Header Row */}
                      <div className="flex items-start justify-between gap-3 mb-4">
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
                            <span className="inline-block rounded-md bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium text-slate-300 font-mono mt-0.5">
                              {campaign.category || campaign.industry}
                            </span>
                          </div>
                        </div>

                        {/* Top Actions: Match Score & Bookmark */}
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 text-[11px] font-extrabold font-mono shadow-sm">
                            <Flame className="h-3 w-3 fill-emerald-400" />
                            <span>{campaign.matchScore || 94}%</span>
                          </span>

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

                      {/* Campaign Title & Goal */}
                      <h4 className="font-display text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug">
                        {campaign.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {campaign.description}
                      </p>

                      {/* Deliverables List Preview */}
                      <div className="my-4 space-y-1.5 rounded-[16px] bg-black/40 p-3.5 text-xs border border-white/[0.05]">
                        <p className="text-[10px] uppercase font-bold text-slate-400 font-mono flex items-center justify-between">
                          <span>Required Deliverables:</span>
                          <span className="text-royal-400 font-semibold">{campaign.deliverables.length} Items</span>
                        </p>
                        {campaign.deliverables.slice(0, 2).map((del, dIdx) => (
                          <div key={dIdx} className="text-slate-300 text-[11px] flex items-start gap-1.5 pt-0.5">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="truncate">{del}</span>
                          </div>
                        ))}
                      </div>

                      {/* Target Niches */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {campaign.targetNiches.map((niche, nIdx) => (
                          <span key={nIdx} className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[9px] font-semibold text-slate-400 border border-white/[0.06]">
                            #{niche}
                          </span>
                        ))}
                      </div>

                    </div>

                    {/* Bottom Strip: Budget, Deadline & Action Button */}
                    <div className="pt-4 border-t border-white/[0.08] space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase font-bold font-mono">Sponsorship Budget</p>
                          <span className="font-display text-base font-extrabold text-white font-mono">
                            ₹{formatINR(campaign.budgetMin)} - ₹{formatINR(campaign.budgetMax)}
                          </span>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-slate-500 uppercase font-bold font-mono">Deadline</p>
                          <span className="text-[11px] text-amber-400 font-mono font-semibold flex items-center justify-end gap-1">
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
                          View Details
                        </button>

                        <RippleButton
                          onClick={(e) => handleOpenPitch(campaign, e)}
                          className="w-full rounded-[14px] bg-royal-600 hover:bg-royal-500 py-2.5 text-xs font-bold text-white shadow-royal flex items-center justify-center gap-1.5"
                        >
                          <span>Apply Now</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </RippleButton>
                      </div>
                    </div>

                  </HoverCard>
                );
              })
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* SLIDE-OVER CAMPAIGN DETAIL DRAWER */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {drawerBrief && (
            <div className="fixed inset-0 z-50 overflow-hidden">
              {/* Backdrop */}
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
                  className="w-screen max-w-lg bg-[#0A0D17] border-l border-white/[0.12] shadow-2xl p-6 sm:p-7 overflow-y-auto text-slate-100 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    
                    {/* Drawer Header */}
                    <div className="flex items-start justify-between pb-4 border-b border-white/[0.08]">
                      <div className="flex items-center gap-3">
                        <img src={drawerBrief.brandLogo} alt={drawerBrief.brandName} className="h-12 w-12 rounded-[16px] object-cover bg-black" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h2 className="font-display text-lg font-bold text-white">{drawerBrief.brandName}</h2>
                            <ShieldCheck className="h-4 w-4 text-royal-400" />
                          </div>
                          <span className="text-xs text-slate-400 font-mono">{drawerBrief.category}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => setDrawerBrief(null)}
                        className="rounded-full p-2 text-slate-400 hover:bg-white/[0.08] hover:text-white"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Campaign Title & Match Score */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                          Campaign Brief Overview
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold font-mono">
                          <Flame className="h-3 w-3 fill-emerald-400" />
                          <span>{drawerBrief.matchScore}% Creator Match</span>
                        </span>
                      </div>
                      <h3 className="font-display text-base sm:text-lg font-bold text-white leading-snug">
                        {drawerBrief.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed pt-1">
                        {drawerBrief.description}
                      </p>
                    </div>

                    {/* Budget & Timeline Metrics */}
                    <div className="grid grid-cols-2 gap-3 p-4 rounded-[18px] bg-black/40 border border-white/[0.08] text-xs font-mono">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Budget Range</span>
                        <span className="text-sm font-bold text-white">
                          ₹{formatINR(drawerBrief.budgetMin)} - ₹{formatINR(drawerBrief.budgetMax)}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase">Deadline</span>
                        <span className="text-sm font-bold text-amber-400 flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {drawerBrief.deadline}
                        </span>
                      </div>
                    </div>

                    {/* Full Required Deliverables */}
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                        Required Deliverables & Format
                      </span>
                      <div className="space-y-2">
                        {drawerBrief.deliverables.map((del, idx) => (
                          <div key={idx} className="p-3 rounded-[14px] bg-white/[0.03] border border-white/[0.06] flex items-start gap-2.5 text-xs text-slate-200">
                            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Escrow Milestone & Security Details */}
                    <div className="p-4 rounded-[18px] bg-royal-600/10 border border-royal-500/25 space-y-2 text-xs">
                      <div className="flex items-center gap-2 text-royal-300 font-bold">
                        <ShieldCheck className="h-4 w-4 text-royal-400" />
                        <span>Escrow Protected Milestone Settlement</span>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        • <strong>Milestone 1:</strong> 50% locked into verified NPCI Escrow upon proposal acceptance.
                        <br />
                        • <strong>Milestone 2:</strong> 50% automatically disbursed via 1-click UPI upon creative delivery and brand sign-off.
                      </p>
                    </div>

                  </div>

                  {/* Drawer Footer Actions */}
                  <div className="pt-6 border-t border-white/[0.08] space-y-2.5">
                    <RippleButton
                      onClick={() => handleOpenPitch(drawerBrief)}
                      className="w-full rounded-[16px] bg-royal-600 hover:bg-royal-500 py-3 text-xs font-bold text-white shadow-royal flex items-center justify-center gap-2"
                    >
                      <span>Apply to this Campaign</span>
                      <ArrowRight className="h-4 w-4" />
                    </RippleButton>
                    
                    <button
                      type="button"
                      onClick={(e) => toggleSaveBrief(e, drawerBrief.id)}
                      className="w-full rounded-[14px] bg-white/[0.04] hover:bg-white/[0.08] py-2.5 text-xs font-semibold text-slate-300 flex items-center justify-center gap-1.5"
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                      <span>{savedBriefIds.includes(drawerBrief.id) ? 'Saved to Your List' : 'Save Campaign for Later'}</span>
                    </button>
                  </div>

                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* APPLY / PITCH SUBMISSION MODAL */}
        {/* ========================================================================= */}
        {pitchBrief && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl overflow-y-auto">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative w-full max-w-xl rounded-[24px] border border-white/[0.12] bg-[#0A0D17] p-6 sm:p-7 shadow-2xl text-slate-100 my-8 max-h-[92vh] overflow-y-auto"
            >
              <button
                onClick={() => setPitchBrief(null)}
                className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-white/[0.08] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              {submittedSuccess ? (
                <div className="py-10 text-center animate-fade-in space-y-3">
                  <div className="h-16 w-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                    <CheckCircle className="h-9 w-9" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Proposal Submitted to {pitchBrief.brandName}!
                  </h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Your pitch of <strong className="text-emerald-400 font-mono">₹{formatINR(proposedAmount)}</strong> and verified AI Media Kit have been delivered to the brand marketing team.
                  </p>
                  <p className="text-[11px] text-royal-400 font-mono pt-2">
                    Escrow Ref: ESC_{Date.now().toString().slice(-6)} • Notification updates will be sent to your WhatsApp.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendProposal} className="space-y-4">
                  
                  {/* Brand header */}
                  <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
                    <img src={pitchBrief.brandLogo} alt={pitchBrief.brandName} className="h-11 w-11 rounded-[14px] object-cover bg-black" />
                    <div>
                      <h3 className="font-display text-base font-bold text-white">
                        Submit Proposal: {pitchBrief.brandName}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        Budget: ₹{formatINR(pitchBrief.budgetMin)} - ₹{formatINR(pitchBrief.budgetMax)} • Match: {pitchBrief.matchScore}%
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Your Proposed Fee (INR ₹)
                      </label>
                      <input
                        type="number"
                        required
                        value={proposedAmount}
                        onChange={(e) => setProposedAmount(Number(e.target.value))}
                        className="w-full rounded-[14px] border border-white/[0.1] bg-black/40 px-3.5 py-2.5 text-xs text-royal-400 font-mono font-bold focus:border-royal-500 focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-500 font-mono">+18% GST Applicable (SAC 998313)</span>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Turnaround Timeline (Days)
                      </label>
                      <select
                        value={timelineDays}
                        onChange={(e) => setTimelineDays(Number(e.target.value))}
                        className="w-full rounded-[14px] border border-white/[0.1] bg-black/40 px-3.5 py-2.5 text-xs text-white focus:border-royal-500 focus:outline-none font-mono"
                      >
                        <option value={3}>3 Days (Express Delivery)</option>
                        <option value={7}>7 Days (Standard)</option>
                        <option value={14}>14 Days (High Production Video)</option>
                      </select>
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

                  {/* Attached Media Kit Pill */}
                  <div className="p-3 rounded-[14px] bg-royal-600/10 border border-royal-500/20 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-royal-400" />
                      <span className="text-slate-300 font-medium">Auto-Attached AI Verified Media Kit</span>
                    </div>
                    <span className="text-[11px] font-mono text-royal-300 font-bold">245k Followers • 7.8% Engagement</span>
                  </div>

                  <RippleButton
                    type="submit"
                    className="w-full rounded-[16px] bg-royal-600 hover:bg-royal-500 py-3 text-xs font-bold text-white shadow-royal flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Formal Sponsorship Proposal (₹{formatINR(proposedAmount)})</span>
                  </RippleButton>

                </form>
              )}

            </motion.div>
          </div>
        )}

      </div>
    </PageTransition>
  );
}
