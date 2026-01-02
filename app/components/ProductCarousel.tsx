'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCarouselProps {
  images: string[];
  alt: string;
  productTitle: string;
  onImageChange?: (index: number) => void;
}

export default function ProductCarousel({ 
  images, 
  alt, 
  productTitle,
  onImageChange 
}: ProductCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const carouselId = React.useId();

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Handle image change
  const handleImageChange = useCallback((index: number) => {
    setActiveIndex(index);
    setIsZoomed(false);
    onImageChange?.(index);
    
    // Analytics event
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'product_image_view',
        product_title: productTitle,
        image_index: index,
      });
    }
  }, [onImageChange, productTitle]);

  // Navigate to previous image
  const goToPrevious = useCallback(() => {
    const newIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    handleImageChange(newIndex);
  }, [activeIndex, images.length, handleImageChange]);

  // Navigate to next image
  const goToNext = useCallback(() => {
    const newIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    handleImageChange(newIndex);
  }, [activeIndex, images.length, handleImageChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Zoom on hover (desktop)
  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) {
      setIsZoomed(true);
    }
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[4/5] w-full bg-gray-200 flex items-center justify-center rounded-lg">
        <p className="text-gray-400">No images available</p>
      </div>
    );
  }

  const currentImage = images[activeIndex] || images[0];

  return (
    <div className="w-full">
      {/* Main Image Carousel */}
      <div
        ref={carouselRef}
        role="region"
        aria-label="Product images"
        className="relative w-full aspect-[4/5] md:aspect-[1/1] overflow-hidden rounded-lg bg-gray-50 group"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            ref={imageRef}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full h-full"
          >
            <Image
              src={currentImage}
              alt={`${alt} - Image ${activeIndex + 1} of ${images.length}`}
              fill
              className={`object-cover transition-transform duration-500 ${
                isZoomed ? 'scale-110' : 'scale-100'
              }`}
              priority={activeIndex === 0}
              loading={activeIndex === 0 ? 'eager' : 'lazy'}
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-product.jpg';
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-black z-10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-black z-10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm text-white px-2.5 py-1 rounded-md text-xs font-medium z-10">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="mt-4">
          <div
            role="tablist"
            aria-label="Product image thumbnails"
            className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory thumbnail-container"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((image, index) => (
              <button
                key={index}
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls={`${carouselId}-image-${index}`}
                tabIndex={activeIndex === index ? 0 : -1}
                onClick={() => handleImageChange(index)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleImageChange(index);
                  }
                }}
                className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all snap-start focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
                  activeIndex === index
                    ? 'border-black ring-2 ring-black ring-offset-1'
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 80px, 96px"
                    loading="lazy"
                  />
                </div>
                {activeIndex === index && (
                  <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

