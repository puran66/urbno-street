"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface Reel {
    id: number;
    videoUrl: string;
    thumbnailUrl: string;
    title: string;
    productLink: string;
    shopTheLookLink: string;
    views?: string;
}

const SAMPLE_REELS: Reel[] = [
    {
        id: 1,
        videoUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=720&auto=format&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=720&auto=format&fit=crop',
        title: 'Urban Essentials',
        productLink: '/products/urban-essentials',
        shopTheLookLink: '/shop/urban-essentials',
        views: '12.5K',
    },
    {
        id: 2,
        videoUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=720&auto=format&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=720&auto=format&fit=crop',
        title: 'Street Vibes',
        productLink: '/products/street-vibes',
        shopTheLookLink: '/shop/street-vibes',
        views: '18.2K',
    },
    {
        id: 3,
        videoUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=720&auto=format&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=720&auto=format&fit=crop',
        title: 'Minimal Flex',
        productLink: '/products/minimal-flex',
        shopTheLookLink: '/shop/minimal-flex',
        views: '25.8K',
    },
    {
        id: 4,
        videoUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=720&auto=format&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=720&auto=format&fit=crop',
        title: 'Bold Statements',
        productLink: '/products/bold-statements',
        shopTheLookLink: '/shop/bold-statements',
        views: '31.4K',
    },
    {
        id: 5,
        videoUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=720&auto=format&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=720&auto=format&fit=crop',
        title: 'Night Mode',
        productLink: '/products/night-mode',
        shopTheLookLink: '/shop/night-mode',
        views: '22.1K',
    },
    {
        id: 6,
        videoUrl: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=720&auto=format&fit=crop',
        thumbnailUrl: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=720&auto=format&fit=crop',
        title: 'Casual Chic',
        productLink: '/products/casual-chic',
        shopTheLookLink: '/shop/casual-chic',
        views: '19.7K',
    },
];

interface ReelCardProps {
    reel: Reel;
    index: number;
}

function ReelCard({ reel, index }: ReelCardProps) {
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
            <div className="relative group cursor-pointer">
                {/* Vertical Reel Card - Instagram-inspired but refined */}
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

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

                        {/* Views Badge */}
                        {reel.views && (
                            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md">
                                <span className="text-white text-xs font-medium">
                                    👁️ {reel.views}
                                </span>
                            </div>
                        )}

                        {/* Content Overlay - Bottom */}
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-white font-bold text-xl mb-3 uppercase tracking-wide"
                            >
                                {reel.title}
                            </motion.h3>

                            {/* CTAs */}
                            <div className="flex gap-2">
                                <motion.a
                                    href={reel.productLink}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex-1 bg-white text-black px-4 py-2.5 rounded-lg font-semibold text-sm text-center hover:bg-gray-100 transition-colors"
                                >
                                    View Product
                                </motion.a>
                                <motion.a
                                    href={reel.shopTheLookLink}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex-1 bg-orange-500 text-white px-4 py-2.5 rounded-lg font-semibold text-sm text-center hover:bg-orange-600 transition-colors"
                                >
                                    Shop Look
                                </motion.a>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Hover Border Effect */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 border-2 border-orange-500 rounded-2xl pointer-events-none"
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

    // Auto-scroll effect
    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer || isPaused) return;

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
                        scrollContainer.scrollBy({ left: 2, behavior: 'auto' });
                    }
                }
            }, 30); // Adjust speed here (lower = faster)
        };

        startAutoScroll();

        return () => {
            if (scrollInterval) clearInterval(scrollInterval);
        };
    }, [isPaused]);

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-white overflow-hidden">
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
                        className="inline-block mb-4 px-4 py-2 bg-orange-100 rounded-full"
                    >
                        <span className="text-sm font-semibold uppercase tracking-wider text-orange-600">
                            🔥 Trending Now
                        </span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-4">
                        Looks Loved by Our
                        <br />
                        <span className="text-orange-500">Community</span>
                    </h2>

                    <p className="text-gray-600 text-lg max-w-2xl">
                        Discover how our community styles URBNO STREET. Get inspired, shop the look, and create your own vibe.
                    </p>
                </motion.div>

                {/* Horizontal Scrolling Reels */}
                <div className="relative">
                    {/* Scroll Container */}
                    <div
                        ref={scrollContainerRef}
                        className="overflow-x-auto scrollbar-hide pb-4"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <div className="flex gap-6 md:gap-8">
                            {SAMPLE_REELS.map((reel, index) => (
                                <ReelCard key={reel.id} reel={reel} index={index} />
                            ))}
                            {/* Duplicate reels for seamless loop */}
                            {SAMPLE_REELS.map((reel, index) => (
                                <ReelCard key={`duplicate-${reel.id}`} reel={reel} index={index} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-12 text-center"
                >
                    <motion.a
                        href="/trending"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
                    >
                        View All Trending Looks
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
