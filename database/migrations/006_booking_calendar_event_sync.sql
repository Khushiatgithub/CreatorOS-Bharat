-- ============================================================================
-- MIGRATION 006: BOOKING CALENDAR EVENT SYNC & TIMEZONE SUPPORT
-- ============================================================================

-- 1. Add timezone column to calendar_meetings
ALTER TABLE calendar_meetings ADD COLUMN IF NOT EXISTS timezone VARCHAR(64) DEFAULT 'Asia/Kolkata';

-- 2. Add google_event_id and timezone columns to appointments
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS google_event_id TEXT;
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS timezone VARCHAR(64) DEFAULT 'Asia/Kolkata';

-- 3. Add indices for faster lookup
CREATE INDEX IF NOT EXISTS idx_cal_meetings_event_id ON calendar_meetings(google_event_id);
CREATE INDEX IF NOT EXISTS idx_appointments_event_id ON appointments(google_event_id);
