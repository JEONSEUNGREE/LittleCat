/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'garden': {
          'soil': '#6B4423',
          'grass': '#4CAF50',
          'sky': '#87CEEB',
          'sun': '#FFD700',
          'water': '#4FC3F7'
        }
      },
      animation: {
        'grow': 'grow 2s ease-in-out infinite',
        'water': 'water 1s ease-out',
        'harvest': 'harvest 0.5s ease-in-out'
      },
      keyframes: {
        grow: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' }
        },
        water: {
          '0%': { opacity: '1', transform: 'translateY(0)' },
          '100%': { opacity: '0', transform: 'translateY(20px)' }
        },
        harvest: {
          '0%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.2) rotate(10deg)' },
          '100%': { transform: 'scale(0) rotate(360deg)' }
        }
      }
    },
  },
  plugins: [],
}