'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Variant {
  name: string;
  value: string;
}

interface StickyBuyBarProps {
  price: number;
  originalPrice?: number;
  selectedVariants: Variant[];
  quantity: number;
  isInStock: boolean;
  stockCount?: number;
  onAddToCart: () => void;
  onQuantityChange: (qty: number) => void;
  className?: string;
}

export default function StickyBuyBar({
  price,
  originalPrice,
  selectedVariants,
  quantity,
  isInStock,
  stockCount,
  onAddToCart,
  onQuantityChange,
  className = '',
}: StickyBuyBarProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling past the product details section
      // Check if reviews section is in view or scrolled past
      const reviewsSection = document.getElementById('reviews');
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      if (reviewsSection) {
        const reviewsTop = reviewsSection.offsetTop;
        // Show sticky bar when reviews section is approaching viewport
        setIsVisible(scrollY + windowHeight > reviewsTop - 100);
      } else {
        // Fallback: show after 600px scroll
        setIsVisible(scrollY > 600);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const variantSummary = selectedVariants
    .map((v) => `${v.name}: ${v.value}`)
    .join(', ');

  const displayPrice = originalPrice && originalPrice > price ? (
    <div className="flex items-center gap-2">
      <span className="text-lg md:text-xl font-semibold text-black">₹{price}</span>
      <span className="text-sm text-gray-500 line-through">₹{originalPrice}</span>
      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">
        {Math.round(((originalPrice - price) / originalPrice) * 100)}% OFF
      </span>
    </div>
  ) : (
    <span className="text-lg md:text-xl font-semibold text-black">₹{price}</span>
  );

  return (
    <>
      {/* Mobile Sticky Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: isVisible ? 0 : 100 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden ${className}`}
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="max-w-7xl mx-auto px-4 py-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-black truncate leading-tight">
                {displayPrice}
              </div>
              {variantSummary && (
                <div className="text-xs text-gray-600 truncate mt-0.5 leading-tight">
                  {variantSummary}
                </div>
              )}
              {!isInStock && (
                <div className="text-xs text-red-600 mt-0.5 leading-tight">Out of Stock</div>
              )}
              {isInStock && stockCount && stockCount < 10 && (
                <div className="text-xs text-orange-600 mt-0.5 leading-tight">
                  Only {stockCount} left
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {/* Quantity Selector - Smaller buttons */}
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  className="px-1.5 py-1 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="px-2 py-1 text-xs font-medium min-w-[1.75rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => onQuantityChange(quantity + 1)}
                  aria-label="Increase quantity"
                  disabled={!isInStock || (stockCount ? quantity >= stockCount : false)}
                  className="px-1.5 py-1 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <button
                onClick={onAddToCart}
                disabled={!isInStock}
                aria-label="Add to cart"
                className="px-3 py-1.5 bg-black text-white rounded-md text-sm font-semibold hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
              >
                {isInStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Desktop Sticky Bar (optional - can be shown in sidebar) */}
      <div className="hidden md:block">
        {/* Desktop sticky bar can be implemented as a sidebar or top bar */}
      </div>
    </>
  );
}

