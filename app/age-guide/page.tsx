import Link from 'next/link';

export default function AgeGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-jungle-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/" className="text-white hover:underline mb-4 inline-block">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Toy Age Guide</h1>
          <p className="text-jungle-200">Understanding age recommendations and UK safety standards</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">

          <section className="bg-jungle-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-3">Why Age Recommendations Matter</h2>
            <p className="text-gray-700">
              Age recommendations on toys are safety guidelines based on rigorous testing. In the UK, all toys must comply with the Toy Safety Directive and British Standard EN71, ensuring they're safe for children of specific ages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">UK Toy Safety Standards</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">CE / UKCA Marking</h3>
                <p className="text-sm text-gray-700">All toys carry CE or UKCA marking, confirming they meet UK safety requirements.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">EN71 Standard</h3>
                <p className="text-sm text-gray-700">British Standard EN71 covers mechanical properties, flammability, and chemical safety.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Age Categories</h2>

            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-bold mb-2">0-12 Months (Babies)</h3>
                <p className="text-sm text-gray-700 mb-2">Soft rattles, teething toys, activity gyms, musical mobiles</p>
                <p className="text-xs text-amber-700">⚠️ No small parts smaller than 3.5cm. All materials must be non-toxic.</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                <h3 className="font-bold mb-2">1-3 Years (Toddlers)</h3>
                <p className="text-sm text-gray-700 mb-2">Push/pull toys, large building blocks, shape sorters, ride-on toys</p>
                <p className="text-xs text-amber-700">⚠️ Still at choking risk. Parts must be larger than 3.5cm.</p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-bold mb-2">3-5 Years (Preschool)</h3>
                <p className="text-sm text-gray-700 mb-2">Role-play toys, arts & crafts, building sets, board games</p>
                <p className="text-xs text-amber-700">⚠️ Supervise craft activities with small items.</p>
              </div>

              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-bold mb-2">5-8 Years (Early School)</h3>
                <p className="text-sm text-gray-700 mb-2">Construction sets, science kits, strategy games, sports equipment</p>
                <p className="text-xs text-amber-700">⚠️ Small parts acceptable but not with younger siblings.</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-bold mb-2">8+ Years</h3>
                <p className="text-sm text-gray-700 mb-2">Advanced building sets, complex games, STEM toys, robotics</p>
                <p className="text-xs text-gray-600">✓ Small parts fine. Ensure complexity matches ability.</p>
              </div>
            </div>
          </section>

          <section className="bg-red-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Choking Hazards - The 3.5cm Rule</h2>
            <p className="text-gray-700 mb-3">
              In the UK, toys for children under 3 years must not contain parts smaller than 3.5cm in any dimension. This is the minimum size that cannot pass through a child's windpipe.
            </p>
            <p className="text-sm text-gray-600">
              Always check for "Not suitable for children under 36 months" warnings on packaging.
            </p>
          </section>

          <section className="bg-jungle-50 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Age Suitability?</h2>
            <p className="text-gray-700 mb-4">Our team can help with personalized recommendations:</p>
            <p className="text-gray-700">
              Email: <a href="mailto:grace@jungleetoys.com" className="text-jungle-600 hover:underline">grace@jungleetoys.com</a><br/>
              Phone: <a href="tel:+447342224136" className="text-jungle-600 hover:underline">+44 7342224136</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
