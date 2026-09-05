import { query } from './db';

/**
 * PostgreSQL Database Migrations for CreatorOS Bharat
 * Automatically sets up and initializes tables including the Membership Subscription feature.
 */
export async function runDatabaseMigrations(): Promise<{ success: boolean; message: string; tables: string[] }> {
  const migrations = [
    // 1. Enable uuid extension
    `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`,

    // 2. subscription_plans table
    `CREATE TABLE IF NOT EXISTS subscription_plans (
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
    );`,

    // 3. subscriptions table
    `CREATE TABLE IF NOT EXISTS subscriptions (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id VARCHAR(64) NOT NULL,
      plan_id UUID NOT NULL REFERENCES subscription_plans(id) ON DELETE CASCADE,
      status VARCHAR(32) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'past_due', 'halted', 'pending')),
      start_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      renewal_date TIMESTAMP WITH TIME ZONE NOT NULL,
      razorpay_subscription_id TEXT
    );`,

    // 4. subscription_payments table
    `CREATE TABLE IF NOT EXISTS subscription_payments (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      subscription_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
      amount NUMERIC(10, 2) NOT NULL,
      payment_status VARCHAR(32) NOT NULL DEFAULT 'success' CHECK (payment_status IN ('success', 'failed', 'refunded')),
      payment_method VARCHAR(64) NOT NULL DEFAULT 'UPI' CHECK (payment_method IN ('UPI', 'Card', 'Net Banking', 'Razorpay Autopay')),
      transaction_id TEXT NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`,

    // 5. Indices
    `CREATE INDEX IF NOT EXISTS idx_sub_plans_creator ON subscription_plans(creator_id);`,
    `CREATE INDEX IF NOT EXISTS idx_sub_plans_popular ON subscription_plans(is_popular);`,
    `CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id);`,
    `CREATE INDEX IF NOT EXISTS idx_subscriptions_plan ON subscriptions(plan_id);`,
    `CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);`,
    `CREATE INDEX IF NOT EXISTS idx_subscriptions_renewal ON subscriptions(renewal_date);`,
    `CREATE INDEX IF NOT EXISTS idx_sub_payments_sub ON subscription_payments(subscription_id);`,
    `CREATE INDEX IF NOT EXISTS idx_sub_payments_tx ON subscription_payments(transaction_id);`
  ];

  try {
    for (const sql of migrations) {
      await query(sql);
    }

    return {
      success: true,
      message: 'PostgreSQL Membership Subscription schema migrated successfully.',
      tables: ['subscription_plans', 'subscriptions', 'subscription_payments']
    };
  } catch (error: any) {
    console.warn('Database migration encountered an error (local fallback active):', error?.message || error);
    return {
      success: false,
      message: error?.message || 'Migration execution failed',
      tables: []
    };
  }
}
