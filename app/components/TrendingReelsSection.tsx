"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import ComingSoonModal from './ComingSoonModal';

interface Reel {
    id: number;
    videoUrl: string;
    thumbnailUrl: string;
    title: string;
    views?: string;
}

const SAMPLE_REELS: Reel[] = [
    {
        id: 1,
        videoUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=720&auto=format&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=720&auto=format&fit=crop',
        title: 'Urban Essentials',
        views: '12.5K',
    },
    {
        id: 2,
        videoUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=720&auto=format&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=720&auto=format&fit=crop',
        title: 'Street Vibes',
        views: '18.2K',
    },
    {
        id: 3,
        videoUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=720&auto=format&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=720&auto=format&fit=crop',
        title: 'Minimal Flex',
        views: '25.8K',
    },
    {
        id: 4,
        videoUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=720&auto=format&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=720&auto=format&fit=crop',
        title: 'Bold Statements',
        views: '31.4K',
    },
    {
        id: 5,
        videoUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=720&auto=format&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=720&auto=format&fit=crop',
        title: 'Night Mode',
        views: '22.1K',
    },
    {
        id: 6,
        videoUrl: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=720&auto=format&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=720&auto=format&fit=crop',
        title: 'Casual Chic',
        views: '19.7K',
    },
];

interface ReelCardProps {
    reel: Reel;
    index: number;
    onReelClick: () => void;
}

function ReelCard({ reel, index, onReelClick }: ReelCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="flex-shrink-0 w-[280px] md:w-[320px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Reel Container */}
            <div className="relative group cursor-pointer" onClick={onReelClick}>
                {/* Vertical Reel Card - Premium Lookbook Style */}
                <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-gray-100 shadow-lg"
                >
                    {/* Image/Video Thumbnail */}
                    <div className="relative w-full h-full">
                        <Image
                            src={reel.thumbnailUrl}
                            alt={reel.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 280px, 320px"
                        />

                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />

                        {/* Hover Play Indicator */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center">
                                <svg className="w-8 h-8 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>
                        </motion.div>

                        {/* Views Badge - Removed social elements */}
                        {reel.views && (
                            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-charcoal/60 backdrop-blur-md">
                                <span className="text-white text-xs font-medium font-inter">
                                    {reel.views} views
                                </span>
                            </div>
                        )}

                        {/* Content Overlay - Bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-white font-archivo font-bold text-xl mb-3 uppercase tracking-wide"
                            >
                                {reel.title}
                            </motion.h3>

                            {/* Single CTA - Premium Style */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onReelClick();
                                }}
                                className="w-full bg-white text-charcoal px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-light-beige transition-colors font-inter uppercase tracking-wider"
                            >
                                View Look
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Hover Border Effect - Electric Blue */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 border-2 border-electric-blue rounded-2xl pointer-events-none"
                />
            </div>
        </motion.div>
    );
}

export default function TrendingReelsSection() {
    const sectionRef = useRef(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
    const [isPaused, setIsPaused] = useState(false);
    const [isManualScrolling, setIsManualScrolling] = useState(false);
    const [showComingSoon, setShowComingSoon] = useState(false);

    // Auto-scroll effect
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer || isPaused || isManualScrolling) return;

        let scrollInterval: NodeJS.Timeout;

        const startAutoScroll = () => {
            scrollInterval = setInterval(() => {
                if (scrollContainer) {
                    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
                    const currentScroll = scrollContainer.scrollLeft;

                    // If we've reached the end, reset to start
                    if (currentScroll >= maxScroll - 10) {
                        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
                    } else {
                        // Scroll smoothly to the right
                        scrollContainer.scrollBy({ left: 1.5, behavior: 'auto' });
                    }
                }
            }, 30); // Slow & smooth auto-scroll
        };

        startAutoScroll();

        return () => {
            if (scrollInterval) clearInterval(scrollInterval);
        };
    }, [isPaused, isManualScrolling]);

    // Handle manual scroll and pause auto-scroll
    const handleManualScroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            setIsManualScrolling(true);
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });

            // Resume auto-scroll after 3 seconds
            setTimeout(() => {
                setIsManualScrolling(false);
            }, 3000);
        }
    };

    return (
        <>
            <section ref={sectionRef} className="py-16 md:py-24 bg-off-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="mb-12 text-center md:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="inline-block mb-4 px-4 py-2 bg-electric-blue/10 rounded-full"
                        >
                            <span className="text-sm font-semibold uppercase tracking-wider text-electric-blue font-inter">
                                Trending Now
                            </span>
                        </motion.div>

                        <h2 className="font-archivo text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-4 text-charcoal">
                            Trending Looks
                            <br />
                            <span className="text-electric-blue">Right Now</span>
                        </h2>

                        <p className="text-gray-600 text-lg max-w-2xl font-inter">
                            Discover the latest styles and trends. Each look is carefully curated for the modern generation.
                        </p>
                    </motion.div>

                    {/* Horizontal Scrolling Reels */}
                    <div className="relative">
                        {/* Left Navigation Button */}
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleManualScroll('left')}
                            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/95 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center hover:bg-electric-blue hover:text-white transition-all duration-300 cursor-pointer"
                            aria-label="Scroll left"
                            type="button"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.button>

                        {/* Right Navigation Button */}
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleManualScroll('right')}
                            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/95 backdrop-blur-md rounded-full shadow-xl flex items-center justify-center hover:bg-electric-blue hover:text-white transition-all duration-300 cursor-pointer"
                            aria-label="Scroll right"
                            type="button"
                        >
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </motion.button>

                        {/* Scroll Container */}
                        <div
                            ref={scrollContainerRef}
                            className="overflow-x-auto scrollbar-hide pb-4 scroll-smooth"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                        >
                            <div className="flex gap-6 md:gap-8">
                                {SAMPLE_REELS.map((reel, index) => (
                                    <ReelCard
                                        key={reel.id}
                                        reel={reel}
                                        index={index}
                                        onReelClick={() => setShowComingSoon(true)}
                                    />
                                ))}
                                {/* Duplicate reels for seamless loop */}
                                {SAMPLE_REELS.map((reel, index) => (
                                    <ReelCard
                                        key={`duplicate-${reel.id}`}
                                        reel={reel}
                                        index={index}
                                        onReelClick={() => setShowComingSoon(true)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Coming Soon Modal */}
            <ComingSoonModal
                isOpen={showComingSoon}
                onClose={() => setShowComingSoon(false)}
                title="Coming Soon"
                message="This feature is launching soon. Stay tuned for our official release."
            />
        </>
    );
}
