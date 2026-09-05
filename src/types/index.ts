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
  paymentGateway?: string;
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  upiRefId?: string;
  invoiceNumber: string;
  sacCode: string;
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  paymentStatus?: 'Paid' | 'Pending' | 'Overdue';
  dueDate?: string;
  notes?: string;
  billingAddress?: string;
  bookingDate?: string;
  bookingTimeSlot?: string;
  downloadUrl?: string;
  isInterState?: boolean;
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
  brandCoverImage?: string;
  industry: string;
  category?: string;
  tier?: 'Enterprise' | 'ScaleUp' | 'D2C Unicorn' | 'Global' | 'Fast Growing';
  matchScore: number;
  matchBreakdown?: {
    audienceDemographics: number;
    contentStyle: number;
    engagementRate: number;
    brandSafety: number;
    reasons: string[];
  };
  title: string;
  description: string;
  fullBrief?: string;
  guidelines?: {
    dos: string[];
    donts: string[];
    mandatoryMentions: string[];
    hashtags: string[];
  };
  budgetMin: number;
  budgetMax: number;
  escrowGuaranteed?: boolean;
  payoutStructure?: {
    upfrontAdvancePercent: number;
    milestoneReleasePercent: number;
    bonusTerms?: string;
  };
  targetNiches: string[];
  targetAudience?: {
    ageRange: string;
    topCities: string[];
    minFollowers?: string;
  };
  deliverables: string[];
  deliverableBreakdown?: {
    title: string;
    platform: 'Instagram' | 'YouTube' | 'LinkedIn' | 'X' | 'Podcast' | 'Multi-Platform';
    specs: string;
    suggestedRate: number;
  }[];
  deadline: string;
  deadlineDate?: string;
  daysRemaining?: number;
  applicantsCount: number;
  maxApplicants?: number;
  verifiedBrand: boolean;
  featured?: boolean;
  status: 'open' | 'urgent' | 'shortlisting' | 'filled';
  sampleHooks?: string[];
}

export interface BrandProposal {
  id: string;
  briefId: string;
  briefTitle: string;
  brandName: string;
  brandLogo?: string;
  creatorId: string;
  proposedAmount: number;
  gstAmount?: number;
  netPayout?: number;
  pitch: string;
  creativeHook?: string;
  deliverablesProposed: string[];
  timelineDays: number;
  scriptDraftDate?: string;
  contentGoLiveDate?: string;
  addons?: {
    whitelisting: boolean;
    rawFootage: boolean;
    exclusiveCategory: boolean;
  };
  mediaKitAttached?: boolean;
  escrowStatus?: 'awaiting_funding' | 'escrow_locked' | 'milestone_1_released' | 'fully_released';
  escrowAmount?: number;
  status: 'submitted' | 'shortlisted' | 'in_review' | 'escrow_funded' | 'draft_submitted' | 'approved' | 'completed' | 'declined';
  statusTimeline?: {
    step: string;
    timestamp: string;
    note: string;
    isCompleted: boolean;
  }[];
  submittedAt: string;
  brandFeedback?: string;
  deliverableLinks?: {
    title: string;
    url: string;
    platform: string;
    submittedAt: string;
    viewsCount?: string;
    engagement?: string;
  }[];
  invoiceGenerated?: boolean;
  invoiceNumber?: string;
  upiRefId?: string;
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
  status?: 'Paid' | 'Pending' | 'Overdue';
  dueDate?: string;
  notes?: string;
  reverseCharge?: string;
}

export interface CommunityTier {
  id: string;
  name: string;
  type: 'free' | 'paid';
  price: number; // 0 for free, INR amount for paid
  billingPeriod?: 'monthly' | 'yearly' | 'lifetime' | 'one-time';
  billingCycle?: 'monthly' | 'yearly' | 'one-time';
  description: string;
  perks: string[];
  badgeText?: string;
  badgeColor?: string;
  isPopular?: boolean;
  membersCount?: number;
}

export interface CommunityMember {
  id: string;
  communityId: string;
  name: string;
  username?: string;
  handle?: string;
  avatarUrl: string;
  role: 'creator' | 'admin' | 'moderator' | 'vip' | 'member';
  roleBadge?: string;
  tierId?: string;
  tierName?: string;
  bio?: string;
  location?: string;
  joinedAt: string;
  reputationPoints: number;
  badges?: string[];
  isBanned?: boolean;
  isOnline?: boolean;
}

export interface CommunityComment {
  id: string;
  postId?: string;
  authorId?: string;
  author?: string;
  authorName?: string;
  authorUsername?: string;
  authorAvatar: string;
  authorRole?: 'creator' | 'admin' | 'moderator' | 'vip' | 'member';
  content: string;
  createdAt: string;
  likesCount?: number;
  likes?: number;
  hasLiked?: boolean;
}

export interface CommunityPost {
  id: string;
  communityId: string;
  channelId: string;
  channelName?: string;
  authorId?: string;
  author?: string;
  authorName?: string;
  authorUsername?: string;
  authorAvatar: string;
  authorRole?: 'creator' | 'admin' | 'moderator' | 'vip' | 'member';
  authorBadge?: string;
  title: string;
  content: string;
  categoryTag?: string;
  tags?: string[];
  mediaUrl?: string;
  isAnnouncement?: boolean;
  isPinned?: boolean;
  isLocked?: boolean;
  likesCount?: number;
  likes?: number;
  commentsCount: number;
  viewsCount?: number;
  hasLiked?: boolean;
  isLiked?: boolean;
  createdAt: string;
  attachments?: { title: string; url: string; type: 'link' | 'code' | 'pdf' | 'image' }[];
  comments?: CommunityComment[];
}

export interface CommunityChannel {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  isPrivate?: boolean;
  isAnnouncementsOnly?: boolean;
  isVipOnly?: boolean;
  postsCount?: number;
}

export interface Community {
  id: string;
  creatorId: string;
  creatorName?: string;
  creatorUsername?: string;
  name: string;
  slug?: string;
  tagline: string;
  description: string;
  avatarUrl: string;
  bannerUrl?: string;
  coverUrl?: string;
  category: string;
  isPublic?: boolean;
  membersCount: number;
  activeOnlineCount?: number;
  isJoined?: boolean;
  userRole?: 'creator' | 'admin' | 'moderator' | 'vip' | 'member' | 'guest';
  myRole?: 'creator' | 'admin' | 'moderator' | 'vip' | 'member' | 'guest';
  rules: string[];
  tiers?: CommunityTier[];
  membershipTiers?: CommunityTier[];
  channels: CommunityChannel[];
  postsCount: number;
  createdAt: string;
}

// ============================================================================
// MEMBERSHIP SUBSCRIPTION SYSTEM TYPES
// ============================================================================

export type SubscriptionPlanType = 'free' | 'paid' | 'invite_only';
export type SubscriptionBillingCycle = 'monthly' | 'yearly';
export type SubscriptionStatus = 'active' | 'cancelled' | 'past_due' | 'paused' | 'expired';

export interface SubscriptionPlan {
  id: string;
  creatorId: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  coverUrl?: string;
  type: SubscriptionPlanType;
  monthlyPrice: number; // ₹ INR (0 for free)
  yearlyPrice: number;  // ₹ INR (with discount)
  benefits: string[];
  isPopular?: boolean;
  isActive: boolean;
  memberCount: number;
  razorpayPlanIdMonthly?: string;
  razorpayPlanIdYearly?: string;
  badgeText?: string;
  badgeColor?: string;
  inviteCode?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  creatorId: string;
  planId: string;
  planName: string;
  planType: SubscriptionPlanType;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userAvatar?: string;
  billingCycle: SubscriptionBillingCycle;
  amount: number;
  status: SubscriptionStatus;
  razorpaySubscriptionId?: string;
  razorpayPaymentId?: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionPayment {
  id: string;
  subscriptionId: string;
  creatorId: string;
  planName: string;
  subscriberName: string;
  subscriberEmail: string;
  amount: number;
  currency: string;
  status: 'paid' | 'failed' | 'refunded';
  paymentMethod: 'UPI' | 'Card' | 'Netbanking' | 'Razorpay Autopay';
  razorpayPaymentId: string;
  razorpayInvoiceId?: string;
  invoiceNumber: string;
  billingCycle: SubscriptionBillingCycle;
  createdAt: string;
}

export interface MembershipMetrics {
  mrr: number;
  arr: number;
  activeSubscribers: number;
  churnRate: number;
  arpu: number;
  newThisMonth: number;
  growthPercentage: number;
}



