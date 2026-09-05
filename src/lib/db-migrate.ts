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
    // 6. calendar_integrations table
    `CREATE TABLE IF NOT EXISTS calendar_integrations (
      id VARCHAR(64) PRIMARY KEY,
      creator_id VARCHAR(64) NOT NULL,
      provider VARCHAR(32) NOT NULL DEFAULT 'google_calendar',
      account_email TEXT NOT NULL,
      is_connected BOOLEAN NOT NULL DEFAULT TRUE,
      sync_status VARCHAR(32) NOT NULL DEFAULT 'synced' CHECK (sync_status IN ('synced', 'syncing', 'disconnected', 'error')),
      last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`,

    // 7. calendar_availability table
    `CREATE TABLE IF NOT EXISTS calendar_availability (
      id VARCHAR(64) PRIMARY KEY,
      creator_id VARCHAR(64) NOT NULL,
      day_of_week VARCHAR(20) NOT NULL CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
      is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
      time_slots JSONB NOT NULL DEFAULT '[]'::jsonb,
      buffer_minutes INTEGER NOT NULL DEFAULT 15 CHECK (buffer_minutes IN (15, 30, 60)),
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT uq_creator_day UNIQUE (creator_id, day_of_week)
    );`,

    // 8. calendar_meetings table
    `CREATE TABLE IF NOT EXISTS calendar_meetings (
      id VARCHAR(64) PRIMARY KEY,
      creator_id VARCHAR(64) NOT NULL,
      student_name TEXT NOT NULL,
      student_email TEXT NOT NULL,
      student_avatar TEXT,
      student_phone TEXT,
      meeting_title TEXT NOT NULL,
      meeting_date VARCHAR(32) NOT NULL,
      meeting_time VARCHAR(64) NOT NULL,
      duration_minutes INTEGER NOT NULL DEFAULT 45,
      meeting_status VARCHAR(32) NOT NULL DEFAULT 'confirmed' CHECK (meeting_status IN ('confirmed', 'upcoming', 'completed', 'cancelled', 'rescheduled')),
      meeting_url TEXT NOT NULL,
      google_event_id TEXT,
      topic TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );`,

    // 9. Calendar Indices
    `CREATE INDEX IF NOT EXISTS idx_cal_integ_creator ON calendar_integrations(creator_id);`,
    `CREATE INDEX IF NOT EXISTS idx_cal_avail_creator ON calendar_availability(creator_id);`,
    `CREATE INDEX IF NOT EXISTS idx_cal_meetings_creator ON calendar_meetings(creator_id);`,
    `CREATE INDEX IF NOT EXISTS idx_cal_meetings_status ON calendar_meetings(meeting_status);`
  ];

  try {
    for (const sql of migrations) {
      await query(sql);
    }

    return {
      success: true,
      message: 'PostgreSQL Membership Subscription & Calendar Sync schema migrated successfully.',
      tables: [
        'subscription_plans',
        'subscriptions',
        'subscription_payments',
        'calendar_integrations',
        'calendar_availability',
        'calendar_meetings'
      ]
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
