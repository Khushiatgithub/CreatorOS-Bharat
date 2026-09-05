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
  ProductType
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
  MEDIA_KIT: 'creatoros_media_kit'
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
    resetDemoData
  };
}
