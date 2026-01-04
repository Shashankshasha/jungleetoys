import Link from 'next/link';

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-jungle-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/" className="text-white hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-jungle-200">Find answers to common questions</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Orders & Payment</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-700 text-sm">We accept all major credit/debit cards, PayPal, Apple Pay, and Google Pay. All payments are processed securely through Stripe.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Can I cancel my order?</h3>
                <p className="text-gray-700 text-sm">You can cancel within 2 hours of placing your order. Contact us at grace@jungleetoys.com. After this, you can still return items using our 30-day returns policy.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">How much does delivery cost?</h3>
                <p className="text-gray-700 text-sm">Standard delivery (3-5 days): £3.99 - FREE on orders over £20. Express delivery (1-2 days): £6.99</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Can I track my order?</h3>
                <p className="text-gray-700 text-sm">Yes! Once dispatched, you'll receive a tracking number via email and SMS.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Returns</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">What is your returns policy?</h3>
                <p className="text-gray-700 text-sm">We offer a 30-day money-back guarantee. See our <Link href="/returns" className="text-jungle-600 hover:underline">Returns & Refunds</Link> page for full details.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Safety</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Are all toys safety tested?</h3>
                <p className="text-gray-700 text-sm">Yes! All our toys comply with UK and EU safety standards (EN71, CE marking, UKCA marking).</p>
              </div>
            </div>
          </section>

          <section className="bg-jungle-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
            <p className="text-gray-700 mb-4">Our customer service team is here to help:</p>
            <p className="text-gray-700">
              Email: <a href="mailto:grace@jungleetoys.com" className="text-jungle-600 hover:underline">grace@jungleetoys.com</a><br/>
              Phone: <a href="tel:+447342224136" className="text-jungle-600 hover:underline">+44 7342224136</a><br/>
              Hours: Monday-Friday, 9am-5pm GMT
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
