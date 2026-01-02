'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

interface TrendingStyle {
    id: number;
    title: string;
    description: string;
    image: string;
    products: number;
    tag?: string;
}

const trendingStyles: TrendingStyle[] = [
    {
        id: 1,
        title: 'Oversized Comfort',
        description: 'Relaxed fits that make a statement',
        image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=600',
        products: 12,
        tag: 'Trending',
    },
    {
        id: 2,
        title: 'Minimalist Chic',
        description: 'Less is more, always',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600',
        products: 8,
        tag: 'Hot',
    },
    {
        id: 3,
        title: 'Street Luxe',
        description: 'High-end meets streetwear',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
        products: 15,
    },
    {
        id: 4,
        title: 'Monochrome Magic',
        description: 'Black, white, and everything right',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600',
        products: 10,
        tag: 'New',
    },
    {
        id: 5,
        title: 'Athleisure Vibes',
        description: 'Comfort meets style',
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600',
        products: 14,
    },
];

export default function TrendingStylesCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 400;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="w-full py-12 md:py-16 px-4 bg-off-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-end justify-between mb-8"
                >
                    <div>
                        <p className="text-electric-blue text-sm font-semibold uppercase tracking-wider mb-2">
                            What's Hot
                        </p>
                        <h2 className="font-playfair text-3xl md:text-5xl font-bold text-carbon">
                            Trending Styles
                        </h2>
                    </div>

                    {/* Navigation Buttons - Desktop */}
                    <div className="hidden md:flex items-center gap-2">
                        <button
                            onClick={() => scroll('left')}
                            className="w-10 h-10 rounded-full bg-carbon text-off-white hover:bg-carbon/80 flex items-center justify-center transition-colors"
                            aria-label="Scroll left"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-10 h-10 rounded-full bg-carbon text-off-white hover:bg-carbon/80 flex items-center justify-center transition-colors"
                            aria-label="Scroll right"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>

                {/* Carousel */}
                <div className="relative">
                    {/* Gradient Overlays */}
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-off-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-off-white to-transparent z-10 pointer-events-none" />

                    {/* Scrollable Container */}
                    <div
                        ref={scrollRef}
                        className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                    >
                        {trendingStyles.map((style, index) => (
                            <motion.div
                                key={style.id}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex-shrink-0 w-72 md:w-80 group cursor-pointer"
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-carbon/5">
                                    <Image
                                        src={style.image}
                                        alt={style.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        sizes="(max-width: 768px) 288px, 320px"
                                    />

                                    {/* Overlay on Hover */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="w-full bg-electric-blue hover:bg-electric-blue/90 text-off-white py-3 px-4 rounded-full font-semibold flex items-center justify-center gap-2"
                                            >
                                                <ShoppingBag className="w-4 h-4" />
                                                <span>Shop the Look</span>
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Tag Badge */}
                                    {style.tag && (
                                        <div className="absolute top-4 right-4 bg-electric-blue text-off-white text-xs px-3 py-1 rounded-full font-bold">
                                            {style.tag}
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div>
                                    <h3 className="font-playfair text-xl md:text-2xl font-bold text-carbon mb-1 group-hover:text-electric-blue transition-colors">
                                        {style.title}
                                    </h3>
                                    <p className="text-carbon/60 text-sm mb-2">{style.description}</p>
                                    <p className="text-carbon/50 text-xs">
                                        {style.products} products
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Mobile Navigation Hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-carbon/40 text-sm mt-4 md:hidden"
                >
                    Swipe to explore →
                </motion.p>
            </div>
        </section>
    );
}
