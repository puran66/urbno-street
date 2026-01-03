"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import TrendingReelsSection from './components/TrendingReelsSection';
import ComingSoonModal from './components/ComingSoonModal';
import PageLoader from './components/PageLoader';

export default function HomePage() {
    const [showComingSoon, setShowComingSoon] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    return (
        <>
            <PageLoader />
            <div className="min-h-screen bg-off-white">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
                    {/* Main Header */}
                    <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                        <Link href="/" className="font-archivo text-2xl uppercase tracking-tight hover:text-electric-blue transition-colors">
                            URBNO SHOP
                        </Link>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex gap-8 items-center">
                            <Link href="/shop" className="font-inter text-sm uppercase tracking-wider hover:text-electric-blue transition-colors">
                                Shop
                            </Link>
                            <Link href="/about" className="font-inter text-sm uppercase tracking-wider hover:text-electric-blue transition-colors">
                                About
                            </Link>
                            <button
                                onClick={() => setShowComingSoon(true)}
                                className="font-inter text-sm uppercase tracking-wider hover:text-electric-blue transition-colors"
                            >
                                Collections
                            </button>
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <Link href="/cart">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 border-2 border-charcoal rounded-lg flex items-center gap-2 hover:bg-charcoal hover:text-white transition-colors font-inter text-sm font-semibold uppercase tracking-wider"
                                >
                                    Cart (0)
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </header>

                {/* Animated Running Text Banner */}
                <div className="bg-electric-blue text-white py-3 overflow-hidden">
                    <motion.div
                        animate={{ x: [0, -1000] }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="flex gap-8 whitespace-nowrap"
                    >
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="flex items-center gap-8">
                                <span className="font-archivo text-sm uppercase tracking-widest">✦ Launching Soon</span>
                                <span className="font-archivo text-sm uppercase tracking-widest">✦ Limited Edition Drops</span>
                                <span className="font-archivo text-sm uppercase tracking-widest">✦ Premium Quality</span>
                                <span className="font-archivo text-sm uppercase tracking-widest">✦ New Generation Fashion</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Hero Section */}
                <section className="relative bg-charcoal text-white overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            {/* Text Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="inline-block mb-6 px-4 py-2 bg-electric-blue/20 rounded-full"
                                >
                                    <motion.span
                                        animate={{
                                            opacity: [1, 0.5, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        className="text-sm font-semibold uppercase tracking-wider text-electric-blue font-inter"
                                    >
                                        ✦ Coming Soon
                                    </motion.span>
                                </motion.div>

                                <h1 className="font-archivo text-5xl md:text-7xl uppercase tracking-tight mb-6 leading-none">
                                    Modern Streetwear.
                                    <br />
                                    <motion.span
                                        animate={{
                                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                                        }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        className="bg-gradient-to-r from-electric-blue via-muted-gold to-electric-blue bg-clip-text text-transparent"
                                        style={{ backgroundSize: '200% auto' }}
                                    >
                                        New Generation.
                                    </motion.span>
                                </h1>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-xl text-gray-300 mb-8 font-inter leading-relaxed"
                                >
                                    Designed for those who value <motion.span
                                        animate={{ color: ['#9CA3AF', '#2563EB', '#9CA3AF'] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        className="font-semibold"
                                    >
                                        authenticity
                                    </motion.span>, quality, and self-expression. Limited drops, premium materials.
                                </motion.p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href="/shop">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-8 py-4 bg-electric-blue text-white rounded-lg font-semibold uppercase tracking-wider hover:bg-electric-blue/90 transition-colors font-inter"
                                        >
                                            Explore Collection
                                        </motion.button>
                                    </Link>
                                    <button
                                        onClick={() => setShowComingSoon(true)}
                                        className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold uppercase tracking-wider hover:bg-white hover:text-charcoal transition-colors font-inter"
                                    >
                                        View Trending
                                    </button>
                                </div>

                                <p className="mt-6 text-sm text-gray-400 font-inter">
                                    Free returns • Tracked shipping • Easy exchange
                                </p>
                            </motion.div>

                            {/* Hero Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="relative aspect-[4/5] rounded-2xl overflow-hidden"
                            >
                                <Image
                                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
                                    alt="URBNO SHOP Fashion"
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                <div className="absolute bottom-6 left-6 bg-white text-charcoal px-4 py-2 rounded-full font-semibold uppercase text-sm tracking-wider font-inter">
                                    Limited Edition
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Decorative gradient */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-electric-blue/10 to-transparent pointer-events-none" />
                </section>

                {/* Trending Reels Section */}
                <TrendingReelsSection />

                {/* Featured Products */}
                <section className="py-20 md:py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="font-archivo text-4xl md:text-5xl uppercase tracking-tight mb-4 text-charcoal">
                                Featured Drops
                            </h2>
                            <p className="text-lg text-gray-600 font-inter">
                                Handpicked pieces for the modern wardrobe
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                            {[
                                {
                                    title: "Oversized Graphic Tee",
                                    category: "Tees",
                                    price: 699,
                                    originalPrice: 999,
                                    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=900&auto=format&fit=crop",
                                    badge: "Trending"
                                },
                                {
                                    title: "Vintage Wash Tee",
                                    category: "Tees",
                                    price: 749,
                                    originalPrice: 1199,
                                    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=900&auto=format&fit=crop",
                                    badge: "Limited"
                                },
                                {
                                    title: "Minimal Logo Tee",
                                    category: "Tees",
                                    price: 499,
                                    originalPrice: 799,
                                    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=900&auto=format&fit=crop",
                                    badge: "Editor's Pick"
                                },
                                {
                                    title: "Oversized Hoodie",
                                    category: "Hoodies",
                                    price: 799,
                                    originalPrice: 1499,
                                    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=900&auto=format&fit=crop",
                                    badge: "Trending"
                                }
                            ].map((product, index) => (
                                <motion.div
                                    key={product.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="group cursor-pointer"
                                    onClick={() => setShowComingSoon(true)}
                                >
                                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 mb-4">
                                        <Image
                                            src={product.image}
                                            alt={product.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                        <div className="absolute top-3 left-3">
                                            {product.originalPrice && (
                                                <div className="bg-red-600 text-white px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter animate-pulse shadow-lg shadow-red-600/30">
                                                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <h3 className="font-archivo text-base uppercase tracking-tight mb-1 group-hover:text-electric-blue transition-colors">
                                        {product.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-2 font-inter">{product.category}</p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="font-black text-xl text-electric-blue font-archivo">₹{product.price}</p>
                                        {product.originalPrice && (
                                            <div className="flex items-center gap-1.5">
                                                <p className="text-sm text-gray-400 line-through font-inter decoration-gray-400/50">₹{product.originalPrice}</p>
                                                <span className="text-[10px] font-bold text-red-600 uppercase tracking-tighter bg-red-50 px-1.5 py-0.5 rounded">Sale</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link href="/shop">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-charcoal text-white rounded-lg font-semibold uppercase tracking-wider hover:bg-charcoal/90 transition-colors font-inter"
                                >
                                    View All Products
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Brand Statement */}
                <section className="py-20 md:py-32 bg-charcoal text-white">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="font-archivo text-4xl md:text-6xl uppercase tracking-tight mb-8">
                                Built for the
                                <br />
                                <span className="text-electric-blue">New Generation</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-inter mb-12">
                                We're creating more than clothes. We're building a movement for those who value authenticity, quality, and self-expression.
                            </p>
                            <Link href="/about">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold uppercase tracking-wider hover:bg-white hover:text-charcoal transition-colors font-inter"
                                >
                                    Our Story
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-off-white border-t border-gray-200 py-12">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                            <div className="col-span-2 md:col-span-1">
                                <div className="font-archivo text-xl mb-3 uppercase">URBNO SHOP</div>
                                <p className="text-sm text-gray-600 font-inter">
                                    Modern streetwear for the new generation. Limited drops, premium quality.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-3 uppercase text-sm font-inter">Shop</h3>
                                <div className="space-y-2 text-sm text-gray-600 font-inter">
                                    <Link href="/shop" className="block hover:text-charcoal transition-colors">All Products</Link>
                                    <button onClick={() => setShowComingSoon(true)} className="block hover:text-charcoal transition-colors">New Arrivals</button>
                                    <button onClick={() => setShowComingSoon(true)} className="block hover:text-charcoal transition-colors">Best Sellers</button>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-3 uppercase text-sm font-inter">About</h3>
                                <div className="space-y-2 text-sm text-gray-600 font-inter">
                                    <Link href="/about" className="block hover:text-charcoal transition-colors">Our Story</Link>
                                    <button onClick={() => setShowComingSoon(true)} className="block hover:text-charcoal transition-colors">Contact</button>
                                    <button onClick={() => setShowComingSoon(true)} className="block hover:text-charcoal transition-colors">FAQ</button>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-3 uppercase text-sm font-inter">Follow</h3>
                                <div className="space-y-2 text-sm text-gray-600 font-inter">
                                    <a href="https://www.instagram.com/urbno.in?igsh=ODFobGF6dGM3MXU1&utm_source=qr" target="_blank" rel="noopener noreferrer" className="block hover:text-charcoal transition-colors">Instagram</a>
                                    <button onClick={() => setShowComingSoon(true)} className="block hover:text-charcoal transition-colors">Twitter</button>
                                    <button onClick={() => setShowComingSoon(true)} className="block hover:text-charcoal transition-colors">TikTok</button>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-500 font-inter">
                            © 2026 URBNO SHOP. All rights reserved.
                        </div>
                    </div>
                </footer>

                {/* Coming Soon Modal */}
                <ComingSoonModal
                    isOpen={showComingSoon}
                    onClose={() => setShowComingSoon(false)}
                    title="Coming Soon"
                    message="This feature is launching soon. Stay tuned for our official release."
                />
            </div>
        </>
    );
}
