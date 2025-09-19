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
        'mood-calm': '#87CEEB',
        'mood-excited': '#FF6B6B',
        'mood-sad': '#6C7A89',
        'mood-anxious': '#9B59B6',
        'mood-grateful': '#2ECC71',
      },
      animation: {
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'ripple': 'ripple 2s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        ripple: {
          '0%': { transform: 'scale(0.95)', opacity: 1 },
          '100%': { transform: 'scale(2)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}