-- =========================================================================
-- CreatorOS Bharat - PostgreSQL Database Schema
-- Production DDL for Indian Creator Monetization & E-Commerce Platform
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE (Creators & Store Owners)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    username VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    bio TEXT,
    avatar_url TEXT,
    theme_id VARCHAR(32) DEFAULT 'theme-bharat-royal',
    state VARCHAR(64) NOT NULL DEFAULT 'Karnataka',
    gst_number VARCHAR(32),
    upi_id VARCHAR(64) NOT NULL DEFAULT 'creator@okaxis',
    upi_name VARCHAR(128) NOT NULL DEFAULT 'CreatorOS Merchant',
    bank_account JSONB NOT NULL DEFAULT '{"accountNumber": "91982345678901", "ifsc": "HDFC0001234", "bankName": "HDFC Bank", "accountHolderName": "Aarav Patel", "accountType": "Current"}',
    social_links JSONB NOT NULL DEFAULT '{"instagram": "@aaravcodes", "youtube": "AaravCodes", "linkedin": "in/aarav-patel", "twitter": "@aaravcodes"}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. PRODUCTS TABLE (Digital Downloads, Sheets, Templates)
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    description TEXT,
    cover_image TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    original_price NUMERIC(10, 2),
    category VARCHAR(64) NOT NULL,
    file_type VARCHAR(32) NOT NULL DEFAULT 'PDF',
    download_url TEXT NOT NULL,
    features JSONB NOT NULL DEFAULT '[]',
    sales_count INTEGER DEFAULT 0,
    rating NUMERIC(3, 1) DEFAULT 5.0,
    reviews_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. COURSES TABLE (Video Cohorts & Curriculums)
CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    description TEXT,
    cover_image TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    original_price NUMERIC(10, 2),
    category VARCHAR(64) NOT NULL,
    level VARCHAR(32) DEFAULT 'All Levels',
    total_duration VARCHAR(32) DEFAULT '12 Hours',
    modules JSONB NOT NULL DEFAULT '[]',
    student_count INTEGER DEFAULT 0,
    rating NUMERIC(3, 1) DEFAULT 4.9,
    reviews_count INTEGER DEFAULT 0,
    certificate_offered BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. BOOKINGS TABLE (1:1 Consultation Services)
CREATE TABLE IF NOT EXISTS bookings (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    cover_image TEXT,
    price NUMERIC(10, 2) NOT NULL,
    original_price NUMERIC(10, 2),
    duration_minutes INTEGER NOT NULL DEFAULT 45,
    session_type VARCHAR(64) NOT NULL,
    platform VARCHAR(32) DEFAULT 'Google Meet',
    available_days JSONB NOT NULL DEFAULT '["Mon", "Wed", "Fri"]',
    time_slots JSONB NOT NULL DEFAULT '["06:00 PM", "07:30 PM", "09:00 PM"]',
    buffer_minutes INTEGER DEFAULT 15,
    bookings_completed INTEGER DEFAULT 0,
    rating NUMERIC(3, 1) DEFAULT 5.0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. APPOINTMENTS TABLE (Scheduled 1:1 Calendar Sessions)
CREATE TABLE IF NOT EXISTS appointments (
    id VARCHAR(64) PRIMARY KEY,
    booking_id VARCHAR(64) REFERENCES bookings(id) ON DELETE SET NULL,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    service_title VARCHAR(255) NOT NULL,
    buyer_name VARCHAR(128) NOT NULL,
    buyer_email VARCHAR(128) NOT NULL,
    buyer_phone VARCHAR(32) NOT NULL,
    date VARCHAR(32) NOT NULL,
    time_slot VARCHAR(32) NOT NULL,
    meet_url TEXT NOT NULL,
    amount_paid NUMERIC(10, 2) NOT NULL,
    order_id VARCHAR(64),
    status VARCHAR(32) DEFAULT 'confirmed',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. ORDERS TABLE (Razorpay & UPI Transaction Ledger)
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(64) PRIMARY KEY,
    order_number VARCHAR(64) UNIQUE NOT NULL,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    buyer_name VARCHAR(128) NOT NULL,
    buyer_email VARCHAR(128) NOT NULL,
    buyer_phone VARCHAR(32) NOT NULL,
    buyer_state VARCHAR(64) NOT NULL DEFAULT 'Maharashtra',
    buyer_gst VARCHAR(32),
    item_type VARCHAR(32) NOT NULL,
    item_id VARCHAR(64) NOT NULL,
    item_title VARCHAR(255) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    gst_rate NUMERIC(4, 2) DEFAULT 18.00,
    cgst NUMERIC(10, 2) DEFAULT 0.00,
    sgst NUMERIC(10, 2) DEFAULT 0.00,
    igst NUMERIC(10, 2) DEFAULT 0.00,
    total_amount NUMERIC(10, 2) NOT NULL,
    is_inter_state BOOLEAN DEFAULT FALSE,
    payment_method VARCHAR(32) NOT NULL DEFAULT 'UPI',
    payment_app VARCHAR(32),
    payment_gateway VARCHAR(32) DEFAULT 'Razorpay',
    razorpay_order_id VARCHAR(128),
    razorpay_payment_id VARCHAR(128),
    upi_ref_id VARCHAR(64),
    invoice_number VARCHAR(64) NOT NULL,
    sac_code VARCHAR(32) DEFAULT '998431',
    status VARCHAR(32) DEFAULT 'completed',
    payment_status VARCHAR(32) DEFAULT 'Paid',
    booking_date VARCHAR(32),
    booking_time_slot VARCHAR(32),
    download_url TEXT,
    delivery_sent_whatsapp BOOLEAN DEFAULT TRUE,
    delivery_sent_email BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. INVOICES TABLE (Official Indian GST Tax Invoices)
CREATE TABLE IF NOT EXISTS invoices (
    id VARCHAR(64) PRIMARY KEY,
    invoice_number VARCHAR(64) UNIQUE NOT NULL,
    order_id VARCHAR(64) REFERENCES orders(id) ON DELETE CASCADE,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
    buyer_name VARCHAR(128) NOT NULL,
    buyer_email VARCHAR(128) NOT NULL,
    buyer_phone VARCHAR(32) NOT NULL,
    buyer_state VARCHAR(64) NOT NULL,
    buyer_gst VARCHAR(32),
    taxable_amount NUMERIC(10, 2) NOT NULL,
    cgst NUMERIC(10, 2) DEFAULT 0.00,
    sgst NUMERIC(10, 2) DEFAULT 0.00,
    igst NUMERIC(10, 2) DEFAULT 0.00,
    total_amount NUMERIC(10, 2) NOT NULL,
    sac_code VARCHAR(32) DEFAULT '998431',
    payment_status VARCHAR(32) DEFAULT 'Paid',
    payment_method VARCHAR(32) DEFAULT 'UPI',
    due_date VARCHAR(32),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. CAMPAIGNS TABLE (Brand Collab Marketplace Briefs)
CREATE TABLE IF NOT EXISTS campaigns (
    id VARCHAR(64) PRIMARY KEY,
    brand_name VARCHAR(128) NOT NULL,
    brand_logo TEXT NOT NULL,
    category VARCHAR(64) NOT NULL,
    campaign_title VARCHAR(255) NOT NULL,
    deliverables JSONB NOT NULL DEFAULT '[]',
    budget_min NUMERIC(10, 2) NOT NULL,
    budget_max NUMERIC(10, 2) NOT NULL,
    creator_match_score INTEGER DEFAULT 95,
    deadline VARCHAR(32) NOT NULL,
    requirements JSONB NOT NULL DEFAULT '[]',
    status VARCHAR(32) DEFAULT 'Open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. CAMPAIGN PROPOSALS TABLE (Creator Pitch Submissions)
CREATE TABLE IF NOT EXISTS campaign_proposals (
    id VARCHAR(64) PRIMARY KEY,
    campaign_id VARCHAR(64) REFERENCES campaigns(id) ON DELETE CASCADE,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    proposed_fee NUMERIC(10, 2) NOT NULL,
    message TEXT NOT NULL,
    deliverables JSONB NOT NULL DEFAULT '[]',
    estimated_turnaround_days INTEGER DEFAULT 7,
    status VARCHAR(32) DEFAULT 'Pending Review',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. ANALYTICS TABLE (Daily Traffic, GMV, & Attribution Snapshots)
CREATE TABLE IF NOT EXISTS analytics (
    id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_gmv NUMERIC(12, 2) DEFAULT 0.00,
    total_orders INTEGER DEFAULT 0,
    storefront_visits INTEGER DEFAULT 0,
    conversion_rate NUMERIC(5, 2) DEFAULT 0.00,
    traffic_sources JSONB NOT NULL DEFAULT '[{"name": "Instagram Bio Link", "visitors": 14200, "percentage": 48, "gmv": 124000}, {"name": "YouTube Video Descriptions", "visitors": 9400, "percentage": 32, "gmv": 82500}, {"name": "LinkedIn Posts", "visitors": 3500, "percentage": 12, "gmv": 31000}, {"name": "WhatsApp Direct", "visitors": 2400, "percentage": 8, "gmv": 20500}]',
    top_cities JSONB NOT NULL DEFAULT '["Bengaluru", "Mumbai", "Delhi NCR", "Hyderabad", "Pune"]',
    device_split JSONB NOT NULL DEFAULT '{"mobile": 84, "desktop": 16}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_products_user ON products(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_razorpay ON orders(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_invoices_user ON invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_user ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_proposals_campaign ON campaign_proposals(campaign_id);
CREATE INDEX IF NOT EXISTS idx_analytics_user_date ON analytics(user_id, date);
