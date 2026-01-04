import Link from 'next/link';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-jungle-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-display font-bold mb-4">Cookie Policy</h1>
          <p className="text-jungle-200">Last updated: January 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">

          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">What Are Cookies?</h2>
            <p className="text-gray-700 leading-relaxed">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website.
              They are widely used to make websites work more efficiently, as well as to provide information to the
              website owners.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Cookies help us understand how you use our website, remember your preferences, and improve your overall
              experience. This policy explains how JungleeToys uses cookies and similar technologies.
            </p>
          </section>

          {/* Types of Cookies */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>

            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500">
                <h3 className="text-lg font-bold text-gray-900 mb-2">🔒 Essential Cookies (Always Active)</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  These cookies are necessary for the website to function properly. They enable basic functions like
                  page navigation, access to secure areas, and shopping cart functionality.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Examples:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    <li>Authentication cookies - Keep you logged in</li>
                    <li>Shopping cart cookies - Remember items in your basket</li>
                    <li>Security cookies - Protect against fraud and malicious activity</li>
                    <li>Session cookies - Remember your preferences during your visit</li>
                  </ul>
                </div>
              </div>

              {/* Performance Cookies */}
              <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                <h3 className="text-lg font-bold text-gray-900 mb-2">📊 Performance & Analytics Cookies</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  These cookies help us understand how visitors interact with our website by collecting and reporting
                  information anonymously. This helps us improve our website performance and user experience.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">What we measure:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    <li>Number of visitors to our site</li>
                    <li>Pages visited and time spent on each page</li>
                    <li>How visitors navigate through the site</li>
                    <li>Errors encountered during browsing</li>
                    <li>Device and browser information</li>
                  </ul>
                </div>
              </div>

              {/* Functionality Cookies */}
              <div className="bg-purple-50 p-6 rounded-xl border-l-4 border-purple-500">
                <h3 className="text-lg font-bold text-gray-900 mb-2">⚙️ Functionality Cookies</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  These cookies allow our website to remember choices you make (such as your username, language, or
                  region) and provide enhanced, more personalized features.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Examples:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    <li>Remember your login details</li>
                    <li>Store your preferences (e.g., currency, language)</li>
                    <li>Remember items you've viewed</li>
                    <li>Customize content based on your location</li>
                  </ul>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-orange-50 p-6 rounded-xl border-l-4 border-orange-500">
                <h3 className="text-lg font-bold text-gray-900 mb-2">🎯 Marketing & Advertising Cookies</h3>
                <p className="text-gray-700 leading-relaxed mb-3">
                  These cookies are used to deliver advertisements that are relevant to you and your interests. They
                  also help us measure the effectiveness of our advertising campaigns.
                </p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Used for:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                    <li>Showing relevant ads based on your interests</li>
                    <li>Limiting the number of times you see an ad</li>
                    <li>Measuring ad campaign effectiveness</li>
                    <li>Understanding which ads you've clicked on</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Third Party Cookies */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use services from trusted third-party providers that may set their own cookies:
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-jungle-500 pl-4">
                <h3 className="font-bold text-gray-900">Stripe (Payment Processing)</h3>
                <p className="text-gray-700">Handles secure payment transactions and fraud prevention</p>
                <p className="text-sm text-gray-600 mt-1">
                  Privacy Policy: <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-jungle-600 hover:underline">stripe.com/privacy</a>
                </p>
              </div>

              <div className="border-l-4 border-jungle-500 pl-4">
                <h3 className="font-bold text-gray-900">Google Analytics (if applicable)</h3>
                <p className="text-gray-700">Helps us understand how visitors use our website</p>
                <p className="text-sm text-gray-600 mt-1">
                  Privacy Policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-jungle-600 hover:underline">policies.google.com/privacy</a>
                </p>
              </div>

              <div className="border-l-4 border-jungle-500 pl-4">
                <h3 className="font-bold text-gray-900">Social Media Platforms</h3>
                <p className="text-gray-700">Cookies from Facebook, Instagram, Twitter when you interact with social sharing buttons</p>
              </div>
            </div>
          </section>

          {/* Cookie Duration */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">How Long Do Cookies Last?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-jungle-50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">🕐 Session Cookies</h3>
                <p className="text-gray-700 text-sm">
                  Temporary cookies that are deleted when you close your browser. Used for essential functions like
                  shopping cart management.
                </p>
              </div>
              <div className="bg-jungle-50 p-4 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">📅 Persistent Cookies</h3>
                <p className="text-gray-700 text-sm">
                  Remain on your device for a set period (from a few hours to several years). Used to remember your
                  preferences and improve your experience on return visits.
                </p>
              </div>
            </div>
          </section>

          {/* Managing Cookies */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">How to Manage Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to decide whether to accept or reject cookies. You can manage your cookie preferences
              through your browser settings:
            </p>

            <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500 mb-6">
              <p className="font-semibold text-gray-900 mb-2">⚠️ Important Note:</p>
              <p className="text-gray-700 text-sm">
                If you choose to disable cookies, some features of our website may not function properly. For example,
                you may not be able to add items to your shopping cart or complete a purchase.
              </p>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">🌐 Browser Settings</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Most browsers allow you to control cookies through their settings:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="font-semibold min-w-[100px]">Chrome:</span>
                    <span className="text-gray-700">Settings → Privacy and security → Cookies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold min-w-[100px]">Firefox:</span>
                    <span className="text-gray-700">Options → Privacy & Security → Cookies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold min-w-[100px]">Safari:</span>
                    <span className="text-gray-700">Preferences → Privacy → Cookies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-semibold min-w-[100px]">Edge:</span>
                    <span className="text-gray-700">Settings → Cookies and site permissions</span>
                  </li>
                </ul>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">📱 Mobile Devices</h3>
                <p className="text-gray-700 text-sm">
                  Manage cookies through your device settings or browser app settings. Consult your device
                  manufacturer's documentation for specific instructions.
                </p>
              </div>
            </div>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Under data protection laws, you have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Know what cookies are being set and why</li>
              <li>Accept or reject cookies</li>
              <li>Delete cookies that have already been set</li>
              <li>Request information about data collected through cookies</li>
            </ul>
          </section>

          {/* Updates to Policy */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Updates to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our
              business practices. We encourage you to review this page periodically. The "Last updated" date at the
              top of this page indicates when this policy was last revised.
            </p>
          </section>

          {/* More Information */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">More Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For more information about cookies and how to manage them, visit:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-jungle-600 hover:underline">
                  www.allaboutcookies.org
                </a>
              </li>
              <li>
                <a href="https://www.youronlinechoices.com" target="_blank" rel="noopener noreferrer" className="text-jungle-600 hover:underline">
                  www.youronlinechoices.com
                </a>
              </li>
            </ul>
          </section>

          {/* Contact */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Questions About Cookies?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about our use of cookies, please contact us:
            </p>
            <div className="space-y-2 text-gray-700">
              <p>📧 Email: <a href="mailto:grace@jungleetoys.com" className="text-jungle-600 hover:underline">grace@jungleetoys.com</a></p>
              <p>📞 Phone: <a href="tel:+447342224136" className="text-jungle-600 hover:underline">+44 7342224136</a></p>
              <p>📍 Address: 483 Green Lanes, London, N13 4BS, UK</p>
            </div>
          </section>

        </div>

        {/* Related Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/legal/privacy" className="text-jungle-600 hover:text-jungle-700 font-medium">
            Privacy Policy
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="/legal/terms" className="text-jungle-600 hover:text-jungle-700 font-medium">
            Terms & Conditions
          </Link>
          <span className="text-gray-400">|</span>
          <Link href="/" className="text-jungle-600 hover:text-jungle-700 font-medium">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
