-- =========================================================================
-- CreatorOS Bharat - PostgreSQL Seed Data
-- =========================================================================

-- 1. SEED USERS
INSERT INTO users (id, username, name, email, bio, avatar_url, theme_id, state, gst_number, upi_id, upi_name, bank_account, social_links)
VALUES 
(
    'creator_aarav',
    'aarav.tech',
    'Aarav Patel',
    'aarav@creatoros.in',
    'Senior SDE @ FAANG | Helping 150,000+ developers crack tech interviews & master system design with visual roadmaps.',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'theme-bharat-royal',
    'Karnataka',
    '29ABCDE1234F1Z5',
    'aarav@okaxis',
    'Aarav Patel Tech OS',
    '{"accountNumber": "91982345678901", "ifsc": "HDFC0001234", "bankName": "HDFC Bank", "accountHolderName": "Aarav Patel", "accountType": "Current"}',
    '{"instagram": "@aaravcodes", "youtube": "AaravCodes", "linkedin": "in/aarav-patel", "twitter": "@aaravcodes"}'
),
(
    'creator_priya',
    'priyadesign.store',
    'Priya Sharma',
    'priya@designos.in',
    'Lead Product Designer | Creating Notion operating systems & UI design systems for modern Indian creators.',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    'theme-saffron-sunrise',
    'Maharashtra',
    '27AABCP1234A1Z1',
    'priya@okhdfcbank',
    'Priya Design Studio',
    '{"accountNumber": "50100456789123", "ifsc": "ICIC0001020", "bankName": "ICICI Bank", "accountHolderName": "Priya Sharma", "accountType": "Current"}',
    '{"instagram": "@priyadesigns", "youtube": "PriyaDesignLab", "linkedin": "in/priyasharma-ui", "twitter": "@priya_ui"}'
)
ON CONFLICT (id) DO NOTHING;

-- 2. SEED PRODUCTS
INSERT INTO products (id, user_id, title, subtitle, description, cover_image, price, original_price, category, file_type, download_url, features, sales_count, rating, reviews_count)
VALUES
(
    'prod_dsa_sheet',
    'creator_aarav',
    'Ultimate FAANG SDE & DSA Master Sheet 2025',
    '450+ Handpicked LeetCode problems with animated visual solutions, time complexity analysis, and pattern cheat sheets.',
    'The complete, step-by-step roadmap to crack Google, Amazon, Microsoft, and Uber technical interviews in India.',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    299.00,
    999.00,
    'Interview Prep',
    'PDF',
    'https://example.com/downloads/FAANG-DSA-MasterSheet.pdf',
    '["450+ Solved coding problems", "Java, C++, Python, TypeScript implementations", "Pattern recognition flashcards", "Free lifetime updates for 2025"]',
    1420,
    4.9,
    184
),
(
    'prod_system_design_cards',
    'creator_aarav',
    'System Design Architecture Flashcards & Blueprint',
    'HLD + LLD real-world architecture breakdowns for UPI gateways, Zomato routing, WhatsApp messaging, and Netflix CDN.',
    'Master distributed caching, database sharding, CAP theorem, and rate limiting with real Indian production case studies.',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    399.00,
    1299.00,
    'System Design',
    'PDF',
    'https://example.com/downloads/SystemDesign-Blueprints.pdf',
    '["24 End-to-end architecture diagrams", "Microservices communication patterns", "Database schema trade-off sheets", "Scalability checklist"]',
    960,
    5.0,
    128
),
(
    'prod_resume_bundle',
    'creator_aarav',
    'ATS-Proof Tech Resume & Portfolio Bundle',
    '3 LaTeX & Figma templates that got candidates shortlisted at Google, Uber, Swiggy, and Razorpay.',
    'Includes bullet point formulas, power verbs, and ATS optimization guidelines tailored for Indian tech hiring.',
    'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80',
    199.00,
    599.00,
    'Career Templates',
    'ZIP',
    'https://example.com/downloads/ATS-Resume-Pack.zip',
    '["3 Overleaf / LaTeX clean source codes", "Figma customizable mockups", "Action verb bank & metrics formula", "Cover letter frameworks"]',
    2150,
    4.8,
    312
),
(
    'prod_freelancer_os',
    'creator_priya',
    'Freelancer Business OS (Notion Dashboard)',
    'All-in-one Notion workspace for Indian freelancers: GST invoicing, client CRM, project boards, and contract templates.',
    'Manage client proposals, milestone payments, deliverables, and income tax estimations in one unified Notion workspace.',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    499.00,
    1499.00,
    'Productivity & Notion',
    'NOTION',
    'https://notion.so/freelancer-os-template-access',
    '["GST compliant invoice generator template", "Client onboarding questionnaire", "Project timeline & scope of work matrix", "Revenue tracker (INR ₹)"]',
    640,
    4.9,
    88
)
ON CONFLICT (id) DO NOTHING;

-- 3. SEED BOOKINGS
INSERT INTO bookings (id, user_id, title, description, cover_image, price, original_price, duration_minutes, session_type, platform, available_days, time_slots, buffer_minutes, bookings_completed, rating)
VALUES
(
    'srv_mock_interview',
    'creator_aarav',
    '1:1 FAANG SDE Mock Interview & Live Coding',
    '60-minute rigorous mock coding or system design interview. Real-time feedback on problem-solving, code cleanliness, and behavioral questions.',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
    1499.00,
    2999.00,
    60,
    'Mock Tech Interview',
    'Google Meet',
    '["Tue", "Thu", "Sat"]',
    '["06:00 PM", "07:30 PM", "09:00 PM"]',
    15,
    68,
    5.0
),
(
    'srv_resume_roast',
    'creator_aarav',
    '1:1 Tech Resume Roast & LinkedIn Optimization',
    '30-minute deep dive into your resume line-by-line. We will rewrite bullet points, optimize for ATS filters, and overhaul your LinkedIn presence.',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    799.00,
    1599.00,
    30,
    'Portfolio / Resume Review',
    'Google Meet',
    '["Mon", "Wed", "Fri"]',
    '["07:00 PM", "08:00 PM", "09:30 PM"]',
    10,
    142,
    4.9
)
ON CONFLICT (id) DO NOTHING;

-- 4. SEED CAMPAIGNS
INSERT INTO campaigns (id, brand_name, brand_logo, category, campaign_title, deliverables, budget_min, budget_max, creator_match_score, deadline, requirements, status)
VALUES
(
    'camp_nykaa',
    'Nykaa Beauty & Tech',
    '💄',
    'Fashion & Lifestyle',
    'Nykaa Grand Festive Glow & App Experience Launch',
    '["1x Instagram Reel (60s)", "2x Story Sequence with Swipe-up Link", "1x LinkedIn Tech Stack Feature"]',
    60000.00,
    95000.00,
    96,
    '25 Oct 2026',
    '["Minimum 50K Indian followers", "High female/youth demographic affinity", "Reel delivered in 4K with captions", "Clear mention of Festive Promo code"]',
    'Open'
),
(
    'camp_boat',
    'boAt Lifestyle',
    '🎧',
    'Consumer Tech & Audio',
    'boAt Nirvana ANC Pro Launch: Sound for Developers',
    '["1x YouTube Video Integration (90s)", "1x Instagram Reel", "Community Post Announcement"]',
    75000.00,
    120000.00,
    98,
    '18 Oct 2026',
    '["Tech / Developer / Productivity niche", "Authentic desk setup integration", "Active noise cancellation demo in busy environment"]',
    'Open'
),
(
    'camp_zomato',
    'Zomato',
    '🛵',
    'Food Tech & Delivery',
    'Zomato Gold Late Night Coder Fuel Campaign',
    '["1x Relatable Instagram Reel", "1x X (Twitter) Viral Thread", "Story with discount code"]',
    45000.00,
    80000.00,
    94,
    '30 Oct 2026',
    '["Engaging storytelling format", "Humorous developer late-night coding context", "100K+ reach potential"]',
    'Open'
)
ON CONFLICT (id) DO NOTHING;

-- 5. SEED ORDERS & INVOICES
INSERT INTO orders (id, order_number, user_id, buyer_name, buyer_email, buyer_phone, buyer_state, item_type, item_id, item_title, amount, cgst, sgst, igst, total_amount, is_inter_state, payment_method, payment_app, payment_gateway, upi_ref_id, invoice_number, sac_code, status, payment_status, download_url)
VALUES
(
    'ord_101',
    'ORD-894121',
    'creator_aarav',
    'Rohan Kulkarni',
    'rohan.kulkarni@gmail.com',
    '+91 98201 12345',
    'Maharashtra',
    'product',
    'prod_dsa_sheet',
    'Ultimate FAANG SDE & DSA Master Sheet 2025',
    299.00,
    0.00,
    0.00,
    53.82,
    352.82,
    TRUE,
    'UPI',
    'PhonePe',
    'Razorpay',
    'UPI492817291048',
    'INV-2026-00421',
    '998431',
    'completed',
    'Paid',
    'https://example.com/downloads/FAANG-DSA-MasterSheet.pdf'
),
(
    'ord_102',
    'ORD-894122',
    'creator_aarav',
    'Sneha Iyer',
    'sneha.iyer@gmail.com',
    '+91 98450 98765',
    'Karnataka',
    'product',
    'prod_system_design_cards',
    'System Design Architecture Flashcards & Blueprint',
    399.00,
    35.91,
    35.91,
    0.00,
    470.82,
    FALSE,
    'UPI',
    'GPay',
    'Razorpay',
    'UPI910284719284',
    'INV-2026-00422',
    '998431',
    'completed',
    'Paid',
    'https://example.com/downloads/SystemDesign-Blueprints.pdf'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO invoices (id, invoice_number, order_id, user_id, buyer_name, buyer_email, buyer_phone, buyer_state, taxable_amount, cgst, sgst, igst, total_amount, sac_code, payment_status, payment_method)
VALUES
(
    'inv_101',
    'INV-2026-00421',
    'ord_101',
    'creator_aarav',
    'Rohan Kulkarni',
    'rohan.kulkarni@gmail.com',
    '+91 98201 12345',
    'Maharashtra',
    299.00,
    0.00,
    0.00,
    53.82,
    352.82,
    '998431',
    'Paid',
    'UPI'
),
(
    'inv_102',
    'INV-2026-00422',
    'ord_102',
    'creator_aarav',
    'Sneha Iyer',
    'sneha.iyer@gmail.com',
    '+91 98450 98765',
    'Karnataka',
    399.00,
    35.91,
    35.91,
    0.00,
    470.82,
    '998431',
    'Paid',
    'UPI'
)
ON CONFLICT (id) DO NOTHING;

-- 6. SEED ANALYTICS
INSERT INTO analytics (id, user_id, date, total_gmv, total_orders, storefront_visits, conversion_rate)
VALUES
(
    'analytics_aarav_today',
    'creator_aarav',
    CURRENT_DATE,
    258000.00,
    4280,
    34200,
    12.50
)
ON CONFLICT (id) DO NOTHING;
