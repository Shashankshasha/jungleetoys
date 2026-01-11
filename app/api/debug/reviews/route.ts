import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const checks: any = {
    timestamp: new Date().toISOString(),
    environment: {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 40) + '...',
    },
    clients: {
      supabaseExists: !!supabase,
      supabaseAdminExists: !!supabaseAdmin,
      supabaseHasFrom: typeof supabase?.from === 'function',
      supabaseAdminHasFrom: typeof supabaseAdmin?.from === 'function',
    },
  };

  // Try to query reviews table with regular client
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select('id')
      .limit(1);

    checks.regularClientTest = {
      success: !error,
      error: error ? error.message : null,
      hasData: !!data,
    };
  } catch (e: any) {
    checks.regularClientTest = {
      success: false,
      error: e.message,
    };
  }

  // Try to query reviews table with admin client
  try {
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .select('id')
      .limit(1);

    checks.adminClientTest = {
      success: !error,
      error: error ? error.message : null,
      hasData: !!data,
    };
  } catch (e: any) {
    checks.adminClientTest = {
      success: false,
      error: e.message,
    };
  }

  // Try to insert a test review with admin client
  try {
    const testProductId = '00000000-0000-0000-0000-000000000000'; // dummy UUID
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .insert({
        product_id: testProductId,
        customer_name: 'Test User',
        customer_email: 'test@example.com',
        rating: 5,
        comment: 'Test review',
        approved: false,
      })
      .select()
      .single();

    checks.adminInsertTest = {
      success: !error,
      error: error ? {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      } : null,
      insertedId: data?.id,
    };

    // Clean up test review if it was created
    if (data?.id) {
      await supabaseAdmin.from('reviews').delete().eq('id', data.id);
    }
  } catch (e: any) {
    checks.adminInsertTest = {
      success: false,
      error: e.message,
    };
  }

  return NextResponse.json(checks, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store',
    },
  });
}
