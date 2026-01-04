import Link from 'next/link';
import { TreePalm, Baby, Smile, Heart, Zap, AlertTriangle, ShieldCheck, CheckCircle } from 'lucide-react';

export const metadata = {
  title: 'Age Guide | JungleeToys',
  description: 'Toy age recommendations and UK safety standards guide for parents',
};

export default function AgeGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-jungle-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-jungle-600 to-jungle-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors">
            <TreePalm className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Toy Age Guide</h1>
          <p className="text-xl text-jungle-100">Understanding age recommendations and safety standards</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 space-y-12">

          {/* Introduction */}
          <section>
            <div className="bg-jungle-50 p-6 rounded-xl border border-jungle-100">
              <h2 className="font-display text-xl font-bold text-gray-900 mb-3">Why Age Recommendations Matter</h2>
              <p className="text-gray-700 leading-relaxed">
                Age recommendations on toys are not just suggestions - they're safety guidelines based on rigorous testing. In the UK, all toys must comply with the Toy Safety Directive and British Standard EN71, ensuring they're safe for children of specific ages. These recommendations consider choking hazards, developmental appropriateness, and cognitive abilities.
              </p>
            </div>
          </section>

          {/* UK Safety Standards */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <ShieldCheck className="h-6 w-6 text-jungle-600" />
              <h2 className="text-2xl font-display font-bold text-gray-900">UK Toy Safety Standards</h2>
            </div>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                All toys sold at JungleeToys comply with UK and European safety regulations:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">CE / UKCA Marking</h3>
                  <p className="text-sm text-gray-700">
                    All toys carry CE (European Conformity) or UKCA (UK Conformity Assessed) marking, confirming they meet safety, health, and environmental protection requirements.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">EN71 Standard</h3>
                  <p className="text-sm text-gray-700">
                    British Standard EN71 covers mechanical and physical properties, flammability, and chemical safety. All our toys are tested to these standards.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Lion Mark</h3>
                  <p className="text-sm text-gray-700">
                    Many of our toys carry the British Toy & Hobby Association's Lion Mark, indicating they're made by a BTHA member committed to the highest safety standards.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">UKCA from 2025</h3>
                  <p className="text-sm text-gray-700">
                    Following Brexit, the UKCA mark is now required for toys sold in Great Britain, demonstrating compliance with UK safety regulations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Age Categories */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Age Recommendations Explained</h2>
            <div className="space-y-6">

              {/* 0-12 Months */}
              <div className="bg-gradient-to-r from-baby-blue-50 to-white p-6 rounded-xl border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Baby className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-gray-900">0-12 Months (Babies)</h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Developmental Stage:</p>
                    <p className="text-sm">Babies explore through sensory experiences - touching, tasting, hearing. They're developing motor skills and hand-eye coordination.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Recommended Toys:</p>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Soft rattles and teething toys</li>
                      <li>• High-contrast visual stimulation toys</li>
                      <li>• Baby-safe mirrors and activity gyms</li>
                      <li>• Musical mobiles and gentle sound toys</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">Safety Warning:</p>
                      <p className="text-xs text-gray-700">No small parts (smaller than 3.5cm diameter). All materials must be non-toxic and washable. Avoid strings longer than 22cm.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 1-3 Years */}
              <div className="bg-gradient-to-r from-jungle-50 to-white p-6 rounded-xl border border-jungle-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-jungle-100 rounded-xl">
                    <Smile className="h-6 w-6 text-jungle-600" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-gray-900">1-3 Years (Toddlers)</h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Developmental Stage:</p>
                    <p className="text-sm">Toddlers are learning to walk, talk, and explore independently. They're developing fine motor skills and beginning imaginative play.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Recommended Toys:</p>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Push and pull toys for walking practice</li>
                      <li>• Large building blocks and stacking toys</li>
                      <li>• Simple shape sorters and puzzles</li>
                      <li>• Ride-on toys and musical instruments</li>
                      <li>• Bath toys and water play items</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">Safety Warning:</p>
                      <p className="text-xs text-gray-700">Still at risk of choking. Parts must be larger than 3.5cm. Avoid toys with detachable small components. Check for sharp edges.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3-5 Years */}
              <div className="bg-gradient-to-r from-tiger-50 to-white p-6 rounded-xl border border-tiger-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-tiger-100 rounded-xl">
                    <Heart className="h-6 w-6 text-tiger-600" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-gray-900">3-5 Years (Preschool)</h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Developmental Stage:</p>
                    <p className="text-sm">Children develop social skills, creativity, and problem-solving. Imaginative play becomes more complex and elaborate.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Recommended Toys:</p>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Role-play toys (kitchens, toolsets, dress-up)</li>
                      <li>• Arts and crafts supplies</li>
                      <li>• Building sets with more pieces</li>
                      <li>• Simple board games and card games</li>
                      <li>• Outdoor play equipment (tricycles, balls)</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">Safety Warning:</p>
                      <p className="text-xs text-gray-700">Choking risk reduces but still present with younger siblings. Supervise craft activities with small items. Check for secure battery compartments.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5-8 Years */}
              <div className="bg-gradient-to-r from-parrot-50 to-white p-6 rounded-xl border border-parrot-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-parrot-100 rounded-xl">
                    <Zap className="h-6 w-6 text-parrot-600" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-gray-900">5-8 Years (Early School Age)</h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Developmental Stage:</p>
                    <p className="text-sm">Children are reading, developing logic skills, and enjoy more challenging activities. Interests become more defined.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Recommended Toys:</p>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Construction sets (LEGO, K'NEX)</li>
                      <li>• Science experiment kits</li>
                      <li>• Strategy board games and puzzles</li>
                      <li>• Sports equipment and outdoor games</li>
                      <li>• Beginner robotics and coding toys</li>
                    </ul>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">Safety Warning:</p>
                      <p className="text-xs text-gray-700">Small parts acceptable for this age but not if younger siblings present. Supervise electronic toys and ensure they're used properly.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 8+ Years */}
              <div className="bg-gradient-to-r from-purple-50 to-white p-6 rounded-xl border border-purple-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <CheckCircle className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-gray-900">8+ Years (Older Children)</h3>
                </div>
                <div className="space-y-3 text-gray-700">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Developmental Stage:</p>
                    <p className="text-sm">Advanced cognitive skills, complex problem-solving, and developing hobbies. Capable of following detailed instructions.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Recommended Toys:</p>
                    <ul className="text-sm space-y-1 ml-4">
                      <li>• Advanced building sets and models</li>
                      <li>• Complex strategy games</li>
                      <li>• STEM toys (robotics, electronics, chemistry)</li>
                      <li>• Collectibles and hobby items</li>
                      <li>• Advanced sports equipment</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm mb-1">Note:</p>
                      <p className="text-xs text-gray-700">Small parts fine at this age. Ensure complexity matches child's interest and ability level. Consider educational value.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Warning Symbols */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">Understanding Warning Symbols</h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <p>
                All toys carry safety warning symbols required by UK law. Here's what they mean:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                  <p className="font-bold text-gray-900 mb-2">⚠️ Warning! Not suitable for children under 36 months</p>
                  <p className="text-sm text-gray-700">Contains small parts that could cause choking. Most common warning symbol on toys.</p>
                </div>

                <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
                  <p className="font-bold text-gray-900 mb-2">⚠️ Warning! Adult supervision required</p>
                  <p className="text-sm text-gray-700">Toy requires adult oversight during use due to potential hazards.</p>
                </div>

                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                  <p className="font-bold text-gray-900 mb-2">⚠️ Warning! Keep away from fire</p>
                  <p className="text-sm text-gray-700">Toy contains flammable materials and should be kept away from heat sources.</p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-200">
                  <p className="font-bold text-gray-900 mb-2">⚠️ Read instructions before use</p>
                  <p className="text-sm text-gray-700">Important safety information in the instruction manual must be read first.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Choking Hazards */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Understanding Choking Hazards</h2>
            <div className="bg-red-50 p-6 rounded-xl border border-red-200">
              <div className="flex items-start gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-red-900 mb-2">The 3.5cm Rule</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    In the UK, toys for children under 3 years must not contain parts smaller than 3.5cm in any dimension. This is the minimum size that cannot pass through a child's windpipe. Small parts include:
                  </p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 ml-9">
                <li>• Detachable wheels, buttons, or eyes</li>
                <li>• Small balls or marbles</li>
                <li>• Coins or tokens in play money sets</li>
                <li>• Small LEGO-type pieces</li>
                <li>• Batteries (should be in secure compartments)</li>
              </ul>
              <div className="mt-4 p-4 bg-white rounded-lg ml-9">
                <p className="text-xs text-gray-600 italic">
                  <strong>Parent Tip:</strong> Always check for small parts even with age-appropriate toys if you have younger siblings in the house. Packaging should clearly state "Not suitable for children under 36 months" if small parts are present.
                </p>
              </div>
            </div>
          </section>

          {/* Tips for Parents */}
          <section>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Tips for Choosing Age-Appropriate Toys</h2>
            <div className="prose max-w-none text-gray-700 space-y-4">
              <div className="bg-jungle-50 p-6 rounded-xl border border-jungle-100 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-jungle-600 mt-0.5 flex-shrink-0" />
                  <p><strong>Always check the age recommendation</strong> on the packaging - it's there for safety, not just developmental guidance.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-jungle-600 mt-0.5 flex-shrink-0" />
                  <p><strong>Consider your child's individual development</strong> - some children may be ready for toys slightly above their age, while others may prefer younger age ranges.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-jungle-600 mt-0.5 flex-shrink-0" />
                  <p><strong>Think about siblings</strong> - if you have younger children, avoid toys with small parts that older siblings may leave within reach.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-jungle-600 mt-0.5 flex-shrink-0" />
                  <p><strong>Read reviews</strong> from other parents to see how age-appropriate the toy actually is in practice.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-jungle-600 mt-0.5 flex-shrink-0" />
                  <p><strong>Look for quality certifications</strong> - CE/UKCA marks, Lion Mark, and EN71 compliance ensure safety standards are met.</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-jungle-600 mt-0.5 flex-shrink-0" />
                  <p><strong>Supervise play</strong> - even with age-appropriate toys, supervision helps prevent accidents and enhances learning.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="bg-jungle-50 p-6 rounded-xl border border-jungle-100">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">Questions About Age Suitability?</h2>
            <p className="text-gray-700 mb-4">
              Not sure if a toy is right for your child? Our team is here to help with personalized recommendations:
            </p>
            <div className="space-y-2 text-gray-700">
              <p>📧 Email: <a href="mailto:grace@jungleetoys.com" className="text-jungle-600 hover:underline">grace@jungleetoys.com</a></p>
              <p>📞 Phone: <a href="tel:+447342224136" className="text-jungle-600 hover:underline">+44 7342224136</a></p>
              <p className="text-sm text-gray-600 mt-4">Our toy experts can help you choose the perfect, safe toys for your child's age and development stage.</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
