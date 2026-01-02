'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
    targetDate: Date;
    title?: string;
    subtitle?: string;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function WeeklyDropCountdown({
    targetDate,
    title = "Next Drop",
    subtitle = "Limited Collection"
}: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +targetDate - +new Date();

            if (difference > 0) {
                return {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                };
            }

            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const timeUnits = [
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-carbon text-off-white py-8 px-4 relative overflow-hidden"
        >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/10 via-transparent to-electric-blue/10 animate-pulse-glow" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-electric-blue animate-pulse" />
                        <p className="text-sm uppercase tracking-widest text-electric-blue font-semibold">
                            {title}
                        </p>
                    </div>
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold">
                        {subtitle}
                    </h2>
                </div>

                {/* Countdown Display */}
                <div className="flex items-center justify-center gap-3 md:gap-6">
                    {timeUnits.map((unit, index) => (
                        <React.Fragment key={unit.label}>
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center"
                            >
                                {/* Number Display */}
                                <div className="relative">
                                    <div className="bg-glass-dark backdrop-blur-glass border border-off-white/20 rounded-lg px-4 py-3 md:px-6 md:py-4 min-w-[60px] md:min-w-[80px]">
                                        <motion.span
                                            key={unit.value}
                                            initial={{ y: -20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="font-playfair text-3xl md:text-5xl font-bold text-off-white tabular-nums"
                                        >
                                            {String(unit.value).padStart(2, '0')}
                                        </motion.span>
                                    </div>

                                    {/* Glow effect on active countdown */}
                                    {unit.value > 0 && (
                                        <div className="absolute inset-0 bg-electric-blue/20 blur-xl rounded-lg -z-10" />
                                    )}
                                </div>

                                {/* Label */}
                                <span className="text-xs md:text-sm uppercase tracking-wider text-off-white/60 mt-2 font-medium">
                                    {unit.label}
                                </span>
                            </motion.div>

                            {/* Separator */}
                            {index < timeUnits.length - 1 && (
                                <span className="font-playfair text-2xl md:text-4xl text-off-white/40 font-bold">
                                    :
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-8"
                >
                    <button className="bg-electric-blue hover:bg-electric-blue/90 text-off-white px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wider transition-all hover:shadow-electric hover:scale-105">
                        Notify Me
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
}
