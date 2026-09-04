'use client';

import React, { useState, useMemo, useRef } from 'react';
import { useCreatorStore } from '@/lib/store';
import { formatINR } from '@/lib/gst';
import { 
  Sparkles, 
  Download, 
  Share2, 
  Instagram, 
  Youtube, 
  Linkedin, 
  TrendingUp, 
  Users, 
  MapPin, 
  DollarSign, 
  CheckCircle, 
  Briefcase, 
  Sliders, 
  Flame, 
  Clock, 
  Award, 
  Zap, 
  Building2, 
  FileDown, 
  Check, 
  RefreshCw, 
  PieChart, 
  Smartphone, 
  ShieldCheck, 
  ArrowUpRight, 
  Calendar, 
  Layers, 
  Heart, 
  Bookmark, 
  BarChart3, 
  Globe, 
  Compass, 
  Tag, 
  Target, 
  Copy, 
  ExternalLink, 
  Printer, 
  ChevronRight, 
  Info,
  Radio,
  Eye,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { 
  AnimatedCounter, 
  RippleButton, 
  HoverCard, 
  PageTransition 
} from '@/components/ui/motion';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// 7-day Indian audience activity data with peak algorithm windows (IST)
interface PostingScheduleDay {
  day: string;
  dayFull: string;
  window: string;
  peakEngagement: 'Golden Hour' | 'Peak' | 'Very High' | 'High';
  score: number;
  multiplier: string;
  bestFormat: string;
  tip: string;
}

const BEST_POSTING_SCHEDULE: PostingScheduleDay[] = [
  { day: 'Mon', dayFull: 'Monday', window: '08:00 PM - 09:30 PM IST', peakEngagement: 'High', score: 88, multiplier: '1.8x Reach', bestFormat: 'LinkedIn Post & Carousel', tip: 'Career roadmaps, interview prep & weekly motivation' },
  { day: 'Tue', dayFull: 'Tuesday', window: '07:30 PM - 09:30 PM IST', peakEngagement: 'Golden Hour', score: 98, multiplier: '2.4x Viral Reach', bestFormat: 'Instagram Reel (30-45s)', tip: 'Algorithm surge window for fast-paced coding hacks' },
  { day: 'Wed', dayFull: 'Wednesday', window: '08:00 PM - 10:00 PM IST', peakEngagement: 'High', score: 90, multiplier: '1.9x Reach', bestFormat: 'DSA Visual Carousels', tip: 'System design deep-dives and problem breakdown sheets' },
  { day: 'Thu', dayFull: 'Thursday', window: '07:30 PM - 09:30 PM IST', peakEngagement: 'Golden Hour', score: 96, multiplier: '2.3x Viral Reach', bestFormat: 'Instagram Reel & Threads', tip: 'Tech salary roasts, FAANG interview stories & hot takes' },
  { day: 'Fri', dayFull: 'Friday', window: '06:30 PM - 08:30 PM IST', peakEngagement: 'High', score: 85, multiplier: '1.7x Reach', bestFormat: 'GitHub Repos & Tool Stacks', tip: 'Weekend project repositories, starter kits & AI tools' },
  { day: 'Sat', dayFull: 'Saturday', window: '11:00 AM - 01:30 PM IST', peakEngagement: 'Peak', score: 93, multiplier: '2.1x Reach', bestFormat: 'Long-Form YouTube Video', tip: '15-30m comprehensive tutorial masterclasses & code-alongs' },
  { day: 'Sun', dayFull: 'Sunday', window: '07:00 PM - 09:30 PM IST', peakEngagement: 'Very High', score: 94, multiplier: '2.2x Reach', bestFormat: 'Weekly AMA & YouTube Live', tip: 'Community Q&A, tech news breakdown & week ahead preview' },
];

// Historical 30-day view trends for smooth SVG chart
const ENGAGEMENT_TREND_POINTS = [
  { day: 'Day 1', views: 32000, engagement: 6.8 },
  { day: 'Day 5', views: 48000, engagement: 7.4 },
  { day: 'Day 10', views: 42000, engagement: 7.1 },
  { day: 'Day 15', views: 65000, engagement: 8.6 },
  { day: 'Day 20', views: 58000, engagement: 7.9 },
  { day: 'Day 25', views: 89000, engagement: 9.4 },
  { day: 'Day 30', views: 115000, engagement: 10.2 },
];

export default function InteractiveAIMediaKitPage() {
  const { activeCreator, mediaKit, updateMediaKit } = useCreatorStore();
  const pdfRef = useRef<HTMLDivElement>(null);

  // Interactive Simulation State
  const [followerCount, setFollowerCount] = useState<number>(245000);
  const [creatorNiche, setCreatorNiche] = useState<string>('Software Engineering & Tech');
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(1); // Default Tuesday (Golden Hour)
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [exportingPDF, setExportingPDF] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);

  // Dynamic Calculated Intelligence Metrics
  const intel = useMemo(() => {
    const base = followerCount;

    // Niche multiplier
    const nicheMultiplier = 
      creatorNiche === 'Software Engineering & Tech' ? 1.25 :
      creatorNiche === 'FinTech & Personal Finance' ? 1.35 :
      creatorNiche === 'AI & Productivity SaaS' ? 1.40 :
      creatorNiche === 'Upskilling & Career Coaching' ? 1.20 : 1.15;

    // Engagement rate calculation
    const engagementRate = Number((base > 800000 ? 5.6 : base > 200000 ? 7.8 : 9.6).toFixed(1));
    const avgReelViews = Math.round(base * 0.68);
    const avgYoutubeViews = Math.round(base * 0.42);
    const avgStoryViews = Math.round(base * 0.19);
    const avgLinkedinImpressions = Math.round(base * 0.35);
    const monthlyImpressions = `${(base * 3.2 / 1000000).toFixed(1)}M+`;

    // Indian CPM calculations (INR per 1,000 impressions)
    const baseCPM = Math.round(480 * nicheMultiplier);
    const highCPM = Math.round(750 * nicheMultiplier);

    // AI Pricing Formula calibrated for Indian Tech/Creator Economy
    const reelRate = Math.round((base * 0.16 * nicheMultiplier) / 1000) * 1000;
    const storyRate = Math.round((base * 0.05 * nicheMultiplier) / 1000) * 1000;
    const ytIntegrationRate = Math.round((base * 0.32 * nicheMultiplier) / 1000) * 1000;
    const ytDedicatedRate = Math.round((base * 0.62 * nicheMultiplier) / 1000) * 1000;
    const linkedinRate = Math.round((base * 0.14 * nicheMultiplier) / 1000) * 1000;
    const bundle360Rate = Math.round((reelRate + ytIntegrationRate + linkedinRate) * 0.85 / 1000) * 1000;

    // Brand Compatibility Score (0 - 100)
    const brandCompatibility = Math.min(99, Math.round(92 + (engagementRate > 7 ? 4 : 2)));

    return {
      engagementRate,
      monthlyImpressions,
      avgReelViews,
      avgYoutubeViews,
      avgStoryViews,
      avgLinkedinImpressions,
      cpmRange: `₹${baseCPM} - ₹${highCPM}`,
      brandCompatibility,
      saveRate: 19.2,
      rates: {
        reel: reelRate,
        story: storyRate,
        ytIntegration: ytIntegrationRate,
        ytDedicated: ytDedicatedRate,
        linkedin: linkedinRate,
        bundle: bundle360Rate
      },
      nicheMultiplier
    };
  }, [followerCount, creatorNiche]);

  const handleRunNeuralAudit = () => {
    setIsAuditing(true);
    setTimeout(() => {
      setIsAuditing(false);
      updateMediaKit({
        monthlyReach: intel.monthlyImpressions,
        engagementRate: `${intel.engagementRate}%`,
        suggestedRates: {
          instagramReel: intel.rates.reel,
          instagramStory: intel.rates.story,
          youtubeIntegration: intel.rates.ytIntegration,
          dedicatedYoutube: intel.rates.ytDedicated,
          linkedinPost: intel.rates.linkedin
        }
      });
    }, 600);
  };

  const handleCopyPublicLink = () => {
    const url = `https://creatoros.in/${activeCreator?.username || 'aarav.tech'}/mediakit`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleExportPDF = async () => {
    if (!pdfRef.current) return;
    try {
      setExportingPDF(true);
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#05070B',
        logging: false
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${activeCreator?.username || 'creator'}-AI-Media-Kit-2026.pdf`);
    } catch (err) {
      console.error('PDF export failed', err);
    } finally {
      setExportingPDF(false);
    }
  };

  const selectedDay = BEST_POSTING_SCHEDULE[selectedDayIndex];

  return (
    <PageTransition>
      <div className="space-y-6 font-sans">
        
        {/* ========================================================================= */}
        {/* TOP EXECUTIVE HEADER */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>AI Creator Intelligence & Media Kit</span>
              <span className="rounded-full bg-royal-600/15 text-royal-400 border border-royal-500/30 text-[10px] font-bold px-2.5 py-0.5 flex items-center gap-1 font-mono">
                <Sparkles className="h-3 w-3" /> Live Neural Intelligence
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Interactive audience city splits, gender & age distributions, IST algorithm peak windows, brand safety gauge, and dynamic AI collaboration pricing.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowShareModal(true)}
              className="flex items-center gap-1.5 rounded-[14px] border border-white/[0.1] bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-white/[0.08] hover:border-royal-500/40 transition btn-press"
            >
              <Share2 className="h-3.5 w-3.5 text-royal-400" />
              <span>Share Media Kit</span>
            </button>

            <RippleButton
              onClick={handleExportPDF}
              disabled={exportingPDF}
              className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-4 py-2 text-xs font-bold text-white shadow-royal flex items-center gap-1.5 disabled:opacity-50"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{exportingPDF ? 'Rendering PDF...' : 'Download PDF Media Kit'}</span>
            </RippleButton>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE AUDIENCE SIMULATION SLIDER & NICHE PICKER */}
        {/* ========================================================================= */}
        <div className="rounded-[24px] border border-royal-500/25 bg-gradient-to-r from-[#0C1226] via-[#0E152E] to-[#0A0E1A] p-5 sm:p-6 shadow-glass-card space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-royal-400" />
              <h3 className="font-display text-sm font-bold text-white">Interactive Audience Simulation Engine</h3>
            </div>
            <span className="text-[10px] text-royal-300 font-mono bg-royal-600/20 px-2.5 py-0.5 rounded-full border border-royal-500/30">
              ⚡ Real-time Dynamic Recalibration
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Follower Slider */}
            <div className="md:col-span-5 space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300">Audience Base Reach:</span>
                <span className="text-royal-400 font-mono font-bold">
                  {formatINR(followerCount)} Followers
                </span>
              </div>
              <input
                type="range"
                min={25000}
                max={2000000}
                step={5000}
                value={followerCount}
                onChange={(e) => setFollowerCount(Number(e.target.value))}
                className="w-full accent-royal-500 cursor-pointer h-2 bg-white/10 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>25K</span>
                <span>500K</span>
                <span>1M</span>
                <span>2M+</span>
              </div>
            </div>

            {/* Niche Selector */}
            <div className="md:col-span-4 space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">Domain & Content Niche</label>
              <select
                value={creatorNiche}
                onChange={(e) => setCreatorNiche(e.target.value)}
                className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
              >
                <option value="Software Engineering & Tech">Software Engineering & Tech (1.25x CPM)</option>
                <option value="FinTech & Personal Finance">FinTech & Personal Finance (1.35x CPM)</option>
                <option value="AI & Productivity SaaS">AI & Productivity SaaS (1.40x CPM)</option>
                <option value="Upskilling & Career Coaching">Upskilling & Career Coaching (1.20x CPM)</option>
                <option value="Design & Creator Tools">Design & Creator Tools (1.15x CPM)</option>
              </select>
            </div>

            {/* Run Audit Button */}
            <div className="md:col-span-3 pt-2 md:pt-0">
              <RippleButton
                onClick={handleRunNeuralAudit}
                className="w-full rounded-[14px] bg-royal-600 hover:bg-royal-500 py-2.5 text-xs font-bold text-white shadow-royal flex items-center justify-center gap-2"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
                <span>{isAuditing ? 'Syncing Neural Graph...' : 'Recalculate Intelligence'}</span>
              </RippleButton>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* EXPORTABLE MEDIA KIT VIEWPORT */}
        {/* ========================================================================= */}
        <div ref={pdfRef} className="space-y-6">

          {/* CREATOR IDENTITY HERO STRIP (Included in PDF) */}
          <div className="rounded-[24px] border border-white/[0.08] bg-gradient-to-r from-[#070D1F] via-[#0E1738] to-[#0A0D17] p-5 sm:p-6 shadow-glass-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={activeCreator?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                  alt={activeCreator?.name || 'Creator'}
                  className="h-16 w-16 rounded-[20px] object-cover ring-2 ring-royal-500/50 p-0.5 bg-black"
                />
                <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-[#0A0D17] flex items-center justify-center text-[10px] text-white">
                  ✓
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-lg sm:text-xl font-bold text-white">
                    {activeCreator?.name || 'Aarav Sharma'}
                  </h2>
                  <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400 font-mono">
                    Verified Expert
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  @{activeCreator?.username || 'aarav.tech'} • {creatorNiche}
                </p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-1 font-mono">
                  <MapPin className="h-3 w-3 text-royal-400" />
                  <span>{activeCreator?.state || 'Bangalore, India'}</span>
                  <span>•</span>
                  <span>Active Verified CreatorOS Partnership</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-white/[0.08] pt-3 sm:pt-0">
              <div className="text-left sm:text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">Estimated Valuation</span>
                <span className="font-display text-xl font-extrabold text-emerald-400 font-mono">
                  ₹{formatINR(intel.rates.bundle)}/mo
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 1: KEY PERFORMANCE TELEMETRY TILES */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Engagement Rate */}
            <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-pink-500/30">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Engagement Rate</span>
                <Flame className="h-4 w-4 text-pink-400" />
              </div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-pink-400 font-mono">
                <AnimatedCounter value={intel.engagementRate} decimals={1} suffix="%" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">3.4x Indian Industry Average</p>
            </HoverCard>

            {/* Estimated CPM */}
            <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-emerald-500/30">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Estimated CPM (Tier-1)</span>
                <Target className="h-4 w-4 text-emerald-400" />
              </div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                {intel.cpmRange}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">High Purchasing Intent</p>
            </HoverCard>

            {/* Brand Compatibility Score */}
            <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Brand Fit Score</span>
                <Award className="h-4 w-4 text-royal-400" />
              </div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-royal-400 font-mono">
                <AnimatedCounter value={intel.brandCompatibility} suffix="/100" />
              </div>
              <p className="text-[11px] text-emerald-400 mt-1 font-mono">Tier-1 Brand Safety Grade A+</p>
            </HoverCard>

            {/* Monthly Impressions */}
            <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-cyan-500/30">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
                <span>Monthly Reach</span>
                <TrendingUp className="h-4 w-4 text-cyan-400" />
              </div>
              <div className="font-display text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {intel.monthlyImpressions}
              </div>
              <p className="text-[11px] text-cyan-400 mt-1 font-mono">Across IG, YT & LinkedIn</p>
            </HoverCard>

          </div>

          {/* SECTION 2: ANIMATED CHARTS (30-DAY VELOCITY CURVE & BRAND COMPATIBILITY GAUGE) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Animated 30-Day Growth & Viral Velocity Curve (7 cols) */}
            <div className="lg:col-span-7 rounded-[22px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-royal-400" />
                    <span>30-Day Growth & Viral Velocity Curve</span>
                  </h3>
                  <p className="text-xs text-slate-400">Consistent organic impressions trajectory across tech campaigns</p>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  +42% MoM Surge
                </span>
              </div>

              {/* SVG Area Chart */}
              <div className="pt-3">
                <div className="relative h-44 w-full">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#2563EB" />
                        <stop offset="50%" stopColor="#60A5FA" />
                        <stop offset="100%" stopColor="#10B981" />
                      </linearGradient>
                    </defs>

                    {/* Area fill */}
                    <path
                      d="M 0,130 Q 75,100 150,110 T 300,60 T 420,35 T 500,10 L 500,150 L 0,150 Z"
                      fill="url(#areaGradient)"
                    />

                    {/* Glowing Stroke Path */}
                    <path
                      d="M 0,130 Q 75,100 150,110 T 300,60 T 420,35 T 500,10"
                      fill="none"
                      stroke="url(#strokeGradient)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Highlight Nodes */}
                    <circle cx="150" cy="110" r="4.5" fill="#60A5FA" stroke="#0A0E1A" strokeWidth="2" />
                    <circle cx="300" cy="60" r="4.5" fill="#60A5FA" stroke="#0A0E1A" strokeWidth="2" />
                    <circle cx="420" cy="35" r="4.5" fill="#60A5FA" stroke="#0A0E1A" strokeWidth="2" />
                    <circle cx="500" cy="10" r="6" fill="#10B981" stroke="#ffffff" strokeWidth="2" />
                  </svg>
                </div>

                {/* X-Axis labels */}
                <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-2 border-t border-white/[0.06]">
                  {ENGAGEMENT_TREND_POINTS.map((pt, idx) => (
                    <span key={idx}>{pt.day}</span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-1 text-xs font-mono">
                <div className="bg-black/40 p-2.5 rounded-[12px] border border-white/[0.06]">
                  <span className="text-[10px] text-slate-400 block">Avg Reel Plays</span>
                  <span className="text-white font-bold">{formatINR(intel.avgReelViews)}</span>
                </div>
                <div className="bg-black/40 p-2.5 rounded-[12px] border border-white/[0.06]">
                  <span className="text-[10px] text-slate-400 block">Avg YouTube Views</span>
                  <span className="text-white font-bold">{formatINR(intel.avgYoutubeViews)}</span>
                </div>
                <div className="bg-black/40 p-2.5 rounded-[12px] border border-white/[0.06]">
                  <span className="text-[10px] text-slate-400 block">Bookmark Ratio</span>
                  <span className="text-amber-400 font-bold">{intel.saveRate}%</span>
                </div>
              </div>

            </div>

            {/* Brand Compatibility Radar & Category Breakdown (5 cols) */}
            <div className="lg:col-span-5 rounded-[22px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <span>Brand Compatibility Score</span>
                  </h3>
                  <p className="text-xs text-slate-400">AI neural matchmaking across Indian tech sponsors</p>
                </div>
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono font-bold text-xs">
                  {intel.brandCompatibility}%
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { domain: 'Dev Tools & Cloud SaaS', fit: 98, color: 'from-emerald-500 to-teal-400' },
                  { domain: 'FinTech, Credit & Banking', fit: 94, color: 'from-royal-600 to-blue-400' },
                  { domain: 'EdTech, Bootcamps & Upskilling', fit: 96, color: 'from-blue-500 to-cyan-400' },
                  { domain: 'Hardware, Laptops & Workstations', fit: 91, color: 'from-purple-500 to-indigo-400' },
                  { domain: 'Consumer Tech & Audio', fit: 86, color: 'from-amber-500 to-yellow-400' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium">{item.domain}</span>
                      <span className="font-mono font-bold text-white">{item.fit}% Match</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.fit}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: idx * 0.1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-[14px] bg-emerald-950/20 border border-emerald-500/30 flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
                <p className="text-[11px] text-emerald-200">
                  <strong>Zero-Controversy Certified:</strong> 100% brand-safe creator profile with clean organic comment sentiment (98.4% positive).
                </p>
              </div>
            </div>

          </div>

          {/* SECTION 3: AUDIENCE DEMOGRAPHICS, AGE & INDIAN METROS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Age & Gender Distribution with Donut & Bars (6 cols) */}
            <div className="lg:col-span-6 rounded-[22px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-5">
              <div>
                <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                  <Users className="h-4 w-4 text-royal-400" />
                  <span>Gender & Age Distribution</span>
                </h3>
                <p className="text-xs text-slate-400">Verified demographic cluster across tech enthusiasts and developers</p>
              </div>

              {/* Gender Split Visual Donut / Multi-track */}
              <div className="p-4 rounded-[18px] bg-black/40 border border-white/[0.06] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-200">Gender Ratio Analysis</span>
                  <span className="text-[10px] text-slate-400 font-mono">100% Verified</span>
                </div>

                <div className="h-4 w-full rounded-full bg-white/[0.06] overflow-hidden flex shadow-inner">
                  <div style={{ width: '72%' }} className="bg-gradient-to-r from-royal-600 to-blue-500 h-full" title="72% Male" />
                  <div style={{ width: '26%' }} className="bg-gradient-to-r from-pink-500 to-rose-400 h-full" title="26% Female" />
                  <div style={{ width: '2%' }} className="bg-amber-400 h-full" title="2% Non-Binary / Other" />
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
                  <div className="p-2 rounded-[10px] bg-royal-600/10 border border-royal-500/20">
                    <span className="text-royal-300 font-bold block text-sm">72%</span>
                    <span className="text-[10px] text-slate-400">Male Engineers</span>
                  </div>
                  <div className="p-2 rounded-[10px] bg-pink-600/10 border border-pink-500/20">
                    <span className="text-pink-300 font-bold block text-sm">26%</span>
                    <span className="text-[10px] text-slate-400">Female Techies</span>
                  </div>
                  <div className="p-2 rounded-[10px] bg-amber-600/10 border border-amber-500/20">
                    <span className="text-amber-300 font-bold block text-sm">2%</span>
                    <span className="text-[10px] text-slate-400">Other / Non-Binary</span>
                  </div>
                </div>
              </div>

              {/* Age Bracket Stacked Progress Bars */}
              <div className="space-y-3 pt-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">Age Bracket Spread:</span>

                {[
                  { label: '18 - 24 Years (College / Freshers)', percentage: 54, color: 'from-royal-600 to-royal-400' },
                  { label: '25 - 34 Years (Working SDEs / Professionals)', percentage: 36, color: 'from-blue-500 to-cyan-400' },
                  { label: '35 - 44 Years (Tech Leads & Managers)', percentage: 8, color: 'from-indigo-500 to-purple-400' },
                  { label: '45+ Years (Staff / Executives)', percentage: 2, color: 'from-slate-500 to-slate-400' },
                ].map((bracket, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300">{bracket.label}</span>
                      <span className="font-bold text-white font-mono">{bracket.percentage}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${bracket.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bracket.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: idx * 0.1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Audience Cities & Purchasing Metros (6 cols) */}
            <div className="lg:col-span-6 rounded-[22px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-royal-400" />
                    <span>Audience Cities & Indian Metros</span>
                  </h3>
                  <p className="text-xs text-slate-400">High concentration in India's highest tech purchasing hubs</p>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  90% Tier-1
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { city: 'Bengaluru (Silicon Valley of India)', percentage: 38, tier: 'Tier-1 Tech Hub' },
                  { city: 'Delhi NCR (Gurugram / Noida IT Corridor)', percentage: 24, tier: 'Tier-1 Capital' },
                  { city: 'Hyderabad (Cyberabad Hi-Tech City)', percentage: 16, tier: 'Tier-1 Tech Hub' },
                  { city: 'Mumbai & Pune (Western Financial & IT Belt)', percentage: 12, tier: 'Tier-1 Financial' },
                  { city: 'Chennai & Kolkata (Automotive & Software Corridor)', percentage: 6, tier: 'Tier-1 Metros' },
                  { city: 'Tier 2 & 3 Emerging Hubs (Kochi, Indore, Jaipur, Ahmedabad)', percentage: 4, tier: 'Emerging' },
                ].map((c, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-300 font-medium">{c.city}</span>
                        <span className="text-[9px] text-slate-500 font-mono">({c.tier})</span>
                      </div>
                      <span className="font-bold text-white font-mono">{c.percentage}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-royal-600 via-blue-500 to-emerald-400"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${c.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: idx * 0.1, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/[0.08] space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Tier-1 Metro Purchasing Power:</span>
                  <span className="font-mono font-bold text-emerald-400">High Disposable Income</span>
                </div>
                <div className="flex justify-between">
                  <span>Audience Device Split:</span>
                  <span className="font-mono text-royal-300 font-bold">Android (70%) • iOS / Mac (30%)</span>
                </div>
              </div>
            </div>

          </div>

          {/* SECTION 4: BEST POSTING TIME (IST ALGORITHM HEATMAP & INTERACTIVE SELECTOR) */}
          <div className="rounded-[22px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-white/[0.06]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-royal-400 font-mono flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Indian Algorithm Peak Heatmap</span>
                </span>
                <h3 className="font-display text-base font-bold text-white mt-0.5">
                  Optimal Posting Schedule (Indian Standard Time - IST)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-400 font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                  🔥 Golden Peaks: Tue & Thu (07:30 PM - 09:30 PM IST)
                </span>
              </div>
            </div>

            {/* Interactive Day Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {BEST_POSTING_SCHEDULE.map((sched, idx) => {
                const isSelected = selectedDayIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`p-3.5 rounded-[16px] border text-left flex flex-col justify-between space-y-2 transition btn-press ${
                      isSelected
                        ? 'border-royal-500 bg-royal-600/20 shadow-royal-sm ring-2 ring-royal-500/50'
                        : sched.peakEngagement === 'Golden Hour'
                        ? 'border-royal-500/50 bg-royal-600/10 hover:border-royal-400'
                        : 'border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display text-sm font-bold text-white">{sched.day}</span>
                        <span className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded ${
                          sched.peakEngagement === 'Golden Hour' ? 'bg-royal-600 text-white' : 'bg-white/[0.08] text-slate-400'
                        }`}>
                          {sched.score}%
                        </span>
                      </div>
                      <p className="text-[10px] font-mono text-royal-300 font-semibold truncate">{sched.window}</p>
                    </div>
                    <span className="text-[9px] text-emerald-400 font-mono font-medium">{sched.multiplier}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Day Deep Dive Intelligence Box */}
            <motion.div
              key={selectedDayIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-4 rounded-[18px] bg-gradient-to-r from-royal-950/40 via-[#0E152E] to-black/40 border border-royal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-display text-sm font-bold text-white">
                    {selectedDay.dayFull} Recommended Window:
                  </span>
                  <span className="font-mono text-xs font-bold text-royal-400 bg-royal-600/20 px-2.5 py-0.5 rounded">
                    {selectedDay.window}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                    {selectedDay.peakEngagement}
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  <strong>Recommended Format:</strong> {selectedDay.bestFormat} — {selectedDay.tip}.
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] font-mono text-slate-400 block">Algorithm Velocity</span>
                <span className="font-display text-lg font-extrabold text-emerald-400 font-mono">
                  {selectedDay.multiplier}
                </span>
              </div>
            </motion.div>
          </div>

          {/* SECTION 5: AI SUGGESTED COLLABORATION PRICING & RATE CARDS */}
          <div className="rounded-[22px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-white/[0.06]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-royal-400 font-mono flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5" />
                  <span>Sponsorship Rate Card</span>
                </span>
                <h3 className="font-display text-base font-bold text-white mt-0.5">
                  AI Suggested Collaboration Deliverable Pricing (INR ₹)
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono bg-white/[0.04] px-3 py-1 rounded-full border border-white/[0.06]">
                Calibrated for {formatINR(followerCount)} {creatorNiche.split(' ')[0]} audience
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Instagram Reel */}
              <HoverCard hoverY={-3} className="p-4 rounded-[18px] bg-white/[0.03] border border-white/[0.08] hover:border-pink-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-[10px] bg-pink-500/10 text-pink-400 border border-pink-500/20">
                    <Instagram className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 font-mono">+18% GST (SAC 998313)</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">Instagram Reel (30-60s)</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Story repost + 24h bio link + pinned comment</p>
                </div>
                <div className="font-display text-xl font-extrabold text-white font-mono pt-2 border-t border-white/[0.06]">
                  <AnimatedCounter value={intel.rates.reel} prefix="₹" />
                </div>
              </HoverCard>

              {/* YouTube 60-90s Mid-roll */}
              <HoverCard hoverY={-3} className="p-4 rounded-[18px] bg-white/[0.03] border border-white/[0.08] hover:border-red-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-[10px] bg-red-500/10 text-red-400 border border-red-500/20">
                    <Youtube className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 font-mono">+18% GST (SAC 998313)</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">YouTube 60s Integrated Sponsor</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Dedicated product segment & permanent description link</p>
                </div>
                <div className="font-display text-xl font-extrabold text-white font-mono pt-2 border-t border-white/[0.06]">
                  <AnimatedCounter value={intel.rates.ytIntegration} prefix="₹" />
                </div>
              </HoverCard>

              {/* Dedicated YouTube Masterclass */}
              <HoverCard hoverY={-3} className="p-4 rounded-[18px] bg-white/[0.03] border border-white/[0.08] hover:border-rose-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    <Youtube className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 font-mono">+18% GST (SAC 998313)</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">Dedicated Masterclass Video (10-15m)</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">End-to-end tutorial & deep dive with custom branding</p>
                </div>
                <div className="font-display text-xl font-extrabold text-white font-mono pt-2 border-t border-white/[0.06]">
                  <AnimatedCounter value={intel.rates.ytDedicated} prefix="₹" />
                </div>
              </HoverCard>

              {/* LinkedIn Thought Leadership */}
              <HoverCard hoverY={-3} className="p-4 rounded-[18px] bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    <Linkedin className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 font-mono">+18% GST</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">LinkedIn Executive Post</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Reaching senior Indian engineers, CTOs & tech founders</p>
                </div>
                <div className="font-display text-xl font-extrabold text-white font-mono pt-2 border-t border-white/[0.06]">
                  <AnimatedCounter value={intel.rates.linkedin} prefix="₹" />
                </div>
              </HoverCard>

              {/* Instagram Story */}
              <HoverCard hoverY={-3} className="p-4 rounded-[18px] bg-white/[0.03] border border-white/[0.08] hover:border-purple-500/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-[10px] bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    <Instagram className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 font-mono">+18% GST</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">Instagram Story Set (3 Frames)</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Direct tap-through link sticker & coupon code</p>
                </div>
                <div className="font-display text-xl font-extrabold text-white font-mono pt-2 border-t border-white/[0.06]">
                  <AnimatedCounter value={intel.rates.story} prefix="₹" />
                </div>
              </HoverCard>

              {/* 360 Omnichannel Bundle */}
              <HoverCard hoverY={-3} className="p-4 rounded-[18px] bg-gradient-to-br from-royal-600/20 via-blue-900/15 to-[#0A0E1A] border border-royal-500/40 hover:border-royal-400 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-[10px] bg-royal-500/20 text-royal-300 border border-royal-500/30">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <span className="text-[10px] font-bold text-amber-300 font-mono">15% BUNDLE SAVINGS</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">360° Omnichannel Tech Launch Bundle</h4>
                  <p className="text-[10px] text-slate-300 mt-0.5">1 Reel + 1 YT Integration + 1 LinkedIn + 3 Stories</p>
                </div>
                <div className="font-display text-xl font-extrabold text-royal-300 font-mono pt-2 border-t border-white/[0.06]">
                  <AnimatedCounter value={intel.rates.bundle} prefix="₹" />
                </div>
              </HoverCard>

            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* SHARE PUBLIC MEDIA KIT MODAL */}
        {/* ========================================================================= */}
        {showShareModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
            <div className="relative w-full max-w-md rounded-[24px] border border-white/[0.12] bg-[#0A0E1A] p-6 shadow-2xl text-slate-100 animate-scale-in">
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-5 right-5 rounded-full p-2 text-slate-400 hover:bg-white/[0.08] hover:text-white"
              >
                ×
              </button>

              <div className="flex items-center gap-2 mb-1">
                <Share2 className="h-5 w-5 text-royal-400" />
                <h3 className="font-display text-base font-bold text-white">Share Live Media Kit URL</h3>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Send this verified intelligence URL to brand managers and agencies to pitch sponsorships.
              </p>

              <div className="p-3 rounded-[14px] bg-black/50 border border-white/[0.1] flex items-center justify-between gap-2 mb-4">
                <span className="font-mono text-xs text-royal-300 truncate">
                  https://creatoros.in/{activeCreator?.username || 'aarav.tech'}/mediakit
                </span>
                <button
                  onClick={handleCopyPublicLink}
                  className="p-2 rounded-[10px] bg-royal-600 hover:bg-royal-500 text-white transition btn-press shrink-0"
                  title="Copy Link"
                >
                  {copiedLink ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <div className="space-y-2">
                <RippleButton
                  onClick={handleCopyPublicLink}
                  className="w-full rounded-[14px] bg-royal-600 hover:bg-royal-500 py-2.5 text-xs font-bold text-white shadow-royal"
                >
                  <span>{copiedLink ? 'Link Copied to Clipboard!' : 'Copy Link to Clipboard'}</span>
                </RippleButton>
                <button
                  onClick={handleExportPDF}
                  className="w-full rounded-[14px] border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] py-2.5 text-xs font-semibold text-slate-300"
                >
                  Download PDF Media Kit
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </PageTransition>
  );
}

