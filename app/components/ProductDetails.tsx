'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  available: boolean;
  price?: number;
}

export interface ProductDetailsData {
  id: string;
  title: string;
  brand?: string;
  sku?: string;
  vendor?: string;
  description: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  inStock: boolean;
  stockCount?: number;
  variants: {
    [key: string]: {
      name: string;
      options: ProductVariant[];
    };
  };
  features?: string[];
  estimatedDelivery?: string;
  taxInfo?: string;
}

interface ProductDetailsProps {
  product: ProductDetailsData;
  onAddToCart: (variantSelections: Record<string, string>, quantity: number) => void;
  onVariantChange?: (selections: Record<string, string>) => void;
}

export default function ProductDetails({
  product,
  onAddToCart,
  onVariantChange,
}: ProductDetailsProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Initialize variant selections with first available option
  React.useEffect(() => {
    const initialSelections: Record<string, string> = {};
    Object.keys(product.variants).forEach((variantKey) => {
      const firstAvailable = product.variants[variantKey].options.find((opt) => opt.available);
      if (firstAvailable) {
        initialSelections[variantKey] = firstAvailable.id;
      }
    });
    setSelectedVariants(initialSelections);
  }, [product.variants]);

  // Calculate current price based on selected variants
  const currentPrice = React.useMemo(() => {
    let basePrice = product.price;
    Object.values(product.variants).forEach((variant) => {
      const selected = variant.options.find(
        (opt) => opt.id === selectedVariants[variant.name.toLowerCase()]
      );
      if (selected?.price) {
        basePrice += selected.price;
      }
    });
    return basePrice;
  }, [product.price, product.variants, selectedVariants]);

  // Check if current variant combination is in stock
  const isCurrentVariantInStock = React.useMemo(() => {
    return Object.values(product.variants).every((variant) => {
      const selected = variant.options.find(
        (opt) => opt.id === selectedVariants[variant.name.toLowerCase()]
      );
      return selected?.available ?? true;
    }) && product.inStock;
  }, [product.variants, product.inStock, selectedVariants]);

  // Handle variant selection
  const handleVariantChange = useCallback(
    (variantKey: string, variantId: string) => {
      const newSelections = { ...selectedVariants, [variantKey]: variantId };
      setSelectedVariants(newSelections);
      onVariantChange?.(newSelections);

      // Analytics
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'product_variant_change',
          product_id: product.id,
          variant_selections: newSelections,
        });
      }
    },
    [selectedVariants, onVariantChange, product.id]
  );

  // Handle add to cart
  const handleAddToCart = useCallback(async () => {
    if (!isCurrentVariantInStock) return;

    setIsAdding(true);
    try {
      await onAddToCart(selectedVariants, quantity);

      // Analytics
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'add_to_cart',
          product_id: product.id,
          product_title: product.title,
          price: currentPrice,
          quantity,
          variant_selections: selectedVariants,
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  }, [isCurrentVariantInStock, onAddToCart, selectedVariants, quantity, product.id, product.title, currentPrice]);

  const variantSummary = Object.entries(product.variants).map(([key, variant]) => {
    const selected = variant.options.find(
      (opt) => opt.id === selectedVariants[key.toLowerCase()]
    );
    return { name: variant.name, value: selected?.value || '' };
  });

  return (
    <div className="w-full">
      {/* Title & Brand */}
      <div className="mb-5">
        {product.brand && (
          <div className="text-sm text-gray-600 uppercase tracking-wide mb-2 font-inter">
            {product.brand}
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-archivo font-bold uppercase tracking-tight text-black mb-3">
          {product.title}
        </h1>
        {(product.sku || product.vendor) && (
          <div className="text-xs text-gray-500 space-x-4 font-inter mb-4">
            {product.sku && <span>SKU: {product.sku}</span>}
            {product.vendor && <span>Vendor: {product.vendor}</span>}
          </div>
        )}
      </div>

      {/* Price & Stock Status Grouped */}
      <div className="mb-6 space-y-3" aria-live="polite" aria-atomic="true">
        {/* Price */}
        <div>
          {product.originalPrice && product.originalPrice > currentPrice ? (
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-bold text-black">₹{currentPrice}</span>
              <span className="text-xl text-gray-500 line-through">₹{product.originalPrice}</span>
              <span className="text-sm bg-red-100 text-red-600 px-2.5 py-1 rounded-md font-semibold whitespace-nowrap">
                {Math.round(((product.originalPrice - currentPrice) / product.originalPrice) * 100)}% OFF
              </span>
            </div>
          ) : (
            <span className="text-3xl font-bold text-black">₹{currentPrice}</span>
          )}
          {product.taxInfo && (
            <div className="text-sm text-gray-600 mt-1.5 font-inter">{product.taxInfo}</div>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex flex-wrap items-center gap-3">
          {!isCurrentVariantInStock ? (
            <div className="text-red-600 font-semibold text-sm">Out of Stock</div>
          ) : product.stockCount && product.stockCount < 10 ? (
            <div className="text-orange-600 font-semibold text-sm">
              Only {product.stockCount} left in stock
            </div>
          ) : (
            <div className="text-green-600 font-semibold text-sm">In Stock</div>
          )}
          {product.estimatedDelivery && (
            <div className="text-sm text-gray-600 font-inter">
              • Estimated delivery: {product.estimatedDelivery}
            </div>
          )}
        </div>
      </div>

      {/* Variant Selectors */}
      {Object.entries(product.variants).map(([key, variant]) => (
        <div key={key} className="mb-6">
          <label className="block text-sm font-semibold mb-2 uppercase tracking-wide font-inter">
            {variant.name}
          </label>
          <div className="flex flex-wrap gap-2">
            {variant.options.map((option) => {
              const isSelected = selectedVariants[key.toLowerCase()] === option.id;
              const isDisabled = !option.available;

              return (
                <button
                  key={option.id}
                  onClick={() => !isDisabled && handleVariantChange(key.toLowerCase(), option.id)}
                  disabled={isDisabled}
                  aria-pressed={isSelected}
                  className={`px-4 py-2 rounded-md border-2 font-medium transition-all focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
                    isSelected
                      ? 'border-black bg-black text-white'
                      : isDisabled
                      ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                      : 'border-gray-300 text-gray-700 hover:border-black'
                  }`}
                >
                  {option.value}
                  {isDisabled && <span className="ml-2 text-xs">(OOS)</span>}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Quantity Selector */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2 uppercase tracking-wide font-inter">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <div className="flex items-center border-2 border-gray-300 rounded-md">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              className="px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
            <span className="px-4 py-2 text-base font-medium min-w-[3rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() =>
                setQuantity(
                  isCurrentVariantInStock
                    ? product.stockCount
                      ? Math.min(quantity + 1, product.stockCount)
                      : quantity + 1
                    : quantity
                )
              }
              aria-label="Increase quantity"
              disabled={!isCurrentVariantInStock || (product.stockCount ? quantity >= product.stockCount : false)}
              className="px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="mb-6">
        <motion.button
          onClick={handleAddToCart}
          disabled={!isCurrentVariantInStock || isAdding}
          whileHover={isCurrentVariantInStock && !isAdding ? { scale: 1.02 } : {}}
          whileTap={isCurrentVariantInStock && !isAdding ? { scale: 0.98 } : {}}
          className="w-full py-4 bg-black text-white rounded-md font-semibold text-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-inter"
          aria-label="Add to cart"
        >
          {isAdding ? 'Adding...' : isCurrentVariantInStock ? 'Add to Cart' : 'Out of Stock'}
        </motion.button>
      </div>

      {/* Trust Badges */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="grid grid-cols-2 gap-3 text-xs text-gray-700">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Secure checkout</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>30-day returns</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Free shipping over ₹2,000</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Easy exchange</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 uppercase tracking-wide font-archivo">Description</h2>
        <div className="text-gray-700 leading-relaxed whitespace-pre-line font-inter">
          {product.description}
        </div>
      </div>

      {/* Features */}
      {product.features && product.features.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 uppercase tracking-wide font-archivo">Features</h2>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700 font-inter">
                <svg className="w-5 h-5 text-black flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Export variant summary for StickyBuyBar */}
      <div className="hidden" data-variant-summary={JSON.stringify(variantSummary)} />
    </div>
  );
}

