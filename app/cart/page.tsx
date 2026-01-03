"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PageLoader from '../components/PageLoader';

export default function CartPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleNotify = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                setEmail('');
            }, 3000);
        }
    };

    return (
        <>
            <PageLoader />
            <div className="min-h-screen bg-off-white px-4 py-20">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => router.back()}
                    className="max-w-2xl mx-auto flex items-center gap-2 text-gray-700 hover:text-charcoal mb-8 transition-colors group"
                >
                    <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-inter font-medium">Back</span>
                </motion.button>

                <div className="flex items-center justify-center">
                    <div className="max-w-2xl w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="text-center"
                        >
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.2,
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 15
                                }}
                                className="mx-auto w-32 h-32 mb-8 rounded-full bg-gradient-to-br from-electric-blue to-muted-gold flex items-center justify-center"
                            >
                                <svg
                                    className="w-16 h-16 text-white"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M6 6h15l-1.5 9h-12z" strokeLinecap="round" strokeLinejoin="round" />
                                    <circle cx="9" cy="20" r="1" />
                                    <circle cx="18" cy="20" r="1" />
                                </svg>
                            </motion.div>

                            {/* Title */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="font-archivo text-5xl md:text-7xl uppercase tracking-tight mb-6 text-charcoal"
                            >
                                Cart
                                <br />
                                <span className="text-electric-blue">Launching Soon</span>
                            </motion.h1>

                            {/* Message */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-lg md:text-xl text-gray-600 mb-12 max-w-xl mx-auto font-inter leading-relaxed"
                            >
                                We're crafting the perfect shopping experience for you.
                                Our cart and checkout will be available at launch.
                            </motion.p>

                            {/* Notify Form */}
                            <motion.form
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                onSubmit={handleNotify}
                                className="max-w-md mx-auto mb-8"
                            >
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                        className="flex-1 px-6 py-4 rounded-lg border-2 border-charcoal focus:outline-none focus:border-electric-blue transition-colors font-inter"
                                    />
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="px-8 py-4 bg-charcoal text-white rounded-lg font-semibold uppercase tracking-wider hover:bg-charcoal/90 transition-colors font-inter"
                                    >
                                        Notify Me
                                    </motion.button>
                                </div>

                                {/* Success Message */}
                                {showSuccess && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="mt-4 text-electric-blue font-semibold font-inter"
                                    >
                                        ✓ Thanks! We'll notify you when we launch.
                                    </motion.p>
                                )}
                            </motion.form>

                            {/* Features */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12"
                            >
                                <div className="p-6 bg-white rounded-lg">
                                    <div className="text-3xl mb-3">🔒</div>
                                    <h3 className="font-archivo font-semibold text-charcoal mb-2 uppercase tracking-wide">Secure</h3>
                                    <p className="text-sm text-gray-600 font-inter">Safe & encrypted checkout</p>
                                </div>
                                <div className="p-6 bg-white rounded-lg">
                                    <div className="text-3xl mb-3">🚚</div>
                                    <h3 className="font-archivo font-semibold text-charcoal mb-2 uppercase tracking-wide">Fast Shipping</h3>
                                    <p className="text-sm text-gray-600 font-inter">Tracked delivery nationwide</p>
                                </div>
                                <div className="p-6 bg-white rounded-lg">
                                    <div className="text-3xl mb-3">↩️</div>
                                    <h3 className="font-archivo font-semibold text-charcoal mb-2 uppercase tracking-wide">Easy Returns</h3>
                                    <p className="text-sm text-gray-600 font-inter">30-day return policy</p>
                                </div>
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center"
                            >
                                <Link href="/shop">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 bg-electric-blue text-white rounded-lg font-semibold uppercase tracking-wider hover:bg-electric-blue/90 transition-colors font-inter"
                                    >
                                        Browse Collection
                                    </motion.button>
                                </Link>
                                <Link href="/">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 border-2 border-charcoal text-charcoal rounded-lg font-semibold uppercase tracking-wider hover:bg-charcoal hover:text-white transition-colors font-inter"
                                    >
                                        Back to Home
                                    </motion.button>
                                </Link>
                            </motion.div>

                            {/* Subtext */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className="mt-12 text-sm text-gray-400 font-inter"
                            >
                                Stay tuned for our official launch
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}
