"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PageLoader from '../components/PageLoader';

export default function AboutPage() {
    const router = useRouter();
    const heroRef = useRef(null);
    const storyRef = useRef(null);
    const valuesRef = useRef(null);
    const teamRef = useRef(null);

    const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
    const storyInView = useInView(storyRef, { once: true, amount: 0.3 });
    const valuesInView = useInView(valuesRef, { once: true, amount: 0.2 });
    const teamInView = useInView(teamRef, { once: true, amount: 0.2 });

    const values = [
        {
            icon: "🎨",
            title: "Authentic Design",
            description: "Every piece is thoughtfully designed to reflect modern streetwear culture and individual expression."
        },
        {
            icon: "♻️",
            title: "Sustainable",
            description: "We're committed to low-waste production and ethical manufacturing practices."
        },
        {
            icon: "🌍",
            title: "Community First",
            description: "Built by and for the new generation. Your voice shapes our brand."
        },
        {
            icon: "⚡",
            title: "Quality Over Quantity",
            description: "Limited drops, premium materials, and attention to every detail."
        }
    ];

    return (
        <>
            <PageLoader />
            <div className="min-h-screen bg-off-white">
                {/* Back Button */}
                <div className="bg-charcoal py-4">
                    <div className="max-w-7xl mx-auto px-4">
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
                        >
                            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="font-inter font-medium">Back</span>
                        </motion.button>
                    </div>
                </div>

                {/* Hero Section */}
                <section ref={heroRef} className="relative bg-charcoal text-white py-24 md:py-32 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="max-w-4xl"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="inline-block mb-6 px-4 py-2 bg-electric-blue/20 rounded-full"
                            >
                                <span className="text-sm font-semibold uppercase tracking-wider text-electric-blue font-inter">
                                    About URBNO SHOP
                                </span>
                            </motion.div>

                            <h1 className="font-archivo text-5xl md:text-7xl lg:text-8xl uppercase tracking-tight mb-8 leading-none">
                                Modern Streetwear.
                                <br />
                                <span className="text-electric-blue">New Generation.</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-inter">
                                We're building more than a brand. We're creating a movement for the modern generation who values authenticity, quality, and self-expression.
                            </p>
                        </motion.div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-electric-blue/10 to-transparent pointer-events-none" />
                </section>

                {/* Story Section */}
                <section ref={storyRef} className="py-20 md:py-32">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                            {/* Image */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={storyInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="relative aspect-[4/5] rounded-2xl overflow-hidden"
                            >
                                <Image
                                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop"
                                    alt="URBNO SHOP lifestyle"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </motion.div>

                            {/* Content */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={storyInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                            >
                                <h2 className="font-archivo text-4xl md:text-5xl uppercase tracking-tight mb-6 text-charcoal">
                                    Our Story
                                </h2>
                                <div className="space-y-4 text-gray-600 font-inter text-lg leading-relaxed">
                                    <p>
                                        URBNO SHOP was born from a simple idea: streetwear should be accessible, authentic, and aspirational. We saw a gap in the market for premium quality pieces that don't compromise on style or sustainability.
                                    </p>
                                    <p>
                                        Every collection is designed with the modern generation in mind—those who value individuality, quality craftsmanship, and conscious consumption. We're not just selling clothes; we're building a community.
                                    </p>
                                    <p>
                                        From our limited drops to our numbered pieces, everything we create is intentional. We believe in quality over quantity, and in creating pieces that tell a story.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section ref={valuesRef} className="py-20 md:py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="text-center mb-16"
                        >
                            <h2 className="font-archivo text-4xl md:text-5xl uppercase tracking-tight mb-6 text-charcoal">
                                What We Stand For
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
                                Our values guide everything we do, from design to production to community building.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{
                                        duration: 0.6,
                                        delay: index * 0.1,
                                        ease: [0.25, 0.46, 0.45, 0.94]
                                    }}
                                    className="text-center p-8 rounded-2xl bg-off-white hover:bg-light-beige transition-colors"
                                >
                                    <div className="text-5xl mb-4">{value.icon}</div>
                                    <h3 className="font-archivo text-xl uppercase tracking-tight mb-3 text-charcoal">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 font-inter leading-relaxed">
                                        {value.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-20 md:py-32 bg-charcoal text-white">
                    <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <h2 className="font-archivo text-4xl md:text-6xl uppercase tracking-tight mb-8">
                                Built for the
                                <br />
                                <span className="text-electric-blue">New Generation</span>
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-inter mb-12">
                                We're creating a brand that reflects who you are—confident, conscious, and unapologetically yourself. Join us on this journey.
                            </p>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block"
                            >
                                <a
                                    href="/shop"
                                    className="inline-block px-10 py-5 bg-electric-blue text-white rounded-lg font-semibold uppercase tracking-wider hover:bg-electric-blue/90 transition-colors font-inter"
                                >
                                    Explore Collection
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Trust Badges */}
                <section className="py-16 bg-off-white">
                    <div className="max-w-7xl mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div>
                                <div className="text-4xl font-archivo font-bold text-charcoal mb-2">100%</div>
                                <p className="text-sm text-gray-600 font-inter">Authentic</p>
                            </div>
                            <div>
                                <div className="text-4xl font-archivo font-bold text-charcoal mb-2">Limited</div>
                                <p className="text-sm text-gray-600 font-inter">Numbered Drops</p>
                            </div>
                            <div>
                                <div className="text-4xl font-archivo font-bold text-charcoal mb-2">30 Days</div>
                                <p className="text-sm text-gray-600 font-inter">Easy Returns</p>
                            </div>
                            <div>
                                <div className="text-4xl font-archivo font-bold text-charcoal mb-2">Secure</div>
                                <p className="text-sm text-gray-600 font-inter">Tracked Shipping</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
