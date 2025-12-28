'use client';

import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Product } from '@/lib/supabase';
import ImageUpload from './ImageUpload';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product?: Product | null;
  categories: Array<{ id: string; name: string; slug: string }>;
}

export default function ProductFormModal({
  isOpen,
  onClose,
  onSuccess,
  product,
  categories,
}: ProductFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    price: '',
    compare_price: '',
    category_id: '',
    images: [] as string[],
    stock: '',
    featured: false,
    is_new: true,
    age_range: '',
    brand: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        slug: product.slug,
        description: product.description || '',
        price: product.price.toString(),
        compare_price: product.compare_price?.toString() || '',
        category_id: product.category_id,
        images: product.images || [],
        stock: product.stock.toString(),
        featured: product.featured,
        is_new: product.is_new,
        age_range: product.age_range || '',
        brand: product.brand || '',
      });
    } else {
      // Reset form for new product
      setFormData({
        name: '',
        slug: '',
        description: '',
        price: '',
        compare_price: '',
        category_id: categories[0]?.id || '',
        images: [],
        stock: '0',
        featured: false,
        is_new: true,
        age_range: '',
        brand: '',
      });
    }
    setError('');
  }, [product, categories, isOpen]);

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        compare_price: formData.compare_price ? parseFloat(formData.compare_price) : null,
        stock: parseInt(formData.stock),
      };

      const url = '/api/products';
      const method = product ? 'PUT' : 'POST';
      const body = product ? { ...payload, id: product.id } : payload;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save product');
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error('Save error:', err);
      setError(err instanceof Error ? err.message : 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-display font-bold">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Product Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Images
            </label>
            <ImageUpload
              images={formData.images}
              onChange={(images) => setFormData({ ...formData, images })}
            />
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
              placeholder="e.g., Super Hero Action Figure Set"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL Slug *
            </label>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none font-mono text-sm"
              placeholder="super-hero-action-figure-set"
            />
            <p className="text-xs text-gray-500 mt-1">
              Auto-generated from product name (can be edited)
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none resize-none"
              placeholder="Describe the product..."
            />
          </div>

          {/* Price & Compare Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (£) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                placeholder="29.99"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Compare Price (£)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.compare_price}
                onChange={(e) => setFormData({ ...formData, compare_price: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                placeholder="39.99"
              />
              <p className="text-xs text-gray-500 mt-1">Original price (for discount display)</p>
            </div>
          </div>

          {/* Category & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                required
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity *
              </label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                placeholder="50"
              />
            </div>
          </div>

          {/* Brand & Age Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                placeholder="e.g., HeroWorld"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
              <input
                type="text"
                value={formData.age_range}
                onChange={(e) => setFormData({ ...formData, age_range: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                placeholder="e.g., 5-12 years"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-jungle-600 border-gray-300 rounded focus:ring-jungle-500"
              />
              <span className="text-sm text-gray-700">Featured Product</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.is_new}
                onChange={(e) => setFormData({ ...formData, is_new: e.target.checked })}
                className="w-4 h-4 text-jungle-600 border-gray-300 rounded focus:ring-jungle-500"
              />
              <span className="text-sm text-gray-700">Mark as New</span>
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-jungle-600 text-white rounded-xl hover:bg-jungle-700 transition-colors flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>{product ? 'Update Product' : 'Add Product'}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
