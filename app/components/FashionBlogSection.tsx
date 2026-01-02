'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, TrendingUp } from 'lucide-react';
import Image from 'next/image';

interface BlogPost {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    readTime: string;
    category: string;
    trending?: boolean;
}

const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: '5 Outfits That Make You Instantly More Attractive',
        excerpt: 'Science-backed styling tips that boost confidence and turn heads',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600',
        readTime: '4 min',
        category: 'Styling Tips',
        trending: true,
    },
    {
        id: 2,
        title: 'The Ultimate Color Palette for Indian Skin Tones',
        excerpt: 'Find your perfect shades and never second-guess your outfit again',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600',
        readTime: '6 min',
        category: 'Color Guide',
        trending: true,
    },
    {
        id: 3,
        title: 'College to Coffee Date: 3 Quick Outfit Transitions',
        excerpt: 'Look effortlessly put-together from morning classes to evening plans',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600',
        readTime: '5 min',
        category: 'Lifestyle',
    },
    {
        id: 4,
        title: 'How to Find Your Perfect Fit: Body Type Guide',
        excerpt: 'Dress for your body shape and feel confident in every outfit',
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600',
        readTime: '7 min',
        category: 'Fit Guide',
    },
];

export default function FashionBlogSection() {
    return (
        <section className="w-full py-12 md:py-16 px-4 bg-gradient-to-b from-off-white to-carbon/5">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <p className="text-electric-blue text-sm font-semibold uppercase tracking-wider mb-2">
                        Style Secrets
                    </p>
                    <h2 className="font-playfair text-3xl md:text-5xl font-bold text-carbon mb-3">
                        Fashion Tips & Guides
                    </h2>
                    <p className="text-carbon/60 text-lg max-w-2xl mx-auto">
                        Level up your style game with expert advice and trending insights
                    </p>
                </motion.div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`
                group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-glass transition-all
                ${index === 0 ? 'md:col-span-2 md:flex md:flex-row' : ''}
              `}
                        >
                            {/* Image */}
                            <div className={`
                relative overflow-hidden bg-carbon/5
                ${index === 0 ? 'md:w-1/2 aspect-[16/10] md:aspect-auto' : 'aspect-[16/10]'}
              `}>
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    sizes={index === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 50vw'}
                                />

                                {/* Trending Badge */}
                                {post.trending && (
                                    <div className="absolute top-4 left-4 bg-electric-blue text-off-white text-xs px-3 py-1 rounded-full font-bold flex items-center gap-1">
                                        <TrendingUp className="w-3 h-3" />
                                        <span>Trending</span>
                                    </div>
                                )}

                                {/* Category Badge */}
                                <div className="absolute bottom-4 left-4 bg-glass-white backdrop-blur-glass text-carbon text-xs px-3 py-1 rounded-full font-semibold">
                                    {post.category}
                                </div>
                            </div>

                            {/* Content */}
                            <div className={`
                p-6
                ${index === 0 ? 'md:w-1/2 md:flex md:flex-col md:justify-center md:p-8' : ''}
              `}>
                                <h3 className={`
                  font-playfair font-bold text-carbon mb-3 group-hover:text-electric-blue transition-colors
                  ${index === 0 ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}
                `}>
                                    {post.title}
                                </h3>

                                <p className={`
                  text-carbon/60 mb-4
                  ${index === 0 ? 'text-base md:text-lg' : 'text-sm md:text-base'}
                `}>
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-carbon/50 text-sm">
                                        <Clock className="w-4 h-4" />
                                        <span>{post.readTime} read</span>
                                    </div>

                                    <motion.button
                                        whileHover={{ x: 5 }}
                                        className="text-electric-blue font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                                    >
                                        <span>Read More</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-10"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-carbon hover:bg-carbon/90 text-off-white px-8 py-4 rounded-full font-semibold text-base flex items-center gap-2 mx-auto transition-colors"
                    >
                        <span>View All Articles</span>
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
