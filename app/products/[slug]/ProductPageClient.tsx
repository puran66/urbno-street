'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ProductCarousel from '../../components/ProductCarousel';
import ProductDetails, { ProductDetailsData } from '../../components/ProductDetails';
import StickyBuyBar from '../../components/StickyBuyBar';
import ReviewsSummary, { ReviewsData } from '../../components/ReviewsSummary';
import RelatedProducts, { RelatedProduct } from '../../components/RelatedProducts';
import WriteReviewModal from '../../components/WriteReviewModal';
import ComingSoonModal from '../../components/ComingSoonModal';

interface ProductPageClientProps {
  product: ProductDetailsData;
  images: string[];
  reviews: ReviewsData;
  relatedProducts: RelatedProduct[];
  slug: string;
}

export default function ProductPageClient({
  product,
  images,
  reviews,
  relatedProducts,
  slug,
}: ProductPageClientProps) {
  const router = useRouter();
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    // Initialize with first available variant
    const initial: Record<string, string> = {};
    Object.keys(product.variants).forEach((key) => {
      const firstAvailable = product.variants[key].options.find((opt) => opt.available);
      if (firstAvailable) {
        initial[key.toLowerCase()] = firstAvailable.id;
      }
    });
    return initial;
  });
  const [quantity, setQuantity] = useState(1);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [toast, setToast] = useState('');

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

  // Get variant summary for sticky bar
  const variantSummary = React.useMemo(() => {
    return Object.entries(product.variants).map(([key, variant]) => {
      const selected = variant.options.find(
        (opt) => opt.id === selectedVariants[key.toLowerCase()]
      );
      return { name: variant.name, value: selected?.value || '' };
    });
  }, [product.variants, selectedVariants]);

  // Handle add to cart - Show Coming Soon modal
  const handleAddToCart = useCallback(
    async (variantSelections: Record<string, string>, qty: number) => {
      setShowComingSoon(true);
    },
    []
  );

  // Handle variant change
  const handleVariantChange = useCallback((selections: Record<string, string>) => {
    setSelectedVariants(selections);
  }, []);

  // Handle review submission
  const handleReviewSubmit = useCallback(
    (review: { rating: number; title: string; comment: string }) => {
      setToast('Thank you for your review!');
      setTimeout(() => setToast(''), 3000);
      setShowReviewModal(false);
    },
    []
  );

  // Handle related product click
  const handleRelatedProductClick = useCallback(
    (relatedSlug: string) => {
      router.push(`/products/${relatedSlug}`);
    },
    [router]
  );

  // Handle related product add to cart
  const handleRelatedAddToCart = useCallback((productId: string) => {
    setShowComingSoon(true);
  }, []);

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-archivo text-2xl uppercase tracking-tight hover:text-electric-blue transition-colors">
            URBNO SHOP
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center">
            <Link href="/shop" className="font-inter text-sm uppercase tracking-wider hover:text-electric-blue transition-colors">
              Shop
            </Link>
            <Link href="/about" className="font-inter text-sm uppercase tracking-wider hover:text-electric-blue transition-colors">
              About
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link href="/cart">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 border-2 border-charcoal rounded-lg flex items-center gap-2 hover:bg-charcoal hover:text-white transition-colors font-inter text-sm font-semibold uppercase tracking-wider"
              >
                Cart (0)
              </motion.button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-700 hover:text-black mb-6 transition-colors font-inter group"
          aria-label="Go back"
        >
          <svg
            className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span className="font-medium">Back</span>
        </button>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
          {/* Product Images */}
          <div>
            <ProductCarousel
              images={images}
              alt={product.title}
              productTitle={product.title}
              onImageChange={(index) => {
                // Analytics already handled in ProductCarousel
              }}
            />
          </div>

          {/* Product Details */}
          <div>
            <ProductDetails
              product={product}
              onAddToCart={handleAddToCart}
              onVariantChange={handleVariantChange}
            />
          </div>
        </div>

        {/* Reviews Section - Add padding bottom for sticky bar clearance */}
        <div className="pb-20 md:pb-0">
          <ReviewsSummary
            reviewsData={reviews}
            onShowAll={() => {
              // Scroll to reviews section
              document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onWriteReview={() => setShowReviewModal(true)}
          />
        </div>

        {/* Related Products */}
        <RelatedProducts
          products={relatedProducts}
          onAddToCart={handleRelatedAddToCart}
          onProductClick={handleRelatedProductClick}
        />
      </div>

      {/* Sticky Buy Bar (Mobile) */}
      <StickyBuyBar
        price={currentPrice}
        originalPrice={product.originalPrice}
        selectedVariants={variantSummary}
        quantity={quantity}
        isInStock={isCurrentVariantInStock}
        stockCount={product.stockCount}
        onAddToCart={() => handleAddToCart(selectedVariants, quantity)}
        onQuantityChange={setQuantity}
      />

      {/* Write Review Modal */}
      <WriteReviewModal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        onSubmit={handleReviewSubmit}
        productTitle={product.title}
        requiresAuth={false}
      />

      {/* Toast Notification - Position above sticky bar on mobile */}
      {toast && (
        <div className="fixed bottom-24 md:bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white px-5 py-3 rounded-full shadow-lg z-[60] pointer-events-none animate-fade-in">
          {toast}
        </div>
      )}

      {/* Footer */}
      <footer className="bg-off-white border-t border-gray-200 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="font-archivo text-xl mb-3 uppercase">URBNO SHOP</div>
              <p className="text-sm text-gray-600 font-inter">
                Modern streetwear for the new generation. Limited drops, premium quality.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 uppercase text-sm font-inter">Shop</h3>
              <div className="space-y-2 text-sm text-gray-600 font-inter">
                <Link href="/shop" className="block hover:text-charcoal transition-colors">All Products</Link>
                <button onClick={() => setShowComingSoon(true)} className="block hover:text-charcoal transition-colors">New Arrivals</button>
                <button onClick={() => setShowComingSoon(true)} className="block hover:text-charcoal transition-colors">Best Sellers</button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 uppercase text-sm font-inter">About</h3>
              <div className="space-y-2 text-sm text-gray-600 font-inter">
                <Link href="/about" className="block hover:text-charcoal transition-colors">Our Story</Link>
                <button onClick={() => setShowComingSoon(true)} className="block hover:text-charcoal transition-colors">Contact</button>
                <button onClick={() => setShowComingSoon(true)} className="block hover:text-charcoal transition-colors">FAQ</button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 uppercase text-sm font-inter">Follow</h3>
              <div className="space-y-2 text-sm text-gray-600 font-inter">
                <a href="https://www.instagram.com/urbno.in?igsh=ODFobGF6dGM3MXU1&utm_source=qr" target="_blank" rel="noopener noreferrer" className="block hover:text-charcoal transition-colors">Instagram</a>
                <button onClick={() => setShowComingSoon(true)} className="block hover:text-charcoal transition-colors">Twitter</button>
                <button onClick={() => setShowComingSoon(true)} className="block hover:text-charcoal transition-colors">TikTok</button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500 font-inter">
            © 2026 URBNO SHOP. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Coming Soon Modal */}
      <ComingSoonModal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        title="Cart Coming Soon"
        message="We're crafting something special. Shopping cart will be available at launch."
      />
    </div>
  );
}

