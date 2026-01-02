'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Star, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import { CODBadge } from './TrustBadges';

interface Product {
    id: number;
    title: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    image: string;
    videoUrl?: string;
    badge?: 'bestseller' | 'trending' | 'new';
    stockLeft?: number;
}

const bestSellers: Product[] = [
    {
        id: 1,
        title: 'Oversized Linen Shirt',
        price: 2499,
        originalPrice: 3999,
        rating: 4.8,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-woman-in-a-white-shirt-4706-small.mp4',
        badge: 'bestseller',
        stockLeft: 3,
    },
    {
        id: 2,
        title: 'High-Waist Wide Leg Jeans',
        price: 3299,
        rating: 4.7,
        reviews: 189,
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600',
        videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-in-jeans-4707-small.mp4',
        badge: 'trending',
    },
    {
        id: 3,
        title: 'Cropped Blazer',
        price: 4999,
        originalPrice: 6999,
        rating: 4.9,
        reviews: 312,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600',
        badge: 'bestseller',
        stockLeft: 5,
    },
    {
        id: 4,
        title: 'Minimalist Tote Bag',
        price: 1899,
        rating: 4.6,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600',
        badge: 'new',
    },
];

export default function BestSellersSection() {
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const getBadgeConfig = (badge?: string) => {
        switch (badge) {
            case 'bestseller':
                return { text: 'Bestseller', color: 'bg-electric-blue', icon: Star };
            case 'trending':
                return { text: 'Trending', color: 'bg-orange-500', icon: TrendingUp };
            case 'new':
                return { text: 'New', color: 'bg-green-500', icon: null };
            default:
                return null;
        }
    };

    return (
        <section className="w-full py-12 md:py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <p className="text-electric-blue text-sm font-semibold uppercase tracking-wider mb-2">
                        Customer Favorites
                    </p>
                    <h2 className="font-playfair text-3xl md:text-5xl font-bold text-carbon mb-3">
                        Best Sellers
                    </h2>
                    <p className="text-carbon/60 text-lg max-w-2xl mx-auto">
                        The pieces everyone's talking about. Hover to see them in action.
                    </p>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {bestSellers.map((product, index) => {
                        const badgeConfig = getBadgeConfig(product.badge);
                        const discount = product.originalPrice
                            ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                            : 0;

                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group cursor-pointer"
                                onMouseEnter={() => setHoveredId(product.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                {/* Image/Video Container */}
                                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-carbon/5 mb-3">
                                    {/* Static Image */}
                                    <Image
                                        src={product.image}
                                        alt={product.title}
                                        fill
                                        className={`object-cover transition-opacity duration-300 ${hoveredId === product.id && product.videoUrl ? 'opacity-0' : 'opacity-100'
                                            }`}
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                    />

                                    {/* Video on Hover (Desktop) */}
                                    {product.videoUrl && (
                                        <video
                                            src={product.videoUrl}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hoveredId === product.id ? 'opacity-100' : 'opacity-0'
                                                }`}
                                        />
                                    )}

                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                                        {badgeConfig && (
                                            <div className={`${badgeConfig.color} text-white text-xs px-2 py-1 rounded-full font-bold flex items-center gap-1`}>
                                                {badgeConfig.icon && <badgeConfig.icon className="w-3 h-3" />}
                                                <span>{badgeConfig.text}</span>
                                            </div>
                                        )}
                                        {discount > 0 && (
                                            <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                                                {discount}% OFF
                                            </div>
                                        )}
                                    </div>

                                    {/* COD Badge */}
                                    <CODBadge className="absolute top-3 right-3" />

                                    {/* Urgency Indicator */}
                                    {product.stockLeft && product.stockLeft <= 5 && (
                                        <motion.div
                                            animate={{ scale: [1, 1.05, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute bottom-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold"
                                        >
                                            Only {product.stockLeft} left!
                                        </motion.div>
                                    )}

                                    {/* Quick Actions on Hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-t from-carbon via-carbon/50 to-transparent transition-opacity duration-300 ${hoveredId === product.id ? 'opacity-100' : 'opacity-0'
                                        }`}>
                                        <div className="absolute bottom-0 left-0 right-0 p-4 flex gap-2">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="flex-1 bg-electric-blue hover:bg-electric-blue/90 text-white py-2 px-3 rounded-full font-semibold text-sm flex items-center justify-center gap-1"
                                            >
                                                <ShoppingBag className="w-4 h-4" />
                                                <span>Add to Bag</span>
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="w-10 h-10 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full flex items-center justify-center"
                                            >
                                                <Heart className="w-5 h-5" />
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div>
                                    <h3 className="font-semibold text-carbon text-sm md:text-base mb-1 line-clamp-2 group-hover:text-electric-blue transition-colors">
                                        {product.title}
                                    </h3>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mb-2">
                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xs text-carbon/70">
                                            {product.rating} ({product.reviews})
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-bold text-carbon text-base md:text-lg">
                                            ₹{product.price}
                                        </span>
                                        {product.originalPrice && (
                                            <span className="text-xs text-carbon/40 line-through">
                                                ₹{product.originalPrice}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
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
                        className="bg-carbon hover:bg-carbon/90 text-white px-8 py-4 rounded-full font-semibold text-base transition-colors"
                    >
                        View All Best Sellers
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
