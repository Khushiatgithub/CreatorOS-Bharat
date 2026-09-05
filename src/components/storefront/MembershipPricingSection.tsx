'use client';

import React, { useState } from 'react';
import { useCreatorStore } from '@/lib/store';
import { formatINR } from '@/lib/gst';
import {
  Crown,
  Sparkles,
  CheckCircle2,
  Zap,
  ArrowRight,
  ShieldCheck,
  Check,
  X,
  Lock,
  PhoneCall,
  Flame,
  HelpCircle,
  Clock
} from 'lucide-react';
import { Creator, StoreTheme, SubscriptionPlan, SubscriptionBillingCycle } from '@/types';
import UPICheckoutModal from '@/components/checkout/UPICheckoutModal';
import { motion, AnimatePresence } from 'framer-motion';

interface MembershipPricingSectionProps {
  creator: Creator;
  theme?: StoreTheme;
  standalone?: boolean;
}

export default function MembershipPricingSection({
  creator,
  theme,
  standalone = false
}: MembershipPricingSectionProps) {
  const {
    subscriptionPlans,
    subscribeToPlan
  } = useCreatorStore();

  const [billingCycle, setBillingCycle] = useState<SubscriptionBillingCycle>('monthly');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<SubscriptionPlan | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [inviteCodeInput, setInviteCodeInput] = useState('');
  const [inviteError, setInviteError] = useState('');
  const [showInviteModal, setShowInviteModal] = useState<SubscriptionPlan | null>(null);

  // Plans for this creator
  const plans = subscriptionPlans.filter((p) => p.creatorId === creator.id && p.isActive !== false);

  // Handle Subscribe Click
  const handleSubscribeClick = (plan: SubscriptionPlan) => {
    if (plan.type === 'invite_only') {
      setShowInviteModal(plan);
      setInviteError('');
      setInviteCodeInput('');
      return;
    }

    if (plan.type === 'free') {
      // Instant free join
      subscribeToPlan({
        planId: plan.id,
        billingCycle: 'monthly',
        subscriberName: 'Guest Member',
        subscriberEmail: 'guest@creatoros.in'
      });
      alert(`🎉 Welcome! You have successfully joined the ${plan.name} community.`);
      return;
    }

    setSelectedPlanForCheckout(plan);
    setIsCheckoutOpen(true);
  };

  // Handle Invite Code Verification
  const handleVerifyInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showInviteModal) return;

    if (showInviteModal.inviteCode && inviteCodeInput.trim().toUpperCase() !== showInviteModal.inviteCode.toUpperCase()) {
      setInviteError('Invalid invite pass code. Please contact the creator.');
      return;
    }

    const targetPlan = showInviteModal;
    setShowInviteModal(null);
    setSelectedPlanForCheckout(targetPlan);
    setIsCheckoutOpen(true);
  };

  return (
    <section className={`w-full ${standalone ? 'py-8' : 'py-12'} space-y-8`}>
      
      {/* SECTION HEADER & BILLING TOGGLE */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-royal-600/15 text-royal-400 border border-royal-500/30">
          <Crown className="h-3.5 w-3.5" />
          <span>Membership Subscriptions</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Join {creator.name}'s Inner Circle
        </h2>

        <p className="text-xs sm:text-sm text-slate-400">
          Unlock exclusive masterclasses, private discussion channels, 1:1 resume teardowns, and direct mentorship.
        </p>

        {/* Monthly vs Yearly Toggle Switch */}
        <div className="inline-flex items-center p-1 rounded-2xl bg-[#0E1322] border border-white/[0.1] shadow-inner mt-2">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
              billingCycle === 'monthly'
                ? 'bg-royal-600 text-white shadow-royal'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly Billing
          </button>

          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
              billingCycle === 'yearly'
                ? 'bg-royal-600 text-white shadow-royal'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Yearly Billing</span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* PRICING CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
        {plans.map((plan) => {
          const isFree = plan.type === 'free';
          const isInviteOnly = plan.type === 'invite_only';
          const price = isFree ? 0 : billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;

          return (
            <div
              key={plan.id}
              className={`rounded-3xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.isPopular
                  ? 'border-royal-500/60 bg-gradient-to-b from-[#101B38] via-[#0D152B] to-[#080D1A] shadow-[0_0_40px_rgba(37,99,235,0.25)] ring-1 ring-royal-500/40 transform md:-translate-y-2'
                  : 'border-white/[0.1] bg-[#0E1322]/90 hover:border-white/[0.2] shadow-xl'
              }`}
            >
              {/* Popular / Badge */}
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-royal-600 to-royal-500 text-white shadow-royal flex items-center gap-1">
                  <Crown className="h-3 w-3" /> {plan.badgeText || 'Most Popular'}
                </div>
              )}

              <div>
                {/* Plan Title & Tagline */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg sm:text-xl font-bold text-white">{plan.name}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    isFree
                      ? 'bg-white/10 text-slate-300'
                      : isInviteOnly
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {plan.type.replace('_', ' ')}
                  </span>
                </div>

                <p className="text-xs text-slate-300 min-h-[36px]">{plan.tagline || plan.description}</p>

                {/* Price Display */}
                <div className="mt-5 pb-5 border-b border-white/[0.08]">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                      {isFree ? 'Free' : formatINR(price)}
                    </span>
                    {!isFree && (
                      <span className="text-xs text-slate-400 font-mono">
                        /{billingCycle === 'yearly' ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  {!isFree && billingCycle === 'yearly' && plan.monthlyPrice > 0 && (
                    <p className="text-[11px] text-emerald-400 font-mono mt-1">
                      Equivalent to {formatINR(Math.round(plan.yearlyPrice / 12))}/month
                    </p>
                  )}
                </div>

                {/* Benefits List */}
                <div className="mt-5 space-y-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    What's included:
                  </div>
                  {plan.benefits?.map((b, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className={`h-4 w-4 shrink-0 mt-0.5 ${plan.isPopular ? 'text-royal-400' : 'text-emerald-400'}`} />
                      <span className="leading-relaxed">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-white/[0.08]">
                <button
                  onClick={() => handleSubscribeClick(plan)}
                  className={`w-full py-3.5 rounded-2xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg btn-press ${
                    plan.isPopular
                      ? 'bg-gradient-to-r from-royal-600 to-royal-700 hover:brightness-110 text-white shadow-royal'
                      : isInviteOnly
                      ? 'bg-amber-500 hover:bg-amber-400 text-black font-bold'
                      : 'bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/[0.12]'
                  }`}
                >
                  {isFree ? (
                    <span>Join Free Community</span>
                  ) : isInviteOnly ? (
                    <>
                      <Lock className="h-3.5 w-3.5" />
                      <span>Enter Invite Code</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 fill-white" />
                      <span>Subscribe with UPI / Razorpay</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* FEATURE COMPARISON MATRIX TABLE */}
      <div className="max-w-5xl mx-auto rounded-3xl border border-white/[0.08] bg-[#0A0E1A]/80 backdrop-blur-xl p-6 sm:p-8 mt-12 shadow-2xl">
        <div className="text-center mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-white">Compare Membership Features</h3>
          <p className="text-xs text-slate-400 mt-1">Detailed breakdown of all tier privileges</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-white/[0.08] text-[11px] uppercase tracking-wider text-slate-400">
              <tr>
                <th className="py-3 px-4">Feature & Privilege</th>
                <th className="py-3 px-4 text-center">Free Community</th>
                <th className="py-3 px-4 text-center text-royal-400 font-bold">VIP Inner Circle Pro</th>
                <th className="py-3 px-4 text-center text-amber-400 font-bold">Founder's Elite</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-slate-300">
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Public Community Discussions</td>
                <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">✓</td>
                <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">✓</td>
                <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">✓</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Private VIP Channels & Discord</td>
                <td className="py-3.5 px-4 text-center text-slate-600">—</td>
                <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">✓</td>
                <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">✓</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">1:1 Tech Resume & LinkedIn Roast</td>
                <td className="py-3.5 px-4 text-center text-slate-600">—</td>
                <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">✓ (Monthly)</td>
                <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">✓ (Unlimited)</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Direct Employee Referral Routing</td>
                <td className="py-3.5 px-4 text-center text-slate-600">—</td>
                <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">✓</td>
                <td className="py-3.5 px-4 text-center text-emerald-400 font-bold">✓</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">Direct WhatsApp DM with Creator</td>
                <td className="py-3.5 px-4 text-center text-slate-600">—</td>
                <td className="py-3.5 px-4 text-center text-slate-600">—</td>
                <td className="py-3.5 px-4 text-center text-amber-400 font-bold">✓ Direct Access</td>
              </tr>
              <tr>
                <td className="py-3.5 px-4 font-medium text-white">1:1 Monthly Strategy Call (45m)</td>
                <td className="py-3.5 px-4 text-center text-slate-600">—</td>
                <td className="py-3.5 px-4 text-center text-slate-600">—</td>
                <td className="py-3.5 px-4 text-center text-amber-400 font-bold">✓ Included</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: INVITE CODE PROMPT */}
      <AnimatePresence>
        {showInviteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-2xl border border-amber-500/40 bg-[#0A0D17] p-6 shadow-2xl space-y-4"
            >
              <button
                onClick={() => setShowInviteModal(null)}
                className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Invite-Only Guild Pass</h3>
                  <p className="text-xs text-slate-400">{showInviteModal.name}</p>
                </div>
              </div>

              <form onSubmit={handleVerifyInvite} className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Enter Invitation Passcode
                  </label>
                  <input
                    type="text"
                    required
                    value={inviteCodeInput}
                    onChange={(e) => {
                      setInviteCodeInput(e.target.value);
                      setInviteError('');
                    }}
                    placeholder="e.g. BHARAT_ELITE_2026"
                    className="w-full bg-black/60 border border-white/[0.12] rounded-xl px-3.5 py-2.5 text-xs text-white font-mono placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                  {inviteError && (
                    <p className="text-xs text-rose-400 mt-1">{inviteError}</p>
                  )}
                  <p className="text-[11px] text-slate-400 mt-1">
                    Demo Code: <span className="font-mono text-amber-300">BHARAT_ELITE_2026</span>
                  </p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(null)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs transition"
                  >
                    Verify Passcode
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CHECKOUT MODAL: RAZORPAY / UPI SUBSCRIPTION CHECKOUT */}
      {selectedPlanForCheckout && (
        <UPICheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => {
            setIsCheckoutOpen(false);
            // Subscribe subscriber locally and save payment
            subscribeToPlan({
              planId: selectedPlanForCheckout.id,
              billingCycle,
              subscriberName: 'Rohit Sharma',
              subscriberEmail: 'rohit.sharma@gmail.com',
              subscriberPhone: '+91 98111 22334',
              paymentMethod: 'Razorpay Autopay'
            });
          }}
          item={{
            id: selectedPlanForCheckout.id,
            title: `${creator.name} - ${selectedPlanForCheckout.name} (${billingCycle})`,
            price: billingCycle === 'yearly' ? selectedPlanForCheckout.yearlyPrice : selectedPlanForCheckout.monthlyPrice,
            type: 'course'
          }}
        />
      )}

    </section>
  );
}
