import {
  Creator,
  StoreTheme,
  DigitalProduct,
  Course,
  BookingService,
  Order,
  WhatsAppNotification,
  BrandCollabBrief,
  BrandProposal,
  MediaKitData,
  Community,
  CommunityPost,
  CommunityMember,
  CommunityTier,
  CommunityChannel,
  CommunityComment
} from '@/types';

export const THEMES: StoreTheme[] = [
  {
    id: 'linear-royal',
    name: 'Linear Obsidian & Royal Blue',
    bgGradient: 'from-[#05070B] via-[#090D18] to-[#0E1528]',
    cardBg: 'bg-[#0E1322]/85 border border-royal-500/25 shadow-glass-card backdrop-blur-2xl rounded-[20px]',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-400',
    accentColor: '#2563EB',
    accentGlow: 'shadow-[0_0_30px_rgba(37,99,235,0.35)]',
    badgeBg: 'bg-royal-600/15 border border-royal-500/30',
    badgeText: 'text-royal-400',
    borderStyle: 'border-royal-500/30'
  },
  {
    id: 'stripe-midnight',
    name: 'Stripe Midnight Slate',
    bgGradient: 'from-[#06080F] via-[#0B1020] to-[#111A34]',
    cardBg: 'bg-[#10172D]/85 border border-blue-400/20 shadow-glass-card backdrop-blur-2xl rounded-[20px]',
    textPrimary: 'text-white',
    textSecondary: 'text-blue-200/70',
    accentColor: '#3B82F6',
    accentGlow: 'shadow-[0_0_30px_rgba(59,130,246,0.35)]',
    badgeBg: 'bg-blue-500/15 border border-blue-400/30',
    badgeText: 'text-blue-400',
    borderStyle: 'border-blue-400/25'
  },
  {
    id: 'framer-indigo',
    name: 'Framer Deep Titanium',
    bgGradient: 'from-[#04060A] via-[#080B15] to-[#0D1224]',
    cardBg: 'bg-[#0F1426]/85 border border-white/10 shadow-glass-card backdrop-blur-2xl rounded-[20px]',
    textPrimary: 'text-white',
    textSecondary: 'text-slate-400',
    accentColor: '#60A5FA',
    accentGlow: 'shadow-[0_0_30px_rgba(96,165,250,0.3)]',
    badgeBg: 'bg-white/10 border border-white/15',
    badgeText: 'text-slate-200',
    borderStyle: 'border-white/15'
  },
  {
    id: 'vercel-cyber',
    name: 'Vercel Monochrome Cyber',
    bgGradient: 'from-[#000000] via-[#080808] to-[#121212]',
    cardBg: 'bg-[#0C0C0C]/90 border border-white/[0.12] shadow-glass-card backdrop-blur-2xl rounded-[20px]',
    textPrimary: 'text-white',
    textSecondary: 'text-neutral-400',
    accentColor: '#2563EB',
    accentGlow: 'shadow-[0_0_25px_rgba(37,99,235,0.25)]',
    badgeBg: 'bg-white/10 border border-white/20',
    badgeText: 'text-white',
    borderStyle: 'border-white/15'
  }
];

export const INITIAL_CREATORS: Creator[] = [
  {
    id: 'creator_aarav',
    username: 'aarav.tech',
    name: 'Aarav Sharma',
    tagline: 'Staff SDE @ Top Unicorn • Helping 200k+ Engineers Crack FAANG & Tech Roles',
    bio: 'Ex-Microsoft & Swiggy Engineer. I create hand-crafted DSA roadmaps, System Design deep dives, and conduct 1:1 mock tech interviews.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    category: 'Software Engineering & Tech',
    location: 'Bengaluru, Karnataka',
    state: 'Karnataka',
    themeId: 'linear-royal',
    upiId: 'aaravsharma@okaxis',
    upiName: 'Aarav Tech Creator Labs',
    gstNumber: '29AAECS4567M1ZV',
    bankAccount: {
      accountNumberMasked: '•••• •••• •••• 8921',
      ifsc: 'HDFC0001234',
      bankName: 'HDFC Bank, Koramangala'
    },
    socials: {
      youtube: 'https://youtube.com/@aaravcodes',
      instagram: 'https://instagram.com/aarav.tech',
      linkedin: 'https://linkedin.com/in/aaravsharma',
      twitter: 'https://x.com/aarav_tech',
      telegram: 'https://t.me/aarav_tech_prep',
      whatsapp: '919876543210'
    },
    customLinks: [
      {
        id: 'link_1',
        title: '🔥 Join 45k+ Devs on Free WhatsApp Telegram Prep Group',
        url: 'https://t.me/aarav_tech_prep',
        icon: 'Send',
        highlight: true
      },
      {
        id: 'link_2',
        title: '📺 Latest Video: System Design of Hotstar 50M Concurrent Stream',
        url: 'https://youtube.com',
        icon: 'Youtube'
      },
      {
        id: 'link_3',
        title: '💼 Connect on LinkedIn for Tech Job Referrals',
        url: 'https://linkedin.com',
        icon: 'Linkedin'
      }
    ]
  },
  {
    id: 'creator_priya',
    username: 'priya.design',
    name: 'Priya Kapoor',
    tagline: 'Principal Product Designer & AI Workflow Coach • 120k on IG',
    bio: 'Designed products used by 15M+ users across India. Selling Notion agency OS templates, Figma design systems & hosting 1:1 portfolio roasts.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    category: 'UI/UX & Product Design',
    location: 'Mumbai, Maharashtra',
    state: 'Maharashtra',
    themeId: 'stripe-midnight',
    upiId: 'priyadesign@okhdfcbank',
    upiName: 'Priya Kapoor Design Studio',
    gstNumber: '27AABCP9876L1Z4',
    bankAccount: {
      accountNumberMasked: '•••• •••• •••• 4412',
      ifsc: 'ICIC0000987',
      bankName: 'ICICI Bank, Bandra West'
    },
    socials: {
      instagram: 'https://instagram.com/priya.design',
      youtube: 'https://youtube.com/@priyadesign',
      linkedin: 'https://linkedin.com/in/priyakapoor',
      twitter: 'https://x.com/priyadesign',
      whatsapp: '919811223344'
    },
    customLinks: [
      {
        id: 'link_p1',
        title: '✨ Download Free UI/UX Figma Checklist (2025 Edition)',
        url: '#',
        icon: 'Sparkles',
        highlight: true
      },
      {
        id: 'link_p2',
        title: '🎙️ Listen to The Indian Design Podcast',
        url: '#',
        icon: 'Mic'
      }
    ]
  }
];

export const INITIAL_PRODUCTS: DigitalProduct[] = [
  {
    id: 'prod_dsa_sheet',
    creatorId: 'creator_aarav',
    title: 'Ultimate FAANG SDE & DSA Master Sheet 2025',
    subtitle: '500+ Curated Problems with Visual Diagrams, Intuitions & Java/C++/Python Code',
    description: 'The exact roadmap and notes I used to crack Microsoft, Swiggy, and Uber. Includes LeetCode pattern breakdowns, graph/DP cheat sheets, and time complexity visual guides.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    price: 399,
    originalPrice: 1499,
    category: 'Interview Prep',
    fileType: 'PDF',
    fileSizeBytes: '42.5 MB',
    downloadUrl: 'https://example.com/downloads/FAANG-DSA-MasterSheet.pdf',
    features: [
      '500+ LeetCode problems categorized by 18 algorithmic patterns',
      'Hand-drawn visual intuition diagrams for DP & Graphs',
      'Clean solution code in C++, Java, and Python',
      'Bonus: 100 System Design flashcards included',
      'Lifetime updates via WhatsApp & Google Drive'
    ],
    salesCount: 1420,
    rating: 4.9,
    reviewsCount: 312,
    isPayWhatYouWant: false
  },
  {
    id: 'prod_system_design_cards',
    creatorId: 'creator_aarav',
    title: 'High-Level & Low-Level System Design Playbook',
    subtitle: 'Architecture blueprints of Netflix, Swiggy, UPI, and WhatsApp',
    description: 'Master HLD and LLD for SDE-2 & SDE-3 interviews. Covers rate limiters, distributed caching, Kafka event streaming, DB sharding, and real Indian scale challenges.',
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    price: 499,
    originalPrice: 1999,
    category: 'System Design',
    fileType: 'PDF',
    fileSizeBytes: '68.2 MB',
    downloadUrl: 'https://example.com/downloads/System-Design-Playbook.pdf',
    features: [
      '20+ Real-world system architectures with trade-off analysis',
      'UPI NPCI settlement architecture deep dive',
      'Design patterns with ready-to-use boilerplate code',
      'Interview scoring rubric used by FAANG interviewers'
    ],
    salesCount: 890,
    rating: 4.95,
    reviewsCount: 198
  },
  {
    id: 'prod_resume_bundle',
    creatorId: 'creator_aarav',
    title: 'ATS-Proof Tech Resume & Cover Letter Pack',
    subtitle: '5 Overleaf LaTeX & Google Docs Templates with 95%+ ATS score',
    description: 'Get your resume past automated ATS filters. Proven templates that got shortlist calls from Google, Amazon, Atlassian, and Flipkart.',
    coverImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80',
    price: 199,
    originalPrice: 799,
    category: 'Career Templates',
    fileType: 'TEMPLATE',
    fileSizeBytes: '12 MB',
    downloadUrl: 'https://example.com/downloads/Tech-Resume-Templates.zip',
    features: [
      '5 LaTeX templates with 1-click Overleaf edit links',
      '5 Google Docs & MS Word templates',
      'Action verb cheat sheet & metric impact formulas',
      'Example resumes of candidates placed at FAANG'
    ],
    salesCount: 2310,
    rating: 4.8,
    reviewsCount: 445
  },
  {
    id: 'prod_freelancer_os',
    creatorId: 'creator_priya',
    title: 'Freelance Designer & Creator Notion OS',
    subtitle: 'Complete Client CRM, Invoice Tracker, Project Proposals & Contracts',
    description: 'Everything you need to run a 6-figure freelance design business in India. Includes GST invoice trackers, client feedback portals, and contract templates.',
    coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
    price: 349,
    originalPrice: 1299,
    category: 'Productivity & Notion',
    fileType: 'NOTION',
    fileSizeBytes: 'Notion Link',
    downloadUrl: 'https://notion.so/templates/freelance-designer-os',
    features: [
      'Automated client onboarding pipeline',
      'Indian legal contract & NDA templates',
      'GST tax & monthly revenue dashboard',
      'Figma asset deliverable tracker'
    ],
    salesCount: 680,
    rating: 4.9,
    reviewsCount: 140
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course_cracking_faang',
    creatorId: 'creator_aarav',
    title: 'Mastering SDE-1 to SDE-2: Complete DSA & System Design Live Cohort',
    subtitle: '10 Weeks of intensive live masterclasses, problem solving, and mock interviews',
    description: 'Transform from a beginner coder into a confident problem solver. Master Dynamic Programming, Graphs, Concurrency, and Distributed Systems with hands-on projects.',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    price: 2499,
    originalPrice: 7999,
    category: 'Full Cohort',
    level: 'Intermediate',
    totalDuration: '32 Hours (4 Modules)',
    features: [
      '32+ Hours of HD on-demand video lessons',
      'Weekly live Q&A with Aarav on Google Meet',
      'Private Discord & WhatsApp community access',
      '1 Guaranteed 1:1 Mock Interview included',
      'Certificate of Completion with unique verification URL'
    ],
    studentCount: 540,
    rating: 4.9,
    reviewsCount: 165,
    certificateOffered: true,
    modules: [
      {
        id: 'mod_1',
        title: 'Module 1: Advanced Data Structures & Algorithmic Patterns',
        lessons: [
          {
            id: 'les_1_1',
            title: 'Welcome & The 18 Must-Know LeetCode Patterns',
            duration: '18 mins',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isFreePreview: true,
            notes: 'Summary: Learn how to classify 90% of technical interview questions into sliding window, two pointers, or monotonic stack.'
          },
          {
            id: 'les_1_2',
            title: 'Dynamic Programming Decoded: Memoization to Tabulation',
            duration: '45 mins',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isFreePreview: false
          },
          {
            id: 'les_1_3',
            title: 'Graph Traversals (BFS, DFS, Dijkstra, TopoSort)',
            duration: '55 mins',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isFreePreview: false
          }
        ]
      },
      {
        id: 'mod_2',
        title: 'Module 2: High-Level Distributed System Design',
        lessons: [
          {
            id: 'les_2_1',
            title: 'Designing a Scalable URL Shortener (Bitly/TinyURL)',
            duration: '40 mins',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isFreePreview: true
          },
          {
            id: 'les_2_2',
            title: 'Designing Swiggy / Zomato Real-Time Delivery Tracking',
            duration: '62 mins',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isFreePreview: false
          }
        ]
      },
      {
        id: 'mod_3',
        title: 'Module 3: Low-Level Design & Clean Architecture',
        lessons: [
          {
            id: 'les_3_1',
            title: 'SOLID Principles in Practice with Real Refactoring',
            duration: '35 mins',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isFreePreview: false
          },
          {
            id: 'les_3_2',
            title: 'Design an ATM / Elevator System (Object Oriented Design)',
            duration: '50 mins',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            isFreePreview: false
          }
        ]
      }
    ]
  }
];

export const INITIAL_BOOKINGS: BookingService[] = [
  {
    id: 'book_resume_roast',
    creatorId: 'creator_aarav',
    title: '1:1 Tech Resume Roast & Career Strategy Call',
    description: 'Get direct live feedback on your resume, LinkedIn profile, and job search strategy. We will restructure your bullet points to highlight FAANG-level business metrics.',
    coverImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    price: 699,
    originalPrice: 1999,
    durationMinutes: 30,
    sessionType: 'Portfolio / Resume Review',
    platform: 'Google Meet',
    availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    timeSlots: ['06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'],
    bufferMinutes: 15,
    bookingsCompleted: 185,
    rating: 4.95
  },
  {
    id: 'book_mock_interview',
    creatorId: 'creator_aarav',
    title: 'FAANG SDE-1 / SDE-2 Mock Coding & System Design Interview',
    description: 'Simulated 60-minute real FAANG interview on CoderPad. Includes 45 mins live coding/design + 15 mins comprehensive actionable scorecard feedback.',
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80',
    price: 1499,
    originalPrice: 3499,
    durationMinutes: 60,
    sessionType: 'Mock Tech Interview',
    platform: 'Google Meet',
    availableDays: ['Fri', 'Sat', 'Sun'],
    timeSlots: ['11:00 AM', '02:00 PM', '05:00 PM', '07:30 PM'],
    bufferMinutes: 20,
    bookingsCompleted: 94,
    rating: 5.0
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord_101',
    orderNumber: 'ORD-98421',
    date: new Date(Date.now() - 3600000 * 2).toISOString(),
    creatorId: 'creator_aarav',
    buyerName: 'Rahul Deshmukh',
    buyerEmail: 'rahul.deshmukh@gmail.com',
    buyerPhone: '+91 98234 56789',
    buyerState: 'Maharashtra',
    itemType: 'product',
    itemId: 'prod_dsa_sheet',
    itemTitle: 'Ultimate FAANG SDE & DSA Master Sheet 2025',
    amount: 399,
    gstRate: 18,
    cgst: 0,
    sgst: 0,
    igst: 71.82,
    totalAmount: 470.82,
    paymentMethod: 'UPI',
    paymentApp: 'PhonePe',
    upiRefId: 'UPI-894210482184',
    invoiceNumber: 'INV-2025-00101',
    sacCode: '998431',
    status: 'completed',
    deliverySentWhatsapp: true,
    deliverySentEmail: true
  },
  {
    id: 'ord_102',
    orderNumber: 'ORD-98422',
    date: new Date(Date.now() - 3600000 * 7).toISOString(),
    creatorId: 'creator_aarav',
    buyerName: 'Ananya Iyer',
    buyerEmail: 'ananya.iyer@outlook.com',
    buyerPhone: '+91 99887 66554',
    buyerState: 'Karnataka',
    itemType: 'booking',
    itemId: 'book_resume_roast',
    itemTitle: '1:1 Tech Resume Roast & Career Strategy Call',
    amount: 699,
    gstRate: 18,
    cgst: 62.91,
    sgst: 62.91,
    igst: 0,
    totalAmount: 824.82,
    paymentMethod: 'UPI',
    paymentApp: 'GPay',
    upiRefId: 'UPI-771923091425',
    invoiceNumber: 'INV-2025-00102',
    sacCode: '998313',
    status: 'completed',
    deliverySentWhatsapp: true,
    deliverySentEmail: true
  },
  {
    id: 'ord_103',
    orderNumber: 'ORD-98423',
    date: new Date(Date.now() - 3600000 * 18).toISOString(),
    creatorId: 'creator_aarav',
    buyerName: 'Vikram Singh',
    buyerEmail: 'vikram.singh@gmail.com',
    buyerPhone: '+91 97112 33445',
    buyerState: 'Delhi',
    itemType: 'course',
    itemId: 'course_cracking_faang',
    itemTitle: 'Mastering SDE-1 to SDE-2: Complete DSA & System Design Live Cohort',
    amount: 2499,
    gstRate: 18,
    cgst: 0,
    sgst: 0,
    igst: 449.82,
    totalAmount: 2948.82,
    paymentMethod: 'UPI',
    paymentApp: 'Paytm',
    upiRefId: 'UPI-339182746190',
    invoiceNumber: 'INV-2025-00103',
    sacCode: '999293',
    status: 'completed',
    deliverySentWhatsapp: true,
    deliverySentEmail: true
  }
];

export const INITIAL_WHATSAPP_NOTIFS: WhatsAppNotification[] = [
  {
    id: 'wa_1',
    orderId: 'ord_101',
    recipientPhone: '+91 98234 56789',
    recipientName: 'Rahul Deshmukh',
    templateName: 'order_receipt_download',
    messageContent: `Namaste Rahul! 🙏\n\nYour payment of ₹470.82 for *Ultimate FAANG SDE & DSA Master Sheet 2025* was successful!\n\n📥 *Instant Download Link:*\nhttps://creatoros.in/downloads/FAANG-DSA-MasterSheet.pdf\n\n📄 *Tax Invoice:*\nhttps://creatoros.in/invoice/INV-2025-00101.pdf\n\nJoin Aarav's private WhatsApp prep community here: https://chat.whatsapp.com/sample\n\nHappy coding! 🚀`,
    sentAt: '2 hours ago',
    status: 'read',
    triggerEvent: 'Successful UPI payment'
  },
  {
    id: 'wa_2',
    orderId: 'ord_102',
    recipientPhone: '+91 99887 66554',
    recipientName: 'Ananya Iyer',
    templateName: 'booking_confirmed_meet',
    messageContent: `Namaste Ananya! ✨\n\nYour 1:1 session with *Aarav Sharma* is confirmed!\n\n🗓 *Date:* Tomorrow at 07:00 PM IST\n🔗 *Google Meet:* https://meet.google.com/xyz-abcd-efg\n\nPlease have your resume PDF link ready before joining. See you soon!`,
    sentAt: '7 hours ago',
    status: 'delivered',
    triggerEvent: '1:1 Session slot booked'
  }
];

export const INITIAL_BRAND_BRIEFS: BrandCollabBrief[] = [
  {
    id: 'brief_boat',
    brandName: 'boAt',
    brandLogo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=140&q=80',
    brandCoverImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1200&q=80',
    industry: 'Consumer Electronics',
    category: 'Audio & Wearables',
    tier: 'D2C Unicorn',
    matchScore: 98,
    matchBreakdown: {
      audienceDemographics: 98,
      contentStyle: 97,
      engagementRate: 96,
      brandSafety: 100,
      reasons: [
        '84% audience match in 18-28 Gen-Z & Tech professional demographic',
        'Your avg tech reel retention (68%) outperforms sector benchmark (44%)',
        'Strong audience affinity for desk setup, deep work, and noise cancellation'
      ]
    },
    title: 'boAt Nirvana Space ANC — Deep Focus Study & Coding Routine',
    description: 'Looking for tech, student, and developer creators to showcase 100-hour battery life and 32dB Hybrid Active Noise Cancellation during intense coding sprints, college study sessions, or daily commutes.',
    fullBrief: 'boAt is launching the next-generation Nirvana Space Wireless ANC series tailored for creators, programmers, and students in India. We want high-retention, aesthetically pleasing video content demonstrating how Nirvana Space silences noisy environments (cafes, transit, loud hostels) to enable uninterrupted flow state. Highlights must emphasize 32dB Hybrid ANC, 100-hour battery reserve, dual-device pairing between laptop & phone, and ASAP fast-charge (10 mins = 10 hrs).',
    guidelines: {
      dos: [
        'Demonstrate the real-time audio difference when toggling ANC ON vs OFF',
        'Feature your genuine desk setup or coding/study workspace in 4K resolution',
        'Include your exclusive discount coupon "CREATORBOAT20" in caption & pinned comment',
        'Highlight dual-device pairing seamlessly switching from laptop video to phone call'
      ],
      donts: [
        'Do not compare directly against Sony, Apple, or Bose by name',
        'Avoid low-light blurry video without clear audio voiceover',
        'Do not skip showing the physical case and ASAP charge port'
      ],
      mandatoryMentions: ['32dB Hybrid ANC', '100-Hour Playback', 'Dual Device Pairing', '#boAtNirvanaSpace'],
      hashtags: ['#boAtNirvanaSpace', '#DoWhatFloatsYourboAt', '#DeskSetup', '#CodingRoutine']
    },
    budgetMin: 75000,
    budgetMax: 150000,
    escrowGuaranteed: true,
    payoutStructure: {
      upfrontAdvancePercent: 50,
      milestoneReleasePercent: 50,
      bonusTerms: '₹15,000 performance bonus if Reel reaches 350k+ views in first 7 days'
    },
    targetNiches: ['Tech & Gadgets', 'Study & Productivity', 'Software Engineering'],
    targetAudience: {
      ageRange: '18-28 Years (College Students & Early Techies)',
      topCities: ['Bengaluru', 'Delhi NCR', 'Pune', 'Hyderabad', 'Mumbai'],
      minFollowers: '50,000+'
    },
    deliverables: [
      '1x High-production Instagram Reel (60s 4K Desk Setup / Study with Me)',
      '1x YouTube 60s Integration mid-roll segment',
      '2x Story Slides with swipe-up discount coupon link'
    ],
    deliverableBreakdown: [
      {
        title: '60s 4K Instagram Reel',
        platform: 'Instagram',
        specs: '9:16 Vertical, 4K 60fps, engaging first 3-second hook, audio toggle demo',
        suggestedRate: 65000
      },
      {
        title: 'YouTube 60s Mid-Roll Integration',
        platform: 'YouTube',
        specs: '16:9 4K, natural transition from tutorial to sponsor mention, pinned comment link',
        suggestedRate: 45000
      },
      {
        title: '2x Story Sequence with Link Sticker',
        platform: 'Instagram',
        specs: 'Interactive link sticker with custom UTM tracking code & coupon pill',
        suggestedRate: 20000
      }
    ],
    deadline: 'In 4 days (Sep 20)',
    deadlineDate: '2026-09-20',
    daysRemaining: 4,
    applicantsCount: 28,
    maxApplicants: 40,
    verifiedBrand: true,
    featured: true,
    status: 'open',
    sampleHooks: [
      '“How I survive 12-hour coding sprints in noisy Bangalore cafes without losing focus...”',
      '“The single best ₹2,999 desk gadget every developer needs in 2026.”',
      '“Toggling ANC on for the first time in a crowded metro — watch my reaction.”'
    ]
  },
  {
    id: 'brief_swiggy',
    brandName: 'Swiggy',
    brandLogo: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=140&q=80',
    brandCoverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
    industry: 'Quick Commerce',
    category: 'Instamart & Late Night Snacks',
    tier: 'Enterprise',
    matchScore: 97,
    matchBreakdown: {
      audienceDemographics: 96,
      contentStyle: 98,
      engagementRate: 97,
      brandSafety: 100,
      reasons: [
        '92% Tier-1 Metro audience distribution with high Swiggy delivery coverage',
        'Proven viral reach with relatable lifestyle and work-from-home comedic sketches',
        'High audience conversion on past quick commerce and discount codes'
      ]
    },
    title: 'Swiggy Instamart 10-Minute Desk Snacks & Brain Fuel for Creators',
    description: 'Create an engaging reel highlighting instantaneous 10-minute midnight deliveries of caffeine, munchies, and stationery during deadline crunches, exams, or weekend hackathons.',
    fullBrief: 'Swiggy Instamart is expanding 24x7 instant 10-minute delivery of late-night study and coding essentials across all major Indian cities. We want high-energy, relatable video scenarios showing a creator or engineer hitting a mental wall at 1:30 AM, ordering cold brew / energy bars / notebooks on Instamart, and receiving it before their code even finishes compiling.',
    guidelines: {
      dos: [
        'Show the actual Swiggy app UI screen recording placing the quick order',
        'Capture the delivery partner handover and unbagging of fresh snacks',
        'Include your personal promo code "INSTACREATOR100" for ₹100 off on first 2 orders',
        'Keep the pacing fast, upbeat, and humorous'
      ],
      donts: [
        'Do not show damaged packaging or unbranded bags',
        'Do not mention Blinkit or Zepto',
        'Avoid making delivery partners wait or look uncomfortable on camera'
      ],
      mandatoryMentions: ['10-Minute Delivery', '24x7 Midnight Instamart', 'Swiggy App', '#SwiggyInstamart'],
      hashtags: ['#SwiggyInstamart', '#LateNightFuel', '#QuickCommerce', '#CreatorLife']
    },
    budgetMin: 90000,
    budgetMax: 185000,
    escrowGuaranteed: true,
    payoutStructure: {
      upfrontAdvancePercent: 50,
      milestoneReleasePercent: 50,
      bonusTerms: '₹20,000 bonus if promo code generates >200 first-time order redemptions'
    },
    targetNiches: ['Lifestyle', 'Tech & Coding', 'College Life'],
    targetAudience: {
      ageRange: '18-32 Years (Metro Working Professionals & Students)',
      topCities: ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Chennai', 'Kolkata'],
      minFollowers: '75,000+'
    },
    deliverables: [
      '1x Relatable Problem-Solution Reel with Live Delivery (60s)',
      '1x Interactive Story Poll with Exclusive Coupon code sticker',
      'Pinned comment with direct UTM app install link'
    ],
    deliverableBreakdown: [
      {
        title: '60s Comedic Problem-Solution Reel',
        platform: 'Instagram',
        specs: '9:16 Vertical, fast-paced cuts, sound design, live delivery shot',
        suggestedRate: 95000
      },
      {
        title: 'Story Poll & Voucher Drop',
        platform: 'Instagram',
        specs: 'Interactive swipe sticker with ₹100 discount coupon',
        suggestedRate: 35000
      }
    ],
    deadline: 'In 3 days (Sep 16)',
    deadlineDate: '2026-09-16',
    daysRemaining: 3,
    applicantsCount: 34,
    maxApplicants: 50,
    verifiedBrand: true,
    featured: true,
    status: 'urgent',
    sampleHooks: [
      '“It’s 1:45 AM, my production code just crashed, and I’m out of coffee...”',
      '“Ordering brain fuel in the middle of a hackathon: Swiggy vs my patience.”',
      '“Tell me you’re a night owl in India without telling me you’re a night owl.”'
    ]
  },
  {
    id: 'brief_cred',
    brandName: 'CRED',
    brandLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=140&q=80',
    brandCoverImage: 'https://images.unsplash.com/photo-1556742049-0a67e557b686?auto=format&fit=crop&w=1200&q=80',
    industry: 'FinTech & Wealth',
    category: 'CRED Garage & Smart UPI',
    tier: 'Enterprise',
    matchScore: 96,
    matchBreakdown: {
      audienceDemographics: 95,
      contentStyle: 98,
      engagementRate: 95,
      brandSafety: 100,
      reasons: [
        'Top 10% creditworthy audience demographic with high disposable income',
        'Editorial alignment with premium minimalism and modern financial literacy',
        'Strong track record of high-ticket sponsorship deliverables'
      ]
    },
    title: 'CRED Garage & Smart Scan & Pay — Frictionless Money Management',
    description: 'Showcase how high-earning creators and tech professionals optimize their credit score, manage vehicle telemetry via CRED Garage, and unlock cashback on premium UPI payments.',
    fullBrief: 'CRED is highlighting the unified financial OS experience for India’s top 1% creditworthy individuals. We want creators to share their honest workflow managing multiple credit cards, tracking auto maintenance & fastag recharges through CRED Garage, and using CRED UPI for seamless QR payments.',
    guidelines: {
      dos: [
        'Maintain a sleek, cinematic, high-contrast aesthetic matching CRED design language',
        'Showcase the CRED Garage dashboard tracking maintenance and fuel costs',
        'Emphasize credit score monitoring and timely bill repayment benefits',
        'Include your custom referral invite link in bio and description'
      ],
      donts: [
        'Do not show sensitive credit card numbers or personal CVVs on screen',
        'Avoid cluttered backgrounds or noisy casual formats',
        'Do not make unrealistic guaranteed return investment claims'
      ],
      mandatoryMentions: ['CRED Garage', 'CRED UPI', 'Credit Score Protection', '#CREDLife'],
      hashtags: ['#CRED', '#CREDGarage', '#FintechIndia', '#SmartMoney']
    },
    budgetMin: 150000,
    budgetMax: 320000,
    escrowGuaranteed: true,
    payoutStructure: {
      upfrontAdvancePercent: 50,
      milestoneReleasePercent: 50,
      bonusTerms: '₹30,000 kicker for >150 verified CRED member sign-ups'
    },
    targetNiches: ['FinTech', 'Career & Productivity', 'Automobile & Tech'],
    targetAudience: {
      ageRange: '22-38 Years (High-Income Engineers, Founders, Creators)',
      topCities: ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune'],
      minFollowers: '100,000+'
    },
    deliverables: [
      '1x Cinematic 4K Instagram Reel (60s)',
      '1x Dedicated YouTube Financial Breakdown Segment (90s)',
      '1x LinkedIn Authority Post on smart cash-flow management'
    ],
    deliverableBreakdown: [
      {
        title: 'Cinematic 4K Reel',
        platform: 'Instagram',
        specs: '9:16 Vertical, moody lighting, sound design, CRED UI showcase',
        suggestedRate: 110000
      },
      {
        title: '90s YouTube Dedicated Segment',
        platform: 'YouTube',
        specs: '16:9 4K, deep dive into credit score mechanics and Garage features',
        suggestedRate: 85000
      },
      {
        title: 'LinkedIn Thought Leadership Carousel',
        platform: 'LinkedIn',
        specs: '8-slide PDF carousel analyzing personal finance architecture for devs',
        suggestedRate: 45000
      }
    ],
    deadline: 'In 7 days (Sep 24)',
    deadlineDate: '2026-09-24',
    daysRemaining: 7,
    applicantsCount: 18,
    maxApplicants: 25,
    verifiedBrand: true,
    featured: true,
    status: 'open',
    sampleHooks: [
      '“The financial dashboard every engineer making >₹25 LPA needs to set up today.”',
      '“Why I stopped carrying physical wallets and how CRED Garage manages my car expenses.”',
      '“3 subtle credit score mistakes that cost Indian techies lakhs in home loans.”'
    ]
  },
  {
    id: 'brief_nothing',
    brandName: 'Nothing',
    brandLogo: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=140&q=80',
    brandCoverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    industry: 'Consumer Tech',
    category: 'Nothing Phone & Glyph Ecosystem',
    tier: 'Global',
    matchScore: 99,
    matchBreakdown: {
      audienceDemographics: 99,
      contentStyle: 99,
      engagementRate: 98,
      brandSafety: 100,
      reasons: [
        'Highest creator match score across the entire platform for dev/minimalist tech',
        'Audience has 88% interest index in industrial design, custom OS, and Android mods',
        'Prior organic videos featuring clean monochrome setups averaged 120k+ impressions'
      ]
    },
    title: 'Nothing Phone (2a) Plus: Dark Minimalist Tech & Code Integration',
    description: 'Looking for top developer and aesthetic tech creators to highlight the Glyph Interface, Nothing OS 2.6 dark mode widgets, and clean distraction-free productivity.',
    fullBrief: 'Nothing is championing transparent industrial design and mindful tech usage. We want tech creators and software developers to showcase how Nothing Phone (2a) Plus and Nothing OS widgets streamline day-to-day coding, terminal notifications via Glyph lights, and calendar focus timers without endless social media doomscrolling.',
    guidelines: {
      dos: [
        'Shoot in clean, low-glare, dark minimalist lighting highlighting Glyph LED pulses',
        'Showcase real-world developer utilities (timer glyphs, custom dot-matrix widgets)',
        'Demonstrate camera quality and crisp macro shots of the transparent hardware',
        'Emphasize pure bloatware-free Nothing OS experience'
      ],
      donts: [
        'Do not put loud garish neon RGB lights that clash with Nothing monochrome design',
        'Avoid generic spec-sheet reading — focus on real user experience and design feel',
        'Do not use low-framerate video recordings'
      ],
      mandatoryMentions: ['Glyph Interface', 'Nothing OS 2.6', 'Transparent Design', '#NothingPhone2aPlus'],
      hashtags: ['#NothingPhone2aPlus', '#NothingIndia', '#TechAesthetics', '#CleanSetup']
    },
    budgetMin: 120000,
    budgetMax: 250000,
    escrowGuaranteed: true,
    payoutStructure: {
      upfrontAdvancePercent: 50,
      milestoneReleasePercent: 50,
      bonusTerms: 'Free Nothing Phone (2a) Plus unit + Ear (a) gifted to creator for permanent keep'
    },
    targetNiches: ['Tech & Gadgets', 'Design & Aesthetics', 'Developer Lifestyle'],
    targetAudience: {
      ageRange: '18-35 Years (Designers, Developers, Tech Enthusiasts)',
      topCities: ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Chennai'],
      minFollowers: '60,000+'
    },
    deliverables: [
      '1x 4K Cinematic Instagram Reel with Sound Design',
      '1x Dedicated YouTube Review / Desk Setup Feature (8-10 mins)',
      '3x High-Res Still Photo Carousels on Instagram & X'
    ],
    deliverableBreakdown: [
      {
        title: 'Cinematic Reel (Glyph in the Dark)',
        platform: 'Instagram',
        specs: '9:16 Vertical, 4K 60fps, macro lens hardware shots, ambient audio',
        suggestedRate: 80000
      },
      {
        title: 'Dedicated YouTube Video',
        platform: 'YouTube',
        specs: '16:9 4K, 8+ minutes, in-depth Nothing OS workflow for programmers',
        suggestedRate: 110000
      }
    ],
    deadline: 'In 8 days (Sep 25)',
    deadlineDate: '2026-09-25',
    daysRemaining: 8,
    applicantsCount: 22,
    maxApplicants: 30,
    verifiedBrand: true,
    featured: true,
    status: 'open',
    sampleHooks: [
      '“I replaced my iPhone with the Nothing Phone for 14 days of software engineering...”',
      '“Why every software developer is obsessed with this transparent monochrome phone.”',
      '“How Glyph lighting turned my phone into an anti-distraction coding timer.”'
    ]
  },
  {
    id: 'brief_nykaa',
    brandName: 'Nykaa',
    brandLogo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=140&q=80',
    brandCoverImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=80',
    industry: 'Beauty & Wellness',
    category: 'Beauty & Personal Care',
    tier: 'Enterprise',
    matchScore: 95,
    matchBreakdown: {
      audienceDemographics: 94,
      contentStyle: 96,
      engagementRate: 95,
      brandSafety: 100,
      reasons: [
        '58% female and 42% male audience interested in daily self-care & skincare routines',
        'High conversion on festive sale recommendations and beauty routines',
        'Strong visual aesthetic and color grading in previous video uploads'
      ]
    },
    title: 'Nykaa Mega Festive Beauty Gala — Screen-Time Skincare Routine',
    description: 'Showcase your morning or evening desk skincare ritual protecting against screen blue light and urban pollution. Highlight top serums and sunscreen from Nykaa with festive sale vouchers.',
    fullBrief: 'Nykaa Mega Festive Gala is India’s biggest annual beauty and self-care shopping celebration. We are collaborating with lifestyle, professional, and desk creators to show how simple 3-step skincare (Hydration, Vitamin C, SPF 50 Blue Light Screen) keeps skin radiant during long working hours in front of screens and festive events.',
    guidelines: {
      dos: [
        'Show the actual texture and gentle application of products on bare skin',
        'Highlight Nykaa Festive Sale discounts (up to 50% off top curated brands)',
        'Include your personalized creator affiliate link in bio and stories',
        'Tag @NykaaBeauty with #NykaaFestiveGala in the first line of the caption'
      ],
      donts: [
        'Do not apply heavy beauty smoothing filters that obscure real skin texture',
        'Avoid making medical acne cure claims',
        'Do not mix competitor shopping platform links'
      ],
      mandatoryMentions: ['Nykaa Festive Gala', 'Blue Light Protection', 'Up to 50% Off', '#NykaaFestiveGala'],
      hashtags: ['#NykaaFestiveGala', '#SkincareRoutine', '#FestiveGlow', '#NykaaBeauty']
    },
    budgetMin: 80000,
    budgetMax: 160000,
    escrowGuaranteed: true,
    payoutStructure: {
      upfrontAdvancePercent: 50,
      milestoneReleasePercent: 50,
      bonusTerms: '₹20,000 performance reward for >300 affiliate cart checkouts'
    },
    targetNiches: ['Lifestyle & Beauty', 'Self Care', 'Creator Routine'],
    targetAudience: {
      ageRange: '18-34 Years (Urban Men & Women)',
      topCities: ['Mumbai', 'Delhi NCR', 'Bengaluru', 'Kolkata', 'Chennai', 'Pune'],
      minFollowers: '50,000+'
    },
    deliverables: [
      '1x Aesthetic GRWM / Desk Skincare Reel (60s)',
      '2x High-res Product Story Slides with Direct Nykaa Tags',
      '1x Pinned Comment with affiliate voucher code'
    ],
    deliverableBreakdown: [
      {
        title: '60s Aesthetic GRWM Reel',
        platform: 'Instagram',
        specs: '9:16 Vertical, warm aesthetic lighting, product close-ups, gentle BGM',
        suggestedRate: 75000
      },
      {
        title: '2x Story Product Showcase with Stickers',
        platform: 'Instagram',
        specs: 'Direct tap-to-buy links with special festive promo discount code',
        suggestedRate: 25000
      }
    ],
    deadline: 'In 5 days (Sep 21)',
    deadlineDate: '2026-09-21',
    daysRemaining: 5,
    applicantsCount: 19,
    maxApplicants: 35,
    verifiedBrand: true,
    featured: false,
    status: 'open',
    sampleHooks: [
      '“The 3-step morning routine that saved my skin from 10 hours of monitor blue light...”',
      '“Unboxing the Nykaa Festive Gala box — here are the only 3 products actually worth buying.”',
      '“Get ready with me for a festive creator meetup in under 7 minutes.”'
    ]
  },
  {
    id: 'brief_zomato',
    brandName: 'Zomato',
    brandLogo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=140&q=80',
    brandCoverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    industry: 'Food Tech',
    category: 'Food Delivery & Dining',
    tier: 'Enterprise',
    matchScore: 96,
    matchBreakdown: {
      audienceDemographics: 96,
      contentStyle: 97,
      engagementRate: 96,
      brandSafety: 100,
      reasons: [
        'High organic humor and skit performance with over 8.2% comment rate',
        '94% urban youth following across major foodie hubs (Delhi, Bangalore, Mumbai)',
        'Proven viral shareability with group dining and developer skits'
      ]
    },
    title: 'Zomato Gold: Ultimate Weekend Treat & Late-Night Coding Fuel',
    description: 'Craft funny, highly relatable reels featuring Zomato Gold 1+1 dining and free delivery benefits. Perfect for engineers celebrating placed job offers or student group orders.',
    fullBrief: 'Zomato Gold offers 1+1 on food and up to 40% off on dining out across 20,000+ top restaurants in India, along with free delivery perks on food orders. We want high-energy, humorous skits showcasing friends or coworkers taking advantage of Zomato Gold privileges.',
    guidelines: {
      dos: [
        'Incorporate witty, relatable dialogue centered around Indian food cravings',
        'Showcase the Zomato Gold VIP banner and seamless bill settlement',
        'Use comedic punchlines and fast editing cuts',
        'Tag @Zomato and use #ZomatoGold in all captions'
      ],
      donts: [
        'Do not mock restaurant staff or show rude behavior',
        'Avoid messy unappealing food shots',
        'Do not mention Swiggy or competitive delivery apps'
      ],
      mandatoryMentions: ['Zomato Gold', '1+1 Dining Out', 'Free Delivery', '#ZomatoGold'],
      hashtags: ['#ZomatoGold', '#ZomatoIndia', '#FoodieSkits', '#WeekendVibes']
    },
    budgetMin: 85000,
    budgetMax: 170000,
    escrowGuaranteed: true,
    payoutStructure: {
      upfrontAdvancePercent: 50,
      milestoneReleasePercent: 50,
      bonusTerms: '₹25,000 bonus if video crosses 500k views on Instagram within 10 days'
    },
    targetNiches: ['Comedy & Skits', 'Food & Dining', 'Tech Culture'],
    targetAudience: {
      ageRange: '18-32 Years (Students, Office Teams & Young Couples)',
      topCities: ['Bengaluru', 'Delhi NCR', 'Mumbai', 'Hyderabad', 'Kolkata', 'Pune'],
      minFollowers: '70,000+'
    },
    deliverables: [
      '1x Relatable Humor / Developer Celebration Reel (60s)',
      '2x Story Slides with Zomato Gold referral link and interactive poll'
    ],
    deliverableBreakdown: [
      {
        title: '60s Comedic Reel',
        platform: 'Instagram',
        specs: '9:16 Vertical, character skit / situational comedy, high energy',
        suggestedRate: 90000
      },
      {
        title: '2x Story Slides',
        platform: 'Instagram',
        specs: 'Zomato Gold coupon sticker + restaurant recommendation poll',
        suggestedRate: 25000
      }
    ],
    deadline: 'In 6 days (Sep 22)',
    deadlineDate: '2026-09-22',
    daysRemaining: 6,
    applicantsCount: 42,
    maxApplicants: 60,
    verifiedBrand: true,
    featured: false,
    status: 'open',
    sampleHooks: [
      '“POV: Your friend got placed in a FAANG company and you opened Zomato Gold...”',
      '“The math Indian engineers do to extract maximum value from Zomato Gold 1+1.”',
      '“When it’s Friday 8 PM and no one wants to cook — enter Zomato Gold.”'
    ]
  },
  {
    id: 'brief_zerodha',
    brandName: 'Zerodha',
    brandLogo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=140&q=80',
    brandCoverImage: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80',
    industry: 'FinTech & Education',
    category: 'Varsity & Long-Term Wealth',
    tier: 'Enterprise',
    matchScore: 97,
    matchBreakdown: {
      audienceDemographics: 98,
      contentStyle: 97,
      engagementRate: 96,
      brandSafety: 100,
      reasons: [
        'Over 75% audience interest in software engineering, index funds, and financial independence',
        'Educator tone and transparent breakdowns have exceptional audience credibility',
        'Zero regulatory strikes and 100% compliant educational formatting'
      ]
    },
    title: 'Zerodha Varsity: Demystifying Algorithmic Trading & Finance for Devs',
    description: 'Create an educational video explaining how software developers can understand market fundamentals, API automation, and long-term compounding using 100% free Zerodha Varsity modules.',
    fullBrief: 'Zerodha Varsity is India’s premier free financial education resource with zero ads, zero paywalls, and zero upsells. We want technical creators to introduce their audience to Varsity’s free modules — from stock market basics to personal finance, mutual funds, and technical analysis — emphasizing disciplined long-term investing over reckless speculation.',
    guidelines: {
      dos: [
        'Emphasize that Zerodha Varsity is 100% free with no hidden charges or paid courses',
        'Showcase the clean Zerodha Varsity mobile app and browser interface',
        'Highlight the SEBI compliance disclaimer clearly in video & description',
        'Focus on financial discipline, risk management, and compounding concepts'
      ],
      donts: [
        'NEVER give specific stock buy/sell tips or promise guaranteed returns',
        'Do not promote intraday speculation or high-leverage trading',
        'Avoid sensationalist thumbnail clickbait with cash piles or sports cars'
      ],
      mandatoryMentions: ['Zerodha Varsity', '100% Free Financial Education', 'Disciplined Investing', '#ZerodhaVarsity'],
      hashtags: ['#ZerodhaVarsity', '#FinancialEducation', '#InvestingForDevs', '#Zerodha']
    },
    budgetMin: 100000,
    budgetMax: 220000,
    escrowGuaranteed: true,
    payoutStructure: {
      upfrontAdvancePercent: 50,
      milestoneReleasePercent: 50,
      bonusTerms: '₹25,000 educational grant bonus for highest-rated community discussion thread'
    },
    targetNiches: ['FinTech & Education', 'Software Engineering', 'Career Growth'],
    targetAudience: {
      ageRange: '20-35 Years (Early Career Professionals & College Graduates)',
      topCities: ['Bengaluru', 'Hyderabad', 'Pune', 'Delhi NCR', 'Chennai', 'Mumbai'],
      minFollowers: '60,000+'
    },
    deliverables: [
      '1x Comprehensive YouTube Video (8-10 mins on Dev to Investor Journey)',
      '1x LinkedIn Authority Breakdown on FinTech APIs and Varsity',
      '2x Educational Instagram Carousel Slides'
    ],
    deliverableBreakdown: [
      {
        title: '8-Min Educational YouTube Video',
        platform: 'YouTube',
        specs: '16:9 4K, deep-dive walkthrough of Varsity modules, screen share',
        suggestedRate: 110000
      },
      {
        title: 'LinkedIn In-Depth Carousel Post',
        platform: 'LinkedIn',
        specs: '10-slide visual guide to systematic compounding for engineers',
        suggestedRate: 40000
      }
    ],
    deadline: 'In 10 days (Sep 27)',
    deadlineDate: '2026-09-27',
    daysRemaining: 10,
    applicantsCount: 15,
    maxApplicants: 25,
    verifiedBrand: true,
    featured: true,
    status: 'open',
    sampleHooks: [
      '“Why 90% of software engineers suck at investing (and how free Zerodha Varsity fixes it).”',
      '“How I automated my investment mental model without paying for ₹10,000 courses.”',
      '“The only 3 chapters of Zerodha Varsity you must read before turning 25.”'
    ]
  },
  {
    id: 'brief_myntra',
    brandName: 'Myntra',
    brandLogo: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=140&q=80',
    brandCoverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
    industry: 'Fashion & E-Commerce',
    category: 'Fashion & Gen-Z Trends',
    tier: 'Enterprise',
    matchScore: 92,
    matchBreakdown: {
      audienceDemographics: 91,
      contentStyle: 93,
      engagementRate: 92,
      brandSafety: 100,
      reasons: [
        'Audience actively engages with style upgrades, wardrobe transitions, and office-wear',
        'Strong visual aesthetics with quick-cut transition editing capabilities',
        'Proven affiliate conversion track record with lifestyle e-commerce'
      ]
    },
    title: 'Myntra Big Fashion Festival: Techie Workwear to Weekend Fits',
    description: 'Transform your look from smart-casual developer WFH hoodies to festive weekend outfits using Myntra top curated brands with express delivery.',
    fullBrief: 'Myntra Big Fashion Festival brings over 6,000 top fashion brands at 50-80% off. We want relatable tech and creative professionals to showcase how upgrading from faded oversized t-shirts to sharp, minimalist smart-casuals and festive kurtas boosts confidence in meetings and festive parties.',
    guidelines: {
      dos: [
        'Show 3 distinct outfit transitions (WFH Casual, Office Pitch, Festive Evening)',
        'Include clear Myntra product IDs and direct affiliate links in description',
        'Use upbeat music and dynamic snap/kick transitions',
        'Mention 100% original brands and easy 14-day returns'
      ],
      donts: [
        'Do not wear visibly wrinkled or unironed clothes on camera',
        'Avoid messy background clutter',
        'Do not mention Amazon Fashion or Ajio'
      ],
      mandatoryMentions: ['Myntra Big Fashion Festival', '50-80% Off', '100% Original Brands', '#MyntraBFF'],
      hashtags: ['#MyntraBFF', '#MyntraBigFashionFestival', '#StyleUpgrade', '#OOTD']
    },
    budgetMin: 70000,
    budgetMax: 150000,
    escrowGuaranteed: true,
    payoutStructure: {
      upfrontAdvancePercent: 50,
      milestoneReleasePercent: 50,
      bonusTerms: '₹20,000 wardrobe shopping voucher gifted to creator'
    },
    targetNiches: ['Fashion & Styling', 'Gen-Z Culture', 'Lifestyle'],
    targetAudience: {
      ageRange: '18-30 Years (College Students, Techies, Young Creatives)',
      topCities: ['Bengaluru', 'Delhi NCR', 'Mumbai', 'Kolkata', 'Pune', 'Jaipur'],
      minFollowers: '50,000+'
    },
    deliverables: [
      '1x Fast-Paced Transition Lookbook Reel (3 Outfits)',
      '3x Story Slides with Direct Myntra Product Shortlinks'
    ],
    deliverableBreakdown: [
      {
        title: '60s Transition Lookbook Reel',
        platform: 'Instagram',
        specs: '9:16 Vertical, 3 outfit changes, sound synced transitions',
        suggestedRate: 70000
      },
      {
        title: '3x Story Swipe-Up Sequence',
        platform: 'Instagram',
        specs: 'Direct product card tags with price and discount callouts',
        suggestedRate: 20000
      }
    ],
    deadline: 'In 9 days (Sep 26)',
    deadlineDate: '2026-09-26',
    daysRemaining: 9,
    applicantsCount: 23,
    maxApplicants: 40,
    verifiedBrand: true,
    featured: false,
    status: 'open',
    sampleHooks: [
      '“Upgrading my developer wardrobe from ₹200 college tees to sharp Myntra fits.”',
      '“3 outfits every guy needs for the upcoming Indian festive season under ₹2,000.”',
      '“Myntra Big Fashion Festival haul: what I ordered vs how it actually looks.”'
    ]
  },
  {
    id: 'brief_lenskart',
    brandName: 'Lenskart',
    brandLogo: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=140&q=80',
    brandCoverImage: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=80',
    industry: 'Eyewear & Wellness',
    category: 'Lenskart Air & Blu Lenses',
    tier: 'D2C Unicorn',
    matchScore: 94,
    matchBreakdown: {
      audienceDemographics: 95,
      contentStyle: 93,
      engagementRate: 94,
      brandSafety: 100,
      reasons: [
        '85% of audience spends 8+ hours daily in front of computer and mobile screens',
        'High empathy with eye fatigue, headaches, and work-from-home wellness',
        'Strong visual match with modern ultra-lightweight titanium eyewear aesthetics'
      ]
    },
    title: 'Lenskart Air Flex: Blue Cut Glasses for 10-Hour Screen Sprints',
    description: 'Demonstrate how Lenskart Air ultra-lightweight frames and Blu Cut anti-glare lenses eliminate eye strain and headaches for coders, designers, and gamers.',
    fullBrief: 'Lenskart Air is India’s lightest flexible eyewear designed for people who wear glasses all day long. We want tech creators to show the contrast between eye fatigue with ordinary lenses vs the comfort of Lenskart Blu lenses that filter harmful blue light emitted by laptops, iPads, and phones.',
    guidelines: {
      dos: [
        'Demonstrate frame flexibility and ultra-lightweight feather feel on camera',
        'Show blue light laser test on the Lenskart Blu lens',
        'Include your exclusive coupon code "CREATORLENS" for Free Gold Membership',
        'Tag @Lenskart with #LenskartAir in your posts'
      ],
      donts: [
        'Do not bend frames aggressively past structural tolerance',
        'Avoid dirty, smudged lenses in close-up beauty shots',
        'Do not claim medical prevention of vision disorders'
      ],
      mandatoryMentions: ['Lenskart Air', 'Blu Cut Anti-Glare', 'Ultra Lightweight', '#LenskartAir'],
      hashtags: ['#LenskartAir', '#BluCutLenses', '#EyeCareForDevs', '#Lenskart']
    },
    budgetMin: 60000,
    budgetMax: 125000,
    escrowGuaranteed: true,
    payoutStructure: {
      upfrontAdvancePercent: 50,
      milestoneReleasePercent: 50,
      bonusTerms: '2x Free Custom Prescription Lenskart Air Glasses delivered to your door'
    },
    targetNiches: ['Eyewear & Wellness', 'Productivity', 'Tech & Coding'],
    targetAudience: {
      ageRange: '18-35 Years (Engineers, Students, Gamers, Remote Workers)',
      topCities: ['Bengaluru', 'Delhi NCR', 'Mumbai', 'Pune', 'Hyderabad'],
      minFollowers: '40,000+'
    },
    deliverables: [
      '1x Problem-Solution Reel on screen fatigue (60s)',
      '2x High-resolution Story Slides with 3D Try-On link'
    ],
    deliverableBreakdown: [
      {
        title: '60s Problem-Solution Reel',
        platform: 'Instagram',
        specs: '9:16 Vertical, blue light demo, lightweight frame flex showcase',
        suggestedRate: 60000
      },
      {
        title: '2x Story Slides with 3D Try-On link',
        platform: 'Instagram',
        specs: 'Interactive link sticker taking viewers directly to Lenskart 3D Try-On',
        suggestedRate: 18000
      }
    ],
    deadline: 'In 4 days (Sep 21)',
    deadlineDate: '2026-09-21',
    daysRemaining: 4,
    applicantsCount: 20,
    maxApplicants: 35,
    verifiedBrand: true,
    featured: false,
    status: 'urgent',
    sampleHooks: [
      '“The reason you get headaches after 4 PM at your desk isn’t your coffee...”',
      '“Testing the lightest pair of glasses in India on a 10-hour coding sprint.”',
      '“What blue light actually does to your eyes (and how Blu Cut lenses stop it).”'
    ]
  },
  {
    id: 'brief_zepto',
    brandName: 'Zepto',
    brandLogo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=140&q=80',
    brandCoverImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    industry: 'Quick Commerce',
    category: 'Zepto Cafe & Snacks',
    tier: 'D2C Unicorn',
    matchScore: 95,
    matchBreakdown: {
      audienceDemographics: 95,
      contentStyle: 96,
      engagementRate: 95,
      brandSafety: 100,
      reasons: [
        'Exceptional alignment with fast-paced urban developer lifestyle and hackathons',
        '96% of audience lives in Zepto 10-minute delivery serviceable pin codes',
        'High conversion rate on quick food and coffee recommendations'
      ]
    },
    title: 'Zepto Cafe: 10-Minute Fresh Cold Brew & Brain Fuel for Hackathons',
    description: 'Highlight instantaneous 10-minute deliveries of freshly brewed cafe drinks, Vietnamese iced coffee, and gourmet croissants delivered piping hot or icy cold during intense sprint sessions.',
    fullBrief: 'Zepto Cafe is disrupting daily office and home coffee runs by delivering hot espresso, iced frappes, and bakery treats in 10 minutes flat. We want content showing creators ordering high-grade cafe coffee during an urgent project deadline and taking their first refreshing sip before their meeting starts.',
    guidelines: {
      dos: [
        'Show the actual steam on hot coffee or condensation on iced cold brew',
        'Highlight the lightning-fast 10-minute countdown in the Zepto app',
        'Include exclusive promo code "ZEPTOCAFE50" for flat 50% off on first cafe order',
        'Keep the video vibe high-energy and modern'
      ],
      donts: [
        'Do not spill coffee or show crushed packaging',
        'Avoid dull or low-energy presentation',
        'Do not mention Blinkit or Swiggy'
      ],
      mandatoryMentions: ['Zepto Cafe', '10-Minute Fresh Coffee', 'Vietnamese Cold Brew', '#ZeptoCafe'],
      hashtags: ['#ZeptoCafe', '#10MinCoffee', '#WorkFromHomeFuel', '#ZeptoIndia']
    },
    budgetMin: 65000,
    budgetMax: 135000,
    escrowGuaranteed: true,
    payoutStructure: {
      upfrontAdvancePercent: 50,
      milestoneReleasePercent: 50,
      bonusTerms: '₹15,000 bonus for >180 first-time Zepto Cafe orders'
    },
    targetNiches: ['Quick Commerce', 'Coffee & Food', 'Developer Lifestyle'],
    targetAudience: {
      ageRange: '18-32 Years (Metro Techies, Founders & College Students)',
      topCities: ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Hyderabad', 'Pune', 'Chennai'],
      minFollowers: '50,000+'
    },
    deliverables: [
      '1x High-Energy 60s Reel with Live Delivery & Taste Test',
      '2x Story Slides with ₹50 Off Voucher Link'
    ],
    deliverableBreakdown: [
      {
        title: '60s High-Energy Reel',
        platform: 'Instagram',
        specs: '9:16 Vertical, ASMR ice pour sound design, live 10-min delivery timer',
        suggestedRate: 65000
      },
      {
        title: '2x Story Voucher Drop',
        platform: 'Instagram',
        specs: 'Interactive voucher sticker with direct Zepto Cafe link',
        suggestedRate: 20000
      }
    ],
    deadline: 'In 2 days (Sep 15)',
    deadlineDate: '2026-09-15',
    daysRemaining: 2,
    applicantsCount: 31,
    maxApplicants: 45,
    verifiedBrand: true,
    featured: false,
    status: 'urgent',
    sampleHooks: [
      '“I ordered iced Vietnamese coffee on Zepto Cafe to see if it actually arrives in 10 mins...”',
      '“Stop paying ₹350 at Starbucks: how I get fresh cafe cold brew at my desk in 10 mins.”',
      '“The 10-minute hack that saved our hackathon team from falling asleep at 3 AM.”'
    ]
  },
  {
    id: 'brief_mamaearth',
    brandName: 'Mamaearth',
    brandLogo: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=140&q=80',
    brandCoverImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80',
    industry: 'D2C Personal Care',
    category: 'Toxin-Free Skincare',
    tier: 'D2C Unicorn',
    matchScore: 90,
    matchBreakdown: {
      audienceDemographics: 89,
      contentStyle: 91,
      engagementRate: 90,
      brandSafety: 100,
      reasons: [
        'Growing audience interest in toxin-free natural personal care products',
        'Strong creator credibility with honest, transparent review formats',
        'High engagement on daily morning routine and lifestyle vlogs'
      ]
    },
    title: 'Mamaearth Vitamin C Daily Defense for Working Professionals',
    description: 'Highlight the benefits of natural, toxin-free Vitamin C face wash and sunscreen for creators and professionals who spend 10+ hours in front of monitors and cameras.',
    fullBrief: 'Mamaearth is Asia’s first MadeSafe certified brand bringing toxin-free, natural personal care products. We want creators to show how simple daily skin defense using Vitamin C Daily Glow Face Wash and Ultra Light Indian Sunscreen protects skin from dullness and pollution.',
    guidelines: {
      dos: [
        'Show genuine before-and-after skin glow in natural daylight',
        'Highlight the tree planting initiative on every order via Mamaearth app',
        'Include coupon code "MAMACREATOR20" for 20% off on Mamaearth website & app',
        'Tag @mamaearth.india in all social media posts'
      ],
      donts: [
        'Do not make exaggerated medicinal claims',
        'Avoid unrealistic filtered skin shots',
        'Do not mention competitor chemical brands by name'
      ],
      mandatoryMentions: ['MadeSafe Certified', 'Toxin Free', 'Plant Goodness', '#MamaearthIndia'],
      hashtags: ['#MamaearthIndia', '#VitaminCSkincare', '#PlantGoodness', '#CleanBeauty']
    },
    budgetMin: 50000,
    budgetMax: 110000,
    escrowGuaranteed: true,
    payoutStructure: {
      upfrontAdvancePercent: 50,
      milestoneReleasePercent: 50,
      bonusTerms: '₹15,000 bonus for >120 website orders using creator code'
    },
    targetNiches: ['Clean Beauty', 'Daily Routine', 'Health & Wellness'],
    targetAudience: {
      ageRange: '18-35 Years (Urban Professionals & Students)',
      topCities: ['Delhi NCR', 'Bengaluru', 'Mumbai', 'Jaipur', 'Lucknow', 'Pune'],
      minFollowers: '35,000+'
    },
    deliverables: [
      '1x Honest Review / Routine Integration Reel (60s)',
      '1x WhatsApp Broadcast mention to community members',
      '1x Story Slide with Mamaearth 20% Coupon Code'
    ],
    deliverableBreakdown: [
      {
        title: '60s Review & Routine Reel',
        platform: 'Instagram',
        specs: '9:16 Vertical, natural daylight, honest texture application',
        suggestedRate: 55000
      },
      {
        title: 'Story Slide & WhatsApp Broadcast',
        platform: 'Multi-Platform',
        specs: 'Coupon code drop + community link broadcast',
        suggestedRate: 20000
      }
    ],
    deadline: 'In 12 days (Sep 29)',
    deadlineDate: '2026-09-29',
    daysRemaining: 12,
    applicantsCount: 16,
    maxApplicants: 30,
    verifiedBrand: true,
    featured: false,
    status: 'open',
    sampleHooks: [
      '“The single most important skincare step for anyone sitting in front of a laptop all day.”',
      '“Testing Mamaearth Vitamin C routine for 7 days — here is what happened to my skin.”',
      '“3 toxin-free grooming essentials every young professional in India should keep at their desk.”'
    ]
  },
  {
    id: 'brief_snitch',
    brandName: 'Snitch',
    brandLogo: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=140&q=80',
    brandCoverImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80',
    industry: 'Fashion & D2C',
    category: 'Founder & Techie Streetwear',
    tier: 'ScaleUp',
    matchScore: 89,
    matchBreakdown: {
      audienceDemographics: 88,
      contentStyle: 90,
      engagementRate: 89,
      brandSafety: 100,
      reasons: [
        'Strong male Gen-Z and millennial audience demographic looking for modern smart-casuals',
        'Proven viral reach with creator aesthetic lookbooks and transition reels',
        'High conversion on D2C website apparel orders'
      ]
    },
    title: 'Snitch Menswear: Modern Techie & Founder Streetwear Collection',
    description: 'Showcase how Snitch oversized tees, linen resort shirts, and tailored cargo pants deliver the ultimate effortless founder and techie aesthetic for meetups, podcasts, and casual Fridays.',
    fullBrief: 'Snitch is India’s fastest-growing fast-fashion brand for men. We want creators to style Snitch’s latest Korean-fit linen shirts, heavyweight tees, and tech trousers, showing that Indian founders and engineers can look exceptionally sharp without spending designer luxury money.',
    guidelines: {
      dos: [
        'Style 3 distinct looks (Podcast / Investor Pitch, Coffee Shop Co-working, Weekend Party)',
        'Show close-up fabric texture, stitching quality, and fit',
        'Include discount code "SNITCHCREATOR" for 15% off sitewide',
        'Tag @snitch.co.in with #SnitchMen'
      ],
      donts: [
        'Do not wear dusty dirty sneakers with outfits',
        'Avoid poorly lit indoor rooms',
        'Do not compare against Zara or H&M negatively'
      ],
      mandatoryMentions: ['Snitch Menswear', 'Effortless Fit', 'Korean Minimalist Style', '#SnitchMen'],
      hashtags: ['#SnitchMen', '#FounderFashion', '#StreetwearIndia', '#OOTDMens']
    },
    budgetMin: 55000,
    budgetMax: 115000,
    escrowGuaranteed: true,
    payoutStructure: {
      upfrontAdvancePercent: 50,
      milestoneReleasePercent: 50,
      bonusTerms: '₹15,000 shopping credit for creator + affiliate rev share on sales'
    },
    targetNiches: ['Fashion & D2C', 'Founder Culture', 'Lifestyle'],
    targetAudience: {
      ageRange: '18-32 Years (Men: College Students, Techies & Founders)',
      topCities: ['Bengaluru', 'Mumbai', 'Delhi NCR', 'Pune', 'Hyderabad', 'Ahmedabad'],
      minFollowers: '40,000+'
    },
    deliverables: [
      '1x 60s Fast-Paced Lookbook Reel with Beat Drops',
      '3x High-Res Still Photo Carousels on Instagram'
    ],
    deliverableBreakdown: [
      {
        title: '60s Lookbook Reel',
        platform: 'Instagram',
        specs: '9:16 Vertical, beat-synced cuts, urban background, 3 outfit changes',
        suggestedRate: 55000
      },
      {
        title: '3x Story Swipe-Up Sequence',
        platform: 'Instagram',
        specs: 'Direct product links with fit guide and discount code',
        suggestedRate: 18000
      }
    ],
    deadline: 'In 14 days (Sep 30)',
    deadlineDate: '2026-09-30',
    daysRemaining: 14,
    applicantsCount: 14,
    maxApplicants: 30,
    verifiedBrand: true,
    featured: false,
    status: 'open',
    sampleHooks: [
      '“3 outfits that make software engineers look like funded startup founders.”',
      '“Snitch streetwear haul: the best Korean-fit linen shirts under ₹1,499.”',
      '“How I stopped dressing like a college fresher in 3 easy wardrobe changes.”'
    ]
  }
];

export const INITIAL_BRAND_PROPOSALS: BrandProposal[] = [
  {
    id: 'prop_boat_active',
    briefId: 'brief_boat',
    briefTitle: 'boAt Nirvana Space ANC — Deep Focus Study & Coding Routine',
    brandName: 'boAt',
    brandLogo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=140&q=80',
    creatorId: 'creator_aarav',
    proposedAmount: 110000,
    gstAmount: 19800,
    netPayout: 108900,
    pitch: 'Hey boAt team! As an active Indian tech & creator educator with 245k+ followers and 7.8% engagement rate, I will create a cinematic 4K Reel demonstrating 32dB Hybrid ANC in noisy Bangalore cafes during intense coding sprints, paired with an authentic YouTube integration and story link vouchers.',
    creativeHook: '“How I survive 12-hour coding sprints in noisy Bangalore cafes without losing focus...”',
    deliverablesProposed: [
      '1x High-production Instagram Reel (60s 4K Desk Setup / Study with Me)',
      '1x YouTube 60s Integration mid-roll segment',
      '2x Story Slides with swipe-up discount coupon link'
    ],
    timelineDays: 7,
    scriptDraftDate: '18 Sep 2026',
    contentGoLiveDate: '22 Sep 2026',
    addons: {
      whitelisting: true,
      rawFootage: false,
      exclusiveCategory: false
    },
    mediaKitAttached: true,
    escrowStatus: 'escrow_locked',
    escrowAmount: 110000,
    status: 'escrow_funded',
    brandFeedback: 'Script approved with 10/10 rating by boAt Brand Marketing! ₹1,10,000 is safely locked into NPCI Escrow. Please submit your rough-cut draft video before 22 Sep.',
    statusTimeline: [
      {
        step: 'Proposal Submitted',
        timestamp: '14 Sep, 11:30 AM',
        note: 'Submitted proposal with AI Verified Media Kit attached (245k reach).',
        isCompleted: true
      },
      {
        step: 'Shortlisted by boAt',
        timestamp: '15 Sep, 02:15 PM',
        note: 'boAt Influencer Marketing team shortlisted creative angle.',
        isCompleted: true
      },
      {
        step: 'NPCI Escrow Funded (₹1,10,000)',
        timestamp: '16 Sep, 09:45 AM',
        note: '100% brand funds deposited into verified escrow account #ESC_774921.',
        isCompleted: true
      },
      {
        step: 'Draft Video Submission',
        timestamp: 'Pending Submission',
        note: 'Awaiting creator rough-cut video preview link before final publish.',
        isCompleted: false
      },
      {
        step: 'Approved & Live on Socials',
        timestamp: 'Pending',
        note: 'Content go-live with tracking UTM links and promo code.',
        isCompleted: false
      },
      {
        step: '1-Click UPI Escrow Settlement',
        timestamp: 'Pending',
        note: 'Instant payout disbursement to creator bank account.',
        isCompleted: false
      }
    ],
    submittedAt: '2 days ago'
  },
  {
    id: 'prop_swiggy_review',
    briefId: 'brief_swiggy',
    briefTitle: 'Swiggy Instamart 10-Minute Desk Snacks & Brain Fuel for Creators',
    brandName: 'Swiggy',
    brandLogo: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=140&q=80',
    creatorId: 'creator_aarav',
    proposedAmount: 145000,
    gstAmount: 26100,
    netPayout: 143550,
    pitch: 'We will film a high-energy midnight problem-solution sketch showing code crashing at 1:45 AM, ordering brain fuel on Instamart, and having the delivery partner arrive before the build finishes compiling.',
    creativeHook: '“It’s 1:45 AM, my production code just crashed, and I’m out of coffee...”',
    deliverablesProposed: [
      '1x Relatable Problem-Solution Reel with Live Delivery (60s)',
      '1x Interactive Story Poll with Exclusive Coupon code sticker',
      'Pinned comment with direct UTM app install link'
    ],
    timelineDays: 5,
    scriptDraftDate: '15 Sep 2026',
    contentGoLiveDate: '19 Sep 2026',
    addons: {
      whitelisting: true,
      rawFootage: true,
      exclusiveCategory: false
    },
    mediaKitAttached: true,
    escrowStatus: 'escrow_locked',
    escrowAmount: 145000,
    status: 'draft_submitted',
    brandFeedback: 'Draft video received via Frame.io! Brand marketing team is reviewing the first 3 seconds hook and logo visibility. Final approval expected within 24 hours.',
    deliverableLinks: [
      {
        title: 'Draft Rough-Cut Preview (Frame.io)',
        url: 'https://app.frame.io/v/swiggy_instamart_aarav_v2',
        platform: 'Instagram',
        submittedAt: 'Yesterday, 04:30 PM'
      }
    ],
    statusTimeline: [
      {
        step: 'Proposal Submitted',
        timestamp: '12 Sep, 10:00 AM',
        note: 'Submitted fee of ₹1,45,000 + 18% GST.',
        isCompleted: true
      },
      {
        step: 'Shortlisted by Swiggy',
        timestamp: '13 Sep, 12:40 PM',
        note: 'Campaign manager assigned: Ananya S. (Swiggy Growth).',
        isCompleted: true
      },
      {
        step: 'NPCI Escrow Funded (₹1,45,000)',
        timestamp: '13 Sep, 05:20 PM',
        note: 'Escrow ref #ESC_883019 locked.',
        isCompleted: true
      },
      {
        step: 'Draft Video Submitted',
        timestamp: '14 Sep, 04:30 PM',
        note: 'Draft 4K reel submitted for brand quality check.',
        isCompleted: true
      },
      {
        step: 'Approved & Live on Socials',
        timestamp: 'In Review',
        note: 'Review in progress by Swiggy brand team.',
        isCompleted: false
      },
      {
        step: '1-Click UPI Escrow Settlement',
        timestamp: 'Pending',
        note: 'Instant payout upon publish.',
        isCompleted: false
      }
    ],
    submittedAt: '4 days ago'
  },
  {
    id: 'prop_zomato_settled',
    briefId: 'brief_zomato',
    briefTitle: 'Zomato Gold: Ultimate Weekend Treat & Late-Night Coding Fuel',
    brandName: 'Zomato',
    brandLogo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=140&q=80',
    creatorId: 'creator_aarav',
    proposedAmount: 140000,
    gstAmount: 25200,
    netPayout: 138600,
    pitch: 'Created a viral FAANG placement comedy skit extracting maximum math value from Zomato Gold 1+1 dining. Video achieved 482k organic views and 1,420 promo redemptions!',
    creativeHook: '“POV: Your friend got placed in a FAANG company and you opened Zomato Gold...”',
    deliverablesProposed: [
      '1x Relatable Humor / Developer Celebration Reel (60s)',
      '2x Story Slides with Zomato Gold referral link and interactive poll'
    ],
    timelineDays: 5,
    addons: {
      whitelisting: false,
      rawFootage: false,
      exclusiveCategory: false
    },
    mediaKitAttached: true,
    escrowStatus: 'fully_released',
    escrowAmount: 140000,
    status: 'completed',
    brandFeedback: 'Phenomenal performance! Reel reached 482k organic views with 38k likes and 1,420 app downloads. 100% Escrow disbursed to your Bank Account via UPI Ref: UPI-984021984210.',
    deliverableLinks: [
      {
        title: 'Instagram Reel (Live)',
        url: 'https://instagram.com/reel/zomato_gold_aarav',
        platform: 'Instagram',
        submittedAt: '8 days ago',
        viewsCount: '482,000 Views',
        engagement: '8.4%'
      },
      {
        title: 'Story Link Analytics',
        url: 'https://zomato.link/utm_aarav_stats',
        platform: 'Instagram',
        submittedAt: '7 days ago',
        viewsCount: '58,400 Taps',
        engagement: '1,420 Installs'
      }
    ],
    invoiceGenerated: true,
    invoiceNumber: 'INV-2026-BR-0042',
    upiRefId: 'UPI-984021984210',
    statusTimeline: [
      {
        step: 'Proposal Submitted',
        timestamp: '01 Sep, 09:30 AM',
        note: 'Submitted proposal with rate card.',
        isCompleted: true
      },
      {
        step: 'Shortlisted by Zomato',
        timestamp: '02 Sep, 11:15 AM',
        note: 'Zomato Social team approved concept.',
        isCompleted: true
      },
      {
        step: 'NPCI Escrow Funded (₹1,40,000)',
        timestamp: '02 Sep, 04:00 PM',
        note: 'Escrow ref #ESC_610492 locked.',
        isCompleted: true
      },
      {
        step: 'Draft Video Approved',
        timestamp: '04 Sep, 02:30 PM',
        note: 'Approved on first review without revisions.',
        isCompleted: true
      },
      {
        step: 'Content Published Live',
        timestamp: '06 Sep, 06:00 PM',
        note: 'Reel went viral with 482k impressions.',
        isCompleted: true
      },
      {
        step: '1-Click UPI Escrow Settlement (₹1,40,000)',
        timestamp: '07 Sep, 11:20 AM',
        note: '100% Escrow disbursed via UPI Ref #UPI-984021984210.',
        isCompleted: true
      }
    ],
    submittedAt: '12 days ago'
  },
  {
    id: 'prop_cred_shortlisted',
    briefId: 'brief_cred',
    briefTitle: 'CRED Garage & Smart Scan & Pay — Frictionless Money Management',
    brandName: 'CRED',
    brandLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=140&q=80',
    creatorId: 'creator_aarav',
    proposedAmount: 220000,
    gstAmount: 39600,
    netPayout: 217800,
    pitch: 'Cinematic 4K walkthrough exploring the financial OS for high-earning software developers. We will showcase CRED Garage tracking vehicle maintenance alongside smart credit score optimization.',
    creativeHook: '“The financial dashboard every engineer making >₹25 LPA needs to set up today.”',
    deliverablesProposed: [
      '1x Cinematic 4K Instagram Reel (60s)',
      '1x Dedicated YouTube Financial Breakdown Segment (90s)',
      '1x LinkedIn Authority Post on smart cash-flow management'
    ],
    timelineDays: 10,
    scriptDraftDate: '22 Sep 2026',
    contentGoLiveDate: '28 Sep 2026',
    addons: {
      whitelisting: true,
      rawFootage: true,
      exclusiveCategory: true
    },
    mediaKitAttached: true,
    escrowStatus: 'awaiting_funding',
    escrowAmount: 220000,
    status: 'shortlisted',
    brandFeedback: 'Shortlisted among top 3 tech creators for this cycle. CRED Growth team is reviewing the script outline and initiating contract signing & Escrow deposit.',
    statusTimeline: [
      {
        step: 'Proposal Submitted',
        timestamp: '13 Sep, 03:00 PM',
        note: 'Submitted custom proposal for ₹2,20,000 + 18% GST.',
        isCompleted: true
      },
      {
        step: 'Shortlisted by CRED',
        timestamp: '14 Sep, 05:45 PM',
        note: 'CRED Brand Growth team shortlisted Aarav.',
        isCompleted: true
      },
      {
        step: 'NPCI Escrow Funding',
        timestamp: 'In Progress',
        note: 'Brand finance team processing Escrow deposit.',
        isCompleted: false
      },
      {
        step: 'Draft Submission',
        timestamp: 'Pending',
        note: 'Awaiting video production.',
        isCompleted: false
      },
      {
        step: 'Approved & Live on Socials',
        timestamp: 'Pending',
        note: 'Awaiting live date.',
        isCompleted: false
      },
      {
        step: '1-Click UPI Escrow Settlement',
        timestamp: 'Pending',
        note: 'Disbursement upon delivery sign-off.',
        isCompleted: false
      }
    ],
    submittedAt: '3 days ago'
  }
];

export const INITIAL_MEDIA_KIT: MediaKitData = {
  creatorId: 'creator_aarav',
  monthlyReach: '1.4M+',
  engagementRate: '6.8%',
  instagramFollowers: '124,000',
  youtubeSubscribers: '185,000',
  linkedinFollowers: '68,000',
  avgReelViews: '95,000',
  avgYoutubeViews: '42,000',
  audienceDemographics: {
    topCities: [
      { city: 'Bengaluru', percentage: 34 },
      { city: 'Hyderabad', percentage: 18 },
      { city: 'Pune', percentage: 14 },
      { city: 'Delhi NCR', percentage: 12 },
      { city: 'Mumbai', percentage: 9 },
      { city: 'Tier 2 & 3 Cities', percentage: 13 }
    ],
    genderSplit: { male: 78, female: 21, other: 1 },
    ageSplit: [
      { group: '18-24 (College / Freshers)', percentage: 54 },
      { group: '25-34 (Working SDEs)', percentage: 39 },
      { group: '35+ (Tech Leads / Engineering Managers)', percentage: 7 }
    ]
  },
  suggestedRates: {
    instagramReel: 35000,
    instagramStory: 12000,
    youtubeIntegration: 55000,
    dedicatedYoutube: 120000,
    linkedinPost: 25000
  },
  previousSponsors: [
    { name: 'Scaler', logoText: 'SCALER' },
    { name: 'Newton School', logoText: 'NEWTON' },
    { name: 'GeeksforGeeks', logoText: 'GFG' },
    { name: 'Kaggle', logoText: 'KAGGLE' },
    { name: 'Postman', logoText: 'POSTMAN' }
  ]
};

export const INITIAL_COMMUNITIES: Community[] = [
  {
    id: 'comm_tech_faang',
    creatorId: 'creator_aarav',
    creatorName: 'Aarav Sharma',
    creatorUsername: 'aaravtech',
    name: 'Bharat SDE & FAANG Hub',
    slug: 'faang-hub',
    tagline: 'Top 1% tech engineering circle for FAANG & high-growth Indian startups.',
    description: 'A private circle for ambitious software engineers in India. Daily system design case studies, Leetcode patterns, live resume roasters, and direct hiring manager referrals.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    category: 'Software Engineering & Career',
    isPublic: true,
    membersCount: 1420,
    activeOnlineCount: 184,
    isJoined: true,
    userRole: 'creator',
    postsCount: 289,
    createdAt: '2025-01-10',
    rules: [
      'Be respectful, helpful, and constructive in all code reviews.',
      'No spam, self-promotion, or unsolicited DMs to fellow members.',
      'Always format code blocks with syntax highlighting.',
      'Discussions related to compensation must keep candidate privacy intact.'
    ],
    tiers: [
      {
        id: 'tier_free',
        name: 'Community Access',
        type: 'free',
        price: 0,
        description: 'Open access to public discussion channels, weekly tech roundups, and general Q&A.',
        perks: [
          'Access to #general, #dsa-grind and #announcements',
          'Participate in open tech AMA sessions',
          'Community badge & public profile'
        ],
        badgeText: 'Member',
        badgeColor: 'bg-slate-500/20 text-slate-300'
      },
      {
        id: 'tier_vip_pro',
        name: 'VIP Pro Mentorship',
        type: 'paid',
        price: 499,
        billingPeriod: 'monthly',
        description: 'Direct mentor access, 1:1 resume roast queues, mock tech interviews, and private referrals.',
        perks: [
          'Everything in Community Access',
          'Exclusive #vip-lounge and #referrals-jobs channels',
          'Monthly live System Design Masterclass (Google Meet)',
          'Priority 1:1 Resume Roast & Direct WhatsApp Alert Channel',
          'Zero platform commission UPI billing'
        ],
        badgeText: 'VIP Pro',
        badgeColor: 'bg-royal-600/25 text-royal-300 border border-royal-500/40',
        isPopular: true
      },
      {
        id: 'tier_lifetime',
        name: 'Lifetime Founder Pass',
        type: 'paid',
        price: 2999,
        billingPeriod: 'lifetime',
        description: 'Permanent all-access pass to every cohort, masterclass recording, and direct mentor DM access.',
        perks: [
          'Permanent lifetime access to all future channels',
          'All Digital Notes & Cheat Sheets included for free (₹2,500 value)',
          'Direct 1:1 DM channel with Aarav',
          'Golden Elite Founder badge on profile'
        ],
        badgeText: 'Elite Founder',
        badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
      }
    ],
    channels: [
      {
        id: 'chan_announcements',
        name: 'Announcements',
        slug: 'announcements',
        description: 'Official creator broadcasts, live masterclass schedules, and major updates.',
        icon: '📢',
        isAnnouncementsOnly: true,
        postsCount: 14
      },
      {
        id: 'chan_general',
        name: 'General Tech Banter',
        slug: 'general',
        description: 'Tech trends, dev setups, developer memes, and day-to-day work chat.',
        icon: '💬',
        postsCount: 128
      },
      {
        id: 'chan_system_design',
        name: 'System Design Hub',
        slug: 'system-design',
        description: 'High Level (HLD) and Low Level (LLD) architectural deep-dives for Indian scale.',
        icon: '🏗️',
        postsCount: 64
      },
      {
        id: 'chan_dsa',
        name: 'DSA & LeetCode Grind',
        slug: 'dsa-grind',
        description: 'Daily interview questions, algorithmic patterns, and optimization tricks.',
        icon: '⚡',
        postsCount: 52
      },
      {
        id: 'chan_referrals',
        name: 'Referrals & Hiring',
        slug: 'referrals-jobs',
        description: 'Verified employee referrals and job openings across top Indian tech companies.',
        icon: '💼',
        isVipOnly: true,
        postsCount: 31
      }
    ]
  },
  {
    id: 'comm_design_guild',
    creatorId: 'creator_priya',
    creatorName: 'Priya Nair',
    creatorUsername: 'priyaui',
    name: 'Bharat Product & UI/UX Guild',
    slug: 'product-ui-guild',
    tagline: 'Crafting world-class design systems and high-converting micro-interactions.',
    description: 'A focused collective of Indian product designers, Figma wizards, and UI/UX freelancers scaling to $5k+/month clients.',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    category: 'Design & Product',
    isPublic: true,
    membersCount: 890,
    activeOnlineCount: 92,
    isJoined: false,
    userRole: 'guest',
    postsCount: 142,
    createdAt: '2025-01-20',
    rules: [
      'Provide constructive design feedback with visual references.',
      'Respect copyright and attribution for UI kits.'
    ],
    tiers: [
      {
        id: 'tier_design_free',
        name: 'Free Design Circle',
        type: 'free',
        price: 0,
        description: 'Access to general feedback and design inspiration channels.',
        perks: ['Access to open channels', 'Weekly design critiques'],
        badgeText: 'Designer'
      },
      {
        id: 'tier_design_pro',
        name: 'Pro UI Guild',
        type: 'paid',
        price: 399,
        billingPeriod: 'monthly',
        description: 'Direct Figma review sessions, freelance client lead board, and production UI kits.',
        perks: [
          'Exclusive Figma asset library',
          'Live Portfolio Tear-downs',
          'Global freelance client board'
        ],
        badgeText: 'Pro Designer',
        isPopular: true
      }
    ],
    channels: [
      {
        id: 'chan_design_announce',
        name: 'Announcements',
        slug: 'announcements',
        description: 'Design challenges and workshops.',
        icon: '📢',
        isAnnouncementsOnly: true,
        postsCount: 8
      },
      {
        id: 'chan_design_feedback',
        name: 'Portfolio Roast',
        slug: 'portfolio-roast',
        description: 'Share your Figma links and live sites for honest feedback.',
        icon: '🎨',
        postsCount: 84
      }
    ]
  }
];

export const INITIAL_COMMUNITY_MEMBERS: CommunityMember[] = [
  {
    id: 'mem_1',
    communityId: 'comm_tech_faang',
    name: 'Aarav Sharma',
    username: 'aaravtech',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    role: 'creator',
    tierId: 'tier_lifetime',
    tierName: 'Elite Founder',
    bio: 'Ex-Google & Uber SDE. Creator of CreatorOS Bharat. Helping 50k+ Indian engineers crack top tech.',
    location: 'Bengaluru, India',
    joinedAt: '2025-01-10',
    reputationPoints: 1250,
    badges: ['Community Founder', 'Top Mentor', 'Verified Creator']
  },
  {
    id: 'mem_2',
    communityId: 'comm_tech_faang',
    name: 'Rohan Mehta',
    username: 'rohan_sde',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    role: 'moderator',
    tierId: 'tier_vip_pro',
    tierName: 'VIP Pro',
    bio: 'Staff Engineer @ Razorpay. Distributed systems nerd & Golang fanboy.',
    location: 'Pune, India',
    joinedAt: '2025-01-12',
    reputationPoints: 680,
    badges: ['Lead Moderator', 'System Architect', 'Top Contributor']
  },
  {
    id: 'mem_3',
    communityId: 'comm_tech_faang',
    name: 'Ananya Verma',
    username: 'ananya_code',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    role: 'vip',
    tierId: 'tier_vip_pro',
    tierName: 'VIP Pro',
    bio: 'Frontend Engineer @ Swiggy. Building with Next.js 15, Tailwind and Framer Motion.',
    location: 'Hyderabad, India',
    joinedAt: '2025-01-15',
    reputationPoints: 420,
    badges: ['VIP Pro', 'Active Solver']
  },
  {
    id: 'mem_4',
    communityId: 'comm_tech_faang',
    name: 'Vikram Joshi',
    username: 'vikram_j',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    role: 'member',
    tierId: 'tier_free',
    tierName: 'Community Access',
    bio: 'Final year CS student @ BITS Pilani. Preparing for off-campus tech placements.',
    location: 'Delhi NCR, India',
    joinedAt: '2025-01-22',
    reputationPoints: 115,
    badges: ['Rising Star']
  },
  {
    id: 'mem_5',
    communityId: 'comm_tech_faang',
    name: 'Kavita Sundaram',
    username: 'kavita_tech',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
    role: 'member',
    tierId: 'tier_free',
    tierName: 'Community Access',
    bio: 'Backend Engineer transitioning to Rust & Kafka pipelines.',
    location: 'Chennai, India',
    joinedAt: '2025-02-01',
    reputationPoints: 95,
    badges: ['New Member']
  }
];

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post_announcement_1',
    communityId: 'comm_tech_faang',
    channelId: 'chan_announcements',
    channelName: 'Announcements',
    authorId: 'mem_1',
    authorName: 'Aarav Sharma',
    authorUsername: 'aaravtech',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    authorRole: 'creator',
    title: '🚨 LIVE Masterclass: Designing UPI Payment Gateways for 100k TPS (Sunday 7 PM IST)',
    content: `Hey engineers! This Sunday we are hosting an exclusive deep dive on how NPCI, PhonePe and Razorpay process millions of concurrent UPI transactions with sub-50ms latency.

Topics Covered:
1. Idempotency Keys & Distributed Transaction Locks
2. Kafka Event Streaming for Bank Webhooks
3. Zero-loss ledger reconciliation with PostgreSQL row-level locks
4. Live Q&A and System Design Whiteboarding

VIP Pro members will get the complete Figma architecture blueprints and recording directly in the dashboard!`,
    categoryTag: 'Broadcast',
    isAnnouncement: true,
    isPinned: true,
    isLocked: false,
    likesCount: 142,
    commentsCount: 28,
    viewsCount: 1850,
    hasLiked: true,
    createdAt: '2 hours ago',
    attachments: [
      { title: 'UPI-High-Concurrency-Architecture.pdf', url: 'https://example.com/upi-arch.pdf', type: 'pdf' },
      { title: 'Google Meet RSVP Link', url: 'https://meet.google.com/xyz-bharat', type: 'link' }
    ],
    comments: [
      {
        id: 'comm_c1',
        postId: 'post_announcement_1',
        authorId: 'mem_2',
        authorName: 'Rohan Mehta',
        authorUsername: 'rohan_sde',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        authorRole: 'moderator',
        content: 'Super excited! Will share some real production incident learnings from our payment routing cluster as well.',
        createdAt: '1 hour ago',
        likesCount: 19,
        hasLiked: true
      },
      {
        id: 'comm_c2',
        postId: 'post_announcement_1',
        authorId: 'mem_3',
        authorName: 'Ananya Verma',
        authorUsername: 'ananya_code',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
        authorRole: 'vip',
        content: 'Calendar blocked! Can we also discuss fallback queues for bank downtime handling?',
        createdAt: '45 mins ago',
        likesCount: 7
      }
    ]
  },
  {
    id: 'post_tech_2',
    communityId: 'comm_tech_faang',
    channelId: 'chan_system_design',
    channelName: 'System Design Hub',
    authorId: 'mem_2',
    authorName: 'Rohan Mehta',
    authorUsername: 'rohan_sde',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    authorRole: 'moderator',
    title: 'Why we migrated from Redis Pub/Sub to Redis Streams for Real-time WhatsApp Invoicing',
    content: `A quick production post-mortem for anyone building high-volume notification bots:

Redis Pub/Sub has zero persistence—if a consumer pod crashes while receiving an order event, that WhatsApp invoice delivery message is permanently lost.

By switching to Redis Streams with Consumer Groups:
- At-least-once delivery guarantee
- Persistent message backlog with ACK confirmation
- Native dead-letter queues for invalid Indian phone numbers (+91)`,
    categoryTag: 'Architecture',
    isAnnouncement: false,
    isPinned: false,
    isLocked: false,
    likesCount: 88,
    commentsCount: 14,
    viewsCount: 730,
    hasLiked: false,
    createdAt: '5 hours ago',
    comments: [
      {
        id: 'comm_c3',
        postId: 'post_tech_2',
        authorId: 'mem_4',
        authorName: 'Vikram Joshi',
        authorUsername: 'vikram_j',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        authorRole: 'member',
        content: 'This is gold. How do you handle duplicate ACKs when Redis consumer timeouts trigger re-delivery?',
        createdAt: '3 hours ago',
        likesCount: 4
      }
    ]
  },
  {
    id: 'post_referrals_3',
    communityId: 'comm_tech_faang',
    channelId: 'chan_referrals',
    channelName: 'Referrals & Hiring',
    authorId: 'mem_3',
    authorName: 'Ananya Verma',
    authorUsername: 'ananya_code',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    authorRole: 'vip',
    title: '🔥 Swiggy Hiring: SDE-2 & Senior Frontend Engineers (Bengaluru / Hybrid)',
    content: `Our Food Delivery Core team is expanding! Looking for engineers with:
- 2-5 years experience in React, Next.js, and TypeScript
- Strong understanding of Core Web Vitals, SSR caching, and client performance
- Experience building high-scale consumer mobile-web interfaces

VIP members can drop a comment with their resume link or DM me on WhatsApp directly for fast-track referral routing!`,
    categoryTag: 'Hiring',
    isAnnouncement: false,
    isPinned: false,
    isLocked: false,
    likesCount: 64,
    commentsCount: 22,
    viewsCount: 940,
    hasLiked: true,
    createdAt: '1 day ago',
    comments: [
      {
        id: 'comm_c4',
        postId: 'post_referrals_3',
        authorId: 'mem_4',
        authorName: 'Vikram Joshi',
        authorUsername: 'vikram_j',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        authorRole: 'member',
        content: 'Shared my resume on your DM Ananya, thank you so much!',
        createdAt: '18 hours ago',
        likesCount: 2
      }
    ]
  }
];

