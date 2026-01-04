import Link from 'next/link';
import { Package, Truck, Clock, MapPin, CheckCircle, Info } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-jungle-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/" className="text-white hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Shipping Information</h1>
          <p className="text-jungle-200">Fast, reliable delivery across the UK</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Shipping Rates */}
        <section className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Package className="h-8 w-8 text-jungle-600" />
            <h2 className="text-2xl font-bold text-gray-900">Shipping Rates</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-jungle-50 border-2 border-jungle-600 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-jungle-900">FREE Delivery 🎉</h3>
                <span className="text-2xl font-bold text-jungle-600">£0.00</span>
              </div>
              <p className="text-gray-700">On all orders over £30</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">Standard Delivery</h3>
                <span className="text-xl font-bold text-gray-900">£3.99</span>
              </div>
              <p className="text-gray-600">For orders under £30</p>
            </div>
          </div>
        </section>

        {/* Delivery Times */}
        <section className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="h-8 w-8 text-jungle-600" />
            <h2 className="text-2xl font-bold text-gray-900">Delivery Times</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-jungle-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Standard Delivery</h3>
                <p className="text-gray-600">3-5 working days from dispatch</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-jungle-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Order Processing</h3>
                <p className="text-gray-600">Orders placed before 2pm are processed the same day</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <CheckCircle className="h-6 w-6 text-jungle-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Tracking</h3>
                <p className="text-gray-600">You'll receive a tracking number once your order is dispatched</p>
              </div>
            </div>
          </div>
        </section>

        {/* Delivery Areas */}
        <section className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="h-8 w-8 text-jungle-600" />
            <h2 className="text-2xl font-bold text-gray-900">Delivery Areas</h2>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">🇬🇧 United Kingdom</h3>
              <p className="text-gray-600">
                We deliver to all UK mainland addresses, including England, Scotland, Wales, and Northern Ireland.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Remote Areas</h4>
              <p className="text-gray-600 text-sm">
                Delivery to Scottish Highlands, Islands, and other remote areas may take an additional 1-2 working days.
              </p>
            </div>
          </div>
        </section>

        {/* Shipping Information */}
        <section className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Info className="h-8 w-8 text-jungle-600" />
            <h2 className="text-2xl font-bold text-gray-900">Important Information</h2>
          </div>

          <div className="space-y-4 text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Address Details</h3>
              <p>Please ensure your delivery address is complete and accurate. We cannot be held responsible for delays due to incorrect address information.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Missed Deliveries</h3>
              <p>If you miss a delivery, the courier will leave a card with instructions on how to arrange redelivery or collection from your local depot.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact Us</h3>
              <p>If you have any questions about your delivery, please contact us:</p>
              <ul className="mt-2 space-y-1">
                <li>📧 Email: grace@jungleetoys.com</li>
                <li>📞 Phone: +44 7342224136</li>
                <li>📍 Address: 483 Green Lanes, London, N13 4BS, UK</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-jungle-600 rounded-2xl p-8 text-center text-white">
          <Truck className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Ready to Shop?</h2>
          <p className="mb-6 text-jungle-100">
            Browse our amazing collection of toys and enjoy fast, reliable delivery!
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-jungle-600 px-8 py-3 rounded-full font-semibold hover:bg-jungle-50 transition-colors"
          >
            Start Shopping
          </Link>
        </section>
      </div>
    </div>
  );
}
