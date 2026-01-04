import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-jungle-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/" className="text-white hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-jungle-200">We're here to help!</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-jungle-50 p-6 rounded-lg">
                <h3 className="font-bold mb-3">📧 Email</h3>
                <p className="text-gray-700">
                  <a href="mailto:grace@jungleetoys.com" className="text-jungle-600 hover:underline font-semibold">grace@jungleetoys.com</a>
                </p>
                <p className="text-sm text-gray-600 mt-2">We typically respond within 24 hours</p>
              </div>

              <div className="bg-jungle-50 p-6 rounded-lg">
                <h3 className="font-bold mb-3">📞 Phone</h3>
                <p className="text-gray-700">
                  <a href="tel:+447342224136" className="text-jungle-600 hover:underline font-semibold">+44 7342224136</a>
                </p>
                <p className="text-sm text-gray-600 mt-2">Monday-Friday, 9am-5pm GMT</p>
              </div>

              <div className="bg-jungle-50 p-6 rounded-lg md:col-span-2">
                <h3 className="font-bold mb-3">📍 Address</h3>
                <p className="text-gray-700">
                  JungleeToys<br/>
                  483 Green Lanes<br/>
                  London, N13 4BS<br/>
                  United Kingdom
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Service Hours</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span className="font-semibold">Monday - Friday:</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Saturday:</span>
                  <span>10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold">Sunday:</span>
                  <span className="text-gray-500">Closed</span>
                </div>
                <p className="text-xs text-gray-500 mt-3">All times in GMT/BST</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Before You Contact Us</h2>
            <p className="text-gray-700 mb-4">You might find your answer faster by checking:</p>
            <ul className="space-y-2 text-gray-700">
              <li>• <Link href="/faq" className="text-jungle-600 hover:underline">FAQ page</Link> for quick answers</li>
              <li>• <Link href="/delivery" className="text-jungle-600 hover:underline">Delivery Information</Link> for shipping queries</li>
              <li>• <Link href="/returns" className="text-jungle-600 hover:underline">Returns & Refunds</Link> policy</li>
            </ul>
          </section>

        </div>
      </div>
    </div>
  );
}
