import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Fetch all products from Supabase
    const { data, error, count } = await supabase
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
