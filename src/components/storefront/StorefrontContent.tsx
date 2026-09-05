'use client';

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Youtube, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Send, 
  Download, 
  Sparkles, 
  Star, 
  Clock, 
  Calendar, 
  Users, 
  Zap, 
  Coffee, 
  CheckCircle, 
  ArrowRight, 
  FileText, 
  Video, 
  BookOpen, 
  ExternalLink,
  ArrowUpRight,
  MessageSquare,
  Award,
  Check,
  CheckCircle2,
  Share2,
  PhoneCall,
  Lock,
  ThumbsUp,
  Flame,
  Globe,
  Radio,
  X,
  AlertCircle
} from 'lucide-react';
import { Creator, StoreTheme, DigitalProduct, Course, BookingService, ProductType } from '@/types';
import UPICheckoutModal from '@/components/checkout/UPICheckoutModal';
import MembershipPricingSection from '@/components/storefront/MembershipPricingSection';
import { AnimatedCounter, RippleButton, HoverCard } from '@/components/ui/motion';
import { motion, AnimatePresence } from 'framer-motion';
import { useCreatorStore } from '@/lib/store';

interface StorefrontContentProps {
  creator: Creator;
  theme: StoreTheme;
  products: DigitalProduct[];
  courses: Course[];
  bookingServices: BookingService[];
  isMobilePreview?: boolean;
}

interface StudentReview {
  id: string;
  name: string;
  avatar: string;
  role: string;
  companyBadge?: string;
  rating: number;
  date: string;
  comment: string;
  productPurchased: string;
  verifiedPurchase: boolean;
}

const SAMPLE_REVIEWS: StudentReview[] = [
  {
    id: 'rev_1',
    name: 'Rahul Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
    role: 'Software Engineer',
    companyBadge: 'Placed @ Microsoft (L61)',
    rating: 5,
    date: '2 days ago',
    comment: 'The System Design Playbook and 1:1 mock interview with Aarav directly helped me crack Microsoft. The HLD Swiggy real-time delivery architecture question was asked almost verbatim!',
    productPurchased: 'FAANG SDE Mock Interview & System Design Playbook',
    verifiedPurchase: true
  },
  {
    id: 'rev_2',
    name: 'Ananya Iyer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    role: 'Product Designer',
    companyBadge: 'Joined Swiggy Design',
    rating: 5,
    date: '1 week ago',
    comment: 'The 1:1 portfolio roast and resume restructuring transformed my case studies. Within 3 weeks I had interview calls from 4 top product startups across Bangalore.',
    productPurchased: '1:1 Tech Resume Roast & Strategy Call',
    verifiedPurchase: true
  },
  {
    id: 'rev_3',
    name: 'Vikram Singh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    role: 'Backend SDE',
    companyBadge: 'Cracked Amazon SDE-2',
    rating: 5,
    date: '2 weeks ago',
    comment: 'The 18 LeetCode patterns and DP/Graph visual intuition notes in the DSA Master Sheet are gold. Saved me 3 months of aimless problem solving.',
    productPurchased: 'Ultimate FAANG SDE & DSA Master Sheet 2025',
    verifiedPurchase: true
  },
  {
    id: 'rev_4',
    name: 'Sneha Patel',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    role: 'Full Stack Dev',
    companyBadge: 'Joined Atlassian',
    rating: 5,
    date: '3 weeks ago',
    comment: '1-click UPI checkout with instant WhatsApp delivery made downloading and studying so seamless. The Overleaf LaTeX templates got past automated ATS screens with 98% score.',
    productPurchased: 'ATS-Proof Tech Resume & Cover Letter Pack',
    verifiedPurchase: true
  }
];

export default function StorefrontContent({
  creator,
  theme,
  products,
  courses,
  bookingServices,
  isMobilePreview = false
}: StorefrontContentProps) {
  const { isSlotBooked, isDateBlocked, calendarTimezone } = useCreatorStore();
  const [activeTab, setActiveTab] = useState<'all' | 'memberships' | 'sessions' | 'courses' | 'products' | 'communities' | 'reviews'>('all');
  
  // Checkout modal
  const [selectedItemForCheckout, setSelectedItemForCheckout] = useState<{
    id: string;
    title: string;
    price: number;
    type: ProductType;
    category?: string;
    downloadUrl?: string;
  } | null>(null);

  // Booking slot selection state
  const [bookingModalService, setBookingModalService] = useState<BookingService | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState<string>('07:00 PM');

  // Lead capture
  const [leadPhone, setLeadPhone] = useState<string>('');
  const [leadJoined, setLeadJoined] = useState<boolean>(false);

  // Reviews state
  const [reviewsList, setReviewsList] = useState<StudentReview[]>(SAMPLE_REVIEWS);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRole, setNewReviewRole] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);

  const handleOpenBookingSlot = (service: BookingService) => {
    setBookingModalService(service);
    const availableSlots = service.timeSlots.filter((s) => !isSlotBooked(selectedDate, s, creator.id));
    const firstAvailable = availableSlots[0] || service.timeSlots[0] || '07:00 PM';
    setSelectedSlot(firstAvailable);
  };

  // Sync selectedSlot when date or modal changes
  useEffect(() => {
    if (bookingModalService) {
      const openSlots = bookingModalService.timeSlots.filter((s) => !isSlotBooked(selectedDate, s, creator.id));
      if (openSlots.length > 0 && !openSlots.includes(selectedSlot)) {
        setSelectedSlot(openSlots[0]);
      }
    }
  }, [selectedDate, bookingModalService, isSlotBooked]);

  const handleProceedBookingToCheckout = () => {
    if (!bookingModalService) return;
    setSelectedItemForCheckout({
      id: bookingModalService.id,
      title: `${bookingModalService.title} (${selectedDate} @ ${selectedSlot})`,
      price: bookingModalService.price,
      type: 'booking'
    });
    setBookingModalService(null);
  };

  const handleTipChai = (amount: number) => {
    setSelectedItemForCheckout({
      id: `tip_${Date.now()}`,
      title: `Chai & Appreciation for ${creator.name}`,
      price: amount,
      type: 'tip'
    });
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const review: StudentReview = {
      id: `rev_${Date.now()}`,
      name: newReviewName.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      role: newReviewRole.trim() || 'Verified Student',
      companyBadge: 'Verified Purchase',
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment.trim(),
      productPurchased: 'Mentorship & Digital Notes',
      verifiedPurchase: true
    };

    setReviewsList((prev) => [review, ...prev]);
    setShowAddReviewModal(false);
    setNewReviewName('');
    setNewReviewRole('');
    setNewReviewComment('');
  };

  // Calculate stats
  const totalFollowersReach = '377K+';
  const totalReviewsCount = 1240 + reviewsList.length - SAMPLE_REVIEWS.length;
  const averageRating = 4.95;

  return (
    <div className={`w-full min-h-screen bg-gradient-to-b ${theme.bgGradient} ${theme.textPrimary} transition-colors duration-500 font-sans`}>
      
      {/* Container sizing based on preview mode vs full public page */}
      <div className={`mx-auto ${isMobilePreview ? 'w-full px-3 py-4' : 'max-w-3xl px-4 py-8 sm:py-12'}`}>

        {/* ========================================================================= */}
        {/* 1. HERO PROFILE SECTION */}
        {/* ========================================================================= */}
        <div className="relative mb-8 text-center">
          
          {/* Cover Banner with glass overlay */}
          {creator.bannerUrl ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative h-32 sm:h-44 w-full overflow-hidden rounded-[24px] mb-14 shadow-glass-subtle border border-white/[0.08]"
            >
              <img src={creator.bannerUrl} alt="Banner" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070B] via-black/40 to-transparent" />
            </motion.div>
          ) : (
            <div className="h-16" />
          )}

          {/* Expert Avatar with glowing ring & verified status */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className={`relative inline-block ${creator.bannerUrl ? '-mt-24 sm:-mt-28' : 'mt-2'} mb-3`}
          >
            <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full p-1.5 bg-gradient-to-tr from-royal-600 via-blue-500 to-indigo-400 shadow-royal">
              <img
                src={creator.avatarUrl}
                alt={creator.name}
                className="h-full w-full rounded-full object-cover bg-[#090C16] ring-4 ring-[#05070B]"
              />
            </div>
            {creator.verified && (
              <div 
                className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 rounded-full bg-royal-600 p-1.5 text-white ring-4 ring-[#05070B] shadow-md flex items-center justify-center"
                title="Verified Expert & Creator"
              >
                <ShieldCheck className="h-4 w-4" />
              </div>
            )}
          </motion.div>

          {/* Name & Verified Badge */}
          <div className="flex items-center justify-center gap-2">
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {creator.name}
            </h1>
            <span className="rounded-full bg-royal-600/20 text-royal-300 border border-royal-500/30 text-[10px] font-bold px-2.5 py-0.5 font-mono flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3 text-royal-400" />
              <span>Verified Expert</span>
            </span>
          </div>

          {/* Tagline & Bio */}
          <p className="text-xs sm:text-sm font-semibold text-royal-400 mt-1 max-w-xl mx-auto leading-relaxed">
            {creator.tagline}
          </p>

          <p className="text-xs sm:text-sm text-slate-300/90 mt-2 max-w-xl mx-auto leading-relaxed">
            {creator.bio}
          </p>

          {/* Location & Category Pill */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5 text-royal-400" />
              <span>{creator.location}</span>
            </span>
            <span>•</span>
            <span className="rounded-full bg-white/[0.05] px-2.5 py-0.5 border border-white/[0.08] text-slate-300 font-medium">
              {creator.category}
            </span>
          </div>

          {/* KEY METRICS STRIP: Followers, Rating, Mentored */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 max-w-lg mx-auto mt-4 p-3 rounded-[20px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl shadow-glass-subtle text-center">
            
            <div className="p-1">
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium block">Total Reach</span>
              <div className="font-display text-base sm:text-lg font-extrabold text-white font-mono mt-0.5">
                {totalFollowersReach}
              </div>
              <span className="text-[9px] text-slate-500 font-mono">YT • IG • LinkedIn</span>
            </div>

            <div className="p-1 border-x border-white/[0.06]">
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium block">Rating & Trust</span>
              <div className="font-display text-base sm:text-lg font-extrabold text-amber-400 font-mono mt-0.5 flex items-center justify-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span>{averageRating}</span>
              </div>
              <span className="text-[9px] text-slate-500 font-mono">{totalReviewsCount}+ Reviews</span>
            </div>

            <div className="p-1">
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium block">Response Time</span>
              <div className="font-display text-base sm:text-lg font-extrabold text-emerald-400 font-mono mt-0.5">
                &lt;15 Mins
              </div>
              <span className="text-[9px] text-emerald-400/80 font-mono">Instant WhatsApp</span>
            </div>

          </div>

          {/* PRIMARY HERO CALLS TO ACTION */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
            {bookingServices.length > 0 && (
              <RippleButton
                onClick={() => {
                  const firstService = bookingServices[0];
                  if (firstService) handleOpenBookingSlot(firstService);
                }}
                className="rounded-[16px] bg-gradient-to-r from-royal-600 via-royal-500 to-indigo-600 hover:brightness-110 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-royal flex items-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                <span>Book 1:1 Session (₹{bookingServices[0]?.price})</span>
              </RippleButton>
            )}

            <button
              onClick={() => {
                const el = document.getElementById('offerings-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-[16px] bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] px-5 py-3 text-xs sm:text-sm font-semibold text-white transition flex items-center gap-2 btn-press"
            >
              <span>Explore Products & Notes</span>
              <ArrowRight className="h-4 w-4 text-royal-400" />
            </button>
          </div>

          {/* Social Icons Row */}
          <div className="flex items-center justify-center gap-2.5 mt-5">
            {creator.socials.youtube && (
              <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }} href={creator.socials.youtube} target="_blank" rel="noreferrer" className="p-2.5 rounded-[14px] bg-white/[0.04] hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-white/[0.08] transition shadow-sm">
                <Youtube className="h-4 w-4" />
              </motion.a>
            )}
            {creator.socials.instagram && (
              <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }} href={creator.socials.instagram} target="_blank" rel="noreferrer" className="p-2.5 rounded-[14px] bg-white/[0.04] hover:bg-pink-500/20 text-slate-400 hover:text-pink-400 border border-white/[0.08] transition shadow-sm">
                <Instagram className="h-4 w-4" />
              </motion.a>
            )}
            {creator.socials.linkedin && (
              <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }} href={creator.socials.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-[14px] bg-white/[0.04] hover:bg-royal-600/20 text-slate-400 hover:text-royal-400 border border-white/[0.08] transition shadow-sm">
                <Linkedin className="h-4 w-4" />
              </motion.a>
            )}
            {creator.socials.twitter && (
              <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }} href={creator.socials.twitter} target="_blank" rel="noreferrer" className="p-2.5 rounded-[14px] bg-white/[0.04] hover:bg-sky-500/20 text-slate-400 hover:text-sky-400 border border-white/[0.08] transition shadow-sm">
                <Twitter className="h-4 w-4" />
              </motion.a>
            )}
            {creator.socials.telegram && (
              <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }} href={creator.socials.telegram} target="_blank" rel="noreferrer" className="p-2.5 rounded-[14px] bg-white/[0.04] hover:bg-blue-400/20 text-slate-400 hover:text-blue-400 border border-white/[0.08] transition shadow-sm">
                <Send className="h-4 w-4" />
              </motion.a>
            )}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. CUSTOM HIGHLIGHTED BIO-LINKS */}
        {/* ========================================================================= */}
        {creator.customLinks && creator.customLinks.length > 0 && (
          <div className="space-y-2.5 mb-8">
            {creator.customLinks.map((link) => (
              <HoverCard hoverY={-3} key={link.id}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full flex items-center justify-between p-4 rounded-[20px] text-xs sm:text-sm font-semibold transition ${
                    link.highlight
                      ? 'bg-gradient-to-r from-royal-600 to-royal-700 text-white shadow-royal hover:brightness-110'
                      : `${theme.cardBg} ${theme.textPrimary} hover:border-royal-500/40 hover:bg-white/[0.08]`
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4 shrink-0 text-royal-300" />
                    <span className="line-clamp-1">{link.title}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 opacity-80" />
                </a>
              </HoverCard>
            ))}
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. NAVIGATION TAB BAR */}
        {/* ========================================================================= */}
        <div id="offerings-section" className="scroll-mt-16 flex items-center gap-1.5 p-1 rounded-[20px] bg-white/[0.04] border border-white/[0.08] mb-8 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: `All Offerings (${products.length + courses.length + bookingServices.length})` },
            { id: 'memberships', label: 'VIP Memberships' },
            { id: 'sessions', label: `1:1 Sessions (${bookingServices.length})` },
            { id: 'courses', label: `Courses (${courses.length})` },
            { id: 'products', label: `Digital Notes (${products.length})` },
            { id: 'communities', label: 'Free Community' },
            { id: 'reviews', label: `Reviews (${reviewsList.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-[14px] text-xs font-semibold whitespace-nowrap transition relative ${
                activeTab === tab.id
                  ? 'bg-royal-600 text-white shadow-royal-sm ring-1 ring-royal-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* VIP MEMBERSHIP SUBSCRIPTION TIERS */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
          {(activeTab === 'all' || activeTab === 'memberships') && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="mb-12"
            >
              <MembershipPricingSection creator={creator} theme={theme} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 4. AVAILABLE SESSIONS & BOOK NOW CTA */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
          {(activeTab === 'all' || activeTab === 'sessions') && bookingServices.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-4 mb-10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-royal-400 flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    <span>Available 1:1 Sessions & Mentorship</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">Live video consultations on Google Meet with guaranteed actionable feedback.</p>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  Instant Google Meet Sync
                </span>
              </div>

              <div className="space-y-3.5">
                {bookingServices.map((service) => (
                  <HoverCard hoverY={-3} key={service.id}>
                    <div className={`rounded-[22px] ${theme.cardBg} p-5 sm:p-6 transition border border-white/[0.08] hover:border-royal-500/40 shadow-glass-card`}>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-md bg-royal-600/20 text-royal-300 border border-royal-500/30 px-2.5 py-0.5 text-[10px] font-semibold">
                              {service.sessionType}
                            </span>
                            <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                              <Clock className="h-3.5 w-3.5 text-royal-400" /> {service.durationMinutes} mins
                            </span>
                            <span className="rounded-md bg-emerald-500/10 text-emerald-400 px-2 py-0.5 text-[10px] font-mono">
                              {service.platform}
                            </span>
                          </div>

                          <h3 className="font-display text-base sm:text-lg font-bold text-white">
                            {service.title}
                          </h3>
                          
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                            {service.description}
                          </p>

                          <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                            <span className="text-emerald-400 flex items-center gap-1 font-mono">
                              <CheckCircle className="h-3.5 w-3.5" />
                              <span>{service.bookingsCompleted}+ Completed</span>
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-amber-400 font-bold">
                              <Star className="h-3.5 w-3.5 fill-amber-400" />
                              <span>{service.rating} Rating</span>
                            </span>
                          </div>
                        </div>

                        <div className="text-left sm:text-right shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
                          <div className="font-display text-xl sm:text-2xl font-extrabold text-white">
                            ₹{service.price}
                          </div>
                          <p className="text-[11px] text-slate-400 font-mono">All taxes included</p>
                        </div>
                      </div>

                      {/* BOOK NOW CTA ROW */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-5 pt-4 border-t border-white/[0.08]">
                        <div className="text-xs text-slate-400 flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Next Slot: <strong>Tomorrow 07:00 PM IST</strong></span>
                        </div>

                        <RippleButton
                          onClick={() => handleOpenBookingSlot(service)}
                          className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-5 py-2.5 text-xs font-bold text-white shadow-royal flex items-center justify-center gap-2"
                        >
                          <Calendar className="h-4 w-4" />
                          <span>Book Now (₹{service.price})</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </RippleButton>
                      </div>

                    </div>
                  </HoverCard>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 5. VIDEO COURSES & COHORTS */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
          {(activeTab === 'all' || activeTab === 'courses') && courses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-4 mb-10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-royal-400 flex items-center gap-1.5">
                    <Video className="h-4 w-4" />
                    <span>Structured Video Courses & Cohorts</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">Comprehensive roadmaps with on-demand HD lessons, live Q&A, and certification.</p>
                </div>
                <span className="text-[10px] text-royal-300 font-mono bg-royal-600/15 px-2.5 py-1 rounded-full border border-royal-500/30">
                  LMS & Discord Included
                </span>
              </div>

              <div className="space-y-4">
                {courses.map((course) => (
                  <HoverCard hoverY={-3} key={course.id}>
                    <div className={`rounded-[22px] ${theme.cardBg} p-5 sm:p-6 transition border border-white/[0.08] hover:border-royal-500/40 shadow-glass-card space-y-4`}>
                      <div className="relative h-44 sm:h-52 w-full rounded-[18px] overflow-hidden bg-black/40 shadow-inner">
                        <img src={course.coverImage} alt={course.title} className="h-full w-full object-cover" />
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="rounded-md bg-black/85 backdrop-blur px-2.5 py-1 text-[10px] font-bold text-royal-400 border border-royal-500/30 font-mono">
                            {course.level}
                          </span>
                          <span className="rounded-md bg-black/85 backdrop-blur px-2.5 py-1 text-[10px] font-bold text-slate-200 border border-white/[0.1] font-mono">
                            {course.totalDuration}
                          </span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold text-royal-400 uppercase tracking-wider font-mono">
                            {course.category}
                          </span>
                          <span className="text-xs text-slate-400 font-mono">{course.studentCount} Students Enrolled</span>
                        </div>

                        <h3 className="font-display text-base sm:text-lg font-bold text-white">
                          {course.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2">
                          {course.description}
                        </p>
                      </div>

                      {/* Curriculum Preview Snippet */}
                      <div className="space-y-1.5 rounded-[16px] bg-black/40 p-3 text-xs text-slate-300 border border-white/[0.04]">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Syllabus Breakdown:</p>
                        {course.modules.map((m, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate">{m.title}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/[0.08]">
                        <div className="flex items-baseline gap-2">
                          <span className="font-display text-xl font-extrabold text-white">₹{course.price}</span>
                          {course.originalPrice && (
                            <span className="text-xs text-slate-500 line-through">₹{course.originalPrice}</span>
                          )}
                          <span className="text-[10px] text-emerald-400 font-bold font-mono">
                            {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={`/${creator.username}/course/${course.id}`}
                            className="rounded-[14px] border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-xs font-semibold text-slate-200 hover:bg-white/[0.08] transition btn-press"
                          >
                            View Syllabus
                          </a>
                          <RippleButton
                            onClick={() => setSelectedItemForCheckout({
                              id: course.id,
                              title: course.title,
                              price: course.price,
                              type: 'course'
                            })}
                            className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-4 py-2 text-xs font-bold text-white shadow-royal"
                          >
                            <Zap className="h-3.5 w-3.5 fill-white" />
                            <span>Enroll with UPI</span>
                          </RippleButton>
                        </div>
                      </div>

                    </div>
                  </HoverCard>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 6. DIGITAL PRODUCTS & NOTES */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
          {(activeTab === 'all' || activeTab === 'products') && products.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-4 mb-10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-royal-400 flex items-center gap-1.5">
                    <FileText className="h-4 w-4" />
                    <span>Curated Notes, Roadmaps & PDF Guides</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">Instant 1-click download with automated WhatsApp delivery & GST invoice.</p>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  Instant WhatsApp Dispatch
                </span>
              </div>

              <div className="space-y-3.5">
                {products.map((prod) => (
                  <HoverCard hoverY={-3} key={prod.id}>
                    <div className={`rounded-[22px] ${theme.cardBg} p-5 transition border border-white/[0.08] hover:border-royal-500/40 shadow-glass-card`}>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Cover Thumbnail */}
                        <div className="relative h-28 sm:h-28 sm:w-32 rounded-[16px] overflow-hidden shrink-0 bg-black/40">
                          <img src={prod.coverImage} alt={prod.title} className="h-full w-full object-cover" />
                          <span className="absolute bottom-2 left-2 rounded-md bg-black/85 backdrop-blur px-2 py-0.5 text-[9px] font-bold text-royal-400 font-mono">
                            {prod.fileType}
                          </span>
                        </div>

                        {/* Content info */}
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-slate-300">
                              {prod.category}
                            </span>
                            <div className="flex items-center gap-1 text-[11px] text-amber-400 font-bold">
                              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                              <span>{prod.rating}</span>
                              <span className="text-slate-500 font-normal">({prod.reviewsCount})</span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono ml-auto">
                              {prod.salesCount}+ Copies Sold
                            </span>
                          </div>

                          <h3 className="font-display text-sm sm:text-base font-bold text-white">
                            {prod.title}
                          </h3>
                          
                          <p className="text-xs text-slate-300 line-clamp-2">
                            {prod.subtitle || prod.description}
                          </p>

                          <div className="flex items-center justify-between pt-3 border-t border-white/[0.08] mt-3">
                            <div className="flex items-baseline gap-2">
                              <span className="font-display text-lg sm:text-xl font-extrabold text-white">₹{prod.price}</span>
                              {prod.originalPrice && (
                                <span className="text-xs text-slate-500 line-through">₹{prod.originalPrice}</span>
                              )}
                              <span className="text-[10px] text-emerald-400 font-bold font-mono">
                                {Math.round(((prod.originalPrice - prod.price) / prod.originalPrice) * 100)}% OFF
                              </span>
                            </div>

                            <RippleButton
                              onClick={() => setSelectedItemForCheckout({
                                id: prod.id,
                                title: prod.title,
                                price: prod.price,
                                type: 'product',
                                category: prod.category,
                                downloadUrl: prod.downloadUrl
                              })}
                              className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-4 py-2 text-xs font-bold text-white shadow-royal-sm flex items-center gap-1.5"
                            >
                              <Zap className="h-3.5 w-3.5 fill-white" />
                              <span>Buy with UPI (₹{prod.price})</span>
                            </RippleButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  </HoverCard>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 7. VIP COMMUNITIES & LEAD CAPTURE */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
          {(activeTab === 'all' || activeTab === 'communities') && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-4 mb-10"
            >
              <div className="rounded-[24px] bg-gradient-to-b from-[#0E1529] via-[#090D18] to-[#070A14] border border-royal-500/30 p-6 sm:p-8 text-center shadow-glass-card relative overflow-hidden">
                <div className="absolute top-0 right-1/4 w-72 h-72 bg-royal-600/15 rounded-full blur-[100px] pointer-events-none" />

                <span className="rounded-full bg-royal-600/20 px-3.5 py-1 text-[10px] font-bold text-royal-400 border border-royal-500/30 tracking-wider uppercase font-mono">
                  🔥 VIP PREP & CAREER COMMUNITIES
                </span>

                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white mt-3">
                  Join 45,000+ Indian Developers & Designers
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-md mx-auto leading-relaxed">
                  Get weekly hiring alerts, DSA pattern cheat sheets, live code reviews, and direct interview prep Q&A with {creator.name}.
                </p>

                {leadJoined ? (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-6 rounded-[16px] bg-emerald-500/20 border border-emerald-500/40 p-4 text-xs text-emerald-300 font-bold flex items-center justify-center gap-2 max-w-md mx-auto"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                    <span>🎉 VIP WhatsApp Invite link dispatched to your phone!</span>
                  </motion.div>
                ) : (
                  <div className="mt-6 flex flex-col sm:flex-row items-center gap-2.5 max-w-md mx-auto">
                    <input
                      type="text"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="+91 WhatsApp Mobile Number..."
                      className="w-full sm:flex-1 rounded-[14px] border border-white/[0.1] bg-black/50 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-royal-500 focus:outline-none"
                    />
                    <RippleButton
                      onClick={() => {
                        if (leadPhone.trim()) setLeadJoined(true);
                      }}
                      className="w-full sm:w-auto rounded-[14px] bg-royal-600 hover:bg-royal-500 px-5 py-2.5 text-xs font-bold text-white shadow-royal shrink-0"
                    >
                      Join Free VIP Community
                    </RippleButton>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-[11px] text-slate-400 font-mono">
                  <span>✓ 100% Free Access</span>
                  <span>•</span>
                  <span>✓ Zero Spam Policy</span>
                  <span>•</span>
                  <span>✓ Daily Tech Drops</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 8. VERIFIED STUDENT REVIEWS & TESTIMONIALS */}
        {/* ========================================================================= */}
        <AnimatePresence mode="wait">
          {(activeTab === 'all' || activeTab === 'reviews') && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-5 mb-10"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xs font-bold uppercase tracking-wider text-royal-400 flex items-center gap-1.5">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span>Verified Student Reviews & Testimonials</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">Real feedback from engineers placed at Microsoft, Swiggy, Amazon, and Atlassian.</p>
                </div>

                <button
                  onClick={() => setShowAddReviewModal(true)}
                  className="rounded-[12px] bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] px-3.5 py-1.5 text-xs font-semibold text-white transition btn-press"
                >
                  Write a Review
                </button>
              </div>

              {/* Rating Summary Bar */}
              <div className="p-5 rounded-[22px] bg-white/[0.03] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="font-display text-3xl font-extrabold text-amber-400 font-mono">
                    4.95
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-300 font-medium mt-0.5 block">
                      Based on {totalReviewsCount}+ verified purchases
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                  <ShieldCheck className="h-4 w-4" />
                  <span>100% Verified Buyer Feedback</span>
                </div>
              </div>

              {/* Review Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviewsList.map((rev) => (
                  <HoverCard hoverY={-2} key={rev.id}>
                    <div className="p-5 rounded-[20px] bg-[#0A0D17]/90 border border-white/[0.08] space-y-3 shadow-glass-subtle flex flex-col justify-between h-full">
                      <div className="space-y-2">
                        
                        {/* User info row */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <img src={rev.avatar} alt={rev.name} className="h-9 w-9 rounded-full object-cover ring-1 ring-royal-500" />
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-white text-xs">{rev.name}</span>
                                {rev.verifiedPurchase && (
                                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/15 px-1.5 py-0.2 rounded font-bold">
                                    Verified
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400 block">{rev.role}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-0.5 text-amber-400">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-amber-400" />
                            ))}
                          </div>
                        </div>

                        {/* Company Badge Pill if available */}
                        {rev.companyBadge && (
                          <div className="inline-flex items-center gap-1 rounded-md bg-royal-600/15 text-royal-300 border border-royal-500/30 px-2 py-0.5 text-[10px] font-mono font-bold">
                            <Award className="h-3 w-3 text-royal-400" />
                            <span>{rev.companyBadge}</span>
                          </div>
                        )}

                        {/* Comment text */}
                        <p className="text-xs text-slate-300 leading-relaxed font-sans pt-1">
                          "{rev.comment}"
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-2 border-t border-white/[0.04]">
                        <span className="truncate max-w-[200px] text-royal-400">{rev.productPurchased}</span>
                        <span>{rev.date}</span>
                      </div>
                    </div>
                  </HoverCard>
                ))}
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 9. BUY ME A CHAI (TIP JAR) */}
        {/* ========================================================================= */}
        <HoverCard hoverY={-3} className={`rounded-[22px] ${theme.cardBg} p-5 sm:p-6 mb-8 border border-royal-500/30 shadow-glass-card`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-[14px] bg-royal-600/20 p-3 text-royal-400 border border-royal-500/30">
              <Coffee className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-sm sm:text-base font-bold text-white">Buy {creator.name.split(' ')[0]} a Chai ☕</h3>
              <p className="text-xs text-slate-400">Support my free educational roadmaps & content via instant UPI</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 pt-1">
            {[50, 100, 200, 500].map((amt) => (
              <motion.button
                key={amt}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTipChai(amt)}
                className="flex-1 py-2.5 rounded-[14px] bg-white/[0.04] hover:bg-royal-600/20 text-xs font-bold text-white border border-white/[0.08] hover:border-royal-500/40 transition font-mono"
              >
                ₹{amt}
              </motion.button>
            ))}
          </div>
        </HoverCard>

        {/* ========================================================================= */}
        {/* FOOTER */}
        {/* ========================================================================= */}
        <div className="text-center pt-8 pb-6 border-t border-white/[0.06] text-[11px] text-slate-500 font-mono space-y-1">
          <p>POWERED BY <span className="text-royal-400 font-bold">CREATOROS INDIA</span> 🇮🇳</p>
          <p className="text-[10px] text-slate-400">100% Direct NPCI UPI Payments • T+0 Instant Bank Settlements</p>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* 1:1 BOOKING TIME-SLOT SELECTOR MODAL */}
      {/* ========================================================================= */}
      {bookingModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-md rounded-[24px] border border-white/[0.12] bg-[#0A0D17] p-6 sm:p-7 shadow-2xl text-slate-100 space-y-4"
          >
            <button
              onClick={() => setBookingModalService(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-royal-400 font-mono">
                Google Meet Video Consultation
              </span>
              <h3 className="font-display text-base sm:text-lg font-bold text-white mt-0.5">
                {bookingModalService.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {bookingModalService.durationMinutes} minutes live session with {creator.name}
              </p>
            </div>

            {/* Date choices */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-semibold text-slate-300">Select Preferred Date</label>
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Globe className="h-3 w-3 text-royal-400" />
                  {calendarTimezone || 'Asia/Kolkata'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['Today', 'Tomorrow', 'This Saturday'].map((d) => {
                  const dateBlocked = isDateBlocked(d, creator.id);
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setSelectedDate(d)}
                      className={`py-2.5 rounded-[14px] text-xs font-medium border transition btn-press flex flex-col items-center justify-center gap-0.5 ${
                        selectedDate === d
                          ? 'border-royal-500 bg-royal-600/20 text-royal-300 font-bold shadow-royal-sm'
                          : dateBlocked.isBlocked
                          ? 'border-rose-500/20 bg-rose-500/5 text-slate-400 hover:text-slate-200'
                          : 'border-white/[0.08] bg-white/[0.03] text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>{d}</span>
                      {dateBlocked.isBlocked && (
                        <span className="text-[9px] font-mono text-rose-400 font-medium">Off/Holiday</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slot choices: Booked slots automatically disappear */}
            <div>
              {(() => {
                const dateBlocked = isDateBlocked(selectedDate, creator.id);
                const openSlots = bookingModalService.timeSlots.filter(
                  (slot) => !isSlotBooked(selectedDate, slot, creator.id)
                );

                if (dateBlocked.isBlocked) {
                  return (
                    <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-3.5 text-center space-y-1 my-2">
                      <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-rose-300">
                        <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
                        <span>Date Blocked ({dateBlocked.reason || 'Holiday / Day Off'})</span>
                      </div>
                      <p className="text-[11px] text-rose-200/70">
                        The creator is unavailable on {selectedDate}. Please select another date to view open slots.
                      </p>
                    </div>
                  );
                }

                if (openSlots.length === 0) {
                  return (
                    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-center space-y-1 my-2">
                      <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-300">
                        <Clock className="h-4 w-4 shrink-0 text-amber-400" />
                        <span>All Slots Booked</span>
                      </div>
                      <p className="text-[11px] text-amber-200/70">
                        All consultation slots for {selectedDate} have been taken. Please choose another date.
                      </p>
                    </div>
                  );
                }

                return (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[11px] font-semibold text-slate-300">
                        Available Time Slots
                      </label>
                      <span className="text-[10px] text-emerald-400 font-mono font-medium flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {openSlots.length} open slot{openSlots.length > 1 ? 's' : ''}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {openSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-2.5 rounded-[14px] text-xs font-medium border transition flex items-center justify-center gap-1.5 btn-press ${
                            selectedSlot === slot
                              ? 'border-royal-500 bg-royal-600/25 text-white font-bold shadow-royal-sm ring-1 ring-royal-400'
                              : 'border-white/[0.08] bg-white/[0.03] text-slate-200 hover:border-royal-500/40 hover:bg-white/[0.06]'
                          }`}
                        >
                          <Clock className={`h-3.5 w-3.5 ${selectedSlot === slot ? 'text-royal-400' : 'text-emerald-400'}`} />
                          <span className="font-mono">{slot}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => setBookingModalService(null)}
                className="flex-1 py-2.5 rounded-[14px] border border-white/[0.1] text-xs font-semibold text-slate-300 hover:bg-white/[0.05]"
              >
                Cancel
              </button>
              {(() => {
                const dateBlocked = isDateBlocked(selectedDate, creator.id);
                const openSlots = bookingModalService.timeSlots.filter(
                  (slot) => !isSlotBooked(selectedDate, slot, creator.id)
                );
                const canBook = !dateBlocked.isBlocked && openSlots.length > 0 && selectedSlot && openSlots.includes(selectedSlot);

                return (
                  <RippleButton
                    type="button"
                    disabled={!canBook}
                    onClick={handleProceedBookingToCheckout}
                    className="flex-1 py-2.5 rounded-[14px] bg-royal-600 hover:bg-royal-500 text-xs font-bold text-white shadow-royal disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Book Now (₹{bookingModalService.price})
                  </RippleButton>
                );
              })()}
            </div>
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* WRITE A REVIEW MODAL */}
      {/* ========================================================================= */}
      {showAddReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-md rounded-[24px] border border-white/[0.12] bg-[#0A0D17] p-6 shadow-2xl text-slate-100 space-y-4"
          >
            <button
              onClick={() => setShowAddReviewModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/[0.06] text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div>
              <h3 className="font-display text-base font-bold text-white">Write a Student Review</h3>
              <p className="text-xs text-slate-400 mt-0.5">Share your experience with {creator.name}'s notes, mentorship, or cohort.</p>
            </div>

            <form onSubmit={handleAddReview} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  placeholder="e.g. Rohan Verma"
                  className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Role / Company Placement</label>
                <input
                  type="text"
                  value={newReviewRole}
                  onChange={(e) => setNewReviewRole(e.target.value)}
                  placeholder="e.g. SDE-1 @ Flipkart / Final Year Student"
                  className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Star Rating</label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewReviewRating(s)}
                      className="p-1 text-amber-400"
                    >
                      <Star className={`h-5 w-5 ${s <= newReviewRating ? 'fill-amber-400' : 'text-slate-600'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Feedback *</label>
                <textarea
                  rows={3}
                  required
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="How did the session or roadmap help your prep?..."
                  className="w-full rounded-[12px] border border-white/[0.1] bg-black/50 px-3 py-2 text-xs text-white focus:border-royal-500 focus:outline-none"
                />
              </div>

              <RippleButton
                type="submit"
                className="w-full rounded-[14px] bg-royal-600 hover:bg-royal-500 py-2.5 text-xs font-bold text-white shadow-royal"
              >
                Submit Verified Review
              </RippleButton>
            </form>
          </motion.div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1-CLICK UPI CHECKOUT MODAL */}
      {/* ========================================================================= */}
      {selectedItemForCheckout && (
        <UPICheckoutModal
          isOpen={true}
          onClose={() => setSelectedItemForCheckout(null)}
          item={selectedItemForCheckout}
          bookingDate={selectedDate}
          bookingTimeSlot={selectedSlot}
        />
      )}

    </div>
  );
}
