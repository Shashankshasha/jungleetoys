import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-jungle-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-display font-bold mb-4">Privacy Policy</h1>
          <p className="text-jungle-200">Last updated: January 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">

          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to the JungleeToys privacy policy.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              JungleeToys ("JungleeToys", "we" or "us") respects your privacy and takes our responsibilities seriously
              in relation to the processing and security of your personal data. This privacy policy will inform you as
              to how we look after your personal data when you visit our website www.jungleetoys.com (regardless of
              where you visit it from) and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          {/* Purpose */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Purpose of This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              This privacy policy aims to give you information on how JungleeToys collects and processes your personal
              data through your use of this website, including any data you may provide through this website when you
              create an account, purchase a product or service, make an offer on a product, take part in a competition
              or provide a review.
            </p>
          </section>

          {/* Controller */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Controller</h2>
            <p className="text-gray-700 leading-relaxed">
              JungleeToys is the controller and responsible for this website. We have appointed a privacy officer who
              is responsible for overseeing questions in relation to this privacy policy. If you have any questions
              about this privacy policy, including any requests to exercise your legal rights, please contact us using
              the details set out below.
            </p>
          </section>

          {/* Contact Details */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Contact Details</h2>
            <div className="bg-jungle-50 p-6 rounded-xl">
              <p className="font-semibold text-gray-900 mb-2">JungleeToys</p>
              <p className="text-gray-700">483 Green Lanes</p>
              <p className="text-gray-700">London, N13 4BS</p>
              <p className="text-gray-700">UK</p>
              <p className="text-gray-700 mt-4">Email: <a href="mailto:grace@jungleetoys.com" className="text-jungle-600 hover:underline">grace@jungleetoys.com</a></p>
            </div>
          </section>

          {/* Data We Collect */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">The Data We Collect About You</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may collect, use, store and transfer different kinds of personal data about you, which we have grouped
              together as follows:
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-jungle-500 pl-4">
                <h3 className="font-bold text-gray-900">Identity Data</h3>
                <p className="text-gray-700">Includes first name, last name, username or similar identifier, title, date of birth, and gender.</p>
              </div>

              <div className="border-l-4 border-jungle-500 pl-4">
                <h3 className="font-bold text-gray-900">Contact Data</h3>
                <p className="text-gray-700">Includes billing address, delivery address, email address and telephone numbers.</p>
              </div>

              <div className="border-l-4 border-jungle-500 pl-4">
                <h3 className="font-bold text-gray-900">Financial Data</h3>
                <p className="text-gray-700">Includes payment card details processed securely through Stripe.</p>
              </div>

              <div className="border-l-4 border-jungle-500 pl-4">
                <h3 className="font-bold text-gray-900">Transaction Data</h3>
                <p className="text-gray-700">Includes details about payments to and from you and other details of products and services you have purchased from us.</p>
              </div>

              <div className="border-l-4 border-jungle-500 pl-4">
                <h3 className="font-bold text-gray-900">Technical Data</h3>
                <p className="text-gray-700">Includes internet protocol (IP) address, browser type and version, time zone setting and location, operating system and other technology on the devices you use to access this website.</p>
              </div>

              <div className="border-l-4 border-jungle-500 pl-4">
                <h3 className="font-bold text-gray-900">Profile Data</h3>
                <p className="text-gray-700">Includes your username and password, purchases or orders made by you, your interests, preferences, feedback, reviews and survey responses.</p>
              </div>

              <div className="border-l-4 border-jungle-500 pl-4">
                <h3 className="font-bold text-gray-900">Usage Data</h3>
                <p className="text-gray-700">Includes information about how you use our website and products.</p>
              </div>

              <div className="border-l-4 border-jungle-500 pl-4">
                <h3 className="font-bold text-gray-900">Marketing and Communications Data</h3>
                <p className="text-gray-700">Includes your preferences in receiving marketing from us and your communication preferences.</p>
              </div>
            </div>
          </section>

          {/* How We Use Your Data */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">How We Use Your Personal Data</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>To register you as a new customer</li>
              <li>To process and deliver your order(s)</li>
              <li>To process offers you make on products</li>
              <li>To manage payments, fees and charges</li>
              <li>To manage our relationship with you</li>
              <li>To enable you to take part in a competition or review</li>
              <li>To deliver relevant website content and advertisements</li>
              <li>To make suggestions and recommendations about products that may interest you</li>
              <li>To provide customer support</li>
              <li>To prevent and detect fraud</li>
            </ul>
          </section>

          {/* Marketing */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Marketing</h2>
            <p className="text-gray-700 leading-relaxed">
              Where you have given us your consent, we may use your information to contact you about products and
              services which we consider may interest you. Our marketing communications may be provided to you by
              email, post or such other means as we choose. You have a right to object at any time to this use of
              your information by contacting us at{' '}
              <a href="mailto:grace@jungleetoys.com" className="text-jungle-600 hover:underline">grace@jungleetoys.com</a>.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              You can opt out of receiving marketing communications at any time by clicking the unsubscribe link in
              any email or by contacting us.
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              This website uses cookies. Cookies are small text files which are stored by your browser on your
              computer or device. We use cookies to improve your experience on our website, to analyze how you use
              our site, and to deliver personalized content. You can control cookies through your browser settings.
              For more information, please see our{' '}
              <Link href="/legal/cookies" className="text-jungle-600 hover:underline">Cookie Policy</Link>.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We have put in place appropriate security measures to prevent your personal data from being accidentally
              lost, used or accessed in an unauthorised way, altered or disclosed. All payment transactions are
              processed through Stripe, a PCI-compliant payment processor. We limit access to your personal data to
              those employees and third parties who have a business need to know.
            </p>
          </section>

          {/* Data Retention */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">How Long We Keep Your Data</h2>
            <p className="text-gray-700 leading-relaxed">
              We will only retain your personal data for as long as necessary to fulfil the purposes we collected it
              for, including for the purposes of satisfying any legal, accounting, or reporting requirements. To
              determine the appropriate retention period, we consider the amount, nature, and sensitivity of the
              personal data, the potential risk of harm from unauthorised use or disclosure, and the applicable legal
              requirements.
            </p>
          </section>

          {/* Your Legal Rights */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Your Legal Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Under data protection laws, you have rights including:
            </p>
            <div className="space-y-3">
              <div className="bg-jungle-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900">Right to access</h3>
                <p className="text-gray-700">Request a copy of your personal data</p>
              </div>
              <div className="bg-jungle-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900">Right to correction</h3>
                <p className="text-gray-700">Request correction of inaccurate data</p>
              </div>
              <div className="bg-jungle-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900">Right to erasure</h3>
                <p className="text-gray-700">Request deletion of your data</p>
              </div>
              <div className="bg-jungle-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900">Right to object</h3>
                <p className="text-gray-700">Object to processing of your data</p>
              </div>
              <div className="bg-jungle-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900">Right to data portability</h3>
                <p className="text-gray-700">Request transfer of your data</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mt-4">
              To exercise any of these rights, please contact us at{' '}
              <a href="mailto:grace@jungleetoys.com" className="text-jungle-600 hover:underline">grace@jungleetoys.com</a>.
              We try to respond to all legitimate requests within one month.
            </p>
          </section>

          {/* Third Party Links */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Third Party Links</h2>
            <p className="text-gray-700 leading-relaxed">
              This website may include links to third-party websites, plug-ins and applications. Clicking on those
              links or enabling those connections may allow third parties to collect or share data about you. We do
              not control these third-party websites and are not responsible for their privacy statements. When you
              leave our website, we encourage you to read the privacy policy of every website you visit.
            </p>
          </section>

          {/* Payment Processing */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Payment Processing</h2>
            <p className="text-gray-700 leading-relaxed">
              All payment transactions are processed through Stripe, a third-party payment processor. We do not store
              your complete payment card details. Stripe maintains PCI-DSS compliance and uses industry-standard
              encryption to protect your financial information. For more information about how Stripe handles your
              data, please visit{' '}
              <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-jungle-600 hover:underline">
                Stripe's Privacy Policy
              </a>.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We keep our privacy policy under regular review. This version was last updated in January 2026. Any
              changes we make to our privacy policy in the future will be posted on this page. Please check back
              frequently to see any updates or changes.
            </p>
          </section>

          {/* Contact */}
          <section className="border-t pt-8">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Questions?</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this privacy policy or how we handle your personal data, please contact us:
            </p>
            <div className="mt-4 space-y-2 text-gray-700">
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
