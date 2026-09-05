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
  CommunityTier
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
  COMMUNITY_MEMBERS: 'creatoros_community_members'
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
    } catch (e) {
      console.warn('LocalStorage error or not available', e);
    } finally {
      setIsLoaded(true);
    }
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

    // Create appointment if booking
    let newAppointment: BookingAppointment | undefined;
    if (params.itemType === 'booking' && params.bookingDate && params.bookingTimeSlot) {
      newAppointment = {
        id: `apt_${Date.now()}`,
        serviceId: params.itemId,
        creatorId: creator.id,
        serviceTitle: params.itemTitle,
        buyerName: params.buyerName,
        buyerEmail: params.buyerEmail,
        buyerPhone: params.buyerPhone,
        date: params.bookingDate,
        timeSlot: params.bookingTimeSlot,
        meetUrl: `https://meet.google.com/${Math.random().toString(36).substring(2, 5)}-${Math.random().toString(36).substring(2, 6)}-${Math.random().toString(36).substring(2, 5)}`,
        status: 'confirmed',
        amountPaid: gstCalc.totalAmount,
        orderId: orderId,
        createdAt: new Date().toISOString()
      };
      setAppointments((prev) => {
        const next = [newAppointment!, ...prev];
        saveState(STORAGE_KEYS.APPOINTMENTS, next);
        return next;
      });
    }

    // Trigger WhatsApp notification log
    let waMessage = `Namaste ${params.buyerName}! 🙏\n\nYour payment of ₹${gstCalc.totalAmount} for *${params.itemTitle}* to ${creator.name} is confirmed!`;
    if (params.itemType === 'product') {
      waMessage += `\n\n📥 *Download Link:* https://creatoros.in/downloads/${params.itemId}\n📄 *GST Tax Invoice:* ${invoiceNum}`;
    } else if (params.itemType === 'booking') {
      waMessage += `\n\n🗓 *Slot:* ${params.bookingDate} at ${params.bookingTimeSlot}\n🔗 *Google Meet:* ${newAppointment?.meetUrl || 'https://meet.google.com/sample'}`;
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
    moderateMember
  };
}
