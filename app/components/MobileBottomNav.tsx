'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Home, Sparkles, Tag, MessageCircle, User } from 'lucide-react';

interface MobileNavProps {
    currentRoute: string;
    onNavigate: (route: string) => void;
}

const navItems = [
    { id: 'home', label: 'Home', icon: Home, route: '/' },
    { id: 'new', label: 'New', icon: Sparkles, route: '/new' },
    { id: 'sale', label: 'Sale', icon: Tag, route: '/sale' },
    { id: 'chat', label: 'Chat', icon: MessageCircle, route: '/chat' },
    { id: 'profile', label: 'Profile', icon: User, route: '/profile' },
];

export default function MobileBottomNav({ currentRoute, onNavigate }: MobileNavProps) {
    return (
        <motion.nav
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
            role="navigation"
            aria-label="Mobile navigation"
        >
            {/* Glassmorphism background */}
            <div className="bg-glass-white backdrop-blur-glass border-t border-carbon/10 shadow-glass">
                <div className="flex items-center justify-around px-2 py-3 safe-area-bottom">
                    {navItems.map((item) => {
                        const isActive = currentRoute === item.route;
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.id}
                                onClick={() => onNavigate(item.route)}
                                className={`
                  flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg
                  transition-all duration-200 min-w-[60px]
                  ${isActive ? 'text-electric-blue' : 'text-carbon/60 hover:text-carbon'}
                `}
                                aria-label={item.label}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <motion.div
                                    whileTap={{ scale: 0.9 }}
                                    className="relative"
                                >
                                    <Icon
                                        className={`w-5 h-5 transition-all ${isActive ? 'stroke-[2.5]' : 'stroke-[1.5]'}`}
                                    />

                                    {/* Active indicator dot */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-electric-blue rounded-full"
                                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                </motion.div>

                                <span
                                    className={`
                    text-[10px] font-medium tracking-tight
                    ${isActive ? 'font-semibold' : 'font-normal'}
                  `}
                                >
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Safe area for iOS devices */}
            <div className="bg-glass-white backdrop-blur-glass h-safe-area-inset-bottom" />
        </motion.nav>
    );
}
