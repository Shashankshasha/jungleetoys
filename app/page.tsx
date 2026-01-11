'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/supabase';

const categories = [
  { name: 'Action Figures', slug: 'action-figures', emoji: '🦸', color: 'from-red-400 to-orange-500' },
  { name: 'Educational', slug: 'educational', emoji: '📚', color: 'from-blue-400 to-purple-500' },
  { name: 'Outdoor Play', slug: 'outdoor', emoji: '⚽', color: 'from-green-400 to-emerald-500' },
  { name: 'Board Games', slug: 'board-games', emoji: '🎲', color: 'from-yellow-400 to-orange-500' },
  { name: 'Building Blocks', slug: 'building-blocks', emoji: '🧱', color: 'from-pink-400 to-rose-500' },
  { name: 'Dolls & Plush', slug: 'dolls-plush', emoji: '🧸', color: 'from-purple-400 to-pink-500' },
  { name: 'Vehicles', slug: 'vehicles', emoji: '🚗', color: 'from-cyan-400 to-blue-500' },
  { name: 'Arts & Crafts', slug: 'arts-crafts', emoji: '🎨', color: 'from-teal-400 to-green-500' },
];

export default function HomePage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API (includes review statistics)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log('🏠 Home page: Fetching products from API...');

        const response = await fetch('/api/products');
        const data = await response.json();

        if (!response.ok) {
          console.error('❌ Home page: API error:', data);
          throw new Error('Failed to fetch products');
        }

        console.log('✅ Home page: Products fetched:', data.products?.length || 0);
        console.log('📦 Home page: Products with reviews:', data.products);

        // Products already include review_count and average_rating from API
        setAllProducts(data.products || []);
      } catch (error) {
        console.error('❌ Home page: Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const featuredProducts = allProducts.filter(p => p.featured).slice(0, 8);
  const newArrivals = allProducts.filter(p => p.is_new).slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-jungle-100 via-banana-50 to-tiger-50">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 text-6xl animate-float">🎈</div>
        <div className="absolute top-40 right-20 text-5xl animate-float" style={{ animationDelay: '0.5s' }}>🎠</div>
        <div className="absolute bottom-20 left-1/4 text-4xl animate-float" style={{ animationDelay: '1s' }}>⭐</div>
        <div className="absolute top-1/3 right-1/3 text-5xl animate-float" style={{ animationDelay: '1.5s' }}>🎪</div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-block bg-jungle-200 text-jungle-800 font-semibold px-4 py-2 rounded-full text-sm mb-6">
                🎉 New Collection Just Arrived!
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Where{' '}
                <span className="text-gradient-jungle">Imagination</span>
                <br />
                Comes to{' '}
                <span className="text-gradient-tiger">Play!</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
                Discover our amazing collection of toys for children of all ages.
                Quality toys that spark creativity and bring endless joy! 🌟
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/products" className="btn-jungle text-center">
                  Shop All Toys 🛒
                </Link>
                <Link
                  href="/products?filter=new"
                  className="btn-tiger text-center"
                >
                  New Arrivals ✨
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-10">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-2xl">🚚</span>
                  <span>Free UK Delivery<br />over £50</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-2xl">↩️</span>
                  <span>30-Day<br />Returns</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-2xl">🛡️</span>
                  <span>Safe & Secure<br />Checkout</span>
                </div>
              </div>
            </div>

            {/* Hero Image Area */}
            <div className="relative">
              <div className="relative z-10 bg-white/30 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-jungle-200 to-jungle-300 rounded-2xl p-6 aspect-square flex items-center justify-center text-6xl transform hover:scale-105 transition-transform">
                    🦖
                  </div>
                  <div className="bg-gradient-to-br from-tiger-200 to-tiger-300 rounded-2xl p-6 aspect-square flex items-center justify-center text-6xl transform hover:scale-105 transition-transform">
                    🚀
                  </div>
                  <div className="bg-gradient-to-br from-parrot-200 to-parrot-300 rounded-2xl p-6 aspect-square flex items-center justify-center text-6xl transform hover:scale-105 transition-transform">
                    🎨
                  </div>
                  <div className="bg-gradient-to-br from-banana-200 to-banana-300 rounded-2xl p-6 aspect-square flex items-center justify-center text-6xl transform hover:scale-105 transition-transform">
                    🧸
                  </div>
                </div>
              </div>
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-jungle-400 to-parrot-400 rounded-3xl blur-3xl opacity-20 -z-10" />
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
              fillOpacity="0.5"
            />
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category 🎯
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find the perfect toy! Browse our carefully curated categories
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className="group relative bg-gradient-to-br rounded-2xl p-6 text-center
                         hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                         overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10
                              group-hover:opacity-20 transition-opacity`} />
                <span className="relative text-5xl lg:text-6xl block mb-3
                               group-hover:scale-110 transition-transform duration-300">
                  {category.emoji}
                </span>
                <h3 className="relative font-semibold text-gray-900 group-hover:text-jungle-700">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {loading ? (
        <section className="py-16 bg-gradient-to-b from-white to-jungle-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jungle-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </section>
      ) : featuredProducts.length > 0 ? (
        <section className="py-16 bg-gradient-to-b from-white to-jungle-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  Best Sellers 🏆
                </h2>
                <p className="text-gray-600">Our most popular toys loved by kids everywhere!</p>
              </div>
              <Link
                href="/products?filter=featured"
                className="hidden sm:inline-flex items-center gap-2 text-jungle-600
                         font-semibold hover:text-jungle-700 transition-colors"
              >
                View All
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            <div className="text-center mt-8 sm:hidden">
              <Link href="/products?filter=featured" className="btn-jungle">
                View All Best Sellers
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* Promo Banner */}
      <section className="py-12 bg-gradient-to-r from-tiger-500 via-banana-500 to-jungle-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">
              🎁 Special Offer!
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Use code <span className="font-bold bg-white/20 px-3 py-1 rounded-lg">JUNGLE20</span>{' '}
              for 20% off your first order!
            </p>
            <Link
              href="/products"
              className="inline-block bg-white text-jungle-700 font-bold px-8 py-4
                       rounded-full hover:bg-jungle-50 transition-colors shadow-lg"
            >
              Shop Now & Save!
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {!loading && newArrivals.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  New Arrivals ✨
                </h2>
                <p className="text-gray-600">Fresh toys just landed in the jungle!</p>
              </div>
              <Link
                href="/products?filter=new"
                className="hidden sm:inline-flex items-center gap-2 text-jungle-600
                         font-semibold hover:text-jungle-700 transition-colors"
              >
                View All
                <span>→</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-b from-jungle-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose JungleeToys? 🌴
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-jungle-100 rounded-2xl flex items-center justify-center
                            text-3xl mx-auto mb-4">
                ✅
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600 text-sm">
                All toys meet strict UK safety standards. Quality you can trust!
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-tiger-100 rounded-2xl flex items-center justify-center
                            text-3xl mx-auto mb-4">
                🚚
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">
                Free UK shipping over £50. Express options available!
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-parrot-100 rounded-2xl flex items-center justify-center
                            text-3xl mx-auto mb-4">
                💝
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Gift Wrapping</h3>
              <p className="text-gray-600 text-sm">
                Beautiful gift wrapping available. Perfect for birthdays!
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-banana-100 rounded-2xl flex items-center justify-center
                            text-3xl mx-auto mb-4">
                💬
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600 text-sm">
                Need help choosing? Our toy experts are here to help!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
