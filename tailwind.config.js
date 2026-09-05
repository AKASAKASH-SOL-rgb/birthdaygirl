/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cosmic-green': '#39FF14',
        'cosmic-violet': '#8B5CF6',
        'deep-violet': '#4C1D95',
        'starlight': '#FFF8E7',
        'gold': '#FFD700',
      },
      fontFamily: {
        'display': ['Georgia', 'serif'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px #39FF14, 0 0 40px #39FF14' },
          '50%': { boxShadow: '0 0 40px #8B5CF6, 0 0 80px #8B5CF6' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.8)' },
        },
      },
    },
  },
  plugins: [],
}
