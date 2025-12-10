-- JungleeToys Database Schema for Supabase
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories Table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    image VARCHAR(500),
    parent_id UUID REFERENCES categories(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products Table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    compare_price DECIMAL(10, 2),
    category_id UUID REFERENCES categories(id),
    images TEXT[] DEFAULT '{}',
    stock INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT TRUE,
    age_range VARCHAR(50),
    brand VARCHAR(100),
    sku VARCHAR(50),
    weight DECIMAL(10, 2),
    dimensions JSONB,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(20) UNIQUE,
    stripe_session_id VARCHAR(255),
    stripe_payment_intent_id VARCHAR(255),
    customer_email VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255),
    shipping_address JSONB,
    billing_address JSONB,
    items JSONB NOT NULL DEFAULT '[]',
    subtotal DECIMAL(10, 2) NOT NULL,
    shipping DECIMAL(10, 2) DEFAULT 0,
    tax DECIMAL(10, 2) DEFAULT 0,
    discount DECIMAL(10, 2) DEFAULT 0,
    amount_total DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'GBP',
    status VARCHAR(20) DEFAULT 'pending',
    notes TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Items Table (for detailed tracking)
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id),
    product_name VARCHAR(255) NOT NULL,
    product_price DECIMAL(10, 2) NOT NULL,
    quantity INTEGER NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customers Table (optional - for tracking)
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    phone VARCHAR(50),
    default_address JSONB,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    customer_email VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    content TEXT,
    verified_purchase BOOLEAN DEFAULT FALSE,
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Promo Codes Table
CREATE TABLE promo_codes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    discount_type VARCHAR(20) NOT NULL, -- 'percentage' or 'fixed'
    discount_value DECIMAL(10, 2) NOT NULL,
    min_order_value DECIMAL(10, 2) DEFAULT 0,
    max_uses INTEGER,
    used_count INTEGER DEFAULT 0,
    valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    valid_until TIMESTAMP WITH TIME ZONE,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_featured ON products(featured) WHERE featured = TRUE;
CREATE INDEX idx_products_is_new ON products(is_new) WHERE is_new = TRUE;
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.order_number := 'JT-' || UPPER(SUBSTRING(MD5(NEW.id::TEXT) FROM 1 FOR 8));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate order number
CREATE TRIGGER set_order_number
    BEFORE INSERT ON orders
    FOR EACH ROW
    EXECUTE FUNCTION generate_order_number();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Insert sample categories
INSERT INTO categories (name, slug, description) VALUES
    ('Action Figures', 'action-figures', 'Super heroes, villains, and action-packed figures'),
    ('Educational', 'educational', 'Learning toys that make education fun'),
    ('Outdoor Play', 'outdoor', 'Toys for outdoor adventures and sports'),
    ('Board Games', 'board-games', 'Family fun board games and puzzles'),
    ('Building Blocks', 'building-blocks', 'Construction and building sets'),
    ('Dolls & Plush', 'dolls-plush', 'Dolls, stuffed animals, and plush toys'),
    ('Vehicles', 'vehicles', 'Cars, trucks, trains, and more'),
    ('Arts & Crafts', 'arts-crafts', 'Creative supplies and craft kits');

-- Insert sample products
INSERT INTO products (name, slug, description, price, compare_price, category_id, stock, featured, is_new, age_range, brand) VALUES
    ('Super Hero Action Figure Set', 'super-hero-action-figure-set', 'Amazing collection of 6 super hero action figures with accessories', 24.99, 34.99, (SELECT id FROM categories WHERE slug = 'action-figures'), 15, TRUE, TRUE, '5-12 years', 'HeroWorld'),
    ('Wooden Building Blocks (100 pcs)', 'wooden-building-blocks-100', 'Educational wooden blocks in various shapes and colors', 29.99, NULL, (SELECT id FROM categories WHERE slug = 'building-blocks'), 25, TRUE, FALSE, '3-8 years', 'EduPlay'),
    ('Remote Control Racing Car', 'rc-racing-car', 'High-speed RC car with rechargeable battery', 39.99, 49.99, (SELECT id FROM categories WHERE slug = 'vehicles'), 8, TRUE, TRUE, '8+ years', 'SpeedKing'),
    ('Cuddly Teddy Bear XL', 'cuddly-teddy-bear-xl', 'Super soft and huggable teddy bear, 60cm tall', 19.99, NULL, (SELECT id FROM categories WHERE slug = 'dolls-plush'), 30, TRUE, FALSE, '0-99 years', 'CuddlePals'),
    ('Science Experiment Kit', 'science-experiment-kit', '50+ experiments to explore physics and chemistry', 34.99, NULL, (SELECT id FROM categories WHERE slug = 'educational'), 12, FALSE, TRUE, '8-14 years', 'ScienceWiz'),
    ('Dinosaur World Playset', 'dinosaur-world-playset', '12 realistic dinosaur figures with playmat', 22.99, NULL, (SELECT id FROM categories WHERE slug = 'action-figures'), 18, TRUE, FALSE, '4-10 years', 'DinoLand'),
    ('Musical Learning Tablet', 'musical-learning-tablet', 'Interactive tablet with songs, games and learning activities', 44.99, NULL, (SELECT id FROM categories WHERE slug = 'educational'), 5, TRUE, TRUE, '2-5 years', 'LearnFun'),
    ('Art Studio Deluxe Kit', 'art-studio-deluxe-kit', 'Complete art set with paints, brushes, and canvas', 32.99, NULL, (SELECT id FROM categories WHERE slug = 'arts-crafts'), 15, FALSE, TRUE, '5-12 years', 'CreativeKids');

-- Insert sample promo code
INSERT INTO promo_codes (code, description, discount_type, discount_value, min_order_value) VALUES
    ('JUNGLE20', '20% off your first order!', 'percentage', 20, 0),
    ('FREESHIP', 'Free shipping on all orders', 'fixed', 4.99, 20);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Allow public read access to products and categories
CREATE POLICY "Allow public read access to products" ON products
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to categories" ON categories
    FOR SELECT USING (true);

-- RLS Policies - Restrict order access
CREATE POLICY "Users can view their own orders" ON orders
    FOR SELECT USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON products, categories TO anon, authenticated;
GRANT ALL ON orders, order_items, customers, reviews TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
