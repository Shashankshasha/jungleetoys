'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '@/lib/supabase';
import { useCart, formatPrice } from '@/lib/cart';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();

  const discount = product.compare_price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="product-card card-toy group relative"
    >
      {/* Badges */}
      {product.is_new && <span className="badge-new">New! ✨</span>}
      {discount && <span className="badge-sale">-{discount}%</span>}

      {/* Wishlist Button */}
      <button
        className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm 
                 rounded-full shadow-lg opacity-0 group-hover:opacity-100 
                 hover:bg-red-50 hover:text-red-500 transition-all duration-300"
      >
        <Heart className="h-5 w-5" />
      </button>

      {/* Image Container */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square mb-4 bg-gradient-to-br from-jungle-50 to-banana-50 
                      rounded-2xl overflow-hidden">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl group-hover:scale-125 transition-transform duration-300">
                🧸
              </span>
            </div>
          )}

          {/* Quick Add Button - Appears on Hover */}
          <motion.button
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            className="absolute bottom-4 left-4 right-4 bg-jungle-600 hover:bg-jungle-700 
                     text-white font-semibold py-3 rounded-xl shadow-lg 
                     flex items-center justify-center gap-2 
                     opacity-0 group-hover:opacity-100 group-hover:translate-y-0 
                     translate-y-4 transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
          >
            <ShoppingCart className="h-5 w-5" />
            Quick Add
          </motion.button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-2">
        {/* Category/Age Tag */}
        {product.age_range && (
          <span className="inline-block text-xs font-medium text-jungle-600 bg-jungle-100 
                         px-2 py-1 rounded-full">
            {product.age_range}
          </span>
        )}

        {/* Product Name */}
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-gray-900 group-hover:text-jungle-600 
                       transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating (placeholder) */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < 4 ? 'text-banana-400 fill-banana-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">(24)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-jungle-600">
            {formatPrice(product.price)}
          </span>
          {product.compare_price && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.compare_price)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product.stock <= 5 && product.stock > 0 && (
          <p className="text-xs text-tiger-600 font-medium">
            Only {product.stock} left in stock!
          </p>
        )}
        {product.stock === 0 && (
          <p className="text-xs text-red-500 font-medium">Out of stock</p>
        )}
      </div>
    </motion.div>
  );
}
