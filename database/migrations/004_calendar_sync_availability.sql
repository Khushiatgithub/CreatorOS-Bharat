-- ============================================================================
-- MIGRATION 004: CALENDAR SYNC, GOOGLE CALENDAR & WEEKLY AVAILABILITY
-- ============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Table: calendar_integrations
CREATE TABLE IF NOT EXISTS calendar_integrations (
  id VARCHAR(64) PRIMARY KEY,
  creator_id VARCHAR(64) NOT NULL,
  provider VARCHAR(32) NOT NULL DEFAULT 'google_calendar',
  account_email TEXT NOT NULL,
  is_connected BOOLEAN NOT NULL DEFAULT TRUE,
  sync_status VARCHAR(32) NOT NULL DEFAULT 'synced' CHECK (sync_status IN ('synced', 'syncing', 'disconnected', 'error')),
  last_synced_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Table: calendar_availability
CREATE TABLE IF NOT EXISTS calendar_availability (
  id VARCHAR(64) PRIMARY KEY,
  creator_id VARCHAR(64) NOT NULL,
  day_of_week VARCHAR(20) NOT NULL CHECK (day_of_week IN ('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')),
  is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  time_slots JSONB NOT NULL DEFAULT '[]'::jsonb,
  buffer_minutes INTEGER NOT NULL DEFAULT 15 CHECK (buffer_minutes IN (15, 30, 60)),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_creator_day UNIQUE (creator_id, day_of_week)
);

-- 4. Table: calendar_meetings
CREATE TABLE IF NOT EXISTS calendar_meetings (
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
);

-- 5. Indices for high performance queries
CREATE INDEX IF NOT EXISTS idx_cal_integ_creator ON calendar_integrations(creator_id);
CREATE INDEX IF NOT EXISTS idx_cal_avail_creator ON calendar_availability(creator_id);
CREATE INDEX IF NOT EXISTS idx_cal_avail_day ON calendar_availability(day_of_week);
CREATE INDEX IF NOT EXISTS idx_cal_meetings_creator ON calendar_meetings(creator_id);
CREATE INDEX IF NOT EXISTS idx_cal_meetings_status ON calendar_meetings(meeting_status);
CREATE INDEX IF NOT EXISTS idx_cal_meetings_date ON calendar_meetings(meeting_date);
