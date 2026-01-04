import Stripe from 'stripe';
import { loadStripe, Stripe as StripeJS } from '@stripe/stripe-js';

// Server-side Stripe client
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// Client-side Stripe promise
let stripePromise: Promise<StripeJS | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

// Calculate shipping based on order total and location
export const calculateShipping = (subtotal: number, country: string): number => {
  // Free shipping over £30 for UK
  if (country === 'GB' && subtotal >= 30) {
    return 0;
  }

  // UK shipping rates - Flat £3.99 for orders under £30
  if (country === 'GB') {
    return 3.99;
  }

  // EU shipping
  const euCountries = ['DE', 'FR', 'ES', 'IT', 'NL', 'BE', 'AT', 'IE', 'PT', 'PL'];
  if (euCountries.includes(country)) {
    return 9.99;
  }

  // Rest of world
  return 14.99;
};
