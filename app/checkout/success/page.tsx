'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Mail, Home } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    // Generate order number (in production, this would come from your database)
    if (sessionId) {
      setOrderNumber(`JT-${sessionId.substring(0, 10).toUpperCase()}`);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-jungle-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full text-center py-12"
      >
        {/* Success Icon */}
        <div className="w-20 h-20 bg-jungle-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-jungle-600" />
        </div>

        {/* Thank You Message */}
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-4">
          Thank You! 🎉
        </h1>
        <p className="text-gray-600 mb-8">
          Your order has been placed successfully. You will receive a confirmation email shortly.
        </p>

        {/* Order Number */}
        {orderNumber && (
          <div className="bg-jungle-50 rounded-2xl p-6 mb-8">
            <p className="text-sm text-gray-600 mb-2">Order Number</p>
            <p className="font-mono text-xl font-bold text-jungle-600">
              {orderNumber}
            </p>
          </div>
        )}

        {/* Next Steps */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-jungle-100">
          <h2 className="font-semibold text-gray-900 mb-4">What happens next?</h2>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-jungle-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Order Confirmation</p>
                <p className="text-sm text-gray-600">
                  Check your email for order details and receipt
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Package className="h-5 w-5 text-jungle-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Processing</p>
                <p className="text-sm text-gray-600">
                  We'll prepare your order and send shipping updates
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/products" className="btn-jungle flex-1">
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="flex-1 bg-white border-2 border-jungle-200 text-jungle-700 px-6 py-3 rounded-xl font-semibold hover:bg-jungle-50 transition-all flex items-center justify-center gap-2"
          >
            <Home className="h-5 w-5" />
            Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
