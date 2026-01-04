import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Force dynamic rendering - don't pre-render this route during build
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Fetch all products from Supabase
    const { data, error, count } = await (supabase as any)
      .from('products')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
        details: error,
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      count: count,
      products: data,
      message: `Found ${data?.length || 0} products in database`,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack,
    }, { status: 500 });
  }
}
