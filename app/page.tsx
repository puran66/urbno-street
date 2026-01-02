"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from "framer-motion";
import confetti from "canvas-confetti";
import Image from "next/image";
import { useRouter } from "next/navigation";

// --- TOKENS & DATA ---
const TOKENS = {
  accent: "#F2E9DD",
  beige: "rgba(242,233,221,0.95)", // Defined as 'urbno-beige' in tailwind.config.js for safety, but used inline here.
};

const IMAGES = {
  heroDark: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1600&auto=format&fit=crop",
  heroModel: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1200&auto=format&fit=crop",
  productShowcase: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
  seasonal: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?q=80&w=1600&auto=format&fit=crop",
  products: [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=900&auto=format&fit=crop",
  ]
};

// Helper function to generate slug from title (used in SAMPLE_PRODUCTS)
const generateSlugForProducts = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const SAMPLE_PRODUCTS = (() => {
  const names = [
    "Shadow Pack Backpack",
    "Numbered Hoodie",
    "URBNO Cap",
    "Paper Tote",
    "Canvas Sneaker",
    "Patch Jacket",
    "Ink Tee",
    "Signature Socks",
    "Oversized Tee",
    "Studio Hoodie",
    "Street Shorts",
    "Limited Crew"
  ];
  const cats = ["Bags", "Hoodies", "Tees", "Accessories", "Footwear"];
  const sizes = ["One", "S", "M", "L", "XL"];
  return Array.from({ length: 36 }).map((_, i) => {
    const title = names[i % names.length];
    return {
      id: i + 1,
      title: title,
      slug: generateSlugForProducts(title), // Generate slug for each product
      category: cats[i % cats.length],
      price: 999 + (i % 8) * 300,
      rating: (4 + (i % 5) * 0.1).toFixed(1),
      sketch: IMAGES.products[i % IMAGES.products.length],
      photo: IMAGES.products[(i + 2) % IMAGES.products.length],
      size: sizes[i % sizes.length],
      limited: names[i % names.length].toLowerCase().includes('limited') || i % 4 === 0
    };
  });
})();

// --- HOOKS ---
function useLocalStorage(key: string, initial: any) {
  const [state, setState] = useState(() => {
    // Only run on client side
    if (typeof window === 'undefined') return initial;
    try {
      const r = localStorage.getItem(key);
      return r ? JSON.parse(r) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    // Persist state changes
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // Handle error
    }
  }, [key, state]);

  return [state, setState];
}

// --- COMPONENTS ---

function Icon({ name, className = "w-5 h-5" }: { name: string, className?: string }) {
  if (name === 'menu') return <svg className={className} viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>;
  if (name === 'search') return <svg className={className} viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.5" /></svg>;
  if (name === 'cart') return <svg className={className} viewBox="0 0 24 24" fill="none"><path d="M6 6h15l-1.5 9h-12z" stroke="currentColor" strokeWidth="1.5" /><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></svg>;
  if (name === 'user') return <svg className={className} viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" /></svg>;
  if (name === 'heart') return <svg className={className} viewBox="0 0 24 24" fill="none"><path d="M20.8 7.2a4.8 4.8 0 00-6.8 0L12 9.2l-2-2a4.8 4.8 0 10-6.8 6.8L12 22l8.8-8.8a4.8 4.8 0 000-6.8z" stroke="currentColor" strokeWidth="1.2" /></svg>;
  return null;
}

// Placeholder SVG for broken/missing images
const PlaceholderImage = ({ className, alt }: { className?: string, alt?: string }) => (
  <div className={`${className} bg-gray-200 flex items-center justify-center relative`}>
    <svg className="w-1/2 h-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

// Optimized Image component with Next.js Image and fallback
function SafeImage({
  src,
  alt,
  className = "",
  fallbackClassName = "",
  width,
  height,
  priority = false,
  fill = false,
  placeholderSrc
}: {
  src: string | null | undefined,
  alt: string,
  className?: string,
  fallbackClassName?: string,
  width?: number,
  height?: number,
  priority?: boolean,
  fill?: boolean,
  placeholderSrc?: string
}) {
  const [imgSrc, setImgSrc] = useState(src || placeholderSrc || '');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src || placeholderSrc || '');
    setHasError(false);
  }, [src, placeholderSrc]);

  // Use fill mode when fill prop is true or when no dimensions provided
  const useFill = fill || (!width && !height);

  // If no src and no placeholder, or error occurred, show placeholder
  if (hasError || !imgSrc) {
    if (useFill) {
      return <PlaceholderImage className={className || fallbackClassName || "w-full h-full"} alt={alt} />;
    }
    return <PlaceholderImage className={className || fallbackClassName} alt={alt} />;
  }

  if (useFill) {
    return (
      <Image
        src={imgSrc}
        alt={alt || 'Product image'}
        fill
        className={className || "object-cover"}
        onError={() => setHasError(true)}
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt || 'Product image'}
      width={width || 800}
      height={height || 600}
      className={className}
      onError={() => setHasError(true)}
      loading={priority ? "eager" : "lazy"}
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}

function TopHeader() {
  return (
    <div className="bg-black text-white text-xs py-1">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div>Free shipping over ₹2,000</div>
        <div className="flex gap-4">
          <button className="hover:underline">Help</button>
          <button className="hover:underline">Track Order</button>
        </div>
      </div>
    </div>
  );
}

// Navigation item component with animated underline
function NavItem({
  label,
  route,
  isActive,
  onNav,
  isPrimary = false,
  isAccent = false,
  className = ""
}: {
  label: string,
  route: string,
  isActive: boolean,
  onNav: (route: string) => void,
  isPrimary?: boolean,
  isAccent?: boolean,
  className?: string
}) {
  return (
    <motion.button
      onClick={() => onNav(route)}
      className={`relative uppercase text-sm tracking-wider font-inter transition-colors ${isActive
          ? isPrimary
            ? 'text-black font-semibold'
            : isAccent 
            'text-black'
  'text-black' 
        : isAccent
  'text-gray-700 hover:text-urbno-accent'
  'text-gray-700 hover:text-black'
} ${ className } `}
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="activeNav"
          className={`absolute bottom - 0 left - 0 right - 0 h - 0.5 ${
  isPrimary ? 'bg-black' : isAccent ? 'bg-urbno-accent' : 'bg-black'
} `}
          initial={false}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 30,
          }}
        />
      )}
      {!isActive && (
        <motion.div
          className="absolute bottom-0 left-1/2 right-1/2 h-0.5 bg-black"
          initial={{ scaleX: 0, x: '-50%' }}
          whileHover={{ scaleX: 1, x: '-50%' }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      )}
    </motion.button>
  );
}

function Header({ 
  onNav, 
  cartCount, 
  openAuth, 
  currentRoute,
  hasActiveOffers = true 
}: { 
  onNav: (route: string) => void, 
  cartCount: number, 
  openAuth: () => void,
  currentRoute: string,
  hasActiveOffers?: boolean
}) {
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Shop', route: 'shop', isPrimary: true },
    { label: 'Collections', route: 'collections' },
    { label: 'Refer & Earn', route: 'refer', isAccent: true },
    ...(hasActiveOffers ? [{ label: 'Offers', route: 'offers' }] : []),
    { label: 'About', route: 'about' },
  ];

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{
        y: scrolled && lastScrollY > 100 ? -10 : 0,
        opacity: scrolled ? 0.98 : 1,
      }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="sticky top-0 z-50 bg-white shadow-sm backdrop-blur-sm"
    >
      <TopHeader />
      <motion.div
        animate={{
          paddingTop: scrolled ? '0.5rem' : '0.75rem',
          paddingBottom: scrolled ? '0.5rem' : '0.75rem',
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="max-w-7xl mx-auto px-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNav('home')}
            className="text-lg font-archivo uppercase"
          >
            URBNO
          </motion.button>
        </div>

        <nav className="hidden md:flex gap-6 lg:gap-8 items-center">
          {navItems.map((item) => (
            <NavItem
              key={item.route}
              label={item.label}
              route={item.route}
              isActive={currentRoute === item.route}
              onNav={onNav}
              isPrimary={item.isPrimary}
              isAccent={item.isAccent}
            />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="search"
          >
            <Icon name="search"/>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="account"
            onClick={openAuth}
          >
            <Icon name="user"/>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 border rounded-full flex items-center gap-2 relative"
            onClick={() => onNav('cart')}
            aria-label="cart"
          >
            <Icon name="cart"/>
            <span className="text-sm">Cart ({cartCount})</span>
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-xs rounded-full flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </motion.div>
    </motion.header>
  );
}

// Magnetic button component
function MagneticButton({ children, className, onClick, ...props }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Ripple button component
function RippleButton({ children, onClick, className, ...props }: any) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { x, y, id: Date.now() };
    setRipples([...ripples, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
    onClick?.(e);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 0.98 }}
      whileTap={{ scale: 0.95 }}
      className={`relative overflow - hidden ${ className } `}
      {...props}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-black/20 pointer-events-none"
          initial={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
            x: '-50%',
            y: '-50%',
            opacity: 1,
          }}
          animate={{
            width: 200,
            height: 200,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
        />
      ))}
    </motion.button>
  );
}

function HeroDark({ onBuy }: { onBuy: () => void }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="order-2 md:order-1"
          style={{ y: y2, opacity }}
        >
          <motion.h2
            initial={{ opacity: 0, letterSpacing: '-0.05em' }}
            animate={{ opacity: 1, letterSpacing: '0.02em' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-archivo text-4xl md:text-7xl uppercase tracking-tight"
          >
            URBSYSTEMS
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-4 text-gray-300 max-w-md font-inter"
          >
            Shadow Ops — Limited Numbered Drop. Digital concepts built for the streets.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 flex gap-3"
          >
            <MagneticButton
              onClick={onBuy}
              className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 relative"
            >
              Shop Drop
            </MagneticButton>
            <RippleButton className="border border-white px-6 py-3 rounded-md hover:bg-white/10 text-white">
              Learn More
            </RippleButton>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-4 text-xs text-gray-400 font-inter"
          >
            Free returns • Tracked shipping • Easy exchange
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="order-1 md:order-2 flex justify-center md:justify-end"
          style={{ y: y1 }}
        >
          <div className="relative w-full max-w-md md:max-w-xl pb-20">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 relative aspect-[3/4] md:aspect-[4/5]"
            >
              <SafeImage
                src={IMAGES.heroModel}
                alt="URBNO model wearing Shadow Ops drop"
                className="object-cover"
                fill
                priority
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ scale: 1.05 }}
              className="absolute bottom-4 left-6 md:left-10 bg-white text-black px-4 py-2 rounded-full shadow uppercase text-xs md:text-sm tracking-[0.28em]"
            >
              Limited Drop
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{
                opacity: 1,
                x: 0,
                y: [0, -10, 0],
              }}
              transition={{
                opacity: { duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                x: { duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
                y: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                },
              }}
              className="absolute -bottom-12 right-4 md:right-[-3.5rem] w-40 md:w-56 hidden md:block"
            >
              <motion.div
                whileHover={{ scale: 1.05, shadow: '2xl' }}
                className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20 bg-white relative aspect-square"
              >
                <SafeImage
                  src={IMAGES.productShowcase}
                  alt="URBNO Shadow Pack"
                  className="object-cover"
                  fill
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-3 bg-white text-black px-4 py-2 rounded-md shadow uppercase text-xs md:text-sm font-medium text-center"
              >
                URB Shadow Pack • Sling
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface Product {
    id: number;
    title: string;
    category: string;
    price: number;
    rating: string;
    sketch: string;
    photo: string;
    size: string;
    limited?: boolean;
    slug?: string; // Optional slug for product pages
}

// Helper function to generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Animated section title
function AnimatedSectionTitle({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.h3
      ref={ref}
      initial={{ opacity: 0, y: 20, letterSpacing: '-0.02em' }}
      animate={isInView ? { opacity: 1, y: 0, letterSpacing: '0.02em' } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`font - archivo text - 3xl md: text - 4xl uppercase mb - 8 text - center md: text - left ${ className } `}
    >
      {children}
    </motion.h3>
  );
}

function ProductGrid({ products, onAdd }: { products: Product[], onAdd: (p: Product) => void }) {
  return (
    <section className="bg-[#FAF9F7] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <AnimatedSectionTitle>Essentials Drop</AnimatedSectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((p, index) => (
            <ProductCard key={p.id} product={p} index={index} onAdd={onAdd} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index, onAdd }: { product: Product, index: number, onAdd: (p: Product) => void }) {
  const ref = useRef(null);
  const router = useRouter();
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -10]);
  
  // Generate slug from title if not provided
  const productSlug = product.slug || generateSlug(product.title);
  
  // Handle card click to navigate to product page
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't navigate if clicking on the Add to Cart button
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }
    router.push(`/ products / ${ productSlug } `);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="border border-gray-200 rounded-lg overflow-hidden flex flex-col bg-white group h-full cursor-pointer"
      style={{ y }}
      onClick={handleCardClick}
    >
      {/* Image Container - Fixed Aspect Square */}
      <div className="aspect-square w-full overflow-hidden bg-gray-50 relative">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full h-full"
        >
          <SafeImage 
            src={product.photo} 
            alt={product.title || 'Product image'} 
            className="object-cover" 
            fill
            placeholderSrc=""
          />
        </motion.div>
        
        {/* Badges - Fixed Position */}
        {product.limited && (
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: index * 0.05 + 0.2, type: "spring", stiffness: 200 }}
            className="absolute top-2 left-2 bg-urbno-accent text-black px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide z-10 whitespace-nowrap"
          >
            Limited
          </motion.div>
        )}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-black px-2 py-1 rounded-full text-xs font-semibold z-10 whitespace-nowrap">
          ★{product.rating}
        </div>
      </div>

      {/* Content Area - Flex Grow to Fill Space */}
      <div className="p-3 md:p-4 flex flex-col flex-grow">
        <div className="text-sm md:text-base font-archivo font-semibold uppercase tracking-tight line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </div>
        <div className="text-xs text-gray-500 mt-1 font-inter">{product.category}</div>
        {product.limited && (
          <div className="mt-1 text-xs text-gray-600 font-inter">Only 12 left</div>
        )}
        <div className="mt-2 font-semibold text-base md:text-lg font-inter">₹{product.price}</div>
        
        {/* Footer - Always at Bottom */}
        <div className="mt-auto pt-3 flex flex-col gap-2">
          <motion.button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              onAdd(product);
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 bg-black text-white rounded-md text-sm font-semibold hover:bg-gray-800 font-inter transition-colors z-10 relative"
          >
            Add to Cart
          </motion.button>
          <div className="text-xs text-gray-500 font-inter text-center">
            Free returns
          </div>
        </div>
      </div>

      {/* Hover Border Effect */}
      <motion.div
        className="absolute inset-0 border-2 border-black rounded-lg opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity duration-300"
      />
    </motion.div>
  );
}

function IconsRow() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-6 items-center justify-between flex-wrap text-sm text-gray-600 border-y py-4">
        <div className="text-center flex-1 min-w-[100px]">
          <div className="font-semibold text-black">Limited</div>
          <div className="text-xs">Numbered pieces</div>
        </div>
        <div className="text-center flex-1 min-w-[100px]">
          <div className="font-semibold text-black">Sustainable</div>
          <div className="text-xs">Low waste</div>
        </div>
        <div className="text-center flex-1 min-w-[100px]">
          <div className="font-semibold text-black">Secure</div>
          <div className="text-xs">Tracked shipping</div>
        </div>
        <div className="text-center flex-1 min-w-[100px] hidden sm:block">
          <div className="font-semibold text-black">Free Returns</div>
          <div className="text-xs">30-day policy</div>
        </div>
      </div>
    </section>
  );
}

function SeasonalBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="mt-8" ref={ref}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="rounded-xl overflow-hidden relative shadow-lg"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full h-64 overflow-hidden"
          >
            <SafeImage src={IMAGES.seasonal} alt="Winter collection" className="w-full h-64" fill />
          </motion.div>
          <div className="absolute inset-0 bg-black/40 flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-white ml-6 p-4"
            >
              <motion.h3
                initial={{ letterSpacing: '-0.02em' }}
                animate={isInView ? { letterSpacing: '0.02em' } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-archivo text-4xl md:text-5xl uppercase"
              >
                Winter '25 Collection
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-2 max-w-sm font-inter"
              >
                Cozy hoodies, plush sweatshirts — new drops and premium caps crafted for the cold.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-4"
              >
                <MagneticButton className="px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 font-inter">
                  Shop Now
                </MagneticButton>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-3 text-xs text-gray-300 font-inter"
              >
                Free returns • Tracked shipping • Easy exchange
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SaleBlock() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section className="mt-10" style={{ backgroundColor: TOKENS.beige }} ref={ref}>
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30, letterSpacing: '-0.05em' }}
          animate={isInView ? { opacity: 1, y: 0, letterSpacing: '0.05em' } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-archivo text-5xl md:text-7xl uppercase tracking-wider text-black"
        >
          Our Last Sale Ever!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-4 text-gray-700 max-w-2xl mx-auto font-inter"
        >
          Clearing out inventory to make space for new art and new products. Limited edition drops — up to 70% off until stocks last. Don't miss out!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-6"
        >
          <RippleButton className="px-8 py-3 bg-black text-white rounded-md font-semibold shadow-lg hover:bg-gray-800 font-inter">
            Explore Sale
          </RippleButton>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 text-sm text-gray-600 font-inter"
        >
          Free returns • Tracked shipping • Easy exchange
        </motion.div>
      </div>
    </section>
  );
}

function Footer({ onNav }: { onNav: (route: string) => void }) {
  return (
    <footer className="mt-16 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-700">
        <div className="col-span-2 md:col-span-1">
          <div className="font-archivo text-lg mb-2 text-black">URBNO</div>
          <div className="font-inter">Hand-sketched streetwear — limited drops and studio collabs. Made for the streets.</div>
        </div>
        <div>
          <div className="font-semibold mb-3 text-black uppercase font-inter">Customer Care</div>
          <div className="flex flex-col gap-2 font-inter">
            <motion.button 
              whileHover={{ x: 4 }}
              className="text-left hover:text-black transition-colors"
              onClick={() => onNav('help')}
            >
              Help / FAQ
            </motion.button>
            <motion.button 
              whileHover={{ x: 4 }}
              className="text-left hover:text-black transition-colors"
              onClick={() => onNav('track')}
            >
              Track Order
            </motion.button>
            <motion.button 
              whileHover={{ x: 4 }}
              className="text-left hover:text-black transition-colors"
            >
              Returns
            </motion.button>
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3 text-black uppercase font-inter">Company</div>
          <div className="flex flex-col gap-2 font-inter">
            <motion.button 
              whileHover={{ x: 4 }}
              className="text-left hover:text-black transition-colors"
              onClick={() => onNav('about')}
            >
              About
            </motion.button>
            <motion.button 
              whileHover={{ x: 4 }}
              className="text-left hover:text-black transition-colors"
            >
              Contact
            </motion.button>
            <motion.button 
              whileHover={{ x: 4 }}
              className="text-left hover:text-black transition-colors"
            >
              Careers
            </motion.button>
          </div>
        </div>
        <div>
          <div className="font-semibold mb-3 text-black uppercase font-inter">Legal</div>
          <div className="flex flex-col gap-2 font-inter">
            <motion.button 
              whileHover={{ x: 4 }}
              className="text-left hover:text-black transition-colors"
            >
              Privacy
            </motion.button>
            <motion.button 
              whileHover={{ x: 4 }}
              className="text-left hover:text-black transition-colors"
            >
              Terms
            </motion.button>
            <motion.button 
              whileHover={{ x: 4 }}
              className="text-left hover:text-black transition-colors"
            >
              Shipping
            </motion.button>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 py-4 border-t border-gray-100 font-inter">© {new Date().getFullYear()} URBNO. All rights reserved.</div>
    </footer>
  );
}


export default function HomePage() {
  // Use client component hooks
  const [route, setRoute] = useState('home');
  const [cart, setCart] = useLocalStorage('urbno_cart', []);
  const [users, setUsers] = useLocalStorage('urbno_users', {});
  const [currentUserEmail, setCurrentUserEmail] = useLocalStorage('urbno_current', null);
  const currentUser = currentUserEmail ? users[currentUserEmail] : null;
  const [toast, setToast] = useState('');

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0,0); }, [route]);

  const addToCart = useCallback((p: Product) => { setCart((prev: Product[]) => [...prev, p]); setToast('Product added to cart'); }, [setCart]);
  const handleBuyNow = useCallback(() => { setToast('Demo: Redirecting to shop'); setRoute('shop'); }, []);

  // Auth modal state and logic
  const [showAuth, setShowAuth] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  
  const openAuth = useCallback(() => setShowAuth(true), []);

  // Lock body scroll when auth modal is open
  useEffect(() => {
    if (showAuth) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Apply styles to prevent scrolling
      document.body.style.position = 'fixed';
      document.body.style.top = `- ${ scrollY } px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        // Restore scroll position when modal closes
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [showAuth]);

  const signup = useCallback((email: string) => {
    if (!email) return setToast('Please enter an email address');
    if (users[email]) { setCurrentUserEmail(email); setShowAuth(false); setToast('Welcome back!'); return; }
    
    // Simple mock signup logic
    const code = `URB${ Math.random().toString(36).slice(2, 8).toUpperCase() } `;
    const newUser = { email, referralCode: code, balance: 0 };
    const updated = { ...users, [email]: newUser };
    setUsers(updated);
    setCurrentUserEmail(email);
    setShowAuth(false);
    setToast('Welcome to URBNO!');
  }, [users, setUsers, setCurrentUserEmail]);

  const login = useCallback((email: string) => {
    if (!email) return setToast('Please enter an email address');
    if (!users[email]) return setToast('User not found. Try signing up.');

    setCurrentUserEmail(email);
    setShowAuth(false);
    setToast('Signed in successfully');
  }, [users, setCurrentUserEmail]);

  const logout = useCallback(() => {
    setCurrentUserEmail(null);
    setToast('Signed out');
    setRoute('home'); // Go back to home after logout
  }, [setCurrentUserEmail]);


  // Cart Component Placeholder - For simplicity, only shows count in header.
  const CartView = () => (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h2 className="font-archivo text-3xl uppercase mb-6">Shopping Cart ({cart.length})</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty. Time to find some fresh drops!</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item: Product, index: number) => (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center gap-4">
                    <SafeImage src={item.photo} alt={item.title} className="w-12 h-12 rounded" width={48} height={48} />
                    <div>
                        <div className="font-semibold">{item.title}</div>
                        <div className="text-sm text-gray-500">Size: {item.size}</div>
                    </div>
                </div>
                <div className="font-semibold">₹{item.price}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-between items-center pt-4 border-t-2 border-black">
              <div className="font-archivo text-xl">Total</div>
              <div className="font-archivo text-xl">
                ₹{cart.reduce((sum: number, item: Product) => sum + item.price, 0)}
              </div>
          </div>
          <button className="mt-8 w-full py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition">
              Proceed to Checkout
          </button>
        </>
      )}
    </div>
  )


  // Check if there are active offers (you can make this dynamic later)
  const hasActiveOffers = true; // Set to false to hide Offers tab

  return (
    <div className="min-h-screen">
      <Header 
        onNav={setRoute} 
        cartCount={cart.length} 
        openAuth={openAuth}
        currentRoute={route}
        hasActiveOffers={hasActiveOffers}
      />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {route === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <HeroDark onBuy={handleBuyNow} />
              <IconsRow />
              <ProductGrid products={SAMPLE_PRODUCTS.slice(0, 20)} onAdd={addToCart} />
              <SeasonalBanner />
              <ProductGrid products={SAMPLE_PRODUCTS.slice(20)} onAdd={addToCart} />
              <SaleBlock />
            </motion.div>
          )}

          {route === 'shop' && (
            <motion.div
              key="shop"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-7xl mx-auto px-4 py-8"
            >
              <div className="mb-6">
                <h1 className="font-archivo text-4xl md:text-5xl uppercase mb-3">Shop</h1>
                <p className="text-gray-600 font-inter max-w-2xl">
                  Browse the latest URBNO drops — tees, hoodies, and essentials built from digital design systems. Every piece is limited.
                </p>
              </div>
              <ProductGrid products={SAMPLE_PRODUCTS} onAdd={addToCart} />
            </motion.div>
          )}

          {route === 'collections' && (
            <motion.div
              key="collections"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-7xl mx-auto px-4 py-12"
            >
              <div className="mb-8">
                <h1 className="font-archivo text-4xl md:text-5xl uppercase mb-3">Collections</h1>
                <p className="text-gray-600 font-inter max-w-2xl">
                  Each collection is a chapter in URBNO's visual story — limited, numbered, and crafted with precision. From 'Shadow Ops' to 'Essentials Drop', find your fit.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Shadow Ops', desc: 'Limited numbered drop. Digital concepts built for the streets.', image: IMAGES.heroModel },
                  { name: 'Essentials Drop', desc: 'Core pieces for everyday wear. Timeless utility design.', image: IMAGES.products[0] },
                  { name: 'Winter 25', desc: 'Cozy hoodies, plush sweatshirts — new drops crafted for the cold.', image: IMAGES.seasonal },
                ].map((collection, index) => (
                  <motion.div
                    key={collection.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="border border-gray-200 rounded-lg overflow-hidden bg-white cursor-pointer group"
                    onClick={() => setRoute('shop')}
                  >
                    <div className="relative aspect-square overflow-hidden bg-gray-50">
                      <SafeImage src={collection.image} alt={collection.name} className="w-full h-full group-hover:scale-110 transition-transform duration-500" fill />
                    </div>
                    <div className="p-4">
                      <h3 className="font-archivo text-xl uppercase mb-2">{collection.name}</h3>
                      <p className="text-sm text-gray-600 font-inter">{collection.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {route === 'refer' && (
            <motion.div
              key="refer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-4xl mx-auto px-4 py-12"
            >
              <div className="mb-8 text-center">
                <h1 className="font-archivo text-4xl md:text-5xl uppercase mb-3">Refer & Earn</h1>
                <p className="text-gray-600 font-inter text-lg max-w-2xl mx-auto">
                  Invite friends, earn rewards. You get ₹250 for every referral, they get instant access to exclusive drops. It's that simple.
                </p>
              </div>
              {currentUser ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white p-8 rounded-lg shadow-md border border-gray-200"
                >
                  <div className="mb-6">
                    <h2 className="font-archivo text-2xl uppercase mb-4">Your Referral Code</h2>
                    <div className="flex items-center gap-4 mb-4">
                      <code className="bg-gray-100 px-4 py-3 rounded font-mono text-xl font-bold">{currentUser.referralCode}</code>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          navigator.clipboard.writeText(currentUser.referralCode);
                          setToast('Referral code copied! 🎉');
                          confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 },
                            colors: ['#000000', '#F2E9DD', '#ffffff'],
                          });
                        }}
                        className="px-4 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition font-semibold"
                      >
                        Copy Code
                      </motion.button>
                    </div>
                    <p className="text-sm text-gray-600 font-inter">
                      Share this code with friends. When they sign up using your code, you both earn ₹250!
                    </p>
                  </div>
                  <div className="border-t pt-6">
                    <h3 className="font-archivo text-xl uppercase mb-3">How It Works</h3>
                    <ul className="space-y-3 font-inter text-gray-700">
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-black">1.</span>
                        <span>Share your referral code with friends</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-black">2.</span>
                        <span>They sign up and make their first purchase</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-black">3.</span>
                        <span>You both earn ₹250 in account credit</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="font-bold text-black">4.</span>
                        <span>Use credits on any URBNO drop — no limits!</span>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-6 p-4 bg-urbno-accent rounded-lg">
                    <p className="font-semibold text-black font-inter">Current Balance: ₹{currentUser.balance}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white p-8 rounded-lg shadow-md border border-gray-200 text-center"
                >
                  <p className="text-lg text-gray-600 mb-6 font-inter">Sign in to get your referral code and start earning rewards!</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openAuth}
                    className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition font-semibold"
                  >
                    Sign In / Sign Up
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}

          {route === 'offers' && hasActiveOffers && (
            <motion.div
              key="offers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-7xl mx-auto px-4 py-8"
            >
              <div className="mb-6">
                <h1 className="font-archivo text-4xl md:text-5xl uppercase mb-3">Offers</h1>
                <p className="text-gray-600 font-inter max-w-2xl">
                  Limited-time deals and last-chance releases. Up to 70% off until sold out — once they're gone, they're gone.
                </p>
              </div>
              <SaleBlock />
              <div className="mt-8">
                <ProductGrid products={SAMPLE_PRODUCTS.filter((_, i) => i % 3 === 0)} onAdd={addToCart} />
              </div>
            </motion.div>
          )}

          {route === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-4xl mx-auto px-4 py-12"
            >
              <div className="mb-8">
                <h1 className="font-archivo text-4xl md:text-5xl uppercase mb-4">About URBNO</h1>
                <p className="text-xl text-gray-700 font-inter leading-relaxed mb-6">
                  URBNO merges sketch-inspired design with digital craftsmanship. Built for the streets, made for the new generation.
                </p>
              </div>
              <div className="space-y-6 text-gray-700 font-inter leading-relaxed">
                <p>
                  URBNO is a digital-first streetwear brand — built on minimal design, digital craft, and limited production. Every drop is a limited, numbered edition, focusing on sustainable materials and timeless utility.
                </p>
                <p>
                  We believe fashion is art, and every piece is a canvas. Our collections blend hand-drawn sketch aesthetics with modern, minimal tech design, creating pieces that are both functional and visually striking.
                </p>
                <p>
                  From 'Shadow Ops' to 'Essentials Drop', each collection tells a story. Limited runs, numbered pieces, and digital-first design define the URBNO experience.
                </p>
              </div>
            </motion.div>
          )}
          {route === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-7xl mx-auto px-4 py-12"
            >
            {currentUser ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-white p-8 rounded-lg shadow-md max-w-lg"
              >
                <h3 className="font-archivo text-3xl uppercase border-b pb-3">Your Profile</h3>
                <div className="mt-6 space-y-3 text-lg">
                  <div><span className="font-semibold">Email:</span> {currentUser.email}</div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Referral Code:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded font-mono">{currentUser.referralCode}</code>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        navigator.clipboard.writeText(currentUser.referralCode);
                        setToast('Referral code copied! 🎉');
                        confetti({
                          particleCount: 100,
                          spread: 70,
                          origin: { y: 0.6 },
                          colors: ['#000000', '#F2E9DD', '#ffffff'],
                        });
                      }}
                      className="px-3 py-1 bg-black text-white text-sm rounded hover:bg-gray-800 transition"
                    >
                      Copy
                    </motion.button>
                  </div>
                  <div><span className="font-semibold">Account Balance:</span> ₹{currentUser.balance}</div>
                </div>
                <div className="mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={logout}
                    className="px-5 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition hover:text-red-600"
                  >
                    Logout
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="max-w-lg mx-auto p-6 text-center"
              >
                <p className="text-xl text-gray-600">Please sign in to view your profile.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openAuth}
                  className="mt-4 px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                >
                  Sign In / Sign Up
                </motion.button>
              </motion.div>
            )}
            </motion.div>
          )}

          {route === 'cart' && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <CartView />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer onNav={setRoute} />

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAuth(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-8 w-11/12 max-w-md shadow-2xl"
            >
              <h3 className="font-archivo text-2xl border-b pb-2">Join URBNO</h3>
              <p className="text-sm text-gray-500 mt-2">Sign up or sign in using your email address.</p>
              <input
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 mt-5 focus:ring-2 focus:ring-black focus:border-black transition"
                  placeholder="Email Address"
                  type="email"
                  value={authEmail}
                  onChange={e => setAuthEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      signup(authEmail);
                    }
                  }}
              />
              <div className="mt-6 flex gap-3 justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  onClick={() => setShowAuth(false)}
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition"
                  onClick={() => login(authEmail)}
                >
                  Sign in
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
                  onClick={() => signup(authEmail)}
                >
                  Sign up
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white px-5 py-3 rounded-full shadow-lg z-50 pointer-events-none"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}