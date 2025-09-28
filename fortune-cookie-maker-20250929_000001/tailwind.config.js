/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fortune-gold': '#D4AF37',
        'fortune-red': '#DC143C',
        'fortune-dark': '#2C1810',
        'paper': '#FFF9E6'
      },
      animation: {
        'shake': 'shake 0.5s ease-in-out',
        'crack': 'crack 0.3s ease-out',
        'unfold': 'unfold 0.8s ease-out',
        'glow': 'glow 2s ease-in-out infinite'
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-10deg)' },
          '75%': { transform: 'rotate(10deg)' }
        },
        crack: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' }
        },
        unfold: {
          '0%': { transform: 'scaleY(0)', opacity: '0' },
          '100%': { transform: 'scaleY(1)', opacity: '1' }
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.8)' }
        }
      }
    },
  },
  plugins: [],
}