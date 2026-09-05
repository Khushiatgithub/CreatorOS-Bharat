'use client';

import React, { useState, useMemo, useRef } from 'react';
import { useCreatorStore } from '@/lib/store';
import { formatINR } from '@/lib/gst';
import {
  Crown,
  Sparkles,
  Plus,
  Search,
  CheckCircle2,
  X,
  Edit2,
  Trash2,
  Users,
  Zap,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Receipt,
  Check,
  DollarSign,
  CreditCard,
  Building2,
  Layers,
  ArrowRight,
  Upload,
  Image as ImageIcon,
  MessageSquare,
  GraduationCap,
  Video,
  Radio,
  FileText
} from 'lucide-react';
import {
  SubscriptionPlan,
  Subscription,
  SubscriptionPayment,
  SubscriptionPlanType,
  SubscriptionBillingCycle,
  Order
} from '@/types';
import { PageTransition } from '@/components/ui/motion';
import { motion, AnimatePresence } from 'framer-motion';
import GSTInvoiceModal from '@/components/invoice/GSTInvoiceModal';
import Link from 'next/link';

const COVER_PRESETS = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80'
];

export default function MembershipsDashboardPage() {
  const {
    activeCreator,
    subscriptionPlans,
    subscriptions,
    subscriptionPayments,
    membershipMetrics,
    createSubscriptionPlan,
    updateSubscriptionPlan,
    deleteSubscriptionPlan,
    cancelSubscription,
    changeSubscriptionPlan,
    renewSubscription
  } = useCreatorStore();

  // Navigation tab for secondary management views
  const [activeTab, setActiveTab] = useState<'plans' | 'subscribers' | 'payments'>('plans');

  // Search query for plans
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [planToDelete, setPlanToDelete] = useState<SubscriptionPlan | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Order | null>(null);
  const [managingSubscriber, setManagingSubscriber] = useState<Subscription | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // File input ref for cover image upload
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Create / Edit Modal Form State
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCoverUrl, setFormCoverUrl] = useState(COVER_PRESETS[0]);
  const [formPrice, setFormPrice] = useState(799);
  const [formBillingCycle, setFormBillingCycle] = useState<SubscriptionBillingCycle>('monthly');
  const [formIsPopular, setFormIsPopular] = useState(false);
  const [formBenefits, setFormBenefits] = useState<string[]>([
    'Private VIP WhatsApp & Discord Access',
    'Bi-Weekly Masterclasses & AMAs',
    'Direct 1:1 Mentorship & Code Reviews',
    'Curated Templates & Resources'
  ]);
  const [newBenefitInput, setNewBenefitInput] = useState('');
  
  // Access Toggles State
  const [formCommunityAccess, setFormCommunityAccess] = useState(true);
  const [formCoursesAccess, setFormCoursesAccess] = useState(true);
  const [formLiveSessionsAccess, setFormLiveSessionsAccess] = useState(true);

  // Advanced / Optional State
  const [formType, setFormType] = useState<SubscriptionPlanType>('paid');
  const [formBadgeText, setFormBadgeText] = useState('Most Popular');
  const [formInviteCode, setFormInviteCode] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);

  // Calculate active plans count
  const activePlansCount = useMemo(() => {
    return subscriptionPlans.filter((p) => p.isActive !== false).length;
  }, [subscriptionPlans]);

  // Calculate plan-specific revenue and subscriber counts
  const planRevenueMap = useMemo(() => {
    const map = new Map<string, number>();
    subscriptionPlans.forEach((plan) => {
      const directPayments = subscriptionPayments
        .filter((pay) => pay.planName === plan.name)
        .reduce((sum, pay) => sum + pay.amount, 0);

      const effectivePrice = plan.monthlyPrice || plan.price || (plan.yearlyPrice ? Math.round(plan.yearlyPrice / 10) : 0);
      const estimatedRevenue = (plan.memberCount || 0) * effectivePrice;
      map.set(plan.id, directPayments > 0 ? directPayments : estimatedRevenue);
    });
    return map;
  }, [subscriptionPlans, subscriptionPayments]);

  // Filtered plans based on search
  const filteredPlans = useMemo(() => {
    if (!searchQuery.trim()) return subscriptionPlans;
    const q = searchQuery.toLowerCase();
    return subscriptionPlans.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }, [subscriptionPlans, searchQuery]);

  // Open Create Modal with clean fields
  const handleOpenCreateModal = () => {
    setEditingPlan(null);
    setFormName('');
    setFormSlug('');
    setFormDescription('');
    setFormCoverUrl(COVER_PRESETS[0]);
    setFormPrice(799);
    setFormBillingCycle('monthly');
    setFormIsPopular(false);
    setFormBenefits([
      'Private VIP WhatsApp & Discord Access',
      'Bi-Weekly Masterclasses & AMAs',
      'Direct 1:1 Mentorship & Code Reviews',
      'Curated Templates & Resources'
    ]);
    setNewBenefitInput('');
    setFormCommunityAccess(true);
    setFormCoursesAccess(true);
    setFormLiveSessionsAccess(true);
    setFormType('paid');
    setFormBadgeText('Most Popular');
    setFormInviteCode('');
    setFormIsActive(true);
    setIsCreateModalOpen(true);
  };

  // Open Edit Modal with existing plan data
  const handleOpenEditModal = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
    setFormName(plan.name);
    setFormSlug(plan.slug || plan.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
    setFormDescription(plan.description || plan.tagline || '');
    setFormCoverUrl(plan.coverUrl || COVER_PRESETS[0]);
    
    const cycle = plan.billingCycle || (plan.monthlyPrice > 0 ? 'monthly' : 'yearly');
    setFormBillingCycle(cycle);
    setFormPrice(cycle === 'monthly' ? (plan.monthlyPrice || plan.price || 799) : (plan.yearlyPrice || plan.price || 7999));
    
    setFormIsPopular(Boolean(plan.isPopular));
    setFormBenefits(plan.benefits && plan.benefits.length > 0 ? plan.benefits : [
      'Private VIP Community Access',
      'Live Masterclasses & Q&A'
    ]);
    setNewBenefitInput('');
    setFormCommunityAccess(plan.communityAccess !== false);
    setFormCoursesAccess(plan.coursesAccess !== false);
    setFormLiveSessionsAccess(plan.liveSessionsAccess !== false);
    setFormType(plan.type || 'paid');
    setFormBadgeText(plan.badgeText || 'Most Popular');
    setFormInviteCode(plan.inviteCode || '');
    setFormIsActive(plan.isActive !== false);
    setIsCreateModalOpen(true);
  };

  // Handle Cover Image Upload
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormCoverUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add benefit bullet
  const handleAddBenefit = () => {
    if (!newBenefitInput.trim()) return;
    if (!formBenefits.includes(newBenefitInput.trim())) {
      setFormBenefits([...formBenefits, newBenefitInput.trim()]);
    }
    setNewBenefitInput('');
  };

  // Remove benefit bullet
  const handleRemoveBenefit = (index: number) => {
    setFormBenefits(formBenefits.filter((_, i) => i !== index));
  };

  // Save Plan Submission -> PostgreSQL & Immediate Store Update
  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    setIsSaving(true);
    const slug = formSlug.trim() || formName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const priceNum = Number(formPrice) || 0;
    const monthlyPrice = formBillingCycle === 'monthly' ? priceNum : Math.round(priceNum / 10);
    const yearlyPrice = formBillingCycle === 'yearly' ? priceNum : Math.round(priceNum * 10);

    const planPayload = {
      name: formName.trim(),
      slug,
      tagline: formDescription.trim().slice(0, 100) || formName.trim(),
      description: formDescription.trim(),
      coverUrl: formCoverUrl,
      coverImage: formCoverUrl,
      type: formType,
      price: priceNum,
      billingCycle: formBillingCycle,
      monthlyPrice: formType === 'free' ? 0 : monthlyPrice,
      yearlyPrice: formType === 'free' ? 0 : yearlyPrice,
      benefits: formBenefits,
      isPopular: formIsPopular,
      isActive: formIsActive,
      communityAccess: formCommunityAccess,
      coursesAccess: formCoursesAccess,
      liveSessionsAccess: formLiveSessionsAccess,
      badgeText: formIsPopular ? formBadgeText : undefined,
      inviteCode: formType === 'invite_only' ? formInviteCode : undefined
    };

    if (editingPlan) {
      updateSubscriptionPlan(editingPlan.id, planPayload);
    } else {
      createSubscriptionPlan(planPayload);
    }

    setIsSaving(false);
    setIsCreateModalOpen(false);
  };

  // Confirm Delete Plan
  const handleConfirmDelete = () => {
    if (planToDelete) {
      deleteSubscriptionPlan(planToDelete.id);
      setPlanToDelete(null);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#05070B] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* ==================================================================== */}
        {/* 1. HEADER SECTION                                                    */}
        {/* ==================================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-royal-600/20 border border-royal-500/30 flex items-center justify-center text-royal-400 shadow-glow">
                <Crown className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2.5">
                  Memberships
                  <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    Live
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  Create and manage recurring plans
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href={`/${activeCreator?.username || 'aarav'}#memberships`}
              target="_blank"
              className="flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/[0.08] hover:text-white transition btn-press"
            >
              <span>Public Storefront</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-royal-400" />
            </Link>

            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-royal-600 via-royal-500 to-royal-700 px-5 py-2.5 text-xs font-bold text-white shadow-royal hover:brightness-110 transition btn-press"
            >
              <Plus className="h-4 w-4" />
              <span>Create Plan</span>
            </button>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* 2. STATS CARDS SECTION                                               */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Active Members */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0E1322]/80 backdrop-blur-xl p-5 shadow-glass-subtle relative overflow-hidden group hover:border-emerald-500/30 transition duration-300">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Active Members</span>
              <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {membershipMetrics.activeSubscribers}
              </span>
              <span className="text-xs text-emerald-400 font-mono font-semibold flex items-center gap-0.5">
                +{membershipMetrics.newThisMonth} new
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active paid & VIP subscribers
            </p>
          </div>

          {/* Card 2: Monthly Recurring Revenue (MRR) */}
          <div className="rounded-2xl border border-royal-500/40 bg-gradient-to-br from-[#0E1528] to-[#0A0D17] p-5 shadow-royal relative overflow-hidden group">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-royal-300">Monthly Recurring Revenue (MRR)</span>
              <div className="h-9 w-9 rounded-xl bg-royal-600/20 border border-royal-500/30 flex items-center justify-center text-royal-400 group-hover:scale-110 transition">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {formatINR(membershipMetrics.mrr)}
              </span>
              <span className="text-xs text-emerald-400 font-mono font-semibold">
                +{membershipMetrics.growthPercentage}%
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Auto-renewing recurring monthly revenue
            </p>
          </div>

          {/* Card 3: Active Plans */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0E1322]/80 backdrop-blur-xl p-5 shadow-glass-subtle relative overflow-hidden group hover:border-amber-500/30 transition duration-300">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Active Plans</span>
              <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition">
                <Layers className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {activePlansCount}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                of {subscriptionPlans.length} total
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Published tiers on storefront
            </p>
          </div>

          {/* Card 4: Churn Rate */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0E1322]/80 backdrop-blur-xl p-5 shadow-glass-subtle relative overflow-hidden group hover:border-purple-500/30 transition duration-300">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Churn Rate</span>
              <div className="h-9 w-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition">
                <Activity className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {membershipMetrics.churnRate}%
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                Healthy
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              98%+ recurring subscriber retention
            </p>
          </div>

        </div>

        {/* ==================================================================== */}
        {/* 3. MEMBERSHIP PLANS LIST SECTION                                     */}
        {/* ==================================================================== */}
        <div className="space-y-6">
          
          {/* Section Header with Search & Tab switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Membership Plans</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-royal-600/20 text-royal-300 border border-royal-500/30">
                  {filteredPlans.length}
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter plans..."
                  className="w-full bg-[#0E1322] border border-white/[0.1] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-royal-500 transition"
                />
              </div>

              {/* View Switcher Tabs (Plans / Subscribers / Invoices) */}
              <div className="flex items-center rounded-xl bg-[#0E1322] border border-white/[0.1] p-0.5">
                <button
                  onClick={() => setActiveTab('plans')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    activeTab === 'plans' ? 'bg-royal-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Plans
                </button>
                <button
                  onClick={() => setActiveTab('subscribers')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    activeTab === 'subscribers' ? 'bg-royal-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Members ({subscriptions.length})
                </button>
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    activeTab === 'payments' ? 'bg-royal-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Invoices ({subscriptionPayments.length})
                </button>
              </div>
            </div>
          </div>

          {/* MAIN TAB: Plans Grid */}
          {activeTab === 'plans' && (
            <div>
              {filteredPlans.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/[0.1] bg-[#0E1322]/40 p-12 text-center space-y-4">
                  <div className="h-12 w-12 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-400 mx-auto">
                    <Crown className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">No membership plans found</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                      {searchQuery
                        ? `No plans matching "${searchQuery}". Try clearing your search filter.`
                        : 'Get started by creating your first recurring monthly or yearly membership tier.'}
                    </p>
                  </div>
                  <button
                    onClick={handleOpenCreateModal}
                    className="inline-flex items-center gap-2 rounded-xl bg-royal-600 px-4 py-2 text-xs font-bold text-white shadow-royal hover:bg-royal-500 transition btn-press"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create Plan</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPlans.map((plan) => {
                    const isFree = plan.type === 'free';
                    const isInviteOnly = plan.type === 'invite_only';
                    const revenue = planRevenueMap.get(plan.id) || 0;
                    const coverImg = plan.coverUrl || COVER_PRESETS[0];
                    const isYearly = plan.billingCycle === 'yearly';

                    return (
                      <div
                        key={plan.id}
                        className={`rounded-2xl border flex flex-col justify-between overflow-hidden transition-all duration-300 relative group ${
                          plan.isPopular
                            ? 'border-royal-500/50 bg-gradient-to-b from-[#0F172E] to-[#0A0D17] shadow-royal hover:border-royal-400/80'
                            : 'border-white/[0.08] bg-[#0E1322]/90 hover:border-white/[0.2] hover:bg-[#0E1322]'
                        }`}
                      >
                        {/* 1. Cover Image with Badge Overlay */}
                        <div className="h-40 w-full relative overflow-hidden bg-slate-900 shrink-0">
                          <img
                            src={coverImg}
                            alt={plan.name}
                            className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1322] via-[#0E1322]/40 to-transparent" />

                          {/* Top Badges */}
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
                            {/* Popular Badge */}
                            {plan.isPopular ? (
                              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg flex items-center gap-1.5 pointer-events-auto">
                                <Crown className="h-3.5 w-3.5 fill-white" />
                                <span>{plan.badgeText || 'Most Popular'}</span>
                              </span>
                            ) : (
                              <span />
                            )}

                            {/* Monthly or Yearly / Plan Type Badge */}
                            <div className="flex items-center gap-1.5 pointer-events-auto">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                isYearly ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-black/60 backdrop-blur-md text-slate-200 border border-white/20'
                              }`}>
                                {isFree ? 'Free' : isYearly ? 'Yearly Plan' : 'Monthly Plan'}
                              </span>
                              {isInviteOnly && (
                                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                  Invite Only
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* 2. Plan Details & Metrics Body */}
                        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-3">
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <h3 className="text-base font-bold text-white group-hover:text-royal-300 transition">
                                  {plan.name}
                                </h3>
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/[0.06] text-slate-400 capitalize">
                                  {plan.type}
                                </span>
                              </div>
                              <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                                {plan.description || plan.tagline || 'Exclusive community membership tier.'}
                              </p>
                            </div>

                            {/* Access Modules Chips */}
                            <div className="flex items-center gap-1.5 flex-wrap pt-1">
                              {plan.communityAccess !== false && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-royal-600/20 text-royal-300 border border-royal-500/30">
                                  <MessageSquare className="h-2.5 w-2.5" /> Community
                                </span>
                              )}
                              {plan.coursesAccess !== false && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                                  <GraduationCap className="h-2.5 w-2.5" /> Courses
                                </span>
                              )}
                              {plan.liveSessionsAccess !== false && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
                                  <Video className="h-2.5 w-2.5" /> Live Sessions
                                </span>
                              )}
                            </div>

                            {/* Price in INR */}
                            <div className="pt-2 border-t border-white/[0.08]">
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-2xl font-extrabold text-white font-mono tracking-tight">
                                  {isFree ? 'Free' : formatINR(isYearly ? (plan.yearlyPrice || plan.price || 0) : (plan.monthlyPrice || plan.price || 0))}
                                </span>
                                {!isFree && (
                                  <span className="text-xs text-slate-400 font-mono">
                                    /{isYearly ? 'year' : 'month'}
                                  </span>
                                )}
                              </div>
                              {!isFree && !isYearly && plan.yearlyPrice > 0 && (
                                <div className="text-[11px] text-emerald-400 font-mono font-medium mt-0.5 flex items-center gap-1">
                                  <span>or {formatINR(plan.yearlyPrice)}/year</span>
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                                    Save ~{Math.round((1 - plan.yearlyPrice / (plan.monthlyPrice * 12)) * 100)}%
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Member Count & Revenue Generated Stat Bar */}
                            <div className="grid grid-cols-2 gap-2 pt-1 pb-1">
                              <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.06]">
                                <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                                  <Users className="h-3 w-3 text-royal-400" />
                                  <span>Members</span>
                                </div>
                                <div className="text-sm font-extrabold text-white font-mono mt-0.5">
                                  {plan.memberCount || 0}
                                </div>
                              </div>

                              <div className="p-2.5 rounded-xl bg-black/40 border border-white/[0.06]">
                                <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                                  <TrendingUp className="h-3 w-3 text-emerald-400" />
                                  <span>Revenue</span>
                                </div>
                                <div className="text-sm font-extrabold text-emerald-300 font-mono mt-0.5">
                                  {formatINR(revenue)}
                                </div>
                              </div>
                            </div>

                            {/* Benefits checklist preview */}
                            {plan.benefits && plan.benefits.length > 0 && (
                              <div className="space-y-1.5 pt-1">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  Included Benefits:
                                </div>
                                {plan.benefits.slice(0, 3).map((benefit, i) => (
                                  <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-royal-400 shrink-0 mt-0.5" />
                                    <span className="line-clamp-1">{benefit}</span>
                                  </div>
                                ))}
                                {plan.benefits.length > 3 && (
                                  <div className="text-[11px] text-royal-400 font-medium pl-5">
                                    +{plan.benefits.length - 3} more perks
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* 3. Footer with Edit and Delete Buttons */}
                          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                            <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                              <span className={`h-2 w-2 rounded-full ${plan.isActive !== false ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                              {plan.isActive !== false ? 'Active' : 'Archived'}
                            </span>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleOpenEditModal(plan)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-slate-200 hover:text-white transition btn-press border border-white/[0.08]"
                              >
                                <Edit2 className="h-3.5 w-3.5 text-royal-400" />
                                <span>Edit</span>
                              </button>

                              <button
                                onClick={() => setPlanToDelete(plan)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-xs font-semibold text-rose-400 hover:text-rose-300 transition btn-press border border-rose-500/20"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                <span>Delete</span>
                              </button>
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

          {/* SECONDARY TAB 2: ACTIVE SUBSCRIBERS ROSTER */}
          {activeTab === 'subscribers' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/[0.08] bg-[#0E1322]/80 backdrop-blur-xl overflow-hidden shadow-glass-subtle">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-black/30 border-b border-white/[0.08] text-[11px] uppercase tracking-wider text-slate-400">
                      <tr>
                        <th className="py-3 px-4">Subscriber</th>
                        <th className="py-3 px-4">Plan & Tier</th>
                        <th className="py-3 px-4">Billing Cycle</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Next Renewal</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                      {subscriptions.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-12 text-center text-slate-500">
                            No active subscribers found.
                          </td>
                        </tr>
                      ) : (
                        subscriptions.map((sub) => (
                          <tr key={sub.id} className="hover:bg-white/[0.02] transition">
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={sub.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                                  alt={sub.userName}
                                  className="h-8 w-8 rounded-full object-cover ring-1 ring-white/10"
                                />
                                <div>
                                  <h4 className="font-semibold text-white">{sub.userName}</h4>
                                  <p className="text-[11px] text-slate-400">{sub.userEmail}</p>
                                </div>
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${
                                sub.planType === 'free'
                                  ? 'bg-white/[0.06] text-slate-300'
                                  : sub.planType === 'invite_only'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  : 'bg-royal-600/20 text-royal-300 border border-royal-500/30'
                              }`}>
                                {sub.planName}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 font-mono capitalize text-slate-300">
                              {sub.billingCycle}
                            </td>

                            <td className="py-3.5 px-4 font-mono font-semibold text-white">
                              {sub.amount === 0 ? 'Free' : formatINR(sub.amount)}
                            </td>

                            <td className="py-3.5 px-4 font-mono text-slate-300">
                              {sub.currentPeriodEnd}
                            </td>

                            <td className="py-3.5 px-4">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold capitalize border ${
                                sub.status === 'active'
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                                  : sub.status === 'cancelled'
                                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                                  : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                              }`}>
                                {sub.cancelAtPeriodEnd ? 'Cancels at End' : sub.status}
                              </span>
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => setManagingSubscriber(sub)}
                                className="px-3 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-xs text-royal-400 font-medium transition"
                              >
                                Manage
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SECONDARY TAB 3: RECURRING PAYMENTS & INVOICES */}
          {activeTab === 'payments' && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/[0.08] bg-[#0E1322]/80 backdrop-blur-xl overflow-hidden shadow-glass-subtle">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-black/30 border-b border-white/[0.08] text-[11px] uppercase tracking-wider text-slate-400">
                      <tr>
                        <th className="py-3 px-4">Invoice #</th>
                        <th className="py-3 px-4">Subscriber</th>
                        <th className="py-3 px-4">Plan</th>
                        <th className="py-3 px-4">Cycle</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Payment Method</th>
                        <th className="py-3 px-4">Date & Time</th>
                        <th className="py-3 px-4 text-right">Receipt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.06]">
                      {subscriptionPayments.map((pay) => (
                        <tr key={pay.id} className="hover:bg-white/[0.02] transition">
                          <td className="py-3.5 px-4 font-mono text-royal-400 font-medium">
                            {pay.invoiceNumber}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-white">{pay.subscriberName}</div>
                            <div className="text-[10px] text-slate-400">{pay.subscriberEmail}</div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-300 font-medium">
                            {pay.planName}
                          </td>
                          <td className="py-3.5 px-4 font-mono capitalize text-slate-400">
                            {pay.billingCycle}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-white">
                            {formatINR(pay.amount)}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded bg-white/[0.06] text-[10px] font-mono text-slate-300">
                              {pay.paymentMethod}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-400">
                            {pay.createdAt}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => {
                                setSelectedInvoice({
                                  id: pay.id,
                                  orderNumber: pay.invoiceNumber,
                                  date: pay.createdAt,
                                  creatorId: activeCreator?.id || 'creator_1',
                                  buyerName: pay.subscriberName,
                                  buyerEmail: pay.subscriberEmail,
                                  buyerPhone: '+91 98765 43210',
                                  buyerState: 'Karnataka',
                                  itemType: 'course',
                                  itemId: pay.subscriptionId,
                                  itemTitle: `${pay.planName} (${pay.billingCycle.toUpperCase()} Membership)`,
                                  amount: Math.round(pay.amount / 1.18),
                                  gstRate: 18,
                                  cgst: Math.round((pay.amount * 0.09) / 1.18),
                                  sgst: Math.round((pay.amount * 0.09) / 1.18),
                                  igst: 0,
                                  totalAmount: pay.amount,
                                  paymentMethod: (pay.paymentMethod as any) || 'UPI',
                                  invoiceNumber: pay.invoiceNumber,
                                  sacCode: '998439',
                                  status: 'completed',
                                  deliverySentWhatsapp: true,
                                  deliverySentEmail: true
                                });
                              }}
                              className="px-2.5 py-1 rounded-lg bg-royal-600/15 hover:bg-royal-600/25 text-royal-300 border border-royal-500/30 text-[11px] font-semibold transition flex items-center gap-1 ml-auto"
                            >
                              <Receipt className="h-3 w-3" />
                              <span>GST Invoice</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ==================================================================== */}
        {/* MODAL: CREATE / EDIT MEMBERSHIP PLAN MODAL                            */}
        {/* ==================================================================== */}
        <AnimatePresence>
          {isCreateModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-2xl rounded-2xl border border-white/[0.15] bg-[#0A0D17] p-6 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 sticky top-0 bg-[#0A0D17] z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-royal-600/20 border border-royal-500/30 text-royal-400 flex items-center justify-center shadow-glow">
                      <Crown className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {editingPlan ? 'Edit Membership Plan' : 'Create Membership Plan'}
                      </h3>
                      <p className="text-xs text-slate-400">Configure recurring billing, price, perks, and access permissions</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.08] transition"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSavePlan} className="space-y-5">
                  
                  {/* 1. Cover Image Upload */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                      Cover Image Upload
                    </label>
                    
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      {/* Image Preview */}
                      <div className="relative h-28 w-full sm:w-44 rounded-xl overflow-hidden border border-white/[0.15] bg-black/40 shrink-0 group">
                        <img
                          src={formCoverUrl}
                          alt="Cover preview"
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-[11px] font-semibold text-white bg-royal-600 px-2.5 py-1 rounded-lg shadow-sm"
                          >
                            Change
                          </button>
                        </div>
                      </div>

                      {/* Upload Controls & Presets */}
                      <div className="flex-1 space-y-2.5 w-full">
                        <div className="flex items-center gap-2">
                          <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleCoverUpload}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-royal-600/20 hover:bg-royal-600/30 text-royal-300 border border-royal-500/30 text-xs font-semibold transition"
                          >
                            <Upload className="h-3.5 w-3.5" />
                            <span>Upload Image from Device</span>
                          </button>
                        </div>

                        {/* Presets */}
                        <div>
                          <div className="text-[10px] text-slate-400 font-semibold mb-1">Or pick a curated preset:</div>
                          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                            {COVER_PRESETS.map((url, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setFormCoverUrl(url)}
                                className={`relative h-10 w-16 rounded-lg overflow-hidden border-2 shrink-0 transition ${
                                  formCoverUrl === url
                                    ? 'border-royal-500 ring-2 ring-royal-500/50'
                                    : 'border-transparent opacity-60 hover:opacity-100'
                                }`}
                              >
                                <img src={url} alt={`Preset ${idx + 1}`} className="h-full w-full object-cover" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Plan Name & Description */}
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Plan Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. VIP Inner Circle Pro"
                        className="w-full bg-black/60 border border-white/[0.12] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-royal-500 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Description *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        placeholder="Describe what members get: access to private discussions, live Q&A webinars, code reviews, and private templates..."
                        className="w-full bg-black/60 border border-white/[0.12] rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-royal-500 transition resize-none"
                      />
                    </div>
                  </div>

                  {/* 3. Price (INR) & Billing Cycle */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-black/40 border border-white/[0.08]">
                    {/* Price (INR) */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Price in INR (₹) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                          ₹
                        </span>
                        <input
                          type="number"
                          min="0"
                          required
                          value={formPrice}
                          onChange={(e) => setFormPrice(Number(e.target.value))}
                          placeholder="799"
                          className="w-full bg-black/60 border border-white/[0.12] rounded-xl pl-8 pr-3.5 py-2.5 text-xs text-white font-mono font-bold focus:outline-none focus:border-royal-500"
                        />
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Amount billed automatically per billing interval.
                      </p>
                    </div>

                    {/* Billing Cycle (Monthly / Yearly) */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Billing Cycle *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setFormBillingCycle('monthly')}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                            formBillingCycle === 'monthly'
                              ? 'bg-royal-600 text-white border-royal-500 shadow-royal'
                              : 'bg-black/60 text-slate-400 border-white/[0.1] hover:text-white'
                          }`}
                        >
                          <span>Monthly</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormBillingCycle('yearly')}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                            formBillingCycle === 'yearly'
                              ? 'bg-royal-600 text-white border-royal-500 shadow-royal'
                              : 'bg-black/60 text-slate-400 border-white/[0.1] hover:text-white'
                          }`}
                        >
                          <span>Yearly</span>
                          <span className="text-[9px] px-1 rounded bg-emerald-500/20 text-emerald-300">Save %</span>
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Select whether this tier charges monthly or yearly.
                      </p>
                    </div>
                  </div>

                  {/* 4. Access Modules Toggles (Community, Courses, Live Sessions) */}
                  <div className="space-y-2.5 p-4 rounded-xl bg-royal-600/10 border border-royal-500/30">
                    <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-royal-400" />
                      <span>Membership Access Features</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      {/* Community Access */}
                      <label className={`p-3 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition ${
                        formCommunityAccess
                          ? 'bg-royal-600/20 border-royal-500/50 text-white'
                          : 'bg-black/40 border-white/[0.08] text-slate-400'
                      }`}>
                        <div className="flex items-center gap-2">
                          <MessageSquare className={`h-4 w-4 ${formCommunityAccess ? 'text-royal-400' : 'text-slate-500'}`} />
                          <span className="text-xs font-bold">Community Access</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={formCommunityAccess}
                          onChange={(e) => setFormCommunityAccess(e.target.checked)}
                          className="rounded bg-black border-white/20 text-royal-600 focus:ring-royal-500 h-4 w-4 cursor-pointer"
                        />
                      </label>

                      {/* Courses Access */}
                      <label className={`p-3 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition ${
                        formCoursesAccess
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-white'
                          : 'bg-black/40 border-white/[0.08] text-slate-400'
                      }`}>
                        <div className="flex items-center gap-2">
                          <GraduationCap className={`h-4 w-4 ${formCoursesAccess ? 'text-emerald-400' : 'text-slate-500'}`} />
                          <span className="text-xs font-bold">Courses Access</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={formCoursesAccess}
                          onChange={(e) => setFormCoursesAccess(e.target.checked)}
                          className="rounded bg-black border-white/20 text-emerald-500 focus:ring-emerald-400 h-4 w-4 cursor-pointer"
                        />
                      </label>

                      {/* Live Sessions Access */}
                      <label className={`p-3 rounded-xl border flex items-center justify-between gap-2 cursor-pointer transition ${
                        formLiveSessionsAccess
                          ? 'bg-purple-500/20 border-purple-500/50 text-white'
                          : 'bg-black/40 border-white/[0.08] text-slate-400'
                      }`}>
                        <div className="flex items-center gap-2">
                          <Video className={`h-4 w-4 ${formLiveSessionsAccess ? 'text-purple-400' : 'text-slate-500'}`} />
                          <span className="text-xs font-bold">Live Sessions</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={formLiveSessionsAccess}
                          onChange={(e) => setFormLiveSessionsAccess(e.target.checked)}
                          className="rounded bg-black border-white/20 text-purple-500 focus:ring-purple-400 h-4 w-4 cursor-pointer"
                        />
                      </label>
                    </div>
                  </div>

                  {/* 5. Benefits List Builder (Add multiple) */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                      Benefits Checklist (Add Multiple)
                    </label>
                    
                    <div className="space-y-2">
                      {formBenefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2 bg-black/40 border border-white/[0.08] px-3.5 py-2 rounded-xl text-xs">
                          <CheckCircle2 className="h-4 w-4 text-royal-400 shrink-0" />
                          <span className="flex-1 text-slate-200">{benefit}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveBenefit(i)}
                            className="text-slate-400 hover:text-rose-400 transition p-0.5"
                            title="Remove benefit"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}

                      {/* Add Benefit Input */}
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="text"
                          value={newBenefitInput}
                          onChange={(e) => setNewBenefitInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddBenefit();
                            }
                          }}
                          placeholder="Type benefit (e.g. Private Discord Role, 1:1 Resume Roast)..."
                          className="flex-1 bg-black/60 border border-white/[0.12] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-royal-500 transition"
                        />
                        <button
                          type="button"
                          onClick={handleAddBenefit}
                          className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-xs font-bold text-white transition shrink-0"
                        >
                          + Add Benefit
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 6. Popular Toggle */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
                        <Crown className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Popular Badge</div>
                        <div className="text-[11px] text-slate-400">
                          Highlight this plan as "Most Popular" / Best Value on the public storefront
                        </div>
                      </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={formIsPopular}
                        onChange={(e) => setFormIsPopular(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                  </div>

                  {/* Form Footer Actions: Cancel & Save Plan */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08] sticky bottom-0 bg-[#0A0D17] py-2">
                    <button
                      type="button"
                      onClick={() => setIsCreateModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/[0.05] transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="rounded-xl bg-gradient-to-r from-royal-600 via-royal-500 to-royal-700 hover:brightness-110 px-6 py-2.5 text-xs font-bold text-white shadow-royal transition btn-press flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSaving ? (
                        <span>Saving...</span>
                      ) : (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Save Plan</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ==================================================================== */}
        {/* MODAL: DELETE PLAN CONFIRMATION                                      */}
        {/* ==================================================================== */}
        <AnimatePresence>
          {planToDelete && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md rounded-2xl border border-rose-500/30 bg-[#0A0D17] p-6 shadow-2xl space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <Trash2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">Delete Membership Plan</h3>
                    <p className="text-xs text-slate-400">Are you sure you want to remove this plan?</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl">
                  Deleting <strong className="text-white">"{planToDelete.name}"</strong> will remove it from your public storefront and PostgreSQL database.
                </p>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setPlanToDelete(null)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmDelete}
                    className="rounded-xl bg-rose-600 hover:bg-rose-500 px-4 py-2 text-xs font-bold text-white transition btn-press"
                  >
                    Yes, Delete Plan
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ==================================================================== */}
        {/* MODAL: MANAGE SUBSCRIBER                                             */}
        {/* ==================================================================== */}
        <AnimatePresence>
          {managingSubscriber && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-md rounded-2xl border border-white/[0.15] bg-[#0A0D17] p-6 shadow-2xl space-y-4"
              >
                <button
                  onClick={() => setManagingSubscriber(null)}
                  className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex items-center gap-3">
                  <img
                    src={managingSubscriber.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                    alt={managingSubscriber.userName}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-royal-500"
                  />
                  <div>
                    <h3 className="text-base font-bold text-white">{managingSubscriber.userName}</h3>
                    <p className="text-xs text-slate-400">{managingSubscriber.userEmail}</p>
                    <p className="text-[11px] font-mono text-slate-500">{managingSubscriber.userPhone}</p>
                  </div>
                </div>

                <div className="rounded-xl bg-black/40 border border-white/[0.08] p-3 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Current Plan:</span>
                    <span className="font-semibold text-white">{managingSubscriber.planName}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Billing:</span>
                    <span className="font-mono text-white capitalize">{managingSubscriber.billingCycle} ({formatINR(managingSubscriber.amount)})</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Renewal Date:</span>
                    <span className="font-mono text-white">{managingSubscriber.currentPeriodEnd}</span>
                  </div>
                </div>

                {/* Plan change selector */}
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Change / Upgrade Tier
                  </label>
                  <select
                    value={managingSubscriber.planId}
                    onChange={(e) => {
                      changeSubscriptionPlan(managingSubscriber.id, e.target.value, managingSubscriber.billingCycle);
                      setManagingSubscriber(null);
                    }}
                    className="w-full bg-black/60 border border-white/[0.12] rounded-xl px-3 py-2 text-xs text-white"
                  >
                    {subscriptionPlans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({formatINR(p.monthlyPrice || p.price || 0)}/mo)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        renewSubscription(managingSubscriber.id);
                        setManagingSubscriber(null);
                      }}
                      className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-semibold text-emerald-300 border border-emerald-500/30 transition flex items-center justify-center gap-1.5"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Simulate Auto-Renewal</span>
                    </button>

                    <button
                      onClick={() => {
                        cancelSubscription(managingSubscriber.id, true);
                        setManagingSubscriber(null);
                      }}
                      className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-xs font-semibold text-rose-400 border border-rose-500/20 transition"
                    >
                      Cancel Sub
                    </button>
                  </div>

                  <button
                    onClick={() => setManagingSubscriber(null)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-xs font-semibold text-white transition"
                  >
                    Done
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ==================================================================== */}
        {/* MODAL: GST INVOICE PREVIEW                                           */}
        {/* ==================================================================== */}
        {selectedInvoice && (
          <GSTInvoiceModal
            isOpen={!!selectedInvoice}
            onClose={() => setSelectedInvoice(null)}
            order={selectedInvoice}
          />
        )}

      </div>
    </PageTransition>
  );
}
