export type ProductType = 'product' | 'course' | 'booking' | 'membership' | 'tip';

export interface CreatorSocials {
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  twitter?: string;
  telegram?: string;
  github?: string;
  whatsapp?: string;
}

export interface StoreTheme {
  id: string;
  name: string;
  bgGradient: string;
  cardBg: string;
  textPrimary: string;
  textSecondary: string;
  accentColor: string;
  accentGlow: string;
  badgeBg: string;
  badgeText: string;
  borderStyle: string;
}

export interface Creator {
  id: string;
  username: string;
  name: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  bannerUrl?: string;
  verified: boolean;
  category: string;
  location: string;
  socials: CreatorSocials;
  themeId: string;
  upiId: string;
  upiName: string;
  gstNumber?: string;
  state: string; // Indian state e.g. "Karnataka", "Maharashtra", "Delhi"
  bankAccount: {
    accountNumberMasked: string;
    ifsc: string;
    bankName: string;
  };
  customLinks?: {
    id: string;
    title: string;
    url: string;
    icon?: string;
    highlight?: boolean;
  }[];
}

export interface DigitalProduct {
  id: string;
  creatorId: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  price: number;
  originalPrice: number;
  category: string;
  fileType: 'PDF' | 'ZIP' | 'NOTION' | 'CODE' | 'TEMPLATE';
  fileSizeBytes?: string;
  downloadUrl: string;
  features: string[];
  salesCount: number;
  rating: number;
  reviewsCount: number;
  isPayWhatYouWant?: boolean;
  minPrice?: number;
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  isFreePreview: boolean;
  notes?: string;
  resources?: { name: string; url: string; size: string }[];
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  creatorId: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  price: number;
  originalPrice: number;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  totalDuration: string;
  modules: CourseModule[];
  features: string[];
  studentCount: number;
  rating: number;
  reviewsCount: number;
  certificateOffered: boolean;
}

export interface BookingService {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  coverImage: string;
  price: number;
  originalPrice?: number;
  durationMinutes: number;
  sessionType: '1:1 Video Mentorship' | 'Portfolio / Resume Review' | 'Mock Tech Interview' | 'Brand Strategy Call';
  platform: 'Google Meet' | 'Zoom';
  availableDays: ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun')[];
  timeSlots: string[]; // e.g. ["06:00 PM", "07:00 PM", "08:30 PM"]
  bufferMinutes: number;
  bookingsCompleted: number;
  rating: number;
}

export interface BookingAppointment {
  id: string;
  serviceId: string;
  creatorId: string;
  serviceTitle: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  date: string;
  timeSlot: string;
  meetUrl: string;
  status: 'confirmed' | 'rescheduled' | 'completed' | 'cancelled';
  notes?: string;
  amountPaid: number;
  orderId: string;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  creatorId: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  buyerGst?: string;
  buyerState: string;
  itemType: ProductType;
  itemId: string;
  itemTitle: string;
  amount: number;
  gstRate: number; // 18% standard for digital services
  cgst: number;
  sgst: number;
  igst: number;
  totalAmount: number;
  paymentMethod: 'UPI' | 'Card' | 'Netbanking' | 'CRED';
  paymentApp?: 'PhonePe' | 'GPay' | 'Paytm' | 'CRED' | 'BHIM';
  upiRefId?: string;
  invoiceNumber: string;
  sacCode: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  bookingDate?: string;
  bookingTimeSlot?: string;
  deliverySentWhatsapp: boolean;
  deliverySentEmail: boolean;
}

export interface WhatsAppNotification {
  id: string;
  orderId: string;
  recipientPhone: string;
  recipientName: string;
  templateName: 'order_receipt_download' | 'course_enrolled_access' | 'booking_confirmed_meet' | 'abandoned_cart_nudge';
  messageContent: string;
  sentAt: string;
  status: 'delivered' | 'read' | 'failed';
  triggerEvent: string;
}

export interface BrandCollabBrief {
  id: string;
  brandName: string;
  brandLogo: string;
  industry: string;
  category?: string;
  matchScore?: number;
  title: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
  targetNiches: string[];
  deliverables: string[];
  deadline: string;
  applicantsCount: number;
  verifiedBrand: boolean;
  status: 'open' | 'shortlisting' | 'filled';
}

export interface BrandProposal {
  id: string;
  briefId: string;
  briefTitle: string;
  brandName: string;
  creatorId: string;
  proposedAmount: number;
  pitch: string;
  deliverablesProposed: string[];
  timelineDays: number;
  status: 'submitted' | 'shortlisted' | 'accepted' | 'declined';
  submittedAt: string;
}

export interface MediaKitData {
  creatorId: string;
  monthlyReach: string;
  engagementRate: string;
  instagramFollowers: string;
  youtubeSubscribers: string;
  linkedinFollowers: string;
  avgReelViews: string;
  avgYoutubeViews: string;
  audienceDemographics: {
    topCities: { city: string; percentage: number }[];
    genderSplit: { male: number; female: number; other: number };
    ageSplit: { group: string; percentage: number }[];
  };
  suggestedRates: {
    instagramReel: number;
    instagramStory: number;
    youtubeIntegration: number;
    dedicatedYoutube: number;
    linkedinPost: number;
  };
  previousSponsors: { name: string; logoText: string }[];
}

export interface GSTInvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  placeOfSupply: string;
  sacCode: string;
  creator: {
    name: string;
    businessName: string;
    address: string;
    state: string;
    stateCode: string;
    gstin?: string;
    pan?: string;
  };
  buyer: {
    name: string;
    email: string;
    phone: string;
    state: string;
    stateCode: string;
    gstin?: string;
  };
  items: {
    description: string;
    sacCode: string;
    quantity: number;
    unitPrice: number;
    taxableValue: number;
  }[];
  isInterState: boolean;
  taxableTotal: number;
  cgstRate: number;
  cgstAmount: number;
  sgstRate: number;
  sgstAmount: number;
  igstRate: number;
  igstAmount: number;
  totalInvoiceValue: number;
  paymentDetails: {
    mode: string;
    transactionId: string;
    paidDate: string;
  };
}
