import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({
    hasStripeSecret: !!process.env.STRIPE_SECRET_KEY,
    hasStripePublishable: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    hasShippo: !!process.env.SHIPPO_API_KEY,
    hasSiteUrl: !!process.env.NEXT_PUBLIC_SITE_URL,
    stripeKeyLength: process.env.STRIPE_SECRET_KEY?.length || 0,
    // Don't expose actual keys, just check if they exist
    allEnvKeys: Object.keys(process.env).filter(key =>
      key.includes('STRIPE') || key.includes('SHIPPO') || key.includes('SITE')
    ),
  });
}
