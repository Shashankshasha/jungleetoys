import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-jungle-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-display font-bold mb-4">Terms & Conditions</h1>
          <p className="text-jungle-200">Last updated: January 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">

          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Welcome to JungleeToys</h2>
            <p className="text-gray-700 leading-relaxed">
              These terms and conditions outline the rules and regulations for the use of JungleeToys' website,
              located at www.jungleetoys.com. By accessing this website we assume you accept these terms and
              conditions. Do not continue to use JungleeToys if you do not agree to all of the terms and conditions
              stated on this page.
            </p>
          </section>

          {/* Definitions */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Definitions</h2>
            <div className="space-y-3">
              <div className="border-l-4 border-jungle-500 pl-4">
                <p className="font-semibold text-gray-900">"We", "Us", "Our"</p>
                <p className="text-gray-700">Refers to JungleeToys</p>
              </div>
              <div className="border-l-4 border-jungle-500 pl-4">
                <p className="font-semibold text-gray-900">"You", "Your"</p>
                <p className="text-gray-700">Refers to the user or viewer of our website</p>
              </div>
              <div className="border-l-4 border-jungle-500 pl-4">
                <p className="font-semibold text-gray-900">"Website"</p>
                <p className="text-gray-700">Refers to www.jungleetoys.com and all associated pages</p>
              </div>
            </div>
          </section>

          {/* License */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">License</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Unless otherwise stated, JungleeToys and/or its licensors own the intellectual property rights for all
              material on JungleeToys. All intellectual property rights are reserved. You may access this from
              JungleeToys for your own personal use subjected to restrictions set in these terms and conditions.
            </p>
            <p className="text-gray-700 font-semibold mb-2">You must not:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Republish material from JungleeToys</li>
              <li>Sell, rent or sub-license material from JungleeToys</li>
              <li>Reproduce, duplicate or copy material from JungleeToys</li>
              <li>Redistribute content from JungleeToys without permission</li>
            </ul>
          </section>

          {/* Online Purchases */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Online Purchases</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Information</h3>
                <p className="text-gray-700 leading-relaxed">
                  We make every effort to display as accurately as possible the colors, features, specifications, and
                  details of the products available on the website. However, we do not guarantee that the colors,
                  features, specifications, and details of the products will be accurate, complete, reliable, current,
                  or free of other errors.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing</h3>
                <p className="text-gray-700 leading-relaxed">
                  All prices are stated in British Pounds (GBP) and include VAT where applicable. We reserve the right
                  to change prices at any time. Prices are confirmed at the time of order placement.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment</h3>
                <p className="text-gray-700 leading-relaxed">
                  We accept payment via credit/debit card through Stripe. All transactions are secure and encrypted.
                  Payment is processed at the time of order placement. For approved offers, you will receive a secure
                  payment link via email.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Confirmation</h3>
                <p className="text-gray-700 leading-relaxed">
                  Once your order is placed, you will receive an email confirmation. This confirmation does not
                  constitute acceptance of your order - acceptance occurs when we dispatch the goods to you.
                </p>
              </div>
            </div>
          </section>

          {/* Make an Offer */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Make an Offer Feature</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our "Make an Offer" feature allows customers to submit price offers on selected products:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>All offers are subject to review and approval by JungleeToys</li>
              <li>We reserve the right to accept or reject any offer without providing a reason</li>
              <li>Approved offers are valid for 7 days from the date of approval</li>
              <li>You will receive an email with a secure payment link if your offer is approved</li>
              <li>Completing payment via the link constitutes acceptance of the offer price</li>
              <li>Standard delivery terms apply to approved offers</li>
            </ul>
          </section>

          {/* Delivery */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Delivery</h2>
            <div className="bg-jungle-50 p-6 rounded-xl space-y-3">
              <div>
                <p className="font-semibold text-gray-900">🚚 Standard Delivery (1-2 business days)</p>
                <p className="text-gray-700">Available on orders placed before 5pm</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">📦 Free Delivery</p>
                <p className="text-gray-700">On orders over £20</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">🌍 Delivery Areas</p>
                <p className="text-gray-700">We deliver to UK addresses. International shipping may be available - please contact us.</p>
              </div>
            </div>
          </section>

          {/* Returns */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Returns & Refunds</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We want you to be completely satisfied with your purchase. If you're not happy with your order:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>You have 30 days from receipt to return unopened items</li>
              <li>Items must be in original condition with all packaging and tags</li>
              <li>Refunds will be processed within 14 days of receiving the returned item</li>
              <li>Return shipping costs are the responsibility of the customer unless the item is faulty</li>
              <li>Some items may not be eligible for return due to hygiene reasons</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              To initiate a return, please contact us at{' '}
              <a href="mailto:grace@jungleetoys.com" className="text-jungle-600 hover:underline">
                grace@jungleetoys.com
              </a>
            </p>
          </section>

          {/* Product Safety */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Product Safety</h2>
            <p className="text-gray-700 leading-relaxed">
              All our toys meet UK and EU safety standards. Please always check the age recommendations and safety
              warnings on product packaging. Adult supervision is recommended for young children. We are not
              responsible for misuse of products or failure to follow safety guidelines.
            </p>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">User Accounts</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you create an account with us, you must provide accurate and complete information. You are
              responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Maintaining the security of your account and password</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorized use</li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              To the fullest extent permitted by law, JungleeToys shall not be liable for any indirect, incidental,
              special, consequential or punitive damages, or any loss of profits or revenues, whether incurred
              directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mt-4">
              <li>Your use or inability to use our website or services</li>
              <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
              <li>Any interruption or cessation of transmission to or from our website</li>
              <li>Any bugs, viruses, or the like that may be transmitted to or through our website by any third party</li>
            </ul>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of England and
              Wales. You irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of any material changes by
              posting the new terms on this page. Your continued use of the website after any changes constitutes
              acceptance of the new terms.
            </p>
          </section>

          {/* Contact */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms & Conditions, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p>📧 Email: <a href="mailto:grace@jungleetoys.com" className="text-jungle-600 hover:underline">grace@jungleetoys.com</a></p>
              <p>📞 Phone: <a href="tel:+447342224136" className="text-jungle-600 hover:underline">+44 7342224136</a></p>
              <p>📍 Address: 483 Green Lanes, London, N13 4BS, UK</p>
            </div>
          </section>

        </div>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-jungle-600 hover:text-jungle-700 font-medium">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
