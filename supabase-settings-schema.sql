-- Settings Table for Store Configuration
-- Run this in Supabase SQL Editor

-- Create settings table (single row for store settings)
CREATE TABLE IF NOT EXISTS store_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    store_name VARCHAR(255) DEFAULT 'JungleeToys',
    support_email VARCHAR(255) DEFAULT 'hello@jungleetoys.com',
    phone VARCHAR(50),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    postal_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'United Kingdom',
    currency VARCHAR(3) DEFAULT 'GBP',
    free_shipping_threshold DECIMAL(10, 2) DEFAULT 50.00,
    tax_rate DECIMAL(5, 2) DEFAULT 0,
    facebook_url VARCHAR(500),
    instagram_url VARCHAR(500),
    twitter_url VARCHAR(500),
    about_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default settings (only one row should exist)
INSERT INTO store_settings (id)
VALUES ('00000000-0000-0000-0000-000000000001')
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to settings
CREATE POLICY "Allow public read access to settings" ON store_settings
    FOR SELECT USING (true);

-- Allow authenticated updates (you can change this to admin-only later)
CREATE POLICY "Allow updates to settings" ON store_settings
    FOR UPDATE USING (true);

-- Trigger to update updated_at timestamp
CREATE TRIGGER update_store_settings_updated_at
    BEFORE UPDATE ON store_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Grant permissions
GRANT SELECT ON store_settings TO anon, authenticated;
GRANT UPDATE ON store_settings TO authenticated;
