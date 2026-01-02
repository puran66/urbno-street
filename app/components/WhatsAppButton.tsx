'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

interface WhatsAppButtonProps {
    phoneNumber?: string; // Format: 919876543210 (country code + number)
    message?: string;
}

export default function WhatsAppButton({
    phoneNumber = '919876543210',
    message = 'Hi! I need help with...',
}: WhatsAppButtonProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleWhatsAppClick = () => {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <>
            {/* Floating WhatsApp Button */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
                className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40"
            >
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-glass p-4 w-64 mb-2"
                        >
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="absolute top-2 right-2 text-carbon/40 hover:text-carbon"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <div className="mb-3">
                                <p className="font-semibold text-carbon mb-1">Need help?</p>
                                <p className="text-sm text-carbon/60">
                                    Chat with us on WhatsApp for instant support!
                                </p>
                            </div>
                            <button
                                onClick={handleWhatsAppClick}
                                className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white py-2 px-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                            >
                                <MessageCircle className="w-4 h-4" />
                                <span>Start Chat</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="relative bg-[#25D366] hover:bg-[#20BD5A] text-white w-14 h-14 rounded-full shadow-electric flex items-center justify-center transition-colors group"
                    aria-label="WhatsApp Support"
                >
                    <MessageCircle className="w-6 h-6" />

                    {/* Notification Dot */}
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
                    />

                    {/* Ripple Effect */}
                    <motion.div
                        animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-[#25D366] rounded-full"
                    />
                </motion.button>
            </motion.div>
        </>
    );
}
