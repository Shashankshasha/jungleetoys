'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Settings,
  Home,
  Loader2,
} from 'lucide-react';
import { formatPrice } from '@/lib/cart';
import { Product } from '@/lib/supabase';
import ProductFormModal from '@/components/ProductFormModal';

type Tab = 'dashboard' | 'products' | 'orders' | 'settings';

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [settings, setSettings] = useState<any>(null);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data } = await supabase.from('categories').select('id, name, slug').order('name');
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch settings
  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  // Save settings
  const saveSettings = async () => {
    if (!settings) return;

    setSettingsLoading(true);
    setSettingsSaved(false);

    try {
      const response = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setSettingsSaved(true);
        setTimeout(() => setSettingsSaved(false), 3000);
      } else {
        alert('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setSettingsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchSettings();
  }, []);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProducts();
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete product');
    }
  };

  const handleModalSuccess = () => {
    fetchProducts();
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    totalRevenue: products.reduce((sum, p) => sum + p.price * (p.stock || 0), 0),
    totalOrders: 0,
    totalProducts: products.length,
    totalCustomers: 0,
  };

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    paid: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-jungle-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="font-display text-xl font-bold">🌴 JungleeToys Admin</h1>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 text-jungle-200 hover:text-white transition-colors"
            >
              <Home className="h-4 w-4" />
              View Store
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-gray-200 pb-4">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingCart },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                        ${activeTab === tab.id
                          ? 'bg-jungle-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'}`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-jungle-100 rounded-xl">
                    <TrendingUp className="h-6 w-6 text-jungle-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(stats.totalRevenue)}
                </p>
                <p className="text-gray-500 text-sm">Total Inventory Value</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-tiger-100 rounded-xl">
                    <ShoppingCart className="h-6 w-6 text-tiger-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                <p className="text-gray-500 text-sm">Total Orders</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-parrot-100 rounded-xl">
                    <Package className="h-6 w-6 text-parrot-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                <p className="text-gray-500 text-sm">Products</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-banana-100 rounded-xl">
                    <Users className="h-6 w-6 text-banana-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
                <p className="text-gray-500 text-sm">Customers</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-display text-lg font-bold mb-4">Quick Actions</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={handleAddProduct}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-jungle-500 hover:bg-jungle-50 transition-colors text-left"
                >
                  <Plus className="h-6 w-6 text-jungle-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">Add Product</h3>
                  <p className="text-sm text-gray-500">Add a new toy to your store</p>
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-jungle-500 hover:bg-jungle-50 transition-colors text-left"
                >
                  <Package className="h-6 w-6 text-jungle-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">Manage Products</h3>
                  <p className="text-sm text-gray-500">Edit prices and stock levels</p>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-jungle-500 hover:bg-jungle-50 transition-colors text-left"
                >
                  <ShoppingCart className="h-6 w-6 text-jungle-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">View Orders</h3>
                  <p className="text-sm text-gray-500">Process customer orders</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <button onClick={handleAddProduct} className="btn-jungle flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Product
              </button>
            </div>

            {/* Products Table */}
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 text-jungle-600 animate-spin" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products yet</h3>
                <p className="text-gray-500 mb-6">
                  {searchQuery
                    ? 'No products match your search'
                    : 'Get started by adding your first product'}
                </p>
                {!searchQuery && (
                  <button onClick={handleAddProduct} className="btn-jungle inline-flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Your First Product
                  </button>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-jungle-100 rounded-xl flex items-center justify-center overflow-hidden">
                                {product.images?.[0] ? (
                                  <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <span className="text-2xl">🧸</span>
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{product.name}</p>
                                <p className="text-sm text-gray-500">{product.brand || 'No brand'}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold">{formatPrice(product.price)}</p>
                            {product.compare_price && (
                              <p className="text-sm text-gray-400 line-through">
                                {formatPrice(product.compare_price)}
                              </p>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`font-medium ${product.stock <= 5 ? 'text-red-600' : 'text-gray-900'}`}
                            >
                              {product.stock}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 capitalize">
                            {categories.find((c) => c.id === product.category_id)?.name || 'Unknown'}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              {product.featured && (
                                <span className="bg-jungle-100 text-jungle-700 text-xs px-2 py-1 rounded-full">
                                  Featured
                                </span>
                              )}
                              {product.is_new && (
                                <span className="bg-parrot-100 text-parrot-700 text-xs px-2 py-1 rounded-full">
                                  New
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditProduct(product)}
                                className="p-2 hover:bg-jungle-100 rounded-lg text-jungle-600"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-2 hover:bg-red-100 rounded-lg text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500">Orders will appear here when customers make purchases</p>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl space-y-6">
            {!settings ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 text-jungle-600 animate-spin" />
              </div>
            ) : (
              <>
                {/* Store Information */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="font-display text-lg font-bold mb-6">Store Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Store Name
                      </label>
                      <input
                        type="text"
                        value={settings.store_name || ''}
                        onChange={(e) => setSettings({ ...settings, store_name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Support Email
                        </label>
                        <input
                          type="email"
                          value={settings.support_email || ''}
                          onChange={(e) => setSettings({ ...settings, support_email: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={settings.phone || ''}
                          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                          placeholder="+44 20 1234 5678"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="font-display text-lg font-bold mb-6">Store Address</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 1
                      </label>
                      <input
                        type="text"
                        value={settings.address_line1 || ''}
                        onChange={(e) => setSettings({ ...settings, address_line1: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                        placeholder="123 Jungle Street"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address Line 2
                      </label>
                      <input
                        type="text"
                        value={settings.address_line2 || ''}
                        onChange={(e) => setSettings({ ...settings, address_line2: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                        placeholder="Suite 100"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                          type="text"
                          value={settings.city || ''}
                          onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                          placeholder="London"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          value={settings.postal_code || ''}
                          onChange={(e) => setSettings({ ...settings, postal_code: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                          placeholder="SW1A 1AA"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          value={settings.country || ''}
                          onChange={(e) => setSettings({ ...settings, country: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                          placeholder="United Kingdom"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Currency & Shipping */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="font-display text-lg font-bold mb-6">Currency & Shipping</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Currency
                        </label>
                        <select
                          value={settings.currency || 'GBP'}
                          onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                        >
                          <option value="GBP">GBP (£)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="USD">USD ($)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Free Shipping Threshold (£)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={settings.free_shipping_threshold || ''}
                          onChange={(e) =>
                            setSettings({ ...settings, free_shipping_threshold: parseFloat(e.target.value) })
                          }
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                          placeholder="50.00"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="font-display text-lg font-bold mb-6">Social Media</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Facebook URL
                      </label>
                      <input
                        type="url"
                        value={settings.facebook_url || ''}
                        onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                        placeholder="https://facebook.com/jungleetoys"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Instagram URL
                      </label>
                      <input
                        type="url"
                        value={settings.instagram_url || ''}
                        onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                        placeholder="https://instagram.com/jungleetoys"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Twitter URL
                      </label>
                      <input
                        type="url"
                        value={settings.twitter_url || ''}
                        onChange={(e) => setSettings({ ...settings, twitter_url: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                        placeholder="https://twitter.com/jungleetoys"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Settings */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="font-display text-lg font-bold mb-6">Payment Settings</h2>

                  {/* Payment Methods */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Payment Methods</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.stripe_enabled || false}
                          onChange={(e) => setSettings({ ...settings, stripe_enabled: e.target.checked })}
                          className="w-4 h-4 text-jungle-600 rounded focus:ring-jungle-500"
                        />
                        <div>
                          <span className="font-medium text-gray-900">Stripe</span>
                          <p className="text-sm text-gray-500">Accept credit and debit cards</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.paypal_enabled || false}
                          onChange={(e) => setSettings({ ...settings, paypal_enabled: e.target.checked })}
                          className="w-4 h-4 text-jungle-600 rounded focus:ring-jungle-500"
                        />
                        <div>
                          <span className="font-medium text-gray-900">PayPal</span>
                          <p className="text-sm text-gray-500">Accept PayPal payments</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.cod_enabled || false}
                          onChange={(e) => setSettings({ ...settings, cod_enabled: e.target.checked })}
                          className="w-4 h-4 text-jungle-600 rounded focus:ring-jungle-500"
                        />
                        <div>
                          <span className="font-medium text-gray-900">Cash on Delivery</span>
                          <p className="text-sm text-gray-500">Accept payment on delivery</p>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.bank_transfer_enabled || false}
                          onChange={(e) => setSettings({ ...settings, bank_transfer_enabled: e.target.checked })}
                          className="w-4 h-4 text-jungle-600 rounded focus:ring-jungle-500"
                        />
                        <div>
                          <span className="font-medium text-gray-900">Bank Transfer</span>
                          <p className="text-sm text-gray-500">Accept direct bank transfers</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Stripe Configuration */}
                  {settings.stripe_enabled && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-4">Stripe Configuration</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Publishable Key
                          </label>
                          <input
                            type="text"
                            value={settings.stripe_publishable_key || ''}
                            onChange={(e) => setSettings({ ...settings, stripe_publishable_key: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                            placeholder="pk_live_..."
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Secret Key
                          </label>
                          <input
                            type="password"
                            value={settings.stripe_secret_key || ''}
                            onChange={(e) => setSettings({ ...settings, stripe_secret_key: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                            placeholder="sk_live_..."
                          />
                          <p className="text-xs text-gray-500 mt-1">⚠️ Keep this secret and never share it publicly</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PayPal Configuration */}
                  {settings.paypal_enabled && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-gray-900 mb-4">PayPal Configuration</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Client ID
                          </label>
                          <input
                            type="text"
                            value={settings.paypal_client_id || ''}
                            onChange={(e) => setSettings({ ...settings, paypal_client_id: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                            placeholder="Your PayPal Client ID"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Secret
                          </label>
                          <input
                            type="password"
                            value={settings.paypal_secret || ''}
                            onChange={(e) => setSettings({ ...settings, paypal_secret: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                            placeholder="Your PayPal Secret"
                          />
                          <p className="text-xs text-gray-500 mt-1">⚠️ Keep this secret and never share it publicly</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Payment Display Settings */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Payment Display Settings</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Payment Currency
                        </label>
                        <select
                          value={settings.payment_currency || 'GBP'}
                          onChange={(e) => setSettings({ ...settings, payment_currency: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                        >
                          <option value="GBP">GBP (£)</option>
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Processing Fee (%)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="100"
                          value={settings.processing_fee_percentage || 0}
                          onChange={(e) => setSettings({ ...settings, processing_fee_percentage: parseFloat(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={saveSettings}
                    disabled={settingsLoading}
                    className="btn-jungle flex items-center gap-2"
                  >
                    {settingsLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Settings'
                    )}
                  </button>
                  {settingsSaved && (
                    <span className="text-green-600 font-medium">✓ Settings saved successfully!</span>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
        product={editingProduct}
        categories={categories}
      />
    </div>
  );
}
