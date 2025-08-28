/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'cascade': 'cascade 0.5s ease-in-out',
        'pulse-number': 'pulseNumber 1s ease-in-out infinite',
        'chain-reaction': 'chainReaction 0.3s ease-out',
        'score-pop': 'scorePop 0.5s ease-out',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        cascade: {
          '0%': { transform: 'translateY(-100%) scale(0.8)', opacity: '0' },
          '50%': { transform: 'translateY(0) scale(1.1)' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        pulseNumber: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        chainReaction: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.3) rotate(180deg)' },
          '100%': { transform: 'scale(0) rotate(360deg)', opacity: '0' },
        },
        scorePop: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
          '100%': { transform: 'translateY(-30px) scale(1.5)', opacity: '0' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}