'use client';

import { useState } from 'react';
import { X, Tag, Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/cart';

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
}

interface MakeOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

export default function MakeOfferModal({ isOpen, onClose, product }: MakeOfferModalProps) {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    offer_amount: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product.id,
          ...formData,
          offer_amount: parseFloat(formData.offer_amount),
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setFormData({
            customer_name: '',
            customer_email: '',
            customer_phone: '',
            offer_amount: '',
            message: '',
          });
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to submit offer');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">✓</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">
            Offer Submitted!
          </h3>
          <p className="text-gray-600">
            We've received your offer. We'll contact you soon at {formData.customer_email}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Tag className="h-6 w-6 text-jungle-600" />
            <h2 className="font-display text-2xl font-bold text-gray-900">
              Make an Offer
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Product Info */}
        <div className="flex gap-4 p-4 bg-jungle-50 rounded-xl mb-6">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-600">
              Listed Price: <span className="font-bold text-jungle-600">{formatPrice(product.price)}</span>
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.customer_name}
                onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.customer_email}
                onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number (Optional)
              </label>
              <input
                type="tel"
                value={formData.customer_phone}
                onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                placeholder="+44 1234 567890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Offer (£) *
              </label>
              <input
                type="number"
                required
                min="0.01"
                step="0.01"
                value={formData.offer_amount}
                onChange={(e) => setFormData({ ...formData, offer_amount: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message (Optional)
            </label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none resize-none"
              placeholder="Any additional details about your offer..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-jungle py-3 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Offer'
              )}
            </button>
          </div>
        </form>

        <p className="text-xs text-gray-500 text-center mt-4">
          We'll review your offer and contact you within 24-48 hours
        </p>
      </div>
    </div>
  );
}
