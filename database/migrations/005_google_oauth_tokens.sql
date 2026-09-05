-- ============================================================================
-- MIGRATION 005: GOOGLE CALENDAR OAUTH SECURE TOKEN STORAGE
-- ============================================================================

-- Alter calendar_integrations to add OAuth token columns if not exists
ALTER TABLE calendar_integrations ADD COLUMN IF NOT EXISTS access_token TEXT;
ALTER TABLE calendar_integrations ADD COLUMN IF NOT EXISTS refresh_token TEXT;
ALTER TABLE calendar_integrations ADD COLUMN IF NOT EXISTS token_expiry TIMESTAMP WITH TIME ZONE;
ALTER TABLE calendar_integrations ADD COLUMN IF NOT EXISTS scope TEXT;
ALTER TABLE calendar_integrations ADD COLUMN IF NOT EXISTS google_calendar_id TEXT DEFAULT 'primary';
ALTER TABLE calendar_integrations ADD COLUMN IF NOT EXISTS auto_generate_meet BOOLEAN DEFAULT TRUE;
