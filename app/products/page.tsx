'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal, X, ChevronDown, Search, Grid3X3, LayoutList } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/supabase';

// Sample products - in production, this would come from Supabase
const allProducts: Product[] = [
  {
    id: '1',
    name: 'Super Hero Action Figure Set',
    slug: 'super-hero-action-figure-set',
    description: 'Amazing collection of 6 super hero action figures with accessories',
    price: 24.99,
    compare_price: 34.99,
    category_id: 'action-figures',
    images: [],
    stock: 15,
    featured: true,
    is_new: true,
    age_range: '5-12 years',
    brand: 'HeroWorld',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Wooden Building Blocks (100 pcs)',
    slug: 'wooden-building-blocks-100',
    description: 'Educational wooden blocks in various shapes and colors',
    price: 29.99,
    category_id: 'building-blocks',
    images: [],
    stock: 25,
    featured: true,
    is_new: false,
    age_range: '3-8 years',
    brand: 'EduPlay',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Remote Control Racing Car',
    slug: 'rc-racing-car',
    description: 'High-speed RC car with rechargeable battery',
    price: 39.99,
    compare_price: 49.99,
    category_id: 'vehicles',
    images: [],
    stock: 8,
    featured: true,
    is_new: true,
    age_range: '8+ years',
    brand: 'SpeedKing',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Cuddly Teddy Bear XL',
    slug: 'cuddly-teddy-bear-xl',
    description: 'Super soft and huggable teddy bear, 60cm tall',
    price: 19.99,
    category_id: 'dolls-plush',
    images: [],
    stock: 30,
    featured: true,
    is_new: false,
    age_range: '0-99 years',
    brand: 'CuddlePals',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Science Experiment Kit',
    slug: 'science-experiment-kit',
    description: '50+ experiments to explore physics and chemistry',
    price: 34.99,
    category_id: 'educational',
    images: [],
    stock: 12,
    featured: false,
    is_new: true,
    age_range: '8-14 years',
    brand: 'ScienceWiz',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Princess Dress-Up Set',
    slug: 'princess-dress-up-set',
    description: 'Beautiful princess costume with tiara and accessories',
    price: 27.99,
    compare_price: 35.99,
    category_id: 'dolls-plush',
    images: [],
    stock: 20,
    featured: false,
    is_new: false,
    age_range: '3-8 years',
    brand: 'FairyTale',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Dinosaur World Playset',
    slug: 'dinosaur-world-playset',
    description: '12 realistic dinosaur figures with playmat',
    price: 22.99,
    category_id: 'action-figures',
    images: [],
    stock: 18,
    featured: true,
    is_new: false,
    age_range: '4-10 years',
    brand: 'DinoLand',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Musical Learning Tablet',
    slug: 'musical-learning-tablet',
    description: 'Interactive tablet with songs, games and learning activities',
    price: 44.99,
    category_id: 'educational',
    images: [],
    stock: 5,
    featured: true,
    is_new: true,
    age_range: '2-5 years',
    brand: 'LearnFun',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'Chess & Checkers Set',
    slug: 'chess-checkers-set',
    description: 'Classic wooden chess and checkers combo set',
    price: 24.99,
    category_id: 'board-games',
    images: [],
    stock: 22,
    featured: false,
    is_new: false,
    age_range: '6+ years',
    brand: 'GameMaster',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '10',
    name: 'Art Studio Deluxe Kit',
    slug: 'art-studio-deluxe-kit',
    description: 'Complete art set with paints, brushes, and canvas',
    price: 32.99,
    category_id: 'arts-crafts',
    images: [],
    stock: 15,
    featured: false,
    is_new: true,
    age_range: '5-12 years',
    brand: 'CreativeKids',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '11',
    name: 'Football Goal Set',
    slug: 'football-goal-set',
    description: 'Portable football goal with ball and pump',
    price: 29.99,
    category_id: 'outdoor',
    images: [],
    stock: 10,
    featured: false,
    is_new: false,
    age_range: '5+ years',
    brand: 'SportyKids',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '12',
    name: 'LEGO-Style Spaceship',
    slug: 'lego-style-spaceship',
    description: '500+ piece building set for space enthusiasts',
    price: 49.99,
    compare_price: 59.99,
    category_id: 'building-blocks',
    images: [],
    stock: 7,
    featured: true,
    is_new: true,
    age_range: '8-14 years',
    brand: 'BuildIt',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const categories = [
  { id: 'action-figures', name: 'Action Figures', emoji: '🦸' },
  { id: 'educational', name: 'Educational', emoji: '📚' },
  { id: 'outdoor', name: 'Outdoor Play', emoji: '⚽' },
  { id: 'board-games', name: 'Board Games', emoji: '🎲' },
  { id: 'building-blocks', name: 'Building Blocks', emoji: '🧱' },
  { id: 'dolls-plush', name: 'Dolls & Plush', emoji: '🧸' },
  { id: 'vehicles', name: 'Vehicles', emoji: '🚗' },
  { id: 'arts-crafts', name: 'Arts & Crafts', emoji: '🎨' },
];

const ageRanges = ['0-2 years', '3-5 years', '6-8 years', '9-12 years', '13+ years'];
const priceRanges = [
  { label: 'Under £20', min: 0, max: 20 },
  { label: '£20 - £30', min: 20, max: 30 },
  { label: '£30 - £50', min: 30, max: 50 },
  { label: 'Over £50', min: 50, max: Infinity },
];
const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A to Z' },
];

export default function ProductsPage() {
  const searchParams = useSearchParams();

  // Filter states
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get('category') ? [searchParams.get('category')!] : []
  );
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ label: string; min: number; max: number } | null>(null);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // URL param filters
  const filterParam = searchParams.get('filter');

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let products = [...allProducts];

    // Apply URL filter param
    if (filterParam === 'new') {
      products = products.filter(p => p.is_new);
    } else if (filterParam === 'sale') {
      products = products.filter(p => p.compare_price);
    } else if (filterParam === 'featured') {
      products = products.filter(p => p.featured);
    }

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      products = products.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.brand?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      products = products.filter(p => selectedCategories.includes(p.category_id));
    }

    // Age filter
    if (selectedAges.length > 0) {
      products = products.filter(p => p.age_range && selectedAges.some(age => p.age_range?.includes(age.split(' ')[0])));
    }

    // Price filter
    if (selectedPriceRange) {
      products = products.filter(
        p => p.price >= selectedPriceRange.min && p.price < selectedPriceRange.max
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        products.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        products.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return products;
  }, [searchQuery, selectedCategories, selectedAges, selectedPriceRange, sortBy, filterParam]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId) ? prev.filter(c => c !== categoryId) : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedAges([]);
    setSelectedPriceRange(null);
  };

  const activeFilterCount =
    selectedCategories.length + selectedAges.length + (selectedPriceRange ? 1 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-jungle-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-jungle-600 to-parrot-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
            {filterParam === 'new'
              ? '✨ New Arrivals'
              : filterParam === 'sale'
              ? '🔥 Sale Items'
              : filterParam === 'featured'
              ? '🏆 Best Sellers'
              : '🧸 All Toys'}
          </h1>
          <p className="text-jungle-100">
            Discover {filteredProducts.length} amazing toys waiting for you!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl shadow-lg p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold">Filters</h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-jungle-600 hover:text-jungle-700"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Search */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search toys..."
                    className="w-full pl-10 pr-4 py-2 border-2 border-jungle-200 rounded-xl 
                             focus:border-jungle-500 outline-none"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">Categories</label>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label
                      key={category.id}
                      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors
                                ${selectedCategories.includes(category.id) ? 'bg-jungle-100' : 'hover:bg-gray-50'}`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => toggleCategory(category.id)}
                        className="rounded border-jungle-300 text-jungle-600 focus:ring-jungle-500"
                      />
                      <span>{category.emoji}</span>
                      <span className="text-sm">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-3 block">Price Range</label>
                <div className="space-y-2">
                  {priceRanges.map(range => (
                    <label
                      key={range.label}
                      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors
                                ${selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max ? 'bg-jungle-100' : 'hover:bg-gray-50'}`}
                    >
                      <input
                        type="radio"
                        name="price"
                        checked={selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max}
                        onChange={() => setSelectedPriceRange(range)}
                        className="border-jungle-300 text-jungle-600 focus:ring-jungle-500"
                      />
                      <span className="text-sm">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {/* Mobile Filter Button */}
              <button
                onClick={() => setShowFilters(true)}
                className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-xl 
                         shadow-sm border border-jungle-200 font-medium"
              >
                <Filter className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-jungle-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="relative ml-auto">
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  className="appearance-none bg-white px-4 py-2 pr-10 rounded-xl shadow-sm 
                           border border-jungle-200 font-medium cursor-pointer"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-white rounded-xl shadow-sm border border-jungle-200 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-jungle-100 text-jungle-600' : ''}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-jungle-100 text-jungle-600' : ''}`}
                >
                  <LayoutList className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map(catId => {
                  const cat = categories.find(c => c.id === catId);
                  return (
                    <span
                      key={catId}
                      className="inline-flex items-center gap-1 bg-jungle-100 text-jungle-700 
                               px-3 py-1 rounded-full text-sm"
                    >
                      {cat?.emoji} {cat?.name}
                      <button onClick={() => toggleCategory(catId)}>
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  );
                })}
                {selectedPriceRange && (
                  <span className="inline-flex items-center gap-1 bg-jungle-100 text-jungle-700 px-3 py-1 rounded-full text-sm">
                    {selectedPriceRange.label}
                    <button onClick={() => setSelectedPriceRange(null)}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">😢</div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                  No toys found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search term
                </p>
                <button onClick={clearFilters} className="btn-jungle">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === 'grid'
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1'
                }`}
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed left-0 top-0 h-full w-80 bg-white z-50 lg:hidden 
                       overflow-y-auto shadow-xl"
            >
              <div className="p-4 border-b border-jungle-100 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold">Filters</h2>
                <button onClick={() => setShowFilters(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4 space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search toys..."
                    className="w-full px-4 py-2 border-2 border-jungle-200 rounded-xl focus:border-jungle-500 outline-none"
                  />
                </div>

                {/* Categories */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Categories</label>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label
                        key={category.id}
                        className="flex items-center gap-3 p-2 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => toggleCategory(category.id)}
                          className="rounded border-jungle-300 text-jungle-600"
                        />
                        <span>{category.emoji}</span>
                        <span className="text-sm">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Price</label>
                  <div className="space-y-2">
                    {priceRanges.map(range => (
                      <label key={range.label} className="flex items-center gap-3 p-2 rounded-lg cursor-pointer">
                        <input
                          type="radio"
                          name="price-mobile"
                          checked={selectedPriceRange?.min === range.min}
                          onChange={() => setSelectedPriceRange(range)}
                          className="border-jungle-300 text-jungle-600"
                        />
                        <span className="text-sm">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-jungle-100 flex gap-3">
                <button
                  onClick={clearFilters}
                  className="flex-1 py-3 border-2 border-jungle-600 text-jungle-600 
                           font-semibold rounded-xl"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 btn-jungle"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

