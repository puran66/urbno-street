'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface Review {
  id: string;
  author: string;
  rating: number;
  title?: string;
  comment: string;
  date: string;
  verified?: boolean;
}

export interface ReviewsData {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  reviews: Review[];
}

interface ReviewsSummaryProps {
  reviewsData: ReviewsData;
  onShowAll?: () => void;
  onWriteReview?: () => void;
}

export default function ReviewsSummary({
  reviewsData,
  onShowAll,
  onWriteReview,
}: ReviewsSummaryProps) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const topReviews = reviewsData.reviews.slice(0, 3);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const getPercentage = (count: number) => {
    return reviewsData.totalReviews > 0
      ? Math.round((count / reviewsData.totalReviews) * 100)
      : 0;
  };

  return (
    <section className="mb-12" id="reviews">
      <div className="border-t border-gray-200 pt-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-archivo font-bold uppercase mb-2">Customer Reviews</h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {renderStars(Math.round(reviewsData.averageRating))}
              </div>
              <span className="text-lg font-semibold">
                {reviewsData.averageRating.toFixed(1)} out of 5
              </span>
              <span className="text-gray-600">
                ({reviewsData.totalReviews} {reviewsData.totalReviews === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          </div>
          <button
            onClick={onWriteReview}
            className="px-4 py-2 border border-black text-black rounded-md font-semibold hover:bg-black hover:text-white transition-colors font-inter"
          >
            Write a Review
          </button>
        </div>

        {/* Rating Distribution */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviewsData.ratingDistribution[star as keyof typeof reviewsData.ratingDistribution];
            const percentage = getPercentage(count);
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-sm font-medium w-8">{star}★</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
              </div>
            );
          })}
        </div>

        {/* Top Reviews */}
        <div className="space-y-6">
          {topReviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold font-inter">{review.author}</span>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-sm text-gray-600">{review.date}</span>
                  </div>
                </div>
              </div>
              {review.title && (
                <h3 className="font-semibold mb-2 font-inter">{review.title}</h3>
              )}
              <p className="text-gray-700 leading-relaxed font-inter">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* Show All Reviews Button */}
        {reviewsData.reviews.length > 3 && (
          <div className="mt-6">
            <button
              onClick={() => {
                setShowAllReviews(!showAllReviews);
                onShowAll?.();
              }}
              className="text-black font-semibold underline hover:no-underline font-inter"
            >
              {showAllReviews ? 'Show Less' : `Read All ${reviewsData.totalReviews} Reviews`}
            </button>
          </div>
        )}

        {/* All Reviews (Lazy Loaded) */}
        <AnimatePresence>
          {showAllReviews && reviewsData.reviews.length > 3 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 space-y-6"
            >
              {reviewsData.reviews.slice(3).map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold font-inter">{review.author}</span>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-gray-600">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  {review.title && (
                    <h3 className="font-semibold mb-2 font-inter">{review.title}</h3>
                  )}
                  <p className="text-gray-700 leading-relaxed font-inter">{review.comment}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

