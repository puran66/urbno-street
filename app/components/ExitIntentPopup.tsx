'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Sparkles } from 'lucide-react';

interface ExitPopupProps {
    discount?: number;
    onClose?: () => void;
    onSubscribe?: (email: string) => void;
}

export default function ExitIntentPopup({
    discount = 10,
    onClose,
    onSubscribe
}: ExitPopupProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [hasShown, setHasShown] = useState(false);

    useEffect(() => {
        // Check if popup has been shown in this session
        const popupShown = sessionStorage.getItem('exitPopupShown');
        if (popupShown) {
            setHasShown(true);
            return;
        }

        let timeoutId: NodeJS.Timeout;

        const handleMouseLeave = (e: MouseEvent) => {
            // Detect mouse leaving from top of viewport (exit intent)
            if (e.clientY <= 0 && !hasShown) {
                setIsVisible(true);
                setHasShown(true);
                sessionStorage.setItem('exitPopupShown', 'true');
            }
        };

        // Also show after 30 seconds if user hasn't left
        timeoutId = setTimeout(() => {
            if (!hasShown) {
                setIsVisible(true);
                setHasShown(true);
                sessionStorage.setItem('exitPopupShown', 'true');
            }
        }, 30000); // 30 seconds

        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
            clearTimeout(timeoutId);
        };
    }, [hasShown]);

    const handleClose = () => {
        setIsVisible(false);
        onClose?.();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            onSubscribe?.(email);
            // Show success message or redirect
            alert(`Thanks! Check your email for your ${discount}% discount code.`);
            handleClose();
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-carbon/60 backdrop-blur-sm z-50"
                    />

                    {/* Popup */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
                    >
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-carbon/10 hover:bg-carbon/20 flex items-center justify-center transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5 text-carbon" />
                            </button>

                            {/* Content */}
                            <div className="p-8 md:p-10 text-center">
                                {/* Icon */}
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="inline-flex items-center justify-center w-16 h-16 bg-electric-blue/10 rounded-full mb-4"
                                >
                                    <Gift className="w-8 h-8 text-electric-blue" />
                                </motion.div>

                                {/* Headline */}
                                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-carbon mb-2">
                                    Wait! Don't Miss Out
                                </h2>

                                {/* Subheadline */}
                                <p className="text-carbon/70 mb-6">
                                    Get <span className="font-bold text-electric-blue text-xl">{discount}% OFF</span> your first order + exclusive styling tips
                                </p>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                        className="w-full px-4 py-3 rounded-full border-2 border-carbon/10 focus:border-electric-blue focus:outline-none text-carbon placeholder:text-carbon/40"
                                    />

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        className="w-full bg-electric-blue hover:bg-electric-blue/90 text-white py-3 px-6 rounded-full font-semibold text-base flex items-center justify-center gap-2 transition-colors"
                                    >
                                        <Sparkles className="w-5 h-5" />
                                        <span>Claim My {discount}% Discount</span>
                                    </motion.button>
                                </form>

                                {/* Trust Indicators */}
                                <div className="mt-6 pt-6 border-t border-carbon/10">
                                    <div className="flex items-center justify-center gap-4 text-xs text-carbon/60">
                                        <div className="flex items-center gap-1">
                                            <span>✓</span>
                                            <span>No spam</span>
                                        </div>
                                        <div className="w-1 h-1 bg-carbon/20 rounded-full" />
                                        <div className="flex items-center gap-1">
                                            <span>✓</span>
                                            <span>Unsubscribe anytime</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Close Link */}
                                <button
                                    onClick={handleClose}
                                    className="mt-4 text-sm text-carbon/40 hover:text-carbon/60 transition-colors underline"
                                >
                                    No thanks, I'll pay full price
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
