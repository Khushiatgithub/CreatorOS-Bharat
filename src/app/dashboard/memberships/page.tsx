'use client';

import React, { useState, useMemo } from 'react';
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
  ShieldCheck,
  Calendar,
  DollarSign,
  TrendingUp,
  Receipt,
  Download,
  Filter,
  Check,
  AlertCircle,
  Copy,
  ExternalLink,
  Lock,
  Unlock,
  Key,
  CreditCard,
  Building2,
  RefreshCw,
  Smartphone,
  Eye,
  SlidersHorizontal,
  ChevronRight,
  Shield,
  HelpCircle,
  Clock,
  Send,
  Flame,
  Activity
} from 'lucide-react';
import { SubscriptionPlan, Subscription, SubscriptionPayment, SubscriptionPlanType, SubscriptionBillingCycle, Order } from '@/types';
import { PageTransition, HoverCard, RippleButton, AnimatedCounter } from '@/components/ui/motion';
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
    changeSubscriptionPlan
  } = useCreatorStore();

  // Navigation tab
  const [activeTab, setActiveTab] = useState<'plans' | 'subscribers' | 'payments' | 'settings'>('plans');

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [planFilter, setPlanFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<Order | null>(null);
  const [managingSubscriber, setManagingSubscriber] = useState<Subscription | null>(null);
  const [copiedWebhook, setCopiedWebhook] = useState(false);

  // Create / Edit Form State
  const [formName, setFormName] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCoverUrl, setFormCoverUrl] = useState(COVER_PRESETS[0]);
  const [formType, setFormType] = useState<SubscriptionPlanType>('paid');
  const [formMonthlyPrice, setFormMonthlyPrice] = useState(799);
  const [formYearlyPrice, setFormYearlyPrice] = useState(7999);
  const [formBenefits, setFormBenefits] = useState<string[]>([
    'Private VIP Discord / WhatsApp Channels',
    'Bi-Weekly Live Masterclasses & Whiteboarding',
    'Direct 1:1 Resume & Code Review',
    'Curated Notion templates & Cheat Sheets'
  ]);
  const [newBenefitInput, setNewBenefitInput] = useState('');
  const [formIsPopular, setFormIsPopular] = useState(false);
  const [formIsActive, setFormIsActive] = useState(true);
  const [formBadgeText, setFormBadgeText] = useState('Most Popular');
  const [formInviteCode, setFormInviteCode] = useState('');

  // Filtered subscribers
  const filteredSubscribers = useMemo(() => {
    return subscriptions.filter((sub) => {
      if (planFilter !== 'all' && sub.planId !== planFilter) return false;
      if (statusFilter !== 'all' && sub.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          sub.userName.toLowerCase().includes(q) ||
          sub.userEmail.toLowerCase().includes(q) ||
          sub.userPhone.toLowerCase().includes(q) ||
          sub.planName.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [subscriptions, planFilter, statusFilter, searchQuery]);

  // Open Create Modal with clean fields
  const handleOpenCreateModal = () => {
    setEditingPlan(null);
    setFormName('');
    setFormSlug('');
    setFormTagline('');
    setFormDescription('');
    setFormCoverUrl(COVER_PRESETS[0]);
    setFormType('paid');
    setFormMonthlyPrice(799);
    setFormYearlyPrice(7999);
    setFormBenefits([
      'Private VIP Discord / WhatsApp Channels',
      'Bi-Weekly Live Masterclasses & Whiteboarding',
      'Direct 1:1 Resume & Code Review',
      'Curated Notion templates & Cheat Sheets'
    ]);
    setFormIsPopular(false);
    setFormIsActive(true);
    setFormBadgeText('Most Popular');
    setFormInviteCode('');
    setIsCreateModalOpen(true);
  };

  // Open Edit Modal with existing plan values
  const handleOpenEditModal = (plan: SubscriptionPlan) => {
    setEditingPlan(plan);
    setFormName(plan.name);
    setFormSlug(plan.slug);
    setFormTagline(plan.tagline);
    setFormDescription(plan.description);
    setFormCoverUrl(plan.coverUrl || COVER_PRESETS[0]);
    setFormType(plan.type);
    setFormMonthlyPrice(plan.monthlyPrice);
    setFormYearlyPrice(plan.yearlyPrice);
    setFormBenefits(plan.benefits || []);
    setFormIsPopular(Boolean(plan.isPopular));
    setFormIsActive(plan.isActive !== false);
    setFormBadgeText(plan.badgeText || 'Most Popular');
    setFormInviteCode(plan.inviteCode || '');
    setIsCreateModalOpen(true);
  };

  // Add benefit bullet
  const handleAddBenefit = () => {
    if (!newBenefitInput.trim()) return;
    setFormBenefits([...formBenefits, newBenefitInput.trim()]);
    setNewBenefitInput('');
  };

  // Remove benefit bullet
  const handleRemoveBenefit = (index: number) => {
    setFormBenefits(formBenefits.filter((_, i) => i !== index));
  };

  // Save Plan Submission
  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const slug = formSlug.trim() || formName.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingPlan) {
      updateSubscriptionPlan(editingPlan.id, {
        name: formName.trim(),
        slug,
        tagline: formTagline.trim(),
        description: formDescription.trim(),
        coverUrl: formCoverUrl,
        type: formType,
        monthlyPrice: formType === 'free' ? 0 : Number(formMonthlyPrice),
        yearlyPrice: formType === 'free' ? 0 : Number(formYearlyPrice),
        benefits: formBenefits,
        isPopular: formIsPopular,
        isActive: formIsActive,
        badgeText: formIsPopular ? formBadgeText : undefined,
        inviteCode: formType === 'invite_only' ? formInviteCode : undefined
      });
    } else {
      createSubscriptionPlan({
        name: formName.trim(),
        slug,
        tagline: formTagline.trim(),
        description: formDescription.trim(),
        coverUrl: formCoverUrl,
        type: formType,
        monthlyPrice: formType === 'free' ? 0 : Number(formMonthlyPrice),
        yearlyPrice: formType === 'free' ? 0 : Number(formYearlyPrice),
        benefits: formBenefits,
        isPopular: formIsPopular,
        isActive: formIsActive,
        badgeText: formIsPopular ? formBadgeText : undefined,
        inviteCode: formType === 'invite_only' ? formInviteCode : undefined
      });
    }

    setIsCreateModalOpen(false);
  };

  // Copy Webhook
  const handleCopyWebhook = () => {
    navigator.clipboard.writeText('https://creatoros.in/api/webhooks/razorpay');
    setCopiedWebhook(true);
    setTimeout(() => setCopiedWebhook(false), 2000);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#05070B] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* HEADER: Title, live bio-storefront link & New Plan CTA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-royal-600/20 border border-royal-500/30 flex items-center justify-center text-royal-400 shadow-glow">
                <Crown className="h-5 w-5" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                Membership Subscriptions
                <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Razorpay Subscriptions
                </span>
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Create recurring monthly & yearly tiers, auto-renew with UPI & Cards, and track MRR in real time.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href={`/${activeCreator?.username}#memberships`}
              target="_blank"
              className="flex items-center gap-1.5 rounded-xl border border-white/[0.1] bg-white/[0.04] px-3.5 py-2.5 text-xs font-semibold text-slate-200 hover:bg-white/[0.08] transition btn-press"
            >
              <span>Public Storefront</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-royal-400" />
            </Link>

            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-royal-600 to-royal-700 px-4 py-2.5 text-xs font-semibold text-white shadow-royal hover:brightness-110 transition btn-press"
            >
              <Plus className="h-4 w-4" />
              <span>Create New Plan</span>
            </button>
          </div>
        </div>

        {/* METRICS ROW: MRR, ARR, Active Subscribers, Churn & ARPU */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* MRR Card */}
          <div className="rounded-2xl border border-royal-500/30 bg-gradient-to-br from-[#0E1528] to-[#0A0D17] p-5 shadow-glass relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-royal-300">Monthly Recurring Revenue</span>
              <div className="h-8 w-8 rounded-lg bg-royal-600/20 flex items-center justify-center text-royal-400">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {formatINR(membershipMetrics.mrr)}
              </span>
              <span className="text-xs text-emerald-400 font-mono font-semibold flex items-center gap-0.5">
                +{membershipMetrics.growthPercentage}%
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Auto-billed monthly via UPI & Cards
            </p>
          </div>

          {/* ARR Card */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0E1322]/80 backdrop-blur-xl p-5 shadow-glass-subtle">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Annual Run Rate (ARR)</span>
              <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {formatINR(membershipMetrics.arr)}
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Projected 12-month recurring cash flow
            </p>
          </div>

          {/* Active Subscribers Card */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0E1322]/80 backdrop-blur-xl p-5 shadow-glass-subtle">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Active Subscribers</span>
              <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Users className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white">
                {membershipMetrics.activeSubscribers}
              </span>
              <span className="text-xs text-emerald-400 font-mono">
                +{membershipMetrics.newThisMonth} new
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Across {subscriptionPlans.length} published membership tiers
            </p>
          </div>

          {/* ARPU & Churn Card */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0E1322]/80 backdrop-blur-xl p-5 shadow-glass-subtle">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">ARPU & Retention</span>
              <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                <Activity className="h-4 w-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {formatINR(membershipMetrics.arpu)}
                <span className="text-xs text-slate-400 font-sans font-normal">/mo</span>
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {membershipMetrics.churnRate}% Churn
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              Industry-leading creator retention in Bharat
            </p>
          </div>

        </div>

        {/* NAVIGATION TABS */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'plans', label: 'Membership Plans', icon: Crown, count: subscriptionPlans.length },
            { id: 'subscribers', label: 'Active Subscribers', icon: Users, count: subscriptions.length },
            { id: 'payments', label: 'Recurring Payments & GST', icon: Receipt, count: subscriptionPayments.length },
            { id: 'settings', label: 'Razorpay Auto-Renew Config', icon: CreditCard }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                  isActive
                    ? 'bg-royal-600 text-white shadow-royal'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.05]'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${
                    isActive ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: MEMBERSHIP PLANS */}
        {activeTab === 'plans' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscriptionPlans.map((plan) => {
                const isFree = plan.type === 'free';
                const isInviteOnly = plan.type === 'invite_only';

                return (
                  <div
                    key={plan.id}
                    className={`rounded-2xl border flex flex-col justify-between overflow-hidden transition-all duration-300 relative ${
                      plan.isPopular
                        ? 'border-royal-500/50 bg-gradient-to-b from-[#0F172E] to-[#0A0D17] shadow-royal'
                        : 'border-white/[0.08] bg-[#0E1322]/80 hover:border-white/[0.15]'
                    }`}
                  >
                    {/* Cover Header */}
                    {plan.coverUrl && (
                      <div className="h-32 w-full relative overflow-hidden bg-slate-900">
                        <img
                          src={plan.coverUrl}
                          alt={plan.name}
                          className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0E1322] to-transparent" />
                        
                        <div className="absolute top-3 right-3 flex items-center gap-1.5">
                          {plan.isPopular && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-royal-600 text-white shadow-sm flex items-center gap-1">
                              <Crown className="h-3 w-3" /> {plan.badgeText || 'Popular'}
                            </span>
                          )}
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            isFree
                              ? 'bg-white/20 text-slate-200'
                              : isInviteOnly
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {plan.type.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Plan Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="text-base font-bold text-white mb-1">{plan.name}</h3>
                        <p className="text-xs text-slate-300 line-clamp-2">{plan.tagline || plan.description}</p>

                        {/* Price Display */}
                        <div className="mt-4 pt-3 border-t border-white/[0.08]">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-extrabold text-white font-mono">
                              {isFree ? 'Free' : formatINR(plan.monthlyPrice)}
                            </span>
                            {!isFree && <span className="text-xs text-slate-400 font-mono">/month</span>}
                          </div>
                          {!isFree && plan.yearlyPrice > 0 && (
                            <p className="text-[11px] text-emerald-400 font-mono mt-0.5">
                              or {formatINR(plan.yearlyPrice)}/yr (save ~{Math.round((1 - plan.yearlyPrice / (plan.monthlyPrice * 12)) * 100)}%)
                            </p>
                          )}
                        </div>

                        {/* Benefits list */}
                        <div className="mt-4 space-y-2">
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Included Perks:
                          </div>
                          {plan.benefits?.slice(0, 4).map((b, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="h-3.5 w-3.5 text-royal-400 shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{b}</span>
                            </div>
                          ))}
                          {plan.benefits?.length > 4 && (
                            <p className="text-[11px] text-royal-400 font-medium">
                              +{plan.benefits.length - 4} more benefits
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Footer Actions & Subscriber Count */}
                      <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                        <div className="text-xs text-slate-400 font-mono flex items-center gap-1">
                          <Users className="h-3.5 w-3.5 text-royal-400" />
                          <strong className="text-white">{plan.memberCount}</strong> subscribers
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEditModal(plan)}
                            className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white transition"
                            title="Edit Plan"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => deleteSubscriptionPlan(plan.id)}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition"
                            title="Delete Plan"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: ACTIVE SUBSCRIBERS ROSTER */}
        {activeTab === 'subscribers' && (
          <div className="space-y-4">
            
            {/* Search & Filter bar */}
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                <select
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                  className="bg-[#0E1322] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-royal-500"
                >
                  <option value="all">All Plans</option>
                  {subscriptionPlans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#0E1322] border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-royal-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="past_due">Past Due</option>
                </select>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, email or phone..."
                  className="w-full bg-[#0E1322] border border-white/[0.1] rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-royal-500"
                />
              </div>
            </div>

            {/* Subscribers Table */}
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
                    {filteredSubscribers.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500">
                          No subscribers found matching your search filters.
                        </td>
                      </tr>
                    ) : (
                      filteredSubscribers.map((sub) => (
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
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold capitalize ${
                              sub.status === 'active'
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
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

        {/* TAB 3: RECURRING PAYMENTS & GST INVOICES */}
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

        {/* TAB 4: RAZORPAY SUBSCRIPTION SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Webhook & API Status Box */}
            <div className="rounded-2xl border border-royal-500/30 bg-[#0E1528] p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-royal-600/20 border border-royal-500/30 flex items-center justify-center text-royal-400">
                  <Key className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Razorpay Subscriptions & Autopay Webhooks</h3>
                  <p className="text-xs text-slate-400">Real-time webhook listener for recurring subscription charges & cancellations</p>
                </div>
              </div>

              <div className="pt-2 space-y-3 text-xs">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Your Webhook Endpoint URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value="https://creatoros.in/api/webhooks/razorpay"
                      className="flex-1 bg-black/60 border border-white/[0.12] rounded-xl px-3.5 py-2.5 text-xs text-royal-300 font-mono"
                    />
                    <button
                      onClick={handleCopyWebhook}
                      className="px-4 py-2.5 rounded-xl bg-royal-600 hover:bg-royal-500 text-xs font-semibold text-white transition flex items-center gap-1.5 shrink-0"
                    >
                      {copiedWebhook ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedWebhook ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
                    <h4 className="font-semibold text-white text-xs flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-amber-400" />
                      Instant UPI Autopay
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Subscribers can authorize recurring debits via PhonePe, Google Pay, Paytm UPI Autopay mandates.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
                    <h4 className="font-semibold text-white text-xs flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                      Automated GST Tax Invoices
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      B2C and B2B GST tax invoices are automatically generated and emailed to subscribers upon each renewal.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payout Details */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0E1322] p-6 space-y-3">
              <h3 className="text-sm font-bold text-white">Bank Settlement Destination</h3>
              <p className="text-xs text-slate-400">
                Subscription payouts are cleared every morning directly to your verified Indian bank account:
              </p>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.08] flex items-center justify-between">
                <div>
                  <div className="font-semibold text-xs text-white">{activeCreator?.bankAccount.bankName}</div>
                  <div className="text-[11px] font-mono text-slate-400">{activeCreator?.bankAccount.accountNumberMasked} • {activeCreator?.bankAccount.ifsc}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <Check className="h-3 w-3" /> IMPS Active
                </span>
              </div>
            </div>

          </div>
        )}

        {/* MODAL: CREATE / EDIT MEMBERSHIP PLAN */}
        <AnimatePresence>
          {isCreateModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-full max-w-2xl rounded-2xl border border-white/[0.15] bg-[#0A0D17] p-6 shadow-2xl space-y-5 my-8"
              >
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-royal-600/20 text-royal-400 flex items-center justify-center">
                      <Crown className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {editingPlan ? 'Edit Membership Plan' : 'Create New Membership Plan'}
                      </h3>
                      <p className="text-xs text-slate-400">Configure recurring billing, price, and perks</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <form onSubmit={handleSavePlan} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Plan Name *</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. VIP Inner Circle Pro"
                        className="w-full bg-black/50 border border-white/[0.12] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-royal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Plan Type *</label>
                      <select
                        value={formType}
                        onChange={(e) => setFormType(e.target.value as any)}
                        className="w-full bg-black/50 border border-white/[0.12] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-royal-500"
                      >
                        <option value="paid">Paid Recurring Subscription</option>
                        <option value="free">Free Forever Community</option>
                        <option value="invite_only">Invite Only / Premium Guild</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Short Tagline *</label>
                    <input
                      type="text"
                      required
                      value={formTagline}
                      onChange={(e) => setFormTagline(e.target.value)}
                      placeholder="e.g. Fast-track your FAANG & tier-1 product startup placements"
                      className="w-full bg-black/50 border border-white/[0.12] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-royal-500"
                    />
                  </div>

                  {/* Pricing Section (if not free) */}
                  {formType !== 'free' && (
                    <div className="rounded-xl border border-royal-500/30 bg-royal-600/10 p-4 space-y-3">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <DollarSign className="h-3.5 w-3.5 text-royal-400" />
                        Pricing (₹ INR)
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                            Monthly Price (₹)
                          </label>
                          <input
                            type="number"
                            min="99"
                            required
                            value={formMonthlyPrice}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setFormMonthlyPrice(val);
                              // Auto calculate yearly with 2 months free discount
                              setFormYearlyPrice(val * 10);
                            }}
                            className="w-full bg-black/60 border border-white/[0.12] rounded-xl px-3 py-2 text-xs text-white font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                            Yearly Price (₹ - Discounted)
                          </label>
                          <input
                            type="number"
                            min="499"
                            required
                            value={formYearlyPrice}
                            onChange={(e) => setFormYearlyPrice(Number(e.target.value))}
                            className="w-full bg-black/60 border border-white/[0.12] rounded-xl px-3 py-2 text-xs text-white font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cover Image Preset Picker */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Cover Image</label>
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                      {COVER_PRESETS.map((url, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setFormCoverUrl(url)}
                          className={`relative h-14 w-24 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                            formCoverUrl === url ? 'border-royal-500 ring-2 ring-royal-500/50' : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={url} alt="preset" className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Benefits List Builder */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Benefits Checklist</label>
                    <div className="space-y-2">
                      {formBenefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2 bg-black/40 border border-white/[0.08] px-3 py-1.5 rounded-xl text-xs">
                          <CheckCircle2 className="h-3.5 w-3.5 text-royal-400 shrink-0" />
                          <span className="flex-1 text-slate-200">{benefit}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveBenefit(i)}
                            className="text-slate-400 hover:text-rose-400"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}

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
                          placeholder="Add new perk (e.g. 1:1 Resume Roast)..."
                          className="flex-1 bg-black/50 border border-white/[0.1] rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-royal-500"
                        />
                        <button
                          type="button"
                          onClick={handleAddBenefit}
                          className="px-3.5 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-xs font-semibold text-white transition"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Popular Toggle */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="popularCheck"
                      checked={formIsPopular}
                      onChange={(e) => setFormIsPopular(e.target.checked)}
                      className="rounded bg-black border-white/20 text-royal-600 focus:ring-royal-500 cursor-pointer"
                    />
                    <label htmlFor="popularCheck" className="text-xs text-slate-300 font-medium cursor-pointer">
                      Highlight as "Most Popular" / Best Value on storefront
                    </label>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
                    <button
                      type="button"
                      onClick={() => setIsCreateModalOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-xl bg-gradient-to-r from-royal-600 to-royal-700 hover:brightness-110 px-5 py-2.5 text-xs font-bold text-white shadow-royal transition btn-press"
                    >
                      {editingPlan ? 'Save Plan Changes' : 'Publish Plan'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* MODAL: MANAGE SUBSCRIBER */}
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
                  <div className="flex justify-between text-slate-300">
                    <span className="text-slate-400">Subscription ID:</span>
                    <span className="font-mono text-royal-400 text-[10px]">{managingSubscriber.razorpaySubscriptionId || 'sub_local'}</span>
                  </div>
                </div>

                {/* Plan change selector */}
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1">
                    Upgrade / Switch Tier
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
                        {p.name} ({formatINR(p.monthlyPrice)}/mo)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <button
                    onClick={() => {
                      cancelSubscription(managingSubscriber.id, true);
                      setManagingSubscriber(null);
                    }}
                    className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-xs font-semibold text-rose-400 transition"
                  >
                    Cancel Subscription
                  </button>

                  <button
                    onClick={() => setManagingSubscriber(null)}
                    className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-xs font-semibold text-white transition"
                  >
                    Done
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* GST INVOICE VIEW MODAL */}
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
