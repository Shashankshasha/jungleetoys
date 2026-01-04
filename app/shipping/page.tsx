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
            <h2 className="text-2xl font-bold text-gray-900">Shipping Options</h2>
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
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Choose Your Shipping Method at Checkout</h3>
              <p className="text-gray-600 mb-4">
                For orders under £30, you can choose from multiple shipping options at checkout, including:
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">📮 Royal Mail 2nd Class</p>
                    <p className="text-sm text-gray-500">Most economical option</p>
                  </div>
                  <span className="text-gray-700 font-semibold">From £3.30</span>
                </div>

                <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">📦 Royal Mail 1st Class</p>
                    <p className="text-sm text-gray-500">Faster delivery</p>
                  </div>
                  <span className="text-gray-700 font-semibold">From £4.50</span>
                </div>

                <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">🚚 DPD / Parcelforce</p>
                    <p className="text-sm text-gray-500">Tracked delivery</p>
                  </div>
                  <span className="text-gray-700 font-semibold">From £6.00</span>
                </div>
              </div>

              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>💡 Pro Tip:</strong> Final shipping prices are calculated at checkout based on your location and parcel weight.
                  All prices include a 50% handling fee to cover packaging, processing, and delivery.
                </p>
              </div>
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

        {/* Shipping Costs & Handling */}
        <section className="bg-white rounded-2xl p-8 shadow-sm border-2 border-jungle-200">
          <div className="flex items-center gap-3 mb-6">
            <Package className="h-8 w-8 text-jungle-600" />
            <h2 className="text-2xl font-bold text-gray-900">Shipping Costs & Handling Fee</h2>
          </div>

          <div className="space-y-4 text-gray-600">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">How Shipping Costs Work</h3>
              <p>
                We partner with trusted UK carriers (Royal Mail, DPD, Parcelforce) to deliver your toys safely.
                At checkout, you'll see real-time shipping options with accurate pricing based on your location and package weight.
              </p>
            </div>

            <div className="bg-jungle-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">50% Handling Fee Explained</h3>
              <p className="mb-3">
                All shipping prices include a 50% handling fee to cover:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-jungle-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Professional Packaging:</strong> Quality boxes, bubble wrap, and protective materials to keep your toys safe</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-jungle-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Order Processing:</strong> Careful picking, packing, and quality checking of every order</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-jungle-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Shipping Labels & Documentation:</strong> Professional labels and necessary customs forms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-jungle-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Local Collection:</strong> Travel costs to and from the post office/courier depot</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Example Pricing</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="mb-2">If carrier charges <strong>£2.20</strong> for shipping:</p>
                <p className="text-sm">• Carrier cost: £2.20</p>
                <p className="text-sm">• Handling fee (50%): £1.10</p>
                <p className="text-sm font-semibold text-jungle-600 mt-2">• Your total: £3.30</p>
              </div>
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
