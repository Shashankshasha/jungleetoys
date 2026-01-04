import Link from 'next/link';
import { TreePalm, HelpCircle, Package, CreditCard, RotateCcw, Shield, Truck } from 'lucide-react';

export const metadata = {
  title: 'FAQ | JungleeToys',
  description: 'Frequently asked questions about ordering, delivery, returns, and more',
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-jungle-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-jungle-600 to-jungle-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors">
            <TreePalm className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-jungle-100">Find answers to common questions</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-12">

          {/* Orders & Payment */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="h-6 w-6 text-jungle-600" />
              <h2 className="text-2xl font-display font-bold text-gray-900">Orders & Payment</h2>
            </div>
            <div className="space-y-6">

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-jungle-600 mt-1 flex-shrink-0" />
                  What payment methods do you accept?
                </h3>
                <p className="text-gray-700 ml-7">
                  We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay. All payments are processed securely through Stripe, which is PCI DSS compliant.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-jungle-600 mt-1 flex-shrink-0" />
                  Is my payment information secure?
                </h3>
                <p className="text-gray-700 ml-7">
                  Yes, absolutely. We use Stripe for payment processing, which means we never store your card details on our servers. All transactions are encrypted and protected by industry-leading security standards.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-jungle-600 mt-1 flex-shrink-0" />
                  Can I cancel or modify my order?
                </h3>
                <p className="text-gray-700 ml-7">
                  You can cancel or modify your order within 2 hours of placing it by contacting us at <a href="mailto:grace@jungleetoys.com" className="text-jungle-600 hover:underline">grace@jungleetoys.com</a>. After this time, orders are processed and dispatched, but you can still return items using our 30-day returns policy.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-jungle-600 mt-1 flex-shrink-0" />
                  Will I receive an order confirmation?
                </h3>
                <p className="text-gray-700 ml-7">
                  Yes! You'll receive an email confirmation immediately after placing your order. If you don't receive it within a few minutes, please check your spam folder or contact us.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-jungle-600 mt-1 flex-shrink-0" />
                  What is the "Make an Offer" feature?
                </h3>
                <p className="text-gray-700 ml-7">
                  On select products, you can make an offer for a lower price. Simply click "Make an Offer" on the product page, submit your proposed price, and we'll review it within 24-48 hours. If accepted, you'll receive a secure payment link valid for 7 days. This is a great way to get a bargain on toys you love!
                </p>
              </div>

            </div>
          </section>

          {/* Delivery */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Truck className="h-6 w-6 text-jungle-600" />
              <h2 className="text-2xl font-display font-bold text-gray-900">Delivery</h2>
            </div>
            <div className="space-y-6">

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-jungle-600 mt-1 flex-shrink-0" />
                  How much does delivery cost?
                </h3>
                <div className="text-gray-700 ml-7 space-y-2">
                  <p><strong>Standard Delivery (3-5 days):</strong> £3.99 - FREE on orders over £20</p>
                  <p><strong>Express Delivery (1-2 days):</strong> £6.99</p>
                  <p className="text-sm text-gray-600">Additional charges may apply for Scottish Highlands & Islands (£4.99)</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-jungle-600 mt-1 flex-shrink-0" />
                  Where do you deliver?
                </h3>
                <p className="text-gray-700 ml-7">
                  We deliver throughout the UK, including England, Scotland, Wales, and Northern Ireland. Delivery times may be slightly longer for Northern Ireland (add 1-2 days) and Scottish Highlands & Islands (add 2-3 days).
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-jungle-600 mt-1 flex-shrink-0" />
                  Can I track my order?
                </h3>
                <p className="text-gray-700 ml-7">
                  Yes! Once your order is dispatched, you'll receive a tracking number via email and SMS. You can use this to track your parcel in real-time with our courier partner.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-jungle-600 mt-1 flex-shrink-0" />
                  What if I'm not home when delivery arrives?
                </h3>
                <p className="text-gray-700 ml-7">
                  The courier will leave a card with instructions for redelivery or collection from a local depot. You can also usually arrange to leave the parcel in a safe place or with a neighbor.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-jungle-600 mt-1 flex-shrink-0" />
                  My order hasn't arrived. What should I do?
                </h3>
                <p className="text-gray-700 ml-7">
                  First, check your tracking information. If there's been no update for 7 working days past the expected delivery date, please contact us at <a href="mailto:grace@jungleetoys.com" className="text-jungle-600 hover:underline">grace@jungleetoys.com</a> and we'll investigate with the courier.
                </p>
              </div>

            </div>
          </section>

          {/* Returns & Refunds */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <RotateCcw className="h-6 w-6 text-jungle-600" />
              <h2 className="text-2xl font-display font-bold text-gray-900">Returns & Refunds</h2>
            </div>
            <div className="space-y-6">

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-jungle-600 mt-1 flex-shrink-0" />
                  What is your returns policy?
                </h3>
                <p className="text-gray-700 ml-7">
                  We offer a 30-day money-back guarantee. If you're not satisfied with your purchase, you can return it within 30 days for a full refund. Items must be unused and in their original packaging. See our <Link href="/returns" className="text-jungle-600 hover:underline">Returns & Refunds</Link> page for full details.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-jungle-600 mt-1 flex-shrink-0" />
                  Who pays for return shipping?
                </h3>
                <p className="text-gray-700 ml-7">
                  We pay return shipping if the item is faulty, damaged, or not as described. For change-of-mind returns, you're responsible for return shipping costs. We recommend using a tracked service.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-jungle-600 mt-1 flex-shrink-0" />
                  How long does a refund take?
                </h3>
                <p className="text-gray-700 ml-7">
                  Once we receive your return, we'll inspect it within 1-2 working days and process your refund within 3-5 working days. It may then take 3-5 additional days for your bank to process the refund. Total time is typically 7-14 days from when we receive your return.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-jungle-600 mt-1 flex-shrink-0" />
                  What if my item arrives damaged?
                </h3>
                <p className="text-gray-700 ml-7">
                  Contact us immediately at <a href="mailto:grace@jungleetoys.com" className="text-jungle-600 hover:underline">grace@jungleetoys.com</a> with photos of the damage. We'll arrange collection and send a replacement or full refund right away - no need to wait for the return to be processed.
                </p>
              </div>

            </div>
          </section>

          {/* Products & Safety */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-jungle-600" />
              <h2 className="text-2xl font-display font-bold text-gray-900">Products & Safety</h2>
            </div>
            <div className="space-y-6">

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-jungle-600 mt-1 flex-shrink-0" />
                  Are all toys tested for safety?
                </h3>
                <p className="text-gray-700 ml-7">
                  Yes! All our toys comply with UK and EU safety standards (EN71, CE marking, UKCA marking). We only stock toys from reputable manufacturers that meet strict safety requirements.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-jungle-600 mt-1 flex-shrink-0" />
                  What do the age recommendations mean?
                </h3>
                <p className="text-gray-700 ml-7">
                  Age recommendations are based on safety testing and developmental appropriateness. They indicate the minimum safe age due to choking hazards (small parts) or complexity. See our <Link href="/age-guide" className="text-jungle-600 hover:underline">Age Guide</Link> for more details.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-jungle-600 mt-1 flex-shrink-0" />
                  Do you sell eco-friendly toys?
                </h3>
                <p className="text-gray-700 ml-7">
                  Yes! We have a growing selection of eco-friendly toys made from sustainable materials like wood, recycled plastic, and organic fabrics. Look for the "Eco-Friendly" badge on product pages.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-jungle-600 mt-1 flex-shrink-0" />
                  Will items be in stock again soon?
                </h3>
                <p className="text-gray-700 ml-7">
                  If an item is out of stock, you can sign up for email notifications on the product page. We'll notify you as soon as it's back in stock. Popular items usually restock within 2-4 weeks.
                </p>
              </div>

            </div>
          </section>

          {/* Account & Privacy */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Package className="h-6 w-6 text-jungle-600" />
              <h2 className="text-2xl font-display font-bold text-gray-900">Account & Privacy</h2>
            </div>
            <div className="space-y-6">

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-jungle-600 mt-1 flex-shrink-0" />
                  Do I need an account to place an order?
                </h3>
                <p className="text-gray-700 ml-7">
                  No, you can checkout as a guest. However, creating an account lets you track orders, save favorites, and checkout faster in the future.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-jungle-600 mt-1 flex-shrink-0" />
                  How do you use my personal data?
                </h3>
                <p className="text-gray-700 ml-7">
                  We only use your data to process orders, provide customer service, and send order updates. We never sell your data to third parties. Read our full <Link href="/legal/privacy" className="text-jungle-600 hover:underline">Privacy Policy</Link> for details.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg text-gray-900 mb-3 flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-jungle-600 mt-1 flex-shrink-0" />
                  Can I unsubscribe from marketing emails?
                </h3>
                <p className="text-gray-700 ml-7">
                  Yes, you can unsubscribe at any time by clicking the "unsubscribe" link at the bottom of any marketing email, or by contacting us.
                </p>
              </div>

            </div>
          </section>

          {/* Contact */}
          <section className="bg-jungle-50 p-6 rounded-xl border border-jungle-100">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Still Have Questions?</h2>
            <p className="text-gray-700 mb-4">
              Can't find what you're looking for? Our customer service team is here to help:
            </p>
            <div className="space-y-2 text-gray-700">
              <p>📧 Email: <a href="mailto:grace@jungleetoys.com" className="text-jungle-600 hover:underline">grace@jungleetoys.com</a></p>
              <p>📞 Phone: <a href="tel:+447342224136" className="text-jungle-600 hover:underline">+44 7342224136</a></p>
              <p>📍 Address: 483 Green Lanes, London, N13 4BS, UK</p>
              <p className="text-sm text-gray-600 mt-4">Customer service hours: Monday-Friday, 9am-5pm GMT</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
