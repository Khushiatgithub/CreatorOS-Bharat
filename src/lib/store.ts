'use client';

import { useState, useEffect } from 'react';
import {
  Creator,
  DigitalProduct,
  Course,
  BookingService,
  BookingAppointment,
  Order,
  WhatsAppNotification,
  BrandCollabBrief,
  BrandProposal,
  MediaKitData,
  ProductType,
  Community,
  CommunityPost,
  CommunityMember,
  CommunityComment,
  CommunityTier,
  SubscriptionPlan,
  Subscription,
  SubscriptionPayment,
  MembershipMetrics,
  GoogleCalendarIntegration,
  DayAvailability,
  CalendarMeeting,
  MeetingStatus
} from '@/types';
import {
  INITIAL_CREATORS,
  INITIAL_PRODUCTS,
  INITIAL_COURSES,
  INITIAL_BOOKINGS,
  INITIAL_ORDERS,
  INITIAL_WHATSAPP_NOTIFS,
  INITIAL_BRAND_BRIEFS,
  INITIAL_BRAND_PROPOSALS,
  INITIAL_MEDIA_KIT,
  INITIAL_COMMUNITIES,
  INITIAL_COMMUNITY_POSTS,
  INITIAL_COMMUNITY_MEMBERS,
  INITIAL_SUBSCRIPTION_PLANS,
  INITIAL_SUBSCRIPTIONS,
  INITIAL_SUBSCRIPTION_PAYMENTS,
  INITIAL_GOOGLE_CALENDAR,
  INITIAL_WEEKLY_AVAILABILITY,
  INITIAL_CALENDAR_MEETINGS,
  THEMES
} from './mock-data';
import { calculateGST, SAC_CODES } from './gst';

const STORAGE_KEYS = {
  CREATORS: 'creatoros_creators',
  ACTIVE_CREATOR_ID: 'creatoros_active_creator_id',
  PRODUCTS: 'creatoros_products',
  COURSES: 'creatoros_courses',
  BOOKINGS: 'creatoros_bookings',
  APPOINTMENTS: 'creatoros_appointments',
  ORDERS: 'creatoros_orders',
  WHATSAPP_LOGS: 'creatoros_whatsapp_logs',
  BRAND_BRIEFS: 'creatoros_brand_briefs',
  BRAND_PROPOSALS: 'creatoros_brand_proposals',
  MEDIA_KIT: 'creatoros_media_kit',
  COMMUNITIES: 'creatoros_communities',
  ACTIVE_COMMUNITY_ID: 'creatoros_active_community_id',
  COMMUNITY_POSTS: 'creatoros_community_posts',
  COMMUNITY_MEMBERS: 'creatoros_community_members',
  SUBSCRIPTION_PLANS: 'creatoros_subscription_plans',
  SUBSCRIPTIONS: 'creatoros_subscriptions',
  SUBSCRIPTION_PAYMENTS: 'creatoros_subscription_payments',
  GOOGLE_CALENDAR: 'creatoros_google_calendar',
  WEEKLY_AVAILABILITY: 'creatoros_weekly_availability',
  BUFFER_MINUTES: 'creatoros_buffer_minutes',
  CALENDAR_MEETINGS: 'creatoros_calendar_meetings'
};

// Initial state loader with safe hydration
export function useCreatorStore() {
  const [creators, setCreators] = useState<Creator[]>(INITIAL_CREATORS);
  const [activeCreatorId, setActiveCreatorId] = useState<string>('creator_aarav');
  const [products, setProducts] = useState<DigitalProduct[]>(INITIAL_PRODUCTS);
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [bookingServices, setBookingServices] = useState<BookingService[]>(INITIAL_BOOKINGS);
  const [appointments, setAppointments] = useState<BookingAppointment[]>([]);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [whatsappLogs, setWhatsappLogs] = useState<WhatsAppNotification[]>(INITIAL_WHATSAPP_NOTIFS);
  const [brandBriefs, setBrandBriefs] = useState<BrandCollabBrief[]>(INITIAL_BRAND_BRIEFS);
  const [brandProposals, setBrandProposals] = useState<BrandProposal[]>(INITIAL_BRAND_PROPOSALS);
  const [mediaKit, setMediaKit] = useState<MediaKitData>(INITIAL_MEDIA_KIT);
  const [communities, setCommunities] = useState<Community[]>(INITIAL_COMMUNITIES);
  const [activeCommunityId, setActiveCommunityId] = useState<string>('comm_tech_faang');
  const [communityPosts, setCommunityPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [communityMembers, setCommunityMembers] = useState<CommunityMember[]>(INITIAL_COMMUNITY_MEMBERS);
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>(INITIAL_SUBSCRIPTION_PLANS);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(INITIAL_SUBSCRIPTIONS);
  const [subscriptionPayments, setSubscriptionPayments] = useState<SubscriptionPayment[]>(INITIAL_SUBSCRIPTION_PAYMENTS);
  const [googleCalendar, setGoogleCalendar] = useState<GoogleCalendarIntegration>(INITIAL_GOOGLE_CALENDAR);
  const [weeklyAvailability, setWeeklyAvailability] = useState<DayAvailability[]>(INITIAL_WEEKLY_AVAILABILITY);
  const [bufferMinutes, setBufferMinutes] = useState<number>(15);
  const [calendarMeetings, setCalendarMeetings] = useState<CalendarMeeting[]>(INITIAL_CALENDAR_MEETINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedCreators = localStorage.getItem(STORAGE_KEYS.CREATORS);
      if (savedCreators) setCreators(JSON.parse(savedCreators));

      const savedActiveId = localStorage.getItem(STORAGE_KEYS.ACTIVE_CREATOR_ID);
      if (savedActiveId) setActiveCreatorId(savedActiveId);

      const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedCourses = localStorage.getItem(STORAGE_KEYS.COURSES);
      if (savedCourses) setCourses(JSON.parse(savedCourses));

      const savedBookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (savedBookings) setBookingServices(JSON.parse(savedBookings));

      const savedAppointments = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      if (savedAppointments) setAppointments(JSON.parse(savedAppointments));

      const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedWhatsapp = localStorage.getItem(STORAGE_KEYS.WHATSAPP_LOGS);
      if (savedWhatsapp) setWhatsappLogs(JSON.parse(savedWhatsapp));

      const savedBriefs = localStorage.getItem(STORAGE_KEYS.BRAND_BRIEFS);
      if (savedBriefs) setBrandBriefs(JSON.parse(savedBriefs));

      const savedProposals = localStorage.getItem(STORAGE_KEYS.BRAND_PROPOSALS);
      if (savedProposals) setBrandProposals(JSON.parse(savedProposals));

      const savedMediaKit = localStorage.getItem(STORAGE_KEYS.MEDIA_KIT);
      if (savedMediaKit) setMediaKit(JSON.parse(savedMediaKit));

      const savedCommunities = localStorage.getItem(STORAGE_KEYS.COMMUNITIES);
      if (savedCommunities) setCommunities(JSON.parse(savedCommunities));

      const savedActiveCommunityId = localStorage.getItem(STORAGE_KEYS.ACTIVE_COMMUNITY_ID);
      if (savedActiveCommunityId) setActiveCommunityId(savedActiveCommunityId);

      const savedPosts = localStorage.getItem(STORAGE_KEYS.COMMUNITY_POSTS);
      if (savedPosts) setCommunityPosts(JSON.parse(savedPosts));

      const savedMembers = localStorage.getItem(STORAGE_KEYS.COMMUNITY_MEMBERS);
      if (savedMembers) setCommunityMembers(JSON.parse(savedMembers));

      const savedSubPlans = localStorage.getItem(STORAGE_KEYS.SUBSCRIPTION_PLANS);
      if (savedSubPlans) setSubscriptionPlans(JSON.parse(savedSubPlans));

      const savedSubs = localStorage.getItem(STORAGE_KEYS.SUBSCRIPTIONS);
      if (savedSubs) setSubscriptions(JSON.parse(savedSubs));

      const savedSubPayments = localStorage.getItem(STORAGE_KEYS.SUBSCRIPTION_PAYMENTS);
      if (savedSubPayments) setSubscriptionPayments(JSON.parse(savedSubPayments));

      const savedGcal = localStorage.getItem(STORAGE_KEYS.GOOGLE_CALENDAR);
      if (savedGcal) setGoogleCalendar(JSON.parse(savedGcal));

      const savedAvail = localStorage.getItem(STORAGE_KEYS.WEEKLY_AVAILABILITY);
      if (savedAvail) setWeeklyAvailability(JSON.parse(savedAvail));

      const savedBuffer = localStorage.getItem(STORAGE_KEYS.BUFFER_MINUTES);
      if (savedBuffer) setBufferMinutes(JSON.parse(savedBuffer));

      const savedMeetings = localStorage.getItem(STORAGE_KEYS.CALENDAR_MEETINGS);
      if (savedMeetings) setCalendarMeetings(JSON.parse(savedMeetings));
    } catch (e) {
      console.warn('LocalStorage error or not available', e);
    } finally {
      setIsLoaded(true);
    }

    // Async sync from PostgreSQL API endpoints
    fetch('/api/calendar/google')
      .then((res) => res.json())
      .then((d) => {
        if (d.success && d.data) setGoogleCalendar(d.data);
      })
      .catch((e) => console.warn('GCal sync error:', e));

    fetch('/api/calendar/availability')
      .then((res) => res.json())
      .then((d) => {
        if (d.success && d.data) {
          if (d.data.availability) setWeeklyAvailability(d.data.availability);
          if (d.data.bufferMinutes) setBufferMinutes(d.data.bufferMinutes);
        }
      })
      .catch((e) => console.warn('Availability sync error:', e));

    fetch('/api/calendar/meetings')
      .then((res) => res.json())
      .then((d) => {
        if (d.success && d.data) setCalendarMeetings(d.data);
      })
      .catch((e) => console.warn('Meetings sync error:', e));
  }, []);

  // Save changes
  const saveState = (key: string, data: any) => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(data));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const activeCreator = creators.find((c) => c.id === activeCreatorId) || creators[0];
  const activeTheme = THEMES.find((t) => t.id === activeCreator?.themeId) || THEMES[0];

  // Creator management
  const updateCreator = (updated: Partial<Creator>) => {
    setCreators((prev) => {
      const next = prev.map((c) => (c.id === activeCreatorId ? { ...c, ...updated } : c));
      saveState(STORAGE_KEYS.CREATORS, next);
      return next;
    });
  };

  const switchActiveCreator = (id: string) => {
    setActiveCreatorId(id);
    saveState(STORAGE_KEYS.ACTIVE_CREATOR_ID, id);
  };

  // Products
  const addProduct = (newProd: Omit<DigitalProduct, 'id' | 'creatorId' | 'salesCount' | 'rating' | 'reviewsCount'>) => {
    const product: DigitalProduct = {
      ...newProd,
      id: `prod_${Date.now()}`,
      creatorId: activeCreatorId,
      salesCount: 0,
      rating: 5.0,
      reviewsCount: 1
    };
    setProducts((prev) => {
      const next = [product, ...prev];
      saveState(STORAGE_KEYS.PRODUCTS, next);
      return next;
    });
    return product;
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      saveState(STORAGE_KEYS.PRODUCTS, next);
      return next;
    });
  };

  // Courses
  const addCourse = (newCourse: Omit<Course, 'id' | 'creatorId' | 'studentCount' | 'rating' | 'reviewsCount'>) => {
    const course: Course = {
      ...newCourse,
      id: `course_${Date.now()}`,
      creatorId: activeCreatorId,
      studentCount: 0,
      rating: 5.0,
      reviewsCount: 0
    };
    setCourses((prev) => {
      const next = [course, ...prev];
      saveState(STORAGE_KEYS.COURSES, next);
      return next;
    });
    return course;
  };

  // Bookings
  const addBookingService = (newService: Omit<BookingService, 'id' | 'creatorId' | 'bookingsCompleted' | 'rating'>) => {
    const service: BookingService = {
      ...newService,
      id: `book_${Date.now()}`,
      creatorId: activeCreatorId,
      bookingsCompleted: 0,
      rating: 5.0
    };
    setBookingServices((prev) => {
      const next = [service, ...prev];
      saveState(STORAGE_KEYS.BOOKINGS, next);
      return next;
    });
    return service;
  };

  // Complete Order / Checkout simulation with automated GST and WhatsApp notification
  const processCheckout = (params: {
    itemType: ProductType;
    itemId: string;
    itemTitle: string;
    amount: number;
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    buyerState: string;
    buyerGst?: string;
    paymentMethod?: 'UPI' | 'Card' | 'Netbanking' | 'CRED';
    paymentApp?: 'PhonePe' | 'GPay' | 'Paytm' | 'CRED' | 'BHIM';
    bookingDate?: string;
    bookingTimeSlot?: string;
  }): { order: Order; appointment?: BookingAppointment } => {
    const creator = activeCreator;
    const gstCalc = calculateGST(params.amount, creator.state, params.buyerState);
    const orderNum = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const orderId = `ord_${Date.now()}`;
    const invoiceNum = `INV-${new Date().getFullYear()}-${orderNum.slice(-5)}`;

    let sac = SAC_CODES.DIGITAL_PRODUCT.code;
    if (params.itemType === 'course') sac = SAC_CODES.COURSE.code;
    else if (params.itemType === 'booking') sac = SAC_CODES.BOOKING.code;
    else if (params.itemType === 'tip') sac = SAC_CODES.TIP.code;

    const isUPI = !params.paymentMethod || params.paymentMethod === 'UPI';
    const txnRef = isUPI
      ? `UPI-${Math.floor(100000000000 + Math.random() * 900000000000)}`
      : `RZP-PAY-${Math.floor(1000000000 + Math.random() * 9000000000)}`;

    const newOrder: Order = {
      id: orderId,
      orderNumber: orderNum,
      date: new Date().toISOString(),
      creatorId: creator.id,
      buyerName: params.buyerName,
      buyerEmail: params.buyerEmail,
      buyerPhone: params.buyerPhone,
      buyerGst: params.buyerGst,
      buyerState: params.buyerState,
      itemType: params.itemType,
      itemId: params.itemId,
      itemTitle: params.itemTitle,
      amount: params.amount,
      gstRate: 18,
      cgst: gstCalc.cgst,
      sgst: gstCalc.sgst,
      igst: gstCalc.igst,
      totalAmount: gstCalc.totalAmount,
      paymentMethod: params.paymentMethod || 'UPI',
      paymentApp: params.paymentApp || (params.paymentMethod === 'Card' ? undefined : 'PhonePe'),
      upiRefId: txnRef,
      invoiceNumber: invoiceNum,
      sacCode: sac,
      status: 'completed',
      bookingDate: params.bookingDate,
      bookingTimeSlot: params.bookingTimeSlot,
      deliverySentWhatsapp: true,
      deliverySentEmail: true
    };

    // Update orders
    setOrders((prev) => {
      const next = [newOrder, ...prev];
      saveState(STORAGE_KEYS.ORDERS, next);
      return next;
    });

    // Create appointment and calendar meeting if booking
    let newAppointment: BookingAppointment | undefined;
    let newMeeting: CalendarMeeting | undefined;

    if (params.itemType === 'booking' && params.bookingDate && params.bookingTimeSlot) {
      const randomMeetCode = `${Math.random().toString(36).substring(2, 5)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`;
      const meetUrl = `https://meet.google.com/${randomMeetCode}`;
      const googleEventId = `gevent_${Date.now()}`;
      const meetingTimezone = 'Asia/Kolkata';
      const meetingTitle = params.itemTitle.startsWith('1:1')
        ? params.itemTitle
        : `1:1 Session: ${params.itemTitle}`;
      const meetingTopic = `1:1 Mentorship Session with ${creator.name} and ${params.buyerName}. Timezone: ${meetingTimezone} (IST UTC+05:30).`;

      // 1. Create Appointment
      newAppointment = {
        id: `apt_${Date.now()}`,
        serviceId: params.itemId,
        creatorId: creator.id,
        serviceTitle: meetingTitle,
        buyerName: params.buyerName,
        buyerEmail: params.buyerEmail,
        buyerPhone: params.buyerPhone,
        date: params.bookingDate,
        timeSlot: params.bookingTimeSlot,
        meetUrl,
        status: 'confirmed',
        notes: meetingTopic,
        amountPaid: gstCalc.totalAmount,
        orderId: orderId,
        googleEventId,
        timeZone: meetingTimezone,
        createdAt: new Date().toISOString()
      };

      setAppointments((prev) => {
        const next = [newAppointment!, ...prev];
        saveState(STORAGE_KEYS.APPOINTMENTS, next);
        return next;
      });

      // 2. Create Calendar Meeting for Dashboard -> Calendar
      newMeeting = {
        id: `meet_${Date.now()}`,
        creatorId: creator.id,
        studentName: params.buyerName,
        studentEmail: params.buyerEmail,
        studentPhone: params.buyerPhone,
        studentAvatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80`,
        meetingTitle,
        meetingDate: params.bookingDate,
        meetingTime: params.bookingTimeSlot,
        durationMinutes: 45,
        meetingStatus: 'confirmed',
        meetingUrl: meetUrl,
        googleEventId,
        topic: meetingTopic,
        timezone: meetingTimezone,
        createdAt: new Date().toISOString().split('T')[0]
      };

      setCalendarMeetings((prev) => {
        const next = [newMeeting!, ...prev];
        saveState(STORAGE_KEYS.CALENDAR_MEETINGS, next);
        return next;
      });

      // 3. Update bookings completed count on the service
      setBookingServices((prev) => {
        const next = prev.map((s) =>
          s.id === params.itemId ? { ...s, bookingsCompleted: (s.bookingsCompleted || 0) + 1 } : s
        );
        saveState(STORAGE_KEYS.BOOKINGS, next);
        return next;
      });

      // 4. Trigger background sync to PostgreSQL & Google Calendar API with dual attendees
      fetch('/api/calendar/meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newMeeting,
          creatorEmail: creator.email || googleCalendar?.accountEmail || 'aarav.sharma@gmail.com',
          creatorName: creator.name || 'Aarav Sharma',
          serviceId: params.itemId,
          orderId,
          amountPaid: gstCalc.totalAmount
        })
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data) {
            if (data.data.googleEventId || data.data.meetingUrl) {
              setCalendarMeetings((prev) =>
                prev.map((m) =>
                  m.id === newMeeting!.id
                    ? {
                        ...m,
                        googleEventId: data.data.googleEventId || m.googleEventId,
                        meetingUrl: data.data.meetingUrl || m.meetingUrl
                      }
                    : m
                )
              );
            }
          }
        })
        .catch((e) => console.warn('Background calendar meeting sync error:', e));
    }

    // Trigger WhatsApp notification log
    let waMessage = `Namaste ${params.buyerName}! 🙏\n\nYour payment of ₹${gstCalc.totalAmount} for *${params.itemTitle}* to ${creator.name} is confirmed!`;
    if (params.itemType === 'product') {
      waMessage += `\n\n📥 *Download Link:* https://creatoros.in/downloads/${params.itemId}\n📄 *GST Tax Invoice:* ${invoiceNum}`;
    } else if (params.itemType === 'booking') {
      waMessage += `\n\n🗓 *Slot:* ${params.bookingDate} at ${params.bookingTimeSlot}\n🔗 *Google Meet:* ${newAppointment?.meetUrl || 'https://meet.google.com/sample'}\n🌐 *Timezone:* Asia/Kolkata (IST UTC+05:30)`;
    } else if (params.itemType === 'course') {
      waMessage += `\n\n🎓 *Access Course:* https://creatoros.in/${creator.username}/course/${params.itemId}\nUse your phone ${params.buyerPhone} to sign in.`;
    }

    const newWaNotif: WhatsAppNotification = {
      id: `wa_${Date.now()}`,
      orderId: orderId,
      recipientPhone: params.buyerPhone,
      recipientName: params.buyerName,
      templateName:
        params.itemType === 'booking'
          ? 'booking_confirmed_meet'
          : params.itemType === 'course'
          ? 'course_enrolled_access'
          : 'order_receipt_download',
      messageContent: waMessage,
      sentAt: 'Just now',
      status: 'delivered',
      triggerEvent: `Instant UPI Checkout (${params.paymentApp || 'PhonePe'})`
    };

    setWhatsappLogs((prev) => {
      const next = [newWaNotif, ...prev];
      saveState(STORAGE_KEYS.WHATSAPP_LOGS, next);
      return next;
    });

    return { order: newOrder, appointment: newAppointment };
  };

  // Custom Invoice creation from GST dashboard
  const createInvoice = (params: {
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    buyerState: string;
    buyerGst?: string;
    billingAddress?: string;
    itemTitle: string;
    itemType?: ProductType;
    sacCode?: string;
    amount: number;
    gstRate?: number;
    status: 'Paid' | 'Pending' | 'Overdue';
    dueDate?: string;
    notes?: string;
    paymentMethod?: 'UPI' | 'Card' | 'Netbanking' | 'CRED';
  }) => {
    const creator = activeCreator;
    const gstRate = params.gstRate || 18;
    const gstCalc = calculateGST(params.amount, creator.state, params.buyerState, gstRate);
    const orderNum = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const orderId = `inv_${Date.now()}`;
    const invoiceNum = `INV-${new Date().getFullYear()}-${orderNum.slice(-5)}`;

    const isPaid = params.status === 'Paid';
    const isUPI = !params.paymentMethod || params.paymentMethod === 'UPI';
    const txnRef = isPaid
      ? isUPI
        ? `UPI-${Math.floor(100000000000 + Math.random() * 900000000000)}`
        : `RZP-PAY-${Math.floor(1000000000 + Math.random() * 9000000000)}`
      : undefined;

    let sac = params.sacCode || SAC_CODES.DIGITAL_PRODUCT.code;
    if (params.itemType === 'course') sac = SAC_CODES.COURSE.code;
    else if (params.itemType === 'booking') sac = SAC_CODES.BOOKING.code;

    const newOrder: Order = {
      id: orderId,
      orderNumber: orderNum,
      date: new Date().toISOString(),
      creatorId: creator.id,
      buyerName: params.buyerName,
      buyerEmail: params.buyerEmail,
      buyerPhone: params.buyerPhone,
      buyerGst: params.buyerGst,
      buyerState: params.buyerState,
      billingAddress: params.billingAddress,
      itemType: params.itemType || 'product',
      itemId: `custom_${Date.now()}`,
      itemTitle: params.itemTitle,
      amount: params.amount,
      gstRate: gstRate,
      cgst: gstCalc.cgst,
      sgst: gstCalc.sgst,
      igst: gstCalc.igst,
      totalAmount: gstCalc.totalAmount,
      paymentMethod: params.paymentMethod || 'UPI',
      paymentApp: isPaid ? 'PhonePe' : undefined,
      upiRefId: txnRef,
      invoiceNumber: invoiceNum,
      sacCode: sac,
      status: isPaid ? 'completed' : 'pending',
      paymentStatus: params.status,
      dueDate: params.dueDate,
      notes: params.notes,
      deliverySentWhatsapp: isPaid,
      deliverySentEmail: isPaid
    };

    setOrders((prev) => {
      const next = [newOrder, ...prev];
      saveState(STORAGE_KEYS.ORDERS, next);
      return next;
    });

    return newOrder;
  };

  const updateInvoiceStatus = (orderId: string, status: 'Paid' | 'Pending' | 'Overdue') => {
    setOrders((prev) => {
      const next = prev.map((o) => {
        if (o.id === orderId) {
          const isPaid = status === 'Paid';
          return {
            ...o,
            paymentStatus: status,
            status: (isPaid ? 'completed' : 'pending') as any,
            upiRefId: isPaid && !o.upiRefId ? `UPI-${Math.floor(100000000000 + Math.random() * 900000000000)}` : o.upiRefId
          };
        }
        return o;
      });
      saveState(STORAGE_KEYS.ORDERS, next);
      return next;
    });
  };

  const deleteInvoice = (orderId: string) => {
    setOrders((prev) => {
      const next = prev.filter((o) => o.id !== orderId);
      saveState(STORAGE_KEYS.ORDERS, next);
      return next;
    });
  };

  // Submit proposal to brand collab brief
  const applyToBrandBrief = (
    briefId: string,
    proposedAmount: number,
    pitch: string,
    deliverables: string[],
    timelineDays: number = 7,
    options?: {
      creativeHook?: string;
      scriptDraftDate?: string;
      contentGoLiveDate?: string;
      addons?: {
        whitelisting: boolean;
        rawFootage: boolean;
        exclusiveCategory: boolean;
      };
      mediaKitAttached?: boolean;
    }
  ) => {
    const brief = brandBriefs.find((b) => b.id === briefId);
    if (!brief) return;

    const gstAmount = Math.round(proposedAmount * 0.18);
    const netPayout = Math.round(proposedAmount * 0.99); // 1% TDS deduction under Sec 194J

    const proposal: BrandProposal = {
      id: `prop_${Date.now()}`,
      briefId,
      briefTitle: brief.title,
      brandName: brief.brandName,
      brandLogo: brief.brandLogo,
      creatorId: activeCreatorId,
      proposedAmount,
      gstAmount,
      netPayout,
      pitch,
      creativeHook: options?.creativeHook || (brief.sampleHooks && brief.sampleHooks[0]) || 'Authentic creator integration',
      deliverablesProposed: deliverables,
      timelineDays,
      scriptDraftDate: options?.scriptDraftDate || `${Math.max(1, Math.round(timelineDays * 0.4))} days from acceptance`,
      contentGoLiveDate: options?.contentGoLiveDate || `${timelineDays} days from acceptance`,
      addons: options?.addons || {
        whitelisting: false,
        rawFootage: false,
        exclusiveCategory: false
      },
      mediaKitAttached: options?.mediaKitAttached !== false,
      escrowStatus: 'awaiting_funding',
      escrowAmount: proposedAmount,
      status: 'submitted',
      statusTimeline: [
        {
          step: 'Proposal Submitted',
          timestamp: 'Just now',
          note: `Proposal of ₹${proposedAmount.toLocaleString('en-IN')} (+18% GST) submitted with AI Media Kit.`,
          isCompleted: true
        },
        {
          step: `Brand Review by ${brief.brandName}`,
          timestamp: 'In Progress',
          note: 'Brand marketing and influencer team is evaluating creative pitch.',
          isCompleted: false
        },
        {
          step: 'NPCI Escrow Funding',
          timestamp: 'Pending Acceptance',
          note: '100% funds will be locked into verified escrow upon brand sign-off.',
          isCompleted: false
        },
        {
          step: 'Draft Video / Script Submission',
          timestamp: 'Pending',
          note: 'Awaiting draft submission from creator.',
          isCompleted: false
        },
        {
          step: 'Approved & Live on Socials',
          timestamp: 'Pending',
          note: 'Content publishing with verified tracking links.',
          isCompleted: false
        },
        {
          step: '1-Click UPI Escrow Settlement',
          timestamp: 'Pending',
          note: 'Instant payout disbursement to creator bank account.',
          isCompleted: false
        }
      ],
      submittedAt: 'Just now'
    };

    setBrandProposals((prev) => {
      const next = [proposal, ...prev];
      saveState(STORAGE_KEYS.BRAND_PROPOSALS, next);
      return next;
    });

    // Increment applicants on brief
    setBrandBriefs((prev) => {
      const next = prev.map((b) => (b.id === briefId ? { ...b, applicantsCount: b.applicantsCount + 1 } : b));
      saveState(STORAGE_KEYS.BRAND_BRIEFS, next);
      return next;
    });

    return proposal;
  };

  // Update proposal status & pipeline stage (Simulate deal progression)
  const updateProposalStatus = (
    proposalId: string,
    newStatus: BrandProposal['status'],
    brandFeedback?: string
  ) => {
    setBrandProposals((prev) => {
      const next = prev.map((p) => {
        if (p.id !== proposalId) return p;

        let escrowStatus = p.escrowStatus || 'awaiting_funding';
        let upiRefId = p.upiRefId;
        let invoiceNumber = p.invoiceNumber;
        let invoiceGenerated = p.invoiceGenerated;

        if (newStatus === 'escrow_funded' || newStatus === 'draft_submitted' || newStatus === 'approved') {
          escrowStatus = 'escrow_locked';
        } else if (newStatus === 'completed') {
          escrowStatus = 'fully_released';
          upiRefId = upiRefId || `UPI-${Math.floor(100000000000 + Math.random() * 900000000000)}`;
          invoiceNumber = invoiceNumber || `INV-2026-BR-${Math.floor(1000 + Math.random() * 9000)}`;
          invoiceGenerated = true;
        }

        // Update status timeline
        const updatedTimeline = (p.statusTimeline || []).map((stepItem, idx) => {
          if (newStatus === 'shortlisted' && idx <= 1) return { ...stepItem, isCompleted: true };
          if (newStatus === 'escrow_funded' && idx <= 2) return { ...stepItem, isCompleted: true };
          if (newStatus === 'draft_submitted' && idx <= 3) return { ...stepItem, isCompleted: true };
          if (newStatus === 'approved' && idx <= 4) return { ...stepItem, isCompleted: true };
          if (newStatus === 'completed') return { ...stepItem, isCompleted: true };
          return stepItem;
        });

        return {
          ...p,
          status: newStatus,
          escrowStatus,
          upiRefId,
          invoiceNumber,
          invoiceGenerated,
          brandFeedback: brandFeedback !== undefined ? brandFeedback : p.brandFeedback,
          statusTimeline: updatedTimeline
        };
      });

      saveState(STORAGE_KEYS.BRAND_PROPOSALS, next);
      return next;
    });
  };

  // Submit deliverable link (Draft preview or live social link)
  const submitProposalDeliverable = (
    proposalId: string,
    deliverable: {
      title: string;
      url: string;
      platform: string;
      viewsCount?: string;
      engagement?: string;
    }
  ) => {
    setBrandProposals((prev) => {
      const next = prev.map((p) => {
        if (p.id !== proposalId) return p;

        const newLink = {
          ...deliverable,
          submittedAt: 'Just now'
        };

        const existingLinks = p.deliverableLinks || [];
        const isLive = deliverable.url.includes('instagram.com') || deliverable.url.includes('youtube.com');
        const nextStatus = isLive ? ('approved' as const) : ('draft_submitted' as const);

        return {
          ...p,
          status: nextStatus,
          deliverableLinks: [newLink, ...existingLinks]
        };
      });

      saveState(STORAGE_KEYS.BRAND_PROPOSALS, next);
      return next;
    });
  };

  // Community actions
  const activeCommunity = communities.find((c) => c.id === activeCommunityId) || communities[0] || INITIAL_COMMUNITIES[0];

  const switchActiveCommunity = (id: string) => {
    setActiveCommunityId(id);
    saveState(STORAGE_KEYS.ACTIVE_COMMUNITY_ID, id);
  };

  const createCommunity = (
    newComm: Omit<Community, 'id' | 'creatorId' | 'membersCount' | 'postsCount' | 'isJoined' | 'createdAt'>
  ) => {
    const id = `comm_${Date.now()}`;
    const comm: Community = {
      ...newComm,
      id,
      creatorId: activeCreatorId,
      membersCount: 1,
      postsCount: 0,
      isJoined: true,
      myRole: 'creator',
      createdAt: 'Just now'
    };

    setCommunities((prev) => {
      const next = [comm, ...prev];
      saveState(STORAGE_KEYS.COMMUNITIES, next);
      return next;
    });

    // Add creator as founder member
    const newMember: CommunityMember = {
      id: `member_${Date.now()}`,
      communityId: id,
      name: activeCreator.name,
      avatarUrl: activeCreator.avatarUrl,
      username: activeCreator.username,
      handle: `@${activeCreator.username}`,
      role: 'creator',
      roleBadge: 'Founder / Host',
      tierName: 'Creator Admin',
      joinedAt: 'Just now',
      reputationPoints: 1000,
      isOnline: true,
      bio: activeCreator.bio
    };

    setCommunityMembers((prev) => {
      const next = [newMember, ...prev];
      saveState(STORAGE_KEYS.COMMUNITY_MEMBERS, next);
      return next;
    });

    setActiveCommunityId(id);
    saveState(STORAGE_KEYS.ACTIVE_COMMUNITY_ID, id);

    return comm;
  };

  const joinCommunity = (communityId: string, tierId?: string) => {
    setCommunities((prev) => {
      const next = prev.map((c) => {
        const tiers = c.membershipTiers || c.tiers || [];
        const targetTier = tiers.find((t) => t.id === tierId) || tiers[0];
        const isPaid = targetTier && targetTier.type === 'paid';
        return {
          ...c,
          isJoined: true,
          membersCount: c.membersCount + (c.isJoined ? 0 : 1),
          myRole: isPaid ? ('vip' as const) : ('member' as const)
        };
      });
      saveState(STORAGE_KEYS.COMMUNITIES, next);
      return next;
    });

    // Add member record if not exists
    setCommunityMembers((prev) => {
      const exists = prev.some((m) => m.communityId === communityId && m.name === activeCreator.name);
      if (exists) return prev;

      const newMember: CommunityMember = {
        id: `member_${Date.now()}`,
        communityId,
        name: activeCreator.name,
        avatarUrl: activeCreator.avatarUrl,
        username: activeCreator.username,
        handle: `@${activeCreator.username}`,
        role: tierId && tierId.includes('paid') ? 'vip' : 'member',
        roleBadge: tierId && tierId.includes('paid') ? 'VIP Pro Member' : 'Community Member',
        tierName: tierId && tierId.includes('paid') ? 'VIP Inner Circle' : 'Free Community Access',
        joinedAt: 'Just now',
        reputationPoints: 50,
        isOnline: true,
        bio: activeCreator.bio
      };
      const next = [newMember, ...prev];
      saveState(STORAGE_KEYS.COMMUNITY_MEMBERS, next);
      return next;
    });
  };

  const leaveCommunity = (communityId: string) => {
    setCommunities((prev) => {
      const next = prev.map((c) => {
        if (c.id !== communityId) return c;
        return {
          ...c,
          isJoined: false,
          membersCount: Math.max(0, c.membersCount - 1),
          myRole: undefined
        };
      });
      saveState(STORAGE_KEYS.COMMUNITIES, next);
      return next;
    });

    setCommunityMembers((prev) => {
      const next = prev.filter((m) => !(m.communityId === communityId && m.name === activeCreator.name));
      saveState(STORAGE_KEYS.COMMUNITY_MEMBERS, next);
      return next;
    });
  };

  const createPost = (data: {
    title: string;
    content: string;
    channelId: string;
    tags?: string[];
    mediaUrl?: string;
    isAnnouncement?: boolean;
  }) => {
    const isFounder = activeCommunity?.creatorId === activeCreatorId;
    const newPost: CommunityPost = {
      id: `post_${Date.now()}`,
      communityId: activeCommunityId,
      channelId: data.channelId,
      title: data.title,
      content: data.content,
      author: activeCreator.name,
      authorAvatar: activeCreator.avatarUrl,
      authorRole: isFounder ? 'creator' : 'member',
      authorBadge: isFounder ? 'Host / Creator' : 'Member',
      createdAt: 'Just now',
      likes: 0,
      isLiked: false,
      commentsCount: 0,
      isPinned: !!data.isAnnouncement,
      isAnnouncement: !!data.isAnnouncement,
      isLocked: false,
      tags: data.tags || ['General'],
      mediaUrl: data.mediaUrl,
      comments: []
    };

    setCommunityPosts((prev) => {
      const next = [newPost, ...prev];
      saveState(STORAGE_KEYS.COMMUNITY_POSTS, next);
      return next;
    });

    setCommunities((prev) => {
      const next = prev.map((c) => {
        if (c.id !== activeCommunityId) return c;
        return { ...c, postsCount: c.postsCount + 1 };
      });
      saveState(STORAGE_KEYS.COMMUNITIES, next);
      return next;
    });

    return newPost;
  };

  const likePost = (postId: string) => {
    setCommunityPosts((prev) => {
      const next = prev.map((post) => {
        if (post.id !== postId) return post;
        const currentLikes = post.likes ?? post.likesCount ?? 0;
        const willLike = !(post.isLiked ?? post.hasLiked);
        return {
          ...post,
          isLiked: willLike,
          hasLiked: willLike,
          likes: willLike ? currentLikes + 1 : Math.max(0, currentLikes - 1),
          likesCount: willLike ? currentLikes + 1 : Math.max(0, currentLikes - 1)
        };
      });
      saveState(STORAGE_KEYS.COMMUNITY_POSTS, next);
      return next;
    });
  };

  const addComment = (postId: string, content: string) => {
    const isFounder = activeCommunity?.creatorId === activeCreatorId;
    const newComment: CommunityComment = {
      id: `comment_${Date.now()}`,
      author: activeCreator.name,
      authorAvatar: activeCreator.avatarUrl,
      authorRole: isFounder ? 'creator' : 'member',
      content,
      createdAt: 'Just now',
      likes: 0
    };

    setCommunityPosts((prev) => {
      const next = prev.map((post) => {
        if (post.id !== postId) return post;
        const currentComments = post.comments || [];
        return {
          ...post,
          commentsCount: post.commentsCount + 1,
          comments: [...currentComments, newComment]
        };
      });
      saveState(STORAGE_KEYS.COMMUNITY_POSTS, next);
      return next;
    });
  };

  const pinPost = (postId: string) => {
    setCommunityPosts((prev) => {
      const next = prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          isPinned: !post.isPinned
        };
      });
      saveState(STORAGE_KEYS.COMMUNITY_POSTS, next);
      return next;
    });
  };

  const lockPost = (postId: string) => {
    setCommunityPosts((prev) => {
      const next = prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          isLocked: !post.isLocked
        };
      });
      saveState(STORAGE_KEYS.COMMUNITY_POSTS, next);
      return next;
    });
  };

  const deletePost = (postId: string) => {
    setCommunityPosts((prev) => {
      const next = prev.filter((post) => post.id !== postId);
      saveState(STORAGE_KEYS.COMMUNITY_POSTS, next);
      return next;
    });

    setCommunities((prev) => {
      const next = prev.map((c) => {
        if (c.id !== activeCommunityId) return c;
        return { ...c, postsCount: Math.max(0, c.postsCount - 1) };
      });
      saveState(STORAGE_KEYS.COMMUNITIES, next);
      return next;
    });
  };

  const moderateMember = (
    memberId: string,
    action: 'ban' | 'promote_mod' | 'demote_member' | 'promote_vip'
  ) => {
    setCommunityMembers((prev) => {
      if (action === 'ban') {
        const next = prev.filter((m) => m.id !== memberId);
        saveState(STORAGE_KEYS.COMMUNITY_MEMBERS, next);
        return next;
      }

      const next = prev.map((m) => {
        if (m.id !== memberId) return m;
        if (action === 'promote_mod') {
          return { ...m, role: 'moderator' as const, roleBadge: 'Community Moderator' };
        }
        if (action === 'promote_vip') {
          return { ...m, role: 'vip' as const, roleBadge: 'VIP Pro Member' };
        }
        if (action === 'demote_member') {
          return { ...m, role: 'member' as const, roleBadge: 'Community Member' };
        }
        return m;
      });

      saveState(STORAGE_KEYS.COMMUNITY_MEMBERS, next);
      return next;
    });
  };

  // AI Media Kit regenerate / update
  const updateMediaKit = (updated: Partial<MediaKitData>) => {
    setMediaKit((prev) => {
      const next = { ...prev, ...updated };
      saveState(STORAGE_KEYS.MEDIA_KIT, next);
      return next;
    });
  };

  // ============================================================================
  // MEMBERSHIP SUBSCRIPTION SYSTEM ACTIONS & METRICS
  // ============================================================================

  const createSubscriptionPlan = (
    newPlan: Omit<SubscriptionPlan, 'id' | 'creatorId' | 'createdAt' | 'updatedAt' | 'memberCount'>
  ) => {
    const id = `plan_${Date.now()}`;
    const now = new Date().toISOString().split('T')[0];
    const plan: SubscriptionPlan = {
      ...newPlan,
      id,
      creatorId: activeCreatorId,
      memberCount: 0,
      createdAt: now,
      updatedAt: now
    };

    setSubscriptionPlans((prev) => {
      const next = [plan, ...prev];
      saveState(STORAGE_KEYS.SUBSCRIPTION_PLANS, next);
      return next;
    });

    // Async create in PostgreSQL API
    try {
      fetch('/api/subscriptions/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newPlan,
          creatorId: activeCreatorId,
          price: newPlan.monthlyPrice || newPlan.yearlyPrice || 0,
          billing_cycle: newPlan.monthlyPrice ? 'monthly' : 'yearly',
          cover_image: newPlan.coverUrl,
          benefits: newPlan.benefits,
          is_popular: newPlan.isPopular
        })
      }).catch((e) => console.warn('Background PostgreSQL plan sync:', e));
    } catch (e) {
      console.warn('API error:', e);
    }

    return plan;
  };

  const updateSubscriptionPlan = (id: string, updates: Partial<SubscriptionPlan>) => {
    setSubscriptionPlans((prev) => {
      const next = prev.map((p) => {
        if (p.id !== id) return p;
        return {
          ...p,
          ...updates,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      });
      saveState(STORAGE_KEYS.SUBSCRIPTION_PLANS, next);
      return next;
    });

    // Async update in PostgreSQL API
    try {
      fetch(`/api/subscriptions/plans/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...updates,
          price: updates.monthlyPrice !== undefined ? updates.monthlyPrice : updates.yearlyPrice,
          cover_image: updates.coverUrl,
          is_popular: updates.isPopular
        })
      }).catch((e) => console.warn('Background PostgreSQL plan update sync:', e));
    } catch (e) {
      console.warn('API error:', e);
    }
  };

  const deleteSubscriptionPlan = (id: string) => {
    setSubscriptionPlans((prev) => {
      const next = prev.filter((p) => p.id !== id);
      saveState(STORAGE_KEYS.SUBSCRIPTION_PLANS, next);
      return next;
    });

    // Async delete in PostgreSQL API
    try {
      fetch(`/api/subscriptions/plans/${id}`, {
        method: 'DELETE'
      }).catch((e) => console.warn('Background PostgreSQL plan delete sync:', e));
    } catch (e) {
      console.warn('API error:', e);
    }
  };

  const subscribeToPlan = (params: {
    planId: string;
    billingCycle: 'monthly' | 'yearly';
    subscriberName: string;
    subscriberEmail: string;
    subscriberPhone?: string;
    paymentMethod?: 'UPI' | 'Card' | 'Netbanking' | 'Razorpay Autopay';
    razorpayPaymentId?: string;
    razorpaySubscriptionId?: string;
  }) => {
    const plan = subscriptionPlans.find((p) => p.id === params.planId) || subscriptionPlans[0];
    const amount = params.billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;

    const now = new Date();
    const currentStart = now.toISOString().split('T')[0];
    const daysToAdd = params.billingCycle === 'yearly' ? 365 : 30;
    const endDate = new Date(now.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
    const currentEnd = endDate.toISOString().split('T')[0];

    const rzpPayId = params.razorpayPaymentId || `pay_rzp_${Math.floor(100000000 + Math.random() * 900000000)}`;
    const rzpSubId = params.razorpaySubscriptionId || `sub_rzp_${Math.floor(100000000 + Math.random() * 900000000)}`;

    const newSub: Subscription = {
      id: `sub_${Date.now()}`,
      creatorId: activeCreatorId,
      planId: plan.id,
      planName: plan.name,
      planType: plan.type,
      userId: `user_${Date.now()}`,
      userName: params.subscriberName,
      userEmail: params.subscriberEmail,
      userPhone: params.subscriberPhone || '+91 98000 00000',
      userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      billingCycle: params.billingCycle,
      amount,
      status: 'active',
      razorpaySubscriptionId: rzpSubId,
      razorpayPaymentId: rzpPayId,
      currentPeriodStart: currentStart,
      currentPeriodEnd: currentEnd,
      cancelAtPeriodEnd: false,
      createdAt: 'Just now',
      updatedAt: 'Just now'
    };

    setSubscriptions((prev) => {
      const next = [newSub, ...prev];
      saveState(STORAGE_KEYS.SUBSCRIPTIONS, next);
      return next;
    });

    // Update memberCount in plan
    setSubscriptionPlans((prev) => {
      const next = prev.map((p) => {
        if (p.id !== plan.id) return p;
        return { ...p, memberCount: p.memberCount + 1 };
      });
      saveState(STORAGE_KEYS.SUBSCRIPTION_PLANS, next);
      return next;
    });

    // Create payment receipt
    if (amount > 0) {
      const invoiceNumber = `INV-SUB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newPay: SubscriptionPayment = {
        id: `spay_${Date.now()}`,
        subscriptionId: newSub.id,
        creatorId: activeCreatorId,
        planName: plan.name,
        subscriberName: params.subscriberName,
        subscriberEmail: params.subscriberEmail,
        amount,
        currency: 'INR',
        status: 'paid',
        paymentMethod: params.paymentMethod || 'Razorpay Autopay',
        razorpayPaymentId: rzpPayId,
        razorpayInvoiceId: `inv_${rzpPayId.slice(-8)}`,
        invoiceNumber,
        billingCycle: params.billingCycle,
        createdAt: 'Just now'
      };

      setSubscriptionPayments((prev) => {
        const next = [newPay, ...prev];
        saveState(STORAGE_KEYS.SUBSCRIPTION_PAYMENTS, next);
        return next;
      });

      // Async record payment in PostgreSQL API
      try {
        fetch('/api/subscriptions/payments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subscription_id: newSub.id,
            amount,
            payment_status: 'success',
            payment_method: params.paymentMethod || 'UPI',
            transaction_id: rzpPayId,
            creatorId: activeCreatorId,
            planName: plan.name,
            subscriberName: params.subscriberName,
            subscriberEmail: params.subscriberEmail,
            billingCycle: params.billingCycle
          })
        }).catch((e) => console.warn('Background PostgreSQL payment sync:', e));
      } catch (e) {
        console.warn('API error:', e);
      }
    }

    // Async record subscription in PostgreSQL API
    try {
      fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: newSub.userId,
          plan_id: newSub.planId,
          status: 'active',
          start_date: currentStart,
          renewal_date: currentEnd,
          razorpay_subscription_id: rzpSubId,
          creatorId: activeCreatorId,
          planName: plan.name,
          amount,
          billingCycle: params.billingCycle,
          userName: params.subscriberName,
          userEmail: params.subscriberEmail,
          userPhone: params.subscriberPhone
        })
      }).catch((e) => console.warn('Background PostgreSQL sub sync:', e));
    } catch (e) {
      console.warn('API error:', e);
    }

    return newSub;
  };

  const cancelSubscription = (subscriptionId: string, immediate: boolean = false) => {
    const targetSub = subscriptions.find((s) => s.id === subscriptionId);

    setSubscriptions((prev) => {
      const next = prev.map((s) => {
        if (s.id !== subscriptionId) return s;
        return {
          ...s,
          status: immediate ? ('cancelled' as const) : s.status,
          cancelAtPeriodEnd: !immediate,
          updatedAt: 'Just now'
        };
      });
      saveState(STORAGE_KEYS.SUBSCRIPTIONS, next);
      return next;
    });

    // Auto-update member count if cancelled immediately
    if (immediate && targetSub) {
      setSubscriptionPlans((prev) => {
        const next = prev.map((p) => {
          if (p.id !== targetSub.planId) return p;
          return { ...p, memberCount: Math.max(0, p.memberCount - 1) };
        });
        saveState(STORAGE_KEYS.SUBSCRIPTION_PLANS, next);
        return next;
      });
    }

    // Async cancel in PostgreSQL API & Razorpay
    try {
      fetch('/api/subscriptions/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId, cancelAtPeriodEnd: !immediate })
      }).catch((e) => console.warn('Background PostgreSQL cancel sync:', e));
    } catch (e) {
      console.warn('API error:', e);
    }
  };

  const changeSubscriptionPlan = (
    subscriptionId: string,
    newPlanId: string,
    newBillingCycle: 'monthly' | 'yearly' = 'monthly'
  ) => {
    const targetSub = subscriptions.find((s) => s.id === subscriptionId);
    const newPlan = subscriptionPlans.find((p) => p.id === newPlanId);
    if (!newPlan) return;

    const oldPlanId = targetSub?.planId;
    const newAmount = newBillingCycle === 'yearly' ? newPlan.yearlyPrice : newPlan.monthlyPrice;

    setSubscriptions((prev) => {
      const next = prev.map((s) => {
        if (s.id !== subscriptionId) return s;
        return {
          ...s,
          planId: newPlan.id,
          planName: newPlan.name,
          planType: newPlan.type,
          amount: newAmount,
          billingCycle: newBillingCycle,
          status: 'active' as const,
          updatedAt: 'Just now'
        };
      });
      saveState(STORAGE_KEYS.SUBSCRIPTIONS, next);
      return next;
    });

    // Automatically update member counts across old and new plans
    if (oldPlanId && oldPlanId !== newPlanId) {
      setSubscriptionPlans((prev) => {
        const next = prev.map((p) => {
          if (p.id === oldPlanId) return { ...p, memberCount: Math.max(0, p.memberCount - 1) };
          if (p.id === newPlanId) return { ...p, memberCount: p.memberCount + 1 };
          return p;
        });
        saveState(STORAGE_KEYS.SUBSCRIPTION_PLANS, next);
        return next;
      });
    }

    // Automatically generate GST Tax Invoice for upgraded plan
    if (newAmount > 0 && targetSub) {
      const invoiceNumber = `INV-SUB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const upgradePay: SubscriptionPayment = {
        id: `spay_${Date.now()}`,
        subscriptionId,
        creatorId: activeCreatorId,
        planName: newPlan.name,
        subscriberName: targetSub.userName,
        subscriberEmail: targetSub.userEmail,
        amount: newAmount,
        currency: 'INR',
        status: 'paid',
        paymentMethod: 'Razorpay Autopay',
        razorpayPaymentId: `pay_upg_${Math.floor(10000000 + Math.random() * 90000000)}`,
        invoiceNumber,
        billingCycle: newBillingCycle,
        createdAt: 'Just now'
      };

      setSubscriptionPayments((prev) => {
        const next = [upgradePay, ...prev];
        saveState(STORAGE_KEYS.SUBSCRIPTION_PAYMENTS, next);
        return next;
      });

      try {
        fetch('/api/subscriptions/payments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subscription_id: subscriptionId,
            amount: newAmount,
            payment_status: 'success',
            payment_method: 'UPI',
            transaction_id: upgradePay.razorpayPaymentId,
            creatorId: activeCreatorId,
            planName: newPlan.name,
            subscriberName: targetSub.userName,
            subscriberEmail: targetSub.userEmail,
            billingCycle: newBillingCycle
          })
        }).catch((e) => console.warn('Background payment sync:', e));
      } catch (e) {
        console.warn('API error:', e);
      }
    }

    // Async upgrade/downgrade in PostgreSQL API & Razorpay
    try {
      fetch('/api/subscriptions/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subscriptionId, newPlanId, newBillingCycle })
      }).catch((e) => console.warn('Background PostgreSQL plan change sync:', e));
    } catch (e) {
      console.warn('API error:', e);
    }
  };

  const renewSubscription = (subscriptionId: string) => {
    const targetSub = subscriptions.find((s) => s.id === subscriptionId);
    if (!targetSub) return;

    const now = new Date();
    const currentStart = now.toISOString().split('T')[0];
    const days = targetSub.billingCycle === 'yearly' ? 365 : 30;
    const endDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
    const currentEnd = endDate.toISOString().split('T')[0];

    setSubscriptions((prev) => {
      const next = prev.map((s) => {
        if (s.id !== subscriptionId) return s;
        return {
          ...s,
          status: 'active' as const,
          currentPeriodStart: currentStart,
          currentPeriodEnd: currentEnd,
          cancelAtPeriodEnd: false,
          updatedAt: 'Just now'
        };
      });
      saveState(STORAGE_KEYS.SUBSCRIPTIONS, next);
      return next;
    });

    if (targetSub.amount > 0) {
      const invoiceNumber = `INV-SUB-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const renewalPay: SubscriptionPayment = {
        id: `spay_${Date.now()}`,
        subscriptionId,
        creatorId: activeCreatorId,
        planName: targetSub.planName,
        subscriberName: targetSub.userName,
        subscriberEmail: targetSub.userEmail,
        amount: targetSub.amount,
        currency: 'INR',
        status: 'paid',
        paymentMethod: 'Razorpay Autopay',
        razorpayPaymentId: `pay_rnw_${Math.floor(10000000 + Math.random() * 90000000)}`,
        invoiceNumber,
        billingCycle: targetSub.billingCycle,
        createdAt: 'Just now'
      };

      setSubscriptionPayments((prev) => {
        const next = [renewalPay, ...prev];
        saveState(STORAGE_KEYS.SUBSCRIPTION_PAYMENTS, next);
        return next;
      });

      try {
        fetch('/api/subscriptions/payments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            subscription_id: subscriptionId,
            amount: targetSub.amount,
            payment_status: 'success',
            payment_method: 'UPI',
            transaction_id: renewalPay.razorpayPaymentId,
            creatorId: activeCreatorId,
            planName: targetSub.planName,
            subscriberName: targetSub.userName,
            subscriberEmail: targetSub.userEmail,
            billingCycle: targetSub.billingCycle
          })
        }).catch((e) => console.warn('Background payment sync:', e));
      } catch (e) {
        console.warn('API error:', e);
      }
    }
  };

  // Compute live creator MRR, ARR, Active Subscribers metrics
  const activeSubsForCreator = subscriptions.filter(
    (s) => s.creatorId === activeCreatorId && s.status === 'active'
  );

  const calculatedMRR = activeSubsForCreator.reduce((acc, sub) => {
    if (sub.planType === 'free') return acc;
    const monthlyVal = sub.billingCycle === 'yearly' ? Math.round(sub.amount / 12) : sub.amount;
    return acc + monthlyVal;
  }, 0);

  const membershipMetrics: MembershipMetrics = {
    mrr: calculatedMRR,
    arr: calculatedMRR * 12,
    activeSubscribers: activeSubsForCreator.length,
    churnRate: 1.8,
    arpu: activeSubsForCreator.length > 0 ? Math.round(calculatedMRR / activeSubsForCreator.length) : 0,
    newThisMonth: activeSubsForCreator.filter((s) => s.createdAt.includes('2026') || s.createdAt.includes('Just now')).length,
    growthPercentage: 18.4
  };

  // Google Calendar Integration actions with OAuth & 2-way sync
  const connectGoogleCalendar = (accountEmail: string = 'aarav.sharma@gmail.com') => {
    const updated: GoogleCalendarIntegration = {
      ...googleCalendar,
      accountEmail,
      isConnected: true,
      syncStatus: 'synced',
      lastSyncedAt: 'Just now'
    };
    setGoogleCalendar(updated);
    saveState(STORAGE_KEYS.GOOGLE_CALENDAR, updated);

    fetch('/api/calendar/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        creatorId: activeCreatorId,
        accountEmail,
        isConnected: true,
        syncStatus: 'synced'
      })
    }).catch((e) => console.warn('Background GCal connect sync:', e));
  };

  const syncGoogleCalendar = async () => {
    setGoogleCalendar((prev) => ({ ...prev, syncStatus: 'syncing' }));

    try {
      const res = await fetch('/api/calendar/google/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creatorId: activeCreatorId })
      });
      const data = await res.json();
      if (data.success && data.data) {
        const updated: GoogleCalendarIntegration = {
          ...googleCalendar,
          ...data.data.integration,
          syncStatus: 'synced',
          lastSyncedAt: data.data.lastSyncedAt || 'Just now'
        };
        setGoogleCalendar(updated);
        saveState(STORAGE_KEYS.GOOGLE_CALENDAR, updated);
      } else {
        setGoogleCalendar((prev) => ({ ...prev, syncStatus: 'synced', lastSyncedAt: 'Just now' }));
      }
    } catch (e) {
      console.warn('Google Calendar sync error:', e);
      setGoogleCalendar((prev) => ({ ...prev, syncStatus: 'synced', lastSyncedAt: 'Just now' }));
    }
  };

  const disconnectGoogleCalendar = () => {
    const updated: GoogleCalendarIntegration = {
      ...googleCalendar,
      isConnected: false,
      syncStatus: 'disconnected',
      lastSyncedAt: 'Never',
      accessToken: undefined,
      refreshToken: undefined
    };
    setGoogleCalendar(updated);
    saveState(STORAGE_KEYS.GOOGLE_CALENDAR, updated);

    fetch('/api/calendar/google/disconnect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        creatorId: activeCreatorId
      })
    }).catch((e) => console.warn('Background GCal disconnect sync:', e));
  };

  const updateWeeklyAvailability = (newAvailability: DayAvailability[], newBuffer?: number) => {
    setWeeklyAvailability(newAvailability);
    saveState(STORAGE_KEYS.WEEKLY_AVAILABILITY, newAvailability);

    const bufferToUse = newBuffer !== undefined ? newBuffer : bufferMinutes;
    if (newBuffer !== undefined) {
      setBufferMinutes(newBuffer);
      saveState(STORAGE_KEYS.BUFFER_MINUTES, newBuffer);
    }

    fetch('/api/calendar/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        creatorId: activeCreatorId,
        availability: newAvailability,
        bufferMinutes: bufferToUse
      })
    }).catch((e) => console.warn('Background availability sync:', e));
  };

  const updateBufferMinutes = (buffer: number) => {
    setBufferMinutes(buffer);
    saveState(STORAGE_KEYS.BUFFER_MINUTES, buffer);

    fetch('/api/calendar/availability', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        creatorId: activeCreatorId,
        availability: weeklyAvailability,
        bufferMinutes: buffer
      })
    }).catch((e) => console.warn('Background buffer sync:', e));
  };

  const createCalendarMeeting = (meeting: Omit<CalendarMeeting, 'id' | 'createdAt' | 'creatorId'> & { creatorId?: string }) => {
    const id = `meet_${Date.now()}`;
    const newMeeting: CalendarMeeting = {
      ...meeting,
      id,
      creatorId: meeting.creatorId || activeCreatorId,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCalendarMeetings((prev) => {
      const next = [newMeeting, ...prev];
      saveState(STORAGE_KEYS.CALENDAR_MEETINGS, next);
      return next;
    });

    fetch('/api/calendar/meetings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newMeeting
      })
    }).catch((e) => console.warn('Background meeting create sync:', e));

    return newMeeting;
  };

  const updateMeetingStatus = (meetingId: string, status: MeetingStatus) => {
    setCalendarMeetings((prev) => {
      const next = prev.map((m) => (m.id === meetingId ? { ...m, meetingStatus: status } : m));
      saveState(STORAGE_KEYS.CALENDAR_MEETINGS, next);
      return next;
    });

    fetch('/api/calendar/meetings', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: meetingId,
        status
      })
    }).catch((e) => console.warn('Background meeting status sync:', e));
  };

  const isSlotBooked = (date: string, timeSlot: string, creatorIdToMatch?: string): boolean => {
    const targetCreator = creatorIdToMatch || activeCreatorId;
    const isDateMatch = (d1: string, d2: string) => {
      if (!d1 || !d2) return false;
      const s1 = d1.toLowerCase().trim();
      const s2 = d2.toLowerCase().trim();
      if (s1 === s2) return true;
      if (s1.includes(s2) || s2.includes(s1)) return true;
      return false;
    };

    const isSlotMatch = (s1: string, s2: string) => {
      if (!s1 || !s2) return false;
      const t1 = s1.toLowerCase().trim();
      const t2 = s2.toLowerCase().trim();
      if (t1 === t2) return true;
      if (t1.includes(t2) || t2.includes(t1)) return true;
      return false;
    };

    const hasAppointment = appointments.some(
      (a) =>
        (a.creatorId === targetCreator || targetCreator === 'all') &&
        isDateMatch(a.date, date) &&
        isSlotMatch(a.timeSlot, timeSlot) &&
        a.status !== 'cancelled'
    );

    const hasMeeting = calendarMeetings.some(
      (m) =>
        (m.creatorId === targetCreator || targetCreator === 'all') &&
        isDateMatch(m.meetingDate, date) &&
        isSlotMatch(m.meetingTime, timeSlot) &&
        m.meetingStatus !== 'cancelled'
    );

    return hasAppointment || hasMeeting;
  };

  // Reset demo data
  const resetDemoData = () => {
    setCreators(INITIAL_CREATORS);
    setProducts(INITIAL_PRODUCTS);
    setCourses(INITIAL_COURSES);
    setBookingServices(INITIAL_BOOKINGS);
    setOrders(INITIAL_ORDERS);
    setWhatsappLogs(INITIAL_WHATSAPP_NOTIFS);
    setBrandBriefs(INITIAL_BRAND_BRIEFS);
    setBrandProposals(INITIAL_BRAND_PROPOSALS);
    setMediaKit(INITIAL_MEDIA_KIT);
    setCommunities(INITIAL_COMMUNITIES);
    setActiveCommunityId('comm_tech_faang');
    setCommunityPosts(INITIAL_COMMUNITY_POSTS);
    setCommunityMembers(INITIAL_COMMUNITY_MEMBERS);
    setSubscriptionPlans(INITIAL_SUBSCRIPTION_PLANS);
    setSubscriptions(INITIAL_SUBSCRIPTIONS);
    setSubscriptionPayments(INITIAL_SUBSCRIPTION_PAYMENTS);
    setGoogleCalendar(INITIAL_GOOGLE_CALENDAR);
    setWeeklyAvailability(INITIAL_WEEKLY_AVAILABILITY);
    setBufferMinutes(15);
    setCalendarMeetings(INITIAL_CALENDAR_MEETINGS);
    setAppointments([]);
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  };

  return {
    isLoaded,
    creators,
    activeCreator,
    activeCreatorId,
    activeTheme,
    products: products.filter((p) => p.creatorId === activeCreatorId),
    allProducts: products,
    courses: courses.filter((c) => c.creatorId === activeCreatorId),
    allCourses: courses,
    bookingServices: bookingServices.filter((b) => b.creatorId === activeCreatorId),
    allBookingServices: bookingServices,
    appointments: appointments.filter((a) => a.creatorId === activeCreatorId),
    orders: orders.filter((o) => o.creatorId === activeCreatorId),
    allOrders: orders,
    whatsappLogs,
    brandBriefs,
    brandProposals,
    mediaKit,
    themes: THEMES,
    // Community state
    communities,
    activeCommunity,
    activeCommunityId,
    communityPosts: communityPosts.filter((p) => p.communityId === activeCommunityId),
    allCommunityPosts: communityPosts,
    communityMembers: communityMembers.filter((m) => m.communityId === activeCommunityId),
    allCommunityMembers: communityMembers,
    // Membership Subscriptions state & metrics
    subscriptionPlans: subscriptionPlans.filter((p) => p.creatorId === activeCreatorId),
    allSubscriptionPlans: subscriptionPlans,
    subscriptions: subscriptions.filter((s) => s.creatorId === activeCreatorId),
    allSubscriptions: subscriptions,
    subscriptionPayments: subscriptionPayments.filter((p) => p.creatorId === activeCreatorId),
    allSubscriptionPayments: subscriptionPayments,
    membershipMetrics,
    // Calendar State
    googleCalendar,
    weeklyAvailability,
    bufferMinutes,
    calendarMeetings: calendarMeetings.filter((m) => m.creatorId === activeCreatorId || activeCreatorId === 'all'),
    allCalendarMeetings: calendarMeetings,
    // Actions
    updateCreator,
    switchActiveCreator,
    addProduct,
    deleteProduct,
    addCourse,
    addBookingService,
    processCheckout,
    createInvoice,
    updateInvoiceStatus,
    deleteInvoice,
    applyToBrandBrief,
    updateProposalStatus,
    submitProposalDeliverable,
    updateMediaKit,
    resetDemoData,
    // Community Actions
    switchActiveCommunity,
    createCommunity,
    joinCommunity,
    leaveCommunity,
    createPost,
    likePost,
    addComment,
    pinPost,
    lockPost,
    deletePost,
    moderateMember,
    // Membership Subscription Actions
    createSubscriptionPlan,
    updateSubscriptionPlan,
    deleteSubscriptionPlan,
    subscribeToPlan,
    cancelSubscription,
    changeSubscriptionPlan,
    renewSubscription,
    // Calendar Actions
    connectGoogleCalendar,
    syncGoogleCalendar,
    disconnectGoogleCalendar,
    updateWeeklyAvailability,
    updateBufferMinutes,
    createCalendarMeeting,
    updateMeetingStatus,
    isSlotBooked
  };
}
