'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Search,
  Menu,
  X,
  TreePalm,
  User,
  ChevronDown,
} from 'lucide-react';
import { useCart } from '@/lib/cart';

const categories = [
  { name: 'Action Figures', slug: 'action-figures', icon: '🦸' },
  { name: 'Educational', slug: 'educational', icon: '📚' },
  { name: 'Outdoor Play', slug: 'outdoor', icon: '⚽' },
  { name: 'Board Games', slug: 'board-games', icon: '🎲' },
  { name: 'Building Blocks', slug: 'building-blocks', icon: '🧱' },
  { name: 'Dolls & Plush', slug: 'dolls-plush', icon: '🧸' },
  { name: 'Vehicles', slug: 'vehicles', icon: '🚗' },
  { name: 'Arts & Crafts', slug: 'arts-crafts', icon: '🎨' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const { totalItems, openCart } = useCart();

  const itemCount = totalItems();

  // Check if user is an admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const response = await fetch('/api/admin/me');
        if (response.ok) {
          setIsAdmin(true);
        }
      } catch (error) {
        // Not an admin - do nothing
      }
    };
    checkAdminStatus();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      {/* Top banner */}
      <div className="bg-gradient-to-r from-jungle-600 to-jungle-500 text-white text-center py-2 text-sm font-medium">
        🎉 Free UK Delivery on orders over £30! 🚚
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <TreePalm className="h-8 w-8 lg:h-10 lg:w-10 text-jungle-600 group-hover:scale-110 transition-transform" />
              <motion.span
                className="absolute -top-1 -right-1 text-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🐒
              </motion.span>
            </div>
            <span className="font-display text-2xl lg:text-3xl font-bold text-gradient-jungle">
              JungleeToys
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Search for toys..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-jungle-200 
                         focus:border-jungle-500 focus:ring-4 focus:ring-jungle-500/20 
                         outline-none transition-all bg-jungle-50/50"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-jungle-500" />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 btn-jungle py-2 px-4 text-sm"
                onClick={() => {
                  if (searchQuery) {
                    window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
                  }
                }}
              >
                Search
              </button>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <button className="flex items-center gap-1 font-semibold text-gray-700 hover:text-jungle-600 transition-colors">
                Categories
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isCategoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl 
                             border border-jungle-100 py-3 mt-2"
                  >
                    {categories.map((category) => (
                      <Link
                        key={category.slug}
                        href={`/products?category=${category.slug}`}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-jungle-50 
                                 transition-colors text-gray-700 hover:text-jungle-600"
                      >
                        <span className="text-xl">{category.icon}</span>
                        <span className="font-medium">{category.name}</span>
                      </Link>
                    ))}
                    <div className="border-t border-jungle-100 mt-2 pt-2">
                      <Link
                        href="/products"
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-jungle-50 
                                 transition-colors text-jungle-600 font-semibold"
                      >
                        View All Products →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/products?filter=new"
              className="font-semibold text-gray-700 hover:text-jungle-600 transition-colors"
            >
              New Arrivals
            </Link>
            <Link
              href="/products?filter=sale"
              className="font-semibold text-tiger-600 hover:text-tiger-700 transition-colors"
            >
              Sale 🔥
            </Link>

            {/* Admin Link - Only visible to authenticated admins */}
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-1 font-semibold text-gray-700 hover:text-jungle-600 transition-colors"
              >
                <User className="h-5 w-5" />
                Admin
              </Link>
            )}

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-3 bg-jungle-100 hover:bg-jungle-200 rounded-full transition-colors"
            >
              <ShoppingCart className="h-6 w-6 text-jungle-700" />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-tiger-500 text-white text-xs 
                           font-bold w-5 h-5 flex items-center justify-center rounded-full"
                >
                  {itemCount > 9 ? '9+' : itemCount}
                </motion.span>
              )}
            </button>
          </div>

          {/* Mobile: Cart + Menu */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={openCart}
              className="relative p-2 bg-jungle-100 hover:bg-jungle-200 rounded-full transition-colors"
            >
              <ShoppingCart className="h-5 w-5 text-jungle-700" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-tiger-500 text-white text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-jungle-100 rounded-full transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-jungle-700" />
              ) : (
                <Menu className="h-6 w-6 text-jungle-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-jungle-100"
            >
              {/* Mobile Search */}
              <div className="py-4">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search for toys..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-jungle-200 
                             focus:border-jungle-500 outline-none bg-jungle-50/50"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-jungle-500" />
                </div>
              </div>

              {/* Mobile Categories */}
              <div className="py-2 border-t border-jungle-100">
                <p className="px-2 py-2 text-xs font-semibold text-gray-500 uppercase">
                  Categories
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/products?category=${category.slug}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-2 p-3 bg-jungle-50 rounded-xl 
                               hover:bg-jungle-100 transition-colors"
                    >
                      <span>{category.icon}</span>
                      <span className="text-sm font-medium text-gray-700">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Links */}
              <div className="py-4 border-t border-jungle-100 space-y-2">
                <Link
                  href="/products?filter=new"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 font-medium text-gray-700 hover:bg-jungle-50 rounded-xl"
                >
                  New Arrivals ✨
                </Link>
                <Link
                  href="/products?filter=sale"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 font-medium text-tiger-600 hover:bg-tiger-50 rounded-xl"
                >
                  Sale 🔥
                </Link>
                {/* Admin Link - Only visible to authenticated admins */}
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-2 font-medium text-gray-700 hover:bg-jungle-50 rounded-xl"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
