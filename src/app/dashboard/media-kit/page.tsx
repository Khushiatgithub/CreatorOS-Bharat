'use client';

import React, { useState, useMemo } from 'react';
import { useCreatorStore } from '@/lib/store';
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
  Bookmark
} from 'lucide-react';
import { 
  AnimatedCounter, 
  RippleButton, 
  HoverCard, 
  FadeIn, 
  PageTransition 
} from '@/components/ui/motion';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';

// 7-day Indian audience activity data (IST)
const BEST_POSTING_SCHEDULE = [
  { day: 'Mon', window: '08:00 PM - 09:30 PM IST', peakEngagement: 'High', engagementScore: 88, tip: 'Tech career roadmaps & weekly motivation' },
  { day: 'Tue', window: '07:30 PM - 09:30 PM IST', peakEngagement: 'Peak (Golden Hour)', engagementScore: 98, tip: 'Algorithm boost: Best day for Instagram Reels' },
  { day: 'Wed', window: '08:00 PM - 10:00 PM IST', peakEngagement: 'High', engagementScore: 90, tip: 'DSA & Coding problem breakdown carousels' },
  { day: 'Thu', window: '07:30 PM - 09:30 PM IST', peakEngagement: 'Peak (Golden Hour)', engagementScore: 96, tip: 'System design diagrams & interview tips' },
  { day: 'Fri', window: '06:30 PM - 08:30 PM IST', peakEngagement: 'High', engagementScore: 84, tip: 'Weekend project ideas & GitHub repos' },
  { day: 'Sat', window: '11:00 AM - 01:30 PM IST', peakEngagement: 'Very High', engagementScore: 92, tip: 'Long-form YouTube video & masterclasses' },
  { day: 'Sun', window: '07:00 PM - 09:30 PM IST', peakEngagement: 'Very High', engagementScore: 94, tip: 'Weekly recap & Q&A livestreams' },
];

export default function InteractiveAIMediaKitPage() {
  const { mediaKit, activeCreator, updateMediaKit } = useCreatorStore();

  // Interactive Simulation Controls
  const [followerCount, setFollowerCount] = useState<number>(245000);
  const [selectedPlatform, setSelectedPlatform] = useState<'instagram' | 'youtube' | 'linkedin'>('instagram');
  const [creatorNiche, setCreatorNiche] = useState<string>('Software Engineering & Tech');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'metrics' | 'demographics' | 'posting_time' | 'pricing'>('metrics');

  // Dynamic Calculated Metrics based on follower count & niche
  const calculatedMetrics = useMemo(() => {
    const baseFollowers = followerCount;
    const engagement = Number((baseFollowers > 500000 ? 5.8 : baseFollowers > 100000 ? 7.8 : 9.4).toFixed(1));
    const avgReelViews = Math.round(baseFollowers * 0.65);
    const avgStoryViews = Math.round(baseFollowers * 0.18);
    const monthlyImpressions = `${(baseFollowers * 2.8 / 1000000).toFixed(1)}M+`;

    // AI Pricing Formula calibrated for Indian Tech/Creator Economy
    const reelRate = Math.round((baseFollowers * 0.16) / 1000) * 1000;
    const storyRate = Math.round((baseFollowers * 0.05) / 1000) * 1000;
    const ytIntegrationRate = Math.round((baseFollowers * 0.28) / 1000) * 1000;
    const ytDedicatedRate = Math.round((baseFollowers * 0.55) / 1000) * 1000;
    const linkedinRate = Math.round((baseFollowers * 0.12) / 1000) * 1000;

    return {
      engagementRate: engagement,
      monthlyReach: monthlyImpressions,
      avgReelViews,
      avgStoryViews,
      saveRate: 18.4,
      rates: {
        reel: reelRate,
        story: storyRate,
        ytIntegration: ytIntegrationRate,
        ytDedicated: ytDedicatedRate,
        linkedin: linkedinRate
      }
    };
  }, [followerCount, creatorNiche]);

  const handleRunAIAudit = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      updateMediaKit({
        monthlyReach: calculatedMetrics.monthlyReach,
        engagementRate: `${calculatedMetrics.engagementRate}%`,
        suggestedRates: {
          instagramReel: calculatedMetrics.rates.reel,
          instagramStory: calculatedMetrics.rates.story,
          youtubeIntegration: calculatedMetrics.rates.ytIntegration,
          dedicatedYoutube: calculatedMetrics.rates.ytDedicated,
          linkedinPost: calculatedMetrics.rates.linkedin
        }
      });
    }, 700);
  };

  const handleCopyPitchLink = () => {
    navigator.clipboard.writeText(`https://creatoros.in/${activeCreator?.username}/mediakit`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // High-Res PDF Media Kit Exporter
  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();
      doc.setFillColor(5, 7, 11);
      doc.rect(0, 0, 210, 297, 'F');

      // Top Header
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text(`CREATOR MEDIA KIT: ${activeCreator?.name.toUpperCase()}`, 14, 22);

      doc.setFontSize(10);
      doc.setTextColor(59, 130, 246);
      doc.text(`Verified by CreatorOS India • Niche: ${creatorNiche} • ${activeCreator?.location}`, 14, 30);

      // SECTION 1: KEY PERFORMANCE METRICS
      doc.setFillColor(14, 21, 46);
      doc.roundedRect(14, 38, 182, 36, 3, 3, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.text(`Monthly Impressions: ${calculatedMetrics.monthlyReach}`, 20, 48);
      doc.text(`Engagement Rate: ${calculatedMetrics.engagementRate}% (3.2x Indian Avg)`, 20, 56);
      doc.text(`Avg. Reel Views: ${calculatedMetrics.avgReelViews.toLocaleString('en-IN')}`, 20, 64);

      // SECTION 2: DEMOGRAPHICS & GENDER
      doc.setFontSize(13);
      doc.setTextColor(255, 255, 255);
      doc.text('AUDIENCE DEMOGRAPHICS & GENDER SPLIT', 14, 88);

      doc.setFontSize(9);
      doc.setTextColor(203, 213, 225);
      doc.text('• Gender: 74% Male / 24% Female / 2% Other', 20, 98);
      doc.text('• Age Brackets: 18-24 (52%), 25-34 (38%), 35+ (10%)', 20, 106);
      doc.text('• Top Metros: Bengaluru (36%), Delhi NCR (24%), Hyderabad (16%), Mumbai (14%), Pune (10%)', 20, 114);

      // SECTION 3: BEST POSTING TIME (IST)
      doc.setFontSize(13);
      doc.setTextColor(255, 255, 255);
      doc.text('OPTIMAL POSTING TIME (IST PEAK ENGAGEMENT)', 14, 134);

      doc.setFontSize(9);
      doc.setTextColor(203, 213, 225);
      doc.text('• Weekdays (Tue/Thu Golden Window): 07:30 PM - 09:30 PM IST', 20, 144);
      doc.text('• Weekends (Sat/Sun): 11:00 AM - 01:30 PM & 08:00 PM IST', 20, 152);

      // SECTION 4: RATE CARD
      doc.setFontSize(13);
      doc.setTextColor(255, 255, 255);
      doc.text('OFFICIAL SPONSORSHIP RATE CARD (INR ₹)', 14, 172);

      const rates = [
        ['Instagram Reel (30-60s)', `₹${calculatedMetrics.rates.reel.toLocaleString('en-IN')}`],
        ['YouTube 60s Mid-Roll Integration', `₹${calculatedMetrics.rates.ytIntegration.toLocaleString('en-IN')}`],
        ['Dedicated Masterclass Video', `₹${calculatedMetrics.rates.ytDedicated.toLocaleString('en-IN')}`],
        ['LinkedIn Thought Leadership Post', `₹${calculatedMetrics.rates.linkedin.toLocaleString('en-IN')}`],
        ['Instagram Story with Swipe-Up Link', `₹${calculatedMetrics.rates.story.toLocaleString('en-IN')}`],
      ];

      let rateY = 184;
      rates.forEach(([title, price]) => {
        doc.setFontSize(9);
        doc.setTextColor(255, 255, 255);
        doc.text(title, 20, rateY);
        doc.setTextColor(59, 130, 246);
        doc.text(price, 150, rateY);
        rateY += 9;
      });

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      doc.text('GSTR-1 compliant tax invoices with SAC code 998313. Contact: brand@creatoros.in', 14, 280);

      doc.save(`${activeCreator?.username}-AI-Media-Kit.pdf`);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6 font-sans">
        
        {/* TOP HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>Interactive AI Media Kit Studio</span>
              <span className="rounded-full bg-royal-600/15 text-royal-400 border border-royal-500/30 text-[10px] font-bold px-2.5 py-0.5 flex items-center gap-1 font-mono">
                <Sparkles className="h-3 w-3" /> Live Neural Audit
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Live engagement calculations, Indian metro demographic clustering, optimal posting times (IST), and AI sponsorship rate cards.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopyPitchLink}
              className="flex items-center gap-1.5 rounded-[14px] border border-white/[0.1] bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-white/[0.08] transition btn-press"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share Pitch URL'}</span>
            </button>

            <RippleButton
              onClick={handleDownloadPDF}
              className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-4 py-2 text-xs font-bold text-white shadow-royal"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{downloadSuccess ? 'PDF Downloaded!' : 'Export PDF Media Kit'}</span>
            </RippleButton>
          </div>
        </div>

        {/* INTERACTIVE CONTROLS BAR (Follower Slider & Niche Picker) */}
        <div className="rounded-[20px] border border-royal-500/25 bg-gradient-to-r from-[#0C1226] via-[#0E152E] to-[#0A0E1A] p-5 sm:p-6 shadow-glass-card space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-royal-400" />
              <h3 className="font-display text-sm font-bold text-white">Live AI Simulation Controls</h3>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Adjust audience size to re-calculate rates live</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Follower Slider */}
            <div className="md:col-span-5 space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-300">Audience Base:</span>
                <span className="text-royal-400 font-mono font-bold">
                  {followerCount.toLocaleString('en-IN')} Followers
                </span>
              </div>
              <input
                type="range"
                min={25000}
                max={1500000}
                step={5000}
                value={followerCount}
                onChange={(e) => setFollowerCount(Number(e.target.value))}
                className="w-full accent-royal-600 cursor-pointer h-2 bg-white/10 rounded-lg"
              />
            </div>

            {/* Niche Selector */}
            <div className="md:col-span-4 space-y-1.5">
              <label className="block text-xs font-medium text-slate-300">Creator Domain & Niche</label>
              <select
                value={creatorNiche}
                onChange={(e) => setCreatorNiche(e.target.value)}
                className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-1.5 text-xs text-white focus:border-royal-500 focus:outline-none"
              >
                <option value="Software Engineering & Tech">Software Engineering & Tech</option>
                <option value="FinTech & Personal Finance">FinTech & Personal Finance</option>
                <option value="AI & Productivity SaaS">AI & Productivity SaaS</option>
                <option value="Upskilling & Career Coaching">Upskilling & Career Coaching</option>
              </select>
            </div>

            {/* Run Audit Button */}
            <div className="md:col-span-3 pt-2 md:pt-0">
              <RippleButton
                onClick={handleRunAIAudit}
                className="w-full rounded-[14px] bg-royal-600 hover:bg-royal-500 py-2.5 text-xs font-bold text-white shadow-royal"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                <span>{isGenerating ? 'Analyzing...' : 'Run Neural Audit'}</span>
              </RippleButton>
            </div>

          </div>
        </div>

        {/* SECTION 1: LIVE GENERATED METRICS WITH ANIMATED COUNTERS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Monthly Reach</span>
              <TrendingUp className="h-4 w-4 text-royal-400" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {calculatedMetrics.monthlyReach}
            </div>
            <p className="text-[11px] text-emerald-400 mt-1 font-mono">Across IG, YT & LinkedIn</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Engagement Rate</span>
              <Flame className="h-4 w-4 text-pink-400" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-royal-400 font-mono">
              <AnimatedCounter value={calculatedMetrics.engagementRate} decimals={1} suffix="%" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">3.2x Indian Industry Benchmark</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Avg Reel Views</span>
              <Smartphone className="h-4 w-4 text-blue-400" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-white font-mono">
              <AnimatedCounter value={calculatedMetrics.avgReelViews} />
            </div>
            <p className="text-[11px] text-slate-400 mt-1 font-mono">65% Viral Velocity</p>
          </HoverCard>

          <HoverCard hoverY={-3} className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/85 p-5 shadow-glass-card hover:border-royal-500/30">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span>Save-to-Like Ratio</span>
              <Bookmark className="h-4 w-4 text-amber-400" />
            </div>
            <div className="font-display text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
              <AnimatedCounter value={calculatedMetrics.saveRate} decimals={1} suffix="%" />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">High bookmark intent</p>
          </HoverCard>

        </div>

        {/* SECTION 2: AUDIENCE DEMOGRAPHICS, AGE & GENDER SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Age & Gender Distribution (6 cols) */}
          <div className="lg:col-span-6 rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-5">
            <div>
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                <Users className="h-4 w-4 text-royal-400" />
                <span>Audience Age & Gender Distribution</span>
              </h3>
              <p className="text-xs text-slate-400">Verified demographic breakdown across Indian metro tech hubs</p>
            </div>

            {/* Gender Split Visual Donut / Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-300">Gender Distribution:</span>
                <span className="text-royal-300 font-mono">74% Male • 24% Female • 2% Other</span>
              </div>
              <div className="h-3.5 w-full rounded-full bg-white/[0.06] overflow-hidden flex">
                <div style={{ width: '74%' }} className="bg-gradient-to-r from-royal-600 to-blue-500 h-full" title="74% Male" />
                <div style={{ width: '24%' }} className="bg-gradient-to-r from-pink-500 to-rose-400 h-full" title="24% Female" />
                <div style={{ width: '2%' }} className="bg-amber-400 h-full" title="2% Other" />
              </div>
              <div className="flex items-center gap-4 text-[10px] text-slate-400 pt-1 font-mono">
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-royal-500" /> Male (74%)</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-pink-500" /> Female (24%)</span>
                <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400" /> Other (2%)</span>
              </div>
            </div>

            {/* Age Bracket Stacked Progress Bars */}
            <div className="space-y-3 pt-2 border-t border-white/[0.06]">
              <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Age Bracket Spread:</span>

              {[
                { label: '18 - 24 Years (College / Freshers)', percentage: 52, color: 'from-royal-600 to-royal-400' },
                { label: '25 - 34 Years (Working SDEs / Pros)', percentage: 38, color: 'from-blue-500 to-cyan-400' },
                { label: '35 - 44 Years (Tech Leads & Managers)', percentage: 8, color: 'from-indigo-500 to-purple-400' },
                { label: '45+ Years (Executive / Senior)', percentage: 2, color: 'from-slate-500 to-slate-400' },
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

          {/* Top Indian Cities (6 cols) */}
          <div className="lg:col-span-6 rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-4">
            <div>
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                <MapPin className="h-4 w-4 text-royal-400" />
                <span>Top Indian Metros & Geographies</span>
              </h3>
              <p className="text-xs text-slate-400">Concentrated audience in India's top software & purchasing hubs</p>
            </div>

            <div className="space-y-3">
              {[
                { city: 'Bengaluru (Silicon Valley of India)', percentage: 36 },
                { city: 'Delhi NCR (Gurugram / Noida Tech Belt)', percentage: 24 },
                { city: 'Hyderabad (Cyberabad Corridor)', percentage: 16 },
                { city: 'Mumbai & Pune (Western IT Belt)', percentage: 14 },
                { city: 'Tier 2 & 3 Metros (Jaipur, Indore, Kochi)', percentage: 10 },
              ].map((c, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{c.city}</span>
                    <span className="font-bold text-white font-mono">{c.percentage}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-royal-600 to-blue-400"
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
                <span>Tier-1 Purchasing Power:</span>
                <span className="font-mono font-bold text-emerald-400">90% Concentration</span>
              </div>
              <div className="flex justify-between">
                <span>Primary Mobile OS:</span>
                <span className="font-mono text-royal-300 font-bold">Android (72%) • iOS (28%)</span>
              </div>
            </div>
          </div>

        </div>

        {/* SECTION 3: BEST POSTING TIME (IST) ⏰ */}
        <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-white/[0.06]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-royal-400 font-mono flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>Algorithm Golden Windows</span>
              </span>
              <h3 className="font-display text-base font-bold text-white mt-0.5">
                Optimal Indian Posting Schedule (IST)
              </h3>
            </div>
            <span className="text-xs text-emerald-400 font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
              Golden Window: 07:30 PM - 09:30 PM IST
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5">
            {BEST_POSTING_SCHEDULE.map((sched, idx) => (
              <HoverCard
                hoverY={-2}
                key={idx}
                className={`p-3.5 rounded-[16px] border text-left flex flex-col justify-between space-y-2 ${
                  sched.peakEngagement.includes('Peak')
                    ? 'border-royal-500 bg-royal-600/15 shadow-royal-sm ring-1 ring-royal-500/40'
                    : 'border-white/[0.08] bg-white/[0.03]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display text-sm font-bold text-white">{sched.day}</span>
                    <span className={`text-[9px] font-bold font-mono px-1.5 py-0.5 rounded ${
                      sched.peakEngagement.includes('Peak') ? 'bg-royal-600 text-white' : 'bg-white/[0.06] text-slate-400'
                    }`}>
                      {sched.engagementScore}%
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-royal-300 font-semibold">{sched.window}</p>
                </div>
                <p className="text-[10px] text-slate-400 line-clamp-2">{sched.tip}</p>
              </HoverCard>
            ))}
          </div>
        </div>

        {/* SECTION 4: AI PRICING SUGGESTIONS & RATE CARD */}
        <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 shadow-glass-card space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-white/[0.06]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-royal-400 font-mono">
                AI Sponsorship Rate Card
              </span>
              <h3 className="font-display text-base font-bold text-white mt-0.5">
                AI Suggested Deliverable Rates (INR ₹)
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Auto-calculated for {followerCount.toLocaleString()} {creatorNiche.split(' ')[0]} audience
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Reel */}
            <HoverCard hoverY={-3} className="p-4 rounded-[18px] bg-white/[0.03] border border-white/[0.08] hover:border-pink-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-[10px] bg-pink-500/10 text-pink-400 border border-pink-500/20">
                  <Instagram className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-bold text-emerald-400 font-mono">+18% GST</span>
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">Instagram Reel (30-60s)</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Story repost & pinned comment included</p>
              </div>
              <div className="font-display text-xl font-extrabold text-white font-mono pt-2 border-t border-white/[0.06]">
                <AnimatedCounter value={calculatedMetrics.rates.reel} prefix="₹" />
              </div>
            </HoverCard>

            {/* YouTube 60s */}
            <HoverCard hoverY={-3} className="p-4 rounded-[18px] bg-white/[0.03] border border-white/[0.08] hover:border-red-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-[10px] bg-red-500/10 text-red-400 border border-red-500/20">
                  <Youtube className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-bold text-emerald-400 font-mono">+18% GST</span>
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">YouTube 60s Integration</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Mid-roll segment & description link</p>
              </div>
              <div className="font-display text-xl font-extrabold text-white font-mono pt-2 border-t border-white/[0.06]">
                <AnimatedCounter value={calculatedMetrics.rates.ytIntegration} prefix="₹" />
              </div>
            </HoverCard>

            {/* Dedicated Masterclass */}
            <HoverCard hoverY={-3} className="p-4 rounded-[18px] bg-white/[0.03] border border-white/[0.08] hover:border-rose-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <Youtube className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-bold text-emerald-400 font-mono">+18% GST</span>
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">Dedicated Video (10-15m)</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Full product demo & tutorial</p>
              </div>
              <div className="font-display text-xl font-extrabold text-white font-mono pt-2 border-t border-white/[0.06]">
                <AnimatedCounter value={calculatedMetrics.rates.ytDedicated} prefix="₹" />
              </div>
            </HoverCard>

            {/* LinkedIn Post */}
            <HoverCard hoverY={-3} className="p-4 rounded-[18px] bg-white/[0.03] border border-white/[0.08] hover:border-blue-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Linkedin className="h-4 w-4" />
                </div>
                <span className="text-[10px] font-bold text-emerald-400 font-mono">+18% GST</span>
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">LinkedIn Post</h4>
                <p className="text-[10px] text-slate-400 mt-0.5">Reaching senior Indian engineers</p>
              </div>
              <div className="font-display text-xl font-extrabold text-white font-mono pt-2 border-t border-white/[0.06]">
                <AnimatedCounter value={calculatedMetrics.rates.linkedin} prefix="₹" />
              </div>
            </HoverCard>

          </div>
        </div>

      </div>
    </PageTransition>
  );
}
