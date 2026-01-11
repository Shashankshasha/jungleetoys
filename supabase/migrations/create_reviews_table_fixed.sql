-- Create reviews table for product reviews (only if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create indexes for faster queries (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON public.reviews(approved);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Anyone can view approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can create reviews" ON public.reviews;
DROP POLICY IF EXISTS "Authenticated users can update reviews" ON public.reviews;
DROP POLICY IF EXISTS "Authenticated users can delete reviews" ON public.reviews;

-- Create fresh policies
CREATE POLICY "Anyone can view approved reviews"
  ON public.reviews
  FOR SELECT
  USING (approved = true);

CREATE POLICY "Anyone can create reviews"
  ON public.reviews
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update reviews"
  ON public.reviews
  FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete reviews"
  ON public.reviews
  FOR DELETE
  USING (auth.role() = 'authenticated');

-- Create or replace function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_reviews_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS reviews_updated_at ON public.reviews;

-- Create trigger to automatically update updated_at
CREATE TRIGGER reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_reviews_updated_at();
