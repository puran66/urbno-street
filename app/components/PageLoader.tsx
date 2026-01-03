"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 300);
                    return 100;
                }
                return prev + 10;
            });
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="fixed inset-0 z-[100] bg-charcoal flex items-center justify-center"
                >
                    <div className="text-center">
                        {/* Logo Animation */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{
                                duration: 0.6,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            className="mb-8"
                        >
                            <h1 className="font-archivo text-5xl md:text-7xl uppercase tracking-tight text-white mb-2">
                                URBNO
                            </h1>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.3,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                                className="h-1 bg-electric-blue mx-auto"
                            />
                            <p className="font-inter text-sm uppercase tracking-[0.3em] text-gray-400 mt-4">
                                SHOP
                            </p>
                        </motion.div>

                        {/* Progress Bar */}
                        <div className="w-64 mx-auto">
                            <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3, ease: 'easeOut' }}
                                    className="h-full bg-gradient-to-r from-electric-blue to-muted-gold"
                                />
                            </div>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-gray-500 text-xs mt-3 font-inter tracking-wider"
                            >
                                Loading {progress}%
                            </motion.p>
                        </div>

                        {/* Animated Dots */}
                        <div className="flex gap-2 justify-center mt-8">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0 }}
                                    animate={{
                                        scale: [0, 1, 0],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: 'easeInOut',
                                    }}
                                    className="w-2 h-2 bg-electric-blue rounded-full"
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
