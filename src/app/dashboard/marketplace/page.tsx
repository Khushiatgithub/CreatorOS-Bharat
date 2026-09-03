'use client';

import React, { useState, useMemo } from 'react';
import { useCreatorStore } from '@/lib/store';
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
  Check
} from 'lucide-react';
import { BrandCollabBrief } from '@/types';
import { PageTransition, HoverCard, RippleButton, AnimatedCounter } from '@/components/ui/motion';
import { motion, AnimatePresence } from 'framer-motion';

export default function BrandMarketplaceLiveBoard() {
  const { brandBriefs, brandProposals, applyToBrandBrief, activeCreator } = useCreatorStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedBrief, setSelectedBrief] = useState<BrandCollabBrief | null>(null);

  // Proposal Submission State
  const [proposedAmount, setProposedAmount] = useState<number>(75000);
  const [pitch, setPitch] = useState('');
  const [timelineDays, setTimelineDays] = useState<number>(7);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Filtered campaigns
  const filteredCampaigns = useMemo(() => {
    return brandBriefs.filter((brief) => {
      const matchesSearch = brief.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        brief.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (brief.category && brief.category.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === 'ALL' || brief.category === selectedCategory || brief.brandName === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [brandBriefs, searchQuery, selectedCategory]);

  const totalBudgetPool = brandBriefs.reduce((sum, b) => sum + b.budgetMax, 0);

  const handleOpenPitch = (brief: BrandCollabBrief) => {
    setSelectedBrief(brief);
    const midBudget = Math.round((brief.budgetMin + brief.budgetMax) / 2);
    setProposedAmount(midBudget);
    
    // Auto-generate creator tailored pitch concept
    setPitch(
      `Hey ${brief.brandName} team! As an active Indian tech & creator educator with 240k+ followers and 7.6% engagement, I will seamlessly integrate ${brief.brandName} into my upcoming high-retention content. I will deliver all requested items (${brief.deliverables[0]}) with official GST invoicing and trackable UTM links.`
    );
  };

  const handleSendProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBrief) return;

    applyToBrandBrief(
      selectedBrief.id,
      proposedAmount,
      pitch,
      selectedBrief.deliverables,
      timelineDays
    );

    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setSelectedBrief(null);
    }, 2400);
  };

  return (
    <PageTransition>
      <div className="space-y-6 font-sans">
        
        {/* TOP BOARD HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Live Brand Campaign Board</span>
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
              Total Budget: ₹<AnimatedCounter value={totalBudgetPool} />
            </span>
          </div>
        </div>

        {/* TOP BOARD METRICS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            <p className="text-xs text-slate-400">Open Campaigns</p>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1 font-mono">
              <AnimatedCounter value={brandBriefs.length} />
            </div>
            <p className="text-[11px] text-emerald-400 mt-1 font-mono">100% Verified Sponsors</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            <p className="text-xs text-slate-400">Avg. Creator Match</p>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-royal-400 mt-1 font-mono">
              <AnimatedCounter value={94.3} decimals={1} suffix="%" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">AI Demographic Alignment</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            <p className="text-xs text-slate-400">Escrow Security</p>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1 font-mono">
              100%
            </div>
            <p className="text-[11px] text-emerald-400 mt-1">Guaranteed Payout on Delivery</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            <p className="text-xs text-slate-400">My Pitches</p>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-royal-400 mt-1 font-mono">
              <AnimatedCounter value={brandProposals.length} />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Pitches In Review</p>
          </HoverCard>
        </div>

        {/* SEARCH & CATEGORY FILTER BAR */}
        <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-4 shadow-glass-card space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by brand name (Nykaa, boAt, Zomato...), category, or deliverables..."
                className="w-full rounded-[14px] border border-white/[0.1] bg-black/50 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-royal-500 focus:outline-none"
              />
            </div>

            {/* Quick Filter count */}
            <div className="text-xs text-slate-400 font-mono shrink-0 pl-1">
              Showing <span className="text-white font-bold">{filteredCampaigns.length}</span> active campaigns
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
            {[
              { id: 'ALL', label: 'All Brands (6)' },
              { id: 'boAt', label: 'boAt (Audio & Wearables)' },
              { id: 'Swiggy', label: 'Swiggy (Quick Commerce)' },
              { id: 'Zomato', label: 'Zomato (Food & Dining)' },
              { id: 'Nykaa', label: 'Nykaa (Beauty & Glow)' },
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

        {/* SECTION 1: MY SUBMITTED PITCHES TRACKER */}
        {brandProposals.length > 0 && (
          <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-5 sm:p-6 shadow-glass-card">
            <h2 className="font-display text-base font-bold text-white mb-3 flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-royal-400" />
              <span>My Active Sponsorship Pitches ({brandProposals.length})</span>
            </h2>

            <div className="space-y-2.5">
              {brandProposals.map((prop) => (
                <div key={prop.id} className="p-3.5 rounded-[16px] bg-white/[0.03] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">{prop.brandName}</span>
                      <span className="rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-bold uppercase font-mono">
                        {prop.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">{prop.briefTitle}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-display text-base font-bold text-emerald-400 font-mono">₹{prop.proposedAmount.toLocaleString('en-IN')}</span>
                    <p className="text-[10px] text-slate-500 font-mono">Timeline: {prop.timelineDays} Days • Escrow Ready</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: LIVE CAMPAIGN CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCampaigns.map((campaign) => (
            <HoverCard
              hoverY={-3}
              key={campaign.id}
              className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-6 shadow-glass-card flex flex-col justify-between hover:border-royal-500/35 relative group"
            >
              <div>
                
                {/* Brand Header Row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-[14px] overflow-hidden bg-black/50 border border-white/10 p-0.5 shrink-0 shadow-md">
                      <img src={campaign.brandLogo} alt={campaign.brandName} className="h-full w-full object-cover rounded-[10px]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-display text-base font-bold text-white">{campaign.brandName}</h3>
                        {campaign.verifiedBrand && (
                          <span title="Verified Sponsor">
                            <ShieldCheck className="h-4 w-4 text-royal-400" />
                          </span>
                        )}
                      </div>
                      <span className="inline-block rounded-md bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium text-slate-300 font-mono mt-0.5">
                        {campaign.category || campaign.industry}
                      </span>
                    </div>
                  </div>

                  {/* Creator Match Score Badge */}
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 text-[11px] font-extrabold font-mono shadow-sm">
                      <Flame className="h-3 w-3 fill-emerald-400" />
                      <span>{campaign.matchScore || 94}% Match</span>
                    </span>
                  </div>
                </div>

                {/* Campaign Title & Goal */}
                <h4 className="font-display text-sm sm:text-base font-bold text-white line-clamp-2 leading-snug">
                  {campaign.title}
                </h4>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {campaign.description}
                </p>

                {/* Deliverables List */}
                <div className="my-4 space-y-1.5 rounded-[16px] bg-black/40 p-3.5 text-xs border border-white/[0.05]">
                  <p className="text-[10px] uppercase font-bold text-slate-400 font-mono flex items-center justify-between">
                    <span>Required Deliverables:</span>
                    <span className="text-royal-400">{campaign.deliverables.length} Items</span>
                  </p>
                  {campaign.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="text-slate-300 text-[11px] flex items-start gap-1.5 pt-0.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{del}</span>
                    </div>
                  ))}
                </div>

                {/* Target Audience Niches */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {campaign.targetNiches.map((niche, nIdx) => (
                    <span key={nIdx} className="rounded-md bg-white/[0.04] px-2 py-0.5 text-[9px] font-semibold text-slate-400 border border-white/[0.06]">
                      #{niche}
                    </span>
                  ))}
                </div>

              </div>

              {/* Bottom Strip: Budget, Deadline & Apply Button */}
              <div className="pt-4 border-t border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold font-mono">Sponsorship Budget</p>
                    <span className="font-display text-base font-extrabold text-white font-mono">
                      ₹{campaign.budgetMin.toLocaleString('en-IN')} - ₹{campaign.budgetMax.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase font-bold font-mono">Deadline</p>
                    <span className="text-[11px] text-amber-400 font-mono font-semibold flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{campaign.deadline}</span>
                    </span>
                  </div>
                </div>

                <RippleButton
                  onClick={() => handleOpenPitch(campaign)}
                  className="w-full rounded-[14px] bg-royal-600 hover:bg-royal-500 py-2.5 text-xs font-bold text-white shadow-royal flex items-center justify-center gap-1.5"
                >
                  <span>Apply & Submit Pitch</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </RippleButton>
              </div>

            </HoverCard>
          ))}
        </div>

        {/* APPLY / PITCH SUBMISSION MODAL */}
        {selectedBrief && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl overflow-y-auto">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative w-full max-w-xl rounded-[24px] border border-white/[0.12] bg-[#0A0D17] p-6 sm:p-7 shadow-2xl text-slate-100 my-8 max-h-[92vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedBrief(null)}
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
                    Proposal Submitted to {selectedBrief.brandName}!
                  </h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                    Your pitch of <strong className="text-emerald-400 font-mono">₹{proposedAmount.toLocaleString('en-IN')}</strong> and verified AI Media Kit have been delivered to the brand manager.
                  </p>
                  <p className="text-[11px] text-royal-400 font-mono pt-2">
                    Escrow ID: ESC_{Date.now().toString().slice(-6)} • Updates will be sent to your WhatsApp.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendProposal} className="space-y-4">
                  
                  {/* Brand header */}
                  <div className="flex items-center gap-3 pb-3 border-b border-white/[0.08]">
                    <img src={selectedBrief.brandLogo} alt={selectedBrief.brandName} className="h-10 w-10 rounded-[12px] object-cover" />
                    <div>
                      <h3 className="font-display text-base font-bold text-white">
                        Pitch Campaign: {selectedBrief.brandName}
                      </h3>
                      <p className="text-xs text-slate-400 font-mono">
                        Budget Range: ₹{selectedBrief.budgetMin.toLocaleString()} - ₹{selectedBrief.budgetMax.toLocaleString()} • Match: {selectedBrief.matchScore}%
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
                      <span className="text-[10px] text-slate-500 font-mono">+18% GST Applicable</span>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Completion Timeline (Days)
                      </label>
                      <select
                        value={timelineDays}
                        onChange={(e) => setTimelineDays(Number(e.target.value))}
                        className="w-full rounded-[14px] border border-white/[0.1] bg-black/40 px-3 py-2.5 text-xs text-white focus:border-royal-500 focus:outline-none font-mono"
                      >
                        <option value={3}>3 Days (Express Delivery)</option>
                        <option value={7}>7 Days (Standard)</option>
                        <option value={14}>14 Days (High Production Video)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Creator Pitch, Creative Angle & Script Outline
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
                    <span className="text-[11px] font-mono text-royal-300 font-bold">245k Audience • 7.6% Engagement</span>
                  </div>

                  <RippleButton
                    type="submit"
                    className="w-full rounded-[14px] bg-royal-600 hover:bg-royal-500 py-3 text-xs font-bold text-white shadow-royal"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send Formal Proposal (₹{proposedAmount.toLocaleString('en-IN')})</span>
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
