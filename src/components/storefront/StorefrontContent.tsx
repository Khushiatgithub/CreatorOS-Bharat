'use client';

import React, { useState } from 'react';
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
  ArrowUpRight 
} from 'lucide-react';
import { Creator, StoreTheme, DigitalProduct, Course, BookingService, ProductType } from '@/types';
import UPICheckoutModal from '@/components/checkout/UPICheckoutModal';
import { AnimatedCounter, RippleButton, HoverCard } from '@/components/ui/motion';
import { motion, AnimatePresence } from 'framer-motion';

interface StorefrontContentProps {
  creator: Creator;
  theme: StoreTheme;
  products: DigitalProduct[];
  courses: Course[];
  bookingServices: BookingService[];
  isMobilePreview?: boolean;
}

export default function StorefrontContent({
  creator,
  theme,
  products,
  courses,
  bookingServices,
  isMobilePreview = false
}: StorefrontContentProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'products' | 'courses' | 'bookings'>('all');
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

  const handleOpenBookingSlot = (service: BookingService) => {
    setBookingModalService(service);
    setSelectedSlot(service.timeSlots[0] || '07:00 PM');
  };

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

  return (
    <div className={`w-full min-h-screen bg-gradient-to-b ${theme.bgGradient} ${theme.textPrimary} transition-colors duration-500 font-sans`}>
      
      {/* Container sizing based on preview mode vs full public page */}
      <div className={`mx-auto ${isMobilePreview ? 'w-full px-3 py-4' : 'max-w-2xl px-4 py-8 sm:py-12'}`}>

        {/* HERO CREATOR HEADER */}
        <div className="relative mb-6 text-center">
          
          {/* Cover Banner if exists */}
          {creator.bannerUrl && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative h-28 sm:h-36 w-full overflow-hidden rounded-[22px] mb-12 shadow-glass-subtle border border-white/[0.08]"
            >
              <img src={creator.bannerUrl} alt="Banner" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            </motion.div>
          )}

          {/* Avatar Image with verified badge & Spring entry */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className={`relative inline-block ${creator.bannerUrl ? '-mt-20 sm:-mt-24' : 'mt-2'} mb-3`}
          >
            <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full p-1 bg-gradient-to-tr from-royal-600 via-blue-400 to-slate-200 shadow-royal">
              <img
                src={creator.avatarUrl}
                alt={creator.name}
                className="h-full w-full rounded-full object-cover bg-[#090C16]"
              />
            </div>
            {creator.verified && (
              <div className="absolute bottom-1 right-1 rounded-full bg-royal-600 p-1 text-white ring-2 ring-black shadow-md" title="Verified Creator">
                <ShieldCheck className="h-3.5 w-3.5" />
              </div>
            )}
          </motion.div>

          {/* Name & Tagline */}
          <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center justify-center gap-1.5">
            <span>{creator.name}</span>
          </h1>

          <p className="text-xs sm:text-sm font-medium text-royal-400 mt-1 max-w-md mx-auto leading-relaxed">
            {creator.tagline}
          </p>

          <p className="text-xs text-slate-300/85 mt-2 max-w-lg mx-auto leading-relaxed">
            {creator.bio}
          </p>

          <div className="flex items-center justify-center gap-2 mt-2.5 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-royal-400" />
              {creator.location}
            </span>
            <span>•</span>
            <span className="rounded-full bg-white/[0.05] px-2 py-0.5 border border-white/[0.08] text-slate-300">
              {creator.category}
            </span>
          </div>

          {/* Social Icons Row with Spring Micro-interactions */}
          <div className="flex items-center justify-center gap-2 mt-3.5">
            {creator.socials.youtube && (
              <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }} href={creator.socials.youtube} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/[0.04] hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-white/[0.08] transition">
                <Youtube className="h-4 w-4" />
              </motion.a>
            )}
            {creator.socials.instagram && (
              <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }} href={creator.socials.instagram} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/[0.04] hover:bg-pink-500/20 text-slate-400 hover:text-pink-400 border border-white/[0.08] transition">
                <Instagram className="h-4 w-4" />
              </motion.a>
            )}
            {creator.socials.linkedin && (
              <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }} href={creator.socials.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/[0.04] hover:bg-royal-600/20 text-slate-400 hover:text-royal-400 border border-white/[0.08] transition">
                <Linkedin className="h-4 w-4" />
              </motion.a>
            )}
            {creator.socials.twitter && (
              <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }} href={creator.socials.twitter} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/[0.04] hover:bg-sky-500/20 text-slate-400 hover:text-sky-400 border border-white/[0.08] transition">
                <Twitter className="h-4 w-4" />
              </motion.a>
            )}
            {creator.socials.telegram && (
              <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.92 }} href={creator.socials.telegram} target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-white/[0.04] hover:bg-blue-400/20 text-slate-400 hover:text-blue-400 border border-white/[0.08] transition">
                <Send className="h-4 w-4" />
              </motion.a>
            )}
          </div>
        </div>

        {/* CUSTOM HIGHLIGHTED BIO LINKS */}
        {creator.customLinks && creator.customLinks.length > 0 && (
          <div className="space-y-2.5 mb-6">
            {creator.customLinks.map((link) => (
              <HoverCard hoverY={-3} key={link.id}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full flex items-center justify-between p-3.5 rounded-[20px] text-xs sm:text-sm font-semibold transition ${
                    link.highlight
                      ? 'bg-gradient-to-r from-royal-600 to-royal-700 text-white shadow-royal hover:brightness-110'
                      : `${theme.cardBg} ${theme.textPrimary} hover:border-royal-500/40 hover:bg-white/[0.08]`
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="h-4 w-4 shrink-0 text-royal-300" />
                    <span className="line-clamp-1">{link.title}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 opacity-80" />
                </a>
              </HoverCard>
            ))}
          </div>
        )}

        {/* TAB FILTER BAR - 20px rounded with Smooth Active Pill */}
        <div className="flex items-center gap-1.5 p-1 rounded-[20px] bg-white/[0.04] border border-white/[0.08] mb-6 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-[14px] text-xs font-semibold whitespace-nowrap transition relative ${
              activeTab === 'all' ? 'bg-royal-600 text-white shadow-royal-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Offerings ({products.length + courses.length + bookingServices.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-3 py-1.5 rounded-[14px] text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'products' ? 'bg-royal-600 text-white shadow-royal-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Notes ({products.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-3 py-1.5 rounded-[14px] text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'courses' ? 'bg-royal-600 text-white shadow-royal-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="h-3.5 w-3.5" />
            <span>Courses ({courses.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-3 py-1.5 rounded-[14px] text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
              activeTab === 'bookings' ? 'bg-royal-600 text-white shadow-royal-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="h-3.5 w-3.5" />
            <span>1:1 Sessions ({bookingServices.length})</span>
          </button>
        </div>

        {/* SECTION 1: DIGITAL PRODUCTS & NOTES */}
        <AnimatePresence mode="wait">
          {(activeTab === 'all' || activeTab === 'products') && products.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-3.5 mb-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-royal-400 flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Handcrafted Notes & Digital Products</span>
                </h2>
                <span className="text-[10px] text-slate-500 font-mono">Instant UPI Delivery</span>
              </div>

              <div className="space-y-3">
                {products.map((prod) => (
                  <HoverCard hoverY={-3} key={prod.id}>
                    <div className={`rounded-[20px] ${theme.cardBg} p-4 sm:p-5 transition hover:border-royal-500/40`}>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Cover Thumbnail */}
                        <div className="relative h-28 sm:h-24 sm:w-28 rounded-[16px] overflow-hidden shrink-0 bg-black/40">
                          <img src={prod.coverImage} alt={prod.title} className="h-full w-full object-cover" />
                          <span className="absolute bottom-1.5 left-1.5 rounded-md bg-black/85 backdrop-blur px-1.5 py-0.5 text-[9px] font-bold text-royal-400 font-mono">
                            {prod.fileType}
                          </span>
                        </div>

                        {/* Content info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="rounded-md bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-slate-300">
                              {prod.category}
                            </span>
                            <div className="flex items-center gap-1 text-[11px] text-royal-400 font-bold">
                              <Star className="h-3 w-3 fill-royal-400 text-royal-400" />
                              <span>{prod.rating}</span>
                              <span className="text-slate-500 font-normal">({prod.reviewsCount})</span>
                            </div>
                          </div>

                          <h3 className="font-display text-sm sm:text-base font-bold text-white line-clamp-1">
                            {prod.title}
                          </h3>
                          <p className="text-xs text-slate-300 line-clamp-2 mt-0.5">
                            {prod.subtitle || prod.description}
                          </p>

                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.08]">
                            <div className="flex items-baseline gap-2">
                              <span className="font-display text-lg font-extrabold text-white">₹{prod.price}</span>
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
                              className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-3.5 py-2 text-xs font-bold text-white shadow-royal-sm"
                            >
                              <Zap className="h-3.5 w-3.5 fill-white" />
                              <span>Buy with UPI</span>
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

        {/* SECTION 2: 1:1 PAID SESSIONS */}
        <AnimatePresence mode="wait">
          {(activeTab === 'all' || activeTab === 'bookings') && bookingServices.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-3.5 mb-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-royal-400 flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>1:1 Video Mentorship & Consultation</span>
                </h2>
                <span className="text-[10px] text-slate-500 font-mono">Google Meet Sync</span>
              </div>

              <div className="space-y-3">
                {bookingServices.map((service) => (
                  <HoverCard hoverY={-3} key={service.id}>
                    <div className={`rounded-[20px] ${theme.cardBg} p-4 sm:p-5 transition hover:border-royal-500/40`}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="rounded-md bg-royal-600/20 text-royal-300 border border-royal-500/30 px-2 py-0.5 text-[10px] font-semibold">
                              {service.sessionType}
                            </span>
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {service.durationMinutes} mins
                            </span>
                          </div>
                          <h3 className="font-display text-sm sm:text-base font-bold text-white">
                            {service.title}
                          </h3>
                          <p className="text-xs text-slate-300 mt-1 max-w-md">
                            {service.description}
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="font-display text-base sm:text-lg font-bold text-white">
                            ₹{service.price}
                          </div>
                          <p className="text-[10px] text-slate-400 font-mono">{service.durationMinutes}m Call</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.08]">
                        <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span>{service.bookingsCompleted}+ Sessions Done (★ {service.rating})</span>
                        </div>

                        <RippleButton
                          onClick={() => handleOpenBookingSlot(service)}
                          className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-3.5 py-2 text-xs font-bold text-white shadow-royal-sm"
                        >
                          <Calendar className="h-3.5 w-3.5" />
                          <span>Book Slot (₹{service.price})</span>
                        </RippleButton>
                      </div>
                    </div>
                  </HoverCard>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SECTION 3: VIDEO COURSES */}
        <AnimatePresence mode="wait">
          {(activeTab === 'all' || activeTab === 'courses') && courses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-3.5 mb-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-wider text-royal-400 flex items-center gap-1.5">
                  <Video className="h-3.5 w-3.5" />
                  <span>Video Courses & Masterclasses</span>
                </h2>
                <span className="text-[10px] text-slate-500 font-mono">Interactive Player</span>
              </div>

              <div className="space-y-3">
                {courses.map((course) => (
                  <HoverCard hoverY={-3} key={course.id}>
                    <div className={`rounded-[20px] ${theme.cardBg} p-4 sm:p-5 transition hover:border-royal-500/40`}>
                      <div className="relative h-36 w-full rounded-[16px] overflow-hidden mb-3 bg-black/40">
                        <img src={course.coverImage} alt={course.title} className="h-full w-full object-cover" />
                        <div className="absolute top-2.5 left-2.5 rounded-md bg-black/85 backdrop-blur px-2 py-0.5 text-[10px] font-semibold text-royal-400 border border-royal-500/30">
                          {course.level} • {course.totalDuration}
                        </div>
                      </div>

                      <h3 className="font-display text-sm sm:text-base font-bold text-white">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                        {course.description}
                      </p>

                      <div className="my-3 space-y-1 rounded-[14px] bg-black/30 p-2.5 text-xs text-slate-300 border border-white/[0.04]">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Curriculum:</p>
                        {course.modules.map((m, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                            <CheckCircle className="h-3 w-3 text-emerald-400 shrink-0" />
                            <span className="truncate">{m.title} ({m.lessons.length} Lessons)</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/[0.08]">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="font-display text-lg font-extrabold text-white">₹{course.price}</span>
                            {course.originalPrice && (
                              <span className="text-xs text-slate-500 line-through">₹{course.originalPrice}</span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 font-mono">{course.studentCount} students enrolled</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={`/${creator.username}/course/${course.id}`}
                            className="rounded-[14px] border border-white/[0.1] bg-white/[0.04] px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/[0.08] transition btn-press"
                          >
                            Curriculum
                          </a>
                          <RippleButton
                            onClick={() => setSelectedItemForCheckout({
                              id: course.id,
                              title: course.title,
                              price: course.price,
                              type: 'course'
                            })}
                            className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-3.5 py-2 text-xs font-bold text-white shadow-royal-sm"
                          >
                            <Zap className="h-3.5 w-3.5 fill-white" />
                            <span>Enroll ₹{course.price}</span>
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

        {/* SECTION 4: BUY ME A CHAI (TIP JAR) - 20px rounded */}
        <HoverCard hoverY={-3} className={`rounded-[20px] ${theme.cardBg} p-5 mb-8 border border-royal-500/25`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="rounded-[14px] bg-royal-600/20 p-2.5 text-royal-400 border border-royal-500/30">
              <Coffee className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-display text-sm font-bold text-white">Buy {creator.name.split(' ')[0]} a Chai ☕</h3>
              <p className="text-xs text-slate-400">Support my free educational content via UPI</p>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            {[50, 100, 200, 500].map((amt) => (
              <motion.button
                key={amt}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTipChai(amt)}
                className="flex-1 py-2 rounded-[14px] bg-white/[0.04] hover:bg-royal-600/20 text-xs font-bold text-white border border-white/[0.08] hover:border-royal-500/40 transition font-mono"
              >
                ₹{amt}
              </motion.button>
            ))}
          </div>
        </HoverCard>

        {/* SECTION 5: WHATSAPP COMMUNITY LEAD MAGNET */}
        <div className="rounded-[20px] bg-gradient-to-b from-[#0E1529] to-[#070A14] border border-royal-500/30 p-5 text-center mb-8 shadow-glass-card">
          <span className="rounded-full bg-royal-600/20 px-3 py-0.5 text-[10px] font-bold text-royal-400 border border-royal-500/30 tracking-wider uppercase">
            VIP WHATSAPP COMMUNITY
          </span>
          <h3 className="font-display text-base font-bold text-white mt-2">
            Get Weekly Free Notes & Tech Drops
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
            Join 35,000+ engineers receiving instant notifications on Indian tech hiring & sheets.
          </p>

          {leadJoined ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="mt-4 rounded-[14px] bg-emerald-500/20 border border-emerald-500/40 p-3 text-xs text-emerald-300 font-semibold"
            >
              🎉 Invite link dispatched to your WhatsApp!
            </motion.div>
          ) : (
            <div className="mt-4 flex items-center gap-2 max-w-md mx-auto">
              <input
                type="text"
                value={leadPhone}
                onChange={(e) => setLeadPhone(e.target.value)}
                placeholder="+91 Mobile number..."
                className="flex-1 rounded-[14px] border border-white/[0.1] bg-black/50 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-royal-500 focus:outline-none"
              />
              <RippleButton
                onClick={() => {
                  if (leadPhone.trim()) setLeadJoined(true);
                }}
                className="rounded-[14px] bg-royal-600 hover:bg-royal-500 px-4 py-2 text-xs font-bold text-white shadow-royal-sm shrink-0"
              >
                Join Free
              </RippleButton>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="text-center pt-6 pb-4 border-t border-white/[0.06] text-[10px] text-slate-500 font-mono">
          <p>POWERED BY <span className="text-royal-400 font-bold">CREATOROS INDIA</span> 🇮🇳</p>
        </div>

      </div>

      {/* 1:1 BOOKING TIME-SLOT SELECTOR MODAL */}
      {bookingModalService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-md rounded-[24px] border border-white/[0.12] bg-[#0A0D17] p-6 shadow-2xl text-slate-100"
          >
            <h3 className="font-display text-base font-bold text-white mb-0.5">
              Select 1:1 Session Slot (IST)
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              {bookingModalService.title} • {bookingModalService.durationMinutes} mins on Google Meet
            </p>

            {/* Date choices */}
            <div className="mb-4">
              <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">Choose Date</label>
              <div className="grid grid-cols-3 gap-2">
                {['Today', 'Tomorrow', 'This Saturday'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className={`py-2 rounded-[14px] text-xs font-medium border transition btn-press ${
                      selectedDate === d
                        ? 'border-royal-500 bg-royal-600/20 text-royal-300 font-semibold'
                        : 'border-white/[0.08] bg-white/[0.03] text-slate-400 hover:text-white'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Slot choices */}
            <div className="mb-5">
              <label className="block text-[11px] font-semibold text-slate-300 mb-1.5">Time Slot (IST)</label>
              <div className="grid grid-cols-2 gap-2">
                {bookingModalService.timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedSlot(slot)}
                    className={`py-2.5 rounded-[14px] text-xs font-medium border transition flex items-center justify-center gap-1.5 btn-press ${
                      selectedSlot === slot
                        ? 'border-royal-500 bg-royal-600/25 text-white font-bold shadow-royal-sm'
                        : 'border-white/[0.08] bg-white/[0.03] text-slate-300 hover:border-white/[0.15]'
                    }`}
                  >
                    <Clock className="h-3 w-3" />
                    <span>{slot}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setBookingModalService(null)}
                className="flex-1 py-2.5 rounded-[14px] border border-white/[0.1] text-xs font-semibold text-slate-300 hover:bg-white/[0.05]"
              >
                Cancel
              </button>
              <RippleButton
                type="button"
                onClick={handleProceedBookingToCheckout}
                className="flex-1 py-2.5 rounded-[14px] bg-royal-600 hover:bg-royal-500 text-xs font-bold text-white shadow-royal"
              >
                Continue (₹{bookingModalService.price})
              </RippleButton>
            </div>
          </motion.div>
        </div>
      )}

      {/* UPI CHECKOUT MODAL */}
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
