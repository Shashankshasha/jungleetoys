'use client';

import { useState } from 'react';
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
} from 'lucide-react';
import { formatPrice } from '@/lib/cart';
import { Product } from '@/lib/supabase';

// Sample data - in production, fetch from Supabase
const stats = {
  totalRevenue: 12450.99,
  totalOrders: 156,
  totalProducts: 48,
  totalCustomers: 89,
};

const recentOrders = [
  { id: 'JT-ABC123', customer: 'John Smith', total: 54.99, status: 'shipped', date: '2024-01-15' },
  { id: 'JT-DEF456', customer: 'Sarah Johnson', total: 89.99, status: 'paid', date: '2024-01-15' },
  { id: 'JT-GHI789', customer: 'Mike Brown', total: 124.50, status: 'delivered', date: '2024-01-14' },
  { id: 'JT-JKL012', customer: 'Emma Wilson', total: 34.99, status: 'pending', date: '2024-01-14' },
];

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Super Hero Action Figure Set',
    slug: 'super-hero-action-figure-set',
    description: 'Amazing collection',
    price: 24.99,
    compare_price: 34.99,
    category_id: 'action-figures',
    images: [],
    stock: 15,
    featured: true,
    is_new: true,
    age_range: '5-12 years',
    brand: 'HeroWorld',
    created_at: '2024-01-10',
    updated_at: '2024-01-10',
  },
  {
    id: '2',
    name: 'Wooden Building Blocks (100 pcs)',
    slug: 'wooden-building-blocks-100',
    description: 'Educational blocks',
    price: 29.99,
    category_id: 'building-blocks',
    images: [],
    stock: 25,
    featured: true,
    is_new: false,
    age_range: '3-8 years',
    brand: 'EduPlay',
    created_at: '2024-01-08',
    updated_at: '2024-01-08',
  },
  {
    id: '3',
    name: 'Remote Control Racing Car',
    slug: 'rc-racing-car',
    description: 'High-speed RC car',
    price: 39.99,
    compare_price: 49.99,
    category_id: 'vehicles',
    images: [],
    stock: 8,
    featured: true,
    is_new: true,
    age_range: '8+ years',
    brand: 'SpeedKing',
    created_at: '2024-01-05',
    updated_at: '2024-01-05',
  },
];

type Tab = 'dashboard' | 'products' | 'orders' | 'settings';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

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
                  <span className="text-sm text-green-600 font-medium">+12.5%</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatPrice(stats.totalRevenue)}
                </p>
                <p className="text-gray-500 text-sm">Total Revenue</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-tiger-100 rounded-xl">
                    <ShoppingCart className="h-6 w-6 text-tiger-600" />
                  </div>
                  <span className="text-sm text-green-600 font-medium">+8.2%</span>
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
                  <span className="text-sm text-green-600 font-medium">+5.3%</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
                <p className="text-gray-500 text-sm">Customers</p>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="font-display text-lg font-bold">Recent Orders</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                        Total
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-mono text-sm">{order.id}</td>
                        <td className="px-6 py-4">{order.customer}</td>
                        <td className="px-6 py-4 font-semibold">{formatPrice(order.total)}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status]}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-sm">{order.date}</td>
                        <td className="px-6 py-4">
                          <button className="text-jungle-600 hover:text-jungle-700">
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
              <button className="btn-jungle flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Product
              </button>
            </div>

            {/* Products Table */}
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
                    {sampleProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-jungle-100 rounded-xl flex items-center justify-center">
                              🧸
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-500">{product.brand}</p>
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
                          {product.category_id.replace('-', ' ')}
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
                            <button className="p-2 hover:bg-jungle-100 rounded-lg text-jungle-600">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-2 hover:bg-red-100 rounded-lg text-red-600">
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
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="font-display text-lg font-bold">All Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-mono text-sm">{order.id}</td>
                      <td className="px-6 py-4">{order.customer}</td>
                      <td className="px-6 py-4 font-semibold">{formatPrice(order.total)}</td>
                      <td className="px-6 py-4">
                        <select
                          defaultValue={order.status}
                          className="text-sm border border-gray-200 rounded-lg px-2 py-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-sm">{order.date}</td>
                      <td className="px-6 py-4">
                        <button className="text-jungle-600 hover:text-jungle-700">
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-display text-lg font-bold mb-6">Store Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Store Name
                  </label>
                  <input type="text" defaultValue="JungleeToys" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Support Email
                  </label>
                  <input type="email" defaultValue="hello@jungleetoys.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Currency
                  </label>
                  <select defaultValue="GBP">
                    <option value="GBP">GBP (£)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="USD">USD ($)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Free Shipping Threshold
                  </label>
                  <input type="number" defaultValue="50" />
                </div>
                <button className="btn-jungle mt-4">Save Settings</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
