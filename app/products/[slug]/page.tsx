'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Truck,
  RotateCcw,
  Shield,
  Minus,
  Plus,
  ChevronRight,
  Tag,
} from 'lucide-react';
import { useCart, formatPrice } from '@/lib/cart';
import { Product, supabase, normalizeProduct } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import MakeOfferModal from '@/components/MakeOfferModal';

interface ReviewData {
  id: string;
  customer_name: string;
  customer_email: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
  });
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const { addItem } = useCart();

  // Fetch product and related products from Supabase
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        console.log('🔍 Fetching product with slug:', params.slug);

        // Fetch main product by slug
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('slug', params.slug)
          .single();

        if (productError) {
          console.error('❌ Error fetching product:', productError);
          throw productError;
        }

        console.log('✅ Product fetched:', productData);
        setProduct(normalizeProduct(productData));

        // Fetch related products (same category or featured)
        if (productData) {
          const { data: relatedData } = await supabase
            .from('products')
            .select('*')
            .neq('id', productData.id)
            .eq('category_id', productData.category_id)
            .limit(4);

          console.log('📦 Related products:', relatedData?.length || 0);
          setRelatedProducts((relatedData || []).map(normalizeProduct));
        }
      } catch (error) {
        console.error('❌ Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  // Fetch reviews for this product
  useEffect(() => {
    const fetchReviews = async () => {
      if (!product) return;

      try {
        const response = await fetch(`/api/reviews?productId=${product.id}`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews || []);
          setReviewsCount(data.count || 0);
          setAverageRating(data.averageRating || 0);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [product]);

  // Submit review
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    setReviewSubmitting(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          customerName: reviewForm.name,
          customerEmail: reviewForm.email,
          rating: reviewForm.rating,
          comment: reviewForm.comment,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || 'Thank you for your review!');
        setReviewForm({ name: '', email: '', rating: 5, comment: '' });
        setShowReviewForm(false);
      } else {
        alert(data.error || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setReviewSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jungle-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
          <Link href="/products" className="btn-jungle">
            Browse All Toys
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : null;

  // Placeholder images for demo
  const images = (product.images && product.images.length > 0) ? product.images : [null, null, null, null];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-jungle-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-jungle-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-jungle-600">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/products" className="hover:text-jungle-600">
              Products
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square bg-gradient-to-br from-jungle-50 to-banana-50 
                       rounded-3xl overflow-hidden"
            >
              {images[selectedImage] ? (
                <Image
                  src={images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[150px]">🧸</span>
                </div>
              )}

              {/* Badges */}
              {product.is_new && (
                <span className="absolute top-6 left-6 bg-gradient-to-r from-parrot-400 to-parrot-500 
                               text-white font-bold px-4 py-2 rounded-full shadow-lg">
                  New! ✨
                </span>
              )}
              {discount && (
                <span className="absolute top-6 right-6 bg-gradient-to-r from-tiger-500 to-banana-500 
                               text-white font-bold px-4 py-2 rounded-full shadow-lg">
                  -{discount}% OFF
                </span>
              )}
            </motion.div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all
                            ${selectedImage === idx ? 'border-jungle-500 ring-2 ring-jungle-500/20' : 'border-transparent hover:border-jungle-200'}`}
                >
                  {img ? (
                    <Image
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-jungle-50 flex items-center justify-center">
                      <span className="text-3xl">🧸</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Brand & Title */}
            <div>
              {product.brand && (
                <p className="text-jungle-600 font-semibold mb-2">{product.brand}</p>
              )}
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-gray-900">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.round(averageRating) ? 'text-banana-400 fill-banana-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {reviewsCount > 0 ? `${averageRating.toFixed(1)} (${reviewsCount} reviews)` : 'No reviews yet'}
              </span>
              <span className="text-sm text-jungle-600">|</span>
              <span className="text-sm text-jungle-600">{product.stock} in stock</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-jungle-600">
                {formatPrice(product.price)}
              </span>
              {product.compare_price && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.compare_price)}
                  </span>
                  <span className="bg-tiger-100 text-tiger-700 font-semibold px-2 py-1 rounded-lg text-sm">
                    Save {formatPrice(product.compare_price - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Age Range */}
            {product.age_range && (
              <div className="inline-flex items-center gap-2 bg-jungle-100 text-jungle-700 
                            px-4 py-2 rounded-full font-medium">
                <span>👶</span> Recommended: {product.age_range}
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center gap-3 bg-jungle-50 rounded-xl p-2">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock}
                  className="p-2 hover:bg-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <Plus className="h-5 w-5" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={() => addItem(product, quantity)}
                disabled={product.stock === 0}
                className="flex-1 btn-jungle flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShoppingCart className="h-5 w-5" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>

              {/* Wishlist */}
              <button className="p-4 border-2 border-jungle-200 hover:border-red-400
                               hover:bg-red-50 rounded-xl transition-colors">
                <Heart className="h-6 w-6" />
              </button>
            </div>

            {/* Make an Offer */}
            <button
              onClick={() => setIsOfferModalOpen(true)}
              className="w-full btn-outline-jungle flex items-center justify-center gap-2 py-3"
            >
              <Tag className="h-5 w-5" />
              Make an Offer
            </button>

            {/* Stock Warning */}
            {product.stock <= 5 && product.stock > 0 && (
              <p className="text-tiger-600 font-medium bg-tiger-50 p-3 rounded-xl">
                ⚡ Only {product.stock} left in stock - order soon!
              </p>
            )}

            {/* Benefits */}
            <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-jungle-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-jungle-100 rounded-xl">
                  <Truck className="h-5 w-5 text-jungle-600" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold">Free Delivery</p>
                  <p className="text-gray-500">Over £50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-jungle-100 rounded-xl">
                  <RotateCcw className="h-5 w-5 text-jungle-600" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold">30 Day Returns</p>
                  <p className="text-gray-500">Easy refunds</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-jungle-100 rounded-xl">
                  <Shield className="h-5 w-5 text-jungle-600" />
                </div>
                <div className="text-sm">
                  <p className="font-semibold">Safe & Secure</p>
                  <p className="text-gray-500">Payment</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="pt-6 border-t border-jungle-100">
              <h3 className="font-display text-xl font-bold mb-4">Description</h3>
              <div className="prose prose-jungle text-gray-600 whitespace-pre-line">
                {product.description}
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center gap-4 pt-4">
              <span className="text-sm text-gray-500">Share:</span>
              <button className="p-2 hover:bg-jungle-100 rounded-lg transition-colors">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section className="mt-12 pt-12 border-t border-jungle-100">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-gray-900">
              Customer Reviews
            </h2>
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="btn-jungle flex items-center gap-2"
            >
              <Star className="h-4 w-4" />
              {showReviewForm ? 'Cancel' : 'Write a Review'}
            </button>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="bg-white rounded-2xl border-2 border-jungle-200 p-6 mb-8">
              <h3 className="font-display text-xl font-bold mb-4">Write Your Review</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={reviewForm.name}
                      onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      value={reviewForm.email}
                      onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Rating *
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setReviewForm({ ...reviewForm, rating })}
                        className="p-2 hover:bg-jungle-50 rounded-lg transition-colors"
                      >
                        <Star
                          className={`h-8 w-8 ${
                            rating <= reviewForm.rating
                              ? 'text-banana-400 fill-banana-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-gray-600 self-center">
                      {reviewForm.rating} star{reviewForm.rating !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Review *
                  </label>
                  <textarea
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                    required
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:border-jungle-500 outline-none"
                    placeholder="Share your thoughts about this product..."
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={reviewSubmitting}
                    className="btn-jungle flex items-center gap-2 disabled:opacity-50"
                  >
                    {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="btn-outline-jungle"
                  >
                    Cancel
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  * Your review will be published after admin approval
                </p>
              </form>
            </div>
          )}

          {/* Reviews List */}
          {reviews.length === 0 ? (
            <div className="text-center py-12 bg-jungle-50 rounded-2xl">
              <Star className="h-12 w-12 text-jungle-300 mx-auto mb-4" />
              <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl border border-jungle-100 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.customer_name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-banana-400 fill-banana-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Related Products */}
        <section className="mt-16 pt-12 border-t border-jungle-100">
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
            You Might Also Like 💝
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </section>
      </div>

      {/* Make an Offer Modal */}
      <MakeOfferModal
        isOpen={isOfferModalOpen}
        onClose={() => setIsOfferModalOpen(false)}
        product={product}
      />
    </div>
  );
}
