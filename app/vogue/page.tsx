'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import HeroVideo from '../components/HeroVideo';
import FlashSaleBanner from '../components/FlashSaleBanner';
import WeeklyDropCountdown from '../components/WeeklyDropCountdown';
import TrendingStylesCarousel from '../components/TrendingStylesCarousel';
import BestSellersSection from '../components/BestSellersSection';
import AIStylingModule from '../components/AIStylingModule';
import FashionBlogSection from '../components/FashionBlogSection';
import IGCommunityLookbook from '../components/IGCommunityLookbook';
import MobileBottomNav from '../components/MobileBottomNav';
import WhatsAppButton from '../components/WhatsAppButton';
import ExitIntentPopup from '../components/ExitIntentPopup';
import { TrustBar, HinglishTrustBar } from '../components/TrustBadges';

export default function VogueHypeHomePage() {
    const router = useRouter();
    const [currentRoute, setCurrentRoute] = useState('/');

    // Set next drop date (7 days from now for demo)
    const nextDropDate = new Date();
    nextDropDate.setDate(nextDropDate.getDate() + 7);

    // Set flash sale end date (6 hours from now for demo)
    const flashSaleEndDate = new Date();
    flashSaleEndDate.setHours(flashSaleEndDate.getHours() + 6);

    const handleNavigation = (route: string) => {
        setCurrentRoute(route);
        // In production, use router.push(route)
        console.log('Navigate to:', route);
    };

    const handleShopNow = () => {
        console.log('Shop Now clicked');
        // Scroll to trending styles or navigate to shop
        const trendingSection = document.getElementById('trending-styles');
        trendingSection?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleExploreStyling = () => {
        console.log('Explore Styling clicked');
        // Scroll to AI Styling Module
        const stylingSection = document.getElementById('ai-styling');
        stylingSection?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleExitPopupSubscribe = (email: string) => {
        console.log('Exit popup subscription:', email);
        // Send to your email service
    };

    return (
        <main className="min-h-screen bg-off-white">
            {/* Flash Sale Banner */}
            <FlashSaleBanner
                discount={25}
                endsAt={flashSaleEndDate}
            />

            {/* Hero Video Section */}
            <HeroVideo
                onShopNow={handleShopNow}
                onExploreStyling={handleExploreStyling}
            />

            {/* Weekly Drop Countdown */}
            <WeeklyDropCountdown
                targetDate={nextDropDate}
                title="Next Drop"
                subtitle="Limited Winter Collection"
            />

            {/* Trending Styles Carousel */}
            <div id="trending-styles">
                <TrendingStylesCarousel />
            </div>

            {/* Trust Bar - Hinglish Version */}
            <section className="py-8 px-4 bg-white border-y border-carbon/10">
                <div className="max-w-6xl mx-auto">
                    <HinglishTrustBar className="justify-center" />
                    <p className="text-center text-carbon/60 text-sm mt-4">
                        <span className="font-semibold text-electric-blue">1,50,000+</span> happy customers across India
                    </p>
                </div>
            </section>

            {/* Best Sellers Section */}
            <BestSellersSection />

            {/* AI Styling Module */}
            <div id="ai-styling">
                <AIStylingModule />
            </div>

            {/* Fashion Blog Section */}
            <FashionBlogSection />

            {/* Instagram Community Lookbook */}
            <IGCommunityLookbook />

            {/* Newsletter Section */}
            <section className="py-16 px-4 bg-carbon text-off-white">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
                        Join the Inner Circle
                    </h2>
                    <p className="text-off-white/70 mb-6">
                        Get weekly styling tips, exclusive drops, and early access to sales
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-full bg-glass-white backdrop-blur-glass text-carbon placeholder:text-carbon/50 focus:outline-none focus:ring-2 focus:ring-electric-blue"
                        />
                        <button className="bg-electric-blue hover:bg-electric-blue/90 text-off-white px-8 py-3 rounded-full font-semibold transition-colors whitespace-nowrap">
                            Subscribe
                        </button>
                    </div>

                    <p className="text-off-white/50 text-sm mt-4">
                        Or join us on WhatsApp for instant updates
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-carbon text-off-white py-12 px-4 border-t border-off-white/10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="font-playfair text-xl font-bold mb-4">Shop</h3>
                            <ul className="space-y-2 text-off-white/70 text-sm">
                                <li><a href="#" className="hover:text-electric-blue transition-colors">New Arrivals</a></li>
                                <li><a href="#" className="hover:text-electric-blue transition-colors">Trending</a></li>
                                <li><a href="#" className="hover:text-electric-blue transition-colors">Sale</a></li>
                                <li><a href="#" className="hover:text-electric-blue transition-colors">Collections</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-playfair text-xl font-bold mb-4">Help</h3>
                            <ul className="space-y-2 text-off-white/70 text-sm">
                                <li><a href="#" className="hover:text-electric-blue transition-colors">Track Order</a></li>
                                <li><a href="#" className="hover:text-electric-blue transition-colors">Returns</a></li>
                                <li><a href="#" className="hover:text-electric-blue transition-colors">Shipping</a></li>
                                <li><a href="#" className="hover:text-electric-blue transition-colors">Size Guide</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-playfair text-xl font-bold mb-4">About</h3>
                            <ul className="space-y-2 text-off-white/70 text-sm">
                                <li><a href="#" className="hover:text-electric-blue transition-colors">Our Story</a></li>
                                <li><a href="#" className="hover:text-electric-blue transition-colors">Sustainability</a></li>
                                <li><a href="#" className="hover:text-electric-blue transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-electric-blue transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-playfair text-xl font-bold mb-4">Follow</h3>
                            <ul className="space-y-2 text-off-white/70 text-sm">
                                <li><a href="#" className="hover:text-electric-blue transition-colors">Instagram</a></li>
                                <li><a href="#" className="hover:text-electric-blue transition-colors">Facebook</a></li>
                                <li><a href="#" className="hover:text-electric-blue transition-colors">Twitter</a></li>
                                <li><a href="#" className="hover:text-electric-blue transition-colors">YouTube</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-off-white/10 pt-8 text-center text-off-white/50 text-sm">
                        <p>© 2025 URBNO. All rights reserved. Made with ❤️ in India</p>
                    </div>
                </div>
            </footer>

            {/* WhatsApp Floating Button */}
            <WhatsAppButton
                phoneNumber="919876543210"
                message="Hi! I'm interested in your collection. Can you help me?"
            />

            {/* Exit Intent Popup */}
            <ExitIntentPopup
                discount={10}
                onSubscribe={handleExitPopupSubscribe}
            />

            {/* Mobile Bottom Navigation */}
            <MobileBottomNav
                currentRoute={currentRoute}
                onNavigate={handleNavigation}
            />

            {/* Add padding at bottom for mobile nav */}
            <div className="h-20 md:hidden" />
        </main>
    );
}
