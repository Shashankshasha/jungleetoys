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
        // Fetch line items from Stripe
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
          limit: 100,
        });

        // Calculate subtotal and shipping
        let subtotal = 0;
        let shipping = 0;
        const items: any[] = [];

        lineItems.data.forEach((item) => {
          const itemTotal = (item.amount_total || 0) / 100;
          const itemName = item.description || '';

          if (itemName.toLowerCase().includes('shipping')) {
            shipping = itemTotal;
          } else if (!itemName.toLowerCase().includes('gift wrap')) {
            subtotal += itemTotal;
          }

          items.push({
            name: itemName,
            quantity: item.quantity || 1,
            price: (item.price?.unit_amount || 0) / 100,
            total: itemTotal,
          });
        });

        const { error } = await (supabaseAdmin as any).from('orders').insert({
          stripe_session_id: session.id,
          stripe_payment_intent_id: session.payment_intent as string,
          customer_email: session.customer_email,
          customer_name: session.metadata?.customerName || session.customer_details?.name,
          amount_total: session.amount_total ? session.amount_total / 100 : 0,
          subtotal,
          shipping,
          currency: session.currency?.toUpperCase() || 'GBP',
          status: 'paid',
          shipping_address: session.shipping_details?.address || session.customer_details?.address,
          items: items,
          metadata: {
            ...session.metadata,
            customer_phone: session.customer_details?.phone,
          },
          created_at: new Date().toISOString(),
        });

        if (error) {
          console.error('Failed to create order:', error);
        } else {
          console.log('Order created successfully:', session.id);

          // TODO: Send confirmation email
          // TODO: Create shipping label
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

