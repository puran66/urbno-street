'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Banknote, Truck, RotateCcw, Shield } from 'lucide-react';

interface TrustBadgeProps {
    type: 'cod' | 'shipping' | 'returns' | 'secure';
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
}

const badgeConfig = {
    cod: {
        icon: Banknote,
        label: 'COD Available',
        shortLabel: 'COD',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
    },
    shipping: {
        icon: Truck,
        label: 'Fast Shipping',
        shortLabel: 'Fast Ship',
        color: 'text-electric-blue',
        bgColor: 'bg-electric-blue/10',
        borderColor: 'border-electric-blue/20',
    },
    returns: {
        icon: RotateCcw,
        label: '7-Day Returns',
        shortLabel: '7-Day',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
    },
    secure: {
        icon: Shield,
        label: 'Secure Checkout',
        shortLabel: 'Secure',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
    },
};

export function TrustBadge({ type, size = 'md', showLabel = true }: TrustBadgeProps) {
    const config = badgeConfig[type];
    const Icon = config.icon;

    const sizeClasses = {
        sm: 'px-2 py-1 text-xs gap-1',
        md: 'px-3 py-1.5 text-sm gap-1.5',
        lg: 'px-4 py-2 text-base gap-2',
    };

    const iconSizes = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={`
        inline-flex items-center rounded-full border font-semibold
        ${sizeClasses[size]}
        ${config.color}
        ${config.bgColor}
        ${config.borderColor}
      `}
        >
            <Icon className={iconSizes[size]} />
            {showLabel && <span>{size === 'sm' ? config.shortLabel : config.label}</span>}
        </motion.div>
    );
}

// Trust Bar Component - Shows all badges in a row
interface TrustBarProps {
    badges?: Array<'cod' | 'shipping' | 'returns' | 'secure'>;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function TrustBar({
    badges = ['cod', 'shipping', 'returns', 'secure'],
    size = 'md',
    className = '',
}: TrustBarProps) {
    return (
        <div className={`flex flex-wrap items-center gap-2 ${className}`}>
            {badges.map((badge) => (
                <TrustBadge key={badge} type={badge} size={size} />
            ))}
        </div>
    );
}

// Hinglish Trust Badges for Indian Market
export function HinglishTrustBar({ className = '' }: { className?: string }) {
    return (
        <div className={`flex flex-wrap items-center gap-2 text-sm ${className}`}>
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 rounded-full border border-green-200 font-semibold"
            >
                <Banknote className="w-4 h-4" />
                <span>Cash on Delivery</span>
            </motion.div>

            <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-electric-blue/10 text-electric-blue rounded-full border border-electric-blue/20 font-semibold"
            >
                <Truck className="w-4 h-4" />
                <span>Free Shipping</span>
            </motion.div>

            <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-600 rounded-full border border-orange-200 font-semibold"
            >
                <RotateCcw className="w-4 h-4" />
                <span>7-Day Easy Returns</span>
            </motion.div>
        </div>
    );
}

// Compact COD Badge for Product Cards
export function CODBadge({ className = '' }: { className?: string }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className={`inline-flex items-center gap-1 px-2 py-1 bg-green-600 text-white rounded text-xs font-bold ${className}`}
        >
            <Banknote className="w-3 h-3" />
            <span>COD</span>
        </motion.div>
    );
}

export default TrustBadge;
