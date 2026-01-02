'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: { rating: number; title: string; comment: string }) => void;
  productTitle: string;
  requiresAuth?: boolean;
  onSignIn?: () => void;
}

export default function WriteReviewModal({
  isOpen,
  onClose,
  onSubmit,
  productTitle,
  requiresAuth = false,
  onSignIn,
}: WriteReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Apply styles to prevent scrolling
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        // Restore scroll position when modal closes
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    if (!comment.trim()) {
      newErrors.comment = 'Please write a review';
    }
    if (comment.trim().length < 10) {
      newErrors.comment = 'Review must be at least 10 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({ rating, title: title.trim(), comment: comment.trim() });
    // Reset form
    setRating(0);
    setTitle('');
    setComment('');
    setErrors({});
    onClose();
  };

  const renderStars = (forRating: number, interactive = false) => {
    return Array.from({ length: 5 }).map((_, i) => {
      const starValue = i + 1;
      const isFilled = starValue <= (hoverRating || rating);
      
      return (
        <button
          key={i}
          type="button"
          onClick={() => interactive && setRating(starValue)}
          onMouseEnter={() => interactive && setHoverRating(starValue)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          className={`${interactive ? 'cursor-pointer' : ''} transition-colors`}
          aria-label={`Rate ${starValue} stars`}
        >
          <svg
            className={`w-6 h-6 ${isFilled ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      );
    });
  };

  if (requiresAuth && !onSignIn) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-archivo font-bold uppercase">Write a Review</h2>
                  <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <p className="text-gray-600 mt-2 font-inter">{productTitle}</p>
              </div>

              {requiresAuth ? (
                <div className="p-6 text-center">
                  <p className="text-gray-700 mb-4 font-inter">Please sign in to write a review.</p>
                  <button
                    onClick={onSignIn}
                    className="px-6 py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition-colors font-inter"
                  >
                    Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6">
                  {/* Rating */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2 font-inter">
                      Rating <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-1" role="radiogroup" aria-label="Rating">
                      {renderStars(0, true)}
                    </div>
                    {errors.rating && (
                      <p className="text-red-600 text-sm mt-1">{errors.rating}</p>
                    )}
                  </div>

                  {/* Title */}
                  <div className="mb-6">
                    <label htmlFor="review-title" className="block text-sm font-semibold mb-2 font-inter">
                      Review Title (Optional)
                    </label>
                    <input
                      id="review-title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-black focus:border-black transition"
                      placeholder="Summarize your experience"
                    />
                  </div>

                  {/* Comment */}
                  <div className="mb-6">
                    <label htmlFor="review-comment" className="block text-sm font-semibold mb-2 font-inter">
                      Your Review <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="review-comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={6}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-black focus:border-black transition resize-none font-inter"
                      placeholder="Share your thoughts about this product..."
                    />
                    {errors.comment && (
                      <p className="text-red-600 text-sm mt-1">{errors.comment}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">{comment.length} characters</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 justify-end">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors font-inter"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition-colors font-inter"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

