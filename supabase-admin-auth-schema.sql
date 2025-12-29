-- Admin Authentication Schema
-- Run this in Supabase SQL Editor

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name VARCHAR(255),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only allow service role to access admin_users (no public access)
CREATE POLICY "Service role only" ON admin_users
    FOR ALL USING (false);

-- Create function to verify admin login
CREATE OR REPLACE FUNCTION verify_admin_login(p_email VARCHAR, p_password TEXT)
RETURNS TABLE(id UUID, email VARCHAR, name VARCHAR) AS $$
BEGIN
    RETURN QUERY
    SELECT a.id, a.email, a.name
    FROM admin_users a
    WHERE a.email = p_email
    AND a.password_hash = crypt(p_password, a.password_hash)
    AND a.is_active = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create your first admin user
-- IMPORTANT: Change the email and password before running!
INSERT INTO admin_users (email, password_hash, name)
VALUES (
    'admin@jungleetoys.com',  -- Change this to your email
    crypt('ChangeThisPassword123!', gen_salt('bf')),  -- Change this password!
    'Admin'
)
ON CONFLICT (email) DO NOTHING;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION verify_admin_login TO anon, authenticated;
