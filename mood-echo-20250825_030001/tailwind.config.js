/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mood-happy': '#FFD700',
        'mood-sad': '#4A90E2',
        'mood-angry': '#FF6B6B',
        'mood-calm': '#4ECDC4',
        'mood-excited': '#FF6F91',
        'mood-anxious': '#9B59B6',
        'mood-love': '#FF1744',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}