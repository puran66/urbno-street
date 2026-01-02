'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

interface HeroVideoProps {
    videoUrl?: string;
    fallbackImage?: string;
    onShopNow?: () => void;
    onExploreStyling?: () => void;
}

export default function HeroVideo({
    videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-fashion-model-walking-in-a-studio-41495-large.mp4',
    fallbackImage = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920',
    onShopNow,
    onExploreStyling,
}: HeroVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Auto-play video on mount
        if (videoRef.current) {
            videoRef.current.play().catch(err => {
                console.log('Video autoplay failed:', err);
            });
        }
    }, []);

    return (
        <section className="relative w-full h-screen overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={fallbackImage}
                >
                    <source src={videoUrl} type="video/mp4" />
                    {/* Fallback image if video fails */}
                    <img
                        src={fallbackImage}
                        alt="Fashion hero"
                        className="w-full h-full object-cover"
                    />
                </video>

                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-carbon/40 via-carbon/20 to-carbon/60" />
            </div>

            {/* Content Overlay - Glassmorphism Card */}
            <div className="relative z-10 h-full flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center max-w-4xl"
                >
                    {/* Glassmorphism Card */}
                    <div className="bg-glass-white backdrop-blur-glass border border-off-white/20 rounded-3xl p-8 md:p-12 shadow-glass">
                        {/* Eyebrow */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="inline-block mb-4"
                        >
                            <span className="text-electric-blue text-sm md:text-base font-semibold uppercase tracking-widest">
                                New Collection
                            </span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold text-carbon mb-4 leading-tight"
                        >
                            Outfits that speak
                            <br />
                            <span className="text-electric-blue">louder</span>
                        </motion.h1>

                        {/* Subheadline */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-carbon/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto font-light"
                        >
                            Wear what represents you. Premium fashion for the bold and confident.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            {/* Primary CTA */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onShopNow}
                                className="group bg-electric-blue hover:bg-electric-blue/90 text-off-white px-8 py-4 rounded-full font-semibold text-base md:text-lg flex items-center gap-2 shadow-electric transition-all w-full sm:w-auto justify-center"
                            >
                                <span>Shop the Drop</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>

                            {/* Secondary CTA */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onExploreStyling}
                                className="group bg-carbon/10 hover:bg-carbon/20 backdrop-blur-sm text-carbon px-8 py-4 rounded-full font-semibold text-base md:text-lg flex items-center gap-2 border border-carbon/20 transition-all w-full sm:w-auto justify-center"
                            >
                                <Play className="w-5 h-5" />
                                <span>Explore Styling</span>
                            </motion.button>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-8 pt-6 border-t border-carbon/10"
                        >
                            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-carbon/70">
                                <div className="flex items-center gap-1">
                                    <span className="font-semibold">⚡</span>
                                    <span>Fast Shipping</span>
                                </div>
                                <div className="hidden sm:block w-1 h-1 bg-carbon/30 rounded-full" />
                                <div className="flex items-center gap-1">
                                    <span className="font-semibold">💰</span>
                                    <span>COD Available</span>
                                </div>
                                <div className="hidden sm:block w-1 h-1 bg-carbon/30 rounded-full" />
                                <div className="flex items-center gap-1">
                                    <span className="font-semibold">↩️</span>
                                    <span>7-Day Returns</span>
                                </div>
                                <div className="hidden sm:block w-1 h-1 bg-carbon/30 rounded-full" />
                                <div className="flex items-center gap-1">
                                    <span className="font-semibold">⭐</span>
                                    <span>4.7★ Rating</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 text-off-white"
                >
                    <span className="text-xs uppercase tracking-wider font-medium">Scroll</span>
                    <div className="w-6 h-10 border-2 border-off-white/50 rounded-full flex items-start justify-center p-1">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 bg-off-white rounded-full"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
