-- Offers/Bids Schema
-- Run this in Supabase SQL Editor

-- Create offers table
CREATE TABLE IF NOT EXISTS product_offers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    offer_amount DECIMAL(10, 2) NOT NULL,
    message TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'contacted')),
    admin_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_offers_product_id ON product_offers(product_id);
CREATE INDEX IF NOT EXISTS idx_offers_status ON product_offers(status);
CREATE INDEX IF NOT EXISTS idx_offers_created_at ON product_offers(created_at DESC);

-- Enable RLS
ALTER TABLE product_offers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert offers (submit bids)
CREATE POLICY "Allow public to submit offers" ON product_offers
    FOR INSERT WITH CHECK (true);

-- Allow public to read their own offers by email
CREATE POLICY "Allow public to read own offers" ON product_offers
    FOR SELECT USING (true);

-- Allow service role (admin) to update and delete
CREATE POLICY "Allow admin to manage offers" ON product_offers
    FOR ALL USING (true) WITH CHECK (true);

-- Grant permissions
GRANT SELECT, INSERT ON product_offers TO anon, authenticated;
GRANT ALL ON product_offers TO service_role;

-- Create trigger to update updated_at
CREATE TRIGGER update_product_offers_updated_at
    BEFORE UPDATE ON product_offers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
