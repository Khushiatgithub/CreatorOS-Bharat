'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  CheckCircle2, 
  ShieldCheck, 
  User, 
  Globe, 
  ShoppingBag, 
  Smartphone, 
  BookOpen, 
  Code2, 
  GraduationCap, 
  Briefcase, 
  TrendingUp, 
  Layers, 
  Camera, 
  Youtube, 
  Instagram, 
  Linkedin, 
  Send, 
  Zap, 
  Lock, 
  DollarSign, 
  MapPin, 
  Palette,
  Eye,
  ArrowUpRight,
  RefreshCw,
  Share2,
  Sliders,
  CheckCircle,
  HelpCircle,
  Clock,
  Laptop
} from 'lucide-react';
import { useCreatorStore } from '@/lib/store';
import { THEMES } from '@/lib/mock-data';
import { RippleButton, HoverCard, PageTransition } from '@/components/ui/motion';
import { motion, AnimatePresence } from 'framer-motion';

// STEP 1: Curated Creator Categories with Rich Visual Metadata
const CREATOR_CATEGORIES = [
  {
    id: 'software_tech',
    title: 'Software & Engineering',
    subtitle: 'DSA sheets, system design roadmaps, code repos & 1:1 mock interviews',
    icon: Code2,
    badge: 'Highest Earning',
    badgeColor: 'text-royal-400 border-royal-500/30 bg-royal-600/15',
    sampleProduct: 'FAANG SDE-2 Interview Playbook (PDF)',
    estimatedMonthly: '₹1,50,000+'
  },
  {
    id: 'student_prep',
    title: 'Student & Academic Prep',
    subtitle: 'Handwritten college notes, GATE/UPSC blueprints & semester roadmaps',
    icon: GraduationCap,
    badge: 'Top Pick for Bharat',
    badgeColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/15',
    sampleProduct: 'Complete DSA 450 Handwritten Notes',
    estimatedMonthly: '₹85,000+'
  },
  {
    id: 'finance_fintech',
    title: 'Finance & Trading Coach',
    subtitle: 'Stock market cheat sheets, personal budgeting OS & live webinars',
    icon: TrendingUp,
    badge: 'High Conversion',
    badgeColor: 'text-amber-400 border-amber-500/30 bg-amber-500/15',
    sampleProduct: 'Indian Stock Market & Tax Planner',
    estimatedMonthly: '₹2,20,000+'
  },
  {
    id: 'freelance_agency',
    title: 'Design & Freelancer',
    subtitle: 'Figma UI design kits, Notion project OS & 1:1 portfolio reviews',
    icon: Briefcase,
    badge: 'Topmate Alternative',
    badgeColor: 'text-purple-400 border-purple-500/30 bg-purple-500/15',
    sampleProduct: 'Freelance Agency Contract Pack',
    estimatedMonthly: '₹1,20,000+'
  },
  {
    id: 'educator_course',
    title: 'Educator & Cohort Host',
    subtitle: 'Multi-module video courses, digital certifications & student portals',
    icon: BookOpen,
    badge: 'Kajabi Alternative',
    badgeColor: 'text-blue-400 border-blue-500/30 bg-blue-500/15',
    sampleProduct: 'Full-Stack Next.js 14 Masterclass',
    estimatedMonthly: '₹3,00,000+'
  },
  {
    id: 'influencer_lifestyle',
    title: 'Creator & Media Influencer',
    subtitle: 'Brand media kit, presets, exclusive community VIP access & Chai tip jar',
    icon: Sparkles,
    badge: 'Stan Store Alternative',
    badgeColor: 'text-pink-400 border-pink-500/30 bg-pink-500/15',
    sampleProduct: 'Cinematic Lightroom Presets 2025',
    estimatedMonthly: '₹95,000+'
  }
];

export default function CreatorOnboardingWizard() {
  const router = useRouter();
  const { activeCreator, updateCreator, addProduct } = useCreatorStore();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // STEP 1 STATE: Category
  const [selectedCategory, setSelectedCategory] = useState<string>('Software & Engineering');

  // STEP 2 STATE: Identity & Socials
  const [name, setName] = useState(activeCreator?.name || 'Aarav Sharma');
  const [username, setUsername] = useState(activeCreator?.username || 'aarav.tech');
  const [tagline, setTagline] = useState('Senior Software Engineer & Tech Educator');
  const [bio, setBio] = useState('Helping 200k+ engineers crack top product companies with clean architectures.');
  const [avatarUrl, setAvatarUrl] = useState(activeCreator?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');
  
  // Social Handles & Connection States
  const [igHandle, setIgHandle] = useState('aarav.tech');
  const [igConnected, setIgConnected] = useState(true);
  const [igFollowers, setIgFollowers] = useState('124K');

  const [ytHandle, setYtHandle] = useState('@aaravcodes');
  const [ytConnected, setYtConnected] = useState(true);
  const [ytFollowers, setYtFollowers] = useState('185K');

  const [liHandle, setLiHandle] = useState('aaravsharma');
  const [liConnected, setLiConnected] = useState(true);
  const [liFollowers, setLiFollowers] = useState('68K');

  // STEP 3 STATE: Storefront & 1st Product
  const [storeTheme, setStoreTheme] = useState<string>('linear-royal');
  const [productTitle, setProductTitle] = useState('Complete DSA & System Design Master Notes');
  const [productPrice, setProductPrice] = useState('499');
  const [productCategory, setProductCategory] = useState('Digital Notes');
  const [upiId, setUpiId] = useState(activeCreator?.upiId || 'aarav@okaxis');
  const [isFinishing, setIsFinishing] = useState(false);

  // Load saved progress from localStorage on initial render
  useEffect(() => {
    try {
      const savedStep = localStorage.getItem('creatoros_onboarding_step');
      if (savedStep && ['1', '2', '3'].includes(savedStep)) {
        setCurrentStep(Number(savedStep) as any);
      }
      const savedCategory = localStorage.getItem('creatoros_onboarding_category');
      if (savedCategory) setSelectedCategory(savedCategory);
    } catch (e) {
      console.warn('Could not read onboarding localStorage', e);
    }
  }, []);

  // Save progress whenever step or category changes
  const saveProgressToStorage = (step: number, cat?: string) => {
    try {
      localStorage.setItem('creatoros_onboarding_step', step.toString());
      if (cat) localStorage.setItem('creatoros_onboarding_category', cat);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleNext = () => {
    if (currentStep === 1) {
      saveProgressToStorage(2, selectedCategory);
      setCurrentStep(2);
    } else if (currentStep === 2) {
      saveProgressToStorage(3);
      setCurrentStep(3);
    } else {
      handleCompleteOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const prev = (currentStep - 1) as any;
      setCurrentStep(prev);
      saveProgressToStorage(prev);
    }
  };

  const handleSkip = () => {
    try {
      localStorage.removeItem('creatoros_onboarding_step');
    } catch (e) {}
    router.push('/dashboard');
  };

  const handleCompleteOnboarding = () => {
    setIsFinishing(true);

    // Save updated creator details
    updateCreator({
      name: name.trim() || 'Aarav Sharma',
      username: username.toLowerCase().replace(/[^a-z0-9._]/g, '') || 'creator',
      tagline,
      bio,
      category: selectedCategory,
      themeId: storeTheme,
      upiId: upiId.trim() || 'creator@okaxis',
      upiName: name,
      avatarUrl,
      socials: {
        youtube: ytConnected ? `https://youtube.com/${ytHandle}` : '',
        instagram: igConnected ? `https://instagram.com/${igHandle}` : '',
        linkedin: liConnected ? `https://linkedin.com/in/${liHandle}` : '',
      }
    });

    // Add initial starter product
    if (productTitle.trim()) {
      addProduct({
        title: productTitle.trim(),
        subtitle: 'Created during your CreatorOS Bharat onboarding',
        description: `Official ${productTitle} with instant 1-click UPI download, automatic WhatsApp delivery, and GST tax invoice.`,
        price: Number(productPrice) || 499,
        originalPrice: (Number(productPrice) || 499) * 2,
        category: productCategory,
        fileType: 'PDF',
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
        downloadUrl: 'https://example.com/starter-kit.pdf',
        features: [
          'Instant UPI checkout with QR & GPay/PhonePe',
          'Automatic WhatsApp delivery in 30 seconds',
          'Official SAC 998431 Tax Invoice included'
        ]
      });
    }

    try {
      confetti({
        particleCount: 220,
        spread: 100,
        origin: { y: 0.45 },
        colors: ['#2563EB', '#60A5FA', '#10B981', '#F8FAFC', '#9333EA']
      });
      localStorage.removeItem('creatoros_onboarding_step');
    } catch (e) {
      console.warn(e);
    }

    setTimeout(() => {
      router.push('/dashboard');
    }, 1400);
  };

  const progressPercent = currentStep === 1 ? 33 : currentStep === 2 ? 66 : 100;

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#05070B] text-slate-100 font-sans selection:bg-royal-600 selection:text-white flex flex-col justify-between">
        
        {/* TOP HEADER & PROGRESS BAR */}
        <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#05070B]/95 backdrop-blur-2xl px-4 sm:px-8 py-3.5">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
            
            {/* Brand Logo */}
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-b from-royal-500 to-royal-700 shadow-royal">
                <Zap className="h-4 w-4 text-white fill-white" />
              </div>
              <div>
                <span className="font-display text-sm sm:text-base font-bold text-white">
                  Creator<span className="text-royal-400">OS</span>
                </span>
                <span className="ml-1.5 rounded bg-royal-600/20 px-1.5 py-0.5 text-[9px] font-bold text-royal-400 border border-royal-500/30 font-mono">
                  SETUP
                </span>
              </div>
            </div>

            {/* 3-Step Interactive Breadcrumb */}
            <div className="hidden sm:flex items-center gap-3">
              {[
                { step: 1, label: '1. Category' },
                { step: 2, label: '2. Socials' },
                { step: 3, label: '3. Storefront' },
              ].map((s) => {
                const isCompleted = currentStep > s.step;
                const isCurrent = currentStep === s.step;
                return (
                  <div key={s.step} className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition font-mono ${
                          isCompleted
                            ? 'bg-emerald-500 text-black'
                            : isCurrent
                            ? 'bg-royal-600 text-white ring-4 ring-royal-500/25 shadow-royal-sm'
                            : 'bg-white/[0.06] text-slate-500'
                        }`}
                      >
                        {isCompleted ? <Check className="h-3.5 w-3.5 stroke-[3]" /> : s.step}
                      </div>
                      <span
                        className={`text-xs font-semibold transition ${
                          isCurrent ? 'text-white' : 'text-slate-500'
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {s.step < 3 && <div className="h-0.5 w-6 bg-white/[0.08]" />}
                  </div>
                );
              })}
            </div>

            {/* Skip Option */}
            <button
              onClick={handleSkip}
              className="text-xs text-slate-400 hover:text-white transition font-medium flex items-center gap-1"
            >
              <span>Skip to Studio</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

          </div>

          {/* Progress Bar Track */}
          <div className="max-w-5xl mx-auto mt-3 h-1 w-full bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-royal-600 via-blue-400 to-emerald-400"
              initial={{ width: '33%' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            />
          </div>
        </header>

        {/* MAIN WIZARD VIEWPORT */}
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <AnimatePresence mode="wait">
            
            {/* ========================================================================= */}
            {/* STEP 1: CHOOSE CREATOR CATEGORY */}
            {/* ========================================================================= */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="rounded-full bg-royal-600/20 text-royal-300 border border-royal-500/30 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider font-mono">
                    Step 1 of 3: Niche & Domain
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    What type of creator are you?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    We will automatically customize your bio storefront, UPI checkout templates, and GST invoices for your niche.
                  </p>
                </div>

                {/* 6 Category Cards Grid with Illustrations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {CREATOR_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategory === cat.title;

                    return (
                      <HoverCard
                        hoverY={-3}
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.title);
                          saveProgressToStorage(1, cat.title);
                        }}
                        className={`cursor-pointer rounded-[22px] p-5 border text-left transition-all relative ${
                          isSelected
                            ? 'border-royal-500 bg-gradient-to-r from-royal-600/20 via-[#0D1530] to-[#0A0E1A] shadow-royal ring-1 ring-royal-500/50'
                            : 'border-white/[0.08] bg-[#0A0E1A]/85 hover:border-white/[0.18]'
                        }`}
                      >
                        {/* Top Badge */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold font-mono border ${cat.badgeColor}`}>
                            {cat.badge}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-mono font-semibold">
                            Est. {cat.estimatedMonthly}/mo
                          </span>
                        </div>

                        <div className="flex items-start gap-3.5">
                          <div
                            className={`p-3 rounded-[16px] transition shrink-0 ${
                              isSelected
                                ? 'bg-royal-600 text-white shadow-royal-sm'
                                : 'bg-white/[0.05] text-slate-300 border border-white/[0.06]'
                            }`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>

                          <div className="space-y-1">
                            <h3 className="font-display text-base font-bold text-white flex items-center gap-1.5">
                              <span>{cat.title}</span>
                              {isSelected && <Check className="h-4 w-4 text-emerald-400 stroke-[3]" />}
                            </h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              {cat.subtitle}
                            </p>
                            <div className="pt-2">
                              <span className="inline-block rounded-md bg-black/40 px-2 py-0.5 text-[10px] text-royal-300 border border-white/[0.06] font-mono">
                                e.g. {cat.sampleProduct}
                              </span>
                            </div>
                          </div>
                        </div>
                      </HoverCard>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* STEP 2: CONNECT SOCIALS (INSTAGRAM, YOUTUBE, LINKEDIN) */}
            {/* ========================================================================= */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 max-w-2xl mx-auto"
              >
                <div className="text-center space-y-2">
                  <span className="rounded-full bg-royal-600/20 text-royal-300 border border-royal-500/30 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider font-mono">
                    Step 2 of 3: Audience Channels
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Connect Your Social Channels
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Sync your verified profiles to automatically power your bio storefront, AI Media Kit, and brand sponsor rates.
                  </p>
                </div>

                <div className="rounded-[24px] border border-white/[0.08] bg-[#0A0E1A]/90 p-5 sm:p-7 shadow-glass-card space-y-5">
                  
                  {/* Creator Bio Header */}
                  <div className="flex items-center gap-4 pb-4 border-b border-white/[0.08]">
                    <div className="relative h-14 w-14 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-royal-600 to-blue-400 shadow-royal shrink-0">
                      <img src={avatarUrl} alt="Avatar" className="h-full w-full rounded-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your Name"
                          className="font-display text-base font-bold text-white bg-transparent border-b border-white/20 focus:border-royal-500 focus:outline-none w-full"
                        />
                      </div>
                      <input
                        type="text"
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                        placeholder="Creator Tagline / Expertise"
                        className="text-xs text-slate-400 bg-transparent border-b border-white/10 focus:border-royal-500 focus:outline-none w-full mt-1"
                      />
                    </div>
                  </div>

                  {/* 3 Dedicated Social Connection Cards */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                      Social Accounts & Channels
                    </span>

                    {/* Instagram */}
                    <div className={`p-4 rounded-[18px] border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      igConnected ? 'bg-pink-950/15 border-pink-500/30' : 'bg-black/40 border-white/[0.08]'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-[12px] bg-pink-500/15 text-pink-400 border border-pink-500/25">
                          <Instagram className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-white">Instagram Profile</h4>
                          <div className="flex items-center gap-1 text-xs text-slate-300 font-mono mt-0.5">
                            <span>instagram.com/</span>
                            <input
                              type="text"
                              value={igHandle}
                              onChange={(e) => setIgHandle(e.target.value)}
                              className="bg-transparent text-pink-300 font-bold focus:outline-none w-28"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                          {igFollowers} Followers
                        </span>
                        <button
                          type="button"
                          onClick={() => setIgConnected(!igConnected)}
                          className={`px-3 py-1 rounded-[10px] text-xs font-semibold transition ${
                            igConnected ? 'bg-pink-600 text-white shadow-sm' : 'bg-white/[0.06] text-slate-300'
                          }`}
                        >
                          {igConnected ? 'Connected ✓' : 'Connect'}
                        </button>
                      </div>
                    </div>

                    {/* YouTube */}
                    <div className={`p-4 rounded-[18px] border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      ytConnected ? 'bg-red-950/15 border-red-500/30' : 'bg-black/40 border-white/[0.08]'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-[12px] bg-red-500/15 text-red-400 border border-red-500/25">
                          <Youtube className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-white">YouTube Channel</h4>
                          <div className="flex items-center gap-1 text-xs text-slate-300 font-mono mt-0.5">
                            <span>youtube.com/</span>
                            <input
                              type="text"
                              value={ytHandle}
                              onChange={(e) => setYtHandle(e.target.value)}
                              className="bg-transparent text-red-300 font-bold focus:outline-none w-28"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                          {ytFollowers} Subs
                        </span>
                        <button
                          type="button"
                          onClick={() => setYtConnected(!ytConnected)}
                          className={`px-3 py-1 rounded-[10px] text-xs font-semibold transition ${
                            ytConnected ? 'bg-red-600 text-white shadow-sm' : 'bg-white/[0.06] text-slate-300'
                          }`}
                        >
                          {ytConnected ? 'Connected ✓' : 'Connect'}
                        </button>
                      </div>
                    </div>

                    {/* LinkedIn */}
                    <div className={`p-4 rounded-[18px] border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      liConnected ? 'bg-blue-950/15 border-blue-500/30' : 'bg-black/40 border-white/[0.08]'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-[12px] bg-blue-500/15 text-blue-400 border border-blue-500/25">
                          <Linkedin className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-white">LinkedIn Profile</h4>
                          <div className="flex items-center gap-1 text-xs text-slate-300 font-mono mt-0.5">
                            <span>linkedin.com/in/</span>
                            <input
                              type="text"
                              value={liHandle}
                              onChange={(e) => setLiHandle(e.target.value)}
                              className="bg-transparent text-blue-300 font-bold focus:outline-none w-28"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30">
                          {liFollowers} Network
                        </span>
                        <button
                          type="button"
                          onClick={() => setLiConnected(!liConnected)}
                          className={`px-3 py-1 rounded-[10px] text-xs font-semibold transition ${
                            liConnected ? 'bg-blue-600 text-white shadow-sm' : 'bg-white/[0.06] text-slate-300'
                          }`}
                        >
                          {liConnected ? 'Connected ✓' : 'Connect'}
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </motion.div>
            )}

            {/* ========================================================================= */}
            {/* STEP 3: CREATE STOREFRONT & FIRST PRODUCT */}
            {/* ========================================================================= */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 max-w-3xl mx-auto"
              >
                <div className="text-center space-y-2">
                  <span className="rounded-full bg-royal-600/20 text-royal-300 border border-royal-500/30 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider font-mono">
                    Step 3 of 3: Instant Monetization
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Launch Your Bio Storefront
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Set up your 1-click UPI checkout handle and list your first digital product or 1:1 mentorship booking.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* Left Form: Theme & First Offering (7 cols) */}
                  <div className="md:col-span-7 rounded-[24px] border border-white/[0.08] bg-[#0A0E1A]/90 p-5 sm:p-6 shadow-glass-card space-y-4">
                    
                    {/* Bio Handle */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Your Bio-Link Storefront URL</label>
                      <div className="flex items-center rounded-[14px] border border-white/[0.1] bg-black/50 px-3.5 py-2 text-xs focus-within:border-royal-500">
                        <span className="text-slate-500 font-mono">creatoros.in/</span>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="aarav.tech"
                          className="flex-1 bg-transparent text-white font-mono font-bold focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Theme Picker */}
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">Visual Design Theme</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'linear-royal', name: 'Linear Royal', color: 'from-royal-600 to-blue-500' },
                          { id: 'obsidian-gold', name: 'Obsidian Gold', color: 'from-amber-500 to-yellow-600' },
                          { id: 'emerald-bharat', name: 'Emerald Bharat', color: 'from-emerald-500 to-teal-600' },
                        ].map((t) => (
                          <button
                            type="button"
                            key={t.id}
                            onClick={() => setStoreTheme(t.id)}
                            className={`p-2.5 rounded-[14px] border text-left transition ${
                              storeTheme === t.id
                                ? 'border-royal-500 bg-royal-600/20 ring-1 ring-royal-500/50'
                                : 'border-white/[0.08] bg-black/40 hover:border-white/[0.15]'
                            }`}
                          >
                            <div className={`h-2.5 w-full rounded-full bg-gradient-to-r ${t.color} mb-1.5`} />
                            <span className="text-[11px] font-bold text-white block truncate">{t.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* First Offering Title & Price */}
                    <div className="p-4 rounded-[18px] bg-black/40 border border-white/[0.08] space-y-3">
                      <span className="text-[10px] font-bold text-royal-400 uppercase tracking-wider font-mono">
                        Your 1st Digital Product
                      </span>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Product / Notes Title *</label>
                        <input
                          type="text"
                          required
                          value={productTitle}
                          onChange={(e) => setProductTitle(e.target.value)}
                          placeholder="e.g. Complete DSA 450 Sheet & FAANG Roadmaps"
                          className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">Price (INR ₹) *</label>
                          <input
                            type="number"
                            required
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white font-mono font-bold focus:border-royal-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">Payout UPI ID *</label>
                          <input
                            type="text"
                            required
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="creator@okaxis"
                            className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-emerald-400 font-mono focus:border-royal-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Right: Live Interactive Storefront Mockup (5 cols) */}
                  <div className="md:col-span-5 rounded-[24px] border border-white/[0.08] bg-black/60 p-4 shadow-glass-card flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                        <span>Live Bio Preview</span>
                        <span className="text-emerald-400">● Online</span>
                      </div>

                      {/* Storefront Mockup Phone screen */}
                      <div className="rounded-[20px] border border-white/[0.12] bg-[#0A0D17] p-4 text-center space-y-3 shadow-inner">
                        <div className="h-12 w-12 rounded-full mx-auto overflow-hidden p-0.5 bg-gradient-to-tr from-royal-500 to-blue-400">
                          <img src={avatarUrl} alt="Avatar" className="h-full w-full rounded-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-display text-sm font-bold text-white">{name}</h4>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">{tagline}</p>
                        </div>

                        {/* Product Card Pill */}
                        <div className="p-2.5 rounded-[14px] bg-royal-600/15 border border-royal-500/30 text-left space-y-1">
                          <div className="flex justify-between text-xs font-bold">
                            <span className="text-white truncate max-w-[140px]">{productTitle}</span>
                            <span className="text-emerald-400 font-mono">₹{productPrice}</span>
                          </div>
                          <p className="text-[9px] text-slate-400">Instant UPI • Auto GST Invoice</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 rounded-[14px] bg-emerald-950/20 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-200">
                      <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>Zero setup fee • 100% direct UPI settlement</span>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* BOTTOM ACTION BAR */}
        <footer className="border-t border-white/[0.08] bg-[#05070B]/95 backdrop-blur-2xl px-4 sm:px-8 py-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            
            {/* Back Button */}
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="rounded-[14px] border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] px-4 py-2.5 text-xs font-semibold text-slate-300 transition flex items-center gap-1.5"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {/* Next / Launch Button */}
            <RippleButton
              onClick={handleNext}
              disabled={isFinishing}
              className="rounded-[16px] bg-royal-600 hover:bg-royal-500 px-6 py-3 text-xs font-bold text-white shadow-royal flex items-center gap-2"
            >
              <span>
                {currentStep === 3 
                  ? (isFinishing ? 'Launching Studio...' : 'Launch CreatorOS Storefront 🚀')
                  : 'Continue to Next Step'}
              </span>
              <ArrowRight className="h-4 w-4" />
            </RippleButton>

          </div>
        </footer>

      </div>
    </PageTransition>
  );
}
