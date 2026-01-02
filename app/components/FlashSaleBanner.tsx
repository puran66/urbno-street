'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, X } from 'lucide-react';

interface FlashSaleBannerProps {
    discount?: number;
    endsAt: Date;
    onClose?: () => void;
}

export default function FlashSaleBanner({
    discount = 25,
    endsAt,
    onClose
}: FlashSaleBannerProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +endsAt - +new Date();

            if (difference > 0) {
                return {
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }

            return { hours: 0, minutes: 0, seconds: 0 };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);

            // Auto-hide when timer ends
            if (newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
                setIsVisible(false);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [endsAt]);

    const handleClose = () => {
        setIsVisible(false);
        onClose?.();
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    exit={{ y: -100 }}
                    className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white shadow-lg"
                >
                    <div className="max-w-7xl mx-auto px-4 py-3 relative">
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors md:right-6"
                            aria-label="Close banner"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        {/* Content */}
                        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 pr-10 md:pr-0">
                            {/* Icon + Message */}
                            <div className="flex items-center gap-2">
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    <Zap className="w-5 h-5 fill-current" />
                                </motion.div>
                                <span className="font-bold text-sm md:text-base">
                                    FLASH SALE: {discount}% OFF EVERYTHING
                                </span>
                            </div>

                            {/* Countdown */}
                            <div className="flex items-center gap-2">
                                <span className="text-xs md:text-sm font-medium opacity-90">
                                    Ends in:
                                </span>
                                <div className="flex items-center gap-1">
                                    {[
                                        { value: timeLeft.hours, label: 'H' },
                                        { value: timeLeft.minutes, label: 'M' },
                                        { value: timeLeft.seconds, label: 'S' },
                                    ].map((unit, index) => (
                                        <React.Fragment key={unit.label}>
                                            <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-1 min-w-[32px] md:min-w-[40px] text-center">
                                                <motion.span
                                                    key={unit.value}
                                                    initial={{ y: -10, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    className="font-bold text-sm md:text-base tabular-nums"
                                                >
                                                    {String(unit.value).padStart(2, '0')}
                                                </motion.span>
                                            </div>
                                            {index < 2 && (
                                                <span className="text-white/60 font-bold">:</span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            {/* CTA */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-red-600 px-4 md:px-6 py-1.5 md:py-2 rounded-full font-bold text-xs md:text-sm hover:bg-white/90 transition-colors whitespace-nowrap"
                            >
                                Shop Now →
                            </motion.button>
                        </div>
                    </div>

                    {/* Animated Progress Bar */}
                    <motion.div
                        initial={{ scaleX: 1 }}
                        animate={{ scaleX: 0 }}
                        transition={{
                            duration: (+endsAt - +new Date()) / 1000,
                            ease: 'linear'
                        }}
                        className="h-1 bg-white/30 origin-left"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
