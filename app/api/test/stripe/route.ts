import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function GET(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json({
        success: false,
        error: 'STRIPE_SECRET_KEY not found in environment',
        allEnvKeys: Object.keys(process.env).filter(k => k.includes('STRIPE')),
      });
    }

    // Try to initialize Stripe
    const stripe = new Stripe(secretKey, {
      apiVersion: '2024-06-20',
    });

    // Try to make a simple API call to verify the key works
    const balance = await stripe.balance.retrieve();

    return NextResponse.json({
      success: true,
      keyExists: true,
      keyLength: secretKey.length,
      keyPrefix: secretKey.substring(0, 7),
      apiWorks: true,
      balance: balance.available[0]?.currency || 'connected',
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      keyExists: !!process.env.STRIPE_SECRET_KEY,
    }, { status: 500 });
  }
}
