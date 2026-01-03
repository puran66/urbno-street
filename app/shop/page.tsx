"use client";

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ComingSoonModal from '../components/ComingSoonModal';
import PageLoader from '../components/PageLoader';

// Product interface
interface Product {
    id: number;
    title: string;
    category: string;
    price: number;
    originalPrice?: number;
    image: string;
    hoverImage: string;
    badge?: 'Limited' | 'Trending' | "Editor's Pick";
    slug: string;
}

// Sample products data - 8 Premium Men's Items
const PRODUCTS: Product[] = [
    // 6 Gen-Z Style T-Shirts
    {
        id: 1,
        title: "Oversized Graphic Tee",
        category: "Tees",
        price: 699,
        originalPrice: 999,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=900&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=900&auto=format&fit=crop",
        badge: "Trending",
        slug: "oversized-graphic-tee"
    },
    {
        id: 2,
        title: "Minimal Logo Tee",
        category: "Tees",
        price: 499,
        originalPrice: 799,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=900&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=900&auto=format&fit=crop",
        badge: "Editor's Pick",
        slug: "minimal-logo-tee"
    },
    {
        id: 3,
        title: "Vintage Wash Tee",
        category: "Tees",
        price: 749,
        originalPrice: 1199,
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=900&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?q=80&w=900&auto=format&fit=crop",
        badge: "Limited",
        slug: "vintage-wash-tee"
    },
    {
        id: 4,
        title: "Color Block Tee",
        category: "Tees",
        price: 599,
        originalPrice: 899,
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=900&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=900&auto=format&fit=crop",
        slug: "color-block-tee"
    },
    {
        id: 5,
        title: "Typography Statement Tee",
        category: "Tees",
        price: 549,
        originalPrice: 799,
        image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?q=80&w=900&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?q=80&w=900&auto=format&fit=crop",
        badge: "Trending",
        slug: "typography-statement-tee"
    },
    {
        id: 6,
        title: "Abstract Art Tee",
        category: "Tees",
        price: 649,
        originalPrice: 999,
        image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=900&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=900&auto=format&fit=crop",
        badge: "Limited",
        slug: "abstract-art-tee"
    },

    // 2 Stylish Hoodies
    {
        id: 7,
        title: "Oversized Hoodie",
        category: "Hoodies",
        price: 799,
        originalPrice: 1499,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=900&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?q=80&w=900&auto=format&fit=crop",
        badge: "Trending",
        slug: "oversized-hoodie"
    },
    {
        id: 8,
        title: "Zip-Up Hoodie",
        category: "Hoodies",
        price: 749,
        originalPrice: 1299,
        image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?q=80&w=900&auto=format&fit=crop",
        hoverImage: "https://images.unsplash.com/photo-1620799139834-6b8f844fbe29?q=80&w=900&auto=format&fit=crop",
        badge: "Editor's Pick",
        slug: "zip-up-hoodie"
    },
];

// Product Card Component
function ProductCard({ product, index }: { product: Product; index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.2 });

    return (
        <>
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                    duration: 0.6,
                    delay: index * 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Link href={`/products/${product.slug}`} className="block">
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 mb-4">
                        {/* Main Image */}
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className={`object-cover transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                        {/* Hover Image */}
                        <Image
                            src={product.hoverImage}
                            alt={`${product.title} alternate view`}
                            fill
                            className={`object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />

                        {/* Discount Badge Only */}
                        <div className="absolute top-3 left-3 z-10">
                            {product.originalPrice && (
                                <span className="bg-red-600 text-white px-2 py-1 rounded-md text-[10px] md:text-xs font-black uppercase tracking-tighter shadow-lg shadow-red-600/30 animate-pulse">
                                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                </span>
                            )}
                        </div>

                        {/* Quick Add Button - Appears on Hover */}
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                            transition={{ duration: 0.3 }}
                            onClick={(e) => {
                                e.preventDefault();
                                setShowModal(true);
                            }}
                            className="absolute bottom-4 left-4 right-4 bg-charcoal text-white py-3 rounded-lg font-semibold text-sm uppercase tracking-wider hover:bg-charcoal/90 transition-colors z-10"
                        >
                            Add to Cart
                        </motion.button>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-2">
                        <h3 className="font-archivo text-base uppercase tracking-tight text-charcoal group-hover:text-electric-blue transition-colors">
                            {product.title}
                        </h3>
                        <p className="text-sm text-gray-500 font-inter">{product.category}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-black text-xl md:text-2xl text-electric-blue font-archivo">₹{product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                                <div className="flex items-center gap-1.5">
                                    <span className="text-sm text-gray-400 line-through font-inter decoration-gray-400/50">₹{product.originalPrice.toLocaleString()}</span>
                                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-tighter bg-red-50 px-1.5 py-0.5 rounded">Heavy Sale</span>
                                </div>
                            )}
                        </div>
                    </div>
                </Link>
            </motion.div>

            {/* Coming Soon Modal */}
            <ComingSoonModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Cart Coming Soon"
                message="We're crafting something special. Shopping cart will be available at launch."
            />
        </>
    );
}

export default function ShopPage() {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedPrice, setSelectedPrice] = useState<string>('All');
    const [showFilters, setShowFilters] = useState(false);

    const categories = ['All', 'Hoodies', 'Tees', 'Bags', 'Accessories', 'Footwear', 'Jackets', 'Bottoms'];
    const priceRanges = ['All', 'Under ₹1000', '₹1000-₹2000', '₹2000-₹4000', 'Above ₹4000'];

    // Filter products
    const filteredProducts = PRODUCTS.filter(product => {
        const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;

        let priceMatch = true;
        if (selectedPrice === 'Under ₹1000') priceMatch = product.price < 1000;
        else if (selectedPrice === '₹1000-₹2000') priceMatch = product.price >= 1000 && product.price < 2000;
        else if (selectedPrice === '₹2000-₹4000') priceMatch = product.price >= 2000 && product.price < 4000;
        else if (selectedPrice === 'Above ₹4000') priceMatch = product.price >= 4000;

        return categoryMatch && priceMatch;
    });

    return (
        <>
            <PageLoader />
            <div className="min-h-screen bg-off-white pb-20 md:pb-0">
                {/* Compact White Header */}
                <div className="bg-white text-charcoal py-6 md:py-12 border-b border-gray-100">
                    <div className="max-w-7xl mx-auto px-4">
                        {/* Back Button */}
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-charcoal/60 hover:text-charcoal mb-4 md:mb-6 transition-colors group"
                        >
                            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="font-inter font-medium text-sm">Back to Home</span>
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="text-center md:text-left"
                        >
                            <h1 className="font-archivo text-4xl md:text-6xl uppercase tracking-tight mb-2">
                                Shop Collection
                            </h1>
                            <p className="text-sm md:text-lg text-gray-500 font-inter">
                                {filteredProducts.length} premium pieces found
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Sticky Mobile Filters */}
                <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 py-3">
                        {/* Category Pills - Horizontal Scroll */}
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                            {categories.map(cat => (
                                <motion.button
                                    key={cat}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-2.5 rounded-full font-semibold text-xs md:text-sm uppercase tracking-wider whitespace-nowrap transition-all ${selectedCategory === cat
                                        ? 'bg-electric-blue text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {cat}
                                </motion.button>
                            ))}
                        </div>

                        {/* Price Pills - Horizontal Scroll */}
                        <div className="flex gap-2 overflow-x-auto scrollbar-hide mt-2">
                            {priceRanges.map(range => (
                                <motion.button
                                    key={range}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedPrice(range)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${selectedPrice === range
                                        ? 'bg-charcoal text-white'
                                        : 'bg-white border border-gray-300 text-gray-600 hover:border-charcoal'
                                        }`}
                                >
                                    {range}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Products */}
                <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">

                    {/* Product Grid - Mobile Optimized */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
                        {filteredProducts.map((product, index) => (
                            <ProductCard key={product.id} product={product} index={index} />
                        ))}
                    </div>

                    {/* Empty State - Mobile Optimized */}
                    {filteredProducts.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-16 md:py-20"
                        >
                            <div className="text-6xl md:text-7xl mb-4">🔍</div>
                            <h3 className="font-archivo text-2xl md:text-3xl uppercase mb-2 text-charcoal">No Products Found</h3>
                            <p className="text-gray-500 text-base md:text-lg font-inter mb-6">Try adjusting your filters</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setSelectedCategory('All');
                                    setSelectedPrice('All');
                                }}
                                className="px-8 py-4 bg-electric-blue text-white rounded-lg font-semibold uppercase tracking-wider hover:bg-electric-blue/90 transition-colors shadow-lg"
                            >
                                Clear All Filters
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
}
