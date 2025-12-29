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
import { Product, supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import MakeOfferModal from '@/components/MakeOfferModal';

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const { addItem } = useCart();

  // Fetch product and related products from Supabase
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        // Fetch main product by slug
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('slug', params.slug)
          .single();

        if (productError) throw productError;
        setProduct(productData);

        // Fetch related products (same category or featured)
        if (productData) {
          const { data: relatedData } = await supabase
            .from('products')
            .select('*')
            .neq('id', productData.id)
            .eq('category_id', productData.category_id)
            .limit(4);

          setRelatedProducts(relatedData || []);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

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
  const images = product.images.length > 0 ? product.images : [null, null, null, null];

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
                    className={`h-5 w-5 ${i < 4 ? 'text-banana-400 fill-banana-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">(24 reviews)</span>
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
