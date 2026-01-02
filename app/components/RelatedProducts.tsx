'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

export interface RelatedProduct {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
  slug: string;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
  onAddToCart?: (productId: string) => void;
  onProductClick?: (slug: string) => void;
}

export default function RelatedProducts({
  products,
  onAddToCart,
  onProductClick,
}: RelatedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section
      ref={containerRef}
      className="mb-12"
      aria-label="Related products"
    >
      <h2 className="text-2xl font-archivo font-bold uppercase mb-6">You May Also Like</h2>
      <div className="relative">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 hidden md:block"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 hidden md:block"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Product Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="flex-shrink-0 w-48 md:w-56"
            >
              <div
                onClick={() => onProductClick?.(product.slug)}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white cursor-pointer group hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 50vw, 25vw"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="text-sm font-semibold uppercase tracking-tight line-clamp-2 mb-2 font-archivo">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between mb-3">
                    {product.originalPrice && product.originalPrice > product.price ? (
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-black">₹{product.price}</span>
                        <span className="text-xs text-gray-500 line-through">₹{product.originalPrice}</span>
                      </div>
                    ) : (
                      <span className="font-semibold text-black">₹{product.price}</span>
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart?.(product.id);
                    }}
                    className="w-full py-2 bg-black text-white rounded-md text-sm font-semibold hover:bg-gray-800 transition-colors font-inter"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

