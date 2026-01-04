import Link from 'next/link';
import { TreePalm, RotateCcw, ShieldCheck, AlertCircle, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Returns & Refunds | JungleeToys',
  description: 'Returns and refunds policy in accordance with UK Consumer Rights Act 2015',
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-jungle-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-jungle-600 to-jungle-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors">
            <TreePalm className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Returns & Refunds</h1>
          <p className="text-xl text-jungle-100">Your rights under UK Consumer Rights Act 2015</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-12">

          {/* Your Rights */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="h-6 w-6 text-jungle-600" />
              <h2 className="text-2xl font-display font-bold text-gray-900">Your Consumer Rights</h2>
            </div>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                Under the UK Consumer Rights Act 2015, you have the right to return goods purchased online within <strong>14 days</strong> of receiving them, for any reason.
              </p>
              <p>
                At JungleeToys, we extend this to <strong>30 days</strong> to give you extra peace of mind.
              </p>

              <div className="bg-jungle-50 p-6 rounded-xl border border-jungle-100 mt-6">
                <h3 className="font-bold text-lg text-gray-900 mb-3">30-Day Money-Back Guarantee</h3>
                <p className="text-gray-700">
                  If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund - no questions asked.
                </p>
              </div>
            </div>
          </section>

          {/* How to Return */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <RotateCcw className="h-6 w-6 text-jungle-600" />
              <h2 className="text-2xl font-display font-bold text-gray-900">How to Return an Item</h2>
            </div>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p className="font-semibold text-gray-900">Follow these simple steps:</p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-jungle-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Contact Us</h3>
                    <p className="text-gray-700">
                      Email us at <a href="mailto:grace@jungleetoys.com" className="text-jungle-600 hover:underline">grace@jungleetoys.com</a> with your order number and reason for return. We'll send you a returns authorization number within 24 hours.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-jungle-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Pack Your Item</h3>
                    <p className="text-gray-700">
                      Securely pack the item in its original packaging if possible. Include all accessories, manuals, and free gifts. Write the returns authorization number clearly on the package.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-jungle-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Send It Back</h3>
                    <p className="text-gray-700">
                      Use a tracked postal service and send to:<br />
                      <span className="font-semibold">JungleeToys Returns</span><br />
                      483 Green Lanes<br />
                      London, N13 4BS<br />
                      UK
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-jungle-600 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Get Your Refund</h3>
                    <p className="text-gray-700">
                      Once we receive and inspect your return, we'll process your refund within 14 days. Refunds will be issued to your original payment method.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Return Costs */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Return Shipping Costs</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-jungle-50 p-6 rounded-xl border border-jungle-100">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-jungle-600" />
                  <h3 className="font-bold text-gray-900">We Pay Return Shipping</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Faulty or damaged items</li>
                  <li>• Wrong item sent</li>
                  <li>• Item not as described</li>
                  <li>• Defective products</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="h-5 w-5 text-gray-600" />
                  <h3 className="font-bold text-gray-900">You Pay Return Shipping</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Changed your mind</li>
                  <li>• Ordered wrong item</li>
                  <li>• No longer needed</li>
                  <li>• Any other personal reason</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Conditions */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Return Conditions</h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>To ensure a smooth return process, please note:</p>

              <div className="bg-gray-50 p-6 rounded-xl space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-jungle-600 mt-0.5 flex-shrink-0" />
                  <p>Items must be unused and in their original condition with all tags and packaging intact</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-jungle-600 mt-0.5 flex-shrink-0" />
                  <p>Returns must be made within 30 days of receiving your order</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-jungle-600 mt-0.5 flex-shrink-0" />
                  <p>You must obtain a returns authorization number before sending items back</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-jungle-600 mt-0.5 flex-shrink-0" />
                  <p>Proof of postage should be retained until refund is received</p>
                </div>
              </div>
            </div>
          </section>

          {/* Exceptions */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Items That Cannot Be Returned</h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>For hygiene and safety reasons, the following items cannot be returned unless faulty:</p>

              <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
                <ul className="space-y-2 text-gray-700">
                  <li>• Items marked as "non-returnable" at time of purchase</li>
                  <li>• Opened safety-sealed products (e.g., baby feeding items)</li>
                  <li>• Personalized or customized items</li>
                  <li>• Sale or clearance items marked as final sale</li>
                </ul>
              </div>

              <p className="text-sm text-gray-600 italic">
                However, your statutory rights under the Consumer Rights Act 2015 are not affected. Faulty or misdescribed items can always be returned for a full refund.
              </p>
            </div>
          </section>

          {/* Faulty Items */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Faulty or Damaged Items</h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                Under the Consumer Rights Act 2015, you have the following rights if goods are faulty:
              </p>

              <div className="bg-jungle-50 p-6 rounded-xl border border-jungle-100 space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-2">Within 30 days of purchase:</p>
                  <p className="text-gray-700">You can reject the item and get a full refund.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">After 30 days but within 6 months:</p>
                  <p className="text-gray-700">We'll repair or replace the faulty item. If that's not possible, you can claim a refund.</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-2">After 6 months:</p>
                  <p className="text-gray-700">You may still be entitled to a repair, replacement, or partial refund, depending on the fault.</p>
                </div>
              </div>

              <p>
                If you receive a damaged item, please contact us immediately at <a href="mailto:grace@jungleetoys.com" className="text-jungle-600 hover:underline">grace@jungleetoys.com</a> with photos of the damage. We'll arrange collection and send a replacement or refund right away.
              </p>
            </div>
          </section>

          {/* Refund Processing */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Refund Processing Times</h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                Once we receive your returned item:
              </p>
              <ul className="space-y-2 ml-6">
                <li><strong>Inspection:</strong> 1-2 working days</li>
                <li><strong>Refund processing:</strong> 3-5 working days</li>
                <li><strong>Bank processing:</strong> 3-5 working days (varies by bank)</li>
              </ul>
              <p>
                You'll receive an email confirmation once your refund has been processed. The total timeframe is typically 7-14 days from when we receive your return.
              </p>

              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Important:</p>
                <p className="text-gray-700">
                  Under the Consumer Rights Act 2015, we must refund you within 14 days of receiving the returned goods, or within 14 days of you providing proof of postage - whichever is sooner.
                </p>
              </div>
            </div>
          </section>

          {/* Exchanges */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Exchanges</h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                We currently don't offer direct exchanges. If you'd like a different item, please:
              </p>
              <ol className="space-y-2 ml-6">
                <li>Return your original item following our returns process</li>
                <li>Place a new order for the item you want</li>
              </ol>
              <p>
                This ensures you get your preferred item as quickly as possible without waiting for the return to be processed first.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-jungle-50 p-6 rounded-xl border border-jungle-100">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Need Help with a Return?</h2>
            <p className="text-gray-700 mb-4">
              Our customer service team is here to help make your return as easy as possible:
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
