import Link from 'next/link';

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-jungle-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/" className="text-white hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Delivery Information</h1>
          <p className="text-jungle-200">Fast, reliable delivery across the UK</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Options</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-jungle-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-2">Standard Delivery</h3>
                <p className="text-gray-700 mb-2">3-5 working days</p>
                <p className="text-2xl font-bold text-jungle-600 mb-2">£3.99</p>
                <p className="text-sm text-gray-600">Free on orders over £20</p>
              </div>
              <div className="bg-tiger-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-2">Express Delivery</h3>
                <p className="text-gray-700 mb-2">1-2 working days</p>
                <p className="text-2xl font-bold text-tiger-600 mb-2">£6.99</p>
                <p className="text-sm text-gray-600">Order before 2pm for next day</p>
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
