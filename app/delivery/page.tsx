import Link from 'next/link';
import { TreePalm, Package, Clock, MapPin, Truck, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Delivery Information | JungleeToys',
  description: 'Delivery information, shipping times, and costs for JungleeToys UK',
};

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-jungle-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-jungle-600 to-jungle-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors">
            <TreePalm className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Delivery Information</h1>
          <p className="text-xl text-jungle-100">Fast, reliable delivery across the UK</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-12">

          {/* Delivery Options */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Truck className="h-6 w-6 text-jungle-600" />
              <h2 className="text-2xl font-display font-bold text-gray-900">Delivery Options</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Standard Delivery */}
              <div className="bg-jungle-50 p-6 rounded-xl border border-jungle-100">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Standard Delivery</h3>
                <p className="text-gray-700 mb-4">3-5 working days</p>
                <p className="text-2xl font-bold text-jungle-600 mb-4">£3.99</p>
                <p className="text-sm text-gray-600">Free on orders over £20</p>
              </div>

              {/* Express Delivery */}
              <div className="bg-tiger-50 p-6 rounded-xl border border-tiger-100">
                <h3 className="font-bold text-lg text-gray-900 mb-2">Express Delivery</h3>
                <p className="text-gray-700 mb-4">1-2 working days</p>
                <p className="text-2xl font-bold text-tiger-600 mb-4">£6.99</p>
                <p className="text-sm text-gray-600">Order before 2pm for next day delivery</p>
              </div>
            </div>
          </section>

          {/* Delivery Areas */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="h-6 w-6 text-jungle-600" />
              <h2 className="text-2xl font-display font-bold text-gray-900">Delivery Areas</h2>
            </div>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>We currently deliver to the following areas:</p>

              <div className="bg-gray-50 p-6 rounded-xl space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-jungle-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Mainland UK</p>
                    <p className="text-sm text-gray-600">England, Scotland, and Wales - Standard and Express delivery available</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-jungle-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Northern Ireland</p>
                    <p className="text-sm text-gray-600">Additional 1-2 working days - Standard delivery only</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-jungle-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">Scottish Highlands & Islands</p>
                    <p className="text-sm text-gray-600">Additional 2-3 working days may apply - £4.99 surcharge</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 italic">
                Please note: We do not currently deliver to BFPO addresses or the Channel Islands.
              </p>
            </div>
          </section>

          {/* Order Processing */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Clock className="h-6 w-6 text-jungle-600" />
              <h2 className="text-2xl font-display font-bold text-gray-900">Order Processing</h2>
            </div>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                Orders placed before 2pm (Monday to Friday) will be processed the same day. Orders placed after 2pm or on weekends will be processed the next working day.
              </p>
              <p>
                You will receive an email confirmation when your order has been dispatched, including tracking information so you can monitor your delivery.
              </p>
              <div className="bg-jungle-50 p-6 rounded-xl border border-jungle-100">
                <p className="font-semibold text-gray-900 mb-2">Order Tracking</p>
                <p className="text-gray-700">
                  Once dispatched, you can track your order using the tracking number provided in your dispatch confirmation email. You'll also receive SMS updates on the day of delivery.
                </p>
              </div>
            </div>
          </section>

          {/* Packaging */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Package className="h-6 w-6 text-jungle-600" />
              <h2 className="text-2xl font-display font-bold text-gray-900">Packaging & Safety</h2>
            </div>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                All toys are carefully packaged to ensure they arrive in perfect condition. We use recyclable packaging materials wherever possible.
              </p>
              <p>
                For safety reasons, certain items (particularly those with small parts or choking hazards) are clearly labeled and packaged in accordance with UK toy safety regulations.
              </p>
            </div>
          </section>

          {/* Missed Deliveries */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Missed Deliveries</h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                If you're not home when delivery is attempted, the courier will leave a card with instructions on how to:
              </p>
              <ul className="space-y-2 ml-6">
                <li>Arrange redelivery at a convenient time</li>
                <li>Collect from a local depot or collection point</li>
                <li>Authorize delivery to a safe location</li>
              </ul>
              <p>
                Parcels will be held at the local depot for 7 days before being returned to us. If your parcel is returned, we'll contact you to arrange redelivery (additional delivery charges may apply).
              </p>
            </div>
          </section>

          {/* Damaged or Lost Parcels */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Damaged or Lost Parcels</h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                If your parcel arrives damaged, please:
              </p>
              <ol className="space-y-2 ml-6">
                <li>Take photos of the damaged packaging and product</li>
                <li>Keep all packaging materials</li>
                <li>Contact us within 48 hours at <a href="mailto:grace@jungleetoys.com" className="text-jungle-600 hover:underline">grace@jungleetoys.com</a></li>
              </ol>
              <p>
                If your parcel hasn't arrived within the expected timeframe, please check your tracking information first. If there's no update after 7 working days, contact us and we'll investigate with the courier.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-jungle-50 p-6 rounded-xl border border-jungle-100">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about delivery, please contact our customer service team:
            </p>
            <div className="space-y-2 text-gray-700">
              <p>📧 Email: <a href="mailto:grace@jungleetoys.com" className="text-jungle-600 hover:underline">grace@jungleetoys.com</a></p>
              <p>📞 Phone: <a href="tel:+447342224136" className="text-jungle-600 hover:underline">+44 7342224136</a></p>
              <p className="text-sm text-gray-600 mt-4">Customer service hours: Monday-Friday, 9am-5pm GMT</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
