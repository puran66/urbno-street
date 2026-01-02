'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
}

const skinTones = [
    { id: 'fair', name: 'Fair', color: '#FFE0BD' },
    { id: 'light', name: 'Light', color: '#F1C27D' },
    { id: 'medium', name: 'Medium', color: '#C68642' },
    { id: 'olive', name: 'Olive', color: '#8D5524' },
    { id: 'tan', name: 'Tan', color: '#6F4E37' },
    { id: 'deep', name: 'Deep', color: '#4A312C' },
];

const bodyTypes = [
    { id: 'petite', name: 'Petite', icon: '👗' },
    { id: 'slim', name: 'Slim', icon: '🧥' },
    { id: 'athletic', name: 'Athletic', icon: '💪' },
    { id: 'curvy', name: 'Curvy', icon: '👚' },
    { id: 'plus', name: 'Plus', icon: '👔' },
];

// Mock product recommendations (replace with actual API)
const mockProducts: Product[] = [
    {
        id: 1,
        title: 'Oversized Linen Shirt',
        price: 2499,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
        category: 'Tops',
    },
    {
        id: 2,
        title: 'High-Waist Denim',
        price: 3299,
        image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
        category: 'Bottoms',
    },
    {
        id: 3,
        title: 'Cropped Blazer',
        price: 4999,
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
        category: 'Outerwear',
    },
    {
        id: 4,
        title: 'Minimalist Tote',
        price: 1899,
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400',
        category: 'Accessories',
    },
];

export default function AIStylingModule() {
    const [selectedSkinTone, setSelectedSkinTone] = useState<string | null>(null);
    const [selectedBodyType, setSelectedBodyType] = useState<string | null>(null);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleGetRecommendations = async () => {
        if (!selectedSkinTone || !selectedBodyType) return;

        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setShowRecommendations(true);
    };

    const canGetRecommendations = selectedSkinTone && selectedBodyType;

    return (
        <section className="w-full py-12 md:py-16 px-4 bg-gradient-to-b from-off-white to-carbon/5">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <div className="inline-flex items-center gap-2 bg-electric-blue/10 text-electric-blue px-4 py-2 rounded-full mb-4">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-sm font-semibold uppercase tracking-wider">AI Powered</span>
                    </div>
                    <h2 className="font-playfair text-4xl md:text-5xl font-bold text-carbon mb-3">
                        Personalized for You
                    </h2>
                    <p className="text-carbon/60 text-lg max-w-2xl mx-auto">
                        Get outfit recommendations tailored to your unique style and body type
                    </p>
                </motion.div>

                {/* Selection Interface */}
                <div className="bg-white rounded-2xl shadow-glass p-6 md:p-8 mb-8">
                    {/* Skin Tone Selection */}
                    <div className="mb-8">
                        <label className="block text-carbon font-semibold mb-4 text-lg">
                            Select Your Skin Tone
                        </label>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                            {skinTones.map((tone) => (
                                <motion.button
                                    key={tone.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedSkinTone(tone.id)}
                                    className={`
                    flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all
                    ${selectedSkinTone === tone.id
                                            ? 'border-electric-blue bg-electric-blue/5'
                                            : 'border-carbon/10 hover:border-carbon/30'
                                        }
                  `}
                                >
                                    <div
                                        className="w-12 h-12 rounded-full border-2 border-carbon/20 shadow-sm"
                                        style={{ backgroundColor: tone.color }}
                                    />
                                    <span className="text-xs font-medium text-carbon">{tone.name}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Body Type Selection */}
                    <div className="mb-6">
                        <label className="block text-carbon font-semibold mb-4 text-lg">
                            Select Your Body Type
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                            {bodyTypes.map((type) => (
                                <motion.button
                                    key={type.id}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setSelectedBodyType(type.id)}
                                    className={`
                    flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all
                    ${selectedBodyType === type.id
                                            ? 'border-electric-blue bg-electric-blue/5'
                                            : 'border-carbon/10 hover:border-carbon/30'
                                        }
                  `}
                                >
                                    <span className="text-3xl">{type.icon}</span>
                                    <span className="text-sm font-medium text-carbon">{type.name}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Get Recommendations Button */}
                    <motion.button
                        whileHover={canGetRecommendations ? { scale: 1.02 } : {}}
                        whileTap={canGetRecommendations ? { scale: 0.98 } : {}}
                        onClick={handleGetRecommendations}
                        disabled={!canGetRecommendations || isLoading}
                        className={`
              w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2
              transition-all duration-300
              ${canGetRecommendations
                                ? 'bg-electric-blue text-off-white hover:shadow-electric cursor-pointer'
                                : 'bg-carbon/10 text-carbon/40 cursor-not-allowed'
                            }
            `}
                    >
                        {isLoading ? (
                            <>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                >
                                    <Sparkles className="w-5 h-5" />
                                </motion.div>
                                <span>Finding Your Perfect Matches...</span>
                            </>
                        ) : (
                            <>
                                <span>Get My Recommendations</span>
                                <ChevronRight className="w-5 h-5" />
                            </>
                        )}
                    </motion.button>
                </div>

                {/* Recommendations Grid */}
                <AnimatePresence>
                    {showRecommendations && (
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 40 }}
                            className="mb-8"
                        >
                            <h3 className="font-playfair text-2xl md:text-3xl font-bold text-carbon mb-6 text-center">
                                Recommended for You
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {mockProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-glass transition-all cursor-pointer"
                                    >
                                        <div className="relative aspect-[3/4] overflow-hidden bg-carbon/5">
                                            <Image
                                                src={product.image}
                                                alt={product.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 50vw, 25vw"
                                            />
                                            <div className="absolute top-2 right-2 bg-electric-blue text-off-white text-xs px-2 py-1 rounded-full font-semibold">
                                                AI Pick
                                            </div>
                                        </div>
                                        <div className="p-3">
                                            <p className="text-xs text-carbon/60 mb-1">{product.category}</p>
                                            <h4 className="font-semibold text-carbon text-sm mb-2 line-clamp-2">
                                                {product.title}
                                            </h4>
                                            <p className="font-bold text-carbon">₹{product.price}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
