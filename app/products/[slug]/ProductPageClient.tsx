'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import ProductCarousel from '../../components/ProductCarousel';
import ProductDetails, { ProductDetailsData } from '../../components/ProductDetails';
import StickyBuyBar from '../../components/StickyBuyBar';
import ReviewsSummary, { ReviewsData } from '../../components/ReviewsSummary';
import RelatedProducts, { RelatedProduct } from '../../components/RelatedProducts';
import WriteReviewModal from '../../components/WriteReviewModal';

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

  // Handle add to cart
  const handleAddToCart = useCallback(
    async (variantSelections: Record<string, string>, qty: number) => {
      try {
        // In production, call your API
        const cartItem = {
          productId: product.id,
          variantSelections,
          quantity: qty,
          price: currentPrice,
        };

        // Save to localStorage (or call API)
        const existingCart = JSON.parse(localStorage.getItem('urbno_cart') || '[]');
        existingCart.push(cartItem);
        localStorage.setItem('urbno_cart', JSON.stringify(existingCart));

        setToast('Product added to cart!');
        setTimeout(() => setToast(''), 3000);

        // Analytics
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'add_to_cart',
            product_id: product.id,
            product_title: product.title,
            price: currentPrice,
            quantity: qty,
            variant_selections: variantSelections,
          });
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        setToast('Failed to add to cart. Please try again.');
        setTimeout(() => setToast(''), 3000);
      }
    },
    [product.id, product.title, currentPrice]
  );

  // Handle variant change
  const handleVariantChange = useCallback((selections: Record<string, string>) => {
    setSelectedVariants(selections);
  }, []);

  // Handle review submission
  const handleReviewSubmit = useCallback(
    (review: { rating: number; title: string; comment: string }) => {
      // In production, call your API
      console.log('Review submitted:', review);

      // Analytics
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'review_submitted',
          product_id: product.id,
          rating: review.rating,
        });
      }

      setToast('Thank you for your review!');
      setTimeout(() => setToast(''), 3000);
      setShowReviewModal(false);
    },
    [product.id]
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
    // In production, call your API
    const existingCart = JSON.parse(localStorage.getItem('urbno_cart') || '[]');
    existingCart.push({ productId, quantity: 1 });
    localStorage.setItem('urbno_cart', JSON.stringify(existingCart));

    setToast('Product added to cart!');
    setTimeout(() => setToast(''), 3000);
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F7]">
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
    </div>
  );
}

