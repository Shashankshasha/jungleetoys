'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  CreditCard,
  Lock,
  Truck,
  Gift,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { useCart, formatPrice } from '@/lib/cart';

interface ShippingForm {
  email: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  postcode: string;
  country: string;
  phone: string;
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);

  const [shipping, setShipping] = useState<ShippingForm>({
    email: '',
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    postcode: '',
    country: 'GB',
    phone: '',
  });

  const cartSubtotal = subtotal();
  const shippingCost = cartSubtotal >= 30 ? 0 : 3.99; // Flat £3.99 shipping
  const giftWrapCost = giftWrap ? 3.99 : 0;
  const total = cartSubtotal + shippingCost + giftWrapCost;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = async () => {
    setIsLoading(true);
    setError('');

    try {
      // In production, call your API to create Stripe checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          })),
          shipping,
          giftWrap,
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        // For demo purposes, simulate success
        setStep('confirmation');
        clearCart();
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-jungle-50">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="font-display text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/products" className="btn-jungle">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-jungle-50">
      {/* Header */}
      <div className="bg-white border-b border-jungle-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/products"
              className="flex items-center gap-2 text-gray-600 hover:text-jungle-600"
            >
              <ChevronLeft className="h-5 w-5" />
              Continue Shopping
            </Link>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-jungle-600" />
              <span className="text-sm text-gray-600">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-jungle-100">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center gap-4">
            {['shipping', 'payment', 'confirmation'].map((s, idx) => (
              <div key={s} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm
                            ${step === s || (s === 'shipping' && step !== 'shipping')
                              ? 'bg-jungle-600 text-white'
                              : 'bg-jungle-100 text-jungle-600'}`}
                >
                  {idx + 1}
                </div>
                <span
                  className={`ml-2 text-sm font-medium capitalize hidden sm:inline
                            ${step === s ? 'text-jungle-600' : 'text-gray-500'}`}
                >
                  {s}
                </span>
                {idx < 2 && (
                  <div className="w-12 sm:w-24 h-0.5 bg-jungle-100 mx-2 sm:mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {step === 'confirmation' ? (
          /* Confirmation Step */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center py-12"
          >
            <div className="w-20 h-20 bg-jungle-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-jungle-600" />
            </div>
            <h1 className="font-display text-3xl font-bold text-gray-900 mb-4">
              Thank You! 🎉
            </h1>
            <p className="text-gray-600 mb-8">
              Your order has been placed successfully. You will receive a confirmation email shortly.
            </p>
            <div className="bg-jungle-50 rounded-2xl p-6 mb-8">
              <p className="text-sm text-gray-600 mb-2">Order Number</p>
              <p className="font-mono text-xl font-bold text-jungle-600">
                JT-{Math.random().toString(36).substring(2, 10).toUpperCase()}
              </p>
            </div>
            <Link href="/products" className="btn-jungle">
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <div>
              {step === 'shipping' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <h2 className="font-display text-2xl font-bold mb-6">
                    Shipping Information
                  </h2>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={shipping.email}
                        onChange={e => setShipping({ ...shipping, email: e.target.value })}
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Name */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={shipping.firstName}
                          onChange={e => setShipping({ ...shipping, firstName: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={shipping.lastName}
                          onChange={e => setShipping({ ...shipping, lastName: e.target.value })}
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 1 *
                      </label>
                      <input
                        type="text"
                        required
                        value={shipping.address1}
                        onChange={e => setShipping({ ...shipping, address1: e.target.value })}
                        placeholder="123 Main Street"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 2 (Optional)
                      </label>
                      <input
                        type="text"
                        value={shipping.address2}
                        onChange={e => setShipping({ ...shipping, address2: e.target.value })}
                        placeholder="Apartment, suite, etc."
                      />
                    </div>

                    {/* City & Postcode */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={shipping.city}
                          onChange={e => setShipping({ ...shipping, city: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Postcode *
                        </label>
                        <input
                          type="text"
                          required
                          value={shipping.postcode}
                          onChange={e => setShipping({ ...shipping, postcode: e.target.value })}
                          placeholder="RH10 1AB"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={shipping.phone}
                        onChange={e => setShipping({ ...shipping, phone: e.target.value })}
                        placeholder="+44 7123 456789"
                      />
                    </div>

                    {/* Gift Wrap */}
                    <div className="bg-banana-50 rounded-xl p-4 border-2 border-banana-200">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={giftWrap}
                          onChange={e => setGiftWrap(e.target.checked)}
                          className="rounded border-banana-300 text-banana-600"
                        />
                        <Gift className="h-5 w-5 text-banana-600" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            Add Gift Wrapping (+£3.99)
                          </p>
                          <p className="text-sm text-gray-600">
                            Beautiful gift wrap with a bow 🎀
                          </p>
                        </div>
                      </label>
                    </div>

                    <button type="submit" className="w-full btn-jungle">
                      Continue to Payment
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <button
                    onClick={() => setStep('shipping')}
                    className="flex items-center gap-2 text-gray-600 hover:text-jungle-600 mb-6"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back to Shipping
                  </button>

                  <h2 className="font-display text-2xl font-bold mb-6">Payment</h2>

                  {/* Shipping Summary */}
                  <div className="bg-jungle-50 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Truck className="h-5 w-5 text-jungle-600" />
                      <span className="font-semibold">Shipping to:</span>
                    </div>
                    <p className="text-gray-600 text-sm">
                      {shipping.firstName} {shipping.lastName}
                      <br />
                      {shipping.address1}
                      {shipping.address2 && <>, {shipping.address2}</>}
                      <br />
                      {shipping.city}, {shipping.postcode}
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 flex items-center gap-3">
                      <AlertCircle className="h-5 w-5 shrink-0" />
                      {error}
                    </div>
                  )}

                  {/* Payment Button */}
                  <div className="space-y-4">
                    <button
                      onClick={handlePayment}
                      disabled={isLoading}
                      className="w-full btn-jungle flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <CreditCard className="h-5 w-5" />
                      {isLoading ? 'Processing...' : `Pay ${formatPrice(total)}`}
                    </button>

                    <p className="text-center text-sm text-gray-500 flex items-center justify-center gap-2">
                      <Lock className="h-4 w-4" />
                      Secured by Stripe
                    </p>

                    {/* Payment Methods */}
                    <div className="flex items-center justify-center gap-4 pt-4 border-t border-jungle-100">
                      <span className="text-xs text-gray-500">We accept:</span>
                      <div className="flex gap-2">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                          Visa
                        </span>
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                          Mastercard
                        </span>
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                          Amex
                        </span>
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                          PayPal
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:pl-8 lg:border-l border-jungle-100">
              <div className="sticky top-24">
                <h2 className="font-display text-xl font-bold mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4 mb-6">
                  {items.map(item => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="relative w-20 h-20 bg-jungle-50 rounded-xl overflow-hidden shrink-0">
                        {item.product.images?.[0] ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-2xl">
                            🧸
                          </div>
                        )}
                        <span className="absolute -top-1 -right-1 bg-jungle-600 text-white text-xs 
                                       w-5 h-5 rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        <p className="font-semibold text-jungle-600">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-jungle-100 pt-4 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(cartSubtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>
                      {shippingCost === 0 ? (
                        <span className="text-jungle-600 font-medium">FREE</span>
                      ) : (
                        formatPrice(shippingCost)
                      )}
                    </span>
                  </div>
                  {giftWrap && (
                    <div className="flex justify-between text-gray-600">
                      <span>Gift Wrap 🎁</span>
                      <span>{formatPrice(giftWrapCost)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xl font-bold pt-3 border-t border-jungle-100">
                    <span>Total</span>
                    <span className="text-jungle-600">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promo Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1"
                    />
                    <button className="btn-tiger py-2 px-4 text-sm">Apply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
