-- =========================================================================
-- Migration 003: Membership Subscriptions Feature
-- Tables: subscription_plans, subscriptions, subscription_payments
-- =========================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. SUBSCRIPTION_PLANS TABLE
CREATE TABLE IF NOT EXISTS subscription_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id VARCHAR(64) NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    billing_cycle VARCHAR(20) NOT NULL DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'yearly')),
    cover_image TEXT,
    benefits JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_popular BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indices for subscription_plans
CREATE INDEX IF NOT EXISTS idx_sub_plans_creator_id ON subscription_plans(creator_id);
CREATE INDEX IF NOT EXISTS idx_sub_plans_is_popular ON subscription_plans(is_popular);

-- 2. SUBSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id VARCHAR(64) NOT NULL,
    plan_id UUID NOT NULL REFERENCES subscription_plans(id) ON DELETE CASCADE,
    status VARCHAR(32) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'past_due', 'halted', 'pending')),
    start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    renewal_date TIMESTAMP WITH TIME ZONE NOT NULL,
    razorpay_subscription_id TEXT
);

-- Indices for subscriptions
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_plan_id ON subscriptions(plan_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_renewal_date ON subscriptions(renewal_date);

-- 3. SUBSCRIPTION_PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS subscription_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subscription_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
    amount NUMERIC(10, 2) NOT NULL,
    payment_status VARCHAR(32) NOT NULL DEFAULT 'success' CHECK (payment_status IN ('success', 'failed', 'refunded')),
    payment_method VARCHAR(64) NOT NULL DEFAULT 'UPI' CHECK (payment_method IN ('UPI', 'Card', 'Net Banking', 'Razorpay Autopay')),
    transaction_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indices for subscription_payments
CREATE INDEX IF NOT EXISTS idx_sub_payments_sub_id ON subscription_payments(subscription_id);
CREATE INDEX IF NOT EXISTS idx_sub_payments_tx_id ON subscription_payments(transaction_id);
CREATE INDEX IF NOT EXISTS idx_sub_payments_created_at ON subscription_payments(created_at);
