/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'maze-dark': '#0a0e27',
        'maze-light': '#1a2144',
        'laser-red': '#ff3366',
        'laser-glow': '#ff6699',
        'mirror-silver': '#c0c0c0',
        'mirror-glass': '#e0e7ff',
        'target-gold': '#ffd700',
        'wall-gray': '#4a5568'
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'laser-beam': 'laser-beam 0.5s ease-in-out',
        'mirror-shine': 'mirror-shine 3s ease-in-out infinite',
        'success-burst': 'success-burst 0.6s ease-out'
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        },
        'laser-beam': {
          '0%': { opacity: 0, transform: 'scale(0.8)' },
          '100%': { opacity: 1, transform: 'scale(1)' }
        },
        'mirror-shine': {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 }
        },
        'success-burst': {
          '0%': { transform: 'scale(0.8)', opacity: 0 },
          '50%': { transform: 'scale(1.1)', opacity: 1 },
          '100%': { transform: 'scale(1)', opacity: 1 }
        }
      }
    },
  },
  plugins: [],
}