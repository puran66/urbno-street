'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';

interface LookbookPost {
    id: number;
    image: string;
    username: string;
    likes: number;
    comments: number;
    caption?: string;
}

// Mock UGC data (replace with Instagram API integration)
const mockPosts: LookbookPost[] = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400',
        username: '@priya_styles',
        likes: 1243,
        comments: 89,
        caption: 'Feeling unstoppable in this fit! 🔥',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400',
        username: '@arjun_fashion',
        likes: 2156,
        comments: 134,
        caption: 'Street style on point ✨',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
        username: '@sneha_ootd',
        likes: 987,
        comments: 56,
        caption: 'Casual Friday vibes 💫',
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400',
        username: '@rohan_wear',
        likes: 1876,
        comments: 112,
        caption: 'Confidence level: 💯',
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
        username: '@aisha_looks',
        likes: 3421,
        comments: 203,
        caption: 'Living my best life 🌟',
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
        username: '@vikram_style',
        likes: 1654,
        comments: 78,
        caption: 'Outfit speaks louder 🎯',
    },
];

export default function IGCommunityLookbook() {
    // Duplicate posts for seamless infinite scroll
    const duplicatedPosts = [...mockPosts, ...mockPosts];

    return (
        <section className="w-full py-12 md:py-16 bg-carbon text-off-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 mb-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >
                    <div className="inline-flex items-center gap-2 bg-electric-blue/20 text-electric-blue px-4 py-2 rounded-full mb-4">
                        <Instagram className="w-4 h-4" />
                        <span className="text-sm font-semibold uppercase tracking-wider">Community</span>
                    </div>
                    <h2 className="font-playfair text-3xl md:text-5xl font-bold mb-3">
                        Featured on Instagram
                    </h2>
                    <p className="text-off-white/70 text-lg max-w-2xl mx-auto mb-6">
                        Join our community and get featured. Tag us with{' '}
                        <span className="text-electric-blue font-semibold">#WearWithConfidence</span>
                    </p>

                    {/* CTA */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-electric-blue hover:bg-electric-blue/90 text-off-white px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wider transition-all inline-flex items-center gap-2"
                    >
                        <Instagram className="w-4 h-4" />
                        <span>Share Your Look</span>
                    </motion.button>
                </motion.div>
            </div>

            {/* Auto-scrolling Marquee */}
            <div className="relative">
                {/* Gradient overlays for fade effect */}
                <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-carbon to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-carbon to-transparent z-10" />

                {/* Scrolling container */}
                <motion.div
                    animate={{
                        x: [0, -50 + '%'],
                    }}
                    transition={{
                        x: {
                            duration: 30,
                            repeat: Infinity,
                            ease: 'linear',
                        },
                    }}
                    className="flex gap-4 md:gap-6"
                >
                    {duplicatedPosts.map((post, index) => (
                        <motion.div
                            key={`${post.id}-${index}`}
                            whileHover={{ scale: 1.05, zIndex: 20 }}
                            className="relative flex-shrink-0 w-64 md:w-80 group cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-carbon/50">
                                <Image
                                    src={post.image}
                                    alt={`Post by ${post.username}`}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 256px, 320px"
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-carbon via-carbon/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        {/* Stats */}
                                        <div className="flex items-center gap-4 mb-2 text-off-white text-sm">
                                            <div className="flex items-center gap-1">
                                                <Heart className="w-4 h-4 fill-current" />
                                                <span>{post.likes.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MessageCircle className="w-4 h-4" />
                                                <span>{post.comments}</span>
                                            </div>
                                        </div>

                                        {/* Caption */}
                                        {post.caption && (
                                            <p className="text-off-white/90 text-sm line-clamp-2 mb-2">
                                                {post.caption}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Featured Badge */}
                                <div className="absolute top-3 right-3 bg-electric-blue text-off-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                                    <Instagram className="w-3 h-3" />
                                    <span>Featured</span>
                                </div>
                            </div>

                            {/* Username */}
                            <div className="mt-3 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-electric-blue to-electric-blue/60 flex items-center justify-center">
                                    <Instagram className="w-4 h-4 text-off-white" />
                                </div>
                                <span className="font-semibold text-off-white">{post.username}</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Bottom CTA */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center mt-12 px-4"
            >
                <p className="text-off-white/60 text-sm mb-4">
                    Want to be featured? Post your look and tag us!
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
                    <span className="bg-electric-blue/20 text-electric-blue px-4 py-2 rounded-full font-semibold">
                        #WearWithConfidence
                    </span>
                    <span className="bg-electric-blue/20 text-electric-blue px-4 py-2 rounded-full font-semibold">
                        @urbno.official
                    </span>
                </div>
            </motion.div>
        </section>
    );
}
