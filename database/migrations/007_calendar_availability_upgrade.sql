-- ============================================================================
-- MIGRATION 007: CALENDAR AVAILABILITY UPGRADE (TIMEZONE & HOLIDAY BLOCKING)
-- ============================================================================

-- 1. Alter calendar_availability to add timezone and blocked_holidays columns
ALTER TABLE calendar_availability ADD COLUMN IF NOT EXISTS timezone VARCHAR(64) DEFAULT 'Asia/Kolkata';
ALTER TABLE calendar_availability ADD COLUMN IF NOT EXISTS blocked_holidays JSONB DEFAULT '[]'::jsonb;
