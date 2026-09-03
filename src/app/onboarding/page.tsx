'use client';

import React, { useState } from 'react';
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
  ArrowUpRight
} from 'lucide-react';
import { useCreatorStore } from '@/lib/store';
import { THEMES } from '@/lib/mock-data';
import { RippleButton, HoverCard, PageTransition } from '@/components/ui/motion';
import { motion, AnimatePresence } from 'framer-motion';

// Step 1: Curated Creator Categories for Bharat
const CREATOR_CATEGORIES = [
  {
    id: 'student_prep',
    title: 'Student & Campus Prep',
    subtitle: 'Selling handwritten college notes, exam roadmaps & resume templates',
    icon: GraduationCap,
    popular: 'Top Pick for Colleges',
    sampleProduct: 'GATE / DSA Top 100 Handwritten Notes'
  },
  {
    id: 'software_tech',
    title: 'Software & Engineering',
    subtitle: 'DSA sheets, system design architectures, code repos & 1:1 mock calls',
    icon: Code2,
    popular: 'Highest Earning Niche',
    sampleProduct: 'FAANG SDE-2 Interview Playbook'
  },
  {
    id: 'educator_course',
    title: 'Educator & Cohort Host',
    subtitle: 'Video courses, multi-module cohorts, certificates & student portals',
    icon: BookOpen,
    popular: 'Kajabi Alternative',
    sampleProduct: 'Complete Full-Stack Web3 Bootcamp'
  },
  {
    id: 'freelance_agency',
    title: 'Freelancer & Consultant',
    subtitle: 'Figma design systems, Notion workspace templates & paid audits',
    icon: Briefcase,
    popular: 'Topmate Alternative',
    sampleProduct: 'Freelance Design OS & Contract Pack'
  },
  {
    id: 'finance_fintech',
    title: 'Finance & Investing Coach',
    subtitle: 'Personal finance guides, trading journals, tax cheat sheets & webinars',
    icon: TrendingUp,
    popular: 'High Conversion',
    sampleProduct: 'Indian Stock Market & Mutual Fund Guide'
  },
  {
    id: 'influencer_lifestyle',
    title: 'Influencer & Digital Creator',
    subtitle: 'Brand sponsorship media kits, presets, Chai tip jar & community access',
    icon: Sparkles,
    popular: 'Stan Store Equivalent',
    sampleProduct: 'Lightroom Cinematic Preset Bundle'
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
  const [tagline, setTagline] = useState('Senior Software Engineer & Mentor');
  const [bio, setBio] = useState('Helping 200k+ engineers crack FAANG & build scalable systems.');
  const [location, setLocation] = useState('Bengaluru, Karnataka');
  const [avatarUrl, setAvatarUrl] = useState(activeCreator?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');
  const [socialYoutube, setSocialYoutube] = useState('youtube.com/@aaravcodes');
  const [socialInstagram, setSocialInstagram] = useState('instagram.com/aarav.tech');
  const [socialLinkedin, setSocialLinkedin] = useState('linkedin.com/in/aaravsharma');

  // STEP 3 STATE: Storefront & 1st Product
  const [selectedThemeId, setSelectedThemeId] = useState<string>('linear-royal');
  const [productTitle, setProductTitle] = useState('Complete DSA & System Design Master Sheet 2025');
  const [productPrice, setProductPrice] = useState('399');
  const [productCategory, setProductCategory] = useState('Interview Prep');
  const [upiId, setUpiId] = useState('aarav@okaxis');
  const [isFinishing, setIsFinishing] = useState(false);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as any);
    } else {
      handleCompleteOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as any);
    }
  };

  const handleCompleteOnboarding = () => {
    setIsFinishing(true);

    // Save updated creator details
    updateCreator({
      name,
      username: username.toLowerCase().replace(/[^a-z0-9._]/g, ''),
      tagline,
      bio,
      location,
      category: selectedCategory,
      themeId: selectedThemeId,
      upiId,
      upiName: name,
      socials: {
        youtube: socialYoutube.startsWith('http') ? socialYoutube : `https://${socialYoutube}`,
        instagram: socialInstagram.startsWith('http') ? socialInstagram : `https://${socialInstagram}`,
        linkedin: socialLinkedin.startsWith('http') ? socialLinkedin : `https://${socialLinkedin}`,
      }
    });

    // Add first initial product
    if (productTitle.trim()) {
      addProduct({
        title: productTitle,
        subtitle: 'Created during your CreatorOS onboarding',
        description: `Official ${productTitle} with instant 1-click UPI download and automated GST tax invoice.`,
        price: Number(productPrice) || 399,
        originalPrice: (Number(productPrice) || 399) * 3,
        category: productCategory,
        fileType: 'PDF',
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
        downloadUrl: 'https://example.com/starter-asset.pdf',
        features: [
          'Instant UPI payment & confirmation',
          'Automatic WhatsApp delivery in 45 seconds',
          'GST-compliant SAC tax invoice'
        ]
      });
    }

    try {
      confetti({
        particleCount: 180,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#2563EB', '#60A5FA', '#10B981', '#F8FAFC', '#9333EA']
      });
    } catch (e) {
      console.warn(e);
    }

    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#05070B] text-slate-100 font-sans selection:bg-royal-600 selection:text-white flex flex-col justify-between">
        
        {/* TOP BAR / PROGRESS INDICATOR */}
        <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#05070B]/90 backdrop-blur-2xl px-4 sm:px-8 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-gradient-to-b from-royal-500 to-royal-700 shadow-royal">
                <Zap className="h-4 w-4 text-white fill-white" />
              </div>
              <span className="font-display text-base font-bold text-white">
                Creator<span className="text-royal-400">OS</span>
              </span>
              <span className="rounded bg-royal-600/15 px-1.5 py-0.5 text-[8px] font-bold text-royal-400 border border-royal-500/30 font-mono">
                ONBOARDING
              </span>
            </div>

            {/* 3-Step Interactive Breadcrumb Bar */}
            <div className="flex items-center gap-2 sm:gap-4">
              {[
                { step: 1, label: 'Creator Niche' },
                { step: 2, label: 'Identity & Socials' },
                { step: 3, label: 'First Storefront' },
              ].map((s) => {
                const isCompleted = currentStep > s.step;
                const isCurrent = currentStep === s.step;
                return (
                  <div key={s.step} className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-all font-mono ${
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
                        className={`text-xs font-medium hidden md:inline transition ${
                          isCurrent ? 'text-white font-semibold' : 'text-slate-500'
                        }`}
                      >
                        {s.label}
                      </span>
                    </div>
                    {s.step < 3 && <div className="h-0.5 w-4 sm:w-8 bg-white/[0.08]" />}
                  </div>
                );
              })}
            </div>

            {/* Exit to Studio */}
            <button
              onClick={() => router.push('/dashboard')}
              className="text-xs text-slate-400 hover:text-white transition font-medium"
            >
              Skip to Studio →
            </button>

          </div>
        </header>

        {/* MAIN ONBOARDING CONTENT CONTAINER */}
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
          
          <AnimatePresence mode="wait">
            
            {/* STEP 1: CHOOSE CREATOR CATEGORY */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center max-w-xl mx-auto space-y-2">
                  <span className="rounded-full bg-royal-600/20 text-royal-300 border border-royal-500/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider font-mono">
                    Step 1 of 3
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    What type of creator are you?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    We will tailor your bio storefront, UPI checkout templates, and GST invoices for your niche.
                  </p>
                </div>

                {/* 6 Category Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {CREATOR_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategory === cat.title;
                    return (
                      <HoverCard
                        hoverY={-3}
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.title)}
                        className={`cursor-pointer rounded-[20px] p-5 border text-left transition-all relative ${
                          isSelected
                            ? 'border-royal-500 bg-gradient-to-r from-royal-600/20 via-[#0D1530] to-[#0A0E1A] shadow-royal ring-1 ring-royal-500/50'
                            : 'border-white/[0.08] bg-[#0A0E1A]/85 hover:border-white/[0.18]'
                        }`}
                      >
                        {cat.popular && (
                          <span className="absolute top-4 right-4 rounded-full bg-white/[0.06] border border-white/[0.08] px-2.5 py-0.5 text-[9px] font-bold text-royal-300 font-mono">
                            {cat.popular}
                          </span>
                        )}

                        <div className="flex items-start gap-3.5">
                          <div
                            className={`p-3 rounded-[14px] transition ${
                              isSelected
                                ? 'bg-royal-600 text-white shadow-royal-sm'
                                : 'bg-white/[0.05] text-slate-400 border border-white/[0.06]'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>

                          <div className="space-y-1 pr-12">
                            <h3 className="font-display text-base font-bold text-white flex items-center gap-1.5">
                              <span>{cat.title}</span>
                              {isSelected && <Check className="h-4 w-4 text-emerald-400 stroke-[3]" />}
                            </h3>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              {cat.subtitle}
                            </p>
                            <p className="text-[11px] text-royal-400 font-mono pt-1">
                              e.g. {cat.sampleProduct}
                            </p>
                          </div>
                        </div>
                      </HoverCard>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2: UPLOAD PROFILE & SOCIAL LINKS */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 max-w-2xl mx-auto"
              >
                <div className="text-center space-y-2">
                  <span className="rounded-full bg-royal-600/20 text-royal-300 border border-royal-500/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider font-mono">
                    Step 2 of 3
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Set up your Identity & Socials
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Your profile will be verified and displayed at the top of your bio storefront.
                  </p>
                </div>

                <div className="rounded-[24px] border border-white/[0.08] bg-[#0A0E1A]/90 p-6 sm:p-7 shadow-glass-card space-y-5">
                  
                  {/* Avatar upload simulation */}
                  <div className="flex items-center gap-4 pb-4 border-b border-white/[0.08]">
                    <div className="relative h-16 w-16 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-royal-600 to-blue-400 shadow-royal">
                      <img src={avatarUrl} alt="Avatar" className="h-full w-full rounded-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-display text-sm font-bold text-white">Profile Photo</h4>
                      <p className="text-[11px] text-slate-400">High-res square avatar with verified badge</p>
                      <button
                        type="button"
                        onClick={() => setAvatarUrl('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80')}
                        className="text-[11px] text-royal-400 hover:underline font-semibold mt-1"
                      >
                        Change Photo ↺
                      </button>
                    </div>
                  </div>

                  {/* Name & Handle */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Creator Display Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Aarav Sharma"
                        className="w-full rounded-[14px] border border-white/[0.1] bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-royal-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Custom Bio-Link Handle</label>
                      <div className="flex items-center rounded-[14px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs focus-within:border-royal-500">
                        <span className="text-slate-500 font-mono">creatoros.in/</span>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="aarav.tech"
                          className="flex-1 bg-transparent text-white focus:outline-none font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tagline & Bio */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Headline Tagline</label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="Senior Software Engineer & Mentor"
                      className="w-full rounded-[14px] border border-white/[0.1] bg-black/50 px-3.5 py-2.5 text-xs text-white focus:border-royal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Short Bio</label>
                    <textarea
                      rows={2}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Helping 200k+ engineers crack top product companies."
                      className="w-full rounded-[14px] border border-white/[0.1] bg-black/50 px-3.5 py-2 text-xs text-white focus:border-royal-500 focus:outline-none leading-relaxed"
                    />
                  </div>

                  {/* Social Handles */}
                  <div className="pt-2 border-t border-white/[0.08] space-y-3">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                      Connect Social Media Channels
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="flex items-center gap-2 rounded-[12px] bg-black/40 border border-white/[0.08] px-3 py-2">
                        <Youtube className="h-4 w-4 text-red-400 shrink-0" />
                        <input
                          type="text"
                          value={socialYoutube}
                          onChange={(e) => setSocialYoutube(e.target.value)}
                          placeholder="youtube.com/..."
                          className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none truncate"
                        />
                      </div>

                      <div className="flex items-center gap-2 rounded-[12px] bg-black/40 border border-white/[0.08] px-3 py-2">
                        <Instagram className="h-4 w-4 text-pink-400 shrink-0" />
                        <input
                          type="text"
                          value={socialInstagram}
                          onChange={(e) => setSocialInstagram(e.target.value)}
                          placeholder="instagram.com/..."
                          className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none truncate"
                        />
                      </div>

                      <div className="flex items-center gap-2 rounded-[12px] bg-black/40 border border-white/[0.08] px-3 py-2">
                        <Linkedin className="h-4 w-4 text-blue-400 shrink-0" />
                        <input
                          type="text"
                          value={socialLinkedin}
                          onChange={(e) => setSocialLinkedin(e.target.value)}
                          placeholder="linkedin.com/..."
                          className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none truncate"
                        />
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

            {/* STEP 3: CREATE FIRST STOREFRONT & PRODUCT */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 max-w-3xl mx-auto"
              >
                <div className="text-center space-y-2">
                  <span className="rounded-full bg-royal-600/20 text-royal-300 border border-royal-500/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider font-mono">
                    Step 3 of 3
                  </span>
                  <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    Launch Your First Monetization Offering
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Choose a storefront visual theme and create your first paid digital asset or 1:1 session.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Controls (7 cols) */}
                  <div className="md:col-span-7 space-y-4">
                    
                    {/* Theme Picker */}
                    <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-5 shadow-glass-card space-y-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                        Select Storefront Theme
                      </span>

                      <div className="grid grid-cols-3 gap-2">
                        {THEMES.slice(0, 3).map((th) => (
                          <button
                            key={th.id}
                            type="button"
                            onClick={() => setSelectedThemeId(th.id)}
                            className={`p-2.5 rounded-[14px] border text-left transition btn-press ${
                              selectedThemeId === th.id
                                ? 'border-royal-500 bg-royal-600/20 ring-1 ring-royal-500'
                                : 'border-white/[0.08] bg-black/40 hover:border-white/[0.2]'
                            }`}
                          >
                            <span className="block text-xs font-bold text-white truncate">{th.name}</span>
                            <span className="h-1.5 w-full rounded-full mt-1.5 block" style={{ backgroundColor: th.accentColor }} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Initial Product Details */}
                    <div className="rounded-[20px] border border-white/[0.08] bg-[#0A0E1A]/90 p-5 shadow-glass-card space-y-3.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                        First Paid Offering Details
                      </span>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Product Title</label>
                        <input
                          type="text"
                          value={productTitle}
                          onChange={(e) => setProductTitle(e.target.value)}
                          placeholder="Complete DSA & System Design Master Sheet"
                          className="w-full rounded-[14px] border border-white/[0.1] bg-black/50 px-3.5 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">Price in Rupees (₹)</label>
                          <input
                            type="number"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            placeholder="399"
                            className="w-full rounded-[14px] border border-white/[0.1] bg-black/50 px-3.5 py-2 text-xs text-royal-400 font-mono font-bold focus:border-royal-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-300 mb-1">Primary UPI ID (VPA)</label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="aarav@okaxis"
                            className="w-full rounded-[14px] border border-white/[0.1] bg-black/50 px-3.5 py-2 text-xs text-white font-mono focus:border-royal-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="p-3 rounded-[12px] bg-royal-600/10 border border-royal-500/20 text-xs text-slate-300 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-royal-400 shrink-0" />
                        <span>Instant 1-click PhonePe, GPay & Paytm checkout is automatically enabled.</span>
                      </div>
                    </div>

                  </div>

                  {/* Right Live Card Preview (5 cols) */}
                  <div className="md:col-span-5 flex flex-col items-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono mb-2 flex items-center gap-1">
                      <Smartphone className="h-3.5 w-3.5 text-royal-400" />
                      <span>Live Storefront Preview</span>
                    </span>

                    <div className="w-full max-w-[280px] rounded-[22px] border border-white/[0.12] bg-[#07090F] p-4 shadow-2xl text-center space-y-3">
                      <div className="h-16 w-16 rounded-full mx-auto p-0.5 bg-royal-600">
                        <img src={avatarUrl} alt="Avatar" className="h-full w-full rounded-full object-cover" />
                      </div>

                      <div>
                        <h4 className="font-display text-sm font-bold text-white">{name}</h4>
                        <p className="text-[10px] text-royal-400 font-mono">creatoros.in/{username}</p>
                        <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{tagline}</p>
                      </div>

                      {/* Product Card Preview */}
                      <div className="rounded-[16px] bg-white/[0.04] border border-white/[0.08] p-3 text-left space-y-2">
                        <p className="text-xs font-bold text-white line-clamp-1">{productTitle}</p>
                        <div className="flex items-center justify-between text-xs pt-1 border-t border-white/[0.06]">
                          <span className="font-bold text-royal-400 font-mono">₹{productPrice}</span>
                          <span className="rounded bg-royal-600 text-[9px] font-bold text-white px-2 py-0.5">
                            Buy with UPI
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </main>

        {/* BOTTOM NAVIGATION CONTROLS */}
        <footer className="border-t border-white/[0.08] bg-[#05070B]/90 backdrop-blur-2xl p-4 sm:p-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            
            {/* Back Button */}
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 rounded-[14px] border border-white/[0.1] bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/[0.08] transition btn-press"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {/* Next / Finish Button with Ripple */}
            <RippleButton
              onClick={handleNext}
              className="rounded-[16px] bg-royal-600 hover:bg-royal-500 px-7 py-3 text-xs font-bold text-white shadow-royal"
            >
              <span>{currentStep === 3 ? (isFinishing ? 'Launching Storefront...' : 'Complete & Launch Storefront 🚀') : 'Continue to Next Step'}</span>
              <ArrowRight className="h-4 w-4" />
            </RippleButton>

          </div>
        </footer>

      </div>
    </PageTransition>
  );
}
