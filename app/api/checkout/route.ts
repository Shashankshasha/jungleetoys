import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items, shipping, giftWrap, selectedShippingRate } = body;

    // Calculate totals
    const subtotal = items.reduce(
      (sum: number, item: { price: number; quantity: number }) =>
        sum + item.price * item.quantity,
      0
    );

    // Use selected shipping rate or default to free if over £30
    const shippingCost = subtotal >= 30 ? 0 : (selectedShippingRate?.amount ? parseFloat(selectedShippingRate.amount) : 3.99);
    const giftWrapCost = giftWrap ? 3.99 : 0;

    // Create line items for Stripe
    const lineItems = items.map((item: { productId: string; quantity: number; price: number; name: string }) => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Stripe uses pence
      },
      quantity: item.quantity,
    }));

    // Add shipping as a line item if not free
    if (shippingCost > 0) {
      const shippingName = selectedShippingRate?.provider
        ? `${selectedShippingRate.provider} - ${selectedShippingRate.serviceName}`
        : 'Shipping';

      lineItems.push({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: shippingName,
          },
          unit_amount: Math.round(shippingCost * 100),
        },
        quantity: 1,
      });
    }

    // Add gift wrap if selected
    if (giftWrap) {
      lineItems.push({
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'Gift Wrapping 🎁',
          },
          unit_amount: Math.round(giftWrapCost * 100),
        },
        quantity: 1,
      });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
      customer_email: shipping.email,
      shipping_address_collection: {
        allowed_countries: ['GB', 'IE', 'DE', 'FR', 'ES', 'IT', 'NL', 'BE'],
      },
      metadata: {
        customerName: `${shipping.firstName} ${shipping.lastName}`,
        giftWrap: giftWrap ? 'yes' : 'no',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
