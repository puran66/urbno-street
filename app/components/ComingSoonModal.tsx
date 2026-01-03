"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Bell } from 'lucide-react';

interface ComingSoonModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
}

export default function ComingSoonModal({
    isOpen,
    onClose,
    title = "Coming Soon",
    message = "We're working hard to bring you this feature. Stay tuned!"
}: ComingSoonModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-purple-50 opacity-50" />

                            {/* Content */}
                            <div className="relative p-8 text-center">
                                {/* Icon */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full"
                                >
                                    <Sparkles className="w-10 h-10 text-white" />
                                </motion.div>

                                {/* Title */}
                                <motion.h2
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-3xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
                                >
                                    {title}
                                </motion.h2>

                                {/* Message */}
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-gray-600 mb-8 text-lg"
                                >
                                    {message}
                                </motion.p>

                                {/* Notify Button */}
                                <motion.button
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onClose}
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors shadow-lg"
                                >
                                    <Bell className="w-5 h-5" />
                                    Notify Me When Ready
                                </motion.button>

                                {/* Decorative Elements */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 180, 360],
                                    }}
                                    transition={{
                                        duration: 20,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-orange-200 to-purple-200 rounded-full opacity-20 blur-3xl"
                                />
                                <motion.div
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        rotate: [360, 180, 0],
                                    }}
                                    transition={{
                                        duration: 15,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-200 to-pink-200 rounded-full opacity-20 blur-3xl"
                                />
                            </div>

                            {/* Bottom Accent */}
                            <div className="h-2 bg-gradient-to-r from-orange-400 via-purple-400 to-blue-400" />
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
