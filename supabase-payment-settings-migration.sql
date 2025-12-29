-- Payment Settings Migration
-- Run this in Supabase SQL Editor to add payment configuration

-- Add payment method toggles
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS stripe_enabled BOOLEAN DEFAULT true;
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS paypal_enabled BOOLEAN DEFAULT false;
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS cod_enabled BOOLEAN DEFAULT false;
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS bank_transfer_enabled BOOLEAN DEFAULT false;

-- Add Stripe configuration
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS stripe_publishable_key TEXT;
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS stripe_secret_key TEXT;

-- Add PayPal configuration
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS paypal_client_id TEXT;
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS paypal_secret TEXT;

-- Add payment display settings
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS payment_currency VARCHAR(3) DEFAULT 'GBP';
ALTER TABLE store_settings ADD COLUMN IF NOT EXISTS processing_fee_percentage DECIMAL(5, 2) DEFAULT 0;

-- Update the default settings row
UPDATE store_settings
SET
    stripe_enabled = true,
    paypal_enabled = false,
    cod_enabled = false,
    bank_transfer_enabled = false,
    payment_currency = 'GBP'
WHERE id = '00000000-0000-0000-0000-000000000001';
