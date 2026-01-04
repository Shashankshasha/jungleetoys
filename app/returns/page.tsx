import Link from 'next/link';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-jungle-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/" className="text-white hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Returns & Refunds</h1>
          <p className="text-jungle-200">Your rights under UK Consumer Rights Act 2015</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">30-Day Money-Back Guarantee</h2>
            <p className="text-gray-700">
              Under the UK Consumer Rights Act 2015, you have the right to return goods purchased online within 14 days. At JungleeToys, we extend this to 30 days to give you extra peace of mind.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Return</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Email us at <a href="mailto:grace@jungleetoys.com" className="text-jungle-600 hover:underline">grace@jungleetoys.com</a> with your order number</li>
              <li>Pack the item securely in its original packaging</li>
              <li>Send to: JungleeToys Returns, 483 Green Lanes, London, N13 4BS, UK</li>
              <li>We'll process your refund within 14 days of receiving the return</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Return Shipping Costs</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-jungle-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">We Pay Return Shipping:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Faulty or damaged items</li>
                  <li>• Wrong item sent</li>
                  <li>• Item not as described</li>
                </ul>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-bold mb-2">You Pay Return Shipping:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Changed your mind</li>
                  <li>• Ordered wrong item</li>
                  <li>• No longer needed</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700">
              Email: <a href="mailto:grace@jungleetoys.com" className="text-jungle-600 hover:underline">grace@jungleetoys.com</a><br/>
              Phone: <a href="tel:+447342224136" className="text-jungle-600 hover:underline">+44 7342224136</a><br/>
              Address: 483 Green Lanes, London, N13 4BS, UK
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
