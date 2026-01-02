/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Premium editorial fonts
        playfair: ['var(--font-playfair)', 'serif'], // Headlines
        inter: ['var(--font-inter)', 'sans-serif'],  // Body & UI
        satoshi: ['var(--font-satoshi)', 'sans-serif'], // Alternative UI font
      },
      colors: {
        // Vogue-Hype Design System
        'off-white': '#F9F9F9',      // Base background
        'carbon': '#1A1A1A',          // Primary text & dark elements
        'electric-blue': '#2563EB',   // Accent color for CTAs
        'glass-white': 'rgba(249, 249, 249, 0.8)', // Glassmorphism
        'glass-dark': 'rgba(26, 26, 26, 0.8)',     // Dark glass

        // Legacy support (keeping for backward compatibility)
        'urbno-beige': 'rgba(242,233,221,0.95)',
        'urbno-accent': '#F2E9DD',
      },
      backdropBlur: {
        'glass': '12px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(37, 99, 235, 0.4)' },
          '50%': { boxShadow: '0 0 20px 5px rgba(37, 99, 235, 0.2)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'electric': '0 0 20px rgba(37, 99, 235, 0.3)',
      },
    },
  },
  plugins: [],
}