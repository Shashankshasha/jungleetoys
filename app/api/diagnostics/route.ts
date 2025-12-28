import { NextResponse } from 'next/server';

export async function GET() {
  const diagnostics = {
    timestamp: new Date().toISOString(),
    environmentVariables: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Set' : '❌ Missing',
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? '✅ Set' : '❌ Missing',
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? '✅ Set' : '❌ Missing',
    },
    supabaseUrlPreview: process.env.NEXT_PUBLIC_SUPABASE_URL
      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 20)}...`
      : 'Not set',
  };

  // Test Supabase connection
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );

      const { data, error } = await supabase.from('products').select('count');

      if (error) {
        diagnostics.supabaseConnection = `❌ Failed: ${error.message}`;
      } else {
        diagnostics.supabaseConnection = '✅ Connected successfully';
      }
    } else {
      diagnostics.supabaseConnection = '❌ Cannot test - environment variables missing';
    }
  } catch (error) {
    diagnostics.supabaseConnection = `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }

  return NextResponse.json(diagnostics, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
