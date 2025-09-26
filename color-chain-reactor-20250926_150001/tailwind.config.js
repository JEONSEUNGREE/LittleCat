/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'game-red': '#FF6B6B',
        'game-blue': '#4ECDC4',
        'game-yellow': '#FFD93D',
        'game-green': '#6BCF7F',
        'game-purple': '#9B59B6',
        'game-orange': '#FFA500',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'chain-reaction': 'chainReaction 0.5s ease-out',
        'explode': 'explode 0.3s ease-out'
      },
      keyframes: {
        chainReaction: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.3)' },
          '100%': { transform: 'scale(1)' }
        },
        explode: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' }
        }
      }
    },
  },
  plugins: [],
}