import {
  Creator,
  StoreTheme,
  DigitalProduct,
  Course,
  BookingService,
  Order,
  WhatsAppNotification,
  BrandCollabBrief,
  MediaKitData
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
    brandLogo: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=120&q=80',
    industry: 'Consumer Electronics',
    category: 'Audio & Wearables',
    matchScore: 98,
    title: 'boAt Airdopes Pro Wireless ANC — Deep Focus Study & Coding Routine',
    description: 'Looking for tech, student, and developer creators to showcase 100-hour battery life and Active Noise Cancellation during intense coding sprints, college study sessions, or daily commutes.',
    budgetMin: 60000,
    budgetMax: 120000,
    targetNiches: ['Tech & Gadgets', 'Study & Productivity', 'Software Engineering'],
    deliverables: [
      '1x High-production Instagram Reel (Desk Setup / Study with Me)',
      '1x YouTube 60s Integration mid-roll',
      '2x Story Slides with swipe-up discount coupon'
    ],
    deadline: 'In 4 days (Sep 20)',
    applicantsCount: 28,
    verifiedBrand: true,
    status: 'open'
  },
  {
    id: 'brief_swiggy',
    brandName: 'Swiggy',
    brandLogo: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=120&q=80',
    industry: 'Quick Commerce',
    category: 'Instamart & Late Night Snacks',
    matchScore: 97,
    title: 'Swiggy Instamart 10-Minute Desk Snacks & Brain Fuel for Creators',
    description: 'Create an engaging reel highlighting instantaneous 10-minute midnight deliveries of caffeine, munchies, and stationery during deadline crunches, exams, or weekend hackathons.',
    budgetMin: 90000,
    budgetMax: 180000,
    targetNiches: ['Lifestyle', 'Tech & Coding', 'College Life'],
    deliverables: [
      '1x Relatable Problem-Solution Reel with Live Delivery',
      '1x Interactive Story Poll with Exclusive Coupon code',
      'Pinned comment with UTM tracking link'
    ],
    deadline: 'In 3 days (Sep 16)',
    applicantsCount: 34,
    verifiedBrand: true,
    status: 'open'
  },
  {
    id: 'brief_zomato',
    brandName: 'Zomato',
    brandLogo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=120&q=80',
    industry: 'Food Tech',
    category: 'Food Delivery & Dining',
    matchScore: 96,
    title: 'Zomato Gold: Ultimate Weekend Treat & Late-Night Coding Fuel',
    description: 'Craft funny, highly relatable reels featuring Zomato Gold 1+1 dining and free delivery benefits. Perfect for engineers celebrating placed job offers or student group orders.',
    budgetMin: 80000,
    budgetMax: 160000,
    targetNiches: ['Comedy & Skits', 'Food & Dining', 'Tech Culture'],
    deliverables: [
      '1x Relatable Humor / Developer Celebration Reel',
      '2x Story Slides with Zomato Gold referral link'
    ],
    deadline: 'In 6 days (Sep 22)',
    applicantsCount: 42,
    verifiedBrand: true,
    status: 'open'
  },
  {
    id: 'brief_nykaa',
    brandName: 'Nykaa',
    brandLogo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=120&q=80',
    industry: 'Beauty & Wellness',
    category: 'Beauty & Personal Care',
    matchScore: 94,
    title: 'Nykaa Festive Glow & Daily Screen-Time Skincare Routine',
    description: 'Showcase your morning or evening desk skincare ritual protecting against screen blue light and urban pollution. Highlight top serums and sunscreen from Nykaa.',
    budgetMin: 75000,
    budgetMax: 140000,
    targetNiches: ['Lifestyle & Beauty', 'Self Care', 'Creator Routine'],
    deliverables: [
      '1x Aesthetic GRWM / Desk Skincare Reel',
      '2x High-res Product Story Slides with Direct Nykaa Tags',
      '1x Pinned Comment with affiliate voucher'
    ],
    deadline: 'In 8 days (Sep 18)',
    applicantsCount: 19,
    verifiedBrand: true,
    status: 'open'
  },
  {
    id: 'brief_myntra',
    brandName: 'Myntra',
    brandLogo: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=120&q=80',
    industry: 'Fashion & E-Commerce',
    category: 'Fashion & Gen-Z Trends',
    matchScore: 91,
    title: 'Myntra Big Fashion Festival: Techie Workwear to Weekend Fits',
    description: 'Transform your look from smart-casual developer WFH hoodies to festive weekend outfits using Myntra top curated brands with express delivery.',
    budgetMin: 70000,
    budgetMax: 150000,
    targetNiches: ['Fashion & Styling', 'Gen-Z Culture', 'Lifestyle'],
    deliverables: [
      '1x Fast-Paced Transition Lookbook Reel (3 Outfits)',
      '3x Story Slides with Direct Myntra Product Shortlinks'
    ],
    deadline: 'In 11 days (Sep 25)',
    applicantsCount: 23,
    verifiedBrand: true,
    status: 'open'
  },
  {
    id: 'brief_mamaearth',
    brandName: 'Mamaearth',
    brandLogo: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=120&q=80',
    industry: 'D2C Personal Care',
    category: 'Toxin-Free Skincare',
    matchScore: 89,
    title: 'Mamaearth Vitamin C Daily Defense for Working Professionals',
    description: 'Highlight the benefits of natural, toxin-free Vitamin C face wash and sunscreen for creators and professionals who spend 10+ hours in front of monitors and cameras.',
    budgetMin: 50000,
    budgetMax: 110000,
    targetNiches: ['Clean Beauty', 'Daily Routine', 'Health & Wellness'],
    deliverables: [
      '1x Honest Review / Routine Integration Reel',
      '1x WhatsApp Broadcast mention to community members',
      '1x Story Slide with Mamaearth 20% Coupon Code'
    ],
    deadline: 'In 14 days (Sep 28)',
    applicantsCount: 16,
    verifiedBrand: true,
    status: 'open'
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
