/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cosmic-green': '#10B981',
        'electric-green': '#39FF14',
        'cosmic-violet': '#8B5CF6',
        'deep-violet': '#2E1065',
        'anime-cyan': '#00F0FF',
        'starlight': '#F8FAFC',
        'gold': '#FBBF24',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        cinzel: ['"Cinzel"', 'serif'],
        mono: ['"Space Grotesk"', 'monospace'],
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'aurora': 'aurora 10s ease infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 15px rgba(139,92,246,0.5))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(57,255,20,0.8))' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.8)' },
        },
        aurora: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}