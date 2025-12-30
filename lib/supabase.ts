import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Debug logging
if (typeof window !== 'undefined') {
  console.log('🔍 Supabase Config Check:');
  console.log('URL exists:', !!supabaseUrl);
  console.log('Key exists:', !!supabaseAnonKey);
  console.log('URL value:', supabaseUrl?.substring(0, 30) + '...');
}

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(`Missing Supabase credentials. URL: ${!!supabaseUrl}, Key: ${!!supabaseAnonKey}`);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side client with service role (only available on server)
// This should NEVER be imported in client components
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const _supabaseAdmin = serviceRoleKey
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

// Export with non-null assertion for API routes (they run on server)
// In browser, this will be null which is fine since it's never used there
export const supabaseAdmin = _supabaseAdmin as ReturnType<typeof createClient>;

// Database types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  compare_price?: number;
  category_id: string;
  images: string[] | null;
  stock: number;
  featured: boolean;
  is_new: boolean;
  age_range?: string;
  brand?: string;
  created_at: string;
  updated_at: string;
}

// Helper to normalize product data from database
export function normalizeProduct(product: any): Product {
  return {
    ...product,
    images: Array.isArray(product.images) ? product.images : [],
    featured: product.featured ?? false,
    is_new: product.is_new ?? false,
    stock: product.stock ?? 0,
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parent_id?: string;
  created_at: string;
}

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  product?: Product;
}

export interface Order {
  id: string;
  customer_email: string;
  customer_name: string;
  shipping_address: {
    line1: string;
    line2?: string;
    city: string;
    postal_code: string;
    country: string;
  };
  items: {
    product_id: string;
    product_name: string;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  stripe_payment_intent_id?: string;
  created_at: string;
  updated_at: string;
}
