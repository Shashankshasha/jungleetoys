import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Create order in database
      try {
        const { error } = await supabaseAdmin.from('orders').insert({
          stripe_session_id: session.id,
          stripe_payment_intent_id: session.payment_intent as string,
          customer_email: session.customer_email,
          customer_name: session.metadata?.customerName,
          amount_total: session.amount_total ? session.amount_total / 100 : 0,
          currency: session.currency,
          status: 'paid',
          shipping_address: session.shipping_details?.address,
          metadata: session.metadata,
          created_at: new Date().toISOString(),
        });

        if (error) {
          console.error('Failed to create order:', error);
        } else {
          console.log('Order created successfully:', session.id);
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('Payment failed:', paymentIntent.id);
      // Handle failed payment (send email, update order status, etc.)
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

